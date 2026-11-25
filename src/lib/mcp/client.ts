import { McpClientError, type McpEnvelope, type McpToolName } from "./types";

export const MCP_ENDPOINT = "https://mcp.caiobarilli.workers.dev/mcp";
export const MCP_PROTOCOL_VERSION = "2025-03-26";
export const MCP_DEFAULT_TIMEOUT_MS = 12_000;
export const MCP_MAX_RESPONSE_BYTES = 64_000;

type JsonRpcError = {
  code?: number;
  message?: string;
};

type McpToolCallResult = {
  isError?: boolean;
  structuredContent?: unknown;
  content?: { type?: string; text?: string }[];
};

type JsonRpcResponse = {
  jsonrpc?: string;
  id?: number | string | null;
  result?: McpToolCallResult;
  error?: JsonRpcError;
};

export type CallMcpOptions = {
  endpoint?: string;
  timeoutMs?: number;
  signal?: AbortSignal;
  fetchImpl?: typeof fetch;
};

let requestCounter = 1;

function nextRequestId(): number {
  requestCounter += 1;
  return requestCounter;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Parses either an SSE stream (`event: message\ndata: {...}`) or plain JSON-RPC payload. */
export function parseMcpTransportBody(bodyText: string, contentType: string): JsonRpcResponse {
  const trimmed = bodyText.trim();
  if (!trimmed) {
    throw new McpClientError("PROTOCOL_ERROR", "Empty response from MCP endpoint.");
  }

  const normalizedType = contentType.toLowerCase();
  if (normalizedType.includes("text/event-stream") || trimmed.startsWith("event:") || trimmed.startsWith("data:")) {
    const dataLines = trimmed
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice("data:".length).trim())
      .filter((line) => line.length > 0 && line !== "[DONE]");

    for (let i = dataLines.length - 1; i >= 0; i -= 1) {
      const candidate = dataLines[i];
      if (!candidate) continue;
      try {
        const parsed: unknown = JSON.parse(candidate);
        if (isRecord(parsed)) {
          return parsed as JsonRpcResponse;
        }
      } catch {
        // Keep searching earlier SSE data frames if the last one wasn't JSON.
      }
    }

    throw new McpClientError("PROTOCOL_ERROR", "No valid JSON-RPC message found in SSE response.");
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (!isRecord(parsed)) {
      throw new McpClientError("PROTOCOL_ERROR", "Unexpected non-object JSON-RPC response.");
    }
    return parsed as JsonRpcResponse;
  } catch (error) {
    if (error instanceof McpClientError) throw error;
    throw new McpClientError("PROTOCOL_ERROR", "Invalid JSON received from MCP endpoint.");
  }
}

function extractEnvelope<T>(rpc: JsonRpcResponse): McpEnvelope<T> {
  if (rpc.error) {
    const msg = typeof rpc.error.message === "string" ? rpc.error.message : "MCP JSON-RPC error.";
    throw new McpClientError("RPC_ERROR", msg);
  }

  const result = rpc.result;
  if (!isRecord(result)) {
    throw new McpClientError("PROTOCOL_ERROR", "Missing result in MCP JSON-RPC response.");
  }

  if (result.isError === true) {
    const errText = result.content?.find((item) => typeof item.text === "string")?.text;
    throw new McpClientError("RPC_ERROR", errText ?? "MCP tool reported an error.");
  }

  if (isRecord(result.structuredContent)) {
    return result.structuredContent as McpEnvelope<T>;
  }

  const firstText = result.content?.find((item) => item.type === "text" && typeof item.text === "string")?.text;
  if (firstText) {
    try {
      const parsed: unknown = JSON.parse(firstText);
      if (isRecord(parsed)) {
        return parsed as McpEnvelope<T>;
      }
    } catch {
      throw new McpClientError("PROTOCOL_ERROR", "MCP tool text content is not valid JSON.");
    }
  }

  throw new McpClientError("PROTOCOL_ERROR", "MCP tool response did not contain structured data.");
}

async function readTextWithLimit(response: Response, maxBytes: number): Promise<string> {
  const contentLength = response.headers.get("content-length");
  if (contentLength !== null) {
    const parsed = Number(contentLength);
    if (Number.isFinite(parsed) && parsed > maxBytes) {
      throw new McpClientError("PAYLOAD_TOO_LARGE", "MCP response exceeded client size limit.");
    }
  }

  const text = await response.text();
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    throw new McpClientError("PAYLOAD_TOO_LARGE", "MCP response exceeded client size limit.");
  }
  return text;
}

export async function callMcpTool<T = Record<string, unknown>>(
  tool: McpToolName,
  args: Record<string, unknown>,
  options: CallMcpOptions = {},
): Promise<McpEnvelope<T>> {
  const endpoint = options.endpoint ?? MCP_ENDPOINT;
  const timeoutMs = options.timeoutMs ?? MCP_DEFAULT_TIMEOUT_MS;
  const fetchImpl = options.fetchImpl ?? fetch;

  const controller = new AbortController();
  let timedOut = false;

  const onExternalAbort = () => controller.abort();
  if (options.signal) {
    if (options.signal.aborted) {
      throw new McpClientError("ABORTED", "Request was cancelled.");
    }
    options.signal.addEventListener("abort", onExternalAbort, { once: true });
  }

  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "MCP-Protocol-Version": MCP_PROTOCOL_VERSION,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: nextRequestId(),
        method: "tools/call",
        params: {
          name: tool,
          arguments: args,
        },
      }),
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const bodyText = await readTextWithLimit(response, MCP_MAX_RESPONSE_BYTES);

    if (!response.ok) {
      let message = `HTTP ${String(response.status)}`;
      try {
        const errRpc = parseMcpTransportBody(bodyText, contentType);
        if (errRpc.error?.message) {
          message = `${message}: ${errRpc.error.message}`;
        }
      } catch {
        // Keep status-based message when error body is not JSON-RPC.
      }
      throw new McpClientError("HTTP_ERROR", message, response.status);
    }

    const rpc = parseMcpTransportBody(bodyText, contentType);
    return extractEnvelope<T>(rpc);
  } catch (error) {
    if (error instanceof McpClientError) {
      throw error;
    }
    if (timedOut) {
      throw new McpClientError("TIMEOUT", "MCP request timed out.");
    }
    if (controller.signal.aborted || (error instanceof DOMException && error.name === "AbortError")) {
      throw new McpClientError("ABORTED", "Request was cancelled.");
    }
    throw new McpClientError("NETWORK", "Could not reach the MCP endpoint.");
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", onExternalAbort);
  }
}

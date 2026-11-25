import { describe, expect, it } from "vitest";
import { getContent } from "@/content";
import { pickRandomSuggestions } from "@/components/AskSection";
import { callMcpTool, parseMcpTransportBody } from "./client";
import { formatMcpResponse } from "./formatters";
import { routeQuestion } from "./router";
import { MCP_TOOL_NAMES, McpClientError } from "./types";

describe("MCP deterministic router", () => {
  it("routes all 20 suggested questions in both PT-BR and EN to real MCP tools", () => {
    const { askQuestions } = getContent();
    expect(askQuestions).toHaveLength(20);

    const usedTools = new Set<string>();
    for (const q of askQuestions) {
      const pt = routeQuestion(q.text.pt, "pt-br");
      expect(pt.supported, `PT question failed to route: ${q.text.pt}`).toBe(true);
      if (pt.supported) {
        expect(MCP_TOOL_NAMES).toContain(pt.tool);
        expect(pt.args.lang).toBe("pt-br");
        usedTools.add(pt.tool);
      }

      const en = routeQuestion(q.text.en, "en");
      expect(en.supported, `EN question failed to route: ${q.text.en}`).toBe(true);
      if (en.supported) {
        expect(MCP_TOOL_NAMES).toContain(en.tool);
        expect(en.args.lang).toBe("en");
        usedTools.add(en.tool);
      }
    }

    // All 6 real MCP tools are exercised across the 20-question bank.
    expect(usedTools.size).toBe(6);
  });

  it("rejects out-of-scope questions instead of guessing a tool", () => {
    const unsupported = [
      "Qual a receita de bolo de cenoura?",
      "What is the weather in Tokyo tomorrow?",
      "Quanto é 2 + 2?",
      "Me conte uma piada",
      "What is his salary expectation?",
    ];

    for (const q of unsupported) {
      expect(routeQuestion(q, "pt-br")).toEqual({ supported: false, reason: "unsupported" });
      expect(routeQuestion(q, "en")).toEqual({ supported: false, reason: "unsupported" });
    }
  });

  it("returns empty reason for blank queries", () => {
    expect(routeQuestion("   ", "pt-br")).toEqual({ supported: false, reason: "empty" });
  });
});

describe("MCP Streamable HTTP client", () => {
  it("parses SSE event-stream responses with structuredContent", async () => {
    const sseBody =
      'event: message\ndata: {"jsonrpc":"2.0","id":2,"result":{"structuredContent":{"meta":{"lang":"pt-br","source_url":"https://caiobarilli.github.io/pt-br/"},"data":{"name":"Caio Barilli"}}}}\n\n';

    const fakeFetch: typeof fetch = async () =>
      new Response(sseBody, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });

    const envelope = await callMcpTool("get_profile", { lang: "pt-br" }, { fetchImpl: fakeFetch });
    expect(envelope.meta?.lang).toBe("pt-br");
    expect(envelope.data?.name).toBe("Caio Barilli");
  });

  it("falls back to JSON text content when structuredContent is absent", async () => {
    const jsonBody = JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
      result: {
        content: [{ type: "text", text: JSON.stringify({ meta: { lang: "en" }, data: { total: 1, articles: [] } }) }],
      },
    });

    const fakeFetch: typeof fetch = async () =>
      new Response(jsonBody, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    const envelope = await callMcpTool("get_articles", { lang: "en" }, { fetchImpl: fakeFetch });
    expect(envelope.meta?.lang).toBe("en");
  });

  it("throws typed HTTP_ERROR on non-2xx responses", async () => {
    const fakeFetch: typeof fetch = async () =>
      new Response(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32003, message: "Forbidden origin" } }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });

    await expect(callMcpTool("get_profile", { lang: "en" }, { fetchImpl: fakeFetch })).rejects.toMatchObject({
      name: "McpClientError",
      code: "HTTP_ERROR",
      status: 403,
    });
  });

  it("throws typed RPC_ERROR when JSON-RPC returns error or isError", async () => {
    const fakeFetch: typeof fetch = async () =>
      new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result: { isError: true, content: [{ type: "text", text: "Bad arg" }] } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    await expect(callMcpTool("get_project", { slug: "keeptask" }, { fetchImpl: fakeFetch })).rejects.toMatchObject({
      code: "RPC_ERROR",
    });
  });

  it("throws ABORTED when caller aborts before fetch", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(callMcpTool("get_profile", {}, { signal: controller.signal })).rejects.toBeInstanceOf(McpClientError);
    await expect(callMcpTool("get_profile", {}, { signal: controller.signal })).rejects.toMatchObject({
      code: "ABORTED",
    });
  });

  it("throws PROTOCOL_ERROR on empty body", () => {
    expect(() => parseMcpTransportBody("", "application/json")).toThrow(McpClientError);
  });
});

describe("MCP formatters", () => {
  it("formats all 6 tools cleanly and handles missing fields without throwing", () => {
    const sampleProfile = formatMcpResponse(
      "get_profile",
      {
        meta: { source_url: "https://caiobarilli.github.io/pt-br/" },
        data: {
          name: "Caio Barilli",
          headline: "Engenheiro Full Stack",
          links: {
            portfolio: "https://caiobarilli.github.io/pt-br/",
            github: "https://github.com/caiobarilli",
            bad: "javascript:alert(1)",
          },
        },
      },
      "pt-br",
    );
    expect(sampleProfile.paragraphs[0]).toContain("Caio Barilli");
    expect(sampleProfile.sources.map((s) => s.url)).toEqual([
      "https://caiobarilli.github.io/pt-br/",
      "https://github.com/caiobarilli",
    ]);

    for (const tool of MCP_TOOL_NAMES) {
      const emptyFormatted = formatMcpResponse(tool, { meta: {}, data: {} }, "en");
      expect(emptyFormatted.tool).toBe(tool);
      expect(Array.isArray(emptyFormatted.paragraphs)).toBe(true);
      expect(Array.isArray(emptyFormatted.sources)).toBe(true);
    }
  });
});

describe("suggestion picker", () => {
  it("picks 6 unique suggestions from the 20-question bank", () => {
    const pool = getContent().askQuestions.map((q) => q.text.pt);
    const picked = pickRandomSuggestions(pool, 6);
    expect(picked).toHaveLength(6);
    expect(new Set(picked).size).toBe(6);
  });
});

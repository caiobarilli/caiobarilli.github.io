import type { Locale } from "@/content/types";

export const MCP_TOOL_NAMES = [
  "get_profile",
  "get_experience",
  "list_projects",
  "get_project",
  "get_stack",
  "get_articles",
] as const;

export type McpToolName = (typeof MCP_TOOL_NAMES)[number];

export type McpProjectSlug =
  | "keeptask"
  | "info4all"
  | "phporto"
  | "phparrot"
  | "uvalab"
  | "aws-terraform"
  | "nextjs-tailwind-store"
  | "mern"
  | "mean"
  | "nestauth";

export type McpRouteMatch = {
  supported: true;
  tool: McpToolName;
  args: Record<string, unknown>;
};

export type McpRouteUnsupported = {
  supported: false;
  reason: "empty" | "unsupported";
};

export type McpRouteResult = McpRouteMatch | McpRouteUnsupported;

export type McpEnvelopeMeta = {
  lang?: string;
  source_url?: string;
  data_version?: string;
  last_verified_at?: string;
  scope?: string;
};

export type McpEnvelope<T = Record<string, unknown>> = {
  meta?: McpEnvelopeMeta;
  data?: T;
};

export type AnswerSource = {
  label: string;
  url: string;
};

export type FormattedAnswer = {
  tool: McpToolName;
  paragraphs: string[];
  bullets: string[];
  sources: AnswerSource[];
  dataVersion?: string;
  lastVerifiedAt?: string;
};

export type McpErrorCode =
  | "NETWORK"
  | "TIMEOUT"
  | "ABORTED"
  | "HTTP_ERROR"
  | "PROTOCOL_ERROR"
  | "RPC_ERROR"
  | "PAYLOAD_TOO_LARGE";

export class McpClientError extends Error {
  readonly code: McpErrorCode;
  readonly status?: number;

  constructor(code: McpErrorCode, message: string, status?: number) {
    super(message);
    this.name = "McpClientError";
    this.code = code;
    this.status = status;
  }
}

export type McpLocale = Locale;

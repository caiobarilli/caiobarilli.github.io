"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/types";
import { callMcpTool } from "@/lib/mcp/client";
import { formatMcpResponse } from "@/lib/mcp/formatters";
import { routeQuestion } from "@/lib/mcp/router";
import { McpClientError, type FormattedAnswer } from "@/lib/mcp/types";

export type AskLabels = {
  eyebrowCmd: string;
  title: string;
  sub: string;
  placeholder: string;
  button: string;
  srHint: string;
  suggestionsLabel: string;
  suggestionsGroup: string;
  shuffle: string;
  sessionLabel: string;
  loading: string;
  sourcePrefix: string;
  unsupportedTitle: string;
  unsupportedBody: string;
  errorTitle: string;
  errorBody: string;
  retry: string;
  card1Question: string;
  card1Answer: string;
  card2Question: string;
  card2Answer: string;
};

type Props = {
  locale: Locale;
  questions: string[];
  labels: AskLabels;
};

type AskState =
  | { status: "idle" }
  | { status: "loading"; question: string }
  | { status: "answer"; question: string; answer: FormattedAnswer }
  | { status: "unsupported"; question: string }
  | { status: "error"; question: string; code: string };

const SUGGESTION_COUNT = 6;

export function pickRandomSuggestions(pool: string[], count: number, avoid?: string[]): string[] {
  const unique = Array.from(new Set(pool));
  if (unique.length <= count) return unique;

  const shuffled = [...unique];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = tmp;
  }

  const candidate = shuffled.slice(0, count);
  if (avoid && avoid.length === count && candidate.every((q) => avoid.includes(q))) {
    return shuffled.slice(count, count * 2).length === count ? shuffled.slice(count, count * 2) : shuffled.slice(1, count + 1);
  }
  return candidate;
}

function notifyTyping(typing: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<boolean>("cb:ask-typing", { detail: typing }));
}

export function AskSection({ locale, questions, labels }: Props) {
  const [query, setQuery] = useState("");
  // Deterministic initial slice for SSR hydration parity; shuffled client-side after mount.
  const [suggestions, setSuggestions] = useState<string[]>(() => questions.slice(0, SUGGESTION_COUNT));
  const [state, setState] = useState<AskState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setSuggestions(pickRandomSuggestions(questions, SUGGESTION_COUNT));
    });
    return () => window.cancelAnimationFrame(id);
  }, [questions]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      notifyTyping(false);
    };
  }, []);

  const executeQuestion = useCallback(
    async (rawText: string) => {
      const trimmed = rawText.trim();
      const question = trimmed || suggestions[0] || "";
      if (!question) return;

      setQuery(question);
      const route = routeQuestion(question, locale);

      abortRef.current?.abort();
      if (!route.supported) {
        setState({ status: "unsupported", question });
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;
      setState({ status: "loading", question });

      try {
        const envelope = await callMcpTool(route.tool, route.args, { signal: controller.signal });
        if (controller.signal.aborted) return;
        const answer = formatMcpResponse(route.tool, envelope, locale);
        setState({ status: "answer", question, answer });
      } catch (error) {
        if (error instanceof McpClientError && error.code === "ABORTED") {
          return;
        }
        const code = error instanceof McpClientError ? (error.status ? `${error.code} · ${error.status}` : error.code) : "NETWORK";
        setState({ status: "error", question, code });
      }
    },
    [locale, suggestions],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void executeQuestion(query);
  }

  function handleShuffle() {
    setSuggestions((prev) => pickRandomSuggestions(questions, SUGGESTION_COUNT, prev));
  }

  const isLoading = state.status === "loading";

  return (
    <section
      id="ask"
      aria-labelledby="h-ask"
      className="border-y border-line py-[clamp(52px,7.5vw,88px)]"
    >
      <p className="font-mono text-sm text-accent-text" aria-hidden="true">
        caio@mcp:~$ <span className="text-ink-2">{labels.eyebrowCmd}</span>
      </p>
      <h2
        id="h-ask"
        className="mt-2.5 mb-3.5 text-[clamp(30px,4.2vw,46px)] leading-[1.08] font-bold tracking-[-0.03em]"
      >
        {labels.title}
      </h2>
      <p className="max-w-[58ch] text-[16.5px] leading-[1.55] text-pretty text-muted">{labels.sub}</p>

      <form onSubmit={handleSubmit} className="mt-7 mb-3.5 flex max-w-[46rem] flex-col items-stretch gap-2.5 sm:flex-row">
        <div className="flex min-h-[52px] flex-1 items-center gap-2.5 rounded-full border border-line-strong bg-surface pr-2 pl-4 transition-colors focus-within:border-accent-line sm:pl-5">
          <label htmlFor="ask-input" className="flex-none font-mono text-sm whitespace-nowrap text-accent-text select-none">
            caio@wsl:~$
          </label>
          <input
            id="ask-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => notifyTyping(true)}
            onBlur={() => notifyTyping(false)}
            autoComplete="off"
            spellCheck={false}
            placeholder={labels.placeholder}
            aria-describedby="ask-hint"
            className="h-full min-w-0 flex-1 border-0 bg-transparent text-[15.5px] text-ink outline-none placeholder:text-faint"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="min-h-12 cursor-pointer rounded-full bg-btn px-7 text-[15px] font-semibold text-btn-ink transition-opacity hover:opacity-90 disabled:cursor-progress disabled:opacity-55 sm:min-h-[52px]"
        >
          {labels.button}
        </button>
      </form>
      <p id="ask-hint" className="sr-only">
        {labels.srHint}
      </p>

      <div className="flex max-w-[52rem] flex-wrap items-center gap-2" role="group" aria-label={labels.suggestionsGroup}>
        <span className="mr-1 text-[13px] text-faint">{labels.suggestionsLabel}</span>
        {suggestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => void executeQuestion(q)}
            className="min-h-9 cursor-pointer rounded-full border border-line-strong bg-transparent px-3.5 py-2 text-left font-mono text-[13px] leading-[1.3] text-ink-2 transition-colors hover:border-accent-line hover:text-accent-text"
          >
            {q}
          </button>
        ))}
        <button
          type="button"
          onClick={handleShuffle}
          className="min-h-9 cursor-pointer border-0 bg-transparent px-2 text-[13px] text-muted underline underline-offset-4 transition-colors hover:text-accent-text"
        >
          {labels.shuffle}
        </button>
      </div>

      {state.status === "loading" && (
        <div
          data-testid="ask-output-loading"
          aria-live="polite"
          className="mt-5 max-w-[46rem] overflow-hidden rounded-[14px] border border-line bg-stripe"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2 font-mono text-xs text-faint">
            <span>{labels.sessionLabel}</span>
            <span>mcp.caiobarilli.workers.dev</span>
          </div>
          <div className="px-5 py-4.5 font-mono text-[14.5px] leading-[1.65] text-ink-2">
            <span>{labels.loading}</span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[1.05em] w-[0.62em] bg-accent-text align-text-bottom animate-mcp-blink"
            />
          </div>
        </div>
      )}

      {state.status === "answer" && (
        <div
          data-testid="ask-output-answer"
          aria-live="polite"
          className="mt-5 max-w-[46rem] overflow-hidden rounded-[14px] border border-line bg-stripe"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2 font-mono text-xs text-faint">
            <span>{labels.sessionLabel}</span>
            <span>mcp · {state.answer.tool}</span>
          </div>
          <div className="space-y-3 px-5 pt-4.5 pb-4 text-[14.5px] leading-[1.65] text-ink-2">
            {state.answer.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {state.answer.bullets.length > 0 && (
              <ul className="space-y-1.5 pl-4 font-mono text-[13px] leading-[1.6] text-ink-2">
                {state.answer.bullets.map((bullet, index) => (
                  <li key={index} className="list-disc marker:text-accent-text">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {state.answer.sources.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line px-5 py-3 font-mono text-xs text-faint">
              <span>
                {labels.sourcePrefix} {state.answer.tool}
              </span>
              {state.answer.sources.map((src) => (
                <span key={src.url} className="inline-flex items-center gap-2">
                  <span aria-hidden="true">·</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-text underline-offset-4 hover:underline"
                  >
                    {src.label} ↗
                  </a>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {state.status === "unsupported" && (
        <div
          data-testid="ask-output-unsupported"
          aria-live="polite"
          className="mt-5 max-w-[46rem] overflow-hidden rounded-[14px] border border-line-strong bg-stripe"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2 font-mono text-xs text-faint">
            <span>{labels.sessionLabel}</span>
            <span>router · unsupported</span>
          </div>
          <div className="space-y-2 px-5 py-4.5 text-[14.5px] leading-[1.6] text-ink-2">
            <p className="font-mono text-sm font-medium text-ink">{labels.unsupportedTitle}</p>
            <p className="text-muted">{labels.unsupportedBody}</p>
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div
          data-testid="ask-output-error"
          aria-live="assertive"
          className="mt-5 max-w-[46rem] overflow-hidden rounded-[14px] border border-error bg-stripe"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2 font-mono text-xs text-faint">
            <span>caio@mcp</span>
            <span>{state.code}</span>
          </div>
          <div className="px-5 py-4.5">
            <p className="font-mono text-sm text-error">{labels.errorTitle}</p>
            <p className="mt-2 mb-3.5 text-[13.5px] leading-[1.55] text-muted">{labels.errorBody}</p>
            <button
              type="button"
              onClick={() => void executeQuestion(state.question)}
              className="min-h-10 cursor-pointer rounded-full border border-line-strong bg-transparent px-4 py-2 text-[13.5px] text-ink transition-colors hover:border-accent-line hover:text-accent-text"
            >
              {labels.retry}
            </button>
          </div>
        </div>
      )}

      <div className="mt-7 grid max-w-[52rem] grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2">
        <div className="bg-surface px-4.5 py-4">
          <h3 className="mb-2 font-mono text-[13px] font-semibold text-ink">{labels.card1Question}</h3>
          <p className="text-[13.5px] leading-[1.55] text-muted">{labels.card1Answer}</p>
        </div>
        <div className="bg-surface px-4.5 py-4">
          <h3 className="mb-2 font-mono text-[13px] font-semibold text-ink">{labels.card2Question}</h3>
          <p className="text-[13.5px] leading-[1.55] text-muted">{labels.card2Answer}</p>
        </div>
      </div>
    </section>
  );
}

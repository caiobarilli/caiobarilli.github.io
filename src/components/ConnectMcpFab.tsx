"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/types";
import { MCP_ENDPOINT } from "@/lib/mcp/client";

export type ConnectMcpLabels = {
  fabLabel: string;
  panelTitle: string;
  panelAria: string;
  close: string;
  desc: string;
  back: string;
  copy: string;
  copied: string;
  docs: string;
  toConfirm: string;
  foot: string;
  footDetail: string;
  gptSub: string;
  claudeSub: string;
  geminiSubPrefix: string;
};

type ProviderId = "chatgpt" | "claude" | "gemini";

type ProviderConfig = {
  id: ProviderId;
  name: string;
  vendor: string;
  docsUrl: string | { pt: string; en: string };
  steps: { pt: string[]; en: string[] };
  reqsLead: { pt: string; en: string };
  reqsBody: { pt: string; en: string };
  unconfirmedLabel?: { pt: string; en: string };
  unconfirmedNote?: { pt: string; en: string };
};

const PROVIDERS: ProviderConfig[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    vendor: "OpenAI",
    docsUrl: {
      pt: "https://help.openai.com/pt-br/articles/12584461-connecting-custom-mcp-servers-in-chatgpt",
      en: "https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt",
    },
    steps: {
      pt: [
        "No ChatGPT Web, acesse Plugins.",
        "Selecione + e escolha Adicionar servidor MCP personalizado.",
        "Informe um nome e uma descrição opcional.",
        "Insira o endpoint HTTPS público abaixo.",
        "Configure a autenticação conforme o servidor.",
        "Leia e aceite o aviso de risco.",
        "Crie como plugin e revise as ferramentas detectadas.",
      ],
      en: [
        "In ChatGPT on the web, open Plugins.",
        "Select + and choose Add custom MCP server.",
        "Enter a name and an optional description.",
        "Enter the public HTTPS endpoint below.",
        "Configure authentication as required by the server.",
        "Read and accept the risk warning.",
        "Create it as a plugin and review the detected tools.",
      ],
    },
    reqsLead: { pt: "Planos e permissões:", en: "Plans & permissions:" },
    reqsBody: {
      pt: "A documentação atual confirma permissões específicas no ChatGPT Web para Business (admins/owners do workspace) e Enterprise/Edu (via permissões/RBAC do workspace).",
      en: "Current docs confirm specific permissions on ChatGPT web for Business (workspace admins/owners) and Enterprise/Edu (via workspace permissions/RBAC).",
    },
    unconfirmedLabel: { pt: "Outros planos / região:", en: "Other plans / region:" },
    unconfirmedNote: {
      pt: "suporte para Plus, Pro ou contas individuais não confirmado nesta documentação.",
      en: "support for Plus, Pro or individual accounts is not confirmed in this documentation.",
    },
  },
  {
    id: "claude",
    name: "Claude",
    vendor: "Anthropic",
    docsUrl: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp",
    steps: {
      pt: [
        "Na claude.ai, abra Configurações → Plugins → Conectores.",
        "Abra o diálogo Adicionar conector personalizado.",
        "Dê um nome e cole a URL do endpoint MCP abaixo; confirme em Continuar.",
        "Na autenticação, escolha Sem login (No sign-in) quando essa opção aparecer — o servidor é público e não exige login. Mantenha as opções marcadas como Detectadas, salvo indicação da documentação oficial.",
        "Clique em Adicionar e habilite o conector pelo botão + nos chats → Conectores.",
        "Os nomes de menus podem variar por plano e idioma; no plano Free, o limite é 1 conector personalizado e não é necessário Team.",
      ],
      en: [
        "On claude.ai, open Settings → Plugins → Connectors.",
        "Open the Add custom connector dialog.",
        "Enter a name and paste the MCP endpoint URL below, then Continue.",
        "Under Authentication, choose No sign-in when that option appears — the server is public and requires no login. Keep options marked as Detected unless the official docs say otherwise.",
        "Click Add, then enable the connector from the + button in chats → Connectors.",
        "Menu names can vary by plan and language; on the Free plan, the limit is 1 custom connector and Team is not required.",
      ],
    },
    reqsLead: { pt: "Planos:", en: "Plans:" },
    reqsBody: {
      pt: "Free (limite de 1 conector personalizado), Pro, Max, Ultra, Team e Enterprise. Team/Enterprise: um Owner adiciona para a organização.",
      en: "Free (1 custom connector limit), Pro, Max, Ultra, Team and Enterprise. Team/Enterprise: an Owner adds it for the org.",
    },
  },
  {
    id: "gemini",
    name: "Gemini",
    vendor: "Google",
    docsUrl: "https://google-gemini.github.io/gemini-cli/docs/tools/mcp-server.html",
    steps: {
      pt: [
        "Instale o Gemini CLI (terminal) — é nele que o MCP remoto se conecta hoje.",
        "Edite ~/.gemini/settings.json e adicione o bloco mcpServers apontando para o endpoint HTTP.",
        "Confira a sintaxe de servidor remoto na documentação oficial (varia por versão).",
        "No CLI, rode /mcp para conferir se as ferramentas aparecem.",
      ],
      en: [
        "Install the Gemini CLI (terminal) — that's where remote MCP connects today.",
        "Edit ~/.gemini/settings.json and add an mcpServers block pointing to the HTTP endpoint.",
        "Check the remote-server syntax in the official docs (it varies by version).",
        "In the CLI, run /mcp to verify the tools show up.",
      ],
    },
    reqsLead: { pt: "Onde:", en: "Where:" },
    reqsBody: {
      pt: "Gemini CLI (gratuito).",
      en: "Gemini CLI (free).",
    },
    unconfirmedLabel: { pt: "App web / região:", en: "Web app / region:" },
    unconfirmedNote: {
      pt: "suporte a MCP remoto personalizado no app web não confirmado.",
      en: "custom remote MCP support in the web app is not confirmed.",
    },
  },
];

function ProviderLogo({ id, size = 19 }: { id: ProviderId; size?: number }) {
  if (id === "chatgpt") {
    return (
      <svg width={size} height={size} viewBox="0 0 2406 2406" fill="currentColor" aria-hidden="true">
        <path d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z" />
        <path
          transform="rotate(60 1203 1203)"
          d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z"
        />
        <path
          transform="rotate(120 1203 1203)"
          d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z"
        />
        <path
          transform="rotate(180 1203 1203)"
          d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z"
        />
        <path
          transform="rotate(240 1203 1203)"
          d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z"
        />
        <path
          transform="rotate(300 1203 1203)"
          d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z"
        />
      </svg>
    );
  }
  if (id === "claude") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
    </svg>
  );
}

type Props = {
  locale: Locale;
  labels: ConnectMcpLabels;
};

export function ConnectMcpFab({ locale, labels }: Props) {
  const lang = locale === "en" ? "en" : "pt";
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<ProviderId | null>(null);
  const [copied, setCopied] = useState(false);
  const [typing, setTyping] = useState(false);

  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const selected = selectedId ? PROVIDERS.find((p) => p.id === selectedId) ?? null : null;

  const closePanel = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    setSelectedId(null);
    if (restoreFocus) {
      fabRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const onTyping = (event: Event) => {
      const detail = (event as CustomEvent<boolean>).detail;
      setTyping(Boolean(detail));
    };
    window.addEventListener("cb:ask-typing", onTyping);
    return () => {
      window.removeEventListener("cb:ask-typing", onTyping);
      clearTimeout(copyTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel(true);
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
        if (focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!panelRef.current?.contains(target) && !fabRef.current?.contains(target)) {
        closePanel(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, closePanel]);

  useEffect(() => {
    if (!open) return;
    if (selectedId) {
      backBtnRef.current?.focus();
    } else {
      closeBtnRef.current?.focus();
    }
  }, [open, selectedId]);

  async function handleCopy() {
    clearTimeout(copyTimerRef.current);
    try {
      await navigator.clipboard.writeText(MCP_ENDPOINT);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = MCP_ENDPOINT;
      ta.setAttribute("readonly", "");
      ta.className = "fixed -left-[9999px]";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // Ignore if copy is blocked in restricted contexts.
      }
      ta.remove();
    }
    setCopied(true);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="fixed right-[clamp(14px,3vw,28px)] bottom-[clamp(14px,3vw,28px)] z-40">
      {open && (
        <div
          ref={panelRef}
          id="mcp-connect-panel"
          role="dialog"
          aria-label={labels.panelAria}
          aria-modal="false"
          className="absolute right-0 bottom-[calc(100%+12px)] w-[min(360px,calc(100vw-28px))] overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
        >
          {!selected ? (
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-line px-4.5 pt-3.5 pb-3">
                <b className="inline-flex items-center gap-2 font-mono text-[13.5px] font-semibold text-ink">
                  <span aria-hidden="true" className="inline-block size-[7px] rounded-full bg-accent-text" />
                  {labels.panelTitle}
                </b>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => closePanel(true)}
                  aria-label={labels.close}
                  className="cursor-pointer rounded-md border-0 bg-transparent px-1.5 py-1 text-base leading-none text-faint hover:text-ink"
                >
                  ✕
                </button>
              </div>
              <p className="border-b border-line px-4.5 py-3 text-[13px] leading-[1.5] text-muted">{labels.desc}</p>

              <div>
                {PROVIDERS.map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => setSelectedId(prov.id)}
                    className="flex w-full cursor-pointer items-center gap-3 border-0 border-b border-line bg-transparent px-4.5 py-3 text-left text-ink transition-colors last:border-b-0 hover:bg-stripe"
                  >
                    <span className="grid size-[34px] flex-none place-items-center rounded-[10px] border border-line-strong text-ink-2">
                      <ProviderLogo id={prov.id} size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-sm font-semibold">{prov.name}</b>
                      <span className="block truncate text-xs text-faint">
                        {prov.id === "chatgpt" && labels.gptSub}
                        {prov.id === "claude" && labels.claudeSub}
                        {prov.id === "gemini" && (
                          <>
                            {labels.geminiSubPrefix}{" "}
                            <span className="inline-block rounded-md border border-dashed border-demo px-1.5 py-px text-[10.5px] font-semibold tracking-wider text-demo">
                              {labels.toConfirm}
                            </span>
                          </>
                        )}
                      </span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none text-faint">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                ))}
              </div>

              <p className="border-t border-line px-4.5 pt-3 pb-4 text-xs leading-[1.55] text-muted">{labels.foot}</p>
            </div>
          ) : (
            <div role="region" aria-labelledby="mcp-detail-title">
              <div className="flex items-center justify-between px-4.5 pt-3">
                <button
                  ref={backBtnRef}
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-[13px] text-muted hover:text-accent-text"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                  <span>{labels.back}</span>
                </button>
                <button
                  type="button"
                  onClick={() => closePanel(true)}
                  aria-label={labels.close}
                  className="cursor-pointer rounded-md border-0 bg-transparent px-1.5 py-1 text-base leading-none text-faint hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-3 px-4.5 pt-2.5 pb-1.5">
                <span className="grid size-10 flex-none place-items-center rounded-xl border border-line-strong text-accent-text">
                  <ProviderLogo id={selected.id} size={22} />
                </span>
                <div>
                  <b id="mcp-detail-title" className="block text-[15px] font-semibold text-ink">
                    {selected.name}
                  </b>
                  <span className="block text-xs text-faint">{selected.vendor}</span>
                </div>
              </div>

              <ol className="space-y-2.5 px-4.5 pt-2 pb-1">
                {selected.steps[lang].map((step, index) => (
                  <li key={index} className="relative pl-7.5 text-[13.5px] leading-[1.5] text-ink-2">
                    <span
                      aria-hidden="true"
                      className="absolute top-0.5 left-0 grid size-5 place-items-center rounded-[7px] border border-line-strong font-mono text-[11px] text-accent-text"
                    >
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="mx-4.5 mt-2 mb-3 flex items-center gap-2.5 rounded-[10px] border border-line bg-stripe px-3 py-2.5">
                <span className="flex-1 overflow-x-auto font-mono text-[11.5px] leading-[1.4] whitespace-nowrap text-ink-2">
                  {MCP_ENDPOINT}
                </span>
                <button
                  type="button"
                  onClick={() => void handleCopy()}
                  className={`inline-flex flex-none cursor-pointer items-center gap-1.5 rounded-lg border bg-surface px-2.5 py-1.5 text-xs transition-colors ${
                    copied ? "border-accent-line text-accent-text" : "border-line-strong text-ink hover:border-accent-line hover:text-accent-text"
                  }`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {copied ? (
                      <path d="m5 13 4 4L19 7" />
                    ) : (
                      <path d="M9 9h10v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Zm3-4H5a2 2 0 0 0-2 2v10" />
                    )}
                  </svg>
                  <span>{copied ? labels.copied : labels.copy}</span>
                </button>
              </div>
              <span aria-live="polite" className="sr-only">
                {copied ? labels.copied : ""}
              </span>

              <p className="px-4.5 pb-3 text-[12.5px] leading-[1.6] text-muted">
                <b className="font-semibold text-ink-2">{selected.reqsLead[lang]}</b> {selected.reqsBody[lang]}
                {selected.unconfirmedLabel && (
                  <>
                    {" "}
                    <b className="font-semibold text-ink-2">{selected.unconfirmedLabel[lang]}</b>{" "}
                    <span className="inline-block rounded-md border border-dashed border-demo px-1.5 py-px text-[10.5px] font-semibold tracking-wider whitespace-nowrap text-demo">
                      {labels.toConfirm}
                    </span>
                    {selected.unconfirmedNote ? ` — ${selected.unconfirmedNote[lang]}` : "."}
                  </>
                )}
              </p>

              <a
                href={typeof selected.docsUrl === "string" ? selected.docsUrl : selected.docsUrl[lang]}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4.5 mb-3 flex items-center justify-between border-t border-line pt-3 text-[13px] text-ink-2 hover:text-accent-text"
              >
                <span>{labels.docs}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 5h5v5m0-5-8 8M9 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
                </svg>
              </a>

              <p className="border-t border-line px-4.5 pt-3 pb-4 text-xs leading-[1.55] text-muted">
                {labels.footDetail}
              </p>
            </div>
          )}
        </div>
      )}

      <button
        ref={fabRef}
        type="button"
        aria-expanded={open}
        aria-controls="mcp-connect-panel"
        onClick={() => (open ? closePanel(false) : setOpen(true))}
        className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border bg-surface px-4 py-2.5 font-mono text-[13px] text-ink shadow-lg transition-all hover:border-accent-line ${
          open ? "border-accent-line" : "border-line-strong"
        } ${typing && !open ? "pointer-events-none translate-y-1.5 opacity-0" : "opacity-100"}`}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-accent-text">
          <path d="M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V8Zm5 8v5" />
        </svg>
        <span>{labels.fabLabel}</span>
      </button>
    </div>
  );
}

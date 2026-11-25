import type { Locale } from "@/content/types";
import type { McpProjectSlug, McpRouteResult } from "./types";

function normalizeQuery(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const PROJECT_SLUG_PATTERNS: { slug: McpProjectSlug; pattern: RegExp }[] = [
  { slug: "keeptask", pattern: /\bkeeptask\b/ },
  { slug: "info4all", pattern: /\b(info4all|datalake|data lake)\b/ },
  { slug: "phporto", pattern: /\b(phporto|hyper-?v)\b/ },
  { slug: "phparrot", pattern: /\b(phparrot|ollama|ia local|local ai)\b/ },
  { slug: "uvalab", pattern: /\b(uvalab|sage theme)\b/ },
  { slug: "aws-terraform", pattern: /\b(aws-terraform|terraform\b.*\baws|aws\b.*\bterraform)\b/ },
  { slug: "nextjs-tailwind-store", pattern: /\b(nextjs-tailwind-store|e-?commerce|loja virtual|online store)\b/ },
  { slug: "nestauth", pattern: /\bnestauth\b/ },
  { slug: "mern", pattern: /\bmern\b/ },
  { slug: "mean", pattern: /\bmean\b/ },
];

/**
 * Deterministic intent router for V1.
 * Maps only supported portfolio intents to one of the 6 real MCP tools.
 * Never guesses a tool for out-of-scope questions.
 */
export function routeQuestion(rawQuestion: string, locale: Locale): McpRouteResult {
  const q = normalizeQuery(rawQuestion);
  if (!q) {
    return { supported: false, reason: "empty" };
  }

  // 1. Specific project case study (`get_project`)
  for (const { slug, pattern } of PROJECT_SLUG_PATTERNS) {
    if (pattern.test(q)) {
      return {
        supported: true,
        tool: "get_project",
        args: { slug, lang: locale },
      };
    }
  }

  // 2. Selected Medium articles (`get_articles`)
  if (/\b(artigo|artigos|article|articles|medium|publicou|published|escreveu|wrote|nativephp|post|posts)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_articles",
      args: { lang: locale, limit: 3 },
    };
  }

  // 3. Experience, career history, education & certifications (`get_experience`)
  if (/\b(mba|fiap|senac|formacao|graduacao|faculdade|education|degree|university|academica)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_experience",
      args: { lang: locale, section: "education" },
    };
  }

  if (/\b(certificac\w*|certificado\w*|certification\w*|curso|cursos|course|courses|licenca\w*|license\w*)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_experience",
      args: { lang: locale, section: "certifications" },
    };
  }

  if (/\b(keepcloud|agronegociar)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_experience",
      args: { lang: locale, section: "primary" },
    };
  }

  if (/\b(tech lead|lider tecnic\w*|anterior\w*|earlier)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_experience",
      args: { lang: locale, section: "earlier" },
    };
  }

  if (/\b(experienc\w*|carreira|career|tempo de|quantos anos|how many years|how much\b.*\bexperience|trabalhou|worked|emprego|jobs|historico|history|wsl|windows)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_experience",
      args: { lang: locale, section: "all" },
    };
  }

  // 4. Tech stack, DevOps, AI agents & testing (`get_stack`)
  if (/\b(agente|agentes|agent|agents|agentic|ia\b|ai\b|llm)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_stack",
      args: { lang: locale, domain: "ai-agents" },
    };
  }

  if (/\b(devops|docker|terraform|aws|infra\w*|deploy\w*|ci\/cd|cicd|github actions|cloud|provisiona\w*|linux)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_stack",
      args: { lang: locale, domain: "devops-iac" },
    };
  }

  if (/\b(testa\w*|teste\w*|test|tests|testing|pest|phpunit|phpstan|qualidade|quality|backend|back-end|livewire|inertia|mysql|redis|horizon)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_stack",
      args: { lang: locale, domain: "backend" },
    };
  }

  if (/\b(stack principal|main stack|primary stack|foco principal)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_stack",
      args: { lang: locale, focus: "primary" },
    };
  }

  if (/\b(stack|tecnolog\w*|tech|ferramenta\w*|tool|tools|linguage\w*|language\w*|php|laravel|typescript|javascript|wordpress|node|nextjs|nestjs|angular|python)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_stack",
      args: { lang: locale },
    };
  }

  // 5. Projects list (`list_projects`)
  if (/\b(projeto|projetos|project|projects|portfolio|destaque|featured|flagship|case stud\w*|estudo\w* de caso)\b/.test(q)) {
    const args: Record<string, unknown> = { lang: locale };
    if (/\b(destaque|featured|flagship|principais|main)\b/.test(q)) {
      args.tier = "flagship";
    }
    return {
      supported: true,
      tool: "list_projects",
      args,
    };
  }

  // 6. Profile, availability, story & contact (`get_profile`)
  if (/\b(historia|story|trajetoria|journey)\b/.test(q)) {
    return {
      supported: true,
      tool: "get_profile",
      args: { lang: locale, include_story: true },
    };
  }

  if (
    /\b(quem e|who is|sobre o caio|about caio|perfil|profile|resumo|summary|vaga|vagas|role|roles|disponiv\w*|available|availability|aberto a|open to|contato|contact|falar com|reach|linkedin|github|fuso|timezone)\b/.test(
      q,
    )
  ) {
    return {
      supported: true,
      tool: "get_profile",
      args: { lang: locale },
    };
  }

  return { supported: false, reason: "unsupported" };
}

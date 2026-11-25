import type { Locale } from "@/content/types";
import type { AnswerSource, FormattedAnswer, McpEnvelope, McpToolName } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function addSource(sources: AnswerSource[], seen: Set<string>, label: string, url: unknown): void {
  const safeUrl = asString(url);
  if (!safeUrl || seen.has(safeUrl)) return;
  if (!safeUrl.startsWith("https://") && !safeUrl.startsWith("http://")) return;
  seen.add(safeUrl);
  sources.push({ label, url: safeUrl });
}

function shortUrlLabel(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function formatProfile(envelope: McpEnvelope, locale: Locale): FormattedAnswer {
  const pt = locale === "pt-br";
  const data = isRecord(envelope.data) ? envelope.data : {};
  const paragraphs: string[] = [];
  const bullets: string[] = [];
  const sources: AnswerSource[] = [];
  const seen = new Set<string>();

  const name = asString(data.name);
  const headline = asString(data.headline);
  const years = asString(data.years_experience);
  const tz = asString(data.timezone);
  const summary = asString(data.summary);
  const availability = asString(data.availability);
  const focus = asStringArray(data.current_focus);
  const story = asStringArray(data.story);

  const headerParts = [name, headline].filter(Boolean).join(" — ");
  const metaParts = [years ? (pt ? `${years} anos de experiência` : `${years} years of experience`) : undefined, tz].filter(Boolean).join(" · ");
  if (headerParts || metaParts) {
    paragraphs.push([headerParts, metaParts].filter(Boolean).join(" · "));
  }
  if (summary) paragraphs.push(summary);
  if (availability) paragraphs.push(pt ? `Disponibilidade: ${availability}` : `Availability: ${availability}`);
  for (const item of focus) {
    bullets.push(item);
  }
  if (story.length > 0) {
    paragraphs.push(story[0]!);
  }

  const links = isRecord(data.links) ? data.links : {};
  addSource(sources, seen, pt ? "Portfólio" : "Portfolio", links.portfolio ?? envelope.meta?.source_url);
  addSource(sources, seen, pt ? "Contato" : "Contact", links.contact_page);
  addSource(sources, seen, "GitHub", links.github);
  addSource(sources, seen, "LinkedIn", links.linkedin);
  addSource(sources, seen, "Medium", links.medium);

  return {
    tool: "get_profile",
    paragraphs,
    bullets,
    sources,
    dataVersion: asString(envelope.meta?.data_version),
    lastVerifiedAt: asString(envelope.meta?.last_verified_at),
  };
}

function formatExperience(envelope: McpEnvelope, locale: Locale): FormattedAnswer {
  const pt = locale === "pt-br";
  const data = isRecord(envelope.data) ? envelope.data : {};
  const paragraphs: string[] = [];
  const bullets: string[] = [];
  const sources: AnswerSource[] = [];
  const seen = new Set<string>();

  const primary = Array.isArray(data.primary_roles) ? data.primary_roles.filter(isRecord) : [];
  const earlier = Array.isArray(data.earlier_roles) ? data.earlier_roles.filter(isRecord) : [];
  const education = Array.isArray(data.education) ? data.education.filter(isRecord) : [];
  const certifications = Array.isArray(data.certifications) ? data.certifications.filter(isRecord) : [];

  if (primary.length > 0) {
    paragraphs.push(pt ? "Experiência principal:" : "Primary experience:");
    for (const role of primary) {
      const title = asString(role.role);
      const company = asString(role.company);
      const period = asString(role.period);
      const summary = asString(role.summary);
      const stack = asStringArray(role.stack);
      const line = [[title, company].filter(Boolean).join(" @ "), period ? `(${period})` : undefined].filter(Boolean).join(" ");
      const details = [summary, stack.length > 0 ? `Stack: ${stack.slice(0, 6).join(", ")}` : undefined].filter(Boolean).join(" ");
      if (line || details) {
        bullets.push([line, details].filter(Boolean).join(" — "));
      }
      addSource(sources, seen, company ?? "Company", role.company_url);
    }
  }

  if (earlier.length > 0) {
    const leadRoles = earlier.filter((r) => r.is_tech_lead === true);
    if (primary.length === 0) {
      paragraphs.push(
        pt
          ? `Experiências anteriores (${earlier.length} funções, incluindo ${leadRoles.length} como Tech Lead):`
          : `Earlier roles (${earlier.length} positions, including ${leadRoles.length} as Tech Lead):`,
      );
      for (const role of earlier.slice(0, 6)) {
        const title = asString(role.role);
        const company = asString(role.company);
        const period = asString(role.period);
        const summary = asString(role.summary);
        const head = [[title, company].filter(Boolean).join(" @ "), period ? `(${period})` : undefined].filter(Boolean).join(" ");
        bullets.push([head, summary].filter(Boolean).join(" — "));
      }
    } else if (leadRoles.length > 0) {
      bullets.push(
        pt
          ? `Também atuou em ${earlier.length} funções anteriores (incluindo ${leadRoles.length} como Tech Lead).`
          : `Also held ${earlier.length} earlier roles (including ${leadRoles.length} as Tech Lead).`,
      );
    }
  }

  if (education.length > 0) {
    if (primary.length === 0 && earlier.length === 0) {
      paragraphs.push(pt ? "Formação acadêmica:" : "Formal education:");
    }
    for (const edu of education) {
      const degree = asString(edu.degree);
      const institution = asString(edu.institution);
      const period = asString(edu.period);
      const status = asString(edu.status);
      const line = [degree, institution, period, status].filter(Boolean).join(" · ");
      if (line) bullets.push(line);
    }
  }

  if (certifications.length > 0 && primary.length === 0 && earlier.length === 0 && education.length === 0) {
    paragraphs.push(pt ? `Certificações e cursos (${certifications.length}):` : `Certifications and courses (${certifications.length}):`);
    for (const cert of certifications.slice(0, 8)) {
      const title = asString(cert.title);
      const issuer = asString(cert.issuer);
      const date = asString(cert.date);
      const line = [title, issuer, date].filter(Boolean).join(" · ");
      if (line) bullets.push(line);
    }
  }

  addSource(sources, seen, envelope.meta?.source_url ? shortUrlLabel(envelope.meta.source_url) : pt ? "Experiência" : "Experience", envelope.meta?.source_url);

  return {
    tool: "get_experience",
    paragraphs,
    bullets,
    sources,
    dataVersion: asString(envelope.meta?.data_version),
    lastVerifiedAt: asString(envelope.meta?.last_verified_at),
  };
}

function formatProjectsList(envelope: McpEnvelope, locale: Locale): FormattedAnswer {
  const pt = locale === "pt-br";
  const data = isRecord(envelope.data) ? envelope.data : {};
  const projects = Array.isArray(data.projects) ? data.projects.filter(isRecord) : [];
  const paragraphs: string[] = [];
  const bullets: string[] = [];
  const sources: AnswerSource[] = [];
  const seen = new Set<string>();

  if (projects.length === 0) {
    paragraphs.push(pt ? "Nenhum projeto encontrado para esse filtro." : "No projects matched that filter.");
  } else {
    paragraphs.push(
      pt
        ? `${projects.length} projetos documentados retornados pelo MCP:`
        : `${projects.length} documented projects returned by the MCP:`,
    );
    for (const p of projects) {
      const title = asString(p.title) ?? asString(p.slug);
      const year = asString(p.year);
      const summary = asString(p.summary);
      const stack = asStringArray(p.stack);
      const head = [title, year ? `(${year})` : undefined].filter(Boolean).join(" ");
      const tail = [summary, stack.length > 0 ? `[${stack.slice(0, 4).join(", ")}]` : undefined].filter(Boolean).join(" ");
      if (head || tail) {
        bullets.push([head, tail].filter(Boolean).join(" — "));
      }
    }
  }

  addSource(sources, seen, envelope.meta?.source_url ? shortUrlLabel(envelope.meta.source_url) : pt ? "Projetos" : "Projects", envelope.meta?.source_url);
  for (const p of projects.slice(0, 3)) {
    const title = asString(p.title) ?? asString(p.slug) ?? "Project";
    addSource(sources, seen, title, p.case_study_url);
  }

  return {
    tool: "list_projects",
    paragraphs,
    bullets,
    sources,
    dataVersion: asString(envelope.meta?.data_version),
    lastVerifiedAt: asString(envelope.meta?.last_verified_at),
  };
}

function formatProject(envelope: McpEnvelope, locale: Locale): FormattedAnswer {
  const pt = locale === "pt-br";
  const data = isRecord(envelope.data) ? envelope.data : {};
  const paragraphs: string[] = [];
  const bullets: string[] = [];
  const sources: AnswerSource[] = [];
  const seen = new Set<string>();

  const title = asString(data.title);
  const year = asString(data.year);
  const type = asString(data.type);
  const status = asString(data.status);
  const summary = asString(data.summary);
  const role = asString(data.role_and_ownership);
  const solution = asString(data.solution);
  const stack = asStringArray(data.stack);
  const highlights = asStringArray(data.highlights);

  const head = [title, year, type, status].filter(Boolean).join(" · ");
  if (head) paragraphs.push(head);
  if (summary) paragraphs.push(summary);
  if (role) paragraphs.push(role);
  else if (solution) paragraphs.push(solution);

  if (stack.length > 0) {
    bullets.push(`Stack: ${stack.join(", ")}`);
  }
  for (const h of highlights.slice(0, 3)) {
    bullets.push(h);
  }

  const links = isRecord(data.links) ? data.links : {};
  addSource(sources, seen, pt ? "Estudo de caso" : "Case study", links.case_study ?? envelope.meta?.source_url);
  addSource(sources, seen, "GitHub", links.repository);
  addSource(sources, seen, pt ? "Site do produto" : "Product site", links.product_site);

  return {
    tool: "get_project",
    paragraphs,
    bullets,
    sources,
    dataVersion: asString(envelope.meta?.data_version),
    lastVerifiedAt: asString(envelope.meta?.last_verified_at),
  };
}

function formatStack(envelope: McpEnvelope, locale: Locale): FormattedAnswer {
  const pt = locale === "pt-br";
  const data = isRecord(envelope.data) ? envelope.data : {};
  const items = Array.isArray(data.items) ? data.items.filter(isRecord) : [];
  const paragraphs: string[] = [];
  const bullets: string[] = [];
  const sources: AnswerSource[] = [];
  const seen = new Set<string>();

  if (items.length === 0) {
    paragraphs.push(pt ? "Nenhum item de stack retornado para esse filtro." : "No stack items returned for that filter.");
  } else {
    const primary = items.filter((item) => item.focus === "primary");
    const secondary = items.filter((item) => item.focus !== "primary");

    if (primary.length > 0) {
      paragraphs.push(
        pt
          ? `Tecnologias principais em produção (${primary.length}):`
          : `Primary production stack (${primary.length}):`,
      );
      for (const item of primary) {
        const name = asString(item.name);
        const notes = asString(item.notes);
        if (name) {
          bullets.push(notes ? `${name} — ${notes}` : name);
        }
      }
    }

    if (secondary.length > 0) {
      const names = secondary.map((item) => asString(item.name)).filter(Boolean).join(", ");
      if (names) {
        paragraphs.push(
          pt
            ? `Outras tecnologias de projetos anteriores/estudo: ${names}.`
            : `Earlier / secondary technologies: ${names}.`,
        );
      }
    }
  }

  addSource(sources, seen, envelope.meta?.source_url ? shortUrlLabel(envelope.meta.source_url) : pt ? "Portfólio" : "Portfolio", envelope.meta?.source_url);

  return {
    tool: "get_stack",
    paragraphs,
    bullets,
    sources,
    dataVersion: asString(envelope.meta?.data_version),
    lastVerifiedAt: asString(envelope.meta?.last_verified_at),
  };
}

function formatArticles(envelope: McpEnvelope, locale: Locale): FormattedAnswer {
  const pt = locale === "pt-br";
  const data = isRecord(envelope.data) ? envelope.data : {};
  const articles = Array.isArray(data.articles) ? data.articles.filter(isRecord) : [];
  const paragraphs: string[] = [];
  const bullets: string[] = [];
  const sources: AnswerSource[] = [];
  const seen = new Set<string>();

  if (articles.length === 0) {
    paragraphs.push(pt ? "Nenhum artigo retornado." : "No articles returned.");
  } else {
    paragraphs.push(
      pt
        ? `${articles.length} artigos selecionados no Medium:`
        : `${articles.length} selected articles on Medium (published in Portuguese):`,
    );
    for (const article of articles) {
      const title = asString(article.title);
      const date = asString(article.published_at);
      const summary = asString(article.summary);
      const head = [title, date ? `(${date})` : undefined].filter(Boolean).join(" ");
      if (head || summary) {
        bullets.push([head, summary].filter(Boolean).join(" — "));
      }
      addSource(sources, seen, title ?? "Medium", article.url);
    }
  }

  addSource(sources, seen, pt ? "Portfólio" : "Portfolio", envelope.meta?.source_url);

  return {
    tool: "get_articles",
    paragraphs,
    bullets,
    sources,
    dataVersion: asString(envelope.meta?.data_version),
    lastVerifiedAt: asString(envelope.meta?.last_verified_at),
  };
}

export function formatMcpResponse(tool: McpToolName, envelope: McpEnvelope, locale: Locale): FormattedAnswer {
  switch (tool) {
    case "get_profile":
      return formatProfile(envelope, locale);
    case "get_experience":
      return formatExperience(envelope, locale);
    case "list_projects":
      return formatProjectsList(envelope, locale);
    case "get_project":
      return formatProject(envelope, locale);
    case "get_stack":
      return formatStack(envelope, locale);
    case "get_articles":
      return formatArticles(envelope, locale);
  }
}

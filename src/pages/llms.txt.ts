import type { APIRoute } from "astro";
import { PEOPLE, SERVICES, SITE } from "../data/content";
import { getArticlesByKind, KIND_LABELS, type KnowledgeKind } from "../lib/sanity";

// llms.txt (llmstxt.org): a plain-Markdown map of the site for AI assistants,
// built from the same data as the pages so it never drifts.
export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => new URL(path, site).toString();
  const kinds: KnowledgeKind[] = ["publication", "news", "event"];
  const articles = (await Promise.all(kinds.map(getArticlesByKind))).flat();

  const lines = [
    `# ${SITE.name}`,
    "",
    "> A law firm based in Kumasi, Ghana, advising local and international clients on matters where law, business and regulation meet. Founded 2025.",
    "",
    `- Address: ${SITE.address}, Ghana`,
    `- Telephone: +233 ${SITE.phone1.substring(1)}; +233 ${SITE.phone2.substring(1)}`,
    `- Email: ${SITE.email}`,
    `- Contact page: ${url("/contact/")}`,
    "",
    "## Practice areas",
    ...SERVICES.map((s) => `- [${s.title}](${url(`/expertise/${s.slug}/`)}): ${s.description}`),
    "",
    "## People",
    ...PEOPLE.map((p) => `- [${p.name}](${url(`/people/${p.slug}/`)}): ${p.title}${p.excerpt ? `. ${p.excerpt}` : ""}`),
    "",
    ...(articles.length > 0
      ? [
          "## Knowledge Centre",
          ...articles.map(
            (a) => `- [${a.title}](${url(`/knowledge/${a.slug}/`)}): ${KIND_LABELS[a.kind].singular}, ${a.date}${a.excerpt ? `. ${a.excerpt}` : ""}`
          ),
          "",
        ]
      : []),
    "## Optional",
    `- [About the firm](${url("/about/")})`,
    `- [Join us](${url("/join-us/")}): applications from interns, pupils, associates and staff`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};

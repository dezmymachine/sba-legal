import type { APIRoute } from "astro";
import { INDEXABLE } from "../lib/seo";

// Answer engines that cite and link back are allowed explicitly; everything else
// (including AI training crawlers) falls under `*`. To opt out of training, add
// e.g. `User-agent: GPTBot` / `User-agent: Google-Extended` / `User-agent: ClaudeBot`
// groups with `Disallow: /`.
const AI_SEARCH_BOTS = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot", "Claude-User"];

export const GET: APIRoute = ({ site }) => {
  const body = INDEXABLE
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        ...AI_SEARCH_BOTS.map((bot) => `User-agent: ${bot}`),
        "Allow: /",
        "",
        `Sitemap: ${new URL("sitemap-index.xml", site)}`,
        "",
      ]
    : ["# Staging / preview build — not for search engines.", "User-agent: *", "Disallow: /", ""];
  return new Response(body.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};

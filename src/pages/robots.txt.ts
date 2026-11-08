import type { APIRoute } from "astro";
import { INDEXABLE } from "../lib/seo";

// Policy (decided 2026-11-08): allow everything, including AI training crawlers, so the
// firm can appear in AI answers. Listed explicitly so the choice is deliberate. To opt out
// of training later, move GPTBot / ClaudeBot / Google-Extended to a `Disallow: /` group.
const AI_SEARCH_BOTS = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User", "meta-webindexer"];
const AI_TRAINING_BOTS = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended"];

export const GET: APIRoute = ({ site }) => {
  const body = INDEXABLE
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        ...AI_SEARCH_BOTS.map((bot) => `User-agent: ${bot}`),
        "Allow: /",
        "",
        ...AI_TRAINING_BOTS.map((bot) => `User-agent: ${bot}`),
        "Allow: /",
        "",
        `Sitemap: ${new URL("sitemap-index.xml", site)}`,
        "",
      ]
    : ["# Staging / preview build — not for search engines.", "User-agent: *", "Disallow: /", ""];
  return new Response(body.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};

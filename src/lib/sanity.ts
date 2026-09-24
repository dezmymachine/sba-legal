import { createClient } from "@sanity/client";
import { ARTICLES, PRACTICES, PEOPLE } from "../data/content";

// Sanity-ready data layer.
// If SANITY env vars are set, these fetch from Sanity.
// Otherwise they fall back to local mock content so the
// site builds and previews without CMS credentials.

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";

const client =
  projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2026-01-01",
        useCdn: true,
      })
    : null;

export type KnowledgeKind = "publication" | "news" | "event";

export interface ArticleAuthor {
  name: string;
  title: string;
  slug: string;
  image: string;
}

export interface Article {
  title: string;
  slug: string;
  kind: KnowledgeKind;
  date: string;
  excerpt?: string;
  heroImage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  author: ArticleAuthor | null;
}

export const KIND_LABELS: Record<KnowledgeKind, { singular: string; plural: string }> = {
  publication: { singular: "Publication", plural: "Publications" },
  news: { singular: "News", plural: "News" },
  event: { singular: "Event", plural: "Events" },
};

// "2026-08-20" -> "August 20, 2026". Noon guard avoids TZ day-shift on date-only strings.
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function resolveMockAuthor(authorSlug?: string): ArticleAuthor | null {
  if (!authorSlug) return null;
  const p = PEOPLE.find((person) => person.slug === authorSlug);
  if (!p) return null;
  return { name: p.name, title: p.title, slug: p.slug, image: p.image };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeMock(a: any): Article {
  return {
    title: a.title,
    slug: a.slug,
    kind: a.kind,
    date: a.date,
    excerpt: a.excerpt,
    heroImage: a.heroImage,
    body: a.body,
    author: resolveMockAuthor(a.authorSlug),
  };
}

const byDateDesc = (a: Article, b: Article) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

const ARTICLE_FIELDS = `title, "slug": slug.current, kind, date, excerpt, "heroImage": heroImage.asset->url, "author": author->{name, title, "slug": slug.current, "image": photo.asset->url}`;

// Latest 3 across all kinds — homepage Knowledge Centre.
export async function getArticles(): Promise<Article[]> {
  const fallback = ARTICLES.map(normalizeMock)
    .sort(byDateDesc)
    .slice(0, 3);
  if (!client) return fallback;
  try {
    const rows = await client.fetch(
      `*[_type == "article"] | order(date desc)[0...3]{${ARTICLE_FIELDS}}`
    );
    return rows?.length ? rows : fallback;
  } catch {
    return fallback;
  }
}

export async function getArticlesByKind(kind: KnowledgeKind): Promise<Article[]> {
  const fallback = ARTICLES.filter((a) => a.kind === kind)
    .map(normalizeMock)
    .sort(byDateDesc);
  if (!client) return fallback;
  try {
    const rows = await client.fetch(
      `*[_type == "article" && kind == $kind] | order(date desc){${ARTICLE_FIELDS}}`,
      { kind }
    );
    return rows?.length ? rows : fallback;
  } catch {
    return fallback;
  }
}

export async function getAllArticleSlugs(): Promise<string[]> {
  if (!client) return ARTICLES.map((a) => a.slug);
  try {
    const rows: string[] = await client.fetch(
      `*[_type == "article" && defined(slug.current)].slug.current`
    );
    return rows?.length ? rows : ARTICLES.map((a) => a.slug);
  } catch {
    return ARTICLES.map((a) => a.slug);
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  const mock = ARTICLES.find((a) => a.slug === slug);
  if (!client) return mock ? normalizeMock(mock) : null;
  try {
    const row = await client.fetch(
      `*[_type == "article" && slug.current == $slug][0]{${ARTICLE_FIELDS}, body}`,
      { slug }
    );
    if (row) return row;
    return mock ? normalizeMock(mock) : null;
  } catch {
    return mock ? normalizeMock(mock) : null;
  }
}

export async function getPractices() {
  if (!client) return PRACTICES;
  try {
    const rows = await client.fetch(
      `*[_type == "practiceArea" && featured == true][0...4]{title, "slug": slug.current, "image": cardImage.asset->url}`
    );
    return rows?.length ? rows : PRACTICES;
  } catch {
    return PRACTICES;
  }
}

export async function getPeople() {
  if (!client) return PEOPLE;
  try {
    const rows = await client.fetch(
      `*[_type == "person" && featured == true][0...6]{name, title, "slug": slug.current, "image": photo.asset->url}`
    );
    return rows?.length ? rows : PEOPLE;
  } catch {
    return PEOPLE;
  }
}

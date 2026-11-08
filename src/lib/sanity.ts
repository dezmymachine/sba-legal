import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { ARTICLES, PEOPLE } from "../data/content";

// Knowledge posts data layer.
// If SANITY env vars are set, posts come from Sanity (studio in /studio).
// Otherwise they fall back to the sample ARTICLES so the site builds and
// previews without CMS credentials.

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";

const client =
  projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2026-01-01",
        // Builds are triggered right after publishing; the live API avoids stale CDN reads.
        useCdn: false,
      })
    : null;

// Builds CDN URLs that honour the crop and hotspot editors set in the studio.
const imageBuilder = createImageUrlBuilder({ projectId: projectId ?? "", dataset });
export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source).auto("format");
}

export type KnowledgeKind = "publication" | "news" | "event";

export interface ArticleAuthor {
  name: string;
  title: string;
  slug: string;
  image?: string;
}

export interface Article {
  title: string;
  slug: string;
  kind: KnowledgeKind;
  date: string;
  /** Last edit (Sanity `_updatedAt`), for schema dateModified. */
  modified?: string;
  excerpt?: string;
  /** Optional search-result overrides set in the studio. */
  seoTitle?: string;
  seoDescription?: string;
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

// Image fields stay raw in GROQ so urlFor() can apply crop + hotspot.
const ARTICLE_FIELDS = `title, "slug": slug.current, kind, date, "modified": _updatedAt, excerpt, seoTitle, seoDescription, heroImage, "author": author->{name, title, "slug": slug.current, photo}`;

type SanityArticle = Omit<Article, "heroImage" | "author"> & {
  heroImage?: SanityImageSource;
  author: (Omit<ArticleAuthor, "image"> & { photo?: SanityImageSource }) | null;
};

// Hero renders full-bleed (also used as og:image); author portraits are 3:4.
function fromSanityArticle({ heroImage, author, ...rest }: SanityArticle): Article {
  return {
    ...rest,
    heroImage: heroImage ? urlFor(heroImage).width(1800).height(1000).fit("crop").url() : undefined,
    author: author && {
      name: author.name,
      title: author.title,
      slug: author.slug,
      // No studio portrait? Use the website's own portrait for the same person.
      image: author.photo
        ? urlFor(author.photo).width(480).height(640).fit("crop").url()
        : PEOPLE.find((p) => p.slug === author.slug)?.image,
    },
  };
}

// Once Sanity is configured it is the only source of posts: empty results stay
// empty (never the sample ARTICLES). A failed fetch fails production builds so a
// broken fetch can't ship sample content — Cloudflare keeps serving the last good
// deploy. In `astro dev` a network blip falls back to the samples with a warning.
async function fromSanity<T>(load: (c: SanityClient) => Promise<T>, sample: () => T): Promise<T> {
  if (!client) {
    // Sample posts are placeholders: never let a Cloudflare build publish them as real.
    if (process.env.CF_PAGES || process.env.WORKERS_CI) {
      throw new Error("PUBLIC_SANITY_PROJECT_ID is not set: refusing to publish sample knowledge posts. Set it in Cloudflare build variables.");
    }
    return sample();
  }
  try {
    return await load(client);
  } catch (err) {
    if (!import.meta.env.DEV) throw err;
    console.warn(`[sanity] fetch failed (${(err as Error).message}) — showing sample posts in dev.`);
    return sample();
  }
}

// Latest 3 across all kinds — homepage Knowledge Centre.
export function getArticles(): Promise<Article[]> {
  return fromSanity(
    async (c) =>
      (
        await c.fetch<SanityArticle[]>(
          `*[_type == "article"] | order(date desc)[0...3]{${ARTICLE_FIELDS}}`
        )
      ).map(fromSanityArticle),
    () => ARTICLES.map(normalizeMock).sort(byDateDesc).slice(0, 3)
  );
}

export function getArticlesByKind(kind: KnowledgeKind): Promise<Article[]> {
  return fromSanity(
    async (c) =>
      (
        await c.fetch<SanityArticle[]>(
          `*[_type == "article" && kind == $kind] | order(date desc){${ARTICLE_FIELDS}}`,
          { kind }
        )
      ).map(fromSanityArticle),
    () => ARTICLES.filter((a) => a.kind === kind).map(normalizeMock).sort(byDateDesc)
  );
}

export function getAllArticleSlugs(): Promise<string[]> {
  return fromSanity(
    (c) => c.fetch<string[]>(`*[_type == "article" && defined(slug.current)].slug.current`),
    () => ARTICLES.map((a) => a.slug)
  );
}

export function getArticle(slug: string): Promise<Article | null> {
  return fromSanity(
    async (c) => {
      const row = await c.fetch<SanityArticle | null>(
        `*[_type == "article" && slug.current == $slug][0]{${ARTICLE_FIELDS}, body}`,
        { slug }
      );
      return row && fromSanityArticle(row);
    },
    () => {
      const mock = ARTICLES.find((a) => a.slug === slug);
      return mock ? normalizeMock(mock) : null;
    }
  );
}

// People pages are managed in code (PEOPLE); Sanity `person` docs exist only so
// articles can reference an author.
/** Articles written by someone whose focus areas include this service. */
export async function getArticlesForService(service: { keywords: string[] }): Promise<Article[]> {
  const all = (await Promise.all((["publication", "news", "event"] as const).map(getArticlesByKind))).flat();
  return all
    .filter((a) => {
      const focus = PEOPLE.find((p) => p.slug === a.author?.slug)?.focus ?? [];
      return focus.some((f) => service.keywords.some((k) => f.toLowerCase().includes(k.toLowerCase())));
    })
    .sort(byDateDesc);
}

export async function getPeople() {
  return PEOPLE;
}

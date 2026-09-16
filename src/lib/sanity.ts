import { createClient } from "@sanity/client";
import { ARTICLES, PRACTICES, PEOPLE } from "../data/content";

// Sanity-ready data layer.
// If SANITY env vars are set, these fetch from Sanity.
// Otherwise they fall back to local mock content so the
// landing page builds and previews without CMS credentials.

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

export async function getArticles() {
  if (!client) return ARTICLES;
  try {
    const rows = await client.fetch(
      `*[_type == "article"] | order(date desc)[0...3]{title, "slug": slug.current, category, date}`
    );
    return rows?.length ? rows : ARTICLES;
  } catch {
    return ARTICLES;
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
      `*[_type == "person" && featured == true][0...4]{name, title, "slug": slug.current, "image": photo.asset->url}`
    );
    return rows?.length ? rows : PEOPLE;
  } catch {
    return PEOPLE;
  }
}

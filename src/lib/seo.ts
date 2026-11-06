// Search-engine visibility for this build.
// Cloudflare Pages sets CF_PAGES / CF_PAGES_BRANCH at build time. A deploy is only
// indexable from `master` once PUBLIC_SITE_URL is set — do that when the real
// domain is connected, so *.pages.dev and preview copies never get indexed.
// Local builds count as indexable so `npm run build` output matches production.
const onCloudflare = !!process.env.CF_PAGES;
export const INDEXABLE = onCloudflare
  ? process.env.CF_PAGES_BRANCH === "master" && !!process.env.PUBLIC_SITE_URL
  : true;

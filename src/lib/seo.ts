// Search-engine visibility for this build.
// Cloudflare sets CF_PAGES / CF_PAGES_BRANCH on Pages builds and WORKERS_CI /
// WORKERS_CI_BRANCH on Workers Builds. A deploy is only indexable from `master`
// once PUBLIC_SITE_URL is set — do that when the real domain is connected, so
// *.pages.dev / *.workers.dev and preview copies never get indexed.
// Local builds count as indexable so `npm run build` output matches production.
const onCloudflare = !!(process.env.CF_PAGES || process.env.WORKERS_CI);
const branch = process.env.CF_PAGES_BRANCH ?? process.env.WORKERS_CI_BRANCH;
export const INDEXABLE = onCloudflare
  ? branch === "master" && !!process.env.PUBLIC_SITE_URL
  : true;

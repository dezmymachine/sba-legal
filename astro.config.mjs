// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Set PUBLIC_SITE_URL on Cloudflare once the domain is live
  // (it also switches indexing on — see src/lib/seo.ts).
  site: process.env.PUBLIC_SITE_URL ?? 'https://sbalegalconsult.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

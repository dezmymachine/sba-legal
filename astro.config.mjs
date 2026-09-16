// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update this to the live domain once confirmed
  site: 'https://sbalegalconsult.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

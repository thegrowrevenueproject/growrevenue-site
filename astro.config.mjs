import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://growrevenue.co',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
});

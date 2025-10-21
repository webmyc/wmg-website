import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wholemengathering.org',
  output: 'static',
  outDir: 'dist',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('404')
    })
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
});

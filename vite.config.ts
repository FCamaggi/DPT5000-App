import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: '/src/lib',
    },
  },
  optimizeDeps: {
    include: ['motion'],
  },
  ssr: {
    noExternal: ['motion'],
  },
});

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for React + Tailwind CSS
 * 
 * Tailwind is integrated via PostCSS, which Vite automatically picks up
 * from tailwind.config.js and postcss.config.js
 */

export default defineConfig({
  plugins: [
    react(), // Enables React fast refresh and JSX support
  ],
  server: {
    port: 5173,      // Default Vite dev server port
    open: true,      // Automatically opens the browser
  },
  resolve: {
    alias: {
      // Optional: set up path aliases for cleaner imports
      '@': '/src',
    },
  },
  css: {
    postcss: './postcss.config.cjs', // Ensures Tailwind PostCSS config is applied
  },
});


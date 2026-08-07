
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  build: {
    assetsDir: "assets",
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('@tanstack')) {
              return 'vendor-ui';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    host: "localhost",
    port: 5173,
    headers: {
      'Cache-Control': 'no-cache'
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.ico', '**/*.json'],
}));

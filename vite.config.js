import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    rollupOptions: {
      external: [], // Remove external configuration
    },
    commonjsOptions: {
      include: [/node_modules/], // Add this
    },
  },
});

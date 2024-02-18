import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    // nodePolyfills()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
});

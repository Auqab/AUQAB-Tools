import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@faker-js")) return "vendor-faker";
            if (id.includes("pdf-lib")) return "vendor-pdf";
            if (
              id.includes("marked") ||
              id.includes("diff") ||
              id.includes("jsqr") ||
              id.includes("lorem-ipsum") ||
              id.includes("papaparse") ||
              id.includes("crypto-js") ||
              id.includes("sql-formatter") ||
              id.includes("js-yaml")
            ) {
              return "vendor-libs";
            }
            // لا نخصص chunk لـ react – نتركه لـ Vite
          }
        },
      },
    },
  },
});

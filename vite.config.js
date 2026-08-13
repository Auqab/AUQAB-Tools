import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom") || id.includes("react-helmet-async")) {
              return "vendor-react";
            }
            if (id.includes("pdf-lib")) return "vendor-pdf";
            if (id.includes("@faker-js") || id.includes("chart.js") || id.includes("mathjs") || id.includes("sql-formatter")) {
              return "vendor-data";
            }
            if (id.includes("tesseract.js")) return "vendor-ocr";
            if (id.includes("marked") || id.includes("diff") || id.includes("jsqr") || id.includes("lorem-ipsum") || id.includes("papaparse") || id.includes("crypto-js") || id.includes("js-yaml") || id.includes("qrcode.react")) {
              return "vendor-libs";
            }
          }
        },
      },
    },
  },
});

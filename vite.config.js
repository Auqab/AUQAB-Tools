import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("marked") || id.includes("diff") || id.includes("jsqr") || id.includes("lorem-ipsum")) {
              return "vendor-libs";
            }
            if (id.includes("react")) {
              return "vendor-react";
            }
            return "vendor";
          }
        },
      },
    },
  },
});


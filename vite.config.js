import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // نترك Vite يتولى تقسيم الكود تلقائياً – أكثر فعالية
  },
});

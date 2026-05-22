import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],

  optimizeDeps: {
    include: ["html2canvas", "jspdf"],
  },

  server: {
    watch: {
      usePolling: true,
    },
  },
});
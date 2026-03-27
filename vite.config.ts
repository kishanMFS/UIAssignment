import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  base: process.env.VITE_BASE_PATH || "",
  server: {
    hmr: {
      overlay: true,
    },
  },
});

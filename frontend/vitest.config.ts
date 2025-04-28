import { defineConfig } from "vitest/config";
import { getViteConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  ...getViteConfig(),
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    includeSource: ["src/**/*.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".astro", "src/test/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/test/"],
    },
  },
}); 
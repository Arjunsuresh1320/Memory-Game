import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",   // ✅ THIS FIXES YOUR ERROR
    globals: true           // optional but recommended
  },
});
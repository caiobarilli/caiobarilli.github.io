import { defineConfig, devices } from "@playwright/test";

const port = 4173;

/** E2E tests run against the static export in out/ (run `npm run build` first). */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "node scripts/serve.mjs",
    url: `http://localhost:${port}/en/`,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(port) },
  },
});

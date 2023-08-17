import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      retries: 2,
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      retries: 2,
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      retries: 2,
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})

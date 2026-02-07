import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * Playwright Configuration for File Upload/Download Testing
 * Tests for file upload and download operations
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Configure download behavior
    acceptDownloads: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Configure download path
        contextOptions: {
          acceptDownloads: true,
        },
      },
    },
  ],
});


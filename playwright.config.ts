// playwright.config.js
import { defineConfig } from "playwright/test";

module.exports = defineConfig({
  testDir: './tests', // Directory containing test files
  timeout: 30000, // Timeout for each test in milliseconds
//   retries: 1, // Number of retries for failed tests
  use: {
    headless: true, // Run tests in headless mode
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'on-first-retry', // Record video on first retry
    screenshot: 'only-on-failure',
    trace: 'on',
  },
  reporter: [
    ["list", {
      printSteps: true,
    }],
    [
      "monocart-reporter",
      {
        name: "My Test Report",
        outputFile: "./test-results/report.html",
      },
    ],
    ["html"]
  ],
  projects: [
    {
      name: 'shop',
      use: { 
        browserName: 'chromium',
        baseURL: "https://www.ploom.co.uk/en"
     },
    },
  ],
});

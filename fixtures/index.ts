import { test } from "@playwright/test";
import { Application } from "../app";
import { DevicePage } from "../app/pages/devicePage";
import { ShoppingCartPage } from "../app/pages/shoppingCart";

/**
 * Custom Playwright test fixture for the shopping flow.
 * Provides page objects and configuration related to the shop.
 */
export const shopTest = test.extend<{
  /**
   * The main application wrapper that provides access to various app sections.
   */
  app: Application;

  /**
   * Page object for the specific device detail page.
   */
  devicePage: DevicePage;

  /**
   * Page object for the shopping cart.
   */
  shoppingCart: ShoppingCartPage;

  /**
   * Test-level options for configuring the test context (e.g., selected device).
   */
  testOptions: {
    device: string;
  };
}>({
  /**
   * Default test options.
   * You can override these per test with `test.use()`.
   */
  testOptions: [
    {
      device: "ploom-x-advanced",
    },
    {
      option: true, // Enables test options injection
    },
  ],

  /**
   * Initializes the Application class, which contains navigation and app-level components.
   * Runs once per test.
   */
  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },

  /**
   * Initializes the device detail page and navigates to the selected device by SKU.
   * This will run before each test that depends on `devicePage`.
   */
  devicePage: async ({ page, testOptions, app }, use) => {
    await app.shopDevices.open();
    await app.shopDevices.openDeviceBySku(testOptions.device);
    await use(new DevicePage(page, testOptions.device));
  },

  /**
   * Opens the shopping cart page and provides the page object for interaction.
   */
  shoppingCart: async ({ app }, use) => {
    await app.shoppingCart.open();
    await use(app.shoppingCart);
  },
});

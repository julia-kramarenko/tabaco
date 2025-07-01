import { test } from "@playwright/test";
import { randomUUID } from "crypto";
import { Application } from "../app";
import { ShopDevicesPage } from "../app/pages/shopDevicesPage";
import { DevicePage } from "../app/pages/devicePage";
import { ShoppingCartPage } from "../app/pages/shoppingCart";

export const shopTest = test.extend<
  {
    app: Application;
    devicePage: DevicePage;
    shoppingCart: ShoppingCartPage;
    testOptions: {
      device: string;
    };
  }
>({
  testOptions: [
    {
     device: "ploom-x-advanced",
    },
    {
      option: true,
    },
  ],

  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },

  devicePage: async({page, testOptions, app}, use) => {
    await app.shopDevices.open();
    await app.shopDevices.openDeviceBySku(testOptions.device);
    await use(new DevicePage(page, testOptions.device));
  },

  shoppingCart: async({app}, use) => {
    await app.shoppingCart.open();
    await use(app.shoppingCart);
  },
});
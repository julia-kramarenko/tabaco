import { expect } from "playwright/test";
import { shopTest } from "../fixtures";

shopTest.describe("Add device to cart", () => {
    shopTest.beforeEach(async({devicePage}) => {
        await devicePage.expectLoaded();
        await devicePage.addToCartButton.click({timeout:3000});
    })
    shopTest("should be added device to cart and number is increased in the cart icon of the header", async ({devicePage}) => {
        await expect(devicePage.checkoutButton).toBeVisible({timeout:3000});
        expect(await devicePage.topHeader.getCountProductsInCart()).toBe(1);
    });

    shopTest("should be added device to cart and number is increased in the cart page", async ({shoppingCart}) => {
        expect(await shoppingCart.getCountOfItems()).toBe(1);
    });
})
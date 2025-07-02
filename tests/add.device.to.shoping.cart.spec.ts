import { expect } from "playwright/test";
import { shopTest } from "../fixtures";

shopTest.describe("Add device to cart", () => {
    shopTest.beforeEach(async ({ devicePage }) => {
        await devicePage.expectLoaded();
        await devicePage.addToCartButton.click();
    })
    shopTest("should be added device to cart and number is increased in the cart icon of the header", async ({ devicePage }) => {
        await expect(devicePage.checkoutButton, "Expected visibility of 'Checkout' button").toBeVisible();
        expect(await devicePage.topHeader.getCountProductsInCart(), "Expected 1 item in the cart").toBe(1);
    });

    shopTest("should be added device to cart and number is increased in the cart page", async ({ shoppingCart }) => {
        expect(await shoppingCart.getCountOfItems(), "Expected 1 item in the cart page").toBe(1);
    });
})
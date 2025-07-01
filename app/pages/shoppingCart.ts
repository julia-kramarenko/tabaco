import { Locator } from "@playwright/test";
import { step } from "../../misc/reporter/step";
import { BasePage } from "./basePage";

export class ShoppingCartPage extends BasePage {
    public pagePath: string = "/en/cart-n-checkout#/";
    public container: Locator = this.page.locator("#one-page-checkout");

    @step("Get count of items in the Cart")
    async getCountOfItems(): Promise<number> {
        const match = (await this.container.getByTestId("page-layout-subtitle").textContent())
            .match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
    }
}
import { expect, Locator, Page } from "@playwright/test";
import { step } from "../../misc/reporter/step";
import { AppPage } from "../abstractClasses";

export class ShoppingCartPage extends AppPage {

    public pagePath: string;
    public container: Locator;
    public itemsNumber: Locator;
    
    constructor(page: Page) {
        super(page);
        this.container = this.page.locator("#one-page-checkout");
        this.itemsNumber = this.container.getByTestId("page-layout-subtitle");
        this.pagePath = "/en/cart-n-checkout#/";
    }

    @step("Expected loading Shopping Cart page")
    async expectLoaded(message = 'Expected Shopping Cart is opened and loaded'): Promise<void> {
        await expect(this.container, message).toBeVisible();
    }

    @step("Get count of items in the Cart")
    async getCountOfItems(): Promise<number> {
        const match = (await this.itemsNumber.textContent()).match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
    }
}
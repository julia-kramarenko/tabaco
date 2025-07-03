import { expect, Locator, Page } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../misc/reporter/step";

export class TopHeader extends Component {
    public container: Locator;
    public headerLinks: Locator;
    public miniCartLink: Locator;
    constructor(page: Page) {
        super(page);
        this.container = this.page.getByTestId("header");
        this.headerLinks = this.container.locator("[data-components='HeaderLinks']");
        this.miniCartLink = this.headerLinks.getByTestId("miniCart");
    }

    @step("Expected loading header in the top of page")
    async expectLoaded(message = 'Expected header is visible'): Promise<void> {
        await expect(this.container, message).toBeVisible({ timeout: 5000 });
    }

    @step("Get amount of products in the cart")
    async getCountProductsInCart(): Promise<number> {
        return +(await this.miniCartLink.locator("[class*='CartIcon-module-label']").textContent());
    }
}
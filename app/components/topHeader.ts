import { expect, Locator } from "@playwright/test";
import { AppPage, Component } from "../abstractClasses";
import { step } from "../../misc/reporter/step";

export class TopHeader extends Component {
    public container: Locator = this.page.getByTestId("header");
    public headerLinks: Locator = this.container.locator("[data-components='HeaderLinks']");
    public miniCartLink: Locator = this.headerLinks.getByTestId("miniCart");

    @step()
    async expectLoaded(message = 'Expected header is visible'): Promise<void> {
        await expect(this.container, message).toBeVisible({ timeout: 5000 });
    }

    @step("Get amount of products in the cart")
    async getCountProductsInCart(): Promise<number> {
        return +(await this.miniCartLink.locator("[class*='CartIcon-module-label']").textContent());
    }
}
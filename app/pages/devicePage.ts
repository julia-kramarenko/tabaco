
import { expect, Locator } from "@playwright/test";
import { step } from "../../misc/reporter/step";
import { Page } from "playwright";
import { BasePage } from "./basePage";

export class DevicePage extends BasePage {
    public pagePath: string;
    private readonly deviceSku: string;
    constructor(page: Page, deviceSku: string) {
        super(page);
        this.page = page;
        this.deviceSku = deviceSku;
    }

    public addToCartButton: Locator = this.page.getByTestId("pdpAddToProduct");
    public checkoutButton: Locator = this.page.getByTestId("miniCartCheckoutButton");

    @step("Expect Device page is loaded")
    async expectLoaded(message = 'Expected Shop Device page is opened'): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`/devices/${this.deviceSku}$`));
        await expect(this.page.getByTestId("product-details"), message).toBeVisible({ timeout: 5000 });
    }
}
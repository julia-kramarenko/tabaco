
import { expect, Locator } from "@playwright/test";
import { step } from "../../misc/reporter/step";
import { Page } from "playwright";
import { AppPage } from "../abstractClasses";
import { TopHeader } from "../components/topHeader";

export class DevicePage extends AppPage {
    public container: Locator;
    public pagePath: string;
    private readonly deviceSku: string;
    constructor(page: Page, deviceSku: string) {
        super(page);
        this.page = page;
        this.deviceSku = deviceSku;
    }
    
    public topHeader:TopHeader = new TopHeader(this.page);
    public readonly addToCartButton: Locator = this.page.getByTestId("pdpAddToProduct");
    public readonly checkoutButton: Locator = this.page.getByTestId("miniCartCheckoutButton");
    private readonly productDetails: Locator = this.page.getByTestId("product-details");

    @step("Expect Device page is loaded")
    async expectLoaded(message = 'Expected Shop Device page is opened'): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`/devices/${this.deviceSku}$`));
        await expect(this.productDetails, message).toBeVisible();
    }
}
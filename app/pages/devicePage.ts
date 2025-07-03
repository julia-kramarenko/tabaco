
import { expect, Locator } from "@playwright/test";
import { step } from "../../misc/reporter/step";
import { Page } from "playwright";
import { AppPage } from "../abstractClasses";
import { TopHeader } from "../components/topHeader";

export class DevicePage extends AppPage {
    public container: Locator;
    public pagePath: string;
    public readonly addToCartButton: Locator
    private readonly deviceSku: string;
    public readonly checkoutButton: Locator;
    private readonly productDetails:Locator;
    public topHeader:TopHeader;

    constructor(page: Page, deviceSku: string) {
        super(page);
        this.page = page;
        this.deviceSku = deviceSku;
        this.addToCartButton =  this.page.getByTestId("pdpAddToProduct");
        this.checkoutButton = this.page.getByTestId("miniCartCheckoutButton");
        this.productDetails = this.page.getByTestId("product-details");
        this.topHeader = new TopHeader(this.page);
    }

    @step("Expect Device page is loaded")
    async expectLoaded(message = 'Expected Shop Device page is opened'): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`/devices/${this.deviceSku}$`));
        await expect(this.productDetails, message).toBeVisible();
    }
}

import { expect, Locator } from "@playwright/test";
import { step } from "../../misc/reporter/step";
import { AppPage } from "../abstractClasses";
import { TopHeader } from "../components/topHeader";

export class ShopDevicesPage extends AppPage {
    public pagePath: string = "/en/shop/products/devices";
    public container: Locator = this.page.locator(".shop_catalogue_xf");
    public products: Locator = this.page.locator('[data-product]');
    public deviceBySku = (device: string): Locator => {
        return this.page.locator(`[data-sku="${device}"]`);
    }
    public buyNowDeviceButton = (device: string): Locator => {
        return this.deviceBySku(device).locator("[class*='buyNow']");
    }
    public topHeader: TopHeader = new TopHeader(this.page);

    @step("Expect Shop Device page is loaded")
    async expectLoaded(message = 'Expected Shop Device page is opened'): Promise<void> {
        await expect(this.page, "Expected containing 'devices' in url").toHaveURL(/\/devices(?:\/|$)/);
        await expect(this.container, "Expected loading Shop Device page").toBeVisible();
        await expect(this.products.first(), message).toBeVisible();
    }

    @step("Open shop device via URL")
    async openDeviceProductViaUrl(device: string): Promise<void> {
        await this.open(`/en/shop/products/devices/${device}`);
    }

    @step("Open device page by device sku")
    async openDeviceBySku(device: string): Promise<void> {
        await this.deviceBySku(device).click();
        await this.buyNowDeviceButton(device).click();
    }
}
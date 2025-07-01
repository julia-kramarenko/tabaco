
import { expect, Locator } from "@playwright/test";
import { step } from "../../misc/reporter/step";
import { BasePage } from "./basePage";

export class ShopDevicesPage extends BasePage {
    public pagePath: string = "/en/shop/products/devices";
    public container: Locator = this.page.locator(".shop_catalogue_xf");
    public deviceBySku = (device: string):Locator => {
        return this.page.locator(`[data-sku="${device}"]`);
    }

    @step("Expect Shop Device page is loaded")
    async expectLoaded(message = 'Expected Shop Device page is opened'): Promise<void> {     
       await expect(this.page).toHaveURL(/\/devices(?:\/|$)/);
       await expect(this.container).toBeVisible({timeout:5000});
       await expect(this.page.locator('[data-product]').first(), message).toBeVisible({timeout:5000});
    }

     @step("Open shop device via URL")
    async openDeviceProductViaUrl(device: string): Promise<void> {
        await this.open(`/en/shop/products/devices/${device}`);
    }

    @step("Open device page by device sku")
    async openDeviceBySku(device: string): Promise<void> {
        await this.deviceBySku(device).click({timeout:3000});
        await this.deviceBySku(device).locator("[class*='buyNow']").click({timeout:5000});
    }
}
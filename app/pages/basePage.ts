import { expect, Locator } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "../../misc/reporter/step";
import { TopHeader } from "../components/topHeader";

export class BasePage extends AppPage {
    public container: Locator;
    public pagePath = '/';
    public topHeader: TopHeader = new TopHeader(this.page);

    @step()
    async expectLoaded(): Promise<void> {
        await expect(this.container).toBeVisible({ timeout: 5000 });
    }
}
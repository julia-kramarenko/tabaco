import { BasePage } from "./basePage";

export class HomePage extends BasePage {
    public pagePath = '/';
    public container = this.page.locator("");
}
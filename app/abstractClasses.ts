import type { Locator, Page } from '@playwright/test';
import { step } from '../misc/reporter/step';

export abstract class Component {
    constructor(protected page: Page) { }
    abstract expectLoaded(message?: string): Promise<void>;
}

export abstract class AppPage extends Component {
    public abstract pagePath: string;
    public abstract container: Locator;
    public acceptCookiesButton: Locator = this.page.locator('#onetrust-accept-btn-handler');
    public agesModal: Locator = this.page.locator(".modal__base");
    public confirmAgesButton: Locator = this.agesModal.getByTestId("customButton").getByText(" Yes, discover more ");

    @step("Open new page, accept cookies and confirm 18 ages modal")
    async open(path?: string) {
        await this.page.goto(path ?? this.pagePath);
        try {
            await this.acceptCookiesButton.click({timeout:3000});
            await this.confirmAgesButton.click({timeout:3000});
        } catch (e) {
            // element not found or not visible: skip
        }     
        await this.expectLoaded();
    }
}
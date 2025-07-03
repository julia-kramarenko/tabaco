import type { Locator, Page } from '@playwright/test';
import { step } from '../misc/reporter/step';

export abstract class Component {
    constructor(protected page: Page) { }
    abstract expectLoaded(message?: string): Promise<void>;
}

export abstract class AppPage extends Component {
    public acceptCookiesButton: Locator;
    public agesModal: Locator;
    public confirmAgesButton: Locator;

    constructor(page: Page) {
        super(page);
        this.acceptCookiesButton = this.page.locator('#onetrust-accept-btn-handler');
        this.agesModal = this.page.locator(".modal__base");
        this.confirmAgesButton = this.agesModal.getByTestId("customButton").getByText(" Yes, discover more ");
    }
    public abstract pagePath: string;
    public abstract container: Locator;

    @step("Open new page, accept cookies and confirm 18 ages modal")
    async open(path?: string) {
        await this.page.goto(path ?? this.pagePath);
        if (await this.acceptCookiesButton.isVisible({ timeout: 5000 }))
            await this.acceptCookiesButton.click();
        if (await this.confirmAgesButton.isVisible({ timeout: 5000 }))
            await this.confirmAgesButton.click({ timeout: 3000 });
        await this.expectLoaded();
    }
}
import type { Locator, Page } from '@playwright/test';
import { step } from '../misc/reporter/step';

export abstract class PageHolder {
    constructor(protected page: Page) { }
}
export abstract class Component extends PageHolder {
    abstract expectLoaded(message?: string): Promise<void>;

    @step()
    async isLoaded(): Promise<boolean> {
        try {
            await this.expectLoaded()
            return true
        } catch {
            return false
        }
    }
}

export abstract class AppPage extends Component {
    /**
     * Path to the page can be relative to the baseUrl defined in playwright.config.ts
     * or absolute (on your own risk)
     */
    public abstract pagePath: string;
    public abstract container: Locator;

    /**
     * Opens the page in the browser and expectLoaded should pass
     */
    @step()
    async open(path?: string) {
        await this.page.goto(path ?? this.pagePath);
        try {
            await this.page.locator('#onetrust-accept-btn-handler').click({ timeout: 5000 });
            await this.page.locator(".modal__base")
            .getByTestId("customButton")
            .getByText(" Yes, discover more ")
            .click({ timeout: 3000 });
        } catch (e) {
            // element not found or not visible: skip
        }
        
        await this.expectLoaded();
    }
}
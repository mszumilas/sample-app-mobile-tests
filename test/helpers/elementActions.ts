import { $ } from '@wdio/globals'
export class ElementActions {
    static async clickElement(element: WebdriverIO.Element): Promise<void> {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    static async isElementDisplayed(locator: string): Promise<boolean> {
        const element = await $(locator);
        return element.isDisplayed();
    }

    static async isElementsTextViewsContains(element: WebdriverIO.Element, information: string): Promise<boolean> {
        const textViews = await element.$$(`android.widget.TextView`);
        for (const el of textViews) {
        const text = await el.getText();
        if (text.includes(information)) {
            return true;
        }
        }
        return false;
  }
}
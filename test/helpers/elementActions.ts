import { $ } from '@wdio/globals'
export class ElementActions {
    static async clickElement(locator: string): Promise<void> {
        const element = await $(locator)
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    static async isElementDisplayed(locator: string): Promise<boolean> {
        const element = await $(locator)
        const displayed = await element.isDisplayed();
        console.log(`DISPLAYING: ${displayed}`)
        return displayed
    }

    static async isElementClickable(locator: string) {
        const element = await $(locator)
        const displayed = await element.isDisplayed();
        console.log(`DISPLAYING: ${displayed}`)
        return displayed
    }

    static async isElementsTextViewsContains(locator: string, information: string): Promise<boolean> {
        const element = await $(locator)
        const textViews = await element.$$('android.widget.TextView');
        for (const el of textViews) {
        const text = await el.getText();
        if (text.includes(information)) {
            return true;
        }
        }
        return false;
  }
}
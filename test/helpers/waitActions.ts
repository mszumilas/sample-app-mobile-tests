import { $ } from '@wdio/globals'
export class WaitActions {
    static async waitForElement(locator: string, elementName: string, timeout = 10000): Promise<void> {
        const element = await $(locator)
        await element.waitForDisplayed({ timeout, timeoutMsg: `${elementName} did not load within 10s` });
    }
}
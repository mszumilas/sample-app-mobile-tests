import { $ } from '@wdio/globals'
export class WaitActions {
    static async waitForElement(element: WebdriverIO.Element, elementName: string, timeout = 10000): Promise<void> {
        await element.waitForDisplayed({ timeout, timeoutMessage: `${elementName} did not load within 10s` });
    }
}
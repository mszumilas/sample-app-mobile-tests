import { $, browser } from '@wdio/globals'
export class ScrollActions {
    
  static async scrollToAccessibilityId(accessibilityId: string): Promise<void> {
    await (browser as any).execute('mobile: scroll', {
      strategy: 'accessibility id',
      selector: accessibilityId
    });
  }

  static async scrollToElementByText(text: string): Promise<WebdriverIO.Element> {
    const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`;
    const element = await $(selector);

    await element.waitForDisplayed({ timeout: 10000 });
    return element;
  }
}
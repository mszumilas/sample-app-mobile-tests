import { $, browser, driver } from '@wdio/globals'
export default class BasePage {

  public async scrollToAccessibilityId(accessibilityId: string): Promise<void> {
    await (browser as any).execute('mobile: scroll', {
      selector: accessibilityId
    });
  }

  public async tapElement(locator: string): Promise<void> {
    const element = await $(locator);
    await element.waitForDisplayed({ timeout: 10000 });
    await element.click();
  }

  public async isElementDisplayed(locator: string): Promise<boolean> {
    const element = await $(locator);
    return element.isDisplayed();
  }

  public async waitForElement(locator: string, timeout = 10000): Promise<void> {
    const element = await $(locator);
    await element.waitForDisplayed({ timeout });
  }
}

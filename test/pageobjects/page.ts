import { $, browser, driver } from '@wdio/globals'
export default class BasePage {

  public async scrollToAccessibilityId(accessibilityId: string): Promise<void> {
    await (browser as any).execute('mobile: scroll', {
      strategy: 'accessibility id',
      selector: accessibilityId
    });
  }

  public async scrollToElementByText(text: string): Promise<WebdriverIO.Element> {
    const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`;
    const element = await $(selector);

    await element.waitForDisplayed({ timeout: 10000 });
    return element;
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
      public async isElementsTextViewContains(element: WebdriverIO.Element, information: string): Promise<boolean> {
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

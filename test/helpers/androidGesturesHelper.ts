import { $ } from '@wdio/globals'

export async function scrollToElementByText(text: string): Promise<WebdriverIO.Element> {
  const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`;

  const element = await $(selector);

  await element.waitForDisplayed({ timeout: 10000 });
  return element;
}

import { $, $$, expect } from '@wdio/globals'
import Page from "./page";

class CartPage extends Page {
    public get cartPage () {
        return $('~test-Cart Content')
    }

    public get checkoutBtn () {
        return $('~test-CHECKOUT')
    }

    get cartItem () {
      return $$('~test-Item')
    }

    public getCartItemByName(productName) {
        return $(`//android.view.ViewGroup[@content-desc="test-Item"]
      [./android.view.ViewGroup//android.widget.TextView[@text="${productName}"]]`);
    }

    public async goToCheckout() {
        await this.checkoutBtn.waitForDisplayed();
        await this.checkoutBtn.click();
    }
    
    public async waitForCartPageLoaded() {
      await this.cartPage.waitForDisplayed({ timeout: 5000 });
    }

    public async getCartItemsNumber(): Promise<number> {
        return (await this.cartItem).length;
    }

    public async assertCartItemsNumber(itemsNumber: number) {
      const actual = await this.getCartItemsNumber();
      expect(actual).toBe(itemsNumber);
    }
}
export default new CartPage();
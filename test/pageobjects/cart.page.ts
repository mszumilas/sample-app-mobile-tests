import { $ } from '@wdio/globals'
import Page from "./page";

class CartPage extends Page {
    public get cartPage () {
        return $('~test-Cart Content')
    }

    public get CheckoutBtn () {
        return $('~test-CHECKOUT')
    }

    public getCartItemByName(productName) {
        return $(`//android.view.ViewGroup[@content-desc="test-Item"]
      [./android.view.ViewGroup//android.widget.TextView[@text="${productName}"]]`);
    }

    public async goToCheckout() {
        await this.CheckoutBtn.waitForDisplayed();
        await this.CheckoutBtn.click();
    }
    
    public async waitForCartPageLoaded() {
    await this.cartPage.waitForDisplayed({ timeout: 5000 });
  }
}
export default new CartPage();
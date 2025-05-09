import { $ } from '@wdio/globals'
import Page from "./page";

class ProductsPage extends Page {
    
    public get productsPage () {
        return $('~test-PRODUCTS');
    }

    public getProductItemAddCartBtn (productName: string) {
        return $(`//android.view.ViewGroup[@content-desc="test-Item"]
    [./android.view.ViewGroup//android.widget.TextView[@text="${productName}"]]
    //android.view.ViewGroup[@content-desc="test-ADD TO CART"]`);
    }

    public get cartIcon () {
        return $('~test-Cart')
    }

    public async waitForProductsPageLoaded(): Promise<void> {
        await this.productsPage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Products page did not load within 10s'
        })
    }
    public async addProductToCartByName(productName: string) {
        const addToCartButton = await this.getProductItemAddCartBtn(productName);
        await addToCartButton.waitForDisplayed({ timeout: 10000 });
        await addToCartButton.click();;
    }
    public async goToCart() {
        await this.cartIcon.waitForDisplayed();
        await this.cartIcon.click();
    }
}

export default new ProductsPage();
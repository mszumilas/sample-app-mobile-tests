import { $ } from '@wdio/globals'
import Page from "./page";

class ProductsPage extends Page {
    
    public get productsPage () {
        return $('~test-PRODUCTS');
    }

    public get productItem () {
        return $(`TextView[@content-desc="test-Item title" and @text="Sauce Labs Bike Light"]`)
    }

    public async waitForProductsPageLoaded(): Promise<void> {
        await this.productsPage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Products page did not load within 10s'
        })
    }
}

export default new ProductsPage();
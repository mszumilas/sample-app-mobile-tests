import { $ } from '@wdio/globals'
import Page from "./page";
import { ElementActions } from '../helpers/elementActions';
import { WaitActions } from '../helpers/waitActions';
import { Strings } from '../constants/strings';
import { AssertionsHelper } from '../helpers/assertionsHelper';

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
        await WaitActions.waitForElement(this.productsPage, Strings.products.productPage)
    }
    
    public async addProductToCartByName(productName: string) {
        const addToCartButton = await this.getProductItemAddCartBtn(productName);
        await ElementActions.clickElement(addToCartButton);
    }
    public async goToCart() {
        await ElementActions.clickElement(this.cartIcon);
    }

    public async assertIfCartHasLabelWithNumberOfProducts(numberOfProducts: string) {
        const cart = await this.cartIcon;
        AssertionsHelper.assertIfElementTextViewsContain(cart, Strings.elements.cartLabel, numberOfProducts);
    }
}

export default new ProductsPage();
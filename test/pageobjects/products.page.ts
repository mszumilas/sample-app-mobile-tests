import { $, $$, browser, expect } from '@wdio/globals'
import Page from "./page";
import { ElementActions } from '../helpers/elementActions';
import { WaitActions } from '../helpers/waitActions';
import { Strings } from '../constants/strings';
import { AssertionsHelper } from '../helpers/assertionsHelper';
import { ArraysHelper } from '../helpers/arraysHelper';
import { ScrollActions } from '../helpers/scrollActions';

class ProductsPage extends Page {
    
    private get productsPage() {
        return '~test-PRODUCTS';
    }

    private get cartIcon() {
        return '~test-Cart';
    }

    private get sortButton() {
        return '~test-Modal Selector Button';
    }

    private get productTitle() {
        return '~test-Item title';
    }

    private get productPrice() {
        return '~test-Price'
    }

    private getSortingOptionButton(sortCriteria) {
        return `//android.widget.ScrollView[@content-desc="Selector container"]
    //android.widget.TextView[@text="${sortCriteria}"]`;
    }

    private getProductItemAddCartButton (productName: string) {
        return `//android.view.ViewGroup[@content-desc="test-Item"][./android.view.ViewGroup//android.widget.TextView[@text="${productName}"]]//android.view.ViewGroup[@content-desc="test-ADD TO CART"]`;
    }

    private async getProductNames():Promise<string[]> {
        const products = await $$(this.productTitle);

        const productNames: string[] = [];
        for (const product of products) {
            const name = await product.getText();
            productNames.push(name);
        }

        return productNames
    }

    private async getProductPrices(): Promise<number[]> {
        const priceElements = await $$(this.productPrice);
        const prices: number[] = [];
        for (const p of priceElements) {
            const text = await p.getText();
            const price = parseFloat(text.replace(/[^0-9.,]/g, ''));
            prices.push(price);
        }
        return prices;
    }

    public async waitForProductsPageLoaded(): Promise<void> {
        await WaitActions.waitForElement(this.productsPage, Strings.products.productPage)
    }
    
    public async addProductToCartByName(productName: string) {
        const addToCartButton = await this.getProductItemAddCartButton(productName);
        const isDisplayed = await ElementActions.isElementDisplayed(addToCartButton);
        if(!(isDisplayed)){
            await ScrollActions.scrollToElement(addToCartButton)
        }
        await ElementActions.clickElement(addToCartButton);
    }
    public async goToCart() {
        await ElementActions.clickElement(this.cartIcon);
    }

    public async assertIfCartHasLabelWithNumberOfProducts(numberOfProducts: string) {
        const cart = await this.cartIcon;
        await AssertionsHelper.assertIfElementTextViewsContain(
            cart, 
            Strings.elements.cartLabel, 
            numberOfProducts);
    }

    public async clickSortButton() {
        await ElementActions.clickElement(this.sortButton);
    }

    public async sortBy(sortCriteria:string) {
        const sortButton = await this.getSortingOptionButton(sortCriteria)
        await ElementActions.clickElement(sortButton);
    }

    public async assertIfProductsAreSortedByNameAToZ() {
        const productNames = await this.getProductNames()
        expect(ArraysHelper.isSortedAsc(productNames)).toBe(true)
    }

    public async assertIfProductsAreSortedByNameZToA() {
        const productNames = await this.getProductNames()
        expect(ArraysHelper.isSortedDesc(productNames)).toBe(true)
    }

    public async assertIfProductsAreSortedByPriceLowToHigh() {
        const productNames = await this.getProductPrices()
        expect(ArraysHelper.isSortedNumberAsc(productNames)).toBe(true)
    }

    public async assertIfProductsAreSortedByPriceHighToLow() {
        const productNames = await this.getProductPrices()
        expect(ArraysHelper.isSortedNumberDesc(productNames)).toBe(true)
    }
    async addProductsToCart() {
        const productsNames = await this.getProductNames()
        for (const product of productsNames) {
            await this.addProductToCartByName(product)
        }
    }
    async waitForCartCountToChange(previousCount: number, timeout = 5000) {
        const cartCounter = await $(`//android.view.ViewGroup[@content-desc="test-Cart"]//android.widget.TextView`);

        await browser.waitUntil(async () => {
            const newText = await cartCounter.getText();
            const newCount = parseInt(newText, 10);
            return newCount !== previousCount;
        }, {
            timeout,
            timeoutMsg: `⏳ Cart count did not change from ${previousCount} within ${timeout}ms`
        });
    }

}

export default new ProductsPage();
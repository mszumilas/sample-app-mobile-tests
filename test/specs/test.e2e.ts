import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import ProductsPage from '../pageobjects/products.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'
import {scrollToElementByText} from '../helpers/androidGesturesHelper'

describe('Swag Labs application', () => {
    it('should buy a product', async () => {
        const productName = 'Sauce Labs Bike Light'
        await LoginPage.waitForLoginPageLoaded();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(ProductsPage.productsPage).toBeExisting();

        await ProductsPage.waitForProductsPageLoaded();
        await ProductsPage.addProductToCartByName(productName);
        await ProductsPage.goToCart();

        await CartPage.waitForCartPageLoaded();
        await expect(CartPage.getCartItemByName(productName)).toBeDisplayed();
        await CartPage.goToCheckout();
        
        await CheckoutPage.waitForCheckoutInformationPageLoaded();
        await CheckoutPage.setFirstName('Test');
        await CheckoutPage.setLastName('User');
        await CheckoutPage.setZipPostalCode('41218');
        await CheckoutPage.clickContinueBtn();
        
        await CheckoutPage.waitForCheckoutOverviewPageLoaded();
        await expect(await CheckoutPage.isProductDescriptionContains(productName)).toBe(true), `❌ Expected product description to contain "${productName}"`;
        await expect(await CheckoutPage.isOverviewInformationContains('SauceCard #31337')).toBe(true, '❌ Expected overview info to contain "SauceCard #31337"');
        await expect(await CheckoutPage.isOverviewInformationContains('FREE PONY EXPRESS DELIVERY!')).toBe(true, '❌ Expected overview info to contain "FREE PONY EXPRESS DELIVERY!"');
        await expect(await CheckoutPage.isOverviewInformationContains('Item total: $9.99')).toBe(true, '❌ Expected overview info to contain "Item total: $9.99"');
        await expect(await CheckoutPage.isOverviewInformationContains('Tax: $0.80')).toBe(true, '❌ Expected overview info to contain "Tax: $0.80"');
        await scrollToElementByText('Total: $10.79');
        await expect(await CheckoutPage.isOverviewInformationContains('Total: $10.79')).toBe(true, '❌ Expected "Total: $10.79" to be present in the Checkout Overview section');
        
        await CheckoutPage.clickFinishBtn();
        await CheckoutPage.waitForCheckoutCompletePageLoaded()
        await expect(await CheckoutPage.isOverviewCompleteContains('THANK YOU FOR YOU ORDER')).toBe(true, '❌ Expected "THANK YOU FOR YOU ORDER" to be present in the Checkout Overview section')
        await expect(await CheckoutPage.isOverviewCompleteContains('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBe(true, '❌ Expected "Your order has been dispatched, and will arrive just as fast as the pony can get there!" to be present in the Checkout Overview section')
    })
})


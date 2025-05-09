import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import ProductsPage from '../pageobjects/products.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'

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
        await expect(CheckoutPage.getProductDescription()).toContain(productName)
        await expect(await CheckoutPage.checkoutOverviewPage.getText()).toContain('SauceCard #31337')
        await expect(await CheckoutPage.checkoutOverviewPage.getText()).toContain('FREE PONY EXPRESS DELIVERY!')
        await expect(await CheckoutPage.checkoutOverviewPage.getText()).toContain('Item total: $9.99')
        await expect(await CheckoutPage.checkoutOverviewPage.getText()).toContain('Tax: $0.80')
        await expect(await CheckoutPage.checkoutOverviewPage.getText()).toContain('Total: $10.79')
        
        await CheckoutPage.clickFinishBtn();
        await CheckoutPage.waitForCheckoutCompletePageLoaded()
        await expect(await CheckoutPage.checkoutCompletePage.getText()).toContain('THANK YOU FOR YOU ORDER')
        await expect(await CheckoutPage.checkoutCompletePage.getText()).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    })
})


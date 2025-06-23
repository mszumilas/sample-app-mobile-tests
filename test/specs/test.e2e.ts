import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import ProductsPage from '../pageobjects/products.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'
import { Strings } from '../constants/strings'
import { ScrollActions } from '../helpers/scrollActions'

describe('Swag Labs application', () => {
    it('should buy a product', async () => {
        await LoginPage.waitForLoginPageLoaded();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(ProductsPage.productsPage).toBeExisting();

        await ProductsPage.waitForProductsPageLoaded();
        await ProductsPage.addProductToCartByName(Strings.products.productName);
        await ProductsPage.assertIfCartHasLabelWithNumberOfProducts('1')
        await ProductsPage.goToCart();

        await CartPage.waitForCartPageLoaded();
        await expect(CartPage.getCartItemByName(Strings.products.productName)).toBeDisplayed();
        await CartPage.assertCartItemsNumber(1)
        await CartPage.goToCheckout();
        
        await CheckoutPage.waitForCheckoutInformationPageLoaded();
        await CheckoutPage.setFirstName(Strings.customer.firstName);
        await CheckoutPage.setLastName(Strings.customer.lastName);
        await CheckoutPage.setZipPostalCode(Strings.customer.zipPostalCode);
        await CheckoutPage.clickContinueBtn();
        
        await CheckoutPage.waitForCheckoutOverviewPageLoaded();
        await CheckoutPage.assertIfProductDescriptionContains(Strings.products.productName);
        await CheckoutPage.assertIfOverviewInformationContains(Strings.checkout.cardNumberLabel);
        await CheckoutPage.assertIfOverviewInformationContains(Strings.checkout.freeDeliveryMessage);
        await CheckoutPage.assertIfOverviewInformationContains(Strings.checkout.itemTotalPriceLabel);
        await CheckoutPage.assertIfOverviewInformationContains(Strings.checkout.taxLabel);
        await ScrollActions.scrollToElementByText(Strings.checkout.totalPriceLabel);
        await CheckoutPage.assertIfOverviewInformationContains(Strings.checkout.totalPriceLabel);
        
        await CheckoutPage.clickFinishBtn();
        await CheckoutPage.waitForCheckoutCompletePageLoaded();
        await CheckoutPage.assertIfOverviewCompleteContains(Strings.checkout.thankYouMessage);
        await CheckoutPage.assertIfOverviewCompleteContains(Strings.checkout.orderInformationMessage);
    })
})



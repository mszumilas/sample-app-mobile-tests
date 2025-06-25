import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import ProductsPage from '../pageobjects/products.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'
import { Strings } from '../constants/strings'
import { ScrollActions } from '../helpers/scrollActions'
const caps = (browser as any).capabilities
const username = caps['username'];
const password = caps['password'];

describe('Swag Labs application', () => {
    it('should buy a product', async () => {
        await LoginPage.waitForLoginPageLoaded();
        await LoginPage.loginWithPredefinedStandardUser();

        await ProductsPage.waitForProductsPageLoaded();
        await ProductsPage.addProductToCartByName(Strings.products.productName);
        await ProductsPage.goToCart();
        await ProductsPage.assertIfCartHasLabelWithNumberOfProducts('1');

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

describe('Validation error messages for empty required fields', () => {
    it('should validate login fields', async() => {
        await LoginPage.waitForLoginPageLoaded();
        await LoginPage.clickLoginButton();
        await LoginPage.assertIfErrorMessageTextContains(Strings.errors.userNameReq);
        await LoginPage.fillLogin(username);
        await LoginPage.clickLoginButton();
        await LoginPage.assertIfErrorMessageTextContains(Strings.errors.passwordReq);
    })
    it('should validate checkout information', async() => {
        await LoginPage.waitForLoginPageLoaded();
        await LoginPage.loginWithPredefinedStandardUser();
        await ProductsPage.waitForProductsPageLoaded();
        await ProductsPage.goToCart();
        await CartPage.goToCheckout();
        await CheckoutPage.waitForCheckoutInformationPageLoaded();

        await CheckoutPage.clickContinueBtn();
        await LoginPage.assertIfErrorMessageTextContains(Strings.errors.firstNameReq);
        await CheckoutPage.setFirstName(Strings.customer.firstName);
        await CheckoutPage.clickContinueBtn();
        await LoginPage.assertIfErrorMessageTextContains(Strings.errors.lastNameReq);
        await CheckoutPage.setLastName(Strings.customer.lastName);
        await CheckoutPage.clickContinueBtn();
        await LoginPage.assertIfErrorMessageTextContains(Strings.errors.zipPostalCodeReq);
    });
});

describe('Product page tests', () => {
    it('should sort by name', async() => {
        await LoginPage.waitForLoginPageLoaded();
        await LoginPage.loginWithPredefinedStandardUser();
        await ProductsPage.waitForProductsPageLoaded();

        await ProductsPage.clickSortButton();
        await ProductsPage.sortBy(Strings.sorting.nameAtoZ);
        await ProductsPage.assertIfProductsAreSortedByNameAToZ();
        await ProductsPage.clickSortButton();
        await ProductsPage.sortBy(Strings.sorting.nameZtoA);
        await ProductsPage.assertIfProductsAreSortedByNameZToA();
        await ProductsPage.clickSortButton();
        await ProductsPage.sortBy(Strings.sorting.priceLowToHigh);
        await ProductsPage.assertIfProductsAreSortedByPriceLowToHigh();
        await ProductsPage.clickSortButton();
        await ProductsPage.sortBy(Strings.sorting.priceHighToLow);
        await ProductsPage.assertIfProductsAreSortedByPriceHighToLow();
    })
});

describe('Cart page tests', () => {
    it('should remove item from cart', async() => {
        await LoginPage.waitForLoginPageLoaded();
        await LoginPage.loginWithPredefinedStandardUser();
        await ProductsPage.waitForProductsPageLoaded();

        await ProductsPage.addProductToCartByName(Strings.products.productName);
        await ProductsPage.addProductToCartByName(Strings.products.productName1);
        await ProductsPage.goToCart();
        await ProductsPage.assertIfCartHasLabelWithNumberOfProducts('2');

        await CartPage.waitForCartPageLoaded();
        await CartPage.clickRemoveButton();
        await ProductsPage.waitForCartCountToChange(2);
        await ProductsPage.assertIfCartHasLabelWithNumberOfProducts('1');
    })
})

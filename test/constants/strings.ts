import productsPage from "../pageobjects/products.page";

export const Strings = {
    products: {
        productPage: 'Product page',
        productName: 'Sauce Labs Bike Light',
        productName1: 'Sauce Labs Backpack'
    },
    sorting: {
        nameAtoZ: 'Name (A to Z)',
        nameZtoA: 'Name (Z to A)',
        priceLowToHigh: 'Price (low to high)',
        priceHighToLow: 'Price (high to low)'
    },
    customer: {
        firstName: 'Test',
        lastName: 'User',
        zipPostalCode: '23456'
    },
    checkout: {
        totalPriceLabel: 'Total: $10.79',
        itemTotalPriceLabel: 'Item total: $9.99',
        taxLabel: 'Tax: $0.80',
        freeDeliveryMessage: 'FREE PONY EXPRESS DELIVERY!',
        cardNumberLabel: 'SauceCard #31337',
        thankYouMessage: 'THANK YOU FOR YOU ORDER',
        orderInformationMessage: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    },
    elements: {
        productsPage: 'Product page',
        productDescription: 'Product description',
        checkoutOverview: 'Checkout overview page',
        checkoutComplete: 'Checkout overview complete page',
        checkoutInfo: 'Checkout information page',
        productsInfo: 'Product info',
        cartLabel: 'Cart label',
        errorMessage: 'Error message',
        loginPage: 'Login page'
    },
    errors: {
        userNameReq: 'Username is required',
        passwordReq: 'Password is required',
        firstNameReq: 'First Name is required',
        lastNameReq: 'Last Name is required',
        zipPostalCodeReq: 'Postal Code is required'
    }
}
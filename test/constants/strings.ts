import productsPage from "../pageobjects/products.page";

export const Strings = {
    products: {
        productPage: 'Product page',
        productName: 'Sauce Labs Bike Light'
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
    assertions: {
        shouldContainText: 'expected to contain',
        expectedOverviewText: '❌ Expected overview info to contain',
        expectedDescriptionText: '❌ Expected product description to contain',
        expectedOverviewCompleteText: '❌ Expected overview complete to contain',
        expectedCartLabel: '❌ Expected cart label to contain'
    },
    elements: {
        productsPage: 'Product page',
        productDescription: 'Product description',
        productOverview: ' Product overview',
        productComplete: ' Product overview complete',
        productsInfo: 'Product info',
        cartLabel: 'Cart label'
    }
}
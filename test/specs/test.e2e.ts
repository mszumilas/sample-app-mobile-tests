import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import ProductsPage from '../pageobjects/products.page'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.waitForLoginPageLoaded()
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(ProductsPage.productsPage).toBeExisting();
    })
    it('should buy ')
})


import { $ } from '@wdio/globals'
import Page from "./page";

class CheckoutPage extends Page {
    finishBtnSelector = '~test-FINISH';
    public get firstNameInput() {
        return $('~test-First Name')
    }
    public get lastNameInput() {
        return $('~test-Last Name')
    }
    public get zipPostalCodeInput() {
        return $('~test-Zip/Postal Code')
    }
    public get continueBtn() {
        return $('~test-CONTINUE')
    }
    public get checkoutOverviewPage() {
        return $('~test-CHECKOUT: OVERVIEW')
    }
    public get checkoutCompletePage() {
        return $('~test-CHECKOUT: COMPLETE!')
    }
    public get checkoutInformationPage() {
        return $('~test-Checkout: Your Info')
    }
    public get productDescription() {
        return $('~test-Description')
    }
    public get finishBtn() {
        return $(`${this.finishBtnSelector}`)
    }

    public async setFirstName(firstName: string) {
        await this.firstNameInput.setValue(firstName);
    }
    public async setLastName(lastName: string) {
        await this.lastNameInput.setValue(lastName);
    }
    public async setZipPostalCode(zipPostalCode: string) {
        await this.zipPostalCodeInput.setValue(zipPostalCode);
    }
    public async clickContinueBtn() {
        await this.continueBtn.click();
    }
    public async clickFinishBtn() {
        await this.scrollToAccessibilityId(this.finishBtnSelector)
        await this.finishBtn.click();
    }

    public async getProductDescription() {
        const description = await this.productDescription;
        const text = await description.getText();
        return text;
    }

    public async waitForCheckoutOverviewPageLoaded(): Promise<void> {
        await this.checkoutOverviewPage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Checkout overview page did not load within 10s'
        })
    }
    public async waitForCheckoutInformationPageLoaded(): Promise<void> {
        await this.checkoutInformationPage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Checkout information page did not load within 10s'
        })
    }
    public async waitForCheckoutCompletePageLoaded(): Promise<void> {
        await this.checkoutCompletePage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Checkout complete page did not load within 10s'
        })
    }
}
export default new CheckoutPage();
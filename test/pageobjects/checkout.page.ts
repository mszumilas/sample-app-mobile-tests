import { $ } from '@wdio/globals'
import Page from "./page";
import { ElementActions } from '../helpers/elementActions';
import { ScrollActions } from '../helpers/scrollActions';
import { AssertionsHelper } from '../helpers/assertionsHelper';
import { Strings } from '../constants/strings';
import { WaitActions } from '../helpers/waitActions';

class CheckoutPage extends Page {
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
        return '~test-CONTINUE'
    }
    public get checkoutOverviewPage() {
        return '~test-CHECKOUT: OVERVIEW'
    }
    public get checkoutCompletePage() {
        return '~test-CHECKOUT: COMPLETE!'
    }
    public get checkoutInformationPage() {
        return '~test-Checkout: Your Info'
    }
    public get productDescription() {
        return '~test-Description'
    }
    public get finishBtn() {
        return '~test-FINISH'
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
        await ElementActions.clickElement(this.continueBtn);
    }
    public async clickFinishBtn() {
        await ScrollActions.scrollToElement(this.finishBtn)
        await ElementActions.clickElement(this.finishBtn);
    }

    public async assertIfProductDescriptionContains(expectedText: string) {
        const description = await this.productDescription;
        await AssertionsHelper.assertIfElementTextViewsContain(
            description, 
            Strings.elements.productDescription, 
            expectedText);
    }

    public async assertIfOverviewInformationContains(expectedText: string) {
        const checkoutOverview = await this.checkoutOverviewPage;
        await AssertionsHelper.assertIfElementTextViewsContain(
            checkoutOverview, 
            Strings.elements.checkoutOverview, 
            expectedText);
    }

    public async assertIfOverviewCompleteContains(expectedText: string) {
        const completeElement = await this.checkoutCompletePage;
        await AssertionsHelper.assertIfElementTextViewsContain(
            completeElement, 
            Strings.elements.checkoutComplete, 
            expectedText);
    }

    public async waitForCheckoutOverviewPageLoaded(): Promise<void> {
        await WaitActions.waitForElement(this.checkoutOverviewPage, Strings.elements.checkoutOverview);
    }
    public async waitForCheckoutInformationPageLoaded(): Promise<void> {
        await WaitActions.waitForElement(this.checkoutInformationPage, Strings.elements.checkoutInfo);
    }
    public async waitForCheckoutCompletePageLoaded(): Promise<void> {
        await WaitActions.waitForElement(this.checkoutCompletePage, Strings.elements.checkoutComplete);
    }
}
export default new CheckoutPage();
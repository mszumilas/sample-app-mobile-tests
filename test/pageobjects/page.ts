import { $, browser, driver } from '@wdio/globals'
import { AssertionsHelper } from '../helpers/assertionsHelper'
import { Strings } from '../constants/strings'
export default class BasePage {

    get errorMessage() {
        return '~test-Error message'
    }

    async assertIfErrorMessageTextContains(errorText: string) {
        AssertionsHelper.assertIfElementIsDisplayed(this.errorMessage, Strings.elements.errorMessage);
        AssertionsHelper.assertIfElementTextViewsContain(this.errorMessage, Strings.elements.errorMessage, errorText);
    }
}

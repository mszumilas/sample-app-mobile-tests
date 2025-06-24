import { $ } from '@wdio/globals'
import Page from './page';
import { ElementActions } from '../helpers/elementActions';
import { WaitActions } from '../helpers/waitActions';
import { Strings } from '../constants/strings';
import { ScrollActions } from '../helpers/scrollActions';

class LoginPage extends Page {
    public get loginPage () {
        return '~test-Login';
    }
    public get inputUsername () {
        return $('~test-Username');
    }

    public get inputPassword () {
        return $('~test-Password');
    }

    public get btnLogin () {
        return '~test-LOGIN';
    }

    public get standardUserLink () {
        return '~test-standard_user';
    }

    public async login (username: string, password: string) {
        await this.fillLogin(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    public async loginWithPredefinedStandardUser() {
        await ScrollActions.scrollToElement(this.standardUserLink);
        await ElementActions.clickElement(this.standardUserLink);
        await ElementActions.clickElement(this.btnLogin);
    }

    public async waitForLoginPageLoaded(): Promise<void> {
        await WaitActions.waitForElement(this.loginPage, Strings.elements.loginPage)
    }
    async clickLoginButton() {
        await ElementActions.clickElement(this.btnLogin);
    }
    async fillLogin(username) {
        (await this.inputUsername).setValue(username);
    }
    async fillPassword(password) {
        (await this.inputPassword).setValue(password);
    }
}

export default new LoginPage();

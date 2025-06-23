import { $ } from '@wdio/globals'
import Page from './page';
import { ElementActions } from '../helpers/elementActions';

class LoginPage extends Page {
    public get loginPage () {
        return $('~test-Login');
    }
    public get inputUsername () {
        return $('~test-Username');
    }

    public get inputPassword () {
        return $('~test-Password');
    }

    public get btnLogin () {
        return $('~test-LOGIN');
    }

    public get standardUserLink () {
        return $("~test-standard_user");
    }

    public async login (username: string, password: string) {
        await this.fillLogin(username);
        await this.fillPassword(password);
        await this.btnLogin.click();
    }

    public async loginWithPredefinedStandardUser() {
        await this.standardUserLink.click();
        await this.btnLogin.click();
    }

    public async waitForLoginPageLoaded(): Promise<void> {
        await this.loginPage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Login page did not load within 10s'
        })
    }
    async clickLoginButton() {
        await ElementActions.clickElement(await this.btnLogin);
    }
    async fillLogin(username) {
        (await this.inputUsername).setValue(username);
    }
    async fillPassword(password) {
        (await this.inputPassword).setValue(password);
    }
}

export default new LoginPage();

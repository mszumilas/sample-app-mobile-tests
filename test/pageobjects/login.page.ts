import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
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

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
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
}

export default new LoginPage();

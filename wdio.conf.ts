import { $, browser, driver } from '@wdio/globals';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import type { Browser } from 'webdriverio';
dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,

    specs: ['./test/specs/**/*.ts'],
    exclude: [],

    maxInstances: 10,

    capabilities: [
        {
            platformName: process.env.PLATFORM_NAME || 'Android',
            'appium:deviceName': process.env.DEVICE_NAME || 'Pixel_3a_API_30_x86',
            'appium:platformVersion': process.env.PLATFORM_VERSION || '11.0',
            'appium:automationName': process.env.AUTOMATION_NAME || 'UiAutomator2',
            'appium:app': process.env.APP_PATH || 'app/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk',
            'appium:appWaitActivity': '*',
            ['appium:username']: process.env.USERNAME_SWAG,
            ['appium:password']: process.env.PASSWORD_SWAG
        } as any
    ],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        bail: false
    },

    //hooks
    beforeTest: async function (test, context) {
        console.log(`Starting test: ${test.title}`);
    },
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const sanitizedTitle = test.title.replace(/\s+/g, '_').replace(/[^\w]/g, '');
            const screenshotsDir = path.resolve('./screenshots');
            if (!fs.existsSync(screenshotsDir)) {
                fs.mkdirSync(screenshotsDir, { recursive: true });
            }
            const screenshotPath = path.join(screenshotsDir, `${sanitizedTitle}.png`);
            await browser.saveScreenshot(screenshotPath);
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
        }
        await driver.terminateApp('com.swaglabsmobileapp', {});
        await driver.activateApp('com.swaglabsmobileapp');
    },
    after: async function (result, capabilities, specs) {
        console.log('Test suite finished.');
    },
};

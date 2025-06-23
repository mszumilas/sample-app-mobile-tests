import * as dotenv from 'dotenv'
dotenv.config()
export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './test/tsconfig.json',
    port: 4723,
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        // capabilities for local Appium web tests on an Android Emulator
        platformName: process.env.PLATFORM_NAME || 'Android',
        'appium:deviceName': process.env.DEVICE_NAME || 'Pixel_3a_API_30_x86',
        'appium:platformVersion': process.env.PLATFORM_VERSION || '11.0',
        'appium:automationName': process.env.AUTOMATION_NAME || 'UiAutomator2',
        'appium:app': process.env.APP_PATH ||'app/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk',
        'appium:appWaitActivity': '*'
    }],
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
        timeout: 60000
    },
}

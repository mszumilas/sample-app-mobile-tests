# 📱 Mobile App E2E Testing with Appium (Android)

This project contains end-to-end (E2E) tests for an Android application using **Appium**, **WebdriverIO**, and **TypeScript**. 
It automates test scenarios to ensure the quality and functionality of the mobile app.

---

## ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version recommended, e.g. 18.x or 20.x)
- **npm** or **Yarn**
- **Java Development Kit (JDK)** – version 11 or newer
- **Android Studio** with:
  - Android SDK
  - Android Virtual Device (AVD)
- **Appium**
- **Appium Doctor** (optional for troubleshooting)
- **WebdriverIO CLI**

---

## 📦 Installation

```bash
# Clone the repository
git clone git@github.com:mszumilas/sample-app-mobile-tests.git
cd ../sample-app-mobile-tests

# Install dependencies
npm install
```
---
## ⚙️ Configuration
Appium and WebDriverIO settings are defined in the wdio.conf.ts file, retrieve from .env file.
You can adjust them in .env file:

- The path to your .apk file
- Device/emulator configuration
- Appium server settings

## 🚀 Running the Tests
Start Appium server

If installed globally:
```bash
appium
```
Check available emulators:
```bash
emulator -list-avds
```
Run emulator:
```bash
emulator -avd <name of available emulator>
```
Run tests:
```bash
npm run test
```

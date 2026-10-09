---
id: desktop
title: डेस्कटॉप ऐप्स
description: नेटिव macOS ऐप्स के लिए, और macOS, Windows तथा Linux पर Electron, Tauri और Dioxus ऐप्स के लिए सही WebdriverIO सेटअप चुनें, और अपना पहला टेस्ट चलाएँ।
---

WebdriverIO किसी डेस्कटॉप ऐप को कैसे ऑटोमेट करता है, यह इस बात पर निर्भर करता है कि ऐप कैसे बनाया गया है। नेटिव macOS ऐप्स को [Appium](/docs/appium) के माध्यम से Mac2 ड्राइवर (`'appium:automationName': 'Mac2'`) के साथ ऑटोमेट किया जाता है, जिसके लिए Xcode आवश्यक है। वेब-आधारित फ्रेमवर्क से बने ऐप्स को एक समर्पित WebdriverIO सर्विस द्वारा उनके एम्बेडेड ब्राउज़र इंजन के माध्यम से चलाया जाता है। [Electron सर्विस](/docs/desktop-testing/electron) स्वतः इंस्टॉल होने वाले Chromedriver के माध्यम से Chromium का उपयोग करती है और Electron मेन-प्रोसेस APIs को भी कॉल कर सकती है। [Tauri सर्विस](/docs/desktop-testing/tauri) और [Dioxus सर्विस](/docs/desktop-testing/dioxus) ऑपरेटिंग सिस्टम के webview को चलाती हैं: Windows पर WebView2, macOS पर WKWebView और Linux पर WebKitGTK। ये तीनों सर्विसेज़ एक ही टेस्ट सूट को Windows, macOS और Linux पर चलाती हैं। नेटिव Windows ऐप्स के लिए वर्तमान में कोई अनुशंसित ड्राइवर नहीं है: Appium का Windows Driver, Microsoft के WinAppDriver पर आधारित है, जिसका अब रखरखाव नहीं किया जाता। मनमाने नेटिव Linux ऐप्स को ऑटोमेट करने के लिए कोई प्रलेखित समर्थन उपलब्ध नहीं है।

| ऐप का प्रकार | macOS | Windows | Linux | कैसे |
|----------|-------|---------|-------|-----|
| नेटिव ऐप | हाँ | अनुशंसित नहीं | प्रलेखित नहीं | Appium Mac2 ड्राइवर |
| Electron | हाँ | हाँ | हाँ | `@wdio/electron-service` (Chromedriver) |
| Tauri | हाँ | हाँ | हाँ | `@wdio/tauri-service` (एम्बेडेड प्लगइन, `tauri-driver` या CrabNebula) |
| Dioxus | हाँ | हाँ | हाँ | `@wdio/dioxus-service` (एम्बेडेड ड्राइवर; बाहरी ड्राइवर केवल Windows पर) |

## त्वरित शुरुआत

`npm create wdio@latest ./` इन सभी का ढाँचा तैयार करता है। "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications" चुनें और फिर अपना फ्रेमवर्क चुनें। नीचे दिए गए हर सेटअप के लिए `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` और `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]` के साथ एक `tsconfig.json` भी आवश्यक है।

### Electron (macOS, Windows, Linux)

```sh
npm install --save-dev @wdio/electron-service
```

```ts title="wdio.conf.ts"
/// <reference types="@wdio/electron-service" />
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'electron',
        'wdio:electronServiceOptions': {
            // केवल तभी आवश्यक है जब Electron Forge / electron-builder आउटपुट का स्वतः पता लगाना विफल हो जाए
            // appBinaryPath: './dist-electron/linux-unpacked/myApp',
            appArgs: []
        }
    }],
    services: ['electron'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { browser } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        console.log('Hello', await browser.getTitle(), 'application!')
    })
})
```

मेन प्रोसेस में कोड चलाने के लिए `browser.electron.execute((electron, ...args) => { ... })` का उपयोग करें, और Electron APIs को मॉक करने के लिए `browser.electron.mock()` का उपयोग करें।

### नेटिव macOS ऐप (Appium Mac2)

```sh
npm install --save-dev @wdio/appium-service appium appium-mac2-driver
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Mac',
        'appium:automationName': 'Mac2',
        'appium:bundleId': 'com.apple.calculator'
    }],
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/calculator.e2e.ts"
import { expect, $ } from '@wdio/globals'

describe('MacOS Testing', () => {
    it('should calculate the meaning of life', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    })
})
```

`appium:bundleId` उस ऐप को चुनता है जिसे सेशन शुरू होने पर लॉन्च किया जाना है।

### Tauri और Dioxus

दोनों के लिए आपके ऐप में Rust की ओर से कुछ जोड़ना आवश्यक है, इसलिए उनकी त्वरित शुरुआत मार्गदर्शिकाओं का पालन करें:

- Tauri: `tauri-plugin-wdio-webdriver` crate (एम्बेडेड प्रोवाइडर) जोड़ें, फिर `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]` का उपयोग करें। [Tauri Quick Start](/docs/desktop-testing/tauri/quick-start) देखें।
- Dioxus: `wdio-dioxus-bridge` crate जोड़ें और एक डीबग बिल्ड (`cargo build`) बनाएँ। फिर `browserName: 'dioxus'` और `'dioxus:options': { application: './target/debug/my-app' }` के साथ `services: [['dioxus', { driverProvider: 'embedded' }]]` का उपयोग करें। [Dioxus Quick Start](/docs/desktop-testing/dioxus/quick-start) देखें।

## अपना रास्ता चुनें

- [macOS](/docs/desktop-testing/macos): Appium और Mac2 ड्राइवर के साथ नेटिव macOS ऐप्स।
- [Windows](/docs/desktop-testing/windows): नेटिव Windows ऐप ऑटोमेशन की वर्तमान स्थिति।
- [Electron](/docs/desktop-testing/electron): सेटअप, फिर [कॉन्फ़िगरेशन](/docs/desktop-testing/electron/configuration) (प्रत्येक OS के लिए बाइनरी पाथ सहित), [Electron APIs तक पहुँच](/docs/desktop-testing/electron/api), [API संदर्भ और मॉकिंग](/docs/desktop-testing/electron/api-reference), [विंडो प्रबंधन](/docs/desktop-testing/electron/window-management), [डीपलिंक्स](/docs/desktop-testing/electron/deeplink-testing), [स्टैंडअलोन मोड](/docs/desktop-testing/electron/standalone) और [डीबगिंग](/docs/desktop-testing/electron/debugging)।
- [Tauri](/docs/desktop-testing/tauri): [प्लेटफ़ॉर्म समर्थन](/docs/desktop-testing/tauri/platform-support), [कॉन्फ़िगरेशन](/docs/desktop-testing/tauri/configuration), [प्लगइन सेटअप](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Windows पर Edge WebDriver](/docs/desktop-testing/tauri/edge-webdriver-windows), [उपयोग के उदाहरण](/docs/desktop-testing/tauri/usage-examples) और [API संदर्भ](/docs/desktop-testing/tauri/api)।
- [Dioxus](/docs/desktop-testing/dioxus): [प्लेटफ़ॉर्म समर्थन](/docs/desktop-testing/dioxus/platform-support), [कॉन्फ़िगरेशन](/docs/desktop-testing/dioxus/configuration), [ब्रिज सेटअप](/docs/desktop-testing/dioxus/plugin-setup), [ब्राउज़र मोड](/docs/desktop-testing/dioxus/browser-mode) (मॉक किए गए कमांड्स के साथ Chrome में केवल फ्रंटएंड टेस्ट), [उपयोग के उदाहरण](/docs/desktop-testing/dioxus/usage-examples) और [API संदर्भ](/docs/desktop-testing/dioxus/api)।
- [Multi-remote](/docs/multiremote): Electron, Tauri और Dioxus सर्विसेज़ multi-remote सेशन्स का समर्थन करती हैं, उदाहरण के लिए एक ही टेस्ट में दो ऐप इंस्टेंस।

## Linux

Linux पर, WebdriverIO Electron, Tauri और Dioxus ऐप्स को चलाता है। जानने योग्य बातें:

- हेडलेस CI: इन ऐप्स को एक डिस्प्ले सर्वर की आवश्यकता होती है। जब कोई डिस्प्ले मौजूद नहीं होता, तो टेस्टरनर Weston शुरू करता है, या विकल्प के रूप में Xvfb। यदि दोनों में से कोई भी इंस्टॉल नहीं है, तो एक को इंस्टॉल करने के लिए `displayServerAutoInstall: true` सेट करें। वैकल्पिक रूप से, टेस्टरनर को xvfb-run के साथ रैप करें, उदाहरण के लिए `xvfb-run -a npx wdio run wdio.conf.ts`। [Headless & Display Servers](/docs/headless-and-display-servers) देखें।
- `official` प्रोवाइडर के साथ Tauri को WebKitWebDriver (`webkit2gtk-driver` पैकेज) की आवश्यकता होती है। `embedded` प्रोवाइडर को किसी बाहरी ड्राइवर की आवश्यकता नहीं होती।
- Linux पर Dioxus केवल `embedded` प्रोवाइडर का समर्थन करता है, और Dioxus ऐप्स बनाने के लिए WebKitGTK डेवलपमेंट लाइब्रेरीज़ आवश्यक हैं।
- Ubuntu 24.04+ और अन्य AppArmor-सक्षम डिस्ट्रीब्यूशन्स पर Electron: यदि Electron शुरू होने में विफल रहता है, तो सर्विस विकल्प `apparmorAutoInstall` सेट करें।

## समस्या निवारण

- Electron: [सामान्य समस्याएँ](/docs/desktop-testing/electron/common-issues), उदाहरण के लिए CI में "DevToolsActivePort file doesn't exist"।
- Tauri: [समस्या निवारण](/docs/desktop-testing/tauri/troubleshooting), जिसमें Edge WebDriver और WebView2 संस्करणों का बेमेल होना शामिल है।
- Dioxus: [समस्या निवारण](/docs/desktop-testing/dioxus/troubleshooting)।
- macOS: Xcode जैसे ड्राइवर-विशिष्ट सेटअप के लिए [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) प्रोजेक्ट देखें।

## अगले कदम

- हर `wdio.conf.ts` विकल्प के लिए [कॉन्फ़िगरेशन](/docs/configuration) संदर्भ।
- Mac2 सेटअप के लिए [Appium Service](/docs/appium-service) विकल्प।
- अन्य प्लेटफ़ॉर्म: [वेब ब्राउज़र](/docs/platforms/web), [मोबाइल ऐप्स](/docs/platforms/mobile), [एक्सटेंशन और एडिटर](/docs/platforms/apps-and-extensions)।
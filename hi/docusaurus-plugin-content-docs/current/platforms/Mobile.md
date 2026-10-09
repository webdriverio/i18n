---
id: mobile
title: मोबाइल ऐप्स
description: Android और iOS एमुलेटर, सिम्युलेटर, वास्तविक डिवाइस और डिवाइस क्लाउड पर नेटिव, हाइब्रिड और मोबाइल वेब ऐप्स के लिए WebdriverIO टेस्ट सेट अप करें और चलाएँ।
---

WebdriverIO [Appium](/docs/appium) के माध्यम से Android और iOS को ऑटोमेट करता है, जो WebDriver प्रोटोकॉल का उपयोग करता है। आपके टेस्ट ब्राउज़र टेस्ट की तरह ही वही `browser` ऑब्जेक्ट (जिसका उपनाम `driver` है), `$`/`$$` सेलेक्टर और `expect` मैचर्स का उपयोग करते हैं। Appium हर सेशन को `appium:automationName` द्वारा चुने गए प्लेटफ़ॉर्म ड्राइवर पर भेजता है। Android के लिए यह `UiAutomator2` है, और Espresso एक विकल्प है जो अतिरिक्त सेलेक्टर रणनीतियाँ उपलब्ध कराता है। iOS और iPadOS के लिए यह `XCUITest` है। इन ड्राइवरों के साथ आप नेटिव ऐप्स और Android पर Chrome या iOS पर Safari में मोबाइल वेब का परीक्षण कर सकते हैं। आप हाइब्रिड ऐप्स का भी परीक्षण कर सकते हैं, जिसमें नेटिव कॉन्टेक्स्ट और एम्बेडेड वेबव्यू के बीच स्विच किया जाता है। सेशन Android एमुलेटर, iOS सिम्युलेटर, वास्तविक डिवाइस, या Sauce Labs, BrowserStack, TestingBot और TestMu AI जैसे डिवाइस क्लाउड पर चल सकते हैं। [`@wdio/appium-service`](/docs/appium-service) आपके लिए एक लोकल Appium सर्वर शुरू और बंद करता है। मूल Appium API के ऊपर, WebdriverIO क्रॉस-प्लेटफ़ॉर्म [मोबाइल कमांड](/docs/api/mobile) जोड़ता है, जैसे `tap`, `swipe`, `longPress`, `scrollIntoView` और `switchContext`।

## त्वरित शुरुआत

पूर्वापेक्षाएँ: Android के लिए Android SDK और एक एमुलेटर के साथ Android Studio; iOS के लिए macOS पर Xcode और एक सिम्युलेटर। `npx appium-installer` एनवायरनमेंट सेटअप में आपका मार्गदर्शन करता है, और `npm init wdio@latest .` एक मोबाइल प्रोजेक्ट तैयार करता है (Android या iOS चुनें)। मैन्युअल रूप से सेट अप करने के लिए:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/appium-service appium tsx
npx appium driver install uiautomator2   # Android
npx appium driver install xcuitest       # iOS
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './path/to/app.apk'
    }],
    services: ['appium'],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { expect, driver, $ } from '@wdio/globals'

describe('My app', () => {
    it('should open the contacts screen', async () => {
        await $('~Contacts').click()
        await expect($('~Add contact')).toBeDisplayed()
    })

    it('should interact with a webview', async () => {
        await driver.switchContext({ title: 'My Webview Title' })
        await expect($('h1')).toBeDisplayed()
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

`~` एक्सेसिबिलिटी id सेलेक्टर है: यह Android पर `content-description` और iOS पर `accessibilityIdentifier` से मैप होता है, और यह पसंदीदा क्रॉस-प्लेटफ़ॉर्म रणनीति है। उदाहरण के id, वेबव्यू शीर्षक और ऐप पाथ को अपने स्वयं के मानों से बदलें।

अन्य लक्ष्यों के लिए केवल कैपेबिलिटीज़ बदलती हैं:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // सिम्युलेटर के लिए .app, वास्तविक डिवाइस के लिए साइन किया हुआ .ipa
}
```

```ts title="Mobile web (Chrome on an Android emulator)"
{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2'
}
```

iOS मोबाइल वेब के लिए, `platformName: 'iOS'`, `browserName: 'Safari'` और `'appium:automationName': 'XCUITest'` का उपयोग करें।

## अपना रास्ता चुनें

- [Appium सेटअप](/docs/appium): Appium किन प्लेटफ़ॉर्म को कवर करता है (iOS, Android, Tizen, TV ऐप्स) और टूलचेन कैसे इंस्टॉल करें।
- [Appium सर्विस](/docs/appium-service): सर्विस विकल्प (`args`, `command`, `logPath`), Appium Inspector खोलने के लिए `npx start-appium-inspector`, और धीमे XPath सेलेक्टर के लिए एक बीटा ऑप्टिमाइज़र।
- [मोबाइल कमांड](/docs/api/mobile): क्रॉस-प्लेटफ़ॉर्म जेस्चर और हेल्पर। [`getContexts`](/docs/api/mobile/getContexts) और [`switchContext`](/docs/api/mobile/switchContext) के साथ हाइब्रिड ऐप्स को कवर करता है, साथ ही iOS के लिए वेबव्यू कैपेबिलिटीज़ भी।
- [मोबाइल सेलेक्टर](/docs/selectors#mobile-selectors): एक्सेसिबिलिटी id, Android UiAutomator, Espresso data/view मैचर्स और iOS predicate strings और class chains।
- [Appium प्रोटोकॉल कमांड](/docs/api/appium): `driver` पर उपलब्ध मूल Appium एंडपॉइंट्स।
- [Flutter ऐप्स](/docs/flutter-testing/introduction): Flutter को Appium Flutter Driver की आवश्यकता क्यों है, फिर [ऐप तैयार करें](/docs/flutter-testing/preparing-flutter-application), [Appium कॉन्फ़िगर करें](/docs/flutter-testing/base-appium-configuration), [WebdriverIO सेट अप करें](/docs/flutter-testing/setting-up-webdriverio) और [टेस्ट लिखें](/docs/flutter-testing/writing-tests)।
- [क्लाउड सर्विसेज़](/docs/cloudservices): होस्ट किए गए वास्तविक डिवाइस पर चलाने के लिए Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto या RobotActions से कनेक्ट करें।
- [विज़ुअल टेस्टिंग](/docs/visual-testing): नेटिव ऐप्स, हाइब्रिड ऐप्स और मोबाइल ब्राउज़र के लिए इमेज तुलना। मोबाइल पर Percy के लिए, [App Percy](/docs/visual-testing/integrate-with-app-percy) देखें।
- [मल्टी-रिमोट](/docs/multiremote): एक ही टेस्ट में कई डिवाइस या ब्राउज़र का समन्वय करें।

[`browser.emulate('device', ...)`](/docs/emulation) के साथ डेस्कटॉप ब्राउज़र में डिवाइस व्यूपोर्ट का अनुकरण करना मोबाइल टेस्टिंग नहीं है। डेस्कटॉप ब्राउज़र इंजन मोबाइल इंजनों से भिन्न होते हैं, इसलिए इसके बजाय वास्तविक मोबाइल ब्राउज़र के साथ Appium का उपयोग करें।

## समस्या निवारण

- सेशन शुरू नहीं होता: सुनिश्चित करें कि आपके `appium:automationName` के लिए Appium ड्राइवर इंस्टॉल है और एमुलेटर या सिम्युलेटर चल रहा है। जब तक आपने Appium पोर्ट नहीं बदला है, `port: 4723` का उपयोग करें।
- iOS वेबव्यू नहीं ढूंढ पाता: `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` या `appium:includeSafariInWebviews` आज़माएँ ([हाइब्रिड ऐप्स](/docs/api/mobile#hybrid-apps) देखें)।
- Android वेबव्यू दिखने में धीमा है: `getContexts`/`switchContext` पर `androidWebviewConnectionRetryTime` और `androidWebviewConnectTimeout` को समायोजित करें।
- नेटिव सेलेक्टर से Flutter विजेट नहीं मिलते: यह अपेक्षित है। [Flutter गाइड](/docs/flutter-testing/introduction) में वर्णित Flutter ड्राइवर और फ़ाइंडर्स का उपयोग करें।

## अगले कदम

- [कॉन्फ़िगरेशन](/docs/configuration) और [कैपेबिलिटीज़](/docs/capabilities) संदर्भ।
- Android और iOS स्पेक्स के बीच स्क्रीन साझा करने के लिए [पेज ऑब्जेक्ट पैटर्न](/docs/pageobjects)।
- [MCP](/docs/mcp) ताकि एक AI एजेंट Appium के माध्यम से iOS और Android सेशन चला सके।
- अन्य प्लेटफ़ॉर्म: [वेब ब्राउज़र](/docs/platforms/web), [डेस्कटॉप ऐप्स](/docs/platforms/desktop), [एक्सटेंशन और एडिटर](/docs/platforms/apps-and-extensions)।
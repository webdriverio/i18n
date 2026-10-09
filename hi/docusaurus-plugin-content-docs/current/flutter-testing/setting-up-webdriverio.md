---
id: setting-up-webdriverio
title: अपने एनवायरनमेंट में WebdriverIO सेट अप करना
description: "Android और iOS पर Appium Flutter Driver के साथ Flutter ऐप शुरू करने के लिए wdio.conf.ts और Appium capabilities कॉन्फ़िगर करें।"
---

`wdio.conf.ts` फ़ाइल किसी भी WebdriverIO प्रोजेक्ट की मुख्य कॉन्फ़िगरेशन फ़ाइल है। यहीं पर आप परिभाषित करते हैं कि टेस्ट कहाँ चलेंगे, कौन-से टेस्ट फ़्रेमवर्क उपयोग किए जाएँगे, और Flutter एप्लिकेशन को सही ढंग से इनिशियलाइज़ करने के लिए Appium को आवश्यक `capabilities` क्या होंगी।

:::warning
`appium-flutter-driver` पारंपरिक नेटिव ड्राइवरों (जैसे `UiAutomator2` या `XCUITest`) से अलग तरीके से काम करता है। यह एक कस्टमाइज़्ड प्रोटोकॉल के माध्यम से Flutter के टेस्ट एक्सटेंशन (`flutter_driver`) के साथ संवाद करता है। इसी कारण, मानक नेटिव ऑटोमेशन कमांड शायद उसी तरह काम न करें या उनके लिए `appium-flutter-finder` का उपयोग अनिवार्य हो सकता है।

सीमाओं, समर्थित कमांड और प्रोटोकॉल एक्सटेंशन को पूरी तरह समझने के लिए, टूल की आधिकारिक रिपॉज़िटरी देखें: [GitHub पर Appium Flutter Driver](https://github.com/appium/appium-flutter-driver)।
:::

### Capabilities कॉन्फ़िगरेशन (Android और iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... wdio.conf.ts के अन्य कॉन्फ़िगरेशन (runner, specs, आदि)
    

    services: [
        ['appium', {
            // WebdriverIO, Appium सर्वर के लाइफ़साइकल को प्रबंधित करता है
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // ANDROID कॉन्फ़िगरेशन
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Flutter ड्राइवर के अनिवार्य उपयोग को सेट करता है
            'appium:deviceName': 'Android_Emulator', // आपके कॉन्फ़िगर किए गए एमुलेटर या रियल डिवाइस का नाम
            // पाथ संबंधी टिप्पणी (नीचे ऑपरेटिंग सिस्टम नोट देखें)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // IOS कॉन्फ़िगरेशन (macOS आवश्यक)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Flutter ड्राइवर के अनिवार्य उपयोग को सेट करता है
            'appium:deviceName': 'iPhone Simulator', // iOS सिम्युलेटर या रियल डिवाइस का नाम
            'appium:platformVersion': '17.2', // अपने लक्षित OS वर्ज़न में बदलें
            // पाथ संबंधी टिप्पणी (नीचे ऑपरेटिंग सिस्टम नोट देखें)
            // iOS सिम्युलेटर के लिए .app, या रियल iOS डिवाइस के लिए .ipa का उपयोग करें
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... बाकी कॉन्फ़िगरेशन
};
```

### फ़ाइल पाथ (appium:app) पर महत्वपूर्ण टिप्पणियाँ

`appium:app` प्रॉपर्टी के अंदर बाइनरी एप्लिकेशन पाथ (Android के लिए `.apk`, iOS के लिए `.app` या `.ipa`) परिभाषित करते समय ऑपरेटिंग सिस्टम और लक्षित एनवायरनमेंट के अनुसार सावधानी बरतना आवश्यक है:

- **Windows पर**: ऑपरेटिंग सिस्टम डायरेक्टरी पाथ के लिए बैकस्लैश (`\`) का उपयोग करता है। Windows पर अपनी `.apk` फ़ाइल का पाथ मैप करते समय, सुनिश्चित करें कि आप अपनी कॉन्फ़िगरेशन फ़ाइल में बैकस्लैश को एस्केप करें (उदाहरण: `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) या एकसमान फ़ॉरवर्ड स्लैश (`/`) का उपयोग करें, जिन्हें Node.js द्वारा सही ढंग से पार्स किया जाता है।
- **macOS / Linux पर**: फ़ॉरवर्ड स्लैश (`/`) वाले मानक पाथ का उपयोग किया जाता है। याद रखें कि iOS बिल्ड (सिम्युलेटर के लिए `.app` या रियल डिवाइस के लिए `.ipa`) केवल macOS एनवायरनमेंट में ही कंपाइल किए जा सकते हैं।
- **iOS सिम्युलेटर बनाम रियल डिवाइस**: iOS सिम्युलेटर पर चलाते समय `.app` बंडल का और फ़िज़िकल iOS डिवाइस पर चलाते समय साइन किए गए `.ipa` पैकेज का उपयोग करें।
- **एब्सोल्यूट बनाम रिलेटिव पाथ**: विभिन्न डेवलपमेंट मशीनों और Continuous Integration (CI) एनवायरनमेंट में पोर्टेबिलिटी सुनिश्चित करने के लिए प्रोजेक्ट रूट से शुरू होने वाले रिलेटिव पाथ (`./` का उपयोग करके) का उपयोग करने की अत्यधिक अनुशंसा की जाती है।
---
id: security
title: सुरक्षा
---

WebdriverIO समाधान प्रदान करते समय सुरक्षा पहलू को ध्यान में रखता है। नीचे आपके परीक्षण को बेहतर ढंग से सुरक्षित करने के कुछ तरीके दिए गए हैं।

# संवेदनशील डेटा को छिपाना

यदि आप अपने परीक्षण के दौरान संवेदनशील डेटा का उपयोग कर रहे हैं, तो यह सुनिश्चित करना आवश्यक है कि वे सभी को दिखाई न दें, जैसे लॉग में। इसके अलावा, क्लाउड प्रदाता का उपयोग करते समय, अक्सर निजी कुंजियां शामिल होती हैं। इस जानकारी को लॉग, रिपोर्टर और अन्य टचपॉइंट से छिपाया जाना चाहिए। निम्नलिखित कुछ मास्किंग समाधान प्रदान करता है ताकि उन मूल्यों को उजागर किए बिना परीक्षण चलाया जा सके।

## WebDriverIO

### कमांड्स के टेक्स्ट वैल्यू को छिपाना

`addValue` और `setValue` कमांड्स एक बूलियन मास्क वैल्यू का समर्थन करते हैं जो WDIO और Appium लॉग के साथ-साथ रिपोर्टर में मास्क करने के लिए है। इसके अलावा, अन्य टूल, जैसे प्रदर्शन टूल और तृतीय-पक्ष टूल, भी मास्क वर्जन प्राप्त करेंगे, जिससे सुरक्षा बढ़ेगी।

उदाहरण के लिए, यदि आप एक वास्तविक प्रोडक्शन उपयोगकर्ता का उपयोग कर रहे हैं और एक पासवर्ड दर्ज करना चाहते हैं जिसे आप छिपाना चाहते हैं, तो अब निम्नलिखित के साथ यह संभव है:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

उपरोक्त WDIO लॉग और Appium लॉग से टेक्स्ट वैल्यू को छिपाएगा।

लॉग उदाहरण:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

सीमाएँ:
  - Appium में, अतिरिक्त प्लगइन्स जानकारी को लीक कर सकते हैं, भले ही हम जानकारी को छिपाने के लिए कहें।
  - क्लाउड प्रदाता HTTP लॉगिंग के लिए प्रॉक्सी का उपयोग कर सकते हैं, जो स्थापित मास्क तंत्र को बायपास करता है।

:::info

न्यूनतम आवश्यक संस्करण:
 - WDIO v9.15.0
 - Appium v2.19.0

### WDIO लॉग में छिपाना

`maskingPatterns` कॉन्फ़िगरेशन का उपयोग करके, हम WDIO लॉग से संवेदनशील जानकारी को छिपा सकते हैं। हालांकि, Appium लॉग कवर नहीं किए जाते हैं।

उदाहरण के लिए, यदि आप क्लाउड प्रदाता का उपयोग कर रहे हैं और इन्फो लेवल का उपयोग करते हैं, तो सबसे निश्चित रूप से आप उपयोगकर्ता की कुंजी को "लीक" करेंगे जैसा कि नीचे दिखाया गया है:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

इसका मुकाबला करने के लिए हम रेगुलर एक्सप्रेशन `'--key=([^ ]*)'` पास कर सकते हैं और अब लॉग में आप देखेंगे 

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

आप उपरोक्त को कॉन्फ़िगरेशन के `maskingPatterns` फील्ड में रेगुलर एक्सप्रेशन प्रदान करके प्राप्त कर सकते हैं।
  - कई रेगुलर एक्सप्रेशन के लिए, एक ही स्ट्रिंग का उपयोग करें लेकिन कॉमा से अलग किए गए मान के साथ।
  - मास्किंग पैटर्न के बारे में अधिक जानकारी के लिए, [WDIO लॉगर README में मास्किंग पैटर्न सेक्शन](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) देखें।

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

न्यूनतम आवश्यक संस्करण:
 - WDIO v9.15.0

### WDIO लॉगर्स को अक्षम करना

संवेदनशील डेटा के लॉगिंग को ब्लॉक करने का एक और तरीका लॉग लेवल को कम करना या मौन करना या लॉगर को अक्षम करना है।
इसे निम्नानुसार प्राप्त किया जा सकता है:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

## तृतीय पक्ष समाधान

### Appium
Appium अपना मास्किंग समाधान प्रदान करता है; [लॉग फिल्टर](https://appium.io/docs/en/latest/guides/log-filters/) देखें
 - उनके समाधान का उपयोग करना मुश्किल हो सकता है। एक तरीका, यदि संभव हो तो, अपनी स्ट्रिंग में `@mask@` जैसा टोकन पास करना है और इसे रेगुलर एक्सप्रेशन के रूप में उपयोग करना है
 - कुछ Appium संस्करणों में, मान भी प्रत्येक अक्षर कॉमा-सेपरेटेड के साथ लॉग किए जाते हैं, इसलिए हमें सावधान रहने की जरूरत है।
 - दुर्भाग्य से, BrowserStack इस समाधान का समर्थन नहीं करता है, लेकिन यह स्थानीय रूप से अभी भी उपयोगी है
 
पहले उल्लिखित `@mask@` उदाहरण का उपयोग करते हुए, हम `appiumMaskLogFilters.json` नामक निम्नलिखित JSON फ़ाइल का उपयोग कर सकते हैं
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

फिर appium सेवा कॉन्फिग में `logFilters` फील्ड में JSON फ़ाइल नाम पास करें:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

### BrowserStack

BrowserStack भी कुछ डेटा को छिपाने के लिए मास्किंग का कुछ स्तर प्रदान करता है; [संवेदनशील डेटा छिपाएं](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) देखें
 - दुर्भाग्य से, समाधान सब-या-कुछ नहीं है, इसलिए प्रदान किए गए कमांड के सभी टेक्स्ट वैल्यू छिपा दिए जाएंगे।
---
id: security
title: सुरक्षा
---

WebdriverIO समाधान प्रदान करते समय सुरक्षा पहलू को ध्यान में रखता है। आपके परीक्षण को बेहतर ढंग से सुरक्षित करने के लिए नीचे कुछ तरीके दिए गए हैं।

# संवेदनशील डेटा को छिपाना

यदि आप अपने परीक्षण के दौरान संवेदनशील डेटा का उपयोग कर रहे हैं, तो यह सुनिश्चित करना आवश्यक है कि वे सभी के लिए दृश्यमान न हों, जैसे लॉग में। इसके अलावा, क्लाउड प्रदाता का उपयोग करते समय, अक्सर निजी कुंजियां शामिल होती हैं। इस जानकारी को लॉग, रिपोर्टर और अन्य टचपॉइंट से छिपाया जाना चाहिए। निम्नलिखित कुछ मास्किंग समाधान प्रदान करता है जिससे उन मूल्यों को उजागर किए बिना परीक्षण चलाया जा सकता है।

## WebDriverIO

### कमांड्स के टेक्स्ट वैल्यू को छिपाना

`addValue` और `setValue` कमांड्स WDIO और Appium लॉग, साथ ही रिपोर्टर में मास्क करने के लिए बूलियन मास्क वैल्यू का समर्थन करते हैं। इसके अलावा, अन्य टूल, जैसे परफॉरमेंस टूल और थर्ड-पार्टी टूल, भी मास्क वर्जन प्राप्त करेंगे, जिससे सुरक्षा बढ़ेगी।

उदाहरण के लिए, यदि आप एक वास्तविक प्रोडक्शन उपयोगकर्ता का उपयोग कर रहे हैं और एक पासवर्ड दर्ज करना चाहते हैं जिसे आप छिपाना चाहते हैं, तो निम्नलिखित के साथ यह अब संभव है:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

उपरोक्त WDIO लॉग और Appium लॉग दोनों से टेक्स्ट वैल्यू को छिपाएगा।

लॉग उदाहरण:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

सीमाएँ:
  - Appium में, अतिरिक्त प्लगइन्स जानकारी लीक कर सकते हैं, भले ही हम जानकारी को छिपाने के लिए कहें।
  - क्लाउड प्रोवाइडर HTTP लॉगिंग के लिए प्रॉक्सी का उपयोग कर सकते हैं, जो स्थापित मास्क मैकेनिज्म को बायपास करता है।

:::info

न्यूनतम आवश्यक संस्करण:
 - WDIO v9.15.0
 - Appium v2.19.0

### WDIO लॉग में मास्किंग

`maskingPatterns` कॉन्फिगरेशन का उपयोग करके, हम WDIO लॉग से संवेदनशील जानकारी को छिपा सकते हैं। हालांकि, Appium लॉग इसमें शामिल नहीं हैं।

उदाहरण के लिए, यदि आप क्लाउड प्रोवाइडर का उपयोग कर रहे हैं और इन्फो लेवल का उपयोग करते हैं, तो निश्चित रूप से आप उपयोगकर्ता की कुंजी को "लीक" करेंगे जैसा कि नीचे दिखाया गया है:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

इसका मुकाबला करने के लिए हम रेगुलर एक्सप्रेशन `'--key=([^ ]*)'` पास कर सकते हैं और अब लॉग में आप देखेंगे 

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

आप कॉन्फिगरेशन के `maskingPatterns` फील्ड में रेगुलर एक्सप्रेशन प्रदान करके उपरोक्त प्राप्त कर सकते हैं।
  - कई रेगुलर एक्सप्रेशन के लिए, अल्पविराम से अलग किए गए मूल्य के साथ एक ही स्ट्रिंग का उपयोग करें।
  - मास्किंग पैटर्न के बारे में अधिक जानकारी के लिए, [WDIO लॉगर README में मास्किंग पैटर्न अनुभाग](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) देखें।

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

संवेदनशील डेटा के लॉगिंग को ब्लॉक करने का एक अन्य तरीका लॉग स्तर को कम करना या साइलेंट करना या लॉगर को अक्षम करना है।
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

## थर्ड पार्टी समाधान

### Appium
Appium अपना मास्किंग समाधान प्रदान करता है; देखें [लॉग फिल्टर](https://appium.io/docs/en/2.0/guides/log-filters/)
 - उनके समाधान का उपयोग करना मुश्किल हो सकता है। एक तरीका यदि संभव हो तो अपनी स्ट्रिंग में `@mask@` जैसे टोकन को पास करना और इसे रेगुलर एक्सप्रेशन के रूप में उपयोग करना है
 - कुछ Appium संस्करणों में, वैल्यू प्रत्येक कैरेक्टर को अल्पविराम से अलग करके भी लॉग किए जाते हैं, इसलिए हमें सावधान रहने की आवश्यकता है।
 - दुर्भाग्य से, BrowserStack इस समाधान का समर्थन नहीं करता है, लेकिन यह अभी भी स्थानीय रूप से उपयोगी है
 
पहले उल्लिखित `@mask@` उदाहरण का उपयोग करते हुए, हम `appiumMaskLogFilters.json` नामक निम्न JSON फाइल का उपयोग कर सकते हैं
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

फिर appium सर्विस कॉन्फिग में `logFilters` फील्ड में JSON फाइल नाम पास करें:
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

BrowserStack भी कुछ डेटा छिपाने के लिए मास्किंग का कुछ स्तर प्रदान करता है; देखें [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - दुर्भाग्य से, समाधान सब-या-कुछ नहीं है, इसलिए प्रदान किए गए कमांड्स के सभी टेक्स्ट वैल्यू छिपा दिए जाएंगे।
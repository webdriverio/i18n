---
id: security
title: सुरक्षा
---

WebdriverIO समाधान प्रदान करते समय सुरक्षा पहलू को ध्यान में रखता है। नीचे आपके परीक्षण को बेहतर ढंग से सुरक्षित करने के कुछ तरीके दिए गए हैं।

## सर्वोत्तम अभ्यास

- कभी भी संवेदनशील डेटा को हार्डकोड न करें जिससे स्पष्ट टेक्स्ट में उजागर होने पर आपके संगठन को नुकसान हो सकता है।
- कुंजियों और पासवर्ड को सुरक्षित रूप से संग्रहित करने के लिए एक तंत्र (जैसे वॉल्ट) का उपयोग करें और अपने एंड-टू-एंड परीक्षण शुरू करते समय उन्हें पुनः प्राप्त करें।
- सत्यापित करें कि कोई भी संवेदनशील डेटा लॉग में और क्लाउड प्रदाता द्वारा उजागर नहीं किया गया है, जैसे नेटवर्क लॉग में प्रमाणीकरण टोकन।

:::info

परीक्षण डेटा के लिए भी, यह पूछना आवश्यक है कि क्या गलत हाथों में, एक दुर्भावनापूर्ण व्यक्ति जानकारी प्राप्त कर सकता है या दुर्भावनापूर्ण इरादे से उन संसाधनों का उपयोग कर सकता है।

:::

## संवेदनशील डेटा को छिपाना

यदि आप अपने परीक्षण के दौरान संवेदनशील डेटा का उपयोग कर रहे हैं, तो यह सुनिश्चित करना आवश्यक है कि वे सभी को दिखाई न दें, जैसे लॉग में। इसके अलावा, क्लाउड प्रदाता का उपयोग करते समय, अक्सर निजी कुंजियां शामिल होती हैं। इस जानकारी को लॉग, रिपोर्टर और अन्य टचपॉइंट से छिपाया जाना चाहिए। निम्नलिखित कुछ छिपाने के समाधान प्रदान करता है ताकि उन मूल्यों को उजागर किए बिना परीक्षण चलाया जा सके।

### WebDriverIO

#### कमांड्स के टेक्स्ट वैल्यू को छिपाना

`addValue` और `setValue` कमांड्स लॉग में और साथ ही रिपोर्टर में छिपाने के लिए एक बूलियन मास्क वैल्यू का समर्थन करते हैं। इसके अलावा, अन्य टूल, जैसे प्रदर्शन टूल और थर्ड-पार्टी टूल, भी मास्क वर्जन प्राप्त करेंगे, जिससे सुरक्षा बढ़ेगी।

उदाहरण के लिए, यदि आप एक वास्तविक प्रोडक्शन उपयोगकर्ता का उपयोग कर रहे हैं और एक पासवर्ड दर्ज करना चाहते हैं जिसे आप छिपाना चाहते हैं, तो अब यह निम्न के साथ संभव है:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

उपरोक्त WDIO लॉग से टेक्स्ट वैल्यू को निम्नानुसार छिपाएगा:

लॉग उदाहरण:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

रिपोर्टर, जैसे Allure रिपोर्टर, और थर्ड-पार्टी टूल जैसे BrowserStack से Percy भी मास्क किए गए वर्जन को संभालेंगे।
उचित Appium वर्जन के साथ जोड़ा गया, Appium लॉग भी आपके संवेदनशील डेटा से छूट प्राप्त करेंगे।

:::info

सीमाएँ:
  - Appium में, अतिरिक्त प्लगइन्स लीक कर सकते हैं, भले ही हम जानकारी को छिपाने के लिए कहें।
  - क्लाउड प्रदाता HTTP लॉगिंग के लिए एक प्रॉक्सी का उपयोग कर सकते हैं, जो स्थापित मास्क तंत्र को बायपास करता है।
  - `getValue` कमांड समर्थित नहीं है। इसके अलावा, यदि उसी एलिमेंट पर उपयोग किया जाता है, तो यह `addValue` या `setValue` का उपयोग करते समय छिपाने के लिए इच्छित मूल्य को उजागर कर सकता है।

न्यूनतम आवश्यक संस्करण:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### WDIO लॉग में छिपाना

`maskingPatterns` कॉन्फ़िगरेशन का उपयोग करके, हम WDIO लॉग से संवेदनशील जानकारी को छिपा सकते हैं। हालांकि, Appium लॉग शामिल नहीं हैं।

उदाहरण के लिए, यदि आप एक क्लाउड प्रदाता का उपयोग कर रहे हैं और इन्फो लेवल का उपयोग करते हैं, तो सबसे निश्चित रूप से आप उपयोगकर्ता की कुंजी को "लीक" करेंगे जैसा कि नीचे दिखाया गया है:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

इसका मुकाबला करने के लिए हम रेगुलर एक्सप्रेशन `'--key=([^ ]*)'` पास कर सकते हैं और अब लॉग में आप देखेंगे 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

आप कॉन्फ़िगरेशन के `maskingPatterns` फ़ील्ड में रेगुलर एक्सप्रेशन प्रदान करके उपरोक्त प्राप्त कर सकते हैं।
  - कई रेगुलर एक्सप्रेशन के लिए, एक ही स्ट्रिंग का उपयोग करें लेकिन कॉमा से अलग किए गए मूल्य के साथ।
  - मास्किंग पैटर्न के बारे में अधिक जानकारी के लिए, [WDIO Logger README में मास्किंग पैटर्न अनुभाग](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) देखें।

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

:::

#### WDIO लॉगर्स को अक्षम करना

संवेदनशील डेटा के लॉगिंग को ब्लॉक करने का एक और तरीका है लॉग लेवल को कम करना या लॉगर को अक्षम करना।
इसे निम्न प्रकार से प्राप्त किया जा सकता है:

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

### थर्ड पार्टी समाधान

#### Appium
Appium अपना मास्किंग समाधान प्रदान करता है; [लॉग फिल्टर](https://appium.io/docs/en/latest/guides/log-filters/) देखें
 - उनके समाधान का उपयोग करना जटिल हो सकता है। एक तरीका यदि संभव हो तो अपनी स्ट्रिंग में `@mask@` जैसा टोकन पास करना और इसे रेगुलर एक्सप्रेशन के रूप में उपयोग करना है
 - कुछ Appium वर्जन में, मूल्यों को प्रत्येक अक्षर कॉमा से अलग करके भी लॉग किया जाता है, इसलिए हमें सावधान रहने की आवश्यकता है।
 - दुर्भाग्य से, BrowserStack इस समाधान का समर्थन नहीं करता है, लेकिन यह स्थानीय रूप से अभी भी उपयोगी है
 
पहले उल्लिखित `@mask@` उदाहरण का उपयोग करते हुए, हम `appiumMaskLogFilters.json` नामक निम्न JSON फ़ाइल का उपयोग कर सकते हैं
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

फिर JSON फ़ाइल नाम को appium सर्विस कॉन्फिग में `logFilters` फ़ील्ड में पास करें:
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

#### BrowserStack

BrowserStack भी कुछ डेटा को छिपाने के लिए कुछ स्तर की मास्किंग प्रदान करता है; [संवेदनशील डेटा छिपाएं](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) देखें
 - दुर्भाग्य से, समाधान सब-या-कुछ नहीं है, इसलिए प्रदान किए गए कमांड्स के सभी टेक्स्ट वैल्यू छिपे हुए होंगे।
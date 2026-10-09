---
id: cloudservices
title: क्लाउड सेवाओं का उपयोग
description: "Sauce Labs, BrowserStack, TestingBot, TestMu AI (पूर्व में LambdaTest), Perfecto और अन्य क्लाउड प्रदाताओं पर WebdriverIO टेस्ट चलाएँ।"
---

WebdriverIO के साथ Sauce Labs, Browserstack, TestingBot, TestMu AI (पूर्व में LambdaTest) या Perfecto जैसी ऑन-डिमांड सेवाओं का उपयोग करना काफी सरल है। आपको बस अपने विकल्पों में अपनी सेवा का `user` और `key` सेट करना होगा।

वैकल्पिक रूप से, आप `build` जैसी क्लाउड-विशिष्ट capabilities सेट करके अपने टेस्ट को पैरामीटराइज़ भी कर सकते हैं। यदि आप केवल Travis में क्लाउड सेवाएँ चलाना चाहते हैं, तो आप `CI` एनवायरनमेंट वेरिएबल का उपयोग करके यह जाँच सकते हैं कि आप Travis में हैं या नहीं, और उसके अनुसार कॉन्फ़िग को संशोधित कर सकते हैं।

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

आप अपने टेस्ट को [Sauce Labs](https://saucelabs.com) में रिमोट रूप से चलाने के लिए सेट कर सकते हैं।

एकमात्र आवश्यकता यह है कि अपने कॉन्फ़िग (या तो `wdio.conf.js` द्वारा एक्सपोर्ट किया गया या `webdriverio.remote(...)` में पास किया गया) में `user` और `key` को अपने Sauce Labs यूज़रनेम और एक्सेस की पर सेट करें।

आप किसी भी ब्राउज़र के लिए capabilities में key/value के रूप में कोई भी वैकल्पिक [टेस्ट कॉन्फ़िगरेशन विकल्प](https://docs.saucelabs.com/dev/test-configuration-options/) भी पास कर सकते हैं।

### Sauce Connect

यदि आप किसी ऐसे सर्वर पर टेस्ट चलाना चाहते हैं जो इंटरनेट से एक्सेस योग्य नहीं है (जैसे `localhost` पर), तो आपको [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) का उपयोग करना होगा।

इसका समर्थन करना WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप WDIO testrunner का उपयोग कर रहे हैं, तो अपनी `wdio.conf.js` में [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) डाउनलोड और कॉन्फ़िगर करें। यह Sauce Connect को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके टेस्ट को Sauce सेवा में बेहतर ढंग से एकीकृत करती हैं।

### Travis CI के साथ

हालाँकि, Travis CI प्रत्येक टेस्ट से पहले Sauce Connect शुरू करने के लिए [समर्थन प्रदान करता है](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect), इसलिए इसके लिए उनके निर्देशों का पालन करना एक विकल्प है।

यदि आप ऐसा करते हैं, तो आपको प्रत्येक ब्राउज़र की `capabilities` में `tunnel-identifier` टेस्ट कॉन्फ़िगरेशन विकल्प सेट करना होगा। Travis डिफ़ॉल्ट रूप से इसे `TRAVIS_JOB_NUMBER` एनवायरनमेंट वेरिएबल पर सेट करता है।

साथ ही, यदि आप चाहते हैं कि Sauce Labs आपके टेस्ट को बिल्ड नंबर के अनुसार समूहित करे, तो आप `build` को `TRAVIS_BUILD_NUMBER` पर सेट कर सकते हैं।

अंत में, यदि आप `name` सेट करते हैं, तो यह इस बिल्ड के लिए Sauce Labs में इस टेस्ट का नाम बदल देता है। यदि आप [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) के साथ WDIO testrunner का उपयोग कर रहे हैं, तो WebdriverIO स्वचालित रूप से टेस्ट के लिए एक उचित नाम सेट करता है।

उदाहरण `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### टाइमआउट

चूँकि आप अपने टेस्ट रिमोट रूप से चला रहे हैं, इसलिए कुछ टाइमआउट बढ़ाना आवश्यक हो सकता है।

आप टेस्ट कॉन्फ़िगरेशन विकल्प के रूप में `idle-timeout` पास करके [idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) बदल सकते हैं। यह नियंत्रित करता है कि कनेक्शन बंद करने से पहले Sauce कमांड्स के बीच कितनी देर प्रतीक्षा करेगा।

## BrowserStack

WebdriverIO में [Browserstack](https://www.browserstack.com) इंटीग्रेशन भी बिल्ट-इन है।

एकमात्र आवश्यकता यह है कि अपने कॉन्फ़िग (या तो `wdio.conf.js` द्वारा एक्सपोर्ट किया गया या `webdriverio.remote(...)` में पास किया गया) में `user` और `key` को अपने Browserstack automate यूज़रनेम और एक्सेस की पर सेट करें।

आप किसी भी ब्राउज़र के लिए capabilities में key/value के रूप में कोई भी वैकल्पिक [समर्थित capabilities](https://www.browserstack.com/automate/capabilities) भी पास कर सकते हैं। यदि आप `browserstack.debug` को `true` पर सेट करते हैं, तो यह सेशन का एक स्क्रीनकास्ट रिकॉर्ड करेगा, जो सहायक हो सकता है।

### लोकल टेस्टिंग

यदि आप किसी ऐसे सर्वर पर टेस्ट चलाना चाहते हैं जो इंटरनेट से एक्सेस योग्य नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://www.browserstack.com/local-testing#command-line) का उपयोग करना होगा।

इसका समर्थन करना WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप local का उपयोग करते हैं, तो आपको अपनी capabilities में `browserstack.local` को `true` पर सेट करना चाहिए।

यदि आप WDIO testrunner का उपयोग कर रहे हैं, तो अपनी `wdio.conf.js` में [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) डाउनलोड और कॉन्फ़िगर करें। यह BrowserStack को चलाने में मदद करता है, और अतिरिक्त सुविधाओं के साथ आता है जो आपके टेस्ट को BrowserStack सेवा में बेहतर ढंग से एकीकृत करती हैं।

### Travis CI के साथ

यदि आप Travis में Local Testing जोड़ना चाहते हैं, तो आपको इसे स्वयं शुरू करना होगा।

निम्नलिखित स्क्रिप्ट इसे डाउनलोड करेगी और बैकग्राउंड में शुरू करेगी। आपको टेस्ट शुरू करने से पहले इसे Travis में चलाना चाहिए।

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

साथ ही, आप `build` को Travis बिल्ड नंबर पर सेट करना चाह सकते हैं।

उदाहरण `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

एकमात्र आवश्यकता यह है कि अपने कॉन्फ़िग (या तो `wdio.conf.js` द्वारा एक्सपोर्ट किया गया या `webdriverio.remote(...)` में पास किया गया) में `user` और `key` को अपने [TestingBot](https://testingbot.com) यूज़रनेम और सीक्रेट की पर सेट करें।

आप किसी भी ब्राउज़र के लिए capabilities में key/value के रूप में कोई भी वैकल्पिक [समर्थित capabilities](https://testingbot.com/support/other/test-options) भी पास कर सकते हैं।

### लोकल टेस्टिंग

यदि आप किसी ऐसे सर्वर पर टेस्ट चलाना चाहते हैं जो इंटरनेट से एक्सेस योग्य नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://testingbot.com/support/other/tunnel) का उपयोग करना होगा। TestingBot एक Java-आधारित टनल प्रदान करता है जिससे आप उन वेबसाइटों का परीक्षण कर सकते हैं जो इंटरनेट से एक्सेस योग्य नहीं हैं।

उनके टनल सपोर्ट पेज में इसे सेट अप करने और चलाने के लिए आवश्यक जानकारी उपलब्ध है।

यदि आप WDIO testrunner का उपयोग कर रहे हैं, तो अपनी `wdio.conf.js` में [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) डाउनलोड और कॉन्फ़िगर करें। यह TestingBot को चलाने में मदद करता है, और अतिरिक्त सुविधाओं के साथ आता है जो आपके टेस्ट को TestingBot सेवा में बेहतर ढंग से एकीकृत करती हैं।

## TestMu AI (पूर्व में LambdaTest)

[TestMu AI](https://www.testmuai.com/) इंटीग्रेशन भी बिल्ट-इन है।

एकमात्र आवश्यकता यह है कि अपने कॉन्फ़िग (या तो `wdio.conf.js` द्वारा एक्सपोर्ट किया गया या `webdriverio.remote(...)` में पास किया गया) में `user` और `key` को अपने TestMu AI अकाउंट यूज़रनेम और एक्सेस की पर सेट करें।

आप किसी भी ब्राउज़र के लिए capabilities में key/value के रूप में कोई भी वैकल्पिक [समर्थित capabilities](https://www.testmuai.com/capabilities-generator/) भी पास कर सकते हैं। यदि आप `visual` को `true` पर सेट करते हैं, तो यह सेशन का एक स्क्रीनकास्ट रिकॉर्ड करेगा, जो सहायक हो सकता है।

### लोकल टेस्टिंग के लिए टनल

यदि आप किसी ऐसे सर्वर पर टेस्ट चलाना चाहते हैं जो इंटरनेट से एक्सेस योग्य नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/) का उपयोग करना होगा।

इसका समर्थन करना WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप local का उपयोग करते हैं, तो आपको अपनी capabilities में `tunnel` को `true` पर सेट करना चाहिए।

यदि आप WDIO testrunner का उपयोग कर रहे हैं, तो अपनी `wdio.conf.js` में [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) डाउनलोड और कॉन्फ़िगर करें। यह TestMu AI को चलाने में मदद करता है, और अतिरिक्त सुविधाओं के साथ आता है जो आपके टेस्ट को TestMu AI सेवा में बेहतर ढंग से एकीकृत करती हैं।

### Travis CI के साथ

यदि आप Travis में Local Testing जोड़ना चाहते हैं, तो आपको इसे स्वयं शुरू करना होगा।

निम्नलिखित स्क्रिप्ट इसे डाउनलोड करेगी और बैकग्राउंड में शुरू करेगी। आपको टेस्ट शुरू करने से पहले इसे Travis में चलाना चाहिए।

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

साथ ही, आप `build` को Travis बिल्ड नंबर पर सेट करना चाह सकते हैं।

उदाहरण `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

[`Perfecto`](https://www.perfecto.io) के साथ wdio का उपयोग करते समय, आपको प्रत्येक उपयोगकर्ता के लिए एक सिक्योरिटी टोकन बनाना होगा और इसे capabilities संरचना में (अन्य capabilities के अतिरिक्त) निम्नानुसार जोड़ना होगा:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

इसके अलावा, आपको निम्नानुसार क्लाउड कॉन्फ़िगरेशन जोड़ना होगा:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) एक ही एंडपॉइंट के पीछे ब्राउज़र नोड्स के साथ-साथ वास्तविक Android और iOS डिवाइस प्रदान करता है। यह `user` और `key` की जोड़ी के बजाय API टोकन के साथ प्रमाणीकरण करता है। टोकन को bearer हेडर के रूप में भेजें:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

वैकल्पिक रूप से, टोकन को पाथ प्रीफ़िक्स के रूप में पास करें, जिसे ग्रिड अनुरोध को आगे भेजने से पहले हटा देता है:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

ग्रिड अन्य WebDriver क्लाइंट्स के लिए URL में एम्बेड किए गए क्रेडेंशियल्स (`https://user:token@host`) भी स्वीकार करता है, लेकिन इस रूप का उपयोग WebdriverIO से नहीं किया जा सकता: यह fetch-आधारित है, और Node.js URL में एम्बेड किए गए क्रेडेंशियल्स को अस्वीकार कर देता है।

किसी वास्तविक डिवाइस पर चलाने के लिए, ऊपर दी गई किसी भी कनेक्शन शैली के साथ ब्राउज़र को Appium capability के रूप में पास करें:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```
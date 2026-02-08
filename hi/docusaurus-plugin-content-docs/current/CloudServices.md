---
id: cloudservices
title: क्लाउड सेवाओं का उपयोग
---

WebdriverIO के साथ Sauce Labs, Browserstack, TestingBot, TestMu AI (पहले LambdaTest) या Perfecto जैसी ऑन-डिमांड सेवाओं का उपयोग करना बहुत आसान है। आपको केवल अपने विकल्पों में अपनी सेवा के `user` और `key` सेट करने की आवश्यकता है।

वैकल्पिक रूप से, आप `build` जैसी क्लाउड-विशिष्ट क्षमताओं को सेट करके अपने टेस्ट को पैरामीटराइज़ भी कर सकते हैं। यदि आप क्लाउड सेवाओं को केवल Travis में चलाना चाहते हैं, तो आप यह जांचने के लिए `CI` पर्यावरण चर का उपयोग कर सकते हैं कि क्या आप Travis में हैं और उसके अनुसार कॉन्फिगरेशन को संशोधित कर सकते हैं।

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

आप अपने टेस्ट को [Sauce Labs](https://saucelabs.com) में रिमोटली चलाने के लिए सेट कर सकते हैं।

केवल आवश्यकता यह है कि आप अपने कॉन्फिगरेशन में `user` और `key` को अपने Sauce Labs उपयोगकर्ता नाम और एक्सेस की पर सेट करें (या तो `wdio.conf.js` द्वारा एक्सपोर्ट किया गया हो या `webdriverio.remote(...)` में पास किया गया हो)।

आप किसी भी ब्राउज़र के लिए क्षमताओं में की/वैल्यू के रूप में कोई भी वैकल्पिक [टेस्ट कॉन्फिगरेशन विकल्प](https://docs.saucelabs.com/dev/test-configuration-options/) भी पास कर सकते हैं।

### Sauce Connect

यदि आप एक ऐसे सर्वर के विरुद्ध टेस्ट चलाना चाहते हैं जो इंटरनेट से सुलभ नहीं है (जैसे `localhost` पर), तो आपको [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) का उपयोग करने की आवश्यकता होगी।

यह WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप WDIO टेस्टरनर का उपयोग कर रहे हैं, तो अपने `wdio.conf.js` में [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) को डाउनलोड और कॉन्फिगर करें। यह Sauce Connect को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके टेस्ट को Sauce सेवा में बेहतर तरीके से एकीकृत करता है।

### Travis CI के साथ

हालांकि, Travis CI में प्रत्येक टेस्ट से पहले Sauce Connect शुरू करने का [समर्थन](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) है, इसलिए उनके निर्देशों का पालन करना एक विकल्प है।

यदि आप ऐसा करते हैं, तो आपको प्रत्येक ब्राउज़र की `capabilities` में `tunnel-identifier` टेस्ट कॉन्फिगरेशन विकल्प सेट करना होगा। Travis इसे डिफ़ॉल्ट रूप से `TRAVIS_JOB_NUMBER` पर्यावरण चर पर सेट करता है।

इसके अतिरिक्त, यदि आप चाहते हैं कि Sauce Labs आपके टेस्ट को बिल्ड नंबर द्वारा समूहित करे, तो आप `build` को `TRAVIS_BUILD_NUMBER` पर सेट कर सकते हैं।

अंत में, यदि आप `name` सेट करते हैं, तो यह इस बिल्ड के लिए Sauce Labs में इस टेस्ट का नाम बदल देता है। यदि आप WDIO टेस्टरनर को [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) के साथ संयोजित कर रहे हैं, तो WebdriverIO स्वचालित रूप से टेस्ट के लिए एक उचित नाम सेट करता है।

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

चूंकि आप अपने टेस्ट रिमोटली चला रहे हैं, इसलिए कुछ टाइमआउट बढ़ाना आवश्यक हो सकता है।

आप [idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) को टेस्ट कॉन्फिगरेशन विकल्प के रूप में `idle-timeout` पास करके बदल सकते हैं। यह नियंत्रित करता है कि कनेक्शन बंद करने से पहले Sauce कमांड के बीच कितनी देर तक प्रतीक्षा करेगा।

## BrowserStack

WebdriverIO में [Browserstack](https://www.browserstack.com) एकीकरण भी अंतर्निहित है।

एकमात्र आवश्यकता यह है कि आप अपने Browserstack ऑटोमेट उपयोगकर्ता नाम और एक्सेस की को अपने कॉन्फिगरेशन में `user` और `key` के रूप में सेट करें (या तो `wdio.conf.js` द्वारा एक्सपोर्ट किया गया हो या `webdriverio.remote(...)` में पास किया गया हो)।

आप किसी भी ब्राउज़र के लिए क्षमताओं में की/वैल्यू के रूप में कोई भी वैकल्पिक [समर्थित क्षमताएँ](https://www.browserstack.com/automate/capabilities) भी पास कर सकते हैं। यदि आप `browserstack.debug` को `true` पर सेट करते हैं, तो यह सत्र का स्क्रीनकास्ट रिकॉर्ड करेगा, जो सहायक हो सकता है।

### लोकल टेस्टिंग

यदि आप एक ऐसे सर्वर के विरुद्ध टेस्ट चलाना चाहते हैं जो इंटरनेट से सुलभ नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://www.browserstack.com/local-testing#command-line) का उपयोग करने की आवश्यकता होगी।

इसे सपोर्ट करना WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप लोकल का उपयोग करते हैं, तो आपको अपनी क्षमताओं में `browserstack.local` को `true` पर सेट करना चाहिए।

यदि आप WDIO टेस्टरनर का उपयोग कर रहे हैं, तो अपने `wdio.conf.js` में [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) को डाउनलोड और कॉन्फिगर करें। यह BrowserStack को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके टेस्ट को BrowserStack सेवा में बेहतर तरीके से एकीकृत करता है।

### Travis CI के साथ

यदि आप Travis में लोकल टेस्टिंग जोड़ना चाहते हैं, तो आपको इसे स्वयं शुरू करना होगा।

निम्नलिखित स्क्रिप्ट इसे डाउनलोड करेगी और बैकग्राउंड में शुरू करेगी। आपको टेस्ट शुरू करने से पहले Travis में इसे चलाना चाहिए।

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

इसके अलावा, आप `build` को Travis बिल्ड नंबर पर सेट करना चाह सकते हैं।

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

एकमात्र आवश्यकता यह है कि आप अपने [TestingBot](https://testingbot.com) उपयोगकर्ता नाम और सीक्रेट की को अपने कॉन्फिगरेशन में `user` और `key` के रूप में सेट करें (या तो `wdio.conf.js` द्वारा एक्सपोर्ट किया गया हो या `webdriverio.remote(...)` में पास किया गया हो)।

आप किसी भी ब्राउज़र के लिए क्षमताओं में की/वैल्यू के रूप में कोई भी वैकल्पिक [समर्थित क्षमताएँ](https://testingbot.com/support/other/test-options) भी पास कर सकते हैं।

### लोकल टेस्टिंग

यदि आप एक ऐसे सर्वर के विरुद्ध टेस्ट चलाना चाहते हैं जो इंटरनेट से सुलभ नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://testingbot.com/support/other/tunnel) का उपयोग करने की आवश्यकता होगी। TestingBot आपको इंटरनेट से पहुंच न होने वाली वेबसाइटों का परीक्षण करने के लिए जावा-आधारित टनल प्रदान करता है।

उनके टनल सपोर्ट पेज में इसे शुरू करने के लिए आवश्यक जानकारी है।

यदि आप WDIO टेस्टरनर का उपयोग कर रहे हैं, तो अपने `wdio.conf.js` में [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) को डाउनलोड और कॉन्फिगर करें। यह TestingBot को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके टेस्ट को TestingBot सेवा में बेहतर तरीके से एकीकृत करता है।

## TestMu AI (पहले LambdaTest)

[TestMu AI](https://www.testmuai.com/) एकीकरण भी अंतर्निहित है।

एकमात्र आवश्यकता यह है कि आप अपने TestMu AI खाता उपयोगकर्ता नाम और एक्सेस की को अपने कॉन्फिगरेशन में `user` और `key` के रूप में सेट करें (या तो `wdio.conf.js` द्वारा एक्सपोर्ट किया गया हो या `webdriverio.remote(...)` में पास किया गया हो)।

आप किसी भी ब्राउज़र के लिए क्षमताओं में की/वैल्यू के रूप में कोई भी वैकल्पिक [समर्थित क्षमताएँ](https://www.testmuai.com/capabilities-generator/) भी पास कर सकते हैं। यदि आप `visual` को `true` पर सेट करते हैं, तो यह सत्र का स्क्रीनकास्ट रिकॉर्ड करेगा, जो सहायक हो सकता है।

### लोकल टेस्टिंग के लिए टनल

यदि आप एक ऐसे सर्वर के विरुद्ध टेस्ट चलाना चाहते हैं जो इंटरनेट से सुलभ नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/) का उपयोग करने की आवश्यकता होगी।

इसे सपोर्ट करना WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप लोकल का उपयोग करते हैं, तो आपको अपनी क्षमताओं में `tunnel` को `true` पर सेट करना चाहिए।

यदि आप WDIO टेस्टरनर का उपयोग कर रहे हैं, तो अपने `wdio.conf.js` में [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) को डाउनलोड और कॉन्फिगर करें। यह TestMu AI को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके टेस्ट को TestMu AI सेवा में बेहतर तरीके से एकीकृत करता है।

### Travis CI के साथ

यदि आप Travis में लोकल टेस्टिंग जोड़ना चाहते हैं, तो आपको इसे स्वयं शुरू करना होगा।

निम्नलिखित स्क्रिप्ट इसे डाउनलोड करेगी और बैकग्राउंड में शुरू करेगी। आपको टेस्ट शुरू करने से पहले Travis में इसे चलाना चाहिए।

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

इसके अलावा, आप `build` को Travis बिल्ड नंबर पर सेट करना चाह सकते हैं।

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

जब [`Perfecto`](https://www.perfecto.io) के साथ wdio का उपयोग करते हैं, तो आपको प्रत्येक उपयोगकर्ता के लिए एक सुरक्षा टोकन बनाने और इसे क्षमताओं की संरचना में जोड़ने की आवश्यकता होती है (अन्य क्षमताओं के अतिरिक्त), जैसा कि निम्नानुसार है:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

इसके अतिरिक्त, आपको क्लाउड कॉन्फिगरेशन जोड़ने की आवश्यकता है, जैसा कि निम्नानुसार है:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```
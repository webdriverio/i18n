---
id: cloudservices
title: क्लाउड सेवाओं का उपयोग करना
---

WebdriverIO के साथ Sauce Labs, Browserstack, TestingBot, LambdaTest या Perfecto जैसी ऑन-डिमांड सेवाओं का उपयोग करना काफी सरल है। आपको बस अपने विकल्पों में अपनी सेवा के `user` और `key` सेट करने की आवश्यकता है।

वैकल्पिक रूप से, आप `build` जैसी क्लाउड-विशिष्ट क्षमताओं को सेट करके अपने परीक्षण को पैरामीटराइज़ भी कर सकते हैं। यदि आप केवल Travis में क्लाउड सेवाओं को चलाना चाहते हैं, तो आप यह जांचने के लिए `CI` पर्यावरण चर का उपयोग कर सकते हैं कि क्या आप Travis में हैं और तदनुसार कॉन्फिग को संशोधित कर सकते हैं।

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

आप अपने परीक्षणों को [Sauce Labs](https://saucelabs.com) में दूरस्थ रूप से चलाने के लिए सेट कर सकते हैं।

एकमात्र आवश्यकता अपने कॉन्फिग में `user` और `key` को अपने Sauce Labs उपयोगकर्ता नाम और एक्सेस की के रूप में सेट करना है (या तो `wdio.conf.js` द्वारा निर्यात किया गया या `webdriverio.remote(...)` में पास किया गया)।

आप किसी भी ब्राउज़र के लिए क्षमताओं में की/वैल्यू के रूप में किसी भी वैकल्पिक [परीक्षण कॉन्फिगरेशन विकल्प](https://docs.saucelabs.com/dev/test-configuration-options/) को भी पास कर सकते हैं।

### Sauce Connect

यदि आप ऐसे सर्वर के खिलाफ परीक्षण चलाना चाहते हैं जो इंटरनेट तक पहुंच योग्य नहीं है (जैसे `localhost` पर), तो आपको [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) का उपयोग करने की आवश्यकता है।

इसका समर्थन करना WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप WDIO टेस्टरनर का उपयोग कर रहे हैं, तो अपने `wdio.conf.js` में [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) डाउनलोड और कॉन्फ़िगर करें। यह Sauce Connect को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके परीक्षणों को Sauce सेवा में बेहतर एकीकृत करता है।

### Travis CI के साथ

हालांकि, Travis CI प्रत्येक परीक्षण से पहले Sauce Connect शुरू करने के लिए [समर्थन करता है](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect), इसलिए उनके निर्देशों का पालन करना एक विकल्प है।

यदि आप ऐसा करते हैं, तो आपको प्रत्येक ब्राउज़र की `capabilities` में `tunnel-identifier` परीक्षण कॉन्फिगरेशन विकल्प सेट करना होगा। Travis इसे डिफ़ॉल्ट रूप से `TRAVIS_JOB_NUMBER` पर्यावरण चर के लिए सेट करता है।

इसके अलावा, यदि आप चाहते हैं कि Sauce Labs आपके परीक्षणों को बिल्ड नंबर द्वारा समूहित करे, तो आप `build` को `TRAVIS_BUILD_NUMBER` के लिए सेट कर सकते हैं।

अंत में, यदि आप `name` सेट करते हैं, तो यह इस बिल्ड के लिए Sauce Labs में इस परीक्षण का नाम बदल देता है। यदि आप WDIO टेस्टरनर का उपयोग [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) के साथ कर रहे हैं, तो WebdriverIO स्वचालित रूप से परीक्षण के लिए उचित नाम सेट करता है।

`capabilities` का उदाहरण:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### टाइमआउट

चूंकि आप अपने परीक्षण दूरस्थ रूप से चला रहे हैं, कुछ टाइमआउट बढ़ाना आवश्यक हो सकता है।

आप [idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) को परीक्षण कॉन्फिगरेशन विकल्प के रूप में `idle-timeout` पास करके बदल सकते हैं। यह नियंत्रित करता है कि कनेक्शन को बंद करने से पहले Sauce कमांड के बीच कितने समय तक प्रतीक्षा करेगा।

## BrowserStack

WebdriverIO में [Browserstack](https://www.browserstack.com) एकीकरण भी बिल्ट-इन है।

एकमात्र आवश्यकता अपने कॉन्फिग में `user` और `key` को अपने Browserstack automate उपयोगकर्ता नाम और एक्सेस की के रूप में सेट करना है (या तो `wdio.conf.js` द्वारा निर्यात किया गया या `webdriverio.remote(...)` में पास किया गया)।

आप किसी भी ब्राउज़र के लिए क्षमताओं में की/वैल्यू के रूप में किसी भी वैकल्पिक [समर्थित क्षमताओं](https://www.browserstack.com/automate/capabilities) को भी पास कर सकते हैं। यदि आप `browserstack.debug` को `true` पर सेट करते हैं, तो यह सत्र का एक स्क्रीनकास्ट रिकॉर्ड करेगा, जो सहायक हो सकता है।

### स्थानीय परीक्षण

यदि आप ऐसे सर्वर के खिलाफ परीक्षण चलाना चाहते हैं जो इंटरनेट तक पहुंच योग्य नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://www.browserstack.com/local-testing#command-line) का उपयोग करने की आवश्यकता है।

इसका समर्थन करना WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप स्थानीय का उपयोग करते हैं, तो आपको अपनी क्षमताओं में `browserstack.local` को `true` पर सेट करना चाहिए।

यदि आप WDIO टेस्टरनर का उपयोग कर रहे हैं, तो अपने `wdio.conf.js` में [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) डाउनलोड और कॉन्फ़िगर करें। यह BrowserStack को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके परीक्षणों को BrowserStack सेवा में बेहतर एकीकृत करता है।

### Travis CI के साथ

यदि आप Travis में स्थानीय परीक्षण जोड़ना चाहते हैं, तो आपको इसे स्वयं शुरू करना होगा।

निम्नलिखित स्क्रिप्ट इसे डाउनलोड करेगी और पृष्ठभूमि में शुरू करेगी। आपको परीक्षण शुरू करने से पहले Travis में इसे चलाना चाहिए।

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

इसके अलावा, आप `build` को Travis बिल्ड नंबर पर सेट करना चाह सकते हैं।

`capabilities` का उदाहरण:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

एकमात्र आवश्यकता अपने कॉन्फिग में `user` और `key` को अपने [TestingBot](https://testingbot.com) उपयोगकर्ता नाम और सीक्रेट की के रूप में सेट करना है (या तो `wdio.conf.js` द्वारा निर्यात किया गया या `webdriverio.remote(...)` में पास किया गया)।

आप किसी भी ब्राउज़र के लिए क्षमताओं में की/वैल्यू के रूप में किसी भी वैकल्पिक [समर्थित क्षमताओं](https://testingbot.com/support/other/test-options) को भी पास कर सकते हैं।

### स्थानीय परीक्षण

यदि आप ऐसे सर्वर के खिलाफ परीक्षण चलाना चाहते हैं जो इंटरनेट तक पहुंच योग्य नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://testingbot.com/support/other/tunnel) का उपयोग करने की आवश्यकता है। TestingBot आपको इंटरनेट से अनुपलब्ध वेबसाइटों का परीक्षण करने की अनुमति देने के लिए एक Java-आधारित टनल प्रदान करता है।

उनके टनल समर्थन पृष्ठ में इसे शुरू और चालू करने के लिए आवश्यक जानकारी होती है।

यदि आप WDIO टेस्टरनर का उपयोग कर रहे हैं, तो अपने `wdio.conf.js` में [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) डाउनलोड और कॉन्फ़िगर करें। यह TestingBot को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके परीक्षणों को TestingBot सेवा में बेहतर एकीकृत करता है।

## LambdaTest

[LambdaTest](https://www.lambdatest.com) एकीकरण भी बिल्ट-इन है।

एकमात्र आवश्यकता अपने कॉन्फिग में `user` और `key` को अपने LambdaTest खाता उपयोगकर्ता नाम और एक्सेस की के रूप में सेट करना है (या तो `wdio.conf.js` द्वारा निर्यात किया गया या `webdriverio.remote(...)` में पास किया गया)।

आप किसी भी ब्राउज़र के लिए क्षमताओं में की/वैल्यू के रूप में किसी भी वैकल्पिक [समर्थित क्षमताओं](https://www.lambdatest.com/capabilities-generator/) को भी पास कर सकते हैं। यदि आप `visual` को `true` पर सेट करते हैं, तो यह सत्र का एक स्क्रीनकास्ट रिकॉर्ड करेगा, जो सहायक हो सकता है।

### स्थानीय परीक्षण के लिए टनल

यदि आप ऐसे सर्वर के खिलाफ परीक्षण चलाना चाहते हैं जो इंटरनेट तक पहुंच योग्य नहीं है (जैसे `localhost` पर), तो आपको [Local Testing](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/) का उपयोग करने की आवश्यकता है।

इसका समर्थन करना WebdriverIO के दायरे से बाहर है, इसलिए आपको इसे स्वयं शुरू करना होगा।

यदि आप स्थानीय का उपयोग करते हैं, तो आपको अपनी क्षमताओं में `tunnel` को `true` पर सेट करना चाहिए।

यदि आप WDIO टेस्टरनर का उपयोग कर रहे हैं, तो अपने `wdio.conf.js` में [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) डाउनलोड और कॉन्फ़िगर करें। यह LambdaTest को चलाने में मदद करता है और अतिरिक्त सुविधाओं के साथ आता है जो आपके परीक्षणों को LambdaTest सेवा में बेहतर एकीकृत करता है।

### Travis CI के साथ

यदि आप Travis में स्थानीय परीक्षण जोड़ना चाहते हैं, तो आपको इसे स्वयं शुरू करना होगा।

निम्नलिखित स्क्रिप्ट इसे डाउनलोड करेगी और पृष्ठभूमि में शुरू करेगी। आपको परीक्षण शुरू करने से पहले Travis में इसे चलाना चाहिए।

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

इसके अलावा, आप `build` को Travis बिल्ड नंबर पर सेट करना चाह सकते हैं।

`capabilities` का उदाहरण:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

wdio को [`Perfecto`](https://www.perfecto.io) के साथ उपयोग करते समय, आपको प्रत्येक उपयोगकर्ता के लिए एक सुरक्षा टोकन बनाने और इसे क्षमताओं की संरचना में जोड़ने की आवश्यकता होती है (अन्य क्षमताओं के अतिरिक्त), जैसे:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

इसके अतिरिक्त, आपको क्लाउड कॉन्फिगरेशन जोड़ने की आवश्यकता है, जैसे:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```
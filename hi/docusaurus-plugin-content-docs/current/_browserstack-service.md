---
id: browserstack-service
title: ब्राउज़रस्टैक सेवा
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> एक WebdriverIO सेवा जो BrowserStack उपयोगकर्ताओं के लिए स्थानीय टनल और जॉब मेटाडेटा को प्रबंधित करती है।

## इंस्टालेशन


सबसे आसान तरीका है `@wdio/browserstack-service` को अपने `package.json` में devDependency के रूप में रखना:

```sh
npm install @wdio/browserstack-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें, इसके निर्देश [यहां](https://webdriver.io/docs/gettingstarted) पाए जा सकते हैं।


## कॉन्फिगरेशन

WebdriverIO में BrowserStack का समर्थन पहले से ही शामिल है। आपको अपनी `wdio.conf.js` फ़ाइल में `user` और `key` सेट करनी चाहिए। यह सेवा प्लगइन [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing) के लिए समर्थन प्रदान करता है। इस सुविधा को सक्रिय करने के लिए `browserstackLocal: true` भी सेट करें।
BrowserStack पर सत्र की स्थिति की रिपोर्टिंग Cucumber विकल्पों की `strict` सेटिंग का सम्मान करेगी।

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## विकल्प

BrowserStack सेवा के लिए अधिकृत होने के लिए आपके कॉन्फिग में [`user`](https://webdriver.io/docs/options#user) और [`key`](https://webdriver.io/docs/options#key) विकल्प होने चाहिए।

### testObservability

टेस्ट ऑब्जर्वेबिलिटी एक उन्नत परीक्षण रिपोर्टिंग टूल है जो आपके स्वचालन परीक्षणों को बेहतर बनाने के लिए अंतर्दृष्टि प्रदान करता है और आपको तेजी से डीबग करने में मदद करता है। यह browserstack-service के सभी उपयोगकर्ताओं के लिए `testObservability` फ़्लैग को `true` के रूप में सेट करके डिफ़ॉल्ट रूप से सक्षम है। आप `testObservability` फ़्लैग को `false` पर सेट करके इसे अक्षम कर सकते हैं।

आपके परीक्षण समाप्त होने के बाद, आप अपने बिल्ड को अतिरिक्त अंतर्दृष्टि जैसे यूनिक एरर एनालिसिस, ऑटोमैटिक फ्लेकी टेस्ट डिटेक्शन, और अधिक के साथ डीबग करने के लिए [Test Observability](https://observability.browserstack.com/) पर जा सकते हैं।

आप टेस्ट ऑब्जर्वेबिलिटी का उपयोग तब भी कर सकते हैं जब आप अपने परीक्षण BrowserStack इंफ्रास्ट्रक्चर पर नहीं चलाते हैं। यहां तक कि अगर आप अपने परीक्षण CI पर, एक स्थानीय मशीन पर, या यहां तक कि अन्य क्लाउड सेवा प्रदाताओं पर चलाते हैं, टेस्ट ऑब्जर्वेबिलिटी फिर भी आपके परीक्षणों पर इंटेलिजेंट टेस्ट रिपोर्ट और उन्नत एनालिटिक्स उत्पन्न कर सकता है।

यदि आप BrowserStack इंफ्रास्ट्रक्चर पर अपने परीक्षण चलाए बिना टेस्ट ऑब्जर्वेबिलिटी का उपयोग करना चाहते हैं, तो आप अपने कॉन्फिग को इस प्रकार सेट कर सकते हैं:


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

आप टेस्ट ऑब्जर्वेबिलिटी की सभी सुविधाओं का [इस सैंडबॉक्स](https://observability-demo.browserstack.com/) में पता लगा सकते हैं या इसके बारे में अधिक [यहां](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability) पढ़ सकते हैं।

### browserstackLocal
BrowserStack क्लाउड से कनेक्शन को आपके कंप्यूटर के माध्यम से रूट करने के लिए इसे true पर सेट करें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### forcedStop
BrowserStack Local कॉलबैक का इंतजार किए बिना, BrowserStack Local प्रक्रिया को पूरा होने पर मारने के लिए इसे true पर सेट करें। यह प्रयोगात्मक है और सभी के द्वारा उपयोग नहीं किया जाना चाहिए। मुख्य रूप से [इस समस्या](https://github.com/browserstack/browserstack-local-nodejs/issues/41) के लिए एक वर्कअराउंड के रूप में आवश्यक है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### app

[Appium](https://appium.io/) इसे अपनी मशीन पर स्थानीय रूप से उपलब्ध ऐप फ़ाइल पथ के साथ सेट करें ताकि ऐप को Appium सत्रों के लिए [परीक्षण के तहत एप्लिकेशन](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) के रूप में उपयोग किया जा सके।

प्रकार: `String` या `JsonObject`<br />
डिफ़ॉल्ट: `undefined`

उपलब्ध ऐप मूल्यों की सूची:

#### path
Appium के लिए स्थानीय रूप से उपलब्ध ऐप फ़ाइल पथ को परीक्षण के तहत एप्लिकेशन के रूप में उपयोग करें।

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OR
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

ऐप अपलोड करते समय custom_id पास करें।

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
ऐप को BrowserStack पर अपलोड करने के बाद वापस किए गए ऐप URL का उपयोग करें।

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OR
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

पहले से अपलोड किए गए ऐप्स के custom_id का उपयोग करें

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OR
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

पहले से अपलोड किए गए ऐप्स के shareable_id का उपयोग करें

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OR
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

केवल Cucumber। यदि केवल एक Scenario चला है तो BrowserStack Automate सत्र नाम को Scenario नाम पर सेट करें।
[wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution) के साथ समानांतर में चलते समय उपयोगी है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### sessionNameFormat

BrowserStack Automate सत्र नाम प्रारूप को अनुकूलित करें।

प्रकार: `Function`<br />
डिफ़ॉल्ट (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
डिफ़ॉल्ट (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

केवल Mocha। BrowserStack Automate सत्र नाम में परीक्षण शीर्षक न जोड़ें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### sessionNamePrependTopLevelSuiteTitle

केवल Mocha। BrowserStack Automate सत्र नाम में शीर्ष स्तरीय सूट शीर्षक को आगे जोड़ें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### setSessionName

स्वचालित रूप से BrowserStack Automate सत्र नाम सेट करें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### setSessionStatus

स्वचालित रूप से BrowserStack Automate सत्र स्थिति (पास/फेल) सेट करें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### buildIdentifier

**buildIdentifier** एक अद्वितीय आईडी है जो प्रत्येक निष्पादन को अलग करने के लिए buildName के साथ जुड़ जाता है। उपलब्ध अभिव्यक्तियों से अपना buildIdentifier प्रारूप चुनें:
* `BUILD_NUMBER`: प्रत्येक निष्पादन के साथ एक क्रमिक काउंटर जनरेट करता है
* `DATE_TIME`: प्रत्येक निष्पादन के साथ एक टाइमस्टैम्प जनरेट करता है। उदा. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
बिल्ड आइडेंटिफायर किसी भी अन्य वर्णों के साथ-साथ दोनों या किसी एक अभिव्यक्ति के उपयोग का समर्थन करता है जिससे कस्टम फॉर्मेटिंग विकल्प सक्षम होते हैं।

### opts

BrowserStack Local विकल्प।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `{}`

opts के रूप में पास किए जाने वाले उपलब्ध स्थानीय परीक्षण संशोधकों की सूची:

#### Local Identifier

यदि एक साथ कई स्थानीय परीक्षण कनेक्शन कर रहे हैं, तो इसे अलग-अलग प्रक्रियाओं के लिए अद्वितीय रूप से सेट करें -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

वर्बोज लॉगिंग सक्षम करने के लिए -

```js
opts = { verbose: "true" };
```

नोट - 'verbose' संशोधक के लिए संभावित मान '1', '2', '3' और 'true' हैं

#### Force Local

सभी ट्रैफिक को स्थानीय (आपकी) मशीन के माध्यम से रूट करने के लिए -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

आंतरिक सर्वर के बजाय स्थानीय फ़ोल्डर का परीक्षण करने के लिए, इस विकल्प के मूल्य के रूप में फ़ोल्डर का पथ प्रदान करें -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

अन्य चल रहे BrowserStack Local इंस्टेंस को मारने के लिए -

```js
opts = { force: "true" };
```

#### Only Automate

Live और Screenshots के लिए स्थानीय परीक्षण को अक्षम करने और केवल Automate को सक्षम करने के लिए -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

स्थानीय परीक्षण के लिए प्रॉक्सी का उपयोग करने के लिए -

- proxyHost: प्रॉक्सी का होस्टनेम/IP, यदि यह विकल्प अनुपस्थित है तो शेष प्रॉक्सी विकल्पों को नजरअंदाज कर दिया जाता है
- proxyPort: प्रॉक्सी के लिए पोर्ट, जब -proxyHost का उपयोग किया जाता है तो डिफ़ॉल्ट रूप से 3128 होता है
- proxyUser: प्रॉक्सी से कनेक्ट करने के लिए उपयोगकर्ता नाम (केवल बेसिक ऑथ)
- proxyPass: USERNAME के लिए पासवर्ड, नजरअंदाज कर दिया जाएगा यदि USERNAME खाली है या निर्दिष्ट नहीं है

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

स्थानीय परीक्षण में स्थानीय प्रॉक्सी का उपयोग करने के लिए -

- localProxyHost: प्रॉक्सी का होस्टनेम/IP, यदि यह विकल्प अनुपस्थित है तो शेष प्रॉक्सी विकल्पों को नजरअंदाज कर दिया जाता है
- localProxyPort: प्रॉक्सी के लिए पोर्ट, जब -localProxyHost का उपयोग किया जाता है तो डिफ़ॉल्ट रूप से 8081 होता है
- localProxyUser: प्रॉक्सी से कनेक्ट करने के लिए उपयोगकर्ता नाम (केवल बेसिक ऑथ)
- localProxyPass: USERNAME के लिए पासवर्ड, नजरअंदाज कर दिया जाएगा यदि USERNAME खाली है या निर्दिष्ट नहीं है

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

स्थानीय परीक्षण में PAC (Proxy Auto-Configuration) का उपयोग करने के लिए -

- pac-file: PAC (Proxy Auto-Configuration) फ़ाइल का पूर्ण पथ

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

डिफ़ॉल्ट रूप से, BrowserStack स्थानीय रैपर्स BrowserStack बाइनरी के नवीनतम संस्करण को डाउनलोड करने और निष्पादित करने का प्रयास करते हैं जो क्रम से ~./browserstack या वर्तमान कार्य निर्देशिका या tmp फ़ोल्डर में होता है। लेकिन आप -binarypath तर्क को पास करके इन्हें ओवरराइड कर सकते हैं।
स्थानीय बाइनरी पथ निर्दिष्ट करने का पथ -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

'-v' तर्क के साथ चलाते समय लॉग को फ़ाइल में सहेजने के लिए, आप फ़ाइल का पथ निर्दिष्ट कर सकते हैं। डिफ़ॉल्ट रूप से लॉग वर्तमान कार्य निर्देशिका में local.log फ़ाइल में सहेजे जाते हैं।
उस फ़ाइल का पथ निर्दिष्ट करने के लिए जहां लॉग सहेजे जाएंगे -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

WebdriverIO के बारे में अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।
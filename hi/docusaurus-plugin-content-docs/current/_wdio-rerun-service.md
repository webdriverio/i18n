---
id: wdio-rerun-service
title: पुनः चलाएँ सेवा
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---


> wdio-rerun-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

यह सेवा [WebdriverIO](https://webdriver.io) टेस्ट फ्रेमवर्क के भीतर निष्पादित विफल Mocha या Jasmine टेस्ट और Cucumber परिदृश्यों को ट्रैक करती है। यह विफल या अस्थिर परीक्षणों या परिदृश्यों को पुनः चलाने की अनुमति देगी।

_नोट_: WebdriverIO संस्करण `5.x` और `6.x` चलाने वाले Cucumber फ्रेमवर्क उपयोगकर्ताओं को संस्करण `1.6.x` का उपयोग करना चाहिए। यदि आप `7.x` के नवीनतम प्रमुख संस्करण पर हैं, तो इस सेवा के नवीनतम `1.7.x` संस्करण का उपयोग करें।

## पुनः चलाना बनाम पुनः प्रयास

Cucumber और Mocha/Jasmine के लिए WebdriverIO में निर्मित `retry` लॉजिक Cucumber और Mocha/Jasmine में अस्थिर चरणों को संभालने में मददगार है। प्रत्येक फ्रेमवर्क में पुनः प्रयास करने के कुछ सावधानियां हैं:
* Cucumber: यह इस बात को ध्यान में नहीं रखता है कि कुछ चरणों को परीक्षण के बीच में पुनः प्रयास करना संभव नहीं हो सकता है। किसी चरण को दो बार चलाने से बाकी परिदृश्य टूट सकता है या यह परीक्षण संदर्भ में संभव नहीं हो सकता है।
* Mocha/Jasmine: `retry` लॉजिक एक व्यक्तिगत परीक्षण पर लागू किया जा सकता है, हालांकि, यह अभी भी वास्तविक समय में किया जाता है और शायद अस्थायी मुद्दों या नेटवर्क कनेक्टिविटी समस्याओं को ध्यान में नहीं रखता है।

`re-run` की मुख्य विशेषताएं:
* एक संपूर्ण व्यक्तिगत Cucumber परिदृश्य को फिर से चलाएगा और केवल एक चरण नहीं
* मुख्य परीक्षण निष्पादन पूरा होने के बाद एक पूरी spec फ़ाइल को फिर से चलाने में सक्षम बनाता है
* स्थानीय रूप से कॉपी और निष्पादित किया जा सकता है (`retry` नहीं कर सकता)
* अभी भी `retry` विधियों के साथ उपयोग किया जा सकता है
* अस्थिर या समस्याग्रस्त परीक्षणों पर `retry` लॉजिक लागू करने के लिए किसी कोड परिवर्तन की आवश्यकता नहीं है

यह अनुशंसा की जाती है कि उपलब्ध विकल्पों का मूल्यांकन करने के लिए कुछ समय निकालें। एक हाइब्रिड समाधान सबसे अच्छे वास्तविक और कार्रवाई योग्य परीक्षण परिणाम प्रदान करने के लिए सबसे अच्छा समाधान हो सकता है।

## स्थापना

सबसे आसान तरीका है आपके `package.json` में `devDependencies` में `wdio-rerun-service` जोड़ना।

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

इसे `npm` का उपयोग करके स्थापित किया जा सकता है:

```bash
npm install wdio-rerun-service
```

पैकेज स्थापना पूरी होने के बाद, इसे `wdio.conf.js` में `services` सरणी में जोड़ें:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

`WebdriverIO` को कैसे स्थापित करना है, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted.html) पाए जा सकते हैं।

## कॉन्फ़िगरेशन

निम्नलिखित विकल्प wdio.conf.js फ़ाइल में जोड़े जा सकते हैं। सेवा के लिए विकल्पों को परिभाषित करने के लिए आपको निम्न तरीके से `services` सूची में सेवा को जोड़ने की आवश्यकता है:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Re-run service options here...
        }]
    ],
    // ...
};
```

### rerunDataDir
निर्देशिका जहां निष्पादन के दौरान सभी पुनः चलाने वाले JSON डेटा रखे जाएंगे।

प्रकार: `String`

डिफ़ॉल्ट: `./results/rerun`

उदाहरण:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
पुनः चलाने वाली Bash स्क्रिप्ट लिखने के लिए पथ।

प्रकार: `String`

डिफ़ॉल्ट: `./rerun.sh`

उदाहरण:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(केवल Cucumber) बाहर रखने के लिए Cucumber टैग का सेट। यदि परिदृश्य में एक टैग होता है, तो पुनः चलाने वाली सेवा विश्लेषण को छोड़ देगी।

प्रकार: `Array`

डिफ़ॉल्ट: `[]`

उदाहरण:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
पुनः चलाने वाले कमांड के लिए उपसर्ग जो उत्पन्न किया जाता है।

प्रकार: `String`

डिफ़ॉल्ट: `''`

उदाहरण:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----
---
id: wdio-docker-service
title: डॉकर सेवा
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

यह सेवा [WebdriverIO](http://webdriver.io/) के साथ उपयोग के लिए है और यह कंटेनरीकृत अनुप्रयोगों के विरुद्ध/उपयोग करके फंक्शनल/इंटीग्रेशन परीक्षण चलाने में मदद करती है। यह लोकप्रिय [Docker](https://www.docker.com/) सेवा (अलग से स्थापित) का उपयोग कंटेनर चलाने के लिए करती है।

## इसका उपयोग क्यों करें?
आदर्श रूप से आपके परीक्षण CI/CD पाइपलाइन की किसी विविधता में चलेंगे जहां अक्सर कोई "वास्तविक" ब्राउज़र और अन्य संसाधन नहीं होते हैं जिन पर आपका एप्लिकेशन निर्भर करता है। Docker के आगमन के साथ व्यावहारिक रूप से सभी आवश्यक एप्लिकेशन निर्भरताओं को कंटेनरीकृत किया जा सकता है।
इस सेवा के साथ आप अपने एप्लिकेशन कंटेनर या [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) को अपने CI में और पूर्ण अलगाव में चला सकते हैं (मानते हुए कि CI में Docker को निर्भरता के रूप में स्थापित किया जा सकता है)। यदि आपके एप्लिकेशन को आपके मुख्य OS से अलगाव के स्तर की आवश्यकता है तो स्थानीय विकास के लिए भी यही लागू हो सकता है।

## यह कैसे काम करता है
सेवा एक मौजूदा docker इमेज चलाएगी और एक बार जब वह तैयार हो जाती है, तो WebdriverIO परीक्षण शुरू करेगी जिन्हें आपके कंटेनरीकृत एप्लिकेशन के खिलाफ चलाना चाहिए।

## स्थापना

चलाएँ:

```bash
npm install wdio-docker-service --save-dev
```

WebdriverIO को कैसे स्थापित करें इसके निर्देश [यहां](https://webdriver.io/docs/gettingstarted) पाए जा सकते हैं।

## कॉन्फ़िगरेशन
डिफ़ॉल्ट रूप से, Google Chrome, Firefox और PhantomJS होस्ट सिस्टम पर स्थापित होने पर उपलब्ध हैं।
सेवा का उपयोग करने के लिए आपको अपनी सेवा सरणी में `docker` जोड़ना होगा:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## विकल्प

### dockerOptions
Docker कंटेनर चलाने के लिए आवश्यक विभिन्न विकल्प

प्रकार: `Object`

डिफ़ॉल्ट: `{ 
    options: {
        rm: true
    }
}`

उदाहरण:

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Docker कंटेनर नाम टैग। स्थानीय या Docker HUB से हो सकता है।

प्रकार: `String`

आवश्यक: `true`

### dockerOptions.healthCheck
कॉन्फ़िगरेशन जो परीक्षण शुरू करने से पहले आपके कंटेनरों की तत्परता की जांच करता है। सामान्यतः यह एक localhost URL होगा।
यदि healthCheck कॉन्फ़िगर नहीं किया गया है, तो Webdriver Docker कंटेनर शुरू होने के तुरंत बाद परीक्षण चलाना शुरू कर देगा, जो
शायद बहुत जल्दी हो सकता है क्योंकि Docker कंटेनर के अंदर वेब सेवा को शुरू होने में समय लगता है।

प्रकार: `String|Object`

Object उपयोग के लिए विकल्प:
- *url* - आपके कंटेनर के अंदर चल रहे ऐप का URL
- *maxRetries* - healthcheck विफल होने तक पुनर्प्रयासों की संख्या। डिफ़ॉल्ट: 10
- *inspectInterval* - प्रत्येक पुनर्प्रयास के बीच अंतराल ms में। डिफ़ॉल्ट: 500
- *startDelay* - healthcheck शुरू करने के लिए प्रारंभिक देरी ms में। डिफ़ॉल्ट: 0

उदाहरण 1 (String): `healthCheck: 'http://localhost:4444'`

उदाहरण 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
`docker run` कमांड द्वारा उपयोग किए जाने वाले विकल्पों का मानचित्र। `run` कमांड पर अधिक विवरण के लिए [यहां](https://docs.docker.com/edge/engine/reference/commandline/run/) क्लिक करें।

किसी भी एकल-अक्षर विकल्प को `-[option]` में परिवर्तित किया जाएगा (जैसे `d: true` -> `-d`)।

दो-अक्षर या अधिक के किसी भी विकल्प को `--[option]` में परिवर्तित किया जाएगा (जैसे `rm: true` -> `--rm`)।

उन विकल्पों के लिए जिन्हें एक से अधिक बार उपयोग किया जा सकता है
(जैसे `-e`,`-add-host`, `--expose`, आदि), कृपया सरणी अंकन का उपयोग करें (जैसे `e: ["NODE_ENV=development", "FOO=bar"]`)।

प्रकार: `Object`

उदाहरण:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
कोई भी आर्ग्युमेंट जिसे आप कंटेनर में पास करना चाहते हैं। Docker run CLI में `[ARG...]` से मेल खाता है।

प्रकार: `String`

### dockerOptions.command
कोई भी कमांड जिसे आप कंटेनर में पास करना चाहते हैं। Docker run CLI में `[COMMAND]` से मेल खाता है।

प्रकार: `String`

### onDockerReady
एक कॉलबैक विधि जिसे तब कॉल किया जाता है जब Docker एप्लिकेशन तैयार होता है। तत्परता `healthCheck` URL को पिंग करने की क्षमता से निर्धारित होती है।

प्रकार: `Function`

### dockerLogs
वह पथ जहां docker कंटेनर से लॉग्स संग्रहीत किए जाने चाहिए

प्रकार: `String`

## परीक्षण उपयोग के मामले / रेसिपीज़
अधिक विवरण के लिए कृपया हमारे [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) पर जाएं।
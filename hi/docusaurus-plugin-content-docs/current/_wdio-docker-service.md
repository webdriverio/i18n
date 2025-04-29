---
id: wdio-docker-service
title: डॉकर सर्विस
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---


> wdio-docker-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

यह सेवा [WebdriverIO](http://webdriver.io/) के साथ उपयोग के लिए है और यह कंटेनराइज्ड एप्लिकेशन के खिलाफ/उपयोग करके फंक्शनल/इंटीग्रेशन टेस्ट चलाने में मदद करती है। यह लोकप्रिय [Docker](https://www.docker.com/) सेवा (अलग से स्थापित) का उपयोग कंटेनर चलाने के लिए करती है।

## इसका उपयोग क्यों करें?
आदर्श रूप से आपके टेस्ट किसी प्रकार की CI/CD पाइपलाइन में चलेंगे जहां अक्सर कोई "वास्तविक" ब्राउज़र और अन्य संसाधन नहीं होते हैं जिन पर आपका एप्लिकेशन निर्भर करता है। Docker के आगमन के साथ व्यावहारिक रूप से सभी आवश्यक एप्लिकेशन निर्भरताओं को कंटेनराइज किया जा सकता है।
इस सेवा के साथ आप अपने एप्लिकेशन कंटेनर या [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) को अपने CI में और पूर्ण अलगाव में चला सकते हैं
(यह मानते हुए कि CI में Docker को एक निर्भरता के रूप में स्थापित किया जा सकता है)। यही स्थानीय विकास पर भी लागू हो सकता है यदि आपके एप्लिकेशन को आपके मुख्य OS से अलगाव का स्तर होना चाहिए।

## यह कैसे काम करता है
सेवा एक मौजूदा docker इमेज चलाएगी और एक बार तैयार होने के बाद, WebdriverIO टेस्ट शुरू करेगी जिन्हें आपके कंटेनराइज्ड एप्लिकेशन के खिलाफ चलाया जाना चाहिए।

## इंस्टालेशन

चलाएँ:

```bash
npm install wdio-docker-service --save-dev
```

WebdriverIO को इंस्टॉल करने के निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## कॉन्फ़िगरेशन
डिफ़ॉल्ट रूप से, Google Chrome, Firefox और PhantomJS होस्ट सिस्टम पर इंस्टॉल होने पर उपलब्ध हैं।
सेवा का उपयोग करने के लिए आपको अपनी सेवा सरणी में `docker` जोड़ने की आवश्यकता है:

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
डॉकर कंटेनर चलाने के लिए आवश्यक विभिन्न विकल्प

टाइप: `Object`

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
डॉकर कंटेनर नाम टैग। स्थानीय या Docker HUB से हो सकता है।

टाइप: `String`

आवश्यक: `true`

### dockerOptions.healthCheck
यह कॉन्फ़िगरेशन टेस्ट शुरू करने से पहले आपके कंटेनर की तैयारी की जांच करता है। सामान्य तौर पर यह एक localhost url होगा।
यदि healthCheck कॉन्फ़िगर नहीं किया गया है, तो Webdriver डॉकर कंटेनर शुरू होने के तुरंत बाद टेस्ट चलाना शुरू कर देगा, जो
शायद बहुत जल्दी हो क्योंकि डॉकर कंटेनर के अंदर वेब सेवा शुरू होने में समय लगता है।

टाइप: `String|Object`

Object उपयोग के लिए विकल्प:
- *url* - आपके कंटेनर के अंदर चल रहे ऐप का url
- *maxRetries* - हेल्थचेक विफल होने तक प्रयासों की संख्या। डिफ़ॉल्ट: 10
- *inspectInterval* - प्रत्येक पुनः प्रयास के बीच का अंतराल ms में। डिफ़ॉल्ट: 500
- *startDelay* - हेल्थचेक शुरू करने के लिए प्रारंभिक देरी ms में। डिफ़ॉल्ट: 0

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

कोई भी एकल-अक्षर विकल्प `-[option]` में परिवर्तित होगा (उदाहरण `d: true` -> `-d`)।

दो या अधिक वर्णों का कोई भी विकल्प
`--[option]` में परिवर्तित होगा (उदाहरण `rm: true` -> `--rm`)।

उन विकल्पों के लिए जिनका उपयोग एक से अधिक बार किया जा सकता है
(जैसे `-e`,`-add-host`, `--expose`, आदि), कृपया सरणी अंकन का उपयोग करें (जैसे `e: ["NODE_ENV=development", "FOO=bar"]`)।

टाइप: `Object`

उदाहरण:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
कोई भी तर्क जिन्हें आप कंटेनर में पास करना चाहते हैं। Docker run CLI में `[ARG...]` के अनुरूप है।

टाइप: `String`

### dockerOptions.command
कोई भी कमांड जिसे आप कंटेनर में पास करना चाहते हैं। Docker run CLI में `[COMMAND]` के अनुरूप है।

टाइप: `String`

### onDockerReady
एक कॉलबैक विधि जो तब कॉल की जाती है जब Docker एप्लिकेशन तैयार हो। तैयारी `healthCheck` url को पिंग करने की क्षमता से निर्धारित की जाती है।

टाइप: `Function`

### dockerLogs
वह पथ जहां docker कंटेनर से लॉग संग्रहीत किए जाने चाहिए

टाइप: `String`

## टेस्टिंग उपयोग के मामले / रेसिपी
अधिक विवरण के लिए कृपया हमारी [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) पर जाएं।
---
id: wdio-eslinter-service
title: eslint सेवा के साथ अनुपलब्ध आयातों का स्वतः-पता लगाना
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

क्या आपने कभी अपने e2e टेस्ट चलाए हैं, केवल यह पता लगाने के लिए कि 10, 15, या 30 मिनट बाद एक अनुपलब्ध/गलत लिखा हुआ आयात था, जो टेस्ट रन के मध्य में ही दिखाई दिया? जब ऐसा होता है, तो टेस्ट रनर इन टेस्टों को टूटा हुआ रिपोर्ट करता है।

eslint विभिन्न त्रुटियों को प्री-रनटाइम पर पकड़ने के लिए एक बेहतरीन टूल है, और यह सेवा eslint टूल को WebdriverIO टेस्ट निष्पादित करने से पहले, मैनुअल स्टेप के बजाय स्वचालित स्टेप के रूप में चलाती है।

अक्सर जल्दी विफल होना बेहतर होता है ताकि हम समस्याओं को देर से नहीं, बल्कि जल्दी ठीक कर सकें।

अनुशंसित कॉन्फ़िगरेशन unresolved रनर का उपयोग करके केवल अनुपलब्ध आयातों की जांच करना है, लेकिन यदि चाहें, तो आप सेवा को अपने प्रोजेक्ट में npm या yarn रनर का उपयोग करके eslinter चलाने के लिए कॉन्फ़िगर कर सकते हैं, या एक फ्लैग पास करके जो सिस्टम को आपके .eslintrc कॉन्फ़िगरेशन का उपयोग करने के लिए कहता है।

## इंस्टॉलेशन

wdio-eslinter-service इंस्टॉल करें:

```
$ npm i wdio-eslinter-service --save-dev 
```


### क्विक स्टार्ट - केवल अनुपलब्ध या अनरिज़ॉल्व्ड आयातों की जांच करें

डिफ़ॉल्ट रूप से, यह न्यूनतम कॉन्फ़िगरेशन, "unresolved" रनर, अनरिज़ॉल्व्ड require आयातों की जांच करता है और अनरिज़ॉल्व्ड आयात मिलने पर त्रुटि फेंकता है। तब सेवा निष्पादन रोक देती है। यदि चाहें, तो आप "npm" या "yarn" रनर्स का उपयोग करके अधिक जांच करने के लिए .eslintrc.js को कस्टमाइज़ कर सकते हैं। अधिक विवरण के लिए [eslint](https://www.npmjs.com/package/eslint) देखें।

यदि आपके प्रोजेक्ट में `.eslintrc.js` कॉन्फ़िगरेशन नहीं है, तो wdio-eslinter-service को एक डिफ़ॉल्ट कॉन्फ़िगरेशन का उपयोग करने के लिए कॉन्फ़िगर किया जा सकता है जो टेस्ट चलाने से पहले केवल अनुपलब्ध आयातों की जांच करता है। यह सुविधाजनक है ताकि आप गलत आयातों के बारे में देर से नहीं बल्कि जल्दी पता लगा सकें। इसे कॉन्फ़िगर करने के लिए, अपनी services ऐरे में निम्नलिखित eslinter कॉन्फ़िगरेशन जोड़ें (मानते हुए कि आप पहले से ही chromedriver सेवा का उपयोग कर रहे हैं; अन्यथा, उस हिस्से को छोड़ दें):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

इस बिंदु पर, टेस्ट चलाना शुरू करें, और यदि कोई अनुपलब्ध या गलत आयात है, तो WebdriverIO इसे लॉग करेगा और तुरंत टेस्ट रन को समाप्त कर देगा:

```
$ npx wdio
```


#### वैकल्पिक - यदि module-alias का उपयोग कर रहे हैं

यदि आप [module-alias](https://www.npmjs.com/package/module-alias) मॉड्यूल का उपयोग कर रहे हैं, जो आपको रिलेटिव पाथ को बदलने के लिए एलियास कॉन्फ़िगर करने देता है, तो आपको eslint-import-resolver-custom-alias प्लगइन का उपयोग करके eslinter कॉन्फ़िगरेशन में उसे पास करने की आवश्यकता होगी। नीचे एक उदाहरण दिया गया है:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

अपने प्रोजेक्ट में प्लगइन इंस्टॉल करें:

```
$ npm i eslint-import-resolver-custom-alias
```

टेस्ट चलाएं और सत्यापित करें कि सिस्टम मॉड्यूल एलियास का उपयोग करने वाले गलत आयातों को ढूंढ लेगा:

```
$ npx wdio
```

#### प्रयोगात्मक - आपके प्रोजेक्ट में मौजूदा eslintrc कॉन्फ़िगरेशन के साथ उपयोग करें

eslinter सेवा को आपके प्रोजेक्ट में मौजूदा eslintrc कॉन्फ़िगरेशन का भी उपयोग करने के लिए, wdio.conf.js कॉन्फ़िगरेशन सर्विसेज ऐरे में `includeProjectEslintrc` को true पर सेट करें।

मैंने परस्पर विरोधी प्लगइन्स के साथ समस्याएं अनुभव की हैं। यदि आपका प्रोजेक्ट eslint सेटअप भी अनरिज़ॉल्व्ड आयातों की तलाश कर रहा है, तो यह काम नहीं कर सकता है और आपके .eslintrc.js में समायोजन की आवश्यकता हो सकती है। इस समय यह अनुशंसित नहीं है।


### उन्नत विकल्प - npm और yarn रनर्स का उपयोग करना

npm और yarn रनर्स आपके प्रोजेक्ट में मौजूदा eslinter सेटअप चलाने पर अतिरिक्त नियंत्रण देने में मदद करते हैं। इस कॉन्फ़िगरेशन के साथ, आप अपने package.json के run-scripts सेक्शन में अतिरिक्त कमांड परिभाषित कर सकते हैं:

अपने `package.json` के अंदर, अपने रन स्क्रिप्ट्स में यह एंट्री जोड़ें:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**नोट: npm या yarn रनर्स का उपयोग करते समय सेवा के कार्य करने के लिए package.json में eslint जोड़ना आवश्यक है।**

यदि आपके पास eslint पहले से इंस्टॉल और कॉन्फ़िगर नहीं है, तो आपको इसे अपने प्रोजेक्ट में इंस्टॉल और कॉन्फ़िगर करने की आवश्यकता होगी, साथ ही किसी भी प्लगइन को जिसका आप उपयोग कर रहे हैं, जैसे eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

यदि आप मॉड्यूल एलियास को उनके वास्तविक पाथ पर मैप करने के लिए eslint-import-resolver-custom-alias प्लगइन का उपयोग कर रहे हैं, तो आपको इसे भी इंस्टॉल करने की आवश्यकता होगी:

```
$ npm i eslint-import-resolver-custom-alias
```

यदि आपके प्रोजेक्ट में पहले से eslintrc कॉन्फ़िगरेशन फाइलों में से कोई नहीं है, तो आपको एक `.eslintrc.js` फाइल भी बनाने की आवश्यकता होगी। यहां एक बुनियादी सेटअप है जो केवल अनरिज़ॉल्व्ड आयातों की तलाश करता है, और आप टेस्ट चलाने से पहले अन्य कोड गुणवत्ता जांचों को सत्यापित करने के लिए इस कॉन्फ़िगरेशन का विस्तार कर सकते हैं:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

अंत में, `wdio.conf.js` में services ऐरे में `eslinter` सेवा जोड़ें:

```javascript
    services: ['eslinter']
```

त्रुटियों की जांच और सत्यापन के लिए `npm run eslint` चलाएं।

यदि आप `yarn` का उपयोग करते हैं तो आप `runnerType` सेवा विकल्प को कॉन्फ़िगर कर सकते हैं:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

यदि आपके पास पहले से ही एक लिंटर स्क्रिप्ट है जिसे आप पुन: उपयोग करना चाहते हैं (`eslint` के बजाय), तो आप `scriptName` सेवा विकल्प को कॉन्फ़िगर कर सकते हैं:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## WebdriverIO में उपयोग

WebdriverIO के टेस्ट रनर को सामान्य रूप से शुरू करें। eslint कोड की जांच करेगा। यदि त्रुटियां मिलती हैं, तो निष्पादन तुरंत रुक जाता है।

```bash
$ npx wdio
```


**उदाहरण:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```
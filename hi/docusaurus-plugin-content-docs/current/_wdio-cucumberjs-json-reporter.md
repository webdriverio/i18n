---
id: wdio-cucumberjs-json-reporter
title: CucumberJS JSON रिपोर्टर
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

WebdriverIO v8 और उससे ऊपर के लिए CucumberJS JSON फाइलें बनाने वाला एक WDIO रिपोर्टर।

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## यह क्या करता है
यह रिपोर्टर प्रत्येक फीचर के लिए एक **Cucumber JSON फाइल** जेनरेट करेगा जिसका परीक्षण किया जा रहा है। JSON फाइल का उपयोग आप जिस भी रिपोर्ट के साथ करना चाहते हैं उसके साथ किया जा सकता है, जैसे [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)।

यह फीचर फाइल में चल रहे इंस्टेंस के बारे में मेटाडेटा भी जोड़ेगा और अंत में, यह आपको JSON आउटपुट में अटैचमेंट्स जोड़ने का अवसर देगा।

## इंस्टालेशन
सबसे आसान तरीका है `wdio-cucumberjs-json-reporter` को अपने `package.json` में devDependency के रूप में रखना।

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

आप इसे आसानी से कर सकते हैं:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

इस प्रकार यह स्वचालित रूप से आपके `package.json` में जोड़ दिया जाएगा

`WebdriverIO` को इंस्टॉल करने के निर्देश [यहां](https://webdriver.io/docs/gettingstarted) पाए जा सकते हैं।

## कॉन्फिगरेशन
अपनी wdio.conf.js फाइल में आउटपुट डायरेक्टरी और भाषा को कॉन्फिगर करें:

```js
export const config = {
    // ...
    reporters: [
        // इस तरह से डिफॉल्ट विकल्पों के साथ, नीचे दिए गए विकल्पों को देखें
        'cucumberjs-json',

        // या इस तरह से अगर आप फोल्डर और भाषा सेट करना चाहते हैं
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> रिपोर्टर को जोड़ने के दोनों तरीकों का उपयोग न करें, यह सिर्फ एक उदाहरण है!

## विकल्प
### `jsonFolder`
- **प्रकार:** `String`
- **अनिवार्य:** नहीं
- **डिफॉल्ट:** `.tmp/json/`

वह डायरेक्टरी जहां इस रिपोर्ट द्वारा जेनरेट की गई JSON फाइलें संग्रहीत की जाएंगी, स्क्रिप्ट शुरू होने के स्थान से सापेक्ष।

**ध्यान दें:** यदि आप कमांड लाइन से npm स्क्रिप्ट का उपयोग करते हैं, जैसे कि `npm run test`, तो `jsonFolder` उस पथ से सापेक्ष होगा
जहां से स्क्रिप्ट निष्पादित की जाती है। अपने प्रोजेक्ट के रूट से इसे निष्पादित करने पर आपके प्रोजेक्ट के रूट में भी `jsonFolder` बनाया जाएगा।

### `language`
- **प्रकार:** `String`
- **अनिवार्य:** नहीं
- **डिफॉल्ट:** `en`

वह भाषा जिसमें Gherkin परिदृश्य लिखे गए हैं (डिफॉल्ट अंग्रेजी है)। भाषा कोड और उनके कीवर्ड्स की सूची [यहां](https://cucumber.io/docs/gherkin/reference/#overview) पाई जा सकती है।

### `disableHooks`
- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफॉल्ट:** `false`

यदि यह प्रॉपर्टी `true` पर सेट है तो हुक विवरण जेनरेशन का हिस्सा नहीं होंगे।

### `reportFilePerRetry`
- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफॉल्ट:** `true`

जब किसी स्पेक को री-ट्राई किया जाता है, तो रिपोर्ट पिछले प्रयासों से मौजूदा रिपोर्ट फाइल में जोड़ी जाएगी यदि यह प्रॉपर्टी `false` पर सेट है।

**उदाहरण**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## मेटाडेटा

> **नोट:**\
> यह वर्तमान में WebdriverIO V6 के साथ समर्थित नहीं है, WebdriverIO V5 अभी भी इसका समर्थन करता है और WebdriverIO V7 फिर से इसका समर्थन करता है

जैसा कि कहा गया है, यह रिपोर्ट वर्तमान मशीन/डिवाइस का मेटाडेटा स्वचालित रूप से स्टोर कर सकती है जिस पर फीचर निष्पादित किया गया है।

इसे कस्टमाइज़ करने के लिए आप अपने `capabilities` में निम्नलिखित ऑब्जेक्ट जोड़ सकते हैं

```js
// Example wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Add this
            'cjson:metadata': {
                // For a browser
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // for an app
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> मेटाडेटा ऑब्जेक्ट में `cjson` प्रीफिक्स होना चाहिए, अन्यथा यह काम नहीं करेगा!

### मेटाडेटा मान
#### `metadata.app.name`
- **प्रकार:** `string`

**उदाहरण:** ऐप का नाम।

#### `metadata.app.version`
- **प्रकार:** `string`

**उदाहरण:** ऐप का वर्शन।

#### `metadata.browser.name`
- **प्रकार:** `string`
- **संभावित मान:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **प्रकार:** `string`

**उदाहरण:** ब्राउज़र का वर्शन, इसे मैन्युअल रूप से जोड़ा जा सकता है या परीक्षणों के निष्पादन के दौरान सटीक वर्शन नंबर प्राप्त करने के लिए प्राप्त किया जा सकता है।

#### `metadata.device`
- **प्रकार:** `string`

**उदाहरण:** एक नाम जो डिवाइस के प्रकार का प्रतिनिधित्व करता है। उदाहरण के लिए, यदि आप इसे वर्चुअल मशीन पर चलाते हैं, तो आप इसे `Virtual Machine` में रख सकते हैं,
या मोबाइल का नाम, जैसे `iPhone 7 Plus`।

#### `metadata.platform.name`
- **प्रकार:** `string`
- **संभावित मान:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **प्रकार:** `string`

**उदाहरण:** प्लेटफॉर्म का वर्शन

> यदि आप मेटाडेटा में `browser`-ऑब्जेक्ट प्रदान नहीं करते हैं, तो यह मॉड्यूल स्वचालित रूप से इसे आपके लिए निर्धारित करेगा। **यह हमेशा इसे सबसे हाल ही के मान से ओवरराइड करेगा जिसे यह निर्धारित कर सकता है।**

> यदि आप `device` और/या `platform`-ऑब्जेक्ट प्रदान नहीं करते हैं तो इसे आपके लिए डिफॉल्ट रूप से `not known` सेट किया जाएगा

> यदि आप `browser.name` या `browser.version` प्रदान नहीं करते हैं तो मॉड्यूल इसे स्वचालित रूप से निर्धारित करने का प्रयास करेगा।

## अटैचमेंट
आपके पास इन सभी हुक्स/स्टेप्स में JSON फाइल से डेटा अटैच करने का विकल्प है:

- Before(All)
- After(All)
- Given
- When
- Then
- And

आपको अपनी स्टेप फाइलों में बस निम्नलिखित कोड प्रदान करने की आवश्यकता है।

ES मॉड्यूल्स (ESM) के लिए
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// स्ट्रिंग अटैच करें (यदि कोई प्रकार प्रदान नहीं किया गया है तो यह स्वचालित रूप से `text/plain` को डिफॉल्ट करेगा)
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// JSON अटैच करें
cucumberJson.attach({"json-string": true}, 'application/json');

// before हुक में स्क्रीनशॉट अटैच करें
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
CommonJS (CJS) के लिए
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// स्ट्रिंग अटैच करें (यदि कोई प्रकार प्रदान नहीं किया गया है तो यह स्वचालित रूप से `text/plain` को डिफॉल्ट करेगा)
attach('just a string');
attach('just a second string', 'text/plain');

// JSON अटैच करें
attach({"json-string": true}, 'application/json');

// before हुक में स्क्रीनशॉट अटैच करें
attach(await browser.takeScreenshot(), 'image/png');
```

## multiple-cucumber-html-reporter के साथ उपयोग करें
WebdriverIO V4 के लिए पिछला मॉड्यूल, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
में [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)-मॉड्यूल के साथ एक बिल्ट-इन कनेक्शन था। **यह इस रिपोर्टर के लिए लागू नहीं है** क्योंकि WebdriverIO V5 का नया सेटअप एक इंस्टेंस पर आधारित है जो मुझे `onPrepare` और `onComplete` हुक का उपयोग करने की अनुमति नहीं देता है।

यदि आप अभी भी [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)-मॉड्यूल का उपयोग करना चाहते हैं, तो आप अपनी कॉन्फिग फाइल में निम्नलिखित जोड़ सकते हैं।

- मॉड्यूल को इंस्टॉल करें

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- अपनी कॉन्फिगरेशन फाइल में यह जोड़ें

    ```js
    import fs from 'node:fs/promises'
    // मॉड्यूल को इम्पोर्ट करें
    import { generate } from 'multiple-cucumber-html-reporter'

    // Example wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * All workers के लॉन्च होने से पहले एक बार एक्जिक्यूट होता है।
       */
      onPrepare: () => {
        // `.tmp/` फोल्डर को हटाएं जो json और रिपोर्ट फाइलों को रखता है
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * सभी workers के बंद होने के बाद और प्रोसेस के बाहर निकलने से पहले एक्जिक्यूट होता है।
       */
      onComplete: () => {
        // सभी टेस्ट पूरे हो जाने पर रिपोर्ट जेनरेट करें
        generate({
          // आवश्यक
          // यह भाग उसी पथ के समान होना चाहिए जहां आप JSON फाइलें स्टोर करते हैं
          // default = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // अधिक विकल्पों के लिए देखें https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## पुराने WebdriverIO वर्शन

> **यह मॉड्यूल केवल WebdriverIO V8+ के साथ काम कर सकता है!**\
> **V6 के लिए कृपया [यहां](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) दस्तावेज़ देखें और वर्शन 2.0.4 का उपयोग करें**\
> **V5 के लिए कृपया [यहां](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) दस्तावेज़ देखें और वर्शन 1.3.0 का उपयोग करें**

> **यह मॉड्यूल [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter) का विकल्प नहीं है। वह मॉड्यूल केवल WEBDRIVERIO V4 का समर्थन करता है और एक रिपोर्ट भी बनाता है। यह मॉड्यूल केवल एक JSON बनाता है, कोई रिपोर्ट नहीं!!**
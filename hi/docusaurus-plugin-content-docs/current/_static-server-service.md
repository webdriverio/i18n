---
id: static-server-service
title: स्टेटिक सर्वर सेवा
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---


कुछ प्रोजेक्ट केवल फ्रंट-एंड एसेट्स हैं, और स्टेटिक सर्वर से अधिक पर नहीं चलते हैं। यह सेवा आपको परीक्षण के दौरान स्टेटिक फाइल सर्वर चलाने में मदद करती है।

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/static-server-service` को अपने `package.json` में `devDependency` के रूप में जोड़ना, इसके माध्यम से:

```sh
npm install @wdio/static-server-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted) पाए जा सकते हैं।

## कॉन्फिगरेशन

स्टेटिक सर्वर सेवा का उपयोग करने के लिए, अपनी सेवा सरणी में `static-server` जोड़ें:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## विकल्प

### `folders` (आवश्यक)

फोल्डर पथ और माउंट पॉइंट्स की सरणी।

प्रकार: `Array<Object>`
गुण:
 - mount `{String}` - URL एंडपॉइंट जहां फोल्डर माउंट किया जाएगा।
 - path `{String}` - माउंट करने के लिए फोल्डर का पथ।

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

सर्वर को बाइंड करने के लिए पोर्ट।

प्रकार: `Number`

डिफ़ॉल्ट: `4567`

### `middleware`

मिडलवेयर ऑब्जेक्ट्स की सरणी। इन्हें कॉन्फिग में लोड और इंस्टेंशिएट करें, और स्टेटिक सर्वर को उपयोग करने के लिए उन्हें पास करें।

प्रकार: `Array<Object>`
गुण:
 - mount `{String}` - URL एंडपॉइंट जहां मिडलवेयर माउंट किया जाएगा।
 - middleware `<Object>` - मिडलवेयर फंक्शन कॉलबैक।

डिफ़ॉल्ट: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

WebdriverIO पर अधिक जानकारी के लिए, [होमपेज](http://webdriver.io) देखें।
---
id: firefox-profile-service
title: फायरफॉक्स प्रोफाइल सर्विस
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

क्या आप अपने Firefox ब्राउज़र को एक विशिष्ट एक्सटेंशन के साथ चलाना चाहते हैं या कुछ प्राथमिकताओं को सेट करने की आवश्यकता है? Selenium आपको Firefox ब्राउज़र के लिए एक प्रोफ़ाइल का उपयोग करने की अनुमति देता है, इस प्रोफ़ाइल को आपकी वांछित क्षमताओं में `moz:firefoxOptions.profile` प्रॉपर्टी में `base64` स्ट्रिंग के रूप में पास करके। इसके लिए उस प्रोफाइल को बनाने और `base64` में परिवर्तित करने की आवश्यकता होती है। [wdio testrunner](https://webdriver.io/docs/clioptions) के लिए यह सेवा प्रोफाइल को संकलित करने का कार्य आपके हाथों से निकालती है और आपको अपने वांछित विकल्पों को आरामदायक ढंग से `wdio.conf.js` फ़ाइल से परिभाषित करने की अनुमति देती है।

सभी संभावित विकल्प खोजने के लिए अपने Firefox ब्राउज़र में [about:config](about:config) खोलें या प्रत्येक सेटिंग के बारे में पूरा दस्तावेज़ीकरण खोजने के लिए [mozillaZine](http://kb.mozillazine.org/About:config_entries) वेबसाइट पर जाएँ। इसके अतिरिक्त, आप संकलित (`*.xpi` के रूप में) Firefox एक्सटेंशन परिभाषित कर सकते हैं जिन्हें परीक्षण शुरू होने से पहले इंस्टॉल किया जाना चाहिए।

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/firefox-profile-service` को आपके `package.json` में devDependency के रूप में रखना, इसके माध्यम से:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करना है इसके निर्देश [यहां मिल सकते हैं।](https://webdriver.io/docs/gettingstarted)

## कॉन्फिगरेशन

अपनी सेवा सूची में `firefox-profile` सेवा को जोड़कर अपना प्रोफाइल सेट करें। फिर अपनी सेटिंग्स को इस तरह `firefoxProfile` प्रॉपर्टी में परिभाषित करें:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // path to .xpi file
                '/path/to/extensionB' // or path to unpacked Firefox extension
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // only use for firefox <= 55
        }]
    ],
    // ...
};
```

यदि आपने एक कस्टम Firefox एक्सटेंशन बनाया है जिसे आप ब्राउज़र में इंस्टॉल करना चाहते हैं, तो सुनिश्चित करें कि प्रोफ़ाइल फ्लैग के रूप में `'xpinstall.signatures.required': false` सेट करें, क्योंकि Firefox एक्सटेंशन को [Mozilla द्वारा हस्ताक्षरित](https://wiki.mozilla.org/Add-ons/Extension_Signing) होने की आवश्यकता है।

कस्टम अहस्ताक्षरित एक्सटेंशन का उपयोग करने के लिए आपको [Firefox डेवलपर एडिशन](https://www.mozilla.org/en-GB/firefox/developer/) का उपयोग करने की भी आवश्यकता होगी क्योंकि नियमित Firefox 48 और नए संस्करण [इसकी अनुमति नहीं देते हैं](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline)।

## विकल्प

सभी सेटिंग्स को key-value जोड़े के रूप में रखता है। आप सभी उपलब्ध सेटिंग्स `about:config` पेज पर पा सकते हैं।

### extensions

ब्राउज़र सेशन में एक या कई एक्सटेंशन जोड़ें। सभी प्रविष्टियां या तो `.xpi` फ़ाइल के लिए एक पूर्ण पथ या अनपैक किए गए Firefox एक्सटेंशन डायरेक्टरी का पथ हो सकती हैं।

प्रकार: `String[]`<br />
डिफ़ॉल्ट: `[]`

### profileDirectory

एक मौजूदा प्रोफाइल के आधार पर Firefox प्रोफाइल बनाएं, उस प्रोफाइल के लिए पूर्ण पथ सेट करके।

प्रकार: `String`<br />
डिफ़ॉल्ट: `null`

### proxy

नेटवर्क प्रॉक्सी सेटिंग्स सेट करें। पैरामीटर `proxy` एक हैश है जिसकी संरचना अनिवार्य `proxyType` की के मान पर निर्भर करती है, जो निम्न स्ट्रिंग मानों में से एक लेती है:

 * `direct` - प्रत्यक्ष कनेक्शन (कोई प्रॉक्सी नहीं)
 * `system` - ऑपरेटिंग सिस्टम प्रॉक्सी सेटिंग्स का उपयोग करें
 * `pac` - `autoconfigUrl` की के मान के आधार पर सेट एक स्वचालित प्रॉक्सी कॉन्फिगरेशन का उपयोग करें
 * `manual` - निम्न की से मानों का उपयोग करके विभिन्न प्रोटोकॉल के लिए अलग से परिभाषित मैनुअल प्रॉक्सी सेटिंग्स: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

प्रकार: `Object`<br />
डिफ़ॉल्ट: `null`<br />
उदाहरण:

- स्वचालित प्रॉक्सी:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- मैनुअल HTTP प्रॉक्सी:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- मैनुअल HTTP और HTTPS प्रॉक्सी:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

कृपया इस फ्लैग को `true` पर सेट करें यदि आप Firefox v55 या निचले संस्करण का उपयोग करते हैं।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।
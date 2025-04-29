---
id: firefox-profile-service
title: फ़ायरफ़ॉक्स प्रोफ़ाइल सर्विस
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---


क्या आप अपने Firefox ब्राउज़र को एक विशिष्ट एक्सटेंशन के साथ चलाना चाहते हैं या कुछ प्राथमिकताएँ सेट करने की आवश्यकता है? Selenium आपको Firefox ब्राउज़र के लिए एक प्रोफाइल का उपयोग करने की अनुमति देता है, इस प्रोफ़ाइल को `base64` स्ट्रिंग के रूप में आपकी वांछित क्षमताओं में `moz:firefoxOptions.profile` प्रॉपर्टी में पास करके। इसके लिए उस प्रोफाइल को बनाना और इसे `base64` में परिवर्तित करना आवश्यक है। [wdio testrunner](https://webdriver.io/docs/clioptions) के लिए यह सेवा प्रोफाइल को संकलित करने का काम आपके हाथों से ले लेती है और आपको अपने वांछित विकल्पों को `wdio.conf.js` फ़ाइल से आरामदायक ढंग से परिभाषित करने देती है।

सभी संभावित विकल्प खोजने के लिए अपने Firefox ब्राउज़र में [about:config](about:config) खोलें या प्रत्येक सेटिंग के बारे में पूरा दस्तावेज़ीकरण पाने के लिए [mozillaZine](http://kb.mozillazine.org/About:config_entries) वेबसाइट पर जाएं। इसके अतिरिक्त, आप संकलित (जैसे `*.xpi`) Firefox एक्सटेंशन को परिभाषित कर सकते हैं जिन्हें परीक्षण शुरू होने से पहले स्थापित किया जाना चाहिए।

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/firefox-profile-service` को अपने `package.json` में devDependency के रूप में रखना, इसके माध्यम से:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें, इस बारे में निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## कॉन्फ़िगरेशन

अपनी सर्विस सूची में `firefox-profile` सेवा को जोड़कर अपना प्रोफाइल सेटअप करें। फिर इस प्रकार `firefoxProfile` प्रॉपर्टी में अपनी सेटिंग्स को परिभाषित करें:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // .xpi फ़ाइल का पथ
                '/path/to/extensionB' // या अनपैक्ड Firefox एक्सटेंशन का पथ
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // केवल firefox <= 55 के लिए उपयोग करें
        }]
    ],
    // ...
};
```

यदि आपने एक कस्टम Firefox एक्सटेंशन बनाया है जिसे आप ब्राउज़र में इंस्टॉल करना चाहते हैं, तो सुनिश्चित करें कि `'xpinstall.signatures.required': false` को प्रोफाइल फ्लैग के रूप में सेट करें क्योंकि Firefox एक्सटेंशन को [Mozilla द्वारा हस्ताक्षरित](https://wiki.mozilla.org/Add-ons/Extension_Signing) होना आवश्यक है।

कस्टम अहस्ताक्षरित एक्सटेंशन का उपयोग करने के लिए आपको [Firefox डेवलपर एडिशन](https://www.mozilla.org/en-GB/firefox/developer/) का उपयोग करने की भी आवश्यकता होगी क्योंकि नियमित Firefox 48 और नए वर्शन [इसकी अनुमति नहीं देते हैं](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline)।

## विकल्प

key-value जोड़े के रूप में सभी सेटिंग्स शामिल हैं। आप सभी उपलब्ध सेटिंग्स `about:config` पृष्ठ पर पा सकते हैं।

### extensions

ब्राउज़र सत्र में एक या कई एक्सटेंशन जोड़ें। सभी एंट्रीज़ या तो `.xpi` फ़ाइल का एब्सोल्यूट पथ या अनपैक्ड Firefox एक्सटेंशन डायरेक्टरी का पथ हो सकती हैं।

प्रकार: `String[]`<br />
डिफ़ॉल्ट: `[]`

### profileDirectory

किसी मौजूदा प्रोफाइल के आधार पर Firefox प्रोफाइल बनाएं, उस प्रोफाइल का एब्सोल्यूट पथ सेट करके।

प्रकार: `String`<br />
डिफ़ॉल्ट: `null`

### proxy

नेटवर्क प्रॉक्सी सेटिंग्स सेट करें। पैरामीटर `proxy` एक हैश है जिसकी संरचना अनिवार्य `proxyType` कुंजी के मान पर निर्भर करती है, जो निम्नलिखित स्ट्रिंग मानों में से एक लेती है:

 * `direct` - सीधा कनेक्शन (कोई प्रॉक्सी नहीं)
 * `system` - ऑपरेटिंग सिस्टम प्रॉक्सी सेटिंग्स का उपयोग करें
 * `pac` - `autoconfigUrl` कुंजी के मान के आधार पर स्वचालित प्रॉक्सी कॉन्फ़िगरेशन सेट का उपयोग करें
 * `manual` - मैनुअल प्रॉक्सी सेटिंग्स जो अलग-अलग प्रोटोकॉल के लिए अलग-अलग परिभाषित की गई हैं, निम्नलिखित कुंजियों से मान का उपयोग करके: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

प्रकार: `Object`<br />
डिफ़ॉल्ट: `null`<br />
उदाहरण:

- ऑटोमैटिक प्रॉक्सी:
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

कृपया इस फ्लैग को `true` पर सेट करें यदि आप Firefox v55 या निचले वर्शन का उपयोग करते हैं।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।
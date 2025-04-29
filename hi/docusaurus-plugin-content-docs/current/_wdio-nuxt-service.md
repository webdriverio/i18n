---
id: wdio-nuxt-service
title: Nuxt सेवा सेवा
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---


> wdio-nuxt-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

यह सेवा आपको अपने एप्लिकेशन को लॉन्च करने में मदद करती है जब आप [Nuxt](https://nuxt.com/) का उपयोग बिल्ड टूल के रूप में करते हैं। यह परीक्षण शुरू करने से पहले आपके `nuxt.conf.js` का उपयोग करके Nuxt सर्वर को स्वचालित रूप से शुरू करता है।

## इंस्टालेशन

अगर आप WebdriverIO के साथ शुरुआत कर रहे हैं, तो आप सब कुछ सेटअप करने के लिए कॉन्फिगरेशन विज़ार्ड का उपयोग कर सकते हैं:

```sh
npm init wdio@latest .
```

यह आपके प्रोजेक्ट को Nuxt प्रोजेक्ट के रूप में पहचानेगा और आपके लिए सभी आवश्यक प्लगइन्स इंस्टॉल करेगा। अगर आप इस सेवा को मौजूदा सेटअप पर जोड़ रहे हैं, तो आप इसे हमेशा इस तरह इंस्टॉल कर सकते हैं:

```bash
npm install wdio-nuxt-service --save-dev
```

## कॉन्फिगरेशन

सेवा को सक्षम करने के लिए, बस इसे अपनी `wdio.conf.js` फ़ाइल में अपनी `services` सूची में जोड़ें, जैसे:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

आप कॉन्फिग ऑब्जेक्ट के साथ एक ऐरे पास करके सेवा विकल्प लागू कर सकते हैं, जैसे:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## उपयोग

यदि आपका कॉन्फिग तदनुसार सेट किया गया है, तो सेवा [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) विकल्प को आपके एप्लिकेशन की ओर इशारा करने के लिए सेट करेगी। आप [`url`](https://webdriver.io/docs/api/browser/url) कमांड के माध्यम से इसके लिए नेविगेट कर सकते हैं, जैसे:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## विकल्प

### `rootDir`

प्रोजेक्ट की रूट डायरेक्टरी।

प्रकार: `string`<br />
डिफ़ॉल्ट: `process.cwd()`

### `dotenv`

सर्वर शुरू होने से पहले लोड की जाने वाली पर्यावरण फ़ाइल।

प्रकार: `string`<br />
डिफ़ॉल्ट: `.env`

### `hostname`

होस्टनेम जिस पर सर्वर शुरू होगा।

प्रकार: `string`<br />
डिफ़ॉल्ट: `localhost`

### `port`

पोर्ट जिस पर सर्वर शुरू होगा।

प्रकार: `number`<br />
डिफ़ॉल्ट: `process.env.NUXT_PORT || config.devServer.port`

### `https`

यदि टेस्ट सर्वर को https पर शुरू किया जाना चाहिए तो true पर सेट करें (सर्टिफिकेट्स को Nuxt कॉन्फिग में कॉन्फिगर करने की आवश्यकता है)।

प्रकार: `boolean`<br />
डिफ़ॉल्ट: `false`

### `sslCert`

https पर सर्वर शुरू करने के लिए उपयोग किया जाने वाला SSL सर्टिफिकेट।

प्रकार: `string`

### `sslKey`

https पर सर्वर शुरू करने के लिए उपयोग की जाने वाली SSL की।

प्रकार: `string`

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।
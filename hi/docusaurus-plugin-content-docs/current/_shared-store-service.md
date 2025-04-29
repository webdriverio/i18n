---
id: shared-store-service
title: शेयर्ड स्टोर सर्विस
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---


> मुख्य प्रोसेस और वर्कर्स (स्पेक्स) के बीच डेटा आदान-प्रदान करें।

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/shared-store-service` को अपने `package.json` में एक dev dependency के रूप में रखना, इस प्रकार:

```sh
npm install @wdio/shared-store-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें, इसके निर्देश [यहां मिल सकते हैं।](https://webdriver.io/docs/gettingstarted)

## उपयोग

स्टोर में कीमत (एक सादा ऑब्जेक्ट) को key (स्ट्रिंग) द्वारा पाएं/सेट करें। key कोई भी अनियमित स्ट्रिंग हो सकती है, सिवाय `*` के जो आरक्षित है क्योंकि यह आपको पूरा स्टोर प्राप्त करने की अनुमति देता है।

### मान सेट करें

स्टोर में मान सेट करने के लिए कॉल करें:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### मान प्राप्त करें

स्टोर से मान प्राप्त करने के लिए कॉल करें:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // returns "foobar123"
```

आप `*` key का उपयोग करके सभी key मान प्राप्त कर सकते हैं:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // returns `{ key: "foobar" }`
```

### WDIO हुक्स में स्टोर एक्सेस करें

आप `setValue` और `getValue` async हैंडलर्स तक सीधे एक्सेस कर सकते हैं।
सुनिश्चित करें कि आप उन्हें `await` कीवर्ड के साथ ठीक से कॉल करते हैं।

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

महत्वपूर्ण! प्रत्येक स्पेक फ़ाइल अन्य स्पेक्स से अलग और स्वतंत्र होनी चाहिए।
इस सेवा का विचार बहुत विशिष्ट पर्यावरण सेटअप मुद्दों से निपटने का है।
कृपया टेस्ट एक्ज़ीक्यूशन डेटा शेयर करने से बचें!

### रिसोर्स पूल्स

यदि वर्कर थ्रेड्स ऐसे संसाधनों के लिए प्रतिस्पर्धा कर रहे हैं जिन्हें प्रत्येक वर्कर के लिए असाइन किया जाना चाहिए, तो आप Resource Pool API का उपयोग कर सकते हैं:

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

यह उदाहरण सुनिश्चित करता है कि दोनों वर्कर कभी भी एक ही `baseUrl` का उपयोग नहीं करते हैं। एक अद्वितीय url केवल एक वर्कर को असाइन किया जाता है जब तक कि वह इसे रिलीज़ नहीं करता।

## कॉन्फ़िगरेशन

सर्विसेज़ लिस्ट में `shared-store` जोड़ें और अपने टेस्ट में [`browser` स्कोप](https://webdriver.io/docs/api/browser) पर `sharedStore` ऑब्जेक्ट आपके लिए एक्सेसिबल होगा।

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

यदि आप टाइपस्क्रिप्ट का उपयोग कर रहे हैं, तो अपने `compilerOptions.types` में `@wdio/shared-store-service` जोड़ना सुनिश्चित करें:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```
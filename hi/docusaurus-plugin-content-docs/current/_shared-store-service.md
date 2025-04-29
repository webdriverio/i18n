---
id: shared-store-service
title: शेयर्ड स्टोर सर्विस
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> मुख्य प्रोसेस और वर्कर्स (स्पेक्स) के बीच डेटा का आदान-प्रदान करें।

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/shared-store-service` को आपके `package.json` में एक dev dependency के रूप में रखना, इसके माध्यम से:

```sh
npm install @wdio/shared-store-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें इसके निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## उपयोग

key (string) द्वारा स्टोर से/में एक वैल्यू (एक सादा ऑब्जेक्ट) प्राप्त/सेट करें। key कोई भी मनमाना स्ट्रिंग हो सकता है सिवाय `*` के जो आरक्षित है क्योंकि यह आपको पूरा स्टोर फेच करने की अनुमति देता है।

### वैल्यू सेट करना

स्टोर में वैल्यू सेट करने के लिए कॉल करें:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### वैल्यू प्राप्त करना

स्टोर से वैल्यू प्राप्त करने के लिए कॉल करें:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // "foobar123" रिटर्न करता है
```

आप `*` key का उपयोग करके सभी key वैल्यू भी फेच कर सकते हैं:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // `{ key: "foobar" }` रिटर्न करता है
```

### WDIO हुक्स में स्टोर एक्सेस करना

आप सीधे `setValue` और `getValue` असिंक हैंडलर्स तक पहुंच सकते हैं।
सुनिश्चित करें कि आप उन्हें `await` कीवर्ड के साथ ठीक से कॉल करें।

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

महत्वपूर्ण! प्रत्येक स्पेक फाइल अन्य स्पेक्स से परमाणविक और अलग होनी चाहिए।
सेवा का विचार बहुत विशिष्ट पर्यावरण सेटअप मुद्दों से निपटने का है।
कृपया टेस्ट एक्जीक्यूशन डेटा साझा करने से बचें!

### रिसोर्स पूल्स

यदि वर्कर थ्रेड्स ऐसे रिसोर्सेज के लिए प्रतिस्पर्धा कर रहे हैं जिन्हें प्रत्येक वर्कर के लिए असाइन किया जाना चाहिए, तो आप रिसोर्स पूल API का उपयोग कर सकते हैं:

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
        // worker उपयोग किए गए रिसोर्स को अगले वर्कर्स के उपयोग के लिए वापस करता है
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

यह उदाहरण सुनिश्चित करता है कि दोनों वर्कर कभी भी समान `baseUrl` का उपयोग नहीं करते। एक अद्वितीय url केवल एक वर्कर को तब तक असाइन किया जाता है जब तक कि उसके द्वारा इसे रिलीज नहीं किया जाता।

## कॉन्फिगरेशन

सर्विसेज सूची में `shared-store` जोड़ें और `sharedStore` ऑब्जेक्ट आपके टेस्ट में [`browser` स्कोप](https://webdriver.io/docs/api/browser) पर आपके लिए एक्सेसिबल होगा।

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

यदि आप टाइपस्क्रिप्ट का उपयोग कर रहे हैं, तो सुनिश्चित करें कि आप `@wdio/shared-store-service` को अपने `compilerOptions.types` में जोड़ें:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```
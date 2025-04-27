---
id: proxy
title: प्रॉक्सी सेटअप
---

आप दो अलग-अलग प्रकार के अनुरोधों को प्रॉक्सी के माध्यम से भेज सकते हैं:

- आपकी टेस्ट स्क्रिप्ट और ब्राउज़र ड्राइवर (या WebDriver एंडपॉइंट) के बीच कनेक्शन
- ब्राउज़र और इंटरनेट के बीच कनेक्शन

## ड्राइवर और टेस्ट के बीच प्रॉक्सी

यदि आपकी कंपनी में सभी आउटगोइंग अनुरोधों के लिए एक कॉर्पोरेट प्रॉक्सी है (जैसे `http://my.corp.proxy.com:9090` पर), तो [undici](https://github.com/nodejs/undici) को इंस्टॉल और कॉन्फ़िगर करने के लिए निम्न चरणों का पालन करें।

### undici इंस्टॉल करें

```bash npm2yarn
npm install undici --save-dev
```

### अपनी कॉन्फ़िग फ़ाइल में undici setGlobalDispatcher जोड़ें

अपनी कॉन्फ़िग फ़ाइल के शीर्ष पर निम्न require स्टेटमेंट जोड़ें।

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

प्रॉक्सी को कॉन्फ़िगर करने के बारे में अतिरिक्त जानकारी [यहां](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) पाई जा सकती है।

यदि आप [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) का उपयोग करते हैं, तो इसे इस प्रकार शुरू करें:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## ब्राउज़र और इंटरनेट के बीच प्रॉक्सी

ब्राउज़र और इंटरनेट के बीच कनेक्शन को टनल करने के लिए, आप एक प्रॉक्सी सेट अप कर सकते हैं जो उपयोगी हो सकता है (उदाहरण के लिए) [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) जैसे टूल्स के साथ नेटवर्क जानकारी और अन्य डेटा कैप्चर करने के लिए।

`proxy` पैरामीटर्स को स्टैंडर्ड कैपेबिलिटीज के माध्यम से निम्नलिखित तरीके से लागू किया जा सकता है:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

अधिक जानकारी के लिए, [WebDriver स्पेसिफिकेशन](https://w3c.github.io/webdriver/#proxy) देखें।
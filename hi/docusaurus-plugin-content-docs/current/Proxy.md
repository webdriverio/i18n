---
id: proxy
title: प्रॉक्सी सेटअप
---

आप दो अलग-अलग प्रकार के अनुरोधों को प्रॉक्सी के माध्यम से टनल कर सकते हैं:

- आपकी टेस्ट स्क्रिप्ट और ब्राउज़र ड्राइवर (या WebDriver एंडपॉइंट) के बीच कनेक्शन
- ब्राउज़र और इंटरनेट के बीच कनेक्शन

## ड्राइवर और टेस्ट के बीच प्रॉक्सी

यदि आपकी कंपनी में सभी आउटगोइंग अनुरोधों के लिए एक कॉर्पोरेट प्रॉक्सी है (जैसे `http://my.corp.proxy.com:9090` पर), तो आपके पास WebdriverIO को प्रॉक्सी का उपयोग करने के लिए कॉन्फ़िगर करने के दो विकल्प हैं:

### विकल्प 1: पर्यावरण चर का उपयोग करना (अनुशंसित)

WebdriverIO v9.12.0 से शुरू करके, आप सिंपल तरीके से मानक प्रॉक्सी पर्यावरण चर सेट कर सकते हैं:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# वैकल्पिक: कुछ होस्ट के लिए प्रॉक्सी को बायपास करें
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

फिर अपने टेस्ट को सामान्य रूप से चलाएं। WebdriverIO स्वचालित रूप से प्रॉक्सी कॉन्फ़िगरेशन के लिए इन पर्यावरण चरों का उपयोग करेगा।

### विकल्प 2: undici के setGlobalDispatcher का उपयोग करना

अधिक उन्नत प्रॉक्सी कॉन्फ़िगरेशन के लिए या यदि आपको प्रोग्रामेटिक नियंत्रण की आवश्यकता है, तो आप undici के `setGlobalDispatcher` मेथड का उपयोग कर सकते हैं:

#### undici इंस्टॉल करें

```bash npm2yarn
npm install undici --save-dev
```

#### अपनी कॉन्फिग फ़ाइल में undici setGlobalDispatcher जोड़ें

अपनी कॉन्फिग फ़ाइल के शीर्ष पर निम्न require स्टेटमेंट जोड़ें।

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

प्रॉक्सी को कॉन्फिगर करने के बारे में अतिरिक्त जानकारी [यहां](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) मिल सकती है।

### मुझे कौन सा तरीका उपयोग करना चाहिए?

- **पर्यावरण चर का उपयोग करें** यदि आप एक सरल, मानक दृष्टिकोण चाहते हैं जो विभिन्न टूल्स में काम करता है और कोड परिवर्तन की आवश्यकता नहीं होती है।
- **setGlobalDispatcher का उपयोग करें** यदि आपको उन्नत प्रॉक्सी सुविधाओं जैसे कस्टम प्रमाणीकरण, प्रति पर्यावरण अलग-अलग प्रॉक्सी कॉन्फ़िगरेशन की आवश्यकता है, या प्रोग्रामेटिक रूप से प्रॉक्सी व्यवहार को नियंत्रित करना चाहते हैं।

दोनों विधियों का पूरी तरह से समर्थन किया जाता है और WebdriverIO पहले ग्लोबल डिस्पैचर की जांच करेगा और फिर पर्यावरण चरों पर फॉलबैक करेगा।

### Sauce Connect प्रॉक्सी

यदि आप [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) का उपयोग करते हैं, तो इसे इस प्रकार शुरू करें:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## ब्राउज़र और इंटरनेट के बीच प्रॉक्सी

ब्राउज़र और इंटरनेट के बीच कनेक्शन को टनल करने के लिए, आप एक प्रॉक्सी सेट कर सकते हैं जो (उदाहरण के लिए) नेटवर्क जानकारी और अन्य डेटा को [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) जैसे टूल्स के साथ कैप्चर करने के लिए उपयोगी हो सकता है।

`proxy` पैरामीटर को स्टैंडर्ड कैपेबिलिटीज के माध्यम से निम्न तरीके से लागू किया जा सकता है:

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
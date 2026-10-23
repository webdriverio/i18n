---
id: proxy
title: प्रॉक्सी सेटअप
description: "अनुरोधों को प्रॉक्सी के माध्यम से रूट करें, चाहे वह आपके टेस्ट और ड्राइवर के बीच हो या ब्राउज़र और इंटरनेट के बीच।"
---

आप दो अलग-अलग प्रकार के अनुरोधों को प्रॉक्सी के माध्यम से टनल कर सकते हैं:

- आपकी टेस्ट स्क्रिप्ट और ब्राउज़र ड्राइवर (या WebDriver एंडपॉइंट) के बीच कनेक्शन
- ब्राउज़र और इंटरनेट के बीच कनेक्शन

## ड्राइवर और टेस्ट के बीच प्रॉक्सी

यदि आपकी कंपनी में सभी आउटगोइंग अनुरोधों के लिए एक कॉर्पोरेट प्रॉक्सी है (उदाहरण के लिए `http://my.corp.proxy.com:9090` पर), तो WebdriverIO को प्रॉक्सी का उपयोग करने के लिए कॉन्फ़िगर करने हेतु आपके पास दो विकल्प हैं:

### विकल्प 1: एनवायरनमेंट वेरिएबल्स का उपयोग करना (अनुशंसित)

WebdriverIO v9.12.0 से शुरू करके, आप बस मानक प्रॉक्सी एनवायरनमेंट वेरिएबल्स सेट कर सकते हैं:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# वैकल्पिक: कुछ होस्ट के लिए प्रॉक्सी को बायपास करें
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

फिर अपने टेस्ट सामान्य रूप से चलाएँ। WebdriverIO प्रॉक्सी कॉन्फ़िगरेशन के लिए इन एनवायरनमेंट वेरिएबल्स का स्वचालित रूप से उपयोग करेगा।

### विकल्प 2: undici के setGlobalDispatcher का उपयोग करना

अधिक उन्नत प्रॉक्सी कॉन्फ़िगरेशन के लिए या यदि आपको प्रोग्रामेटिक नियंत्रण की आवश्यकता है, तो आप undici की `setGlobalDispatcher` मेथड का उपयोग कर सकते हैं:

#### undici इंस्टॉल करें

```bash npm2yarn
npm install undici --save-dev
```

#### अपनी कॉन्फ़िग फ़ाइल में undici setGlobalDispatcher जोड़ें

अपनी कॉन्फ़िग फ़ाइल के शीर्ष पर निम्नलिखित require स्टेटमेंट जोड़ें।

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

प्रॉक्सी को कॉन्फ़िगर करने के बारे में अतिरिक्त जानकारी [यहाँ](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) पाई जा सकती है।

### मुझे कौन सी विधि का उपयोग करना चाहिए?

- **एनवायरनमेंट वेरिएबल्स का उपयोग करें** यदि आप एक सरल, मानक तरीका चाहते हैं जो विभिन्न टूल्स में काम करता है और जिसमें कोड परिवर्तन की आवश्यकता नहीं होती।
- **setGlobalDispatcher का उपयोग करें** यदि आपको कस्टम ऑथेंटिकेशन, प्रति एनवायरनमेंट अलग-अलग प्रॉक्सी कॉन्फ़िगरेशन जैसी उन्नत प्रॉक्सी सुविधाओं की आवश्यकता है, या आप प्रॉक्सी व्यवहार को प्रोग्रामेटिक रूप से नियंत्रित करना चाहते हैं।

दोनों विधियाँ पूरी तरह से समर्थित हैं और WebdriverIO एनवायरनमेंट वेरिएबल्स पर वापस जाने से पहले पहले ग्लोबल डिस्पैचर की जाँच करेगा।

### Sauce Connect Proxy

यदि आप [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) का उपयोग करते हैं, तो इसे इस प्रकार शुरू करें:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## ब्राउज़र और ड्राइवर डाउनलोड के लिए प्रॉक्सी

जब ब्राउज़र और ड्राइवर अभी तक इंस्टॉल नहीं होते हैं, तो WebdriverIO उन्हें डाउनलोड करता है जिनकी उसे आवश्यकता होती है।

- **Geckodriver और Edgedriver** डाउनलोड `HTTPS_PROXY`, `HTTP_PROXY` और `NO_PROXY` का उपयोग करते हैं। `setGlobalDispatcher` के साथ सेट किया गया डिस्पैचर इन वेरिएबल्स पर प्राथमिकता लेता है।
- **Chrome, Chromium, Firefox और Chromedriver** डाउनलोड `HTTPS_PROXY`, `HTTP_PROXY` और `NO_PROXY` का उपयोग केवल तभी करते हैं जब इनमें से कोई एक बात सही हो:
  - आपके प्रोजेक्ट में `proxy-agent` पैकेज इंस्टॉल है:

    ```bash
    npm install --save-dev proxy-agent
    ```

  - Node.js अपने बिल्ट-इन प्रॉक्सी समर्थन के साथ चलता है (Node.js 22.21.0 / 24.5.0 या बाद का संस्करण):

    ```bash
    NODE_USE_ENV_PROXY=1 npx wdio run ./wdio.conf.ts
    ```

  WebdriverIO आपके लिए `proxy-agent` इंस्टॉल नहीं करता है, क्योंकि इसके डिपेंडेंसी ट्री में ऐसी सुरक्षा एडवाइज़री हैं जिनका कोई समाधान नहीं है। जब कोई प्रॉक्सी वेरिएबल सेट होता है और कोई भी विकल्प सक्रिय नहीं होता है, तो WebdriverIO पहले डाउनलोड से पहले एक चेतावनी लॉग करता है।

## ब्राउज़र और इंटरनेट के बीच प्रॉक्सी

ब्राउज़र और इंटरनेट के बीच कनेक्शन को टनल करने के लिए, आप एक प्रॉक्सी सेट अप कर सकते हैं जो (उदाहरण के लिए) [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) जैसे टूल्स के साथ नेटवर्क जानकारी और अन्य डेटा कैप्चर करने के लिए उपयोगी हो सकता है।

`proxy` पैरामीटर्स को मानक capabilities के माध्यम से निम्नलिखित तरीके से लागू किया जा सकता है:

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
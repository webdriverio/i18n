---
id: console-logs
title: कंसोल लॉग्स
---

टेस्ट एक्जीक्यूशन के दौरान सभी ब्राउज़र कंसोल आउटपुट को कैप्चर करें और इंस्पेक्ट करें। DevTools आपके एप्लिकेशन से कंसोल मैसेज (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) के साथ-साथ आपके `wdio.conf.ts` में कॉन्फ़िगर किए गए `logLevel` के आधार पर WebDriverIO फ्रेमवर्क लॉग्स को रिकॉर्ड करता है।

**फीचर्स:**
- टेस्ट एक्जीक्यूशन के दौरान रियल-टाइम कंसोल मैसेज कैप्चरिंग
- ब्राउज़र कंसोल लॉग्स (log, warn, error, info, debug)
- WebDriverIO फ्रेमवर्क लॉग्स कॉन्फ़िगर किए गए `logLevel` (trace, debug, info, warn, error, silent) द्वारा फ़िल्टर किए गए
- टाइमस्टैम्प्स जो दिखाते हैं कि प्रत्येक मैसेज कब लॉग किया गया था
- कंसोल लॉग्स टेस्ट स्टेप्स और ब्राउज़र स्क्रीनशॉट के साथ कॉन्टेक्स्ट के लिए प्रदर्शित किए जाते हैं

**कॉन्फ़िगरेशन:**
```js
// wdio.conf.ts
export const config = {
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controls which framework logs are captured
    // ...
};
```

इससे JavaScript एरर्स को डीबग करना, एप्लिकेशन व्यवहार को ट्रैक करना और टेस्ट एक्जीक्यूशन के दौरान WebDriverIO के आंतरिक ऑपरेशन्स को देखना आसान हो जाता है।

## डेमो

### >_ कंसोल लॉग्स
![Console Logs](./demo/console-logs.gif)
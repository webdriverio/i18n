---
id: ocr-get-text
title: ocrGetText
description: "OCR सेवा के ocrGetText के साथ स्क्रीन पर या किसी विशिष्ट क्षेत्र में दिखाया गया टेक्स्ट पढ़ें।"
---

किसी इमेज पर मौजूद टेक्स्ट प्राप्त करें।

### उपयोग

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## आउटपुट

### परिणाम

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### लॉग्स

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## विकल्प

### `contrast`

<Option type="number" default="0.25" required="no">

कंट्रास्ट जितना अधिक होगा, इमेज उतनी ही गहरी होगी और इसके विपरीत भी। यह इमेज में टेक्स्ट खोजने में मदद कर सकता है। यह `-1` और `1` के बीच के मान स्वीकार करता है।

</Option>
#### उदाहरण

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

यह स्क्रीन में वह खोज क्षेत्र है जहाँ OCR को टेक्स्ट खोजना होता है। यह एक एलिमेंट या `x`, `y`, `width` और `height` वाला एक आयत (rectangle) हो सकता है

</Option>
#### उदाहरण

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// या
await browser.ocrGetText({ haystack: await $("elementSelector") });

// या
await browser.ocrGetText({
    haystack: {
        x: 10,
        y: 50,
        width: 300,
        height: 75,
    },
});
```

### `language`

<Option type="string" default="eng" required="No">

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहाँ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएँ [यहाँ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) मिल सकती हैं।

</Option>
#### उदाहरण

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // भाषा के रूप में डच का उपयोग करें
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```
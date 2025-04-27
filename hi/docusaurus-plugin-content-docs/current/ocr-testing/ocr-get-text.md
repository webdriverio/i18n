---
id: ocr-get-text
title: ocrGetText
---

किसी छवि पर मौजूद टेक्स्ट प्राप्त करें।

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

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `0.25`

जितना अधिक कंट्रास्ट होगा, उतनी ही गहरी छवि होगी और इसके विपरीत। यह छवि में टेक्स्ट खोजने में मदद कर सकता है। यह `-1` और `1` के बीच मान स्वीकार करता है।

#### उदाहरण

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **प्रकार:** `number`
-   **अनिवार्य:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

यह स्क्रीन में खोज क्षेत्र है जहां OCR को टेक्स्ट के लिए देखने की आवश्यकता है। यह एक एलिमेंट या एक आयत हो सकता है जिसमें `x`, `y`, `width` और `height` शामिल हो।

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

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `eng`

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहां](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएं [यहां](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) मिल सकती हैं।

#### उदाहरण

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // डच को भाषा के रूप में उपयोग करें
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```
---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

स्क्रीन पर एक विशिष्ट टेक्स्ट के प्रदर्शित होने का इंतजार करें।

## उपयोग

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## आउटपुट

### लॉग्स

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## विकल्प

### `text`

-   **प्रकार:** `string`
-   **अनिवार्य:** हां

वह टेक्स्ट जिसे आप क्लिक करने के लिए खोजना चाहते हैं।

#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 18000 (18 सेकंड)

मिलीसेकंड में समय। ध्यान रखें कि OCR प्रक्रिया में कुछ समय लग सकता है, इसलिए इसे बहुत कम न सेट करें।

#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25 सेकंड तक इंतजार करें
});
```

### `timeoutMsg`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `Could not find the text "{selector}" within the requested time.`

यह डिफ़ॉल्ट त्रुटि संदेश को ओवरराइड करता है।

#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `0.25`

जितना अधिक कंट्रास्ट, उतनी ही गहरी छवि और इसके विपरीत। यह छवि में टेक्स्ट खोजने में मदद कर सकता है। यह `-1` और `1` के बीच मान स्वीकार करता है।

#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **प्रकार:** `number`
-   **अनिवार्य:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

यह स्क्रीन का वह खोज क्षेत्र है जहां OCR को टेक्स्ट की तलाश करनी होती है। यह एक एलिमेंट या एक आयत हो सकता है जिसमें `x`, `y`, `width` और `height` शामिल हैं।

#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// या
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// या
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहां](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएँ [यहां](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) मिल सकती हैं।

#### उदाहरण

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // डच को भाषा के रूप में उपयोग करें
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

आप निम्नलिखित विकल्पों के साथ टेक्स्ट खोजने के लिए फज़ी लॉजिक को बदल सकते हैं। यह बेहतर मिलान खोजने में मदद कर सकता है।

#### `fuzzyFindOptions.distance`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 100

यह निर्धारित करता है कि मिलान को फज़ी स्थान (location द्वारा निर्दिष्ट) के कितना नज़दीक होना चाहिए। एक सटीक अक्षर मिलान जो फज़ी स्थान से distance अक्षर दूर है, पूरी तरह से बेमेल के रूप में स्कोर करेगा। 0 की दूरी के लिए मिलान को निर्दिष्ट सटीक स्थान पर होना आवश्यक है। 0.8 के थ्रेशहोल्ड का उपयोग करते हुए 1000 की दूरी के लिए एक परफेक्ट मिलान को स्थान से 800 अक्षरों के भीतर होना आवश्यक होगा।

##### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 0

यह लगभग निर्धारित करता है कि टेक्स्ट में कहां पैटर्न मिलने की उम्मीद है।

##### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 0.6

किस बिंदु पर मिलान एल्गोरिदम हार मान लेता है। 0 का थ्रेशहोल्ड एक परफेक्ट मिलान (अक्षरों और स्थान दोनों का) की आवश्यकता होती है, 1.0 का थ्रेशहोल्ड कुछ भी मिला देगा।

##### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** false

क्या खोज केस संवेदनशील होनी चाहिए।

##### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 2

केवल वे मिलान जिनकी लंबाई इस मान से अधिक है, वापस किए जाएंगे। (उदाहरण के लिए, यदि आप परिणाम में एकल अक्षर मिलान को अनदेखा करना चाहते हैं, तो इसे 2 पर सेट करें)

##### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** false

जब `true` होता है, तो मिलान फ़ंक्शन खोज पैटर्न के अंत तक जारी रहेगा, भले ही स्ट्रिंग में परफेक्ट मिलान पहले से ही पता चल गया हो।

##### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
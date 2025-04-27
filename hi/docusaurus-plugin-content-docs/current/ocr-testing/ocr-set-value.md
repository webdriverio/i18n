---
id: ocr-set-value
title: ocrSetValue
---

किसी तत्व पर कीस्ट्रोक्स की एक श्रृंखला भेजें। यह:

-   स्वचालित रूप से तत्व का पता लगाएगा
-   उस पर क्लिक करके फील्ड पर फोकस लगाएगा
-   फील्ड में मान सेट करेगा

यह कमांड प्रदान किए गए टेक्स्ट को खोजेगा और [Fuse.js](https://fusejs.io/) से फजी लॉजिक के आधार पर मिलान की कोशिश करेगा। इसका मतलब है कि अगर आप किसी टाइपो के साथ सेलेक्टर प्रदान करते हैं, या पाया गया टेक्स्ट 100% मिलान नहीं है, तो भी यह आपको एक तत्व वापस देने की कोशिश करेगा। नीचे [लॉग्स](#logs) देखें।

## उपयोग

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## आउटपुट

### लॉग्स

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## विकल्प

### `text`

-   **प्रकार:** `string`
-   **अनिवार्य:** हां

वह टेक्स्ट जिसे आप क्लिक करने के लिए खोजना चाहते हैं।

#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **प्रकार:** `string`
-   **अनिवार्य:** हां

जोड़ा जाने वाला मान।

#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `false`

यदि मान को इनपुट फ़ील्ड में भी सबमिट करने की आवश्यकता है। इसका मतलब है कि स्ट्रिंग के अंत में "ENTER" भेजा जाएगा।

#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `500` मिलीसेकंड

यह क्लिक की अवधि है। यदि आप चाहें तो समय बढ़ाकर "लॉन्ग क्लिक" भी बना सकते हैं।

#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `0.25`

कंट्रास्ट जितना अधिक होगा, छवि उतनी ही अधिक गहरी होगी और इसके विपरीत। यह छवि में टेक्स्ट खोजने में मदद कर सकता है। यह `-1` और `1` के बीच के मान स्वीकार करता है।

#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **प्रकार:** `number`
-   **अनिवार्य:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

यह स्क्रीन में खोज क्षेत्र है जहां OCR को टेक्स्ट की तलाश करने की आवश्यकता है। यह एक तत्व या एक आयत हो सकता है जिसमें `x`, `y`, `width` और `height` शामिल हैं।

#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// OR
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहां](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) पाई जा सकती है और समर्थित भाषाएं [यहां](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) पाई जा सकती हैं।

#### उदाहरण

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं

आप मिलान करने वाले तत्व के सापेक्ष स्क्रीन पर क्लिक कर सकते हैं। यह सापेक्ष पिक्सेल `above`, `right`, `below` या `left` के आधार पर मिलान तत्व से किया जा सकता है।

:::note

निम्नलिखित संयोजन अनुमत हैं

-   एकल गुण
-   `above` + `left` या `above` + `right`
-   `below` + `left` या `below` + `right`

निम्नलिखित संयोजन **अनुमत नहीं** हैं

-   `above` प्लस `below`
-   `left` प्लस `right`

:::

#### `relativePosition.above`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं

मिलान तत्व से x पिक्सेल `above` क्लिक करें।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं

मिलान तत्व से x पिक्सेल `right` क्लिक करें।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं

मिलान तत्व से x पिक्सेल `below` क्लिक करें।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं

मिलान तत्व से x पिक्सेल `left` क्लिक करें।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

आप निम्नलिखित विकल्पों के साथ टेक्स्ट खोजने के लिए फजी लॉजिक को बदल सकते हैं। यह बेहतर मिलान खोजने में मदद कर सकता है।

#### `fuzzyFindOptions.distance`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 100

यह निर्धारित करता है कि मिलान को फजी स्थान (location द्वारा निर्दिष्ट) के कितना करीब होना चाहिए। एक सटीक अक्षर मिलान जो फजी स्थान से distance वर्णों दूर है, वह पूरी तरह से बेमेल के रूप में स्कोर करेगा। 0 की दूरी के लिए मिलान को निर्दिष्ट सटीक स्थान पर होने की आवश्यकता होती है। 1000 की दूरी के लिए 0.8 की थ्रेशोल्ड का उपयोग करते हुए स्थान से 800 वर्णों के भीतर पूर्ण मिलान की आवश्यकता होगी।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 0

यह निर्धारित करता है कि टेक्स्ट में लगभग कहां पैटर्न मिलने की उम्मीद है।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 0.6

किस बिंदु पर मिलान एल्गोरिथ्म हार मान लेता है। 0 की थ्रेशोल्ड के लिए पूर्ण मिलान (अक्षरों और स्थान दोनों का) की आवश्यकता होती है, 1.0 की थ्रेशोल्ड पर कुछ भी मिल जाएगा।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** false

क्या खोज केस संवेदी होनी चाहिए।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** false

जब `true` होता है, तो मिलान फ़ंक्शन खोज पैटर्न के अंत तक जारी रहेगा, भले ही स्ट्रिंग में पहले से ही एक पूर्ण मिलान मिल गया हो।

##### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
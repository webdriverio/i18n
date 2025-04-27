---
id: ocr-click-on-text
title: ocrClickOnText
---

दिए गए पाठ के आधार पर एक तत्व पर क्लिक करें। यह कमांड प्रदान किए गए पाठ को खोजेगा और [Fuse.js](https://fusejs.io/) से फजी लॉजिक के आधार पर एक मिलान खोजने का प्रयास करेगा। इसका मतलब है कि अगर आप टाइपो के साथ एक सेलेक्टर प्रदान करते हैं, या मिला हुआ पाठ 100% मिलान नहीं हो सकता है, तो भी यह आपको एक तत्व वापस देने का प्रयास करेगा। नीचे [लॉग्स](#logs) देखें।

## उपयोग

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## आउटपुट

### लॉग्स

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### छवि

आपको अपने (डिफ़ॉल्ट)[`imagesFolder`](./getting-started#imagesfolder) में एक छवि मिलेगी, जिसमें एक लक्ष्य दिखाया गया है कि मॉड्यूल ने कहां क्लिक किया है।

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## विकल्प

### `text`

-   **प्रकार:** `string`
-   **अनिवार्य:** हां

वह पाठ जिसे आप क्लिक करने के लिए खोजना चाहते हैं।

#### उदाहरण

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `500` मिलीसेकंड

यह क्लिक की अवधि है। यदि आप चाहें तो समय बढ़ाकर "लंबा क्लिक" भी बना सकते हैं।

#### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // यह 3 सेकंड है
});
```

### `contrast`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `0.25`

कंट्रास्ट जितना अधिक होगा, छवि उतनी ही गहरी होगी और इसके विपरीत। यह एक छवि में पाठ खोजने में मदद कर सकता है। यह `-1` और `1` के बीच मान स्वीकार करता है।

#### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **प्रकार:** `number`
-   **अनिवार्य:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

यह स्क्रीन में खोज क्षेत्र है जहां OCR को पाठ खोजने की आवश्यकता है। यह एक तत्व या एक आयत हो सकता है जिसमें `x`, `y`, `width` और `height` शामिल है।

#### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// या
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// या
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // डच को भाषा के रूप में उपयोग करें
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं

आप मिलान वाले तत्व के सापेक्ष स्क्रीन पर क्लिक कर सकते हैं। यह मिलान वाले तत्व से सापेक्ष पिक्सेल `above`, `right`, `below` या `left` के आधार पर किया जा सकता है।

:::note

निम्न संयोजन अनुमति प्राप्त हैं

-   एकल गुण
-   `above` + `left` या `above` + `right`
-   `below` + `left` या `below` + `right`

निम्न संयोजन **अनुमति प्राप्त नहीं** हैं

-   `above` प्लस `below`
-   `left` प्लस `right`

:::

#### `relativePosition.above`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं

मिलान वाले तत्व से x पिक्सेल `above` क्लिक करें।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं

मिलान वाले तत्व से x पिक्सेल `right` क्लिक करें।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं

मिलान वाले तत्व से x पिक्सेल `below` क्लिक करें।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं

मिलान वाले तत्व से x पिक्सेल `left` क्लिक करें।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

आप निम्न विकल्पों के साथ पाठ खोजने के लिए फज़ी लॉजिक को बदल सकते हैं। यह बेहतर मिलान खोजने में मदद कर सकता है

#### `fuzzyFindOptions.distance`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 100

यह निर्धारित करता है कि मिलान को फजी स्थान (location द्वारा निर्दिष्ट) के कितना निकट होना चाहिए। एक सटीक अक्षर मिलान जो फजी स्थान से distance वर्ण दूर है, वह पूरी तरह से बेमेल के रूप में स्कोर करेगा। 0 की दूरी के लिए निर्दिष्ट सटीक स्थान पर मिलान की आवश्यकता होती है। 1000 की दूरी के लिए 0.8 की थ्रेशोल्ड का उपयोग करके पाए जाने के लिए स्थान से 800 वर्णों के भीतर एक पूर्ण मिलान की आवश्यकता होगी।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 0

यह निर्धारित करता है कि पाठ में लगभग कहां पैटर्न मिलने की उम्मीद है।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 0.6

किस बिंदु पर मिलान एल्गोरिथ्म हार मान लेता है। 0 की थ्रेशोल्ड के लिए एक पूर्ण मिलान (अक्षरों और स्थान दोनों का) की आवश्यकता होती है, 1.0 की थ्रेशोल्ड कुछ भी मिलाएगी।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** false

खोज केस संवेदनशील होनी चाहिए या नहीं।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 2

केवल वे मिलान जिनकी लंबाई इस मान से अधिक है, वे लौटाए जाएंगे। (उदाहरण के लिए, यदि आप परिणाम में एकल वर्ण मिलान को अनदेखा करना चाहते हैं, तो इसे 2 पर सेट करें)

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** false

जब `true` है, तो मिलान फ़ंक्शन एक खोज पैटर्न के अंत तक जारी रहेगा, भले ही स्ट्रिंग में पहले से ही एक पूर्ण मिलान मिल गया हो।

##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
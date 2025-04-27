---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

स्क्रीन पर टेक्स्ट की स्थिति प्राप्त करें। यह कमांड दिए गए टेक्स्ट को खोजेगी और [Fuse.js](https://fusejs.io/) से फज़ी लॉजिक के आधार पर मिलान करने की कोशिश करेगी। इसका मतलब है कि अगर आप एक सेलेक्टर में टाइपो के साथ प्रदान करते हैं, या मिला हुआ टेक्स्ट 100% मैच नहीं है, तो भी यह आपको एक एलिमेंट वापस देने की कोशिश करेगी। नीचे दिए गए [लॉग्स](#logs) देखें।

## उपयोग

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## आउटपुट

### रिजल्ट

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### लॉग्स

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## विकल्प

### `text`

-   **प्रकार:** `string`
-   **अनिवार्य:** हां

वह टेक्स्ट जिसे आप क्लिक करने के लिए खोजना चाहते हैं।

#### उदाहरण

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `0.25`

कॉन्ट्रास्ट जितना अधिक होगा, इमेज उतनी ही काली होगी और इसके विपरीत। यह इमेज में टेक्स्ट ढूंढने में मदद कर सकता है। यह `-1` और `1` के बीच मान स्वीकार करता है।

#### उदाहरण

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **प्रकार:** `number`
-   **अनिवार्य:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

यह स्क्रीन में खोज क्षेत्र है जहां OCR को टेक्स्ट देखना है। यह एक एलिमेंट या `x`, `y`, `width` और `height` वाला आयत हो सकता है।

#### उदाहरण

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// या
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// या
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // डच को भाषा के रूप में उपयोग करें
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

आप निम्नलिखित विकल्पों के साथ टेक्स्ट खोजने के लिए फज़ी लॉजिक को बदल सकते हैं। यह बेहतर मैच खोजने में मदद कर सकता है

#### `fuzzyFindOptions.distance`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** 100

निर्धारित करता है कि मैच फज़ी स्थान (स्थान द्वारा निर्दिष्ट) के कितना करीब होना चाहिए। एक सटीक अक्षर मैच जो फज़ी स्थान से दूरी वाले अक्षरों की दूरी पर है, पूरी तरह से बेमेल के रूप में स्कोर करेगा। 0 की दूरी के लिए मैच को निर्दिष्ट सटीक स्थान पर होने की आवश्यकता होती है। 1000 की दूरी के लिए 0.8 की थ्रेशहोल्ड का उपयोग करके स्थान के 800 अक्षरों के भीतर एक परफेक्ट मैच की आवश्यकता होगी।

##### उदाहरण

```js
await browser.ocrGetElementPositionByText({
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

यह निर्धारित करता है कि टेक्स्ट में लगभग कहां पैटर्न के मिलने की उम्मीद है।

##### उदाहरण

```js
await browser.ocrGetElementPositionByText({
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

किस बिंदु पर मैचिंग एल्गोरिदम हार मानता है। 0 की थ्रेशहोल्ड के लिए एक परफेक्ट मैच (अक्षरों और स्थान दोनों का) की आवश्यकता होती है, 1.0 की थ्रेशहोल्ड कुछ भी मैच करेगी।

##### उदाहरण

```js
await browser.ocrGetElementPositionByText({
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

क्या खोज केस-सेंसिटिव होनी चाहिए।

##### उदाहरण

```js
await browser.ocrGetElementPositionByText({
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

केवल वे मैच जिनकी लंबाई इस मान से अधिक है, वापस किए जाएंगे। (उदाहरण के लिए, यदि आप परिणाम में एकल अक्षर मैच को अनदेखा करना चाहते हैं, तो इसे 2 पर सेट करें)

##### उदाहरण

```js
await browser.ocrGetElementPositionByText({
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

जब `true` होता है, तो मैचिंग फ़ंक्शन सर्च पैटर्न के अंत तक जारी रहेगा, भले ही स्ट्रिंग में पहले से ही एक परफेक्ट मैच मिल गया हो।

##### उदाहरण

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
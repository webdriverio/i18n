---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "ocrGetElementPositionByText के साथ स्क्रीन पर किसी टेक्स्ट की स्थिति प्राप्त करें, जो उसे खोजने के लिए OCR और फ़ज़ी मैचिंग का उपयोग करता है।"
---

स्क्रीन पर किसी टेक्स्ट की स्थिति प्राप्त करें। यह कमांड दिए गए टेक्स्ट को खोजेगी और [Fuse.js](https://fusejs.io/) के Fuzzy Logic के आधार पर एक मैच खोजने का प्रयास करेगी। इसका मतलब है कि यदि आप टाइपो वाला सेलेक्टर प्रदान करते हैं, या मिला हुआ टेक्स्ट 100% मैच नहीं है, तब भी यह आपको एक एलिमेंट वापस देने का प्रयास करेगी। नीचे दिए गए [लॉग्स](#logs) देखें।

## उपयोग

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## आउटपुट

### परिणाम

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
# हमने "Start3d" खोजा था और मिला हुआ टेक्स्ट "Started" था, फिर भी मैच मिल रहा है
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## विकल्प

### `text`

<Option type="string" required="yes">

वह टेक्स्ट जिसे आप क्लिक करने के लिए खोजना चाहते हैं।

</Option>
#### उदाहरण

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

कंट्रास्ट जितना अधिक होगा, इमेज उतनी ही गहरी होगी और इसके विपरीत भी। यह इमेज में टेक्स्ट खोजने में मदद कर सकता है। यह `-1` और `1` के बीच के मान स्वीकार करता है।

</Option>
#### उदाहरण

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

यह स्क्रीन में वह खोज क्षेत्र है जहाँ OCR को टेक्स्ट खोजना होता है। यह एक एलिमेंट या `x`, `y`, `width` और `height` वाला एक आयत (rectangle) हो सकता है

</Option>
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

<Option type="string" default="eng" required="No">

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहाँ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएँ [यहाँ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) मिल सकती हैं।

</Option>
#### उदाहरण

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // भाषा के रूप में डच का उपयोग करें
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

आप निम्नलिखित विकल्पों के साथ टेक्स्ट खोजने के लिए फ़ज़ी लॉजिक को बदल सकते हैं। इससे बेहतर मैच खोजने में मदद मिल सकती है

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

यह निर्धारित करता है कि मैच फ़ज़ी लोकेशन (location द्वारा निर्दिष्ट) के कितना करीब होना चाहिए। एक सटीक अक्षर मैच जो फ़ज़ी लोकेशन से distance जितने कैरेक्टर दूर है, उसे पूरी तरह से बेमेल (mismatch) माना जाएगा। 0 का distance यह अपेक्षा करता है कि मैच ठीक निर्दिष्ट लोकेशन पर हो। 1000 का distance यह अपेक्षा करेगा कि 0.8 के threshold का उपयोग करके खोजे जाने के लिए एक परफेक्ट मैच लोकेशन के 800 कैरेक्टर के भीतर हो।

</Option>
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

<Option type="number" default="0" required="no">

यह निर्धारित करता है कि टेक्स्ट में लगभग कहाँ पैटर्न के मिलने की अपेक्षा है।

</Option>
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

<Option type="number" default="0.6" required="no">

मैचिंग एल्गोरिदम किस बिंदु पर हार मान लेता है। 0 का threshold एक परफेक्ट मैच (अक्षरों और लोकेशन दोनों का) की अपेक्षा करता है, 1.0 का threshold किसी भी चीज़ से मैच करेगा।

</Option>
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

<Option type="boolean" default="false" required="no">

क्या खोज केस सेंसिटिव होनी चाहिए।

</Option>
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

<Option type="number" default="2" required="no">

केवल वे मैच लौटाए जाएँगे जिनकी लंबाई इस मान से अधिक है। (उदाहरण के लिए, यदि आप परिणाम में एकल कैरेक्टर वाले मैच को अनदेखा करना चाहते हैं, तो इसे 2 पर सेट करें)

</Option>
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

<Option type="number" default="false" required="no">

जब `true` हो, तो मैचिंग फ़ंक्शन सर्च पैटर्न के अंत तक जारी रहेगा, भले ही स्ट्रिंग में पहले से ही एक परफेक्ट मैच मिल चुका हो।

</Option>
##### उदाहरण

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
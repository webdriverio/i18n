---
id: ocr-click-on-text
title: ocrClickOnText
description: "ocrClickOnText के साथ किसी एलिमेंट पर उसके दिखाई देने वाले टेक्स्ट के आधार पर क्लिक करें, जो OCR और फ़ज़ी मैचिंग से स्क्रीन पर टेक्स्ट ढूंढता है।"
---

दिए गए टेक्स्ट के आधार पर किसी एलिमेंट पर क्लिक करें। कमांड दिए गए टेक्स्ट को खोजेगी और [Fuse.js](https://fusejs.io/) के Fuzzy Logic के आधार पर मैच ढूंढने का प्रयास करेगी। इसका मतलब है कि अगर आप टाइपो वाला सेलेक्टर देते हैं, या मिला हुआ टेक्स्ट 100% मैच नहीं होता, तब भी यह आपको एक एलिमेंट लौटाने का प्रयास करेगी। नीचे दिए गए [लॉग्स](#logs) देखें।

## उपयोग

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## आउटपुट

### लॉग्स

```log
# "Start3d" खोजने के बावजूद और मिला हुआ टेक्स्ट "Started" होने के बावजूद भी मैच मिल रहा है
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### इमेज

आपको अपने (डिफ़ॉल्ट)[`imagesFolder`](./getting-started#imagesfolder) में एक इमेज मिलेगी, जिसमें एक टारगेट होगा जो दिखाएगा कि मॉड्यूल ने कहाँ क्लिक किया है।

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## विकल्प

### `text`

<Option type="string" required="yes">

वह टेक्स्ट जिसे आप क्लिक करने के लिए खोजना चाहते हैं।

</Option>
#### उदाहरण

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

यह क्लिक की अवधि है। अगर आप चाहें तो समय बढ़ाकर "लॉन्ग क्लिक" भी बना सकते हैं।

</Option>
#### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // यह 3 सेकंड है
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

कंट्रास्ट जितना अधिक होगा, इमेज उतनी ही गहरी होगी और इसके विपरीत भी। यह इमेज में टेक्स्ट ढूंढने में मदद कर सकता है। यह `-1` और `1` के बीच के मान स्वीकार करता है।

</Option>
#### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

यह स्क्रीन में वह खोज क्षेत्र है जहाँ OCR को टेक्स्ट खोजना होता है। यह एक एलिमेंट या `x`, `y`, `width` और `height` वाला एक रेक्टेंगल हो सकता है

</Option>
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

<Option type="string" default="eng" required="No">

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहाँ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएँ [यहाँ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) मिल सकती हैं।

</Option>
#### उदाहरण

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // भाषा के रूप में डच का उपयोग करें
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

आप मैच होने वाले एलिमेंट के सापेक्ष स्क्रीन पर क्लिक कर सकते हैं। यह मैच होने वाले एलिमेंट से `above`, `right`, `below` या `left` सापेक्ष पिक्सेल के आधार पर किया जा सकता है

:::note

निम्नलिखित संयोजनों की अनुमति है

-   एकल प्रॉपर्टीज़
-   `above` + `left` या `above` + `right`
-   `below` + `left` या `below` + `right`

निम्नलिखित संयोजनों की अनुमति **नहीं** है

-   `above` के साथ `below`
-   `left` के साथ `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

मैच होने वाले एलिमेंट से x पिक्सेल `above` (ऊपर) क्लिक करें।

</Option>
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

<Option type="number" required="no">

मैच होने वाले एलिमेंट से x पिक्सेल `right` (दाईं ओर) क्लिक करें।

</Option>
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

<Option type="number" required="no">

मैच होने वाले एलिमेंट से x पिक्सेल `below` (नीचे) क्लिक करें।

</Option>
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

<Option type="number" required="no">

मैच होने वाले एलिमेंट से x पिक्सेल `left` (बाईं ओर) क्लिक करें।

</Option>
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

आप निम्नलिखित विकल्पों के साथ टेक्स्ट ढूंढने के लिए फ़ज़ी लॉजिक को बदल सकते हैं। इससे बेहतर मैच ढूंढने में मदद मिल सकती है

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

यह निर्धारित करता है कि मैच फ़ज़ी लोकेशन (location द्वारा निर्दिष्ट) के कितना करीब होना चाहिए। एक सटीक अक्षर मैच जो फ़ज़ी लोकेशन से distance अक्षर दूर है, उसे पूरी तरह से बेमेल माना जाएगा। 0 की distance के लिए मैच का ठीक निर्दिष्ट लोकेशन पर होना आवश्यक है। 1000 की distance के लिए, 0.8 के threshold का उपयोग करते हुए, एक परफेक्ट मैच का लोकेशन से 800 अक्षरों के भीतर होना आवश्यक होगा।

</Option>
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

<Option type="number" default="0" required="no">

यह निर्धारित करता है कि टेक्स्ट में लगभग कहाँ पैटर्न मिलने की उम्मीद है।

</Option>
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

<Option type="number" default="0.6" required="no">

मैचिंग एल्गोरिदम किस बिंदु पर हार मान लेता है। 0 के threshold के लिए परफेक्ट मैच (अक्षरों और लोकेशन दोनों का) आवश्यक है, 1.0 का threshold किसी भी चीज़ से मैच कर जाएगा।

</Option>
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

<Option type="boolean" default="false" required="no">

क्या खोज केस सेंसिटिव होनी चाहिए।

</Option>
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

<Option type="number" default="2" required="no">

केवल वे मैच लौटाए जाएँगे जिनकी लंबाई इस मान से अधिक है। (उदाहरण के लिए, यदि आप परिणाम में एकल अक्षर वाले मैच को अनदेखा करना चाहते हैं, तो इसे 2 पर सेट करें)

</Option>
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

<Option type="number" default="false" required="no">

जब `true` हो, तो मैचिंग फ़ंक्शन सर्च पैटर्न के अंत तक जारी रहेगा, भले ही स्ट्रिंग में पहले ही एक परफेक्ट मैच मिल चुका हो।

</Option>
##### उदाहरण

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
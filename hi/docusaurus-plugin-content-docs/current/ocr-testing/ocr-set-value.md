---
id: ocr-set-value
title: ocrSetValue
description: "ocrSetValue के साथ किसी इनपुट फ़ील्ड में उसके दिखाई देने वाले टेक्स्ट के आधार पर टाइप करें, जो OCR और फ़ज़ी मैचिंग से फ़ील्ड ढूँढता है।"
---

किसी एलिमेंट को की-स्ट्रोक्स का एक क्रम भेजें। यह:

-   एलिमेंट का स्वचालित रूप से पता लगाएगा
-   फ़ील्ड पर क्लिक करके उस पर फ़ोकस करेगा
-   फ़ील्ड में वैल्यू सेट करेगा

यह कमांड दिए गए टेक्स्ट को खोजेगी और [Fuse.js](https://fusejs.io/) के फ़ज़ी लॉजिक के आधार पर मैच ढूँढने का प्रयास करेगी। इसका मतलब है कि यदि आप टाइपो वाला सेलेक्टर देते हैं, या मिला हुआ टेक्स्ट 100% मैच नहीं है, तब भी यह आपको एक एलिमेंट वापस देने का प्रयास करेगी। नीचे [लॉग्स](#logs) देखें।

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

<Option type="string" required="yes">

वह टेक्स्ट जिसे आप क्लिक करने के लिए खोजना चाहते हैं।

</Option>
#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

जोड़ी जाने वाली वैल्यू।

</Option>
#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

यदि वैल्यू को इनपुट फ़ील्ड में सबमिट भी करना है। इसका मतलब है कि स्ट्रिंग के अंत में एक "ENTER" भेजा जाएगा।

</Option>
#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

यह क्लिक की अवधि है। यदि आप चाहें तो समय बढ़ाकर "लॉन्ग क्लिक" भी बना सकते हैं।

</Option>
#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // यह 3 सेकंड है
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

कंट्रास्ट जितना अधिक होगा, इमेज उतनी ही गहरी होगी और इसके विपरीत भी। यह इमेज में टेक्स्ट ढूँढने में मदद कर सकता है। यह `-1` और `1` के बीच की वैल्यू स्वीकार करता है।

</Option>
#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

यह स्क्रीन का वह खोज क्षेत्र है जहाँ OCR को टेक्स्ट खोजना है। यह एक एलिमेंट या `x`, `y`, `width` और `height` वाला एक आयत (rectangle) हो सकता है

</Option>
#### उदाहरण

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// या
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// या
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

<Option type="string" default="eng" required="No">

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहाँ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएँ [यहाँ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) देखी जा सकती हैं।

</Option>
#### उदाहरण

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

आप निम्नलिखित विकल्पों के साथ टेक्स्ट खोजने के फ़ज़ी लॉजिक को बदल सकते हैं। इससे बेहतर मैच ढूँढने में मदद मिल सकती है

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

यह निर्धारित करता है कि मैच फ़ज़ी लोकेशन (location द्वारा निर्दिष्ट) के कितना करीब होना चाहिए। एक सटीक अक्षर मैच जो फ़ज़ी लोकेशन से distance अक्षर दूर है, उसे पूर्ण बेमेल (complete mismatch) के रूप में स्कोर किया जाएगा। 0 की distance के लिए आवश्यक है कि मैच ठीक निर्दिष्ट लोकेशन पर हो। 1000 की distance के लिए आवश्यक होगा कि 0.8 के threshold का उपयोग करके पाए जाने के लिए एक पूर्ण मैच लोकेशन के 800 अक्षरों के भीतर हो।

</Option>
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

<Option type="number" default="0" required="no">

यह निर्धारित करता है कि टेक्स्ट में लगभग कहाँ पैटर्न मिलने की उम्मीद है।

</Option>
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

<Option type="number" default="0.6" required="no">

मैचिंग एल्गोरिदम किस बिंदु पर हार मान लेता है। 0 के threshold के लिए पूर्ण मैच (अक्षरों और लोकेशन दोनों का) आवश्यक है, 1.0 का threshold किसी भी चीज़ से मैच करेगा।

</Option>
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

<Option type="boolean" default="false" required="no">

क्या खोज केस सेंसिटिव होनी चाहिए।

</Option>
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

<Option type="number" default="2" required="no">

केवल वही मैच लौटाए जाएँगे जिनकी लंबाई इस वैल्यू से अधिक है। (उदाहरण के लिए, यदि आप परिणाम में एकल अक्षर वाले मैचों को अनदेखा करना चाहते हैं, तो इसे 2 पर सेट करें)

</Option>
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

<Option type="number" default="false" required="no">

जब `true` हो, तो मैचिंग फ़ंक्शन सर्च पैटर्न के अंत तक जारी रहेगा, भले ही स्ट्रिंग में पहले ही एक पूर्ण मैच मिल चुका हो।

</Option>
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
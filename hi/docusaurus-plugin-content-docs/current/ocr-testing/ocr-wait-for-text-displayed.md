---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "OCR सर्विस के ocrWaitForTextDisplayed के साथ तब तक प्रतीक्षा करें जब तक स्क्रीन पर कोई विशिष्ट टेक्स्ट प्रदर्शित न हो जाए।"
---

स्क्रीन पर किसी विशिष्ट टेक्स्ट के प्रदर्शित होने की प्रतीक्षा करें।

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
# ocrWaitForTextDisplayed आंतरिक रूप से ocrGetElementPositionByText का उपयोग करता है, इसीलिए आपको लॉग्स में ocrGetElementPositionByText कमांड दिखाई देती है
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## विकल्प

### `text`

<Option type="string" required="yes">

वह टेक्स्ट जिसे आप क्लिक करने के लिए खोजना चाहते हैं।

</Option>
#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

मिलीसेकंड में समय। ध्यान रखें कि OCR प्रक्रिया में कुछ समय लग सकता है, इसलिए इसे बहुत कम सेट न करें।

</Option>
#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25 सेकंड तक प्रतीक्षा करें
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

यह डिफ़ॉल्ट त्रुटि संदेश को ओवरराइड करता है।

</Option>
#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

कंट्रास्ट जितना अधिक होगा, इमेज उतनी ही गहरी होगी और इसके विपरीत भी। यह इमेज में टेक्स्ट खोजने में मदद कर सकता है। यह `-1` और `1` के बीच के मान स्वीकार करता है।

</Option>
#### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

यह स्क्रीन का वह खोज क्षेत्र है जहाँ OCR को टेक्स्ट खोजना होता है। यह एक एलिमेंट हो सकता है या `x`, `y`, `width` और `height` वाला एक आयत (rectangle) हो सकता है

</Option>
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

<Option type="string" default="eng" required="No">

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहाँ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएँ [यहाँ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) देखी जा सकती हैं।

</Option>
#### उदाहरण

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // भाषा के रूप में डच का उपयोग करें
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

आप निम्नलिखित विकल्पों के साथ टेक्स्ट खोजने के लिए फ़ज़ी लॉजिक को बदल सकते हैं। इससे बेहतर मैच खोजने में मदद मिल सकती है

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

यह निर्धारित करता है कि मैच फ़ज़ी लोकेशन (location द्वारा निर्दिष्ट) के कितना करीब होना चाहिए। फ़ज़ी लोकेशन से distance अक्षर दूर स्थित एक सटीक अक्षर मैच को पूर्ण बेमेल (mismatch) माना जाएगा। 0 की distance के लिए आवश्यक है कि मैच ठीक निर्दिष्ट लोकेशन पर हो। 1000 की distance के लिए आवश्यक होगा कि 0.8 के threshold का उपयोग करके पाए जाने के लिए एक पूर्ण मैच लोकेशन के 800 अक्षरों के भीतर हो।

</Option>
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

<Option type="number" default="0" required="no">

यह मोटे तौर पर निर्धारित करता है कि टेक्स्ट में पैटर्न कहाँ मिलने की उम्मीद है।

</Option>
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

<Option type="number" default="0.6" required="no">

किस बिंदु पर मैचिंग एल्गोरिदम हार मान लेता है। 0 के threshold के लिए पूर्ण मैच (अक्षरों और लोकेशन दोनों का) आवश्यक है, 1.0 का threshold किसी भी चीज़ से मैच करेगा।

</Option>
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

<Option type="boolean" default="false" required="no">

क्या खोज केस सेंसिटिव होनी चाहिए।

</Option>
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

<Option type="number" default="2" required="no">

केवल वे मैच लौटाए जाएँगे जिनकी लंबाई इस मान से अधिक है। (उदाहरण के लिए, यदि आप परिणाम में एकल अक्षर वाले मैचों को अनदेखा करना चाहते हैं, तो इसे 2 पर सेट करें)

</Option>
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

<Option type="number" default="false" required="no">

जब `true` हो, तो मैचिंग फ़ंक्शन खोज पैटर्न के अंत तक जारी रहेगा, भले ही स्ट्रिंग में पहले से ही एक पूर्ण मैच मिल चुका हो।

</Option>
##### उदाहरण

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
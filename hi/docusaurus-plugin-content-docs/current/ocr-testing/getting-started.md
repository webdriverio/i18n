---
id: getting-started
title: शुरुआत करें
description: "@wdio/ocr-service को इंस्टॉल और कॉन्फ़िगर करें, TypeScript सपोर्ट सेट अप करें और contrast, image folder तथा language विकल्पों को समायोजित करें।"
---

## इंस्टॉलेशन

सबसे आसान तरीका यह है कि `@wdio/ocr-service` को अपनी `package.json` में dependency के रूप में रखें।

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

`WebdriverIO` को इंस्टॉल करने के निर्देश [यहाँ](../gettingstarted) मिल सकते हैं।

:::note
यह मॉड्यूल OCR इंजन के रूप में Tesseract का उपयोग करता है। डिफ़ॉल्ट रूप से, यह जाँचेगा कि क्या आपके सिस्टम पर Tesseract का लोकल इंस्टॉलेशन मौजूद है, यदि हाँ, तो यह उसी का उपयोग करेगा। यदि नहीं, तो यह [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) मॉड्यूल का उपयोग करेगा जो आपके लिए स्वचालित रूप से इंस्टॉल हो जाता है।

यदि आप इमेज प्रोसेसिंग को तेज़ करना चाहते हैं, तो सलाह यह है कि Tesseract के लोकल रूप से इंस्टॉल किए गए वर्शन का उपयोग करें। [टेस्ट एक्ज़ीक्यूशन समय](./more-test-optimization#using-a-local-installation-of-tesseract) भी देखें।
:::

अपने लोकल सिस्टम पर Tesseract को सिस्टम dependency के रूप में इंस्टॉल करने के निर्देश [यहाँ](https://tesseract-ocr.github.io/tessdoc/Installation.html) मिल सकते हैं।

:::caution
Tesseract से संबंधित इंस्टॉलेशन प्रश्नों/त्रुटियों के लिए कृपया
[Tesseract](https://github.com/tesseract-ocr/tesseract) प्रोजेक्ट देखें।
:::

## Typescript सपोर्ट

सुनिश्चित करें कि आप `@wdio/ocr-service` को अपनी `tsconfig.json` कॉन्फ़िगरेशन फ़ाइल में जोड़ें।

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## कॉन्फ़िगरेशन

सर्विस का उपयोग करने के लिए आपको `wdio.conf.ts` में अपने services array में `ocr` जोड़ना होगा

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // आपकी अन्य सर्विसेज़
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### कॉन्फ़िगरेशन विकल्प

#### `contrast`

<Option type="number" default="0.25" required="No">

contrast जितना अधिक होगा, इमेज उतनी ही गहरी होगी और इसके विपरीत भी। यह इमेज में टेक्स्ट खोजने में मदद कर सकता है। यह `-1` और `1` के बीच के मान स्वीकार करता है।

</Option>
#### `imagesFolder`

<Option type="string" default={`{project-root}/.tmp/ocr`} required="No">

वह फ़ोल्डर जहाँ OCR परिणाम संग्रहीत किए जाते हैं।

:::note
यदि आप एक कस्टम `imagesFolder` प्रदान करते हैं, तो सर्विस स्वचालित रूप से उसमें सबफ़ोल्डर `ocr` जोड़ देगी।
:::

</Option>
#### `language`

<Option type="string" default="eng" required="No">

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहाँ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएँ [यहाँ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) देखी जा सकती हैं।

</Option>
## लॉग्स

यह मॉड्यूल स्वचालित रूप से WebdriverIO लॉग्स में अतिरिक्त लॉग्स जोड़ देगा। यह `@wdio/ocr-service` नाम के साथ `INFO` और `WARN` लॉग्स में लिखता है।
उदाहरण नीचे दिए गए हैं।

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```
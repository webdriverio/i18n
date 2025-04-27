---
id: getting-started
title: आरंभ करना
---

## स्थापना

सबसे आसान तरीका यह है कि `@wdio/ocr-service` को अपने `package.json` में एक निर्भरता के रूप में रखें।

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

`WebdriverIO` को स्थापित करने के निर्देश [यहां](../gettingstarted) मिल सकते हैं।

:::note
यह मॉड्यूल OCR इंजन के रूप में Tesseract का उपयोग करता है। डिफ़ॉल्ट रूप से, यह सत्यापित करेगा कि क्या आपके सिस्टम पर Tesseract की स्थानीय इंस्टॉलेशन है, यदि है, तो यह उसका उपयोग करेगा। यदि नहीं, तो यह [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) मॉड्यूल का उपयोग करेगा जो आपके लिए स्वचालित रूप से इंस्टॉल किया जाता है।

यदि आप छवि प्रसंस्करण को तेज करना चाहते हैं तो सलाह है कि Tesseract के स्थानीय रूप से इंस्टॉल किए गए संस्करण का उपयोग करें। [टेस्ट निष्पादन समय](./more-test-optimization#using-a-local-installation-of-tesseract) भी देखें।
:::

अपने स्थानीय सिस्टम पर सिस्टम निर्भरता के रूप में Tesseract को स्थापित करने के निर्देश [यहां](https://tesseract-ocr.github.io/tessdoc/Installation.html) मिल सकते हैं।

:::caution
Tesseract के स्थापना प्रश्नों/त्रुटियों के लिए कृपया
[Tesseract](https://github.com/tesseract-ocr/tesseract) प्रोजेक्ट देखें।
:::

## टाइपस्क्रिप्ट समर्थन

सुनिश्चित करें कि आप अपनी `tsconfig.json` कॉन्फ़िगरेशन फ़ाइल में `@wdio/ocr-service` जोड़ते हैं।

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## कॉन्फ़िगरेशन

सेवा का उपयोग करने के लिए आपको `wdio.conf.ts` में अपनी सेवाओं की सरणी में `ocr` जोड़ने की आवश्यकता है

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // your other services
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

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `0.25`

जितना अधिक कंट्रास्ट, उतनी ही गहरी छवि और इसके विपरीत। यह छवि में टेक्स्ट खोजने में मदद कर सकता है। यह `-1` और `1` के बीच मान स्वीकार करता है।

#### `imagesFolder`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `{project-root}/.tmp/ocr`

वह फ़ोल्डर जहां OCR परिणाम संग्रहीत किए जाते हैं।

:::note
यदि आप एक कस्टम `imagesFolder` प्रदान करते हैं, तो सेवा स्वचालित रूप से उसमें सबफ़ोल्डर `ocr` जोड़ देगी।
:::

#### `language`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `eng`

वह भाषा जिसे Tesseract पहचानेगा। अधिक जानकारी [यहां](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) मिल सकती है और समर्थित भाषाएँ [यहां](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) मिल सकती हैं।

## लॉग्स

यह मॉड्यूल स्वचालित रूप से WebdriverIO लॉग्स में अतिरिक्त लॉग जोड़ देगा। यह `INFO` और `WARN` लॉग्स में `@wdio/ocr-service` नाम से लिखता है।
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
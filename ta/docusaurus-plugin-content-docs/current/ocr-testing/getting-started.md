---
id: getting-started
title: தொடங்குதல்
---

## நிறுவல்

எளிதான வழி `@wdio/ocr-service` ஐ உங்கள் `package.json` இல் ஒரு சார்புடையதாக வைத்திருப்பது.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

`WebdriverIO`வை எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகள் [இங்கே](../gettingstarted) காணலாம்.

:::note
இந்த மாடியூல் OCR இயந்திரமாக Tesseract ஐப் பயன்படுத்துகிறது. இயல்பாக, இது உங்கள் கணினியில் Tesseract இன் உள்ளூர் நிறுவல் உள்ளதா என்பதை சரிபார்க்கும், அவ்வாறு இருந்தால், அதைப் பயன்படுத்தும். இல்லையெனில், உங்களுக்காக தானாகவே நிறுவப்படும் [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) மாடியூலைப் பயன்படுத்தும்.

படத்தை செயலாக்குவதை வேகப்படுத்த விரும்பினால், உள்ளூரில் நிறுவப்பட்ட Tesseract பதிப்பைப் பயன்படுத்துவதே ஆலோசனை. [சோதனை செயல்படுத்தும் நேரம்](./more-test-optimization#using-a-local-installation-of-tesseract) ஐயும் பார்க்கவும்.
:::

உங்கள் உள்ளூர் கணினியில் Tesseract ஐ கணினி சார்புடையதாக எவ்வாறு நிறுவுவது என்பதற்கான அறிவுறுத்தல்கள் [இங்கே](https://tesseract-ocr.github.io/tessdoc/Installation.html) காணலாம்.

:::caution
Tesseract உடன் நிறுவல் கேள்விகள்/பிழைகளுக்கு
[Tesseract](https://github.com/tesseract-ocr/tesseract) திட்டத்தைப் பார்க்கவும்.
:::

## டைப்ஸ்கிரிப்ட் ஆதரவு

`@wdio/ocr-service` ஐ உங்கள் `tsconfig.json` உள்ளமைவு கோப்பில் சேர்த்துள்ளதை உறுதிப்படுத்தவும்.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## கட்டமைப்பு

சேவையைப் பயன்படுத்த, `wdio.conf.ts` இல் உங்கள் சேவைகள் வரிசையில் `ocr` ஐச் சேர்க்க வேண்டும்

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

### கட்டமைப்பு விருப்பங்கள்

#### `contrast`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `0.25`

கான்ட்ராஸ்ட் எவ்வளவு அதிகமாக இருக்கிறதோ, அந்த அளவுக்கு இருண்ட படம் மற்றும் அதற்கு நேர்மாறாகவும். இது படத்தில் உரையைக் கண்டறிய உதவும். இது `-1` மற்றும் `1` இடையே உள்ள மதிப்புகளை ஏற்றுக்கொள்கிறது.

#### `imagesFolder`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `{project-root}/.tmp/ocr`

OCR முடிவுகள் சேமிக்கப்படும் கோப்புறை.

:::note
நீங்கள் ஒரு தனிப்பயன் `imagesFolder` ஐ வழங்கினால், சேவை தானாகவே `ocr` துணைக்கோப்புறையை அதற்குச் சேர்க்கும்.
:::

#### `language`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `eng`

Tesseract அங்கீகரிக்கும் மொழி. மேலும் தகவல்கள் [இங்கே](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) காணலாம் மற்றும் ஆதரிக்கப்படும் மொழிகள் [இங்கே](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) காணலாம்.

## பதிவுகள்

இந்த மாடியூல் தானாகவே WebdriverIO பதிவுகளுக்கு கூடுதல் பதிவுகளைச் சேர்க்கும். இது `INFO` மற்றும் `WARN` பதிவுகளை `@wdio/ocr-service` பெயருடன் எழுதுகிறது.
எடுத்துக்காட்டுகள் கீழே காணப்படுகின்றன.

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
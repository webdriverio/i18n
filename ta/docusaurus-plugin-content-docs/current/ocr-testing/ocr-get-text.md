---
id: ocr-get-text
title: ocrGetText உரையைப் பெறுதல்
---

ஒரு படத்தில் உள்ள உரையைப் பெறுதல்.

### பயன்பாடு

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## வெளியீடு

### முடிவு

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### பதிவுகள்

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## விருப்பங்கள்

### `contrast`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `0.25`

கான்ட்ராஸ்ட் அதிகமானால், படம் இருண்டு தோன்றும், அதற்கு நேர்மாறாகவும். இது ஒரு படத்தில் உரையைக் கண்டுபிடிக்க உதவும். இது `-1` மற்றும் `1` இடையே மதிப்புகளை ஏற்றுக்கொள்கிறது.

#### எடுத்துக்காட்டு

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **வகை:** `number`
-   **கட்டாயம்:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

இது திரையில் OCR உரையைத் தேட வேண்டிய தேடல் பகுதியாகும். இது ஒரு எலெமென்ட் அல்லது `x`, `y`, `width` மற்றும் `height` கொண்ட செவ்வகமாக இருக்கலாம்.

#### எடுத்துக்காட்டு

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// அல்லது
await browser.ocrGetText({ haystack: await $("elementSelector") });

// அல்லது
await browser.ocrGetText({
    haystack: {
        x: 10,
        y: 50,
        width: 300,
        height: 75,
    },
});
```

### `language`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `eng`

Tesseract அங்கீகரிக்கும் மொழி. மேலும் தகவல் [இங்கே](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) காணலாம் மற்றும் ஆதரிக்கப்படும் மொழிகளை [இங்கே](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) காணலாம்.

#### எடுத்துக்காட்டு

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // டச்சு மொழியைப் பயன்படுத்தவும்
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```
---
id: ocr-get-text
title: استخراج النص من الصور
---

الحصول على النص الموجود في صورة.

### الاستخدام

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## المخرجات

### النتيجة

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### السجلات

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## الخيارات

### `contrast`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `0.25`

كلما زاد التباين، كلما أصبحت الصورة أغمق والعكس صحيح. يمكن أن يساعد هذا في العثور على النص في الصورة. يقبل قيمًا بين `-1` و `1`.

#### مثال

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **النوع:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`
-   **إلزامي:** `لا`

هذه هي منطقة البحث على الشاشة حيث يحتاج OCR إلى البحث عن النص. يمكن أن يكون عنصرًا أو مستطيلًا يحتوي على `x` و `y` و `width` و `height`

#### مثال

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// أو
await browser.ocrGetText({ haystack: await $("elementSelector") });

// أو
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

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `eng`

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // استخدام اللغة الهولندية
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```
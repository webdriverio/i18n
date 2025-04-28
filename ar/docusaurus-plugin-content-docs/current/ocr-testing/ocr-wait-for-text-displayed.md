---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

انتظار حتى يتم عرض نص معين على الشاشة.

## الاستخدام

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## المخرجات

### السجلات

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## الخيارات

### `text`

-   **النوع:** `string`
-   **إلزامي:** نعم

النص الذي تريد البحث عنه للنقر عليه.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 18000 (18 ثانية)

الوقت بالمللي ثانية. تنبه إلى أن عملية التعرف البصري على النصوص (OCR) قد تستغرق بعض الوقت، لذا لا تضبطها على قيمة منخفضة جدًا.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // انتظر لمدة 25 ثانية
});
```

### `timeoutMsg`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `Could not find the text "{selector}" within the requested time.`

تتجاوز رسالة الخطأ الافتراضية.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `0.25`

كلما زاد التباين، أصبحت الصورة أغمق والعكس صحيح. يمكن أن يساعد ذلك في العثور على النص في الصورة. يقبل قيم بين `-1` و `1`.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **النوع:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`
-   **إلزامي:** لا

هذه هي منطقة البحث في الشاشة حيث يحتاج OCR إلى البحث عن النص. يمكن أن يكون عنصرًا أو مستطيلًا يحتوي على `x` و `y` و `width` و `height`

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// أو
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// أو
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

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `eng`

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // استخدم الهولندية كلغة
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

يمكنك تعديل المنطق الضبابي للعثور على النص باستخدام الخيارات التالية. قد يساعد ذلك في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 100

يحدد مدى قرب التطابق من الموقع الضبابي (المحدد بواسطة الموقع). تطابق الحرف الدقيق الذي يبعد مسافة أحرف عن الموقع الضبابي سيسجل كعدم تطابق كامل. مسافة 0 تتطلب أن يكون التطابق في الموقع المحدد بالضبط. مسافة 1000 ستتطلب تطابقًا مثاليًا ليكون في حدود 800 حرف من الموقع ليتم العثور عليه باستخدام عتبة 0.8.

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 0

يحدد تقريبًا أين في النص من المتوقع العثور على النمط.

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 0.6

عند أي نقطة يستسلم خوارزمية المطابقة. العتبة 0 تتطلب تطابقًا مثاليًا (للأحرف والموقع)، وستطابق العتبة 1.0 أي شيء.

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** false

ما إذا كان البحث يجب أن يكون حساسًا لحالة الأحرف.

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 2

سيتم إرجاع المطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل مطابقات الحرف الواحد في النتيجة، قم بتعيينها إلى 2)

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** false

عندما تكون `true`، ستستمر وظيفة المطابقة حتى نهاية نمط البحث حتى إذا تم العثور بالفعل على تطابق مثالي في السلسلة.

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
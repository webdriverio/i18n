---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

انتظر حتى يتم عرض نص محدد على الشاشة.

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
-   **افتراضي:** 18000 (18 ثانية)

الوقت بالمللي ثانية. كن على دراية بأن عملية التعرف البصري على الحروف قد تستغرق بعض الوقت، لذا لا تحدد وقتًا قصيرًا جدًا.

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
-   **افتراضي:** `Could not find the text "{selector}" within the requested time.`

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
-   **افتراضي:** `0.25`

كلما زاد التباين، كلما أصبحت الصورة أغمق والعكس صحيح. يمكن أن يساعد ذلك في العثور على النص في الصورة. يقبل قيم بين `-1` و `1`.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **النوع:** `number`
-   **إلزامي:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

هذه هي منطقة البحث في الشاشة حيث يجب أن يبحث OCR عن النص. يمكن أن يكون عنصرًا أو مستطيلاً يحتوي على `x` و `y` و `width` و `height`

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
-   **افتراضي:** `eng`

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) واللغات المدعومة يمكن العثور عليها [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

يمكنك تغيير المنطق الضبابي للعثور على النص باستخدام الخيارات التالية. قد يساعد ذلك في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **افتراضي:** 100

يحدد مدى قرب المطابقة من الموقع الضبابي (المحدد بواسطة الموقع). ستحصل مطابقة الحرف الدقيقة البعيدة بمسافة أحرف عن الموقع الضبابي على درجة عدم تطابق كاملة. تتطلب المسافة 0 أن تكون المطابقة في الموقع المحدد بالضبط. ستتطلب مسافة 1000 تطابقًا مثاليًا ليكون ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام عتبة 0.8.

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
-   **افتراضي:** 0

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
-   **افتراضي:** 0.6

في أي نقطة ستستسلم خوارزمية المطابقة. تتطلب عتبة 0 تطابقًا مثاليًا (للحروف والموقع)، وستطابق عتبة 1.0 أي شيء.

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
-   **افتراضي:** false

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
-   **افتراضي:** 2

سيتم إرجاع المطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل مطابقات الأحرف الفردية في النتيجة، فاضبطها على 2)

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
-   **افتراضي:** false

عندما تكون `true`، ستستمر وظيفة المطابقة حتى نهاية نمط البحث حتى إذا تم بالفعل تحديد تطابق مثالي في السلسلة.

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
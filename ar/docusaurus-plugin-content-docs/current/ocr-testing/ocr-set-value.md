---
id: ocr-set-value
title: ocrSetValue
---

إرسال سلسلة من النقرات المفتاحية إلى عنصر. سوف:

-   يكتشف العنصر تلقائياً
-   يضع التركيز على الحقل عن طريق النقر عليه
-   يضبط القيمة في الحقل

سيبحث الأمر عن النص المقدم ويحاول العثور على تطابق بناءً على المنطق الضبابي (Fuzzy Logic) من [Fuse.js](https://fusejs.io/). هذا يعني أنه إذا قدمت محدداً به خطأ مطبعي، أو كان النص الموجود غير متطابق بنسبة 100%، سيستمر في محاولة إرجاع عنصر لك. انظر إلى [السجلات](#logs) أدناه.

## الاستخدام

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## المخرجات

### السجلات

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## الخيارات

### `text`

-   **النوع:** `string`
-   **إلزامي:** نعم

النص الذي تريد البحث عنه للنقر عليه.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **النوع:** `string`
-   **إلزامي:** نعم

القيمة المراد إضافتها.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`

إذا كانت القيمة تحتاج أيضًا إلى إرسالها في حقل الإدخال. هذا يعني أن مفتاح "ENTER" سيتم إرساله في نهاية السلسلة.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `500` مللي ثانية

هذه هي مدة النقر. إذا كنت ترغب، يمكنك أيضًا إنشاء "نقرة طويلة" من خلال زيادة الوقت.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // هذه 3 ثوانٍ
});
```

### `contrast`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `0.25`

كلما زاد التباين، كلما أصبحت الصورة أغمق والعكس صحيح. هذا يمكن أن يساعد في العثور على النص في الصورة. يقبل قيم بين `-1` و `1`.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **النوع:** `number`
-   **إلزامي:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

هذه هي منطقة البحث في الشاشة حيث يحتاج OCR للبحث عن النص. يمكن أن يكون عنصرًا أو مستطيلًا يحتوي على `x` و `y` و `width` و `height`

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// أو
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// أو
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

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `eng`

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // استخدم الهولندية كلغة
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **النوع:** `object`
-   **إلزامي:** لا

يمكنك النقر على الشاشة بالنسبة للعنصر المطابق. يمكن القيام بذلك بناءً على البكسل النسبي `above` أو `right` أو `below` أو `left` من العنصر المطابق

:::note

المجموعات التالية مسموح بها

-   خصائص فردية
-   `above` + `left` أو `above` + `right`
-   `below` + `left` أو `below` + `right`

المجموعات التالية **غير** مسموح بها

-   `above` مع `below`
-   `left` مع `right`

:::

#### `relativePosition.above`

-   **النوع:** `number`
-   **إلزامي:** لا

انقر x بكسل `فوق` العنصر المطابق.

##### مثال

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

-   **النوع:** `number`
-   **إلزامي:** لا

انقر x بكسل `على يمين` العنصر المطابق.

##### مثال

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

-   **النوع:** `number`
-   **إلزامي:** لا

انقر x بكسل `أسفل` العنصر المطابق.

##### مثال

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

-   **النوع:** `number`
-   **إلزامي:** لا

انقر x بكسل `على يسار` العنصر المطابق.

##### مثال

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

يمكنك تعديل المنطق الضبابي للعثور على النص بالخيارات التالية. هذا قد يساعد في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 100

يحدد مدى قرب التطابق من الموقع الضبابي (المحدد بواسطة الموقع). تطابق الحرف الدقيق الذي يبعد مسافة أحرف عن الموقع الضبابي سيسجل كعدم تطابق كامل. مسافة 0 تتطلب أن يكون التطابق في الموقع المحدد بالضبط. مسافة 1000 ستتطلب تطابقًا مثاليًا ليكون ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام عتبة 0.8.

##### مثال

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

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 0

يحدد تقريبًا أين في النص من المتوقع العثور على النمط.

##### مثال

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

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 0.6

عند أي نقطة يستسلم خوارزمية المطابقة. عتبة 0 تتطلب تطابقًا مثاليًا (للأحرف والموقع)، عتبة 1.0 ستطابق أي شيء.

##### مثال

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

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** false

ما إذا كان البحث يجب أن يكون حساسًا لحالة الأحرف.

##### مثال

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

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 2

سيتم إرجاع التطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل تطابقات الحرف الواحد في النتيجة، قم بتعيينها إلى 2)

##### مثال

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

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** false

عندما تكون `true`، ستستمر وظيفة المطابقة حتى نهاية نمط البحث حتى إذا تم بالفعل تحديد تطابق مثالي في السلسلة.

##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
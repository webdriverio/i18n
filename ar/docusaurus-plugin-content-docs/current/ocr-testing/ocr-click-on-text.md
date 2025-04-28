---
id: ocr-click-on-text
title: ocrClickOnText
---

انقر على عنصر بناءً على النصوص المقدمة. سيبحث الأمر عن النص المقدم ويحاول العثور على تطابق بناءً على المنطق الضبابي من [Fuse.js](https://fusejs.io/). هذا يعني أنه إذا قدمت محدد به خطأ مطبعي، أو كان النص الموجود لا يتطابق بنسبة 100%، فسيحاول مع ذلك إرجاع عنصر. انظر [السجلات](#logs) أدناه.

## الاستخدام

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## المخرجات

### السجلات

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### الصورة

ستجد صورة في (مجلد الصور الافتراضي) [`imagesFolder`](./getting-started#imagesfolder) مع هدف يوضح لك أين نقرت الوحدة.

![خطوات العملية](/img/ocr/ocr-click-on-text-target.jpg)

## الخيارات

### `text`

-   **النوع:** `string`
-   **إلزامي:** نعم

النص الذي تريد البحث عنه للنقر عليه.

#### مثال

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** `500` مللي ثانية

هذه هي مدة النقر. إذا أردت يمكنك أيضًا إنشاء "نقرة طويلة" عن طريق زيادة الوقت.

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // هذا 3 ثوانٍ
});
```

### `contrast`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** `0.25`

كلما زاد التباين، كلما أصبحت الصورة أغمق والعكس صحيح. يمكن أن يساعد ذلك في العثور على نص في صورة. يقبل قيمًا بين `-1` و `1`.

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **النوع:** `number`
-   **إلزامي:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

هذه هي منطقة البحث في الشاشة حيث يحتاج OCR للبحث عن النص. يمكن أن يكون عنصرًا أو مستطيلًا يحتوي على `x` و `y` و `width` و `height`

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// أو
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// أو
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
-   **الافتراضي:** `eng`

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // استخدم الهولندية كلغة
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **النوع:** `object`
-   **إلزامي:** لا

يمكنك النقر على الشاشة بالنسبة إلى العنصر المطابق. يمكن أن يتم ذلك بناءً على البكسل النسبي `above` أو `right` أو `below` أو `left` من العنصر المطابق

:::note

التركيبات التالية مسموح بها

-   خصائص فردية
-   `above` + `left` أو `above` + `right`
-   `below` + `left` أو `below` + `right`

التركيبات التالية **غير** مسموح بها

-   `above` مع `below`
-   `left` مع `right`

:::

#### `relativePosition.above`

-   **النوع:** `number`
-   **إلزامي:** لا

انقر على بُعد x بكسل `فوق` العنصر المطابق.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **النوع:** `number`
-   **إلزامي:** لا

انقر على بُعد x بكسل `إلى اليمين` من العنصر المطابق.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **النوع:** `number`
-   **إلزامي:** لا

انقر على بُعد x بكسل `أدناه` العنصر المطابق.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **النوع:** `number`
-   **إلزامي:** لا

انقر على بُعد x بكسل `إلى اليسار` من العنصر المطابق.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

يمكنك تغيير المنطق الضبابي للعثور على نص باستخدام الخيارات التالية. قد يساعد ذلك في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** 100

يحدد مدى قرب المطابقة من موقع البحث الضبابي (المحدد بواسطة location). المطابقة الحرفية الدقيقة التي تبعد مسافة أحرف عن موقع البحث الضبابي ستسجل كعدم تطابق كامل. مسافة 0 تتطلب أن تكون المطابقة في الموقع المحدد بالضبط. مسافة 1000 ستتطلب تطابقًا مثاليًا ليكون ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام عتبة 0.8.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** 0

يحدد تقريبًا أين في النص من المتوقع أن يُعثر على النمط.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** 0.6

عند أي نقطة يستسلم خوارزمية المطابقة. عتبة 0 تتطلب تطابقًا مثاليًا (للأحرف والموقع)، وعتبة 1.0 ستتطابق مع أي شيء.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** false

ما إذا كان البحث يجب أن يكون حساسًا لحالة الأحرف.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** 2

فقط المطابقات التي يتجاوز طولها هذه القيمة سيتم إرجاعها. (على سبيل المثال، إذا كنت تريد تجاهل مطابقات الحرف الواحد في النتيجة، اضبطها على 2)

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** false

عندما تكون `true`، ستستمر وظيفة المطابقة حتى نهاية نمط البحث حتى إذا تم تحديد مطابقة مثالية بالفعل في السلسلة.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
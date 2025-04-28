---
id: ocr-click-on-text
title: ocrClickOnText
---

انقر على عنصر بناءً على النصوص المقدمة. سيبحث الأمر عن النص المقدم ويحاول العثور على تطابق استنادًا إلى المنطق الضبابي من [Fuse.js](https://fusejs.io/). هذا يعني أنه إذا قمت بتوفير محدد يحتوي على خطأ إملائي، أو كان النص الموجود لا يطابق 100٪، فسيظل يحاول إرجاع عنصر لك. انظر [السجلات](#logs) أدناه.

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

ستجد صورة في (الافتراضي)[`imagesFolder`](./getting-started#imagesfolder) مع هدف لإظهار المكان الذي نقر عليه الوحدة.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

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

هذه هي مدة النقر. إذا أردت، يمكنك أيضًا إنشاء "نقرة طويلة" عن طريق زيادة الوقت.

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** `0.25`

كلما زاد التباين، كلما أصبحت الصورة أكثر قتامة والعكس صحيح. هذا يمكن أن يساعد في العثور على نص في صورة. يقبل قيم بين `-1` و `1`.

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

هذه هي منطقة البحث في الشاشة حيث تحتاج OCR إلى البحث عن نص. يمكن أن يكون عنصرًا أو مستطيلًا يحتوي على `x`, `y`, `width` و `height`

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **النوع:** `object`
-   **إلزامي:** لا

يمكنك النقر على الشاشة بالنسبة للعنصر المطابق. يمكن القيام بذلك استنادًا إلى البكسل النسبي `above`, `right`, `below` أو `left` من العنصر المطابق

:::note

المجموعات التالية مسموح بها

-   خصائص مفردة
-   `above` + `left` أو `above` + `right`
-   `below` + `left` أو `below` + `right`

المجموعات التالية غير مسموح بها

-   `above` مع `below`
-   `left` مع `right`

:::

#### `relativePosition.above`

-   **النوع:** `number`
-   **إلزامي:** لا

انقر على x بكسل `above` العنصر المطابق.

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

انقر على x بكسل `right` من العنصر المطابق.

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

انقر على x بكسل `below` العنصر المطابق.

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

انقر على x بكسل `left` من العنصر المطابق.

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

يمكنك تغيير المنطق الضبابي للعثور على نص بالخيارات التالية. هذا قد يساعد في إيجاد تطابق أفضل

#### `fuzzyFindOptions.distance`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** 100

يحدد مدى قرب التطابق من الموقع الضبابي (المحدد بالموقع). سيتم احتساب مطابقة حرف دقيقة على أنها عدم تطابق كامل إذا كانت بعيدة عن الموقع الضبابي بمسافة محددة. مسافة 0 تتطلب أن تكون المطابقة في الموقع المحدد بالضبط. مسافة 1000 ستتطلب تطابقًا تامًا ليكون ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام حد 0.8.

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

يحدد تقريبًا أين في النص من المتوقع العثور على النمط.

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

عند أي نقطة يستسلم خوارزمية المطابقة. حد 0 يتطلب تطابقًا مثاليًا (للحروف والموقع)، وحد 1.0 سيطابق أي شيء.

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

ما إذا كان البحث حساس لحالة الأحرف.

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

سيتم إرجاع المطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل مطابقات الحرف الواحد في النتيجة، قم بتعيينها إلى 2)

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

عندما تكون `true`، ستستمر وظيفة المطابقة حتى نهاية نمط البحث حتى إذا تم العثور بالفعل على تطابق تام في السلسلة.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
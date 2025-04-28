---
id: ocr-click-on-text
title: ocrClickOnText
---

انقر على عنصر بناءً على النصوص المقدمة. سيبحث الأمر عن النص المقدم ويحاول العثور على تطابق استنادًا إلى المنطق الضبابي (Fuzzy Logic) من [Fuse.js](https://fusejs.io/). هذا يعني أنه إذا قدمت محدد يحتوي على خطأ إملائي، أو كان النص الموجود ليس متطابقًا 100%، فسيظل يحاول إعطاءك عنصرًا. انظر [السجلات](#logs) أدناه.

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

ستجد صورة في (الافتراضي)[`imagesFolder`](./getting-started#imagesfolder) الخاص بك مع هدف يوضح لك أين نقرت الوحدة.

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

هذه هي مدة النقر. إذا أردت يمكنك أيضًا إنشاء "نقرة طويلة" بزيادة الوقت.

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // هذه 3 ثوانٍ
});
```

### `contrast`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** `0.25`

كلما زاد التباين، أصبحت الصورة أكثر قتامة والعكس صحيح. يمكن أن يساعد ذلك في العثور على نص في صورة. يقبل قيمًا بين `-1` و `1`.

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

هذه هي منطقة البحث في الشاشة حيث يحتاج OCR إلى البحث عن نص. يمكن أن يكون عنصرًا أو مستطيلًا يحتوي على `x` و `y` و `width` و `height`

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

يمكنك النقر على الشاشة بالنسبة إلى العنصر المطابق. يمكن القيام بذلك بناءً على وحدات البكسل النسبية `above` (فوق) أو `right` (يمين) أو `below` (أسفل) أو `left` (يسار) من العنصر المطابق.

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

انقر على x بكسل `فوق` العنصر المطابق.

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

انقر على x بكسل `يمين` العنصر المطابق.

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

انقر على x بكسل `أسفل` العنصر المطابق.

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

انقر على x بكسل `يسار` العنصر المطابق.

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

يحدد مدى قرب التطابق من الموقع الضبابي (المحدد بالموقع). سيتم تسجيل تطابق الحرف الدقيق الذي يبعد مسافة أحرف عن الموقع الضبابي على أنه تطابق غير مكتمل. المسافة 0 تتطلب أن يكون التطابق في الموقع المحدد بالضبط. ستتطلب مسافة تبلغ 1000 تطابقًا مثاليًا ليكون ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام عتبة 0.8.

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

في أي نقطة يستسلم خوارزمية المطابقة. العتبة 0 تتطلب تطابقًا مثاليًا (للأحرف والموقع)، والعتبة 1.0 ستطابق أي شيء.

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

سيتم إرجاع التطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل تطابقات الحرف الواحد في النتيجة، فقم بتعيينها إلى 2)

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

عندما تكون `true`، ستستمر وظيفة المطابقة حتى نهاية نمط البحث حتى إذا تم بالفعل تحديد تطابق مثالي في السلسلة.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
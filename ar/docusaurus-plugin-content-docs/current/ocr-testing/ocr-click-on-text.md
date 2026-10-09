---
id: ocr-click-on-text
title: ocrClickOnText
description: "انقر على عنصر من خلال نصه المرئي باستخدام ocrClickOnText، الذي يعثر على النص على الشاشة باستخدام OCR والمطابقة التقريبية."
---

انقر على عنصر بناءً على النصوص المقدمة. سيبحث الأمر عن النص المقدم ويحاول العثور على تطابق بناءً على المنطق التقريبي (Fuzzy Logic) من [Fuse.js](https://fusejs.io/). هذا يعني أنه إذا قدمت محددًا يحتوي على خطأ إملائي، أو إذا لم يكن النص الذي تم العثور عليه مطابقًا بنسبة 100%، فسيظل يحاول إرجاع عنصر لك. راجع [السجلات](#logs) أدناه.

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

ستجد صورة في مجلد (الافتراضي)[`imagesFolder`](./getting-started#imagesfolder) تحتوي على علامة هدف توضح لك المكان الذي نقرت عليه الوحدة.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## الخيارات

### `text`

<Option type="string" required="yes">

النص الذي تريد البحث عنه للنقر عليه.

</Option>
#### مثال

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

هذه هي مدة النقرة. يمكنك أيضًا إنشاء "نقرة طويلة" عن طريق زيادة الوقت إذا أردت.

</Option>
#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

كلما زاد التباين، أصبحت الصورة أغمق والعكس صحيح. يمكن أن يساعد ذلك في العثور على النص في الصورة. يقبل قيمًا بين `-1` و `1`.

</Option>
#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

هذه هي منطقة البحث في الشاشة التي يحتاج OCR إلى البحث فيها عن النص. يمكن أن تكون عنصرًا أو مستطيلًا يحتوي على `x` و `y` و `width` و `height`

</Option>
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

<Option type="string" default="eng" required="No">

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
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

<Option type="object" required="no">

يمكنك النقر على الشاشة بالنسبة إلى العنصر المطابق. يمكن القيام بذلك بناءً على عدد البكسلات النسبية `above` (أعلى) أو `right` (يمين) أو `below` (أسفل) أو `left` (يسار) من العنصر المطابق

:::note

التركيبات التالية مسموح بها

-   خصائص منفردة
-   `above` + `left` أو `above` + `right`
-   `below` + `left` أو `below` + `right`

التركيبات التالية **غير** مسموح بها

-   `above` مع `below`
-   `left` مع `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

انقر على بُعد x بكسل `above` (أعلى) العنصر المطابق.

</Option>
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

<Option type="number" required="no">

انقر على بُعد x بكسل `right` (يمين) العنصر المطابق.

</Option>
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

<Option type="number" required="no">

انقر على بُعد x بكسل `below` (أسفل) العنصر المطابق.

</Option>
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

<Option type="number" required="no">

انقر على بُعد x بكسل `left` (يسار) العنصر المطابق.

</Option>
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

يمكنك تعديل المنطق التقريبي للعثور على النص باستخدام الخيارات التالية. قد يساعد ذلك في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

يحدد مدى قرب التطابق المطلوب من الموقع التقريبي (المحدد بواسطة location). أي تطابق تام للأحرف يبعد بمقدار distance حرفًا عن الموقع التقريبي سيُحتسب على أنه عدم تطابق كامل. تتطلب المسافة 0 أن يكون التطابق في الموقع المحدد بالضبط. وتتطلب المسافة 1000 أن يكون التطابق التام ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام عتبة 0.8.

</Option>
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

<Option type="number" default="0" required="no">

يحدد تقريبًا المكان في النص الذي يُتوقع العثور على النمط فيه.

</Option>
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

<Option type="number" default="0.6" required="no">

النقطة التي تتوقف عندها خوارزمية المطابقة. تتطلب العتبة 0 تطابقًا تامًا (لكل من الأحرف والموقع)، بينما تطابق العتبة 1.0 أي شيء.

</Option>
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

<Option type="boolean" default="false" required="no">

ما إذا كان البحث يجب أن يكون حساسًا لحالة الأحرف.

</Option>
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

<Option type="number" default="2" required="no">

سيتم إرجاع التطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل التطابقات المكونة من حرف واحد في النتيجة، فاضبطها على 2)

</Option>
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

<Option type="number" default="false" required="no">

عند ضبطها على `true`، ستستمر دالة المطابقة حتى نهاية نمط البحث حتى لو تم العثور بالفعل على تطابق تام في السلسلة النصية.

</Option>
##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
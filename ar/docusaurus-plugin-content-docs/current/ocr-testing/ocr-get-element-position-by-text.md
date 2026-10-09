---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "احصل على موضع نص على الشاشة باستخدام ocrGetElementPositionByText، بالاعتماد على OCR والمطابقة التقريبية للعثور عليه."
---

احصل على موضع نص على الشاشة. سيبحث الأمر عن النص المُقدَّم ويحاول العثور على تطابق بناءً على المنطق التقريبي (Fuzzy Logic) من [Fuse.js](https://fusejs.io/). هذا يعني أنه إذا قدّمت محددًا (selector) يحتوي على خطأ إملائي، أو إذا لم يكن النص الذي تم العثور عليه مطابقًا بنسبة 100%، فسيظل يحاول إرجاع عنصر لك. راجع [السجلات](#logs) أدناه.

## الاستخدام

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## المخرجات

### النتيجة

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### السجلات

```log
# لا يزال يعثر على تطابق على الرغم من أننا بحثنا عن "Start3d" وكان النص الذي تم العثور عليه "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## الخيارات

### `text`

<Option type="string" required="yes">

النص الذي تريد البحث عنه للنقر عليه.

</Option>
#### مثال

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

كلما زاد التباين، أصبحت الصورة أغمق والعكس صحيح. يمكن أن يساعد ذلك في العثور على النص في الصورة. يقبل قيمًا بين `-1` و `1`.

</Option>
#### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

هذه هي منطقة البحث في الشاشة التي يجب أن يبحث فيها OCR عن النص. يمكن أن تكون عنصرًا أو مستطيلًا يحتوي على `x` و `y` و `width` و `height`

</Option>
#### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// أو
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// أو
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // استخدام اللغة الهولندية
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

يمكنك تعديل المنطق التقريبي للعثور على النص باستخدام الخيارات التالية. قد يساعد ذلك في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

يحدد مدى قرب التطابق من الموقع التقريبي (المحدد بواسطة location). أي تطابق تام للأحرف يبعد بمقدار distance من الأحرف عن الموقع التقريبي سيُحتسب على أنه عدم تطابق كامل. تتطلب قيمة distance تساوي 0 أن يكون التطابق في الموقع المحدد بالضبط. أما قيمة distance تساوي 1000 فتتطلب أن يكون التطابق التام ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام threshold بقيمة 0.8.

</Option>
##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

<Option type="number" default="0" required="no">

يحدد تقريبًا المكان في النص الذي يُتوقع أن يوجد فيه النمط.

</Option>
##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

عند أي نقطة تتوقف خوارزمية المطابقة. تتطلب قيمة threshold تساوي 0 تطابقًا تامًا (لكل من الأحرف والموقع)، بينما تطابق قيمة threshold تساوي 1.0 أي شيء.

</Option>
##### مثال

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
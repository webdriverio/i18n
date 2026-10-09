---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "انتظر حتى يظهر نص معين على الشاشة باستخدام ocrWaitForTextDisplayed من خدمة OCR."
---

انتظر حتى يظهر نص معين على الشاشة.

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
# يستخدم ocrWaitForTextDisplayed الأمر ocrGetElementPositionByText داخلياً، ولهذا السبب ترى الأمر ocrGetElementPositionByText في السجلات
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## الخيارات

### `text`

<Option type="string" required="yes">

النص الذي تريد البحث عنه للنقر عليه.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

الوقت بالمللي ثانية. انتبه إلى أن عملية OCR قد تستغرق بعض الوقت، لذا لا تضبطه على قيمة منخفضة جداً.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // الانتظار لمدة 25 ثانية
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

يستبدل رسالة الخطأ الافتراضية.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

كلما زاد التباين، أصبحت الصورة أكثر قتامة والعكس صحيح. يمكن أن يساعد ذلك في العثور على النص في الصورة. يقبل قيماً بين `-1` و `1`.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

هذه هي منطقة البحث في الشاشة التي يجب أن يبحث فيها OCR عن النص. يمكن أن تكون عنصراً أو مستطيلاً يحتوي على `x` و `y` و `width` و `height`

</Option>
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

<Option type="string" default="eng" required="No">

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // استخدام الهولندية كلغة
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

يمكنك تعديل المنطق الضبابي (fuzzy logic) للعثور على النص باستخدام الخيارات التالية. قد يساعد ذلك في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

يحدد مدى قرب التطابق المطلوب من الموقع الضبابي (المحدد بواسطة location). أي تطابق تام للحروف يبعد بمقدار distance من الأحرف عن الموقع الضبابي سيُحتسب كعدم تطابق كامل. تتطلب المسافة 0 أن يكون التطابق في الموقع المحدد بالضبط. أما المسافة 1000 فتتطلب أن يكون التطابق التام ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام حد (threshold) قيمته 0.8.

</Option>
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

<Option type="number" default="0" required="no">

يحدد تقريباً المكان في النص الذي يُتوقع العثور فيه على النمط.

</Option>
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

<Option type="number" default="0.6" required="no">

النقطة التي تتوقف عندها خوارزمية المطابقة. يتطلب الحد 0 تطابقاً تاماً (لكل من الحروف والموقع)، بينما يطابق الحد 1.0 أي شيء.

</Option>
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

<Option type="boolean" default="false" required="no">

ما إذا كان البحث يجب أن يكون حساساً لحالة الأحرف.

</Option>
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

<Option type="number" default="2" required="no">

سيتم إرجاع التطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل التطابقات المكونة من حرف واحد في النتيجة، فاضبطها على 2)

</Option>
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

<Option type="number" default="false" required="no">

عند ضبطها على `true`، ستستمر دالة المطابقة حتى نهاية نمط البحث حتى لو تم العثور بالفعل على تطابق تام في السلسلة النصية.

</Option>
##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
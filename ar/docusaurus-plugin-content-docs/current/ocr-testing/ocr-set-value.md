---
id: ocr-set-value
title: ocrSetValue
description: "الكتابة في حقل إدخال يُحدَّد موقعه من خلال نصه المرئي باستخدام ocrSetValue، الذي يعثر على الحقل باستخدام OCR والمطابقة التقريبية."
---

إرسال سلسلة من ضغطات المفاتيح إلى عنصر. سيقوم بما يلي:

-   اكتشاف العنصر تلقائيًا
-   وضع التركيز على الحقل عن طريق النقر عليه
-   تعيين القيمة في الحقل

سيبحث الأمر عن النص المُقدَّم ويحاول العثور على تطابق بناءً على المنطق التقريبي (Fuzzy Logic) من [Fuse.js](https://fusejs.io/). هذا يعني أنه إذا قدّمت محددًا يحتوي على خطأ إملائي، أو إذا لم يكن النص الذي تم العثور عليه مطابقًا بنسبة 100%، فسيظل يحاول إرجاع عنصر لك. راجع [السجلات](#logs) أدناه.

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

<Option type="string" required="yes">

النص الذي تريد البحث عنه للنقر عليه.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

القيمة المراد إضافتها.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

ما إذا كانت القيمة تحتاج أيضًا إلى إرسالها في حقل الإدخال. هذا يعني أنه سيتم إرسال "ENTER" في نهاية السلسلة النصية.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

هذه هي مدة النقرة. إذا أردت، يمكنك أيضًا إنشاء "نقرة طويلة" عن طريق زيادة الوقت.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // هذا يعادل 3 ثوانٍ
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

كلما زاد التباين، أصبحت الصورة أغمق والعكس صحيح. يمكن أن يساعد ذلك في العثور على النص في الصورة. يقبل قيمًا بين `-1` و `1`.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

هذه هي منطقة البحث في الشاشة التي يحتاج OCR إلى البحث فيها عن النص. يمكن أن يكون هذا عنصرًا أو مستطيلًا يحتوي على `x` و `y` و `width` و `height`

</Option>
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

<Option type="string" default="eng" required="No">

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // استخدام اللغة الهولندية
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

يمكنك النقر على الشاشة بالنسبة إلى العنصر المطابق. يمكن القيام بذلك بناءً على عدد البكسلات النسبية `above` (أعلى) أو `right` (يمين) أو `below` (أسفل) أو `left` (يسار) من العنصر المطابق

:::note

التركيبات التالية مسموح بها

-   الخصائص المفردة
-   `above` + `left` أو `above` + `right`
-   `below` + `left` أو `below` + `right`

التركيبات التالية **غير** مسموح بها

-   `above` مع `below`
-   `left` مع `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

النقر على بُعد x بكسل `above` (أعلى) العنصر المطابق.

</Option>
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

<Option type="number" required="no">

النقر على بُعد x بكسل إلى `right` (يمين) العنصر المطابق.

</Option>
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

<Option type="number" required="no">

النقر على بُعد x بكسل `below` (أسفل) العنصر المطابق.

</Option>
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

<Option type="number" required="no">

النقر على بُعد x بكسل إلى `left` (يسار) العنصر المطابق.

</Option>
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

يمكنك تعديل المنطق التقريبي للعثور على النص باستخدام الخيارات التالية. قد يساعد ذلك في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

يحدد مدى قرب التطابق المطلوب من الموقع التقريبي (المحدد بواسطة location). التطابق الحرفي الدقيق الذي يبعد بمقدار distance حرفًا عن الموقع التقريبي سيُحتسب كعدم تطابق تام. تتطلب المسافة 0 أن يكون التطابق في الموقع المحدد بالضبط. تتطلب المسافة 1000 أن يكون التطابق التام ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام حد (threshold) قدره 0.8.

</Option>
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

<Option type="number" default="0" required="no">

يحدد تقريبًا المكان في النص الذي يُتوقع أن يوجد فيه النمط.

</Option>
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

<Option type="number" default="0.6" required="no">

عند أي نقطة تتوقف خوارزمية المطابقة. يتطلب الحد 0 تطابقًا تامًا (لكل من الأحرف والموقع)، بينما الحد 1.0 سيطابق أي شيء.

</Option>
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

<Option type="boolean" default="false" required="no">

ما إذا كان البحث يجب أن يكون حساسًا لحالة الأحرف.

</Option>
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

<Option type="number" default="2" required="no">

سيتم إرجاع التطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل التطابقات المكونة من حرف واحد في النتيجة، فاضبطها على 2)

</Option>
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

<Option type="number" default="false" required="no">

عند التعيين إلى `true`، ستستمر دالة المطابقة حتى نهاية نمط البحث حتى لو تم بالفعل العثور على تطابق تام في السلسلة النصية.

</Option>
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
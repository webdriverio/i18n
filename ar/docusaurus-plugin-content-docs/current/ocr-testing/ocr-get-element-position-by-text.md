---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

الحصول على موقع نص على الشاشة. سيبحث الأمر عن النص المقدم ويحاول العثور على تطابق بناءً على المنطق الضبابي من [Fuse.js](https://fusejs.io/). هذا يعني أنه إذا قمت بتوفير محدد به خطأ إملائي، أو كان النص الذي تم العثور عليه ليس مطابقاً 100%، فسيحاول مع ذلك إعادة عنصر إليك. انظر [السجلات](#logs) أدناه.

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
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## الخيارات

### `text`

-   **النوع:** `string`
-   **إلزامي:** نعم

النص الذي ترغب في البحث عنه للنقر عليه.

#### مثال

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `0.25`

كلما زاد التباين، أصبحت الصورة أكثر قتامة والعكس صحيح. يمكن أن يساعد ذلك في العثور على نص في صورة. يقبل قيماً بين `-1` و `1`.

#### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **النوع:** `number`
-   **إلزامي:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

هذه هي منطقة البحث في الشاشة حيث يحتاج OCR إلى البحث عن النص. يمكن أن يكون عنصراً أو مستطيلاً يحتوي على `x`، `y`، `width` و `height`

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

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `eng`

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // استخدم الهولندية كلغة
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

يمكنك تغيير المنطق الضبابي للعثور على نص باستخدام الخيارات التالية. قد يساعد ذلك في العثور على تطابق أفضل

#### `fuzzyFindOptions.distance`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 100

يحدد مدى قرب التطابق من الموقع الضبابي (المحدد بالموقع). ستسجل مطابقة الحرف الدقيقة التي تبعد عن الموقع الضبابي بمسافة عدد الأحرف كعدم تطابق تام. مسافة 0 تتطلب أن يكون التطابق في الموقع المحدد بالضبط. مسافة 1000 ستتطلب تطابقًا مثاليًا ليكون ضمن 800 حرف من الموقع ليتم العثور عليه باستخدام عتبة 0.8.

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

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 0

يحدد تقريبًا أين في النص من المتوقع العثور على النمط.

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

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 0.6

في أي نقطة تستسلم خوارزمية المطابقة. عتبة 0 تتطلب تطابقًا مثاليًا (للأحرف والموقع)، وعتبة 1.0 ستطابق أي شيء.

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

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** false

ما إذا كان يجب أن يكون البحث حساسًا لحالة الأحرف.

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

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** 2

سيتم إرجاع المطابقات التي يتجاوز طولها هذه القيمة فقط. (على سبيل المثال، إذا كنت تريد تجاهل مطابقات الحرف الواحد في النتيجة، فاضبطها على 2)

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

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** false

عندما تكون `true`، ستستمر وظيفة المطابقة حتى نهاية نمط البحث حتى إذا تم بالفعل تحديد موقع تطابق مثالي في السلسلة.

##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
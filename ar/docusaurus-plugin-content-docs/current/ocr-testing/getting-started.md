---
id: getting-started
title: البدء
---

## التثبيت

الطريقة الأسهل هي الحفاظ على `@wdio/ocr-service` كاعتماد في ملف `package.json` الخاص بك عبر.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](../gettingstarted)

:::note
تستخدم هذه الوحدة Tesseract كمحرك OCR. بشكل افتراضي، ستتحقق مما إذا كان لديك تثبيت محلي لـ Tesseract على نظامك، وإذا كان الأمر كذلك، فستستخدمه. إذا لم يكن كذلك، فستستخدم وحدة [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) التي يتم تثبيتها تلقائيًا لك.

إذا كنت ترغب في تسريع معالجة الصور، فإن النصيحة هي استخدام نسخة مثبتة محليًا من Tesseract. انظر أيضًا [وقت تنفيذ الاختبار](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

يمكن العثور على تعليمات حول كيفية تثبيت Tesseract كاعتماد للنظام على نظامك المحلي [هنا](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
بالنسبة لأسئلة/أخطاء التثبيت مع Tesseract، يرجى الرجوع إلى
مشروع [Tesseract](https://github.com/tesseract-ocr/tesseract).
:::

## دعم Typescript

تأكد من إضافة `@wdio/ocr-service` إلى ملف التكوين `tsconfig.json` الخاص بك.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## التكوين

لاستخدام الخدمة، تحتاج إلى إضافة `ocr` إلى مصفوفة الخدمات في `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // your other services
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### خيارات التكوين

#### `contrast`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** `0.25`

كلما زاد التباين، أصبحت الصورة أغمق والعكس صحيح. يمكن أن يساعد ذلك في العثور على نص في صورة. يقبل قيمًا بين `-1` و `1`.

#### `imagesFolder`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** `{project-root}/.tmp/ocr`

المجلد الذي يتم فيه تخزين نتائج OCR.

:::note
إذا قمت بتوفير `imagesFolder` مخصص، فستضيف الخدمة تلقائيًا المجلد الفرعي `ocr` إليه.
:::

#### `language`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** `eng`

اللغة التي سيتعرف عليها Tesseract. يمكن العثور على مزيد من المعلومات [هنا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) ويمكن العثور على اللغات المدعومة [هنا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

## السجلات

ستضيف هذه الوحدة تلقائيًا سجلات إضافية إلى سجلات WebdriverIO. تكتب إلى سجلات `INFO` و `WARN` بالاسم `@wdio/ocr-service`.
يمكن العثور على أمثلة أدناه.

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```
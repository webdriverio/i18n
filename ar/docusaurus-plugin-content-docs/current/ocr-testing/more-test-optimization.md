---
id: more-test-optimization
title: وقت تنفيذ الاختبار
description: "سرّع الاختبارات المعتمدة على OCR عن طريق اقتصاص منطقة البحث في الشاشة واستخدام تثبيت محلي لـ Tesseract."
---

بشكل افتراضي، ستتحقق هذه الوحدة مما إذا كان لديك تثبيت محلي لـ Tesseract على جهازك/في خط الإنتاج الخاص بك. إذا لم يكن لديك تثبيت محلي، فستستخدم تلقائيًا إصدار [NodeJS](https://github.com/naptha/tesseract.js). قد يتسبب هذا في بعض البطء لأن معالجة الصور ستتم بواسطة Node.js. NodeJS ليس أفضل نظام للقيام
بالمعالجة الثقيلة.

**لكن....**، هناك طرق لتحسين وقت التنفيذ. لنأخذ سكريبت الاختبار التالي

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webbrowser.io");
        await browser.ocrClickOnText({
            text: "Search",
        });
        await browser.ocrSetValue({
            text: "docs",
            value: "specfileretries",
        });
        await browser.ocrWaitForTextDisplayed({
            text: "specFileRetries",
        });
    });
});
```

عند تنفيذ هذا لأول مرة، قد ترى النتائج التالية حيث استغرق إنهاء الاختبار 5.9 ثانية.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:52:53.405Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 126
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: d281dcdc43962b95835aea8f64cab6c7
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (5.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

## اقتصاص منطقة البحث في الشاشة

يمكنك تحسين وقت التنفيذ من خلال توفير منطقة مقتصة لتنفيذ OCR عليها.

إذا قمت بعد ذلك بتغيير السكريبت إلى هذا:

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webdriver.io");
        await driver.ocrClickOnText({
            haystack: $(".DocSearch"),
            text: "Search",
        });
        await driver.ocrSetValue({
            haystack: $(".DocSearch-Form"),
            text: "docs",
            value: "specfileretries",
        });
        await driver.ocrWaitForTextDisplayed({
            haystack: $(".DocSearch-Dropdown"),
            text: "specFileRetries",
        });
    });
});
```

فسترى وقت تنفيذ مختلفًا.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:56:55.326Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 124
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: c6cb1843535bda3ee3af07920ce232b8
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (4.8s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

:::tip اقتصاص الصور
أدى هذا إلى تقليل وقت التنفيذ المحلي من **5.9** إلى **4.8 ثانية**. وهذا انخفاض بنسبة **19%** تقريبًا. تخيل ما يمكن أن يفعله هذا لسكريبت أكبر يحتوي على بيانات أكثر.
:::

## استخدام تثبيت محلي لـ Tesseract

يمكنك تسريع وقت التنفيذ إلى أقل من دقيقة إذا كان لديك تثبيت محلي لـ Tesseract على جهازك المحلي و/أو في خط الإنتاج الخاص بك (يمكن العثور على مزيد من المعلومات حول تثبيت Tesseract على نظامك المحلي [هنا](https://tesseract-ocr.github.io/tessdoc/Installation.html)). يمكنك أن تجد أدناه وقت تنفيذ السكريبت نفسه باستخدام تثبيت محلي لـ Tesseract.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:59:11.620Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: 87f8c1e949e15a383b902e4d59b1f738
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (3.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:06
```

:::tip التثبيت المحلي
أدى هذا إلى تقليل وقت التنفيذ المحلي من **5.9** إلى **3.9 ثانية**. وهذا انخفاض بنسبة **34%** تقريبًا. تخيل ما يمكن أن يفعله هذا لسكريبت أكبر يحتوي على بيانات أكثر.
:::
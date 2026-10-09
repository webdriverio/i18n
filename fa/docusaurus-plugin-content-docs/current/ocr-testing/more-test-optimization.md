---
id: more-test-optimization
title: زمان اجرای تست
description: "تست‌های مبتنی بر OCR را با برش ناحیه جستجوی صفحه و استفاده از نصب محلی Tesseract سریع‌تر کنید."
---

به طور پیش‌فرض، این ماژول بررسی می‌کند که آیا نصب محلی Tesseract روی دستگاه شما/در پایپ‌لاین شما وجود دارد یا خیر. اگر نصب محلی نداشته باشید، به طور خودکار از نسخه [NodeJS](https://github.com/naptha/tesseract.js) استفاده می‌کند. این ممکن است باعث کندی شود، زیرا پردازش تصویر توسط Node.js انجام می‌شود. NodeJS بهترین سیستم برای انجام
پردازش‌های سنگین نیست.

**اما....**، راه‌هایی برای بهینه‌سازی زمان اجرا وجود دارد. اسکریپت تست زیر را در نظر بگیرید

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

هنگامی که این را برای اولین بار اجرا می‌کنید، ممکن است نتایج زیر را ببینید که در آن اتمام تست ۵.۹ ثانیه طول کشیده است.

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

## برش ناحیه جستجوی صفحه

می‌توانید زمان اجرا را با ارائه یک ناحیه برش‌خورده برای اجرای OCR روی آن بهینه کنید.

اگر اسکریپت را به این شکل تغییر دهید:

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

آنگاه زمان اجرای متفاوتی خواهید دید.

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

:::tip برش تصاویر
این کار زمان اجرای محلی را از **۵.۹** به **۴.۸ ثانیه** کاهش داد. این کاهشی تقریباً **۱۹٪** است. تصور کنید این کار برای یک اسکریپت بزرگ‌تر با داده‌های بیشتر چه تأثیری می‌تواند داشته باشد.
:::

## استفاده از نصب محلی Tesseract

اگر نصب محلی Tesseract روی دستگاه محلی خود و/یا در پایپ‌لاین خود داشته باشید، می‌توانید زمان اجرا را حتی به کمتر از یک دقیقه کاهش دهید (اطلاعات بیشتر درباره نصب Tesseract روی سیستم محلی خود را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Installation.html) پیدا کنید). زمان اجرای همان اسکریپت با استفاده از نصب محلی Tesseract را در زیر می‌توانید ببینید.

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

:::tip نصب محلی
این کار زمان اجرای محلی را از **۵.۹** به **۳.۹ ثانیه** کاهش داد. این کاهشی تقریباً **۳۴٪** است. تصور کنید این کار برای یک اسکریپت بزرگ‌تر با داده‌های بیشتر چه تأثیری می‌تواند داشته باشد.
:::
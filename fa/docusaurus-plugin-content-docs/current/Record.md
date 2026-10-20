---
id: record
title: ضبط تست‌ها
description: "جریان‌های کاربری را با Recorder در Chrome DevTools ضبط کنید و آن‌ها را به‌عنوان تست‌های WebdriverIO خروجی بگیرید."
---

Chrome DevTools دارای یک پنل _Recorder_ است که به کاربران اجازه می‌دهد مراحل خودکار را در Chrome ضبط و بازپخش کنند. این مراحل را می‌توان [با استفاده از یک افزونه به تست‌های WebdriverIO خروجی گرفت](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) که نوشتن تست را بسیار آسان می‌کند.

## Chrome DevTools Recorder چیست

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) ابزاری است که به شما امکان می‌دهد اقدامات تست را مستقیماً در مرورگر ضبط و بازپخش کنید و همچنین آن‌ها را به‌صورت JSON خروجی بگیرید (یا به‌صورت تست e2e خروجی بگیرید)، و نیز عملکرد تست را اندازه‌گیری کنید.

این ابزار ساده است، و از آنجایی که به مرورگر متصل است، این راحتی را داریم که نیازی به تغییر بستر کاری یا سروکار داشتن با هیچ ابزار شخص ثالثی نداشته باشیم.

## چگونه یک تست را با Chrome DevTools Recorder ضبط کنیم

اگر آخرین نسخه Chrome را داشته باشید، Recorder از قبل نصب شده و در دسترس شما خواهد بود. کافی است هر وب‌سایتی را باز کنید، کلیک راست کنید و _"Inspect"_ را انتخاب کنید. در DevTools می‌توانید Recorder را با فشردن `CMD/Control` + `Shift` + `p` و وارد کردن _"Show Recorder"_ باز کنید.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

برای شروع ضبط یک مسیر کاربری، روی _"Start new recording"_ کلیک کنید، یک نام به تست خود بدهید و سپس از مرورگر برای ضبط تست خود استفاده کنید:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

در مرحله بعد، روی _"Replay"_ کلیک کنید تا بررسی کنید که آیا ضبط موفقیت‌آمیز بوده و همان کاری را که می‌خواستید انجام می‌دهد یا خیر. اگر همه چیز درست است، روی آیکون [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) کلیک کنید و _"Export as a WebdriverIO Test Script"_ را انتخاب کنید:

گزینه _"Export as a WebdriverIO Test Script"_ تنها در صورتی در دسترس است که افزونه [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) را نصب کنید.


![Chrome DevTools Recorder](/img/recorder/export.gif)

همین!

## خروجی گرفتن از ضبط

اگر جریان را به‌عنوان اسکریپت تست WebdriverIO خروجی گرفته باشید، باید اسکریپتی دانلود شود که می‌توانید آن را کپی کرده و در مجموعه تست خود قرار دهید. برای مثال، ضبط بالا به شکل زیر است:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

حتماً برخی از مکان‌یاب‌ها (locators) را بازبینی کنید و در صورت لزوم آن‌ها را با [انواع سلکتورهای](/docs/selectors) مقاوم‌تر جایگزین کنید. همچنین می‌توانید جریان را به‌صورت فایل JSON خروجی بگیرید و از پکیج [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) برای تبدیل آن به یک اسکریپت تست واقعی استفاده کنید.

## مراحل بعدی

می‌توانید از این جریان برای ایجاد آسان تست برای برنامه‌های خود استفاده کنید. Chrome DevTools Recorder ویژگی‌های اضافی مختلفی دارد، به‌عنوان مثال:

- [شبیه‌سازی شبکه کند](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) یا
- [اندازه‌گیری عملکرد تست‌های شما](https://developer.chrome.com/docs/devtools/recorder/#measure)

حتماً [مستندات](https://developer.chrome.com/docs/devtools/recorder) آن‌ها را بررسی کنید.
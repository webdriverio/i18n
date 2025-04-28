---
id: record
title: ثبت تست‌ها
---

Chrome DevTools دارای یک پنل _Recorder_ است که به کاربران امکان می‌دهد مراحل خودکار را در کروم ثبت و بازپخش کنند. این مراحل می‌توانند [با یک افزونه به تست‌های WebdriverIO صادر شوند](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) که نوشتن تست را بسیار آسان می‌کند.

## Chrome DevTools Recorder چیست

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) ابزاری است که به شما امکان می‌دهد اقدامات تست را مستقیماً در مرورگر ثبت و بازپخش کنید و همچنین آن‌ها را به صورت JSON صادر کنید (یا آن‌ها را در تست e2e صادر کنید)، و همچنین عملکرد تست را اندازه‌گیری کنید.

این ابزار ساده است و از آنجایی که در مرورگر قرار دارد، ما راحتی عدم تغییر زمینه یا برخورد با هر ابزار شخص ثالث را داریم.

## چگونه با Chrome DevTools Recorder یک تست را ثبت کنیم

اگر جدیدترین نسخه کروم را داشته باشید، Recorder قبلاً نصب شده و برای شما در دسترس خواهد بود. فقط هر وب‌سایتی را باز کنید، راست کلیک کنید و _"Inspect"_ را انتخاب کنید. در DevTools می‌توانید Recorder را با فشار دادن `CMD/Control` + `Shift` + `p` و وارد کردن _"Show Recorder"_ باز کنید.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

برای شروع ثبت سفر کاربر، روی _"Start new recording"_ کلیک کنید، به تست خود یک نام بدهید و سپس از مرورگر برای ثبت تست خود استفاده کنید:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

در مرحله بعد، روی _"Replay"_ کلیک کنید تا بررسی کنید آیا ضبط موفقیت‌آمیز بوده و کاری را که می‌خواستید انجام می‌دهد. اگر همه چیز درست است، روی آیکون [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) کلیک کنید و _"Export as a WebdriverIO Test Script"_ را انتخاب کنید:

گزینه _"Export as a WebdriverIO Test Script"_ فقط در صورتی در دسترس است که افزونه [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) را نصب کرده باشید.


![Chrome DevTools Recorder](/img/recorder/export.gif)

همین!

## صادر کردن ضبط

اگر شما جریان را به عنوان اسکریپت تست WebdriverIO صادر کردید، باید اسکریپتی دانلود شود که می‌توانید آن را در مجموعه تست خود کپی و پیست کنید. به عنوان مثال، ضبط بالا به شکل زیر است:

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

مطمئن شوید که برخی از انتخاب‌کننده‌ها را بررسی کنید و در صورت لزوم آن‌ها را با [انواع انتخاب‌کننده](/docs/selectors) مقاوم‌تر جایگزین کنید. همچنین می‌توانید جریان را به عنوان فایل JSON صادر کنید و از بسته [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) برای تبدیل آن به یک اسکریپت تست واقعی استفاده کنید.

## مراحل بعدی

شما می‌توانید از این جریان برای ایجاد آسان تست‌ها برای برنامه‌های خود استفاده کنید. Chrome DevTools Recorder دارای ویژگی‌های اضافی مختلفی است، به عنوان مثال:

- [شبیه‌سازی شبکه کند](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) یا
- [اندازه‌گیری عملکرد تست‌های شما](https://developer.chrome.com/docs/devtools/recorder/#measure)

حتماً [مستندات](https://developer.chrome.com/docs/devtools/recorder) آن‌ها را بررسی کنید.
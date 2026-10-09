---
id: record
title: ضبط تست‌ها
description: "جریان‌های کاربری را با Chrome DevTools Recorder ضبط کنید و آن‌ها را به‌صورت تست‌های WebdriverIO خروجی بگیرید."
---

Chrome DevTools دارای یک پنل _Recorder_ است که به کاربران اجازه می‌دهد مراحل خودکار را در Chrome ضبط و پخش کنند. این مراحل را می‌توان [با یک افزونه به تست‌های WebdriverIO تبدیل کرد](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) که نوشتن تست را بسیار آسان می‌کند.

## Chrome DevTools Recorder چیست

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) ابزاری است که به شما امکان می‌دهد اقدامات تست را مستقیماً در مرورگر ضبط و بازپخش کنید و همچنین آن‌ها را به‌صورت JSON خروجی بگیرید (یا به‌صورت تست e2e خروجی بگیرید)، و همچنین عملکرد تست را اندازه‌گیری کنید.

این ابزار ساده است و از آنجا که در مرورگر تعبیه شده است، این راحتی را داریم که نیازی به تغییر محیط کاری یا سروکار داشتن با هیچ ابزار شخص ثالثی نداشته باشیم.

## نحوه ضبط یک تست با Chrome DevTools Recorder

اگر آخرین نسخه Chrome را داشته باشید، Recorder از قبل نصب شده و در دسترس شما خواهد بود. کافی است هر وبسایتی را باز کنید، راست‌کلیک کنید و _"Inspect"_ را انتخاب کنید. در DevTools می‌توانید با فشردن `CMD/Control` + `Shift` + `p` و وارد کردن _"Show Recorder"_، پنل Recorder را باز کنید.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

برای شروع ضبط یک مسیر کاربری، روی _"Start new recording"_ کلیک کنید، نامی برای تست خود انتخاب کنید و سپس از مرورگر برای ضبط تست خود استفاده کنید:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

در مرحله بعد، روی _"Replay"_ کلیک کنید تا بررسی کنید که آیا ضبط موفقیت‌آمیز بوده و همان کاری را که می‌خواستید انجام می‌دهد یا خیر. اگر همه چیز درست بود، روی آیکون [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) کلیک کنید و _"Export as a WebdriverIO Test Script"_ را انتخاب کنید:

گزینه _"Export as a WebdriverIO Test Script"_ تنها در صورتی در دسترس است که افزونه [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) را نصب کرده باشید.


![Chrome DevTools Recorder](/img/recorder/export.gif)

همین!

## خروجی گرفتن از ضبط

اگر جریان را به‌صورت اسکریپت تست WebdriverIO خروجی گرفته باشید، اسکریپتی دانلود می‌شود که می‌توانید آن را در مجموعه تست خود کپی و جای‌گذاری کنید. برای مثال، ضبط بالا به شکل زیر است:

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

حتماً برخی از مکان‌یاب‌ها (locators) را بازبینی کنید و در صورت لزوم آن‌ها را با [انواع انتخابگرهای](/docs/selectors) مقاوم‌تر جایگزین کنید. همچنین می‌توانید جریان را به‌صورت فایل JSON خروجی بگیرید و از پکیج [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) برای تبدیل آن به یک اسکریپت تست واقعی استفاده کنید.

## مراحل بعدی

می‌توانید از این جریان برای ایجاد آسان تست برای برنامه‌های خود استفاده کنید. Chrome DevTools Recorder ویژگی‌های اضافی مختلفی دارد، برای مثال:

- [شبیه‌سازی شبکه کند](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) یا
- [اندازه‌گیری عملکرد تست‌های شما](https://developer.chrome.com/docs/devtools/recorder/#measure)

حتماً [مستندات](https://developer.chrome.com/docs/devtools/recorder) آن‌ها را بررسی کنید.
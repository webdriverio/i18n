---
id: record
title: ثبت آزمون‌ها
---

Chrome DevTools دارای یک پنل _Recorder_ است که به کاربران امکان می‌دهد مراحل خودکار را در Chrome ضبط و بازپخش کنند. این مراحل می‌توانند [با استفاده از یک افزونه به آزمون‌های WebdriverIO تبدیل شوند](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) که نوشتن آزمون را بسیار آسان می‌کند.

## Chrome DevTools Recorder چیست

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) ابزاری است که به شما امکان می‌دهد اقدامات آزمون را مستقیماً در مرورگر ضبط و بازپخش کنید و همچنین آنها را به صورت JSON صادر کنید (یا آنها را در آزمون e2e صادر کنید)، و همچنین عملکرد آزمون را اندازه‌گیری کنید.

این ابزار ساده است و از آنجایی که به مرورگر متصل است، این راحتی را داریم که زمینه را تغییر ندهیم یا با هیچ ابزار شخص ثالثی سروکار نداشته باشیم.

## چگونه با Chrome DevTools Recorder یک آزمون را ضبط کنیم

اگر جدیدترین نسخه Chrome را داشته باشید، Recorder از قبل نصب شده و در دسترس شما خواهد بود. فقط هر وب‌سایتی را باز کنید، راست‌کلیک کنید و _"Inspect"_ را انتخاب کنید. در DevTools می‌توانید Recorder را با فشردن `CMD/Control` + `Shift` + `p` و وارد کردن _"Show Recorder"_ باز کنید.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

برای شروع ضبط یک سفر کاربر، روی _"Start new recording"_ کلیک کنید، به آزمون خود یک نام بدهید و سپس از مرورگر برای ضبط آزمون خود استفاده کنید:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

مرحله بعد، برای بررسی موفقیت‌آمیز بودن ضبط و انجام کار مورد نظر، روی _"Replay"_ کلیک کنید. اگر همه چیز خوب است، روی آیکون [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) کلیک کنید و _"Export as a WebdriverIO Test Script"_ را انتخاب کنید:

گزینه _"Export as a WebdriverIO Test Script"_ فقط در صورتی در دسترس است که افزونه [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) را نصب کرده باشید.

![Chrome DevTools Recorder](/img/recorder/export.gif)

همین!

## صادر کردن ضبط

اگر جریان را به عنوان اسکریپت آزمون WebdriverIO صادر کرده‌اید، باید اسکریپتی دانلود شود که می‌توانید آن را در مجموعه آزمون خود کپی و پیست کنید. به عنوان مثال، ضبط بالا به شکل زیر است:

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

مطمئن شوید که برخی از عناصر انتخاب‌کننده را بررسی کنید و در صورت لزوم آنها را با [انواع انتخاب‌کننده](/docs/selectors) مقاوم‌تر جایگزین کنید. همچنین می‌توانید جریان را به عنوان فایل JSON صادر کنید و از بسته [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) برای تبدیل آن به یک اسکریپت آزمون واقعی استفاده کنید.

## گام‌های بعدی

می‌توانید از این جریان برای ایجاد آسان آزمون‌ها برای برنامه‌های خود استفاده کنید. Chrome DevTools Recorder ویژگی‌های اضافی مختلفی دارد، مانند:

- [شبیه‌سازی شبکه کند](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) یا
- [اندازه‌گیری عملکرد آزمون‌های خود](https://developer.chrome.com/docs/devtools/recorder/#measure)

حتماً [مستندات](https://developer.chrome.com/docs/devtools/recorder) آنها را بررسی کنید.
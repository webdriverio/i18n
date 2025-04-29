---
id: wdio-teamcity-reporter
title: گزارشگر تیم‌سیتی
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---


> wdio-teamcity-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter) مراجعه کنید

گزارشگر تیم‌سیتی WebdriverIO که امکان نمایش نتایج تست را در زمان واقعی فراهم می‌کند و اطلاعات تست را در تب Tests صفحه Build Results در دسترس قرار می‌دهد.


## نصب

```bash
npm install wdio-teamcity-reporter --save-dev
```

دستورالعمل‌های نصب WebdriverIO را می‌توانید اینجا پیدا کنید: https://webdriver.io/docs/gettingstarted


## پیکربندی

گزارشگر را در فایل [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html) خود اضافه کنید:

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### گزینه‌ها

- `captureStandardOutput (boolean)` — اگر `true` باشد، تمام پیام‌های خروجی استاندارد (و خطای استاندارد) که بین پیام‌های `testStarted` و `testFinished` دریافت می‌شوند، به عنوان خروجی تست در نظر گرفته می‌شوند. مقدار پیش‌فرض `false` است و استفاده از پیام‌های سرویس testStdOut و testStdErr را برای گزارش خروجی تست فرض می‌کند. پیش‌فرض `false`.
- `flowId (boolean)` — اگر `true` باشد، ویژگی `flowId` به تمام پیام‌ها اضافه می‌شود. ردیابی جریان برای تمایز بین فرآیندهای جداگانه که به صورت موازی اجرا می‌شوند ضروری است. پیش‌فرض `true`.
- `message (string)` — امکان ارائه فرمت خاص برای ویژگی نام. کلیدهای ممکن: `[browser]`، `[title]`. مثال، `[browser] / [title]`. پیش‌فرض `[title]`.


## لینک‌ها

- مرجع مستندات Teamcity درباره پیام‌های گزارش‌دهی: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- تست‌درایو Teamcity: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## مجوز

> مجوز MIT
---
id: seleniumgrid
title: Selenium Grid
description: "تست‌های WebdriverIO را با تنظیم protocol، hostname، port و path در پیکربندی خود به یک Selenium Grid موجود متصل کنید."
---

شما می‌توانید از WebdriverIO با نمونه Selenium Grid موجود خود استفاده کنید. برای اتصال تست‌های خود به Selenium Grid، فقط کافی است گزینه‌ها را در پیکربندی‌های test runner خود به‌روزرسانی کنید.

در اینجا یک قطعه کد از یک نمونه wdio.conf.ts آمده است.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
شما باید مقادیر مناسب را برای protocol، hostname، port و path بر اساس راه‌اندازی Selenium Grid خود ارائه دهید.
اگر Selenium Grid را روی همان ماشینی اجرا می‌کنید که اسکریپت‌های تست شما روی آن قرار دارند، در اینجا برخی از گزینه‌های معمول آمده است:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### احراز هویت پایه با Selenium Grid محافظت‌شده

اکیداً توصیه می‌شود که Selenium Grid خود را ایمن کنید. اگر یک Selenium Grid محافظت‌شده دارید که به احراز هویت نیاز دارد، می‌توانید هدرهای احراز هویت را از طریق گزینه‌ها ارسال کنید.
لطفاً برای اطلاعات بیشتر به بخش [headers](https://webdriver.io/docs/configuration/#headers) در مستندات مراجعه کنید.

### پیکربندی‌های Timeout با Selenium Grid پویا

هنگام استفاده از یک Selenium Grid پویا که در آن podهای مرورگر بر اساس تقاضا راه‌اندازی می‌شوند، ایجاد session ممکن است با شروع سرد (cold start) مواجه شود. در چنین مواردی، توصیه می‌شود timeoutهای ایجاد session را افزایش دهید. مقدار پیش‌فرض در گزینه‌ها ۱۲۰ ثانیه است، اما اگر grid شما برای ایجاد یک session جدید به زمان بیشتری نیاز دارد، می‌توانید آن را افزایش دهید.

```ts
connectionRetryTimeout: 180000,
```

### پیکربندی‌های پیشرفته

برای پیکربندی‌های پیشرفته، لطفاً به [فایل پیکربندی](https://webdriver.io/docs/configurationfile) Testrunner مراجعه کنید.

### عملیات فایل با Selenium Grid

هنگام اجرای test caseها با یک Selenium Grid راه دور، مرورگر روی یک ماشین راه دور اجرا می‌شود و شما باید در مورد test caseهایی که شامل آپلود و دانلود فایل هستند، دقت ویژه‌ای داشته باشید.

### دانلود فایل‌ها

برای مرورگرهای مبتنی بر Chromium، می‌توانید به مستندات [دانلود فایل](https://webdriver.io/docs/api/browser/downloadFile) مراجعه کنید. اگر اسکریپت‌های تست شما نیاز به خواندن محتوای یک فایل دانلودشده دارند، باید آن را از node راه دور Selenium به ماشین test runner دانلود کنید. در اینجا یک نمونه قطعه کد از پیکربندی نمونه `wdio.conf.ts` برای مرورگر Chrome آمده است:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### آپلود فایل با Selenium Grid راه دور

[`element.setFiles()`](/docs/api/element/setFiles) یک ورودی فایل را از طریق WebDriver BiDi تنظیم می‌کند. مسیرهایی که ارسال می‌کنید توسط مرورگر باز می‌شوند، بنابراین باید روی ماشینی که مرورگر را اجرا می‌کند وجود داشته باشند. WebdriverIO یک فایل محلی را روی node مربوط به Selenium منتقل نمی‌کند.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

مجموعه تستی که از `browser.uploadFile()` برای ارسال بایت‌ها به node استفاده می‌کرد، باید فایل را در جایی قرار دهد که مرورگر بتواند آن را بخواند و سپس `setFiles` را فراخوانی کند. endpoint مربوط به [`file`](/docs/api/selenium#file) در Selenium همچنان به‌صورت `browser.file()` برای Chromedriver، Edgedriver و Selenium Grid در دسترس است. این یک دستور WebDriver یا WebDriver BiDi نیست.

### سایر عملیات فایل/grid

چند عملیات دیگر نیز وجود دارد که می‌توانید با Selenium Grid انجام دهید. دستورالعمل‌های Selenium Standalone باید با Selenium Grid نیز به‌خوبی کار کنند. لطفاً برای گزینه‌های موجود به مستندات [Selenium Standalone](https://webdriver.io/docs/api/selenium/) مراجعه کنید.


### مستندات رسمی Selenium Grid

برای اطلاعات بیشتر درباره Selenium Grid، می‌توانید به [مستندات](https://www.selenium.dev/documentation/grid/) رسمی Selenium Grid مراجعه کنید.

اگر می‌خواهید Selenium Grid را در Docker، Docker compose یا Kubernetes اجرا کنید، لطفاً به [مخزن GitHub](https://github.com/SeleniumHQ/docker-selenium) مربوط به Selenium-Docker مراجعه کنید.
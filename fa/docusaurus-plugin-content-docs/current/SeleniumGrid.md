---
id: seleniumgrid
title: سلنیوم گرید
---

شما می‌توانید از WebdriverIO با نمونه موجود Selenium Grid خود استفاده کنید. برای اتصال آزمون‌های خود به Selenium Grid، فقط کافی است تنظیمات را در پیکربندی‌های اجراکننده آزمون خود به‌روزرسانی کنید.

در اینجا یک قطعه کد از نمونه wdio.conf.ts آورده شده است.

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
شما باید مقادیر مناسب برای پروتکل، نام میزبان، پورت و مسیر را بر اساس تنظیمات Selenium Grid خود ارائه دهید.
اگر Selenium Grid را روی همان دستگاهی که اسکریپت‌های آزمون شما اجرا می‌شود، اجرا می‌کنید، در اینجا چند گزینه معمول آورده شده است:

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

اکیداً توصیه می‌شود که Selenium Grid خود را ایمن کنید. اگر Selenium Grid محافظت‌شده دارید که نیاز به احراز هویت دارد، می‌توانید هدرهای احراز هویت را از طریق گزینه‌ها ارسال کنید.
لطفاً برای اطلاعات بیشتر به بخش [headers](https://webdriver.io/docs/configuration/#headers) در مستندات مراجعه کنید.

### پیکربندی زمان انتظار با Selenium Grid پویا

هنگام استفاده از Selenium Grid پویا که پادهای مرورگر به صورت تقاضا راه‌اندازی می‌شوند، ایجاد جلسه ممکن است با شروع سرد مواجه شود. در چنین مواردی، توصیه می‌شود زمان انتظار ایجاد جلسه را افزایش دهید. مقدار پیش‌فرض در گزینه‌ها ۱۲۰ ثانیه است، اما اگر گرید شما برای ایجاد یک جلسه جدید زمان بیشتری نیاز دارد، می‌توانید آن را افزایش دهید.

```ts
connectionRetryTimeout: 180000,
```

### پیکربندی‌های پیشرفته

برای پیکربندی‌های پیشرفته، لطفاً به [فایل پیکربندی](https://webdriver.io/docs/configurationfile) Testrunner مراجعه کنید.

### عملیات فایل با Selenium Grid

هنگام اجرای موارد آزمون با Selenium Grid از راه دور، مرورگر روی یک دستگاه از راه دور اجرا می‌شود، و شما باید توجه ویژه‌ای به موارد آزمون شامل آپلود و دانلود فایل داشته باشید.

### دانلود فایل‌ها

برای مرورگرهای مبتنی بر کرومیوم، می‌توانید به مستندات [Download file](https://webdriver.io/docs/api/browser/downloadFile) مراجعه کنید. اگر اسکریپت‌های آزمون شما نیاز به خواندن محتوای یک فایل دانلود شده دارند، باید آن را از گره Selenium از راه دور به دستگاه اجراکننده آزمون دانلود کنید. در اینجا یک نمونه قطعه کد از پیکربندی نمونه `wdio.conf.ts` برای مرورگر Chrome آورده شده است:

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

### آپلود فایل با Selenium Grid از راه دور

برای آپلود یک فایل به یک برنامه وب در مرورگر از راه دور، ابتدا باید فایل را به گرید از راه دور آپلود کنید. می‌توانید برای جزئیات بیشتر به مستندات [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) مراجعه کنید.

### سایر عملیات فایل/گرید

چند عملیات دیگر وجود دارد که می‌توانید با Selenium Grid انجام دهید. دستورالعمل‌های Selenium Standalone باید با Selenium Grid نیز به خوبی کار کنند. لطفاً برای گزینه‌های موجود به مستندات [Selenium Standalone](https://webdriver.io/docs/api/selenium/) مراجعه کنید.

### مستندات رسمی Selenium Grid

برای اطلاعات بیشتر در مورد Selenium Grid، می‌توانید به [مستندات](https://www.selenium.dev/documentation/grid/) رسمی Selenium Grid مراجعه کنید.

اگر می‌خواهید Selenium Grid را در Docker، Docker compose یا Kubernetes اجرا کنید، لطفاً به [مخزن GitHub](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker مراجعه کنید.
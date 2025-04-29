---
id: wdio-qunit-service
title: سرویس QUnit
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---


> wdio-qunit-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا مراجعه کنید به [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) سرویسی برای اجرای تست‌های مبتنی بر مرورگر [QUnit](https://qunitjs.com/) و تبدیل پویای آن‌ها به مجموعه تست‌های `wdio`.

## جایگزینی Karma

`QUnit Service` یک جایگزین آماده برای کسانی است که از [Karma JS](https://karma-runner.github.io/latest/index.html) برای اجرای تست‌های `QUnit` خود استفاده می‌کنند ([karma-qunit](https://github.com/karma-runner/karma-qunit/)، [karma-ui5](https://github.com/SAP/karma-ui5) یا هر ترکیب دیگری از Karma و QUnit). Karma [منسوخ شده](https://github.com/karma-runner/karma) است و افراد باید به گزینه‌های مدرن مهاجرت کنند!

اگر می‌خواهید تست‌های QUnit خود را همانطور که هستند حفظ کنید، بدون بازنویسی و بدون بازسازی، `QUnit Service` تمام چیزی است که نیاز دارید. این سرویس فایل‌های HTML مربوط به QUnit را در مرورگر اجرا کرده و تمام نتایج را در قالب `wdio` ثبت می‌کند.

به همین دلیل، توسعه‌دهندگان می‌توانند از `QUnit Service` در کنار همه امکانات موجود در اکوسیستم `wdio` استفاده کنند.

می‌خواهید اجرای تست را در یک [ویدیو](https://webdriver.io/docs/wdio-video-reporter/) ضبط کنید؟ شاید می‌خواهید [اسکرین‌شات](https://webdriver.io/docs/api/browser/saveScreenshot/) بگیرید یا آن را در [PDF](https://webdriver.io/docs/api/browser/savePDF/) ذخیره کنید؟ [پوشش کد](https://www.npmjs.com/package/wdio-monocart-service) را بررسی کنید؟ نتایج تست را در قالب [JUnit](https://webdriver.io/docs/junit-reporter) ذخیره کنید؟ انجامش دهید، `QUnit Service` مانع شما نمی‌شود.

## نصب

بعد از پیکربندی `WebdriverIO`، `wdio-qunit-service` را به عنوان یک devDependency در فایل `package.json` خود نصب کنید.

```shell
npm install wdio-qunit-service --save-dev
```

اگر هنوز `WebdriverIO` را پیکربندی نکرده‌اید، [مستندات](https://webdriver.io/docs/gettingstarted) رسمی را مطالعه کنید.

## پیکربندی

برای استفاده از `QUnit Service` فقط کافی است آن را به لیست `services` در فایل `wdio.conf.js` خود اضافه کنید. مستندات wdio تمام اطلاعات مربوط به [فایل پیکربندی](https://webdriver.io/docs/configurationfile) را دارد:

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## استفاده

اطمینان حاصل کنید که وب سرور قبل از اجرای تست‌ها فعال و در حال اجراست. `wdio` وب سرور را راه‌اندازی نخواهد کرد.

### با فایل‌های .spec یا .test

در تست WebdriverIO خود، باید به صفحه تست HTML مربوط به QUnit هدایت شوید، سپس `browser.getQUnitResults()` را فراخوانی کنید.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

توصیه می‌شود برای هر صفحه تست HTML مربوط به QUnit، یک فایل تست WebdriverIO داشته باشید. این امر تضمین می‌کند که تست‌ها به صورت موازی و کاملاً ایزوله اجرا شوند.

### فقط پیکربندی، بدون فایل‌های .spec یا .test

اگر نمی‌خواهید فایل‌های spec/test ایجاد کنید، می‌توانید لیستی از فایل‌های HTML مربوط به QUnit را به پیکربندی منتقل کنید و تست‌ها به صورت خودکار تولید خواهند شد.

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### نتایج تست

نتایج تست می‌تواند به این شکل باشد:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## نمونه‌ها

پوشه [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) را برای نمونه‌هایی با استفاده از `javascript`، `typescript` و موارد بیشتر بررسی کنید.

### استفاده در برنامه‌های SAP Fiori / UI5

[نمونه](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) مستقیم با استفاده از [openui5-sample-app](https://github.com/SAP/openui5-sample-app) شناخته شده:

- ایجاد یک فایل پیکربندی: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- به `wdio` بگویید فایل‌های تست QUnit را کجا پیدا کند:

- - فایل‌های QUnit را به [پیکربندی سرویس](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js) اضافه کنید
- - یا
- - یک فایل تست WebdriverIO برای [تست‌های واحد](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) و یکی دیگر برای [تست‌های OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js) ایجاد کنید

- وب سرور باید قبل از اجرای تست‌ها در حال اجرا باشد

- اجرا کنید $ `wdio run webapp/test/wdio.conf.js`

## نویسنده

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## مجوز

این پروژه تحت مجوز MIT است - برای جزئیات فایل [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) را مشاهده کنید.
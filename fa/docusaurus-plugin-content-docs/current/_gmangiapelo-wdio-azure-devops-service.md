---
id: gmangiapelo-wdio-azure-devops-service
title: سرویس برنامه‌های آزمایش Azure DevOps
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---


> @gmangiapelo/wdio-azure-devops-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service) مراجعه کنید

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

نتایج [WebdriverIO](https://webdriver.io/) را در برنامه‌های آزمایش Azure DevOps منتشر می‌کند.

ویژگی‌های اصلی:

* پشتیبانی از چارچوب‌های اجرایی Jasmine/Jest/Mocha و Cucumber
* نتایج آزمون در یک اجرای آزمون همان مجموعه جمع‌آوری می‌شوند اگر چندین فایل spec (آزمون) اجرا می‌کنید و آنها به یک مجموعه تعلق دارند
* نتایج بلافاصله پس از اجرای هر آزمون گزارش می‌شوند (گزارش دهی بلادرنگ)
* اجرای آزمون پس از پایان آخرین فایل spec (آزمون) بسته می‌شود
* پشتیبانی از چندین مجموعه


## نصب

این ماژول را با دستور زیر به صورت محلی نصب کنید تا به عنوان یک وابستگی (توسعه) استفاده شود:

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## استفاده

> _wdio-azure-devops-service_ از **NodeJS 8 یا بالاتر** پشتیبانی می‌کند

> _wdio-azure-devops-service_ از **commonjs** و **esm** پشتیبانی می‌کند

### پیکربندی

از آنجا که `@gmangiapelo/wdio-azure-devops-service` یک سرویس است، می‌توانید آن را در فایل `wdio.conf.js` خود به صورت زیر تنظیم کنید

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### تنظیم موارد آزمون

آزمون‌های WDIO شما باید شامل شناسه مورد آزمون Azure شما باشند. اطمینان حاصل کنید که شناسه‌های موارد آزمون شما با عناوین آزمون متمایز هستند:

**سبک Mocha:**
```Javascript
// خوب:
it("C123 Can authenticate a valid user", ...

// بد:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**سبک Cucumber:**
```Gherkin
## خوب:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## بد:
@c123stringTest
Scenario Can authenticate a valid user
```

### مثال گزارش Azure DevOps

این مثالی از نتایج منتشر شده در AZ Test Plans، در طول اجرای آزمون است
![مثال برنامه‌های آزمایش AzureDevops](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## گزینه‌های سرویس

### pat

توکن دسترسی شخصی ایجاد شده در Azure DevOps با مجوز API تنظیم شده.

مثال: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

نوع: `string`

الزامی: `true`

### organizationUrl

آدرس پایه نمونه Azure DevOps شما.

مثال: `"https://dev.azure.com/gianlucamangiapelo"`

نوع: `string`

الزامی: `true`

### projectId

شناسه پروژه در Azure DevOps.

برای پیدا کردن projectId از `GET {organizationUrl}/_apis/projects?api-version=6.0` استفاده کنید و `id` مناسب را کپی کنید.

مثال: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

نوع: `string`

الزامی: `true`

### planId

شناسه برنامه آزمون که می‌توانید در بخش برنامه آزمون Azure DevOps بازیابی کنید.

مثال: `124`

نوع: `integer`

الزامی: `true`

### suiteId

شناسه مجموعه که می‌توانید در بخش برنامه آزمون Azure DevOps بازیابی کنید، در صورت مجموعه‌های تو در تو، suiteId ریشه را دریافت کنید، سرویس تمام زیرمجموعه‌های فرزند را تکرار می‌کند.

مثال: `21`

نوع: `integer`

الزامی: `true`

### runName

نام توصیفی برای اجرای آزمون.

مثال: `"FE regression tests run"`

نوع: `string`

الزامی: `true`

### caseIdRegex

عبارت منظم سفارشی برای تطبیق testCaseId از برچسب یا عنوان مورد آزمون.

نوع: `string`

پیش‌فرض: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

الزامی: `false`

## نویسنده
جیانلوکا مانجیاپلو - [github](https://github.com/gianlucamangiapelo)
---
id: wdio-testrail-reporter
title: گزارش‌دهنده Testrail
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---


> @wdio/testrail-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter) مراجعه کنید

این گزارش‌دهنده گزارش‌های TestRail را ایجاد می‌کند. اولین چیزی که نیاز دارید فعال کردن API تست‌ریل است تا گزارش بتواند با TestRail ارتباط برقرار کرده و نتایج تست را ارسال کند. برای انجام این کار، وارد حساب TestRail خود شوید و به Administration > Site Settings > API بروید و مطمئن شوید که کادر کنار Enable API را تیک زده‌اید.

شناسه موردی تست TestRail را به توضیحات آزمون اضافه کنید. به عنوان مثال:
```javascript
it("C123456 Page loads correctly", async () => {
```
این همچنین از چندین شناسه موردی پشتیبانی می‌کند. به عنوان مثال:
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## نصب

برای استفاده از گزارش‌دهنده، آن را به `package.json` خود اضافه کنید:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## استفاده

گزارش‌دهنده را به فایل پیکربندی WDIO خود اضافه کنید.

مثالی برای زمانی که می‌خواهید یک اجرای تست جدید ایجاد کنید:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

مثالی برای زمانی که می‌خواهید یک اجرای تست موجود را به‌روزرسانی کنید:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

مثالی برای زمانی که به شناسه‌های پروژه و/یا مجموعه‌های متفاوت بر اساس مجموعه تست برای اجرا نیاز دارید:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## گزینه‌ها

### `projectId`

شناسه پروژه testrail.

نوع: `string`

### `suiteId`

شناسه مجموعه، مجموعه 1 پیش‌فرض است.

نوع: `string`

### `domain`

دامنه نمونه testrail شما، مانند `your-domain.testrail.io`.

نوع: `string`

### `username`

نام کاربری نمونه testrail شما.

نوع: `string`

### `apiToken`

توکن API نمونه testrail شما.

نوع: `string`

### `runName`

نام سفارشی برای اجرای تست.

نوع: `string`

### `existingRunId`

شناسه یک اجرای تست موجود برای به‌روزرسانی.

نوع: `string`

### `oneReport`

ایجاد یک اجرای تست واحد.

نوع: `boolean`

### `includeAll`

شامل همه تست‌ها در مجموعه در اجرای تست.

نوع: `boolean`

### `caseIdTagPrefix`

پیشوندی که برای تشخیص شناسه مورد در برچسب‌های Cucumber استفاده می‌شود، مفید برای اجرای سناریوهای Cucumber چند پلتفرمی

نوع: `string`

### `useCucumber`

مشخص می‌کند آیا تست‌ها با استفاده از چارچوب Cucumber نوشته شده‌اند. به طور پیش‌فرض، روی `false` تنظیم شده است.

نوع: `boolean`

---

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.
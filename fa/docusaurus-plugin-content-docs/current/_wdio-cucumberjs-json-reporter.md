---
id: wdio-cucumberjs-json-reporter
title: گزارشگر JSON کیوکامبر جی‌اس
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---


> wdio-cucumberjs-json-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter) مراجعه کنید

یک گزارشگر WDIO که فایل‌های JSON کیوکامبر را برای WebdriverIO نسخه ۸ و بالاتر ایجاد می‌کند.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## چه کاری انجام می‌دهد
این گزارشگر برای هر ویژگی که در حال آزمایش است، یک **فایل JSON کیوکامبر** تولید می‌کند. فایل JSON می‌تواند با هر گزارشی که می‌خواهید استفاده کنید، مانند [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) مورد استفاده قرار گیرد.

همچنین متادیتا درباره نمونه در حال اجرا را به فایل ویژگی اضافه می‌کند و در آخر، به شما این امکان را می‌دهد که پیوست‌هایی را به خروجی JSON اضافه کنید.

## نصب
ساده‌ترین راه این است که `wdio-cucumberjs-json-reporter` را به عنوان یک devDependency در `package.json` خود نگه دارید.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

به سادگی می‌توانید این کار را انجام دهید:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

بنابراین به صورت خودکار به `package.json` شما اضافه می‌شود

دستورالعمل نصب `WebdriverIO` در [اینجا](https://webdriver.io/docs/gettingstarted) قابل مشاهده است.

## پیکربندی
دایرکتوری خروجی و زبان را در فایل wdio.conf.js خود پیکربندی کنید:

```js
export const config = {
    // ...
    reporters: [
        // اینگونه با گزینه‌های پیش‌فرض، گزینه‌های زیر را ببینید
        'cucumberjs-json',

        // یا اینگونه اگر می‌خواهید پوشه و زبان را تنظیم کنید
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> از هر دو روش برای اضافه کردن گزارشگر استفاده نکنید، این فقط یک مثال است!

## گزینه‌ها
### `jsonFolder`
- **نوع:** `String`
- **اجباری:** خیر
- **پیش‌فرض:** `.tmp/json/`

دایرکتوری که فایل‌های JSON تولید شده توسط این گزارش در آن ذخیره می‌شوند، نسبت به جایی که اسکریپت شروع می‌شود.

**توجه:** اگر از یک اسکریپت npm از خط فرمان استفاده می‌کنید، مانند `npm run test`، مسیر `jsonFolder` نسبت به مسیری که اسکریپت از آن اجرا می‌شود خواهد بود. اجرای آن از ریشه پروژه شما همچنین `jsonFolder` را در ریشه پروژه شما ایجاد می‌کند.

### `language`
- **نوع:** `String`
- **اجباری:** خیر
- **پیش‌فرض:** `en`

زبانی که سناریوهای Gherkin به آن نوشته شده‌اند (پیش‌فرض انگلیسی است). لیست کدهای زبان و کلمات کلیدی آن‌ها را می‌توانید [اینجا](https://cucumber.io/docs/gherkin/reference/#overview) پیدا کنید.

### `disableHooks`
- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `false`

اگر این ویژگی روی `true` تنظیم شود، جزئیات قلاب‌ها بخشی از تولید نخواهند بود.

### `reportFilePerRetry`
- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `true`

هنگامی که یک مشخصه مجددا تلاش می‌شود، اگر این ویژگی روی `false` تنظیم شود، گزارش به فایل گزارش موجود از تلاش‌های قبلی اضافه خواهد شد.

**مثال**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## متادیتا

> **توجه:**\
> این در حال حاضر اگر از WebdriverIO V6 استفاده می‌کنید پشتیبانی نمی‌شود، WebdriverIO V5 هنوز از این پشتیبانی می‌کند و WebdriverIO V7 دوباره از آن پشتیبانی می‌کند

همانطور که گفته شد، این گزارش می‌تواند به طور خودکار متادیتای دستگاه/ماشین فعلی که ویژگی روی آن اجرا شده را ذخیره کند.

برای سفارشی کردن این، می‌توانید با اضافه کردن آبجکت زیر به `capabilities` خود آن را اضافه کنید

```js
// مثال wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // این را اضافه کنید
            'cjson:metadata': {
                // برای یک مرورگر
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // برای یک اپلیکیشن
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> آبجکت متادیتا باید پیشوند `cjson` داشته باشد، در غیر این صورت کار نخواهد کرد!

### مقادیر متادیتا
#### `metadata.app.name`
- **نوع:** `string`

**به عنوان مثال:** نام برنامه.

#### `metadata.app.version`
- **نوع:** `string`

**به عنوان مثال:** نسخه برنامه.

#### `metadata.browser.name`
- **نوع:** `string`
- **مقادیر ممکن:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **نوع:** `string`

**به عنوان مثال:** نسخه مرورگر، این می‌تواند به صورت دستی اضافه شود یا در طول اجرای تست‌ها برای دریافت شماره دقیق نسخه بازیابی شود.

#### `metadata.device`
- **نوع:** `string`

**به عنوان مثال:** نامی که نوع دستگاه را نشان می‌دهد. برای مثال، اگر روی یک ماشین مجازی اجرا می‌کنید، می‌توانید آن را اینجا `Virtual Machine` قرار دهید،
یا نام موبایل، مانند `iPhone 7 Plus`.

#### `metadata.platform.name`
- **نوع:** `string`
- **مقادیر ممکن:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **نوع:** `string`

**به عنوان مثال:** نسخه پلتفرم

> اگر آبجکت `browser` را در متادیتا ارائه ندهید، این ماژول به طور خودکار آن را برای شما تعیین می‌کند. **همیشه آن را با جدیدترین مقداری که می‌تواند تعیین کند، جایگزین می‌کند.**

> اگر `device` و یا آبجکت `platform` را ارائه ندهید، به طور پیش‌فرض برای شما به `not known` تنظیم می‌شود.

> اگر `browser.name` یا `browser.version` را ارائه ندهید، ماژول سعی می‌کند به طور خودکار این را تعیین کند.

## پیوست
شما امکان اضافه کردن داده به فایل JSON را در تمام این قلاب‌ها / مراحل دارید:

- Before(All)
- After(All)
- Given
- When
- Then
- And

تنها چیزی که باید ارائه دهید کد زیر در فایل‌های مرحله‌ای شماست.

برای ES Modules (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// پیوست یک رشته (اگر نوع ارائه نشده باشد، به طور خودکار به `text/plain` تبدیل می‌شود)
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// پیوست JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// پیوست یک اسکرین‌شات در یک قلاب before
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
برای CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// پیوست یک رشته (اگر نوع ارائه نشده باشد، به طور خودکار به `text/plain` تبدیل می‌شود)
attach('just a string');
attach('just a second string', 'text/plain');

// پیوست JSON
attach({"json-string": true}, 'application/json');

// پیوست یک اسکرین‌شات در یک قلاب before
attach(await browser.takeScreenshot(), 'image/png');
```

## استفاده از آن با multiple-cucumber-html-reporter
ماژول قبلی برای WebdriverIO V4، [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter)،
یک ارتباط درون ساخت با ماژول [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) داشت. **این مورد برای این گزارشگر وجود ندارد**
زیرا تنظیمات جدید WebdriverIO V5 بر اساس یک نمونه است که به من اجازه نمی‌دهد از قلاب‌های `onPrepare` و `onComplete` استفاده کنم.

اگر هنوز می‌خواهید از ماژول [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) استفاده کنید، می‌توانید موارد زیر را به فایل پیکربندی خود اضافه کنید.

- ماژول را با این دستور نصب کنید

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- این را به فایل پیکربندی خود اضافه کنید

    ```js
    import fs from 'node:fs/promises'
    // وارد کردن ماژول
    import { generate } from 'multiple-cucumber-html-reporter'

    // مثال wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * یک بار قبل از راه‌اندازی همه کارگران اجرا می‌شود.
       */
      onPrepare: () => {
        // حذف پوشه `.tmp/` که فایل‌های json و گزارش را نگه می‌دارد
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * پس از خاموش شدن همه کارگران و قبل از خروج پروسه اجرا می‌شود.
       */
      onComplete: () => {
        // تولید گزارش وقتی همه تست‌ها انجام شد
        generate({
          // مورد نیاز
          // این بخش باید همان مسیری باشد که فایل‌های JSON را در آن ذخیره می‌کنید
          // پیش‌فرض = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // برای گزینه‌های بیشتر به https://github.com/wswebcreation/multiple-cucumber-html-reporter#options مراجعه کنید
        });
      }
    }
    ```

## نسخه‌های قدیمی WebdriverIO

> **این ماژول فقط می‌تواند با WebdriverIO V8+ کار کند!**\
> **برای V6 لطفا اسناد را [اینجا](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) بررسی کنید و از نسخه 2.0.4 استفاده کنید**\
> **برای V5 لطفا اسناد را [اینجا](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) بررسی کنید و از نسخه 1.3.0 استفاده کنید**

> **این ماژول جایگزینی برای [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter) نیست. آن ماژول فقط از WEBDRIVERIO V4 پشتیبانی می‌کند و همچنین یک گزارش ایجاد می‌کند. این ماژول فقط یک JSON ایجاد می‌کند، نه یک گزارش!!**
---
id: browserstack-service
title: سرویس براوزراستک
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---


> یک سرویس WebdriverIO که تونل محلی و متادیتای کار را برای کاربران BrowserStack مدیریت می‌کند.

## نصب


ساده‌ترین راه این است که `@wdio/browserstack-service` را به عنوان یک devDependency در `package.json` خود نگه دارید، از طریق:

```sh
npm install @wdio/browserstack-service --save-dev
```

دستورالعمل نحوه نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.


## پیکربندی

WebdriverIO به طور پیش‌فرض از BrowserStack پشتیبانی می‌کند. شما باید `user` و `key` را در فایل `wdio.conf.js` خود تنظیم کنید. این افزونه سرویس، پشتیبانی از [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing) را فراهم می‌کند. برای فعال کردن این ویژگی، `browserstackLocal: true` را نیز تنظیم کنید.
گزارش وضعیت جلسه در BrowserStack، تنظیم `strict` گزینه‌های Cucumber را رعایت خواهد کرد.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## گزینه‌ها

برای احراز هویت در سرویس BrowserStack، پیکربندی شما باید شامل گزینه‌های [`user`](https://webdriver.io/docs/options#user) و [`key`](https://webdriver.io/docs/options#key) باشد.

### testObservability

Test Observability یک ابزار گزارش‌دهی پیشرفته آزمون است که بینشی برای بهبود آزمون‌های خودکار شما ارائه می‌دهد و به شما کمک می‌کند تا سریع‌تر اشکال‌زدایی کنید. این ویژگی به طور پیش‌فرض با تنظیم پرچم `testObservability` به `true` برای همه کاربران browserstack-service فعال است. می‌توانید با تنظیم پرچم `testObservability` به `false` آن را غیرفعال کنید.

پس از اتمام اجرای آزمون‌های شما، می‌توانید به [Test Observability](https://observability.browserstack.com/) مراجعه کنید تا با بینش‌های اضافی مانند تحلیل خطای منحصر به فرد، تشخیص خودکار آزمون‌های ناپایدار و موارد دیگر، بیلدهای خود را اشکال‌زدایی کنید.

حتی اگر آزمون‌های خود را روی زیرساخت BrowserStack اجرا نکنید، می‌توانید از Test Observability استفاده کنید. حتی اگر آزمون‌های خود را روی CI، یک ماشین محلی، یا حتی روی سایر ارائه‌دهندگان سرویس ابری اجرا کنید، Test Observability همچنان می‌تواند گزارش‌های آزمون هوشمند و تحلیل‌های پیشرفته روی آزمون‌های شما ایجاد کند.

اگر می‌خواهید بدون اجرای آزمون‌های خود روی زیرساخت BrowserStack از Test Observability استفاده کنید، می‌توانید پیکربندی خود را به صورت زیر تنظیم کنید:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

می‌توانید تمام ویژگی‌های Test Observability را در [این محیط آزمایشی](https://observability-demo.browserstack.com/) بررسی کنید یا درباره آن [اینجا](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability) بیشتر بخوانید.

### browserstackLocal
این گزینه را به `true` تنظیم کنید تا اتصالات از BrowserStack cloud از طریق کامپیوتر شما مسیریابی شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### forcedStop
این گزینه را به `true` تنظیم کنید تا فرآیند BrowserStack Local در هنگام تکمیل، بدون انتظار برای فراخوانی callback توقف BrowserStack Local، متوقف شود. این تجربی است و نباید توسط همه استفاده شود. عمدتاً به عنوان یک راه حل برای [این مشکل](https://github.com/browserstack/browserstack-local-nodejs/issues/41) ضروری است.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### app

[Appium](https://appium.io/) این را با مسیر فایل برنامه که به صورت محلی روی دستگاه شما در دسترس است تنظیم کنید تا از برنامه به عنوان [برنامه تحت آزمون](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) برای جلسات Appium استفاده کنید.

نوع: `String` یا `JsonObject`<br />
پیش‌فرض: `undefined`

لیست مقادیر app قابل دسترس:

#### path
از مسیر فایل برنامه محلی به عنوان برنامه تحت آزمون برای Appium استفاده کنید.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OR
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

custom_id را هنگام آپلود برنامه ارسال کنید.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
از URL برنامه که پس از آپلود برنامه به BrowserStack برگردانده شده استفاده کنید.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OR
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

از custom_id برنامه‌های از قبل آپلود شده استفاده کنید

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OR
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

از shareable_id برنامه‌های از قبل آپلود شده استفاده کنید

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OR
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

فقط برای Cucumber. نام جلسه BrowserStack Automate را به نام سناریو تنظیم کنید اگر فقط یک سناریو اجرا شده باشد.
هنگام اجرای موازی با [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution) مفید است.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### sessionNameFormat

فرمت نام جلسه BrowserStack Automate را سفارشی کنید.

نوع: `Function`<br />
پیش‌فرض (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
پیش‌فرض (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

فقط برای Mocha. عنوان آزمون را به نام جلسه BrowserStack Automate اضافه نکنید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### sessionNamePrependTopLevelSuiteTitle

فقط برای Mocha. عنوان سوئیت سطح بالا را به نام جلسه BrowserStack Automate اضافه کنید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### setSessionName

به طور خودکار نام جلسه BrowserStack Automate را تنظیم کنید.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### setSessionStatus

به طور خودکار وضعیت جلسه BrowserStack Automate را تنظیم کنید (موفق/ناموفق).

نوع: `Boolean`<br />
پیش‌فرض: `true`

### buildIdentifier

**buildIdentifier** یک شناسه منحصر به فرد است که برای تمایز هر اجرا به buildName اضافه می‌شود. فرمت buildIdentifier خود را از عبارات موجود انتخاب کنید:
* `BUILD_NUMBER`: با هر اجرا یک شمارنده افزایشی ایجاد می‌کند
* `DATE_TIME`: با هر اجرا یک Timestamp ایجاد می‌کند. مانند 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier استفاده از یکی یا هر دو عبارت را همراه با هر کاراکتر دیگری پشتیبانی می‌کند که گزینه‌های قالب‌بندی سفارشی را فعال می‌کند.

### opts

گزینه‌های BrowserStack Local.

نوع: `Object`<br />
پیش‌فرض: `{}`

لیست تغییردهنده‌های تست محلی موجود که باید به عنوان opts ارسال شوند:

#### Local Identifier

اگر اتصالات تست محلی چندگانه همزمان انجام می‌دهید، این را برای فرآیندهای مختلف به صورت منحصر به فرد تنظیم کنید -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

برای فعال کردن ثبت گزارش‌های مفصل -

```js
opts = { verbose: "true" };
```

توجه - مقادیر ممکن برای تغییردهنده 'verbose' '1'، '2'، '3' و 'true' هستند

#### Force Local

برای هدایت تمام ترافیک از طریق ماشین محلی (خودتان) -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

برای آزمایش پوشه محلی به جای سرور داخلی، مسیر پوشه را به عنوان مقدار این گزینه ارائه دهید -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

برای کشتن سایر نمونه‌های BrowserStack Local در حال اجرا -

```js
opts = { force: "true" };
```

#### Only Automate

برای غیرفعال کردن تست محلی برای Live و Screenshots، و فعال کردن فقط Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

برای استفاده از پروکسی برای تست محلی -

- proxyHost: نام میزبان/IP پروکسی، سایر گزینه‌های پروکسی در صورت عدم وجود این گزینه نادیده گرفته می‌شوند
- proxyPort: پورت برای پروکسی، در صورت استفاده از -proxyHost به طور پیش‌فرض 3128 است
- proxyUser: نام کاربری برای اتصال به پروکسی (فقط احراز هویت پایه)
- proxyPass: رمز عبور برای USERNAME، اگر USERNAME خالی باشد یا مشخص نشده باشد نادیده گرفته می‌شود

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

برای استفاده از پروکسی محلی در تست محلی -

- localProxyHost: نام میزبان/IP پروکسی، سایر گزینه‌های پروکسی در صورت عدم وجود این گزینه نادیده گرفته می‌شوند
- localProxyPort: پورت برای پروکسی، در صورت استفاده از -localProxyHost به طور پیش‌فرض 8081 است
- localProxyUser: نام کاربری برای اتصال به پروکسی (فقط احراز هویت پایه)
- localProxyPass: رمز عبور برای USERNAME، اگر USERNAME خالی باشد یا مشخص نشده باشد نادیده گرفته می‌شود

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

برای استفاده از PAC (تنظیم خودکار پروکسی) در تست محلی -

- pac-file: مسیر مطلق فایل PAC (تنظیم خودکار پروکسی)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

به طور پیش‌فرض، رپرهای محلی BrowserStack سعی می‌کنند آخرین نسخه باینری BrowserStack را در ~/.browserstack یا دایرکتوری کاری فعلی یا پوشه tmp به ترتیب دانلود و اجرا کنند. اما می‌توانید این‌ها را با ارسال آرگومان -binarypath نادیده بگیرید.
مسیر برای تعیین مسیر باینری محلی -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

برای ذخیره گزارش‌ها در فایل هنگام اجرا با آرگومان '-v'، می‌توانید مسیر فایل را مشخص کنید. به طور پیش‌فرض گزارش‌ها در فایل local.log در دایرکتوری کاری فعلی ذخیره می‌شوند.
برای تعیین مسیر فایلی که گزارش‌ها در آن ذخیره می‌شوند -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.
---
id: configuration
title: پیکربندی
---

بر اساس [نوع راه اندازی](/docs/setuptypes) (به عنوان مثال استفاده از پروتکل خام، WebdriverIO به عنوان بسته مستقل یا WDIO testrunner) مجموعه‌ای از گزینه‌های مختلف برای کنترل محیط در دسترس است.

## گزینه‌های WebDriver

گزینه‌های زیر هنگام استفاده از بسته پروتکل [`webdriver`](https://www.npmjs.com/package/webdriver) تعریف شده‌اند:

### protocol

پروتکل مورد استفاده هنگام برقراری ارتباط با سرور درایور.

نوع: `String`<br />
پیش‌فرض: `http`

### hostname

میزبان سرور درایور شما.

نوع: `String`<br />
پیش‌فرض: `0.0.0.0`

### port

پورتی که سرور درایور شما روی آن قرار دارد.

نوع: `Number`<br />
پیش‌فرض: `undefined`

### path

مسیر به نقطه پایانی سرور درایور.

نوع: `String`<br />
پیش‌فرض: `/`

### queryParams

پارامترهای پرس‌وجو که به سرور درایور ارسال می‌شوند.

نوع: `Object`<br />
پیش‌فرض: `undefined`

### user

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابر استفاده نمی‌کنید، می‌توانید از این گزینه برای احراز هویت هر بک‌اند WebDriver دیگری استفاده کنید.

نوع: `String`<br />
پیش‌فرض: `undefined`

### key

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابر استفاده نمی‌کنید، می‌توانید از این گزینه برای احراز هویت هر بک‌اند WebDriver دیگری استفاده کنید.

نوع: `String`<br />
پیش‌فرض: `undefined`

### capabilities

قابلیت‌هایی را که می‌خواهید در جلسه WebDriver خود اجرا کنید تعریف می‌کند. برای جزئیات بیشتر [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را بررسی کنید. اگر درایور قدیمی‌تری را اجرا می‌کنید که از پروتکل WebDriver پشتیبانی نمی‌کند، برای اجرای موفقیت‌آمیز یک جلسه، باید از [قابلیت‌های JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) استفاده کنید.

در کنار قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های مختص به مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر یا دستگاه راه دور را فراهم می‌کنند. این گزینه‌ها در مستندات فروشنده مربوطه ثبت شده‌اند، به عنوان مثال:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، یک ابزار مفید، [پیکربندی‌کننده خودکار تست](https://docs.saucelabs.com/basics/platform-configurator/) Sauce Labs است که به شما کمک می‌کند با کلیک کردن روی قابلیت‌های مورد نظرتان، این شیء را ایجاد کنید.

نوع: `Object`<br />
پیش‌فرض: `null`

**مثال:**

```js
{
    browserName: 'chrome', // گزینه‌ها: `chrome`، `edge`، `firefox`، `safari`
    browserVersion: '27.0', // نسخه مرورگر
    platformName: 'Windows 10' // پلتفرم سیستم عامل
}
```

اگر تست‌های وب یا بومی را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver متفاوت است. برای جزئیات بیشتر به [مستندات Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) مراجعه کنید.

### logLevel

سطح ثبت گزارش.

نوع: `String`<br />
پیش‌فرض: `info`<br />
گزینه‌ها: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دایرکتوری برای ذخیره تمام فایل‌های گزارش testrunner (شامل گزارش‌های reporter و گزارش‌های `wdio`). اگر تنظیم نشده باشد، تمام گزارش‌ها به `stdout` ارسال می‌شوند. از آنجایی که اکثر گزارش‌دهنده‌ها برای ارسال گزارش به `stdout` ساخته شده‌اند، توصیه می‌شود فقط از این گزینه برای گزارش‌دهنده‌های خاصی استفاده کنید که منطقی‌تر است گزارش را به یک فایل ارسال کنند (مانند گزارش‌دهنده `junit`).

هنگام اجرا در حالت مستقل، تنها گزارشی که توسط WebdriverIO ایجاد می‌شود، گزارش `wdio` خواهد بود.

نوع: `String`<br />
پیش‌فرض: `null`

### connectionRetryTimeout

زمان انتظار برای هر درخواست WebDriver به درایور یا گرید.

نوع: `Number`<br />
پیش‌فرض: `120000`

### connectionRetryCount

حداکثر تعداد تلاش‌های مجدد درخواست به سرور Selenium.

نوع: `Number`<br />
پیش‌فرض: `3`

### agent

به شما امکان می‌دهد از یک [agent](https://www.npmjs.com/package/got#agent) سفارشی `http`/`https`/`http2` برای ارسال درخواست‌ها استفاده کنید.

نوع: `Object`<br />
پیش‌فرض:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

`headers` سفارشی برای ارسال در هر درخواست WebDriver مشخص می‌کند. اگر گرید Selenium شما نیاز به احراز هویت پایه دارد، ما توصیه می‌کنیم یک هدر `Authorization` را از طریق این گزینه برای احراز هویت درخواست‌های WebDriver خود ارسال کنید، به عنوان مثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// خواندن نام کاربری و رمز عبور از متغیرهای محیطی
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ترکیب نام کاربری و رمز عبور با جداکننده دو نقطه
const credentials = `${username}:${password}`;
// رمزگذاری اعتبارنامه‌ها با استفاده از Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

نوع: `Object`<br />
پیش‌فرض: `{}`

### transformRequest

تابعی که [گزینه‌های درخواست HTTP](https://github.com/sindresorhus/got#options) را قبل از ارسال درخواست WebDriver رهگیری می‌کند.

نوع: `(RequestOptions) => RequestOptions`<br />
پیش‌فرض: *هیچ*

### transformResponse

تابعی که اشیاء پاسخ HTTP را پس از دریافت پاسخ WebDriver رهگیری می‌کند. این تابع، شیء پاسخ اصلی را به عنوان آرگومان اول و `RequestOptions` مربوطه را به عنوان آرگومان دوم دریافت می‌کند.

نوع: `(Response, RequestOptions) => Response`<br />
پیش‌فرض: *هیچ*

### strictSSL

آیا نیازی به معتبر بودن گواهی SSL دارد یا خیر.
می‌تواند از طریق متغیرهای محیطی مانند `STRICT_SSL` یا `strict_ssl` تنظیم شود.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### enableDirectConnect

آیا [ویژگی اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود یا خیر.
اگر پاسخ حاوی کلیدهای مناسب نباشد در حالی که پرچم فعال است، هیچ کاری انجام نمی‌دهد.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### cacheDir

مسیر به ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `String`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

گزینه‌های زیر (از جمله گزینه‌های ذکر شده در بالا) می‌توانند با WebdriverIO به صورت مستقل استفاده شوند:

### automationProtocol

پروتکلی را که می‌خواهید برای اتوماسیون مرورگر خود استفاده کنید تعریف کنید. در حال حاضر فقط [`webdriver`](https://www.npmjs.com/package/webdriver) پشتیبانی می‌شود، زیرا این فناوری اصلی اتوماسیون مرورگر است که WebdriverIO از آن استفاده می‌کند.

اگر می‌خواهید مرورگر را با استفاده از فناوری اتوماسیون متفاوتی خودکار کنید، مطمئن شوید که این ویژگی را به مسیری تنظیم کنید که به یک ماژول با واسط زیر منتهی شود:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * شروع یک جلسه اتوماسیون و بازگرداندن یک [مونادWebdriverIO](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * با دستورات اتوماسیون مربوطه. از بسته [webdriver](https://www.npmjs.com/package/webdriver)
     * به عنوان یک پیاده‌سازی مرجع استفاده کنید
     *
     * @param {Capabilities.RemoteConfig} options گزینه‌های WebdriverIO
     * @param {Function} hook که اجازه می‌دهد کلاینت را قبل از آزاد شدن از تابع تغییر دهید
     * @param {PropertyDescriptorMap} userPrototype به کاربر اجازه می‌دهد دستورات پروتکل سفارشی اضافه کند
     * @param {Function} customCommandWrapper اجازه می‌دهد اجرای دستور را تغییر دهید
     * @returns یک نمونه کلاینت سازگار با WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * به کاربر اجازه می‌دهد به جلسات موجود متصل شود
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * شناسه جلسه نمونه و قابلیت‌های مرورگر را برای جلسه جدید
     * مستقیماً در شیء مرورگر ارسال شده تغییر می‌دهد
     *
     * @optional
     * @param   {object} instance  شیئی که از یک جلسه مرورگر جدید دریافت می‌کنیم.
     * @returns {string}           شناسه جلسه جدید مرورگر
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

نوع: `String`<br />
پیش‌فرض: `webdriver`

### baseUrl

فراخوانی‌های دستور `url` را با تنظیم یک URL پایه کوتاه کنید.
- اگر پارامتر `url` شما با `/` شروع شود، `baseUrl` در ابتدای آن قرار می‌گیرد (به جز مسیر `baseUrl`، اگر داشته باشد).
- اگر پارامتر `url` شما بدون یک طرح یا `/` شروع شود (مانند `some/path`)، `baseUrl` کامل مستقیماً در ابتدای آن قرار می‌گیرد.

نوع: `String`<br />
پیش‌فرض: `null`

### waitforTimeout

زمان انتظار پیش‌فرض برای تمام دستورات `waitFor*`. (توجه داشته باشید که `f` در نام گزینه کوچک است.) این زمان انتظار __فقط__ بر دستوراتی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آنها تأثیر می‌گذارد.

برای افزایش زمان انتظار برای یک _تست_، لطفاً به مستندات فریم‌ورک مراجعه کنید.

نوع: `Number`<br />
پیش‌فرض: `5000`

### waitforInterval

فاصله پیش‌فرض برای تمام دستورات `waitFor*` برای بررسی اینکه آیا یک وضعیت مورد انتظار (مانند قابلیت دید) تغییر کرده است.

نوع: `Number`<br />
پیش‌فرض: `100`

### region

اگر روی Sauce Labs اجرا می‌کنید، می‌توانید تست‌ها را بین مراکز داده مختلف اجرا کنید: آمریکا یا اروپا.
برای تغییر منطقه خود به اروپا، `region: 'eu'` را به پیکربندی خود اضافه کنید.

__توجه:__ این فقط در صورتی تأثیر می‌گذارد که گزینه‌های `user` و `key` را که به حساب Sauce Labs شما متصل هستند، ارائه دهید.

نوع: `String`<br />
پیش‌فرض: `us`

*(فقط برای vm و یا em/شبیه‌سازها)*

---

## گزینه‌های Testrunner

گزینه‌های زیر (از جمله گزینه‌های ذکر شده در بالا) فقط برای اجرای WebdriverIO با WDIO testrunner تعریف شده‌اند:

### specs

مشخصات را برای اجرای تست تعریف کنید. می‌توانید یک الگوی glob برای تطبیق چندین فایل به صورت همزمان تعیین کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا آنها را در یک فرآیند کارگر واحد اجرا کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `(String | String[])[]`<br />
پیش‌فرض: `[]`

### exclude

مشخصات را از اجرای تست حذف کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### suites

شیئی که مجموعه‌های مختلف را توصیف می‌کند، که می‌توانید آنها را با گزینه `--suite` در خط فرمان `wdio` مشخص کنید.

نوع: `Object`<br />
پیش‌فرض: `{}`

### capabilities

مشابه بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که گزینه‌ای برای مشخص کردن یک شیء [`multiremote`](/docs/multiremote) یا چندین جلسه WebDriver در یک آرایه برای اجرای موازی وجود دارد.

شما می‌توانید همان قابلیت‌های خاص فروشنده و مرورگر را که [در بالا](/docs/configuration#capabilities) تعریف شده‌اند اعمال کنید.

نوع: `Object`|`Object[]`<br />
پیش‌فرض: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

حداکثر تعداد کل کارگران موازی.

__توجه:__ ممکن است این عدد به اندازه `100` باشد، زمانی که تست‌ها روی برخی فروشندگان خارجی مانند ماشین‌های Sauce Labs انجام می‌شوند. در آنجا، تست‌ها روی یک ماشین واحد آزمایش نمی‌شوند، بلکه روی چندین ماشین مجازی. اگر تست‌ها قرار است روی یک ماشین توسعه محلی اجرا شوند، از عددی منطقی‌تر مانند `3`، `4` یا `5` استفاده کنید. اساساً، این تعداد مرورگرهایی است که به طور همزمان راه‌اندازی می‌شوند و تست‌های شما را همزمان اجرا می‌کنند، بنابراین بستگی به این دارد که چقدر RAM در ماشین شما وجود دارد و چه تعداد برنامه دیگر روی ماشین شما در حال اجرا هستند.

همچنین می‌توانید `maxInstances` را در داخل اشیاء قابلیت خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این کار تعداد جلسات موازی را برای آن قابلیت خاص محدود می‌کند.

نوع: `Number`<br />
پیش‌فرض: `100`

### maxInstancesPerCapability

حداکثر تعداد کل کارگران موازی در حال اجرا برای هر قابلیت.

نوع: `Number`<br />
پیش‌فرض: `100`

### injectGlobals

متغیرهای جهانی WebdriverIO (مانند `browser`، `$` و `$$`) را در محیط جهانی قرار می‌دهد.
اگر آن را `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید، به عنوان مثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

توجه: WebdriverIO تزریق متغیرهای جهانی مخصوص فریم‌ورک تست را مدیریت نمی‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### bail

اگر می‌خواهید اجرای تست پس از تعداد مشخصی از شکست‌های تست متوقف شود، از `bail` استفاده کنید.
(پیش‌فرض آن `0` است، که به معنای اجرای همه تست‌ها است.) **توجه:** یک تست در این زمینه تمام تست‌های درون یک فایل مشخصات واحد (هنگام استفاده از Mocha یا Jasmine) یا تمام مراحل درون یک فایل ویژگی (هنگام استفاده از Cucumber) است. اگر می‌خواهید رفتار bail را در تست‌های یک فایل تست واحد کنترل کنید، به گزینه‌های موجود [فریم‌ورک](frameworks) نگاهی بیندازید.

نوع: `Number`<br />
پیش‌فرض: `0` (توقف نکن؛ همه تست‌ها را اجرا کن)

### specFileRetries

تعداد دفعاتی که یک فایل مشخصات کامل را هنگام شکست به عنوان یک کل تکرار می‌کند.

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDelay

تأخیر به ثانیه بین تلاش‌های تکرار فایل مشخصات

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDeferred

آیا فایل‌های مشخصات تکرار شده باید بلافاصله تکرار شوند یا به انتهای صف موکول شوند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### groupLogsByTestSpec

نمای خروجی گزارش را انتخاب کنید.

اگر `false` تنظیم شود، گزارش‌ها از فایل‌های تست مختلف در زمان واقعی چاپ می‌شوند. لطفاً توجه داشته باشید که در صورت اجرای موازی، ممکن است خروجی‌های گزارش از فایل‌های مختلف با هم مخلوط شوند.

اگر `true` تنظیم شود، خروجی‌های گزارش بر اساس فایل تست گروه‌بندی می‌شوند و فقط زمانی چاپ می‌شوند که آن فایل تست تکمیل شده باشد.

به طور پیش‌فرض، این گزینه `false` تنظیم شده است، بنابراین گزارش‌ها در زمان واقعی چاپ می‌شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### services

سرویس‌ها وظیفه خاصی را که نمی‌خواهید به آن رسیدگی کنید، بر عهده می‌گیرند. آنها با حداقل تلاش، تنظیمات تست شما را بهبود می‌بخشند.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

### framework

چارچوب تستی را که توسط WDIO testrunner استفاده می‌شود، تعریف می‌کند.

نوع: `String`<br />
پیش‌فرض: `mocha`<br />
گزینه‌ها: `mocha` | `jasmine`

### mochaOpts, jasmineOpts و cucumberOpts

گزینه‌های خاص مربوط به فریم‌ورک. در مستندات آداپتور فریم‌ورک مشخص شده که کدام گزینه‌ها در دسترس هستند. در [Frameworks](frameworks) بیشتر در مورد این موضوع بخوانید.

نوع: `Object`<br />
پیش‌فرض: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

لیست ویژگی‌های خیار با شماره خط (هنگام [استفاده از فریم‌ورک cucumber](./Frameworks.md#using-cucumber)).

نوع: `String[]`
پیش‌فرض: `[]`

### reporters

لیست گزارش‌دهنده‌ها برای استفاده. یک گزارش‌دهنده می‌تواند یا یک رشته باشد، یا آرایه‌ای از
`['reporterName', { /* reporter options */}]` که عنصر اول یک رشته با نام گزارش‌دهنده و عنصر دوم یک شیء با گزینه‌های گزارش‌دهنده است.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

مثال:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

مشخص می‌کند که در چه فاصله زمانی گزارش‌دهنده باید بررسی کند که آیا همگام‌سازی شده‌اند، اگر گزارش‌های خود را به صورت ناهمگام گزارش می‌دهند (به عنوان مثال، اگر گزارش‌ها به یک فروشنده ثالث ارسال می‌شوند).

نوع: `Number`<br />
پیش‌فرض: `100` (میلی‌ثانیه)

### reporterSyncTimeout

حداکثر زمانی را تعیین می‌کند که گزارش‌دهنده‌ها برای اتمام آپلود همه گزارش‌های خود دارند تا زمانی که یک خطا توسط testrunner ایجاد شود.

نوع: `Number`<br />
پیش‌فرض: `5000` (میلی‌ثانیه)

### execArgv

آرگومان‌های Node برای مشخص کردن هنگام راه‌اندازی پروسه‌های فرزند.

نوع: `String[]`<br />
پیش‌فرض: `null`

### filesToWatch

لیستی از الگوهای رشته‌ای که از glob پشتیبانی می‌کنند و به testrunner می‌گویند که هنگام اجرا با پرچم `--watch`، فایل‌های دیگری را نیز تحت نظر داشته باشد، مانند فایل‌های برنامه. به طور پیش‌فرض، testrunner از قبل تمام فایل‌های مشخصات را تحت نظر دارد.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### updateSnapshots

اگر می‌خواهید snapshots خود را به‌روزرسانی کنید، روی true تنظیم کنید. ایده‌آل است که به عنوان بخشی از یک پارامتر CLI استفاده شود، به عنوان مثال `wdio run wdio.conf.js --s`.

نوع: `'new' | 'all' | 'none'`<br />
پیش‌فرض: `none` اگر ارائه نشده و تست‌ها در CI اجرا شوند، `new` اگر ارائه نشده، در غیر این صورت آنچه ارائه شده است

### resolveSnapshotPath

مسیر پیش‌فرض snapshot را لغو می‌کند. به عنوان مثال، برای ذخیره snapshots در کنار فایل‌های تست.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

نوع: `(testPath: string, snapExtension: string) => string`<br />
پیش‌فرض: فایل‌های snapshot را در دایرکتوری `__snapshots__` در کنار فایل تست ذخیره می‌کند

### tsConfigPath

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود، اما می‌توانید یک مسیر سفارشی را در اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

مستندات `tsx` را ببینید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

نوع: `String`<br />
پیش‌فرض: `null`<br />

## هوک‌ها

WDIO testrunner به شما امکان می‌دهد هوک‌هایی را تنظیم کنید که در زمان‌های خاصی از چرخه عمر تست فراخوانی شوند. این امکان اقدامات سفارشی را فراهم می‌کند (به عنوان مثال، گرفتن عکس در صورت شکست تست).

هر هوک به عنوان پارامتر، اطلاعات خاصی در مورد چرخه عمر دارد (به عنوان مثال، اطلاعات در مورد مجموعه تست یا تست). در مورد تمام ویژگی‌های هوک در [مثال پیکربندی ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) بیشتر بخوانید.

**توجه:** برخی هوک‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در یک فرآیند متفاوت اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده جهانی را با سایر هوک‌هایی که در فرآیند کارگر قرار دارند به اشتراک بگذارند.

### onPrepare

یک بار قبل از راه‌اندازی تمام کارگران اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): لیست جزئیات قابلیت‌ها

### onWorkerStart

قبل از ایجاد یک فرآیند کارگر اجرا می‌شود و می‌تواند برای راه‌اندازی سرویس خاص برای آن کارگر و همچنین تغییر محیط‌های اجرایی به صورت ناهمگام استفاده شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `args` (`object`): شیئی که پس از راه‌اندازی کارگر با پیکربندی اصلی ادغام می‌شود
- `execArgv` (`string[]`): لیست آرگومان‌های رشته‌ای که به فرآیند کارگر ارسال می‌شوند

### onWorkerEnd

درست پس از خروج یک فرآیند کارگر اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح مشخصات که همانطور که در [_"افزودن تلاش‌های مجدد بر اساس هر فایل مشخصات"_](./Retry.md#add-retries-on-a-per-specfile-basis) تعریف شده‌اند

### beforeSession

درست قبل از راه‌اندازی جلسه webdriver و چارچوب تست اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را بر اساس قابلیت یا مشخصات دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### before

قبل از شروع اجرای تست اجرا می‌شود. در این نقطه می‌توانید به تمام متغیرهای جهانی مانند `browser` دسترسی داشته باشید. این مکان مناسبی برای تعریف دستورات سفارشی است.

پارامترها:

- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `browser` (`object`): نمونه‌ای از جلسه مرورگر/دستگاه ایجاد شده

### beforeSuite

هوکی که قبل از شروع مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### beforeHook

هوکی که *قبل* از یک هوک درون مجموعه اجرا می‌شود (به عنوان مثال، قبل از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): زمینه تست (نماینده شیء World در Cucumber)

### afterHook

هوکی که *بعد* از یک هوک درون مجموعه اجرا می‌شود (به عنوان مثال، بعد از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): زمینه تست (نماینده شیء World در Cucumber)
- `result` (`object`): نتیجه هوک (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### beforeTest

تابعی که قبل از یک تست اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء دامنه‌ای که تست با آن اجرا شده است

### beforeCommand

قبل از اجرای یک دستور WebdriverIO اجرا می‌شود.

پارامترها:

- `commandName` (`string`): نام دستور
- `args` (`*`): آرگومان‌هایی که دستور دریافت می‌کند

### afterCommand

پس از اجرای یک دستور WebdriverIO اجرا می‌شود.

پارامترها:

- `commandName` (`string`): نام دستور
- `args` (`*`): آرگومان‌هایی که دستور دریافت می‌کند
- `result` (`number`): 0 - موفقیت دستور، 1 - خطای دستور
- `error` (`Error`): شیء خطا در صورت وجود

### afterTest

تابعی که پس از پایان یک تست (در Mocha/Jasmine) اجرا می‌شود.

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء دامنه‌ای که تست با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست تست، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع تست
- `result.duration` (`Number`): مدت زمان تست
- `result.passed` (`Boolean`): true اگر تست قبول شده باشد، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات در مورد تلاش‌های مجدد مربوط به تست واحد همانطور که برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber) تعریف شده است، مثلاً `{ attempts: 0, limit: 0 }`، مراجعه کنید به
- `result` (`object`): نتیجه هوک (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### afterSuite

هوکی که پس از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### after

پس از انجام تمام تست‌ها اجرا می‌شود. شما هنوز به تمام متغیرهای جهانی از تست دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - قبولی تست، 1 - شکست تست
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### afterSession

درست پس از پایان جلسه webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### onComplete

پس از خاموش شدن تمام کارگران و قبل از خروج فرآیند اجرا می‌شود. خطایی که در هوک onComplete پرتاب شود منجر به شکست اجرای تست می‌شود.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد می‌شود
- `result` (`object`): شیء نتایج حاوی نتایج تست

### onReload

هنگام رخ دادن یک بارگذاری مجدد اجرا می‌شود.

پارامترها:

- `oldSessionId` (`string`): شناسه جلسه قدیمی
- `newSessionId` (`string`): شناسه جلسه جدید

### beforeFeature

قبل از یک ویژگی Cucumber اجرا می‌شود.

پارامترها:

- `uri` (`string`): مسیر به فایل ویژگی
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): شیء ویژگی Cucumber

### afterFeature

پس از یک ویژگی Cucumber اجرا می‌شود.

پارامترها:

- `uri` (`string`): مسیر به فایل ویژگی
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): شیء ویژگی Cucumber

### beforeScenario

قبل از یک سناریوی Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world حاوی اطلاعاتی در مورد pickle و مرحله تست
- `context` (`object`): شیء Cucumber World

### afterScenario

پس از یک سناریوی Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world حاوی اطلاعاتی در مورد pickle و مرحله تست
- `result` (`object`): شیء نتایج حاوی نتایج سناریو
- `result.passed` (`boolean`): true اگر سناریو قبول شده باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
- `context` (`object`): شیء Cucumber World

### beforeStep

قبل از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریوی Cucumber
- `context` (`object`): شیء Cucumber World

### afterStep

پس از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریوی Cucumber
- `result`: (`object`): شیء نتایج حاوی نتایج مرحله
- `result.passed` (`boolean`): true اگر سناریو قبول شده باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
- `context` (`object`): شیء Cucumber World

### beforeAssertion

هوکی که قبل از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام مطابقت‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به مطابقت‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تأیید

### afterAssertion

هوکی که پس از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام مطابقت‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به مطابقت‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تأیید
- `params.result`: نتایج تأیید
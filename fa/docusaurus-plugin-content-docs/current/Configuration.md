---
id: configuration
title: پیکربندی
description: "همه‌ی گزینه‌های پیکربندی WebDriver، WebdriverIO مستقل و WDIO testrunner، از جمله همه‌ی هوک‌های testrunner را در اینجا ببینید."
---

بسته به [نوع راه‌اندازی](/docs/setuptypes) (مثلاً استفاده از اتصال‌های خام پروتکل، WebdriverIO به‌عنوان بسته‌ی مستقل یا WDIO testrunner)، مجموعه‌ی متفاوتی از گزینه‌ها برای کنترل محیط در دسترس است.

## گزینه‌های WebDriver

گزینه‌های زیر هنگام استفاده از بسته‌ی پروتکل [`webdriver`](https://www.npmjs.com/package/webdriver) تعریف می‌شوند:

### protocol

<Option type="String" default="http">

پروتکلی که برای ارتباط با سرور درایور استفاده می‌شود.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

میزبان (host) سرور درایور شما.

</Option>

### port

<Option type="Number" default="undefined">

پورتی که سرور درایور شما روی آن اجرا می‌شود.

</Option>

### path

<Option type="String" default="/">

مسیر endpoint سرور درایور.

</Option>

### queryParams

<Option type="Object" default="undefined">

پارامترهای کوئری که به سرور درایور ارسال می‌شوند.

</Option>

### user

<Option type="String" default="undefined">

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [TestMu AI](https://www.testmuai.com/) کار می‌کند). اگر تنظیم شود، WebdriverIO به‌طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از ارائه‌دهنده‌ی ابری استفاده نمی‌کنید، می‌توان از این گزینه برای احراز هویت در هر بک‌اند WebDriver دیگری استفاده کرد.

</Option>

### key

<Option type="String" default="undefined">

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [TestMu AI](https://www.testmuai.com/) کار می‌کند). اگر تنظیم شود، WebdriverIO به‌طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از ارائه‌دهنده‌ی ابری استفاده نمی‌کنید، می‌توان از این گزینه برای احراز هویت در هر بک‌اند WebDriver دیگری استفاده کرد.

</Option>

### capabilities

<Option type="Object" default="null">

قابلیت‌هایی (capabilities) را که می‌خواهید در نشست WebDriver خود اجرا کنید تعریف می‌کند. برای جزئیات بیشتر [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را ببینید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های خاص مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر یا دستگاه راه دور را فراهم می‌کنند. این گزینه‌ها در مستندات فروشنده‌ی مربوطه توضیح داده شده‌اند، برای مثال:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، ابزار مفیدی به نام [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) از Sauce Labs وجود دارد که با کلیک روی قابلیت‌های دلخواهتان، به شما در ساخت این شیء کمک می‌کند.

</Option>
**مثال:**

```js
{
    browserName: 'chrome', // گزینه‌ها: `chrome`، `edge`، `firefox`، `safari`
    browserVersion: '27.0', // نسخه‌ی مرورگر
    platformName: 'Windows 10' // پلتفرم سیستم‌عامل
}
```

اگر تست‌های وب یا نیتیو را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver متفاوت است. برای جزئیات بیشتر [مستندات Appium](https://appium.io/docs/en/latest/guides/caps/) را ببینید.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

سطح جزئیات لاگ‌ها.

</Option>

### outputDir

<Option type="String" default="null">

دایرکتوری برای ذخیره‌ی همه‌ی فایل‌های لاگ testrunner (شامل لاگ‌های گزارشگرها و لاگ‌های `wdio`). اگر تنظیم نشود، همه‌ی لاگ‌ها به `stdout` ارسال می‌شوند. از آنجا که بیشتر گزارشگرها برای لاگ کردن در `stdout` ساخته شده‌اند، توصیه می‌شود این گزینه فقط برای گزارشگرهای خاصی استفاده شود که ارسال گزارش به یک فایل برایشان منطقی‌تر است (مثلاً گزارشگر `junit`).

هنگام اجرا در حالت مستقل، تنها لاگی که WebdriverIO تولید می‌کند لاگ `wdio` خواهد بود.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

مهلت زمانی (timeout) برای هر درخواست WebDriver به یک درایور یا grid.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

حداکثر تعداد تلاش مجدد درخواست‌ها به سرور Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

مهلت زمانی (بر حسب میلی‌ثانیه) برای دریافت پاسخ یک فرمان WebDriver Bidi از مرورگر. اگر فرمان‌هایی مانند [`execute`](/docs/api/browser/execute) اجرا می‌کنید که به‌طور مشروع بیش از مقدار پیش‌فرض طول می‌کشند، این مقدار را افزایش دهید، در غیر این صورت WebdriverIO پیش از اتمام کار مرورگر از انتظار دست می‌کشد.

`execute` همچنین در مهلت `script` نشست (به‌طور پیش‌فرض ۳۰ ثانیه، [`setTimeout`](/docs/api/browser/setTimeout) را ببینید) متوقف می‌شود. برای مهلت `script` طولانی‌تر از `bidiResponseTimeout`، هر دو را افزایش دهید.

</Option>

### bidiConnectTimeout

<Option type="Number" default="10000">

مهلت زمانی (بر حسب میلی‌ثانیه) برای پذیرش اتصال WebDriver Bidi توسط مرورگر. پس از آن، نشست با WebDriver Classic ادامه می‌یابد و فرمان‌هایی که فقط در Bidi هستند، مانند [`mock`](/docs/api/browser/mock)، شکست می‌خورند. اگر مرورگری که هنگام شروع مشغول است، مثلاً چند مرورگر که هم‌زمان روی یک CI runner شروع می‌شوند، اتصال را دیر می‌پذیرد، این مقدار را افزایش دهید.

این گزینه برای نشست‌ها در Node.js اعمال می‌شود. در مرورگر، برای مثال با [browser runner](/docs/runner#browser-runner)، اتصال تا زمانی که باز شود یا شکست بخورد منتظر می‌ماند.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

به شما امکان می‌دهد برای ارسال درخواست‌ها از یک [agent](https://www.npmjs.com/package/got#agent) سفارشی ` http`/`https`/`http2` استفاده کنید.

</Option>

### headers

<Option type="Object" default={`{}`}>

`headers` سفارشی را برای ارسال در هر درخواست WebDriver مشخص کنید. اگر Selenium Grid شما به احراز هویت Basic نیاز دارد، توصیه می‌کنیم از طریق این گزینه یک هدر `Authorization` ارسال کنید تا درخواست‌های WebDriver شما احراز هویت شوند، برای مثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// خواندن نام کاربری و رمز عبور از متغیرهای محیطی
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ترکیب نام کاربری و رمز عبور با جداکننده‌ی دونقطه
const credentials = `${username}:${password}`;
// رمزگذاری اطلاعات احراز هویت با Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

تابعی که [گزینه‌های درخواست HTTP](https://github.com/sindresorhus/got#options) را پیش از ارسال یک درخواست WebDriver رهگیری می‌کند

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

تابعی که اشیای پاسخ HTTP را پس از رسیدن پاسخ WebDriver رهگیری می‌کند. شیء پاسخ اصلی به‌عنوان آرگومان اول و `RequestOptions` مربوطه به‌عنوان آرگومان دوم به این تابع ارسال می‌شوند.

</Option>

### strictSSL

<Option type="Boolean" default="true">

اینکه آیا نیازی به معتبر بودن گواهی SSL نیست یا خیر.
می‌توان آن را از طریق متغیرهای محیطی `STRICT_SSL` یا `strict_ssl` تنظیم کرد.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

اینکه آیا [قابلیت اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود یا خیر.
اگر پاسخ کلیدهای مناسب را نداشته باشد، در حالی که این پرچم فعال است، هیچ کاری انجام نمی‌دهد.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

مسیر ریشه‌ی دایرکتوری کش. این دایرکتوری برای ذخیره‌ی همه‌ی درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک نشست دانلود می‌شوند.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

برای لاگ‌گیری امن‌تر، عبارات منظمی که با `maskingPatterns` تنظیم می‌شوند می‌توانند اطلاعات حساس را در لاگ پنهان کنند.
 - قالب رشته یک عبارت منظم با یا بدون پرچم (مثلاً `/.../i`) است و برای چند عبارت منظم با کاما جدا می‌شود.
 - برای جزئیات بیشتر درباره‌ی الگوهای پنهان‌سازی، [بخش Masking Patterns در README مربوط به WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) را ببینید.

</Option>
**مثال:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

گزینه‌های زیر (شامل گزینه‌های فهرست‌شده در بالا) را می‌توان با WebdriverIO در حالت مستقل استفاده کرد:

### automationProtocol

<Option type="String" default="webdriver">

پروتکلی را که می‌خواهید برای خودکارسازی مرورگر استفاده کنید تعریف کنید. در حال حاضر فقط [`webdriver`](https://www.npmjs.com/package/webdriver) پشتیبانی می‌شود، زیرا این فناوری اصلی خودکارسازی مرورگر است که WebdriverIO از آن استفاده می‌کند.

اگر می‌خواهید مرورگر را با فناوری خودکارسازی دیگری خودکار کنید، این ویژگی را روی مسیری تنظیم کنید که به ماژولی منتهی شود که از رابط زیر پیروی می‌کند:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * یک نشست خودکارسازی را شروع کرده و یک [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) از WebdriverIO
     * همراه با فرمان‌های خودکارسازی مربوطه برمی‌گرداند. بسته‌ی [webdriver](https://www.npmjs.com/package/webdriver) را
     * به‌عنوان پیاده‌سازی مرجع ببینید
     *
     * @param {Capabilities.RemoteConfig} options گزینه‌های WebdriverIO
     * @param {Function} hook که امکان تغییر کلاینت را پیش از بازگرداندن آن از تابع فراهم می‌کند
     * @param {PropertyDescriptorMap} userPrototype به کاربر امکان افزودن فرمان‌های پروتکل سفارشی را می‌دهد
     * @param {Function} customCommandWrapper امکان تغییر اجرای فرمان را فراهم می‌کند
     * @returns یک نمونه‌ی کلاینت سازگار با WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * به کاربر امکان اتصال به نشست‌های موجود را می‌دهد
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * شناسه‌ی نشست نمونه و قابلیت‌های مرورگر را برای نشست جدید
     * مستقیماً در شیء مرورگر ارسال‌شده تغییر می‌دهد
     *
     * @optional
     * @param   {object} instance  شیئی که از یک نشست مرورگر جدید دریافت می‌کنیم.
     * @returns {string}           شناسه‌ی نشست جدید مرورگر
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

با تنظیم یک URL پایه، فراخوانی‌های فرمان `url` را کوتاه کنید.
- اگر پارامتر `url` شما با `/` شروع شود، `baseUrl` به ابتدای آن افزوده می‌شود (به‌جز مسیر `baseUrl`، اگر مسیری داشته باشد).
- اگر پارامتر `url` شما بدون scheme یا `/` شروع شود (مانند `some/path`)، کل `baseUrl` مستقیماً به ابتدای آن افزوده می‌شود.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

مهلت زمانی پیش‌فرض برای همه‌ی فرمان‌های `waitFor*`. (به حرف کوچک `f` در نام گزینه توجه کنید.) این مهلت __فقط__ بر فرمان‌هایی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آن‌ها تأثیر می‌گذارد.

برای افزایش مهلت زمانی یک _تست_، لطفاً مستندات فریم‌ورک را ببینید.

</Option>

### waitforInterval

<Option type="Number" default="100">

بازه‌ی زمانی پیش‌فرض برای همه‌ی فرمان‌های `waitFor*` جهت بررسی اینکه آیا یک وضعیت مورد انتظار (مثلاً قابل مشاهده بودن) تغییر کرده است یا خیر.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

باعث می‌شود فرمان [`$`](/docs/api/browser/$) زمانی که سلکتور داده‌شده به بیش از یک عنصر منتهی می‌شود، به‌جای استفاده‌ی بی‌صدا از اولین تطابق، خطای `StrictSelectorError` پرتاب کند. `$$` تحت تأثیر قرار نمی‌گیرد.

می‌توانید برای یک کوئری خاص با ارسال `{ strict: false }` به‌عنوان آرگومان دوم از این رفتار صرف‌نظر کنید، مثلاً `$('button', { strict: false })`.

برای جزئیات، راهنمای [سلکتورها](/docs/selectors#strict-mode) را ببینید.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

حداکثر اندازه‌ی بدنه‌ی پاسخ (بر حسب بایت) که هنگام استفاده از فرمان [`mock`](/docs/api/browser/mock) می‌تواند بازگردانده شود. برای غیرفعال کردن جمع‌آوری داده‌ی payload شنودشده از `0` استفاده کنید.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

اگر روی Sauce Labs اجرا می‌کنید، می‌توانید انتخاب کنید که تست‌ها در مراکز داده‌ی مختلف اجرا شوند.
از شناسه‌های کوتاه منطقه `us` (پیش‌فرض، معادل `us-west-1`) یا `eu` (معادل `eu-central-1`) یا مستقیماً از نام کامل منطقه‌ها استفاده کنید.

__نکته:__ این گزینه فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` متصل به حساب Sauce Labs خود را ارائه دهید.

</Option>
*(فقط برای ماشین‌های مجازی و/یا شبیه‌سازها، به‌جز `us-east-4` و `asia-south-2` که فقط میزبان دستگاه‌های واقعی هستند)*

## گزینه‌های Testrunner

گزینه‌های زیر (شامل گزینه‌های فهرست‌شده در بالا) فقط برای اجرای WebdriverIO با WDIO testrunner تعریف شده‌اند:

### specs

<Option type="(String | String[])[]" default="[]">

فایل‌های spec را برای اجرای تست تعریف کنید. می‌توانید یک الگوی glob برای تطبیق هم‌زمان چند فایل مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا در یک فرایند worker واحد اجرا شوند. همه‌ی مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

</Option>

### exclude

<Option type="String[]" default="[]">

فایل‌های spec را از اجرای تست مستثنا کنید. همه‌ی مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

</Option>

### suites

<Option type="Object" default={`{}`}>

شیئی که مجموعه‌های (suites) مختلف را توصیف می‌کند و سپس می‌توانید آن‌ها را با گزینه‌ی `--suite` در CLI مربوط به `wdio` مشخص کنید.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

همانند بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که امکان تعیین یک شیء [multi-remote](/docs/multiremote) یا چند نشست WebDriver در یک آرایه برای اجرای موازی وجود دارد.

می‌توانید همان قابلیت‌های خاص فروشنده و مرورگر را که [در بالا](/docs/configuration#capabilities) تعریف شده‌اند اعمال کنید.

</Option>

### maxInstances

<Option type="Number" default="100">

حداکثر تعداد کل workerهایی که به‌صورت موازی اجرا می‌شوند.

__نکته:__ هنگامی که تست‌ها روی ماشین‌های فروشندگان خارجی مانند Sauce Labs اجرا می‌شوند، این عدد می‌تواند تا `100` باشد. در آنجا، تست‌ها روی یک ماشین واحد اجرا نمی‌شوند، بلکه روی چندین ماشین مجازی اجرا می‌شوند. اگر قرار است تست‌ها روی یک ماشین توسعه‌ی محلی اجرا شوند، از عدد معقول‌تری مانند `3`، `4` یا `5` استفاده کنید. در اصل، این تعداد مرورگرهایی است که به‌طور هم‌زمان شروع شده و تست‌های شما را در یک زمان اجرا می‌کنند، بنابراین به میزان RAM ماشین شما و تعداد برنامه‌های دیگری که روی ماشین شما در حال اجرا هستند بستگی دارد.

همچنین می‌توانید `maxInstances` را در اشیای capability خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این کار تعداد نشست‌های موازی را برای آن capability خاص محدود می‌کند.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

حداکثر تعداد کل workerهایی که به‌ازای هر capability به‌صورت موازی اجرا می‌شوند.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

متغیرهای سراسری WebdriverIO (مانند `browser`، `$` و `$$`) را در محیط سراسری قرار می‌دهد.
اگر آن را روی `false` تنظیم کنید، باید از `@wdio/globals` ایمپورت کنید، برای مثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

نکته: WebdriverIO تزریق متغیرهای سراسری خاص فریم‌ورک تست را مدیریت نمی‌کند.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

اگر می‌خواهید اجرای تست شما پس از تعداد مشخصی شکست تست متوقف شود، از `bail` استفاده کنید.
(مقدار پیش‌فرض آن `0` است که در هر صورت همه‌ی تست‌ها را اجرا می‌کند.) **نکته:** منظور از تست در این زمینه، همه‌ی تست‌های داخل یک فایل spec (هنگام استفاده از Mocha یا Jasmine) یا همه‌ی گام‌های داخل یک فایل feature (هنگام استفاده از Cucumber) است. اگر می‌خواهید رفتار bail را در تست‌های یک فایل تست واحد کنترل کنید، نگاهی به گزینه‌های موجود [فریم‌ورک](frameworks) بیندازید.

</Option>

### specFileRetries

<Option type="Number" default="0">

تعداد دفعاتی که یک فایل spec کامل، در صورت شکست به‌طور کلی، دوباره اجرا می‌شود.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

تأخیر بر حسب ثانیه بین تلاش‌های مجدد فایل spec

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

اینکه آیا فایل‌های spec که دوباره اجرا می‌شوند باید فوراً اجرا شوند یا به انتهای صف منتقل شوند.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

نمای خروجی لاگ را انتخاب کنید.

اگر روی `false` تنظیم شود، لاگ‌های فایل‌های تست مختلف به‌صورت بلادرنگ چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است هنگام اجرای موازی باعث درهم‌آمیختن خروجی‌های لاگ فایل‌های مختلف شود.

اگر روی `true` تنظیم شود، خروجی‌های لاگ بر اساس Test Spec گروه‌بندی شده و فقط پس از اتمام Test Spec چاپ می‌شوند.

به‌طور پیش‌فرض روی `false` تنظیم شده است، بنابراین لاگ‌ها به‌صورت بلادرنگ چاپ می‌شوند.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

کنترل می‌کند که آیا WebdriverIO به‌طور خودکار همه‌ی soft assertionها را در پایان هر تست بررسی کند یا خیر. وقتی روی `true` تنظیم شود، همه‌ی soft assertionهای انباشته‌شده به‌طور خودکار بررسی می‌شوند و در صورت شکست هر یک از آن‌ها، تست شکست می‌خورد. وقتی روی `false` تنظیم شود، باید متد assert را به‌صورت دستی برای بررسی soft assertionها فراخوانی کنید.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

سرویس‌ها کار خاصی را که نمی‌خواهید خودتان انجام دهید بر عهده می‌گیرند. آن‌ها تقریباً بدون هیچ زحمتی راه‌اندازی تست شما را بهبود می‌بخشند.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

فریم‌ورک تستی را که WDIO testrunner استفاده می‌کند تعریف می‌کند.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

گزینه‌های خاص مربوط به فریم‌ورک. برای اطلاع از گزینه‌های موجود، مستندات آداپتور فریم‌ورک را ببینید. درباره‌ی این موضوع در [فریم‌ورک‌ها](frameworks) بیشتر بخوانید.

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

فهرست featureهای cucumber همراه با شماره‌ی خطوط (هنگام [استفاده از فریم‌ورک cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

فهرست گزارشگرهایی که استفاده می‌شوند. یک گزارشگر می‌تواند یک رشته یا آرایه‌ای به شکل
`['reporterName', { /* reporter options */}]` باشد که در آن عنصر اول رشته‌ای با نام گزارشگر و عنصر دوم شیئی با گزینه‌های گزارشگر است.

</Option>
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

<Option type="Number" default="100 (ms)">

تعیین می‌کند که گزارشگرها، در صورتی که لاگ‌های خود را به‌صورت ناهمگام گزارش می‌کنند (مثلاً اگر لاگ‌ها به یک فروشنده‌ی شخص ثالث ارسال شوند)، در چه بازه‌ای بررسی کنند که آیا همگام شده‌اند یا خیر.

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

حداکثر زمانی را تعیین می‌کند که گزارشگرها برای اتمام آپلود همه‌ی لاگ‌های خود فرصت دارند، پیش از آنکه testrunner خطا پرتاب کند.

</Option>

### execArgv

<Option type="String[]" default="null">

آرگومان‌های Node که هنگام راه‌اندازی فرایندهای فرزند مشخص می‌شوند.

</Option>

### cpuProf

<Option type="Boolean" default="false">

پروفایل‌گیری CPU را برای فرایند worker فعال می‌کند. پروفایل به‌طور خودکار هنگام خروج فرایند worker تولید می‌شود.

</Option>

### heapProf

<Option type="Boolean" default="false">

پروفایل‌گیری Heap را برای فرایند worker فعال می‌کند. اسنپ‌شات به‌طور خودکار هنگام خروج فرایند worker تولید می‌شود (از sampling heap profiler استفاده می‌کند).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

دایرکتوری‌ای که پروفایل‌های CPU (`.cpuprofile`) و پروفایل‌های Heap (`.heapprofile`) در آن ذخیره می‌شوند.

</Option>

### filesToWatch

<Option type="String[]" default="[]">

فهرستی از الگوهای رشته‌ای با پشتیبانی از glob که به testrunner می‌گوید هنگام اجرا با پرچم `--watch`، فایل‌های دیگری مانند فایل‌های برنامه را نیز زیر نظر بگیرد. به‌طور پیش‌فرض testrunner همه‌ی فایل‌های spec را زیر نظر دارد.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

اگر می‌خواهید اسنپ‌شات‌های خود را به‌روزرسانی کنید، آن را روی true تنظیم کنید. در حالت ایده‌آل به‌عنوان بخشی از یک پارامتر CLI استفاده می‌شود، مثلاً `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

مسیر پیش‌فرض اسنپ‌شات را بازنویسی می‌کند. برای مثال، برای ذخیره‌ی اسنپ‌شات‌ها در کنار فایل‌های تست.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به‌طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود، اما می‌توانید یک مسیر سفارشی را اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

مستندات `tsx` را ببینید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

هنگامی که در Linux نه `DISPLAY` و نه `WAYLAND_DISPLAY` تنظیم شده باشد، یک نمایشگر مجازی برای اجرا راه‌اندازی می‌کند. وقتی به‌صورت headless یا فقط روی یک سرویس ابری یا grid راه دور اجرا می‌کنید، آن را روی `false` تنظیم کنید. این گزینه فقط کنترل می‌کند که آیا یک سرور نمایش راه‌اندازی شود یا خیر: اگر فقط `WAYLAND_DISPLAY` تنظیم شده باشد، testrunner همچنان `XDG_SESSION_TYPE`، `GDK_BACKEND` و `ELECTRON_OZONE_PLATFORM_HINT` را برای اجرا روی `wayland` تنظیم می‌کند. [Headless و سرورهای نمایش](/docs/headless-and-display-servers) را ببینید.

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

اینکه کدام سرور نمایش راه‌اندازی شود. `auto` ابتدا Weston را امتحان می‌کند و در صورت نبود Weston یا ناموفق بودن راه‌اندازی آن، به Xvfb بازمی‌گردد. `wayland` و `xvfb` فقط همان سرور را امتحان می‌کنند.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

هنگامی که هیچ سرور نمایش نصب‌شده‌ای راه‌اندازی نشود، سرور نمایش موجود نبوده را با مدیر بسته‌ی سیستم نصب می‌کند.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

نحوه‌ی اجرای نصب داخلی: `root` فقط هنگام اجرا به‌عنوان root نصب می‌کند، `sudo` در صورتی که root نباشید از `sudo -n` غیرتعاملی استفاده می‌کند، یا اگر `sudo` نصب نشده باشد بدون آن نصب می‌کند.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

فرمانی که به‌جای نصب داخلی، به همان شکل و بدون `sudo` اجرا می‌شود. فقط با `displayServerAutoInstall: true` اجرا می‌شود. یک رشته در یک shell اجرا می‌شود و یک آرایه بدون shell اجرا می‌شود. با `auto`، ابتدا برای Weston اجرا می‌شود و فقط در صورتی که Weston همچنان در دسترس نباشد یا راه‌اندازی آن ناموفق باشد و Xvfb همچنان موجود نباشد، دوباره برای Xvfb اجرا می‌شود. `displayServer` را روی سروری که این فرمان نصب می‌کند تنظیم کنید تا از تلاش برای سرور دیگر صرف‌نظر شود.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

عرض صفحه‌ی نمایشگر مجازی بر حسب پیکسل.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

ارتفاع صفحه‌ی نمایشگر مجازی بر حسب پیکسل.

</Option>

### displayServerDepth

<Option type="Number" default="24">

عمق رنگ نمایشگر مجازی. فقط برای Xvfb.

</Option>

## هوک‌ها

WDIO testrunner به شما امکان می‌دهد هوک‌هایی تنظیم کنید که در زمان‌های مشخصی از چرخه‌ی حیات تست فعال شوند. این امکان انجام اقدامات سفارشی را فراهم می‌کند (مثلاً گرفتن اسکرین‌شات در صورت شکست یک تست).

هر هوک اطلاعات خاصی درباره‌ی چرخه‌ی حیات (مثلاً اطلاعاتی درباره‌ی مجموعه‌ی تست یا خود تست) را به‌عنوان پارامتر دریافت می‌کند. درباره‌ی همه‌ی ویژگی‌های هوک‌ها در [پیکربندی نمونه‌ی ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) بیشتر بخوانید.

**نکته:** برخی هوک‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در فرایند دیگری اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده‌ی سراسری را با هوک‌های دیگری که در فرایند worker قرار دارند به اشتراک بگذارند.

### onPrepare

یک بار پیش از راه‌اندازی همه‌ی workerها اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): فهرست جزئیات capabilityها

### onWorkerStart

پیش از ایجاد یک فرایند worker اجرا می‌شود و می‌توان از آن برای مقداردهی اولیه‌ی سرویس خاص برای آن worker و همچنین تغییر محیط‌های زمان اجرا به‌صورت ناهمگام استفاده کرد.

پارامترها:

- `cid` (`string`): شناسه‌ی capability (مثلاً 0-0)
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): فایل‌های spec که در فرایند worker اجرا می‌شوند
- `args` (`object`): شیئی که پس از مقداردهی اولیه‌ی worker با پیکربندی اصلی ادغام می‌شود
- `execArgv` (`string[]`): فهرست آرگومان‌های رشته‌ای که به فرایند worker ارسال می‌شوند

### onWorkerEnd

درست پس از خروج یک فرایند worker اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه‌ی capability (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست. workerی که توسط یک سیگنال خاتمه یافته باشد، به‌جای آن `128` + شماره‌ی سیگنال را گزارش می‌دهد، مثلاً `139` برای `SIGSEGV`
- `specs` (`string[]`): فایل‌های spec که در فرایند worker اجرا می‌شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح spec که طبق تعریف [_"افزودن تلاش مجدد به‌ازای هر فایل spec"_](./Retry.md#add-retries-on-a-per-specfile-basis) استفاده شده‌اند
- `signal` (`string`): سیگنالی که worker را خاتمه داده است، مثلاً `SIGSEGV`، یا `null` اگر خودش خارج شده باشد

### beforeSession

درست پیش از مقداردهی اولیه‌ی نشست webdriver و فریم‌ورک تست اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را بسته به capability یا spec دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): فایل‌های spec که در فرایند worker اجرا می‌شوند

### before

پیش از شروع اجرای تست اجرا می‌شود. در این نقطه می‌توانید به همه‌ی متغیرهای سراسری مانند `browser` دسترسی داشته باشید. این مکان مناسبی برای تعریف فرمان‌های سفارشی است.

پارامترها:

- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): فایل‌های spec که در فرایند worker اجرا می‌شوند
- `browser` (`object`): نمونه‌ی نشست مرورگر/دستگاه ایجادشده

### beforeSuite

هوکی که پیش از شروع مجموعه (suite) اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### beforeHook

هوکی که *پیش از* شروع یک هوک در داخل مجموعه اجرا می‌شود (مثلاً پیش از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): زمینه‌ی تست (نماینده‌ی شیء World در Cucumber)

### afterHook

هوکی که *پس از* پایان یک هوک در داخل مجموعه اجرا می‌شود (مثلاً پس از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): زمینه‌ی تست (نماینده‌ی شیء World در Cucumber)
- `result` (`object`): نتیجه‌ی هوک (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### beforeTest

تابعی که پیش از یک تست اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء scope که تست با آن اجرا شده است

### beforeCommand

پیش از اجرای یک فرمان WebdriverIO اجرا می‌شود. برای یک فرمان عنصر، پیش از آنکه WebdriverIO منتظر عنصر بماند اجرا می‌شود ([انتظار خودکار](./AutoWait.md) را ببینید).

پارامترها:

- `commandName` (`string`): نام فرمان
- `args` (`*`): آرگومان‌هایی که فرمان دریافت می‌کند

### afterCommand

پس از اجرای یک فرمان WebdriverIO اجرا می‌شود. برای یک فرمان عنصر، پس از انتظار برای عنصر اجرا می‌شود. هنگامی که WebdriverIO یک فرمان عنصر را دوباره امتحان می‌کند (مثلاً پس از یک عنصر stale)، هوک نتیجه یا خطای آخرین تلاش را دریافت می‌کند.

پارامترها:

- `commandName` (`string`): نام فرمان
- `args` (`*`): آرگومان‌هایی که فرمان دریافت می‌کند
- `result` (`*`): نتیجه‌ی فرمان
- `error` (`Error`): شیء خطا در صورت وجود

### afterTest

تابعی که پس از پایان یک تست (در Mocha/Jasmine) اجرا می‌شود. همچنین پس از اتمام مهلت زمانی یک تست نیز اجرا می‌شود. در Mocha، تست بعدی پس از پایان این هوک شروع می‌شود (Mocha حداکثر به اندازه‌ی یک مهلت زمانی دیگر تست برای آن صبر می‌کند، [مهلت‌های زمانی](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks) را ببینید).

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء scope که تست با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست تست، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع تست
- `result.duration` (`Number`): مدت زمان تست
- `result.passed` (`Boolean`): اگر تست موفق باشد true، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات مربوط به تلاش‌های مجدد تست منفرد، طبق تعریف برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber)، مثلاً `{ attempts: 0, limit: 0 }`، ببینید
- `result` (`object`): نتیجه‌ی هوک (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### afterSuite

هوکی که پس از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### after

پس از اتمام همه‌ی تست‌ها اجرا می‌شود. شما همچنان به همه‌ی متغیرهای سراسری تست دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - تست موفق، 1 - تست ناموفق
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): فایل‌های spec که در فرایند worker اجرا می‌شوند

### afterSession

درست پس از خاتمه‌ی نشست webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): فایل‌های spec که در فرایند worker اجرا می‌شوند

### onComplete

پس از خاموش شدن همه‌ی workerها و زمانی که فرایند در آستانه‌ی خروج است اجرا می‌شود. خطایی که در هوک onComplete پرتاب شود باعث شکست اجرای تست می‌شود.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `result` (`object`): شیء نتایج شامل نتایج تست

### onReload

هنگامی که یک بارگذاری مجدد (refresh) رخ می‌دهد اجرا می‌شود.

پارامترها:

- `oldSessionId` (`string`): شناسه‌ی نشست قدیمی
- `newSessionId` (`string`): شناسه‌ی نشست جدید

### beforeFeature

پیش از یک Feature در Cucumber اجرا می‌شود.

پارامترها:

- `uri` (`string`): مسیر فایل feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): شیء feature در Cucumber

### afterFeature

پس از یک Feature در Cucumber اجرا می‌شود.

پارامترها:

- `uri` (`string`): مسیر فایل feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): شیء feature در Cucumber

### beforeScenario

پیش از یک Scenario در Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی درباره‌ی pickle و گام تست
- `context` (`object`): شیء World در Cucumber

### afterScenario

پس از یک Scenario در Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی درباره‌ی pickle و گام تست
- `result` (`object`): شیء نتایج شامل نتایج سناریو
- `result.passed` (`boolean`): اگر سناریو موفق باشد true
- `result.error` (`string`): پشته‌ی خطا در صورت شکست سناریو
- `result.duration` (`number`): مدت زمان سناریو بر حسب میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeStep

پیش از یک Step در Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء step در Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء scenario در Cucumber
- `context` (`object`): شیء World در Cucumber

### afterStep

پس از یک Step در Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء step در Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء scenario در Cucumber
- `result`: (`object`): شیء نتایج شامل نتایج گام
- `result.passed` (`boolean`): اگر سناریو موفق باشد true
- `result.error` (`string`): پشته‌ی خطا در صورت شکست سناریو
- `result.duration` (`number`): مدت زمان سناریو بر حسب میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeAssertion

هوکی که پیش از وقوع یک assertion در WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات assertion
- `params.matcherName` (`string`): نام matcherی که تست فراخوانی کرده است (مثلاً `toHaveTitle`). برای یک نام مستعار (alias)، نام همان نام مستعار است (مثلاً `toBeExisting`، نه `toExist`).
- `params.expectedValue`: مقداری که به matcher ارسال می‌شود
- `params.options`: گزینه‌های assertion

### afterAssertion

هوکی که پس از وقوع یک assertion در WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات assertion
- `params.matcherName` (`string`): نام matcherی که تست فراخوانی کرده است (مثلاً `toHaveTitle`). برای یک نام مستعار (alias)، نام همان نام مستعار است (مثلاً `toBeExisting`، نه `toExist`).
- `params.expectedValue`: مقداری که به matcher ارسال می‌شود
- `params.options`: گزینه‌های assertion
- `params.result` (`object`): نتیجه‌ی matcher، همراه با `pass` (`boolean`) و `message()`. `pass` زمانی `true` است که مقدار با مقدار مورد انتظار مطابقت داشته باشد، حتی با `.not`: با `.not`، assertion زمانی موفق است که `pass` برابر `false` باشد.
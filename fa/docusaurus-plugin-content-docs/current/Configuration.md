---
id: configuration
title: پیکربندی
description: "همه گزینه‌های پیکربندی WebDriver، WebdriverIO مستقل و testrunner WDIO، از جمله همه هوک‌های testrunner، را در اینجا ببینید."
---

بسته به [نوع راه‌اندازی](/docs/setuptypes) (مثلاً استفاده مستقیم از اتصال‌های پروتکل، WebdriverIO به‌صورت بسته مستقل یا testrunner WDIO)، مجموعه متفاوتی از گزینه‌ها برای کنترل محیط در دسترس است.

## گزینه‌های WebDriver

گزینه‌های زیر هنگام استفاده از بسته پروتکل [`webdriver`](https://www.npmjs.com/package/webdriver) تعریف می‌شوند:

### protocol

<Option type="String" default="http">

پروتکلی که برای ارتباط با سرور درایور استفاده می‌شود.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

میزبان سرور درایور شما.

</Option>

### port

<Option type="Number" default="undefined">

پورتی که سرور درایور شما روی آن قرار دارد.

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

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [TestMu AI](https://www.testmuai.com/) کار می‌کند). در صورت تنظیم، WebdriverIO به‌طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توان از این گزینه برای احراز هویت هر بک‌اند WebDriver دیگری استفاده کرد.

</Option>

### key

<Option type="String" default="undefined">

کلید دسترسی یا کلید محرمانه سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [TestMu AI](https://www.testmuai.com/) کار می‌کند). در صورت تنظیم، WebdriverIO به‌طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توان از این گزینه برای احراز هویت هر بک‌اند WebDriver دیگری استفاده کرد.

</Option>

### capabilities

<Option type="Object" default="null">

قابلیت‌هایی (capabilities) را که می‌خواهید در نشست WebDriver خود اجرا کنید تعریف می‌کند. برای جزئیات بیشتر [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را ببینید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های مختص مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر یا دستگاه راه دور را فراهم می‌کنند. این گزینه‌ها در مستندات فروشنده مربوطه توضیح داده شده‌اند، مثلاً:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، ابزار مفید [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) از Sauce Labs به شما کمک می‌کند تا با کلیک روی قابلیت‌های مورد نظرتان، این شیء را بسازید.

</Option>
**مثال:**

```js
{
    browserName: 'chrome', // گزینه‌ها: `chrome`، `edge`، `firefox`، `safari`
    browserVersion: '27.0', // نسخه مرورگر
    platformName: 'Windows 10' // پلتفرم سیستم‌عامل
}
```

اگر تست‌های وب یا بومی را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver تفاوت دارد. برای جزئیات بیشتر [مستندات Appium](https://appium.io/docs/en/latest/guides/caps/) را ببینید.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

سطح جزئیات لاگ‌ها.

</Option>

### outputDir

<Option type="String" default="null">

پوشه‌ای برای ذخیره همه فایل‌های لاگ testrunner (شامل لاگ‌های reporter و لاگ‌های `wdio`). اگر تنظیم نشود، همه لاگ‌ها به `stdout` ارسال می‌شوند. از آنجا که بیشتر reporterها برای لاگ‌کردن در `stdout` ساخته شده‌اند، توصیه می‌شود این گزینه را فقط برای reporterهای خاصی استفاده کنید که منطقی‌تر است گزارش را در یک فایل بنویسند (مثلاً reporter `junit`).

هنگام اجرا در حالت مستقل، تنها لاگی که WebdriverIO تولید می‌کند لاگ `wdio` خواهد بود.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

مهلت زمانی برای هر درخواست WebDriver به یک درایور یا grid.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

حداکثر تعداد تلاش مجدد درخواست به سرور Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

مهلت زمانی (بر حسب میلی‌ثانیه) برای دریافت پاسخ یک فرمان WebDriver Bidi از مرورگر. اگر فرمان‌هایی مانند [`execute`](/docs/api/browser/execute) اجرا می‌کنید که به‌طور مشروع بیش از مقدار پیش‌فرض برای حل شدن زمان می‌برند، این مقدار را افزایش دهید؛ در غیر این صورت WebdriverIO پیش از اتمام کار مرورگر از انتظار دست می‌کشد.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

به شما امکان می‌دهد از یک [agent](https://www.npmjs.com/package/got#agent) سفارشی ` http`/`https`/`http2` برای ارسال درخواست‌ها استفاده کنید.

</Option>

### headers

<Option type="Object" default={`{}`}>

`headers` سفارشی را برای ارسال در هر درخواست WebDriver مشخص کنید. اگر Selenium Grid شما به احراز هویت Basic نیاز دارد، توصیه می‌کنیم از طریق این گزینه یک هدر `Authorization` ارسال کنید تا درخواست‌های WebDriver شما احراز هویت شوند، مثلاً:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// خواندن نام کاربری و رمز عبور از متغیرهای محیطی
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ترکیب نام کاربری و رمز عبور با جداکننده دونقطه
const credentials = `${username}:${password}`;
// رمزگذاری اطلاعات ورود با استفاده از Base64
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

تابعی که [گزینه‌های درخواست HTTP](https://github.com/sindresorhus/got#options) را پیش از ارسال درخواست WebDriver رهگیری می‌کند

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

تابعی که اشیای پاسخ HTTP را پس از دریافت پاسخ WebDriver رهگیری می‌کند. شیء پاسخ اصلی به‌عنوان آرگومان اول و `RequestOptions` متناظر به‌عنوان آرگومان دوم به این تابع ارسال می‌شود.

</Option>

### strictSSL

<Option type="Boolean" default="true">

اینکه آیا معتبر بودن گواهی SSL الزامی نیست.
می‌توان آن را از طریق متغیرهای محیطی `STRICT_SSL` یا `strict_ssl` تنظیم کرد.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

اینکه آیا [قابلیت اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود یا خیر.
اگر در حالی که این پرچم فعال است پاسخ کلیدهای مناسب را نداشته باشد، کاری انجام نمی‌دهد.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

مسیر ریشه پوشه کش. این پوشه برای ذخیره همه درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک نشست دانلود می‌شوند.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

برای لاگ‌گیری امن‌تر، عبارات منظمی که با `maskingPatterns` تنظیم می‌شوند می‌توانند اطلاعات حساس را در لاگ پنهان کنند.
 - قالب رشته یک عبارت منظم با یا بدون پرچم (مثلاً `/.../i`) است و برای چند عبارت منظم با کاما از هم جدا می‌شوند.
 - برای جزئیات بیشتر درباره الگوهای پنهان‌سازی، [بخش Masking Patterns در README مربوط به WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) را ببینید.

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
     * همراه با فرمان‌های خودکارسازی مربوطه برمی‌گرداند. بسته [webdriver](https://www.npmjs.com/package/webdriver) را
     * به‌عنوان یک پیاده‌سازی مرجع ببینید
     *
     * @param {Capabilities.RemoteConfig} options گزینه‌های WebdriverIO
     * @param {Function} hook که امکان تغییر کلاینت را پیش از بازگرداندن آن از تابع فراهم می‌کند
     * @param {PropertyDescriptorMap} userPrototype به کاربر امکان افزودن فرمان‌های پروتکل سفارشی را می‌دهد
     * @param {Function} customCommandWrapper امکان تغییر نحوه اجرای فرمان را فراهم می‌کند
     * @returns یک نمونه کلاینت سازگار با WebdriverIO
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
     * شناسه نشست نمونه و قابلیت‌های مرورگر را برای نشست جدید
     * مستقیماً در شیء مرورگر ارسال‌شده تغییر می‌دهد
     *
     * @optional
     * @param   {object} instance  شیئی که از یک نشست مرورگر جدید دریافت می‌کنیم.
     * @returns {string}           شناسه نشست جدید مرورگر
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

با تنظیم یک URL پایه، فراخوانی‌های فرمان `url` را کوتاه‌تر کنید.
- اگر پارامتر `url` شما با `/` شروع شود، `baseUrl` به ابتدای آن اضافه می‌شود (به جز مسیر `baseUrl`، اگر مسیری داشته باشد).
- اگر پارامتر `url` شما بدون scheme یا `/` شروع شود (مانند `some/path`)، کل `baseUrl` مستقیماً به ابتدای آن اضافه می‌شود.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

مهلت زمانی پیش‌فرض برای همه فرمان‌های `waitFor*`. (به حرف کوچک `f` در نام گزینه توجه کنید.) این مهلت زمانی __فقط__ روی فرمان‌هایی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آن‌ها تأثیر می‌گذارد.

برای افزایش مهلت زمانی یک _تست_، لطفاً مستندات فریم‌ورک را ببینید.

</Option>

### waitforInterval

<Option type="Number" default="100">

فاصله زمانی پیش‌فرض برای همه فرمان‌های `waitFor*` جهت بررسی اینکه آیا یک وضعیت مورد انتظار (مثلاً نمایان بودن) تغییر کرده است یا خیر.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

باعث می‌شود فرمان [`$`](/docs/api/browser/$) زمانی که انتخابگر داده‌شده به بیش از یک عنصر منتهی می‌شود، به جای استفاده بی‌صدا از اولین تطابق، خطای `StrictSelectorError` پرتاب کند. `$$` تحت تأثیر قرار نمی‌گیرد.

می‌توانید برای یک کوئری خاص با ارسال `{ strict: false }` به‌عنوان آرگومان دوم از این رفتار صرف‌نظر کنید، مثلاً `$('button', { strict: false })`.

برای جزئیات، راهنمای [انتخابگرها](/docs/selectors#strict-mode) را ببینید.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

حداکثر اندازه بدنه پاسخ (بر حسب بایت) که هنگام استفاده از فرمان [`mock`](/docs/api/browser/mock) می‌تواند بازگردانده شود. از `0` برای غیرفعال کردن جمع‌آوری داده‌های payload رصدشده استفاده کنید.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

اگر روی Sauce Labs اجرا می‌کنید، می‌توانید انتخاب کنید که تست‌ها در مراکز داده مختلف اجرا شوند.
از شناسه‌های کوتاه منطقه `us` (پیش‌فرض، معادل `us-west-1`) یا `eu` (معادل `eu-central-1`) استفاده کنید، یا مستقیماً نام کامل منطقه‌ها را به کار ببرید.

__توجه:__ این گزینه فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` متصل به حساب Sauce Labs خود را ارائه دهید.

</Option>
*(فقط برای ماشین‌های مجازی و یا شبیه‌سازها/امولاتورها، به جز `us-east-4` و `asia-south-2` که فقط میزبان دستگاه‌های واقعی هستند)*

## گزینه‌های Testrunner

گزینه‌های زیر (شامل گزینه‌های فهرست‌شده در بالا) فقط برای اجرای WebdriverIO با testrunner WDIO تعریف شده‌اند:

### specs

<Option type="(String | String[])[]" default="[]">

specها را برای اجرای تست تعریف کنید. می‌توانید یک الگوی glob برای تطبیق چند فایل به‌طور همزمان مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا در یک فرایند worker واحد اجرا شوند. همه مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

</Option>

### exclude

<Option type="String[]" default="[]">

specها را از اجرای تست مستثنا کنید. همه مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

</Option>

### suites

<Option type="Object" default={`{}`}>

شیئی که suiteهای مختلف را توصیف می‌کند و سپس می‌توانید آن‌ها را با گزینه `--suite` در CLI `wdio` مشخص کنید.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

همانند بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که امکان مشخص کردن یک شیء [multi-remote](/docs/multiremote) یا چند نشست WebDriver در یک آرایه برای اجرای موازی وجود دارد.

می‌توانید همان قابلیت‌های مختص فروشنده و مرورگر را که [در بالا](/docs/configuration#capabilities) تعریف شد اعمال کنید.

</Option>

### maxInstances

<Option type="Number" default="100">

حداکثر تعداد کل workerهای در حال اجرای موازی.

__توجه:__ این مقدار ممکن است تا `100` باشد، زمانی که تست‌ها روی برخی فروشندگان خارجی مانند ماشین‌های Sauce Labs اجرا می‌شوند. در آنجا، تست‌ها روی یک ماشین واحد آزمایش نمی‌شوند، بلکه روی چندین ماشین مجازی اجرا می‌شوند. اگر قرار است تست‌ها روی یک ماشین توسعه محلی اجرا شوند، از عددی معقول‌تر مانند `3`، `4` یا `5` استفاده کنید. در اصل، این تعداد مرورگرهایی است که به‌طور همزمان راه‌اندازی می‌شوند و تست‌های شما را در یک زمان اجرا می‌کنند، بنابراین به میزان RAM ماشین شما و تعداد برنامه‌های دیگری که روی ماشین شما در حال اجرا هستند بستگی دارد.

همچنین می‌توانید `maxInstances` را در اشیای capability خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این کار تعداد نشست‌های موازی را برای آن capability خاص محدود می‌کند.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

حداکثر تعداد کل workerهای در حال اجرای موازی برای هر capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

متغیرهای سراسری WebdriverIO (مثلاً `browser`، `$` و `$$`) را در محیط سراسری درج می‌کند.
اگر آن را روی `false` تنظیم کنید، باید آن‌ها را از `@wdio/globals` import کنید، مثلاً:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

توجه: WebdriverIO درج متغیرهای سراسری مختص فریم‌ورک تست را مدیریت نمی‌کند.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

اگر می‌خواهید اجرای تست شما پس از تعداد مشخصی شکست تست متوقف شود، از `bail` استفاده کنید.
(مقدار پیش‌فرض آن `0` است که در هر صورت همه تست‌ها را اجرا می‌کند.) **توجه:** منظور از تست در این زمینه، همه تست‌های داخل یک فایل spec (هنگام استفاده از Mocha یا Jasmine) یا همه مراحل داخل یک فایل feature (هنگام استفاده از Cucumber) است. اگر می‌خواهید رفتار bail را در تست‌های یک فایل تست واحد کنترل کنید، نگاهی به گزینه‌های موجود [فریم‌ورک](frameworks) بیندازید.

</Option>

### specFileRetries

<Option type="Number" default="0">

تعداد دفعاتی که یک فایل spec کامل در صورت شکست کلی آن دوباره اجرا می‌شود.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

تأخیر بر حسب ثانیه بین تلاش‌های مجدد فایل spec

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

اینکه آیا فایل‌های spec که دوباره اجرا می‌شوند باید بلافاصله اجرا شوند یا به انتهای صف موکول شوند.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

نمای خروجی لاگ را انتخاب کنید.

اگر روی `false` تنظیم شود، لاگ‌های فایل‌های تست مختلف به‌صورت بلادرنگ چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است هنگام اجرای موازی باعث درهم‌آمیختن خروجی لاگ‌های فایل‌های مختلف شود.

اگر روی `true` تنظیم شود، خروجی‌های لاگ بر اساس Test Spec گروه‌بندی شده و فقط پس از تکمیل Test Spec چاپ می‌شوند.

به‌طور پیش‌فرض روی `false` تنظیم شده است، بنابراین لاگ‌ها به‌صورت بلادرنگ چاپ می‌شوند.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

کنترل می‌کند که آیا WebdriverIO به‌طور خودکار همه soft assertionها را در پایان هر تست بررسی کند یا خیر. وقتی روی `true` تنظیم شود، همه soft assertionهای انباشته‌شده به‌طور خودکار بررسی می‌شوند و در صورت شکست هر یک از آن‌ها، تست شکست می‌خورد. وقتی روی `false` تنظیم شود، باید متد assert را به‌صورت دستی فراخوانی کنید تا soft assertionها بررسی شوند.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

سرویس‌ها کار مشخصی را که نمی‌خواهید خودتان به آن رسیدگی کنید بر عهده می‌گیرند. آن‌ها تقریباً بدون هیچ زحمتی راه‌اندازی تست شما را بهبود می‌بخشند.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

فریم‌ورک تستی را که testrunner WDIO استفاده می‌کند تعریف می‌کند.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

گزینه‌های مختص فریم‌ورک. برای اطلاع از گزینه‌های موجود، مستندات آداپتور فریم‌ورک را ببینید. درباره این موضوع در [فریم‌ورک‌ها](frameworks) بیشتر بخوانید.

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

فهرست featureهای cucumber همراه با شماره خط (هنگام [استفاده از فریم‌ورک cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

فهرست reporterهای مورد استفاده. یک reporter می‌تواند یا یک رشته باشد، یا آرایه‌ای به شکل
`['reporterName', { /* reporter options */}]` که عنصر اول آن رشته‌ای با نام reporter و عنصر دوم شیئی با گزینه‌های reporter است.

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

تعیین می‌کند که reporterها در چه فاصله زمانی باید بررسی کنند که آیا همگام شده‌اند، در صورتی که لاگ‌های خود را به‌صورت ناهمگام گزارش می‌دهند (مثلاً اگر لاگ‌ها به یک فروشنده شخص ثالث ارسال شوند).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

حداکثر زمانی را تعیین می‌کند که reporterها برای اتمام بارگذاری همه لاگ‌های خود فرصت دارند، پیش از آنکه testrunner خطایی پرتاب کند.

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

پروفایل‌گیری Heap را برای فرایند worker فعال می‌کند. snapshot به‌طور خودکار هنگام خروج فرایند worker تولید می‌شود (از پروفایلر heap نمونه‌برداری استفاده می‌کند).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

پوشه‌ای که پروفایل‌های CPU (`.cpuprofile`) و پروفایل‌های Heap (`.heapprofile`) در آن ذخیره می‌شوند.

</Option>

### filesToWatch

<Option type="String[]" default="[]">

فهرستی از الگوهای رشته‌ای با پشتیبانی از glob که به testrunner می‌گوید هنگام اجرا با پرچم `--watch`، فایل‌های دیگری مانند فایل‌های برنامه را نیز زیر نظر بگیرد. به‌طور پیش‌فرض testrunner همه فایل‌های spec را زیر نظر دارد.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

اگر می‌خواهید snapshotهای خود را به‌روزرسانی کنید، روی true تنظیم کنید. بهتر است به‌عنوان بخشی از یک پارامتر CLI استفاده شود، مثلاً `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

مسیر پیش‌فرض snapshot را بازنویسی می‌کند. برای مثال، برای ذخیره snapshotها در کنار فایل‌های تست.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به‌طور خودکار از پوشه کاری فعلی شناسایی می‌شود، اما می‌توانید یک مسیر سفارشی را در اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

مستندات `tsx` را ببینید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

زمانی که نه `DISPLAY` و نه `WAYLAND_DISPLAY` تنظیم شده باشد، یک نمایشگر مجازی برای اجرا روی لینوکس راه‌اندازی می‌کند. وقتی به‌صورت headless یا فقط روی یک سرویس ابری یا grid راه دور اجرا می‌کنید، آن را روی `false` تنظیم کنید. این گزینه فقط کنترل می‌کند که آیا یک سرور نمایش راه‌اندازی شود یا خیر: اگر فقط `WAYLAND_DISPLAY` تنظیم شده باشد، testrunner همچنان `XDG_SESSION_TYPE`، `GDK_BACKEND` و `ELECTRON_OZONE_PLATFORM_HINT` را برای اجرا روی `wayland` تنظیم می‌کند. [Headless و سرورهای نمایش](/docs/headless-and-display-servers) را ببینید.

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

کدام سرور نمایش راه‌اندازی شود. `auto` ابتدا Weston را امتحان می‌کند و در صورتی که Weston موجود نباشد یا راه‌اندازی نشود، به Xvfb برمی‌گردد. `wayland` و `xvfb` فقط همان سرور را امتحان می‌کنند.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

زمانی که هیچ سرور نمایش نصب‌شده‌ای راه‌اندازی نشود، سرور نمایش موجود نبوده را با مدیر بسته سیستم نصب می‌کند.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

نحوه اجرای نصب داخلی: `root` فقط زمانی نصب می‌کند که با کاربر root اجرا شود، `sudo` در صورتی که root نباشد از `sudo -n` غیرتعاملی استفاده می‌کند، یا اگر `sudo` نصب نباشد بدون آن نصب می‌کند.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

فرمانی که به جای نصب داخلی، بدون تغییر و بدون `sudo` اجرا می‌شود. فقط با `displayServerAutoInstall: true` اجرا می‌شود. یک رشته در یک shell اجرا می‌شود و یک آرایه بدون shell اجرا می‌شود. با `auto`، ابتدا برای Weston اجرا می‌شود و فقط در صورتی که Weston همچنان در دسترس نباشد یا راه‌اندازی نشود و Xvfb همچنان موجود نباشد، دوباره برای Xvfb اجرا می‌شود. `displayServer` را روی سروری که این فرمان نصب می‌کند تنظیم کنید تا از تلاش برای سرور دیگر صرف‌نظر شود.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

عرض صفحه نمایشگر مجازی بر حسب پیکسل.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

ارتفاع صفحه نمایشگر مجازی بر حسب پیکسل.

</Option>

### displayServerDepth

<Option type="Number" default="24">

عمق رنگ نمایشگر مجازی. فقط Xvfb.

</Option>

## هوک‌ها

testrunner WDIO به شما امکان می‌دهد هوک‌هایی تنظیم کنید که در زمان‌های مشخصی از چرخه حیات تست فعال شوند. این امکان انجام اقدامات سفارشی را فراهم می‌کند (مثلاً گرفتن اسکرین‌شات در صورت شکست یک تست).

هر هوک اطلاعات مشخصی درباره چرخه حیات (مثلاً اطلاعاتی درباره suite تست یا تست) را به‌عنوان پارامتر دریافت می‌کند. درباره همه ویژگی‌های هوک‌ها در [پیکربندی نمونه ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) بیشتر بخوانید.

**توجه:** برخی هوک‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در فرایند متفاوتی اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده سراسری را با هوک‌های دیگری که در فرایند worker قرار دارند به اشتراک بگذارند.

### onPrepare

یک بار پیش از راه‌اندازی همه workerها اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): فهرست جزئیات capabilityها

### onWorkerStart

پیش از ایجاد یک فرایند worker اجرا می‌شود و می‌تواند برای مقداردهی اولیه سرویس خاص برای آن worker و همچنین تغییر محیط‌های اجرا به‌صورت ناهمگام استفاده شود.

پارامترها:

- `cid` (`string`): شناسه capability (مثلاً 0-0)
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): specهایی که در فرایند worker اجرا می‌شوند
- `args` (`object`): شیئی که پس از مقداردهی اولیه worker با پیکربندی اصلی ادغام می‌شود
- `execArgv` (`string[]`): فهرست آرگومان‌های رشته‌ای که به فرایند worker ارسال می‌شوند

### onWorkerEnd

درست پس از خروج یک فرایند worker اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه capability (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست. workerی که توسط یک سیگنال خاتمه یافته باشد، به جای آن `128` + شماره سیگنال را گزارش می‌دهد، مثلاً `139` برای `SIGSEGV`
- `specs` (`string[]`): specهایی که در فرایند worker اجرا می‌شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح spec که طبق [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) تعریف شده‌اند
- `signal` (`string`): سیگنالی که worker را خاتمه داده است، مثلاً `SIGSEGV`، یا `null` اگر خودش خارج شده باشد

### beforeSession

درست پیش از مقداردهی اولیه نشست webdriver و فریم‌ورک تست اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را بسته به capability یا spec تغییر دهید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): specهایی که در فرایند worker اجرا می‌شوند

### before

پیش از شروع اجرای تست اجرا می‌شود. در این مرحله می‌توانید به همه متغیرهای سراسری مانند `browser` دسترسی داشته باشید. این بهترین مکان برای تعریف فرمان‌های سفارشی است.

پارامترها:

- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): specهایی که در فرایند worker اجرا می‌شوند
- `browser` (`object`): نمونه نشست مرورگر/دستگاه ایجادشده

### beforeSuite

هوکی که پیش از شروع suite اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات suite

### beforeHook

هوکی که *پیش از* شروع یک هوک داخل suite اجرا می‌شود (مثلاً پیش از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): زمینه تست (نمایانگر شیء World در Cucumber)

### afterHook

هوکی که *پس از* پایان یک هوک داخل suite اجرا می‌شود (مثلاً پس از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): زمینه تست (نمایانگر شیء World در Cucumber)
- `result` (`object`): نتیجه هوک (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### beforeTest

تابعی که پیش از یک تست اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء scope که تست با آن اجرا شده است

### beforeCommand

پیش از اجرای یک فرمان WebdriverIO اجرا می‌شود.

پارامترها:

- `commandName` (`string`): نام فرمان
- `args` (`*`): آرگومان‌هایی که فرمان دریافت می‌کند

### afterCommand

پس از اجرای یک فرمان WebdriverIO اجرا می‌شود.

پارامترها:

- `commandName` (`string`): نام فرمان
- `args` (`*`): آرگومان‌هایی که فرمان دریافت می‌کند
- `result` (`*`): نتیجه فرمان
- `error` (`Error`): شیء خطا در صورت وجود

### afterTest

تابعی که پس از پایان یک تست (در Mocha/Jasmine) اجرا می‌شود.

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء scope که تست با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست تست، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع تست
- `result.duration` (`Number`): مدت زمان تست
- `result.passed` (`Boolean`): در صورت موفقیت تست true، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات مربوط به تلاش‌های مجدد یک تست واحد طبق تعریف برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber)، مثلاً `{ attempts: 0, limit: 0 }`، ببینید
- `result` (`object`): نتیجه هوک (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### afterSuite

هوکی که پس از پایان suite اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات suite

### after

پس از اتمام همه تست‌ها اجرا می‌شود. همچنان به همه متغیرهای سراسری تست دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - موفقیت تست، 1 - شکست تست
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): specهایی که در فرایند worker اجرا می‌شوند

### afterSession

درست پس از خاتمه نشست webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `specs` (`string[]`): specهایی که در فرایند worker اجرا می‌شوند

### onComplete

پس از خاموش شدن همه workerها و زمانی که فرایند در آستانه خروج است اجرا می‌شود. خطایی که در هوک onComplete پرتاب شود باعث شکست اجرای تست می‌شود.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل capabilityهای نشستی که در worker ایجاد خواهد شد
- `result` (`object`): شیء نتایج شامل نتایج تست

### onReload

هنگام وقوع یک refresh اجرا می‌شود.

پارامترها:

- `oldSessionId` (`string`): شناسه نشست قدیمی
- `newSessionId` (`string`): شناسه نشست جدید

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی درباره pickle و مرحله تست
- `context` (`object`): شیء World در Cucumber

### afterScenario

پس از یک Scenario در Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی درباره pickle و مرحله تست
- `result` (`object`): شیء نتایج شامل نتایج scenario
- `result.passed` (`boolean`): در صورت موفقیت scenario برابر true است
- `result.error` (`string`): پشته خطا در صورت شکست scenario
- `result.duration` (`number`): مدت زمان scenario بر حسب میلی‌ثانیه
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
- `result`: (`object`): شیء نتایج شامل نتایج step
- `result.passed` (`boolean`): در صورت موفقیت scenario برابر true است
- `result.error` (`string`): پشته خطا در صورت شکست scenario
- `result.duration` (`number`): مدت زمان scenario بر حسب میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeAssertion

هوکی که پیش از انجام یک assertion در WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات assertion
- `params.matcherName` (`string`): نام matcherی که تست فراخوانی کرده است (مثلاً `toHaveTitle`). برای یک نام مستعار، این همان نام مستعار است (مثلاً `toBeExisting`، نه `toExist`).
- `params.expectedValue`: مقداری که به matcher ارسال می‌شود
- `params.options`: گزینه‌های assertion

### afterAssertion

هوکی که پس از انجام یک assertion در WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات assertion
- `params.matcherName` (`string`): نام matcherی که تست فراخوانی کرده است (مثلاً `toHaveTitle`). برای یک نام مستعار، این همان نام مستعار است (مثلاً `toBeExisting`، نه `toExist`).
- `params.expectedValue`: مقداری که به matcher ارسال می‌شود
- `params.options`: گزینه‌های assertion
- `params.result` (`object`): نتیجه matcher، شامل `pass` (`boolean`) و `message()`. `pass` زمانی `true` است که مقدار با مقدار مورد انتظار مطابقت داشته باشد، حتی با `.not`: با `.not`، assertion زمانی موفق است که `pass` برابر `false` باشد.
---
id: configuration
title: پیکربندی
---

بر اساس [نوع راه‌اندازی](/docs/setuptypes) (مثلاً استفاده از پروتکل خام، WebdriverIO به عنوان بسته مستقل یا تست‌رانر WDIO) مجموعه‌ای از گزینه‌های مختلف برای کنترل محیط وجود دارد.

## گزینه‌های WebDriver

گزینه‌های زیر هنگام استفاده از بسته پروتکل [`webdriver`](https://www.npmjs.com/package/webdriver) تعریف می‌شوند:

### protocol

پروتکلی که برای ارتباط با سرور درایور استفاده می‌شود.

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

پارامترهای پرس‌وجو که به سرور درایور منتقل می‌شوند.

نوع: `Object`<br />
پیش‌فرض: `undefined`

### user

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به صورت خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، این مورد می‌تواند برای احراز هویت هر پشتیبان WebDriver دیگری استفاده شود.

نوع: `String`<br />
پیش‌فرض: `undefined`

### key

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به صورت خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، این مورد می‌تواند برای احراز هویت هر پشتیبان WebDriver دیگری استفاده شود.

نوع: `String`<br />
پیش‌فرض: `undefined`

### capabilities

قابلیت‌هایی را که می‌خواهید در جلسه WebDriver خود اجرا کنید، تعریف می‌کند. برای جزئیات بیشتر، [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را بررسی کنید. اگر از یک درایور قدیمی‌تر استفاده می‌کنید که از پروتکل WebDriver پشتیبانی نمی‌کند، باید از [قابلیت‌های JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) برای اجرای موفقیت‌آمیز یک جلسه استفاده کنید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های خاص مرورگر و فروشنده را اعمال کنید که امکان تنظیم عمیق‌تر مرورگر یا دستگاه راه دور را فراهم می‌کند. این‌ها در اسناد فروشنده مربوطه مستند شده‌اند، به عنوان مثال:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، یک ابزار مفید، [پیکربندی خودکار تست Sauce Labs](https://docs.saucelabs.com/basics/platform-configurator/) است که به شما کمک می‌کند با کلیک کردن روی قابلیت‌های مورد نظر خود، این شیء را ایجاد کنید.

نوع: `Object`<br />
پیش‌فرض: `null`

**مثال:**

```js
{
    browserName: 'chrome', // گزینه‌ها: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // نسخه مرورگر
    platformName: 'Windows 10' // پلتفرم سیستم عامل
}
```

اگر تست‌های وب یا بومی را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver متفاوت است. برای اطلاعات بیشتر به [اسناد Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) مراجعه کنید.

### logLevel

سطح جزئیات گزارش‌دهی.

نوع: `String`<br />
پیش‌فرض: `info`<br />
گزینه‌ها: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دایرکتوری برای ذخیره تمام فایل‌های گزارش تست‌رانر (شامل گزارش‌های گزارشگر و گزارش‌های `wdio`). اگر تنظیم نشده باشد، تمام گزارش‌ها به `stdout` ارسال می‌شوند. از آنجا که اکثر گزارشگرها برای ارسال گزارش به `stdout` ساخته شده‌اند، توصیه می‌شود از این گزینه فقط برای گزارشگرهای خاصی استفاده کنید که منطقی‌تر است گزارش را به یک فایل ارسال کنند (مانند گزارشگر `junit`، به عنوان مثال).

در حالت مستقل، تنها گزارش تولید شده توسط WebdriverIO، گزارش `wdio` خواهد بود.

نوع: `String`<br />
پیش‌فرض: `null`

### connectionRetryTimeout

زمان انتظار برای هر درخواست WebDriver به یک درایور یا شبکه.

نوع: `Number`<br />
پیش‌فرض: `120000`

### connectionRetryCount

حداکثر تعداد تلاش‌های مجدد درخواست به سرور Selenium.

نوع: `Number`<br />
پیش‌فرض: `3`

### agent

به شما امکان می‌دهد از یک عامل سفارشی `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) برای ارسال درخواست‌ها استفاده کنید.

نوع: `Object`<br />
پیش‌فرض:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

سرآیندهای سفارشی را برای ارسال در هر درخواست WebDriver مشخص کنید. اگر شبکه Selenium شما نیاز به احراز هویت پایه دارد، توصیه می‌کنیم یک سرآیند `Authorization` را از طریق این گزینه برای احراز هویت درخواست‌های WebDriver خود ارسال کنید، به عنوان مثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// خواندن نام کاربری و رمز عبور از متغیرهای محیطی
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ترکیب نام کاربری و رمز عبور با جداکننده دو نقطه
const credentials = `${username}:${password}`;
// رمزنگاری اعتبارنامه‌ها با استفاده از Base64
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

تابعی که اشیاء پاسخ HTTP را پس از دریافت پاسخ WebDriver رهگیری می‌کند. این تابع با دریافت شیء پاسخ اصلی به عنوان اولین پارامتر و `RequestOptions` مربوطه به عنوان پارامتر دوم فراخوانی می‌شود.

نوع: `(Response, RequestOptions) => Response`<br />
پیش‌فرض: *هیچ*

### strictSSL

مشخص می‌کند که آیا نیاز به معتبر بودن گواهی SSL دارد یا خیر.
می‌تواند از طریق متغیرهای محیطی به صورت `STRICT_SSL` یا `strict_ssl` تنظیم شود.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### enableDirectConnect

آیا [ویژگی اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود.
اگر پرچم فعال باشد اما پاسخ کلیدهای مناسب را نداشته باشد، هیچ کاری انجام نمی‌دهد.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### cacheDir

مسیر به ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `String`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

گزینه‌های زیر (از جمله موارد ذکر شده در بالا) را می‌توان با WebdriverIO به صورت مستقل استفاده کرد:

### automationProtocol

پروتکلی را که می‌خواهید برای اتوماسیون مرورگر خود استفاده کنید، تعریف کنید. در حال حاضر فقط [`webdriver`](https://www.npmjs.com/package/webdriver) پشتیبانی می‌شود، زیرا این فناوری اصلی اتوماسیون مرورگر است که WebdriverIO از آن استفاده می‌کند.

اگر می‌خواهید مرورگر را با استفاده از فناوری اتوماسیون متفاوتی کنترل کنید، مطمئن شوید که این ویژگی را به مسیری تنظیم کنید که به ماژولی حل شود که از رابط زیر پیروی می‌کند:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * یک جلسه اتوماسیون را شروع کنید و یک موناد WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * با دستورات اتوماسیون مربوطه برگردانید. به بسته [webdriver](https://www.npmjs.com/package/webdriver)
     * به عنوان پیاده‌سازی مرجع نگاه کنید
     *
     * @param {Capabilities.RemoteConfig} options گزینه‌های WebdriverIO
     * @param {Function} hook که اجازه می‌دهد قبل از آزاد شدن کلاینت از تابع، آن را اصلاح کنید
     * @param {PropertyDescriptorMap} userPrototype به کاربر اجازه می‌دهد دستورات پروتکل سفارشی اضافه کند
     * @param {Function} customCommandWrapper اجازه می‌دهد اجرای دستور را اصلاح کنید
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
     * مستقیماً به شیء مرورگر منتقل شده تغییر می‌دهد
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

با تنظیم یک URL پایه، فراخوانی‌های دستور `url` را کوتاه کنید.
- اگر پارامتر `url` شما با `/` شروع شود، `baseUrl` در ابتدای آن قرار می‌گیرد (به جز مسیر `baseUrl`، اگر داشته باشد).
- اگر پارامتر `url` شما بدون طرح یا `/` شروع شود (مانند `some/path`)، `baseUrl` کامل مستقیماً در ابتدای آن قرار می‌گیرد.

نوع: `String`<br />
پیش‌فرض: `null`

### waitforTimeout

زمان انتظار پیش‌فرض برای تمام دستورات `waitFor*`. (توجه داشته باشید که `f` در نام گزینه با حروف کوچک است.) این زمان انتظار __فقط__ روی دستوراتی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آنها تأثیر می‌گذارد.

برای افزایش زمان انتظار برای یک _تست_، لطفاً به اسناد فریم‌ورک مراجعه کنید.

نوع: `Number`<br />
پیش‌فرض: `5000`

### waitforInterval

فاصله زمانی پیش‌فرض برای تمام دستورات `waitFor*` برای بررسی اینکه آیا یک وضعیت مورد انتظار (مثلاً قابل مشاهده بودن) تغییر کرده است.

نوع: `Number`<br />
پیش‌فرض: `100`

### region

اگر از Sauce Labs استفاده می‌کنید، می‌توانید انتخاب کنید که تست‌ها را بین مراکز داده مختلف اجرا کنید: US یا EU.
برای تغییر منطقه خود به EU، `region: 'eu'` را به پیکربندی خود اضافه کنید.

__نکته:__ این فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` مرتبط با حساب Sauce Labs خود را ارائه دهید.

نوع: `String`<br />
پیش‌فرض: `us`

*(فقط برای ماشین‌های مجازی و/یا شبیه‌سازها)*

---

## گزینه‌های Testrunner

گزینه‌های زیر (شامل موارد ذکر شده در بالا) فقط برای اجرای WebdriverIO با تست‌رانر WDIO تعریف شده‌اند:

### specs

مشخصات را برای اجرای تست تعریف کنید. می‌توانید یک الگوی glob برای تطبیق چندین فایل به طور هم‌زمان مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا آنها را در یک فرآیند کارگر واحد اجرا کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `(String | String[])[]`<br />
پیش‌فرض: `[]`

### exclude

مشخصات را از اجرای تست حذف کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### suites

شیئی که مجموعه‌های مختلف را توصیف می‌کند، که می‌توانید با گزینه `--suite` در CLI `wdio` مشخص کنید.

نوع: `Object`<br />
پیش‌فرض: `{}`

### capabilities

مانند بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که گزینه‌ای برای مشخص کردن یک شیء [`multiremote`](/docs/multiremote) یا چندین جلسه WebDriver در یک آرایه برای اجرای موازی وجود دارد.

می‌توانید همان قابلیت‌های خاص فروشنده و مرورگر را که [در بالا](/docs/configuration#capabilities) تعریف شده است، اعمال کنید.

نوع: `Object`|`Object[]`<br />
پیش‌فرض: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

حداکثر تعداد کارگرهای موازی در حال اجرا.

__نکته:__ ممکن است عددی به بزرگی `100` باشد، هنگامی که تست‌ها روی فروشندگان خارجی مانند ماشین‌های Sauce Labs انجام می‌شوند. در آنجا، تست‌ها روی یک ماشین واحد آزمایش نمی‌شوند، بلکه روی چندین ماشین مجازی انجام می‌شوند. اگر تست‌ها باید روی یک ماشین توسعه محلی اجرا شوند، از عددی منطقی‌تر مانند `3`، `4` یا `5` استفاده کنید. اساساً، این تعداد مرورگرهایی است که به طور هم‌زمان شروع می‌شوند و تست‌های شما را به طور هم‌زمان اجرا می‌کنند، بنابراین به میزان حافظه RAM موجود در دستگاه شما و تعداد برنامه‌های دیگری که روی دستگاه شما اجرا می‌شوند، بستگی دارد.

همچنین می‌توانید `maxInstances` را در اشیاء قابلیت خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این کار تعداد جلسات موازی را برای آن قابلیت خاص محدود می‌کند.

نوع: `Number`<br />
پیش‌فرض: `100`

### maxInstancesPerCapability

حداکثر تعداد کارگرهای موازی در حال اجرا به ازای هر قابلیت.

نوع: `Number`<br />
پیش‌فرض: `100`

### injectGlobals

متغیرهای جهانی WebdriverIO (مانند `browser`، `$` و `$$`) را به محیط جهانی وارد می‌کند.
اگر آن را به `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید، به عنوان مثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

نکته: WebdriverIO تزریق متغیرهای جهانی خاص فریم‌ورک تست را مدیریت نمی‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### bail

اگر می‌خواهید اجرای تست شما پس از تعداد مشخصی از شکست‌های تست متوقف شود، از `bail` استفاده کنید.
(پیش‌فرض آن `0` است، که همه تست‌ها را بدون توجه به نتیجه اجرا می‌کند.) **نکته:** منظور از یک تست در این زمینه همه تست‌های داخل یک فایل مشخصات واحد (هنگام استفاده از Mocha یا Jasmine) یا تمام مراحل یک فایل ویژگی (هنگام استفاده از Cucumber) است. اگر می‌خواهید رفتار bail را در تست‌های یک فایل تست واحد کنترل کنید، به گزینه‌های موجود [فریم‌ورک](frameworks) نگاه کنید.

نوع: `Number`<br />
پیش‌فرض: `0` (بدون توقف؛ همه تست‌ها را اجرا کن)

### specFileRetries

تعداد دفعاتی که یک فایل مشخصات کامل را در صورت شکست به عنوان یک کل دوباره امتحان کنید.

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDelay

تأخیر به ثانیه بین تلاش‌های مجدد فایل مشخصات

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDeferred

آیا فایل‌های مشخصات مجدداً تلاش شده باید فوراً دوباره تلاش شوند یا به انتهای صف منتقل شوند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### groupLogsByTestSpec

نمای خروجی گزارش را انتخاب کنید.

اگر روی `false` تنظیم شود، گزارش‌های فایل‌های تست مختلف در زمان واقعی چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است هنگام اجرا به صورت موازی باعث ترکیب خروجی‌های گزارش از فایل‌های مختلف شود.

اگر روی `true` تنظیم شود، خروجی‌های گزارش بر اساس مشخصات تست گروه‌بندی می‌شوند و فقط زمانی چاپ می‌شوند که مشخصات تست تکمیل شده باشد.

به طور پیش‌فرض، این گزینه روی `false` تنظیم شده است تا گزارش‌ها در زمان واقعی چاپ شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### services

سرویس‌ها کار خاصی را که نمی‌خواهید از آن مراقبت کنید، انجام می‌دهند. آنها با تلاشی تقریباً صفر، محیط تست شما را بهبود می‌بخشند.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

### framework

فریم‌ورک تست مورد استفاده توسط تست‌رانر WDIO را تعریف می‌کند.

نوع: `String`<br />
پیش‌فرض: `mocha`<br />
گزینه‌ها: `mocha` | `jasmine`

### mochaOpts, jasmineOpts و cucumberOpts

گزینه‌های خاص مرتبط با فریم‌ورک. مستندات آداپتور فریم‌ورک را ببینید تا بدانید کدام گزینه‌ها در دسترس هستند. برای اطلاعات بیشتر در این مورد، به [Frameworks](frameworks) مراجعه کنید.

نوع: `Object`<br />
پیش‌فرض: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

لیست ویژگی‌های خیار با شماره خط (هنگام [استفاده از فریم‌ورک خیار](./Frameworks.md#using-cucumber)).

نوع: `String[]`
پیش‌فرض: `[]`

### reporters

لیست گزارشگرهای مورد استفاده. یک گزارشگر می‌تواند یک رشته باشد، یا آرایه‌ای از
`['reporterName', { /* گزینه‌های گزارشگر */}]` که در آن عنصر اول یک رشته با نام گزارشگر و عنصر دوم یک شیء با گزینه‌های گزارشگر است.

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

تعیین می‌کند که گزارشگر در چه فاصله زمانی باید بررسی کند که آیا همگام‌سازی شده‌اند، اگر گزارش‌های خود را به صورت ناهمگام گزارش می‌دهند (مثلاً اگر گزارش‌ها به یک فروشنده شخص ثالث ارسال می‌شوند).

نوع: `Number`<br />
پیش‌فرض: `100` (میلی‌ثانیه)

### reporterSyncTimeout

حداکثر زمانی را تعیین می‌کند که گزارشگران برای اتمام آپلود تمام گزارش‌های خود دارند تا زمانی که خطایی توسط تست‌رانر ایجاد شود.

نوع: `Number`<br />
پیش‌فرض: `5000` (میلی‌ثانیه)

### execArgv

آرگومان‌های Node که هنگام راه‌اندازی فرآیندهای فرزند مشخص می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `null`

### filesToWatch

لیستی از الگوهای رشته‌ای پشتیبانی‌کننده glob که به تست‌رانر می‌گویند که فایل‌های دیگری را نیز زیر نظر بگیرد، مثلاً فایل‌های برنامه، هنگامی که با پرچم `--watch` اجرا می‌شود. به طور پیش‌فرض، تست‌رانر از قبل همه فایل‌های مشخصات را زیر نظر دارد.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### updateSnapshots

اگر می‌خواهید اسنپ‌شات‌های خود را به‌روز کنید، روی true تنظیم کنید. ایده‌آل است که به عنوان بخشی از یک پارامتر CLI استفاده شود، مثلاً `wdio run wdio.conf.js --s`.

نوع: `'new' | 'all' | 'none'`<br />
پیش‌فرض: `none` اگر ارائه نشده و تست‌ها در CI اجرا شوند، `new` اگر ارائه نشده، در غیر این صورت آنچه ارائه شده است

### resolveSnapshotPath

مسیر پیش‌فرض اسنپ‌شات را لغو می‌کند. به عنوان مثال، برای ذخیره اسنپ‌شات‌ها در کنار فایل‌های تست.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

نوع: `(testPath: string, snapExtension: string) => string`<br />
پیش‌فرض: فایل‌های اسنپ‌شات را در دایرکتوری `__snapshots__` در کنار فایل تست ذخیره می‌کند

### tsConfigPath

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود، اما می‌توانید یک مسیر سفارشی را در اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

اسناد `tsx` را ببینید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

نوع: `String`<br />
پیش‌فرض: `null`<br />

## هوک‌ها

تست‌رانر WDIO به شما امکان می‌دهد هوک‌هایی را تنظیم کنید که در زمان‌های خاصی از چرخه حیات تست فعال می‌شوند. این امکان اعمال سفارشی (مثلاً گرفتن اسکرین‌شات در صورت شکست تست) را فراهم می‌کند.

هر هوک به عنوان پارامتر، اطلاعات خاصی درباره چرخه حیات (مثلاً اطلاعاتی درباره مجموعه تست یا تست) دارد. برای کسب اطلاعات بیشتر درباره تمام ویژگی‌های هوک، [پیکربندی نمونه ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) را مطالعه کنید.

**نکته:** برخی هوک‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در یک فرآیند متفاوت اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده جهانی را با سایر هوک‌هایی که در فرآیند کارگر وجود دارند، به اشتراک بگذارند.

### onPrepare

یک بار قبل از راه‌اندازی تمام کارگرها اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): لیست جزئیات قابلیت‌ها

### onWorkerStart

قبل از ایجاد یک فرآیند کارگر اجرا می‌شود و می‌تواند برای راه‌اندازی سرویس خاص برای آن کارگر و همچنین اصلاح محیط‌های اجرایی به صورت ناهمگام استفاده شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `caps` (`object`): شامل قابلیت‌هایی برای جلسه‌ای که در فرآیند کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `args` (`object`): شیئی که پس از راه‌اندازی کارگر با پیکربندی اصلی ادغام خواهد شد
- `execArgv` (`string[]`): لیست آرگومان‌های رشته‌ای منتقل شده به فرآیند کارگر

### onWorkerEnd

درست پس از خروج یک فرآیند کارگر اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح مشخصات که مطابق [_"افزودن تلاش‌های مجدد بر اساس فایل مشخصات"_](./Retry.md#add-retries-on-a-per-specfile-basis) تعریف شده است

### beforeSession

درست قبل از راه‌اندازی جلسه webdriver و فریم‌ورک تست اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را بر اساس قابلیت یا مشخصات دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌هایی برای جلسه‌ای که در فرآیند کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### before

قبل از شروع اجرای تست اجرا می‌شود. در این نقطه می‌توانید به تمام متغیرهای جهانی مانند `browser` دسترسی پیدا کنید. این مکان مناسبی برای تعریف دستورات سفارشی است.

پارامترها:

- `caps` (`object`): شامل قابلیت‌هایی برای جلسه‌ای که در فرآیند کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `browser` (`object`): نمونه‌ای از جلسه مرورگر/دستگاه ایجاد شده

### beforeSuite

هوکی که قبل از شروع مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### beforeHook

هوکی که *قبل* از یک هوک درون مجموعه اجرا می‌شود (مثلاً قبل از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): بافت تست (در Cucumber، شیء World را نشان می‌دهد)

### afterHook

هوکی که *بعد* از یک هوک درون مجموعه اجرا می‌شود (مثلاً بعد از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): بافت تست (در Cucumber، شیء World را نشان می‌دهد)
- `result` (`object`): نتیجه هوک (شامل `error`، `result`، `duration`، `passed`، `retries` است)

### beforeTest

تابعی که قبل از یک تست اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء محدوده که تست با آن اجرا شده است

### beforeCommand

قبل از اجرای یک دستور WebdriverIO اجرا می‌شود.

پارامترها:

- `commandName` (`string`): نام دستور
- `args` (`*`): آرگومان‌هایی که دستور دریافت می‌کند

### afterCommand

بعد از اجرای یک دستور WebdriverIO اجرا می‌شود.

پارامترها:

- `commandName` (`string`): نام دستور
- `args` (`*`): آرگومان‌هایی که دستور دریافت می‌کند
- `result` (`number`): 0 - موفقیت دستور، 1 - خطای دستور
- `error` (`Error`): شیء خطا در صورت وجود

### afterTest

تابعی که بعد از پایان یک تست (در Mocha/Jasmine) اجرا می‌شود.

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء محدوده که تست با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست تست، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع تست
- `result.duration` (`Number`): مدت زمان تست
- `result.passed` (`Boolean`): true اگر تست موفق بوده، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات مربوط به تلاش‌های مجدد تک تست همانطور که برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber) تعریف شده است، مثلاً `{ attempts: 0, limit: 0 }`
- `result` (`object`): نتیجه هوک (شامل `error`، `result`، `duration`، `passed`، `retries` است)

### afterSuite

هوکی که بعد از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### after

بعد از اتمام همه تست‌ها اجرا می‌شود. هنوز به تمام متغیرهای جهانی از تست دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - موفقیت تست، 1 - شکست تست
- `caps` (`object`): شامل قابلیت‌هایی برای جلسه‌ای که در فرآیند کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### afterSession

درست بعد از پایان جلسه webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌هایی برای جلسه‌ای که در فرآیند کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### onComplete

بعد از خاموش شدن تمام کارگرها و قبل از خروج فرآیند اجرا می‌شود. خطایی که در هوک onComplete ایجاد شود منجر به شکست اجرای تست خواهد شد.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌هایی برای جلسه‌ای که در فرآیند کارگر ایجاد خواهد شد
- `result` (`object`): شیء نتایج شامل نتایج تست

### onReload

هنگام بارگذاری مجدد اجرا می‌شود.

پارامترها:

- `oldSessionId` (`string`): شناسه جلسه قدیمی
- `newSessionId` (`string`): شناسه جلسه جدید

### beforeFeature

قبل از یک ویژگی Cucumber اجرا می‌شود.

پارامترها:

- `uri` (`string`): مسیر به فایل ویژگی
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): شیء ویژگی Cucumber

### afterFeature

بعد از یک ویژگی Cucumber اجرا می‌شود.

پارامترها:

- `uri` (`string`): مسیر به فایل ویژگی
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): شیء ویژگی Cucumber

### beforeScenario

قبل از یک سناریو Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی درباره pickle و مرحله تست
- `context` (`object`): شیء World در Cucumber

### afterScenario

بعد از یک سناریو Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی درباره pickle و مرحله تست
- `result` (`object`): شیء نتایج شامل نتایج سناریو
- `result.passed` (`boolean`): true اگر سناریو موفق بوده است
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده است
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeStep

قبل از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریو Cucumber
- `context` (`object`): شیء World در Cucumber

### afterStep

بعد از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریو Cucumber
- `result`: (`object`): شیء نتایج شامل نتایج مرحله
- `result.passed` (`boolean`): true اگر سناریو موفق بوده است
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده است
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeAssertion

هوکی که قبل از انجام یک تایید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تایید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده منتقل می‌شود
- `params.options`: گزینه‌های تایید

### afterAssertion

هوکی که بعد از انجام یک تایید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تایید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده منتقل می‌شود
- `params.options`: گزینه‌های تایید
- `params.result`: نتایج تایید
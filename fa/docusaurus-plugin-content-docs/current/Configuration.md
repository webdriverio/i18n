---
id: configuration
title: پیکربندی
---

بر اساس [نوع راه‌اندازی](/docs/setuptypes) (مثلا استفاده از پروتکل‌های خام، WebdriverIO به عنوان پکیج مستقل یا WDIO testrunner) مجموعه‌های مختلفی از گزینه‌ها برای کنترل محیط در دسترس هستند.

## گزینه‌های WebDriver

گزینه‌های زیر هنگام استفاده از پکیج پروتکل [`webdriver`](https://www.npmjs.com/package/webdriver) تعریف می‌شوند:

### protocol

پروتکل مورد استفاده برای ارتباط با سرور درایور.

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

پارامترهای پرسشی که به سرور درایور ارسال می‌شوند.

نوع: `Object`<br />
پیش‌فرض: `undefined`

### user

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توانید از این برای احراز هویت هر پشتیبان WebDriver دیگری استفاده کنید.

نوع: `String`<br />
پیش‌فرض: `undefined`

### key

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توانید از این برای احراز هویت هر پشتیبان WebDriver دیگری استفاده کنید.

نوع: `String`<br />
پیش‌فرض: `undefined`

### capabilities

قابلیت‌هایی را که می‌خواهید در جلسه WebDriver خود اجرا کنید، تعریف می‌کند. برای جزئیات بیشتر، [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را بررسی کنید. اگر یک درایور قدیمی‌تر را اجرا می‌کنید که از پروتکل WebDriver پشتیبانی نمی‌کند، باید از [قابلیت‌های JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) برای اجرای موفق یک جلسه استفاده کنید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های خاص مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر راه دور یا دستگاه را فراهم می‌کند. این موارد در اسناد فروشنده مربوطه مستند شده‌اند، مانند:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، ابزار مفیدی به نام [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) از Sauce Labs وجود دارد که به شما کمک می‌کند این شیء را با کلیک کردن روی قابلیت‌های مورد نظر خود ایجاد کنید.

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

اگر آزمایش‌های وب یا بومی را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver متفاوت است. برای جزئیات بیشتر، [اسناد Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) را ببینید.

### logLevel

سطح گزارش‌دهی.

نوع: `String`<br />
پیش‌فرض: `info`<br />
گزینه‌ها: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دایرکتوری برای ذخیره تمام فایل‌های لاگ testrunner (شامل لاگ‌های گزارش‌دهنده و لاگ‌های `wdio`). اگر تنظیم نشود، همه لاگ‌ها به `stdout` ارسال می‌شوند. از آنجا که اکثر گزارش‌دهنده‌ها برای لاگ کردن به `stdout` ساخته شده‌اند، توصیه می‌شود فقط از این گزینه برای گزارش‌دهنده‌های خاصی استفاده کنید که در آنها ارسال گزارش به یک فایل منطقی‌تر است (مانند گزارش‌دهنده `junit`).

هنگام اجرا در حالت مستقل، تنها لاگ تولید شده توسط WebdriverIO، لاگ `wdio` خواهد بود.

نوع: `String`<br />
پیش‌فرض: `null`

### connectionRetryTimeout

زمان انتظار برای هر درخواست WebDriver به یک درایور یا گرید.

نوع: `Number`<br />
پیش‌فرض: `120000`

### connectionRetryCount

حداکثر تعداد تلاش‌های مجدد درخواست به سرور Selenium.

نوع: `Number`<br />
پیش‌فرض: `3`

### agent

به شما امکان می‌دهد از یک `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) سفارشی برای ارسال درخواست استفاده کنید.

نوع: `Object`<br />
پیش‌فرض:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

هدرهای سفارشی را برای ارسال در هر درخواست WebDriver مشخص کنید. اگر گرید Selenium شما نیاز به احراز هویت پایه دارد، توصیه می‌کنیم یک هدر `Authorization` را از طریق این گزینه برای احراز هویت درخواست‌های WebDriver خود ارسال کنید، مثلا:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// خواندن نام کاربری و رمز عبور از متغیرهای محیطی
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ترکیب نام کاربری و رمز عبور با جداکننده دو نقطه
const credentials = `${username}:${password}`;
// کدگذاری اعتبارنامه‌ها با استفاده از Base64
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

تابعی که [گزینه‌های درخواست HTTP](https://github.com/sindresorhus/got#options) را قبل از ارسال درخواست WebDriver رهگیری می‌کند

نوع: `(RequestOptions) => RequestOptions`<br />
پیش‌فرض: *هیچ*

### transformResponse

تابعی که اشیاء پاسخ HTTP را پس از دریافت پاسخ WebDriver رهگیری می‌کند. این تابع شیء پاسخ اصلی را به عنوان اولین آرگومان و `RequestOptions` مربوطه را به عنوان آرگومان دوم دریافت می‌کند.

نوع: `(Response, RequestOptions) => Response`<br />
پیش‌فرض: *هیچ*

### strictSSL

آیا نیازی به معتبر بودن گواهی SSL نیست.
می‌تواند از طریق متغیرهای محیطی مانند `STRICT_SSL` یا `strict_ssl` تنظیم شود.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### enableDirectConnect

آیا [ویژگی اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود.
اگر پرچم فعال باشد اما پاسخ کلیدهای مناسب را نداشته باشد، کاری انجام نمی‌دهد.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### cacheDir

مسیر به ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `String`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

برای لاگ کردن امن‌تر، عبارات منظم تنظیم شده با `maskingPatterns` می‌توانند اطلاعات حساس را از لاگ مبهم کنند.
 - فرمت رشته یک عبارت منظم با یا بدون پرچم (مانند `/.../i`) و برای چندین عبارت منظم با کاما جدا می‌شود.
 - برای جزئیات بیشتر در مورد الگوهای پنهان‌سازی، بخش [Masking Patterns در README لاگر WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) را ببینید.

نوع: `String`<br />
پیش‌فرض: `undefined`

**مثال:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

گزینه‌های زیر (از جمله موارد ذکر شده در بالا) را می‌توان با WebdriverIO به صورت مستقل استفاده کرد:

### automationProtocol

پروتکلی را که می‌خواهید برای اتوماسیون مرورگر خود استفاده کنید، تعریف کنید. در حال حاضر فقط [`webdriver`](https://www.npmjs.com/package/webdriver) پشتیبانی می‌شود، زیرا فناوری اصلی اتوماسیون مرورگر است که WebdriverIO از آن استفاده می‌کند.

اگر می‌خواهید مرورگر را با استفاده از فناوری اتوماسیون متفاوتی خودکار کنید، این ویژگی را به مسیری تنظیم کنید که به ماژولی اشاره کند که از رابط زیر پیروی می‌کند:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * یک جلسه اتوماسیون را شروع کنید و یک [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO 
     * با دستورات اتوماسیون مربوطه برگردانید. به بسته [webdriver](https://www.npmjs.com/package/webdriver) 
     * به عنوان یک پیاده‌سازی مرجع نگاه کنید
     *
     * @param {Capabilities.RemoteConfig} options گزینه‌های WebdriverIO
     * @param {Function} hook که به شما امکان می‌دهد کلاینت را قبل از خروج از تابع تغییر دهید
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
     * @param   {object} instance  شیئی که از یک جلسه جدید مرورگر دریافت می‌کنیم.
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
- اگر پارامتر `url` شما با `/` شروع شود، `baseUrl` پیشوند می‌شود (به جز مسیر `baseUrl`، اگر داشته باشد).
- اگر پارامتر `url` شما بدون یک طرح یا `/` شروع شود (مانند `some/path`)، کل `baseUrl` به طور مستقیم پیشوند می‌شود.

نوع: `String`<br />
پیش‌فرض: `null`

### waitforTimeout

زمان انتظار پیش‌فرض برای همه دستورات `waitFor*`. (توجه داشته باشید که `f` در نام گزینه کوچک است.) این زمان انتظار __فقط__ بر دستوراتی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آنها تأثیر می‌گذارد.

برای افزایش زمان انتظار برای یک _آزمایش_، لطفاً اسناد فریم‌ورک را ببینید.

نوع: `Number`<br />
پیش‌فرض: `5000`

### waitforInterval

فاصله پیش‌فرض برای همه دستورات `waitFor*` برای بررسی اینکه آیا یک وضعیت مورد انتظار (مانند قابلیت مشاهده) تغییر کرده است.

نوع: `Number`<br />
پیش‌فرض: `100`

### region

اگر روی Sauce Labs اجرا می‌کنید، می‌توانید آزمایش‌ها را بین مراکز داده مختلف اجرا کنید: US یا EU.
برای تغییر منطقه خود به EU، `region: 'eu'` را به پیکربندی خود اضافه کنید.

__نکته:__ این فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` مرتبط با حساب Sauce Labs خود را ارائه دهید.

نوع: `String`<br />
پیش‌فرض: `us`

*(فقط برای vm و یا em/شبیه‌سازها)*

---

## گزینه‌های Testrunner

گزینه‌های زیر (از جمله موارد ذکر شده در بالا) فقط برای اجرای WebdriverIO با testrunner WDIO تعریف شده‌اند:

### specs

مشخصات را برای اجرای آزمایش تعریف کنید. می‌توانید یک الگوی glob برای مطابقت با چندین فایل به طور همزمان مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا آنها را در یک فرآیند کارگر واحد اجرا کنید. همه مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `(String | String[])[]`<br />
پیش‌فرض: `[]`

### exclude

مشخصات را از اجرای آزمایش حذف کنید. همه مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### suites

یک شیء که مجموعه‌های مختلف را توصیف می‌کند، که می‌توانید سپس با گزینه `--suite` در CLI `wdio` مشخص کنید.

نوع: `Object`<br />
پیش‌فرض: `{}`

### capabilities

همانند بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که گزینه مشخص کردن یک شیء [`multiremote`](/docs/multiremote) یا چندین جلسه WebDriver در یک آرایه برای اجرای همزمان وجود دارد.

می‌توانید همان قابلیت‌های خاص فروشنده و مرورگر را که [در بالا](/docs/configuration#capabilities) تعریف شده است، اعمال کنید.

نوع: `Object`|`Object[]`<br />
پیش‌فرض: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

حداکثر تعداد کل کارگران اجرایی موازی.

__نکته:__ ممکن است تا حد `100` باشد، هنگامی که آزمایش‌ها در برخی فروشندگان خارجی مانند ماشین‌های Sauce Labs انجام می‌شوند. در آنجا، آزمایش‌ها روی یک ماشین واحد آزمایش نمی‌شوند، بلکه روی چندین ماشین مجازی. اگر آزمایش‌ها قرار است روی یک ماشین توسعه محلی اجرا شوند، از عددی معقول‌تر مانند `3`، `4` یا `5` استفاده کنید. اساساً، این تعداد مرورگرهایی است که به طور همزمان شروع می‌شوند و آزمایش‌های شما را در یک زمان اجرا می‌کنند، بنابراین به میزان RAM موجود در ماشین شما و تعداد برنامه‌های دیگری که روی ماشین شما اجرا می‌شوند بستگی دارد.

همچنین می‌توانید `maxInstances` را در اشیاء قابلیت خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این تعداد جلسات موازی را برای آن قابلیت خاص محدود می‌کند.

نوع: `Number`<br />
پیش‌فرض: `100`

### maxInstancesPerCapability

حداکثر تعداد کل کارگران اجرایی موازی به ازای هر قابلیت.

نوع: `Number`<br />
پیش‌فرض: `100`

### injectGlobals

متغیرهای سراسری WebdriverIO (مانند `browser`، `$` و `$$`) را در محیط سراسری وارد می‌کند.
اگر روی `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید، مثلاً:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

نکته: WebdriverIO تزریق متغیرهای سراسری خاص فریم‌ورک آزمون را مدیریت نمی‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### bail

اگر می‌خواهید اجرای آزمایش شما پس از تعداد مشخصی از خطاهای آزمایش متوقف شود، از `bail` استفاده کنید.
(پیش‌فرض آن `0` است، که همه آزمایش‌ها را بدون توجه به نتیجه اجرا می‌کند.) **نکته:** یک آزمایش در این زمینه شامل همه آزمایش‌های درون یک فایل مشخصات واحد (هنگام استفاده از Mocha یا Jasmine) یا همه مراحل درون یک فایل ویژگی (هنگام استفاده از Cucumber) است. اگر می‌خواهید رفتار bail را در آزمایش‌های یک فایل آزمایش واحد کنترل کنید، به گزینه‌های [فریم‌ورک](frameworks) موجود نگاه کنید.

نوع: `Number`<br />
پیش‌فرض: `0` (خارج نشوید؛ همه آزمایش‌ها را اجرا کنید)

### specFileRetries

تعداد دفعاتی که یک فایل مشخصات کامل را هنگام شکست به عنوان یک کل دوباره تلاش می‌کند.

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDelay

تأخیر به ثانیه بین تلاش‌های مجدد فایل مشخصات

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDeferred

آیا فایل‌های مشخصات دوباره امتحان شده باید فوراً دوباره امتحان شوند یا به انتهای صف به تعویق بیفتند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### groupLogsByTestSpec

نمای خروجی لاگ را انتخاب کنید.

اگر روی `false` تنظیم شود، لاگ‌ها از فایل‌های آزمایش مختلف در زمان واقعی چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است هنگام اجرای موازی منجر به ترکیب خروجی‌های لاگ از فایل‌های مختلف شود.

اگر روی `true` تنظیم شود، خروجی‌های لاگ بر اساس Test Spec گروه‌بندی می‌شوند و فقط زمانی چاپ می‌شوند که Test Spec تکمیل شده باشد.

به طور پیش‌فرض، روی `false` تنظیم شده است تا لاگ‌ها در زمان واقعی چاپ شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### services

سرویس‌ها یک کار خاص را که نمی‌خواهید مراقب آن باشید، بر عهده می‌گیرند. آنها تنظیمات آزمایش شما را با حداقل تلاش بهبود می‌بخشند.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

### framework

فریم‌ورک آزمایشی را که باید توسط WDIO testrunner استفاده شود، تعریف می‌کند.

نوع: `String`<br />
پیش‌فرض: `mocha`<br />
گزینه‌ها: `mocha` | `jasmine`

### mochaOpts, jasmineOpts و cucumberOpts

گزینه‌های مرتبط با فریم‌ورک خاص. در مورد گزینه‌های موجود، به مستندات آداپتور فریم‌ورک مراجعه کنید. در مورد این موضوع در [Frameworks](frameworks) بیشتر بخوانید.

نوع: `Object`<br />
پیش‌فرض: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

لیست ویژگی‌های خیار با شماره خط (هنگام [استفاده از فریم‌ورک cucumber](./Frameworks.md#using-cucumber)).

نوع: `String[]`
پیش‌فرض: `[]`

### reporters

لیست گزارش‌دهنده‌ها برای استفاده. یک گزارش‌دهنده می‌تواند یک رشته باشد یا آرایه‌ای از
`['reporterName', { /* reporter options */}]` که در آن عنصر اول یک رشته با نام گزارش‌دهنده و عنصر دوم یک شیء با گزینه‌های گزارش‌دهنده است.

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

تعیین می‌کند که گزارش‌دهنده‌ها در چه فاصله‌ای باید بررسی کنند که آیا همگام‌سازی شده‌اند اگر لاگ‌های خود را به صورت ناهمگام گزارش دهند (مثلاً اگر لاگ‌ها به یک فروشنده شخص ثالث ارسال شوند).

نوع: `Number`<br />
پیش‌فرض: `100` (ms)

### reporterSyncTimeout

حداکثر زمانی را که گزارش‌دهنده‌ها برای تکمیل آپلود همه لاگ‌های خود دارند تا زمانی که testrunner خطایی ایجاد کند، تعیین می‌کند.

نوع: `Number`<br />
پیش‌فرض: `5000` (ms)

### execArgv

آرگومان‌های Node برای مشخص کردن هنگام راه‌اندازی فرآیندهای فرزند.

نوع: `String[]`<br />
پیش‌فرض: `null`

### filesToWatch

لیستی از الگوهای رشته‌ای پشتیبانی کننده از glob که به testrunner می‌گوید فایل‌های دیگری را نیز تماشا کند، مثلاً فایل‌های برنامه، هنگامی که آن را با پرچم `--watch` اجرا می‌کنید. به طور پیش‌فرض، testrunner از قبل همه فایل‌های مشخصات را تماشا می‌کند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### updateSnapshots

اگر می‌خواهید اسنپ‌شات‌های خود را به‌روز کنید، روی true تنظیم کنید. ایده‌آل است که به عنوان بخشی از یک پارامتر CLI استفاده شود، مثلاً `wdio run wdio.conf.js --s`.

نوع: `'new' | 'all' | 'none'`<br />
پیش‌فرض: اگر ارائه نشده و آزمایش‌ها در CI اجرا شوند `none`، اگر ارائه نشده `new`، در غیر این صورت آنچه ارائه شده

### resolveSnapshotPath

مسیر اسنپ‌شات پیش‌فرض را لغو می‌کند. به عنوان مثال، برای ذخیره اسنپ‌شات‌ها در کنار فایل‌های آزمایش.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

نوع: `(testPath: string, snapExtension: string) => string`<br />
پیش‌فرض: فایل‌های اسنپ‌شات را در دایرکتوری `__snapshots__` در کنار فایل آزمایش ذخیره می‌کند

### tsConfigPath

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود اما می‌توانید یک مسیر سفارشی را در اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

به اسناد `tsx` مراجعه کنید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

نوع: `String`<br />
پیش‌فرض: `null`<br />

## قلاب‌ها (Hooks)

testrunner WDIO به شما امکان می‌دهد قلاب‌هایی را تنظیم کنید که در زمان‌های خاصی از چرخه عمر آزمایش فعال شوند. این امکان اقدامات سفارشی را فراهم می‌کند (مثلاً گرفتن اسکرین‌شات اگر یک آزمایش شکست بخورد).

هر قلاب به عنوان پارامتر، اطلاعات خاصی در مورد چرخه عمر دارد (مثلاً اطلاعات در مورد مجموعه آزمایش یا آزمایش). در مورد تمام ویژگی‌های قلاب در [پیکربندی نمونه ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) بیشتر بخوانید.

**توجه:** برخی از قلاب‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در یک فرآیند متفاوت اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده سراسری را با سایر قلاب‌هایی که در فرآیند کارگر قرار دارند، به اشتراک بگذارند.

### onPrepare

قبل از راه‌اندازی همه کارگران یک بار اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): لیست جزئیات قابلیت‌ها

### onWorkerStart

قبل از ایجاد یک فرآیند کارگر اجرا می‌شود و می‌تواند برای راه‌اندازی سرویس خاص برای آن کارگر و همچنین تغییر محیط‌های اجرایی به صورت ناهمگام استفاده شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `args` (`object`): شیئی که پس از راه‌اندازی کارگر با پیکربندی اصلی ادغام می‌شود
- `execArgv` (`string[]`): لیست آرگومان‌های رشته‌ای ارسال شده به فرآیند کارگر

### onWorkerEnd

درست پس از خروج یک فرآیند کارگر اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح مشخصات که طبق تعریف در [_"افزودن تلاش‌های مجدد بر اساس هر فایل مشخصات"_](./Retry.md#add-retries-on-a-per-specfile-basis) استفاده شده است

### beforeSession

درست قبل از راه‌اندازی جلسه webdriver و فریم‌ورک آزمایش اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را بر اساس قابلیت یا مشخصات دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### before

قبل از شروع اجرای آزمایش اجرا می‌شود. در این نقطه می‌توانید به همه متغیرهای سراسری مانند `browser` دسترسی داشته باشید. این مکان ایده‌آلی برای تعریف دستورات سفارشی است.

پارامترها:

- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `browser` (`object`): نمونه‌ای از جلسه مرورگر/دستگاه ایجاد شده

### beforeSuite

قلابی که قبل از شروع مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### beforeHook

قلابی که *قبل* از یک قلاب درون مجموعه اجرا می‌شود (مثلاً قبل از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمایش
- `context` (`object`): زمینه آزمایش (شیء World در Cucumber را نشان می‌دهد)

### afterHook

قلابی که *بعد* از یک قلاب درون مجموعه اجرا می‌شود (مثلاً بعد از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمایش
- `context` (`object`): زمینه آزمایش (شیء World در Cucumber را نشان می‌دهد)
- `result` (`object`): نتیجه قلاب (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### beforeTest

تابعی که قبل از یک آزمایش اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات آزمایش
- `context` (`object`): شیء محدوده که آزمایش با آن اجرا شده است

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

تابعی که پس از پایان یک آزمایش (در Mocha/Jasmine) اجرا می‌شود.

پارامترها:

- `test` (`object`): جزئیات آزمایش
- `context` (`object`): شیء محدوده که آزمایش با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست آزمایش، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشت تابع آزمایش
- `result.duration` (`Number`): مدت آزمایش
- `result.passed` (`Boolean`): true اگر آزمایش موفق شده باشد، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات در مورد تلاش‌های مجدد مربوط به آزمایش واحد همانطور که برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber) تعریف شده است، مثلاً `{ attempts: 0, limit: 0 }`، ببینید
- `result` (`object`): نتیجه قلاب (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### afterSuite

قلابی که پس از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### after

پس از انجام همه آزمایش‌ها اجرا می‌شود. شما هنوز به همه متغیرهای سراسری از آزمایش دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - قبولی آزمایش، 1 - شکست آزمایش
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### afterSession

درست پس از پایان جلسه webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### onComplete

پس از خاموش شدن همه کارگران و قبل از خروج فرآیند اجرا می‌شود. خطایی که در قلاب onComplete ایجاد شود باعث شکست اجرای آزمایش می‌شود.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `result` (`object`): شیء نتایج شامل نتایج آزمایش

### onReload

هنگام انجام تازه‌سازی اجرا می‌شود.

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

قبل از یک سناریو Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعات در مورد pickle و مرحله آزمایش
- `context` (`object`): شیء World Cucumber

### afterScenario

پس از یک سناریو Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعات در مورد pickle و مرحله آزمایش
- `result` (`object`): شیء نتایج شامل نتایج سناریو
- `result.passed` (`boolean`): true اگر سناریو موفق شده باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت سناریو به میلی‌ثانیه
- `context` (`object`): شیء World Cucumber

### beforeStep

قبل از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریو Cucumber
- `context` (`object`): شیء World Cucumber

### afterStep

پس از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریو Cucumber
- `result`: (`object`): شیء نتایج شامل نتایج مرحله
- `result.passed` (`boolean`): true اگر سناریو موفق شده باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت سناریو به میلی‌ثانیه
- `context` (`object`): شیء World Cucumber

### beforeAssertion

قلابی که قبل از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تأیید

### afterAssertion

قلابی که پس از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تأیید
- `params.result`: نتایج تأیید
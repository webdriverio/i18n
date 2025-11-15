---
id: configuration
title: پیکربندی
---

بر اساس [نوع راه‌اندازی](/docs/setuptypes) (مثلاً استفاده از پروتکل خام، WebdriverIO به عنوان پکیج مستقل یا تست‌رانر WDIO) مجموعه‌ای از گزینه‌های مختلف برای کنترل محیط وجود دارد.

## گزینه‌های WebDriver

گزینه‌های زیر هنگام استفاده از پکیج پروتکل [`webdriver`](https://www.npmjs.com/package/webdriver) تعریف می‌شوند:

### protocol

پروتکل مورد استفاده برای برقراری ارتباط با سرور درایور.

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

پارامترهای کوئری که به سرور درایور ارسال می‌شوند.

نوع: `Object`<br />
پیش‌فرض: `undefined`

### user

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به صورت خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توانید از آن برای احراز هویت در هر بک‌اند WebDriver دیگری استفاده کنید.

نوع: `String`<br />
پیش‌فرض: `undefined`

### key

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به صورت خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توانید از آن برای احراز هویت در هر بک‌اند WebDriver دیگری استفاده کنید.

نوع: `String`<br />
پیش‌فرض: `undefined`

### capabilities

قابلیت‌هایی که می‌خواهید در جلسه WebDriver خود اجرا کنید را تعریف می‌کند. برای جزئیات بیشتر [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را بررسی کنید. اگر درایور قدیمی‌تری را اجرا می‌کنید که از پروتکل WebDriver پشتیبانی نمی‌کند، باید از [قابلیت‌های JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) برای اجرای موفقیت‌آمیز یک جلسه استفاده کنید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های خاص مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر از راه دور یا دستگاه را فراهم می‌کنند. این موارد در مستندات فروشنده مربوطه مستند شده‌اند، به عنوان مثال:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، ابزار مفید [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) از Sauce Labs به شما کمک می‌کند تا با کلیک روی قابلیت‌های مورد نظر، این شی را ایجاد کنید.

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

اگر تست‌های وب یا بومی را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver متفاوت است. برای جزئیات بیشتر [مستندات Appium](https://appium.io/docs/en/latest/guides/caps/) را ببینید.

### logLevel

سطح دقت لاگ‌گیری.

نوع: `String`<br />
پیش‌فرض: `info`<br />
گزینه‌ها: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دایرکتوری برای ذخیره تمام فایل‌های لاگ تست‌رانر (شامل لاگ‌های گزارشگر و لاگ‌های `wdio`). اگر تنظیم نشده باشد، همه لاگ‌ها به `stdout` ارسال می‌شوند. از آنجا که اکثر گزارشگرها برای لاگ‌گیری در `stdout` طراحی شده‌اند، توصیه می‌شود فقط از این گزینه برای گزارشگرهای خاصی استفاده کنید که ارسال گزارش به فایل منطقی‌تر است (مثلاً گزارشگر `junit`).

در حالت مستقل، تنها لاگ تولید شده توسط WebdriverIO، لاگ `wdio` خواهد بود.

نوع: `String`<br />
پیش‌فرض: `null`

### connectionRetryTimeout

زمان انتظار برای هر درخواست WebDriver به یک درایور یا گرید.

نوع: `Number`<br />
پیش‌فرض: `120000`

### connectionRetryCount

حداکثر تعداد تلاش مجدد درخواست به سرور Selenium.

نوع: `Number`<br />
پیش‌فرض: `3`

### agent

به شما امکان می‌دهد از یک `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) سفارشی برای ارسال درخواست‌ها استفاده کنید.

نوع: `Object`<br />
پیش‌فرض:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

تعیین `headers` سفارشی برای ارسال در هر درخواست WebDriver. اگر Selenium Grid شما نیاز به احراز هویت اولیه دارد، توصیه می‌کنیم یک هدر `Authorization` از طریق این گزینه برای احراز هویت درخواست‌های WebDriver خود ارسال کنید، به عنوان مثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// خواندن نام کاربری و رمز عبور از متغیرهای محیطی
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ترکیب نام کاربری و رمز عبور با جداکننده دو نقطه
const credentials = `${username}:${password}`;
// کدگذاری اعتبارات با استفاده از Base64
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
پیش‌فرض: *هیچکدام*

### transformResponse

تابعی که اشیاء پاسخ HTTP را پس از دریافت پاسخ WebDriver رهگیری می‌کند. این تابع شیء پاسخ اصلی را به عنوان اولین آرگومان و `RequestOptions` مربوطه را به عنوان آرگومان دوم دریافت می‌کند.

نوع: `(Response, RequestOptions) => Response`<br />
پیش‌فرض: *هیچکدام*

### strictSSL

آیا نیازی به معتبر بودن گواهی SSL دارد یا خیر.
می‌توان آن را از طریق متغیرهای محیطی مانند `STRICT_SSL` یا `strict_ssl` تنظیم کرد.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### enableDirectConnect

آیا [ویژگی اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود.
اگر پرچم فعال باشد اما پاسخ کلیدهای مناسب را نداشته باشد، تأثیری ندارد.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### cacheDir

مسیر به ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `String`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

برای لاگ‌گیری امن‌تر، عبارات منظم تنظیم شده با `maskingPatterns` می‌توانند اطلاعات حساس را در لاگ مخفی کنند.
 - قالب رشته یک عبارت منظم با یا بدون پرچم (مثلاً `/.../i`) و برای چندین عبارت منظم با کاما جدا می‌شود.
 - برای جزئیات بیشتر درباره الگوهای پوشاندن، به [بخش Masking Patterns در README لاگر WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) مراجعه کنید.

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

گزینه‌های زیر (شامل موارد فهرست شده در بالا) می‌توانند با WebdriverIO در حالت مستقل استفاده شوند:

### automationProtocol

پروتکلی که می‌خواهید برای اتوماسیون مرورگر خود استفاده کنید را تعریف کنید. در حال حاضر فقط [`webdriver`](https://www.npmjs.com/package/webdriver) پشتیبانی می‌شود، زیرا تکنولوژی اصلی اتوماسیون مرورگر است که WebdriverIO از آن استفاده می‌کند.

اگر می‌خواهید مرورگر را با استفاده از تکنولوژی اتوماسیون متفاوتی کنترل کنید، این ویژگی را به مسیری تنظیم کنید که به ماژولی با رابط زیر منتهی شود:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * یک جلسه اتوماسیون را شروع کنید و یک WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * با دستورات اتوماسیون مربوطه برگردانید. پکیج [webdriver](https://www.npmjs.com/package/webdriver)
     * را به عنوان یک پیاده‌سازی مرجع ببینید
     *
     * @param {Capabilities.RemoteConfig} options گزینه‌های WebdriverIO
     * @param {Function} hook که اجازه می‌دهد کلاینت را قبل از انتشار از تابع اصلاح کنید
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
     * مستقیماً در شی مرورگر ارسال شده تغییر می‌دهد
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
- اگر پارامتر `url` شما با `/` شروع شود، `baseUrl` به آن اضافه می‌شود (به جز مسیر `baseUrl`، اگر وجود داشته باشد).
- اگر پارامتر `url` شما بدون یک طرح یا `/` شروع شود (مانند `some/path`)، کل `baseUrl` مستقیماً به آن اضافه می‌شود.

نوع: `String`<br />
پیش‌فرض: `null`

### waitforTimeout

زمان انتظار پیش‌فرض برای همه دستورات `waitFor*`. (توجه کنید که `f` در نام گزینه کوچک است.) این زمان انتظار __فقط__ بر روی دستوراتی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آنها تأثیر می‌گذارد.

برای افزایش زمان انتظار یک _تست_، لطفاً به مستندات فریم‌ورک مراجعه کنید.

نوع: `Number`<br />
پیش‌فرض: `5000`

### waitforInterval

فاصله پیش‌فرض برای همه دستورات `waitFor*` برای بررسی اینکه آیا یک وضعیت مورد انتظار (مثلاً قابلیت دید) تغییر کرده است.

نوع: `Number`<br />
پیش‌فرض: `100`

### region

اگر در Sauce Labs اجرا می‌کنید، می‌توانید تست‌ها را بین مراکز داده مختلف اجرا کنید: آمریکا یا اروپا.
برای تغییر منطقه خود به اروپا، `region: 'eu'` را به پیکربندی خود اضافه کنید.

__توجه:__ این فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` را ارائه دهید که به حساب Sauce Labs شما متصل هستند.

نوع: `String`<br />
پیش‌فرض: `us`

*(فقط برای vm و یا em/شبیه‌سازها)*

---

## گزینه‌های Testrunner

گزینه‌های زیر (شامل موارد فهرست شده در بالا) فقط برای اجرای WebdriverIO با تست‌رانر WDIO تعریف شده‌اند:

### specs

مشخصات را برای اجرای تست تعریف کنید. می‌توانید یک الگوی glob برای تطبیق چندین فایل به صورت همزمان مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا آنها را در یک فرآیند کارگر واحد اجرا کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `(String | String[])[]`<br />
پیش‌فرض: `[]`

### exclude

مشخصاتی که از اجرای تست حذف می‌شوند. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### suites

یک شیء که مجموعه‌های مختلف را توصیف می‌کند که می‌توانید با گزینه `--suite` در CLI `wdio` مشخص کنید.

نوع: `Object`<br />
پیش‌فرض: `{}`

### capabilities

همانند بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که گزینه‌ای برای مشخص کردن یک شیء [`multiremote`](/docs/multiremote)، یا چندین جلسه WebDriver در یک آرایه برای اجرای موازی وجود دارد.

می‌توانید قابلیت‌های خاص فروشنده و مرورگر را همانطور که در [بالا](/docs/configuration#capabilities) تعریف شده است، اعمال کنید.

نوع: `Object`|`Object[]`<br />
پیش‌فرض: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

حداکثر تعداد کل کارگرهایی که به صورت موازی اجرا می‌شوند.

__توجه:__ این ممکن است عددی تا `100` باشد، زمانی که تست‌ها روی برخی فروشندگان خارجی مانند ماشین‌های Sauce Labs انجام می‌شوند. در آنجا، تست‌ها روی یک ماشین واحد انجام نمی‌شوند، بلکه روی چندین ماشین مجازی انجام می‌شوند. اگر تست‌ها قرار است روی یک ماشین توسعه محلی اجرا شوند، از عددی منطقی‌تر مانند `3`، `4` یا `5` استفاده کنید. در اصل، این تعداد مرورگرهایی است که به طور همزمان راه‌اندازی می‌شوند و تست‌های شما را به طور همزمان اجرا می‌کنند، بنابراین به میزان RAM موجود در ماشین شما و تعداد برنامه‌های دیگری که روی ماشین شما اجرا می‌شوند بستگی دارد.

همچنین می‌توانید با استفاده از قابلیت `wdio:maxInstances`، `maxInstances` را در داخل شیء‌های قابلیت خود اعمال کنید. این تعداد جلسات موازی را برای آن قابلیت خاص محدود می‌کند.

نوع: `Number`<br />
پیش‌فرض: `100`

### maxInstancesPerCapability

حداکثر تعداد کارگرهای موازی در حال اجرا برای هر قابلیت.

نوع: `Number`<br />
پیش‌فرض: `100`

### injectGlobals

متغیرهای جهانی WebdriverIO (مانند `browser`، `$` و `$$`) را در محیط جهانی قرار می‌دهد.
اگر آن را روی `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید، مثلاً:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

نکته: WebdriverIO متغیرهای جهانی خاص فریم‌ورک تست را مدیریت نمی‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### bail

اگر می‌خواهید اجرای تست شما پس از تعداد مشخصی از شکست‌های تست متوقف شود، از `bail` استفاده کنید.
(پیش‌فرض آن `0` است که همه تست‌ها را صرف نظر از نتیجه اجرا می‌کند.) **توجه:** یک تست در این زمینه همه تست‌های درون یک فایل مشخصات واحد هستند (هنگام استفاده از Mocha یا Jasmine) یا تمام مراحل درون یک فایل ویژگی (هنگام استفاده از Cucumber). اگر می‌خواهید رفتار bail را در تست‌های یک فایل تست واحد کنترل کنید، به گزینه‌های [فریم‌ورک](frameworks) موجود نگاه کنید.

نوع: `Number`<br />
پیش‌فرض: `0` (خروج نکن؛ همه تست‌ها را اجرا کن)

### specFileRetries

تعداد دفعاتی که یک کل فایل مشخصات را وقتی به عنوان یک کل شکست می‌خورد، مجدداً امتحان می‌کند.

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDelay

تأخیر به ثانیه بین تلاش‌های مجدد فایل مشخصات

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDeferred

آیا فایل‌های مشخصات تکراری باید بلافاصله مجدداً امتحان شوند یا به انتهای صف به تعویق بیفتند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### groupLogsByTestSpec

نمای خروجی لاگ را انتخاب کنید.

اگر روی `false` تنظیم شود، لاگ‌ها از فایل‌های تست مختلف در زمان واقعی چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است هنگام اجرای موازی منجر به ترکیب خروجی‌های لاگ از فایل‌های مختلف شود.

اگر روی `true` تنظیم شود، خروجی‌های لاگ بر اساس Test Spec گروه‌بندی می‌شوند و فقط زمانی چاپ می‌شوند که Test Spec تکمیل شود.

به طور پیش‌فرض، روی `false` تنظیم شده است تا لاگ‌ها در زمان واقعی چاپ شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### autoAssertOnTestEnd

کنترل می‌کند که آیا WebdriverIO به طور خودکار تمام ادعاهای نرم را در پایان هر تست بررسی کند. وقتی روی `true` تنظیم شود، هر تأیید نرم انباشته شده به طور خودکار بررسی می‌شود و در صورت شکست هر تأییدی، باعث شکست تست می‌شود. وقتی روی `false` تنظیم شود، باید به صورت دستی متد assert را فراخوانی کنید تا تأییدات نرم را بررسی کنید.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### services

سرویس‌ها وظیفه خاصی را که نمی‌خواهید مراقبت آن باشید، به عهده می‌گیرند. آنها تنظیمات تست شما را با حداقل تلاش بهبود می‌بخشند.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

### framework

چارچوب تستی که توسط تست‌رانر WDIO استفاده می‌شود را تعریف می‌کند.

نوع: `String`<br />
پیش‌فرض: `mocha`<br />
گزینه‌ها: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

گزینه‌های خاص مرتبط با فریم‌ورک. برای اطلاع از گزینه‌های موجود، به مستندات آداپتور فریم‌ورک مراجعه کنید. اطلاعات بیشتر در این مورد را در [Frameworks](frameworks) بخوانید.

نوع: `Object`<br />
پیش‌فرض: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

لیست ویژگی‌های cucumber با شماره خط (هنگام [استفاده از فریم‌ورک cucumber](./Frameworks.md#using-cucumber)).

نوع: `String[]`
پیش‌فرض: `[]`

### reporters

لیست گزارشگرها برای استفاده. یک گزارشگر می‌تواند یا یک رشته باشد، یا آرایه‌ای از
`['reporterName', { /* گزینه‌های گزارشگر */}]` که عنصر اول یک رشته با نام گزارشگر و عنصر دوم یک شیء با گزینه‌های گزارشگر است.

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

تعیین می‌کند که گزارشگر در چه فاصله‌ای باید بررسی کند که آیا همگام‌سازی شده‌اند، اگر لاگ‌های خود را به صورت ناهمگام گزارش می‌دهند (مثلاً اگر لاگ‌ها به یک فروشنده شخص ثالث ارسال می‌شوند).

نوع: `Number`<br />
پیش‌فرض: `100` (میلی‌ثانیه)

### reporterSyncTimeout

حداکثر زمانی که گزارشگران برای به پایان رساندن آپلود تمام لاگ‌های خود دارند را تعیین می‌کند، تا زمانی که خطایی توسط تست‌رانر ایجاد شود.

نوع: `Number`<br />
پیش‌فرض: `5000` (میلی‌ثانیه)

### execArgv

آرگومان‌های Node که هنگام راه‌اندازی فرآیندهای فرزند مشخص می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `null`

### filesToWatch

لیستی از الگوهای رشته‌ای با پشتیبانی از glob که به تست‌رانر می‌گویند که فایل‌های دیگری را نیز تحت نظارت داشته باشد، به عنوان مثال فایل‌های برنامه، هنگامی که با پرچم `--watch` اجرا می‌شود. به طور پیش‌فرض، تست‌رانر از قبل تمام فایل‌های مشخصات را تحت نظارت دارد.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### updateSnapshots

برای به‌روزرسانی اسنپ‌شات‌ها روی true تنظیم کنید. ایده‌آل است که به عنوان بخشی از پارامتر CLI استفاده شود، مثلاً `wdio run wdio.conf.js --s`.

نوع: `'new' | 'all' | 'none'`<br />
پیش‌فرض: `none` اگر ارائه نشده و تست‌ها در CI اجرا می‌شوند، `new` اگر ارائه نشده، در غیر این صورت آنچه ارائه شده است

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

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود، اما می‌توانید مسیر سفارشی را در اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

به مستندات `tsx` مراجعه کنید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

نوع: `String`<br />
پیش‌فرض: `null`<br />

## Hooks

تست‌رانر WDIO به شما امکان می‌دهد hook‌هایی را تنظیم کنید که در زمان‌های خاصی از چرخه عمر تست اجرا شوند. این امکان اقدامات سفارشی (مثلاً گرفتن اسکرین‌شات اگر تست شکست بخورد) را فراهم می‌کند.

هر hook به عنوان پارامتر، اطلاعات خاصی درباره چرخه عمر (مثلاً اطلاعاتی درباره مجموعه تست یا تست) دارد. درباره تمام ویژگی‌های hook در [پیکربندی نمونه ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) بیشتر بخوانید.

**توجه:** برخی hook‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در یک فرآیند متفاوت اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده جهانی را با سایر hook‌هایی که در فرآیند کارگر قرار دارند، به اشتراک بگذارند.

### onPrepare

قبل از اینکه همه کارگرها راه‌اندازی شوند، یک بار اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): لیست جزئیات قابلیت‌ها

### onWorkerStart

قبل از اینکه یک فرآیند کارگر ایجاد شود اجرا می‌شود و می‌تواند برای مقداردهی اولیه سرویس خاص برای آن کارگر و همچنین تغییر محیط‌های اجرایی به صورت ناهمگام استفاده شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `caps` (`object`): حاوی قابلیت‌ها برای جلسه‌ای که در کارگر راه‌اندازی می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `args` (`object`): شیئی که پس از مقداردهی اولیه کارگر با پیکربندی اصلی ادغام می‌شود
- `execArgv` (`string[]`): لیست آرگومان‌های رشته‌ای که به فرآیند کارگر ارسال می‌شوند

### onWorkerEnd

درست پس از خروج یک فرآیند کارگر اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفق، 1 - شکست
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح مشخصات مورد استفاده همانطور که در [_"اضافه کردن تلاش‌های مجدد بر اساس فایل مشخصات"_](./Retry.md#add-retries-on-a-per-specfile-basis) تعریف شده است

### beforeSession

درست قبل از مقداردهی اولیه جلسه webdriver و فریم‌ورک تست اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را بسته به قابلیت یا مشخصات دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌ها برای جلسه‌ای که در کارگر راه‌اندازی می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### before

قبل از شروع اجرای تست انجام می‌شود. در این نقطه می‌توانید به تمام متغیرهای جهانی مانند `browser` دسترسی پیدا کنید. مکان مناسب برای تعریف دستورات سفارشی است.

پارامترها:

- `caps` (`object`): حاوی قابلیت‌ها برای جلسه‌ای که در کارگر راه‌اندازی می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `browser` (`object`): نمونه جلسه مرورگر/دستگاه ایجاد شده

### beforeSuite

hook که قبل از شروع سوئیت اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات سوئیت

### beforeHook

hook که *قبل از* یک hook در داخل سوئیت اجرا می‌شود (مثلاً قبل از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): زمینه تست (نشان‌دهنده شیء World در Cucumber است)

### afterHook

hook که *پس از* یک hook در داخل سوئیت اجرا می‌شود (مثلاً پس از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): زمینه تست (نشان‌دهنده شیء World در Cucumber است)
- `result` (`object`): نتیجه hook (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### beforeTest

تابعی که قبل از یک تست اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء دامنه که تست با آن اجرا شده است

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
- `result` (`*`): نتیجه دستور
- `error` (`Error`): شیء خطا در صورت وجود

### afterTest

تابعی که پس از پایان یک تست (در Mocha/Jasmine) اجرا می‌شود.

پارامترها:

- `test` (`object`): جزئیات تست
- `context` (`object`): شیء دامنه که تست با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست تست، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع تست
- `result.duration` (`Number`): مدت زمان تست
- `result.passed` (`Boolean`): true اگر تست موفق شده باشد، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات درباره تلاش‌های مجدد تک تست همانطور که برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber) تعریف شده است، مثلاً `{ attempts: 0, limit: 0 }`
- `result` (`object`): نتیجه hook (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries`)

### afterSuite

hook که پس از پایان سوئیت اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات سوئیت

### after

پس از اتمام همه تست‌ها اجرا می‌شود. هنوز به تمام متغیرهای جهانی از تست دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - قبولی تست، 1 - شکست تست
- `caps` (`object`): حاوی قابلیت‌ها برای جلسه‌ای که در کارگر راه‌اندازی می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### afterSession

درست پس از خاتمه جلسه webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌ها برای جلسه‌ای که در کارگر راه‌اندازی می‌شود
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### onComplete

پس از خاموش شدن تمام کارگرها و قبل از خروج فرآیند اجرا می‌شود. خطایی که در hook onComplete پرتاب شود منجر به شکست اجرای تست می‌شود.

پارامترها:

- `exitCode` (`number`): 0 - موفق، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌ها برای جلسه‌ای که در کارگر راه‌اندازی می‌شود
- `result` (`object`): شیء نتایج شامل نتایج تست

### onReload

زمانی که بارگذاری مجدد رخ می‌دهد، اجرا می‌شود.

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world حاوی اطلاعات درباره pickle و مرحله تست
- `context` (`object`): شیء World Cucumber

### afterScenario

پس از یک سناریوی Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world حاوی اطلاعات درباره pickle و مرحله تست
- `result` (`object`): شیء نتایج حاوی نتایج سناریو
- `result.passed` (`boolean`): true اگر سناریو موفق شده باشد
- `result.error` (`string`): استک خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
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
- `result`: (`object`): شیء نتایج حاوی نتایج مرحله
- `result.passed` (`boolean`): true اگر سناریو موفق شده باشد
- `result.error` (`string`): استک خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
- `context` (`object`): شیء World Cucumber

### beforeAssertion

hook که قبل از انجام یک ادعای WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات ادعا
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های ادعا

### afterAssertion

hook که پس از انجام یک ادعای WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات ادعا
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های ادعا
- `params.result`: نتایج ادعا
---
id: configuration
title: پیکربندی
---

بر اساس [نوع راه‌اندازی](/docs/setuptypes) (مثلاً استفاده از اتصالات پروتکل خام، WebdriverIO به عنوان بسته مستقل یا آزمون‌گر WDIO)، مجموعه‌ای متفاوت از گزینه‌ها برای کنترل محیط در دسترس است.

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

پارامترهای پرس‌وجویی که به سرور درایور منتقل می‌شوند.

نوع: `Object`<br />
پیش‌فرض: `undefined`

### user

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [TestMu AI](https://www.testmuai.com/) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، این مورد می‌تواند برای احراز هویت هر پشتیبانی WebDriver دیگر استفاده شود.

نوع: `String`<br />
پیش‌فرض: `undefined`

### key

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [TestMu AI](https://www.testmuai.com/) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، این مورد می‌تواند برای احراز هویت هر پشتیبانی WebDriver دیگر استفاده شود.

نوع: `String`<br />
پیش‌فرض: `undefined`

### capabilities

قابلیت‌هایی را تعریف می‌کند که می‌خواهید در جلسه WebDriver خود اجرا کنید. برای اطلاعات بیشتر به [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) مراجعه کنید. اگر یک درایور قدیمی‌تر را اجرا می‌کنید که از پروتکل WebDriver پشتیبانی نمی‌کند، باید از [قابلیت‌های JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) برای اجرای موفقیت‌آمیز یک جلسه استفاده کنید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های خاص مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر یا دستگاه راه دور را فراهم می‌کند. این موارد در مستندات فروشنده مربوطه مستندسازی شده‌اند، مانند:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، یک ابزار مفید، [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) از Sauce Labs است که به شما کمک می‌کند این شیء را با کلیک روی قابلیت‌های مورد نظر خود ایجاد کنید.

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

اگر تست‌های وب یا بومی را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver متفاوت است. برای جزئیات بیشتر به [مستندات Appium](https://appium.io/docs/en/latest/guides/caps/) مراجعه کنید.

### logLevel

سطح جزئیات ثبت وقایع.

نوع: `String`<br />
پیش‌فرض: `info`<br />
گزینه‌ها: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دایرکتوری برای ذخیره همه فایل‌های لاگ آزمونگر (از جمله لاگ‌های گزارشگر و لاگ‌های `wdio`). اگر تنظیم نشود، تمام لاگ‌ها به `stdout` جاری می‌شوند. از آنجایی که اکثر گزارشگرها برای لاگ به `stdout` طراحی شده‌اند، توصیه می‌شود فقط از این گزینه برای گزارشگرهای خاصی استفاده کنید که قرار دادن گزارش در یک فایل برای آنها منطقی‌تر است (مانند گزارشگر `junit`).

هنگام اجرا در حالت مستقل، تنها لاگ تولید شده توسط WebdriverIO، لاگ `wdio` خواهد بود.

نوع: `String`<br />
پیش‌فرض: `null`

### connectionRetryTimeout

مهلت زمانی برای هر درخواست WebDriver به یک درایور یا گرید.

نوع: `Number`<br />
پیش‌فرض: `120000`

### connectionRetryCount

حداکثر تعداد تلاش مجدد درخواست به سرور Selenium.

نوع: `Number`<br />
پیش‌فرض: `3`

### agent

به شما امکان می‌دهد از یک عامل (agent) سفارشی `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) برای ارسال درخواست‌ها استفاده کنید.

نوع: `Object`<br />
پیش‌فرض:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

هدرهای سفارشی را برای ارسال در هر درخواست WebDriver مشخص کنید. اگر گرید Selenium شما به احراز هویت پایه نیاز دارد، توصیه می‌کنیم از طریق این گزینه یک هدر `Authorization` برای احراز هویت درخواست‌های WebDriver خود ارسال کنید، مثلاً:

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

تابعی که اشیاء پاسخ HTTP را پس از دریافت پاسخ WebDriver رهگیری می‌کند. این تابع با شیء پاسخ اصلی به عنوان اولین آرگومان و `RequestOptions` مربوطه به عنوان آرگومان دوم فراخوانی می‌شود.

نوع: `(Response, RequestOptions) => Response`<br />
پیش‌فرض: *هیچ*

### strictSSL

آیا نیاز به معتبر بودن گواهی SSL دارد یا خیر.
می‌تواند از طریق متغیرهای محیطی `STRICT_SSL` یا `strict_ssl` تنظیم شود.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### enableDirectConnect

آیا [ویژگی اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود یا خیر.
اگر پاسخ دارای کلیدهای مناسب نباشد، در حالی که پرچم فعال است، هیچ کاری انجام نمی‌دهد.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### cacheDir

مسیر به ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `String`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

برای ثبت وقایع امن‌تر، عبارات منظم تنظیم شده با `maskingPatterns` می‌توانند اطلاعات حساس را از گزارش مبهم کنند.
 - فرمت رشته، یک عبارت منظم با یا بدون پرچم‌ها (مثلاً `/.../i`) است و برای چندین عبارت منظم با کاما جدا می‌شود.
 - برای جزئیات بیشتر در مورد الگوهای پنهان‌سازی، به [بخش Masking Patterns در README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) مراجعه کنید.

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

اگر می‌خواهید مرورگر را با استفاده از فناوری اتوماسیون متفاوتی کنترل کنید، حتماً این خصوصیت را به مسیری تنظیم کنید که به ماژولی اشاره کند که از رابط زیر پیروی می‌کند:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * یک جلسه اتوماسیون را شروع کنید و یک WebdriverIO [مونادی](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * با دستورات اتوماسیون مربوطه برگردانید. به بسته [webdriver](https://www.npmjs.com/package/webdriver) 
     * به عنوان یک پیاده‌سازی مرجع نگاه کنید
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
     * @param   {object} instance  شیئی که از یک جلسه جدید مرورگر می‌گیریم.
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
- اگر پارامتر `url` شما با `/` شروع شود، `baseUrl` قبل از آن قرار می‌گیرد (به جز مسیر `baseUrl`، اگر وجود داشته باشد).
- اگر پارامتر `url` شما بدون یک طرح یا `/` شروع شود (مانند `some/path`)، کل `baseUrl` مستقیماً قبل از آن قرار می‌گیرد.

نوع: `String`<br />
پیش‌فرض: `null`

### waitforTimeout

زمان انقضای پیش‌فرض برای تمام دستورات `waitFor*`. (توجه داشته باشید که `f` در نام گزینه حرف کوچک است.) این زمان انقضا __فقط__ بر روی دستوراتی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آن‌ها تأثیر می‌گذارد.

برای افزایش زمان انقضا برای یک _تست_، لطفاً به مستندات چارچوب مراجعه کنید.

نوع: `Number`<br />
پیش‌فرض: `5000`

### waitforInterval

فاصله پیش‌فرض برای تمام دستورات `waitFor*` برای بررسی اینکه آیا یک وضعیت مورد انتظار (مثلاً، قابلیت مشاهده) تغییر کرده است.

نوع: `Number`<br />
پیش‌فرض: `100`

### region

اگر در Sauce Labs اجرا می‌کنید، می‌توانید انتخاب کنید که تست‌ها را بین مراکز داده مختلف اجرا کنید: US یا EU.
برای تغییر منطقه خود به EU، `region: 'eu'` را به پیکربندی خود اضافه کنید.

__توجه:__ این فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` را ارائه دهید که به حساب Sauce Labs شما متصل هستند.

نوع: `String`<br />
پیش‌فرض: `us`

*(فقط برای ماشین‌های مجازی و یا شبیه‌سازها/اموکتورها)*

---

## گزینه‌های Testrunner

گزینه‌های زیر (شامل موارد ذکر شده در بالا) فقط برای اجرای WebdriverIO با آزمونگر WDIO تعریف شده‌اند:

### specs

مشخصات را برای اجرای آزمون تعریف کنید. می‌توانید یک الگوی glob برای تطبیق چندین فایل همزمان مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا آنها را در یک فرآیند کارگر واحد اجرا کنید. همه مسیرها نسبت به مسیر فایل پیکربندی دیده می‌شوند.

نوع: `(String | String[])[]`<br />
پیش‌فرض: `[]`

### exclude

مشخصات را از اجرای آزمون خارج کنید. همه مسیرها نسبت به مسیر فایل پیکربندی دیده می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### suites

یک شیء که مجموعه‌های مختلف را توصیف می‌کند، که سپس می‌توانید آن را با گزینه `--suite` در CLI `wdio` مشخص کنید.

نوع: `Object`<br />
پیش‌فرض: `{}`

### capabilities

همان بخش `capabilities` که در بالا توصیف شد، با این تفاوت که گزینه مشخص کردن یک شیء [`multiremote`](/docs/multiremote)، یا چندین جلسه WebDriver در یک آرایه برای اجرای موازی وجود دارد.

می‌توانید همان قابلیت‌های خاص فروشنده و مرورگر را که در [بالا](/docs/configuration#capabilities) تعریف شده است، اعمال کنید.

نوع: `Object`|`Object[]`<br />
پیش‌فرض: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

حداکثر تعداد کل کارگرهای موازی در حال اجرا.

__توجه:__ این می‌تواند عددی به بزرگی `100` باشد، زمانی که آزمون‌ها روی برخی فروشندگان خارجی مانند ماشین‌های Sauce Labs انجام می‌شوند. در آنجا، آزمون‌ها روی یک ماشین واحد آزمایش نمی‌شوند، بلکه روی چندین ماشین مجازی انجام می‌شوند. اگر آزمون‌ها قرار است روی یک ماشین توسعه محلی اجرا شوند، از عددی معقول‌تر مانند `3`، `4` یا `5` استفاده کنید. اساساً، این تعداد مرورگرهایی است که به طور همزمان شروع می‌شوند و آزمون‌های شما را همزمان اجرا می‌کنند، بنابراین بستگی به میزان RAM روی ماشین شما و تعداد برنامه‌های دیگری که روی ماشین شما اجرا می‌شوند، دارد.

همچنین می‌توانید `maxInstances` را در اشیاء قابلیت خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این کار تعداد جلسات موازی را برای آن قابلیت خاص محدود می‌کند.

نوع: `Number`<br />
پیش‌فرض: `100`

### maxInstancesPerCapability

حداکثر تعداد کل کارگرهای موازی در حال اجرا برای هر قابلیت.

نوع: `Number`<br />
پیش‌فرض: `100`

### injectGlobals

متغیرهای جهانی WebdriverIO (مانند `browser`، `$` و `$$`) را در محیط جهانی وارد می‌کند.
اگر آن را روی `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید، مثلاً:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

توجه: WebdriverIO تزریق متغیرهای جهانی خاص چارچوب تست را مدیریت نمی‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### bail

اگر می‌خواهید اجرای آزمون شما پس از تعداد مشخصی از شکست‌های آزمون متوقف شود، از `bail` استفاده کنید.
(پیش‌فرض آن `0` است، که به معنای اجرای تمام آزمون‌ها بدون توجه به نتیجه است.) **توجه:** یک آزمون در این زمینه شامل تمام آزمون‌های داخل یک فایل مشخصات واحد (هنگام استفاده از Mocha یا Jasmine) یا تمام مراحل داخل یک فایل ویژگی (هنگام استفاده از Cucumber) است. اگر می‌خواهید رفتار bail را در آزمون‌های یک فایل آزمون واحد کنترل کنید، به گزینه‌های موجود در [چارچوب](frameworks) نگاه کنید.

نوع: `Number`<br />
پیش‌فرض: `0` (بی‌توجه به شکست ادامه بده؛ تمام آزمون‌ها را اجرا کن)

### specFileRetries

تعداد دفعاتی که یک فایل مشخصات کامل را هنگام شکست کلی مجدداً امتحان می‌کند.

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDelay

تاخیر به ثانیه بین تلاش‌های مجدد برای اجرای فایل مشخصات

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDeferred

آیا فایل‌های مشخصاتی که مجدداً امتحان می‌شوند باید بلافاصله مجدداً تلاش شوند یا به انتهای صف منتقل شوند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### groupLogsByTestSpec

نمای خروجی گزارش را انتخاب کنید.

اگر روی `false` تنظیم شود، گزارش‌های فایل‌های آزمونی مختلف در زمان واقعی چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است منجر به ترکیب خروجی‌های گزارش از فایل‌های مختلف هنگام اجرا به صورت موازی شود.

اگر روی `true` تنظیم شود، خروجی‌های گزارش توسط Test Spec گروه‌بندی می‌شوند و فقط زمانی چاپ می‌شوند که Test Spec تکمیل شود.

به طور پیش‌فرض، روی `false` تنظیم شده است تا گزارش‌ها در زمان واقعی چاپ شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### autoAssertOnTestEnd

کنترل می‌کند که آیا WebdriverIO به طور خودکار تمام تأییدیه‌های نرم را در پایان هر آزمون بررسی کند. هنگامی که روی `true` تنظیم شود، هر تأیید نرم جمع‌آوری شده به طور خودکار بررسی می‌شود و در صورت شکست هر تأیید، آزمون شکست می‌خورد. هنگامی که روی `false` تنظیم شود، باید به صورت دستی متد assert را فراخوانی کنید تا تأییدیه‌های نرم را بررسی کنید.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### services

سرویس‌ها وظیفه خاصی را که نمی‌خواهید مراقبت کنید، بر عهده می‌گیرند. آنها تنظیمات آزمون شما را با حداقل تلاش بهبود می‌بخشند.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

### framework

چارچوب تستی را که باید توسط آزمونگر WDIO استفاده شود، تعریف می‌کند.

نوع: `String`<br />
پیش‌فرض: `mocha`<br />
گزینه‌ها: `mocha` | `jasmine`

### mochaOpts, jasmineOpts و cucumberOpts

گزینه‌های خاص مرتبط با چارچوب. ببینید که در مستندات آداپتور چارچوب کدام گزینه‌ها در دسترس هستند. در مورد این موضوع بیشتر در [Frameworks](frameworks) بخوانید.

نوع: `Object`<br />
پیش‌فرض: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

لیستی از ویژگی‌های خیار با شماره خط (هنگام [استفاده از چارچوب cucumber](./Frameworks.md#using-cucumber)).

نوع: `String[]`
پیش‌فرض: `[]`

### reporters

لیست گزارشگرها برای استفاده. یک گزارشگر می‌تواند یک رشته باشد، یا آرایه‌ای از
`['reporterName', { /* reporter options */}]` که عنصر اول رشته‌ای با نام گزارشگر و عنصر دوم شیئی با گزینه‌های گزارشگر است.

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

تعیین می‌کند در چه فاصله زمانی گزارشگر باید بررسی کند که آیا همگام‌سازی شده‌اند اگر گزارش‌های خود را به صورت ناهمگام گزارش می‌کنند (مثلاً اگر گزارش‌ها به یک فروشنده شخص ثالث جریان می‌یابند).

نوع: `Number`<br />
پیش‌فرض: `100` (میلی‌ثانیه)

### reporterSyncTimeout

حداکثر زمانی را تعیین می‌کند که گزارشگرها برای اتمام آپلود تمام گزارش‌های خود تا زمانی که خطایی توسط آزمونگر ایجاد شود، دارند.

نوع: `Number`<br />
پیش‌فرض: `5000` (میلی‌ثانیه)

### execArgv

آرگومان‌های Node برای مشخص کردن هنگام راه‌اندازی فرآیندهای فرزند.

نوع: `String[]`<br />
پیش‌فرض: `null`

### filesToWatch

لیستی از الگوهای رشته‌ای پشتیبانی کننده از glob که به آزمونگر می‌گویند فایل‌های دیگری را نیز تحت نظر داشته باشد، مانند فایل‌های برنامه، هنگامی که با پرچم `--watch` اجرا می‌شود. به طور پیش‌فرض، آزمونگر از قبل تمام فایل‌های مشخصات را تماشا می‌کند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### updateSnapshots

اگر می‌خواهید اسنپ‌شات‌های خود را به‌روز کنید، روی true تنظیم کنید. ایده‌آل است که به عنوان بخشی از یک پارامتر CLI استفاده شود، مثلاً `wdio run wdio.conf.js --s`.

نوع: `'new' | 'all' | 'none'`<br />
پیش‌فرض: `none` اگر ارائه نشده و آزمون‌ها در CI اجرا شوند، `new` اگر ارائه نشده، در غیر این صورت آنچه ارائه شده است

### resolveSnapshotPath

مسیر پیش‌فرض اسنپ‌شات را لغو می‌کند. به عنوان مثال، برای ذخیره اسنپ‌شات‌ها در کنار فایل‌های آزمون.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

نوع: `(testPath: string, snapExtension: string) => string`<br />
پیش‌فرض: فایل‌های اسنپ‌شات را در دایرکتوری `__snapshots__` کنار فایل آزمون ذخیره می‌کند

### tsConfigPath

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود اما می‌توانید مسیر سفارشی را اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

به مستندات `tsx` مراجعه کنید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

نوع: `String`<br />
پیش‌فرض: `null`<br />

## Hooks

آزمونگر WDIO به شما اجازه می‌دهد hook هایی را تنظیم کنید تا در زمان‌های خاصی از چرخه حیات آزمون فعال شوند. این امر اعمال سفارشی را امکان‌پذیر می‌کند (مثلاً اگر آزمون شکست بخورد، اسکرین‌شات بگیرید).

هر hook اطلاعات خاصی در مورد چرخه حیات را به عنوان پارامتر دارد (مثلاً اطلاعات در مورد مجموعه آزمون یا آزمون). درباره همه ویژگی‌های hook در [پیکربندی نمونه ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) بیشتر بخوانید.

**نکته:** برخی از hook ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در یک فرآیند متفاوت اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده جهانی را با سایر hook هایی که در فرآیند کارگر زندگی می‌کنند، به اشتراک بگذارند.

### onPrepare

یکبار قبل از راه‌اندازی تمام کارگرها اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): لیست جزئیات قابلیت‌ها

### onWorkerStart

قبل از اینکه یک فرآیند کارگر ایجاد شود اجرا می‌شود و می‌تواند برای راه‌اندازی سرویس خاص برای آن کارگر و همچنین تغییر محیط‌های زمان اجرا به صورت ناهمگام استفاده شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `args` (`object`): شیئی که پس از راه‌اندازی کارگر با پیکربندی اصلی ادغام می‌شود
- `execArgv` (`string[]`): لیست آرگومان‌های رشته‌ای ارسال شده به فرآیند کارگر

### onWorkerEnd

درست پس از خروج یک فرآیند کارگر اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح مشخصات استفاده شده همانطور که در [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) تعریف شده است

### beforeSession

درست قبل از راه‌اندازی جلسه webdriver و چارچوب آزمون اجرا می‌شود. به شما اجازه می‌دهد پیکربندی‌ها را بر اساس قابلیت یا مشخصات دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### before

قبل از شروع اجرای آزمون اجرا می‌شود. در این نقطه می‌توانید به تمام متغیرهای جهانی مانند `browser` دسترسی داشته باشید. این مکان مناسبی برای تعریف دستورات سفارشی است.

پارامترها:

- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `browser` (`object`): نمونه جلسه مرورگر/دستگاه ایجاد شده

### beforeSuite

hook که قبل از شروع مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### beforeHook

hook که *قبل* از یک hook در مجموعه اجرا می‌شود (مثلاً قبل از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): زمینه آزمون (نشان‌دهنده شیء World در Cucumber است)

### afterHook

hook که *بعد* از یک hook در مجموعه اجرا می‌شود (مثلاً پس از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): زمینه آزمون (نشان‌دهنده شیء World در Cucumber است)
- `result` (`object`): نتیجه hook (شامل خصوصیات `error`، `result`، `duration`، `passed`، `retries` است)

### beforeTest

تابعی که قبل از یک آزمون اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): شیء محدوده که آزمون با آن اجرا شده است

### beforeCommand

قبل از اجرای دستور WebdriverIO اجرا می‌شود.

پارامترها:

- `commandName` (`string`): نام دستور
- `args` (`*`): آرگومان‌هایی که دستور دریافت می‌کند

### afterCommand

پس از اجرای دستور WebdriverIO اجرا می‌شود.

پارامترها:

- `commandName` (`string`): نام دستور
- `args` (`*`): آرگومان‌هایی که دستور دریافت می‌کند
- `result` (`*`): نتیجه دستور
- `error` (`Error`): شیء خطا در صورت وجود

### afterTest

تابعی که پس از پایان یک آزمون (در Mocha/Jasmine) اجرا می‌شود.

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): شیء محدوده که آزمون با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست آزمون، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع آزمون
- `result.duration` (`Number`): مدت زمان آزمون
- `result.passed` (`Boolean`): true اگر آزمون قبول شده باشد، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات در مورد تلاش‌های مجدد آزمون منفرد همانطور که برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber) تعریف شده است، مثلاً `{ attempts: 0, limit: 0 }`، مراجعه کنید به
- `result` (`object`): نتیجه hook (شامل خصوصیات `error`، `result`، `duration`، `passed`، `retries` است)

### afterSuite

hook که پس از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### after

پس از اتمام تمام آزمون‌ها اجرا می‌شود. شما هنوز به تمام متغیرهای جهانی از آزمون دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - قبولی آزمون، 1 - شکست آزمون
- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### afterSession

درست پس از پایان جلسه webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### onComplete

پس از خاموش شدن تمام کارگرها و قبل از خروج فرآیند اجرا می‌شود. یک خطا در hook onComplete منجر به شکست اجرای آزمون می‌شود.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `result` (`object`): شیء نتایج شامل نتایج آزمون

### onReload

هنگامی که بازخوانی رخ می‌دهد، اجرا می‌شود.

پارامترها:

- `oldSessionId` (`string`): شناسه جلسه جلسه قدیمی
- `newSessionId` (`string`): شناسه جلسه جلسه جدید

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی در مورد pickle و مرحله آزمون
- `context` (`object`): شیء World در Cucumber

### afterScenario

پس از یک سناریوی Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی در مورد pickle و مرحله آزمون
- `result` (`object`): شیء نتایج شامل نتایج سناریو
- `result.passed` (`boolean`): true اگر سناریو قبول شده باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeStep

قبل از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریوی Cucumber
- `context` (`object`): شیء World در Cucumber

### afterStep

پس از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریوی Cucumber
- `result`: (`object`): شیء نتایج شامل نتایج مرحله
- `result.passed` (`boolean`): true اگر سناریو قبول شده باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeAssertion

hook که قبل از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تأیید

### afterAssertion

hook که پس از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تأیید
- `params.result`: نتایج تأیید
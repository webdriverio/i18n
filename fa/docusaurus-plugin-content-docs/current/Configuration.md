---
id: configuration
title: پیکربندی
---

بسته به [نوع راه‌اندازی](/docs/setuptypes) (مثلاً استفاده از پروتکل‌های خام، WebdriverIO به عنوان بسته مستقل یا آزمون‌گر WDIO) مجموعه متفاوتی از گزینه‌ها برای کنترل محیط در دسترس است.

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

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توان از این برای احراز هویت هر backend WebDriver دیگری استفاده کرد.

نوع: `String`<br />
پیش‌فرض: `undefined`

### key

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توان از این برای احراز هویت هر backend WebDriver دیگری استفاده کرد.

نوع: `String`<br />
پیش‌فرض: `undefined`

### capabilities

قابلیت‌هایی را که می‌خواهید در جلسه WebDriver خود اجرا کنید، تعریف می‌کند. برای جزئیات بیشتر، [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را بررسی کنید. اگر درایور قدیمی‌تری را اجرا می‌کنید که از پروتکل WebDriver پشتیبانی نمی‌کند، برای اجرای موفق یک جلسه، باید از [قابلیت‌های JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) استفاده کنید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های مخصوص مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر یا دستگاه از راه دور را فراهم می‌کنند. این‌ها در اسناد فروشنده مربوطه مستند شده‌اند، مانند:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، یک ابزار مفید، [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) از Sauce Labs است که به شما کمک می‌کند با کلیک کردن روی قابلیت‌های مورد نظر خود، این شیء را ایجاد کنید.

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

اگر آزمون‌های وب یا بومی را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver متفاوت است. برای جزئیات بیشتر به [اسناد Appium](https://appium.io/docs/en/latest/guides/caps/) مراجعه کنید.

### logLevel

سطح گزارش‌دهی جزئیات.

نوع: `String`<br />
پیش‌فرض: `info`<br />
گزینه‌ها: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دایرکتوری برای ذخیره تمام فایل‌های گزارش آزمون‌گر (شامل گزارش‌های گزارشگر و گزارش‌های `wdio`). اگر تنظیم نشود، تمام گزارش‌ها به `stdout` ارسال می‌شوند. از آنجا که اکثر گزارشگرها برای گزارش به `stdout` ساخته شده‌اند، توصیه می‌شود فقط از این گزینه برای گزارشگرهای خاصی استفاده کنید که منطقی‌تر است گزارش را به یک فایل ارسال کنند (مانند گزارشگر `junit`).

هنگام اجرا در حالت مستقل، تنها گزارش تولید شده توسط WebdriverIO، گزارش `wdio` خواهد بود.

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

سرایندهای `headers` سفارشی را برای ارسال در هر درخواست WebDriver مشخص کنید. اگر شبکه Selenium شما نیاز به احراز هویت اولیه دارد، توصیه می‌کنیم یک سرایند `Authorization` را از طریق این گزینه برای احراز هویت درخواست‌های WebDriver خود ارسال کنید، مثلاً:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// خواندن نام کاربری و رمز عبور از متغیرهای محیطی
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ترکیب نام کاربری و رمز عبور با جداکننده دو نقطه
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

آیا نیازی به معتبر بودن گواهی SSL نیست.
می‌تواند از طریق متغیرهای محیطی مانند `STRICT_SSL` یا `strict_ssl` تنظیم شود.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### enableDirectConnect

آیا [ویژگی اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود.
اگر پاسخ دارای کلیدهای مناسب نباشد، در حالی که این پرچم فعال است، کاری انجام نمی‌شود.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### cacheDir

مسیر به ریشه دایرکتوری کش. از این دایرکتوری برای ذخیره تمام درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `String`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

برای گزارش‌دهی امن‌تر، عبارات منظم تنظیم شده با `maskingPatterns` می‌توانند اطلاعات حساس را از گزارش مبهم کنند.
 - قالب رشته یک عبارت منظم با یا بدون پرچم (مثلاً `/.../i`) است و برای چندین عبارت منظم با کاما جدا می‌شود.
 - برای جزئیات بیشتر در مورد الگوهای مبهم‌سازی، به [بخش الگوهای مبهم‌سازی در README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) مراجعه کنید.

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

پروتکلی را که می‌خواهید برای اتوماسیون مرورگر خود استفاده کنید، تعریف کنید. در حال حاضر فقط [`webdriver`](https://www.npmjs.com/package/webdriver) پشتیبانی می‌شود، زیرا این فناوری اصلی اتوماسیون مرورگر است که WebdriverIO از آن استفاده می‌کند.

اگر می‌خواهید مرورگر را با استفاده از فناوری اتوماسیون متفاوتی کنترل کنید، این خاصیت را به مسیری تنظیم کنید که به ماژولی منتهی شود که با رابط زیر مطابقت داشته باشد:

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
     * مستقیماً در شیء مرورگر منتقل شده تغییر می‌دهد
     *
     * @optional
     * @param   {object} instance  شیء که ما از یک جلسه جدید مرورگر دریافت می‌کنیم.
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
- اگر پارامتر `url` شما با `/` شروع شود، آنگاه `baseUrl` در ابتدای آن قرار می‌گیرد (به جز مسیر `baseUrl`، اگر داشته باشد).
- اگر پارامتر `url` شما بدون یک طرح یا `/` شروع شود (مانند `some/path`)، آنگاه کل `baseUrl` مستقیماً در ابتدای آن قرار می‌گیرد.

نوع: `String`<br />
پیش‌فرض: `null`

### waitforTimeout

زمان انتظار پیش‌فرض برای تمام دستورات `waitFor*`. (توجه کنید که `f` در نام گزینه با حروف کوچک است.) این زمان انتظار __فقط__ روی دستوراتی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آنها تأثیر می‌گذارد.

برای افزایش زمان انتظار برای یک _آزمون_، لطفاً به اسناد فریمورک مراجعه کنید.

نوع: `Number`<br />
پیش‌فرض: `5000`

### waitforInterval

فاصله پیش‌فرض برای تمام دستورات `waitFor*` برای بررسی اینکه آیا یک وضعیت مورد انتظار (مثلاً، قابل مشاهده بودن) تغییر کرده است.

نوع: `Number`<br />
پیش‌فرض: `100`

### region

اگر روی Sauce Labs اجرا می‌کنید، می‌توانید انتخاب کنید که آزمون‌ها را بین مراکز داده مختلف اجرا کنید: US یا EU.
برای تغییر منطقه خود به EU، `region: 'eu'` را به پیکربندی خود اضافه کنید.

__نکته:__ این فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` را که به حساب Sauce Labs شما متصل هستند، ارائه دهید.

نوع: `String`<br />
پیش‌فرض: `us`

*(فقط برای vm و یا em/شبیه‌سازها)*

---

## گزینه‌های آزمون‌گر

گزینه‌های زیر (از جمله موارد ذکر شده در بالا) فقط برای اجرای WebdriverIO با آزمون‌گر WDIO تعریف شده‌اند:

### specs

مشخصات را برای اجرای آزمون تعریف کنید. می‌توانید یک الگوی glob را برای تطبیق چندین فایل به طور همزمان مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را درون یک آرایه قرار دهید تا آنها را در یک فرآیند کارگر واحد اجرا کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `(String | String[])[]`<br />
پیش‌فرض: `[]`

### exclude

مشخصات را از اجرای آزمون حذف کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### suites

یک شیء که مجموعه‌های مختلف را توصیف می‌کند، که می‌توانید سپس با گزینه `--suite` در CLI `wdio` مشخص کنید.

نوع: `Object`<br />
پیش‌فرض: `{}`

### capabilities

همانند بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که گزینه مشخص کردن یک شیء [`multiremote`](/docs/multiremote) یا چندین جلسه WebDriver در یک آرایه برای اجرای موازی وجود دارد.

می‌توانید همان قابلیت‌های خاص فروشنده و مرورگر را که [در بالا](/docs/configuration#capabilities) تعریف شده است، اعمال کنید.

نوع: `Object`|`Object[]`<br />
پیش‌فرض: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

حداکثر تعداد کل کارگرهای موازی در حال اجرا.

__نکته:__ ممکن است عددی به بزرگی `100` باشد، هنگامی که آزمون‌ها بر روی برخی فروشندگان خارجی مانند ماشین‌های Sauce Labs انجام می‌شوند. در آنجا، آزمون‌ها روی یک ماشین واحد انجام نمی‌شوند، بلکه روی چندین ماشین مجازی انجام می‌شوند. اگر آزمون‌ها قرار است روی یک ماشین توسعه محلی اجرا شوند، از عددی منطقی‌تر مانند `3`، `4` یا `5` استفاده کنید. اساساً، این تعداد مرورگرهایی است که به طور همزمان شروع می‌شوند و آزمون‌های شما را همزمان اجرا می‌کنند، بنابراین به میزان RAM موجود در دستگاه شما و تعداد برنامه‌های دیگری که روی دستگاه شما اجرا می‌شوند، بستگی دارد.

همچنین می‌توانید `maxInstances` را در اشیاء قابلیت خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این کار تعداد جلسات موازی را برای آن قابلیت خاص محدود می‌کند.

نوع: `Number`<br />
پیش‌فرض: `100`

### maxInstancesPerCapability

حداکثر تعداد کل کارگرهای موازی در حال اجرا برای هر قابلیت.

نوع: `Number`<br />
پیش‌فرض: `100`

### injectGlobals

متغیرهای جهانی WebdriverIO (مثلاً `browser`، `$` و `$$`) را در محیط جهانی وارد می‌کند.
اگر آن را روی `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید، مثلاً:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

نکته: WebdriverIO تزریق متغیرهای جهانی مختص فریمورک آزمون را مدیریت نمی‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### bail

اگر می‌خواهید اجرای آزمون شما پس از تعداد مشخصی از شکست‌های آزمون متوقف شود، از `bail` استفاده کنید.
(پیش‌فرض آن `0` است، که تمام آزمون‌ها را بدون توجه به نتیجه اجرا می‌کند.) **نکته:** یک آزمون در این زمینه تمام آزمون‌های درون یک فایل مشخصات واحد (هنگام استفاده از Mocha یا Jasmine) یا تمام مراحل درون یک فایل ویژگی (هنگام استفاده از Cucumber) است. اگر می‌خواهید رفتار bail را درون آزمون‌های یک فایل آزمون واحد کنترل کنید، به گزینه‌های [فریمورک](frameworks) موجود نگاه کنید.

نوع: `Number`<br />
پیش‌فرض: `0` (توقف نکن؛ تمام آزمون‌ها را اجرا کن)

### specFileRetries

تعداد دفعاتی که یک فایل مشخصات کامل را هنگامی که به عنوان یک کل شکست می‌خورد، دوباره امتحان کنید.

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDelay

تأخیر به ثانیه بین تلاش‌های مجدد فایل مشخصات

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDeferred

آیا فایل‌های مشخصات تلاش مجدد باید فوراً مجدداً تلاش شوند یا به انتهای صف موکول شوند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### groupLogsByTestSpec

نمای خروجی گزارش را انتخاب کنید.

اگر روی `false` تنظیم شود، گزارش‌ها از فایل‌های آزمون مختلف در زمان واقعی چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است هنگام اجرا به صورت موازی منجر به ترکیب خروجی‌های گزارش از فایل‌های مختلف شود.

اگر روی `true` تنظیم شود، خروجی‌های گزارش بر اساس Test Spec گروه‌بندی می‌شوند و فقط زمانی چاپ می‌شوند که Test Spec تکمیل شده باشد.

به طور پیش‌فرض، روی `false` تنظیم شده است، بنابراین گزارش‌ها در زمان واقعی چاپ می‌شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### autoAssertOnTestEnd

کنترل می‌کند که آیا WebdriverIO به طور خودکار تمام تاییدیه‌های نرم را در پایان هر آزمون بررسی می‌کند. وقتی روی `true` تنظیم شود، هر تاییدیه نرم انباشته شده به طور خودکار بررسی می‌شود و در صورت شکست هر تاییدیه، باعث شکست آزمون می‌شود. وقتی روی `false` تنظیم شود، باید روش assert را به صورت دستی فراخوانی کنید تا تاییدیه‌های نرم را بررسی کنید.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### services

سرویس‌ها یک کار خاص را که نمی‌خواهید مراقب آن باشید، انجام می‌دهند. آنها تنظیمات آزمون شما را تقریباً بدون تلاش بهبود می‌بخشند.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

### framework

فریمورک آزمونی را که توسط آزمون‌گر WDIO استفاده می‌شود، تعریف می‌کند.

نوع: `String`<br />
پیش‌فرض: `mocha`<br />
گزینه‌ها: `mocha` | `jasmine`

### mochaOpts, jasmineOpts و cucumberOpts

گزینه‌های خاص مربوط به فریمورک. به اسناد آداپتور فریمورک مراجعه کنید تا ببینید کدام گزینه‌ها در دسترس هستند. اطلاعات بیشتر در مورد این موضوع را در [Frameworks](frameworks) بخوانید.

نوع: `Object`<br />
پیش‌فرض: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

لیست ویژگی‌های cucumber با شماره خط (هنگام [استفاده از فریمورک cucumber](./Frameworks.md#using-cucumber)).

نوع: `String[]`
پیش‌فرض: `[]`

### reporters

لیست گزارشگرهایی که باید استفاده شوند. یک گزارشگر می‌تواند یک رشته باشد، یا یک آرایه از
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

تعیین می‌کند در چه فاصله‌ای گزارشگر باید بررسی کند که آیا همگام‌سازی شده‌اند اگر گزارش‌های خود را به صورت غیرهمزمان گزارش کنند (به عنوان مثال، اگر گزارش‌ها به یک فروشنده شخص ثالث ارسال شوند).

نوع: `Number`<br />
پیش‌فرض: `100` (میلی‌ثانیه)

### reporterSyncTimeout

حداکثر زمانی را که گزارشگرها برای اتمام آپلود تمام گزارش‌های خود دارند تا زمانی که خطایی توسط آزمون‌گر ایجاد شود، تعیین می‌کند.

نوع: `Number`<br />
پیش‌فرض: `5000` (میلی‌ثانیه)

### execArgv

آرگومان‌های Node که باید هنگام راه‌اندازی فرآیندهای فرزند مشخص شوند.

نوع: `String[]`<br />
پیش‌فرض: `null`

### filesToWatch

لیستی از الگوهای رشته‌ای با پشتیبانی از glob که به آزمون‌گر می‌گویند فایل‌های دیگری را نیز تماشا کند، مثلاً فایل‌های برنامه، هنگامی که با پرچم `--watch` اجرا می‌شود. به طور پیش‌فرض، آزمون‌گر قبلاً تمام فایل‌های مشخصات را تماشا می‌کند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### updateSnapshots

اگر می‌خواهید اسنپ‌شات‌های خود را به‌روز کنید، روی true تنظیم کنید. ترجیحاً به عنوان بخشی از یک پارامتر CLI استفاده می‌شود، مثلاً `wdio run wdio.conf.js --s`.

نوع: `'new' | 'all' | 'none'`<br />
پیش‌فرض: `none` اگر ارائه نشده و آزمون‌ها در CI اجرا شوند، `new` اگر ارائه نشده، در غیر این صورت آنچه ارائه شده

### resolveSnapshotPath

مسیر اسنپ‌شات پیش‌فرض را لغو می‌کند. به عنوان مثال، برای ذخیره اسنپ‌شات‌ها در کنار فایل‌های آزمون.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

نوع: `(testPath: string, snapExtension: string) => string`<br />
پیش‌فرض: فایل‌های اسنپ‌شات را در دایرکتوری `__snapshots__` در کنار فایل آزمون ذخیره می‌کند

### tsConfigPath

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود، اما می‌توانید یک مسیر سفارشی را در اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

به اسناد `tsx` مراجعه کنید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

نوع: `String`<br />
پیش‌فرض: `null`<br />

## هوک‌ها

آزمون‌گر WDIO به شما امکان می‌دهد هوک‌هایی را تنظیم کنید که در زمان‌های خاصی از چرخه حیات آزمون فعال شوند. این امکان اقدامات سفارشی را فراهم می‌کند (مثلاً گرفتن اسکرین‌شات اگر یک آزمون شکست بخورد).

هر هوک به عنوان پارامتر، اطلاعات خاصی در مورد چرخه حیات دارد (مثلاً اطلاعات در مورد مجموعه آزمون یا آزمون). در مورد تمام خصوصیات هوک در [پیکربندی نمونه ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) بیشتر بخوانید.

**نکته:** برخی هوک‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در فرآیند متفاوتی اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده جهانی را با سایر هوک‌هایی که در فرآیند کارگر قرار دارند، به اشتراک بگذارند.

### onPrepare

یک بار قبل از راه‌اندازی تمام کارگرها اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): لیست جزئیات قابلیت‌ها

### onWorkerStart

قبل از اینکه یک فرآیند کارگر ایجاد شود، اجرا می‌شود و می‌تواند برای مقداردهی اولیه سرویس خاص برای آن کارگر و همچنین تغییر محیط‌های اجرایی به صورت غیرهمزمان استفاده شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `args` (`object`): شیء که پس از مقداردهی اولیه کارگر با پیکربندی اصلی ادغام می‌شود
- `execArgv` (`string[]`): لیست آرگومان‌های رشته‌ای که به فرآیند کارگر منتقل می‌شوند

### onWorkerEnd

درست پس از خروج یک فرآیند کارگر اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح مشخصات که طبق تعریف در [_"اضافه کردن تلاش‌های مجدد بر اساس فایل مشخصات"_](./Retry.md#add-retries-on-a-per-specfile-basis) استفاده شده است

### beforeSession

درست قبل از مقداردهی اولیه جلسه webdriver و فریمورک آزمون اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را بسته به قابلیت یا مشخصات دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### before

قبل از شروع اجرای آزمون اجرا می‌شود. در این نقطه می‌توانید به تمام متغیرهای جهانی مانند `browser` دسترسی داشته باشید. این مکان مناسبی برای تعریف دستورات سفارشی است.

پارامترها:

- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `browser` (`object`): نمونه جلسه مرورگر/دستگاه ایجاد شده

### beforeSuite

هوکی که قبل از شروع مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### beforeHook

هوکی که *قبل* از یک هوک درون مجموعه اجرا می‌شود (مثلاً قبل از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): زمینه آزمون (نشان‌دهنده شیء World در Cucumber است)

### afterHook

هوکی که *بعد* از یک هوک درون مجموعه پایان می‌یابد (مثلاً بعد از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): زمینه آزمون (نشان‌دهنده شیء World در Cucumber است)
- `result` (`object`): نتیجه هوک (شامل خصوصیات `error`، `result`، `duration`، `passed`، `retries` است)

### beforeTest

تابعی که قبل از یک آزمون اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): شیء دامنه که آزمون با آن اجرا شده است

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

تابعی که پس از پایان یک آزمون (در Mocha/Jasmine) اجرا می‌شود.

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): شیء دامنه که آزمون با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست آزمون، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع آزمون
- `result.duration` (`Number`): مدت آزمون
- `result.passed` (`Boolean`): true اگر آزمون موفق شده باشد، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات در مورد تلاش‌های مجدد آزمون منفرد همانطور که برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber) تعریف شده است، مثلاً `{ attempts: 0, limit: 0 }`، ببینید
- `result` (`object`): نتیجه هوک (شامل خصوصیات `error`، `result`، `duration`، `passed`، `retries` است)

### afterSuite

هوکی که پس از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### after

پس از انجام تمام آزمون‌ها اجرا می‌شود. هنوز به تمام متغیرهای جهانی از آزمون دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - موفقیت آزمون، 1 - شکست آزمون
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### afterSession

درست پس از پایان جلسه webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### onComplete

پس از خاموش شدن تمام کارگرها و قبل از خروج فرآیند اجرا می‌شود. خطایی که در هوک onComplete ایجاد شود منجر به شکست اجرای آزمون می‌شود.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
- `result` (`object`): شیء نتایج شامل نتایج آزمون

### onReload

هنگامی که یک رفرش اتفاق می‌افتد، اجرا می‌شود.

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی در مورد pickle و مرحله آزمون
- `context` (`object`): شیء World از Cucumber

### afterScenario

پس از یک سناریو Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world شامل اطلاعاتی در مورد pickle و مرحله آزمون
- `result` (`object`): شیء نتایج شامل نتایج سناریو
- `result.passed` (`boolean`): true اگر سناریو موفق شده باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت سناریو به میلی‌ثانیه
- `context` (`object`): شیء World از Cucumber

### beforeStep

قبل از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریو Cucumber
- `context` (`object`): شیء World از Cucumber

### afterStep

پس از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریو Cucumber
- `result`: (`object`): شیء نتایج شامل نتایج مرحله
- `result.passed` (`boolean`): true اگر سناریو موفق شده باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت سناریو به میلی‌ثانیه
- `context` (`object`): شیء World از Cucumber

### beforeAssertion

هوکی که قبل از انجام یک تاییدیه WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تاییدیه
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تاییدیه

### afterAssertion

هوکی که پس از انجام یک تاییدیه WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تاییدیه
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تاییدیه
- `params.result`: نتایج تاییدیه
---
id: configuration
title: پیکربندی
---

بر اساس [نوع راه‌اندازی](/docs/setuptypes) (به عنوان مثال استفاده از پروتکل خام، WebdriverIO به عنوان یک بسته مستقل یا اجراکننده تست WDIO) مجموعه‌ای از گزینه‌های مختلف برای کنترل محیط وجود دارد.

## گزینه‌های WebDriver

گزینه‌های زیر هنگام استفاده از بسته پروتکل [`webdriver`](https://www.npmjs.com/package/webdriver) تعریف می‌شوند:

### protocol

پروتکلی که هنگام ارتباط با سرور درایور استفاده می‌شود.

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

پارامترهای پرس و جو که به سرور درایور منتقل می‌شوند.

نوع: `Object`<br />
پیش‌فرض: `undefined`

### user

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توان از این برای احراز هویت هر پشتیبان WebDriver دیگری استفاده کرد.

نوع: `String`<br />
پیش‌فرض: `undefined`

### key

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، می‌توان از این برای احراز هویت هر پشتیبان WebDriver دیگری استفاده کرد.

نوع: `String`<br />
پیش‌فرض: `undefined`

### capabilities

قابلیت‌هایی را که می‌خواهید در جلسه WebDriver خود اجرا کنید، تعریف می‌کند. برای جزئیات بیشتر، [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را بررسی کنید. اگر درایور قدیمی‌تری را اجرا می‌کنید که از پروتکل WebDriver پشتیبانی نمی‌کند، باید از [قابلیت‌های JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) برای اجرای موفق یک جلسه استفاده کنید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های خاص مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر یا دستگاه راه دور را فراهم می‌کند. این‌ها در اسناد فروشنده مربوطه مستند شده‌اند، به عنوان مثال:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، ابزار مفیدی به نام [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) از Sauce Labs وجود دارد که به شما کمک می‌کند با کلیک کردن روی قابلیت‌های مورد نظر، این شیء را ایجاد کنید.

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

اگر در حال اجرای آزمون‌های وب یا بومی روی دستگاه‌های موبایل هستید، `capabilities` با پروتکل WebDriver متفاوت است. برای جزئیات بیشتر، [اسناد Appium](https://appium.io/docs/en/latest/guides/caps/) را ببینید.

### logLevel

سطح جزئیات گزارش.

نوع: `String`<br />
پیش‌فرض: `info`<br />
گزینه‌ها: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دایرکتوری برای ذخیره همه فایل‌های گزارش اجراکننده تست (از جمله گزارش‌های گزارشگر و گزارش‌های `wdio`). اگر تنظیم نشود، همه گزارش‌ها به `stdout` ارسال می‌شوند. از آنجا که اکثر گزارشگرها برای گزارش به `stdout` ساخته شده‌اند، توصیه می‌شود فقط از این گزینه برای گزارشگرهای خاصی استفاده کنید که در آن ارسال گزارش به یک فایل منطقی‌تر است (مانند گزارشگر `junit`).

هنگام اجرا در حالت مستقل، تنها گزارش تولید شده توسط WebdriverIO، گزارش `wdio` خواهد بود.

نوع: `String`<br />
پیش‌فرض: `null`

### connectionRetryTimeout

مهلت زمانی برای هر درخواست WebDriver به یک درایور یا گرید.

نوع: `Number`<br />
پیش‌فرض: `120000`

### connectionRetryCount

حداکثر تعداد تلاش‌های مجدد درخواست به سرور Selenium.

نوع: `Number`<br />
پیش‌فرض: `3`

### agent

به شما امکان می‌دهد از یک [عامل](https://www.npmjs.com/package/got#agent) سفارشی `http`/`https`/`http2` برای ارسال درخواست‌ها استفاده کنید.

نوع: `Object`<br />
پیش‌فرض:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

تعیین `headers` سفارشی برای ارسال در هر درخواست WebDriver. اگر گرید Selenium شما نیاز به احراز هویت پایه دارد، توصیه می‌کنیم یک هدر `Authorization` از طریق این گزینه برای احراز هویت درخواست‌های WebDriver خود ارسال کنید، به عنوان مثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// خواندن نام کاربری و رمز عبور از متغیرهای محیطی
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ترکیب نام کاربری و رمز عبور با یک جداکننده دو نقطه
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

تابعی که [گزینه‌های درخواست HTTP](https://github.com/sindresorhus/got#options) را قبل از ارسال درخواست WebDriver رهگیری می‌کند

نوع: `(RequestOptions) => RequestOptions`<br />
پیش‌فرض: *هیچ*

### transformResponse

تابعی که اشیاء پاسخ HTTP را پس از دریافت پاسخ WebDriver رهگیری می‌کند. این تابع، شیء پاسخ اصلی را به عنوان اولین آرگومان و `RequestOptions` مربوطه را به عنوان آرگومان دوم دریافت می‌کند.

نوع: `(Response, RequestOptions) => Response`<br />
پیش‌فرض: *هیچ*

### strictSSL

آیا نیاز دارد که گواهی SSL معتبر باشد یا خیر.
می‌تواند از طریق متغیرهای محیطی مانند `STRICT_SSL` یا `strict_ssl` تنظیم شود.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### enableDirectConnect

آیا [ویژگی اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) را فعال کند.
اگر پاسخ کلیدهای مناسب را نداشته باشد، در حالی که پرچم فعال است، هیچ کاری انجام نمی‌دهد.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### cacheDir

مسیر به ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند، استفاده می‌شود.

نوع: `String`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

برای گزارش‌دهی امن‌تر، عبارات منظم تنظیم شده با `maskingPatterns` می‌توانند اطلاعات حساس را از گزارش مبهم کنند.
 - فرمت رشته یک عبارت منظم با یا بدون پرچم (مانند `/.../i`) است و برای چندین عبارت منظم با کاما جدا می‌شود.
 - برای جزئیات بیشتر در مورد الگوهای مخفی‌سازی، به [بخش الگوهای مخفی‌سازی در README ثبت‌کننده WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) مراجعه کنید.

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

پروتکلی را که می‌خواهید برای خودکارسازی مرورگر خود استفاده کنید، تعریف کنید. در حال حاضر فقط [`webdriver`](https://www.npmjs.com/package/webdriver) پشتیبانی می‌شود، زیرا این فناوری اصلی خودکارسازی مرورگر است که WebdriverIO استفاده می‌کند.

اگر می‌خواهید مرورگر را با استفاده از فناوری خودکارسازی متفاوتی خودکار کنید، مطمئن شوید که این ویژگی را به مسیری تنظیم کنید که به ماژولی متصل شود که از رابط زیر پیروی می‌کند:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * یک جلسه خودکارسازی را شروع کنید و یک [مونادی](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO 
     * با دستورات خودکارسازی مربوطه برگردانید. به بسته [webdriver](https://www.npmjs.com/package/webdriver) 
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
     * شناسه جلسه و قابلیت‌های مرورگر نمونه را برای جلسه جدید
     * مستقیماً در شیء مرورگر ارسال شده تغییر می‌دهد
     *
     * @optional
     * @param   {object} instance  شیئی که از یک جلسه مرورگر جدید می‌گیریم.
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
- اگر پارامتر `url` شما با `/` شروع شود، آنگاه `baseUrl` در ابتدای آن قرار می‌گیرد (به جز مسیر `baseUrl`، اگر داشته باشد).
- اگر پارامتر `url` شما بدون طرح یا `/` شروع شود (مانند `some/path`)، آنگاه کل `baseUrl` مستقیماً در ابتدای آن قرار می‌گیرد.

نوع: `String`<br />
پیش‌فرض: `null`

### waitforTimeout

مهلت زمانی پیش‌فرض برای تمام دستورات `waitFor*`. (توجه کنید که `f` در نام گزینه کوچک است.) این مهلت زمانی __فقط__ بر دستوراتی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آنها تأثیر می‌گذارد.

برای افزایش مهلت زمانی برای یک _تست_، لطفاً به مستندات چارچوب مراجعه کنید.

نوع: `Number`<br />
پیش‌فرض: `5000`

### waitforInterval

فاصله پیش‌فرض برای تمام دستورات `waitFor*` برای بررسی اینکه آیا وضعیت مورد انتظار (مثلاً قابلیت دید) تغییر کرده است.

نوع: `Number`<br />
پیش‌فرض: `100`

### region

اگر در Sauce Labs اجرا می‌کنید، می‌توانید انتخاب کنید که آزمون‌ها را بین مراکز داده مختلف اجرا کنید: US یا EU.
برای تغییر منطقه خود به EU، `region: 'eu'` را به پیکربندی خود اضافه کنید.

__توجه:__ این فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` مرتبط با حساب Sauce Labs خود را ارائه دهید.

نوع: `String`<br />
پیش‌فرض: `us`

*(فقط برای vm و یا em/شبیه‌سازها)*

---

## گزینه‌های اجراکننده تست

گزینه‌های زیر (از جمله موارد ذکر شده در بالا) فقط برای اجرای WebdriverIO با اجراکننده تست WDIO تعریف شده‌اند:

### specs

مشخصات را برای اجرای تست تعریف کنید. می‌توانید یک الگوی glob برای مطابقت با چندین فایل به طور همزمان مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا آنها را در یک فرآیند کارگر واحد اجرا کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `(String | String[])[]`<br />
پیش‌فرض: `[]`

### exclude

مشخصات را از اجرای تست حذف کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی در نظر گرفته می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### suites

یک شیء که مجموعه‌های مختلف را توصیف می‌کند، که می‌توانید سپس با گزینه `--suite` در CLI `wdio` مشخص کنید.

نوع: `Object`<br />
پیش‌فرض: `{}`

### capabilities

همانند بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که گزینه‌ای برای مشخص کردن یک شیء [`multiremote`](/docs/multiremote) یا چندین جلسه WebDriver در یک آرایه برای اجرای موازی وجود دارد.

می‌توانید همان قابلیت‌های خاص فروشنده و مرورگر را که [در بالا](/docs/configuration#capabilities) تعریف شده است، اعمال کنید.

نوع: `Object`|`Object[]`<br />
پیش‌فرض: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

حداکثر تعداد کل کارگران اجرایی موازی.

__توجه:__ که ممکن است این عدد به بالای `100` برسد، زمانی که آزمون‌ها روی برخی فروشندگان خارجی مانند ماشین‌های Sauce Labs انجام می‌شود. در آنجا، آزمون‌ها روی یک ماشین واحد انجام نمی‌شوند، بلکه روی چندین ماشین مجازی اجرا می‌شوند. اگر آزمون‌ها قرار است روی یک ماشین توسعه محلی اجرا شوند، از عددی که منطقی‌تر است مانند `3`، `4` یا `5` استفاده کنید. اساساً، این تعداد مرورگرهایی است که به طور همزمان شروع می‌شوند و آزمون‌های شما را در همان زمان اجرا می‌کنند، بنابراین به میزان رم موجود در ماشین شما و تعداد برنامه‌های دیگری که روی ماشین شما اجرا می‌شوند بستگی دارد.

شما همچنین می‌توانید `maxInstances` را در داخل اشیاء قابلیت خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این کار تعداد جلسات موازی را برای آن قابلیت خاص محدود می‌کند.

نوع: `Number`<br />
پیش‌فرض: `100`

### maxInstancesPerCapability

حداکثر تعداد کل کارگران اجرایی موازی به ازای هر قابلیت.

نوع: `Number`<br />
پیش‌فرض: `100`

### injectGlobals

متغیرهای جهانی WebdriverIO (مانند `browser`، `$` و `$$`) را در محیط جهانی قرار می‌دهد.
اگر آن را روی `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید، به عنوان مثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

توجه: WebdriverIO تزریق متغیرهای جهانی خاص چارچوب تست را مدیریت نمی‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### bail

اگر می‌خواهید اجرای آزمون خود پس از تعداد مشخصی از شکست‌های آزمون متوقف شود، از `bail` استفاده کنید.
(پیش‌فرض آن `0` است، که همه آزمون‌ها را بدون توجه به نتیجه اجرا می‌کند.) **توجه:** یک آزمون در این زمینه شامل تمام آزمون‌هایی است که در یک فایل مشخصات واحد قرار دارند (هنگام استفاده از Mocha یا Jasmine) یا تمام مراحل در یک فایل ویژگی (هنگام استفاده از Cucumber). اگر می‌خواهید رفتار bail را در آزمون‌های یک فایل آزمون واحد کنترل کنید، به گزینه‌های موجود [چارچوب](frameworks) نگاهی بیندازید.

نوع: `Number`<br />
پیش‌فرض: `0` (توقف نمی‌کند؛ همه آزمون‌ها را اجرا می‌کند)

### specFileRetries

تعداد دفعاتی که یک فایل مشخصات کامل را هنگامی که به عنوان یک کل شکست می‌خورد، مجدداً تلاش می‌کند.

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDelay

تأخیر به ثانیه بین تلاش‌های مجدد فایل مشخصات

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDeferred

آیا فایل‌های مشخصات که مجدداً تلاش می‌شوند باید فوراً مجدداً تلاش شوند یا به انتهای صف منتقل شوند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### groupLogsByTestSpec

نمای خروجی گزارش را انتخاب کنید.

اگر روی `false` تنظیم شود، گزارش‌ها از فایل‌های آزمون مختلف در زمان واقعی چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است منجر به مخلوط شدن خروجی‌های گزارش از فایل‌های مختلف هنگام اجرای موازی شود.

اگر روی `true` تنظیم شود، خروجی‌های گزارش بر اساس مشخصات آزمون گروه‌بندی شده و فقط زمانی چاپ می‌شوند که مشخصات آزمون تکمیل شود.

به طور پیش‌فرض، روی `false` تنظیم شده است، بنابراین گزارش‌ها در زمان واقعی چاپ می‌شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### services

سرویس‌ها کاری خاص را که نمی‌خواهید مراقب آن باشید، بر عهده می‌گیرند. آنها تنظیمات آزمون شما را با حداقل تلاش ارتقا می‌دهند.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

### framework

چارچوب آزمونی را که توسط اجراکننده تست WDIO استفاده می‌شود، تعریف می‌کند.

نوع: `String`<br />
پیش‌فرض: `mocha`<br />
گزینه‌ها: `mocha` | `jasmine`

### mochaOpts، jasmineOpts و cucumberOpts

گزینه‌های خاص مرتبط با چارچوب. ببینید که کدام گزینه‌ها در مستندات آداپتور چارچوب موجود است. اطلاعات بیشتر در این مورد را در [چارچوب‌ها](frameworks) بخوانید.

نوع: `Object`<br />
پیش‌فرض: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

لیستی از ویژگی‌های خیار با شماره خط (هنگام [استفاده از چارچوب خیار](./Frameworks.md#using-cucumber)).

نوع: `String[]`
پیش‌فرض: `[]`

### reporters

لیست گزارشگرهایی که باید استفاده شود. یک گزارشگر می‌تواند یک رشته یا آرایه‌ای از
`['reporterName', { /* reporter options */}]` باشد که در آن عنصر اول یک رشته با نام گزارشگر و عنصر دوم یک شیء با گزینه‌های گزارشگر است.

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

تعیین می‌کند که گزارشگر در چه فاصله‌ای باید بررسی کند که آیا آنها همگام شده‌اند اگر گزارش‌های خود را به صورت غیرهمزمان گزارش می‌دهند (مثلاً اگر گزارش‌ها به یک فروشنده شخص ثالث ارسال می‌شوند).

نوع: `Number`<br />
پیش‌فرض: `100` (میلی‌ثانیه)

### reporterSyncTimeout

حداکثر زمانی را که گزارشگران برای تکمیل بارگذاری تمام گزارش‌های خود دارند تا زمانی که یک خطا توسط اجراکننده تست ایجاد شود، تعیین می‌کند.

نوع: `Number`<br />
پیش‌فرض: `5000` (میلی‌ثانیه)

### execArgv

آرگومان‌های Node که باید هنگام راه‌اندازی فرآیندهای فرزند مشخص شوند.

نوع: `String[]`<br />
پیش‌فرض: `null`

### filesToWatch

لیستی از الگوهای رشته‌ای پشتیبانی‌کننده glob که به اجراکننده تست می‌گویند تا به طور اضافی فایل‌های دیگری را نیز تماشا کند، مثلاً فایل‌های برنامه، هنگامی که آن را با پرچم `--watch` اجرا می‌کنید. به طور پیش‌فرض، اجراکننده تست از قبل تمام فایل‌های مشخصات را تماشا می‌کند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### updateSnapshots

اگر می‌خواهید اسنپ‌شات‌های خود را به‌روز کنید، روی true تنظیم کنید. ایده‌آل است که به عنوان بخشی از یک پارامتر CLI استفاده شود، مثلاً `wdio run wdio.conf.js --s`.

نوع: `'new' | 'all' | 'none'`<br />
پیش‌فرض: `none` اگر ارائه نشود و آزمون‌ها در CI اجرا شوند، `new` اگر ارائه نشود، در غیر این صورت آنچه ارائه شده است

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

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود، اما می‌توانید یک مسیر سفارشی را اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

به مستندات `tsx` مراجعه کنید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

نوع: `String`<br />
پیش‌فرض: `null`<br />

## هوک‌ها

اجراکننده تست WDIO به شما اجازه می‌دهد هوک‌هایی را تنظیم کنید که در زمان‌های خاصی از چرخه حیات تست فعال شوند. این امکان اقدامات سفارشی را فراهم می‌کند (مثلاً گرفتن اسکرین‌شات اگر یک تست شکست بخورد).

هر هوک به عنوان پارامتر، اطلاعات خاصی در مورد چرخه حیات دارد (مثلاً اطلاعات در مورد مجموعه تست یا تست). در مورد همه ویژگی‌های هوک در [پیکربندی نمونه ما](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) بیشتر بخوانید.

**توجه:** برخی هوک‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در یک فرآیند متفاوت اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده جهانی را با سایر هوک‌هایی که در فرآیند کارگر قرار دارند، به اشتراک بگذارند.

### onPrepare

قبل از اینکه همه کارگران راه‌اندازی شوند، یک بار اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): لیست جزئیات قابلیت‌ها

### onWorkerStart

قبل از اینکه یک فرآیند کارگر ایجاد شود، اجرا می‌شود و می‌تواند برای راه‌اندازی سرویس‌های خاص برای آن کارگر و همچنین تغییر محیط‌های اجرایی به صورت غیرهمزمان استفاده شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `args` (`object`): شیئی که پس از راه‌اندازی کارگر با پیکربندی اصلی ادغام خواهد شد
- `execArgv` (`string[]`): لیست آرگومان‌های رشته‌ای که به فرآیند کارگر ارسال می‌شوند

### onWorkerEnd

درست پس از اینکه یک فرآیند کارگر خارج شد، اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `retries` (`number`): تعداد تلاش‌های مجدد سطح مشخصات استفاده شده همانطور که در [_"افزودن تلاش‌های مجدد بر اساس فایل مشخصات"_](./Retry.md#add-retries-on-a-per-specfile-basis) تعریف شده است

### beforeSession

درست قبل از راه‌اندازی جلسه webdriver و چارچوب آزمون اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را با توجه به قابلیت یا مشخصات دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### before

قبل از شروع اجرای آزمون اجرا می‌شود. در این نقطه می‌توانید به تمام متغیرهای جهانی مانند `browser` دسترسی داشته باشید. این مکان مناسبی برای تعریف دستورات سفارشی است.

پارامترها:

- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند
- `browser` (`object`): نمونه‌ای از جلسه مرورگر/دستگاه ایجاد شده

### beforeSuite

هوکی که قبل از شروع مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### beforeHook

هوکی که *قبل* از یک هوک در داخل مجموعه اجرا می‌شود (مثلاً قبل از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): زمینه آزمون (نشان‌دهنده شیء World در Cucumber است)

### afterHook

هوکی که *بعد* از یک هوک در داخل مجموعه اجرا می‌شود (مثلاً بعد از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): زمینه آزمون (نشان‌دهنده شیء World در Cucumber است)
- `result` (`object`): نتیجه هوک (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries` است)

### beforeTest

تابعی که قبل از یک آزمون اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): شیء دامنه که آزمون با آن اجرا شد

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
- `context` (`object`): شیء دامنه که آزمون با آن اجرا شد
- `result.error` (`Error`): شیء خطا در صورتی که آزمون شکست بخورد، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع آزمون
- `result.duration` (`Number`): مدت آزمون
- `result.passed` (`Boolean`): true اگر آزمون موفق باشد، در غیر این صورت false
- `result.retries` (`Object`): اطلاعاتی در مورد تلاش‌های مجدد مربوط به یک آزمون واحد همانطور که برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber) تعریف شده است، مثلاً `{ attempts: 0, limit: 0 }`، به
- `result` (`object`): نتیجه هوک (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries` است)

### afterSuite

هوکی که پس از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### after

پس از اتمام همه آزمون‌ها اجرا می‌شود. هنوز به تمام متغیرهای جهانی از آزمون دسترسی دارید.

پارامترها:

- `result` (`number`): 0 - آزمون موفق، 1 - آزمون شکست خورده
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### afterSession

درست پس از پایان جلسه webdriver اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد خواهد شد
- `specs` (`string[]`): مشخصاتی که در فرآیند کارگر اجرا می‌شوند

### onComplete

پس از خاموش شدن همه کارگران و فرآیند در حال خروج است، اجرا می‌شود. یک خطا پرتاب شده در هوک onComplete منجر به شکست اجرای آزمون خواهد شد.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): حاوی قابلیت‌هایی برای جلسه‌ای که در کارگر ایجاد خواهد شد
- `result` (`object`): شیء نتایج حاوی نتایج آزمون

### onReload

هنگامی که یک بازآوری رخ می‌دهد، اجرا می‌شود.

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

قبل از یک سناریوی Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء جهانی حاوی اطلاعاتی در مورد pickle و مرحله آزمون
- `context` (`object`): شیء World در Cucumber

### afterScenario

بعد از یک سناریوی Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء جهانی حاوی اطلاعاتی در مورد pickle و مرحله آزمون
- `result` (`object`): شیء نتایج حاوی نتایج سناریو
- `result.passed` (`boolean`): true اگر سناریو موفق باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت سناریو به میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeStep

قبل از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریوی Cucumber
- `context` (`object`): شیء World در Cucumber

### afterStep

بعد از یک مرحله Cucumber اجرا می‌شود.

پارامترها:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): شیء مرحله Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): شیء سناریوی Cucumber
- `result`: (`object`): شیء نتایج حاوی نتایج مرحله
- `result.passed` (`boolean`): true اگر سناریو موفق باشد
- `result.error` (`string`): پشته خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت سناریو به میلی‌ثانیه
- `context` (`object`): شیء World در Cucumber

### beforeAssertion

هوکی که قبل از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تأیید

### afterAssertion

هوکی که پس از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده ارسال می‌شود
- `params.options`: گزینه‌های تأیید
- `params.result`: نتایج تأیید
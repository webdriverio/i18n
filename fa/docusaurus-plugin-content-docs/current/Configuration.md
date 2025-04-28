---
id: configuration
title: پیکربندی
---

بر اساس [نوع راه‌اندازی](/docs/setuptypes) (به عنوان مثال استفاده از ارتباطات پروتکل خام، WebdriverIO به عنوان بسته مستقل یا تست‌ران WDIO) مجموعه‌ای از گزینه‌های مختلف برای کنترل محیط وجود دارد.

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

پارامترهای پرس‌وجو که به سرور درایور منتقل می‌شوند.

نوع: `Object`<br />
پیش‌فرض: `undefined`

### user

نام کاربری سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، این می‌تواند برای احراز هویت هر سرویس WebDriver دیگری استفاده شود.

نوع: `String`<br />
پیش‌فرض: `undefined`

### key

کلید دسترسی یا کلید مخفی سرویس ابری شما (فقط برای حساب‌های [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) یا [LambdaTest](https://www.lambdatest.com) کار می‌کند). اگر تنظیم شود، WebdriverIO به طور خودکار گزینه‌های اتصال را برای شما تنظیم می‌کند. اگر از یک ارائه‌دهنده ابری استفاده نمی‌کنید، این می‌تواند برای احراز هویت هر سرویس WebDriver دیگری استفاده شود.

نوع: `String`<br />
پیش‌فرض: `undefined`

### capabilities

قابلیت‌هایی را که می‌خواهید در جلسه WebDriver خود اجرا کنید، تعریف می‌کند. برای جزئیات بیشتر [پروتکل WebDriver](https://w3c.github.io/webdriver/#capabilities) را بررسی کنید. اگر درایور قدیمی‌تری را اجرا می‌کنید که از پروتکل WebDriver پشتیبانی نمی‌کند، برای اجرای موفقیت‌آمیز یک جلسه، باید از [قابلیت‌های JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) استفاده کنید.

علاوه بر قابلیت‌های مبتنی بر WebDriver، می‌توانید گزینه‌های خاص مرورگر و فروشنده را اعمال کنید که امکان پیکربندی عمیق‌تر مرورگر یا دستگاه راه دور را فراهم می‌کند. اینها در اسناد فروشنده مربوطه مستند شده‌اند، مانند:

- `goog:chromeOptions`: برای [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: برای [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: برای [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: برای [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: برای [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: برای [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

علاوه بر این، ابزار مفیدی به نام [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) از Sauce Labs وجود دارد که به شما کمک می‌کند با کلیک روی قابلیت‌های مورد نظر، این شیء را ایجاد کنید.

نوع: `Object`<br />
پیش‌فرض: `null`

**نمونه:**

```js
{
    browserName: 'chrome', // گزینه‌ها: `chrome`، `edge`، `firefox`، `safari`
    browserVersion: '27.0', // نسخه مرورگر
    platformName: 'Windows 10' // پلتفرم سیستم عامل
}
```

اگر آزمون‌های وب یا بومی را روی دستگاه‌های موبایل اجرا می‌کنید، `capabilities` با پروتکل WebDriver متفاوت است. برای جزئیات بیشتر به [اسناد Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) مراجعه کنید.

### logLevel

سطح جزئیات گزارش‌های ثبت شده.

نوع: `String`<br />
پیش‌فرض: `info`<br />
گزینه‌ها: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دایرکتوری برای ذخیره تمام فایل‌های گزارش testrunner (شامل گزارش‌های گزارشگر و گزارش‌های `wdio`). اگر تنظیم نشده باشد، تمام گزارش‌ها به `stdout` منتقل می‌شوند. از آنجایی که اکثر گزارشگرها برای ثبت در `stdout` ساخته شده‌اند، توصیه می‌شود فقط از این گزینه برای گزارشگرهای خاصی استفاده کنید که ارسال گزارش به یک فایل در آنها منطقی‌تر است (مانند گزارشگر `junit`).

هنگام اجرا در حالت مستقل، تنها گزارش تولید شده توسط WebdriverIO، گزارش `wdio` خواهد بود.

نوع: `String`<br />
پیش‌فرض: `null`

### connectionRetryTimeout

مهلت زمانی برای هر درخواست WebDriver به یک درایور یا شبکه.

نوع: `Number`<br />
پیش‌فرض: `120000`

### connectionRetryCount

حداکثر تعداد تلاش‌های مجدد درخواست به سرور Selenium.

نوع: `Number`<br />
پیش‌فرض: `3`

### agent

به شما امکان می‌دهد از عامل سفارشی` http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) برای ارسال درخواست‌ها استفاده کنید.

نوع: `Object`<br />
پیش‌فرض:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

`headers` سفارشی را برای ارسال در هر درخواست WebDriver مشخص کنید. اگر شبکه Selenium شما نیاز به احراز هویت پایه دارد، ما توصیه می‌کنیم از طریق این گزینه یک هدر `Authorization` را ارسال کنید تا درخواست‌های WebDriver شما را احراز هویت کنید، به عنوان مثال:

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

تابعی که [گزینه‌های درخواست HTTP](https://github.com/sindresorhus/got#options) را قبل از ارسال یک درخواست WebDriver رهگیری می‌کند

نوع: `(RequestOptions) => RequestOptions`<br />
پیش‌فرض: *هیچ*

### transformResponse

تابعی که اشیاء پاسخ HTTP را پس از دریافت پاسخ WebDriver رهگیری می‌کند. این تابع شیء پاسخ اصلی را به عنوان اولین آرگومان و `RequestOptions` مربوطه را به عنوان آرگومان دوم دریافت می‌کند.

نوع: `(Response, RequestOptions) => Response`<br />
پیش‌فرض: *هیچ*

### strictSSL

آیا نیازی به معتبر بودن گواهی SSL وجود ندارد.
می‌تواند از طریق متغیرهای محیطی مانند `STRICT_SSL` یا `strict_ssl` تنظیم شود.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### enableDirectConnect

آیا [ویژگی اتصال مستقیم Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) فعال شود.
اگر پاسخ دارای کلیدهای مناسبی نباشد در حالی که پرچم فعال است، هیچ کاری انجام نمی‌دهد.

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

پروتکلی را که می‌خواهید برای اتوماسیون مرورگر خود استفاده کنید تعریف کنید. در حال حاضر فقط [`webdriver`](https://www.npmjs.com/package/webdriver) پشتیبانی می‌شود، زیرا فناوری اصلی اتوماسیون مرورگر است که WebdriverIO از آن استفاده می‌کند.

اگر می‌خواهید مرورگر را با استفاده از فناوری اتوماسیون متفاوتی کنترل کنید، مطمئن شوید که این ویژگی را به مسیری تنظیم کنید که به ماژولی منتهی شود که از رابط زیر پیروی می‌کند:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * یک جلسه اتوماسیون را شروع کرده و یک WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * را با دستورات اتوماسیون مربوطه برگردانید. برای پیاده‌سازی مرجع به بسته [webdriver](https://www.npmjs.com/package/webdriver)
     * نگاه کنید
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
     * @param   {object} instance  شیء‌ای که از یک جلسه جدید مرورگر دریافت می‌کنیم.
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
- اگر پارامتر `url` شما با `/` شروع شود، `baseUrl` در ابتدای آن قرار می‌گیرد (به جز مسیر `baseUrl`، اگر وجود داشته باشد).
- اگر پارامتر `url` شما بدون یک طرح یا `/` شروع شود (مانند `some/path`)، کل `baseUrl` مستقیماً در ابتدای آن قرار می‌گیرد.

نوع: `String`<br />
پیش‌فرض: `null`

### waitforTimeout

زمان انتظار پیش‌فرض برای تمام دستورات `waitFor*`. (توجه کنید که در نام گزینه `f` کوچک است.) این مهلت __فقط__ بر دستوراتی که با `waitFor*` شروع می‌شوند و زمان انتظار پیش‌فرض آنها تأثیر می‌گذارد.

برای افزایش مهلت زمانی یک _آزمون_، لطفاً به اسناد چارچوب مراجعه کنید.

نوع: `Number`<br />
پیش‌فرض: `5000`

### waitforInterval

فاصله پیش‌فرض برای همه دستورات `waitFor*` برای بررسی اینکه آیا یک وضعیت مورد انتظار (مانند قابلیت مشاهده) تغییر کرده است.

نوع: `Number`<br />
پیش‌فرض: `100`

### region

اگر روی Sauce Labs اجرا می‌شود، می‌توانید انتخاب کنید که آزمون‌ها را بین مراکز داده مختلف اجرا کنید: US یا EU.
برای تغییر منطقه خود به EU، `region: 'eu'` را به پیکربندی خود اضافه کنید.

__نکته:__ این فقط در صورتی تأثیر دارد که گزینه‌های `user` و `key` مرتبط با حساب Sauce Labs خود را ارائه دهید.

نوع: `String`<br />
پیش‌فرض: `us`

*(فقط برای VM و یا EM/شبیه‌سازها)*

---

## گزینه‌های Testrunner

گزینه‌های زیر (از جمله موارد ذکر شده در بالا) فقط برای اجرای WebdriverIO با WDIO testrunner تعریف شده‌اند:

### specs

مشخصات را برای اجرای آزمون تعریف کنید. می‌توانید یک الگوی glob برای تطبیق چندین فایل به طور همزمان مشخص کنید یا یک glob یا مجموعه‌ای از مسیرها را در یک آرایه قرار دهید تا آنها را در یک فرآیند کارگر واحد اجرا کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی دیده می‌شوند.

نوع: `(String | String[])[]`<br />
پیش‌فرض: `[]`

### exclude

مشخصات را از اجرای آزمون حذف کنید. تمام مسیرها نسبت به مسیر فایل پیکربندی دیده می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### suites

یک شیء که مجموعه‌های مختلف را توصیف می‌کند، که می‌توانید با گزینه `--suite` در CLI `wdio` مشخص کنید.

نوع: `Object`<br />
پیش‌فرض: `{}`

### capabilities

همانند بخش `capabilities` که در بالا توضیح داده شد، با این تفاوت که گزینه مشخص کردن یک شیء [`multiremote`](/docs/multiremote) یا چندین جلسه WebDriver در یک آرایه برای اجرای موازی وجود دارد.

می‌توانید همان قابلیت‌های خاص فروشنده و مرورگر را که در [بالا](/docs/configuration#capabilities) تعریف شده است، اعمال کنید.

نوع: `Object`|`Object[]`<br />
پیش‌فرض: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

حداکثر تعداد کل کارگران موازی در حال اجرا.

__نکته:__ ممکن است عددی تا حد `100` باشد، زمانی که آزمون‌ها روی برخی فروشندگان خارجی مانند ماشین‌های Sauce Labs انجام می‌شوند. در آنجا، آزمون‌ها روی یک ماشین واحد آزمایش نمی‌شوند، بلکه روی چندین VM انجام می‌شوند. اگر قرار است آزمون‌ها روی یک ماشین توسعه محلی اجرا شوند، از عددی منطقی‌تر مانند `3`، `4` یا `5` استفاده کنید. اساساً، این تعداد مرورگرهایی است که به طور همزمان شروع می‌شوند و آزمون‌های شما را همزمان اجرا می‌کنند، بنابراین به مقدار RAM موجود در ماشین شما و تعداد برنامه‌های دیگری که روی ماشین شما اجرا می‌شوند بستگی دارد.

شما همچنین می‌توانید `maxInstances` را در داخل شیء‌های قابلیت خود با استفاده از قابلیت `wdio:maxInstances` اعمال کنید. این مقدار جلسات موازی را برای آن قابلیت خاص محدود می‌کند.

نوع: `Number`<br />
پیش‌فرض: `100`

### maxInstancesPerCapability

حداکثر تعداد کل کارگران موازی در حال اجرا برای هر قابلیت.

نوع: `Number`<br />
پیش‌فرض: `100`

### injectGlobals

متغیرهای عمومی WebdriverIO (مانند `browser`، `$` و `$$`) را در محیط عمومی قرار می‌دهد.
اگر آن را روی `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید، به عنوان مثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

نکته: WebdriverIO تزریق متغیرهای عمومی خاص چارچوب آزمون را مدیریت نمی‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### bail

اگر می‌خواهید اجرای آزمون شما پس از تعداد مشخصی از شکست‌های آزمون متوقف شود، از `bail` استفاده کنید.
(پیش‌فرض آن `0` است که تمام آزمون‌ها را بدون توجه به نتیجه اجرا می‌کند.) **نکته:** یک آزمون در این زمینه تمام آزمون‌های درون یک فایل مشخصات واحد (هنگام استفاده از Mocha یا Jasmine) یا تمام مراحل درون یک فایل ویژگی (هنگام استفاده از Cucumber) است. اگر می‌خواهید رفتار bail را در آزمون‌های یک فایل آزمون واحد کنترل کنید، گزینه‌های موجود در [چارچوب](frameworks) را بررسی کنید.

نوع: `Number`<br />
پیش‌فرض: `0` (متوقف نشود؛ تمام آزمون‌ها را اجرا کند)

### specFileRetries

تعداد دفعاتی که یک فایل مشخصات کامل را هنگامی که به عنوان یک کل شکست می‌خورد، دوباره امتحان می‌کند.

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDelay

تأخیر بر حسب ثانیه بین تلاش‌های مجدد فایل مشخصات

نوع: `Number`<br />
پیش‌فرض: `0`

### specFileRetriesDeferred

آیا فایل‌های مشخصات تکرار شده باید بلافاصله دوباره امتحان شوند یا به انتهای صف منتقل شوند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### groupLogsByTestSpec

نمای خروجی گزارش را انتخاب کنید.

اگر روی `false` تنظیم شود، گزارش‌های فایل‌های آزمون مختلف در زمان واقعی چاپ می‌شوند. لطفاً توجه داشته باشید که این ممکن است هنگام اجرای موازی منجر به مخلوط شدن خروجی‌های گزارش از فایل‌های مختلف شود.

اگر روی `true` تنظیم شود، خروجی‌های گزارش بر اساس Test Spec گروه‌بندی شده و فقط زمانی چاپ می‌شوند که Test Spec تکمیل شود.

به طور پیش‌فرض، روی `false` تنظیم شده است تا گزارش‌ها در زمان واقعی چاپ شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### services

سرویس‌ها وظیفه خاصی را که نمی‌خواهید مراقب آن باشید، بر عهده می‌گیرند. آنها تنظیمات آزمون شما را با حداقل تلاش بهبود می‌بخشند.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

### framework

چارچوب آزمونی را که باید توسط WDIO testrunner استفاده شود، تعریف می‌کند.

نوع: `String`<br />
پیش‌فرض: `mocha`<br />
گزینه‌ها: `mocha` | `jasmine`

### mochaOpts, jasmineOpts و cucumberOpts

گزینه‌های خاص مرتبط با چارچوب. برای اطلاع از گزینه‌های موجود، اسناد آداپتور چارچوب را مطالعه کنید. برای اطلاعات بیشتر در مورد این موضوع به [چارچوب‌ها](frameworks) مراجعه کنید.

نوع: `Object`<br />
پیش‌فرض: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

لیست ویژگی‌های خیار با شماره خط (هنگام [استفاده از چارچوب خیار](./Frameworks.md#using-cucumber)).

نوع: `String[]`
پیش‌فرض: `[]`

### reporters

لیست گزارشگرهایی که باید استفاده شوند. یک گزارشگر می‌تواند یک رشته باشد، یا آرایه‌ای از
`['reporterName', { /* reporter options */}]` که عنصر اول یک رشته با نام گزارشگر و عنصر دوم یک شیء با گزینه‌های گزارشگر است.

نوع: `String[]|Object[]`<br />
پیش‌فرض: `[]`

نمونه:

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

تعیین می‌کند در چه فاصله‌ای گزارشگر باید بررسی کند که آیا گزارش‌های آنها همگام شده‌اند اگر گزارش‌های خود را به صورت ناهمگام گزارش می‌دهند (مثلاً اگر گزارش‌ها به یک فروشنده شخص ثالث منتقل می‌شوند).

نوع: `Number`<br />
پیش‌فرض: `100` (میلی‌ثانیه)

### reporterSyncTimeout

حداکثر زمانی را تعیین می‌کند که گزارشگرها باید آپلود تمام گزارش‌های خود را به پایان برسانند تا خطایی توسط testrunner ایجاد شود.

نوع: `Number`<br />
پیش‌فرض: `5000` (میلی‌ثانیه)

### execArgv

آرگومان‌های Node که هنگام راه‌اندازی فرآیندهای فرزند مشخص می‌شوند.

نوع: `String[]`<br />
پیش‌فرض: `null`

### filesToWatch

لیستی از الگوهای رشته‌ای پشتیبانی‌کننده از glob که به testrunner می‌گویند که فایل‌های دیگری را نیز تحت نظر داشته باشد، مثلاً فایل‌های برنامه، هنگامی که آن را با پرچم `--watch` اجرا می‌کند. به طور پیش‌فرض، testrunner از قبل تمام فایل‌های مشخصات را تحت نظر دارد.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### updateSnapshots

اگر می‌خواهید snapshots خود را به‌روز کنید، روی true تنظیم کنید. ایده‌آل است که به عنوان بخشی از یک پارامتر CLI استفاده شود، به عنوان مثال `wdio run wdio.conf.js --s`.

نوع: `'new' | 'all' | 'none'`<br />
پیش‌فرض: `none` اگر ارائه نشده و آزمون‌ها در CI اجرا شوند، `new` اگر ارائه نشده، در غیر این صورت آنچه ارائه شده است

### resolveSnapshotPath

مسیر پیش‌فرض snapshot را لغو می‌کند. به عنوان مثال، برای ذخیره snapshots در کنار فایل‌های آزمون.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

نوع: `(testPath: string, snapExtension: string) => string`<br />
پیش‌فرض: فایل‌های snapshot را در دایرکتوری `__snapshots__` در کنار فایل آزمون ذخیره می‌کند

### tsConfigPath

WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند. TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود، اما می‌توانید یک مسیر سفارشی را در اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید.

به اسناد `tsx` مراجعه کنید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

نوع: `String`<br />
پیش‌فرض: `null`<br />

## قلاب‌ها

Testrunner WDIO به شما امکان می‌دهد قلاب‌هایی را تنظیم کنید که در زمان‌های خاصی از چرخه آزمون فعال شوند. این امکان اقدامات سفارشی را فراهم می‌کند (به عنوان مثال، گرفتن اسکرین‌شات در صورت شکست آزمون).

هر قلاب به عنوان پارامتر، اطلاعات خاصی در مورد چرخه حیات دارد (به عنوان مثال، اطلاعات در مورد مجموعه آزمون یا آزمون). برای کسب اطلاعات بیشتر در مورد تمام ویژگی‌های قلاب، [پیکربندی نمونه](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) ما را مطالعه کنید.

**نکته:** برخی قلاب‌ها (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) در یک فرآیند متفاوت اجرا می‌شوند و بنابراین نمی‌توانند هیچ داده جهانی را با قلاب‌های دیگری که در فرآیند کارگر قرار دارند، به اشتراک بگذارند.

### onPrepare

یک بار قبل از راه‌اندازی تمام کارگرها اجرا می‌شود.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `param` (`object[]`): لیست جزئیات قابلیت‌ها

### onWorkerStart

قبل از ایجاد یک فرآیند کارگر اجرا می‌شود و می‌تواند برای راه‌اندازی سرویس خاص برای آن کارگر و همچنین تغییر محیط‌های زمان اجرا به صورت ناهمگام استفاده شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `args` (`object`): شیء که پس از راه‌اندازی کارگر با پیکربندی اصلی ادغام خواهد شد
- `execArgv` (`string[]`): لیست آرگومان‌های رشته‌ای که به فرآیند کارگر منتقل می‌شوند

### onWorkerEnd

درست پس از خروج یک فرآیند کارگر اجرا می‌شود.

پارامترها:

- `cid` (`string`): شناسه قابلیت (مثلاً 0-0)
- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `retries` (`number`): تعداد تلاش‌های مجدد در سطح مشخصات که همانطور که در [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) تعریف شده، استفاده می‌شود

### beforeSession

درست قبل از راه‌اندازی جلسه webdriver و چارچوب آزمون اجرا می‌شود. به شما امکان می‌دهد پیکربندی‌ها را بر اساس قابلیت یا مشخصات دستکاری کنید.

پارامترها:

- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند

### before

قبل از شروع اجرای آزمون اجرا می‌شود. در این نقطه می‌توانید به تمام متغیرهای جهانی مانند `browser` دسترسی داشته باشید. این مکان مناسبی برای تعریف دستورات سفارشی است.

پارامترها:

- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `specs` (`string[]`): مشخصاتی که باید در فرآیند کارگر اجرا شوند
- `browser` (`object`): نمونه‌ای از جلسه مرورگر/دستگاه ایجاد شده

### beforeSuite

قلابی که قبل از شروع مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### beforeHook

قلابی که *قبل از* اجرای یک قلاب درون مجموعه اجرا می‌شود (به عنوان مثال، قبل از فراخوانی beforeEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): زمینه آزمون (نشان‌دهنده شیء World در Cucumber است)

### afterHook

قلابی که *بعد از* پایان یک قلاب درون مجموعه اجرا می‌شود (به عنوان مثال، پس از فراخوانی afterEach در Mocha اجرا می‌شود)

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): زمینه آزمون (نشان‌دهنده شیء World در Cucumber است)
- `result` (`object`): نتیجه قلاب (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries` است)

### beforeTest

تابعی که قبل از یک آزمون اجرا می‌شود (فقط در Mocha/Jasmine).

پارامترها:

- `test` (`object`): جزئیات آزمون
- `context` (`object`): شیء محدوده که آزمون با آن اجرا شده است

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
- `context` (`object`): شیء محدوده که آزمون با آن اجرا شده است
- `result.error` (`Error`): شیء خطا در صورت شکست آزمون، در غیر این صورت `undefined`
- `result.result` (`Any`): شیء بازگشتی تابع آزمون
- `result.duration` (`Number`): مدت زمان آزمون
- `result.passed` (`Boolean`): true اگر آزمون موفق شده باشد، در غیر این صورت false
- `result.retries` (`Object`): اطلاعات در مورد تلاش‌های مجدد آزمون تکی به صورتی که برای [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) و همچنین [Cucumber](./Retry.md#rerunning-in-cucumber) تعریف شده است، به عنوان مثال `{ attempts: 0, limit: 0 }`، مراجعه کنید به
- `result` (`object`): نتیجه قلاب (شامل ویژگی‌های `error`، `result`، `duration`، `passed`، `retries` است)

### afterSuite

قلابی که پس از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine)

پارامترها:

- `suite` (`object`): جزئیات مجموعه

### after

پس از انجام تمام آزمون‌ها اجرا می‌شود. هنوز به تمام متغیرهای جهانی از آزمون دسترسی دارید.

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

پس از تعطیلی تمام کارگرها و قبل از خروج فرآیند اجرا می‌شود. خطایی که در قلاب onComplete ایجاد شود منجر به شکست اجرای آزمون خواهد شد.

پارامترها:

- `exitCode` (`number`): 0 - موفقیت، 1 - شکست
- `config` (`object`): شیء پیکربندی WebdriverIO
- `caps` (`object`): شامل قابلیت‌های جلسه‌ای که در کارگر ایجاد می‌شود
- `result` (`object`): شیء نتایج شامل نتایج آزمون

### onReload

هنگام رخ دادن یک بازسازی اجرا می‌شود.

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world حاوی اطلاعات مربوط به pickle و مرحله آزمون
- `context` (`object`): شیء World Cucumber

### afterScenario

پس از یک سناریو Cucumber اجرا می‌شود.

پارامترها:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): شیء world حاوی اطلاعات مربوط به pickle و مرحله آزمون
- `result` (`object`): شیء نتایج شامل نتایج سناریو
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
- `result`: (`object`): شیء نتایج شامل نتایج مرحله
- `result.passed` (`boolean`): true اگر سناریو موفق شده باشد
- `result.error` (`string`): استک خطا اگر سناریو شکست خورده باشد
- `result.duration` (`number`): مدت زمان سناریو به میلی‌ثانیه
- `context` (`object`): شیء World Cucumber

### beforeAssertion

قلابی که قبل از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده منتقل می‌شود
- `params.options`: گزینه‌های تأیید

### afterAssertion

قلابی که پس از انجام یک تأیید WebdriverIO اجرا می‌شود.

پارامترها:

- `params`: اطلاعات تأیید
- `params.matcherName` (`string`): نام تطبیق‌دهنده (مثلاً `toHaveTitle`)
- `params.expectedValue`: مقداری که به تطبیق‌دهنده منتقل می‌شود
- `params.options`: گزینه‌های تأیید
- `params.result`: نتایج تأیید
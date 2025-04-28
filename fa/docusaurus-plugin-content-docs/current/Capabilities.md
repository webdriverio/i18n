---
id: capabilities
title: قابلیت‌ها
---

یک قابلیت تعریفی برای یک رابط راه دور است. این به WebdriverIO کمک می‌کند تا بفهمد شما می‌خواهید آزمون‌های خود را در چه محیط مرورگر یا موبایلی اجرا کنید. قابلیت‌ها هنگام توسعه آزمون‌ها به صورت محلی چندان حیاتی نیستند زیرا اغلب آن را روی یک رابط راه دور اجرا می‌کنید، اما وقتی مجموعه بزرگی از آزمون‌های یکپارچه را در CI/CD اجرا می‌کنید، اهمیت بیشتری پیدا می‌کنند.

:::info

فرمت یک شیء قابلیت به خوبی توسط [مشخصات WebDriver](https://w3c.github.io/webdriver/#capabilities) تعریف شده است. اگر قابلیت‌های تعریف شده توسط کاربر با آن مشخصات مطابقت نداشته باشند، آزمون‌گر WebdriverIO به سرعت با خطا مواجه خواهد شد.

:::

## قابلیت‌های سفارشی

در حالی که تعداد قابلیت‌های ثابت تعریف شده بسیار کم است، هر کسی می‌تواند قابلیت‌های سفارشی را ارائه و قبول کند که مختص راننده اتوماسیون یا رابط راه دور هستند:

### افزونه‌های قابلیت مختص مرورگر

- `goog:chromeOptions`: افزونه‌های [Chromedriver](https://chromedriver.chromium.org/capabilities)، فقط برای آزمایش در Chrome قابل اجرا است
- `moz:firefoxOptions`: افزونه‌های [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، فقط برای آزمایش در Firefox قابل اجرا است
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) برای مشخص کردن محیط هنگام استفاده از EdgeDriver برای آزمایش Chromium Edge

### افزونه‌های قابلیت فروشندگان ابری

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- و بسیاری دیگر...

### افزونه‌های قابلیت موتور اتوماسیون

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- و بسیاری دیگر...

### قابلیت‌های WebdriverIO برای مدیریت گزینه‌های راننده مرورگر

WebdriverIO نصب و اجرای راننده مرورگر را برای شما مدیریت می‌کند. WebdriverIO از یک قابلیت سفارشی استفاده می‌کند که به شما امکان می‌دهد پارامترهایی را به راننده ارسال کنید.

#### `wdio:chromedriverOptions`

گزینه‌های خاصی که هنگام شروع Chromedriver به آن ارسال می‌شوند.

#### `wdio:geckodriverOptions`

گزینه‌های خاصی که هنگام شروع Geckodriver به آن ارسال می‌شوند.

#### `wdio:edgedriverOptions`

گزینه‌های خاصی که هنگام شروع Edgedriver به آن ارسال می‌شوند.

#### `wdio:safaridriverOptions`

گزینه‌های خاصی که هنگام شروع Safari به آن ارسال می‌شوند.

#### `wdio:maxInstances`

حداکثر تعداد کارگرهای موازی در حال اجرا برای مرورگر/قابلیت خاص. بر [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability) اولویت دارد.

نوع: `number`

#### `wdio:specs`

مشخصات را برای اجرای آزمون برای آن مرورگر/قابلیت تعریف کنید. مشابه [گزینه پیکربندی منظم `specs`](configuration#specs)، اما مختص مرورگر/قابلیت است. بر `specs` اولویت دارد.

نوع: `(String | String[])[]`

#### `wdio:exclude`

مشخصات را از اجرای آزمون برای آن مرورگر/قابلیت مستثنی کنید. مشابه [گزینه پیکربندی منظم `exclude`](configuration#exclude)، اما مختص مرورگر/قابلیت است. بر `exclude` اولویت دارد.

نوع: `String[]`

#### `wdio:enforceWebDriverClassic`

به طور پیش‌فرض، WebdriverIO تلاش می‌کند یک جلسه WebDriver Bidi ایجاد کند. اگر این رفتار را ترجیح نمی‌دهید، می‌توانید این پرچم را برای غیرفعال کردن آن تنظیم کنید.

نوع: `boolean`

#### گزینه‌های راننده متداول

در حالی که همه راننده‌ها پارامترهای متفاوتی برای پیکربندی ارائه می‌دهند، برخی از موارد مشترک وجود دارند که WebdriverIO آن‌ها را می‌فهمد و برای راه‌اندازی راننده یا مرورگر شما استفاده می‌کند:

##### `cacheDir`

مسیر ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام راننده‌هایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `string`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

مسیر به یک باینری راننده سفارشی. اگر تنظیم شود، WebdriverIO تلاش نخواهد کرد راننده‌ای را دانلود کند بلکه از راننده‌ای که توسط این مسیر ارائه شده استفاده خواهد کرد. اطمینان حاصل کنید که راننده با مرورگری که استفاده می‌کنید سازگار است.

می‌توانید این مسیر را از طریق متغیرهای محیطی `CHROMEDRIVER_PATH`، `GECKODRIVER_PATH` یا `EDGEDRIVER_PATH` ارائه دهید.

نوع: `string`

:::caution

اگر `binary` راننده تنظیم شود، WebdriverIO تلاش نخواهد کرد راننده‌ای را دانلود کند بلکه از راننده‌ای که توسط این مسیر ارائه شده استفاده خواهد کرد. اطمینان حاصل کنید که راننده با مرورگری که استفاده می‌کنید سازگار است.

:::

#### گزینه‌های راننده مختص مرورگر

برای انتشار گزینه‌ها به راننده می‌توانید از قابلیت‌های سفارشی زیر استفاده کنید:

- Chrome یا Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
پورتی که راننده ADB باید روی آن اجرا شود.

مثال: `9515`

نوع: `number`

##### urlBase
پیشوند مسیر پایه URL برای دستورات، به عنوان مثال `wd/url`.

مثال: `/`

نوع: `string`

##### logPath
نوشتن گزارش سرور در فایل به جای stderr، سطح گزارش را به `INFO` افزایش می‌دهد.

نوع: `string`

##### logLevel
تنظیم سطح گزارش. گزینه‌های ممکن `ALL`، `DEBUG`، `INFO`، `WARNING`، `SEVERE`، `OFF`.

نوع: `string`

##### verbose
گزارش کامل (معادل `--log-level=ALL`)

نوع: `boolean`

##### silent
هیچ گزارشی ننویسد (معادل `--log-level=OFF`)

نوع: `boolean`

##### appendLog
افزودن فایل گزارش به جای بازنویسی.

نوع: `boolean`

##### replayable
گزارش کامل و کوتاه نکردن رشته‌های طولانی تا بتوان گزارش را دوباره پخش کرد (آزمایشی).

نوع: `boolean`

##### readableTimestamp
افزودن مهر زمانی خوانا به گزارش.

نوع: `boolean`

##### enableChromeLogs
نمایش گزارش‌ها از مرورگر (گزینه‌های گزارش دیگر را نادیده می‌گیرد).

نوع: `boolean`

##### bidiMapperPath
مسیر نگاشت bidi سفارشی.

نوع: `string`

##### allowedIps
لیست سفید آدرس‌های IP راه دور جدا شده با کاما که مجاز به اتصال به EdgeDriver هستند.

نوع: `string[]`<br />
پیش‌فرض: `['']`

##### allowedOrigins
لیست سفید منشاهای درخواست جدا شده با کاما که مجاز به اتصال به EdgeDriver هستند. استفاده از `*` برای اجازه دادن به هر منشا میزبان خطرناک است!

نوع: `string[]`<br />
پیش‌فرض: `['*']`

##### spawnOpts
گزینه‌هایی که باید به فرآیند راننده ارسال شوند.

نوع: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
پیش‌فرض: `undefined`

</TabItem>
<TabItem value="firefox">

تمام گزینه‌های Geckodriver را در [بسته راننده](https://github.com/webdriverio-community/node-geckodriver#options) رسمی ببینید.

</TabItem>
<TabItem value="msedge">

تمام گزینه‌های Edgedriver را در [بسته راننده](https://github.com/webdriverio-community/node-edgedriver#options) رسمی ببینید.

</TabItem>
<TabItem value="safari">

تمام گزینه‌های Safaridriver را در [بسته راننده](https://github.com/webdriverio-community/node-safaridriver#options) رسمی ببینید.

</TabItem>
</Tabs>

## قابلیت‌های ویژه برای موارد استفاده خاص

این فهرستی از مثال‌هایی است که نشان می‌دهد کدام قابلیت‌ها باید برای دستیابی به یک مورد استفاده خاص اعمال شود.

### اجرای مرورگر بدون سر (Headless)

اجرای یک مرورگر بدون سر به معنای اجرای یک نمونه مرورگر بدون پنجره یا رابط کاربری است. این بیشتر در محیط‌های CI/CD استفاده می‌شود که در آن نمایشگری وجود ندارد. برای اجرای یک مرورگر در حالت بدون سر، قابلیت‌های زیر را اعمال کنید:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // or 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

به نظر می‌رسد Safari [پشتیبانی نمی‌کند](https://discussions.apple.com/thread/251837694) از اجرا در حالت بدون سر.

</TabItem>
</Tabs>

### خودکارسازی کانال‌های مختلف مرورگر

اگر می‌خواهید نسخه مرورگری را آزمایش کنید که هنوز به عنوان پایدار منتشر نشده است، مانند Chrome Canary، می‌توانید با تنظیم قابلیت‌ها و اشاره به مرورگری که می‌خواهید شروع کنید، این کار را انجام دهید، به عنوان مثال:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

هنگام آزمایش در Chrome، WebdriverIO به طور خودکار نسخه مرورگر و راننده مورد نظر را براساس `browserVersion` تعریف شده برای شما دانلود می‌کند، به عنوان مثال:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

اگر می‌خواهید یک مرورگر دانلود شده دستی را آزمایش کنید، می‌توانید مسیر باینری به مرورگر را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک راننده دانلود شده دستی استفاده کنید، می‌توانید مسیر باینری به راننده را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'chrome', // or 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

هنگام آزمایش در Firefox، WebdriverIO به طور خودکار نسخه مرورگر و راننده مورد نظر را براساس `browserVersion` تعریف شده برای شما دانلود می‌کند، به عنوان مثال:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

اگر می‌خواهید یک نسخه دانلود شده دستی را آزمایش کنید، می‌توانید مسیر باینری به مرورگر را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک راننده دانلود شده دستی استفاده کنید، می‌توانید مسیر باینری به راننده را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

هنگام آزمایش در Microsoft Edge، اطمینان حاصل کنید که نسخه مرورگر مورد نظر روی دستگاه شما نصب شده است. می‌توانید WebdriverIO را به مرورگری که می‌خواهید اجرا کنید، هدایت کنید:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO به طور خودکار نسخه راننده مورد نظر را براساس `browserVersion` تعریف شده برای شما دانلود می‌کند، به عنوان مثال:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

علاوه بر این، اگر می‌خواهید از یک راننده دانلود شده دستی استفاده کنید، می‌توانید مسیر باینری به راننده را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

هنگام آزمایش در Safari، اطمینان حاصل کنید که [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) روی دستگاه شما نصب شده است. می‌توانید WebdriverIO را به آن نسخه از طریق زیر هدایت کنید:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## گسترش قابلیت‌های سفارشی

اگر می‌خواهید مجموعه خاصی از قابلیت‌های خود را تعریف کنید، به عنوان مثال برای ذخیره داده‌های دلخواه که در آزمون‌ها برای آن قابلیت خاص استفاده می‌شود، می‌توانید این کار را با تنظیم موارد زیر انجام دهید:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // custom configurations
        }
    }]
}
```

توصیه می‌شود که از [پروتکل W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) برای نام‌گذاری قابلیت پیروی کنید که نیاز به یک کاراکتر `:` (دو نقطه) دارد، که نشان‌دهنده یک فضای نام خاص پیاده‌سازی است. در آزمون‌های خود می‌توانید به قابلیت سفارشی خود از طریق زیر دسترسی پیدا کنید:

```ts
browser.capabilities['custom:caps']
```

برای اطمینان از ایمنی نوع، می‌توانید رابط قابلیت WebdriverIO را از طریق زیر گسترش دهید:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```
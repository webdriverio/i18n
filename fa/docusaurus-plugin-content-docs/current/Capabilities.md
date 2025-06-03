---
id: capabilities
title: قابلیت‌ها
---

قابلیت، تعریفی برای یک رابط از راه دور است. این به WebdriverIO کمک می‌کند تا درک کند که شما می‌خواهید آزمون‌های خود را در چه محیط مرورگر یا موبایلی اجرا کنید. قابلیت‌ها هنگام توسعه آزمون‌ها به صورت محلی چندان مهم نیستند زیرا معمولاً آن‌ها را روی یک رابط از راه دور اجرا می‌کنید، اما هنگام اجرای مجموعه بزرگی از آزمون‌های یکپارچه در CI/CD، اهمیت بیشتری پیدا می‌کنند.

:::info

فرمت یک شی قابلیت به خوبی توسط [مشخصات WebDriver](https://w3c.github.io/webdriver/#capabilities) تعریف شده است. اجراکننده آزمون WebdriverIO در صورتی که قابلیت‌های تعریف شده توسط کاربر با آن مشخصات مطابقت نداشته باشند، زودهنگام با خطا مواجه خواهد شد.

:::

## قابلیت‌های سفارشی

در حالی که تعداد قابلیت‌های ثابت تعریف شده بسیار کم است، هر کسی می‌تواند قابلیت‌های سفارشی ارائه دهد و بپذیرد که مختص راننده اتوماسیون یا رابط از راه دور باشد:

### افزونه‌های قابلیت مخصوص مرورگر

- `goog:chromeOptions`: افزونه‌های [Chromedriver](https://chromedriver.chromium.org/capabilities)، فقط برای آزمایش در Chrome قابل استفاده است
- `moz:firefoxOptions`: افزونه‌های [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، فقط برای آزمایش در Firefox قابل استفاده است
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) برای مشخص کردن محیط هنگام استفاده از EdgeDriver برای آزمایش Chromium Edge

### افزونه‌های قابلیت فروشندگان ابری

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- و بسیاری دیگر...

### افزونه‌های قابلیت موتور اتوماسیون

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
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

حداکثر تعداد کل کارگران موازی در حال اجرا برای مرورگر/قابلیت خاص. بر [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability) اولویت دارد.

نوع: `number`

#### `wdio:specs`

specs را برای اجرای آزمون برای آن مرورگر/قابلیت تعریف کنید. مشابه [گزینه پیکربندی معمولی `specs`](configuration#specs)، اما مخصوص مرورگر/قابلیت است. بر `specs` اولویت دارد.

نوع: `(String | String[])[]`

#### `wdio:exclude`

specs را از اجرای آزمون برای آن مرورگر/قابلیت مستثنی کنید. مشابه [گزینه پیکربندی معمولی `exclude`](configuration#exclude)، اما مخصوص مرورگر/قابلیت است. بر `exclude` اولویت دارد.

نوع: `String[]`

#### `wdio:enforceWebDriverClassic`

به طور پیش‌فرض، WebdriverIO تلاش می‌کند یک جلسه WebDriver Bidi ایجاد کند. اگر این رفتار را ترجیح نمی‌دهید، می‌توانید این پرچم را برای غیرفعال کردن آن تنظیم کنید.

نوع: `boolean`

#### گزینه‌های راننده مشترک

در حالی که همه راننده‌ها پارامترهای مختلفی برای پیکربندی ارائه می‌دهند، برخی موارد مشترک وجود دارد که WebdriverIO آن‌ها را درک می‌کند و برای راه‌اندازی راننده یا مرورگر شما استفاده می‌کند:

##### `cacheDir`

مسیر به ریشه دایرکتوری کش. از این دایرکتوری برای ذخیره تمام راننده‌هایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `string`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

مسیر به یک باینری راننده سفارشی. اگر تنظیم شود، WebdriverIO تلاش نمی‌کند راننده‌ای را دانلود کند، بلکه از راننده‌ای که توسط این مسیر ارائه شده استفاده می‌کند. اطمینان حاصل کنید که راننده با مرورگری که استفاده می‌کنید سازگار است.

می‌توانید این مسیر را از طریق متغیرهای محیطی `CHROMEDRIVER_PATH`، `GECKODRIVER_PATH` یا `EDGEDRIVER_PATH` ارائه دهید.

نوع: `string`

:::caution

اگر `binary` راننده تنظیم شده باشد، WebdriverIO تلاش نمی‌کند راننده‌ای را دانلود کند، بلکه از راننده‌ای که توسط این مسیر ارائه شده استفاده می‌کند. اطمینان حاصل کنید که راننده با مرورگری که استفاده می‌کنید سازگار است.

:::

#### گزینه‌های راننده مخصوص مرورگر

برای انتشار گزینه‌ها به راننده، می‌توانید از قابلیت‌های سفارشی زیر استفاده کنید:

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
پورتی که راننده ADB باید در آن اجرا شود.

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
گزارش با جزئیات (معادل `--log-level=ALL`)

نوع: `boolean`

##### silent
عدم گزارش (معادل `--log-level=OFF`)

نوع: `boolean`

##### appendLog
افزودن فایل گزارش به جای بازنویسی.

نوع: `boolean`

##### replayable
گزارش با جزئیات و عدم کوتاه کردن رشته‌های طولانی، به طوری که گزارش قابل پخش مجدد باشد (آزمایشی).

نوع: `boolean`

##### readableTimestamp
افزودن مهرهای زمانی خوانا به گزارش.

نوع: `boolean`

##### enableChromeLogs
نمایش گزارش‌ها از مرورگر (گزینه‌های گزارش دیگر را نادیده می‌گیرد).

نوع: `boolean`

##### bidiMapperPath
مسیر نگاشت bidi سفارشی.

نوع: `string`

##### allowedIps
لیست سفید آدرس‌های IP از راه دور که جدا شده با کاما که مجاز به اتصال به EdgeDriver هستند.

نوع: `string[]`<br />
پیش‌فرض: `['']`

##### allowedOrigins
لیست سفید منشاهای درخواست که جدا شده با کاما که مجاز به اتصال به EdgeDriver هستند. استفاده از `*` برای اجازه دادن به هر منشا میزبان خطرناک است!

نوع: `string[]`<br />
پیش‌فرض: `['*']`

##### spawnOpts
گزینه‌هایی که باید به فرآیند راننده منتقل شوند.

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

این فهرستی از مثال‌هایی است که نشان می‌دهد کدام قابلیت‌ها باید برای دستیابی به یک مورد استفاده خاص اعمال شوند.

### اجرای مرورگر بدون سر (Headless)

اجرای یک مرورگر بدون سر به معنای اجرای یک نمونه مرورگر بدون پنجره یا رابط کاربری است. این بیشتر در محیط‌های CI/CD استفاده می‌شود که هیچ نمایشگری استفاده نمی‌شود. برای اجرای یک مرورگر در حالت بدون سر، قابلیت‌های زیر را اعمال کنید:

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

به نظر می‌رسد که Safari [پشتیبانی نمی‌کند](https://discussions.apple.com/thread/251837694) از اجرا در حالت بدون سر.

</TabItem>
</Tabs>

### اتوماسیون کانال‌های مختلف مرورگر

اگر می‌خواهید نسخه‌ای از مرورگر را آزمایش کنید که هنوز به عنوان نسخه پایدار منتشر نشده است، مانند Chrome Canary، می‌توانید با تنظیم قابلیت‌ها و اشاره به مرورگری که می‌خواهید شروع کنید، این کار را انجام دهید، به عنوان مثال:

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

هنگام آزمایش روی Chrome، WebdriverIO به طور خودکار نسخه مرورگر و راننده مورد نظر را بر اساس `browserVersion` تعریف شده برای شما دانلود می‌کند، مثلاً:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

اگر می‌خواهید یک مرورگر دانلود شده به صورت دستی را آزمایش کنید، می‌توانید یک مسیر باینری به مرورگر ارائه دهید:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک راننده دانلود شده به صورت دستی استفاده کنید، می‌توانید یک مسیر باینری به راننده ارائه دهید:

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

هنگام آزمایش روی Firefox، WebdriverIO به طور خودکار نسخه مرورگر و راننده مورد نظر را بر اساس `browserVersion` تعریف شده برای شما دانلود می‌کند، مثلاً:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

اگر می‌خواهید یک نسخه دانلود شده به صورت دستی را آزمایش کنید، می‌توانید یک مسیر باینری به مرورگر ارائه دهید:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک راننده دانلود شده به صورت دستی استفاده کنید، می‌توانید یک مسیر باینری به راننده ارائه دهید:

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

هنگام آزمایش روی Microsoft Edge، اطمینان حاصل کنید که نسخه مرورگر مورد نظر را روی دستگاه خود نصب کرده‌اید. می‌توانید WebdriverIO را به مرورگر برای اجرا هدایت کنید:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO به طور خودکار نسخه راننده مورد نظر را بر اساس `browserVersion` تعریف شده برای شما دانلود می‌کند، مثلاً:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

علاوه بر این، اگر می‌خواهید از یک راننده دانلود شده به صورت دستی استفاده کنید، می‌توانید یک مسیر باینری به راننده ارائه دهید:

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

هنگام آزمایش روی Safari، اطمینان حاصل کنید که [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) را روی دستگاه خود نصب کرده‌اید. می‌توانید WebdriverIO را به آن نسخه هدایت کنید:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## گسترش قابلیت‌های سفارشی

اگر می‌خواهید مجموعه‌ای از قابلیت‌های خود را تعریف کنید، به عنوان مثال برای ذخیره داده‌های دلخواه برای استفاده در آزمون‌ها برای آن قابلیت خاص، می‌توانید این کار را انجام دهید:

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

توصیه می‌شود هنگام نامگذاری قابلیت، از [پروتکل W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) پیروی کنید که نیاز به یک کاراکتر `:` (دونقطه) دارد، که یک فضای نام خاص پیاده‌سازی را نشان می‌دهد. در آزمون‌های خود می‌توانید به قابلیت سفارشی خود دسترسی پیدا کنید، به عنوان مثال:

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
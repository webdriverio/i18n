---
id: capabilities
title: قابلیت‌ها
---

قابلیت، تعریفی برای یک رابط راه دور است. این به WebdriverIO کمک می‌کند تا درک کند که شما قصد دارید تست‌های خود را در چه محیط مرورگر یا موبایلی اجرا کنید. قابلیت‌ها هنگام توسعه تست‌ها به صورت محلی چندان مهم نیستند زیرا اغلب آن‌ها را روی یک رابط راه دور اجرا می‌کنید، اما هنگام اجرای مجموعه بزرگی از تست‌های یکپارچه در CI/CD اهمیت بیشتری پیدا می‌کنند.

:::info

قالب یک شیء قابلیت به خوبی توسط [مشخصات WebDriver](https://w3c.github.io/webdriver/#capabilities) تعریف شده است. اجراکننده تست WebdriverIO در صورتی که قابلیت‌های تعریف شده توسط کاربر با آن مشخصات مطابقت نداشته باشند، در مراحل اولیه با خطا مواجه خواهد شد.

:::

## قابلیت‌های سفارشی

در حالی که تعداد قابلیت‌های ثابت تعریف شده بسیار کم است، هر کسی می‌تواند قابلیت‌های سفارشی را که مختص درایور اتوماسیون یا رابط راه دور است، ارائه و قبول کند:

### افزونه‌های قابلیت مخصوص مرورگر

- `goog:chromeOptions`: افزونه‌های [Chromedriver](https://chromedriver.chromium.org/capabilities)، فقط برای تست در Chrome قابل استفاده است
- `moz:firefoxOptions`: افزونه‌های [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، فقط برای تست در Firefox قابل استفاده است
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) برای مشخص کردن محیط هنگام استفاده از EdgeDriver برای تست Chromium Edge

### افزونه‌های قابلیت فروشندگان ابری

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- و موارد بسیار دیگر...

### افزونه‌های قابلیت موتور اتوماسیون

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- و موارد بسیار دیگر...

### قابلیت‌های WebdriverIO برای مدیریت گزینه‌های درایور مرورگر

WebdriverIO نصب و اجرای درایور مرورگر را برای شما مدیریت می‌کند. WebdriverIO از یک قابلیت سفارشی استفاده می‌کند که به شما اجازه می‌دهد پارامترهایی را به درایور ارسال کنید.

#### `wdio:chromedriverOptions`

گزینه‌های خاص که هنگام شروع به Chromedriver ارسال می‌شوند.

#### `wdio:geckodriverOptions`

گزینه‌های خاص که هنگام شروع به Geckodriver ارسال می‌شوند.

#### `wdio:edgedriverOptions`

گزینه‌های خاص که هنگام شروع به Edgedriver ارسال می‌شوند.

#### `wdio:safaridriverOptions`

گزینه‌های خاص که هنگام شروع به Safari ارسال می‌شوند.

#### `wdio:maxInstances`

حداکثر تعداد کل کارگران در حال اجرای موازی برای مرورگر/قابلیت خاص. بر [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability) اولویت دارد.

نوع: `number`

#### `wdio:specs`

مشخصات را برای اجرای تست برای آن مرورگر/قابلیت تعریف کنید. مشابه [گزینه پیکربندی معمولی `specs`](configuration#specs)، اما مختص مرورگر/قابلیت است. بر `specs` اولویت دارد.

نوع: `(String | String[])[]`

#### `wdio:exclude`

مشخصات را از اجرای تست برای آن مرورگر/قابلیت حذف کنید. مشابه [گزینه پیکربندی معمولی `exclude`](configuration#exclude)، اما مختص مرورگر/قابلیت است. بر `exclude` اولویت دارد.

نوع: `String[]`

#### `wdio:enforceWebDriverClassic`

به طور پیش‌فرض، WebdriverIO تلاش می‌کند یک جلسه WebDriver Bidi ایجاد کند. اگر این رفتار را ترجیح نمی‌دهید، می‌توانید این پرچم را برای غیرفعال کردن آن تنظیم کنید.

نوع: `boolean`

#### گزینه‌های درایور متداول

در حالی که همه درایورها پارامترهای متفاوتی برای پیکربندی ارائه می‌دهند، برخی از موارد مشترک وجود دارد که WebdriverIO آنها را می‌فهمد و برای راه‌اندازی درایور یا مرورگر شما استفاده می‌کند:

##### `cacheDir`

مسیر به ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند، استفاده می‌شود.

نوع: `string`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

مسیر به یک باینری درایور سفارشی. اگر تنظیم شود، WebdriverIO تلاش نمی‌کند درایوری را دانلود کند، بلکه از درایوری که از طریق این مسیر ارائه شده است استفاده می‌کند. اطمینان حاصل کنید که درایور با مرورگری که استفاده می‌کنید سازگار است.

می‌توانید این مسیر را از طریق متغیرهای محیطی `CHROMEDRIVER_PATH`، `GECKODRIVER_PATH` یا `EDGEDRIVER_PATH` ارائه دهید.

نوع: `string`

:::caution

اگر `binary` درایور تنظیم شده باشد، WebdriverIO تلاش نمی‌کند درایوری را دانلود کند، بلکه از درایوری که از طریق این مسیر ارائه شده است استفاده می‌کند. اطمینان حاصل کنید که درایور با مرورگری که استفاده می‌کنید سازگار است.

:::

#### گزینه‌های درایور مخصوص مرورگر

برای انتشار گزینه‌ها به درایور می‌توانید از قابلیت‌های سفارشی زیر استفاده کنید:

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
پورتی که درایور ADB باید روی آن اجرا شود.

مثال: `9515`

نوع: `number`

##### urlBase
پیشوند مسیر URL پایه برای دستورات، مانند `wd/url`.

مثال: `/`

نوع: `string`

##### logPath
نوشتن گزارش سرور در فایل به جای stderr، سطح گزارش را به `INFO` افزایش می‌دهد.

نوع: `string`

##### logLevel
تنظیم سطح گزارش. گزینه‌های ممکن `ALL`، `DEBUG`، `INFO`، `WARNING`، `SEVERE`، `OFF`.

نوع: `string`

##### verbose
گزارش‌دهی مفصل (معادل `--log-level=ALL`)

نوع: `boolean`

##### silent
بدون گزارش‌دهی (معادل `--log-level=OFF`)

نوع: `boolean`

##### appendLog
افزودن فایل گزارش به جای بازنویسی.

نوع: `boolean`

##### replayable
گزارش‌دهی مفصل و عدم کوتاه‌سازی رشته‌های طولانی تا گزارش قابل بازپخش باشد (آزمایشی).

نوع: `boolean`

##### readableTimestamp
افزودن مهر زمان خوانا به گزارش.

نوع: `boolean`

##### enableChromeLogs
نمایش گزارش‌ها از مرورگر (بر سایر گزینه‌های گزارش‌دهی اولویت دارد).

نوع: `boolean`

##### bidiMapperPath
مسیر نگاشت bidi سفارشی.

نوع: `string`

##### allowedIps
فهرست مجاز آدرس‌های IP راه دور که اجازه اتصال به EdgeDriver دارند، جدا شده با کاما.

نوع: `string[]`<br />
پیش‌فرض: `['']`

##### allowedOrigins
فهرست مجاز منابع درخواست که اجازه اتصال به EdgeDriver دارند، جدا شده با کاما. استفاده از `*` برای اجازه دادن به هر منبع میزبان خطرناک است!

نوع: `string[]`<br />
پیش‌فرض: `['*']`

##### spawnOpts
گزینه‌هایی که باید به فرآیند درایور ارسال شوند.

نوع: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
پیش‌فرض: `undefined`

</TabItem>
<TabItem value="firefox">

تمام گزینه‌های Geckodriver را در [بسته درایور](https://github.com/webdriverio-community/node-geckodriver#options) رسمی ببینید.

</TabItem>
<TabItem value="msedge">

تمام گزینه‌های Edgedriver را در [بسته درایور](https://github.com/webdriverio-community/node-edgedriver#options) رسمی ببینید.

</TabItem>
<TabItem value="safari">

تمام گزینه‌های Safaridriver را در [بسته درایور](https://github.com/webdriverio-community/node-safaridriver#options) رسمی ببینید.

</TabItem>
</Tabs>

## قابلیت‌های ویژه برای موارد استفاده خاص

این فهرستی از مثال‌هایی است که نشان می‌دهد کدام قابلیت‌ها باید برای دستیابی به یک مورد استفاده خاص اعمال شوند.

### اجرای مرورگر بدون سر (Headless)

اجرای یک مرورگر بدون سر به معنای اجرای یک نمونه مرورگر بدون پنجره یا رابط کاربری است. این بیشتر در محیط‌های CI/CD استفاده می‌شود که در آن‌ها نمایشگری استفاده نمی‌شود. برای اجرای یک مرورگر در حالت بدون سر، قابلیت‌های زیر را اعمال کنید:

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

اگر می‌خواهید نسخه‌ای از مرورگر را آزمایش کنید که هنوز به عنوان نسخه پایدار منتشر نشده است، مانند Chrome Canary، می‌توانید با تنظیم قابلیت‌ها و اشاره به مرورگری که می‌خواهید راه‌اندازی کنید، این کار را انجام دهید، به عنوان مثال:

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

هنگام تست روی Chrome، WebdriverIO به طور خودکار نسخه مرورگر و درایور مورد نظر را بر اساس `browserVersion` تعریف شده برای شما دانلود می‌کند، به عنوان مثال:

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

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده به صورت دستی استفاده کنید، می‌توانید یک مسیر باینری به درایور ارائه دهید:

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

هنگام تست روی Firefox، WebdriverIO به طور خودکار نسخه مرورگر و درایور مورد نظر را بر اساس `browserVersion` تعریف شده برای شما دانلود می‌کند، به عنوان مثال:

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

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده به صورت دستی استفاده کنید، می‌توانید یک مسیر باینری به درایور ارائه دهید:

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

هنگام تست روی Microsoft Edge، مطمئن شوید که نسخه مرورگر مورد نظر روی دستگاه شما نصب شده است. می‌توانید WebdriverIO را به مرورگری که می‌خواهید اجرا کنید، هدایت کنید:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO به طور خودکار نسخه درایور مورد نظر را بر اساس `browserVersion` تعریف شده برای شما دانلود می‌کند، به عنوان مثال:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده به صورت دستی استفاده کنید، می‌توانید یک مسیر باینری به درایور ارائه دهید:

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

هنگام تست روی Safari، مطمئن شوید که [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) روی دستگاه شما نصب شده است. می‌توانید WebdriverIO را به آن نسخه اشاره دهید:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## گسترش قابلیت‌های سفارشی

اگر می‌خواهید مجموعه خود از قابلیت‌ها را تعریف کنید تا مثلاً داده‌های دلخواه را برای استفاده در تست‌ها برای آن قابلیت خاص ذخیره کنید، می‌توانید این کار را به عنوان مثال با تنظیم موارد زیر انجام دهید:

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

توصیه می‌شود هنگام نامگذاری قابلیت از [پروتکل W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) پیروی کنید که نیاز به یک کاراکتر `:` (دو نقطه) دارد که نشان‌دهنده یک فضای نام مختص پیاده‌سازی است. در تست‌های خود می‌توانید به قابلیت سفارشی خود از طریق موارد زیر دسترسی پیدا کنید:

```ts
browser.capabilities['custom:caps']
```

برای اطمینان از ایمنی نوع، می‌توانید رابط قابلیت WebdriverIO را به صورت زیر گسترش دهید:

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
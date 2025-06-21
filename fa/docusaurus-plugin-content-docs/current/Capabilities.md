---
id: capabilities
title: قابلیت‌ها
---
```

بخش body:
قابلیت، تعریفی برای یک رابط راه دور است. این به WebdriverIO کمک می‌کند تا بفهمد شما می‌خواهید آزمون‌های خود را در کدام محیط مرورگر یا موبایل اجرا کنید. قابلیت‌ها هنگامی که آزمون‌ها را به صورت محلی توسعه می‌دهید کمتر حیاتی هستند، زیرا اکثر اوقات آن را روی یک رابط راه دور اجرا می‌کنید، اما وقتی مجموعه بزرگی از آزمون‌های یکپارچه را در CI/CD اجرا می‌کنید، اهمیت بیشتری پیدا می‌کنند.

:::info

فرمت یک شیء قابلیت به خوبی توسط [مشخصات WebDriver](https://w3c.github.io/webdriver/#capabilities) تعریف شده است. اجراکننده آزمون WebdriverIO در صورتی که قابلیت‌های تعریف شده توسط کاربر با آن مشخصات مطابقت نداشته باشند، زودتر با خطا مواجه خواهد شد.

:::

## قابلیت‌های سفارشی

در حالی که تعداد قابلیت‌های تعریف شده ثابت بسیار کم است، هر کسی می‌تواند قابلیت‌های سفارشی خاص درایور اتوماسیون یا رابط راه دور را ارائه و قبول کند:

### افزونه‌های قابلیت خاص مرورگر

- `goog:chromeOptions`: افزونه‌های [Chromedriver](https://chromedriver.chromium.org/capabilities)، فقط برای آزمایش در Chrome قابل استفاده است
- `moz:firefoxOptions`: افزونه‌های [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، فقط برای آزمایش در Firefox قابل استفاده است
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) برای مشخص کردن محیط هنگام استفاده از EdgeDriver برای آزمایش Chromium Edge

### افزونه‌های قابلیت فروشندگان کلود

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- و بسیاری دیگر...

### افزونه‌های قابلیت موتور اتوماسیون

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- و بسیاری دیگر...

### قابلیت‌های WebdriverIO برای مدیریت گزینه‌های درایور مرورگر

WebdriverIO نصب و اجرای درایور مرورگر را برای شما مدیریت می‌کند. WebdriverIO از یک قابلیت سفارشی استفاده می‌کند که به شما امکان می‌دهد پارامترهایی را به درایور ارسال کنید.

#### `wdio:chromedriverOptions`

گزینه‌های خاصی که هنگام شروع به Chromedriver ارسال می‌شوند.

#### `wdio:geckodriverOptions`

گزینه‌های خاصی که هنگام شروع به Geckodriver ارسال می‌شوند.

#### `wdio:edgedriverOptions`

گزینه‌های خاصی که هنگام شروع به Edgedriver ارسال می‌شوند.

#### `wdio:safaridriverOptions`

گزینه‌های خاصی که هنگام شروع به Safari ارسال می‌شوند.

#### `wdio:maxInstances`

حداکثر تعداد کل کارکنان موازی در حال اجرا برای مرورگر/قابلیت خاص. بر [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability) اولویت دارد.

نوع: `number`

#### `wdio:specs`

مشخصات را برای اجرای آزمون برای آن مرورگر/قابلیت تعریف می‌کند. همانند [گزینه پیکربندی معمولی `specs`](configuration#specs)، اما مخصوص مرورگر/قابلیت است. بر `specs` اولویت دارد.

نوع: `(String | String[])[]`

#### `wdio:exclude`

مشخصات را از اجرای آزمون برای آن مرورگر/قابلیت حذف می‌کند. همانند [گزینه پیکربندی معمولی `exclude`](configuration#exclude)، اما مخصوص مرورگر/قابلیت است. پس از اعمال گزینه پیکربندی جهانی `exclude` حذف می‌کند.

نوع: `String[]`

#### `wdio:enforceWebDriverClassic`

به طور پیش‌فرض، WebdriverIO تلاش می‌کند یک جلسه WebDriver Bidi ایجاد کند. اگر این را ترجیح نمی‌دهید، می‌توانید این پرچم را برای غیرفعال کردن این رفتار تنظیم کنید.

نوع: `boolean`

#### گزینه‌های رایج درایور

در حالی که همه درایورها پارامترهای مختلفی برای پیکربندی ارائه می‌دهند، برخی از پارامترهای مشترک وجود دارند که WebdriverIO آنها را می‌فهمد و برای راه‌اندازی درایور یا مرورگر شما استفاده می‌کند:

##### `cacheDir`

مسیر به ریشه دایرکتوری کش. از این دایرکتوری برای ذخیره تمام درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

نوع: `string`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

مسیر به یک باینری درایور سفارشی. اگر تنظیم شود، WebdriverIO تلاش نمی‌کند درایور را دانلود کند، بلکه از درایوری که توسط این مسیر ارائه شده استفاده می‌کند. مطمئن شوید درایور با مرورگری که استفاده می‌کنید سازگار است.

می‌توانید این مسیر را از طریق متغیرهای محیطی `CHROMEDRIVER_PATH`، `GECKODRIVER_PATH` یا `EDGEDRIVER_PATH` ارائه دهید.

نوع: `string`

:::caution

اگر `binary` درایور تنظیم شده باشد، WebdriverIO تلاش نمی‌کند درایور را دانلود کند، بلکه از درایوری که توسط این مسیر ارائه شده استفاده می‌کند. مطمئن شوید درایور با مرورگری که استفاده می‌کنید سازگار است.

:::

#### گزینه‌های درایور خاص مرورگر

برای انتشار گزینه‌ها به درایور، می‌توانید از قابلیت‌های سفارشی زیر استفاده کنید:

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
پیشوند مسیر URL پایه برای دستورها، مانند `wd/url`.

مثال: `/`

نوع: `string`

##### logPath
نوشتن لاگ سرور در فایل به جای stderr، سطح لاگ را به `INFO` افزایش می‌دهد.

نوع: `string`

##### logLevel
تنظیم سطح لاگ. گزینه‌های ممکن `ALL`، `DEBUG`، `INFO`، `WARNING`، `SEVERE`، `OFF`.

نوع: `string`

##### verbose
لاگ با جزئیات (معادل `--log-level=ALL`)

نوع: `boolean`

##### silent
بدون لاگ (معادل `--log-level=OFF`)

نوع: `boolean`

##### appendLog
افزودن فایل لاگ به جای بازنویسی.

نوع: `boolean`

##### replayable
لاگ با جزئیات و عدم کوتاه کردن رشته‌های طولانی تا لاگ قابل پخش مجدد باشد (آزمایشی).

نوع: `boolean`

##### readableTimestamp
افزودن برچسب‌های زمانی خوانا به لاگ.

نوع: `boolean`

##### enableChromeLogs
نمایش لاگ‌ها از مرورگر (بر سایر گزینه‌های لاگ اولویت دارد).

نوع: `boolean`

##### bidiMapperPath
مسیر نگاشت bidi سفارشی.

نوع: `string`

##### allowedIps
لیست مجاز آدرس‌های IP راه دور که اجازه اتصال به EdgeDriver را دارند، با کاما جدا شده.

نوع: `string[]`<br />
پیش‌فرض: `['']`

##### allowedOrigins
لیست مجاز مبدأهای درخواست که اجازه اتصال به EdgeDriver را دارند، با کاما جدا شده. استفاده از `*` برای اجازه به هر مبدأ میزبان خطرناک است!

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

## قابلیت‌های خاص برای موارد استفاده خاص

این لیستی از نمونه‌هایی است که نشان می‌دهد کدام قابلیت‌ها باید برای دستیابی به یک مورد استفاده خاص اعمال شوند.

### اجرای مرورگر به صورت Headless

اجرای یک مرورگر headless به معنای اجرای یک نمونه مرورگر بدون پنجره یا رابط کاربری است. این بیشتر در محیط‌های CI/CD استفاده می‌شود که در آن نمایشگری استفاده نمی‌شود. برای اجرای یک مرورگر در حالت headless، قابلیت‌های زیر را اعمال کنید:

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

به نظر می‌رسد Safari [پشتیبانی نمی‌کند](https://discussions.apple.com/thread/251837694) از اجرا در حالت headless.

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

هنگام آزمایش روی Chrome، WebdriverIO به طور خودکار نسخه مرورگر و درایور مورد نظر شما را بر اساس `browserVersion` تعریف شده دانلود می‌کند، به عنوان مثال:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

اگر می‌خواهید یک مرورگر دانلود شده به صورت دستی را آزمایش کنید، می‌توانید مسیر باینری به مرورگر را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده به صورت دستی استفاده کنید، می‌توانید مسیر باینری به درایور را از طریق زیر ارائه دهید:

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

هنگام آزمایش روی Firefox، WebdriverIO به طور خودکار نسخه مرورگر و درایور مورد نظر شما را بر اساس `browserVersion` تعریف شده دانلود می‌کند، به عنوان مثال:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

اگر می‌خواهید یک نسخه دانلود شده به صورت دستی را آزمایش کنید، می‌توانید مسیر باینری به مرورگر را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده به صورت دستی استفاده کنید، می‌توانید مسیر باینری به درایور را از طریق زیر ارائه دهید:

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

هنگام آزمایش روی Microsoft Edge، مطمئن شوید که نسخه مرورگر مورد نظر روی دستگاه شما نصب شده است. می‌توانید WebdriverIO را به مرورگری که می‌خواهید اجرا کنید از طریق زیر هدایت کنید:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO به طور خودکار نسخه درایور مورد نظر شما را بر اساس `browserVersion` تعریف شده دانلود می‌کند، به عنوان مثال:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده به صورت دستی استفاده کنید، می‌توانید مسیر باینری به درایور را از طریق زیر ارائه دهید:

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

هنگام آزمایش روی Safari، مطمئن شوید که [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) روی دستگاه شما نصب شده است. می‌توانید WebdriverIO را به آن نسخه از طریق زیر هدایت کنید:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## گسترش قابلیت‌های سفارشی

اگر می‌خواهید مجموعه قابلیت‌های خود را تعریف کنید تا مثلاً داده‌های دلخواه را برای استفاده در آزمون‌های آن قابلیت خاص ذخیره کنید، می‌توانید با تنظیم موارد زیر این کار را انجام دهید:

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

توصیه می‌شود هنگام نام‌گذاری قابلیت از [پروتکل W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) پیروی کنید که نیاز به یک کاراکتر `:` (دو نقطه) دارد که نشان دهنده یک فضای نام خاص پیاده‌سازی است. در آزمون‌های خود می‌توانید به قابلیت سفارشی خود از طریق زیر دسترسی پیدا کنید:

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
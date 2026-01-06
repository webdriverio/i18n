---
id: capabilities
title: قابلیت‌ها
---

قابلیت (Capability) تعریفی برای یک رابط از راه دور است. این به WebdriverIO کمک می‌کند تا بفهمد شما می‌خواهید آزمون‌های خود را در چه محیط مرورگر یا موبایلی اجرا کنید. قابلیت‌ها هنگام توسعه آزمون‌ها به صورت محلی اهمیت کمتری دارند زیرا معمولاً آن را روی یک رابط از راه دور اجرا می‌کنید، اما هنگام اجرای مجموعه بزرگی از آزمون‌های یکپارچه در CI/CD اهمیت بیشتری پیدا می‌کنند.

:::info

فرمت یک آبجکت قابلیت به خوبی توسط [مشخصات WebDriver](https://w3c.github.io/webdriver/#capabilities) تعریف شده است. اجرا کننده آزمون WebdriverIO در صورتی که قابلیت‌های تعریف شده توسط کاربر با آن مشخصات مطابقت نداشته باشد، در مراحل اولیه با خطا مواجه خواهد شد.

:::

## قابلیت‌های سفارشی

در حالی که تعداد قابلیت‌های ثابت تعریف شده بسیار کم است، هر کسی می‌تواند قابلیت‌های سفارشی را که مختص درایور اتوماسیون یا رابط از راه دور است، ارائه و قبول کند:

### افزونه‌های قابلیت مختص مرورگر

- `goog:chromeOptions`: افزونه‌های [Chromedriver](https://chromedriver.chromium.org/capabilities)، فقط برای آزمون در Chrome قابل استفاده است
- `moz:firefoxOptions`: افزونه‌های [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، فقط برای آزمون در Firefox قابل استفاده است
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) برای تعیین محیط هنگام استفاده از EdgeDriver برای آزمون Chromium Edge

### افزونه‌های قابلیت فروشنده‌های ابری

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- و بسیاری دیگر...

### افزونه‌های قابلیت موتور اتوماسیون

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- و بسیاری دیگر...

### قابلیت‌های WebdriverIO برای مدیریت گزینه‌های درایور مرورگر

WebdriverIO نصب و اجرای درایور مرورگر را برای شما مدیریت می‌کند. WebdriverIO از یک قابلیت سفارشی استفاده می‌کند که به شما امکان می‌دهد پارامترها را به درایور منتقل کنید.

#### `wdio:chromedriverOptions`

گزینه‌های خاصی که هنگام راه‌اندازی Chromedriver به آن منتقل می‌شود.

#### `wdio:geckodriverOptions`

گزینه‌های خاصی که هنگام راه‌اندازی Geckodriver به آن منتقل می‌شود.

#### `wdio:edgedriverOptions`

گزینه‌های خاصی که هنگام راه‌اندازی Edgedriver به آن منتقل می‌شود.

#### `wdio:safaridriverOptions`

گزینه‌های خاصی که هنگام راه‌اندازی Safari به آن منتقل می‌شود.

#### `wdio:maxInstances`

حداکثر تعداد کارگر‌های موازی در حال اجرا برای مرورگر/قابلیت خاص. اولویت بالاتری نسبت به [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability) دارد.

نوع: `number`

#### `wdio:specs`

تعریف مشخصات برای اجرای آزمون برای آن مرورگر/قابلیت. مشابه [گزینه پیکربندی معمولی `specs`](configuration#specs)، اما مخصوص مرورگر/قابلیت است. اولویت بالاتری نسبت به `specs` دارد.

نوع: `(String | String[])[]`

#### `wdio:exclude`

مشخصاتی که از اجرای آزمون برای آن مرورگر/قابلیت مستثنی می‌شوند. مشابه [گزینه پیکربندی معمولی `exclude`](configuration#exclude)، اما مخصوص مرورگر/قابلیت است. پس از اعمال گزینه پیکربندی جهانی `exclude` اعمال می‌شود.

نوع: `String[]`

#### `wdio:enforceWebDriverClassic`

به طور پیش‌فرض، WebdriverIO تلاش می‌کند یک نشست WebDriver Bidi برقرار کند. اگر این رفتار را ترجیح نمی‌دهید، می‌توانید با تنظیم این پرچم آن را غیرفعال کنید.

نوع: `boolean`

#### گزینه‌های رایج درایور

در حالی که تمام درایورها پارامترهای مختلفی برای پیکربندی ارائه می‌دهند، برخی از آنها مشترک هستند که WebdriverIO آنها را درک و برای راه‌اندازی درایور یا مرورگر شما استفاده می‌کند:

##### `cacheDir`

مسیر به ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی که هنگام تلاش برای شروع یک نشست دانلود می‌شوند، استفاده می‌شود.

نوع: `string`<br />
پیش‌فرض: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

مسیر به یک باینری درایور سفارشی. اگر تنظیم شود، WebdriverIO تلاشی برای دانلود یک درایور نمی‌کند، بلکه از درایوری که توسط این مسیر ارائه شده استفاده می‌کند. مطمئن شوید که درایور با مرورگری که استفاده می‌کنید سازگار است.

می‌توانید این مسیر را از طریق متغیرهای محیطی `CHROMEDRIVER_PATH`، `GECKODRIVER_PATH` یا `EDGEDRIVER_PATH` ارائه دهید.

نوع: `string`

:::caution

اگر `binary` درایور تنظیم شود، WebdriverIO تلاشی برای دانلود یک درایور نمی‌کند، بلکه از درایوری که توسط این مسیر ارائه شده استفاده می‌کند. مطمئن شوید که درایور با مرورگری که استفاده می‌کنید سازگار است.

:::

#### گزینه‌های درایور مختص مرورگر

برای انتقال گزینه‌ها به درایور، می‌توانید از قابلیت‌های سفارشی زیر استفاده کنید:

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
پیشوند مسیر URL پایه برای دستورات، مثلاً `wd/url`.

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
افزودن به فایل لاگ به جای بازنویسی آن.

نوع: `boolean`

##### replayable
لاگ با جزئیات و عدم برش رشته‌های طولانی به طوری که لاگ قابل بازپخش باشد (آزمایشی).

نوع: `boolean`

##### readableTimestamp
افزودن برچسب‌های زمان خوانا به لاگ.

نوع: `boolean`

##### enableChromeLogs
نمایش لاگ‌ها از مرورگر (باعث نادیده گرفتن سایر گزینه‌های لاگ می‌شود).

نوع: `boolean`

##### bidiMapperPath
مسیر سفارشی برای مپر bidi.

نوع: `string`

##### allowedIps
لیست مجاز آدرس‌های IP از راه دور که اجازه اتصال به EdgeDriver را دارند، جدا شده با کاما.

نوع: `string[]`<br />
پیش‌فرض: `['']`

##### allowedOrigins
لیست مجاز منشأهای درخواست که اجازه اتصال به EdgeDriver را دارند، جدا شده با کاما. استفاده از `*` برای اجازه دادن به هر منشأ میزبان خطرناک است!

نوع: `string[]`<br />
پیش‌فرض: `['*']`

##### spawnOpts
گزینه‌هایی که به فرآیند درایور منتقل می‌شود.

نوع: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
پیش‌فرض: `undefined`

</TabItem>
<TabItem value="firefox">

تمام گزینه‌های Geckodriver را در [پکیج رسمی درایور](https://github.com/webdriverio-community/node-geckodriver#options) مشاهده کنید.

</TabItem>
<TabItem value="msedge">

تمام گزینه‌های Edgedriver را در [پکیج رسمی درایور](https://github.com/webdriverio-community/node-edgedriver#options) مشاهده کنید.

</TabItem>
<TabItem value="safari">

تمام گزینه‌های Safaridriver را در [پکیج رسمی درایور](https://github.com/webdriverio-community/node-safaridriver#options) مشاهده کنید.

</TabItem>
</Tabs>

## قابلیت‌های ویژه برای موارد استفاده خاص

این فهرستی از مثال‌هایی است که نشان می‌دهد کدام قابلیت‌ها باید برای دستیابی به یک مورد استفاده خاص اعمال شوند.

### اجرای مرورگر به صورت Headless

اجرای یک مرورگر به صورت headless به معنی اجرای یک نمونه مرورگر بدون پنجره یا رابط کاربری است. این حالت معمولاً در محیط‌های CI/CD که از نمایشگر استفاده نمی‌شود، به کار می‌رود. برای اجرای مرورگر در حالت headless، قابلیت‌های زیر را اعمال کنید:

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

به نظر می‌رسد Safari [از اجرا در حالت headless پشتیبانی نمی‌کند](https://discussions.apple.com/thread/251837694).

</TabItem>
</Tabs>

### خودکارسازی کانال‌های مختلف مرورگر

اگر می‌خواهید نسخه‌ای از مرورگر را که هنوز به عنوان نسخه پایدار منتشر نشده است آزمایش کنید، مانند Chrome Canary، می‌توانید با تنظیم قابلیت‌ها و اشاره به مرورگری که می‌خواهید آغاز کنید، این کار را انجام دهید، برای مثال:

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

هنگام آزمون در Chrome، WebdriverIO به طور خودکار نسخه مرورگر و درایور مورد نظر را بر اساس `browserVersion` تعریف شده دانلود می‌کند، برای مثال:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

اگر می‌خواهید یک مرورگر دانلود شده دستی را آزمایش کنید، می‌توانید مسیر باینری به مرورگر را از طریق:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده دستی استفاده کنید، می‌توانید مسیر باینری به درایور را از طریق:

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

هنگام آزمون در Firefox، WebdriverIO به طور خودکار نسخه مرورگر و درایور مورد نظر را بر اساس `browserVersion` تعریف شده دانلود می‌کند، برای مثال:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

اگر می‌خواهید نسخه دانلود شده دستی را آزمایش کنید، می‌توانید مسیر باینری به مرورگر را از طریق:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده دستی استفاده کنید، می‌توانید مسیر باینری به درایور را از طریق:

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

هنگام آزمون در Microsoft Edge، مطمئن شوید که نسخه مرورگر مورد نظر روی دستگاه شما نصب شده است. می‌توانید WebdriverIO را به مرورگری که باید اجرا شود هدایت کنید:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO به طور خودکار نسخه درایور مورد نظر را بر اساس `browserVersion` تعریف شده دانلود می‌کند، برای مثال:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلود شده دستی استفاده کنید، می‌توانید مسیر باینری به درایور را از طریق:

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

هنگام آزمون در Safari، مطمئن شوید که [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) روی دستگاه شما نصب شده است. می‌توانید WebdriverIO را به آن نسخه هدایت کنید:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## گسترش قابلیت‌های سفارشی

اگر می‌خواهید مجموعه قابلیت‌های خود را تعریف کنید، مثلاً برای ذخیره داده‌های دلخواه برای استفاده در آزمون‌های مربوط به آن قابلیت خاص، می‌توانید این کار را با تنظیم:

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

توصیه می‌شود هنگام نامگذاری قابلیت‌ها، [پروتکل W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) را دنبال کنید که نیاز به کاراکتر `:` (دو نقطه) دارد، که نشان‌دهنده فضای نام خاص پیاده‌سازی است. در آزمون‌های خود می‌توانید به قابلیت سفارشی خود دسترسی پیدا کنید، برای مثال:

```ts
browser.capabilities['custom:caps']
```

برای اطمینان از ایمنی نوع، می‌توانید رابط قابلیت WebdriverIO را گسترش دهید:

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
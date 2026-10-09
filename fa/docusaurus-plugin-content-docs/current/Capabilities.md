---
id: capabilities
title: قابلیت‌ها
description: "قابلیت‌ها را تعریف کنید تا مرورگر یا محیط موبایلی که تست‌های شما در آن اجرا می‌شوند را انتخاب کنید، از جمله قابلیت‌های سفارشی فروشندگان و موارد استفاده خاص."
---

یک قابلیت (capability) تعریفی برای یک رابط از راه دور است. این به WebdriverIO کمک می‌کند تا بفهمد که شما می‌خواهید تست‌های خود را در کدام مرورگر یا محیط موبایل اجرا کنید. قابلیت‌ها هنگام توسعه تست‌ها به صورت محلی اهمیت کمتری دارند، زیرا در بیشتر مواقع آن را روی یک رابط از راه دور اجرا می‌کنید، اما هنگام اجرای مجموعه بزرگی از تست‌های یکپارچه‌سازی در CI/CD اهمیت بیشتری پیدا می‌کنند.

:::info

قالب یک شیء قابلیت به خوبی توسط [مشخصات WebDriver](https://w3c.github.io/webdriver/#capabilities) تعریف شده است. اگر قابلیت‌های تعریف‌شده توسط کاربر با این مشخصات مطابقت نداشته باشند، اجراکننده تست WebdriverIO در همان ابتدا با شکست مواجه می‌شود.

:::

## قابلیت‌های سفارشی

در حالی که تعداد قابلیت‌های ثابت تعریف‌شده بسیار کم است، هر کسی می‌تواند قابلیت‌های سفارشی‌ای ارائه دهد و بپذیرد که مختص درایور اتوماسیون یا رابط از راه دور هستند:

### افزونه‌های قابلیت مختص مرورگر

- `goog:chromeOptions`: افزونه‌های [Chromedriver](https://chromedriver.chromium.org/capabilities)، فقط برای تست در Chrome قابل استفاده است
- `moz:firefoxOptions`: افزونه‌های [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، فقط برای تست در Firefox قابل استفاده است
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) برای مشخص کردن محیط هنگام استفاده از EdgeDriver برای تست Chromium Edge

### افزونه‌های قابلیت فروشندگان ابری

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

WebdriverIO نصب و اجرای درایور مرورگر را برای شما مدیریت می‌کند. WebdriverIO از یک قابلیت سفارشی استفاده می‌کند که به شما امکان می‌دهد پارامترهایی را به درایور ارسال کنید.

#### `wdio:chromedriverOptions`

گزینه‌های مشخصی که هنگام راه‌اندازی Chromedriver به آن ارسال می‌شوند.

#### `wdio:geckodriverOptions`

گزینه‌های مشخصی که هنگام راه‌اندازی Geckodriver به آن ارسال می‌شوند.

#### `wdio:edgedriverOptions`

گزینه‌های مشخصی که هنگام راه‌اندازی Edgedriver به آن ارسال می‌شوند.

#### `wdio:safaridriverOptions`

گزینه‌های مشخصی که هنگام راه‌اندازی Safari به آن ارسال می‌شوند.

#### `wdio:maxInstances`

<Option type="number">

حداکثر تعداد کل workerهای در حال اجرای موازی برای مرورگر/قابلیت مشخص. بر [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability) اولویت دارد.

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

specها را برای اجرای تست برای آن مرورگر/قابلیت تعریف کنید. مشابه [گزینه پیکربندی معمولی `specs`](configuration#specs) است، اما مختص مرورگر/قابلیت. بر `specs` اولویت دارد.

</Option>

#### `wdio:exclude`

<Option type="String[]">

specها را از اجرای تست برای آن مرورگر/قابلیت مستثنی کنید. مشابه [گزینه پیکربندی معمولی `exclude`](configuration#exclude) است، اما مختص مرورگر/قابلیت. پس از اعمال گزینه پیکربندی سراسری `exclude` مستثنی می‌کند.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

به طور پیش‌فرض، WebdriverIO تلاش می‌کند یک جلسه WebDriver Bidi برقرار کند. اگر این را ترجیح نمی‌دهید، می‌توانید این پرچم را برای غیرفعال کردن این رفتار تنظیم کنید.

</Option>

#### `wdio:electronVersion`

<Option type="string">

برای تست یک برنامه Electron که به عنوان `goog:chromeOptions.binary` تنظیم شده است، به جای Chromedriver مربوط به Chrome for Testing، Chromedriver همراه با این نسخه Electron را دانلود می‌کند. اگر `browserVersion` نیز تنظیم شده باشد، WebdriverIO زمانی که نسخه Electron قابل دانلود نباشد یا `CHROMEDRIVER_CDNURL` تنظیم شده باشد، به جای آن از Chromedriver مربوط به آن نسخه استفاده می‌کند. نسخه‌های Nightly از [electron/nightlies](https://github.com/electron/nightlies/releases) دریافت می‌شوند. سرویس Electron این مقدار را بر اساس نسخه Electron برنامه برای شما تنظیم می‌کند.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // یک جلسه BiDi پنجره برنامه را با `data:,` جایگزین می‌کند
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### گزینه‌های مشترک درایور

در حالی که همه درایورها پارامترهای متفاوتی برای پیکربندی ارائه می‌دهند، برخی پارامترهای مشترک وجود دارند که WebdriverIO آن‌ها را درک می‌کند و برای راه‌اندازی درایور یا مرورگر شما از آن‌ها استفاده می‌کند:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

مسیر ریشه دایرکتوری کش. این دایرکتوری برای ذخیره تمام درایورهایی استفاده می‌شود که هنگام تلاش برای شروع یک جلسه دانلود می‌شوند.

</Option>

##### `binary`

<Option type="string">

مسیر یک فایل اجرایی درایور سفارشی. اگر تنظیم شود، WebdriverIO تلاشی برای دانلود درایور نمی‌کند و از درایوری که در این مسیر ارائه شده استفاده خواهد کرد. مطمئن شوید که درایور با مرورگری که استفاده می‌کنید سازگار است.

می‌توانید این مسیر را از طریق متغیرهای محیطی `CHROMEDRIVER_PATH`، `GECKODRIVER_PATH` یا `EDGEDRIVER_PATH` ارائه دهید.

</Option>
:::caution

اگر `binary` درایور تنظیم شده باشد، WebdriverIO تلاشی برای دانلود درایور نمی‌کند و از درایوری که در این مسیر ارائه شده استفاده خواهد کرد. مطمئن شوید که درایور با مرورگری که استفاده می‌کنید سازگار است.

:::

#### میزبان سفارشی برای دانلود درایور

اگر CDNهای عمومی درایور از محیط شما در دسترس نیستند، مثلاً به این دلیل که تست‌های خود را پشت یک پروکسی سازمانی اجرا می‌کنید یا درایورها را در یک رجیستری artifact داخلی mirror می‌کنید، می‌توانید با استفاده از متغیرهای محیطی زیر، دانلود را به یک میزبان سفارشی هدایت کنید:

- Chrome: `CHROMEDRIVER_CDNURL`، به طور پیش‌فرض `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`، به طور پیش‌فرض `https://msedgedriver.microsoft.com`

انتظار می‌رود mirror آرشیوهای درایور را در همان مسیرهای CDN اصلی ارائه دهد، برای مثال برای Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

که درایور را به `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip` تبدیل می‌کند، که در آن `<platform>` یکی از `linux64`، `linux-arm64`، `mac-x64`، `mac-arm64`، `win32` یا `win64` است، برای مثال `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info محیط‌های کاملاً آفلاین

این متغیرها فقط دانلود درایور را تغییر مسیر می‌دهند. برای اینکه WebdriverIO به هیچ وجه به اینترنت عمومی دسترسی پیدا نکند، چهار شرط دیگر باید برآورده شوند:

- **یک مرورگر باید به صورت محلی در دسترس باشد.** اگر WebdriverIO نتواند یک Chrome یا Firefox نصب‌شده پیدا کند، مرورگر را نیز دانلود می‌کند و این دانلود از این متغیرها پیروی نمی‌کند. یا مرورگر را روی دستگاه نصب کنید یا WebdriverIO را از طریق `goog:chromeOptions.binary` / `moz:firefoxOptions.binary` به آن هدایت کنید.
- **از یک شماره نسخه کامل استفاده کنید.** اگر `browserVersion` حذف شود، WebdriverIO نسخه دقیق را از مرورگر محلی می‌خواند و نیازی به جستجوی نسخه نیست. اگر آن را تنظیم می‌کنید، از نسخه کامل چهار بخشی استفاده کنید، برای مثال `140.0.7339.207`. یک کانال انتشار (`stable`)، یک milestone (`140`) یا یک نسخه ناقص (`140.0.7339`) نیازمند جستجوی نسخه در یک endpoint عمومی Google است که قابل تغییر مسیر نیست.
- **Chromedriver باید از Chrome for Testing دریافت شود.** برای Chrome قدیمی‌تر از `153.0.8001.0` روی Linux ARM64، و همچنین با `wdio:electronVersion` بدون `browserVersion`، Chromedriver از نسخه‌های منتشرشده Electron در GitHub دانلود می‌شود که این متغیرها آن را تغییر مسیر نمی‌دهند.
- **مطمئن شوید که mirror واقعاً نسخه مورد نیاز شما را دارد.** اگر درایور از میزبان شما قابل دریافت نباشد — چه به این دلیل که آن نسخه mirror نشده، و چه به همان اندازه به این دلیل که url اشتباه است یا اعتبارنامه‌ها رد شده‌اند — WebdriverIO یک هشدار ثبت می‌کند و سپس نزدیک‌ترین نسخه سالم شناخته‌شده را جستجو می‌کند که باز هم endpoint عمومی را query می‌کند. اگر یک اجرا به طور غیرمنتظره به اینترنت دسترسی پیدا کرد یا نسخه‌ای را انتخاب کرد که درخواست نکرده بودید، هشدار را برای میزبانی که امتحان کرده است بررسی کنید.

:::

#### گزینه‌های درایور مختص مرورگر

برای انتقال گزینه‌ها به درایور می‌توانید از قابلیت‌های سفارشی زیر استفاده کنید:

- Chrome یا Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
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

<Option type="number">

پورتی که درایور ADB باید روی آن اجرا شود.

مثال: `9515`

</Option>

##### urlBase

<Option type="string">

پیشوند مسیر URL پایه برای دستورات، برای مثال `wd/url`.

مثال: `/`

</Option>

##### logPath

<Option type="string">

لاگ سرور را به جای stderr در فایل می‌نویسد، سطح لاگ را به `INFO` افزایش می‌دهد

</Option>

##### logLevel

<Option type="string">

سطح لاگ را تنظیم می‌کند. گزینه‌های ممکن `ALL`، `DEBUG`، `INFO`، `WARNING`، `SEVERE`، `OFF`.

</Option>

##### verbose

<Option type="boolean">

لاگ با جزئیات کامل (معادل `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

هیچ چیزی لاگ نمی‌شود (معادل `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

به جای بازنویسی، به فایل لاگ اضافه می‌کند.

</Option>

##### replayable

<Option type="boolean">

لاگ با جزئیات کامل و بدون کوتاه کردن رشته‌های طولانی تا لاگ قابل بازپخش باشد (آزمایشی).

</Option>

##### readableTimestamp

<Option type="boolean">

مهرهای زمانی خوانا به لاگ اضافه می‌کند.

</Option>

##### enableChromeLogs

<Option type="boolean">

لاگ‌های مرورگر را نمایش می‌دهد (سایر گزینه‌های لاگ را لغو می‌کند).

</Option>

##### bidiMapperPath

<Option type="string">

مسیر سفارشی bidi mapper.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

فهرست مجاز آدرس‌های IP از راه دور، جداشده با کاما، که مجاز به اتصال به EdgeDriver هستند.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

فهرست مجاز originهای درخواست، جداشده با کاما، که مجاز به اتصال به EdgeDriver هستند. استفاده از `*` برای مجاز کردن هر origin میزبان خطرناک است!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

گزینه‌هایی که باید به فرآیند درایور ارسال شوند.

</Option>
</TabItem>
<TabItem value="firefox">

تمام گزینه‌های Geckodriver را در [پکیج رسمی درایور](https://github.com/webdriverio-community/node-geckodriver#options) ببینید.

</TabItem>
<TabItem value="msedge">

تمام گزینه‌های Edgedriver را در [پکیج رسمی درایور](https://github.com/webdriverio-community/node-edgedriver#options) ببینید.

</TabItem>
<TabItem value="safari">

تمام گزینه‌های Safaridriver را در [پکیج رسمی درایور](https://github.com/webdriverio-community/node-safaridriver#options) ببینید.

</TabItem>
</Tabs>

## قابلیت‌های ویژه برای موارد استفاده خاص

این فهرستی از مثال‌هاست که نشان می‌دهد کدام قابلیت‌ها باید برای دستیابی به یک مورد استفاده خاص اعمال شوند.

### اجرای مرورگر به صورت Headless

اجرای یک مرورگر headless به معنای اجرای یک نمونه مرورگر بدون پنجره یا رابط کاربری است. این بیشتر در محیط‌های CI/CD استفاده می‌شود که در آن‌ها از نمایشگر استفاده نمی‌شود. برای اجرای مرورگر در حالت headless، قابلیت‌های زیر را اعمال کنید:

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
    browserName: 'chrome',   // یا 'chromium'
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

به نظر می‌رسد که Safari از اجرا در حالت headless [پشتیبانی نمی‌کند](https://discussions.apple.com/thread/251837694).

</TabItem>
</Tabs>

### خودکارسازی کانال‌های مختلف مرورگر

اگر می‌خواهید نسخه‌ای از مرورگر را تست کنید که هنوز به عنوان نسخه پایدار منتشر نشده است، برای مثال Chrome Canary، می‌توانید این کار را با تنظیم قابلیت‌ها و اشاره به مرورگری که می‌خواهید راه‌اندازی کنید انجام دهید، برای مثال:

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

هنگام تست روی Chrome، WebdriverIO به طور خودکار نسخه مرورگر و درایور مورد نظر را بر اساس `browserVersion` تعریف‌شده برای شما دانلود می‌کند، برای مثال:

```ts
{
    browserName: 'chrome', // یا 'chromium'
    browserVersion: '116' // یا '116.0.5845.96'، 'stable'، 'dev'، 'canary'، 'beta' یا 'latest' (همانند 'canary')
}
```

اگر می‌خواهید یک مرورگر دانلودشده به صورت دستی را تست کنید، می‌توانید مسیر فایل اجرایی مرورگر را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'chrome',  // یا 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلودشده به صورت دستی استفاده کنید، می‌توانید مسیر فایل اجرایی درایور را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'chrome', // یا 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

هنگام تست روی Firefox، WebdriverIO به طور خودکار نسخه مرورگر و درایور مورد نظر را بر اساس `browserVersion` تعریف‌شده برای شما دانلود می‌کند، برای مثال:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // یا 'latest'
}
```

اگر می‌خواهید یک نسخه دانلودشده به صورت دستی را تست کنید، می‌توانید مسیر فایل اجرایی مرورگر را از طریق زیر ارائه دهید:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلودشده به صورت دستی استفاده کنید، می‌توانید مسیر فایل اجرایی درایور را از طریق زیر ارائه دهید:

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

هنگام تست روی Microsoft Edge، مطمئن شوید که نسخه مرورگر مورد نظر را روی دستگاه خود نصب کرده‌اید. می‌توانید WebdriverIO را برای اجرا به مرورگر هدایت کنید از طریق:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO به طور خودکار نسخه درایور مورد نظر را بر اساس `browserVersion` تعریف‌شده برای شما دانلود می‌کند، برای مثال:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // یا '109.0.1467.0'، 'stable'، 'dev'، 'canary'، 'beta'
}
```

علاوه بر این، اگر می‌خواهید از یک درایور دانلودشده به صورت دستی استفاده کنید، می‌توانید مسیر فایل اجرایی درایور را از طریق زیر ارائه دهید:

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

هنگام تست روی Safari، مطمئن شوید که [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) را روی دستگاه خود نصب کرده‌اید. می‌توانید WebdriverIO را به آن نسخه هدایت کنید از طریق:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## گسترش قابلیت‌های سفارشی

اگر می‌خواهید مجموعه قابلیت‌های خود را تعریف کنید تا برای مثال داده‌های دلخواه را برای استفاده در تست‌های مربوط به آن قابلیت خاص ذخیره کنید، می‌توانید این کار را برای مثال با تنظیم زیر انجام دهید:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // پیکربندی‌های سفارشی
        }
    }]
}
```

توصیه می‌شود در مورد نام‌گذاری قابلیت‌ها از [پروتکل W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) پیروی کنید که نیازمند یک کاراکتر `:` (دونقطه) است که نشان‌دهنده یک فضای نام مختص پیاده‌سازی است. در تست‌های خود می‌توانید به قابلیت سفارشی خود دسترسی داشته باشید، برای مثال از طریق:

```ts
browser.capabilities['custom:caps']
```

برای اطمینان از ایمنی نوع (type safety) می‌توانید رابط قابلیت WebdriverIO را از طریق زیر گسترش دهید:

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
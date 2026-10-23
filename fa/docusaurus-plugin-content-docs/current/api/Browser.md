---
id: browser
title: شیء Browser
---

__گسترش می‌دهد:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

شیء browser نمونه‌ی نشستی است که از آن برای کنترل مرورگر یا دستگاه موبایل استفاده می‌کنید. اگر از اجراکننده‌ی تست WDIO استفاده می‌کنید، می‌توانید از طریق شیء سراسری `browser` یا `driver` به نمونه‌ی WebDriver دسترسی داشته باشید یا آن را با استفاده از [`@wdio/globals`](/docs/api/globals) وارد کنید. اگر از WebdriverIO در حالت مستقل استفاده می‌کنید، شیء browser توسط متد [`remote`](/docs/api/modules#remoteoptions-modifier) بازگردانده می‌شود.

نشست توسط اجراکننده‌ی تست مقداردهی اولیه می‌شود. پایان دادن به نشست نیز به همین صورت است؛ این کار نیز توسط فرایند اجراکننده‌ی تست انجام می‌شود.

## ویژگی‌ها

یک شیء browser دارای ویژگی‌های زیر است:

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| `capabilities` | `Object` | قابلیت‌های اختصاص‌یافته از سرور راه دور.<br /><b>مثال:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | قابلیت‌های درخواست‌شده از سرور راه دور.<br /><b>مثال:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | شناسه‌ی نشست اختصاص‌یافته از سرور راه دور. |
| `options` | `Object` | [گزینه‌های](/docs/configuration) WebdriverIO بسته به نحوه‌ی ایجاد شیء browser. درباره‌ی [انواع راه‌اندازی](/docs/setuptypes) بیشتر بخوانید. |
| `commandList` | `String[]` | فهرستی از دستورات ثبت‌شده برای نمونه‌ی browser |
| `isChrome` | `Boolean` | نشان می‌دهد که آیا این یک نمونه‌ی Chrome است |
| `isFirefox` | `Boolean` | نشان می‌دهد که آیا این یک نمونه‌ی Firefox است |
| `isBidi` | `Boolean` | نشان می‌دهد که آیا این نشست از Bidi استفاده می‌کند |
| `isSauce` | `Boolean` | نشان می‌دهد که آیا این نشست روی Sauce Labs در حال اجرا است |
| `isMacApp` | `Boolean` | نشان می‌دهد که آیا این نشست برای یک برنامه‌ی بومی Mac در حال اجرا است |
| `isWindowsApp` | `Boolean` | نشان می‌دهد که آیا این نشست برای یک برنامه‌ی بومی Windows در حال اجرا است |
| `isMobile` | `Boolean` | نشان‌دهنده‌ی یک نشست موبایل است. در بخش [پرچم‌های موبایل](#mobile-flags) بیشتر بخوانید. |
| `isIOS` | `Boolean` | نشان‌دهنده‌ی یک نشست iOS است. در بخش [پرچم‌های موبایل](#mobile-flags) بیشتر بخوانید. |
| `isAndroid` | `Boolean` | نشان‌دهنده‌ی یک نشست Android است. در بخش [پرچم‌های موبایل](#mobile-flags) بیشتر بخوانید. |
| `isNativeContext` | `Boolean`  | نشان می‌دهد که آیا موبایل در زمینه‌ی `NATIVE_APP` قرار دارد. در بخش [پرچم‌های موبایل](#mobile-flags) بیشتر بخوانید. |
| `mobileContext` | `string`  | این ویژگی زمینه‌ی **فعلی** که درایور در آن قرار دارد را ارائه می‌دهد، برای مثال `NATIVE_APP`، `WEBVIEW_<packageName>` برای Android یا `WEBVIEW_<pid>` برای iOS. این کار یک فراخوانی اضافی WebDriver به `driver.getContext()` را صرفه‌جویی می‌کند. در بخش [پرچم‌های موبایل](#mobile-flags) بیشتر بخوانید. |


## متدها

بر اساس بک‌اند اتوماسیونی که برای نشست شما استفاده می‌شود، WebdriverIO مشخص می‌کند که کدام [دستورات پروتکل](/docs/api/protocols) به [شیء browser](/docs/api/browser) متصل شوند. برای مثال، اگر یک نشست خودکار را در Chrome اجرا کنید، به دستورات مخصوص Chromium مانند [`elementHover`](/docs/api/chromium#elementhover) دسترسی خواهید داشت، اما به هیچ‌یک از [دستورات Appium](/docs/api/appium) دسترسی نخواهید داشت.

علاوه بر این، WebdriverIO مجموعه‌ای از متدهای کاربردی را ارائه می‌دهد که استفاده از آن‌ها برای تعامل با [مرورگر](/docs/api/browser) یا [عناصر](/docs/api/element) صفحه توصیه می‌شود.

علاوه بر آن، دستورات زیر نیز در دسترس هستند:

| نام | پارامترها | جزئیات |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (نوع: `String`)<br />- `fn` (نوع: `Function`)<br />- `attachToElement` (نوع: `boolean`) | امکان تعریف دستورات سفارشی را فراهم می‌کند که می‌توانند برای اهداف ترکیبی از شیء browser فراخوانی شوند. در راهنمای [دستور سفارشی](/docs/customcommands) بیشتر بخوانید. |
| `overwriteCommand` | - `commandName` (نوع: `String`)<br />- `fn` (نوع: `Function`)<br />- `attachToElement` (نوع: `boolean`) | امکان بازنویسی هر دستور مرورگر با عملکرد سفارشی را فراهم می‌کند. با احتیاط استفاده کنید، زیرا ممکن است کاربران فریم‌ورک را سردرگم کند. در راهنمای [دستور سفارشی](/docs/customcommands#overwriting-native-commands) بیشتر بخوانید. |
| `addLocatorStrategy` | - `strategyName` (نوع: `String`)<br />- `fn` (نوع: `Function`) | امکان تعریف یک استراتژی انتخابگر سفارشی را فراهم می‌کند. در راهنمای [انتخابگرها](/docs/selectors#custom-selector-strategies) بیشتر بخوانید. |

## نکات

### پرچم‌های موبایل

اگر لازم است تست خود را بر اساس اینکه نشست شما روی دستگاه موبایل اجرا می‌شود یا نه تغییر دهید، می‌توانید برای بررسی به پرچم‌های موبایل دسترسی داشته باشید.

برای مثال، با این پیکربندی:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

می‌توانید در تست خود به این صورت به این پرچم‌ها دسترسی داشته باشید:

```js
// توجه: `driver` معادل شیء `browser` است اما از نظر معنایی صحیح‌تر است
// می‌توانید انتخاب کنید که از کدام متغیر سراسری استفاده کنید
console.log(driver.isMobile) // خروجی: true
console.log(driver.isIOS) // خروجی: true
console.log(driver.isAndroid) // خروجی: false
```

این می‌تواند مفید باشد اگر، برای مثال، بخواهید انتخابگرها را در [page objectهای](../pageobjects) خود بر اساس نوع دستگاه تعریف کنید، مانند این:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

همچنین می‌توانید از این پرچم‌ها برای اجرای تنها برخی تست‌ها برای انواع خاصی از دستگاه‌ها استفاده کنید:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // تست را فقط با دستگاه‌های Android اجرا کن
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### رویدادها
شیء browser یک EventEmitter است و چند رویداد برای موارد استفاده‌ی شما منتشر می‌شوند.

در اینجا فهرستی از رویدادها آمده است. به خاطر داشته باشید که این هنوز فهرست کامل رویدادهای موجود نیست.
با کمال میل می‌توانید با افزودن توضیحات رویدادهای بیشتر در اینجا، در به‌روزرسانی این سند مشارکت کنید.

#### `command`

این رویداد هر زمان که WebdriverIO یک دستور WebDriver Classic ارسال می‌کند، منتشر می‌شود. این رویداد شامل اطلاعات زیر است:

- `command`: نام دستور، مثلاً `navigateTo`
- `method`: متد HTTP استفاده‌شده برای ارسال درخواست دستور، مثلاً `POST`
- `endpoint`: نقطه‌ی پایانی دستور، مثلاً `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: محتوای دستور، مثلاً `{ url: 'https://webdriver.io' }`

#### `result`

این رویداد هر زمان که WebdriverIO نتیجه‌ی یک دستور WebDriver Classic را دریافت می‌کند، منتشر می‌شود. این رویداد شامل همان اطلاعات رویداد `command` به‌همراه اطلاعات زیر است:

- `result`: نتیجه‌ی دستور

#### `bidiCommand`

این رویداد هر زمان که WebdriverIO یک دستور WebDriver Bidi را به درایور مرورگر ارسال می‌کند، منتشر می‌شود. این رویداد شامل اطلاعاتی درباره‌ی موارد زیر است:

- `method`: متد دستور WebDriver Bidi
- `params`: پارامتر مرتبط با دستور (به [API](/docs/api/webdriverBidi) مراجعه کنید)
- `id`: شناسه‌ی دستور، همان شناسه‌ای که در رویداد `bidiResult` این دستور وجود دارد

#### `bidiResult`

در صورت اجرای موفقیت‌آمیز دستور، محتوای رویداد به این صورت خواهد بود:

- `type`: `success`
- `id`: شناسه‌ی دستور
- `result`: نتیجه‌ی دستور (به [API](/docs/api/webdriverBidi) مراجعه کنید)

در صورت بروز خطا در دستور، محتوای رویداد به این صورت خواهد بود:

- `type`: `error`
- `id`: شناسه‌ی دستور
- `error`: کد خطا، مثلاً `invalid argument`
- `message`: جزئیات خطا
- `stacktrace`: یک stack trace

#### `request.start`
این رویداد پیش از ارسال یک درخواست WebDriver به درایور اجرا می‌شود. این رویداد شامل اطلاعاتی درباره‌ی درخواست و محتوای آن است.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
این رویداد زمانی اجرا می‌شود که درخواست به درایور پاسخی دریافت کند. شیء رویداد یا بدنه‌ی پاسخ را به‌عنوان نتیجه دربر دارد یا در صورت شکست دستور WebDriver، یک خطا.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
رویداد retry می‌تواند زمانی که WebdriverIO تلاش می‌کند اجرای دستور را مجدداً امتحان کند، مثلاً به دلیل یک مشکل شبکه، به شما اطلاع دهد. این رویداد شامل اطلاعاتی درباره‌ی خطایی که باعث تلاش مجدد شده و تعداد تلاش‌های مجدد انجام‌شده است.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
این رویدادی برای اندازه‌گیری عملیات در سطح WebDriver است. هر زمان که WebdriverIO درخواستی به بک‌اند WebDriver ارسال کند، این رویداد با برخی اطلاعات مفید منتشر می‌شود:

- `durationMillisecond`: مدت زمان درخواست بر حسب میلی‌ثانیه.
- `error`: شیء خطا در صورت شکست درخواست.
- `request`: شیء درخواست. می‌توانید url، method، headers و غیره را در آن پیدا کنید.
- `retryCount`: اگر `0` باشد، درخواست اولین تلاش بوده است. این مقدار زمانی که WebDriverIO در پشت صحنه تلاش مجدد می‌کند، افزایش می‌یابد.
- `success`: مقدار Boolean که نشان می‌دهد درخواست موفق بوده یا نه. اگر `false` باشد، ویژگی `error` نیز ارائه خواهد شد.

یک نمونه رویداد:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### دستورات سفارشی

می‌توانید دستورات سفارشی را در محدوده‌ی browser تنظیم کنید تا گردش‌کارهایی که معمولاً استفاده می‌شوند را انتزاعی کنید. برای اطلاعات بیشتر، راهنمای ما درباره‌ی [دستورات سفارشی](/docs/customcommands#adding-custom-commands) را ببینید.
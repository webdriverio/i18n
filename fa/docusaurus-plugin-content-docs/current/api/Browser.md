---
id: browser
title: شیء مرورگر
---

__extends:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

شیء مرورگر نمونه‌ای از جلسه است که برای کنترل مرورگر یا دستگاه موبایل استفاده می‌کنید. اگر از آزمون‌ران WDIO استفاده می‌کنید، می‌توانید به نمونه WebDriver از طریق اشیاء سراسری `browser` یا `driver` دسترسی پیدا کنید یا آن را با استفاده از [`@wdio/globals`](/docs/api/globals) وارد کنید. اگر از WebdriverIO در حالت مستقل استفاده می‌کنید، شیء مرورگر توسط متد [`remote`](/docs/api/modules#remoteoptions-modifier) برگردانده می‌شود.

جلسه توسط آزمون‌ران راه‌اندازی می‌شود. برای پایان دادن به جلسه نیز همینطور است. این کار نیز توسط فرآیند آزمون‌ران انجام می‌شود.

## خصوصیت‌ها

یک شیء مرورگر دارای خصوصیت‌های زیر است:

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| `capabilities` | `Object` | قابلیت‌های اختصاص داده شده از سرور راه دور.<br /><b>مثال:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | قابلیت‌های درخواست شده از سرور راه دور.<br /><b>مثال:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | شناسه جلسه اختصاص یافته از سرور راه دور. |
| `options` | `Object` | گزینه‌های WebdriverIO [options](/docs/configuration) بسته به نحوه ایجاد شیء مرورگر. بیشتر ببینید در [انواع راه‌اندازی](/docs/setuptypes). |
| `commandList` | `String[]` | لیستی از دستورات ثبت شده در نمونه مرورگر |
| `isW3C` | `Boolean` | نشان می‌دهد که آیا این یک جلسه W3C است یا خیر |
| `isChrome` | `Boolean` | نشان می‌دهد که آیا این نمونه Chrome است یا خیر |
| `isFirefox` | `Boolean` | نشان می‌دهد که آیا این نمونه Firefox است یا خیر |
| `isBidi` | `Boolean` | نشان می‌دهد که آیا این جلسه از Bidi استفاده می‌کند یا خیر |
| `isSauce` | `Boolean` | نشان می‌دهد که آیا این جلسه در Sauce Labs اجرا می‌شود یا خیر |
| `isMacApp` | `Boolean` | نشان می‌دهد که آیا این جلسه برای یک برنامه بومی Mac اجرا می‌شود یا خیر |
| `isWindowsApp` | `Boolean` | نشان می‌دهد که آیا این جلسه برای یک برنامه بومی Windows اجرا می‌شود یا خیر |
| `isMobile` | `Boolean` | نشان‌دهنده یک جلسه موبایل است. بیشتر در [پرچم‌های موبایل](#mobile-flags) ببینید. |
| `isIOS` | `Boolean` | نشان‌دهنده یک جلسه iOS است. بیشتر در [پرچم‌های موبایل](#mobile-flags) ببینید. |
| `isAndroid` | `Boolean` | نشان‌دهنده یک جلسه Android است. بیشتر در [پرچم‌های موبایل](#mobile-flags) ببینید. |
| `isNativeContext` | `Boolean`  | نشان می‌دهد که آیا موبایل در زمینه `NATIVE_APP` است یا خیر. بیشتر در [پرچم‌های موبایل](#mobile-flags) ببینید. |
| `mobileContext` | `string`  | زمینه **فعلی** که راننده در آن قرار دارد را ارائه می‌دهد، مثلاً `NATIVE_APP`، `WEBVIEW_<packageName>` برای Android یا `WEBVIEW_<pid>` برای iOS. این مقدار یک WebDriver اضافی را در `driver.getContext()` ذخیره می‌کند. بیشتر در [پرچم‌های موبایل](#mobile-flags) ببینید. |


## متدها

بر اساس پشتیبان اتوماسیون مورد استفاده برای جلسه شما، WebdriverIO شناسایی می‌کند کدام [دستورات پروتکل](/docs/api/protocols) به [شیء مرورگر](/docs/api/browser) پیوست خواهد شد. برای مثال، اگر یک جلسه اتوماسیون را در Chrome اجرا کنید، به دستورات خاص Chromium مانند [`elementHover`](/docs/api/chromium#elementhover) دسترسی خواهید داشت، اما به هیچ یک از [دستورات Appium](/docs/api/appium) دسترسی نخواهید داشت.

علاوه بر این، WebdriverIO مجموعه‌ای از متدهای راحت را فراهم می‌کند که توصیه می‌شود برای تعامل با [مرورگر](/docs/api/browser) یا [عناصر](/docs/api/element) در صفحه از آنها استفاده کنید.

علاوه بر این، دستورات زیر در دسترس هستند:

| نام | پارامترها | جزئیات |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (نوع: `String`)<br />- `fn` (نوع: `Function`)<br />- `attachToElement` (نوع: `boolean`) | به شما امکان تعریف دستورات سفارشی را می‌دهد که می‌توانند از شیء مرورگر برای اهداف ترکیبی فراخوانی شوند. بیشتر در راهنمای [دستور سفارشی](/docs/customcommands) بخوانید. |
| `overwriteCommand` | - `commandName` (نوع: `String`)<br />- `fn` (نوع: `Function`)<br />- `attachToElement` (نوع: `boolean`) | امکان بازنویسی هر دستور مرورگر با عملکرد سفارشی را فراهم می‌کند. با دقت استفاده کنید زیرا ممکن است کاربران چارچوب را گیج کند. بیشتر در راهنمای [دستور سفارشی](/docs/customcommands#overwriting-native-commands) بخوانید. |
| `addLocatorStrategy` | - `strategyName` (نوع: `String`)<br />- `fn` (نوع: `Function`) | امکان تعریف یک استراتژی انتخاب‌گر سفارشی را فراهم می‌کند، بیشتر در راهنمای [انتخاب‌گرها](/docs/selectors#custom-selector-strategies) بخوانید. |

## نکات

### پرچم‌های موبایل

اگر نیاز دارید آزمون خود را بر اساس اینکه جلسه شما روی دستگاه موبایل اجرا می‌شود یا خیر تغییر دهید، می‌توانید به پرچم‌های موبایل دسترسی پیدا کرده و آنها را بررسی کنید.

برای مثال، با توجه به این پیکربندی:

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

می‌توانید در آزمون خود به این پرچم‌ها به این صورت دسترسی پیدا کنید:

```js
// توجه: `driver` معادل شیء `browser` است اما از نظر معنایی صحیح‌تر است
// می‌توانید انتخاب کنید که از کدام متغیر سراسری می‌خواهید استفاده کنید
console.log(driver.isMobile) // خروجی: true
console.log(driver.isIOS) // خروجی: true
console.log(driver.isAndroid) // خروجی: false
```

این می‌تواند مفید باشد اگر، برای مثال، می‌خواهید انتخاب‌گرها را در [اشیاء صفحه](../pageobjects) خود بر اساس نوع دستگاه تعریف کنید، مانند این:

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

همچنین می‌توانید از این پرچم‌ها برای اجرای آزمون‌های خاص فقط برای انواع خاصی از دستگاه‌ها استفاده کنید:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // فقط آزمون را با دستگاه‌های Android اجرا کنید
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### رویدادها
شیء مرورگر یک EventEmitter است و چندین رویداد برای موارد استفاده شما منتشر می‌شود.

در اینجا لیستی از رویدادها آمده است. به یاد داشته باشید که این لیست کامل رویدادهای موجود نیست.
لطفاً برای به‌روزرسانی سند با افزودن توضیحات بیشتر رویدادها در اینجا مشارکت کنید.

#### `command`

این رویداد هر زمان که WebdriverIO یک دستور WebDriver کلاسیک ارسال می‌کند، منتشر می‌شود. شامل اطلاعات زیر است:

- `command`: نام دستور، مثلاً `navigateTo`
- `method`: روش HTTP مورد استفاده برای ارسال درخواست دستور، مثلاً `POST`
- `endpoint`: نقطه پایانی دستور، مثلاً `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: پیام‌رسانی دستور، مثلاً `{ url: 'https://webdriver.io' }`

#### `result`

این رویداد هر زمان که WebdriverIO نتیجه یک دستور WebDriver کلاسیک را دریافت می‌کند، منتشر می‌شود. شامل همان اطلاعات رویداد `command` به همراه اطلاعات زیر است:

- `result`: نتیجه دستور

#### `bidiCommand`

این رویداد هر زمان که WebdriverIO یک دستور WebDriver Bidi به راننده مرورگر ارسال می‌کند، منتشر می‌شود. شامل اطلاعاتی درباره:

- `method`: روش دستور WebDriver Bidi
- `params`: پارامتر دستور مرتبط (به [API](/docs/api/webdriverBidi) مراجعه کنید)

#### `bidiResult`

در صورت اجرای موفقیت‌آمیز دستور، محتوای رویداد به شرح زیر خواهد بود:

- `type`: `success`
- `id`: شناسه دستور
- `result`: نتیجه دستور (به [API](/docs/api/webdriverBidi) مراجعه کنید)

در صورت بروز خطا در دستور، محتوای رویداد به شرح زیر خواهد بود:

- `type`: `error`
- `id`: شناسه دستور
- `error`: کد خطا، مثلاً `invalid argument`
- `message`: جزئیات خطا
- `stacktrace`: پشته فراخوانی

#### `request.start`
این رویداد قبل از ارسال درخواست WebDriver به راننده فعال می‌شود. حاوی اطلاعاتی درباره درخواست و محتوای آن است.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
این رویداد پس از دریافت پاسخ به درخواست راننده فعال می‌شود. شیء رویداد یا شامل بدنه پاسخ به عنوان نتیجه است یا در صورت شکست دستور WebDriver، شامل خطا می‌شود.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
رویداد تلاش مجدد می‌تواند شما را از تلاش WebdriverIO برای اجرای مجدد دستور، مثلاً به دلیل مشکل شبکه، مطلع کند. این رویداد شامل اطلاعاتی درباره خطایی است که باعث تلاش مجدد شده و تعداد تلاش‌های مجدد انجام شده است.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
این رویدادی برای اندازه‌گیری عملیات سطح WebDriver است. هر زمان که WebdriverIO درخواستی به بک‌اند WebDriver ارسال می‌کند، این رویداد با اطلاعات مفیدی منتشر می‌شود:

- `durationMillisecond`: مدت زمان درخواست به میلی‌ثانیه.
- `error`: شیء خطا در صورت شکست درخواست.
- `request`: شیء درخواست. می‌توانید URL، روش، هدرها و غیره را پیدا کنید.
- `retryCount`: اگر `0` باشد، درخواست اولین تلاش بود. هنگامی که WebDriverIO به صورت داخلی تلاش مجدد می‌کند، افزایش می‌یابد.
- `success`: مقدار بولی برای نشان دادن موفقیت یا عدم موفقیت درخواست. اگر `false` باشد، خاصیت `error` نیز ارائه خواهد شد.

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

می‌توانید دستورات سفارشی را در محدوده مرورگر تنظیم کنید تا جریان‌های کاری که معمولاً استفاده می‌شوند را انتزاعی کنید. برای اطلاعات بیشتر به راهنمای ما در مورد [دستورات سفارشی](/docs/customcommands#adding-custom-commands) مراجعه کنید.
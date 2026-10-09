---
id: emulation
title: شبیه‌سازی
description: "شبیه‌سازی موقعیت جغرافیایی، ویژگی‌های رسانه، user agent، شبکه، locale، منطقه زمانی، صفحه نمایش و دستگاه‌ها با دستور emulate."
---

با WebdriverIO می‌توانید رفتار مرورگر را با استفاده از دستور [`emulate`](/docs/api/browser/emulate) شبیه‌سازی کنید. این دستور [ماژول emulation در WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-emulation) را برای browsing context سطح بالای فعلی به کار می‌گیرد. تغییرات بلافاصله اعمال می‌شوند و نیازی به بارگذاری مجدد صفحه ندارید. `clock` یک استثنا است: BiDi دستوری برای ساعت ندارد، بنابراین این حوزه همچنان تایمرهای جعلی نصب می‌کند.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

این قابلیت نیازمند پشتیبانی مرورگر از WebDriver Bidi است. در حالی که نسخه‌های اخیر Chrome، Edge و Firefox از آن پشتیبانی می‌کنند، Safari __پشتیبانی نمی‌کند__. برای اطلاع از به‌روزرسانی‌ها [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned) را دنبال کنید. همچنین اگر از یک ارائه‌دهنده ابری برای راه‌اندازی مرورگرها استفاده می‌کنید، مطمئن شوید که ارائه‌دهنده شما نیز از WebDriver Bidi پشتیبانی می‌کند.

برای فعال‌سازی WebDriver Bidi در تست خود، مطمئن شوید که `webSocketUrl: true` را در capabilities خود تنظیم کرده‌اید.

مرورگری که یک دستور را پیاده‌سازی نکرده باشد، فراخوانی را با خطای خودش، یعنی `unknown command` یا `unsupported operation`، رد می‌کند. WebdriverIO همان خطا را برمی‌گرداند و به preload script یا CDP بازنمی‌گردد.

:::

`emulate` تابعی را برمی‌گرداند که آن حوزه را پاک می‌کند. [`browser.restore()`](/docs/api/browser/restore) تمام حوزه‌های فعال، یا حوزه‌هایی را که فهرست می‌کنید، پاک می‌کند.

## موقعیت جغرافیایی

موقعیت جغرافیایی مرورگر را به یک منطقه خاص تغییر دهید، به عنوان مثال:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

این روش از پشته موقعیت جغرافیایی مرورگر، از جمله `getCurrentPosition` و `watchPosition`، استفاده می‌کند. ممکن است همچنان لازم باشد که مجوز geolocation به صفحه داده شود، همان‌طور که در مثال آمده است. فیلدهای اختیاری عبارتند از `accuracy`، `altitude`، `altitudeAccuracy`، `heading` و `speed`.

برای اینکه صفحه در خواندن موقعیت ناموفق باشد:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## طرح رنگی و سایر ویژگی‌های رسانه

ویژگی رسانه `prefers-color-scheme` را تغییر دهید:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // outputs: "#000000"
```

این کار CSS `@media (prefers-color-scheme)` و همچنین [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) را به‌روزرسانی می‌کند. نیازی به بارگذاری مجدد نیست.

`media` بقیه نقشه ویژگی‌های رسانه را تنظیم می‌کند، برای مثال کاهش حرکت:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` و `media` یک نقشه مشترک دارند. دستور BiDi کل نقشه را جایگزین می‌کند، بنابراین فراخوانی بعدی اعمال می‌شود. بازگردانی هر یک از این دو حوزه، نقشه را پاک می‌کند.

`forcedColors` دستور متفاوتی است. این دستور تم forced-colors (`'light'` یا `'dark'`) را تنظیم می‌کند، نه ویژگی رسانه `forced-colors` را. آن ویژگی رسانه در `media` به صورت `forcedColors: 'none' | 'active'` باقی می‌ماند.

## User Agent

user agent مرورگر را از طریق زیر تغییر دهید:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

این همان بازنویسی user agent توسط خود مرورگر است، نه یک ویژگی `navigator.userAgent` وصله‌شده. سازندگان مرورگرها به تدریج User Agent را منسوخ می‌کنند.

## وضعیت آنلاین

browsing context را آفلاین کنید:

```ts
await browser.emulate('onLine', false)
```

مقدار `false` دستور `emulation.setNetworkConditions` را با `{ type: 'offline' }` ارسال می‌کند. Fetch، WebSocket و WebTransport با شکست مواجه می‌شوند و [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) نیز از آن پیروی می‌کند. مقدار `true` و همچنین بازگردانی این حوزه، این شرایط را پاک می‌کند. توان عملیاتی و تأخیر همچنان از طریق [`throttleNetwork`](/docs/api/browser/throttleNetwork) کنترل می‌شوند. شرایط شبکه در BiDi فقط از حالت آفلاین پشتیبانی می‌کند.

## Locale، منطقه زمانی و لمس

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` یک برچسب BCP 47 است. `timezone` یک نام IANA یا یک آفست مانند `+02:00` است. `touch` همان `maxTouchPoints` است و باید یک عدد صحیح `>= 1` باشد. بازگردانی `touch` این بازنویسی را پاک می‌کند. نمی‌توان آن را روی `0` تنظیم کرد.

## صفحه نمایش، جهت و چیدمان

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` ناحیه صفحه نمایشی است که در وب در دسترس قرار می‌گیرد، نه viewport. `orientation.natural` یکی از مقادیر `'portrait'` یا `'landscape'` است. `orientation.type` یکی از مقادیر `'portrait-primary'`، `'portrait-secondary'`، `'landscape-primary'` یا `'landscape-secondary'` است.

`viewportMeta` فقط مقدار `true` را می‌پذیرد. مقدار تعریف‌شده در مشخصات `true | null` است، بنابراین `false` وجود ندارد. بازگردانی آن را پاک می‌کند. `textLayout` فقط مقدار `'mobile'` را می‌پذیرد. `scripting` فقط می‌تواند غیرفعال شود؛ مشخصات امکان اجبار به فعال بودن اسکریپت را ندارد. `scrollbar` یکی از مقادیر `'classic'` یا `'overlay'` است.

## ساعت

می‌توانید ساعت سیستم مرورگر را با استفاده از دستور [`emulate`](/docs/emulation) تغییر دهید. این دستور توابع سراسری بومی مرتبط با زمان را بازنویسی می‌کند و امکان کنترل همزمان آن‌ها را از طریق `clock.tick()` یا شیء ساعت برگردانده‌شده فراهم می‌کند. این شامل کنترل موارد زیر است:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

ساعت از مبدأ زمانی یونیکس (timestamp برابر با 0) شروع می‌شود. این بدان معناست که وقتی در برنامه خود یک new Date ایجاد می‌کنید، اگر گزینه دیگری به دستور `emulate` ندهید، زمان آن اول ژانویه ۱۹۷۰ خواهد بود.

##### مثال

هنگام فراخوانی `browser.emulate('clock', { ... })`، توابع سراسری برای صفحه فعلی و همچنین تمام صفحات بعدی بلافاصله بازنویسی می‌شوند، به عنوان مثال:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

می‌توانید زمان سیستم را با فراخوانی [`setSystemTime`](/docs/api/clock/setSystemTime) یا [`tick`](/docs/api/clock/tick) تغییر دهید.

شیء `FakeTimerInstallOpts` می‌تواند ویژگی‌های زیر را داشته باشد:

 ```ts
interface FakeTimerInstallOpts {
    // تایمرهای جعلی را با مبدأ زمانی یونیکس مشخص‌شده نصب می‌کند
    // @default: 0
    now?: number | Date | undefined;

    // آرایه‌ای از نام متدها و APIهای سراسری که باید جعل شوند. به طور پیش‌فرض، WebdriverIO
    // توابع `nextTick()` و `queueMicrotask()` را جایگزین نمی‌کند. برای مثال،
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` فقط
    // `setTimeout()` و `nextTick()` را جعل می‌کند
    toFake?: FakeMethod[] | undefined;

    // حداکثر تعداد تایمرهایی که هنگام فراخوانی runAll() اجرا می‌شوند (پیش‌فرض: 1000)
    loopLimit?: number | undefined;

    // به WebdriverIO می‌گوید که زمان شبیه‌سازی‌شده را به طور خودکار بر اساس تغییر زمان
    // واقعی سیستم افزایش دهد (مثلاً زمان شبیه‌سازی‌شده به ازای هر 20 میلی‌ثانیه تغییر
    // در زمان واقعی سیستم، 20 میلی‌ثانیه افزایش می‌یابد)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // فقط هنگام استفاده با shouldAdvanceTime: true کاربرد دارد. زمان شبیه‌سازی‌شده را به ازای
    // هر advanceTimeDelta میلی‌ثانیه تغییر در زمان واقعی سیستم، advanceTimeDelta میلی‌ثانیه افزایش می‌دهد
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // به FakeTimers می‌گوید که تایمرهای «بومی» (یعنی غیرجعلی) را با واگذاری به
    // handlerهای مربوطه پاک کند. این تایمرها به طور پیش‌فرض پاک نمی‌شوند، که در صورت وجود
    // تایمرها پیش از نصب FakeTimers ممکن است منجر به رفتار غیرمنتظره شود.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## دستگاه

دستور `emulate` همچنین از شبیه‌سازی یک دستگاه موبایل یا دسکتاپ خاص پشتیبانی می‌کند. این قابلیت به هیچ وجه نباید برای تست موبایل استفاده شود، زیرا موتورهای مرورگر دسکتاپ با موتورهای موبایل تفاوت دارند. این قابلیت فقط باید زمانی استفاده شود که برنامه شما رفتار خاصی برای اندازه‌های کوچک‌تر viewport ارائه می‌دهد.

برای یک دستگاه، WebdriverIO:

- user agent را از روی descriptor تنظیم می‌کند
- viewport و ضریب مقیاس دستگاه را تنظیم می‌کند
- در صورتی که descriptor قابلیت لمس داشته باشد، `maxTouchPoints` را روی `1` تنظیم می‌کند و در غیر این صورت لمس را پاک می‌کند
- در صورتی که descriptor موبایل باشد، چیدمان متن موبایل و تگ viewport meta را تنظیم می‌کند و در غیر این صورت آن‌ها را پاک می‌کند

این دستور اندازه صفحه نمایش یا جهت را از روی نام دستگاه حدس نمی‌زند. viewport همان `screen.width` نیست. برای این موارد از حوزه‌های `screen` و `orientation` استفاده کنید.

تغییر viewport به context سطح بالایی ارسال می‌شود که هنگام فراخوانی `emulate` فعال بوده است. بازگردانی دستگاه، اندازه همان context را تغییر می‌دهد، حتی پس از جابه‌جایی به پنجره‌ای دیگر.

اگر مرورگر یکی از این دستورات را رد کند، user agent، viewport، لمس، چیدمان متن و viewport meta قبلی بازگردانده می‌شوند و خطا برگردانده می‌شود. یک user agent سفارشی یا اندازه تنظیم‌شده با `setViewport` با مقدار پیش‌فرض جایگزین نمی‌شود.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// برنامه خود را تست کنید ...

// بازنشانی user agent، viewport، لمس، چیدمان متن و viewport meta
await restore()
```

WebdriverIO فهرست ثابتی از [تمام دستگاه‌های تعریف‌شده](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts) را نگهداری می‌کند.
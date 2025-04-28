---
id: emulation
title: شبیه‌سازی
---

با WebdriverIO می‌توانید APIهای وب را با استفاده از دستور [`emulate`](/docs/api/browser/emulate) شبیه‌سازی کنید تا مقادیر سفارشی را برگردانید که به شما در شبیه‌سازی رفتارهای خاص مرورگر کمک می‌کند. توجه داشته باشید که این کار نیازمند استفاده صریح برنامه شما از این APIهاست.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

این ویژگی نیازمند پشتیبانی WebDriver Bidi برای مرورگر است. در حالی که نسخه‌های اخیر Chrome، Edge و Firefox از این ویژگی پشتیبانی می‌کنند، Safari __پشتیبانی نمی‌کند__. برای به‌روزرسانی‌ها [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned) را دنبال کنید. همچنین اگر از یک ارائه‌دهنده ابری برای اجرای مرورگرها استفاده می‌کنید، مطمئن شوید که ارائه‌دهنده شما نیز از WebDriver Bidi پشتیبانی می‌کند.

برای فعال‌سازی WebDriver Bidi برای تست خود، مطمئن شوید که `webSocketUrl: true` در capabilities شما تنظیم شده است.

:::

## موقعیت جغرافیایی

تغییر موقعیت جغرافیایی مرورگر به یک منطقه خاص، به عنوان مثال:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

این کار نحوه عملکرد [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) را تغییر می‌دهد و موقعیت ارائه شده توسط شما را برمی‌گرداند.

## طرح رنگ

تغییر تنظیم پیش‌فرض طرح رنگ مرورگر از طریق:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

این کار نحوه رفتار [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) را هنگام استعلام طرح رنگ از طریق `(prefers-color-scheme: dark)` تغییر می‌دهد.

## عامل کاربر

تغییر عامل کاربر مرورگر به یک رشته متفاوت از طریق:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

این کار مقدار [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) را تغییر می‌دهد. توجه داشته باشید که ارائه‌دهندگان مرورگر به تدریج عامل کاربر را منسوخ می‌کنند.

## ویژگی onLine

تغییر وضعیت آنلاین مرورگر از طریق:

```ts
await browser.emulate('onLine', false)
```

این کار ترافیک شبکه بین مرورگر و اینترنت را __غیرفعال نمی‌کند__ و فقط مقدار برگشتی [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) را تغییر می‌دهد. اگر به تغییر قابلیت‌های شبکه مرورگر علاقه‌مند هستید، به دستور [`throttleNetwork`](/docs/api/browser/throttleNetwork) نگاهی بیندازید.

## ساعت

می‌توانید ساعت سیستم مرورگر را با استفاده از دستور [`emulate`](/docs/emulation) تغییر دهید. این کار توابع جهانی مرتبط با زمان را بازنویسی می‌کند و به شما اجازه می‌دهد تا آن‌ها را به صورت همزمان از طریق `clock.tick()` یا شیء ساعت ایجاد شده کنترل کنید. این شامل کنترل موارد زیر است:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

ساعت از مبدأ یونیکس (timestamp از 0) شروع می‌شود. این بدان معناست که وقتی شما یک شیء Date جدید در برنامه خود ایجاد می‌کنید، اگر گزینه‌های دیگری به دستور `emulate` ارسال نکنید، زمان آن ۱ ژانویه ۱۹۷۰ خواهد بود.

##### مثال

هنگام فراخوانی `browser.emulate('clock', { ... })` فوراً توابع جهانی را برای صفحه فعلی و همه صفحات بعدی بازنویسی می‌کند، به عنوان مثال:

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

شیء `FakeTimerInstallOpts` می‌تواند دارای ویژگی‌های زیر باشد:

```ts
interface FakeTimerInstallOpts {
    // تایمرهای جعلی را با مبدأ یونیکس مشخص شده نصب می‌کند
    // @default: 0
    now?: number | Date | undefined;

    // آرایه‌ای با نام‌های متدها و APIهای جهانی برای جعل کردن. به طور پیش‌فرض، WebdriverIO
    // `nextTick()` و `queueMicrotask()` را جایگزین نمی‌کند. به عنوان مثال،
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` فقط
    // `setTimeout()` و `nextTick()` را جعل می‌کند
    toFake?: FakeMethod[] | undefined;

    // حداکثر تعداد تایمرهایی که هنگام فراخوانی runAll() اجرا می‌شوند (پیش‌فرض: 1000)
    loopLimit?: number | undefined;

    // به WebdriverIO می‌گوید که زمان جعلی را بر اساس تغییر زمان واقعی سیستم
    // به طور خودکار افزایش دهد (به عنوان مثال، زمان جعلی برای هر 20 میلی‌ثانیه تغییر
    // در زمان واقعی سیستم، 20 میلی‌ثانیه افزایش می‌یابد)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // فقط در صورت استفاده با shouldAdvanceTime: true مربوط است. زمان جعلی را
    // برای هر advanceTimeDelta میلی‌ثانیه تغییر در زمان واقعی سیستم، به میزان advanceTimeDelta میلی‌ثانیه افزایش می‌دهد
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // به FakeTimers می‌گوید که تایمرهای 'بومی' (یعنی جعلی نیستند) را با ارجاع به
    // کنترل‌کننده‌های مربوطه پاک کند. این موارد به صورت پیش‌فرض پاک نمی‌شوند، که منجر به
    // رفتار غیرمنتظره می‌شود اگر تایمرها قبل از نصب FakeTimers وجود داشته باشند.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## دستگاه

دستور `emulate` همچنین از شبیه‌سازی یک دستگاه خاص موبایل یا دسکتاپ با تغییر نمایش، ضریب مقیاس دستگاه و عامل کاربر پشتیبانی می‌کند. این به هیچ وجه نباید برای تست موبایل استفاده شود زیرا موتورهای مرورگر دسکتاپ با موتورهای موبایل متفاوت هستند. این فقط باید در صورتی استفاده شود که برنامه شما رفتار خاصی برای اندازه‌های نمایش کوچکتر ارائه می‌دهد.

به عنوان مثال، برای تغییر عامل کاربر و نمای iPhone 15، فقط اجرا کنید:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO یک لیست ثابت از [تمام دستگاه‌های تعریف شده](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts) را نگهداری می‌کند.
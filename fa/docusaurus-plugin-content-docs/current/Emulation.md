---
id: emulation
title: شبیه‌سازی
---

با WebdriverIO شما می‌توانید API‌های وب را با استفاده از دستور [`emulate`](/docs/api/browser/emulate) شبیه‌سازی کنید تا مقادیر سفارشی را برگردانید که به شما کمک می‌کند رفتارهای خاص مرورگر را شبیه‌سازی کنید. توجه داشته باشید که این امر مستلزم استفاده صریح برنامه شما از این API‌ها است.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

این ویژگی نیازمند پشتیبانی WebDriver Bidi برای مرورگر است. در حالی که نسخه‌های اخیر Chrome، Edge و Firefox چنین پشتیبانی دارند، Safari __از آن پشتیبانی نمی‌کند__. برای به‌روزرسانی‌ها، [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned) را دنبال کنید. علاوه بر این اگر از یک ارائه‌دهنده خدمات ابری برای راه‌اندازی مرورگرها استفاده می‌کنید، مطمئن شوید که ارائه‌دهنده شما نیز از WebDriver Bidi پشتیبانی می‌کند.

برای فعال‌سازی WebDriver Bidi برای آزمایش خود، مطمئن شوید که `webSocketUrl: true` در قابلیت‌های خود تنظیم شده است.

:::

## موقعیت جغرافیایی

موقعیت جغرافیایی مرورگر را به منطقه خاصی تغییر دهید، به عنوان مثال:

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

تنظیمات پیش‌فرض طرح رنگ مرورگر را از طریق زیر تغییر دهید:

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

این کار نحوه رفتار [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) را هنگام پرس‌وجوی طرح رنگ از طریق `(prefers-color-scheme: dark)` تغییر می‌دهد.

## کارگزار کاربر

کارگزار کاربر مرورگر را به رشته متفاوتی تغییر دهید:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

این کار مقدار [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) را تغییر می‌دهد. توجه داشته باشید که فروشندگان مرورگر به تدریج استفاده از User Agent را منسوخ می‌کنند.

## ویژگی onLine

وضعیت آنلاین مرورگر را از طریق زیر تغییر دهید:

```ts
await browser.emulate('onLine', false)
```

این کار ترافیک شبکه بین مرورگر و اینترنت را خاموش __نمی‌کند__ و فقط مقدار بازگشتی [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) را تغییر می‌دهد. اگر علاقه‌مند به تغییر قابلیت‌های شبکه مرورگر هستید، دستور [`throttleNetwork`](/docs/api/browser/throttleNetwork) را ببینید.

## ساعت

شما می‌توانید ساعت سیستم مرورگر را با استفاده از دستور [`emulate`](/docs/emulation) تغییر دهید. این دستور توابع جهانی مربوط به زمان را بازنویسی می‌کند و اجازه می‌دهد که به صورت همزمان از طریق `clock.tick()` یا شی ساعت تولید شده کنترل شوند. این شامل کنترل موارد زیر است:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

ساعت از اپوک یونیکس (timestamp برابر با 0) شروع می‌شود. این بدان معناست که وقتی یک Date جدید در برنامه خود ایجاد می‌کنید، زمان آن ۱ ژانویه ۱۹۷۰ خواهد بود اگر گزینه دیگری به دستور `emulate` ارسال نکنید.

##### مثال

هنگام فراخوانی `browser.emulate('clock', { ... })` بلافاصله توابع جهانی برای صفحه فعلی و همچنین همه صفحات بعدی بازنویسی می‌شوند، به عنوان مثال:

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

شما می‌توانید زمان سیستم را با فراخوانی [`setSystemTime`](/docs/api/clock/setSystemTime) یا [`tick`](/docs/api/clock/tick) تغییر دهید.

شی `FakeTimerInstallOpts` می‌تواند خصوصیات زیر را داشته باشد:

```ts
interface FakeTimerInstallOpts {
    // تایمرهای جعلی را با اپوک یونیکس مشخص شده نصب می‌کند
    // @default: 0
    now?: number | Date | undefined;

    // آرایه‌ای با نام‌های متدها و API‌های جهانی برای جعل کردن. به طور پیش‌فرض، WebdriverIO
    // `nextTick()` و `queueMicrotask()` را جایگزین نمی‌کند. به عنوان مثال،
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` فقط
    // `setTimeout()` و `nextTick()` را جعل می‌کند
    toFake?: FakeMethod[] | undefined;

    // حداکثر تعداد تایمرهایی که هنگام فراخوانی runAll() اجرا می‌شوند (پیش‌فرض: 1000)
    loopLimit?: number | undefined;

    // به WebdriverIO می‌گوید که زمان جعلی را به طور خودکار براساس تغییر زمان واقعی سیستم
    // افزایش دهد (به عنوان مثال، زمان جعلی به ازای هر 20ms تغییر در زمان واقعی سیستم،
    // 20ms افزایش می‌یابد)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // فقط هنگام استفاده با shouldAdvanceTime: true مرتبط است. زمان جعلی را با
    // advanceTimeDelta میلی‌ثانیه به ازای هر تغییر advanceTimeDelta میلی‌ثانیه در زمان واقعی سیستم افزایش می‌دهد
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // به FakeTimers می‌گوید تایمرهای 'بومی' (یعنی غیرجعلی) را با واگذاری به
    // مدیران مربوطه پاک کند. اینها به طور پیش‌فرض پاک نمی‌شوند، که منجر به رفتارهای
    // غیرمنتظره می‌شود اگر تایمرها قبل از نصب FakeTimers وجود داشته باشند.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## دستگاه

دستور `emulate` همچنین از شبیه‌سازی یک دستگاه موبایل یا دسکتاپ خاص با تغییر viewport، عامل مقیاس دستگاه و کارگزار کاربر پشتیبانی می‌کند. این به هیچ وجه نباید برای آزمایش موبایل استفاده شود زیرا موتورهای مرورگر دسکتاپ با موبایل متفاوت هستند. این فقط باید در صورتی استفاده شود که برنامه شما رفتاری خاص برای اندازه‌های viewport کوچکتر ارائه می‌دهد.

به عنوان مثال، برای تغییر کارگزار کاربر و viewport به iPhone 15، فقط اجرا کنید:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO لیست ثابتی از [تمام دستگاه‌های تعریف شده](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts) را نگهداری می‌کند.
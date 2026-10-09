---
id: mocksandspies
title: ماک‌ها و جاسوس‌های درخواست
description: "درخواست‌ها و پاسخ‌های شبکه را در تست‌های خود با browser.mock ماک کنید، درخواست‌ها را لغو کنید و فراخوانی‌ها را با جاسوس‌ها بررسی کنید."
---

WebdriverIO دارای پشتیبانی داخلی برای تغییر پاسخ‌های شبکه است که به شما امکان می‌دهد بدون نیاز به راه‌اندازی بک‌اند یا یک سرور ماک، روی تست برنامه فرانت‌اند خود تمرکز کنید. می‌توانید پاسخ‌های سفارشی برای منابع وب مانند درخواست‌های REST API را در تست خود تعریف کرده و آن‌ها را به صورت پویا تغییر دهید.

:::info

توجه داشته باشید که استفاده از دستور `mock` نیازمند پشتیبانی از WebDriver Bidi است. این معمولاً هنگام اجرای تست‌ها به صورت محلی در یک مرورگر مبتنی بر Chromium یا در Firefox و همچنین در صورت استفاده از Selenium Grid نسخه 4 یا بالاتر برقرار است. اگر تست‌ها را در فضای ابری اجرا می‌کنید، مطمئن شوید که ارائه‌دهنده خدمات ابری شما از WebDriver Bidi پشتیبانی می‌کند.

:::

## ایجاد یک ماک

قبل از اینکه بتوانید هر پاسخی را تغییر دهید، ابتدا باید یک ماک تعریف کنید. این ماک با آدرس url منبع توصیف می‌شود و می‌توان آن را بر اساس [متد درخواست](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) یا [هدرها](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) فیلتر کرد. تطبیق منبع با استفاده از یک [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) انجام می‌شود، که در آن `*` با هر دنباله‌ای از کاراکترها مطابقت دارد. یک url بدون پروتکل فقط با مسیر درخواست تطبیق داده می‌شود، بنابراین `*/users/list` با آن مسیر در هر مبدأیی مطابقت دارد:

```js
// ماک کردن همه منابعی که با "/users/list" پایان می‌یابند
const userListMock = await browser.mock('*/users/list')

// یا می‌توانید ماک را با فیلتر کردن منابع بر اساس هدرها یا
// کد وضعیت مشخص کنید، فقط درخواست‌های موفق به منابع json را ماک کنید
const strictMock = await browser.mock('*', {
    // ماک کردن همه پاسخ‌های json
    requestHeaders: { 'Content-Type': 'application/json' },
    // که موفقیت‌آمیز بوده‌اند
    statusCode: 200
})

// به جای یک رشته می‌توانید یک `URLPattern` نیز ارسال کنید؛ این polyfill
// در محیط‌های اجرایی بدون پشتیبانی بومی از URLPattern نیز کار می‌کند
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

برای وایلدکاردهای URL از یک `*` تکی استفاده کنید؛ این کاراکتر با `/` نیز مطابقت دارد. وایلدکاردهای متوالی قبل از متن ثابت، مانند `**/api/**` یا `**/data.json`، می‌توانند باعث backtracking بیش از حد regex روی URLهای نامرتبط شده و تست را متوقف (فریز) کنند. به [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548) مراجعه کنید. در تست‌های کامپوننت، همچنین از یک پروتکل و نام میزبان ثابت استفاده کنید تا ترافیک اجراکننده خارج از رهگیری باقی بماند؛ به [ماک‌های درخواست در تست کامپوننت](/docs/component-testing/mocking#requests) مراجعه کنید.

:::

## تعیین پاسخ‌های سفارشی

پس از تعریف یک ماک، می‌توانید پاسخ‌های سفارشی برای آن تعریف کنید. این پاسخ‌های سفارشی می‌توانند یک شیء برای پاسخ دادن با JSON، یک فایل محلی برای پاسخ دادن با یک fixture سفارشی، یا یک منبع وب برای جایگزینی پاسخ با منبعی از اینترنت باشند.

### ماک کردن درخواست‌های API

برای ماک کردن درخواست‌های API که انتظار پاسخ JSON از آن‌ها دارید، تنها کاری که باید انجام دهید این است که `respond` را روی شیء ماک با یک شیء دلخواه که می‌خواهید برگردانده شود فراخوانی کنید، به عنوان مثال:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// خروجی: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

همچنین می‌توانید هدرهای پاسخ و نیز کد وضعیت را با ارسال برخی پارامترهای پاسخ ماک به صورت زیر تغییر دهید:

```js
mock.respond({ ... }, {
    // پاسخ با کد وضعیت 404
    statusCode: 404,
    // ادغام هدرهای پاسخ با هدرهای زیر
    headers: { 'x-custom-header': 'foobar' }
})
```

اگر می‌خواهید ماک اصلاً بک‌اند را فراخوانی نکند، می‌توانید مقدار `false` را برای پرچم `fetchResponse` ارسال کنید.

```js
mock.respond({ ... }, {
    // بک‌اند واقعی را فراخوانی نکن
    fetchResponse: false
})
```

`fetchResponse: false` هرگز بک‌اند را فراخوانی نمی‌کند. ماکی که با فیلتر `statusCode` یا `responseHeaders` ایجاد شده باشد، برای تصمیم‌گیری درباره تطبیق به آن پاسخ نیاز دارد، بنابراین اگر آن‌ها را با هم ترکیب کنید، `respond()` و `respondOnce()` خطا پرتاب می‌کنند. فیلتر پاسخ را حذف کنید، یا `fetchResponse` را تنظیم نکنید تا ماک بتواند پاسخ بک‌اند را بخواند و سپس آن را جایگزین کند.

توصیه می‌شود پاسخ‌های سفارشی را در فایل‌های fixture ذخیره کنید تا بتوانید به سادگی آن‌ها را در تست خود به صورت زیر require کنید:

```js
// برای پشتیبانی از JSON import assertions به Node.js نسخه v16.14.0 یا بالاتر نیاز است
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### ماک کردن منابع متنی

اگر می‌خواهید منابع متنی مانند JavaScript، فایل‌های CSS یا سایر منابع مبتنی بر متن را تغییر دهید، می‌توانید به سادگی یک مسیر فایل ارسال کنید و WebdriverIO منبع اصلی را با آن جایگزین می‌کند، به عنوان مثال:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// یا با JS سفارشی خود پاسخ دهید
scriptMock.respond('alert("I am a mocked resource")')
```

### تغییر مسیر منابع وب

اگر پاسخ مورد نظر شما از قبل روی وب میزبانی شده است، می‌توانید به سادگی یک منبع وب را با منبع وب دیگری جایگزین کنید. این کار هم با منابع جداگانه صفحه و هم با خود یک صفحه وب کار می‌کند، به عنوان مثال:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### پاسخ‌های پویا

اگر پاسخ ماک شما به پاسخ منبع اصلی بستگی دارد، می‌توانید منبع را به صورت پویا نیز تغییر دهید؛ برای این کار تابعی ارسال کنید که پاسخ اصلی را به عنوان پارامتر دریافت می‌کند و ماک را بر اساس مقدار بازگشتی تنظیم می‌کند، به عنوان مثال:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // جایگزینی محتوای todo با شماره آن‌ها در لیست
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// خروجی
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## لغو ماک‌ها

به جای برگرداندن یک پاسخ سفارشی، می‌توانید درخواست را با یکی از خطاهای HTTP زیر لغو کنید:

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

این قابلیت بسیار مفید است اگر بخواهید اسکریپت‌های شخص ثالث را که تأثیر منفی روی تست عملکردی شما دارند، از صفحه خود مسدود کنید. می‌توانید یک ماک را به سادگی با فراخوانی `abort` یا `abortOnce` لغو کنید، به عنوان مثال:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## جاسوس‌ها

هر ماک به طور خودکار یک جاسوس (spy) است که تعداد درخواست‌هایی را که مرورگر به آن منبع ارسال کرده می‌شمارد. اگر پاسخ سفارشی یا دلیل لغو به ماک اعمال نکنید، با پاسخ پیش‌فرضی که به طور معمول دریافت می‌کردید ادامه می‌دهد. این به شما امکان می‌دهد بررسی کنید که مرورگر چند بار درخواست را ارسال کرده است، به عنوان مثال به یک endpoint خاص API.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // returns 0

// ثبت‌نام کاربر
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// بررسی اینکه آیا درخواست API ارسال شده است
expect(mock.calls.length).toBe(1)

// بررسی پاسخ
expect(mock.calls[0].body).toEqual({ success: true })
```

اگر نیاز دارید تا زمانی که یک درخواست مطابق پاسخ داده شود منتظر بمانید، از `mock.waitForResponse(options)` استفاده کنید. به مرجع API مراجعه کنید: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

در یک مرورگر [multi-remote](/docs/multiremote)، `mock()` به جای یک `Mock` تکی، یک `MultiRemoteMock` برمی‌گرداند. متدهایی مانند `respond()` و `restore()` روی همه نمونه‌ها اجرا می‌شوند. `waitForResponse()` تا زمانی منتظر می‌ماند که همه نمونه‌ها یک پاسخ مطابق داشته باشند. درخواست‌های ثبت‌شده روی ماک مربوط به همان مرورگر باقی می‌مانند:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// ثبت‌نام یک کاربر در هر مرورگر تا هر نشست درخواست را ارسال کند
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` این نام‌ها را به ترتیبی که ماک‌ها ایجاد شده‌اند فهرست می‌کند. وقتی نام در آن فهرست نباشد، `getInstance` خطای `Multi-remote object has no instance named "<name>"` را پرتاب می‌کند. ماکی که از `browser.select('myFirefoxBrowser', 'myChromeBrowser')` ایجاد شده باشد، Firefox را در ابتدا فهرست می‌کند که ممکن است با `browser.instances` متفاوت باشد.

برای stub کردن فقط یک مرورگر، `mock()` را روی همان نمونه فراخوانی کنید:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```
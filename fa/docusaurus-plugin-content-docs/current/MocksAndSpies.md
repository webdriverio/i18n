---
id: mocksandspies
title: ماک‌ها و جاسوس‌های درخواست
description: "درخواست‌ها و پاسخ‌های شبکه را در تست‌های خود با browser.mock شبیه‌سازی کنید، درخواست‌ها را لغو کنید و فراخوانی‌ها را با جاسوس‌ها بررسی کنید."
---

WebdriverIO به‌صورت داخلی از تغییر پاسخ‌های شبکه پشتیبانی می‌کند. این قابلیت به شما اجازه می‌دهد بدون نیاز به راه‌اندازی بک‌اند یا یک سرور ماک، روی تست برنامه فرانت‌اند خود تمرکز کنید. می‌توانید در تست خود پاسخ‌های سفارشی برای منابع وب مانند درخواست‌های REST API تعریف کنید و آن‌ها را به‌صورت پویا تغییر دهید.

:::info

توجه داشته باشید که استفاده از دستور `mock` به پشتیبانی از WebDriver Bidi نیاز دارد. این پشتیبانی معمولاً هنگام اجرای تست‌ها به‌صورت محلی در یک مرورگر مبتنی بر Chromium یا در Firefox، و همچنین در صورت استفاده از Selenium Grid نسخه ۴ یا بالاتر وجود دارد. اگر تست‌ها را در فضای ابری اجرا می‌کنید، مطمئن شوید که ارائه‌دهنده خدمات ابری شما از WebDriver Bidi پشتیبانی می‌کند.

:::

## ایجاد یک ماک

پیش از اینکه بتوانید پاسخی را تغییر دهید، ابتدا باید یک ماک تعریف کنید. این ماک با URL منبع توصیف می‌شود و می‌توان آن را بر اساس [متد درخواست](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) یا [هدرها](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) فیلتر کرد. تطبیق منبع با استفاده از یک [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) انجام می‌شود که در آن `*` با هر دنباله‌ای از کاراکترها تطبیق می‌یابد. یک URL بدون پروتکل فقط با مسیر (path) درخواست تطبیق داده می‌شود، بنابراین `*/users/list` با آن مسیر در هر مبدأیی تطبیق می‌یابد:

```js
// mock all resources ending with "/users/list"
const userListMock = await browser.mock('*/users/list')

// or you can specify the mock by filtering resources by headers or
// status code, only mock successful requests to json resources
const strictMock = await browser.mock('*', {
    // mock all json responses
    requestHeaders: { 'Content-Type': 'application/json' },
    // that were successful
    statusCode: 200
})

// instead of a string you can also pass in a `URLPattern`; the polyfill
// also works in runtimes without native URLPattern support
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::info

یک `*` تنها با هر کاراکتری، از جمله `/`، تطبیق می‌یابد. در یک الگوی رشته‌ای، WebdriverIO عبارت `**` را به `*` تبدیل می‌کند، بنابراین `'**/api/**'` همان `'*/api/*'` است.

ماک دومی با همان الگوی URL و همان گزینه‌های فیلتر، جایگزین ماک اول می‌شود: WebdriverIO ماک اول را بازیابی (restore) می‌کند، بنابراین دیگر درخواست‌ها را تغییر نمی‌دهد و فراخوانی‌ها را ثبت نمی‌کند. برای نگه داشتن هر دو ماک، گزینه‌های فیلتر متفاوتی به آن‌ها بدهید. برای مثال، رشته‌های `'**/users'` و `'*/users'` یک ماک یکسان هستند، در حالی که `'*/users'` و `'*/users'` با `{ method: 'POST' }` دو ماک جداگانه‌اند.

:::

:::warning

WebdriverIO یک شیء `URLPattern` را تغییر نمی‌دهد. در یک شیء، از یک `*` تنها استفاده کنید: وایلدکاردهای تکراری پیش از متن ثابت، مانند `{ pathname: '**/api/**' }`، می‌توانند تطبیق را روی یک URL طولانی که تطبیق نمی‌یابد بسیار کند کرده و تست را متوقف (فریز) کنند. [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548) را ببینید.

در تست‌های کامپوننت، از یک پروتکل و نام میزبان (hostname) ثابت استفاده کنید تا ترافیک اجراکننده (runner) خارج از رهگیری باقی بماند؛ [ماک‌های درخواست در تست کامپوننت](/docs/component-testing/mocking#requests) را ببینید.

:::

## تعیین پاسخ‌های سفارشی

پس از تعریف یک ماک، می‌توانید پاسخ‌های سفارشی برای آن تعریف کنید. این پاسخ‌های سفارشی می‌توانند یک شیء برای پاسخ دادن با JSON، یک فایل محلی برای پاسخ دادن با یک فیکسچر سفارشی، یا یک منبع وب برای جایگزینی پاسخ با منبعی از اینترنت باشند.

### ماک کردن درخواست‌های API

برای ماک کردن درخواست‌های API که انتظار پاسخ JSON از آن‌ها دارید، کافی است `respond` را روی شیء ماک با هر شیء دلخواهی که می‌خواهید برگردانده شود فراخوانی کنید، برای مثال:

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
// outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

همچنین می‌توانید هدرهای پاسخ و کد وضعیت را با ارسال برخی پارامترهای پاسخ ماک به شکل زیر تغییر دهید:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

اگر می‌خواهید ماک اصلاً بک‌اند را فراخوانی نکند، می‌توانید مقدار `false` را برای پرچم `fetchResponse` ارسال کنید.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

`fetchResponse: false` هرگز بک‌اند را فراخوانی نمی‌کند. ماکی که با فیلتر `statusCode` یا `responseHeaders` ایجاد شده باشد، برای تشخیص تطبیق به آن پاسخ نیاز دارد، بنابراین اگر این دو را با هم ترکیب کنید، `respond()` و `respondOnce()` خطا پرتاب می‌کنند. فیلتر پاسخ را حذف کنید، یا `fetchResponse` را تنظیم نکنید تا ماک بتواند پاسخ بک‌اند را بخواند و سپس آن را جایگزین کند.

توصیه می‌شود پاسخ‌های سفارشی را در فایل‌های فیکسچر ذخیره کنید تا بتوانید به‌سادگی آن‌ها را در تست خود به شکل زیر فراخوانی کنید:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### ماک کردن منابع متنی

اگر می‌خواهید منابع متنی مانند فایل‌های JavaScript، CSS یا سایر منابع مبتنی بر متن را تغییر دهید، کافی است یک مسیر فایل ارسال کنید تا WebdriverIO منبع اصلی را با آن جایگزین کند، برای مثال:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### تغییر مسیر منابع وب

اگر پاسخ مورد نظر شما از قبل روی وب میزبانی شده باشد، می‌توانید به‌سادگی یک منبع وب را با منبع وب دیگری جایگزین کنید. این کار هم برای منابع جداگانه صفحه و هم برای خود صفحه وب کار می‌کند، برای مثال:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### پاسخ‌های پویا

اگر پاسخ ماک شما به پاسخ منبع اصلی وابسته است، می‌توانید منبع را به‌صورت پویا تغییر دهید؛ به این صورت که تابعی ارسال کنید که پاسخ اصلی را به‌عنوان پارامتر دریافت می‌کند و ماک را بر اساس مقدار بازگشتی تنظیم می‌کند، برای مثال:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // replace todo content with their list number
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// returns
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## لغو ماک‌ها

به‌جای برگرداندن یک پاسخ سفارشی، می‌توانید درخواست را با یکی از خطاهای HTTP زیر لغو کنید:

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

این قابلیت زمانی بسیار مفید است که بخواهید اسکریپت‌های شخص ثالثی را که تأثیر منفی روی تست عملکردی شما دارند، در صفحه مسدود کنید. می‌توانید یک ماک را تنها با فراخوانی `abort` یا `abortOnce` لغو کنید، برای مثال:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## جاسوس‌ها

هر ماک به‌طور خودکار یک جاسوس (spy) نیز هست که تعداد درخواست‌هایی را که مرورگر به آن منبع ارسال کرده است شمارش می‌کند. اگر پاسخ سفارشی یا دلیل لغوی روی ماک اعمال نکنید، با همان پاسخ پیش‌فرضی که معمولاً دریافت می‌کردید ادامه می‌دهد. این امکان را به شما می‌دهد که بررسی کنید مرورگر چند بار درخواست را ارسال کرده است، برای مثال به یک endpoint مشخص از API.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // returns 0

// register user
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// check if API request was made
expect(mock.calls.length).toBe(1)

// assert response
expect(mock.calls[0].body).toEqual({ success: true })
```

اگر لازم است منتظر بمانید تا یک درخواست منطبق پاسخ داده شود، از `mock.waitForResponse(options)` استفاده کنید. مرجع API را ببینید: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

در یک مرورگر [multi-remote](/docs/multiremote)، `mock()` به‌جای یک `Mock`، یک `MultiRemoteMock` برمی‌گرداند. متدهایی مانند `respond()` و `restore()` روی همه نمونه‌ها اجرا می‌شوند. `waitForResponse()` منتظر می‌ماند تا هر نمونه یک پاسخ منطبق داشته باشد. درخواست‌های ثبت‌شده روی ماک مربوط به همان مرورگر باقی می‌مانند:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// register a user in every browser so each session sends the request
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` این نام‌ها را به ترتیبی که ماک‌ها ایجاد شده‌اند فهرست می‌کند. اگر نامی در این فهرست نباشد، `getInstance` خطای `Multi-remote object has no instance named "<name>"` را پرتاب می‌کند. ماکی که از `browser.select('myFirefoxBrowser', 'myChromeBrowser')` ایجاد شود، Firefox را در ابتدا فهرست می‌کند که ممکن است با `browser.instances` متفاوت باشد.

برای ماک کردن فقط یک مرورگر، `mock()` را روی همان نمونه فراخوانی کنید:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```
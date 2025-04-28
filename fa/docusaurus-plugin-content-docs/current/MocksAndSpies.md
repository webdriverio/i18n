---
id: mocksandspies
title: موک‌ها و جاسوس‌های درخواست
---

WebdriverIO دارای پشتیبانی داخلی برای تغییر پاسخ‌های شبکه است که به شما امکان می‌دهد بدون نیاز به راه‌اندازی بک‌اند یا سرور موک، روی تست برنامه فرانت‌اند خود تمرکز کنید. شما می‌توانید پاسخ‌های سفارشی برای منابع وب مانند درخواست‌های REST API در آزمون خود تعریف کرده و آن‌ها را به صورت پویا تغییر دهید.

:::info

توجه داشته باشید که استفاده از دستور `mock` نیازمند پشتیبانی از پروتکل Chrome DevTools است. این پشتیبانی اگر آزمون‌ها را به صورت محلی در مرورگر مبتنی بر Chromium، از طریق Selenium Grid نسخه 4 یا بالاتر، یا از طریق ارائه‌دهنده‌های ابری با پشتیبانی از پروتکل Chrome DevTools (مانند SauceLabs، BrowserStack، LambdaTest) اجرا کنید، فراهم می‌شود. پشتیبانی کامل از تمام مرورگرها زمانی در دسترس خواهد بود که عناصر مورد نیاز در [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) ارائه شده و در مرورگرهای مربوطه پیاده‌سازی شوند.

:::

## ایجاد یک موک

قبل از اینکه بتوانید پاسخ‌ها را تغییر دهید، ابتدا باید یک موک تعریف کنید. این موک توسط URL منبع توصیف می‌شود و می‌تواند با استفاده از [روش درخواست](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) یا [هدرها](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) فیلتر شود. منبع از عبارات glob توسط [minimatch](https://www.npmjs.com/package/minimatch) پشتیبانی می‌کند:

```js
// mock all resources ending with "/users/list"
const userListMock = await browser.mock('**/users/list')

// or you can specify the mock by filtering resources by headers or
// status code, only mock successful requests to json resources
const strictMock = await browser.mock('**', {
    // mock all json responses
    requestHeaders: { 'Content-Type': 'application/json' },
    // that were successful
    statusCode: 200
})
```

## تعیین پاسخ‌های سفارشی

پس از تعریف یک موک، می‌توانید پاسخ‌های سفارشی برای آن تعریف کنید. این پاسخ‌های سفارشی می‌تواند یک شیء برای پاسخگویی به JSON، یک فایل محلی برای پاسخگویی با یک فیکسچر سفارشی یا یک منبع وب برای جایگزینی پاسخ با منبعی از اینترنت باشد.

### موک کردن درخواست‌های API

برای موک کردن درخواست‌های API که انتظار پاسخ JSON دارید، کافی است متد `respond` را روی شیء موک با یک شیء دلخواه که می‌خواهید برگردانده شود، فراخوانی کنید، به عنوان مثال:

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

همچنین می‌توانید هدرهای پاسخ و همچنین کد وضعیت را با استفاده از پارامترهای پاسخ موک به شرح زیر تغییر دهید:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

اگر می‌خواهید موک اصلاً با بک‌اند تماس نگیرد، می‌توانید برای پرچم `fetchResponse` مقدار `false` تنظیم کنید.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

توصیه می‌شود پاسخ‌های سفارشی را در فایل‌های فیکسچر ذخیره کنید تا بتوانید آن‌ها را در آزمون خود به شرح زیر وارد کنید:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### موک کردن منابع متنی

اگر می‌خواهید منابع متنی مانند فایل‌های JavaScript، CSS یا سایر منابع مبتنی بر متن را تغییر دهید، می‌توانید مسیر فایل را وارد کنید و WebdriverIO منبع اصلی را با آن جایگزین می‌کند، به عنوان مثال:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### تغییر مسیر منابع وب

همچنین می‌توانید یک منبع وب را با منبع وب دیگری جایگزین کنید، اگر پاسخ مورد نظر شما قبلاً در وب میزبانی شده است. این کار با منابع صفحه فردی و همچنین با خود صفحه وب کار می‌کند، به عنوان مثال:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### پاسخ‌های پویا

اگر پاسخ موک شما به پاسخ منبع اصلی بستگی دارد، می‌توانید منبع را به صورت پویا با وارد کردن تابعی که پاسخ اصلی را به عنوان پارامتر دریافت می‌کند و موک را بر اساس مقدار بازگشتی تنظیم می‌کند، تغییر دهید، به عنوان مثال:

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

## لغو کردن موک‌ها

به جای بازگرداندن یک پاسخ سفارشی، می‌توانید درخواست را با یکی از خطاهای HTTP زیر لغو کنید:

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

این بسیار مفید است اگر می‌خواهید اسکریپت‌های شخص ثالث را از صفحه خود مسدود کنید که تأثیر منفی بر آزمون عملکردی شما دارند. می‌توانید یک موک را با فراخوانی `abort` یا `abortOnce` لغو کنید، به عنوان مثال:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## جاسوس‌ها

هر موک به طور خودکار یک جاسوس است که تعداد درخواست‌هایی را که مرورگر به آن منبع انجام داده است، می‌شمارد. اگر پاسخ سفارشی یا دلیل لغو را به موک اعمال نکنید، با پاسخ پیش‌فرضی که معمولاً دریافت می‌کنید، ادامه می‌دهد. این به شما امکان می‌دهد بررسی کنید که مرورگر چند بار درخواست را انجام داده است، مثلاً به یک نقطه پایانی API خاص.

```js
const mock = await browser.mock('**/user', { method: 'post' })
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
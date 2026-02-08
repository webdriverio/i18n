---
id: mocksandspies
title: ماک‌ها و جاسوس‌های درخواست
---

WebdriverIO با پشتیبانی داخلی برای تغییر پاسخ‌های شبکه ارائه می‌شود که به شما امکان می‌دهد بدون نیاز به راه‌اندازی بک‌اند یا سرور ماک، روی تست کردن برنامه فرانت‌اند خود تمرکز کنید. شما می‌توانید پاسخ‌های سفارشی برای منابع وب مانند درخواست‌های REST API در تست خود تعریف کرده و به صورت پویا آن‌ها را تغییر دهید.

:::info

توجه داشته باشید که استفاده از دستور `mock` نیازمند پشتیبانی از پروتکل Chrome DevTools است. این پشتیبانی زمانی فراهم می‌شود که آزمایش‌ها را به صورت محلی در مرورگر مبتنی بر کرومیوم، از طریق Selenium Grid نسخه ۴ یا بالاتر، یا از طریق فروشنده‌های ابری با پشتیبانی از پروتکل Chrome DevTools (مانند SauceLabs، BrowserStack، TestMu AI (سابقاً LambdaTest)) اجرا کنید. پشتیبانی کامل از مرورگرهای مختلف زمانی در دسترس خواهد بود که امکانات اولیه مورد نیاز در [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) به دسترس قرار گرفته و در مرورگرهای مربوطه پیاده‌سازی شود.

:::

## ایجاد یک ماک

قبل از اینکه بتوانید پاسخ‌ها را تغییر دهید، ابتدا باید یک ماک تعریف کنید. این ماک توسط آدرس منبع توصیف می‌شود و می‌تواند با [روش درخواست](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) یا [هدرها](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) فیلتر شود. منبع از عبارات الگوی glob توسط [minimatch](https://www.npmjs.com/package/minimatch) پشتیبانی می‌کند:

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

پس از تعریف یک ماک، می‌توانید پاسخ‌های سفارشی برای آن تعریف کنید. این پاسخ‌های سفارشی می‌توانند یک شیء برای پاسخ JSON، یک فایل محلی برای پاسخ با یک فیکسچر سفارشی یا یک منبع وب برای جایگزینی پاسخ با منبعی از اینترنت باشند.

### ماک کردن درخواست‌های API

برای ماک کردن درخواست‌های API که انتظار پاسخ JSON دارید، تمام کاری که باید انجام دهید فراخوانی `respond` روی شیء ماک با یک شیء دلخواه است که می‌خواهید برگردانده شود، مثال:

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

همچنین می‌توانید هدرهای پاسخ و کد وضعیت را با ارسال برخی پارامترهای پاسخ ماک به شرح زیر تغییر دهید:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

اگر نمی‌خواهید ماک اصلاً با بک‌اند تماس بگیرد، می‌توانید برای پرچم `fetchResponse` مقدار `false` را ارسال کنید.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

توصیه می‌شود پاسخ‌های سفارشی را در فایل‌های فیکسچر ذخیره کنید تا بتوانید آن‌ها را به سادگی در تست خود به شکل زیر وارد کنید:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### ماک کردن منابع متنی

اگر می‌خواهید منابع متنی مانند فایل‌های جاوااسکریپت، CSS یا سایر منابع متنی را تغییر دهید، می‌توانید به سادگی یک مسیر فایل را وارد کنید و WebdriverIO منبع اصلی را با آن جایگزین می‌کند، مثال:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### تغییر مسیر منابع وب

همچنین می‌توانید یک منبع وب را با منبع وب دیگری جایگزین کنید اگر پاسخ مورد نظر شما قبلاً روی وب میزبانی شده است. این کار هم با منابع صفحه فردی و هم با خود صفحه وب کار می‌کند، مثال:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### پاسخ‌های پویا

اگر پاسخ ماک شما به پاسخ منبع اصلی بستگی دارد، می‌توانید منبع را به صورت پویا با ارسال تابعی که پاسخ اصلی را به عنوان پارامتر دریافت می‌کند و ماک را براساس مقدار بازگشتی تنظیم می‌کند، تغییر دهید، مثال:

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

این برای مسدود کردن اسکریپت‌های شخص ثالث از صفحه شما که تأثیر منفی بر تست عملکردی شما دارند، بسیار مفید است. می‌توانید یک ماک را با فراخوانی `abort` یا `abortOnce` لغو کنید، مثال:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## جاسوس‌ها

هر ماک به صورت خودکار یک جاسوس است که تعداد درخواست‌هایی را که مرورگر به آن منبع انجام داده، می‌شمارد. اگر یک پاسخ سفارشی یا دلیل لغو برای ماک اعمال نکنید، با پاسخ پیش‌فرضی که معمولاً دریافت می‌کنید، ادامه می‌دهد. این به شما امکان می‌دهد بررسی کنید مرورگر چند بار درخواست را انجام داده است، مثلاً به یک نقطه پایانی API خاص.

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

اگر نیاز به انتظار تا زمان پاسخ یک درخواست منطبق دارید، از `mock.waitForResponse(options)` استفاده کنید. به مرجع API مراجعه کنید: [waitForResponse](/docs/api/mock/waitForResponse).
---
id: mock
title: شبیه‌سازی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

شبیه‌سازی پاسخ یک درخواست. می‌توانید یک شبیه‌سازی را بر اساس تطابق با
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
و هدر و کد وضعیت مربوطه تعریف کنید. فراخوانی متد شبیه‌سازی
یک شیء stub را برمی‌گرداند که می‌توانید از آن برای اصلاح پاسخ منبع وب
استفاده کنید.

با شیء stub می‌توانید پاسخ سفارشی برگردانید یا
درخواست را به شکست بیانجانید.

سه روش برای تغییر پاسخ وجود دارد:
- برگرداندن یک شیء JSON سفارشی (برای شبیه‌سازی درخواست API)
- جایگزینی منبع وب با یک فایل محلی (ارائه یک فایل JavaScript اصلاح شده) یا
- هدایت مجدد منبع به یک url متفاوت

:::info

توجه داشته باشید که استفاده از دستور `mock` نیازمند پشتیبانی از WebDriver Bidi است. این
معمولاً زمانی است که آزمون‌ها را به صورت محلی در مرورگر مبتنی بر Chromium یا
Firefox اجرا می‌کنید و همچنین اگر از Selenium Grid نسخه 4 یا بالاتر استفاده می‌کنید. اگر آزمون‌ها را
در فضای ابری اجرا می‌کنید، مطمئن شوید که ارائه‌دهنده خدمات ابری شما از WebDriver Bidi پشتیبانی می‌کند.

:::

:::info

`URLPattern` یک فناوری آزمایشی است و هنوز در برخی محیط‌ها، مانند Node.js پشتیبانی نمی‌شود.
توصیه می‌کنیم [یک polyfill](https://www.npmjs.com/package/urlpattern-polyfill) را وارد کنید
تا زمانی که این ویژگی به طور گسترده‌تری پشتیبانی شود.

:::

##### استفاده

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>آدرس url برای شبیه‌سازی</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`MockFilterOptions`</td>
      <td>فیلتر کردن منبع شبیه‌سازی با گزینه‌های اضافی</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String, Function`</td>
      <td>فیلتر کردن منبع بر اساس متد HTTP</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Object, Function`</td>
      <td>فیلتر کردن منبع بر اساس هدرهای درخواست خاص</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Object, Function`</td>
      <td>فیلتر کردن منبع بر اساس هدرهای پاسخ خاص</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String, Function`</td>
      <td>فیلتر کردن منبع بر اساس داده‌های post درخواست</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number, Function`</td>
      <td>فیلتر کردن منبع بر اساس کد وضعیت پاسخ</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="mock.js"
it('should mock network resources', async () => {
    // via static string
    const userListMock = await browser.mock('**' + '/users/list')
    // or as regular expression
    const userListMock = await browser.mock(/https:\/\/(domainA|domainB)\.com\/.+/)
    // you can also specifying the mock even more by filtering resources
    // by request or response headers, status code, postData, e.g. mock only responses with specific
    // header set and statusCode
    const strictMock = await browser.mock('**', {
        // mock all json responses
        statusCode: 200,
        requestHeaders: { 'Content-Type': 'application/json' },
        responseHeaders: { 'Cache-Control': 'no-cache' },
        postData: 'foobar'
    })

    // comparator function
    const apiV1Mock = await browser.mock('**' + '/api/v1', {
        statusCode: (statusCode) => statusCode >= 200 && statusCode <= 203,
        requestHeaders: (headers) => headers['Authorization'] && headers['Authorization'].startsWith('Bearer '),
        responseHeaders: (headers) => headers['Impersonation'],
        postData: (data) => typeof data === 'string' && data.includes('foo')
    })
})

it('should modify API responses', async () => {
    // filter by method
    const todoMock = await browser.mock('**' + '/todos', {
        method: 'get'
    })

    // mock an endpoint with a fixed fixture
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }])

    // respond with different status code or header
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }], {
        statusCode: 404,
        headers: {
            'x-custom-header': 'foobar'
        }
    })
})

it('should modify text assets', async () => {
    const scriptMock = await browser.mock('**' + '/script.min.js')
    scriptMock.respond('./tests/fixtures/script.js')
})

it('should redirect web resources', async () => {
    const headerMock = await browser.mock('**' + '/header.png')
    headerMock.respond('https://media.giphy.com/media/F9hQLAVhWnL56/giphy.gif')

    const pageMock = await browser.mock('https://google.com/')
    pageMock.respond('https://webdriver.io')
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```

##### مقادیر بازگشتی

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                یک شیء mock برای اصلاح پاسخ
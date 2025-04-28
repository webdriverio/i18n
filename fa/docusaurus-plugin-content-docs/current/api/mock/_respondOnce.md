---
id: respondOnce
title: پاسخ‌دادن یکباره
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

فقط یک بار با بازنویسی تعیین‌شده پاسخ می‌دهد. شما می‌توانید `respondOnce` را چندین بار متوالی فراخوانی کنید و از آخرین پاسخی که تعریف کرده‌اید شروع خواهد شد. اگر شما فقط از `respondOnce` استفاده کنید و منبع بیشتر از تعداد دفعاتی که موک تعریف شده فراخوانی شود، به منبع اصلی بازمی‌گردد.

##### استفاده

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>محتوای جایگزین برای پاسخ</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`MockResponseParams`</td>
      <td>پارامترهای اضافی پاسخ برای بازنویسی</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Object`</td>
      <td>بازنویسی هدرهای خاص</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>بازنویسی کد وضعیت پاسخ</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>دریافت پاسخ واقعی قبل از پاسخگویی با داده‌های موک‌شده</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="respondOnce.js"
async function getToDos () {
    await $('#todo-list li').waitForExist()
    return $$('#todo-list li').map(el => el.getText())
}

it('should demonstrate the respondOnce command', async () => {
    const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
        method: 'get'
    })

    mock.respondOnce([{
        title: '3'
    }, {
        title: '2'
    }, {
        title: '1'
    }])

    mock.respondOnce([{
        title: '2'
    }, {
        title: '1'
    }])

    mock.respondOnce([{
        title: '1'
    }])

    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // خروجی [ '3', '2', '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // خروجی [ '2', '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // خروجی [ '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // نمایش پاسخ واقعی منبع
})
```
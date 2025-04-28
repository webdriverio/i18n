---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

فقط یک بار پارامتر درخواست را با بازنویسی داده شده برای درخواست بعدی تغییر دهید. شما می‌توانید `requestOnce` را چندین بار پشت سر هم فراخوانی کنید و بازنویسی‌ها به ترتیب اعمال خواهند شد. اگر فقط از `requestOnce` استفاده کنید و منبع بیشتر از تعداد دفعاتی که یک موک تعریف شده فراخوانی شود، به منبع اصلی برمی‌گردد.

##### استفاده

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>محتوای بازنویسی پاسخ</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>بازنویسی هدرهای مشخص</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>بازنویسی کوکی‌های درخواست</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>بازنویسی متد درخواست</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>بازنویسی URL درخواست برای شروع یک تغییر مسیر</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`MockResponseParams`</td>
      <td>پارامترهای پاسخ اضافی برای بازنویسی</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Object`</td>
      <td>بازنویسی هدرهای مشخص</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>بازنویسی کد وضعیت پاسخ</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>دریافت پاسخ واقعی قبل از پاسخگویی با داده‌های موک</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```
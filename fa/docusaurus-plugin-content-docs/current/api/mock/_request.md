---
id: request
title: درخواست
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

به شما امکان می‌دهد درخواست‌هایی که مرورگر در طول جلسه انجام می‌دهد را تغییر دهید. این می‌تواند برای موارد استفاده زیر مفید باشد:

- اعتبارسنجی اینکه برنامه شما محتوای درخواست صحیح را ارسال می‌کند
- ارسال هدرهای احراز هویت برای آزمایش منابع محافظت شده
- تنظیم کوکی‌های جلسه برای آزمایش احراز هویت کاربر
- تغییر درخواست‌ها برای آزمایش موارد حاشیه‌ای

##### استفاده

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>محتوا برای بازنویسی پاسخ</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string,string>`</td>
      <td>بازنویسی هدرهای خاص</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
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
      <td>دریافت پاسخ واقعی قبل از پاسخ دادن با داده‌های شبیه‌سازی شده</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```
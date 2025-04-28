---
id: redirect
title: تغییر مسیر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

یک تغییر مسیر برای یک موک معین تنظیم می‌کند. این به شما اجازه می‌دهد تا یک درخواست را به URL دیگری هدایت کنید.
نکته: این تغییر مسیرها فقط برای درخواست‌هایی که توسط اسکریپت در مرورگر انجام می‌شوند اعمال می‌شوند، نه زمانی که دستور `url` را فراخوانی می‌کنید.

##### استفاده

```js
mock.redirect(url)
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
      <td>`string`</td>
      <td>منبع هدف برای تغییر مسیر درخواست‌ها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```
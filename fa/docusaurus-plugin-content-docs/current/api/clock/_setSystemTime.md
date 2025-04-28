---
id: setSystemTime
title: تنظیم زمان سیستم
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

زمان سیستم را به زمان جدید تغییر دهید. زمان می‌تواند یک تایم‌استمپ، شیء تاریخ باشد، یا اگر وارد نشود، به طور پیش‌فرض 0 خواهد بود. هیچ تایمری فراخوانی نمی‌شود و زمان باقی‌مانده قبل از فعال شدن آن‌ها نیز تغییر نمی‌کند.

##### استفاده

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
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
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>تاریخ جدیدی که زمان سیستم باید به آن تنظیم شود.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### بازگشتی

- **&lt; `Promise<void>` &gt;**
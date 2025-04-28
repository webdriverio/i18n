---
id: tick
title: تیک
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

ساعت را به میزان `milliseconds` مشخص شده جلو ببرید. هر تایمری که در محدوده زمانی تحت تأثیر قرار گیرد فراخوانی خواهد شد.

##### استفاده

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
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
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>تعداد میلی‌ثانیه‌ای که ساعت باید جلو برود.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### مقدار بازگشتی

- **&lt; `Promise<void>` &gt;**
---
id: setSystemTime
title: ضبط وقت النظام
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

تغيير وقت النظام إلى الوقت الحالي الجديد. يمكن أن يكون الوقت الحالي طابعاً زمنياً، كائن تاريخ، أو غير ممرر، وهو ما يعني افتراضياً 0. لن يتم استدعاء أي مؤقتات، ولن يتغير الوقت المتبقي قبل تشغيلها.

##### الاستخدام

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
```

##### المعاملات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>التاريخ الجديد لضبط وقت النظام عليه.</td>
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

##### القيمة المرجعة

- **&lt; `Promise<void>` &gt;**
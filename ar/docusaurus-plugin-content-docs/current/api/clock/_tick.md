---
id: tick
title: تيك
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

تحريك الساعة لعدد محدد من `milliseconds`. سيتم استدعاء أي مؤقتات ضمن النطاق الزمني المتأثر.

##### الاستخدام

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>عدد الميلي ثانية لتحريك الساعة.</td>
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

##### ترجع

- **&lt; `Promise<void>` &gt;**
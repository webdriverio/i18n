---
id: restore
title: بازگرداندن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

تمام توابع بومی بازنویسی شده را بازگرداند. این عملیات به طور خودکار بین آزمون‌ها فراخوانی می‌شود، بنابراین معمولاً نیازی به آن نیست.

##### استفاده

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### مثال

```js title="restore.js"
console.log(new Date()) // returns e.g. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
```

##### برمی‌گرداند

- **&lt; `Promise<void>` &gt;**
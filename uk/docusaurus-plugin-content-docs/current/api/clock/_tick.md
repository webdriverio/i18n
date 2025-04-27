---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Переміщує годинник на вказану кількість `milliseconds`. Будь-які таймери в межах впливу будуть викликані.

##### Використання

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>Кількість мілісекунд для переміщення годинника.</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Повертає

- **&lt; `Promise<void>` &gt;**
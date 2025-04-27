---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Перемещает часы на указанное количество `milliseconds`. Любые таймеры в пределах затронутого диапазона времени будут вызваны.

##### Использование

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>Количество миллисекунд для перемещения часов.</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Возвращает

- **&lt; `Promise<void>` &gt;**
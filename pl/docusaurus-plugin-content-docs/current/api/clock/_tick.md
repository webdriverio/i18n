---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Przesuń zegar o określoną liczbę `milliseconds`. Wszystkie timery w ramach objętego zakresu czasu zostaną wywołane.

##### Użycie

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>Liczba milisekund, o którą należy przesunąć zegar.</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Zwraca

- **&lt; `Promise<void>` &gt;**
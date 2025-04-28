---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Flytta klockan det angivna antalet `milliseconds`. Alla timers inom det påverkade tidsintervallet kommer att anropas.

##### Användning

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>Antalet millisekunder att flytta klockan.</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Returnerar

- **&lt; `Promise<void>` &gt;**
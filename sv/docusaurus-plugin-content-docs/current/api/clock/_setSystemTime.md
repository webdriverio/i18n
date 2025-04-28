---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Ändra systemtiden till den nya nu-tiden. Nu kan vara en tidsstämpel, datumobjekt, eller inget alls vilket då standardvärdet är 0. Inga timers kommer att anropas och tiden som är kvar innan de triggas kommer inte att ändras.

##### Användning

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
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
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>Det nya datumet att ställa in systemtiden till.</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### Returvärde

- **&lt; `Promise<void>` &gt;**
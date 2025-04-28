---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Ändra systemtiden till den nya tiden. Den nya tiden kan vara en tidsstämpel, ett datum-objekt, eller utelämnas vilket då standardvärdet blir 0. Inga timers kommer att anropas, och inte heller kommer tiden som är kvar innan de triggas att förändras.

##### Usage

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>Den nya tidpunkten att ställa in systemtiden till.</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### Returns

- **&lt; `Promise<void>` &gt;**
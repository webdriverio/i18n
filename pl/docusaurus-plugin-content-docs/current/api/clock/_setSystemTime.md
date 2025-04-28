---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Zmień czas systemowy na nowy. Aktualny czas może być znacznikiem czasu, obiektem daty lub nie być przekazany, co domyślnie daje wartość 0. Żadne timery nie zostaną wywołane, ani nie zmieni się czas pozostały do ich uruchomienia.

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
      <td>Nowa data, na którą ma zostać ustawiony czas systemowy.</td>
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
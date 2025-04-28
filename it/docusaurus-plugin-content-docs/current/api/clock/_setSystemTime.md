---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Cambia il tempo di sistema con un nuovo valore attuale. Il valore attuale può essere un timestamp, un oggetto data, o non passato il che lo imposta di default a 0. Nessun timer verrà chiamato, né cambierà il tempo rimasto prima che vengano attivati.

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
      <td>La nuova data da impostare come tempo di sistema.</td>
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
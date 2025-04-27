Here's the translated content:

---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Ändert die Systemzeit auf einen neuen Zeitpunkt. Der neue Zeitpunkt kann ein Timestamp, ein Date-Objekt sein oder nicht übergeben werden, dann wird standardmäßig 0 verwendet. Es werden keine Timer aufgerufen, und die verbleibende Zeit bis zu ihrer Auslösung ändert sich nicht.

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
      <td>Die neue Systemzeit, die gesetzt werden soll.</td>
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
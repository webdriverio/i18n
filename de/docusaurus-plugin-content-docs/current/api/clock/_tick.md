Here's the translated content:

---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Bewege die Uhr um die angegebene Anzahl von `milliseconds`. Jeder Timer innerhalb des betroffenen Zeitbereichs wird aufgerufen.

##### Verwendung

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>Die Anzahl der Millisekunden, um die die Uhr vorgestellt werden soll.</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Gibt zurück

- **&lt; `Promise<void>` &gt;**
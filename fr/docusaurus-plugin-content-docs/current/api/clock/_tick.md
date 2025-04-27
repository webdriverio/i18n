---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Déplacer l'horloge du nombre spécifié de `milliseconds`. Tous les minuteurs dans la plage de temps affectée seront appelés.

##### Usage

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
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
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>Le nombre de millisecondes pour déplacer l'horloge.</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Returns

- **&lt; `Promise<void>` &gt;**
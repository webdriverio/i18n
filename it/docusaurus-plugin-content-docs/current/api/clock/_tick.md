---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Sposta l'orologio del numero specificato di `milliseconds`. Qualsiasi timer all'interno dell'intervallo di tempo interessato verrà chiamato.

##### Utilizzo

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>Il numero di millisecondi di cui spostare l'orologio.</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Restituisce

- **&lt; `Promise<void>` &gt;**
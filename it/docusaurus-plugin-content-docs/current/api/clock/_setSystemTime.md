---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Cambia l'ora di sistema impostando un nuovo "now". "Now" può essere un timestamp, un oggetto date, o non passato, nel qual caso il valore predefinito è 0. Nessun timer verrà chiamato, né cambierà il tempo rimanente prima che si attivino.

##### Utilizzo

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
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
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>La nuova data da impostare come ora di sistema.</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### Restituisce

- **&lt; `Promise<void>` &gt;**
---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Modifie l'heure système pour une nouvelle heure. L'heure peut être un timestamp, un objet date, ou ne pas être spécifiée, ce qui correspond à 0 par défaut. Aucun minuteur ne sera appelé, et le temps restant avant leur déclenchement ne changera pas.

##### Utilisation

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>La nouvelle date à définir comme heure système.</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### Retourne

- **&lt; `Promise<void>` &gt;**
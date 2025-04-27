---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Cambiar la hora del sistema a un nuevo ahora. Now puede ser una marca de tiempo, un objeto de fecha o no pasarse, lo que por defecto es 0. No se llamará a ningún temporizador, ni cambiará el tiempo restante antes de que se activen.

##### Uso

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>La nueva fecha para establecer la hora del sistema.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### Devuelve

- **&lt; `Promise<void>` &gt;**
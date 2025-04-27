---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Mueve el reloj el número especificado de `milliseconds`. Cualquier temporizador dentro del rango de tiempo afectado será llamado.

##### Uso

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
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
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>El número de milisegundos para mover el reloj.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Devuelve

- **&lt; `Promise<void>` &gt;**
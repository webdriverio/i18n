---
id: tick
title: tick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

Avança o relógio pelo número especificado de `milliseconds`. Quaisquer temporizadores dentro do intervalo de tempo afetado serão chamados.

##### Uso

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>O número de milissegundos para avançar o relógio.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### Retorna

- **&lt; `Promise<void>` &gt;**
    
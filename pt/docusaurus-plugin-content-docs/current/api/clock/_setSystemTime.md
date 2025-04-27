---
id: setSystemTime
title: setSystemTime
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Alterar o horário do sistema para o novo agora. Now pode ser um timestamp, objeto de data ou não passado, o que por padrão é 0. Nenhum temporizador será chamado, nem o tempo restante antes de eles serem acionados mudará.

##### Uso

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
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
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>A nova data para definir o horário do sistema.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### Retorna

- **&lt; `Promise<void>` &gt;**
---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Pausa a execução por um período específico de tempo. É recomendado não usar este comando para esperar que um elemento apareça. Para evitar resultados de teste instáveis, é melhor usar comandos como [`waitForExist`](/docs/api/element/waitForExist) ou outros comandos waitFor*.

##### Uso

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>tempo em ms</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```
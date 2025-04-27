---
id: scroll
title: scroll (rolar)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Rolar dentro da viewport do navegador. Observe que as coordenadas `x` e `y` são relativas à posição 
atual de rolagem, portanto `browser.scroll(0, 0)` não realiza nenhuma operação.

##### Uso

```js
browser.scroll(x, y)
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
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>posição horizontal de rolagem (padrão: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>posição vertical de rolagem (padrão: `0`)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```
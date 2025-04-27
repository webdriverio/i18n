---
id: addCommand
title: addCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

O método do navegador `addCommand` ajuda você a escrever seu próprio conjunto de comandos.

:::info

Você pode encontrar mais informações sobre como adicionar comandos personalizados no guia de [comandos personalizados](/docs/customcommands#adding-custom-commands).

:::

##### Uso

```js
browser.addCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>nome do comando personalizado</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>função a ser chamada</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>estender o objeto Element em vez do objeto Browser</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="execute.js"
await browser.addCommand('getUrlAndTitle', async function (customParam) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customParam: customParam
    }
})
//usage
it('should use my add command', async () => {
    await browser.url('https://webdriver.io')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://webdriver.io')
    assert.strictEqual(result.title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    assert.strictEqual(result.customParam, 'foobar')
})
```
---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Obter a largura e altura de um elemento DOM.

##### Uso

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>tamanho a receber [opcional] ("width" ou "height")</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="getSize.js"
it('should demonstrate the getSize command', async () => {
    await browser.url('http://github.com')
    const logo = await $('.octicon-mark-github')

    const size = await logo.getSize()
    console.log(size) // outputs: { width: 32, height: 32 }

    const width = await logo.getSize('width')
    console.log(width) // outputs: 32

    const height = await logo.getSize('height')
    console.log(height) // outputs: 32
})
```

##### Retorna

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     tamanho do elemento solicitado (`{ width: <Number>, height: <Number> }`) ou largura/altura real como número se o parâmetro prop for fornecido
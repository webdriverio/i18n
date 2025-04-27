---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

O comando Get Element Property retornará o resultado da obtenção de uma propriedade de um
elemento.

##### Uso

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>nome da propriedade do elemento</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Retorna

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** o valor da propriedade do elemento selecionado
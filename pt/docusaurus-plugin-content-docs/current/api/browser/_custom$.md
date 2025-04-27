---
id: custom$
title: custom$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$.ts
---

O `custom$` permite que você use uma estratégia personalizada declarada usando `browser.addLocatorStrategy`.
Leia mais sobre estratégias de seletores personalizados na [documentação de Seletores](../../selectors#custom-selector-strategies).

##### Uso

```js
browser.custom$(strategyName, strategyArguments)
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
      <td><code><var>strategyName</var></code></td>
      <td>`string`</td>
      <td></td>
    </tr>
    <tr>
      <td><code><var>strategyArguments</var></code></td>
      <td>`*`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### Exemplos

```js reference title="customStrategy.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

```html reference title="example.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

```js reference title="customStrategy.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

```js title="example.js"
it('should fetch the project title', async () => {
    await browser.url('https://webdriver.io')
    browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const projectTitle = await browser.custom$('myStrat', '.projectTitle')

    console.log(await projectTitle.getText()) // WEBDRIVER I/O
})
```

##### Retorna

- **&lt;WebdriverIO.Element&gt;**
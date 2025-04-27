---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$$.ts
---

El `customs$$` te permite usar una estrategia personalizada declarada mediante `browser.addLocatorStrategy`.
Lee más sobre estrategias de selectores personalizados en la [documentación de Selectores](../../selectors#custom-selector-strategies).

##### Uso

```js
browser.custom$$(strategyName, strategyArguments)
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

##### Ejemplo

```js title="example.js"
it('should get all the plugin wrapper buttons', async () => {
    await browser.url('https://webdriver.io')
    await browser.addLocatorStrategy('myStrategy', (selector) => {
        return document.querySelectorAll(selector)
    })

    const pluginWrapper = await browser.custom$$('myStrategy', '.pluginWrapper')

    console.log(await pluginWrapper.length) // 4
})
```

##### Devuelve

- **&lt;WebdriverIO.ElementArray&gt;**
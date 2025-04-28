---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$$.ts
---

Il `customs$$` ti permette di utilizzare una strategia personalizzata dichiarata usando `browser.addLocatorStrategy`.
Leggi di più sulle strategie di selezione personalizzate nella [documentazione dei Selettori](../../selectors#custom-selector-strategies).

##### Utilizzo

```js
$(selector).custom$$(strategyName, strategyArguments)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
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

##### Esempio

```js title="example.js"
it('should get all the plugin wrapper buttons', async () => {
    await browser.url('https://webdriver.io')
    await browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const pluginRowBlock = await browser.custom$('myStrat', '.pluginRowBlock')
    const pluginWrapper = await pluginRowBlock.custom$$('myStrat', '.pluginWrapper')

    console.log(pluginWrapper.length) // 4
})
```

##### Restituisce

- **&lt;WebdriverIO.ElementArray&gt;**
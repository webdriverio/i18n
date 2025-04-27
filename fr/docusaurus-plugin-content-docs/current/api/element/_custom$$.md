---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$$.ts
---

Le `customs$$` vous permet d'utiliser une stratégie personnalisée déclarée en utilisant `browser.addLocatorStrategy`.
Pour en savoir plus sur les stratégies de sélecteur personnalisées, consultez la [documentation des sélecteurs](../../selectors#custom-selector-strategies).

##### Utilisation

```js
$(selector).custom$$(strategyName, strategyArguments)
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
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

##### Exemple

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

##### Retourne

- **&lt;WebdriverIO.ElementArray&gt;**
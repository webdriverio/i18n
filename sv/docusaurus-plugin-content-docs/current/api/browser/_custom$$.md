---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$$.ts
---

Funktionen `customs$$` låter dig använda en anpassad strategi som deklarerats med `browser.addLocatorStrategy`.
Läs mer om anpassade väljarestrategier i [Väljardokumentationen](../../selectors#custom-selector-strategies).

##### Användning

```js
browser.custom$$(strategyName, strategyArguments)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
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

##### Exempel

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

##### Returnerar

- **&lt;WebdriverIO.ElementArray&gt;**
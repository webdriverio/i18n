---
id: custom$
title: custom$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$.ts
---

`custom$` låter dig använda en anpassad strategi som deklarerats med hjälp av `browser.addLocatorStrategy`.
Läs mer om anpassade väljarestrategier i [Selector-dokumentationen](../../selectors#custom-selector-strategies).

##### Användning

```js
$(selector).custom$(strategyName, strategyArguments)
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
    await browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const header = await browser.custom$('myStrat', 'header')
    const projectTitle = await header.custom$('myStrat', '.projectTitle')

    console.log(projectTitle.getText()) // WEBDRIVER I/O
})
```

##### Returnerar

- **&lt;WebdriverIO.Element&gt;**
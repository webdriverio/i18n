---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$$.ts
---

`customs$$` låter dig använda en anpassad strategi som deklarerats med `browser.addLocatorStrategy`.
Läs mer om anpassade selektorer i dokumentationen för [Custom Selectors](../../selectors).

##### Användning

```js
$(selector).custom$$(strategyName, strategyArguments)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Beskrivning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>strategyName</code></td>
      <td>string</td>
      <td></td>
    </tr>
    <tr>
      <td><code>strategyArguments</code></td>
      <td>any</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### Returvärde

<table>
  <tbody>
    <tr>
      <td><code>Array.&lt;Element&gt;</code></td>
    </tr>
  </tbody>
</table>

##### Exempel

```js
it('should get all button elements', async () => {
    // definierar en anpassad strategi
    browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    // använd strategin
    const button = await custom$$('myStrat', '.button')
    console.log(button.length) // antal knappar
})
```
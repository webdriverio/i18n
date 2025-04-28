---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

Hämta en css-egenskap från ett DOM-element valt med given selektor. Returvärdet
är formaterat för att vara testbart. Färger tolkas via [rgb2hex](https://www.npmjs.org/package/rgb2hex)
och alla andra egenskaper tolkas via [css-value](https://www.npmjs.org/package/css-value).

:::info

Observera att förkortade CSS-egenskaper (t.ex. `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) kommer att expanderas för att hämta alla långformegenskaper
vilket resulterar i flera WebDriver-anrop. Om du är intresserad av en specifik
långformegenskap rekommenderas det att du frågar efter den istället.

:::

##### Användning

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
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
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>css-egenskapens namn</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>css pseudo-element</td>
    </tr>
  </tbody>
</table>

##### Exempel

```html title="example.html"
<label id="myLabel" for="input" style="color: #0088cc; font-family: helvetica, arial, freesans, clean, sans-serif, width: 100px">Some Label</label>
```

```js title="getCSSProperty.js"
it('should demonstrate the getCSSProperty command', async () => {
    const elem = await $('#myLabel')
    const color = await elem.getCSSProperty('color')
    console.log(color)
    // outputs the following:
    // {
    //     property: 'color',
    //     value: 'rgba(0, 136, 204, 1)',
    //     parsed: {
    //         hex: '#0088cc',
    //         alpha: 1,
    //         type: 'color',
    //         rgba: 'rgba(0, 136, 204, 1)'
    //     }
    // }

    const font = await elem.getCSSProperty('font-family')
    console.log(font)
    // outputs the following:
    // {
    //      property: 'font-family',
    //      value: 'helvetica',
    //      parsed: {
    //          value: [ 'helvetica', 'arial', 'freesans', 'clean', 'sans-serif' ],
    //          type: 'font',
    //          string: 'helvetica, arial, freesans, clean, sans-serif'
    //      }
    // }

    var width = await elem.getCSSProperty('width', '::before')
    console.log(width)
    // outputs the following:
    // {
    //     property: 'width',
    //     value: '100px',
    //     parsed: {
    //         type: 'number',
    //         string: '100px',
    //         unit: 'px',
    //         value: 100
    //     }
    // }
})
```

##### Returnerar

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  Elementets specificerade css
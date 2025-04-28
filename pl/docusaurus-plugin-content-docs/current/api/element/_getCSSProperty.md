---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

Pobierz właściwość CSS z elementu DOM wybranego za pomocą danego selektora. Zwracana wartość
jest sformatowana tak, aby można było ją testować. Kolory są parsowane za pomocą [rgb2hex](https://www.npmjs.org/package/rgb2hex),
a wszystkie inne właściwości są parsowane za pomocą [css-value](https://www.npmjs.org/package/css-value).

:::info

Pamiętaj, że skrócone właściwości CSS (np. `background`, `font`, `border`, `margin`, 
`padding`, `list-style`, `outline`, `pause`, `cue`) zostaną rozszerzone, aby pobrać wszystkie długie 
właściwości, co spowoduje wiele wywołań WebDrivera. Jeśli interesuje Cię określona 
długa właściwość, zaleca się zapytanie bezpośrednio o nią.

:::

##### Użycie

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>nazwa właściwości css</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>pseudo-element css</td>
    </tr>
  </tbody>
</table>

##### Przykłady

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

##### Zwraca

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  Określona właściwość css elementu
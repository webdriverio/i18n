---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

Récupère une propriété CSS d'un élément DOM sélectionné par le sélecteur donné. La valeur de retour
est formatée pour être testable. Les couleurs sont analysées via [rgb2hex](https://www.npmjs.org/package/rgb2hex)
et toutes les autres propriétés sont analysées via [css-value](https://www.npmjs.org/package/css-value).

:::info

Notez que les propriétés CSS abrégées (par ex. `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) seront développées pour récupérer toutes les propriétés
détaillées, ce qui entraîne plusieurs appels WebDriver. Si vous êtes intéressé par une propriété
détaillée spécifique, il est recommandé de l'interroger directement.

:::

##### Usage

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>nom de la propriété css</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>pseudo-élément css</td>
    </tr>
  </tbody>
</table>

##### Examples

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

##### Returns

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  La propriété css spécifiée de l'élément
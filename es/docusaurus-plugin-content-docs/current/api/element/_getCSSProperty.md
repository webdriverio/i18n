---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

Obtiene una propiedad CSS de un elemento DOM seleccionado mediante el selector dado. El valor 
devuelto está formateado para ser comprobable. Los colores se analizan mediante [rgb2hex](https://www.npmjs.org/package/rgb2hex)
y todas las demás propiedades se analizan mediante [css-value](https://www.npmjs.org/package/css-value).

:::info

Ten en cuenta que las propiedades CSS abreviadas (por ejemplo, `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) se expandirán para obtener todas las propiedades 
completas, lo que resultará en múltiples llamadas a WebDriver. Si estás interesado en una propiedad 
específica, se recomienda consultar directamente por ella.

:::

##### Uso

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
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
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>nombre de la propiedad CSS</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>pseudo elemento CSS</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

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

##### Retorna

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  La propiedad CSS especificada del elemento
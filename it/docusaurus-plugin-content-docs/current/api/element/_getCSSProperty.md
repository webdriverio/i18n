---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

Ottieni una proprietà css da un elemento DOM selezionato tramite il selettore fornito. Il valore di ritorno
è formattato per essere testabile. I colori vengono analizzati tramite [rgb2hex](https://www.npmjs.org/package/rgb2hex)
e tutte le altre proprietà vengono analizzate tramite [css-value](https://www.npmjs.org/package/css-value).

:::info

Nota che le proprietà CSS abbreviate (es. `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) verranno espanse per recuperare tutte le proprietà
complete risultando in multiple chiamate WebDriver. Se sei interessato a una specifica
proprietà completa è consigliabile interrogare direttamente quella.

:::

##### Utilizzo

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
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
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>nome della proprietà css</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>pseudo elemento css</td>
    </tr>
  </tbody>
</table>

##### Esempi

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

##### Restituisce

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  La proprietà css specificata dell'elemento
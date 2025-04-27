---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

Obtenha uma propriedade CSS de um elemento DOM selecionado pelo seletor fornecido. O valor de retorno
é formatado para ser testável. Cores são analisadas via [rgb2hex](https://www.npmjs.org/package/rgb2hex)
e todas as outras propriedades são analisadas via [css-value](https://www.npmjs.org/package/css-value).

:::info

Observe que propriedades CSS abreviadas (por exemplo, `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) serão expandidas para buscar todas as propriedades
completas, resultando em várias chamadas WebDriver. Se você estiver interessado em uma propriedade
completa específica, é recomendável consultar diretamente essa propriedade.

:::

##### Uso

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>nome da propriedade CSS</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>pseudoelemento CSS</td>
    </tr>
  </tbody>
</table>

##### Exemplos

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
            **<code><var>return</var></code>:**                  A propriedade CSS especificada do elemento
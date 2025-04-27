---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

Отримати css властивість з DOM-елемента, вибраного за допомогою вказаного селектора. Повернене значення
форматується для можливості тестування. Кольори аналізуються за допомогою [rgb2hex](https://www.npmjs.org/package/rgb2hex)
та всі інші властивості аналізуються за допомогою [css-value](https://www.npmjs.org/package/css-value).

:::info

Зверніть увагу, що скорочені CSS властивості (наприклад, `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) будуть розгорнуті для отримання всіх повних
властивостей, що призведе до кількох викликів WebDriver. Якщо вас цікавить конкретна
повна властивість, рекомендується запитувати саме її.

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
      <td>css property name</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>css pseudo element</td>
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
            **<code><var>return</var></code>:**                  The specified css of the element    
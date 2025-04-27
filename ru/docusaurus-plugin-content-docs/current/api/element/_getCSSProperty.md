---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

Получение css свойства DOM-элемента, выбранного по указанному селектору. Возвращаемое значение
форматируется для возможности тестирования. Цвета обрабатываются через [rgb2hex](https://www.npmjs.org/package/rgb2hex),
а все остальные свойства обрабатываются через [css-value](https://www.npmjs.org/package/css-value).

:::info

Обратите внимание, что сокращенные CSS свойства (например, `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) будут развернуты для получения всех полных свойств,
что приведет к множественным вызовам WebDriver. Если вас интересует конкретное полное свойство,
рекомендуется делать запрос непосредственно к нему.

:::

##### Использование

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>имя css свойства</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>css псевдоэлемент</td>
    </tr>
  </tbody>
</table>

##### Примеры

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

##### Возвращает

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  Указанное css свойство элемента
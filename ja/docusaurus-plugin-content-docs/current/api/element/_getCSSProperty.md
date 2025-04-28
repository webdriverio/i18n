---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

指定されたセレクタで選択されたDOM要素からCSSプロパティを取得します。戻り値は
テスト可能な形式にフォーマットされます。色は[rgb2hex](https://www.npmjs.org/package/rgb2hex)を介して解析され、
その他のすべてのプロパティは[css-value](https://www.npmjs.org/package/css-value)を介して解析されます。

:::info

短縮形のCSSプロパティ（例：`background`、`font`、`border`、`margin`、
`padding`、`list-style`、`outline`、`pause`、`cue`）は展開され、複数のWebDriverコールを
引き起こす長形式のプロパティをすべて取得します。特定の長形式のプロパティに関心がある場合は、
代わりにそれを直接クエリすることをお勧めします。

:::

##### 使用法

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>CSSプロパティ名</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>CSS疑似要素</td>
    </tr>
  </tbody>
</table>

##### 例

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

##### 戻り値

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  要素の指定されたCSSプロパティ
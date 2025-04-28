---
id: getCSSProperty
title: دریافت خاصیت CSS
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

دریافت یک خاصیت CSS از یک عنصر DOM که با انتخابگر مشخص شده انتخاب شده است. مقدار برگشتی
به گونه‌ای فرمت‌بندی شده که قابل آزمایش باشد. رنگ‌ها از طریق [rgb2hex](https://www.npmjs.org/package/rgb2hex)
تجزیه می‌شوند و تمامی خاصیت‌های دیگر از طریق [css-value](https://www.npmjs.org/package/css-value) تجزیه می‌شوند.

:::info

توجه داشته باشید که خاصیت‌های CSS میانبر (مانند `background`، `font`، `border`، `margin`، 
`padding`، `list-style`، `outline`، `pause`، `cue`) گسترش می‌یابند تا تمام خاصیت‌های طولانی را دریافت کنند
که منجر به چندین فراخوانی WebDriver می‌شود. اگر به یک خاصیت طولانی خاص علاقه‌مند هستید، توصیه می‌شود
به جای آن، آن خاصیت را مستقیماً جستجو کنید.

:::

##### استفاده

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>نام خاصیت CSS</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>شبه عنصر CSS</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

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

##### مقادیر برگشتی

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  خاصیت CSS مشخص شده عنصر
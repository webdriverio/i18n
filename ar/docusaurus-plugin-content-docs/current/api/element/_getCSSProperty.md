---
id: getCSSProperty
title: الحصول على خاصية CSS
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

الحصول على خاصية CSS من عنصر DOM محدد بواسطة المحدد المعطى. تتم صياغة القيمة المرجعة لتكون قابلة للاختبار. يتم تحليل الألوان عبر [rgb2hex](https://www.npmjs.org/package/rgb2hex) ويتم تحليل جميع الخصائص الأخرى عبر [css-value](https://www.npmjs.org/package/css-value).

:::info

لاحظ أن خصائص CSS المختصرة (مثل `background`، `font`، `border`، `margin`، `padding`، `list-style`، `outline`، `pause`، `cue`) سيتم توسيعها لجلب جميع الخصائص الطويلة مما يؤدي إلى استدعاءات متعددة لـ WebDriver. إذا كنت مهتمًا بخاصية طويلة محددة، يوصى بالاستعلام عنها بدلاً من ذلك.

:::

##### الاستخدام

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>اسم خاصية CSS</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>عنصر CSS الزائف</td>
    </tr>
  </tbody>
</table>

##### أمثلة

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

##### الإرجاع

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  خاصية CSS المحددة للعنصر
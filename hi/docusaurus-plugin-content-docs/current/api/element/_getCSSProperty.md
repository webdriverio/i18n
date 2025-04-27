---
id: getCSSProperty
title: सीएसएस प्रॉपर्टी प्राप्त करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

दिए गए सेलेक्टर द्वारा चुने गए DOM-एलिमेंट से CSS प्रॉपर्टी प्राप्त करें। रिटर्न वैल्यू
परीक्षण योग्य होने के लिए फॉर्मेट किया गया है। रंगों को [rgb2hex](https://www.npmjs.org/package/rgb2hex)
के माध्यम से पार्स किया जाता है और अन्य सभी प्रॉपर्टीज [css-value](https://www.npmjs.org/package/css-value) के माध्यम से पार्स की जाती हैं।

:::info

ध्यान दें कि शॉर्टहैंड CSS प्रॉपर्टीज (जैसे `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) को विस्तारित किया जाएगा जिससे सभी लॉन्गहैंड
प्रॉपर्टीज प्राप्त करने के लिए कई WebDriver कॉल्स होंगी। यदि आप किसी विशिष्ट
लॉन्गहैंड प्रॉपर्टी में रुचि रखते हैं, तो उसके लिए क्वेरी करना अनुशंसित है।

:::

##### उपयोग

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>टाइप</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>css प्रॉपर्टी का नाम</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>css स्यूडो एलिमेंट</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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

##### रिटर्न्स

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  एलिमेंट की निर्दिष्ट CSS
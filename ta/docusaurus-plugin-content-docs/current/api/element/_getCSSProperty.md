---
id: getCSSProperty
title: getCSSProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getCSSProperty.ts
---

கொடுக்கப்பட்ட தேர்வியால் தேர்ந்தெடுக்கப்பட்ட DOM-உறுப்பிலிருந்து css பண்புகளைப் பெறுங்கள். திரும்பப்பெறும் மதிப்பு சோதிக்கக்கூடியதாக வடிவமைக்கப்பட்டுள்ளது. வண்ணங்கள் [rgb2hex](https://www.npmjs.org/package/rgb2hex) மூலம் பகுப்பாய்வு செய்யப்படுகின்றன மற்றும் மற்ற அனைத்து பண்புகளும் [css-value](https://www.npmjs.org/package/css-value) மூலம் பகுப்பாய்வு செய்யப்படுகின்றன.

:::info

சுருக்கமான CSS பண்புகள் (எ.கா. `background`, `font`, `border`, `margin`,
`padding`, `list-style`, `outline`, `pause`, `cue`) பல WebDriver அழைப்புகளை விளைவிக்கும் அனைத்து நீண்ட கை பண்புகளையும் பெறுவதற்காக விரிவாக்கப்படும். நீங்கள் ஒரு குறிப்பிட்ட நீண்ட கை பண்பில் ஆர்வமாக இருந்தால், அதற்கு பதிலாக அதைக் கேட்பது பரிந்துரைக்கப்படுகிறது.

:::

##### பயன்பாடு

```js
$(selector).getCSSProperty(cssProperty, pseudoElement)
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cssProperty</var></code></td>
      <td>`string`</td>
      <td>css பண்பு பெயர்</td>
    </tr>
    <tr>
      <td><code><var>pseudoElement</var></code></td>
      <td>`PseudoElement`</td>
      <td>css போலி உறுப்பு</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

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

##### திரும்ப பெறுவது

- **&lt;CSSProperty&gt;**
            **<code><var>return</var></code>:**                  உறுப்பின் குறிப்பிட்ட css
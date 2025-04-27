---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

ஒரு குறிப்பிட்ட உறுப்பின் shadowRoot-க்குள் உள்ள உறுப்புகளை அணுகவும். நீங்கள் பல நெஸ்டட் ஷேடோ ரூட்களுடன் பணிபுரிந்தால், `shadow$$`-க்கு ஒரு மாற்று அணுகுமுறை [deep selector](https://webdriver.io/docs/selectors#deep-selectors) பயன்படுத்துவதாகும்.

:::info

WebdriverIO தானாகவே `$` அல்லது `$$` கட்டளைகளைப் பயன்படுத்தும்போது ஷேடோ ரூட்களை ஊடுருவும். 
இந்த கட்டளை WebDriver Bidi-ஐ ஆதரிக்காத சூழலில் நீங்கள் தானியங்கியாக இயக்கும்போது மட்டுமே தேவைப்படும், 
எ.கா. Appium மூலம் மொபைல் வெப் சோதனை.

:::

##### பயன்பாடு

```js
$(selector).shadow$$(selector)
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
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selector அல்லது ஒரு குறிப்பிட்ட உறுப்பை பெறுவதற்கான JS Function</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### திரும்பப் பெறுகிறது

- **&lt;WebdriverIO.ElementArray&gt;**
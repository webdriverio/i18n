---
id: shadow$
title: shadow$ (நிழல்$)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

குறிப்பிட்ட உறுப்பின் shadowRoot-க்குள் உள்ள ஒரு உறுப்பை அணுகுதல். நீங்கள் பல அடுக்கு நிழல் வேர்களுடன் (nested shadow roots) வேலை செய்கிறீர்கள் என்றால், `shadow$`-க்கு ஒரு மாற்று அணுகுமுறை [deep selector](https://webdriver.io/docs/selectors#deep-selectors) ஐப் பயன்படுத்துவதாகும்.

:::info

WebdriverIO தானாகவே `$` அல்லது `$$` கட்டளைகளைப் பயன்படுத்தும்போது நிழல் வேர்களை ஊடுருவுகிறது.
இந்த கட்டளை WebDriver Bidi-ஐ ஆதரிக்காத சூழலில் நீங்கள் தானியங்குபடுத்தும்போது மட்டுமே தேவைப்படுகிறது, எ.கா. Appium உடன் மொபைல் வெப் சோதனை.

:::

##### பயன்பாடு

```js
$(selector).shadow$(selector)
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
      <td>குறிப்பிட்ட உறுப்பைப் பெற தேர்வி அல்லது JS செயல்பாடு</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### திரும்பப் பெறுவது

- **&lt;WebdriverIO.Element&gt;**
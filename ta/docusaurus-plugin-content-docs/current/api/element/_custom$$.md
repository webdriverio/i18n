---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$$.ts
---

`customs$$` கட்டளை `browser.addLocatorStrategy` பயன்படுத்தி அறிவிக்கப்பட்ட தனிப்பயன் உத்தியைப் பயன்படுத்த உங்களை அனுமதிக்கிறது.
தனிப்பயன் தேர்வி உத்திகள் பற்றி [தேர்வி ஆவணங்களில்](../../selectors#custom-selector-strategies) மேலும் படிக்கவும்.

##### பயன்பாடு

```js
$(selector).custom$$(strategyName, strategyArguments)
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
      <td><code><var>strategyName</var></code></td>
      <td>`string`</td>
      <td></td>
    </tr>
    <tr>
      <td><code><var>strategyArguments</var></code></td>
      <td>`*`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="example.js"
it('should get all the plugin wrapper buttons', async () => {
    await browser.url('https://webdriver.io')
    await browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const pluginRowBlock = await browser.custom$('myStrat', '.pluginRowBlock')
    const pluginWrapper = await pluginRowBlock.custom$$('myStrat', '.pluginWrapper')

    console.log(pluginWrapper.length) // 4
})
```

##### திரும்பும் மதிப்பு

- **&lt;WebdriverIO.ElementArray&gt;**
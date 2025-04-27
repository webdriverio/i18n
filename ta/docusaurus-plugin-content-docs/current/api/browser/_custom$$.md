---
id: custom$$
title: தனிப்பயன்$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$$.ts
---

`customs$$` உங்களை `browser.addLocatorStrategy` பயன்படுத்தி அறிவிக்கப்பட்ட தனிப்பயன் உத்தியை பயன்படுத்த அனுமதிக்கிறது.
தனிப்பயன் தேர்வு உத்திகள் பற்றி மேலும் [தேர்வி ஆவணங்களில்](../../selectors#custom-selector-strategies) படிக்கவும்.

##### பயன்பாடு

```js
browser.custom$$(strategyName, strategyArguments)
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

##### உதாரணம்

```js title="example.js"
it('should get all the plugin wrapper buttons', async () => {
    await browser.url('https://webdriver.io')
    await browser.addLocatorStrategy('myStrategy', (selector) => {
        return document.querySelectorAll(selector)
    })

    const pluginWrapper = await browser.custom$$('myStrategy', '.pluginWrapper')

    console.log(await pluginWrapper.length) // 4
})
```

##### திரும்ப பெறுகிறது

- **&lt;WebdriverIO.ElementArray&gt;**
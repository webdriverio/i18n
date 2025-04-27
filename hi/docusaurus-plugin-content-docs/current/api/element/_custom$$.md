---
id: custom$$
title: कस्टम$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$$.ts
---

`customs$$` आपको एक कस्टम रणनीति का उपयोग करने की अनुमति देता है जिसे `browser.addLocatorStrategy` का उपयोग करके घोषित किया गया है।
कस्टम सेलेक्टर रणनीतियों के बारे में अधिक जानकारी [सेलेक्टर डॉक्स](../../selectors#custom-selector-strategies) में पढ़ें।

##### उपयोग

```js
$(selector).custom$$(strategyName, strategyArguments)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
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

##### उदाहरण

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

##### रिटर्न्स

- **&lt;WebdriverIO.ElementArray&gt;**
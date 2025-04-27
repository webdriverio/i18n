---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$$.ts
---

The `customs$$` allows you to use a custom strategy declared by using `browser.addLocatorStrategy`.
Read more on custom selector strategies in the [Selector docs](../../selectors#custom-selector-strategies).

##### Usage

```js
browser.custom$$(strategyName, strategyArguments)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
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

##### Example

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

##### Returns

- **&lt;WebdriverIO.ElementArray&gt;**
    


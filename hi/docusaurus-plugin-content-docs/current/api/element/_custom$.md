---
id: custom$
title: कस्टम$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$.ts
---

`custom$` आपको `browser.addLocatorStrategy` का उपयोग करके घोषित एक कस्टम रणनीति का उपयोग करने की अनुमति देता है।
कस्टम सेलेक्टर रणनीतियों के बारे में अधिक जानकारी [सेलेक्टर दस्तावेज़](../../selectors#custom-selector-strategies) में पढ़ें।

##### उपयोग

```js
$(selector).custom$(strategyName, strategyArguments)
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

```js reference title="customStrategy.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

```html reference title="example.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

```js reference title="customStrategy.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

```js title="example.js"
it('should fetch the project title', async () => {
    await browser.url('https://webdriver.io')
    await browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const header = await browser.custom$('myStrat', 'header')
    const projectTitle = await header.custom$('myStrat', '.projectTitle')

    console.log(projectTitle.getText()) // WEBDRIVER I/O
})
```

##### रिटर्न

- **&lt;WebdriverIO.Element&gt;**
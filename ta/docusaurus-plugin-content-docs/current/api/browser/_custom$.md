---
id: custom$
title: custom$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$.ts
---

`custom$` உங்களை `browser.addLocatorStrategy` பயன்படுத்தி அறிவிக்கப்பட்ட தனிப்பயன் உத்தியைப் பயன்படுத்த அனுமதிக்கிறது.
தனிப்பயன் தேர்வி உத்திகள் பற்றி [Selector docs](../../selectors#custom-selector-strategies) இல் மேலும் படிக்கவும்.

##### பயன்பாடு

```js
browser.custom$(strategyName, strategyArguments)
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

##### எடுத்துக்காட்டுகள்

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
    browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const projectTitle = await browser.custom$('myStrat', '.projectTitle')

    console.log(await projectTitle.getText()) // WEBDRIVER I/O
})
```

##### திருப்பி அனுப்புவது

- **&lt;WebdriverIO.Element&gt;**
---
id: newWindow
title: newWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Öppna nytt fönster eller flik i webbläsaren (standardvärdet är ett nytt fönster om inget annat anges).
Detta kommando är den motsvarande funktionen till `window.open()`. Detta kommando fungerar inte i mobila miljöer.

__Obs:__ När du anropar detta kommando växlar du automatiskt till det nya fönstret eller fliken.

##### Användning

```js
browser.newWindow(url, { type, windowName, windowFeatures })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>webbplatsens URL att öppna</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`NewWindowOptions`</td>
      <td>newWindow-kommandots alternativ</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string`</td>
      <td>typ av nytt fönster: 'tab' eller 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>namn på det nya fönstret</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>egenskaper för det öppnade fönstret (t.ex. storlek, position, rullningslister, etc.)</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### Returnerar

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Ett objekt som innehåller fönsterhanteraren och typen av nytt fönster `{handle: string, type: string}` handle - ID för fönsterhanteraren för den nya fliken eller fönstret, type - Typen av det nya fönstret, antingen 'tab' eller 'window'    
##### Kastar

- **Error**:  Om `url` är ogiltig, om kommandot används på mobil, eller om `type` inte är 'tab' eller 'window'.
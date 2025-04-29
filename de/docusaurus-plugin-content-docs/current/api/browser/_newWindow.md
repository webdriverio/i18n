---
id: newWindow
title: newWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Öffnet ein neues Fenster oder einen neuen Tab im Browser (standardmäßig ein neues Fenster, falls nicht anders angegeben).
Dieser Befehl ist die äquivalente Funktion zu `window.open()`. Dieser Befehl funktioniert nicht in mobilen Umgebungen.

__Hinweis:__ Beim Aufrufen dieses Befehls wechseln Sie automatisch zum neuen Fenster oder Tab.

##### Verwendung

```js
browser.newWindow(url, { type, windowName, windowFeatures })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>Website-URL zum Öffnen</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`NewWindowOptions`</td>
      <td>newWindow Befehlsoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Typ des neuen Fensters: 'tab' oder 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Name des neuen Fensters</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Eigenschaften des geöffneten Fensters (z.B. Größe, Position, Scrollbars, usw.)</td>
    </tr>
  </tbody>
</table>

##### Beispiele

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

##### Gibt zurück

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Ein Objekt, das den Fensterhandle und den Typ des neuen Fensters enthält `{handle: string, type: string}` handle - Die ID des Fensterhandles des neuen Tabs oder Fensters, type - Der Typ des neuen Fensters, entweder 'tab' oder 'window'
##### Wirft

- **Error**:  Wenn `url` ungültig ist, wenn der Befehl auf einem Mobilgerät verwendet wird oder `type` weder 'tab' noch 'window' ist.
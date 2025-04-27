---
id: newWindow
title: newWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Open new window or tab in browser (defaults to a new window if not specified).
This command is the equivalent function to `window.open()`. This command does not work in mobile environments.

__Note:__ When calling this command you automatically switch to the new window or tab.

##### Usage

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>website URL to open</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`NewWindowOptions`</td>
      <td>newWindow command options</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>type of new window: 'tab' or 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>name of the new window</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>features of opened window (e.g. size, position, scrollbars, etc.)</td>
    </tr>
  </tbody>
</table>

##### Examples

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

##### Returns

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           An object containing the window handle and the type of new window `{handle: string, type: string}` handle - The ID of the window handle of the new tab or window, type - The type of the new window, either 'tab' or 'window'    
##### Throws

- **Error**:  If `url` is invalid, if the command is used on mobile, or `type` is not 'tab' or 'window'.

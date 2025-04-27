---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Get the width and height for an DOM-element.

##### Usage

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>size to receive [optional] ("width" or "height")</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="getSize.js"
it('should demonstrate the getSize command', async () => {
    await browser.url('http://github.com')
    const logo = await $('.octicon-mark-github')

    const size = await logo.getSize()
    console.log(size) // outputs: { width: 32, height: 32 }

    const width = await logo.getSize('width')
    console.log(width) // outputs: 32

    const height = await logo.getSize('height')
    console.log(height) // outputs: 32
})
```

##### Returns

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     requested element size (`{ width: <Number>, height: <Number> }`) or actual width/height as number if prop param is given    


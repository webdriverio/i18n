---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Holt die Breite und Höhe für ein DOM-Element.

##### Verwendung

```js
$(selector).getSize(prop)
```

##### Parameter

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
      <td>Größe, die empfangen werden soll [optional] ("width" oder "height")</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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

##### Rückgabewert

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     angeforderte Elementgröße (`{ width: <Number>, height: <Number> }`) oder tatsächliche Breite/Höhe als Zahl, wenn der prop-Parameter angegeben ist

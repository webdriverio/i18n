---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Hämta bredd och höjd för ett DOM-element.

##### Användning

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>storlek att ta emot [valfri] ("width" eller "height")</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     begärd elementstorlek (`{ width: <Number>, height: <Number> }`) eller faktisk bredd/höjd som ett nummer om prop-parametern anges
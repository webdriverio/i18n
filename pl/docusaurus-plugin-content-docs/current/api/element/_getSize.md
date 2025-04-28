---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Pobierz szerokość i wysokość elementu DOM.

##### Użycie

```js
$(selector).getSize(prop)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>prop</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`String`</td>
      <td>rozmiar do otrzymania [opcjonalnie] ("width" lub "height")</td>
    </tr>
  </tbody>
</table>

##### Przykład

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

##### Zwraca

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     żądany rozmiar elementu (`{ width: <Number>, height: <Number> }`) lub rzeczywistą szerokość/wysokość jako liczbę, jeśli podano parametr prop
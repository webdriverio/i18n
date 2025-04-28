---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

Kommandot Get Element Property returnerar resultatet av att hämta en egenskap från ett
element.

##### Användning

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>namn på elementets egenskap</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Returnerar

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** värdet av egenskapen för det valda elementet
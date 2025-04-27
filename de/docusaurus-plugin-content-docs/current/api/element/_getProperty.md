---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

Der Befehl "Get Element Property" gibt das Ergebnis des Abrufens einer Eigenschaft eines
Elements zurück.

##### Verwendung

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>Name der Element-Eigenschaft</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Rückgabewert

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** der Wert der Eigenschaft des ausgewählten Elements

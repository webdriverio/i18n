---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

Polecenie Pobierz Właściwość Elementu zwróci wynik pobrania właściwości elementu.

##### Użycie

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>nazwa właściwości elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Zwraca

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** wartość właściwości wybranego elementu
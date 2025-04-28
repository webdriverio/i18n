---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

Il comando Get Element Property restituirà il risultato dell'ottenimento di una proprietà di un
elemento.

##### Utilizzo

```js
$(selector).getProperty(property)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>nome della proprietà dell'elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Restituisce

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** il valore della proprietà dell'elemento selezionato
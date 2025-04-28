---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Ottieni la larghezza e l'altezza di un elemento DOM.

##### Utilizzo

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>dimensione da ricevere [opzionale] ("width" o "height")</td>
    </tr>
  </tbody>
</table>

##### Esempio

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

##### Restituisce

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     dimensione dell'elemento richiesto (`{ width: <Number>, height: <Number> }`) o larghezza/altezza effettiva come numero se viene fornito il parametro prop
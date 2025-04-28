---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

Salva uno screenshot di un elemento in un file PNG sul tuo sistema operativo.

##### Utilizzo

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>percorso dell'immagine generata (è richiesto il suffisso `.png`) relativo alla directory di esecuzione</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### Restituisce

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             buffer dello screenshot
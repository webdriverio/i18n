---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Ridimensiona la dimensione esterna della finestra del browser secondo la larghezza e l'altezza fornite. In base al tuo sistema operativo, alcune finestre del browser potrebbero non consentire di avere una larghezza inferiore a `500px`. Se vuoi imitare il viewport di, ad esempio, un iPhone, dovresti considerare l'utilizzo del comando `setViewport`.

##### Utilizzo

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>il browser sarà ridimensionato alla larghezza fornita</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>il browser sarà ridimensionato all'altezza fornita</td>
    </tr>
  </tbody>
</table>

##### Restituisce

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null per browser *NO*W3C e Object `{x, y, width, height}` per browser W3C
---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

Questo comando di attesa è la tua arma universale se vuoi attendere qualcosa. Si aspetta una condizione
e attende fino a quando quella condizione viene soddisfatta con un valore veritiero.

:::info

A differenza di altri comandi degli elementi, WebdriverIO non attenderà che l'elemento esista per eseguire
questo comando.

:::

Un esempio comune è attendere fino a quando un certo elemento contiene un determinato testo (vedi esempio).

##### Utilizzo

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>condizione da attendere</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`WaitUntilOptions`</td>
      <td>opzioni del comando</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>tempo in ms (predefinito basato sul valore di configurazione [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>messaggio di errore da generare quando waitUntil va in timeout</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>intervallo tra i controlli della condizione (predefinito basato sul valore di configurazione [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Esempi

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true se la condizione è soddisfatta
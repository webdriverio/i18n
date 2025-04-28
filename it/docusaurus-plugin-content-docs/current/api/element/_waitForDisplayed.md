---
id: waitForDisplayed
title: waitForDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

Attendi che un elemento sia visualizzato o non visualizzato per il numero di millisecondi specificato.

:::info

A differenza di altri comandi elemento, WebdriverIO non attenderà che l'elemento esista per eseguire
questo comando.

:::

##### Utilizzo

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`WaitForOptions`</td>
      <td>opzioni waitForDisplayed (opzionali)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>tempo in ms (predefinito impostato in base al valore di configurazione [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>se true attende l'opposto (predefinito: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>se esiste, sostituisce il messaggio di errore predefinito</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>intervallo tra i controlli (predefinito: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>impostare a `true` per attendere fino a quando l'elemento è visualizzato all'interno del viewport (predefinito: `false`)</td>
    </tr>
  </tbody>
</table>

##### Esempi

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    se l'elemento è visualizzato (o non lo è se il flag è impostato)
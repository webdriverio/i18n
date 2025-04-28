---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Attendi che un elemento (selezionato tramite selettore css) sia abilitato o disabilitato per il numero di
millisecondi fornito. Se vengono interrogati più elementi dal selettore dato, restituisce true se almeno un elemento è abilitato o disabilitato.

:::info

A differenza di altri comandi di elemento, WebdriverIO non attenderà che l'elemento
esista per eseguire questo comando.

:::

##### Utilizzo

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td>opzioni di waitForEnabled (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>tempo in ms (valore predefinito basato sulla configurazione [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>se true attende l'opposto (predefinito: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>se esiste, sovrascrive il messaggio di errore predefinito</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>intervallo tra i controlli (predefinito: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Esempi

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     se l'elemento è abilitato/disabilitato
---
id: waitForClickable
title: waitForClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

Attendi che un elemento sia cliccabile o non cliccabile per il numero di millisecondi fornito.

:::info

A differenza di altri comandi dell'elemento, WebdriverIO non attenderà che l'elemento esista per eseguire
questo comando.

:::

##### Utilizzo

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td>opzioni waitForEnabled (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>tempo in ms (predefinito basato sul valore di configurazione [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>se true attende l'opposto (predefinito: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>se esiste sovrascrive il messaggio di errore predefinito</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>intervallo tra i controlli (predefinito: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### Ritorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  `true` se l'elemento è cliccabile (o non lo è se il flag è impostato)
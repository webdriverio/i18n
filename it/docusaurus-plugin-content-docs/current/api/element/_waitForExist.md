---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Attende che un elemento sia presente nel DOM per il numero
di millisecondi specificato. Restituisce true se il selettore
corrisponde ad almeno un elemento esistente nel DOM, altrimenti genera un
errore. Se il flag reverse è true, il comando restituirà true
se il selettore non corrisponde a nessun elemento.

:::info

A differenza di altri comandi per elementi, WebdriverIO non attenderà
che l'elemento esista per eseguire questo comando.

:::

##### Utilizzo

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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

##### Esempio

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     se l'elemento esiste (o non esiste se il flag è impostato)
---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Imposta i timeout associati alla sessione corrente, le durate dei timeout controllano
comportamenti come timeout sull'iniezione di script, navigazione dei documenti e recupero degli elementi.
Per maggiori informazioni ed esempi, vedi [guida ai timeout](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

Non è consigliato impostare timeout `implicit` poiché influenzano il comportamento di WebdriverIO
e possono causare errori in determinati comandi, ad esempio `waitForExist` con flag inverso.

:::

##### Utilizzo

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Oggetto contenente i valori dei timeout della sessione</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>Tempo in millisecondi per riprovare la strategia di localizzazione dell'elemento durante la ricerca di un elemento.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>Tempo in millisecondi di attesa per il completamento del caricamento del documento.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>Gli script iniettati con [`execute`](https://webdriver.io/docs/api/browser/execute) o [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) verranno eseguiti fino a raggiungere la durata del timeout dello script, che è anch'essa espressa in millisecondi.</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```
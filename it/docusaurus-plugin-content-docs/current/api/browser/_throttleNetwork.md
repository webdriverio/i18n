---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Limita le capacità di rete del browser. Questo può aiutare a
emulare determinati scenari in cui un utente perde la connessione internet
e la tua app deve affrontare questa situazione.

Ci sono molti preset disponibili con configurazioni predefinite per facilità d'uso.
Sono `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Puoi vedere i valori per questi preset [nel codice sorgente](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Nota che l'utilizzo del comando `throttleNetwork` richiede il supporto del protocollo Chrome DevTools e, ad esempio,
non può essere utilizzato durante l'esecuzione di test automatizzati nel cloud. Il protocollo Chrome DevTools non è installato per impostazione predefinita,
usa `npm install puppeteer-core` per installarlo.
Scopri di più nella sezione [Protocolli di Automazione](/docs/automationProtocols).

:::

##### Utilizzo

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>parametri per la limitazione</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>True per emulare la disconnessione da internet.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Latenza minima dall'invio della richiesta alla ricezione delle intestazioni di risposta (ms).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Throughput massimo aggregato di download (bytes/sec). -1 disabilita la limitazione del download.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Throughput massimo aggregato di upload (bytes/sec). -1 disabilita la limitazione dell'upload.</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```
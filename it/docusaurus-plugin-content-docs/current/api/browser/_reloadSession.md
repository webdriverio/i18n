---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Crea una nuova sessione Selenium con le tue capacità attuali. Questo è utile se
testi applicazioni altamente stateful dove hai bisogno di pulire la sessione del browser tra
i test nel tuo file spec per evitare di creare centinaia di singoli file di test con WDIO.
Fai attenzione però, questo comando influisce notevolmente sul tempo di test poiché generare
nuove sessioni Selenium richiede molto tempo, specialmente quando si utilizzano servizi cloud.

Parametri di connessione come hostname, port, protocol, ecc. possono essere aggiunti insieme a
browserName quando vuoi connetterti a un servizio remoto diverso. Questo è utile
in una situazione, ad esempio, dove inizi un test in un'app nativa e hai bisogno di verificare
dati in un'app web.

Se parti da un servizio remoto, puoi passare 0.0.0.0 come hostname se vuoi
passare a driver locali.

##### Utilizzo

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>nuove capacità con cui creare una sessione</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```
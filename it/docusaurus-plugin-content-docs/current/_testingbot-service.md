---
id: testingbot-service
title: Servizio Testingbot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---


> Servizio WebdriverIO che fornisce una migliore integrazione con TestingBot. Aggiorna i metadati del job ('name', 'passed', 'tags', 'public', 'build', 'extra') ed esegue TestingBot Tunnel se desiderato.

## Installazione

Il modo più semplice è mantenere `@wdio/testingbot-service` come devDependency nel tuo file `package.json`, tramite:

```sh
npm install @wdio/testingbot-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)

## Configurazione

Per utilizzare il servizio è necessario impostare `user` e `key` nel tuo file `wdio.conf.js`, e impostare l'opzione `hostname` su `hub.testingbot.com`. Se desideri utilizzare [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)
devi impostare `tbTunnel: true`.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## Opzioni

Per autorizzare il servizio TestingBot, la tua configurazione deve contenere le opzioni [`user`](https://webdriver.io/docs/options#user) e [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
Se impostato a true, esegue TestingBot Tunnel e apre una connessione sicura tra una macchina virtuale TestingBot che esegue i test del browser.

Tipo: `Boolean`<br />
Predefinito: `false`

### tbTunnelOpts
Applica le opzioni di TestingBot Tunnel (ad esempio per modificare il numero di porta o le impostazioni del logFile). Vedi [questa lista](https://github.com/testingbot/testingbot-tunnel-launcher) per maggiori informazioni.

Tipo: `Object`<br />
Predefinito: `{}`
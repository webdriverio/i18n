---
id: wdio-electron-service
title: Servizio Electron
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service è un pacchetto di terze parti, per maggiori informazioni consulta [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**Servizio WebdriverIO per testare applicazioni Electron**

Consente test E2E multipiattaforma di applicazioni Electron tramite l'ampio ecosistema WebdriverIO.

Successore spirituale di [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Caratteristiche

Rende il testing delle applicazioni Electron molto più semplice tramite:

- 🚗 configurazione automatica di Chromedriver richiesto (per Electron v26 e superiori)
- 📦 rilevamento automatico del percorso della tua applicazione Electron
  - supporta [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) e app non pacchettizzate
- 🧩 accesso alle API Electron all'interno dei tuoi test
- 🕵️ simulazione delle API Electron tramite un'API simile a Vitest

## Installazione

Dovrai installare `WebdriverIO`, le istruzioni possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Avvio Rapido

Il modo consigliato per iniziare rapidamente è utilizzare il [wizard di configurazione WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Avvio Rapido Manuale

Per iniziare senza utilizzare il wizard di configurazione, dovrai installare il servizio e `@wdio/cli`:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

Oppure utilizza il gestore di pacchetti che preferisci - pnpm, yarn, ecc.

Successivamente, crea il tuo file di configurazione WDIO. Se hai bisogno di ispirazione, c'è una configurazione funzionante nella [directory di esempio](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) di questo repository, oltre alla [pagina di riferimento della configurazione WDIO](https://webdriver.io/docs/configuration).

Dovrai aggiungere `electron` al tuo array di servizi e impostare una capacità Electron, ad esempio:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

Infine, [esegui alcuni test](https://webdriver.io/docs/gettingstarted#run-test) utilizzando il tuo file di configurazione.

Questo avvierà un'istanza della tua app nello stesso modo in cui WDIO gestisce browser come Chrome o Firefox. Il servizio funziona con [WDIO (parallel) multiremote](https://webdriver.io/docs/multiremote) se hai bisogno di eseguire ulteriori istanze contemporaneamente, ad esempio più istanze della tua app o diverse combinazioni della tua app e un browser Web.

Se utilizzi [Electron Forge](https://www.electronforge.io/) o [Electron Builder](https://www.electron.build/) per pacchettizzare la tua app, il servizio tenterà automaticamente di trovare il percorso verso la tua applicazione Electron pacchettizzata. Puoi fornire un percorso personalizzato al binario tramite capacità di servizio personalizzate, ad esempio:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

Consulta il [documento di configurazione](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath) per scoprire come trovare il valore `appBinaryPath` per i diversi sistemi operativi supportati da Electron.

In alternativa, puoi indirizzare il servizio a un'app non pacchettizzata fornendo il percorso allo script `main.js`. Electron dovrà essere installato nei tuoi `node_modules`. Si consiglia di pacchettizzare le app non impacchettate utilizzando un bundler come Rollup, Parcel, Webpack, ecc.

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## Configurazione Chromedriver

**Se la tua app utilizza una versione di Electron inferiore alla v26, dovrai [configurare manualmente Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Questo perché WDIO utilizza Chrome for Testing per scaricare Chromedriver, che fornisce solo versioni di Chromedriver v115 o successive.

## Documentazione

**[Configurazione del Servizio](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Configurazione Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Accesso alle API Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Simulazione delle API Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Gestione delle Finestre](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Modalità Standalone](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Sviluppo](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Problemi Comuni e Debugging](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Sviluppo

Leggi il [documento di sviluppo](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md) se sei interessato a contribuire.

## Integrazioni di esempio

Dai un'occhiata al nostro progetto [Electron boilerplate](https://github.com/webdriverio/electron-boilerplate) che mostra come integrare WebdriverIO in un'applicazione di esempio. Puoi anche dare un'occhiata alle directory [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) e [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) in questo repository.

## Supporto

Se riscontri problemi nell'esecuzione di WDIO con il servizio, dovresti controllare i [Problemi Comuni](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md) documentati in prima istanza, quindi aprire una discussione nel [forum principale di WDIO](https://github.com/webdriverio/webdriverio/discussions).

Il forum di discussione del servizio Electron è molto meno attivo di quello di WDIO, ma se il problema che stai riscontrando è specifico di Electron o dell'utilizzo del servizio, puoi aprire una discussione [qui](https://github.com/webdriverio-community/wdio-electron-service/discussions).
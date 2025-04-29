---
id: browserstack-service
title: Servizio Browserstack
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un servizio WebdriverIO che gestisce il tunnel locale e i metadati dei job per gli utenti di BrowserStack.

## Installazione


Il modo più semplice è mantenere `@wdio/browserstack-service` come devDependency nel tuo file `package.json`, tramite:

```sh
npm install @wdio/browserstack-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)


## Configurazione

WebdriverIO ha il supporto per BrowserStack integrato. Dovresti impostare `user` e `key` nel tuo file `wdio.conf.js`. Questo plugin di servizio fornisce supporto per [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Imposta anche `browserstackLocal: true` per attivare questa funzionalità.
Il reporting dello stato della sessione su BrowserStack rispetterà l'impostazione `strict` delle opzioni Cucumber.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## Opzioni

Per autorizzare il servizio BrowserStack, la tua configurazione deve contenere le opzioni [`user`](https://webdriver.io/docs/options#user) e [`key`](https://webdriver.io/docs/options#key).

### testObservability

Test Observability è uno strumento avanzato di reportistica dei test che fornisce informazioni per migliorare i tuoi test automatizzati e ti aiuta a debuggare più velocemente. È abilitato di default impostando il flag `testObservability` su `true` per tutti gli utenti del browserstack-service. Puoi disabilitarlo impostando il flag `testObservability` su `false`.

Una volta terminati i test, puoi visitare [Test Observability](https://observability.browserstack.com/) per debuggare le tue build con ulteriori approfondimenti come l'Analisi degli Errori Unici, il Rilevamento Automatico dei Test Instabili e altro ancora.

Puoi utilizzare Test Observability anche se non esegui i tuoi test sull'infrastruttura BrowserStack. Anche se esegui i tuoi test su un CI, una macchina locale o persino su altri fornitori di servizi cloud, Test Observability può comunque generare report di test intelligenti e analisi avanzate sui tuoi test.

Se vuoi utilizzare Test Observability senza eseguire i tuoi test sull'infrastruttura BrowserStack, puoi impostare la tua configurazione come segue:


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

Puoi esplorare tutte le funzionalità di Test Observability in [questa sandbox](https://observability-demo.browserstack.com/) o leggere ulteriori informazioni [qui](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
Imposta questo a true per abilitare l'instradamento delle connessioni dal cloud BrowserStack attraverso il tuo computer.

Tipo: `Boolean`<br />
Default: `false`

### forcedStop
Imposta questo a true per terminare il processo BrowserStack Local al completamento, senza attendere che venga chiamata la callback di arresto di BrowserStack Local. Questa è una funzione sperimentale e non dovrebbe essere utilizzata da tutti. Principalmente necessaria come soluzione per [questo problema](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

Tipo: `Boolean`<br />
Default: `false`

### app

[Appium](https://appium.io/) imposta questo con il percorso del file dell'app disponibile localmente sulla tua macchina per utilizzare l'app come [applicazione da testare](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) per le sessioni Appium.

Tipo: `String` o `JsonObject`<br />
Default: `undefined`

Elenco dei valori disponibili per l'app:

#### path
Utilizza il percorso del file dell'app disponibile localmente come applicazione da testare per Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OPPURE
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

Passa custom_id durante il caricamento dell'app.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
Utilizza l'URL dell'app restituito dopo aver caricato l'app su BrowserStack.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OPPURE
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

usa custom_id di app già caricate

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OPPURE
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

usa shareable_id di app già caricate

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OPPURE
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Solo per Cucumber. Imposta il nome della sessione BrowserStack Automate sul nome dello Scenario solo se è stato eseguito un singolo Scenario.
Utile quando si esegue in parallelo con [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Tipo: `Boolean`<br />
Default: `false`

### sessionNameFormat

Personalizza il formato del nome della sessione BrowserStack Automate.

Tipo: `Function`<br />
Default (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Default (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Solo per Mocha. Non aggiungere il titolo del test al nome della sessione BrowserStack Automate.

Tipo: `Boolean`<br />
Default: `false`

### sessionNamePrependTopLevelSuiteTitle

Solo per Mocha. Antepone il titolo della suite di livello superiore al nome della sessione BrowserStack Automate.

Tipo: `Boolean`<br />
Default: `false`

### setSessionName

Imposta automaticamente il nome della sessione BrowserStack Automate.

Tipo: `Boolean`<br />
Default: `true`

### setSessionStatus

Imposta automaticamente lo stato della sessione BrowserStack Automate (passato/fallito).

Tipo: `Boolean`<br />
Default: `true`

### buildIdentifier

**buildIdentifier** è un ID unico per differenziare ogni esecuzione che viene aggiunto a buildName. Scegli il formato del tuo buildIdentifier tra le espressioni disponibili:
* `BUILD_NUMBER`: Genera un contatore incrementale ad ogni esecuzione
* `DATE_TIME`: Genera un timestamp ad ogni esecuzione. Es. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier supporta l'uso di una o entrambe le espressioni insieme a qualsiasi altro carattere, permettendo opzioni di formattazione personalizzate.

### opts

Opzioni BrowserStack Local.

Tipo: `Object`<br />
Default: `{}`

Elenco dei modificatori disponibili per i test locali da passare come opts:

#### Local Identifier

Se si effettuano più connessioni di test locali simultanee, impostalo in modo univoco per processi diversi -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

Per abilitare la registrazione dettagliata -

```js
opts = { verbose: "true" };
```

Nota - I valori possibili per il modificatore 'verbose' sono '1', '2', '3' e 'true'

#### Force Local

Per instradare tutto il traffico tramite la macchina locale (tua) -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

Per testare la cartella locale anziché il server interno, fornisci il percorso alla cartella come valore di questa opzione -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

Per terminare altre istanze di BrowserStack Local in esecuzione -

```js
opts = { force: "true" };
```

#### Only Automate

Per disabilitare i test locali per Live e Screenshots e abilitare solo Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

Per utilizzare un proxy per i test locali -

- proxyHost: Hostname/IP del proxy, le altre opzioni proxy vengono ignorate se questa opzione è assente
- proxyPort: Porta per il proxy, predefinita a 3128 quando viene utilizzato -proxyHost
- proxyUser: Nome utente per la connessione al proxy (solo Basic Auth)
- proxyPass: Password per USERNAME, verrà ignorata se USERNAME è vuoto o non specificato

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

Per utilizzare un proxy locale nei test locali -

- localProxyHost: Hostname/IP del proxy, le altre opzioni proxy vengono ignorate se questa opzione è assente
- localProxyPort: Porta per il proxy, predefinita a 8081 quando viene utilizzato -localProxyHost
- localProxyUser: Nome utente per la connessione al proxy (solo Basic Auth)
- localProxyPass: Password per USERNAME, verrà ignorata se USERNAME è vuoto o non specificato

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

Per utilizzare PAC (Proxy Auto-Configuration) nei test locali -

- pac-file: Percorso assoluto del file PAC (Proxy Auto-Configuration)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

Per impostazione predefinita, i wrapper BrowserStack local cercano di scaricare ed eseguire l'ultima versione del binario BrowserStack in ~/.browserstack o nella directory di lavoro corrente o nella cartella tmp in ordine. Ma puoi sovrascrivere questi passando l'argomento -binarypath.
Percorso per specificare il percorso binario locale -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

Per salvare i log in un file durante l'esecuzione con l'argomento '-v', puoi specificare il percorso del file. Per impostazione predefinita, i log vengono salvati nel file local.log nella directory di lavoro corrente.
Per specificare il percorso del file in cui verranno salvati i log -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

Per ulteriori informazioni su WebdriverIO visita la [homepage](https://webdriver.io).
---
id: capabilities
title: Capability
description: "Definisci le capability per scegliere il browser o l'ambiente mobile in cui vengono eseguiti i tuoi test, incluse le capability personalizzate dei fornitori e i casi d'uso speciali."
---

Una capability è una definizione per un'interfaccia remota. Aiuta WebdriverIO a capire in quale browser o ambiente mobile desideri eseguire i tuoi test. Le capability sono meno cruciali quando si sviluppano test in locale, poiché la maggior parte delle volte li esegui su un'unica interfaccia remota, ma diventano più importanti quando si esegue un ampio insieme di test di integrazione in CI/CD.

:::info

Il formato di un oggetto capability è ben definito dalla [specifica WebDriver](https://w3c.github.io/webdriver/#capabilities). Il testrunner di WebdriverIO fallirà subito se le capability definite dall'utente non rispettano tale specifica.

:::

## Capability personalizzate

Sebbene il numero di capability definite in modo fisso sia molto ridotto, chiunque può fornire e accettare capability personalizzate specifiche per il driver di automazione o l'interfaccia remota:

### Estensioni delle capability specifiche per browser

- `goog:chromeOptions`: estensioni di [Chromedriver](https://chromedriver.chromium.org/capabilities), applicabili solo per i test in Chrome
- `moz:firefoxOptions`: estensioni di [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), applicabili solo per i test in Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) per specificare l'ambiente quando si utilizza EdgeDriver per testare Chromium Edge

### Estensioni delle capability dei fornitori cloud

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- e molti altri...

### Estensioni delle capability dei motori di automazione

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- e molti altri...

### Capability di WebdriverIO per gestire le opzioni del driver del browser

WebdriverIO si occupa di installare ed eseguire il driver del browser per te. WebdriverIO utilizza una capability personalizzata che ti consente di passare parametri al driver.

#### `wdio:chromedriverOptions`

Opzioni specifiche passate a Chromedriver al suo avvio.

#### `wdio:geckodriverOptions`

Opzioni specifiche passate a Geckodriver al suo avvio.

#### `wdio:edgedriverOptions`

Opzioni specifiche passate a Edgedriver al suo avvio.

#### `wdio:safaridriverOptions`

Opzioni specifiche passate a Safari al suo avvio.

#### `wdio:maxInstances`

<Option type="number">

Numero massimo totale di worker eseguiti in parallelo per lo specifico browser/capability. Ha la precedenza su [maxInstances](#configuration#maxInstances) e [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Definisce le spec per l'esecuzione dei test per quel browser/capability. Uguale alla [normale opzione di configurazione `specs`](configuration#specs), ma specifica per il browser/capability. Ha la precedenza su `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Esclude le spec dall'esecuzione dei test per quel browser/capability. Uguale alla [normale opzione di configurazione `exclude`](configuration#exclude), ma specifica per il browser/capability. L'esclusione avviene dopo l'applicazione dell'opzione di configurazione globale `exclude`.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

Per impostazione predefinita, WebdriverIO tenta di stabilire una sessione WebDriver Bidi. Se preferisci di no, puoi impostare questo flag per disabilitare questo comportamento.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Scarica il Chromedriver incluso in questa release di Electron invece di quello di Chrome for Testing, per testare un'app Electron impostata come `goog:chromeOptions.binary`. Se è impostato anche `browserVersion`, WebdriverIO utilizza invece il Chromedriver per quella versione quando la release di Electron non può essere scaricata o quando è impostato `CHROMEDRIVER_CDNURL`. Le versioni nightly provengono da [electron/nightlies](https://github.com/electron/nightlies/releases). Il servizio Electron la imposta automaticamente in base alla versione di Electron dell'app.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // una sessione BiDi sostituisce la finestra dell'app con `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Opzioni comuni dei driver

Sebbene tutti i driver offrano parametri di configurazione diversi, ce ne sono alcuni comuni che WebdriverIO comprende e utilizza per configurare il driver o il browser:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Il percorso della radice della directory di cache. Questa directory viene utilizzata per memorizzare tutti i driver scaricati durante il tentativo di avviare una sessione.

</Option>

##### `binary`

<Option type="string">

Percorso di un binario del driver personalizzato. Se impostato, WebdriverIO non tenterà di scaricare un driver ma utilizzerà quello fornito da questo percorso. Assicurati che il driver sia compatibile con il browser che stai utilizzando.

Puoi fornire questo percorso tramite le variabili d'ambiente `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` o `EDGEDRIVER_PATH`.

</Option>
:::caution

Se il `binary` del driver è impostato, WebdriverIO non tenterà di scaricare un driver ma utilizzerà quello fornito da questo percorso. Assicurati che il driver sia compatibile con il browser che stai utilizzando.

:::

#### Host personalizzato per il download dei driver

Se le CDN pubbliche dei driver non sono raggiungibili dal tuo ambiente, ad esempio perché esegui i test dietro un proxy aziendale o replichi i driver in un registro di artefatti interno, puoi indirizzare il download verso un host personalizzato utilizzando le seguenti variabili d'ambiente:

- Chrome: `CHROMEDRIVER_CDNURL`, predefinito `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, predefinito `https://msedgedriver.microsoft.com`

Il mirror deve servire gli archivi dei driver sotto gli stessi percorsi della CDN originale, ad esempio per Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

che risolve il driver in `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`, dove `<platform>` è uno tra `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` o `win64`, ad esempio `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Ambienti completamente offline

Queste variabili reindirizzano solo il download del driver. Per impedire del tutto a WebdriverIO di accedere a Internet pubblico, devono essere soddisfatte altre quattro condizioni:

- **Un browser deve essere disponibile localmente.** Se WebdriverIO non trova un Chrome o Firefox installato, scarica anche il browser, e tale download non rispetta queste variabili. Installa il browser sulla macchina oppure indica a WebdriverIO dove trovarlo tramite `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **Usa un numero di versione completo.** Se `browserVersion` viene omesso, WebdriverIO legge la versione esatta dal browser locale e non è necessaria alcuna ricerca della versione. Se lo imposti, usa la versione completa in quattro parti, ad esempio `140.0.7339.207`. Un canale di rilascio (`stable`), una milestone (`140`) o una versione parziale (`140.0.7339`) richiedono una ricerca della versione su un endpoint pubblico di Google che non può essere reindirizzato.
- **Chromedriver deve provenire da Chrome for Testing.** Per Chrome precedente a `153.0.8001.0` su Linux ARM64, e con `wdio:electronVersion` ma senza `browserVersion`, Chromedriver viene scaricato dalle release GitHub di Electron, che queste variabili non reindirizzano.
- **Assicurati che il mirror contenga effettivamente la versione di cui hai bisogno.** Se il driver non può essere recuperato dal tuo host — perché la versione non è replicata, ma ugualmente perché l'url è errato o le credenziali sono state rifiutate — WebdriverIO registra un avviso e poi cerca la versione valida nota più vicina, interrogando di nuovo l'endpoint pubblico. Controlla nell'avviso l'host che ha tentato di contattare se un'esecuzione accede inaspettatamente a Internet o sceglie una versione che non hai richiesto.

:::

#### Opzioni dei driver specifiche per browser

Per propagare le opzioni al driver puoi utilizzare le seguenti capability personalizzate:

- Chrome o Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort

<Option type="number">

La porta su cui deve essere eseguito il driver ADB.

Esempio: `9515`

</Option>

##### urlBase

<Option type="string">

Prefisso del percorso URL di base per i comandi, ad esempio `wd/url`.

Esempio: `/`

</Option>

##### logPath

<Option type="string">

Scrive il log del server su file invece che su stderr, aumenta il livello di log a `INFO`

</Option>

##### logLevel

<Option type="string">

Imposta il livello di log. Opzioni possibili `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Log dettagliato (equivalente a `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

Nessun log (equivalente a `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Aggiunge al file di log invece di sovrascriverlo.

</Option>

##### replayable

<Option type="boolean">

Log dettagliato senza troncare le stringhe lunghe, in modo che il log possa essere riprodotto (sperimentale).

</Option>

##### readableTimestamp

<Option type="boolean">

Aggiunge timestamp leggibili al log.

</Option>

##### enableChromeLogs

<Option type="boolean">

Mostra i log del browser (sovrascrive le altre opzioni di logging).

</Option>

##### bidiMapperPath

<Option type="string">

Percorso personalizzato del bidi mapper.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Allowlist, separata da virgole, degli indirizzi IP remoti autorizzati a connettersi a EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Allowlist, separata da virgole, delle origini delle richieste autorizzate a connettersi a EdgeDriver. Usare `*` per consentire qualsiasi origine host è pericoloso!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Opzioni da passare al processo del driver.

</Option>
</TabItem>
<TabItem value="firefox">

Consulta tutte le opzioni di Geckodriver nel [pacchetto ufficiale del driver](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Consulta tutte le opzioni di Edgedriver nel [pacchetto ufficiale del driver](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Consulta tutte le opzioni di Safaridriver nel [pacchetto ufficiale del driver](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Capability speciali per casi d'uso specifici

Questo è un elenco di esempi che mostrano quali capability devono essere applicate per ottenere un determinato caso d'uso.

### Eseguire il browser in modalità headless

Eseguire un browser headless significa eseguire un'istanza del browser senza finestra o interfaccia utente. Questo viene utilizzato principalmente in ambienti CI/CD in cui non è presente un display. Per eseguire un browser in modalità headless, applica le seguenti capability:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // oppure 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Sembra che Safari [non supporti](https://discussions.apple.com/thread/251837694) l'esecuzione in modalità headless.

</TabItem>
</Tabs>

### Automatizzare diversi canali del browser

Se desideri testare una versione del browser non ancora rilasciata come stabile, ad esempio Chrome Canary, puoi farlo impostando le capability e indicando il browser che desideri avviare, ad esempio:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Quando si testa su Chrome, WebdriverIO scaricherà automaticamente la versione del browser e il driver desiderati in base al `browserVersion` definito, ad esempio:

```ts
{
    browserName: 'chrome', // oppure 'chromium'
    browserVersion: '116' // oppure '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' o 'latest' (uguale a 'canary')
}
```

Se desideri testare un browser scaricato manualmente, puoi fornire un percorso del binario del browser tramite:

```ts
{
    browserName: 'chrome',  // oppure 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Inoltre, se desideri utilizzare un driver scaricato manualmente, puoi fornire un percorso del binario del driver tramite:

```ts
{
    browserName: 'chrome', // oppure 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Quando si testa su Firefox, WebdriverIO scaricherà automaticamente la versione del browser e il driver desiderati in base al `browserVersion` definito, ad esempio:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // oppure 'latest'
}
```

Se desideri testare una versione scaricata manualmente, puoi fornire un percorso del binario del browser tramite:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Inoltre, se desideri utilizzare un driver scaricato manualmente, puoi fornire un percorso del binario del driver tramite:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Quando si testa su Microsoft Edge, assicurati di avere installata sulla tua macchina la versione del browser desiderata. Puoi indicare a WebdriverIO il browser da eseguire tramite:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO scaricherà automaticamente la versione del driver desiderata in base al `browserVersion` definito, ad esempio:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // oppure '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Inoltre, se desideri utilizzare un driver scaricato manualmente, puoi fornire un percorso del binario del driver tramite:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Quando si testa su Safari, assicurati di avere installato sulla tua macchina [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/). Puoi indicare a WebdriverIO quella versione tramite:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Estendere le capability personalizzate

Se desideri definire un tuo insieme di capability, ad esempio per memorizzare dati arbitrari da utilizzare nei test per quella specifica capability, puoi farlo impostando, ad esempio:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // configurazioni personalizzate
        }
    }]
}
```

Si consiglia di seguire il [protocollo W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) per quanto riguarda la denominazione delle capability, che richiede un carattere `:` (due punti) per indicare un namespace specifico dell'implementazione. All'interno dei tuoi test puoi accedere alla tua capability personalizzata, ad esempio, tramite:

```ts
browser.capabilities['custom:caps']
```

Per garantire la sicurezza dei tipi puoi estendere l'interfaccia delle capability di WebdriverIO tramite:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```
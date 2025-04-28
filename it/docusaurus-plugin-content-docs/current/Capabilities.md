---
id: capabilities
title: Funzionalità
---

Una funzionalità (capability) è una definizione per un'interfaccia remota. Aiuta WebdriverIO a comprendere in quale ambiente browser o mobile desideri eseguire i tuoi test. Le funzionalità sono meno cruciali quando si sviluppano test localmente, poiché li esegui su un'unica interfaccia remota la maggior parte delle volte, ma diventano più importanti quando si esegue un ampio set di test di integrazione in CI/CD.

:::info

Il formato di un oggetto capability è ben definito dalla [specifica WebDriver](https://w3c.github.io/webdriver/#capabilities). Il testrunner di WebdriverIO fallirà in anticipo se le capabilities definite dall'utente non rispettano tale specifica.

:::

## Funzionalità personalizzate

Mentre il numero di funzionalità fisse definite è molto basso, chiunque può fornire e accettare funzionalità personalizzate specifiche per il driver di automazione o l'interfaccia remota:

### Estensioni di funzionalità specifiche per browser

- `goog:chromeOptions`: estensioni [Chromedriver](https://chromedriver.chromium.org/capabilities), applicabili solo per i test in Chrome
- `moz:firefoxOptions`: estensioni [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), applicabili solo per i test in Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) per specificare l'ambiente quando si utilizza EdgeDriver per testare Chromium Edge

### Estensioni di funzionalità per fornitori cloud

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- e molti altri...

### Estensioni di funzionalità per motori di automazione

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- e molti altri...

### Funzionalità di WebdriverIO per gestire le opzioni dei driver del browser

WebdriverIO gestisce l'installazione e l'esecuzione del driver del browser per te. WebdriverIO utilizza una funzionalità personalizzata che ti consente di passare parametri al driver.

#### `wdio:chromedriverOptions`

Opzioni specifiche passate a Chromedriver all'avvio.

#### `wdio:geckodriverOptions`

Opzioni specifiche passate a Geckodriver all'avvio.

#### `wdio:edgedriverOptions`

Opzioni specifiche passate a Edgedriver all'avvio.

#### `wdio:safaridriverOptions`

Opzioni specifiche passate a Safari all'avvio.

#### `wdio:maxInstances`

Numero massimo di worker paralleli in esecuzione per il browser/funzionalità specifico. Ha la precedenza su [maxInstances](#configuration#maxInstances) e [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Tipo: `number`

#### `wdio:specs`

Definisce le specifiche per l'esecuzione del test per quel browser/funzionalità. Uguale all'[opzione di configurazione normale `specs`](configuration#specs), ma specifica per il browser/funzionalità. Ha la precedenza su `specs`.

Tipo: `(String | String[])[]`

#### `wdio:exclude`

Esclude le specifiche dall'esecuzione del test per quel browser/funzionalità. Uguale all'[opzione di configurazione normale `exclude`](configuration#exclude), ma specifica per il browser/funzionalità. Ha la precedenza su `exclude`.

Tipo: `String[]`

#### `wdio:enforceWebDriverClassic`

Per impostazione predefinita, WebdriverIO tenta di stabilire una sessione WebDriver Bidi. Se non preferisci questo comportamento, puoi impostare questo flag per disabilitarlo.

Tipo: `boolean`

#### Opzioni di driver comuni

Mentre tutti i driver offrono parametri di configurazione diversi, ce ne sono alcuni comuni che WebdriverIO comprende e utilizza per configurare il driver o il browser:

##### `cacheDir`

Il percorso alla radice della directory di cache. Questa directory viene utilizzata per memorizzare tutti i driver che vengono scaricati quando si tenta di avviare una sessione.

Tipo: `string`<br />
Predefinito: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Percorso a un binario del driver personalizzato. Se impostato, WebdriverIO non tenterà di scaricare un driver ma utilizzerà quello fornito da questo percorso. Assicurati che il driver sia compatibile con il browser che stai utilizzando.

Puoi fornire questo percorso tramite le variabili di ambiente `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` o `EDGEDRIVER_PATH`.

Tipo: `string`

:::caution

Se il `binary` del driver è impostato, WebdriverIO non tenterà di scaricare un driver ma utilizzerà quello fornito da questo percorso. Assicurati che il driver sia compatibile con il browser che stai utilizzando.

:::

#### Opzioni del driver specifiche per browser

Per propagare le opzioni al driver, puoi utilizzare le seguenti funzionalità personalizzate:

- Chrome o Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
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
La porta su cui il driver ADB dovrebbe essere eseguito.

Esempio: `9515`

Tipo: `number`

##### urlBase
Prefisso del percorso URL di base per i comandi, ad esempio `wd/url`.

Esempio: `/`

Tipo: `string`

##### logPath
Scrive il log del server su file invece che su stderr, aumenta il livello di log a `INFO`

Tipo: `string`

##### logLevel
Imposta il livello di log. Opzioni possibili `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Tipo: `string`

##### verbose
Log dettagliato (equivalente a `--log-level=ALL`)

Tipo: `boolean`

##### silent
Non registrare nulla (equivalente a `--log-level=OFF`)

Tipo: `boolean`

##### appendLog
Aggiunge al file di log invece di riscriverlo.

Tipo: `boolean`

##### replayable
Log dettagliato e non tronca le stringhe lunghe in modo che il log possa essere riprodotto (sperimentale).

Tipo: `boolean`

##### readableTimestamp
Aggiunge timestamp leggibili al log.

Tipo: `boolean`

##### enableChromeLogs
Mostra i log dal browser (sovrascrive altre opzioni di log).

Tipo: `boolean`

##### bidiMapperPath
Percorso personalizzato del mapper bidi.

Tipo: `string`

##### allowedIps
Elenco separato da virgole di indirizzi IP remoti che possono connettersi a EdgeDriver.

Tipo: `string[]`<br />
Predefinito: `['']`

##### allowedOrigins
Elenco separato da virgole di origini di richieste che possono connettersi a EdgeDriver. Utilizzare `*` per consentire qualsiasi origine host è pericoloso!

Tipo: `string[]`<br />
Predefinito: `['*']`

##### spawnOpts
Opzioni da passare al processo del driver.

Tipo: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Predefinito: `undefined`

</TabItem>
<TabItem value="firefox">

Vedi tutte le opzioni di Geckodriver nel [pacchetto driver](https://github.com/webdriverio-community/node-geckodriver#options) ufficiale.

</TabItem>
<TabItem value="msedge">

Vedi tutte le opzioni di Edgedriver nel [pacchetto driver](https://github.com/webdriverio-community/node-edgedriver#options) ufficiale.

</TabItem>
<TabItem value="safari">

Vedi tutte le opzioni di Safaridriver nel [pacchetto driver](https://github.com/webdriverio-community/node-safaridriver#options) ufficiale.

</TabItem>
</Tabs>

## Funzionalità speciali per casi d'uso specifici

Questa è una lista di esempi che mostrano quali funzionalità devono essere applicate per raggiungere un determinato caso d'uso.

### Eseguire il browser in modalità headless

Eseguire un browser headless significa eseguire un'istanza del browser senza finestra o UI. Questo viene utilizzato principalmente negli ambienti CI/CD dove non viene utilizzato alcun display. Per eseguire un browser in modalità headless, applica le seguenti funzionalità:

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
    browserName: 'chrome',   // o 'chromium'
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

### Automatizzare diversi canali di browser

Se desideri testare una versione del browser non ancora rilasciata come stabile, ad esempio Chrome Canary, puoi farlo impostando le funzionalità e indicando il browser che desideri avviare, ad esempio:

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

Durante i test su Chrome, WebdriverIO scaricherà automaticamente la versione del browser e del driver desiderata in base al `browserVersion` definito, ad esempio:

```ts
{
    browserName: 'chrome', // o 'chromium'
    browserVersion: '116' // o '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' o 'latest' (uguale a 'canary')
}
```

Se desideri testare un browser scaricato manualmente, puoi fornire un percorso binario al browser tramite:

```ts
{
    browserName: 'chrome',  // o 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Inoltre, se desideri utilizzare un driver scaricato manualmente, puoi fornire un percorso binario al driver tramite:

```ts
{
    browserName: 'chrome', // o 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Durante i test su Firefox, WebdriverIO scaricherà automaticamente la versione del browser e del driver desiderata in base al `browserVersion` definito, ad esempio:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // o 'latest'
}
```

Se desideri testare una versione scaricata manualmente, puoi fornire un percorso binario al browser tramite:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Inoltre, se desideri utilizzare un driver scaricato manualmente, puoi fornire un percorso binario al driver tramite:

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

Durante i test su Microsoft Edge, assicurati di avere la versione del browser desiderata installata sulla tua macchina. Puoi indirizzare WebdriverIO al browser da eseguire tramite:

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
    browserVersion: '109' // o '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Inoltre, se desideri utilizzare un driver scaricato manualmente, puoi fornire un percorso binario al driver tramite:

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

Durante i test su Safari, assicurati di avere installato [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) sulla tua macchina. Puoi indirizzare WebdriverIO a quella versione tramite:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Estendere le funzionalità personalizzate

Se desideri definire il tuo set di funzionalità, ad esempio per memorizzare dati arbitrari da utilizzare nei test per quella specifica funzionalità, puoi farlo impostando:

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

Si consiglia di seguire il [protocollo W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) quando si tratta di nominare le funzionalità, che richiede un carattere `:` (due punti), che denota uno spazio dei nomi specifico dell'implementazione. All'interno dei tuoi test puoi accedere alla tua funzionalità personalizzata tramite, ad esempio:

```ts
browser.capabilities['custom:caps']
```

Per garantire la sicurezza dei tipi, puoi estendere l'interfaccia delle funzionalità di WebdriverIO tramite:

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
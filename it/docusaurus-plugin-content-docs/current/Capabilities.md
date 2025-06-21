---
id: capabilities
title: Funzionalità
---

Una capacità è una definizione per un'interfaccia remota. Aiuta WebdriverIO a comprendere in quale ambiente browser o mobile desideri eseguire i tuoi test. Le capacità sono meno cruciali quando si sviluppano test localmente poiché si eseguono su un'interfaccia remota la maggior parte del tempo, ma diventano più importanti quando si esegue un grande insieme di test di integrazione in CI/CD.

:::info

Il formato di un oggetto capacità è ben definito dalla [specifica WebDriver](https://w3c.github.io/webdriver/#capabilities). Il testrunner di WebdriverIO fallirà immediatamente se le capacità definite dall'utente non aderiscono a tale specifica.

:::

## Capacità Personalizzate

Mentre il numero di capacità definite in modo fisso è molto basso, chiunque può fornire e accettare capacità personalizzate specifiche per il driver di automazione o l'interfaccia remota:

### Estensioni di Capacità Specifiche per Browser

- `goog:chromeOptions`: estensioni [Chromedriver](https://chromedriver.chromium.org/capabilities), applicabili solo per test in Chrome
- `moz:firefoxOptions`: estensioni [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), applicabili solo per test in Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) per specificare l'ambiente quando si utilizza EdgeDriver per testare Chromium Edge

### Estensioni di Capacità per Fornitori Cloud

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- e molti altri...

### Estensioni di Capacità per Motori di Automazione

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- e molti altri...

### Capacità WebdriverIO per gestire le opzioni del driver del browser

WebdriverIO gestisce l'installazione e l'esecuzione del driver del browser per te. WebdriverIO utilizza una capacità personalizzata che ti permette di passare parametri al driver.

#### `wdio:chromedriverOptions`

Opzioni specifiche passate a Chromedriver quando viene avviato.

#### `wdio:geckodriverOptions`

Opzioni specifiche passate a Geckodriver quando viene avviato.

#### `wdio:edgedriverOptions`

Opzioni specifiche passate a Edgedriver quando viene avviato.

#### `wdio:safaridriverOptions`

Opzioni specifiche passate a Safari quando viene avviato.

#### `wdio:maxInstances`

Numero massimo di lavoratori paralleli totali per il browser/capacità specifico. Ha precedenza su [maxInstances](#configuration#maxInstances) e [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Tipo: `number`

#### `wdio:specs`

Definisce le specifiche per l'esecuzione del test per quel browser/capacità. Uguale all'[opzione di configurazione regolare `specs`](configuration#specs), ma specifica per il browser/capacità. Ha precedenza su `specs`.

Tipo: `(String | String[])[]`

#### `wdio:exclude`

Esclude le specifiche dall'esecuzione del test per quel browser/capacità. Uguale all'[opzione di configurazione regolare `exclude`](configuration#exclude), ma specifica per il browser/capacità. Esclude dopo che l'opzione di configurazione globale `exclude` è stata applicata.

Tipo: `String[]`

#### `wdio:enforceWebDriverClassic`

Per impostazione predefinita, WebdriverIO tenta di stabilire una sessione WebDriver Bidi. Se non preferisci questo comportamento, puoi impostare questo flag per disabilitarlo.

Tipo: `boolean`

#### Opzioni comuni per i driver

Mentre tutti i driver offrono parametri diversi per la configurazione, ce ne sono alcuni comuni che WebdriverIO comprende e utilizza per configurare il tuo driver o browser:

##### `cacheDir`

Il percorso della radice della directory di cache. Questa directory viene utilizzata per memorizzare tutti i driver che vengono scaricati quando si tenta di avviare una sessione.

Tipo: `string`<br />
Predefinito: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Percorso di un binario driver personalizzato. Se impostato, WebdriverIO non tenterà di scaricare un driver ma utilizzerà quello fornito da questo percorso. Assicurati che il driver sia compatibile con il browser che stai utilizzando.

Puoi fornire questo percorso tramite le variabili d'ambiente `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` o `EDGEDRIVER_PATH`.

Tipo: `string`

:::caution

Se il `binary` del driver è impostato, WebdriverIO non tenterà di scaricare un driver ma utilizzerà quello fornito da questo percorso. Assicurati che il driver sia compatibile con il browser che stai utilizzando.

:::

#### Opzioni specifiche per driver di browser

Per propagare le opzioni al driver puoi utilizzare le seguenti capacità personalizzate:

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
La porta su cui il driver ADB dovrebbe funzionare.

Esempio: `9515`

Tipo: `number`

##### urlBase
Prefisso di percorso URL base per i comandi, ad es. `wd/url`.

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
Log dettagliato e non tronca stringhe lunghe in modo che il log possa essere riprodotto (sperimentale).

Tipo: `boolean`

##### readableTimestamp
Aggiunge timestamp leggibili al log.

Tipo: `boolean`

##### enableChromeLogs
Mostra i log dal browser (sovrascrive altre opzioni di logging).

Tipo: `boolean`

##### bidiMapperPath
Percorso del mapper bidi personalizzato.

Tipo: `string`

##### allowedIps
Lista di indirizzi IP remoti separati da virgola che sono autorizzati a connettersi a EdgeDriver.

Tipo: `string[]`<br />
Predefinito: `['']`

##### allowedOrigins
Lista di origini di richieste separate da virgola che sono autorizzate a connettersi a EdgeDriver. L'uso di `*` per consentire qualsiasi origine host è pericoloso!

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

## Capacità Speciali per Casi d'Uso Specifici

Questa è una lista di esempi che mostra quali capacità devono essere applicate per ottenere un determinato caso d'uso.

### Eseguire il Browser in Modalità Headless

Eseguire un browser headless significa eseguire un'istanza del browser senza finestra o interfaccia utente. Questo viene utilizzato principalmente in ambienti CI/CD dove non viene utilizzato alcun display. Per eseguire un browser in modalità headless, applica le seguenti capacità:

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

### Automatizzare Diversi Canali di Browser

Se desideri testare una versione del browser che non è ancora rilasciata come stabile, ad esempio Chrome Canary, puoi farlo impostando le capacità e puntando al browser che desideri avviare, ad esempio:

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

Quando si testa su Chrome, WebdriverIO scaricherà automaticamente la versione del browser e del driver desiderati in base al `browserVersion` definito, ad esempio:

```ts
{
    browserName: 'chrome', // o 'chromium'
    browserVersion: '116' // o '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' o 'latest' (lo stesso di 'canary')
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

Quando si testa su Firefox, WebdriverIO scaricherà automaticamente la versione del browser e del driver desiderati in base al `browserVersion` definito, ad esempio:

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

Quando si testa su Microsoft Edge, assicurati di avere la versione del browser desiderata installata sulla tua macchina. Puoi indirizzare WebdriverIO al browser da eseguire tramite:

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

Quando si testa su Safari, assicurati di avere [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) installato sulla tua macchina. Puoi indirizzare WebdriverIO a quella versione tramite:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Estendere Capacità Personalizzate

Se desideri definire il tuo set di capacità, ad esempio per memorizzare dati arbitrari da utilizzare nei test per quella specifica capacità, puoi farlo impostando ad esempio:

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

Si consiglia di seguire il [protocollo W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) quando si tratta di denominazione delle capacità, che richiede un carattere `:` (due punti), che denota uno spazio dei nomi specifico dell'implementazione. All'interno dei tuoi test puoi accedere alla tua capacità personalizzata tramite, ad esempio:

```ts
browser.capabilities['custom:caps']
```

Per garantire la sicurezza dei tipi, puoi estendere l'interfaccia delle capacità di WebdriverIO tramite:

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
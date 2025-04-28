---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Recupera il contesto della sessione corrente.

Questo metodo migliora il comando Appium predefinito `context`/WebdriverIO `getContext` fornendo un'opzione per
restituire informazioni dettagliate sul contesto, rendendo più facile lavorare con app ibride che utilizzano webview.

### Come funzionano i contesti
Fai riferimento alla [documentazione delle App Ibride](/docs/api/mobile#hybrid-apps) per maggiori informazioni. Di seguito è riportata una spiegazione delle sfide associate al comando `getContext`:

#### Per Android:
- Le webview possono contenere più pagine (come le schede del browser), e l'identificazione della pagina corretta richiede metadati aggiuntivi
  come `title` o `url`.
- I metodi predefiniti di Appium forniscono solo nomi di contesto di base (es. `WEBVIEW_{packageName}`) senza informazioni dettagliate
  sulle pagine all'interno della webview.

#### Per iOS:
- Ogni webview è identificata da una stringa generica `WEBVIEW_{id}`, che non indica il suo contenuto o la schermata dell'app
  a cui appartiene.

### Perché utilizzare questo metodo?
- **Comportamento predefinito**:
  - Restituisce il contesto corrente come stringa (es. `NATIVE_APP` o `WEBVIEW_{id}`).
- **Contesto dettagliato**:
  - Quando `returnDetailedContext` è abilitato, recupera metadati come:
    - **Android**: `packageName`, `title`, `url` e `webviewPageId`.
    - **iOS**: `bundleId`, `title` e `url`.
- **Opzioni specifiche per Android**:
  - Gli intervalli di ripetizione e i timeout possono essere personalizzati per gestire i ritardi nell'inizializzazione della webview.

:::info Note e limitazioni

- Se `returnDetailedContext` non è abilitato, il metodo si comporta come il metodo Appium `getContext` predefinito.
- Se desideri utilizzare il metodo "predefinito" di Appium `context`, puoi utilizzare il metodo `driver.getAppiumContext()`, vedi
anche il comando [Appium Contexts](/docs/api/appium#getappiumcontext).
- **Android:** Le opzioni specifiche per Android (`androidWebviewConnectionRetryTime` e `androidWebviewConnectTimeout`) non hanno effetto su iOS.
- Registra avvisi se vengono trovati più contesti dettagliati o nessun contesto:
  - `Abbiamo trovato più di 1 contesto dettagliato per il contesto corrente '{context}'. Restituiremo il primo contesto.`
  - `Non abbiamo ricevuto alcun contesto dettagliato per il contesto corrente '{context}'. Restituiremo il contesto corrente come stringa.`

:::

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
      <td>`GetContextsOptions`</td>
      <td>Le opzioni `getContext` (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`boolean`</td>
      <td>Per impostazione predefinita, restituiamo solo il nome del contesto basato sull'API Appium `context` predefinita, che è solo una stringa. Se desideri ricevere informazioni dettagliate sul contesto, imposta questo su `true`. Il valore predefinito è `false` (opzionale).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Il tempo in millisecondi da attendere tra ciascun tentativo di connessione alla webview. Il valore predefinito è `500` ms (opzionale). <br /><strong>SOLO ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Il tempo massimo in millisecondi di attesa per il rilevamento di una pagina web view. Il valore predefinito è `5000` ms (opzionale). <br /><strong>SOLO ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Esempi

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```
---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Passa a un contesto specifico utilizzando un determinato `name`, `title` o `url` di Webview.

Questo metodo migliora il comando Appium `context` predefinito offrendo maggiore flessibilità e precisione
per passare tra contesti nativi e webview nelle applicazioni mobili ibride.

### Come Funzionano i Contesti
Per una panoramica delle App Ibride e delle webview, consulta la [documentazione delle App Ibride](/docs/api/mobile#hybrid-apps).
Di seguito è riportato un riepilogo di come il comando `switchContext` affronta le sfide comuni:

#### Sfide su Android
- Le webview spesso contengono più pagine (simili alle schede del browser). Identificare la pagina corretta richiede
  metadati aggiuntivi come `title` o `url`, che non sono forniti dai metodi Appium predefiniti.
- I metodi Appium predefiniti restituiscono solo nomi di contesto di base (es. `WEBVIEW_{packageName}`) senza dettagli sul
  contenuto o sulle pagine all'interno della webview.
- Il cambio di contesto su Android prevede due passaggi, che vengono gestiti automaticamente da questo metodo:
  1. Passare al contesto Webview utilizzando `WEBVIEW_{packageName}`.
  2. Selezionare la pagina appropriata all'interno della Webview utilizzando il metodo `switchToWindow`.

#### Sfide su iOS
- Le webview sono identificate da ID generici (es. `WEBVIEW_{id}`), che non forniscono informazioni sul contenuto
  o sulla schermata dell'app a cui corrispondono.
- Determinare la webview corretta per l'interazione spesso richiede tentativi ed errori.

Il metodo `switchContext` semplifica questo processo recuperando metadati dettagliati (es. `title`, `url` e visibilità)
per garantire un cambio di contesto accurato e affidabile.

### Perché Utilizzare Questo Metodo?
- **Cambio Semplificato**: Se conosci il `title` o l'`url` della webview desiderata, questo metodo elimina la necessità di
  chiamate aggiuntive a `getContexts` o di combinare più metodi come `switchContext({id})` e `getTitle()`.
- **Abbinamento Automatico del Contesto**: Trova la migliore corrispondenza per un contesto basata su:
  - Identificatori specifici della piattaforma (`bundleId` per iOS, `packageName` per Android).
  - Corrispondenze esatte o parziali per `title` o `url` (supporta sia stringhe che espressioni regolari).
  - Controlli specifici per Android per garantire che le webview siano collegate e visibili.
- **Controllo Dettagliato**: Intervalli di ripetizione personalizzati e timeout (solo Android) permettono di gestire i ritardi nell'inizializzazione della webview.
- **Accesso al Metodo Appium Predefinito**: Se necessario, puoi utilizzare il comando Appium `switchContext` predefinito tramite `driver.switchAppiumContext()`.

:::info Note e Limitazioni

- Se il `title` o l'`url` della webview desiderata è noto, questo metodo può automaticamente localizzare e passare al contesto corrispondente senza ulteriori chiamate a `getContexts`.
- Opzioni specifiche per Android come `androidWebviewConnectionRetryTime` e `androidWebviewConnectTimeout` non sono applicabili a iOS.
- Registra i motivi dei fallimenti nella corrispondenza del contesto per facilitare il debug.
- Quando si utilizza un oggetto come input, è richiesto `title` o `url`.

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>Il nome del contesto a cui passare. Può essere fornito un oggetto con più opzioni di contesto.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>Opzioni del comando switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>Il titolo della pagina a cui passare. Questo sarà il contenuto del tag title di una pagina webview. Puoi usare una stringa che deve corrispondere completamente o un'espressione regolare.<br /><strong>IMPORTANTE:</strong> Quando usi le opzioni, è richiesta la proprietà `title` o la proprietà `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>L'url della pagina a cui passare. Questo sarà l'`url` di una pagina webview. Puoi usare una stringa che deve corrispondere completamente o un'espressione regolare.<br /><strong>IMPORTANTE:</strong> Quando usi le opzioni, è richiesta la proprietà `title` o la proprietà `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Il tempo in millisecondi da attendere tra ogni tentativo di connessione alla webview. Il valore predefinito è `500` ms (opzionale). <br /><strong>SOLO PER ANDROID</strong> e sarà utilizzato solo quando viene fornito un `title` o un `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Il tempo massimo in millisecondi da attendere per il rilevamento di una pagina webview. Il valore predefinito è `5000` ms (opzionale). <br /><strong>SOLO PER ANDROID</strong> e sarà utilizzato solo quando viene fornito un `title` o un `url`.</td>
    </tr>
  </tbody>
</table>

##### Esempi

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```
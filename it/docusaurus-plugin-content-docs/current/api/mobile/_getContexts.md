---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

Il metodo WebdriverIO `getContexts` è una versione migliorata del comando Appium predefinito `contexts` 
(e del precedente WebdriverIO `getContexts`). Fornisce informazioni dettagliate e utilizzabili
sui contesti disponibili in una sessione di app mobile, affrontando le limitazioni dei metodi Appium predefiniti.

### Come funzionano le Webview e perché questo metodo è utile
Per maggiori dettagli, consulta la [documentazione sulle App Ibride](/docs/api/mobile#hybrid-apps). Di seguito è riportato un riepilogo delle sfide affrontate dal comando `getContexts`:

#### Sfide su Android
- Una singola webview (es. `WEBVIEW_{packageName}`) può contenere più pagine (simili alle schede del browser).
- I metodi Appium predefiniti non includono dettagli su queste pagine, come `title`, `url`, o visibilità,
  rendendo difficile identificare la pagina corretta e portando a potenziali instabilità.

#### Sfide su iOS
- Il metodo Appium predefinito restituisce solo ID webview generici (es. `WEBVIEW_{id}`) senza alcun metadato aggiuntivo.
- Questo rende difficile determinare quale webview corrisponde alla schermata di destinazione dell'app.

Il metodo `getContexts` potenziato risolve questi problemi restituendo oggetti contesto dettagliati, che includono:
- **Per Android:** `title`, `url`, `packageName`, `webviewPageId`, e dettagli di layout (`screenX`, `screenY`, `width` e `height`).
- **Per iOS:** `bundleId`, `title` e `url`.

Questi miglioramenti rendono il debug e l'interazione con le app ibride più affidabili.

### Perché utilizzare questo metodo?
Per impostazione predefinita, il metodo Appium `contexts` restituisce solo un array di stringhe che rappresentano i contesti disponibili:
- **Per Android:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **Per iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Sebbene sufficiente per scenari semplici, queste risposte predefinite mancano di metadati critici per i test di app ibride:
- **Per Android:** La mancanza di metadati specifici della pagina rende difficile interagire con la webview corretta.
- **Per iOS:** Gli ID webview generici non forniscono alcuna informazione sul contenuto o sulla schermata dell'app che rappresentano.

Il metodo `getContexts` potenziato fornisce:
- Metadati dettagliati sia per Android che per iOS.
- Opzioni per filtrare e personalizzare i contesti restituiti per una migliore individuazione e interazione.

:::info Note e limitazioni

- Il metodo `getContexts` potenziato funziona sia su piattaforme Android che iOS. Tuttavia, i dati restituiti possono variare in base alla piattaforma e all'app in fase di test.
- Se non specifichi l'opzione `returnDetailedContexts`, il metodo si comporta come il metodo Appium `contexts` predefinito, restituendo un semplice array di contesti.
- Per utilizzare il metodo Appium "predefinito" `contexts`, usa `driver.getAppiumContexts()`. Per ulteriori informazioni, consulta la [documentazione di Appium Contexts](/docs/api/appium#getappiumcontexts).

#### Webview Android:
- I metadati come `androidWebviewData` sono disponibili solo quando `returnAndroidDescriptionData` è `true`.
- L'utilizzo del metodo `getContexts` su un browser Chrome può occasionalmente restituire dati incompleti a causa di versioni non corrispondenti di browser/Webview/ChromeDriver. In tali casi, potrebbero essere restituiti valori predefiniti o un `webviewPageId` errato (es. `0`).

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
      <td>Le opzioni `getContexts` (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`boolean`</td>
      <td>Per impostazione predefinita, restituiamo solo i nomi dei contesti basati sull'API Appium `contexts` predefinita. Se vuoi ottenere tutti i dati, puoi impostare questo a `true`. Il valore predefinito è `false` (opzionale).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Il tempo in millisecondi da attendere tra ogni tentativo di connessione alla webview. Il valore predefinito è `500` ms (opzionale). <br /><strong>SOLO-ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Il tempo massimo in millisecondi per attendere che una pagina web view venga rilevata. Il valore predefinito è `5000` ms (opzionale). <br /><strong>SOLO-ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`boolean`</td>
      <td>Per impostazione predefinita, restituiamo tutte le webview. Se vuoi filtrare le webview per l'attuale app Android aperta, puoi impostare questo a `true`. Il valore predefinito è `false` (opzionale). <br /><strong>NOTA:</strong> Tieni presente che potresti anche NON trovare alcuna Webview in base a questa "restrizione". <br /><strong>SOLO-ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`boolean`</td>
      <td>Per impostazione predefinita, restituiamo solo le webview che sono allegate e visibili. Se vuoi ottenere tutte le webview, puoi impostare questo a `false` (opzionale). Il valore predefinito è `true`. <br /><strong>SOLO-ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`boolean`</td>
      <td>Per impostazione predefinita, nessun dato di descrizione della Webview Android (Chrome). Se vuoi ottenere tutti i dati, puoi impostare questo a `true`. Il valore predefinito è `false` (opzionale). <br />Abilitando questa opzione otterrai dati extra nella risposta, vedi il file `description.data.test.js` per maggiori informazioni. <br /><strong>SOLO-ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Esempi

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```
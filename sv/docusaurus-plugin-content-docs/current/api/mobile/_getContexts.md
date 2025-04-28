---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

WebdriverIO-metoden `getContexts` är en förbättrad version av Appiums standardmetod `contexts`
(och den tidigare WebdriverIO `getContexts`-kommandot). Den ger detaljerad och användbar information
om tillgängliga kontexter i en mobil app-session, och åtgärdar begränsningarna i Appiums standardmetoder.

### Hur Webviews fungerar och varför denna metod hjälper
För mer detaljer, se [Hybrid Apps-dokumentationen](/docs/api/mobile#hybrid-apps). Nedan följer en sammanfattning av utmaningarna som `getContexts`-kommandot adresserar:

#### Android-utmaningar
- En enskild webview (t.ex. `WEBVIEW_{packageName}`) kan innehålla flera sidor (liknande webbläsarflikar).
- Appiums standardmetoder inkluderar inte detaljer om dessa sidor, som deras `title`, `url` eller synlighet,
  vilket gör det svårt att identifiera rätt sida och kan leda till instabilitet.

#### iOS-utmaningar
- Appiums standardmetod returnerar endast generiska webview-ID:n (t.ex. `WEBVIEW_{id}`) utan ytterligare metadata.
- Detta gör det svårt att avgöra vilken webview som motsvarar målappens skärm.

Den förbättrade `getContexts`-metoden löser dessa problem genom att returnera detaljerade kontextobjekt, som inkluderar:
- **För Android:** `title`, `url`, `packageName`, `webviewPageId` och layoutdetaljer (`screenX`, `screenY`, `width` och `height`).
- **För iOS:** `bundleId`, `title` och `url`.

Dessa förbättringar gör felsökning och interaktion med hybridappar mer tillförlitlig.

### Varför använda denna metod?
Som standard returnerar Appiums `contexts`-metod endast en array av strängar som representerar tillgängliga kontexter:
- **För Android:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **För iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Även om detta är tillräckligt för enkla scenarier, saknar dessa standardsvar kritisk metadata för testning av hybridappar:
- **För Android:** Bristen på sidspecifik metadata gör det utmanande att interagera med rätt webview.
- **För iOS:** Generiska webview-ID:n ger ingen insikt i innehållet eller appskärmen de representerar.

Den förbättrade `getContexts`-metoden erbjuder:
- Detaljerad metadata för både Android och iOS.
- Alternativ för att filtrera och anpassa de returnerade kontexterna för bättre målsättning och interaktion.

:::info Anteckningar och begränsningar

- Den förbättrade `getContexts`-metoden fungerar på både Android- och iOS-plattformar. De returnerade data kan dock variera beroende på plattform och app som testas.
- Om du inte anger alternativet `returnDetailedContexts` fungerar metoden som Appiums standardmetod `contexts` och returnerar en enkel kontextarray.
- För att använda Appiums "standard" `contexts`-metod, använd `driver.getAppiumContexts()`. För mer information, se [Appium Contexts-dokumentationen](/docs/api/appium#getappiumcontexts).

#### Android Webviews:
- Metadata som `androidWebviewData` är endast tillgänglig när `returnAndroidDescriptionData` är `true`.
- Användning av `getContexts`-metoden på en Chrome-webbläsare kan ibland returnera ofullständig data på grund av icke-matchande versioner av webbläsare/Webview/ChromeDriver. I sådana fall kan standardvärden eller ett felaktigt `webviewPageId` (t.ex. `0`) returneras.

:::

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`GetContextsOptions`</td>
      <td>Alternativen för `getContexts` (valfri)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`boolean`</td>
      <td>Som standard returnerar vi endast kontextnamnen baserade på Appiums standard `contexts` API. Om du vill få all data kan du sätta detta till `true`. Standard är `false` (valfri).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Tiden i millisekunder att vänta mellan varje försök att ansluta till webviewen. Standard är `500` ms (valfri). <br /><strong>ENDAST FÖR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Den maximala tiden i millisekunder att vänta på att en webview-sida ska upptäckas. Standard är `5000` ms (valfri). <br /><strong>ENDAST FÖR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`boolean`</td>
      <td>Som standard returnerar vi alla webviews. Om du vill filtrera webviews efter den aktuella Android-appen som är öppen kan du sätta detta till `true`. Standard är `false` (valfri). <br /><strong>OBS:</strong> Var medveten om att du även kan INTE hitta någon Webview baserat på denna "begränsning". <br /><strong>ENDAST FÖR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`boolean`</td>
      <td>Som standard returnerar vi endast de webviews som är kopplade och synliga. Om du vill få alla webviews kan du sätta detta till `false` (valfri). Standard är `true`. <br /><strong>ENDAST FÖR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`boolean`</td>
      <td>Som standard ges ingen beskrivningsdata för Android Webview (Chrome). Om du vill få all data kan du sätta detta till `true`. Standard är `false` (valfri). <br />Genom att aktivera detta alternativ får du extra data i svaret, se `description.data.test.js` för mer information. <br /><strong>ENDAST FÖR ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Exempel

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
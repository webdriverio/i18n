---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Hämta kontexten för den aktuella sessionen.

Denna metod förbättrar standardkommandot Appium `context`/WebdriverIO `getContext` genom att erbjuda ett alternativ att
returnera detaljerad kontextinformation, vilket gör det enklare att arbeta med hybridappar som använder webbvyer.

### Hur kontext fungerar
Se [Hybrid Apps-dokumentationen](/docs/api/mobile#hybrid-apps) för mer information. Nedan är en förklaring av utmaningarna med `getContext`-kommandot:

#### För Android:
- Webbvyer kan innehålla flera sidor (som webbläsarflikar), och för att identifiera rätt sida krävs ytterligare metadata
  som `title` eller `url`.
- Standardmetoderna i Appium tillhandahåller endast grundläggande kontextnamn (t.ex. `WEBVIEW_{packageName}`) utan detaljerad information
  om sidorna i webbvyn.

#### För iOS:
- Varje webbvy identifieras av en generisk `WEBVIEW_{id}`-sträng, som inte indikerar dess innehåll eller appskärmen
  den tillhör.

### Varför använda denna metod?
- **Standardbeteende**:
  - Returnerar den aktuella kontexten som en sträng (t.ex. `NATIVE_APP` eller `WEBVIEW_{id}`).
- **Detaljerad kontext**:
  - När `returnDetailedContext` är aktiverat, hämtas metadata som:
    - **Android**: `packageName`, `title`, `url` och `webviewPageId`.
    - **iOS**: `bundleId`, `title` och `url`.
- **Android-specifika alternativ**:
  - Upprepningsintervall och tidsgränser kan anpassas för att hantera fördröjningar i webbvyinitiering.

:::info Anteckningar och begränsningar

- Om `returnDetailedContext` inte är aktiverat, fungerar metoden som Appiums standard `getContext`-metod.
- Om du vill använda Appiums "standard" `context`-metod kan du använda metoden `driver.getAppiumContext()`, se
även [Appium Contexts](/docs/api/appium#getappiumcontext)-kommandot.
- **Android:** Android-specifika alternativ (`androidWebviewConnectionRetryTime` och `androidWebviewConnectTimeout`) har ingen effekt på iOS.
- Loggar varningar om flera eller inga detaljerade kontexter hittas:
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

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
      <td>Alternativen för `getContext` (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`boolean`</td>
      <td>Som standard returnerar vi endast kontextnamnet baserat på standard Appium `context` API, vilket endast är en sträng. Om du vill få tillbaka detaljerad kontextinformation, ställ in detta till `true`. Standard är `false` (valfritt).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Tiden i millisekunder att vänta mellan varje försök att ansluta till webbvyn. Standard är `500` ms (valfritt). <br /><strong>ENDAST FÖR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Den maximala tiden i millisekunder att vänta på att en webbvysida ska upptäckas. Standard är `5000` ms (valfritt). <br /><strong>ENDAST FÖR ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Exempel

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
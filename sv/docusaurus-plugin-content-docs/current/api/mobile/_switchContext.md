---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Växla till en specifik kontext genom att använda ett givet webbvy `name`, `title` eller `url`.

Denna metod förbättrar Appiums standardkommando `context` genom att erbjuda mer flexibilitet och precision
för att växla mellan nativa och webbvy-kontexter i hybridmobilappar.

### Hur kontexter fungerar
För en översikt av hybridappar och webbvyer, se [dokumentationen för hybridappar](/docs/api/mobile#hybrid-apps).
Nedan följer en sammanfattning av hur kommandot `switchContext` hanterar vanliga utmaningar:

#### Android-utmaningar
- Webbvyer innehåller ofta flera sidor (liknande flikar i webbläsare). Att identifiera rätt sida kräver ytterligare
  metadata som `title` eller `url`, vilket inte tillhandahålls av Appiums standardmetoder.
- Appiums standardmetoder returnerar endast grundläggande kontextnamn (t.ex. `WEBVIEW_{packageName}`) utan detaljer om
  innehållet eller sidorna inom webbvyn.
- Att växla kontexter på Android involverar två steg, som hanteras automatiskt av denna metod:
  1. Växla till webbvy-kontexten med `WEBVIEW_{packageName}`.
  2. Välj lämplig sida inom webbvyn med metoden `switchToWindow`.

#### iOS-utmaningar
- Webbvyer identifieras av generiska ID:n (t.ex. `WEBVIEW_{id}`), som inte ger information om innehållet
  eller appskärmen de motsvarar.
- Att bestämma rätt webbvy för interaktion kräver ofta försök och misstag.

Metoden `switchContext` förenklar denna process genom att hämta detaljerad metadata (t.ex. `title`, `url` och synlighet)
för att säkerställa korrekt och pålitlig kontextväxling.

### Varför använda denna metod?
- **Förenklad växling**: Om du känner till `title` eller `url` för den önskade webbvyn eliminerar denna metod behovet av
  ytterligare anrop till `getContexts` eller kombinering av flera metoder som `switchContext({id})` och `getTitle()`.
- **Automatisk kontextmatchning**: Hittar bästa matchning för en kontext baserat på:
  - Plattformsspecifika identifierare (`bundleId` för iOS, `packageName` för Android).
  - Exakta eller partiella matchningar för `title` eller `url` (stöder både strängar och reguljära uttryck).
  - Android-specifika kontroller för att säkerställa att webbvyer är anslutna och synliga.
- **Detaljerad kontroll**: Anpassade återförsöksintervaller och tidsgränser (endast Android) låter dig hantera fördröjningar i webbvy-initiering.
- **Åtkomst till Appiums standardmetod**: Vid behov kan du använda Appiums standard `switchContext`-kommando via `driver.switchAppiumContext()`.

:::info Noteringar och begränsningar

- Om `title` eller `url` för den önskade webbvyn är känd kan denna metod automatiskt hitta och växla till matchande kontext utan ytterligare `getContexts`-anrop.
- Android-specifika alternativ som `androidWebviewConnectionRetryTime` och `androidWebviewConnectTimeout` är inte tillämpliga på iOS.
- Loggar orsaker till misslyckade kontextmatchningar för att underlätta felsökning.
- När du använder ett objekt som indata krävs antingen `title` eller `url`.

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>Namnet på kontexten att växla till. Ett objekt med fler kontextalternativ kan anges.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>switchContext kommandoalternativ</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string, RegExp`</td>
      <td>Titeln på sidan att växla till. Detta kommer att vara innehållet i title-taggen på en webbvysida. Du kan använda en sträng som måste matcha helt eller ett reguljärt uttryck.<br /><strong>VIKTIGT:</strong> När du använder options måste antingen `title` eller `url`-egenskapen anges.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string, RegExp`</td>
      <td>URL:en för sidan att växla till. Detta blir `url` för en webbvysida. Du kan använda en sträng som måste matcha helt eller ett reguljärt uttryck.<br /><strong>VIKTIGT:</strong> När du använder options måste antingen `title` eller `url`-egenskapen anges.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Tiden i millisekunder att vänta mellan varje återförsök att ansluta till webbvyn. Standard är `500` ms (valfritt). <br /><strong>ENDAST ANDROID</strong> och kommer endast att användas när en `title` eller `url` anges.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Maximal tid i millisekunder att vänta på att en webbvysida ska detekteras. Standard är `5000` ms (valfritt). <br /><strong>ENDAST ANDROID</strong> och kommer endast att användas när en `title` eller `url` anges.</td>
    </tr>
  </tbody>
</table>

##### Exempel

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
---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Switch to a specific context using a given Webview `name`, `title`, or `url`.

Denna metod förbättrar den vanliga Appium `context`-kommandot genom att erbjuda mer flexibilitet och precision
för att växla mellan native och webview-kontexter i hybridmobila applikationer.

### Hur kontexter fungerar
För en översikt över hybridappar och webviews, se [dokumentationen för Hybrid Apps](/docs/api/mobile#hybrid-apps).
Nedan följer en sammanfattning av hur `switchContext`-kommandot hanterar vanliga utmaningar:

#### Android-utmaningar
- Webviews innehåller ofta flera sidor (liknande webbläsarflikar). Att identifiera rätt sida kräver ytterligare
  metadata såsom `title` eller `url`, vilket inte tillhandahålls av Appiums standardmetoder.
- Appiums standardmetoder returnerar endast grundläggande kontextnamn (t.ex. `WEBVIEW_{packageName}`) utan detaljer om
  innehållet eller sidorna i webview.
- Att byta kontext på Android involverar två steg, som hanteras automatiskt av denna metod:
  1. Byt till Webview-kontexten med `WEBVIEW_{packageName}`.
  2. Välj lämplig sida inom Webview med hjälp av metoden `switchToWindow`.

#### iOS-utmaningar
- Webviews identifieras av generiska ID:n (t.ex. `WEBVIEW_{id}`), som inte ger information om innehållet
  eller appskärmen de motsvarar.
- Att bestämma rätt webview för interaktion kräver ofta försök och misstag.

Metoden `switchContext` förenklar denna process genom att hämta detaljerad metadata (t.ex. `title`, `url` och synlighet)
för att säkerställa korrekt och tillförlitlig kontextväxling.

### Varför använda denna metod?
- **Förenklad växling**: Om du känner till `title` eller `url` för önskad webview, eliminerar denna metod behovet av
  ytterligare anrop till `getContexts` eller kombinera flera metoder som `switchContext({id})` och `getTitle()`.
- **Automatisk kontextmatchning**: Hittar den bästa matchningen för en kontext baserat på:
  - Plattformsspecifika identifierare (`bundleId` för iOS, `packageName` för Android).
  - Exakta eller partiella matchningar för `title` eller `url` (stöder både strängar och reguljära uttryck).
  - Android-specifika kontroller för att säkerställa att webviews är anslutna och synliga.
- **Finkornig kontroll**: Anpassade försöksintervall och tidsgränser (endast Android) låter dig hantera fördröjningar i webview-initiering.
- **Åtkomst till standardmetoder från Appium**: Vid behov kan du använda Appiums standard `switchContext`-kommando via `driver.switchAppiumContext()`.

:::info Observationer och begränsningar

- Om `title` eller `url` för önskad webview är känd, kan denna metod automatiskt hitta och växla till matchande kontext utan ytterligare `getContexts`-anrop.
- Android-specifika alternativ som `androidWebviewConnectionRetryTime` och `androidWebviewConnectTimeout` är inte tillämpliga för iOS.
- Loggar anledningar till kontextmatchningsfel för att hjälpa till med felsökning.
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
      <td>Namnet på kontexten att växla till. Ett objekt med fler kontextalternativ kan tillhandahållas.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>switchContext-kommandoalternativ</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string, RegExp`</td>
      <td>Titeln på sidan att växla till. Detta kommer att vara innehållet i title-taggen för en webviewsida. Du kan använda en sträng som behöver matcha helt eller ett reguljärt uttryck.<br /><strong>VIKTIGT:</strong> När du använder alternativ krävs antingen `title` eller `url`-egenskapen.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string, RegExp`</td>
      <td>URL:en för sidan att växla till. Detta kommer att vara `url` för en webviewsida. Du kan använda en sträng som behöver matcha helt eller ett reguljärt uttryck.<br /><strong>VIKTIGT:</strong> När du använder alternativ krävs antingen `title` eller `url`-egenskapen.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Tiden i millisekunder att vänta mellan varje försök att ansluta till webview. Standard är `500` ms (valfritt). <br /><strong>ENDAST FÖR ANDROID</strong> och kommer endast att användas när en `title` eller `url` tillhandahålls.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Den maximala tiden i millisekunder att vänta på att en webviewsida ska upptäckas. Standard är `5000` ms (valfritt). <br /><strong>ENDAST FÖR ANDROID</strong> och kommer endast att användas när en `title` eller `url` tillhandahålls.</td>
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
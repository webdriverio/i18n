---
id: capabilities
title: Capabilities
description: "Definiera capabilities för att välja vilken webbläsar- eller mobilmiljö dina tester körs i, inklusive anpassade leverantörsspecifika capabilities och speciella användningsfall."
---

En capability är en definition för ett fjärrgränssnitt. Den hjälper WebdriverIO att förstå i vilken webbläsar- eller mobilmiljö du vill köra dina tester. Capabilities är mindre avgörande när du utvecklar tester lokalt eftersom du oftast kör dem på ett och samma fjärrgränssnitt, men de blir viktigare när du kör en stor uppsättning integrationstester i CI/CD.

:::info

Formatet för ett capability-objekt är väldefinierat av [WebDriver-specifikationen](https://w3c.github.io/webdriver/#capabilities). WebdriverIO:s testrunner kommer att misslyckas tidigt om användardefinierade capabilities inte följer den specifikationen.

:::

## Anpassade capabilities

Även om antalet fast definierade capabilities är mycket litet kan vem som helst tillhandahålla och acceptera anpassade capabilities som är specifika för automationsdrivrutinen eller fjärrgränssnittet:

### Webbläsarspecifika capability-tillägg

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)-tillägg, gäller endast för testning i Chrome
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)-tillägg, gäller endast för testning i Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) för att ange miljön när EdgeDriver används för att testa Chromium Edge

### Capability-tillägg för molnleverantörer

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- och många fler...

### Capability-tillägg för automationsmotorer

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- och många fler...

### WebdriverIO-capabilities för att hantera alternativ för webbläsardrivrutiner

WebdriverIO hanterar installation och körning av webbläsardrivrutinen åt dig. WebdriverIO använder en anpassad capability som låter dig skicka parametrar till drivrutinen.

#### `wdio:chromedriverOptions`

Specifika alternativ som skickas till Chromedriver när den startas.

#### `wdio:geckodriverOptions`

Specifika alternativ som skickas till Geckodriver när den startas.

#### `wdio:edgedriverOptions`

Specifika alternativ som skickas till Edgedriver när den startas.

#### `wdio:safaridriverOptions`

Specifika alternativ som skickas till Safari när den startas.

#### `wdio:maxInstances`

<Option type="number">

Maximalt antal parallellt körande workers totalt för den specifika webbläsaren/capabilityn. Har företräde framför [maxInstances](#configuration#maxInstances) och [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Definiera specs för testkörning för den webbläsaren/capabilityn. Samma som det [vanliga konfigurationsalternativet `specs`](configuration#specs), men specifikt för webbläsaren/capabilityn. Har företräde framför `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Exkludera specs från testkörning för den webbläsaren/capabilityn. Samma som det [vanliga konfigurationsalternativet `exclude`](configuration#exclude), men specifikt för webbläsaren/capabilityn. Exkluderar efter att det globala konfigurationsalternativet `exclude` har tillämpats.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

Som standard försöker WebdriverIO upprätta en WebDriver Bidi-session. Om du inte föredrar det kan du sätta denna flagga för att inaktivera detta beteende.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Laddar ner den Chromedriver som medföljer denna Electron-release i stället för den från Chrome for Testing, för testning av en Electron-app som är angiven som `goog:chromeOptions.binary`. Om `browserVersion` också är satt använder WebdriverIO i stället Chromedriver för den versionen när Electron-releasen inte kan laddas ner eller när `CHROMEDRIVER_CDNURL` är satt. Nightly-versioner hämtas från [electron/nightlies](https://github.com/electron/nightlies/releases). Electron-tjänsten sätter detta åt dig utifrån appens Electron-version.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // en BiDi-session ersätter appens fönster med `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Gemensamma drivrutinsalternativ

Även om alla drivrutiner erbjuder olika konfigurationsparametrar finns det några gemensamma som WebdriverIO förstår och använder för att konfigurera din drivrutin eller webbläsare:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Sökvägen till roten av cachekatalogen. Denna katalog används för att lagra alla drivrutiner som laddas ner när en session försöker startas.

</Option>

##### `binary`

<Option type="string">

Sökväg till en anpassad drivrutinsbinär. Om den är satt kommer WebdriverIO inte att försöka ladda ner en drivrutin utan använder den som anges av denna sökväg. Se till att drivrutinen är kompatibel med webbläsaren du använder.

Du kan ange denna sökväg via miljövariablerna `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` eller `EDGEDRIVER_PATH`.

</Option>
:::caution

Om drivrutinens `binary` är satt kommer WebdriverIO inte att försöka ladda ner en drivrutin utan använder den som anges av denna sökväg. Se till att drivrutinen är kompatibel med webbläsaren du använder.

:::

#### Anpassad nedladdningsvärd för drivrutiner

Om de publika CDN:erna för drivrutiner inte går att nå från din miljö, t.ex. för att du kör dina tester bakom en företagsproxy eller speglar drivrutinerna i ett internt artefaktregister, kan du peka nedladdningen till en anpassad värd med hjälp av följande miljövariabler:

- Chrome: `CHROMEDRIVER_CDNURL`, standardvärde `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, standardvärde `https://msedgedriver.microsoft.com`

Spegeln förväntas tillhandahålla drivrutinsarkiven under samma sökvägar som det ursprungliga CDN:et, t.ex. för Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

vilket löser drivrutinen till `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`, där `<platform>` är en av `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` eller `win64`, t.ex. `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Helt offline-miljöer

Dessa variabler omdirigerar endast nedladdningen av drivrutinen. För att helt förhindra att WebdriverIO når det publika internet måste ytterligare fyra villkor vara uppfyllda:

- **En webbläsare måste finnas tillgänglig lokalt.** Om WebdriverIO inte hittar en installerad Chrome eller Firefox laddar den även ner webbläsaren, och den nedladdningen respekterar inte dessa variabler. Installera antingen webbläsaren på maskinen eller peka WebdriverIO till den via `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **Använd ett fullständigt versionsnummer.** Om `browserVersion` utelämnas läser WebdriverIO den exakta versionen från den lokala webbläsaren och ingen versionsuppslagning behövs. Om du anger det, använd den fullständiga fyrdelade versionen, t.ex. `140.0.7339.207`. En releasekanal (`stable`), en milstolpe (`140`) eller en partiell version (`140.0.7339`) kräver en versionsuppslagning mot en publik Google-endpoint som inte kan omdirigeras.
- **Chromedriver måste komma från Chrome for Testing.** För Chrome äldre än `153.0.8001.0` på Linux ARM64, samt med `wdio:electronVersion` men utan `browserVersion`, laddas Chromedriver ner från Electrons GitHub-releaser, vilka dessa variabler inte omdirigerar.
- **Se till att spegeln faktiskt har den version du behöver.** Om drivrutinen inte kan hämtas från din värd – för att versionen inte är speglad, men lika gärna för att URL:en är fel eller autentiseringsuppgifterna avvisades – loggar WebdriverIO en varning och slår sedan upp den närmaste kända fungerande versionen, vilket återigen frågar den publika endpointen. Kontrollera varningen för vilken värd den försökte nå om en körning oväntat når internet eller väljer en version du inte bad om.

:::

#### Webbläsarspecifika drivrutinsalternativ

För att skicka alternativ vidare till drivrutinen kan du använda följande anpassade capabilities:

- Chrome eller Chromium: `wdio:chromedriverOptions`
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

Porten som ADB-drivrutinen ska köras på.

Exempel: `9515`

</Option>

##### urlBase

<Option type="string">

Prefix för bas-URL-sökvägen för kommandon, t.ex. `wd/url`.

Exempel: `/`

</Option>

##### logPath

<Option type="string">

Skriv serverloggen till fil i stället för stderr, höjer loggnivån till `INFO`

</Option>

##### logLevel

<Option type="string">

Ange loggnivå. Möjliga alternativ `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Logga utförligt (motsvarar `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

Logga ingenting (motsvarar `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Lägg till i loggfilen i stället för att skriva över den.

</Option>

##### replayable

<Option type="boolean">

Logga utförligt och korta inte av långa strängar så att loggen kan spelas upp igen (experimentellt).

</Option>

##### readableTimestamp

<Option type="boolean">

Lägg till läsbara tidsstämplar i loggen.

</Option>

##### enableChromeLogs

<Option type="boolean">

Visa loggar från webbläsaren (åsidosätter andra loggalternativ).

</Option>

##### bidiMapperPath

<Option type="string">

Anpassad sökväg till bidi-mappern.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Kommaseparerad tillåtelselista över fjärr-IP-adresser som tillåts ansluta till EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Kommaseparerad tillåtelselista över förfrågningsursprung som tillåts ansluta till EdgeDriver. Att använda `*` för att tillåta alla värdursprung är farligt!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Alternativ som skickas till drivrutinsprocessen.

</Option>
</TabItem>
<TabItem value="firefox">

Se alla Geckodriver-alternativ i det officiella [drivrutinspaketet](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Se alla Edgedriver-alternativ i det officiella [drivrutinspaketet](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Se alla Safaridriver-alternativ i det officiella [drivrutinspaketet](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Speciella capabilities för specifika användningsfall

Detta är en lista med exempel som visar vilka capabilities som behöver tillämpas för att uppnå ett visst användningsfall.

### Kör webbläsaren headless

Att köra en headless webbläsare innebär att köra en webbläsarinstans utan fönster eller användargränssnitt. Detta används främst i CI/CD-miljöer där ingen skärm används. För att köra en webbläsare i headless-läge, tillämpa följande capabilities:

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
    browserName: 'chrome',   // eller 'chromium'
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

Det verkar som att Safari [inte stöder](https://discussions.apple.com/thread/251837694) körning i headless-läge.

</TabItem>
</Tabs>

### Automatisera olika webbläsarkanaler

Om du vill testa en webbläsarversion som ännu inte har släppts som stabil, t.ex. Chrome Canary, kan du göra det genom att ange capabilities och peka på den webbläsare du vill starta, t.ex.:

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

Vid testning i Chrome laddar WebdriverIO automatiskt ner önskad webbläsarversion och drivrutin åt dig baserat på den definierade `browserVersion`, t.ex.:

```ts
{
    browserName: 'chrome', // eller 'chromium'
    browserVersion: '116' // eller '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' eller 'latest' (samma som 'canary')
}
```

Om du vill testa en manuellt nedladdad webbläsare kan du ange en binär sökväg till webbläsaren via:

```ts
{
    browserName: 'chrome',  // eller 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Om du dessutom vill använda en manuellt nedladdad drivrutin kan du ange en binär sökväg till drivrutinen via:

```ts
{
    browserName: 'chrome', // eller 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Vid testning i Firefox laddar WebdriverIO automatiskt ner önskad webbläsarversion och drivrutin åt dig baserat på den definierade `browserVersion`, t.ex.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // eller 'latest'
}
```

Om du vill testa en manuellt nedladdad version kan du ange en binär sökväg till webbläsaren via:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Om du dessutom vill använda en manuellt nedladdad drivrutin kan du ange en binär sökväg till drivrutinen via:

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

Vid testning i Microsoft Edge, se till att du har önskad webbläsarversion installerad på din maskin. Du kan peka WebdriverIO till den webbläsare som ska köras via:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO laddar automatiskt ner önskad drivrutinsversion åt dig baserat på den definierade `browserVersion`, t.ex.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // eller '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Om du dessutom vill använda en manuellt nedladdad drivrutin kan du ange en binär sökväg till drivrutinen via:

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

Vid testning i Safari, se till att du har [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) installerad på din maskin. Du kan peka WebdriverIO till den versionen via:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Utöka anpassade capabilities

Om du vill definiera din egen uppsättning capabilities för att t.ex. lagra godtyckliga data som ska användas i testerna för just den capabilityn kan du göra det genom att t.ex. ange:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // anpassade konfigurationer
        }
    }]
}
```

Det rekommenderas att följa [W3C-protokollet](https://w3c.github.io/webdriver/#dfn-extension-capability) när det gäller namngivning av capabilities, vilket kräver ett `:`-tecken (kolon) som anger ett implementationsspecifikt namnrymd. I dina tester kan du komma åt din anpassade capability via t.ex.:

```ts
browser.capabilities['custom:caps']
```

För att säkerställa typsäkerhet kan du utöka WebdriverIO:s capability-gränssnitt via:

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
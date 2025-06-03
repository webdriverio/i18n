---
id: capabilities
title: Funktioner
---

En funktion (capability) är en definition för ett fjärrgränssnitt. Det hjälper WebdriverIO att förstå i vilken webbläsar- eller mobilmiljö du vill köra dina tester. Funktioner är mindre avgörande när du utvecklar tester lokalt eftersom du oftast kör dem på ett fjärrgränssnitt åt gången, men blir viktigare när du kör en stor uppsättning integrationstester i CI/CD.

:::info

Formatet för ett funktionsobjekt är väl definierat av [WebDriver-specifikationen](https://w3c.github.io/webdriver/#capabilities). WebdriverIO-testrunner kommer att misslyckas tidigt om användardefinierade funktioner inte följer den specifikationen.

:::

## Anpassade funktioner

Medan antalet fast definierade funktioner är mycket lågt kan alla tillhandahålla och acceptera anpassade funktioner som är specifika för automationsdrivrutinen eller fjärrgränssnittet:

### Webbläsarspecifika funktionsutökningar

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)-tillägg, endast tillämpliga för testning i Chrome
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)-tillägg, endast tillämpliga för testning i Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) för att specificera miljön när du använder EdgeDriver för testning av Chromium Edge

### Molnleverantörers funktionsutökningar

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- och många fler...

### Automatiseringsmotorns funktionsutökningar

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- och många fler...

### WebdriverIO-funktioner för att hantera webbläsardrivrutinsalternativ

WebdriverIO hanterar installation och körning av webbläsardrivrutiner åt dig. WebdriverIO använder en anpassad funktion som låter dig skicka in parametrar till drivrutinen.

#### `wdio:chromedriverOptions`

Specifika alternativ som skickas till Chromedriver vid start.

#### `wdio:geckodriverOptions`

Specifika alternativ som skickas till Geckodriver vid start.

#### `wdio:edgedriverOptions`

Specifika alternativ som skickas till Edgedriver vid start.

#### `wdio:safaridriverOptions`

Specifika alternativ som skickas till Safari vid start.

#### `wdio:maxInstances`

Maximalt antal totala parallellt körande arbetare för den specifika webbläsaren/funktionen. Har företräde framför [maxInstances](#configuration#maxInstances) och [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Typ: `number`

#### `wdio:specs`

Definiera specs för testkörning för den webbläsaren/funktionen. Samma som det [vanliga konfigurationsalternativet `specs`](configuration#specs), men specifikt för webbläsaren/funktionen. Har företräde framför `specs`.

Typ: `(String | String[])[]`

#### `wdio:exclude`

Uteslut specs från testkörning för den webbläsaren/funktionen. Samma som det [vanliga konfigurationsalternativet `exclude`](configuration#exclude), men specifikt för webbläsaren/funktionen. Har företräde framför `exclude`.

Typ: `String[]`

#### `wdio:enforceWebDriverClassic`

Som standard försöker WebdriverIO upprätta en WebDriver Bidi-session. Om du inte föredrar det kan du ställa in denna flagga för att inaktivera detta beteende.

Typ: `boolean`

#### Vanliga drivrutinsalternativ

Även om alla drivrutiner erbjuder olika parametrar för konfiguration finns det några gemensamma som WebdriverIO förstår och använder för att konfigurera din drivrutin eller webbläsare:

##### `cacheDir`

Sökvägen till roten av cachemappen. Denna mapp används för att lagra alla drivrutiner som laddas ner när du försöker starta en session.

Typ: `string`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Sökväg till en anpassad drivrutinsbinär. Om den är inställd kommer WebdriverIO inte att försöka ladda ner en drivrutin utan använder den som tillhandahålls av denna sökväg. Se till att drivrutinen är kompatibel med webbläsaren du använder.

Du kan ange denna sökväg via miljövariablerna `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` eller `EDGEDRIVER_PATH`.

Typ: `string`

:::caution

Om drivrutinens `binary` är inställd kommer WebdriverIO inte att försöka ladda ner en drivrutin utan använder den som tillhandahålls av denna sökväg. Se till att drivrutinen är kompatibel med webbläsaren du använder.

:::

#### Webbläsarspecifika drivrutinsalternativ

För att skicka alternativ till drivrutinen kan du använda följande anpassade funktioner:

- Chrome eller Chromium: `wdio:chromedriverOptions`
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
Porten som ADB-drivrutinen ska köras på.

Exempel: `9515`

Typ: `number`

##### urlBase
Bas-URL-sökvägsprefix för kommandon, t.ex. `wd/url`.

Exempel: `/`

Typ: `string`

##### logPath
Skriv serverlogg till fil istället för stderr, ökar loggnivån till `INFO`

Typ: `string`

##### logLevel
Ställ in loggnivå. Möjliga alternativ `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Typ: `string`

##### verbose
Logga utförligt (motsvarar `--log-level=ALL`)

Typ: `boolean`

##### silent
Logga ingenting (motsvarar `--log-level=OFF`)

Typ: `boolean`

##### appendLog
Lägg till i loggfilen istället för att skriva över.

Typ: `boolean`

##### replayable
Logga utförligt och trunkera inte långa strängar så att loggen kan spelas upp (experimentell).

Typ: `boolean`

##### readableTimestamp
Lägg till läsbara tidsstämplar till loggen.

Typ: `boolean`

##### enableChromeLogs
Visa loggar från webbläsaren (åsidosätter andra loggningsalternativ).

Typ: `boolean`

##### bidiMapperPath
Anpassad bidi-mappersökväg.

Typ: `string`

##### allowedIps
Kommaseparerad vitlista över fjärr-IP-adresser som tillåts ansluta till EdgeDriver.

Typ: `string[]`<br />
Standard: `['']`

##### allowedOrigins
Kommaseparerad vitlista över begärandeorigins som tillåts ansluta till EdgeDriver. Att använda `*` för att tillåta alla värdorigins är farligt!

Typ: `string[]`<br />
Standard: `['*']`

##### spawnOpts
Alternativ som ska skickas till drivrutinsprocessen.

Typ: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Standard: `undefined`

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

## Särskilda funktioner för specifika användningsfall

Detta är en lista med exempel som visar vilka funktioner som behöver tillämpas för att uppnå ett visst användningsfall.

### Kör webbläsare i Headless-läge

Att köra en headless-webbläsare innebär att köra en webbläsarinstans utan fönster eller användargränssnitt. Detta används oftast inom CI/CD-miljöer där ingen display används. För att köra en webbläsare i headless-läge, tillämpa följande funktioner:

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

Om du vill testa en webbläsarversion som ännu inte släppts som stabil, t.ex. Chrome Canary, kan du göra det genom att ställa in funktioner och peka på den webbläsare du vill starta, t.ex.:

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

När du testar på Chrome kommer WebdriverIO automatiskt ladda ner den önskade webbläsarversionen och drivrutinen åt dig baserat på den definierade `browserVersion`, t.ex.:

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

Dessutom, om du vill använda en manuellt nedladdad drivrutin, kan du ange en binär sökväg till drivrutinen via:

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

När du testar på Firefox kommer WebdriverIO automatiskt ladda ner den önskade webbläsarversionen och drivrutinen åt dig baserat på den definierade `browserVersion`, t.ex.:

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

Dessutom, om du vill använda en manuellt nedladdad drivrutin, kan du ange en binär sökväg till drivrutinen via:

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

När du testar på Microsoft Edge, se till att du har den önskade webbläsarversionen installerad på din maskin. Du kan peka WebdriverIO till webbläsaren för att köra via:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO kommer automatiskt ladda ner den önskade drivrutinsversionen åt dig baserat på den definierade `browserVersion`, t.ex.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // eller '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Dessutom, om du vill använda en manuellt nedladdad drivrutin, kan du ange en binär sökväg till drivrutinen via:

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

När du testar på Safari, se till att du har [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) installerad på din maskin. Du kan peka WebdriverIO till den versionen via:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Utöka anpassade funktioner

Om du vill definiera din egen uppsättning funktioner för att t.ex. lagra godtycklig data som ska användas inom testerna för den specifika funktionen, kan du göra det genom att t.ex. ställa in:

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

Det rekommenderas att följa [W3C-protokollet](https://w3c.github.io/webdriver/#dfn-extension-capability) när det gäller namngivning av funktioner, vilket kräver ett `:` (kolon) tecken som betecknar ett implementationsspecifikt namnområde. I dina tester kan du komma åt din anpassade funktion genom, t.ex.:

```ts
browser.capabilities['custom:caps']
```

För att säkerställa typsäkerhet kan du utöka WebdriverIOs funktionsgränssnitt via:

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
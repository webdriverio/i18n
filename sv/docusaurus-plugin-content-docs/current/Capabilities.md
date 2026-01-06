---
id: capabilities
title: Funktioner
---

En capability är en definition för ett fjärrgränssnitt. Det hjälper WebdriverIO att förstå i vilken webbläsare eller mobilmiljö du vill köra dina tester på. Capabilities är mindre avgörande när du utvecklar tester lokalt eftersom du oftast kör dem på ett fjärrgränssnitt, men blir viktigare när du kör en stor uppsättning integrationstester i CI/CD.

:::info

Formatet för ett capability-objekt är väl definierat av [WebDriver-specifikationen](https://w3c.github.io/webdriver/#capabilities). WebdriverIO-testrunner kommer att misslyckas tidigt om användardefinierade capabilities inte följer denna specifikation.

:::

## Anpassade Capabilities

Medan antalet fast definierade capabilities är mycket lågt, kan alla tillhandahålla och acceptera anpassade capabilities som är specifika för automationsdrivrutinen eller fjärrgränssnittet:

### Webbläsarspecifika Capability-tillägg

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)-tillägg, endast tillämpligt för testning i Chrome
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)-tillägg, endast tillämpligt för testning i Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) för att specificera miljön när du använder EdgeDriver för att testa Chromium Edge

### Cloud-leverantörers Capability-tillägg

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- och många fler...

### Automationsmotor Capability-tillägg

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- och många fler...

### WebdriverIO Capabilities för att hantera webbläsardrivrutinsalternativ

WebdriverIO hanterar installation och körning av webbläsardrivrutiner åt dig. WebdriverIO använder en anpassad capability som låter dig skicka in parametrar till drivrutinen.

#### `wdio:chromedriverOptions`

Specifika alternativ som skickas till Chromedriver vid start.

#### `wdio:geckodriverOptions`

Specifika alternativ som skickas till Geckodriver vid start.

#### `wdio:edgedriverOptions`

Specifika alternativ som skickas till Edgedriver vid start.

#### `wdio:safaridriverOptions`

Specifika alternativ som skickas till Safari vid start.

#### `wdio:maxInstances`

Maximalt antal totala parallella arbetare för den specifika webbläsaren/capability. Har företräde framför [maxInstances](#configuration#maxInstances) och [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Typ: `number`

#### `wdio:specs`

Definiera specs för testkörning för den webbläsaren/capability. Samma som det [vanliga `specs`-konfigurationsalternativet](configuration#specs), men specifikt för webbläsaren/capability. Har företräde framför `specs`.

Typ: `(String | String[])[]`

#### `wdio:exclude`

Uteslut specs från testkörning för den webbläsaren/capability. Samma som det [vanliga `exclude`-konfigurationsalternativet](configuration#exclude), men specifikt för webbläsaren/capability. Utesluter efter att det globala `exclude`-konfigurationsalternativet har tillämpats.

Typ: `String[]`

#### `wdio:enforceWebDriverClassic`

Som standard försöker WebdriverIO etablera en WebDriver Bidi-session. Om du inte föredrar det kan du ställa in denna flagga för att inaktivera detta beteende.

Typ: `boolean`

#### Vanliga drivrutinsalternativ

Medan alla drivrutiner erbjuder olika parametrar för konfiguration, finns det några gemensamma som WebdriverIO förstår och använder för att konfigurera din drivrutin eller webbläsare:

##### `cacheDir`

Sökvägen till roten av cache-katalogen. Denna katalog används för att lagra alla drivrutiner som laddas ner vid försök att starta en session.

Typ: `string`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Sökväg till en anpassad drivrutinsbinär. Om inställd kommer WebdriverIO inte att försöka ladda ner en drivrutin utan kommer att använda den som tillhandahålls av denna sökväg. Se till att drivrutinen är kompatibel med den webbläsare du använder.

Du kan ange denna sökväg via miljövariablerna `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` eller `EDGEDRIVER_PATH`.

Typ: `string`

:::caution

Om drivrutinens `binary` är inställd kommer WebdriverIO inte att försöka ladda ner en drivrutin utan kommer att använda den som tillhandahålls av denna sökväg. Se till att drivrutinen är kompatibel med den webbläsare du använder.

:::

#### Webbläsarspecifika drivrutinsalternativ

För att skicka alternativ till drivrutinen kan du använda följande anpassade capabilities:

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
Logga utförligt (motsvarande `--log-level=ALL`)

Typ: `boolean`

##### silent
Logga ingenting (motsvarande `--log-level=OFF`)

Typ: `boolean`

##### appendLog
Lägg till i loggfilen istället för att skriva över.

Typ: `boolean`

##### replayable
Logga utförligt och truncera inte långa strängar så att loggen kan spelas upp (experimentell).

Typ: `boolean`

##### readableTimestamp
Lägg till läsbara tidsstämplar i loggen.

Typ: `boolean`

##### enableChromeLogs
Visa loggar från webbläsaren (åsidosätter andra loggningsalternativ).

Typ: `boolean`

##### bidiMapperPath
Anpassad bidi-mapper-sökväg.

Typ: `string`

##### allowedIps
Kommaseparerad vitlista över fjärr-IP-adresser som tillåts ansluta till EdgeDriver.

Typ: `string[]`<br />
Standard: `['']`

##### allowedOrigins
Kommaseparerad vitlista över förfrågningsursprung som tillåts ansluta till EdgeDriver. Att använda `*` för att tillåta vilket värdursprung som helst är farligt!

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

## Speciella Capabilities för specifika användningsfall

Detta är en lista med exempel som visar vilka capabilities som behöver användas för att uppnå ett visst användningsfall.

### Kör webbläsare i Headless-läge

Att köra en webbläsare i headless-läge innebär att köra en webbläsarinstans utan fönster eller UI. Detta används oftast i CI/CD-miljöer där ingen skärm används. För att köra en webbläsare i headless-läge, använd följande capabilities:

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

Om du vill testa en webbläsarversion som ännu inte har släppts som stabil, t.ex. Chrome Canary, kan du göra det genom att ställa in capabilities och peka på den webbläsare du vill starta, t.ex.:

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

När du testar på Chrome kommer WebdriverIO automatiskt att ladda ner önskad webbläsarversion och drivrutin baserat på den definierade `browserVersion`, t.ex.:

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

När du testar på Firefox kommer WebdriverIO automatiskt att ladda ner önskad webbläsarversion och drivrutin baserat på den definierade `browserVersion`, t.ex.:

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

När du testar på Microsoft Edge, se till att du har önskad webbläsarversion installerad på din maskin. Du kan peka WebdriverIO till webbläsaren att köra via:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO kommer automatiskt att ladda ner önskad drivrutinsversion baserat på den definierade `browserVersion`, t.ex.:

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

## Utöka anpassade Capabilities

Om du vill definiera din egen uppsättning capabilities, t.ex. för att lagra godtyckliga data som ska användas inom testerna för den specifika capability, kan du göra det genom att t.ex. ställa in:

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

Det rekommenderas att följa [W3C-protokollet](https://w3c.github.io/webdriver/#dfn-extension-capability) när det gäller capability-namngivning, vilket kräver ett `:` (kolon) tecken som anger ett implementationsspecifikt namespace. Inom dina tester kan du komma åt din anpassade capability genom, t.ex.:

```ts
browser.capabilities['custom:caps']
```

För att säkerställa typsäkerhet kan du utöka WebdriverIOs capability-gränssnitt via:

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
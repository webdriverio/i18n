---
id: browserstack-service
title: Browserstack Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> En WebdriverIO-tjänst som hanterar lokal tunnel och jobbmetadata för BrowserStack-användare.

## Installation


Det enklaste sättet är att behålla `@wdio/browserstack-service` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/browserstack-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted)


## Konfiguration

WebdriverIO har inbyggt stöd för BrowserStack. Du bör ställa in `user` och `key` i din `wdio.conf.js`-fil. Detta tjänstplugin ger stöd för [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Ställ även in `browserstackLocal: true` för att aktivera denna funktion.
Rapporteringen av sessionsstatus på BrowserStack kommer att respektera inställningen `strict` i Cucumber-alternativen.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## Alternativ

För att få åtkomst till BrowserStack-tjänsten måste din konfiguration innehålla alternativen [`user`](https://webdriver.io/docs/options#user) och [`key`](https://webdriver.io/docs/options#key).

### testObservability

Test Observability är ett avancerat testrapporteringsverktyg som ger insikter för att förbättra dina automatiserade tester och hjälper dig att felsöka snabbare. Det är aktiverat som standard genom att sätta flaggan `testObservability`​ till `true` för alla användare av browserstack-service. Du kan inaktivera detta genom att sätta flaggan `testObservability`​ till `false`.

När dina tester är färdiga kan du besöka [Test Observability](https://observability.browserstack.com/) för att felsöka dina byggen med ytterligare insikter som unik felanalys, automatisk upptäckt av instabila tester och mer.

Du kan använda Test Observability även om du inte kör dina tester på BrowserStack-infrastrukturen. Även om du kör dina tester på en CI, en lokal maskin eller till och med på andra molntjänstleverantörer, kan Test Observability fortfarande generera intelligenta testrapporter och avancerad analys av dina tester.

Om du vill använda Test Observability utan att köra dina tester på BrowserStack-infrastrukturen kan du ställa in din konfiguration enligt följande:


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

Du kan utforska alla funktioner i Test Observability i [denna sandbox](https://observability-demo.browserstack.com/) eller läsa mer om det [här](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
Ställ in detta till true för att aktivera routning av anslutningar från BrowserStack-molnet genom din dator.

Typ: `Boolean`<br />
Standard: `false`

### forcedStop
Ställ in detta till true för att avsluta BrowserStack Local-processen vid slutförande, utan att vänta på att BrowserStack Local stoppåteruppringning ska anropas. Detta är experimentellt och bör inte användas av alla. Mest nödvändigt som en lösning för [detta problem](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

Typ: `Boolean`<br />
Standard: `false`

### app

[Appium](https://appium.io/) ställ in detta med app-filsökvägen som är tillgänglig lokalt på din maskin för att använda appen som [applikation under test](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) för Appium-sessioner.

Typ: `String` eller `JsonObject`<br />
Standard: `undefined`

Lista över tillgängliga app-värden:

#### path
Använd lokalt tillgänglig app-filsökväg som en applikation under test för Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OR
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

Skicka custom_id under app-uppladdningen.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
Använd app-URL:en som returneras efter att ha laddat upp appen till BrowserStack.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OR
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

använd custom_id för redan uppladdade appar

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OR
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

använd shareable_id för redan uppladdade appar

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OR
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Endast Cucumber. Ställ in BrowserStack Automate-sessionsnamnet till Scenario-namnet om endast ett enda Scenario körs.
Användbart när man kör parallellt med [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Typ: `Boolean`<br />
Standard: `false`

### sessionNameFormat

Anpassa formatet för BrowserStack Automate-sessionsnamnet.

Typ: `Function`<br />
Standard (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Standard (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Endast Mocha. Lägg inte till testtiteln till BrowserStack Automate-sessionsnamnet.

Typ: `Boolean`<br />
Standard: `false`

### sessionNamePrependTopLevelSuiteTitle

Endast Mocha. Lägg till titeln på sviten på toppnivå till BrowserStack Automate-sessionsnamnet.

Typ: `Boolean`<br />
Standard: `false`

### setSessionName

Ställ automatiskt in BrowserStack Automate-sessionsnamnet.

Typ: `Boolean`<br />
Standard: `true`

### setSessionStatus

Ställ automatiskt in BrowserStack Automate-sessionsstatus (godkänd/misslyckad).

Typ: `Boolean`<br />
Standard: `true`

### buildIdentifier

**buildIdentifier** är ett unikt ID för att skilja varje körning som läggs till i buildName. Välj ditt buildIdentifier-format från de tillgängliga uttrycken:
* `BUILD_NUMBER`: Genererar en inkrementell räknare med varje körning
* `DATE_TIME`: Genererar en tidsstämpel med varje körning. T.ex. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier stöder användning av antingen ett eller båda uttrycken tillsammans med andra tecken vilket möjliggör anpassade formateringsalternativ.

### opts

BrowserStack Local-alternativ.

Typ: `Object`<br />
Standard: `{}`

Lista över tillgängliga modifierare för lokal testning som ska skickas som alternativ:

#### Local Identifier

Om du gör flera samtidiga lokala testanslutningar, ställ in detta unikt för olika processer -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

För att aktivera detaljerad loggning -

```js
opts = { verbose: "true" };
```

Obs - Möjliga värden för modifieraren 'verbose' är '1', '2', '3' och 'true'

#### Force Local

För att dirigera all trafik via lokal (din) maskin -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

För att testa lokal mapp istället för intern server, ange sökväg till mapp som värde för detta alternativ -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

För att avsluta andra körande BrowserStack Local-instanser -

```js
opts = { force: "true" };
```

#### Only Automate

För att inaktivera lokal testning för Live och Screenshots, och aktivera endast Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

För att använda en proxy för lokal testning -

- proxyHost: Värdnamn/IP för proxy, övriga proxyalternativ ignoreras om detta alternativ saknas
- proxyPort: Port för proxyn, standardvärdet är 3128 när -proxyHost används
- proxyUser: Användarnamn för anslutning till proxy (endast Basic Auth)
- proxyPass: Lösenord för USERNAME, ignoreras om USERNAME är tomt eller inte angivet

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

För att använda lokal proxy i lokal testning -

- localProxyHost: Värdnamn/IP för proxy, övriga proxyalternativ ignoreras om detta alternativ saknas
- localProxyPort: Port för proxyn, standardvärdet är 8081 när -localProxyHost används
- localProxyUser: Användarnamn för anslutning till proxy (endast Basic Auth)
- localProxyPass: Lösenord för USERNAME, ignoreras om USERNAME är tomt eller inte angivet

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

För att använda PAC (Proxy Auto-Configuration) i lokal testning -

- pac-file: PAC (Proxy Auto-Configuration) filens absoluta sökväg

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

Som standard försöker BrowserStack lokala wrappers ladda ner och köra den senaste versionen av BrowserStack-binären i ~/.browserstack eller den nuvarande arbetskatalogen eller tmp-mappen i ordningsföljd. Men du kan åsidosätta dessa genom att skicka argumentet -binarypath.
Sökväg för att ange lokal binär sökväg -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

För att spara loggarna till filen medan du kör med '-v'-argumentet kan du ange filens sökväg. Som standard sparas loggarna i filen local.log i den nuvarande arbetskatalogen.
För att ange sökvägen till filen där loggarna ska sparas -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).
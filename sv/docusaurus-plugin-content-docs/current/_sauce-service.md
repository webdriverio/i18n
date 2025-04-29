---
id: sauce-service
title: Sauce Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO-tjänst som ger en bättre integration med Sauce Labs. Denna tjänst kan användas för:

- Sauce Labs Virtual Machine Cloud (Desktop Web/Emulator/Simulator)
- Sauce Labs Real Device Cloud (iOS och Android)

Den kan uppdatera jobbmetadata ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') och kör Sauce Connect om så önskas.

Vad mer gör denna tjänst för dig:

- Som standard kommer Sauce Service att uppdatera 'name' på jobbet när jobbet startar. Detta ger dig möjlighet att uppdatera namnet när som helst.
- Du kan definiera en `setJobName`-parameter och anpassa jobbnamnet enligt dina capabilities, alternativ och svittitel
- Sauce Service kommer också att skicka felstacken från ett misslyckat test till Sauce Labs kommandoflik
- Den låter dig automatiskt konfigurera och starta [Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- Och den kommer att sätta kontextpunkter i din kommandolista för att identifiera vilka kommandon som utfördes i vilket test

## Installation

Det enklaste sättet är att hålla `@wdio/sauce-service` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/sauce-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted)

## Konfiguration

För att använda tjänsten för Virtual Desktop/Emulator/Simulator Machine och Real Device Cloud behöver du ange `user` och `key` i din `wdio.conf.js`-fil. Den kommer automatiskt att använda Sauce Labs för att köra dina integrationstester. Om du kör dina tester på Sauce Labs kan du specificera regionen du vill köra dina tester i via `region`-egenskapen. Tillgängliga kortkommandon för regioner är `us` (standard) och `eu`. Dessa regioner används för Sauce Labs VM-molnet och Sauce Labs Real Device Cloud. Om du inte anger regionen används `us` som standard.

Om du vill att WebdriverIO automatiskt ska starta en [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)-tunnel, behöver du ställa in `sauceConnect: true`. Om du vill byta datacenter till EU, lägg till `region:'eu'` eftersom US datacenter är inställt som standard.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // eller 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

Om du vill använda en befintlig Sauce Connect-tunnel behöver du bara ange ett `tunnelName`. Om du använder en delad tunnel, och du inte är användaren som skapade tunneln, måste du identifiera den Sauce Labs-användare som skapade tunneln för att kunna använda den för ditt test. Inkludera `tunnelOwner` i capabilities så här:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Sauce Service-alternativ

För att auktorisera Sauce Labs-tjänsten måste din konfiguration innehålla alternativen [`user`](https://webdriver.io/docs/options#user) och [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

Denna tjänst kommer automatiskt att skicka felstacken till Sauce Labs när ett test misslyckas. Som standard skickar den bara de första 5 raderna, men vid behov kan detta ändras. Var medveten om att fler rader kommer att resultera i fler WebDriver-anrop vilket kan sakta ner körningen.

Typ: `number`<br />
Standard: `5`

### sauceConnect

Om `true` kör den Sauce Connect och öppnar en säker anslutning mellan en Sauce Labs virtuell maskin som kör dina webblästertester.

Typ: `Boolean`<br />
Standard: `false`

### sauceConnectOpts

Tillämpa Sauce Connect-alternativ (t.ex. för att ändra portnummer eller logFile-inställningar). Se [denna lista](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) för mer information.

OBS: När du specificerar alternativen ska `--` utelämnas. Det kan också göras om till camelCase (t.ex. `shared-tunnel` eller `sharedTunnel`).

Typ: `Object`<br />
Standard: `{ }`

### uploadLogs

Om `true` laddar detta alternativ upp alla WebdriverIO-loggfiler till Sauce Labs-plattformen för ytterligare inspektion. Se till att du har [`outputDir`](https://webdriver.io/docs/options#outputdir) inställt i din wdio-konfiguration för att skriva loggar till filer, annars kommer data att strömmas till stdout och kan inte laddas upp.

Typ: `Boolean`<br />
Standard: `true`

### setJobName

Låter användare dynamiskt ställa in jobbnamnet baserat på arbetarparametrar som WebdriverIO-konfiguration, använda capabilities och den ursprungliga svitens titel.

Typ: `Function`<br />
Standard: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Överskrida genererad namnmetadata

Tjänsten genererar automatiskt ett namn för varje test från svitnamn, webbläsarnamn och annan information.

Du kan åsidosätta detta genom att tillhandahålla ett värde för `name` desired capability, men detta kommer att ha bieffekten att ge alla tester samma namn.

----

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).
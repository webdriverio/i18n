---
id: testingbot-service
title: Testingbot Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> WebdriverIO-tjänst som ger en bättre integration med TestingBot. Den uppdaterar jobbmetadata ('name', 'passed', 'tags', 'public', 'build', 'extra') och kör TestingBot Tunnel om så önskas.

## Installation

Det enklaste sättet är att behålla `@wdio/testingbot-service` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/testingbot-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted)

## Konfiguration

För att använda tjänsten behöver du ange `user` och `key` i din `wdio.conf.js`-fil, och ställa in `hostname`-alternativet till `hub.testingbot.com`. Om du vill använda [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)
behöver du ställa in `tbTunnel: true`.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## Alternativ

För att auktorisera TestingBot-tjänsten måste din konfiguration innehålla alternativ för [`user`](https://webdriver.io/docs/options#user) och [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
Om sant kör den TestingBot Tunnel och öppnar en säker anslutning mellan en TestingBot Virtual Machine som kör dina webbläsartester.

Typ: `Boolean`<br />
Standard: `false`

### tbTunnelOpts
Tillämpa alternativ för TestingBot Tunnel (t.ex. för att ändra portnummer eller loggfilsinställningar). Se [denna lista](https://github.com/testingbot/testingbot-tunnel-launcher) för mer information.

Typ: `Object`<br />
Standard: `{}`
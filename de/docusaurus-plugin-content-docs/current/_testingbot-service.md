---
id: testingbot-service
title: Testingbot Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> WebdriverIO-Service, der eine bessere Integration in TestingBot bietet. Es aktualisiert die Job-Metadaten ('name', 'passed', 'tags', 'public', 'build', 'extra') und führt TestingBot Tunnel bei Bedarf aus.

## Installation

Der einfachste Weg ist, `@wdio/testingbot-service` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/testingbot-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted)

## Konfiguration

Um den Service nutzen zu können, müssen Sie `user` und `key` in Ihrer `wdio.conf.js`-Datei festlegen und die Option `hostname` auf `hub.testingbot.com` setzen. Wenn Sie [TestingBot Tunnel](https://testingbot.com/support/other/tunnel) verwenden möchten, müssen Sie `tbTunnel: true` setzen.

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

## Optionen

Um den TestingBot-Service zu autorisieren, muss Ihre Konfiguration die Optionen [`user`](https://webdriver.io/docs/options#user) und [`key`](https://webdriver.io/docs/options#key) enthalten.

### tbTunnel
Wenn auf true gesetzt, wird der TestingBot Tunnel ausgeführt und öffnet eine sichere Verbindung zu einer TestingBot Virtual Machine, die Ihre Browser-Tests ausführt.

Typ: `Boolean`<br />
Standard: `false`

### tbTunnelOpts
Wenden Sie TestingBot Tunnel-Optionen an (z.B. um Port-Nummer oder logFile-Einstellungen zu ändern). Weitere Informationen finden Sie in [dieser Liste](https://github.com/testingbot/testingbot-tunnel-launcher).

Typ: `Object`<br />
Standard: `{}`
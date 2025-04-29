---
id: testingbot-service
title: Usługa Testingbot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Usługa WebdriverIO, która zapewnia lepszą integrację z TestingBot. Aktualizuje metadane zadania ('name', 'passed', 'tags', 'public', 'build', 'extra') i uruchamia TestingBot Tunnel, jeśli jest to pożądane.

## Instalacja

Najłatwiejszym sposobem jest utrzymanie `@wdio/testingbot-service` jako devDependency w pliku `package.json`, poprzez:

```sh
npm install @wdio/testingbot-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted)

## Konfiguracja

Aby korzystać z usługi, musisz ustawić `user` i `key` w pliku `wdio.conf.js` oraz ustawić opcję `hostname` na `hub.testingbot.com`. Jeśli chcesz używać [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)
musisz ustawić `tbTunnel: true`.

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

## Opcje

Aby autoryzować usługę TestingBot, twoja konfiguracja musi zawierać opcje [`user`](https://webdriver.io/docs/options#user) i [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
Jeśli ustawione na true, uruchamia TestingBot Tunnel i otwiera bezpieczne połączenie między maszyną wirtualną TestingBot, która uruchamia testy przeglądarki.

Typ: `Boolean`<br />
Domyślnie: `false`

### tbTunnelOpts
Zastosuj opcje TestingBot Tunnel (np. aby zmienić numer portu lub ustawienia logFile). Zobacz [tę listę](https://github.com/testingbot/testingbot-tunnel-launcher) aby uzyskać więcej informacji.

Typ: `Object`<br />
Domyślnie: `{}`
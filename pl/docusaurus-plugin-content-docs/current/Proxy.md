---
id: proxy
title: Konfiguracja Proxy
---

Możesz przekierować dwa różne typy żądań przez proxy:

- połączenie między twoim skryptem testowym a sterownikiem przeglądarki (lub punktem końcowym WebDriver)
- połączenie między przeglądarką a internetem

## Proxy między sterownikiem a testem

Jeśli twoja firma ma korporacyjne proxy (np. na `http://my.corp.proxy.com:9090`) dla wszystkich wychodzących żądań, wykonaj poniższe kroki, aby zainstalować i skonfigurować [undici](https://github.com/nodejs/undici).

### Zainstaluj undici

```bash npm2yarn
npm install undici --save-dev
```

### Dodaj undici setGlobalDispatcher do swojego pliku konfiguracyjnego

Dodaj następującą instrukcję require na górze pliku konfiguracyjnego.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Dodatkowe informacje o konfigurowaniu proxy można znaleźć [tutaj](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Jeśli używasz [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), uruchom je za pomocą:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy między przeglądarką a internetem

Aby przekierować połączenie między przeglądarką a internetem, możesz skonfigurować proxy, co może być przydatne (na przykład) do przechwytywania informacji o sieci i innych danych za pomocą narzędzi takich jak [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Parametry `proxy` można zastosować za pomocą standardowych możliwości w następujący sposób:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

Aby uzyskać więcej informacji, zobacz [specyfikację WebDriver](https://w3c.github.io/webdriver/#proxy).
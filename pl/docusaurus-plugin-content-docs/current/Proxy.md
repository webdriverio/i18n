---
id: proxy
title: Konfiguracja Proxy
---

Możesz tunelować dwa różne rodzaje żądań przez proxy:

- połączenie między Twoim skryptem testowym a sterownikiem przeglądarki (lub punktem końcowym WebDrivera)
- połączenie między przeglądarką a internetem

## Proxy Między Sterownikiem a Testem

Jeśli Twoja firma ma firmowe proxy (np. na `http://my.corp.proxy.com:9090`) dla wszystkich wychodzących żądań, masz dwie opcje konfiguracji WebdriverIO, aby używało proxy:

### Opcja 1: Używanie Zmiennych Środowiskowych (Zalecane)

Począwszy od WebdriverIO v9.12.0, możesz po prostu ustawić standardowe zmienne środowiskowe proxy:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Opcjonalnie: omijaj proxy dla określonych hostów
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Następnie uruchom swoje testy jak zwykle. WebdriverIO automatycznie użyje tych zmiennych środowiskowych do konfiguracji proxy.

### Opcja 2: Używanie setGlobalDispatcher z undici

Dla bardziej zaawansowanych konfiguracji proxy lub jeśli potrzebujesz programowej kontroli, możesz użyć metody `setGlobalDispatcher` z undici:

#### Zainstaluj undici

```bash npm2yarn
npm install undici --save-dev
```

#### Dodaj undici setGlobalDispatcher do pliku konfiguracyjnego

Dodaj następującą instrukcję require na początku swojego pliku konfiguracyjnego.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Dodatkowe informacje o konfigurowaniu proxy można znaleźć [tutaj](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Którą Metodę Powinienem Wybrać?

- **Używaj zmiennych środowiskowych** jeśli chcesz prostego, standardowego podejścia, które działa w różnych narzędziach i nie wymaga zmian w kodzie.
- **Używaj setGlobalDispatcher** jeśli potrzebujesz zaawansowanych funkcji proxy, takich jak niestandardowa autoryzacja, różne konfiguracje proxy dla różnych środowisk lub chcesz programowo kontrolować zachowanie proxy.

Obie metody są w pełni obsługiwane, a WebdriverIO sprawdzi najpierw globalny dispatcher, zanim powróci do zmiennych środowiskowych.

### Sauce Connect Proxy

Jeśli używasz [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), uruchom go za pomocą:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Między Przeglądarką a Internetem

Aby tunelować połączenie między przeglądarką a internetem, możesz skonfigurować proxy, co może być przydatne (na przykład) do przechwytywania informacji o sieci i innych danych za pomocą narzędzi takich jak [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Parametry `proxy` można zastosować za pomocą standardowych funkcji w następujący sposób:

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
---
id: proxy
title: Konfiguracja proxy
description: "Kieruj żądania przez proxy, pomiędzy testami a sterownikiem lub pomiędzy przeglądarką a internetem."
---

Możesz tunelować dwa różne typy żądań przez proxy:

- połączenie między skryptem testowym a sterownikiem przeglądarki (lub endpointem WebDriver)
- połączenie między przeglądarką a internetem

## Proxy między sterownikiem a testem

Jeśli Twoja firma korzysta z firmowego proxy (np. pod adresem `http://my.corp.proxy.com:9090`) dla wszystkich wychodzących żądań, masz dwie możliwości skonfigurowania WebdriverIO do korzystania z proxy:

### Opcja 1: Użycie zmiennych środowiskowych (zalecane)

Począwszy od WebdriverIO v9.12.0, możesz po prostu ustawić standardowe zmienne środowiskowe proxy:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Opcjonalnie: pomiń proxy dla określonych hostów
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Następnie uruchom testy jak zwykle. WebdriverIO automatycznie użyje tych zmiennych środowiskowych do konfiguracji proxy.

### Opcja 2: Użycie setGlobalDispatcher z undici

W przypadku bardziej zaawansowanych konfiguracji proxy lub jeśli potrzebujesz programowej kontroli, możesz użyć metody `setGlobalDispatcher` z biblioteki undici:

#### Zainstaluj undici

```bash npm2yarn
npm install undici --save-dev
```

#### Dodaj setGlobalDispatcher z undici do pliku konfiguracyjnego

Dodaj następującą instrukcję require na początku pliku konfiguracyjnego.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Dodatkowe informacje na temat konfigurowania proxy można znaleźć [tutaj](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Której metody powinienem użyć?

- **Użyj zmiennych środowiskowych**, jeśli chcesz prostego, standardowego podejścia, które działa w różnych narzędziach i nie wymaga zmian w kodzie.
- **Użyj setGlobalDispatcher**, jeśli potrzebujesz zaawansowanych funkcji proxy, takich jak niestandardowe uwierzytelnianie, różne konfiguracje proxy dla poszczególnych środowisk, lub chcesz programowo kontrolować zachowanie proxy.

Obie metody są w pełni obsługiwane, a WebdriverIO najpierw sprawdzi, czy istnieje globalny dispatcher, zanim skorzysta ze zmiennych środowiskowych.

### Sauce Connect Proxy

Jeśli korzystasz z [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), uruchom go za pomocą:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy między przeglądarką a internetem

Aby tunelować połączenie między przeglądarką a internetem, możesz skonfigurować proxy, co może być przydatne (na przykład) do przechwytywania informacji o ruchu sieciowym i innych danych za pomocą narzędzi takich jak [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Parametry `proxy` można zastosować za pomocą standardowych capabilities w następujący sposób:

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

Więcej informacji znajdziesz w [specyfikacji WebDriver](https://w3c.github.io/webdriver/#proxy).
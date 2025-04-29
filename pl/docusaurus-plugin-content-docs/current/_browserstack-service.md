---
id: browserstack-service
title: Usługa Browserstack
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Usługa WebdriverIO, która zarządza lokalnym tunelem i metadanymi zadań dla użytkowników BrowserStack.

## Instalacja


Najłatwiejszym sposobem jest utrzymanie `@wdio/browserstack-service` jako devDependency w pliku `package.json`, poprzez:

```sh
npm install @wdio/browserstack-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted)


## Konfiguracja

WebdriverIO ma wbudowaną obsługę BrowserStack. Powinieneś ustawić `user` i `key` w swoim pliku `wdio.conf.js`. Ta wtyczka usługi zapewnia wsparcie dla [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Ustaw `browserstackLocal: true`, aby aktywować tę funkcję.
Raportowanie statusu sesji w BrowserStack będzie respektować ustawienie `strict` w opcjach Cucumber.

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

## Opcje

Aby autoryzować się w usłudze BrowserStack, Twoja konfiguracja musi zawierać opcje [`user`](https://webdriver.io/docs/options#user) i [`key`](https://webdriver.io/docs/options#key).

### testObservability

Test Observability to zaawansowane narzędzie do raportowania testów, które dostarcza informacji poprawiających testy automatyczne i pomaga szybciej debugować. Jest domyślnie włączone poprzez ustawienie flagi `testObservability` na `true` dla wszystkich użytkowników browserstack-service. Możesz je wyłączyć, ustawiając flagę `testObservability` na `false`.

Po zakończeniu testów możesz odwiedzić [Test Observability](https://observability.browserstack.com/), aby debugować swoje buildy z dodatkowymi informacjami, takimi jak analiza unikalnych błędów, automatyczne wykrywanie niestabilnych testów i więcej.

Możesz korzystać z Test Observability nawet jeśli nie uruchamiasz testów na infrastrukturze BrowserStack. Nawet jeśli uruchamiasz testy na CI, lokalnej maszynie lub innych dostawcach usług w chmurze, Test Observability nadal może generować inteligentne raporty testowe i zaawansowane analizy twoich testów.

Jeśli chcesz korzystać z Test Observability bez uruchamiania testów na infrastrukturze BrowserStack, możesz ustawić konfigurację w następujący sposób:


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

Możesz eksplorować wszystkie funkcje Test Observability w [tym sandboxie](https://observability-demo.browserstack.com/) lub przeczytać więcej o tym [tutaj](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
Ustaw to na true, aby włączyć routowanie połączeń z chmury BrowserStack przez twój komputer.

Typ: `Boolean`<br />
Domyślnie: `false`

### forcedStop
Ustaw to na true, aby zabić proces BrowserStack Local po zakończeniu, bez czekania na wywołanie zwrotne zatrzymania BrowserStack Local. Jest to eksperymentalne i nie powinno być używane przez wszystkich. Głównie konieczne jako obejście dla [tego problemu](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

Typ: `Boolean`<br />
Domyślnie: `false`

### app

[Appium](https://appium.io/) ustaw to ze ścieżką pliku aplikacji dostępną lokalnie na twoim komputerze, aby użyć aplikacji jako [testowanej aplikacji](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) dla sesji Appium.

Typ: `String` lub `JsonObject`<br />
Domyślnie: `undefined`

Lista dostępnych wartości app:

#### path
Użyj lokalnie dostępnej ścieżki pliku aplikacji jako aplikacji testowanej dla Appium.

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

Przekaż custom_id podczas przesyłania aplikacji.

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
Użyj URL aplikacji zwróconego po przesłaniu aplikacji do BrowserStack.

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

użyj custom_id już przesłanych aplikacji

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

użyj shareable_id już przesłanych aplikacji

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

Tylko Cucumber. Ustaw nazwę sesji BrowserStack Automate na nazwę scenariusza, jeśli uruchomiono tylko jeden scenariusz.
Przydatne przy równoległym uruchamianiu z [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Typ: `Boolean`<br />
Domyślnie: `false`

### sessionNameFormat

Dostosuj format nazwy sesji BrowserStack Automate.

Typ: `Function`<br />
Domyślnie (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Domyślnie (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Tylko Mocha. Nie dołączaj tytułu testu do nazwy sesji BrowserStack Automate.

Typ: `Boolean`<br />
Domyślnie: `false`

### sessionNamePrependTopLevelSuiteTitle

Tylko Mocha. Dodaj tytuł najwyższego poziomu zestawu na początku nazwy sesji BrowserStack Automate.

Typ: `Boolean`<br />
Domyślnie: `false`

### setSessionName

Automatycznie ustaw nazwę sesji BrowserStack Automate.

Typ: `Boolean`<br />
Domyślnie: `true`

### setSessionStatus

Automatycznie ustaw status sesji BrowserStack Automate (powodzenie/niepowodzenie).

Typ: `Boolean`<br />
Domyślnie: `true`

### buildIdentifier

**buildIdentifier** to unikalny identyfikator odróżniający każde wykonanie, który zostaje dołączony do buildName. Wybierz format buildIdentifier spośród dostępnych wyrażeń:
* `BUILD_NUMBER`: Generuje przyrostowy licznik z każdym wykonaniem
* `DATE_TIME`: Generuje znacznik czasu z każdym wykonaniem. Np. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier obsługuje użycie jednego lub obu wyrażeń wraz z innymi znakami, umożliwiając niestandardowe opcje formatowania.

### opts

Opcje BrowserStack Local.

Typ: `Object`<br />
Domyślnie: `{}`

Lista dostępnych modyfikatorów testów lokalnych do przekazania jako opts:

#### Local Identifier

Jeśli wykonujesz jednocześnie wiele połączeń lokalnych testów, ustaw to w sposób unikalny dla różnych procesów -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

Aby włączyć szczegółowe logowanie -

```js
opts = { verbose: "true" };
```

Uwaga - Możliwe wartości dla modyfikatora 'verbose' to '1', '2', '3' i 'true'

#### Force Local

Aby przekierować cały ruch przez lokalną (Twoją) maszynę -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

Aby testować lokalny folder zamiast wewnętrznego serwera, podaj ścieżkę do folderu jako wartość tej opcji -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

Aby zabić inne uruchomione instancje BrowserStack Local -

```js
opts = { force: "true" };
```

#### Only Automate

Aby wyłączyć lokalne testowanie dla Live i Screenshots i włączyć tylko Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

Aby użyć proxy dla testów lokalnych -

- proxyHost: Nazwa hosta/IP proxy, pozostałe opcje proxy są ignorowane, jeśli ta opcja jest nieobecna
- proxyPort: Port dla proxy, domyślnie 3128, gdy używane jest -proxyHost
- proxyUser: Nazwa użytkownika do łączenia się z proxy (tylko Basic Auth)
- proxyPass: Hasło dla USERNAME, będzie ignorowane, jeśli USERNAME jest puste lub nieokreślone

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

Aby użyć lokalnego proxy w testach lokalnych -

- localProxyHost: Nazwa hosta/IP proxy, pozostałe opcje proxy są ignorowane, jeśli ta opcja jest nieobecna
- localProxyPort: Port dla proxy, domyślnie 8081, gdy używane jest -localProxyHost
- localProxyUser: Nazwa użytkownika do łączenia się z proxy (tylko Basic Auth)
- localProxyPass: Hasło dla USERNAME, będzie ignorowane, jeśli USERNAME jest puste lub nieokreślone

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

Aby użyć PAC (Proxy Auto-Configuration) w testach lokalnych -

- pac-file: Bezwzględna ścieżka pliku PAC (Proxy Auto-Configuration)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

Domyślnie wrappery BrowserStack local próbują pobrać i wykonać najnowszą wersję binarki BrowserStack w ~/.browserstack lub bieżącym katalogu roboczym lub folderze tmp w kolejności. Ale możesz to nadpisać, przekazując argument -binarypath.
Ścieżka do określenia lokalnej ścieżki binarki -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

Aby zapisać logi do pliku podczas uruchamiania z argumentem '-v', możesz określić ścieżkę pliku. Domyślnie logi są zapisywane w pliku local.log w bieżącym katalogu roboczym.
Aby określić ścieżkę do pliku, w którym będą zapisywane logi -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

Więcej informacji o WebdriverIO znajdziesz na [stronie głównej](https://webdriver.io).
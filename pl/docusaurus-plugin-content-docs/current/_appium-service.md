---
id: appium-service
title: Usługa Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Obsługa serwera Appium znajduje się poza zakresem projektu WebdriverIO. Ta usługa pomaga bezproblemowo uruchamiać serwer Appium podczas przeprowadzania testów za pomocą [WDIO testrunner](https://webdriver.io/docs/clioptions). Uruchamia [Serwer Appium](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) w procesie potomnym.

## Instalacja

Najłatwiejszym sposobem jest utrzymanie `@wdio/appium-service` jako devDependency w pliku `package.json`, poprzez:

```sh
npm install @wdio/appium-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted)

## Konfiguracja

Aby korzystać z usługi, należy dodać `appium` do tablicy usług:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // domyślny port appium
    services: ['appium'],
    // ...
};
```

## Opcje

Następujące opcje można dodać do pliku wdio.conf.js. Aby zdefiniować opcje dla usługi, należy dodać usługę do listy `services` w następujący sposób:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // domyślny port appium
    services: [
        ['appium', {
            // Opcje usługi Appium tutaj
            // ...
        }]
    ],
    // ...
};
```

### logPath
Ścieżka, w której powinny być przechowywane wszystkie logi z serwera Appium.

Typ: `String`

Przykład:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
Aby użyć własnej instalacji Appium, np. zainstalowanej globalnie, określ polecenie, które powinno zostać uruchomione.

Typ: `String`

Przykład:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Mapa argumentów dla serwera Appium, przekazywana bezpośrednio do `appium`.

Zobacz [dokumentację](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) dla możliwych argumentów.
Argumenty są dostarczane w formacie lower camel case. Na przykład, `debugLogSpacing: true` przekształca się w `--debug-log-spacing`, lub mogą być dostarczone w sposób opisany w dokumentacji Appium.

Typ: `Object`

Domyślnie: `{}`

Przykład:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**Uwaga:** Korzystanie z aliasów jest odradzane i nieobsługiwane. Zamiast tego, użyj pełnej nazwy właściwości w formacie lower camel case.

----

Więcej informacji na temat WebdriverIO znajdziesz na [stronie głównej](https://webdriver.io).
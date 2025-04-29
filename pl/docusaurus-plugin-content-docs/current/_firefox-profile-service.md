---
id: firefox-profile-service
title: Usługa Profilu Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Chcesz uruchomić przeglądarkę Firefox z określonym rozszerzeniem lub ustawić kilka preferencji? Selenium pozwala na używanie profilu dla przeglądarki Firefox poprzez przekazanie tego profilu jako ciągu `base64` do właściwości `moz:firefoxOptions.profile` w Twoich pożądanych możliwościach. Wymaga to zbudowania tego profilu i przekonwertowania go na `base64`. Ta usługa dla [testrunner wdio](https://webdriver.io/docs/clioptions) przejmuje pracę kompilowania profilu z Twoich rąk i pozwala wygodnie definiować pożądane opcje z pliku `wdio.conf.js`.

Aby znaleźć wszystkie możliwe opcje, otwórz [about:config](about:config) w przeglądarce Firefox lub odwiedź stronę [mozillaZine](http://kb.mozillazine.org/About:config_entries), aby znaleźć pełną dokumentację każdego ustawienia. Dodatkowo możesz zdefiniować skompilowane (jako `*.xpi`) rozszerzenia Firefox, które powinny zostać zainstalowane przed rozpoczęciem testu.

## Instalacja

Najłatwiejszym sposobem jest utrzymywanie `@wdio/firefox-profile-service` jako devDependency w Twoim `package.json`, poprzez:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted)

## Konfiguracja

Skonfiguruj swój profil, dodając usługę `firefox-profile` do listy usług. Następnie zdefiniuj swoje ustawienia we właściwości `firefoxProfile` w następujący sposób:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // ścieżka do pliku .xpi
                '/path/to/extensionB' // lub ścieżka do rozpakowanego rozszerzenia Firefox
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // używaj tylko dla Firefox <= 55
        }]
    ],
    // ...
};
```

Jeśli zbudowałeś niestandardowe rozszerzenie Firefox, które chcesz zainstalować w przeglądarce, upewnij się, że ustawiono flagę profilu `'xpinstall.signatures.required': false`, ponieważ rozszerzenia Firefox muszą być [podpisane przez Mozillę](https://wiki.mozilla.org/Add-ons/Extension_Signing).

Aby używać niestandardowych niepodpisanych rozszerzeń, będziesz musiał również używać [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/), ponieważ zwykły Firefox 48 i nowszy [nie pozwala na to](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Opcje

Zawiera wszystkie ustawienia jako pary klucz-wartość. Wszystkie dostępne ustawienia można znaleźć na stronie `about:config`.

### extensions

Dodaj jedno lub wiele rozszerzeń do sesji przeglądarki. Wszystkie wpisy mogą być albo bezwzględną ścieżką do pliku `.xpi`, albo ścieżką do rozpakowanego katalogu rozszerzenia Firefox.

Typ: `String[]`<br />
Domyślnie: `[]`

### profileDirectory

Twórz profil Firefox na podstawie istniejącego, ustawiając bezwzględną ścieżkę do tego profilu.

Typ: `String`<br />
Domyślnie: `null`

### proxy

Ustaw ustawienia proxy sieciowego. Parametr `proxy` jest hashem, którego struktura zależy od wartości obowiązkowego klucza `proxyType`, który przyjmuje jedną z następujących wartości ciągu:

 * `direct` - bezpośrednie połączenie (bez proxy)
 * `system` - użyj ustawień proxy systemu operacyjnego
 * `pac` - użyj automatycznej konfiguracji proxy ustawionej na podstawie wartości klucza `autoconfigUrl`
 * `manual` - ręczne ustawienia proxy zdefiniowane oddzielnie dla różnych protokołów przy użyciu wartości z następujących kluczy: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Typ: `Object`<br />
Domyślnie: `null`<br />
Przykład:

- Automatyczne Proxy:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- Ręczne HTTP Proxy:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- Ręczne HTTP i HTTPS Proxy:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

Ustaw tę flagę na `true`, jeśli używasz Firefox v55 lub niższej.

Typ: `Boolean`<br />
Domyślnie: `false`

----

Więcej informacji na temat WebdriverIO znajdziesz na [stronie głównej](https://webdriver.io).
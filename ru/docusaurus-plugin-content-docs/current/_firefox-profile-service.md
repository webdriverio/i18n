---
id: firefox-profile-service
title: Сервис профиля Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Вы хотите запустить Firefox с определенным расширением или установить несколько настроек? Selenium позволяет использовать профиль для браузера Firefox, передавая этот профиль в виде строки `base64` в свойство `moz:firefoxOptions.profile` в ваших возможностях. Это требует создания профиля и преобразования его в `base64`. Этот сервис для [wdio testrunner](https://webdriver.io/docs/clioptions) берет на себя работу по компиляции профиля и позволяет комфортно определять желаемые параметры в файле `wdio.conf.js`.

Чтобы найти все возможные опции, откройте [about:config](about:config) в вашем браузере Firefox или перейдите на сайт [mozillaZine](http://kb.mozillazine.org/About:config_entries), чтобы найти полную документацию о каждой настройке. Кроме того, вы можете определить скомпилированные (в виде `*.xpi`) расширения Firefox, которые должны быть установлены перед началом теста.

## Установка

Самый простой способ — установить `@wdio/firefox-profile-service` как devDependency в вашем `package.json` с помощью:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted)

## Конфигурация

Настройте свой профиль, добавив сервис `firefox-profile` в список сервисов. Затем определите настройки в свойстве `firefoxProfile`, как показано ниже:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // путь к .xpi файлу
                '/path/to/extensionB' // или путь к распакованному расширению Firefox
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // использовать только для Firefox <= 55
        }]
    ],
    // ...
};
```

Если вы создали пользовательское расширение Firefox, которое хотите установить в браузер, обязательно установите `'xpinstall.signatures.required': false` в качестве флага профиля, поскольку расширения Firefox должны быть [подписаны Mozilla](https://wiki.mozilla.org/Add-ons/Extension_Signing).

Для использования неподписанных расширений вам также потребуется [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/), поскольку обычный Firefox версии 48 и новее [не позволяет этого](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Опции

Содержит все настройки в виде пар ключ-значение. Все доступные настройки можно найти на странице `about:config`.

### extensions

Добавить одно или несколько расширений в сессию браузера. Все записи могут быть абсолютным путем к файлу `.xpi` или путем к распакованному каталогу расширения Firefox.

Тип: `String[]`<br />
По умолчанию: `[]`

### profileDirectory

Создать профиль Firefox на основе существующего, указав абсолютный путь к этому профилю.

Тип: `String`<br />
По умолчанию: `null`

### proxy

Установить настройки сетевого прокси. Параметр `proxy` представляет собой хэш, структура которого зависит от значения обязательного ключа `proxyType`, который принимает одно из следующих строковых значений:

 * `direct` - прямое соединение (без прокси)
 * `system` - использовать настройки прокси операционной системы
 * `pac` - использовать автоматическую конфигурацию прокси на основе значения ключа `autoconfigUrl`
 * `manual` - ручная настройка прокси, определяемая отдельно для разных протоколов с использованием значений следующих ключей: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Тип: `Object`<br />
По умолчанию: `null`<br />
Пример:

- Автоматический прокси:
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

- Ручной HTTP прокси:
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

- Ручной HTTP и HTTPS прокси:
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

Установите этот флаг в `true`, если вы используете Firefox v55 или ниже.

Тип: `Boolean`<br />
По умолчанию: `false`

----

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).
---
id: firefox-profile-service
title: Сервіс Firefox Profile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ви хочете запустити ваш браузер Firefox з певним розширенням або потрібно встановити кілька налаштувань? Selenium дозволяє використовувати профіль для браузера Firefox, передаючи цей профіль як рядок `base64` до властивості `moz:firefoxOptions.profile` у ваших бажаних можливостях. Це вимагає створення цього профілю та перетворення його у формат `base64`. Цей сервіс для [wdio testrunner](https://webdriver.io/docs/clioptions) бере на себе роботу з компіляцією профілю та дозволяє зручно визначати бажані параметри у файлі `wdio.conf.js`.

Щоб знайти всі можливі опції, відкрийте [about:config](about:config) у вашому браузері Firefox або перейдіть на сайт [mozillaZine](http://kb.mozillazine.org/About:config_entries), щоб знайти повну документацію про кожен параметр. Додатково до цього ви можете визначити скомпільовані (як `*.xpi`) розширення Firefox, які повинні бути встановлені перед початком тесту.

## Встановлення

Найпростіший спосіб - тримати `@wdio/firefox-profile-service` як devDependency у вашому `package.json`, через:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Інструкції з встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted)

## Конфігурація

Налаштуйте свій профіль, додавши сервіс `firefox-profile` до списку сервісів. Потім визначте ваші налаштування у властивості `firefoxProfile` наступним чином:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // шлях до файлу .xpi
                '/path/to/extensionB' // або шлях до розпакованого розширення Firefox
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // використовуйте тільки для firefox <= 55
        }]
    ],
    // ...
};
```

Якщо ви створили власне розширення Firefox, яке хочете встановити в браузері, переконайтеся, що встановили прапорець профілю `'xpinstall.signatures.required': false`, оскільки розширення Firefox повинні бути [підписані Mozilla](https://wiki.mozilla.org/Add-ons/Extension_Signing).

Щоб використовувати власні непідписані розширення, вам також потрібно використовувати [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/), оскільки звичайний Firefox 48 і новіші версії [не дозволяють цього](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Опції

Містить всі налаштування як пари ключ-значення. Ви можете знайти всі доступні налаштування на сторінці `about:config`.

### extensions

Додати одне або кілька розширень до сеансу браузера. Всі записи можуть бути абсолютним шляхом до файлу `.xpi` або шляхом до розпакованого каталогу розширення Firefox.

Тип: `String[]`<br />
За замовчуванням: `[]`

### profileDirectory

Створити профіль Firefox на основі існуючого, встановивши абсолютний шлях до цього профілю.

Тип: `String`<br />
За замовчуванням: `null`

### proxy

Встановити налаштування мережевого проксі. Параметр `proxy` - це хеш, структура якого залежить від значення обов'язкового ключа `proxyType`, який приймає одне з наступних значень:

 * `direct` - пряме з'єднання (без проксі)
 * `system` - використовувати налаштування проксі операційної системи
 * `pac` - використовувати автоматичну конфігурацію проксі, встановлену на основі значення ключа `autoconfigUrl`
 * `manual` - ручні налаштування проксі, окремо визначені для різних протоколів за допомогою значень із наступних ключів: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Тип: `Object`<br />
За замовчуванням: `null`<br />
Приклад:

- Автоматичний проксі:
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

- Ручний HTTP-проксі:
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

- Ручний HTTP та HTTPS-проксі:
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

Будь ласка, встановіть цей прапорець на `true`, якщо ви використовуєте Firefox v55 або нижче.

Тип: `Boolean`<br />
За замовчуванням: `false`

----

Для отримання додаткової інформації про WebdriverIO відвідайте [домашню сторінку](https://webdriver.io).
---
id: appium-service
title: Сервіс Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Керування сервером Appium виходить за межі фактичного проєкту WebdriverIO. Цей сервіс допомагає запускати сервер Appium безперешкодно при виконанні тестів за допомогою [WDIO testrunner](https://webdriver.io/docs/clioptions). Він запускає [Appium Server](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) як дочірній процес.

## Встановлення

Найпростіший спосіб - зберегти `@wdio/appium-service` як devDependency у вашому `package.json`, через:

```sh
npm install @wdio/appium-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted)

## Конфігурація

Щоб використовувати сервіс, вам потрібно додати `appium` до масиву сервісів:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: ['appium'],
    // ...
};
```

## Опції

Наступні опції можна додати до файлу wdio.conf.js. Щоб визначити опції для сервісу, вам потрібно додати сервіс до списку `services` наступним чином:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: [
        ['appium', {
            // Appium service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath
Шлях, куди повинні зберігатися всі логи з сервера Appium.

Тип: `String`

Приклад:
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
Щоб використовувати вашу інсталяцію Appium, наприклад, глобально встановлену, вкажіть команду, яку слід запустити.

Тип: `String`

Приклад:
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
Мапа аргументів для сервера Appium, які передаються безпосередньо до `appium`.

Дивіться [документацію](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) для можливих аргументів.
Аргументи подаються у нижньому верблюжому регістрі. Наприклад, `debugLogSpacing: true` перетворюється на `--debug-log-spacing`, або вони можуть бути подані, як зазначено в документації Appium.

Тип: `Object`

За замовчуванням: `{}`

Приклад:
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
**Примітка:** Використання псевдонімів не рекомендується і не підтримується. Замість цього, будь ласка, використовуйте повну назву властивості у нижньому верблюжому регістрі.

----

Для отримання додаткової інформації про WebdriverIO, відвідайте [домашню сторінку](https://webdriver.io).
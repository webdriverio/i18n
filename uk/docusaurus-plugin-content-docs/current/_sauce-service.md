---
id: sauce-service
title: Sauce Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Сервіс WebdriverIO, що забезпечує кращу інтеграцію з Sauce Labs. Цей сервіс можна використовувати для:

- Хмари віртуальних машин Sauce Labs (Desktop Web/Emulator/Simulator)
- Хмари реальних пристроїв Sauce Labs (iOS та Android)

Він може оновлювати метадані завдання ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') та запускати Sauce Connect за потреби.

Що ще цей сервіс зробить для вас:

- За замовчуванням, Sauce Service оновлює 'name' завдання, коли воно починається. Це надає вам можливість оновлювати назву в будь-який момент часу.
- Ви можете визначити параметр `setJobName` та налаштувати назву завдання відповідно до ваших можливостей, опцій та назви набору тестів
- Sauce Service також надсилає стек помилок невдалого тесту до вкладки команд Sauce Labs
- Він дозволяє автоматично налаштувати та запустити [Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- І він встановлює контекстні точки у вашому списку команд, щоб визначити, які команди були виконані в якому тесті

## Встановлення

Найпростіший спосіб - тримати `@wdio/sauce-service` як devDependency у вашому `package.json`, через:

```sh
npm install @wdio/sauce-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted)

## Налаштування

Щоб використовувати сервіс для Віртуальних Десктопних/Емуляторних/Симуляторних машин та хмари реальних пристроїв, вам потрібно встановити `user` і `key` у вашому файлі `wdio.conf.js`. Це автоматично використовуватиме Sauce Labs для запуску ваших інтеграційних тестів. Якщо ви запускаєте тести на Sauce Labs, ви можете вказати регіон, у якому хочете запускати свої тести, через властивість `region`. Доступні короткі позначення для регіонів: `us` (за замовчуванням) та `eu`. Ці регіони використовуються для хмари віртуальних машин Sauce Labs та хмари реальних пристроїв Sauce Labs. Якщо ви не вказуєте регіон, за замовчуванням використовується `us`.

Якщо ви хочете, щоб WebdriverIO автоматично запускав тунель [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy), вам потрібно встановити `sauceConnect: true`. Якщо ви хочете змінити центр обробки даних на ЄС, додайте `region:'eu'`, оскільки центр обробки даних у США встановлено за замовчуванням.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // або 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

Якщо ви хочете використовувати існуючий тунель Sauce Connect, вам потрібно лише надати `tunnelName`. Якщо ви використовуєте спільний тунель, і ви не є користувачем, який створив цей тунель, ви повинні вказати користувача Sauce Labs, який створив тунель, щоб використовувати його для свого тесту. Включіть `tunnelOwner` до можливостей таким чином:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Опції Sauce Service

Для авторизації сервісу Sauce Labs ваша конфігурація повинна містити опції [`user`](https://webdriver.io/docs/options#user) та [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

Цей сервіс автоматично надсилає стек помилок до Sauce Labs, коли тест не вдається. За замовчуванням, він буде надсилати лише перші 5 рядків, але за потреби це можна змінити. Майте на увазі, що більше рядків призведе до більшої кількості викликів WebDriver, що може сповільнити виконання.

Тип: `number`<br />
За замовчуванням: `5`

### sauceConnect

Якщо `true`, запускає Sauce Connect і відкриває захищене з'єднання між віртуальною машиною Sauce Labs, яка запускає ваші тести браузера.

Тип: `Boolean`<br />
За замовчуванням: `false`

### sauceConnectOpts

Застосовуйте опції Sauce Connect (наприклад, щоб змінити номер порту або налаштування logFile). Дивіться [цей список](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) для отримання додаткової інформації.

ПРИМІТКА: При вказанні опцій `--` слід опускати. Їх також можна перетворити на camelCase (наприклад, `shared-tunnel` або `sharedTunnel`).

Тип: `Object`<br />
За замовчуванням: `{ }`

### uploadLogs

Якщо `true`, ця опція завантажує всі файли журналів WebdriverIO на платформу Sauce Labs для подальшого огляду. Переконайтеся, що у вашій конфігурації wdio налаштовано [`outputDir`](https://webdriver.io/docs/options#outputdir) для запису журналів у файли, інакше дані будуть надсилатися до stdout і не зможуть бути завантажені.

Тип: `Boolean`<br />
За замовчуванням: `true`

### setJobName

Дозволяє користувачам динамічно встановлювати назву завдання на основі параметрів робочого процесу, таких як конфігурація WebdriverIO, використані можливості та оригінальна назва набору тестів.

Тип: `Function`<br />
За замовчуванням: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Перевизначення створених метаданих назви

Сервіс автоматично генерує назву для кожного тесту з назви набору тестів, назви браузера та іншої інформації.

Ви можете перевизначити це, надавши значення для можливості `name`, але це матиме побічний ефект у вигляді надання всім тестам однакової назви.

----

Для отримання додаткової інформації про WebdriverIO відвідайте [домашню сторінку](https://webdriver.io).
---
id: sauce-service
title: Сервис Sauce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Сервис WebdriverIO, который обеспечивает лучшую интеграцию с Sauce Labs. Этот сервис может использоваться для:

- облачной платформы виртуальных машин Sauce Labs (Desktop Web/Emulator/Simulator)
- облачной платформы реальных устройств Sauce Labs (iOS и Android)

Он может обновлять метаданные задания ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') и запускать Sauce Connect при необходимости.

Что еще этот сервис сделает для вас:

- По умолчанию Sauce Service обновит 'name' задания при его запуске. Это даст вам возможность обновить имя в любой момент времени.
- Вы можете определить параметр `setJobName` и настроить имя задания в соответствии с вашими возможностями, параметрами и названием набора тестов
- Sauce Service также отправит стек ошибок неудачного теста на вкладку команд Sauce Labs
- Он позволит автоматически настроить и запустить [Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- И он установит контекстные точки в вашем списке команд, чтобы идентифицировать, какие команды были выполнены в каком тесте

## Installation

Самый простой способ - сохранить `@wdio/sauce-service` как devDependency в вашем `package.json`:

```sh
npm install @wdio/sauce-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted)

## Configuration

Чтобы использовать сервис для Virtual Desktop/Emulator/Simulator Machine и Real Device cloud, вам нужно установить `user` и `key` в вашем файле `wdio.conf.js`. Он автоматически будет использовать Sauce Labs для запуска ваших интеграционных тестов. Если вы запускаете тесты на Sauce Labs, вы можете указать регион, в котором хотите запускать тесты, через свойство `region`. Доступные сокращенные обозначения для регионов - `us` (по умолчанию) и `eu`. Эти регионы используются для облака виртуальных машин Sauce Labs и облака реальных устройств Sauce Labs. Если вы не укажете регион, по умолчанию будет использоваться `us`.

Если вы хотите, чтобы WebdriverIO автоматически запускал туннель [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy), вам нужно установить `sauceConnect: true`. Если вы хотите изменить центр обработки данных на ЕС, добавьте `region:'eu'`, так как центр обработки данных в США установлен по умолчанию.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // или 'eu'
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

Если вы хотите использовать существующий туннель Sauce Connect, вам нужно предоставить только `tunnelName`. Если вы используете общий туннель, и вы не являетесь пользователем, создавшим туннель, вы должны указать пользователя Sauce Labs, который создал туннель, чтобы использовать его для вашего теста. Включите `tunnelOwner` в возможности следующим образом:

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

## Sauce Service Options

Для авторизации сервиса Sauce Labs ваша конфигурация должна содержать опции [`user`](https://webdriver.io/docs/options#user) и [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

Этот сервис автоматически отправляет стек ошибок в Sauce Labs при сбое теста. По умолчанию он отправляет только первые 5 строк, но при необходимости это можно изменить. Имейте в виду, что большее количество строк приведет к большему количеству вызовов WebDriver, что может замедлить выполнение.

Тип: `number`<br />
По умолчанию: `5`

### sauceConnect

Если `true`, запускает Sauce Connect и открывает безопасное соединение между виртуальной машиной Sauce Labs, запускающей ваши тесты браузера.

Тип: `Boolean`<br />
По умолчанию: `false`

### sauceConnectOpts

Применение опций Sauce Connect (например, для изменения номера порта или настроек logFile). См. [этот список](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) для получения дополнительной информации.

ПРИМЕЧАНИЕ: При указании опций префикс `--` следует опустить. Также можно использовать camelCase (например, `shared-tunnel` или `sharedTunnel`).

Тип: `Object`<br />
По умолчанию: `{ }`

### uploadLogs

Если `true`, эта опция загружает все файлы журналов WebdriverIO на платформу Sauce Labs для дальнейшего анализа. Убедитесь, что у вас установлен [`outputDir`](https://webdriver.io/docs/options#outputdir) в вашей конфигурации wdio для записи журналов в файлы, в противном случае данные будут передаваться в stdout и не смогут быть загружены.

Тип: `Boolean`<br />
По умолчанию: `true`

### setJobName

Позволяет пользователям динамически устанавливать имя задания на основе параметров рабочего процесса, таких как конфигурация WebdriverIO, используемые возможности и оригинальное название набора тестов.

Тип: `Function`<br />
По умолчанию: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Переопределение сгенерированных метаданных имени

Сервис автоматически генерирует имя для каждого теста из названия набора тестов, имени браузера и другой информации.

Вы можете переопределить это, указав значение для возможности `name`, но это будет иметь побочный эффект в виде присвоения всем тестам одинакового имени.

----

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).
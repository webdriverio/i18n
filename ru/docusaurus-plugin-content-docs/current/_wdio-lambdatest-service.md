---
id: wdio-lambdatest-service
title: Сервис LambdaTest
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service является сторонним пакетом, для получения дополнительной информации смотрите [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> Сервис WebdriverIO, который управляет туннелем и метаданными задач для пользователей LambdaTest.

## Установка

```bash
npm i wdio-lambdatest-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted.html)


## Конфигурация

WebdriverIO имеет встроенную поддержку LambdaTest. Вам просто нужно установить `user` и `key` в вашем файле `wdio.conf.js`. Чтобы включить функцию для автоматизации приложений, установите `product: 'appAutomation'` в вашем файле `wdio.conf.js`. Этот плагин сервиса предоставляет поддержку для [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). Установите также `tunnel: true`, чтобы активировать эту функцию.

```js
// wdio.conf.js
exports.config = {
    // ...
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    logFile : './logDir/api.log',
    product : 'appAutomation',
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    // ...
};
```

### Для получения замечаний об ошибках тестирования на панели автоматизации
Для получения замечаний об ошибках тестирования на панели автоматизации просто добавьте `ltErrorRemark: true` в ваш `wdio.conf.js`.


### Для загрузки приложения с локального компьютера или по URL
Загрузите приложения `android` или `ios` с локального компьютера или с URL-адреса, добавив необходимую конфигурацию в ваш `wdio.conf.js`. Чтобы использовать загруженное приложение для тестирования в том же запуске, установите `enableCapability = true`, это установит значение URL приложения в возможностях.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //укажите желаемое имя приложения
            app_path : "/path/to/your/app/file", //укажите локальное расположение приложения
            // или
            app_url : "https://example.test_android.apk", //укажите URL, где размещено или хранится ваше приложение
            custom_id : "12345", //укажите желаемый пользовательский идентификатор
            enableCapability : true
        }
    }
    ]
]
```

## Опции

Для авторизации в сервисе LambdaTest ваша конфигурация должна содержать опции [`user`](https://webdriver.io/docs/options.html#user) и [`key`](https://webdriver.io/docs/options.html#key).

### tunnel
Установите это значение в true, чтобы разрешить маршрутизацию соединений из облака LambdaTest через ваш компьютер. Вам также потребуется установить `tunnel` в true в возможностях браузера.

Тип: `Boolean`<br />
По умолчанию: `false`

### lambdatestOpts
Указанные дополнительные параметры будут переданы в LambdaTest Tunnel.

Тип: `Object`<br />
По умолчанию: `{}`

Ниже приведен полный список всех доступных опций:

#### tunnelName
Указывает пользовательское имя туннеля LambdaTest, которое будет использоваться.

**Пример:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
Порт для активации LambdaTest Tunnel.

**Пример:**
```json
{"port": 33000}
```
#### user
Имя пользователя LambdaTest.

**Пример:**
```json
{"user": "your_username"}
```

#### key
Ключ доступа LambdaTest.

**Пример:**
```json
{"key": "your_access_key"}
```

#### verbose
Должен ли каждый запрос прокси-сервера регистрироваться в stdout.

**Пример:**
```json
{"verbose": true}
```

#### logFile
Расположение файла журнала LambdaTest Tunnel.

**Пример:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

Путь к файлу конфигурации для использования.
**Пример:**
```json
{"config": "/path/to/config/file"}
```

#### dir
Укажите локальный каталог, который будет обслуживаться файловым сервером на порту Tunnel.

**Пример:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Указывает имя хоста прокси-порта туннеля.

**Пример:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Указывает имя пользователя для прокси-порта туннеля.

**Пример:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Указывает пароль для прокси-порта туннеля.

**Пример:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
Указывает номер порта, на котором будет активирован прокси туннеля.

**Пример:**
```json
{"proxyPort": 8080}
```

#### egressOnly
Использует настройки прокси-сервера только для исходящих запросов.

**Пример:**
```json
{"egressOnly": true}
```


#### ingressOnly
Маршрутизирует только входящий трафик через указанный прокси.

**Пример:**
```json
{"ingressOnly": true}
```


#### pacfile
Для использования PAC (Proxy Auto-Configuration) в локальном тестировании, укажите
путь к файлу PAC.

**Пример:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
Активирует [балансировку нагрузки](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) для LambdaTest Tunnel.

**Пример:**
```json
{"loadBalanced": true}
```

#### mode
Указывает, в каком режиме должен работать туннель "ssh" или "ws". (по умолчанию "ssh").

**Пример:**
```json
{"mode": "ssh"}
```

#### sshConnType
Укажите тип ssh-соединения (over_22, over_443, over_ws). Чтобы использовать –sshConnType, сначала укажите флаг ––mode ssh.

**Пример:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Увеличьте количество SSH-соединений от клиента туннеля к серверу туннеля. Максимально допустимое значение - 30.

**Пример:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
Совместное использование туннеля членами команды.

**Пример:**
```json
{"sharedTunnel": true}
```

#### env
Среда, в которой будет работать LambdaTest Tunnel.

**Пример:**
```json
{"env": "production"}
```


#### infoAPIPort
Предоставляет доступ к [Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) на указанном порту.

**Пример:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
URL обратного вызова для статуса туннеля.

**Пример:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
Список хостов, разделенных запятыми, для маршрутизации через туннель. Все остальное будет маршрутизировано через Интернет.

**Пример:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
Список хостов, разделенных запятыми, для обхода туннеля. Они будут маршрутизироваться через интернет.

**Пример:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
Путь к клиентскому сертификату mTLS.

**Пример:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
Путь к клиентскому ключу mTLS.

**Пример:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
Список хостов mTLS, разделенных запятыми.

**Пример:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
Список DNS-серверов, разделенных запятыми.

**Пример:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
Включить режим [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) для LambdaTest Tunnel.

**Пример:**
```json
{"mitm": true}
```

#### ntlm
Для использования аутентификации Microsoft NTLM (Windows NT LAN Manager) для коммуникации или транспортных целей.

**Пример:**
```json
{"ntlm": true}
```

#### pidfile
Путь к pidfile, куда будет записан идентификатор процесса.

**Пример:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
Устанавливает удаленный адрес на внутренний IP клиентской машины.

**Пример:**
```json
{"usePrivateIp": true}
```

Дополнительную информацию об этих опциях можно найти [здесь](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Только для Cucumber. Установите имя сессии на имя сценария, если запущен только один сценарий.
Полезно при параллельном выполнении с помощью [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Тип: `Boolean`<br />
По умолчанию: `false`

### sessionNameFormat
Настройка формата имени сессии.

Тип: `Function`<br />
По умолчанию (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
По умолчанию (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Только для Mocha. Не добавлять название теста к имени сессии.

Тип: `Boolean`<br />
По умолчанию: `false`

### sessionNamePrependTopLevelSuiteTitle
Только для Mocha. Добавить название верхнего уровня сюиты в начало имени сессии.

Тип: `Boolean`<br />
По умолчанию: `false`

### setSessionName
Автоматически устанавливать имя сессии.

Тип: `Boolean`<br />
По умолчанию: `true`

### setSessionStatus
Автоматически устанавливать статус сессии (пройдено/не пройдено).

Тип: `Boolean`<br />
По умолчанию: `true`


### ignoreTestCountInName
Игнорировать количество повторных попыток теста в имени

Тип: `Boolean`<br />
По умолчанию: `false`


### useScenarioName
Чтобы получать имена тестов как имена сценариев для тестов, специфичных для cucumber, просто добавьте `useScenarioName: true` в ваш `wdio.conf.js`.

## Шаги для компиляции и публикации
1. Клонируйте этот репозиторий.
2. Выполните "npm install"
3. Выполните "npm run build"
4. Шаги для публикации: выполните "npm login"
5. Выполните "npm publish --access public"

----

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).
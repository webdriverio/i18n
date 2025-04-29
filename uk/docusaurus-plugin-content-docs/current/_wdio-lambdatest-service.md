---
id: wdio-lambdatest-service
title: Сервіс LambdaTest
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service є пакетом третьої сторони, для отримання додаткової інформації дивіться [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> Сервіс WebdriverIO, який керує тунелем та метаданими задач для користувачів LambdaTest.

## Встановлення

```bash
npm i wdio-lambdatest-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted.html)


## Конфігурація

WebdriverIO має вбудовану підтримку LambdaTest. Вам просто потрібно встановити `user` та `key` у вашому файлі `wdio.conf.js`. Щоб увімкнути функцію для автоматизації додатків, встановіть `product: 'appAutomation'` у вашому файлі `wdio.conf.js`. Цей плагін сервісу підтримує [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). Також встановіть `tunnel: true`, щоб активувати цю функцію.

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

### Щоб отримати зауваження про помилки тесту на панелі автоматизації
Щоб отримати зауваження про помилки тесту на панелі автоматизації, просто додайте `ltErrorRemark: true` у ваш `wdio.conf.js`.


### Щоб завантажити додаток з локального середовища або URL
Завантажуйте додатки `android` або `ios` з локального середовища або розміщеного URL-адреси додатка, додавши цю необхідну конфігурацію у вашому `wdio.conf.js`. Щоб використовувати завантажений додаток для тестування у тому ж запуску, встановіть `enableCapability = true`, це встановить значення URL-адреси додатка в можливостях.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //provide your desired app name
            app_path : "/path/to/your/app/file", //provide the local app location
            // or
            app_url : "https://example.test_android.apk", //provide the url where your app is horsted or stored
            custom_id : "12345", //provide your desired custom id
            enableCapability : true
        }
    }
    ]
]
```

## Опції

Для авторизації в сервісі LambdaTest ваша конфігурація повинна містити опції [`user`](https://webdriver.io/docs/options.html#user) та [`key`](https://webdriver.io/docs/options.html#key).

### tunnel
Встановіть це значення в true, щоб увімкнути маршрутизацію з'єднань з хмари LambdaTest через ваш комп'ютер. Вам також потрібно встановити `tunnel` в true в можливостях браузера.

Тип: `Boolean`<br />
За замовчуванням: `false`

### lambdatestOpts
Вказані опції будуть передані в LambdaTest Tunnel.

Тип: `Object`<br />
За замовчуванням: `{}`

Нижче наведено повний список всіх доступних опцій:

#### tunnelName
Визначає ім'я користувацького тунелю LambdaTest.

**Приклад:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
Порт для активації LambdaTest Tunnel.

**Приклад:**
```json
{"port": 33000}
```
#### user
Ім'я користувача LambdaTest.

**Приклад:**
```json
{"user": "your_username"}
```

#### key
Ключ доступу LambdaTest.

**Приклад:**
```json
{"key": "your_access_key"}
```

#### verbose
Чи повинен кожен запит проксі записуватися в stdout.

**Приклад:**
```json
{"verbose": true}
```

#### logFile
Розташування файлу журналу LambdaTest Tunnel.

**Приклад:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

Шлях до конфігураційного файлу.
**Приклад:**
```json
{"config": "/path/to/config/file"}
```

#### dir
Вказує локальний каталог, який буде обслуговуватися файловим сервером на порту Tunnel.

**Приклад:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Вказує ім'я хоста проксі-порту Tunnel.

**Приклад:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Вказує ім'я користувача проксі-порту Tunnel.

**Приклад:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Вказує пароль проксі-порту Tunnel.

**Приклад:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
Вказує номер порту, на якому активується проксі Tunnel.

**Приклад:**
```json
{"proxyPort": 8080}
```

#### egressOnly
Використовує налаштування проксі тільки для вихідних запитів.

**Приклад:**
```json
{"egressOnly": true}
```


#### ingressOnly
Маршрутизує тільки вхідний трафік через вказаний проксі.

**Приклад:**
```json
{"ingressOnly": true}
```


#### pacfile
Для використання PAC (Proxy Auto-Configuration) у локальному тестуванні, вкажіть шлях до PAC-файлу.

**Приклад:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
Активує [Балансування навантаження](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) для LambdaTest Tunnel.

**Приклад:**
```json
{"loadBalanced": true}
```

#### mode
Вказує, в якому режимі повинен працювати тунель "ssh" або "ws". (за замовчуванням "ssh").

**Приклад:**
```json
{"mode": "ssh"}
```

#### sshConnType
Вказує тип ssh-з'єднання (over_22, over_443, over_ws). Щоб використовувати –sshConnType, спочатку вкажіть прапор ––mode ssh.

**Приклад:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Збільшує кількість SSH-з'єднань від Tunnel Client до Tunnel Server. Максимально допустиме значення - 30.

**Приклад:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
Спільне використання тунелю між членами команди.

**Приклад:**
```json
{"sharedTunnel": true}
```

#### env
Середовище, на якому буде запущено LambdaTest Tunnel.

**Приклад:**
```json
{"env": "production"}
```


#### infoAPIPort
Відкриває [Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) на вказаному порту.

**Приклад:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
URL зворотного виклику для статусу тунелю.

**Приклад:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
Список хостів, розділених комами, для маршрутизації через тунель. Все інше буде маршрутизуватися через Інтернет.

**Приклад:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
Список хостів, розділених комами, для обходу тунелю. Вони будуть маршрутизовані через Інтернет.

**Приклад:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
Шлях до файлу клієнтського сертифіката mTLS.

**Приклад:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
Шлях до файлу клієнтського ключа mTLS.

**Приклад:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
Список хостів mTLS, розділених комами.

**Приклад:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
Список DNS-серверів, розділених комами.

**Приклад:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
Увімкнути режим [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) для LambdaTest Tunnel.

**Приклад:**
```json
{"mitm": true}
```

#### ntlm
Для використання аутентифікації Microsoft NTLM (Windows NT LAN Manager) для комунікації або транспортних цілей.

**Приклад:**
```json
{"ntlm": true}
```

#### pidfile
Шлях до pidfile, куди буде записано ідентифікатор процесу.

**Приклад:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
Встановлює віддалену адресу на внутрішню IP-адресу клієнтської машини.

**Приклад:**
```json
{"usePrivateIp": true}
```

Ви можете дізнатися більше про ці опції [тут](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Тільки для Cucumber. Встановлює ім'я сесії в ім'я Сценарію, якщо запущено лише один Сценарій.
Корисно при паралельному запуску з [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Тип: `Boolean`<br />
За замовчуванням: `false`

### sessionNameFormat
Налаштовує формат імені сесії.

Тип: `Function`<br />
За замовчуванням (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
За замовчуванням (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Тільки для Mocha. Не додає заголовок тесту до імені сесії.

Тип: `Boolean`<br />
За замовчуванням: `false`

### sessionNamePrependTopLevelSuiteTitle
Тільки для Mocha. Додає заголовок верхнього рівня набору перед іменем сесії.

Тип: `Boolean`<br />
За замовчуванням: `false`

### setSessionName
Автоматично встановлює ім'я сесії.

Тип: `Boolean`<br />
За замовчуванням: `true`

### setSessionStatus
Автоматично встановлює статус сесії (пройдено/не пройдено).

Тип: `Boolean`<br />
За замовчуванням: `true`


### ignoreTestCountInName
Ігнорує кількість повторних спроб тесту в імені

Тип: `Boolean`<br />
За замовчуванням: `false`


### useScenarioName
Щоб отримати імена тестів як імена сценаріїв для тестів Cucumber, просто додайте `useScenarioName: true` у ваш `wdio.conf.js`.

## Кроки для компіляції та публікації
1. клонувати цей репозиторій git.
2. виконати "npm install"
3. виконати "npm run build"
4. Кроки для публікації: виконати "npm login"
5. виконати "npm publish --access public"

----

Для отримання додаткової інформації про WebdriverIO див. [домашню сторінку](https://webdriver.io).
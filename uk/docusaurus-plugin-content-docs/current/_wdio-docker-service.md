---
id: wdio-docker-service
title: Docker Сервіс
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service є пакетом від третьої сторони, для отримання додаткової інформації, будь ласка, перегляньте [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Цей сервіс призначений для використання з [WebdriverIO](http://webdriver.io/) і допомагає виконувати функціональні/інтеграційні тести 
проти/з використанням контейнеризованих додатків. Він використовує популярний сервіс [Docker](https://www.docker.com/) (встановлюється окремо) для запуску контейнерів.

## Навіщо його використовувати?
В ідеалі ваші тести працюватимуть у різних CI/CD пайплайнах, де часто немає "справжніх" браузерів та інших ресурсів,
від яких залежить ваш додаток. З появою Docker практично всі необхідні залежності додатків можуть бути контейнеризовані.
З цим сервісом ви можете запустити контейнер вашого додатка або [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) у вашому CI і в повній ізоляції
(припускаючи, що CI може мати Docker, встановлений як залежність). Те саме може стосуватися локальної розробки, якщо ваш додаток потребує певного рівня
ізоляції від вашої основної ОС.

## Як це працює
Сервіс запустить існуючий образ docker, і коли він буде готовий, ініціює тести WebdriverIO, які повинні запускатися проти вашого контейнеризованого додатка.

## Встановлення

Виконайте:

```bash
npm install wdio-docker-service --save-dev
```

Інструкції з встановлення WebdriverIO можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Конфігурація
За замовчуванням Google Chrome, Firefox і PhantomJS доступні, коли встановлені на хост-системі.
Щоб використовувати цей сервіс, вам потрібно додати `docker` до вашого масиву сервісів:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Опції

### dockerOptions
Різні опції, необхідні для запуску контейнера docker

Тип: `Object`

За замовчуванням: `{ 
    options: {
        rm: true
    }
}`

Приклад:

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Тег назви контейнера Docker. Може бути локальним або з Docker HUB.

Тип: `String`

Обов'язково: `true`

### dockerOptions.healthCheck
Конфігурація, яка перевіряє готовність ваших контейнерів перед початком тестів. Зазвичай це буде URL на localhost.
Якщо healthCheck не налаштований, Webdriver почне запускати тести відразу після запуску контейнера Docker, що
може бути занадто рано, враховуючи, що запуск веб-сервісу всередині контейнера Docker займає певний час.

Тип: `String|Object`

Опції для використання Object:
- *url* - url до додатка, запущеного всередині вашого контейнера
- *maxRetries* - кількість повторних спроб до невдачі перевірки здоров'я. За замовчуванням: 10
- *inspectInterval* - інтервал між кожною спробою в мс. За замовчуванням: 500
- *startDelay* - початкова затримка до початку перевірки здоров'я в мс. За замовчуванням: 0

Приклад 1 (String): `healthCheck: 'http://localhost:4444'`

Приклад 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Мапа опцій, що використовуються командою `docker run`. Для отримання додаткової інформації про команду `run` перейдіть за [посиланням](https://docs.docker.com/edge/engine/reference/commandline/run/).

Будь-яка одиночна опція буде перетворена в `-[option]` (наприклад, `d: true` -> `-d`).

Будь-яка опція з двох і більше символів буде
перетворена в `--[option]` (наприклад, `rm: true` -> `--rm`).

Для опцій, які можуть використовуватися більше одного разу
(наприклад, `-e`, `-add-host`, `--expose` тощо), будь ласка, використовуйте нотацію масиву (наприклад, `e: ["NODE_ENV=development", "FOO=bar"]`).

Тип: `Object`

Приклад:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Будь-які аргументи, які ви можете захотіти передати в контейнер. Відповідає `[ARG...]` в Docker run CLI.

Тип: `String`

### dockerOptions.command
Будь-яка команда, яку ви хочете передати в контейнер. Відповідає `[COMMAND]` в Docker run CLI.

Тип: `String`

### onDockerReady
Метод зворотного виклику, який викликається, коли додаток Docker готовий. Готовність визначається можливістю пінгувати URL `healthCheck`.

Тип: `Function`

### dockerLogs
Шлях, куди слід зберігати журнали з контейнера docker

Тип: `String`

## Тестові випадки / Рецепти
Будь ласка, відвідайте нашу [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) для отримання додаткової інформації.
---
id: wdio-docker-service
title: Docker-сервис
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service - это сторонний пакет, для получения дополнительной информации посетите [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Этот сервис предназначен для использования с [WebdriverIO](http://webdriver.io/) и помогает запускать функциональные/интеграционные тесты 
для/с использованием контейнеризированных приложений. Он использует популярный сервис [Docker](https://www.docker.com/) (устанавливается отдельно) для запуска контейнеров.

## Зачем его использовать?
В идеале ваши тесты должны запускаться в каком-либо варианте CI/CD пайплайна, где часто нет "реальных" браузеров и других ресурсов,
от которых зависит ваше приложение. С появлением Docker практически все необходимые зависимости приложения могут быть контейнеризированы.
С помощью этого сервиса вы можете запустить контейнер вашего приложения или [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) в вашем CI и в полной изоляции
(предполагается, что CI может иметь Docker, установленный как зависимость). То же самое может применяться к локальной разработке, если ваше приложение должно иметь уровень
изоляции от вашей основной ОС.

## Как это работает
Сервис запустит существующий образ docker, и когда он будет готов, инициирует тесты WebdriverIO, которые должны запускаться для вашего контейнеризированного приложения.

## Установка

Выполните:

```bash
npm install wdio-docker-service --save-dev
```

Инструкции о том, как установить WebdriverIO, можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Конфигурация
По умолчанию Google Chrome, Firefox и PhantomJS доступны при установке на хост-системе.
Чтобы использовать сервис, вам нужно добавить `docker` в массив сервисов:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Опции

### dockerOptions
Различные опции, необходимые для запуска Docker-контейнера

Тип: `Object`

По умолчанию: `{ 
    options: {
        rm: true
    }
}`

Пример:

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
Тег имени контейнера Docker. Может быть локальным или из Docker HUB.

Тип: `String`

Обязательно: `true`

### dockerOptions.healthCheck
Конфигурация, которая проверяет готовность ваших контейнеров перед запуском тестов. Обычно это URL-адрес localhost.
Если healthCheck не настроен, Webdriver начнет запускать тесты сразу после запуска контейнера Docker, что
может быть слишком рано, учитывая, что веб-сервису требуется время для запуска внутри контейнера Docker.

Тип: `String|Object`

Опции при использовании Object:
- *url* - URL-адрес приложения, запущенного внутри вашего контейнера
- *maxRetries* - количество повторных попыток до тех пор, пока проверка работоспособности не завершится неудачей. По умолчанию: 10
- *inspectInterval* - интервал между каждой попыткой в мс. По умолчанию: 500
- *startDelay* - начальная задержка перед началом проверки в мс. По умолчанию: 0

Пример 1 (String): `healthCheck: 'http://localhost:4444'`

Пример 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Карта опций, используемых командой `docker run`. Для получения дополнительной информации о команде `run` нажмите [здесь](https://docs.docker.com/edge/engine/reference/commandline/run/).

Любая однобуквенная опция будет преобразована в `-[option]` (например, `d: true` -> `-d`). 

Любая опция из двух и более символов будет
преобразована в `--[option]` (например, `rm: true` -> `--rm`). 

Для опций, которые могут использоваться несколько раз
(например, `-e`,`-add-host`, `--expose` и т.д.), используйте массив (например, `e: ["NODE_ENV=development", "FOO=bar"]`).

Тип: `Object`

Пример:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Любые аргументы, которые вы хотите передать в контейнер. Соответствует `[ARG...]` в Docker run CLI.

Тип: `String`

### dockerOptions.command
Любая команда, которую вы хотите передать в контейнер. Соответствует `[COMMAND]` в Docker run CLI.

Тип: `String`

### onDockerReady
Метод обратного вызова, который вызывается, когда приложение Docker готово. Готовность определяется возможностью пинговать URL-адрес `healthCheck`.

Тип: `Function`

### dockerLogs
Путь к месту, где должны храниться логи из Docker-контейнера

Тип: `String`

## Сценарии использования в тестировании / Рецепты
Пожалуйста, посетите нашу [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) для получения дополнительной информации.
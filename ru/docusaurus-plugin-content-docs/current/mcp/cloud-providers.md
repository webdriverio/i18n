---
id: cloud-providers
title: Облачные провайдеры
description: "Запуск браузерных и мобильных сессий WebdriverIO MCP на облачных фермах устройств, включая учётные данные, загрузку приложений, туннели и отчётность."
---

Сервер WebdriverIO MCP имеет встроенную поддержку запуска сессий автоматизации браузеров и мобильных устройств на облачных фермах устройств. Локальные драйверы, эмуляторы или симуляторы не требуются. Поддерживаются четыре провайдера:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (браузеры) и [App Automate](https://www.browserstack.com/app-automate) (мобильные приложения)
- **Sauce Labs** — облако реальных устройств и виртуальных браузеров [Sauce Labs](https://saucelabs.com)
- **TestMu (ранее LambdaTest)** — облако реальных устройств и браузеров [TestMu](https://www.lambdatest.com)
- **TestingBot** — облако реальных устройств и браузерная сетка [TestingBot](https://testingbot.com)

Все четыре провайдера используют одинаковый рабочий процесс: задайте учётные данные, при необходимости загрузите мобильное приложение, затем вызовите `start_session` с именем провайдера. Метки отчётности, настройка туннеля и жизненный цикл мобильного приложения одинаковы для всех провайдеров.

## Предварительные требования

Задайте учётные данные в виде переменных окружения перед запуском сервера MCP:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| Провайдер    | Переменная имени пользователя | Переменная ключа доступа  | Где найти                                                          |
| ------------ | ----------------------------- | ------------------------- | ------------------------------------------------------------------ |
| BrowserStack | `BROWSERSTACK_USERNAME`       | `BROWSERSTACK_ACCESS_KEY` | [Настройки аккаунта](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`              | `SAUCE_ACCESS_KEY`        | [Настройки пользователя](https://app.saucelabs.com/user-settings)  |
| TestMu       | `TESTMU_USERNAME`             | `TESTMU_ACCESS_KEY`       | [Настройки аккаунта](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`              | `TESTINGBOT_SECRET`       | [Настройки аккаунта](https://testingbot.com/membership)            |

## Автоматизация браузеров

Запустите браузерную сессию у любого облачного провайдера, указав `provider` в `start_session`:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

Все провайдеры поддерживают значения `browser`: `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Если не указать `os` / `osVersion`, провайдер использует разумные значения по умолчанию (как правило, последнюю версию Linux для браузерных сессий).

### Регионы Sauce Labs

Sauce Labs поддерживает несколько регионов центров обработки данных. Укажите параметр `region` в `start_session`:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Поддерживаемые значения: `"us-west-1"`, `"eu-central-1"` (по умолчанию), `"apac-southeast-1"`.

## Автоматизация мобильных приложений

Мобильный рабочий процесс состоит из трёх шагов, одинаковых для всех провайдеров:

### Шаг 1: Загрузите приложение

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Каждый вызов возвращает ссылку на приложение, которую вы будете использовать в `start_session`:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

При необходимости можно задать `customId` для получения стабильных ссылок между загрузками:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Для Sauce Labs добавьте `region`, соответствующий региону вашего хранилища (по умолчанию `"eu-central-1"`).

### Шаг 2: Просмотрите список доступных приложений

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Необязательные параметры для всех провайдеров:
- `sortBy`: `"app_name"` или `"uploaded_at"` (по умолчанию)
- `limit`: максимальное количество результатов (по умолчанию 20)

BrowserStack также поддерживает `organizationWide: true` для вывода всех загрузок организации. Sauce Labs принимает `region`.

### Шаг 3: Запустите сессию

Используйте ссылку на приложение из `upload_app` или `customId`:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## Локальный туннель

Все три провайдера поддерживают локальный туннель, позволяющий облачным сессиям обращаться к серверам на вашей машине (localhost, staging-окружения, внутренние сервисы).

Сервер MCP использует **единый параметр `tunnel`**, который работает одинаково для всех провайдеров:

### Автоматически управляемый туннель (рекомендуется)

Сервер MCP запускает и останавливает туннель автоматически:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Перед первой сессией с `tunnel: true` сервер MCP сам загружает и запускает бинарный файл туннеля. Если вы хотите проверить настройку вручную, прочитайте ресурс local-binary соответствующего провайдера:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

Туннель автоматически останавливается при закрытии сессии.

### Внешний туннель

Если туннель уже запущен в отдельном процессе:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` сообщает серверу MCP, что туннель уже запущен; сервер устанавливает соответствующие флаги capabilities, но не запускает и не останавливает никаких процессов. Задайте `tunnelName`, соответствующий запущенному туннелю.

### Ручная настройка туннеля

Если вы предпочитаете запускать туннель вручную, прочитайте инструкции по настройке из ресурса MCP для вашего провайдера и платформы. Например:

```text
// Чтение инструкций по настройке (из вашего AI-клиента)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Каждый ресурс возвращает URL для загрузки, команды для конкретной платформы и инструкции по запуску в режиме демона.

## Отчётность

Помечайте сессии метками проекта, сборки и сессии для панели управления провайдера. Это работает одинаково для всех трёх провайдеров:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

Сессии отображаются в панели управления провайдера под указанными проектом и сборкой:
- BrowserStack: [Панель Automate](https://automate.browserstack.com)
- Sauce Labs: [Результаты тестов](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Панель автоматизации](https://automation.lambdatest.com)
- TestingBot: [Результаты тестов](https://testingbot.com/members)

## Особенности провайдеров

### BrowserStack

- Браузерные сессии: `os` принимает `"Windows"` или `"OS X"`. Версии Windows: `"10"`, `"11"`. Версии macOS: `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- API управления приложениями: `organizationWide: true` в `list_apps` выводит все загрузки команды.

### Sauce Labs

- **Регионы имеют значение.** Регион по умолчанию — `eu-central-1`. Если ваш аккаунт находится в другом регионе, укажите соответствующий `region` в `start_session`, `list_apps` и `upload_app`.
- Мобильные сессии поддерживают `automationName` (`"XCUITest"` или `"UiAutomator2"`); значения по умолчанию подобраны разумно для каждой платформы.
- Туннель Sauce Connect управляется автоматически через npm-пакет `saucelabs`. Для `tunnel: true` внешний бинарный файл не требуется.

### TestMu

- Имя провайдера — `"testmu"` в `start_session`, `list_apps` и `upload_app`.
- Браузерные сессии подключаются к `hub.lambdatest.com`; мобильные сессии — к `mobile-hub.lambdatest.com`; это обрабатывается автоматически.
- Туннель управляется автоматически через npm-пакет `@lambdatest/node-tunnel`.
- Управление мобильными приложениями получает приложения Android и iOS отдельными вызовами API, а затем объединяет результаты.

### TestingBot

- Имя провайдера — `"testingbot"` в `start_session`, `list_apps` и `upload_app`.
- Браузерные и мобильные сессии подключаются к `hub.testingbot.com` через порт 443 (обрабатывается автоматически).
- Для учётных данных используются `TESTINGBOT_KEY` и `TESTINGBOT_SECRET` (а не пара имя пользователя/ключ доступа, как у других провайдеров).
- Туннель управляется автоматически через npm-пакет `testingbot-tunnel-launcher` (требуется Java 11+).
- Параметр региона отсутствует — хаб TestingBot глобальный.
- Поддерживается режим мобильного браузера/эмулятора: укажите `platform: "android"` или `"ios"` с именем `browser` (например, `"chrome"`) вместо `app`.
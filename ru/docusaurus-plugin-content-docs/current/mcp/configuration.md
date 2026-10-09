---
id: configuration
title: Конфигурация
description: "Настройка MCP-сервера WebdriverIO, включая параметры сессии, браузера, мобильных устройств, облачных провайдеров, обнаружения элементов и Appium."
---

На этой странице описаны все параметры конфигурации MCP-сервера WebdriverIO.

## Конфигурация MCP-сервера

MCP-сервер настраивается с помощью конфигурационных файлов или команд.

### Базовая конфигурация

Отредактируйте файл конфигурации MCP (например, `./.mcp.json`) и добавьте следующее:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

## Параметры сессии

Все параметры сессии передаются в инструмент `start_session`. Для браузерных и мобильных сессий используется единый инструмент; тип сессии определяется параметром `platform`.

### Общие параметры

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

Платформа для автоматизации.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

Где выполняется сессия. Для удалённых устройств укажите имя облачного провайдера; для каждого из них требуются собственные переменные окружения. Подробнее см. в разделе [Облачные провайдеры](./cloud-providers).

</Option>
## Параметры браузерной сессии

Параметры для сессий с `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

Запускаемый браузер.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

Версия браузера. Только для облачных провайдеров (по умолчанию: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

Операционная система для браузерных сессий облачных провайдеров. Примеры: `os: "Windows"`, `osVersion: "11"` или `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

Запуск браузера в headless-режиме (без видимого окна). Установите `false`, чтобы видеть браузер.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **Диапазон:** `400` - `3840`

Начальная ширина окна браузера в пикселях.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **Диапазон:** `400` - `2160`

Начальная высота окна браузера в пикселях.

</Option>
### `navigationUrl`

<Option type="string" required="No">

URL, на который нужно перейти сразу после запуска браузера. Эффективнее, чем отдельный вызов `start_session`, а затем `navigate`.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

Подключиться к существующему экземпляру Chrome вместо запуска нового. Используйте после `launch_chrome` для подключения через CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Конфигурация подключения к удалённой отладке Chrome. Применяется только при `attach: true`.

</Option>
## Параметры мобильной сессии

Параметры для сессий с `platform: "ios"` или `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

Имя устройства, симулятора или эмулятора.

**Примеры:**
-   Симулятор iOS: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Эмулятор Android: `"Pixel 7"`, `"Nexus 5X"`
-   Реальное устройство: имя устройства, отображаемое в вашей системе

</Option>
### `platformVersion`

<Option type="string" required="No">

Версия ОС устройства/симулятора/эмулятора (например, `"18.0"` для iOS, `"14"` для Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

Драйвер автоматизации. По умолчанию `XCUITest` для iOS и `UiAutomator2` для Android.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

Уникальный идентификатор устройства (Unique Device Identifier). Обязателен для реальных устройств iOS (40-символьный идентификатор).

**Как найти UDID:**
-   **iOS:** Подключите устройство, откройте Finder, нажмите на устройство → Серийный номер (нажмите, чтобы отобразить UDID)
-   **Android:** Выполните `adb devices` в терминале

</Option>
### `appPath`

<Option type="string" required="No">

Путь к файлу приложения для установки и запуска.

**Поддерживаемые форматы:**
-   Симулятор iOS: директория `.app`
-   Реальное устройство iOS: файл `.ipa`
-   Android: файл `.apk`

Необходимо указать либо `appPath`, либо `noReset: true` для подключения к уже запущенному приложению.

</Option>
### `app`

<Option type="string" required="No">

URL приложения у облачного провайдера (`bs://...` для BrowserStack, `storage:filename=` для Sauce Labs, `lt://...` для TestMu, app_url для TestingBot) или `customId`. Используется вместо `appPath` для облачных мобильных сессий.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

Activity, появления которой нужно дождаться при запуске приложения. Если не указано, используется основная/стартовая activity приложения.

**Пример:** `"com.example.app.MainActivity"`

</Option>
### Параметры состояния сессии

#### `noReset`

<Option type="boolean" required="No">

Сохранять состояние приложения между сессиями. При значении `true`:
-   Данные приложения сохраняются (состояние входа, настройки и т. д.)
-   Сессия будет **отсоединена** вместо закрытия (приложение продолжает работать)
-   Можно использовать без `appPath` для подключения к уже запущенному приложению

</Option>
#### `fullReset`

<Option type="boolean" required="No">

Полностью сбросить приложение перед сессией:
-   iOS: удаляет и заново устанавливает приложение
-   Android: очищает данные и кеш приложения

Установите `fullReset: false` вместе с `noReset: true`, чтобы полностью сохранить состояние приложения.

</Option>
### Тайм-аут сессии

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

Сколько времени (в секундах) Appium будет ждать новую команду, прежде чем завершить сессию. Увеличьте значение для более длительных сессий отладки.

</Option>
### Автоматическая обработка

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

Автоматически предоставлять разрешения приложению при установке/запуске (камера, микрофон, геолокация и т. д.).

:::note Только Android
Этот параметр в основном влияет на Android. Разрешения в iOS должны обрабатываться иначе из-за системных ограничений.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

Автоматически принимать системные оповещения (диалоги) во время автоматизации («Разрешить уведомления?» и т. д.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

Отклонять системные оповещения вместо их принятия. При значении `true` имеет приоритет над `autoAcceptAlerts`.

</Option>
### Подключение к серверу Appium

Переопределите подключение к серверу Appium для отдельной сессии с помощью `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Подключение к серверу Appium. По умолчанию `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Параметры облачных провайдеров

### Учётные данные

Для каждого облачного провайдера требуются собственные переменные окружения:

| Провайдер    | Переменная имени пользователя | Переменная ключа доступа  |
| ------------ | ----------------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME`       | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`              | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`             | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`              | `TESTINGBOT_SECRET`       |

Установите их перед запуском MCP-сервера.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Регион дата-центра Sauce Labs. Игнорируется для других провайдеров.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

Включить маршрутизацию через локальный туннель для сессий облачных провайдеров (доступ к localhost, staging-окружениям, внутренним сервисам).

-   `true` — автоматически запускать туннель перед сессией и останавливать его при закрытии
-   `"external"` — туннель уже запущен извне; устанавливаются только соответствующие провайдеру флаги

Перед использованием `true` ознакомьтесь с ресурсом local-binary провайдера (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` или `wdio://testingbot/local-binary`), где приведены инструкции по настройке для вашей ОС и архитектуры.

</Option>
### `tunnelName`

<Option type="string" required="No">

Имя-идентификатор туннеля. Обязательно при `tunnel: "external"` для сопоставления с запущенным туннелем. При `tunnel: true` уникальное имя генерируется автоматически, если оно не указано.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

Метки сессии облачного провайдера, отображаемые на его панели управления. Работает одинаково в BrowserStack, Sauce Labs, TestMu и TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

Включить запись трассировки. Создаёт совместимый с Playwright zip-файл `.trace`, сохраняемый в `.trace/` при вызове `close_session`. Просматривать трассировки можно на [player.vibium.dev](https://player.vibium.dev).

</Option>
## Параметры обнаружения элементов

Параметры для инструмента `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

Возвращать только элементы, видимые в текущей области просмотра. Установите `true`, чтобы сократить количество результатов на длинных страницах.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

Включать в результаты контейнерные элементы/элементы разметки:

**Контейнеры Android:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**Контейнеры iOS:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

Включать в ответ координаты ограничивающего прямоугольника элемента (x, y, width, height).

</Option>
### Пагинация

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Максимальное количество возвращаемых элементов.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

Количество элементов, пропускаемых перед возвратом результатов.

**Пример:** получить элементы 21–40:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Параметры дерева доступности

Параметры для инструмента `get_accessibility_tree` (только для браузера).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Максимальное количество возвращаемых узлов.

</Option>
### `offset`

<Option type="number" default="0" required="No">

Количество узлов, пропускаемых при пагинации.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

Фильтрация по определённым ролям доступности.

**Распространённые роли:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Пример:** получить только кнопки и ссылки:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Скриншот

Инструмент `get_screenshot` не принимает параметров. Скриншоты обрабатываются автоматически:

| Оптимизация              | Значение | Описание                                                    |
| ------------------------ | -------- | ----------------------------------------------------------- |
| Макс. размер стороны     | 2000px   | Изображения больше 2000px уменьшаются                       |
| Макс. размер файла       | 1MB      | Изображения сжимаются, чтобы не превышать 1MB               |
| Формат                   | PNG/JPEG | PNG с максимальным сжатием; JPEG, если требуется по размеру |

## Поведение сессии

### Типы сессий

| Тип       | Описание                  | Автоотсоединение                          |
| --------- | ------------------------- | ----------------------------------------- |
| `browser` | Браузерная сессия         | Нет                                       |
| `ios`     | Сессия iOS-приложения     | Да (если `noReset: true` или нет `appPath`) |
| `android` | Сессия Android-приложения | Да (если `noReset: true` или нет `appPath`) |

### Модель одной сессии

MCP-сервер работает по **модели одной сессии**:

-   Одновременно может быть активна только одна сессия браузера ИЛИ приложения
-   Запуск новой сессии закроет/отсоединит текущую сессию
-   Состояние сессии сохраняется глобально между вызовами инструментов

### Отсоединение и закрытие

| Действие              | `detach: false` (закрытие)         | `detach: true` (отсоединение)                       |
| --------------------- | ---------------------------------- | --------------------------------------------------- |
| Браузер               | Полностью закрывает браузер        | Браузер продолжает работать, WebDriver отключается  |
| Мобильное приложение  | Завершает приложение               | Приложение продолжает работать в текущем состоянии  |
| Сценарий использования | Чистое состояние для следующей сессии | Сохранение состояния, ручная проверка            |

## Вопросы производительности

### Автоматизация браузера

-   **Headless-режим** быстрее, но не отрисовывает визуальные элементы
-   **Меньший размер окна** сокращает время создания скриншотов
-   **Обнаружение элементов** оптимизировано за счёт однократного выполнения скрипта
-   **Оптимизация скриншотов** удерживает размер изображений в пределах 1MB для эффективной обработки

### Мобильная автоматизация

-   **Разбор XML-исходника страницы** требует всего 2 HTTP-запроса (против 600+ при традиционных запросах элементов)
-   **Селекторы Accessibility ID** самые быстрые и надёжные
-   **Селекторы XPath** самые медленные; используйте их только в крайнем случае
-   **Пагинация** (`limit` и `offset`) снижает расход токенов на экранах с большим количеством элементов

### Советы по расходу токенов

| Настройка                  | Эффект                                                       |
| -------------------------- | ------------------------------------------------------------ |
| `inViewportOnly: true`     | Отфильтровывает элементы за пределами экрана, уменьшая ответ |
| `includeContainers: false` | Исключает элементы разметки (ViewGroup и т. д.)              |
| `includeBounds: false`     | Не включает данные x/y/width/height                          |
| `limit` с пагинацией       | Обработка элементов порциями, а не всех сразу                |

## Настройка сервера Appium

Перед использованием мобильной автоматизации убедитесь, что Appium правильно настроен.

### Базовая настройка

```sh
# Установить Appium глобально
npm install -g appium

# Установить драйверы
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Запустить сервер
appium
```

### Пользовательская конфигурация сервера

```sh
# Запуск с пользовательским хостом и портом
appium --address 0.0.0.0 --port 4724

# Запуск с логированием
appium --log-level debug

# Запуск с определённым базовым путём
appium --base-path /wd/hub
```

### Проверка установки

```sh
# Проверить установленные драйверы
appium driver list --installed

# Проверить версию Appium
appium --version

# Проверить подключение
curl http://localhost:4723/status
```

## Устранение неполадок конфигурации

### MCP-сервер не запускается

1. Убедитесь, что npm/npx установлен: `npm --version`
2. Попробуйте запустить вручную: `npx @wdio/mcp`
3. Проверьте журналы вашей среды (harness) на наличие ошибок

### Проблемы с подключением к Appium

1. Убедитесь, что Appium запущен: `curl http://localhost:4723/status`
2. Проверьте, что `appiumConfig` в `start_session` соответствует настройкам сервера Appium
3. Убедитесь, что брандмауэр разрешает подключения к порту Appium

### Сессия не запускается

1. **Браузер:** убедитесь, что целевой браузер установлен
2. **iOS:** убедитесь, что Xcode и симуляторы доступны
3. **Android:** проверьте `ANDROID_HOME` и что эмулятор запущен
4. Изучите журналы сервера Appium для получения подробных сообщений об ошибках

### Тайм-ауты сессии

Если сессии завершаются по тайм-ауту во время отладки:
1. Увеличьте `newCommandTimeout` при запуске сессии
2. Используйте `noReset: true` для сохранения состояния между сессиями
3. Используйте `detach: true` при закрытии, чтобы приложение продолжало работать
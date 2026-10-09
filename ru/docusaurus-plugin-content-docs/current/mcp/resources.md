---
id: resources
title: Ресурсы
description: "Чтение текущего состояния сессии, истории сессий и сведений о настройке облачных провайдеров через доступные только для чтения ресурсы wdio:// MCP-сервера WebdriverIO."
---

MCP-ресурсы предоставляют доступ только для чтения к текущему состоянию сессии. В отличие от инструментов, ресурсы запрашиваются AI-моделью по её усмотрению; они не выполняют никаких действий. Все ресурсы используют URI-схему `wdio://`.

## Когда использовать ресурсы, а когда инструменты

- **Ресурсы** — фоновое состояние, которое меняется по мере взаимодействия: текущие элементы, скриншот, cookies, дерево доступности. Читайте их перед выполнением действий, чтобы понять, что находится на экране.
- **Инструменты** — действия, изменяющие состояние: клик, навигация, установка значения.

Для поиска элементов предпочтительнее использовать `wdio://session/current/elements`, а не `get_screenshot`: он возвращает готовые к использованию селекторы и расходует значительно меньше токенов.

## История сессий

### `wdio://sessions`

Индекс всех сессий браузера и приложений с метаданными и количеством шагов.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

Журнал шагов в формате JSON для текущей активной сессии. Содержит все записанные шаги автоматизации с названиями инструментов, параметрами и временными метками.

---

### `wdio://session/current/code`

Сгенерированный код WebdriverIO на JavaScript для текущей активной сессии. Генерируется автоматически на основе записанных шагов. Вставьте его в тестовый файл WebdriverIO, чтобы воспроизвести сессию.

---

### `wdio://session/{sessionId}/steps`

Журнал шагов для конкретной сессии по ID. Шаблон URI — замените `{sessionId}` на ID из `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

Сгенерированный код WebdriverIO на JavaScript для конкретной сессии по ID. Шаблон URI — замените `{sessionId}` на ID из `wdio://sessions`.

## Текущее состояние страницы (текущая сессия)

### `wdio://session/current/elements`

Интерактивные элементы на текущей странице. Возвращает готовые к использованию селекторы, текст элементов и информацию об их видимости.

**Это основной ресурс для понимания того, что находится на экране.** Читайте его перед кликом или вводом текста. Это намного быстрее и дешевле, чем скриншот.

Для расширенной фильтрации (только видимая область, контейнеры, ограничивающие рамки, пагинация) используйте вместо этого инструмент `get_elements`.

---

### `wdio://session/current/accessibility`

Дерево доступности для текущей страницы. По умолчанию возвращает все узлы с ролью, именем, селектором и атрибутами состояния. Только для браузера. На мобильных устройствах используйте `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

Для отфильтрованных результатов (по роли, с пагинацией) используйте инструмент `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Скриншот текущей страницы или экрана в виде изображения в кодировке base64. Автоматически масштабируется (максимум 2000px) и сжимается (максимум 1 МБ).

Используйте для визуальной проверки или отладки вёрстки. Для поиска элементов предпочтительнее `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Все cookies текущей сессии браузера.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

Все открытые вкладки браузера в текущей сессии. Только для браузера.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

Используйте перед `switch_tab`, чтобы найти дескриптор или индекс нужной вкладки.

---

### `wdio://session/current/contexts`

Доступные контексты автоматизации (NATIVE_APP, WEBVIEW). Только для мобильных устройств.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Текущий активный контекст автоматизации. Только для мобильных устройств.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

Состояние жизненного цикла приложения для указанного bundle ID. Только для мобильных устройств. Шаблон URI — замените `{bundleId}` на bundle ID для iOS или имя пакета для Android.

Возвращает одно из значений:
- `0` — не установлено
- `1` — не запущено
- `2` — работает в фоне (приостановлено)
- `3` — работает в фоне
- `4` — работает на переднем плане

Для получения именованного результата используйте вместо этого инструмент `get_app_state`.

---

### `wdio://session/current/geolocation`

Текущее переопределение геолокации устройства, установленное с помощью `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Логи текущей сессии. Возвращает сообщения консоли браузера и исключения JavaScript (сессии Chromium), вывод logcat (Android) или crash/syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

Необработанные capabilities, возвращённые сервером WebDriver или Appium для текущей сессии. Используйте для отладки; показывает фактические значения, принятые драйвером, включая значения по умолчанию, применённые облачным провайдером или Appium.

## Облачные провайдеры

### `wdio://browserstack/local-binary`

URL для загрузки под конкретную платформу и инструкции по настройке демона для бинарного файла BrowserStack Local. Прочитайте его перед использованием `tunnel: true` или `tunnel: "external"` с `provider: "browserstack"`; он содержит точные команды для вашей ОС и архитектуры.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

URL для загрузки под конкретную платформу и инструкции по настройке демона для Sauce Connect Proxy. Прочитайте его перед использованием `tunnel: "external"` с `provider: "saucelabs"`; при `tunnel: true` SDK управляет Sauce Connect автоматически.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

URL для загрузки под конкретную платформу и инструкции по настройке демона для TestMu Tunnel. Нужен только для `tunnel: "external"` с `provider: "testmu"` — при `tunnel: true` SDK управляет туннелем автоматически через `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

URL для загрузки и инструкции по настройке демона для TestingBot Tunnel. Туннель представляет собой кроссплатформенный Java JAR (требуется Java 11+). Нужен только для `tunnel: "external"` с `provider: "testingbot"` — при `tunnel: true` SDK управляет туннелем автоматически через `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```
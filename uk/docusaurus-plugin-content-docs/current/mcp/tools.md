---
id: tools
title: Інструменти
---

Наступні інструменти доступні через сервер WebdriverIO MCP. Ці інструменти дозволяють ШІ-асистентам автоматизувати браузери та мобільні додатки.

## Session Management

### `start_browser`

Запускає сесію браузера Chrome.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `headless` | boolean | No | `false` | Запустити Chrome у режимі без інтерфейсу |
| `windowWidth` | number | No | `1920` | Ширина вікна браузера (400-3840) |
| `windowHeight` | number | No | `1080` | Висота вікна браузера (400-2160) |
| `navigationUrl` | string | No | - | URL для переходу після запуску браузера |

#### Example

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Support

- Desktop Browsers

---

### `start_app_session`

Запускає сесію мобільного додатку на iOS або Android через Appium.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `platform` | string | Yes | - | Платформа для автоматизації: `iOS` або `Android` |
| `deviceName` | string | Yes | - | Назва пристрою або симулятора/емулятора |
| `appPath` | string | No* | - | Шлях до файлу додатку (.app, .ipa, або .apk) |
| `platformVersion` | string | No | - | Версія ОС (наприклад, `17.0`, `14`) |
| `automationName` | string | No | Auto | `XCUITest` (iOS), `UiAutomator2` або `Espresso` (Android) |
| `udid` | string | No | - | Унікальний ідентифікатор пристрою (обов'язковий для реальних пристроїв iOS) |
| `noReset` | boolean | No | `false` | Зберігати стан додатку між сесіями |
| `fullReset` | boolean | No | `true` | Видаляти і перевстановлювати додаток перед сесією |
| `autoGrantPermissions` | boolean | No | `true` | Автоматично надавати дозволи додатку |
| `autoAcceptAlerts` | boolean | No | `true` | Автоматично приймати системні сповіщення |
| `autoDismissAlerts` | boolean | No | `false` | Відхиляти (замість приймати) сповіщення |
| `appWaitActivity` | string | No | - | Активність, яку очікувати при запуску (тільки Android) |
| `newCommandTimeout` | number | No | `60` | Секунди до закінчення сесії через неактивність |
| `appiumHost` | string | No | `127.0.0.1` | Ім'я хосту Appium сервера |
| `appiumPort` | number | No | `4723` | Порт Appium сервера |
| `appiumPath` | string | No | `/` | Шлях Appium сервера |

*Потрібно вказати або `appPath`, або `noReset: true` для підключення до вже запущеного додатку.

#### Example

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Support

- iOS Simulators
- iOS Real Devices
- Android Emulators
- Android Real Devices

---

### `close_session`

Закриває поточну сесію браузера або додатку.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `detach` | boolean | No | `false` | Відключитися від сесії замість закриття (залишає браузер/додаток запущеним) |

#### Notes

Сесії з `noReset: true` або без `appPath` автоматично відключаються при закритті для збереження стану.

#### Support

- Desktop Browsers
- Mobile Apps

---

## Navigation

### `navigate`

Переходить за URL-адресою.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `url` | string | Yes | URL-адреса для переходу |

#### Example

```
Navigate to https://webdriver.io
```

#### Support

- Desktop Browsers

---

## Element Interaction

### `click_element`

Клікає на елемент, визначений селектором.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Yes | - | CSS селектор, XPath, або мобільний селектор |
| `scrollToView` | boolean | No | `true` | Прокрутити до елемента перед кліком |
| `timeout` | number | No | `3000` | Максимальний час очікування елемента (мс) |

#### Notes

- Підтримує текстові селектори WebdriverIO: `button=Exact text` або `a*=Contains text`
- Використовує центральне вирівнювання для позиціонування прокрутки

#### Example

```
Click the element with selector "#submit-button"
```

#### Support

- Desktop Browsers
- Mobile Native Apps

---

### `set_value`

Вводить текст у поле введення.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Yes | - | Селектор для елемента введення |
| `value` | string | Yes | - | Текст для введення |
| `scrollToView` | boolean | No | `true` | Прокрутити до елемента перед введенням |
| `timeout` | number | No | `3000` | Максимальний час очікування елемента (мс) |

#### Notes

Очищає існуюче значення перед введенням нового тексту.

#### Example

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Support

- Desktop Browsers
- Mobile Native Apps

---

## Page Analysis

### `get_visible_elements`

Отримує видимі та інтерактивні елементи на поточній сторінці або екрані. Це основний інструмент для виявлення елементів, доступних для взаємодії.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | No | `interactable` | Тип елементів: `interactable` (кнопки/посилання/поля), `visual` (зображення/SVG), або `all` |
| `inViewportOnly` | boolean | No | `true` | Повертати лише елементи, видимі у вікні перегляду |
| `includeContainers` | boolean | No | `false` | Включати контейнери макету (ViewGroup, ScrollView, тощо) |
| `includeBounds` | boolean | No | `false` | Включати координати елементів (x, y, width, height) |
| `limit` | number | No | `0` | Максимальна кількість елементів для повернення (0 = без обмежень) |
| `offset` | number | No | `0` | Кількість елементів для пропуску (для пагінації) |

#### Returns

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Веб-елементи включають:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Мобільні елементи включають:** Кілька стратегій локаторів (accessibility ID, resource ID, XPath, UiAutomator/predicates), тип елемента, текст і, за бажанням, межі

#### Notes

- **Веб**: Використовує оптимізований браузерний скрипт для швидкого виявлення елементів
- **Мобільні**: Використовує ефективний аналіз XML-джерела сторінки (2 HTTP-запити замість 600+ для запитів елементів)
- Використовуйте пагінацію (`limit` та `offset`) для великих сторінок, щоб зменшити використання токенів

#### Example

```
Get all visible elements on the page with their coordinates
```

#### Support

- Desktop Browsers
- Mobile Apps

---

### `get_accessibility`

Отримує дерево доступності поточної сторінки із семантичною інформацією про ролі, імена та стани.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `limit` | number | No | `100` | Максимальна кількість вузлів для повернення (0 = без обмежень) |
| `offset` | number | No | `0` | Кількість вузлів для пропуску (для пагінації) |
| `roles` | string[] | No | All | Фільтрувати за певними ролями (наприклад, `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | No | `true` | Повертати лише вузли з іменем/міткою |

#### Returns

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### Notes

- Тільки для браузера. Для мобільних додатків використовуйте `get_visible_elements`
- Корисно, коли `get_visible_elements` не повертає очікувані елементи
- `namedOnly: true` фільтрує анонімні контейнери та зменшує шум

#### Support

- Desktop Browsers

---

## Screenshots

### `take_screenshot`

Робить знімок екрана поточного вікна перегляду.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `outputPath` | string | No | Шлях для збереження файлу знімка. Якщо опущено, повертає дані base64 |

#### Returns

Закодовані в base64 дані зображення (PNG або JPEG) з інформацією про розмір.

#### Notes

Знімки екрану автоматично оптимізуються:
- Максимальний розмір: 2000px (зменшується, якщо більше)
- Максимальний розмір файлу: 1MB
- Формат: PNG з максимальним стисненням або JPEG, якщо потрібно для відповідності обмеженню розміру

#### Support

- Desktop Browsers
- Mobile Apps

---

## Scrolling

### `scroll`

Прокручує сторінку вгору або вниз на вказану кількість пікселів.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Yes | - | Напрямок прокрутки: `up` або `down` |
| `pixels` | number | No | `500` | Кількість пікселів для прокрутки |

#### Notes

Тільки для браузера. Для мобільної прокрутки використовуйте інструмент `swipe`.

#### Support

- Desktop Browsers

---

## Cookie Management

### `get_cookies`

Отримує куки з поточної сесії.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `name` | string | No | Конкретна назва куки для отримання (опустіть для всіх кук) |

#### Returns

Об'єкти кук з властивостями name, value, domain, path, expiry, secure та httpOnly.

#### Support

- Desktop Browsers

---

### `set_cookie`

Встановлює куку в поточній сесії.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `name` | string | Yes | - | Назва куки |
| `value` | string | Yes | - | Значення куки |
| `domain` | string | No | Current | Домен куки |
| `path` | string | No | `/` | Шлях куки |
| `expiry` | number | No | - | Закінчення терміну дії як Unix timestamp (секунди) |
| `secure` | boolean | No | - | Прапорець secure |
| `httpOnly` | boolean | No | - | Прапорець httpOnly |
| `sameSite` | string | No | - | Атрибут SameSite: `strict`, `lax`, або `none` |

#### Support

- Desktop Browsers

---

### `delete_cookies`

Видаляє куки з поточної сесії.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `name` | string | No | Конкретна назва куки для видалення (опустіть, щоб видалити всі) |

#### Support

- Desktop Browsers

---

## Touch Gestures (Mobile)

### `tap_element`

Натискає на елемент або координати екрану.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `selector` | string | No* | Селектор елемента для натискання |
| `x` | number | No* | X-координата для натискання |
| `y` | number | No* | Y-координата для натискання |

*Потрібно вказати або `selector`, або обидві координати `x` та `y`.

#### Support

- Mobile Apps

---

### `swipe`

Виконує жест свайпу у вказаному напрямку.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Yes | - | Напрямок свайпу: `up`, `down`, `left`, `right` |
| `duration` | number | No | `500` | Тривалість свайпу в мілісекундах (100-5000) |
| `percent` | number | No | 0.5/0.95 | Відсоток екрану для свайпу (0-1) |

#### Notes

- Типовий відсоток: 0.5 для вертикальних свайпів, 0.95 для горизонтальних свайпів
- Напрямок вказує на рух контенту: "swipe up" прокручує контент вгору

#### Example

```
Swipe up to scroll down the screen
```

#### Support

- Mobile Apps

---

### `drag_and_drop`

Перетягує елемент до іншого елемента або координат.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | Yes | Селектор вихідного елемента для перетягування |
| `targetSelector` | string | No* | Селектор цільового елемента для скидання |
| `x` | number | No* | Цільове зміщення X (якщо немає targetSelector) |
| `y` | number | No* | Цільове зміщення Y (якщо немає targetSelector) |
| `duration` | number | No | Default | Тривалість перетягування в мілісекундах (100-5000) |

*Потрібно вказати або `targetSelector`, або обидві координати `x` та `y`.

#### Support

- Mobile Apps

---

## App Lifecycle (Mobile)

### `get_app_state`

Отримує поточний стан додатку.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `bundleId` | string | Yes | Ідентифікатор додатку (bundle ID для iOS, package name для Android) |

#### Returns

Стан додатку: `not installed`, `not running`, `running in background (suspended)`, `running in background` або `running in foreground`.

#### Support

- Mobile Apps

---

## Context Switching (Hybrid Apps)

### `get_contexts`

Перераховує всі доступні контексти (нативні та веб-представлення).

#### Parameters

None

#### Returns

Масив імен контекстів (наприклад, `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Support

- Mobile Hybrid Apps

---

### `get_current_context`

Отримує поточний активний контекст.

#### Parameters

None

#### Returns

Назва поточного контексту (наприклад, `NATIVE_APP` або `WEBVIEW_*`).

#### Support

- Mobile Hybrid Apps

---

### `switch_context`

Перемикається між нативним контекстом та веб-представленнями.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `context` | string | Yes | Назва контексту або індекс (починаючи з 1) з `get_contexts` |

#### Example

```
Switch to the WEBVIEW_com.example.app context
```

#### Support

- Mobile Hybrid Apps

---

## Device Control (Mobile)

### `rotate_device`

Обертає пристрій до певної орієнтації.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `orientation` | string | Yes | `PORTRAIT` або `LANDSCAPE` |

#### Support

- Mobile Apps

---

### `hide_keyboard`

Приховує екранну клавіатуру.

#### Parameters

None

#### Support

- Mobile Apps

---

### `get_geolocation`

Отримує поточні GPS-координати.

#### Parameters

None

#### Returns

Об'єкт з `latitude`, `longitude` та `altitude`.

#### Support

- Mobile Apps

---

### `set_geolocation`

Встановлює GPS-координати пристрою.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `latitude` | number | Yes | Координата широти (-90 до 90) |
| `longitude` | number | Yes | Координата довготи (-180 до 180) |
| `altitude` | number | No | Висота в метрах |

#### Example

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Support

- Mobile Apps

---

## Script Execution

### `execute_script`

Виконує JavaScript у браузері або мобільні команди через Appium.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `script` | string | Yes | JavaScript-код (браузер) або мобільна команда (наприклад, `mobile: pressKey`) |
| `args` | array | No | Аргументи для скрипта |

#### Browser Examples

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Mobile (Appium) Examples

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### Common Android Key Codes

| Key | Code |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### More Mobile Commands

For a complete list of available Appium mobile commands, see:
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Support

- Desktop Browsers
- Mobile Apps (via Appium mobile commands)
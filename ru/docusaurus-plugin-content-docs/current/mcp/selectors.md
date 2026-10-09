---
id: selectors
title: Селекторы
description: "Выбор селекторов для поиска элементов на веб-страницах и в мобильных приложениях при автоматизации с помощью MCP-сервера WebdriverIO."
---

MCP-сервер WebdriverIO поддерживает несколько стратегий селекторов для поиска элементов на веб-страницах и в мобильных приложениях.

:::info

Полную документацию по селекторам, включая все стратегии селекторов WebdriverIO, см. в основном руководстве [Селекторы](/docs/selectors). На этой странице рассматриваются селекторы, которые чаще всего используются с MCP-сервером.

:::

## Веб-селекторы

Для автоматизации браузера MCP-сервер поддерживает все стандартные селекторы WebdriverIO. Наиболее часто используемые:

| Селектор | Пример                         | Описание                              |
| -------- | ------------------------------ | ------------------------------------- |
| CSS      | `#login-button`, `.submit-btn` | Стандартные CSS-селекторы             |
| XPath    | `//button[@id='submit']`       | Выражения XPath                       |
| Text     | `button=Submit`, `a*=Click`    | Текстовые селекторы WebdriverIO       |
| ARIA     | `aria/Submit Button`           | Селекторы по доступному имени         |
| Test ID  | `[data-testid="submit"]`       | Рекомендуются для тестирования        |

Подробные примеры и лучшие практики см. в документации [Селекторы](/docs/selectors).

## Мобильные селекторы

Мобильные селекторы работают на платформах iOS и Android через Appium.

### Accessibility ID (рекомендуется)

Accessibility ID — это **самый надёжный кроссплатформенный селектор**. Он работает как на iOS, так и на Android и остаётся стабильным при обновлениях приложения.

```text
# Синтаксис
~accessibilityId

# Примеры
~loginButton
~submitForm
~usernameField
```

:::tip Лучшая практика
Всегда отдавайте предпочтение accessibility ID, если они доступны. Они обеспечивают:
- Кроссплатформенную совместимость (iOS + Android)
- Стабильность при изменениях UI
- Лучшую поддерживаемость тестов
- Улучшенную доступность вашего приложения
:::

### Селекторы Android

#### UiAutomator

Селекторы UiAutomator — мощные и быстрые для Android.

```text
# По тексту
android=new UiSelector().text("Login")

# По частичному тексту
android=new UiSelector().textContains("Log")

# По Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# По имени класса
android=new UiSelector().className("android.widget.Button")

# По описанию (Accessibility)
android=new UiSelector().description("Login button")

# Комбинированные условия
android=new UiSelector().className("android.widget.Button").text("Login")

# Прокручиваемый контейнер
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource ID обеспечивают стабильную идентификацию элементов на Android.

```text
# Полный Resource ID
id=com.example.app:id/login_button

# Частичный ID (пакет приложения определяется автоматически)
id=login_button
```

#### XPath (Android)

XPath работает на Android, но медленнее, чем UiAutomator.

```text
# По классу и тексту
//android.widget.Button[@text='Login']

# По Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# По Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Иерархический
//android.widget.LinearLayout/android.widget.Button[1]
```

### Селекторы iOS

#### Predicate String

iOS Predicate String — быстрый и мощный инструмент для автоматизации iOS.

```text
# По метке (label)
-ios predicate string:label == "Login"

# По частичной метке
-ios predicate string:label CONTAINS "Log"

# По имени
-ios predicate string:name == "loginButton"

# По типу
-ios predicate string:type == "XCUIElementTypeButton"

# По значению
-ios predicate string:value == "ON"

# Комбинированные условия
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Видимость
-ios predicate string:label == "Login" AND visible == 1

# Без учёта регистра
-ios predicate string:label ==[c] "login"
```

**Операторы предикатов:**

| Оператор     | Описание                       |
| ------------ | ------------------------------ |
| `==`         | Равно                          |
| `!=`         | Не равно                       |
| `CONTAINS`   | Содержит подстроку             |
| `BEGINSWITH` | Начинается с                   |
| `ENDSWITH`   | Заканчивается на               |
| `LIKE`       | Совпадение по шаблону          |
| `MATCHES`    | Совпадение по регулярному выражению |
| `AND`        | Логическое И                   |
| `OR`         | Логическое ИЛИ                 |

#### Class Chain

iOS Class Chain обеспечивает иерархический поиск элементов с хорошей производительностью.

```text
# Прямой потомок
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Любой потомок
-ios class chain:**/XCUIElementTypeButton

# По индексу
-ios class chain:**/XCUIElementTypeCell[3]

# В сочетании с предикатом
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Иерархический
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Последний элемент
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath работает на iOS, но медленнее, чем predicate string.

```text
# По типу и метке
//XCUIElementTypeButton[@label='Login']

# По имени
//XCUIElementTypeTextField[@name='username']

# По значению
//XCUIElementTypeSwitch[@value='1']

# Иерархический
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Кроссплатформенная стратегия селекторов

При написании тестов, которые должны работать и на iOS, и на Android, используйте следующий порядок приоритета:

### 1. Accessibility ID (лучший вариант)

```text
# Работает на обеих платформах
~loginButton
```

### 2. Платформенно-специфичные селекторы с условной логикой

Если accessibility ID недоступны, используйте селекторы, специфичные для платформы:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (крайний случай)

XPath работает на обеих платформах, но с разными типами элементов:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## Справочник типов элементов

### Типы элементов Android

| Тип                           | Описание                  |
| ----------------------------- | ------------------------- |
| `android.widget.Button`       | Кнопка                    |
| `android.widget.EditText`     | Поле ввода текста         |
| `android.widget.TextView`     | Текстовая метка           |
| `android.widget.ImageView`    | Изображение               |
| `android.widget.ImageButton`  | Кнопка-изображение        |
| `android.widget.CheckBox`     | Флажок                    |
| `android.widget.RadioButton`  | Переключатель (radio)     |
| `android.widget.Switch`       | Тумблер                   |
| `android.widget.Spinner`      | Выпадающий список         |
| `android.widget.ListView`     | Список                    |
| `android.widget.RecyclerView` | Recycler view             |
| `android.widget.ScrollView`   | Прокручиваемый контейнер  |

### Типы элементов iOS

| Тип                              | Описание               |
| -------------------------------- | ---------------------- |
| `XCUIElementTypeButton`          | Кнопка                 |
| `XCUIElementTypeTextField`       | Поле ввода текста      |
| `XCUIElementTypeSecureTextField` | Поле ввода пароля      |
| `XCUIElementTypeStaticText`      | Текстовая метка        |
| `XCUIElementTypeImage`           | Изображение            |
| `XCUIElementTypeSwitch`          | Тумблер                |
| `XCUIElementTypeSlider`          | Ползунок               |
| `XCUIElementTypePicker`          | Колесо выбора          |
| `XCUIElementTypeTable`           | Таблица                |
| `XCUIElementTypeCell`            | Ячейка таблицы         |
| `XCUIElementTypeCollectionView`  | Collection view        |
| `XCUIElementTypeScrollView`      | Прокручиваемая область |

## Лучшие практики

### Рекомендуется

- **Используйте accessibility ID** для стабильных кроссплатформенных селекторов
- **Добавляйте атрибуты data-testid** к веб-элементам для тестирования
- **Используйте resource ID** на Android, если accessibility ID недоступны
- **Отдавайте предпочтение predicate string** перед XPath на iOS
- **Делайте селекторы простыми** и конкретными

### Не рекомендуется

- **Избегайте длинных выражений XPath** — они медленные и хрупкие
- **Не полагайтесь на индексы** в динамических списках
- **Избегайте текстовых селекторов** в локализованных приложениях
- **Не используйте абсолютный XPath** (начинающийся от корня)

### Примеры хороших и плохих селекторов

```text
# Хорошо — стабильный accessibility ID
~loginButton

# Плохо — хрупкий XPath с индексами
//div[3]/form/button[2]

# Хорошо — конкретный CSS с test ID
[data-testid="submit-button"]

# Плохо — класс, который может измениться
.btn-primary-lg-v2

# Хорошо — UiAutomator с resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Плохо — текст, который может быть локализован
android=new UiSelector().text("Submit")
```

## Отладка селекторов

### Веб (Chrome DevTools)

1. Откройте Chrome DevTools (F12)
2. Используйте панель Elements для инспектирования элементов
3. Щёлкните правой кнопкой мыши по элементу → Copy → Copy selector
4. Проверьте селекторы в консоли: `document.querySelector('your-selector')`

### Мобильные устройства (Appium Inspector)

1. Запустите Appium Inspector
2. Подключитесь к запущенной сессии
3. Нажимайте на элементы, чтобы увидеть все доступные атрибуты
4. Используйте функцию «Search for element» для проверки селекторов

### Использование `get_elements`

Инструмент `get_elements` MCP-сервера возвращает несколько стратегий селекторов для каждого элемента:

```text
Ask: "Get all visible elements on the screen"
```

Он возвращает элементы с заранее сгенерированными селекторами, которые можно использовать напрямую.

#### Расширенные параметры

Для более точного управления поиском элементов:

```text
# Получить только изображения и визуальные элементы
Get visible elements with elementType "visual"

# Получить элементы с координатами для отладки макета
Get visible elements with includeBounds enabled

# Получить следующие 20 элементов (пагинация)
Get visible elements with limit 20 and offset 20

# Включить контейнеры макета для отладки
Get visible elements with includeContainers enabled
```

Инструмент возвращает ответ с пагинацией:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Использование `get_accessibility` (только для браузера)

Для автоматизации браузера инструмент `get_accessibility` предоставляет семантическую информацию об элементах страницы:

```text
# Получить все именованные узлы доступности
Get accessibility tree

# Отфильтровать только кнопки и ссылки
Get accessibility tree filtered to button and link roles

# Получить следующую страницу результатов
Get accessibility tree with limit 50 and offset 50
```

Это полезно, когда `get_elements` не возвращает ожидаемые элементы, поскольку инструмент обращается к нативному API доступности браузера.
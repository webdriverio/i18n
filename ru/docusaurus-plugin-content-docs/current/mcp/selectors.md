---
id: selectors
title: Селекторы
---

Сервер WebdriverIO MCP поддерживает множество стратегий селекторов для поиска элементов на веб-страницах и в мобильных приложениях.

:::info

Полную документацию по селекторам, включая все стратегии селекторов WebdriverIO, смотрите в основном руководстве [Selectors](/docs/selectors). Эта страница посвящена селекторам, обычно используемым с сервером MCP.

:::

## Веб-селекторы

Для автоматизации браузера сервер MCP поддерживает все стандартные селекторы WebdriverIO. Наиболее часто используемые включают:

| Селектор | Пример | Описание |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Стандартные CSS селекторы |
| XPath | `//button[@id='submit']` | XPath выражения |
| Text | `button=Submit`, `a*=Click` | Текстовые селекторы WebdriverIO |
| ARIA | `aria/Submit Button` | Селекторы по имени доступности |
| Test ID | `[data-testid="submit"]` | Рекомендуется для тестирования |

Подробные примеры и лучшие практики смотрите в документации [Selectors](/docs/selectors).

---

## Мобильные селекторы

Мобильные селекторы работают с платформами iOS и Android через Appium.

### Accessibility ID (Рекомендуется)

Accessibility ID - это **самый надежный кросс-платформенный селектор**. Они работают как на iOS, так и на Android и стабильны при обновлениях приложения.

```
# Синтаксис
~accessibilityId

# Примеры
~loginButton
~submitForm
~usernameField
```

:::tip Лучшая практика
Всегда предпочитайте accessibility ID, когда они доступны. Они обеспечивают:
- Кросс-платформенную совместимость (iOS + Android)
- Стабильность при изменениях UI
- Лучшую поддерживаемость тестов
- Улучшенную доступность вашего приложения
:::

### Android селекторы

#### UiAutomator

UiAutomator селекторы мощные и быстрые для Android.

```
# По тексту
android=new UiSelector().text("Login")

# По частичному тексту
android=new UiSelector().textContains("Log")

# По идентификатору ресурса
android=new UiSelector().resourceId("com.example:id/login_button")

# По имени класса
android=new UiSelector().className("android.widget.Button")

# По описанию (доступность)
android=new UiSelector().description("Login button")

# Комбинированные условия
android=new UiSelector().className("android.widget.Button").text("Login")

# Прокручиваемый контейнер
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource ID обеспечивают стабильную идентификацию элементов на Android.

```
# Полный Resource ID
id=com.example.app:id/login_button

# Частичный ID (пакет приложения подразумевается)
id=login_button
```

#### XPath (Android)

XPath работает на Android, но медленнее, чем UiAutomator.

```
# По классу и тексту
//android.widget.Button[@text='Login']

# По Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# По описанию содержимого
//android.widget.ImageButton[@content-desc='Menu']

# Иерархический
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS селекторы

#### Predicate String

iOS Predicate Strings быстрые и мощные для автоматизации iOS.

```
# По метке
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

# Без учета регистра
-ios predicate string:label ==[c] "login"
```

**Операторы Predicate:**

| Оператор | Описание |
|----------|-------------|
| `==` | Равно |
| `!=` | Не равно |
| `CONTAINS` | Содержит подстроку |
| `BEGINSWITH` | Начинается с |
| `ENDSWITH` | Заканчивается на |
| `LIKE` | Соответствие по маске |
| `MATCHES` | Соответствие регулярному выражению |
| `AND` | Логическое И |
| `OR` | Логическое ИЛИ |

#### Class Chain

iOS Class Chains обеспечивают иерархический поиск элементов с хорошей производительностью.

```
# Прямой потомок
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Любой потомок
-ios class chain:**/XCUIElementTypeButton

# По индексу
-ios class chain:**/XCUIElementTypeCell[3]

# Комбинированный с Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Иерархический
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Последний элемент
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath работает на iOS, но медленнее, чем predicate strings.

```
# По типу и метке
//XCUIElementTypeButton[@label='Login']

# По имени
//XCUIElementTypeTextField[@name='username']

# По значению
//XCUIElementTypeSwitch[@value='1']

# Иерархический
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Кросс-платформенная стратегия селекторов

При написании тестов, которые должны работать как на iOS, так и на Android, используйте следующий порядок приоритета:

### 1. Accessibility ID (Лучший вариант)

```
# Работает на обеих платформах
~loginButton
```

### 2. Платформозависимые с условной логикой

Когда accessibility ID недоступны, используйте платформозависимые селекторы:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Последний вариант)

XPath работает на обеих платформах, но с разными типами элементов:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Справочник по типам элементов

### Типы элементов Android

| Тип | Описание |
|------|-------------|
| `android.widget.Button` | Кнопка |
| `android.widget.EditText` | Текстовое поле ввода |
| `android.widget.TextView` | Текстовая метка |
| `android.widget.ImageView` | Изображение |
| `android.widget.ImageButton` | Кнопка-изображение |
| `android.widget.CheckBox` | Флажок |
| `android.widget.RadioButton` | Радиокнопка |
| `android.widget.Switch` | Переключатель |
| `android.widget.Spinner` | Выпадающий список |
| `android.widget.ListView` | Представление списка |
| `android.widget.RecyclerView` | Recycler view |
| `android.widget.ScrollView` | Прокручиваемый контейнер |

### Типы элементов iOS

| Тип | Описание |
|------|-------------|
| `XCUIElementTypeButton` | Кнопка |
| `XCUIElementTypeTextField` | Текстовое поле ввода |
| `XCUIElementTypeSecureTextField` | Поле ввода пароля |
| `XCUIElementTypeStaticText` | Текстовая метка |
| `XCUIElementTypeImage` | Изображение |
| `XCUIElementTypeSwitch` | Переключатель |
| `XCUIElementTypeSlider` | Ползунок |
| `XCUIElementTypePicker` | Колесо выбора |
| `XCUIElementTypeTable` | Табличное представление |
| `XCUIElementTypeCell` | Ячейка таблицы |
| `XCUIElementTypeCollectionView` | Коллекционное представление |
| `XCUIElementTypeScrollView` | Прокручиваемое представление |

---

## Лучшие практики

### Делайте

- **Используйте accessibility ID** для стабильных кросс-платформенных селекторов
- **Добавляйте атрибуты data-testid** к веб-элементам для тестирования
- **Используйте resource ID** на Android, когда accessibility ID недоступны
- **Предпочитайте predicate strings** вместо XPath на iOS
- **Делайте селекторы простыми** и конкретными

### Не делайте

- **Избегайте длинных XPath выражений** - они медленные и хрупкие
- **Не полагайтесь на индексы** для динамических списков
- **Избегайте селекторов на основе текста** для локализованных приложений
- **Не используйте абсолютный XPath** (начиная от корня)

### Примеры хороших и плохих селекторов

```
# Хороший - Стабильный accessibility ID
~loginButton

# Плохой - Хрупкий XPath с индексами
//div[3]/form/button[2]

# Хороший - Конкретный CSS с test ID
[data-testid="submit-button"]

# Плохой - Класс, который может измениться
.btn-primary-lg-v2

# Хороший - UiAutomator с resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Плохой - Текст, который может быть локализован
android=new UiSelector().text("Submit")
```

---

## Отладка селекторов

### Веб (Chrome DevTools)

1. Откройте Chrome DevTools (F12)
2. Используйте панель Elements для проверки элементов
3. Щелкните правой кнопкой мыши на элементе → Копировать → Копировать селектор
4. Тестируйте селекторы в консоли: `document.querySelector('your-selector')`

### Мобильные (Appium Inspector)

1. Запустите Appium Inspector
2. Подключитесь к вашей работающей сессии
3. Нажимайте на элементы, чтобы увидеть все доступные атрибуты
4. Используйте функцию "Search for element" для тестирования селекторов

### Использование `get_visible_elements`

Инструмент `get_visible_elements` сервера MCP возвращает несколько стратегий селекторов для каждого элемента:

```
Ask Claude: "Get all visible elements on the screen"
```

Это возвращает элементы с предварительно сгенерированными селекторами, которые можно использовать напрямую.

#### Расширенные опции

Для большего контроля над обнаружением элементов:

```
# Получить только изображения и визуальные элементы
Get visible elements with elementType "visual"

# Получить элементы с их координатами для отладки макета
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

### Использование `get_accessibility` (Только для браузера)

Для автоматизации браузера инструмент `get_accessibility` предоставляет семантическую информацию об элементах страницы:

```
# Получить все именованные узлы доступности
Get accessibility tree

# Фильтровать только кнопки и ссылки
Get accessibility tree filtered to button and link roles

# Получить следующую страницу результатов
Get accessibility tree with limit 50 and offset 50
```

Это полезно, когда `get_visible_elements` не возвращает ожидаемые элементы, так как он запрашивает нативный API доступности браузера.
---
id: selectors
title: Селектори
---

Сервер WebdriverIO MCP підтримує кілька стратегій селекторів для пошуку елементів на веб-сторінках та мобільних додатках.

:::info

Для повної документації з селекторів, включаючи всі стратегії селекторів WebdriverIO, дивіться основний посібник [Selectors](/docs/selectors). Ця сторінка зосереджена на селекторах, що зазвичай використовуються з сервером MCP.

:::

## Веб-селектори

Для автоматизації браузера сервер MCP підтримує всі стандартні селектори WebdriverIO. Найчастіше використовуються:

| Селектор | Приклад | Опис |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Стандартні CSS-селектори |
| XPath | `//button[@id='submit']` | XPath-вирази |
| Text | `button=Submit`, `a*=Click` | Текстові селектори WebdriverIO |
| ARIA | `aria/Submit Button` | Селектори за назвою доступності |
| Test ID | `[data-testid="submit"]` | Рекомендовано для тестування |

Для детальних прикладів та найкращих практик дивіться документацію [Selectors](/docs/selectors).

---

## Мобільні селектори

Мобільні селектори працюють з платформами iOS і Android через Appium.

### Accessibility ID (Рекомендовано)

Accessibility ID - це **найнадійніший крос-платформний селектор**. Він працює на iOS і Android та залишається стабільним під час оновлень додатку.

```
# Синтаксис
~accessibilityId

# Приклади
~loginButton
~submitForm
~usernameField
```

:::tip Найкраща практика
Завжди надавайте перевагу accessibility ID, якщо вони доступні. Вони забезпечують:
- Крос-платформну сумісність (iOS + Android)
- Стабільність під час змін UI
- Краща підтримка тестів
- Покращена доступність вашого додатку
:::

### Селектори Android

#### UiAutomator

Селектори UiAutomator потужні та швидкі для Android.

```
# За текстом
android=new UiSelector().text("Login")

# За частковим текстом
android=new UiSelector().textContains("Log")

# За ідентифікатором ресурсу
android=new UiSelector().resourceId("com.example:id/login_button")

# За іменем класу
android=new UiSelector().className("android.widget.Button")

# За описом (доступність)
android=new UiSelector().description("Login button")

# Комбіновані умови
android=new UiSelector().className("android.widget.Button").text("Login")

# Прокручуваний контейнер
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource ID забезпечують стабільну ідентифікацію елементів на Android.

```
# Повний Resource ID
id=com.example.app:id/login_button

# Частковий ID (пакет додатку мається на увазі)
id=login_button
```

#### XPath (Android)

XPath працює на Android, але повільніший за UiAutomator.

```
# За класом і текстом
//android.widget.Button[@text='Login']

# За Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# За описом вмісту
//android.widget.ImageButton[@content-desc='Menu']

# Ієрархічний
//android.widget.LinearLayout/android.widget.Button[1]
```

### Селектори iOS

#### Predicate String

iOS Predicate Strings швидкі та потужні для автоматизації iOS.

```
# За міткою
-ios predicate string:label == "Login"

# За частковою міткою
-ios predicate string:label CONTAINS "Log"

# За іменем
-ios predicate string:name == "loginButton"

# За типом
-ios predicate string:type == "XCUIElementTypeButton"

# За значенням
-ios predicate string:value == "ON"

# Комбіновані умови
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Видимість
-ios predicate string:label == "Login" AND visible == 1

# Без врахування регістру
-ios predicate string:label ==[c] "login"
```

**Оператори Predicate:**

| Оператор | Опис |
|----------|-------------|
| `==` | Дорівнює |
| `!=` | Не дорівнює |
| `CONTAINS` | Містить підрядок |
| `BEGINSWITH` | Починається з |
| `ENDSWITH` | Закінчується на |
| `LIKE` | Співпадіння з маскою |
| `MATCHES` | Співпадіння з регулярним виразом |
| `AND` | Логічне І |
| `OR` | Логічне АБО |

#### Class Chain

iOS Class Chains забезпечують ієрархічну локацію елементів з хорошою продуктивністю.

```
# Прямий нащадок
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Будь-який нащадок
-ios class chain:**/XCUIElementTypeButton

# За індексом
-ios class chain:**/XCUIElementTypeCell[3]

# Комбіновано з Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Ієрархічно
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Останній елемент
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath працює на iOS, але повільніший за predicate strings.

```
# За типом і міткою
//XCUIElementTypeButton[@label='Login']

# За іменем
//XCUIElementTypeTextField[@name='username']

# За значенням
//XCUIElementTypeSwitch[@value='1']

# Ієрархічний
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Крос-платформна стратегія селекторів

При написанні тестів, які мають працювати на iOS і Android, використовуйте цей порядок пріоритетів:

### 1. Accessibility ID (Найкраще)

```
# Працює на обох платформах
~loginButton
```

### 2. Платформо-специфічні з умовною логікою

Коли accessibility ID недоступні, використовуйте платформо-специфічні селектори:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Останній варіант)

XPath працює на обох платформах, але з різними типами елементів:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Довідник типів елементів

### Типи елементів Android

| Тип | Опис |
|------|-------------|
| `android.widget.Button` | Кнопка |
| `android.widget.EditText` | Текстове поле вводу |
| `android.widget.TextView` | Текстова мітка |
| `android.widget.ImageView` | Зображення |
| `android.widget.ImageButton` | Кнопка з зображенням |
| `android.widget.CheckBox` | Прапорець |
| `android.widget.RadioButton` | Радіо-кнопка |
| `android.widget.Switch` | Перемикач |
| `android.widget.Spinner` | Випадаючий список |
| `android.widget.ListView` | Список |
| `android.widget.RecyclerView` | Перероблюваний вид |
| `android.widget.ScrollView` | Контейнер прокрутки |

### Типи елементів iOS

| Тип | Опис |
|------|-------------|
| `XCUIElementTypeButton` | Кнопка |
| `XCUIElementTypeTextField` | Текстове поле вводу |
| `XCUIElementTypeSecureTextField` | Поле вводу пароля |
| `XCUIElementTypeStaticText` | Текстова мітка |
| `XCUIElementTypeImage` | Зображення |
| `XCUIElementTypeSwitch` | Перемикач |
| `XCUIElementTypeSlider` | Повзунок |
| `XCUIElementTypePicker` | Колесо вибору |
| `XCUIElementTypeTable` | Табличний вид |
| `XCUIElementTypeCell` | Клітинка таблиці |
| `XCUIElementTypeCollectionView` | Вид колекції |
| `XCUIElementTypeScrollView` | Прокручуваний вид |

---

## Найкращі практики

### Робіть

- **Використовуйте accessibility ID** для стабільних крос-платформних селекторів
- **Додавайте атрибути data-testid** до веб-елементів для тестування
- **Використовуйте resource ID** на Android, коли accessibility ID недоступні
- **Надавайте перевагу predicate strings** над XPath на iOS
- **Тримайте селектори простими** і конкретними

### Не робіть

- **Уникайте довгих XPath-виразів** - вони повільні і крихкі
- **Не покладайтеся на індекси** для динамічних списків
- **Уникайте селекторів на основі тексту** для локалізованих додатків
- **Не використовуйте абсолютний XPath** (починаючи з кореня)

### Приклади хороших і поганих селекторів

```
# Добре - стабільний accessibility ID
~loginButton

# Погано - крихкий XPath з індексами
//div[3]/form/button[2]

# Добре - конкретний CSS з test ID
[data-testid="submit-button"]

# Погано - клас, який може змінитися
.btn-primary-lg-v2

# Добре - UiAutomator з resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Погано - текст, який може бути локалізований
android=new UiSelector().text("Submit")
```

---

## Налагодження селекторів

### Веб (Chrome DevTools)

1. Відкрийте Chrome DevTools (F12)
2. Використовуйте панель Elements для перевірки елементів
3. Правий клік на елементі → Copy → Copy selector
4. Тестуйте селектори в Console: `document.querySelector('your-selector')`

### Мобільні (Appium Inspector)

1. Запустіть Appium Inspector
2. Підключіться до вашої поточної сесії
3. Клікайте на елементи, щоб побачити всі доступні атрибути
4. Використовуйте функцію "Search for element" для тестування селекторів

### Використання `get_visible_elements`

Інструмент `get_visible_elements` сервера MCP повертає кілька стратегій селекторів для кожного елемента:

```
Ask Claude: "Get all visible elements on the screen"
```

Це повертає елементи з попередньо згенерованими селекторами, які можна використовувати безпосередньо.

#### Розширені опції

Для більшого контролю над виявленням елементів:

```
# Отримати лише зображення та візуальні елементи
Get visible elements with elementType "visual"

# Отримати елементи з їх координатами для налагодження макету
Get visible elements with includeBounds enabled

# Отримати наступні 20 елементів (пагінація)
Get visible elements with limit 20 and offset 20

# Включити контейнери макету для налагодження
Get visible elements with includeContainers enabled
```

Інструмент повертає пагінований відповідь:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Використання `get_accessibility` (Тільки браузер)

Для автоматизації браузера інструмент `get_accessibility` надає семантичну інформацію про елементи сторінки:

```
# Отримати всі іменовані вузли доступності
Get accessibility tree

# Фільтрувати тільки кнопки та посилання
Get accessibility tree filtered to button and link roles

# Отримати наступну сторінку результатів
Get accessibility tree with limit 50 and offset 50
```

Це корисно, коли `get_visible_elements` не повертає очікувані елементи, оскільки запитує рідний API доступності браузера.
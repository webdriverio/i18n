---
id: selectors
title: Селектори
---

The [WebDriver Protocol](https://w3c.github.io/webdriver/) provides several selector strategies to query an element. WebdriverIO simplifies them to keep selecting elements simple. Please note that even though the command to query elements is called `$` and `$$`, they have nothing to do with jQuery or the [Sizzle Selector Engine](https://github.com/jquery/sizzle).

While there are so many different selectors available, only a few of them provide a resilient way to find the right element. For example, given the following button:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

Ми __рекомендуємо__ і __не рекомендуємо__ наступні селектори:

| Селектор | Рекомендовано | Примітки |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Ніколи | Найгірший - занадто загальний, без контексту. |
| `$('.btn.btn-large')` | 🚨 Ніколи | Погано. Прив'язаний до стилів. Дуже схильний до змін. |
| `$('#main')` | ⚠️ Зрідка | Краще. Але все ще прив'язаний до стилів або слухачів подій JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Зрідка | Ефективний запит, складний для написання. |
| `$('button[name="submission"]')` | ⚠️ Зрідка | Прив'язаний до атрибуту `name`, який має семантику HTML. |
| `$('button[data-testid="submit"]')` | ✅ Добре | Потрібен додатковий атрибут, не пов'язаний з a11y. |
| `$('aria/Submit')` або `$('button=Submit')` | ✅ Завжди | Найкраще. Нагадує, як користувач взаємодіє зі сторінкою. Рекомендується використовувати файли перекладу вашого фронтенду, щоб ваші тести ніколи не падали при оновленні перекладів |

## CSS Query Selector

If not indicated otherwise, WebdriverIO will query elements using the [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) pattern, e.g.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Link Text

Щоб отримати елемент посилання з певним текстом, запитуйте текст, починаючи зі знаку рівності (`=`).

Наприклад:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Ви можете запросити цей елемент, викликавши:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Partial Link Text

Щоб знайти елемент-посилання, видимий текст якого частково відповідає вашому пошуковому значенню, використовуйте `*=` перед рядком запиту (наприклад, `*=driver`).

Ви також можете запросити елемент з прикладу вище, викликавши:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Примітка:__ Ви не можете змішувати кілька стратегій селекторів в одному селекторі. Використовуйте декілька ланцюжкових запитів елементів для досягнення тієї ж мети, наприклад:

```js
const elem = await $('header h1*=Welcome') // не працює!!!
// використовуйте натомість
const elem = await $('header').$('*=driver')
```

## Element with certain text

Така ж техніка може бути застосована і до елементів. Крім того, також можливо виконати пошук без урахування регістру за допомогою `.=` або `.*=` в запиті.

Наприклад, ось запит для заголовка 1 рівня з текстом "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Ви можете запросити цей елемент, викликавши:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Або використовуючи частковий текст запиту:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Те саме працює для імен `id` та `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Ви можете запросити цей елемент, викликавши:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Примітка:__ Ви не можете змішувати кілька стратегій селекторів в одному селекторі. Використовуйте декілька ланцюжкових запитів елементів для досягнення тієї ж мети, наприклад:

```js
const elem = await $('header h1*=Welcome') // не працює!!!
// використовуйте натомість
const elem = await $('header').$('h1*=Welcome')
```

## Tag Name

Щоб запитати елемент з певною назвою тегу, використовуйте `<tag>` або `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Ви можете запросити цей елемент, викликавши:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name Attribute

Для запиту елементів з певним атрибутом name ви можете використовувати або звичайний селектор CSS3, або надану стратегію name з [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), передаючи щось на зразок [name="some-name"] як параметр селектора:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Примітка:__ Ця стратегія селектора застаріла і працює лише в старих браузерах, які працюють за протоколом JSONWireProtocol, або при використанні Appium.

## xPath

Також можливо запитувати елементи через конкретний [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

Селектор xPath має формат на зразок `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Ви можете запитати другий абзац, викликавши:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Ви можете використовувати xPath також для переміщення вгору та вниз по DOM-дереву:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Accessibility Name Selector

Запит елементів за їх доступною назвою. Доступна назва - це те, що оголошується програмою зчитування з екрану, коли цей елемент отримує фокус. Значення доступної назви може бути як візуальним вмістом, так і прихованими текстовими альтернативами.

:::info

Ви можете прочитати більше про цей селектор у нашому [блозі про випуск](/blog/2022/09/05/accessibility-selector)

:::

### Fetch by `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Fetch by `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Fetch by content

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Fetch by title

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Fetch by `alt` property

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Role Attribute

Для запиту елементів на основі [ролей ARIA](https://www.w3.org/TR/html-aria/#docconformance), ви можете безпосередньо вказати роль елемента, наприклад `[role=button]` як параметр селектора:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID Attribute

Стратегія локатора "id" не підтримується в протоколі WebDriver, замість цього слід використовувати стратегії селекторів CSS або xPath для пошуку елементів за допомогою ID.

Однак деякі драйвери (наприклад, [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) все ще можуть [підтримувати](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) цей селектор.

Поточні підтримувані синтаксиси селектора для ID:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Note: works only in Appium or similar frameworks which supports locator strategy "ID"
const button = await $('id=resource-id/iosname')
```

## JS Function

Ви також можете використовувати функції JavaScript для отримання елементів за допомогою веб-нативних API. Звісно, ви можете робити це лише всередині веб-контексту (наприклад, `browser` або веб-контекст на мобільному).

Маючи наступну HTML-структуру:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Ви можете запитати сусідній елемент `#elem` наступним чином:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Deep Selectors

:::warning

Починаючи з `v9` WebdriverIO немає потреби в цьому спеціальному селекторі, оскільки WebdriverIO автоматично проникає через Shadow DOM за вас. Рекомендується відмовитися від цього селектора, видаливши `>>>` перед ним.

:::

Багато фронтенд-додатків сильно покладаються на елементи з [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Технічно неможливо запитувати елементи всередині shadow DOM без обхідних шляхів. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) та [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) були такими обхідними шляхами, які мали свої [обмеження](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). З глибоким селектором ви тепер можете запитувати всі елементи в будь-якому shadow DOM, використовуючи звичайну команду запиту.

Якщо у нас є додаток з наступною структурою:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

За допомогою цього селектора ви можете запитати елемент `<button />`, який вкладений в інший shadow DOM, наприклад:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Mobile Selectors

Для гібридного мобільного тестування важливо, щоб сервер автоматизації знаходився в правильному *контексті* перед виконанням команд. Для автоматизації жестів драйвер в ідеалі повинен бути встановлений у нативний контекст. Але для вибору елементів з DOM драйверу потрібно встановити контекст webview платформи. Тільки *потім* можуть бути використані методи, згадані вище.

Для нативного мобільного тестування немає перемикання між контекстами, оскільки вам доводиться використовувати мобільні стратегії та безпосередньо використовувати технологію автоматизації пристрою. Це особливо корисно, коли тест потребує певного контролю над пошуком елементів.

### Android UiAutomator

Фреймворк Android UI Automator надає кілька способів пошуку елементів. Ви можете використовувати [API UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), зокрема клас [UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) для пошуку елементів. В Appium ви надсилаєте код Java як рядок на сервер, який виконує його в середовищі додатка, повертаючи елемент або елементи.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher and ViewMatcher (Espresso only)

Стратегія Android DataMatcher надає спосіб пошуку елементів за допомогою [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

І аналогічно [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (Espresso only)

Стратегія view tag надає зручний спосіб пошуку елементів за їх [тегом](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

При автоматизації iOS-додатку можна використовувати [фреймворк UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) від Apple для пошуку елементів.

Це [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript має методи для доступу до подання та всього, що на ньому знаходиться.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Ви також можете використовувати пошук предикатів у iOS UI Automation в Appium, щоб ще більше уточнити вибір елементів. Детальніше див. [тут](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md).

### iOS XCUITest predicate strings and class chains

З iOS 10 і вище (використовуючи драйвер `XCUITest`), ви можете використовувати [рядки предикатів](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

І [ланцюжки класів](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Стратегія локатора `accessibility id` розроблена для зчитування унікального ідентифікатора елемента UI. Це має перевагу в тому, що він не змінюється під час локалізації або будь-якого іншого процесу, який може змінити текст. Крім того, це може допомогти в створенні крос-платформенних тестів, якщо елементи, які функціонально однакові, мають однаковий accessibility id.

- Для iOS це `accessibility identifier`, визначений Apple [тут](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Для Android `accessibility id` відповідає `content-description` для елемента, як описано [тут](https://developer.android.com/training/accessibility/accessible-app.html).

Для обох платформ отримання елемента (або кількох елементів) за їх `accessibility id` зазвичай є найкращим методом. Це також більш переважний спосіб у порівнянні з застарілою стратегією `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

Стратегія `class name` - це `рядок`, що представляє елемент UI в поточному вигляді.

- Для iOS це повна назва класу [UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), яка починається з `UIA-`, наприклад, `UIATextField` для текстового поля. Повний довідник можна знайти [тут](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Для Android це повністю кваліфікована назва [класу](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator), наприклад, `android.widget.EditText` для текстового поля. Повний довідник можна знайти [тут](https://developer.android.com/reference/android/widget/package-summary.html).
- Для Youi.tv це повна назва класу Youi.tv, яка починається з `CYI-`, наприклад, `CYIPushButtonView` для елемента кнопки. Повний довідник можна знайти на [сторінці GitHub драйвера You.i Engine](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// iOS example
await $('UIATextField').click()
// Android example
await $('android.widget.DatePicker').click()
// Youi.tv example
await $('CYIPushButtonView').click()
```

## Chain Selectors

Якщо ви хочете бути більш конкретним у своєму запиті, ви можете ланцюжком з'єднувати селектори, поки не знайдете потрібний елемент. Якщо ви викликаєте `element` перед фактичною командою, WebdriverIO починає запит з цього елемента.

Наприклад, якщо у вас є структура DOM як:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

І ви хочете додати продукт B у кошик, було б складно зробити це, просто використовуючи CSS-селектор.

З ланцюжком селекторів це набагато простіше. Просто звужуйте бажаний елемент крок за кроком:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium Image Selector

Використовуючи стратегію локатора `-image`, можна надіслати Appium файл зображення, що представляє елемент, до якого ви хочете отримати доступ.

Підтримувані формати файлів: `jpg,png,gif,bmp,svg`

Повний довідник можна знайти [тут](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Примітка**: Принцип роботи Appium з цим селектором полягає в тому, що він внутрішньо зробить (app)screenshot і використовуватиме наданий селектор зображення для перевірки, чи можна знайти елемент на цьому (app)screenshot.

Майте на увазі, що Appium може змінити розмір зробленого (app)screenshot, щоб він відповідав CSS-розміру вашого (app)screen (це відбувається на iPhone, а також на Mac-машинах з дисплеєм Retina, оскільки DPR більше 1). Це призведе до того, що співпадіння не буде знайдено, оскільки наданий селектор зображення міг бути взятий з оригінального знімка екрана.
Ви можете виправити це, оновивши налаштування сервера Appium, див. [документацію Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) для налаштувань та [цей коментар](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) з детальним поясненням.

## React Selectors

WebdriverIO надає спосіб вибору компонентів React на основі імені компонента. Для цього у вас є вибір двох команд: `react$` та `react$$`.

Ці команди дозволяють вибирати компоненти з [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) і повертати або один елемент WebdriverIO, або масив елементів (залежно від того, яка функція використовується).

**Примітка**: Команди `react$` та `react$$` схожі за функціональністю, за винятком того, що `react$$` повертає *всі* співпадаючі екземпляри як масив елементів WebdriverIO, а `react$` повертає перший знайдений екземпляр.

#### Базовий приклад

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

У наведеному вище коді є простий екземпляр `MyComponent` всередині додатку, який React рендерить у HTML-елементі з `id="root"`.

За допомогою команди `browser.react$` ви можете вибрати екземпляр `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Тепер, коли у вас є елемент WebdriverIO, збережений у змінній `myCmp`, ви можете виконувати команди елементів проти нього.

#### Фільтрація компонентів

Бібліотека, яку WebdriverIO використовує внутрішньо, дозволяє фільтрувати ваш вибір за властивостями та/або станом компонента. Для цього вам потрібно передати другий аргумент для властивостей та/або третій аргумент для стану в команду браузера.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Якщо ви хочете вибрати екземпляр `MyComponent`, який має властивість `name` зі значенням `WebdriverIO`, ви можете виконати команду таким чином:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Якщо ви хочете фільтрувати вибір за станом, команда `browser` буде виглядати приблизно так:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### Робота з `React.Fragment`

При використанні команди `react$` для вибору React [фрагментів](https://reactjs.org/docs/fragments.html), WebdriverIO поверне першу дочірню компоненту цього компонента як вузол компонента. Якщо ви використовуєте `react$$`, ви отримаєте масив, що містить всі HTML-вузли всередині фрагментів, які відповідають селектору.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

На основі наведеного вище прикладу, ось як працюватимуть команди:

```js
await browser.react$('MyComponent') // повертає WebdriverIO Element для першого <div />
await browser.react$$('MyComponent') // повертає WebdriverIO Elements для масиву [<div />, <div />]
```

**Примітка:** Якщо у вас кілька екземплярів `MyComponent` і ви використовуєте `react$$` для вибору цих компонентів фрагментів, вам буде повернено одновимірний масив усіх вузлів. Іншими словами, якщо у вас є 3 екземпляри `<MyComponent />`, вам буде повернено масив з шістьма елементами WebdriverIO.

## Custom Selector Strategies


Якщо ваш додаток вимагає специфічного способу отримання елементів, ви можете самостійно визначити спеціальну стратегію селектора, яку ви можете використовувати з `custom$` та `custom$$`. Для цього зареєструйте свою стратегію один раз на початку тесту, наприклад, у гачку `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

Дано наступний HTML-фрагмент:

```html reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

Потім використовуйте його, викликавши:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

**Примітка:** це працює лише в веб-середовищі, в якому можна запустити команду [`execute`](/docs/api/browser/execute).
---
id: selectors
title: Селекторы
description: "Поиск элементов с помощью CSS, текста, XPath, доступного имени, ARIA-роли и других стратегий селекторов, а также сведения о том, какие из них наиболее устойчивы."
---

[Протокол WebDriver](https://w3c.github.io/webdriver/) предоставляет несколько стратегий селекторов для поиска элемента. WebdriverIO упрощает их, чтобы выбор элементов оставался простым. Обратите внимание: хотя команды для поиска элементов называются `$` и `$$`, они не имеют ничего общего с jQuery или [Sizzle Selector Engine](https://github.com/jquery/sizzle).

Несмотря на то, что доступно множество различных селекторов, лишь немногие из них обеспечивают надёжный способ найти нужный элемент. Например, возьмём следующую кнопку:

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

Мы __рекомендуем__ и __не рекомендуем__ следующие селекторы:

| Селектор | Рекомендация | Примечания |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Никогда | Худший вариант — слишком общий, без контекста. |
| `$('.btn.btn-large')` | 🚨 Никогда | Плохо. Привязан к стилям. Очень подвержен изменениям. |
| `$('#main')` | ⚠️ Умеренно | Лучше. Но всё ещё привязан к стилям или обработчикам событий JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Умеренно | Эффективный поиск, но сложно писать. |
| `$('button[name="submission"]')` | ⚠️ Умеренно | Привязан к атрибуту `name`, который имеет семантику HTML. |
| `$('button[data-testid="submit"]')` | ✅ Хорошо | Требует дополнительного атрибута, не связан с a11y. |
| `$('aria/Submit')` | ✅ Хорошо | Хорошо. Похож на то, как пользователь взаимодействует со страницей. Рекомендуется использовать файлы переводов, чтобы ваши тесты не ломались при обновлении переводов. В сессиях WebDriver BiDi используется дерево доступности браузера. В классических сессиях используется резервный вариант на основе XPath, который может быть медленнее на больших страницах. |
| `$('button=Submit')` | ✅ Всегда | Лучший вариант. Похож на то, как пользователь взаимодействует со страницей, и работает быстро. Рекомендуется использовать файлы переводов, чтобы ваши тесты не ломались при обновлении переводов. |

## Строгий режим

Начиная с v10 команда [`$`](/docs/api/browser/$) является __строгой__: она представляет ровно один элемент. Если селектор соответствует более чем одному элементу, команда выбрасывает `StrictSelectorError` вместо того, чтобы молча выбрать первое совпадение:

```js
// на странице 12 кнопок
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

Это такое же поведение, как у [локаторов Playwright](https://playwright.dev/docs/locators#strictness). Cypress работает иначе: его запросы могут возвращать несколько элементов, а уже команды действий, такие как [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), по умолчанию отклоняют субъект из нескольких элементов. Строгий режим выявляет слишком широкие селекторы, которые иначе молча взаимодействовали бы с неправильным элементом, как только страница разрастётся.

Это правило применяется к каждому шагу [цепочки](#chain-selectors) и к каждому типу селектора, который принимает `$`, — строковым селекторам (включая те, что проникают в shadow DOM), [JS-функциям](#js-function), [мобильным селекторам](#mobile-selectors) и ссылкам на [пользовательские стратегии](#custom-selector-strategies).

### Что не затрагивается

- `$$` по-прежнему возвращает ноль или более элементов в виде [`ElementArray`](/docs/api/browser/$$). Дождитесь (await) списка (или его `.length`), прежде чем читать количество или использовать `for...of`. `for await` работает со списком напрямую.
- Специальные вспомогательные команды `custom$`, `shadow$` и `react$` не являются строгими — они по-прежнему возвращают первое совпадение, как и их аналоги `$$`.
- Селектор, которому ничего не соответствует, по-прежнему возвращает лениво разрешаемый элемент, поэтому [`waitForExist`](/docs/api/element/waitForExist) и поведение [автоожидания](/docs/autowait) не меняются.
- Передача ссылки на элемент, например `$(await browser.getActiveElement())`, всегда указывает на один узел и никогда не проверяется.

:::info Переход на v10

О том, как проверить ваш набор тестов на нарушения строгого режима, сузить отдельные запросы или отключить для них проверку, а также отключить строгий режим для всего проекта, читайте в [руководстве по миграции на v10](/docs/v10-migration).

:::

## CSS-селектор

Если не указано иное, WebdriverIO ищет элементы с помощью шаблона [CSS-селектора](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), например:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Текст ссылки

Чтобы получить элемент-ссылку с определённым текстом, укажите текст, начиная со знака равенства (`=`).

Например:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Вы можете найти этот элемент, вызвав:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Частичный текст ссылки

Чтобы найти элемент-ссылку, видимый текст которой частично совпадает с искомым значением,
используйте `*=` перед строкой запроса (например, `*=driver`).

Элемент из примера выше также можно найти, вызвав:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Примечание:__ Нельзя смешивать несколько стратегий селекторов в одном селекторе. Используйте несколько цепочечных запросов элементов для достижения той же цели, например:

```js
const elem = await $('header h1*=Welcome') // не работает!!!
// используйте вместо этого
const elem = await $('header').$('*=driver')
```

## Элемент с определённым текстом

Тот же приём можно применять и к элементам. Кроме того, можно выполнять поиск без учёта регистра, используя `.=` или `.*=` в запросе.

Например, вот запрос для заголовка первого уровня с текстом «Welcome to my Page»:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Вы можете найти этот элемент, вызвав:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Или с помощью запроса по частичному тексту:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

То же самое работает для `id` и имён `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Вы можете найти этот элемент, вызвав:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Примечание:__ Нельзя смешивать несколько стратегий селекторов в одном селекторе. Используйте несколько цепочечных запросов элементов для достижения той же цели, например:

```js
const elem = await $('header h1*=Welcome') // не работает!!!
// используйте вместо этого
const elem = await $('header').$('h1*=Welcome')
```

## Имя тега

Чтобы найти элемент с определённым именем тега, используйте `<tag>` или `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Вы можете найти этот элемент, вызвав:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Атрибут name

Для поиска элементов с определённым атрибутом name используйте CSS-селектор, например `[name="some-name"]`. В мобильной сессии та же сокращённая запись отправляется с использованием стратегии локатора `name` из Appium:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Примечание:__ Стратегия локатора `name` — это локатор Appium. В десктопных сессиях `[name="some-name"]` остаётся на стратегии CSS.

## xPath

Также можно искать элементы с помощью определённого [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

Селектор xPath имеет формат вида `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Вы можете найти второй абзац, вызвав:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

С помощью xPath также можно перемещаться вверх и вниз по дереву DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Селектор по доступному имени

Поиск элементов по их доступному имени (accessible name). Доступное имя — это то, что озвучивает программа чтения с экрана, когда элемент получает фокус. Значением доступного имени может быть как визуальное содержимое, так и скрытые текстовые альтернативы.

В сессиях [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome, Edge, Firefox и другие браузеры с поддержкой BiDi) WebdriverIO сначала использует [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) с локатором доступности. Он напрямую запрашивает дерево доступности браузера и обычно работает значительно быстрее, чем приближение на основе XPath. Если локатор доступности ничего не находит, WebdriverIO переходит к классической эвристике XPath, чтобы существующие запросы `aria/` продолжали находить совпадения.

:::info

Подробнее об этом селекторе можно прочитать в нашем [посте в блоге о релизе](/blog/2022/09/05/accessibility-selector)

:::

### Поиск по `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Поиск по `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Поиск по содержимому

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Поиск по title

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Поиск по свойству `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## Селектор по роли

Поиск элементов по их ARIA-роли и доступному имени — так, как их описывает программа чтения с экрана: «кнопка *Add to cart*». Роль вместе с именем продолжает находить элемент, даже когда меняются имена классов, test id или структура DOM.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// только роль
const rows = await $$('role/row')

// в пределах родительского элемента
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

Синтаксис: `role/<role>` или `role/<role>[name="<accessible name>"]`. Одинарные кавычки тоже работают, а кавычка внутри имени экранируется обратной косой чертой: `role/button[name="Say \"hi\""]`.

- Имя должно совпадать с полным доступным именем.
- Роль должна быть ARIA-ролью. При опечатке выводится ошибка с ближайшей допустимой ролью, например `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` и её имя из ARIA 1.3 `image` — это одна и та же роль.
- Селектор подчиняется [строгому режиму](#strict-mode) команды `$`, как и любой другой селектор.

В сессии [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) WebdriverIO передаёт роль и имя в [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). Браузер сам вычисляет и то, и другое — так же, как страницу видят вспомогательные технологии. Находятся элементы внутри открытых shadow root и внутри фреймов, включая фреймы с другого источника (origin). Если браузер не находит ни одного элемента, резервного перехода к эвристике нет. Учтите, что роль определяет браузер: например, `<table>` без заголовков или подписи может считаться таблицей разметки (layout table), и тогда её строки не имеют роли `row`.

В сессии WebDriver Classic, а также когда браузер не поддерживает локатор по роли, WebdriverIO вычисляет роль и доступное имя на странице с помощью [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api) — реализации, которую использует Testing Library. Текстовое поле без метки получает имя из своего `placeholder`, как это делают браузеры. Селектор по роли недоступен в нативном контексте мобильного приложения. Используйте там [accessibility id](#accessibility-id).

## ARIA — атрибут role

Для поиска элементов на основе [ARIA-ролей](https://www.w3.org/TR/html-aria/#docconformance) можно напрямую указать роль элемента, например `[role=button]`, в качестве параметра селектора. Этот селектор приблизительно определяет роль по имени элемента и его атрибутам. Предпочтительнее использовать [селектор по роли](#role-selector), который использует роль, вычисленную браузером, и также может сопоставлять доступное имя:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Атрибут ID

Стратегия локатора «id» не поддерживается протоколом WebDriver; для поиска элементов по ID следует использовать стратегии селекторов CSS или xPath.

Однако некоторые драйверы (например, [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) всё ещё могут [поддерживать](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) этот селектор.

В настоящее время поддерживаются следующие варианты синтаксиса селекторов для ID:

```js
//css-локатор
const button = await $('#someid')
//xpath-локатор
const button = await $('//*[@id="someid"]')
//стратегия id
// Примечание: работает только в Appium или аналогичных фреймворках, поддерживающих стратегию локатора "ID"
const button = await $('id=resource-id/iosname')
```

## JS-функция

Также можно использовать JavaScript-функции для получения элементов с помощью нативных веб-API. Разумеется, это возможно только внутри веб-контекста (например, `browser` или веб-контекст в мобильных приложениях).

Для следующей HTML-структуры:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Соседний элемент для `#elem` можно найти следующим образом:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Глубокие селекторы

:::warning

Начиная с `v9` WebdriverIO в этом специальном селекторе нет необходимости, так как WebdriverIO автоматически проникает в Shadow DOM. Рекомендуется отказаться от этого селектора, удалив `>>>` перед ним.

:::

Многие фронтенд-приложения активно используют элементы с [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Технически невозможно искать элементы внутри shadow DOM без обходных путей. Команды [`shadow$`](https://webdriver.io/docs/api/element/shadow$) и [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) были такими обходными путями, но имели свои [ограничения](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). С глубоким селектором теперь можно искать все элементы внутри любого shadow DOM с помощью обычной команды поиска.

Допустим, у нас есть приложение со следующей структурой:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

С помощью этого селектора можно найти элемент `<button />`, вложенный в другой shadow DOM, например:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Мобильные селекторы

При гибридном мобильном тестировании важно, чтобы сервер автоматизации находился в правильном *контексте* перед выполнением команд. Для автоматизации жестов драйвер в идеале должен быть установлен в нативный контекст. Но для выбора элементов из DOM драйвер должен быть переключён в контекст webview платформы. Только *тогда* можно использовать методы, упомянутые выше.

При нативном мобильном тестировании переключения между контекстами нет, так как нужно использовать мобильные стратегии и напрямую применять базовую технологию автоматизации устройства. Это особенно полезно, когда тесту требуется точный контроль над поиском элементов.

### Android UiAutomator

Фреймворк UI Automator в Android предоставляет несколько способов поиска элементов. Вы можете использовать [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), в частности [класс UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector), для поиска элементов. В Appium вы отправляете Java-код в виде строки на сервер, который выполняет его в среде приложения и возвращает элемент или элементы.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher и ViewMatcher (только Espresso)

Стратегия DataMatcher в Android позволяет находить элементы с помощью [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

И аналогично [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (только Espresso)

Стратегия view tag предоставляет удобный способ находить элементы по их [тегу](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

При автоматизации iOS-приложения для поиска элементов можно использовать [фреймворк UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) от Apple.

Этот JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) содержит методы для доступа к представлению (view) и всему, что на нём находится.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Также можно использовать поиск по предикатам в iOS UI Automation в Appium, чтобы ещё точнее уточнить выбор элементов. Подробности смотрите [здесь](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md).

### Строки предикатов и цепочки классов iOS XCUITest

В iOS 10 и выше (с драйвером `XCUITest`) можно использовать [строки предикатов](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

И [цепочки классов](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Стратегия локатора `accessibility id` предназначена для чтения уникального идентификатора элемента пользовательского интерфейса. Её преимущество в том, что идентификатор не меняется при локализации или любом другом процессе, который может изменить текст. Кроме того, она может помочь в создании кроссплатформенных тестов, если функционально одинаковые элементы имеют одинаковый accessibility id.

- Для iOS это `accessibility identifier`, описанный Apple [здесь](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Для Android `accessibility id` соответствует `content-description` элемента, как описано [здесь](https://developer.android.com/training/accessibility/accessible-app.html).

Для обеих платформ получение элемента (или нескольких элементов) по их `accessibility id` обычно является лучшим методом. Это также предпочтительнее устаревшей стратегии `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Имя класса

Стратегия `class name` — это `string`, представляющая элемент пользовательского интерфейса в текущем представлении.

- Для iOS это полное имя [класса UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), которое начинается с `UIA-`, например `UIATextField` для текстового поля. Полный справочник можно найти [здесь](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Для Android это полное квалифицированное имя [класса](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator), например `android.widget.EditText` для текстового поля. Полный справочник можно найти [здесь](https://developer.android.com/reference/android/widget/package-summary.html).
- Для Youi.tv это полное имя класса Youi.tv, которое начинается с `CYI-`, например `CYIPushButtonView` для элемента-кнопки. Полный справочник можно найти на [странице GitHub You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// пример для iOS
await $('UIATextField').click()
// пример для Android
await $('android.widget.DatePicker').click()
// пример для Youi.tv
await $('CYIPushButtonView').click()
```

## Цепочки селекторов

Если вы хотите сделать запрос более точным, можно объединять селекторы в цепочку, пока не найдёте нужный
элемент. Если вызвать `element` перед вашей командой, WebdriverIO начнёт поиск с этого элемента.

Например, если у вас есть такая структура DOM:

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

И вы хотите добавить продукт B в корзину, сделать это только с помощью CSS-селектора будет сложно.

С цепочкой селекторов это намного проще. Просто сужайте поиск нужного элемента шаг за шагом:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Селектор изображений Appium

С помощью стратегии локатора `-image` можно отправить в Appium файл изображения, представляющий элемент, к которому вы хотите получить доступ.

Поддерживаемые форматы файлов: `jpg,png,gif,bmp,svg`

Полный справочник можно найти [здесь](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Примечание**: Appium работает с этим селектором так: он внутренне делает скриншот (приложения) и использует предоставленный селектор-изображение,
чтобы проверить, можно ли найти элемент на этом скриншоте (приложения).

Учтите, что Appium может изменить размер сделанного скриншота (приложения), чтобы он соответствовал CSS-размеру вашего экрана (приложения) (это происходит
на iPhone, а также на компьютерах Mac с дисплеем Retina, поскольку DPR больше 1). В результате совпадение не будет найдено, так как
предоставленный селектор-изображение мог быть взят из исходного скриншота.
Это можно исправить, обновив настройки сервера Appium; сами настройки смотрите в [документации Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings),
а подробное объяснение — в [этом комментарии](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579).

## Селекторы React

WebdriverIO предоставляет способ выбирать компоненты React по имени компонента. Для этого доступны две команды: `react$` и `react$$`.

Эти команды позволяют выбирать компоненты из [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) и возвращают либо один элемент WebdriverIO, либо массив элементов (в зависимости от используемой функции).

**Примечание**: Команды `react$` и `react$$` схожи по функциональности, за исключением того, что `react$$` возвращает *все* совпадающие экземпляры в виде массива элементов WebdriverIO, а `react$` возвращает первый найденный экземпляр.

Команды работают с React от 16 до 19 для приложения, которое запускается с помощью `createRoot` или `ReactDOM.render`. Они читают компоненты текущего рендера, поэтому также находят компоненты, добавленные в результате изменения состояния. Если React ещё не отрендерил корень страницы, они ждут его до 5 секунд.

#### Базовый пример

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

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

createRoot(document.querySelector('#root')).render(<App />)
```

В приведённом выше коде внутри приложения есть простой экземпляр `MyComponent`, который React рендерит внутри HTML-элемента с `id="root"`.

С помощью команды `browser.react$` можно выбрать экземпляр `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Теперь, когда элемент WebdriverIO сохранён в переменной `myCmp`, можно выполнять над ним команды элементов.

#### Фильтрация компонентов

Выборку можно фильтровать по props и/или состоянию (state) компонента. Для этого передайте `props` и/или `state` во втором аргументе команды.

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

Если вы хотите выбрать экземпляр `MyComponent`, у которого prop `name` равен `WebdriverIO`, выполните команду так:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Если бы вы захотели отфильтровать выборку по состоянию, команда `browser` выглядела бы примерно так:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Фильтр совпадает, когда совпадает каждый из его ключей, который также есть у компонента. Ключ, которого у компонента нет, игнорируется. Вложенный объект сопоставляется таким же образом, а массив совпадает, если у него есть хотя бы одно общее значение с массивом компонента. `null`, `false` и `0` совпадают с тем же значением. Для функционального компонента с хуками состоянием считается состояние первого хука (`useState` или `useReducer`): если первый хук другой, например `useRef`, фильтр по состоянию не совпадает. При одновременном указании `props` и `state` компонент должен соответствовать обоим.

#### Правила селекторов

- `*` соответствует одному или нескольким символам: `browser.react$$('My*')` находит `MyComponent` и `MyOtherComponent`.
- Имена, разделённые пробелами, находят компонент внутри другого компонента: `browser.react$$('List Item')` находит каждый `Item` внутри `List`.
- Имя компонента — это его `displayName` или, если его нет, имя его функции или класса. Компонент `React.memo` имеет имя своей функции (development-сборка React 17 также присваивает ему `displayName` memo-объекта). Компонент `React.forwardRef` не имеет имени, если у него нет `displayName`.
- Для компонента высшего порядка с именем вида `withRouter(MyComponent)` используется имя внутри скобок: `MyComponent`.
- Без области видимости элемента команды ищут во всех корнях React на странице в порядке документа, включая корни внутри других корней и корни в открытых shadow root. `react$` возвращает первое совпадение. Чтобы искать только в одном корне, вызовите команду на его контейнере или на элементе этого корня: `$('#other-root').react$$('MyComponent')`.
- Результаты идут корень за корнем. Внутри корня они идут в порядке дерева компонентов, уровень за уровнем, а не в порядке документа. `react$$` возвращает каждый DOM-узел один раз.
- Для приложения во фрейме вызовите команду на контексте просмотра (browsing context) фрейма или на элементе фрейма: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Известные ограничения:

- Компонент, который рендерит только текст, даёт текстовый узел. В WebDriver Classic текстовый узел невозможно вернуть, и команда завершается ошибкой `javascript error: circular reference`.
- Пока React выполняет гидратацию границы `Suspense` на странице, отрендеренной на сервере, компоненты внутри неё ещё не существуют. Дождитесь завершения гидратации страницы.

#### Работа с `React.Fragment`

При использовании команды `react$` для выбора [фрагментов](https://reactjs.org/docs/fragments.html) React WebdriverIO вернёт первый дочерний элемент этого компонента в качестве узла компонента. Если вы используете `react$$`, вы получите массив, содержащий все HTML-узлы внутри фрагментов, которые соответствуют селектору.

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

Для приведённого выше примера команды будут работать так:

```js
await browser.react$('MyComponent') // возвращает элемент WebdriverIO для первого <div />
await browser.react$$('MyComponent') // возвращает элементы WebdriverIO для массива [<div />, <div />]
```

**Примечание:** Если у вас несколько экземпляров `MyComponent` и вы используете `react$$` для выбора этих компонентов-фрагментов, вам будет возвращён одномерный массив всех узлов. Другими словами, если у вас 3 экземпляра `<MyComponent />`, вам будет возвращён массив из шести элементов WebdriverIO.

## Пользовательские стратегии селекторов


Если вашему приложению требуется особый способ получения элементов, вы можете определить собственную стратегию селекторов, которую можно использовать с `custom$` и `custom$$`. Для этого зарегистрируйте свою стратегию один раз в начале теста, например в хуке `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Для следующего фрагмента HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Используйте её, вызвав:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Примечание:** это работает только в веб-среде, в которой можно выполнить команду [`execute`](/docs/api/browser/execute).
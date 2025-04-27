---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


При написании тестов часто необходимо проверять, что значения соответствуют определенным условиям. `expect` предоставляет доступ к ряду "матчеров", которые позволяют проверять различные вещи в объектах `browser`, `element` или `mock`.

## Параметры по умолчанию

Эти параметры по умолчанию связаны с опциями [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) и [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval), установленными в конфигурации.

Устанавливайте параметры ниже только в том случае, если вы хотите установить специальные тайм-ауты для ваших проверок.

```js
{
    wait: 2000, // мс ожидания успешного выполнения проверки
    interval: 100, // интервал между попытками
}
```

Если вы хотите установить другие значения тайм-аутов и интервалов, задайте эти параметры следующим образом:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### Параметры матчеров

Каждый матчер может принимать несколько параметров, которые позволяют модифицировать проверку:

##### Параметры команды

| Имя | Тип | Описание |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | время в мс для ожидания успешной проверки. По умолчанию: `3000` |
| <code><var>interval</var></code> | number | интервал между попытками. По умолчанию: `100` |
| <code><var>beforeAssertion</var></code> | function | функция, которая будет вызвана перед проверкой |
| <code><var>afterAssertion</var></code> | function | функция, которая будет вызвана после проверки и содержит результаты проверки |
| <code><var>message</var></code> | string | пользовательское сообщение, которое будет добавлено перед сообщением об ошибке проверки |

##### Параметры для строк

Эти параметры могут применяться дополнительно к параметрам команды при проверке строк.

| Имя | Тип | Описание |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | применить `toLowerCase` к фактическому и ожидаемому значениям |
| <code><var>trim</var></code> | boolean | применить `trim` к фактическому значению |
| <code><var>replace</var></code> | Replacer \| Replacer[] | заменить части фактического значения, которые соответствуют строке/RegExp. Replacer может быть строкой или функцией |
| <code><var>containing</var></code> | boolean | ожидание, что фактическое значение содержит ожидаемое значение, в противном случае строгое равенство |
| <code><var>asString</var></code> | boolean | может быть полезно для принудительного преобразования значения свойства в строку |
| <code><var>atStart</var></code> | boolean | ожидание, что фактическое значение начинается с ожидаемого значения |
| <code><var>atEnd</var></code> | boolean | ожидание, что фактическое значение заканчивается ожидаемым значением |
| <code><var>atIndex</var></code> | number | ожидание, что фактическое значение имеет ожидаемое значение по указанному индексу |

##### Параметры для чисел

Эти параметры могут применяться дополнительно к параметрам команды при проверке чисел.

| Имя | Тип | Описание |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | равно |
| <code><var>lte</var></code> | number | меньше или равно |
| <code><var>gte</var></code> | number | больше или равно |

### Обработка HTML-сущностей

HTML-сущность — это фрагмент текста ("строка"), который начинается с амперсанда (`&`) и заканчивается точкой с запятой (`;`). Сущности часто используются для отображения зарезервированных символов (которые иначе были бы интерпретированы как HTML-код) и невидимых символов (таких как неразрывные пробелы, например, `&nbsp;`).

Для поиска или взаимодействия с таким элементом используйте Unicode-эквивалент сущности. Например:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Все ссылки на Unicode можно найти в [спецификации HTML](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Примечание:** Unicode не чувствителен к регистру, поэтому `\u00a0` и `\u00A0` работают одинаково. Чтобы найти элемент в инспекторе браузера, удалите `u` из Unicode, например: `div[data="Some\00a0Value"]`

## Матчеры для браузера

### toHaveUrl

Проверяет, находится ли браузер на определенной странице.

##### Использование

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Использование

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Проверяет, имеет ли веб-сайт определенный заголовок.

##### Использование

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Проверяет, содержит ли буфер обмена браузера определенный текст.

##### Использование

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Матчеры для элементов

### toBeDisplayed

Вызывает [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) для указанного элемента.

##### Использование

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Вызывает [`isExisting`](https://webdriver.io/docs/api/element/isExisting) для указанного элемента.

##### Использование

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

То же, что и `toExist`.

##### Использование

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

То же, что и `toExist`.

##### Использование

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Проверяет, находится ли элемент в фокусе. Эта проверка работает только в веб-контексте.

##### Использование

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Проверяет, имеет ли элемент определенный атрибут с конкретным значением.

##### Использование

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

То же, что и `toHaveAttribute`.

##### Использование

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Проверяет, имеет ли элемент определенное имя класса. Также может вызываться с массивом в качестве параметра, когда элемент может иметь несколько имен классов.

##### Использование

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Проверяет, имеет ли элемент определенное свойство.

##### Использование

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Проверяет, имеет ли элемент ввода определенное значение.

##### Использование

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Проверяет, можно ли кликнуть по элементу, вызывая [`isClickable`](https://webdriver.io/docs/api/element/isClickable) для элемента.

##### Использование

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Проверяет, отключен ли элемент, вызывая [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) для элемента.

##### Использование

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// то же самое, что и
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Проверяет, включен ли элемент, вызывая [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) для элемента.

##### Использование

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// то же самое, что и
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Проверяет, выбран ли элемент, вызывая [`isSelected`](https://webdriver.io/docs/api/element/isSelected) для элемента.

##### Использование

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

То же, что и `toBeSelected`.

##### Использование

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Проверяет, имеет ли элемент определенную вычисленную метку WAI-ARIA. Также может вызываться с массивом в качестве параметра, если элемент может иметь разные метки.

##### Использование

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Использование

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Проверяет, имеет ли элемент определенную вычисленную роль WAI-ARIA. Также может вызываться с массивом в качестве параметра, если элемент может иметь разные метки.

##### Использование

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Использование

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Проверяет, имеет ли элемент ссылки определенную целевую ссылку.

##### Использование

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

То же, что и `toHaveHref`.

##### Использование

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Проверяет, имеет ли элемент определенный атрибут `id`.

##### Использование

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Проверяет, имеет ли элемент определенный текст. Также может вызываться с массивом в качестве параметра, если элемент может иметь разные тексты.

##### Использование

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

В случае, если в div есть список элементов:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Вы можете проверить их, используя массив:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Проверяет, имеет ли элемент определенный HTML. Также может вызываться с массивом в качестве параметра, если элемент может иметь разные тексты.

##### Использование

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Использование

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Проверяет, находится ли элемент в области просмотра, вызывая [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) для элемента.

##### Использование

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Проверяет количество дочерних элементов путем вызова команды `element.$('./*')`.

##### Использование

```js
const list = await $('ul')
await expect(list).toHaveChildren() // список имеет хотя бы один элемент
// то же самое, что и
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // список имеет 3 элемента
// то же самое, что и 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Проверяет, имеет ли элемент определенную ширину.

##### Использование

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Проверяет, имеет ли элемент определенную высоту.

##### Использование

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Проверяет, имеет ли элемент определенный размер.

##### Использование

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Проверяет количество извлеченных элементов с помощью команды [`$$`](https://webdriver.io/docs/api/element/$).

**Примечание:** Этот матчер обновит переданный массив последними элементами, если проверка пройдет успешно. Однако, если вы переназначили переменную, вам нужно будет снова получить элементы.

##### Использование

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 элементов в списке

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// то же самое, что и
assert.ok(listItems.length <= 10)
```

## Матчеры для сети

### toBeRequested

Проверяет, что мок был вызван

##### Использование

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Проверяет, что мок был вызван ожидаемое количество раз

##### Использование

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // запрос вызван не менее 5 раз, но не более 10
```

### toBeRequestedWith

Проверяет, что мок был вызван в соответствии с ожидаемыми параметрами.

Большинство параметров поддерживает частичные матчеры expect/jasmine, такие как [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Использование

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [опционально] string | function | custom matcher
    method: 'POST',                                 // [опционально] string | array
    statusCode: 200,                                // [опционально] number | array
    requestHeaders: { Authorization: 'foo' },       // [опционально] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [опционально] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [опционально] object | function | custom matcher
    response: { success: true },                    // [опционально] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // либо POST, либо PUT
    statusCode: [401, 403],  // либо 401, либо 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Матчер для снимков

WebdriverIO поддерживает как базовые тесты снимков, так и тестирование снимков DOM.

### toMatchSnapshot

Проверяет, соответствует ли произвольный объект определенному значению. Если вы передаете [`WebdriverIO.Element`](https://webdriver.io/docs/api/element), он автоматически сделает снимок его состояния [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML).

##### Использование

```js
// снимок произвольных объектов (здесь не нужен "await")
expect({ foo: 'bar' }).toMatchSnapshot()
// снимок `outerHTML` WebdriverIO.Element (снимок DOM, требуется "await")
await expect($('elem')).toMatchSnapshot()
// снимок результата команды элемента
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

Аналогично вы можете использовать `toMatchInlineSnapshot()` для хранения снимка внутри тестового файла. Например:

```js
await expect($('img')).toMatchInlineSnapshot()
```

Вместо создания файла снимка WebdriverIO напрямую изменит тестовый файл, чтобы обновить снимок в виде строки:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Матчеры визуальных снимков

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

Следующие матчеры реализованы как часть плагина `@wdio/visual-service` и доступны только при настройке сервиса. Убедитесь, что вы следуете [инструкциям по настройке](https://webdriver.io/docs/visual-testing) соответствующим образом.

### toMatchElementSnapshot

Проверяет, соответствует ли данный элемент снимку из базовой линии.

##### Использование

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // опции
})
```

Ожидаемый результат по умолчанию равен `0`, поэтому вы можете записать ту же проверку следующим образом:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // опции
})
```

или вообще не передавать никаких опций:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Проверяет, соответствует ли текущий экран снимку из базовой линии.

##### Использование

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // опции
})
```

Ожидаемый результат по умолчанию равен `0`, поэтому вы можете записать ту же проверку следующим образом:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // опции
})
```

или вообще не передавать никаких опций:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Проверяет, соответствует ли снимок всей страницы снимку из базовой линии.

##### Использование

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // опции
})
```

Ожидаемый результат по умолчанию равен `0`, поэтому вы можете записать ту же проверку следующим образом:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // опции
})
```

или вообще не передавать никаких опций:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Проверяет, соответствует ли снимок всей страницы с табами снимку из базовой линии.

##### Использование

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // опции
})
```

Ожидаемый результат по умолчанию равен `0`, поэтому вы можете записать ту же проверку следующим образом:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // опции
})
```

или вообще не передавать никаких опций:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Использование регулярных выражений

Вы также можете напрямую использовать регулярные выражения для всех матчеров, которые выполняют сравнение текста.

##### Использование

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Стандартные матчеры

В дополнение к матчерам `expect-webdriverio` вы можете использовать встроенные проверки Jest [expect](https://jestjs.io/docs/en/expect) или [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) для Jasmine.

## Асимметричные матчеры

WebdriverIO поддерживает использование асимметричных матчеров везде, где вы сравниваете текстовые значения, например:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

или

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Если вы используете [WDIO Testrunner](https://webdriver.io/docs/clioptions), все будет настроено автоматически. Просто следуйте [руководству по настройке](https://webdriver.io/docs/typescript#framework-setup) из документации. Однако, если вы запускаете WebdriverIO с другим тестраннером или в простом скрипте Node.js, вам нужно будет добавить `expect-webdriverio` в поле `types` в `tsconfig.json`.

- `"expect-webdriverio"` для всех, кроме пользователей Jasmine/Jest.
- `"expect-webdriverio/jasmine"` для Jasmine
- `"expect-webdriverio/jest"` для Jest

## JavaScript (VSCode)

Для работы автодополнения в обычном js необходимо создать `jsconfig.json` в корне проекта и указать в нем определения типов.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Добавление собственных матчеров

Подобно тому, как `expect-webdriverio` расширяет матчеры Jasmine/Jest, вы можете добавить свои собственные матчеры.

- Для Jasmine см. документацию по [пользовательским матчерам](https://jasmine.github.io/2.5/custom_matcher.html)
- Для всех остальных см. Jest's [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers)

Пользовательские матчеры следует добавлять в хуке wdio `before`

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - пример для Jest
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Временное решение. См. https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```
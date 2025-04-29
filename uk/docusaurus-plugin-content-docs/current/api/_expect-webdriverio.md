---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---



Під час написання тестів часто потрібно перевіряти, чи відповідають значення певним умовам. `expect` надає вам доступ до ряду "матчерів", які дозволяють перевіряти різні речі на об'єктах `browser`, `element` або `mock`.

## Параметри за замовчуванням

Ці параметри за замовчуванням пов'язані з опціями [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) та [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval), встановленими в конфігурації.

Встановлюйте наведені нижче параметри лише якщо ви хочете чекати певні проміжки часу для ваших тверджень.

```js
{
    wait: 2000, // мс для очікування успішного виконання очікування
    interval: 100, // інтервал між спробами
}
```

Якщо ви хочете встановити різні таймаути та інтервали, встановіть ці параметри так:

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

### Параметри матчера

Кожен матчер може приймати кілька параметрів, які дозволяють модифікувати твердження:

##### Параметри команди

| Назва | Тип | Деталі |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | час в мс для очікування успішного виконання очікування. За замовчуванням: `3000` |
| <code><var>interval</var></code> | number | інтервал між спробами. За замовчуванням: `100` |
| <code><var>beforeAssertion</var></code> | function | функція, яка буде викликана перед виконанням твердження |
| <code><var>afterAssertion</var></code> | function | функція, яка буде викликана після виконання твердження і містить результати твердження |
| <code><var>message</var></code> | string | повідомлення користувача, яке додається перед помилкою твердження |

##### Параметри рядка

Ці параметри можна застосувати додатково до параметрів команди, коли перевіряються рядки.

| Назва | Тип | Деталі |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | застосувати `toLowerCase` для фактичного та очікуваного значень |
| <code><var>trim</var></code> | boolean | застосувати `trim` для фактичного значення |
| <code><var>replace</var></code> | Replacer \| Replacer[] | замінити частини фактичного значення, які відповідають рядку/RegExp. Замінник може бути рядком або функцією.
| <code><var>containing</var></code> | boolean | очікувати, що фактичне значення містить очікуване значення, інакше строга рівність. |
| <code><var>asString</var></code> | boolean | може бути корисним для примусового перетворення значення властивості в рядок |
| <code><var>atStart</var></code> | boolean | очікувати, що фактичне значення починається з очікуваного значення |
| <code><var>atEnd</var></code> | boolean | очікувати, що фактичне значення закінчується очікуваним значенням |
| <code><var>atIndex</var></code> | number | очікувати, що фактичне значення має очікуване значення за вказаним індексом |

##### Параметри числа

Ці параметри можна застосувати додатково до параметрів команди, коли перевіряються числа.

| Назва | Тип | Деталі |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | дорівнює |
| <code><var>lte</var></code> | number | менше або дорівнює |
| <code><var>gte</var></code> | number | більше або дорівнює |

### Обробка HTML-сутностей

HTML-сутність - це фрагмент тексту ("рядок"), який починається з амперсанда (`&`) і закінчується крапкою з комою (`;`). Сутності часто використовуються для відображення зарезервованих символів (які інакше інтерпретуються як HTML-код) та невидимих символів (таких як нерозривні пробіли, наприклад, `&nbsp;`).

Щоб знайти або взаємодіяти з таким елементом, використовуйте Unicode-еквівалент сутності. Наприклад:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Ви можете знайти всі Unicode-посилання в [HTML-специфікації](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Примітка:** Unicode нечутливий до регістру, тому обидва варіанти `\u00a0` та `\u00A0` працюватимуть. Щоб знайти елемент в інспекторі браузера, видаліть `u` з Unicode, наприклад: `div[data="Some\00a0Value"]`

## Матчери для браузера

### toHaveUrl

Перевіряє, чи знаходиться браузер на певній сторінці.

##### Використання

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Використання

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Перевіряє, чи має веб-сайт певний заголовок.

##### Використання

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Перевіряє, чи має браузер певний текст, збережений у буфері обміну.

##### Використання

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Матчери для елементів

### toBeDisplayed

Викликає [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) для вказаного елемента.

##### Використання

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Викликає [`isExisting`](https://webdriver.io/docs/api/element/isExisting) для вказаного елемента.

##### Використання

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

Те саме, що і `toExist`.

##### Використання

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

Те саме, що і `toExist`.

##### Використання

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Перевіряє, чи має елемент фокус. Це твердження працює тільки в веб-контексті.

##### Використання

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Перевіряє, чи має елемент певний атрибут з певним значенням.

##### Використання

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

Те саме, що і `toHaveAttribute`.

##### Використання

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Перевіряє, чи має елемент певний клас. Також може бути викликаний з масивом як параметром, коли елемент може мати кілька класів.

##### Використання

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Перевіряє, чи має елемент певну властивість.

##### Використання

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Перевіряє, чи має елемент введення певне значення.

##### Використання

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Перевіряє, чи можна натиснути на елемент, викликаючи [`isClickable`](https://webdriver.io/docs/api/element/isClickable) для елемента.

##### Використання

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Перевіряє, чи вимкнено елемент, викликаючи [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) для елемента.

##### Використання

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// те саме, що
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Перевіряє, чи ввімкнено елемент, викликаючи [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) для елемента.

##### Використання

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// те саме, що
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Перевіряє, чи вибрано елемент, викликаючи [`isSelected`](https://webdriver.io/docs/api/element/isSelected) для елемента.

##### Використання

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

Те саме, що і `toBeSelected`.

##### Використання

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Перевіряє, чи має елемент певну обчислену WAI-ARIA мітку. Також може бути викликаний з масивом як параметром у випадку, коли елемент може мати різні мітки.

##### Використання

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Використання

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Перевіряє, чи має елемент певну обчислену WAI-ARIA роль. Також може бути викликаний з масивом як параметром у випадку, коли елемент може мати різні ролі.

##### Використання

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Використання

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Перевіряє, чи має елемент посилання певний цільовий URL.

##### Використання

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

Те саме, що і `toHaveHref`.

##### Використання

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Перевіряє, чи має елемент певний атрибут `id`.

##### Використання

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Перевіряє, чи має елемент певний текст. Також може бути викликаний з масивом як параметром у випадку, коли елемент може мати різні тексти.

##### Використання

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

У випадку, якщо в div є список елементів:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Ви можете перевірити їх, використовуючи масив:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Перевіряє, чи має елемент певний HTML. Також може бути викликаний з масивом як параметром у випадку, коли елемент може мати різні HTML.

##### Використання

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Використання

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Перевіряє, чи знаходиться елемент у видимій частині вікна, викликаючи [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) для елемента.

##### Використання

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Перевіряє кількість дочірніх елементів елемента, викликаючи команду `element.$('./*')`.

##### Використання

```js
const list = await $('ul')
await expect(list).toHaveChildren() // список має принаймні один елемент
// те саме, що
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // список має 3 елементи
// те саме, що 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Перевіряє, чи має елемент певну ширину.

##### Використання

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Перевіряє, чи має елемент певну висоту.

##### Використання

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Перевіряє, чи має елемент певний розмір.

##### Використання

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Перевіряє кількість отриманих елементів, використовуючи команду [`$$`](https://webdriver.io/docs/api/element/$).

**Примітка:** Цей матчер оновить переданий масив останніми елементами, якщо твердження пройде. Однак, якщо ви перепризначили змінну, вам потрібно буде отримати елементи знову.

##### Використання

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 елементів у списку

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// те саме, що
assert.ok(listItems.length <= 10)
```

## Матчери для мережі

### toBeRequested

Перевіряє, що мок був викликаний

##### Використання

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Перевіряє, що мок був викликаний очікувану кількість разів

##### Використання

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // запит викликаний принаймні 5 разів, але менше ніж 11
```

### toBeRequestedWith

Перевіряє, що мок був викликаний відповідно до очікуваних параметрів.

Більшість опцій підтримує часткові матчери expect/jasmine, такі як [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Використання

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [опціонально] string | function | custom matcher
    method: 'POST',                                 // [опціонально] string | array
    statusCode: 200,                                // [опціонально] number | array
    requestHeaders: { Authorization: 'foo' },       // [опціонально] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [опціонально] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [опціонально] object | function | custom matcher
    response: { success: true },                    // [опціонально] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // або POST, або PUT
    statusCode: [401, 403],  // або 401, або 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Матчер для знімків (snapshots)

WebdriverIO підтримує базові тести з використанням знімків, а також тести DOM-знімків.

### toMatchSnapshot

Перевіряє, чи відповідає будь-який довільний об'єкт певному значенню. Якщо ви передаєте [`WebdriverIO.Element`](https://webdriver.io/docs/api/element), він автоматично зробить знімок стану [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML).

##### Використання

```js
// знімок довільних об'єктів (тут не потрібно "await")
expect({ foo: 'bar' }).toMatchSnapshot()
// знімок `outerHTML` WebdriverIO.Element (DOM-знімок, потрібно "await")
await expect($('elem')).toMatchSnapshot()
// знімок результату команди елемента
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

Аналогічно, ви можете використовувати `toMatchInlineSnapshot()` для зберігання знімка прямо в тестовому файлі. Наприклад:

```js
await expect($('img')).toMatchInlineSnapshot()
```

Замість створення файлу знімка, WebdriverIO модифікує тестовий файл безпосередньо, щоб оновити знімок як рядок:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Матчери для візуальних знімків

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

Наступні матчери реалізовані як частина плагіна `@wdio/visual-service` і доступні лише тоді, коли налаштовано сервіс. Переконайтеся, що ви правильно виконали [інструкції з налаштування](https://webdriver.io/docs/visual-testing).

### toMatchElementSnapshot

Перевіряє, чи вказаний елемент відповідає знімку в базовій лінії.

##### Використання

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // options
})
```

Очікуваний результат за замовчуванням `0`, тому ви можете написати те ж твердження як:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // options
})
```

або взагалі не передавати жодних опцій:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Перевіряє, чи поточний екран відповідає знімку в базовій лінії.

##### Використання

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // options
})
```

Очікуваний результат за замовчуванням `0`, тому ви можете написати те ж твердження як:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // options
})
```

або взагалі не передавати жодних опцій:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Перевіряє, чи знімок всієї сторінки відповідає знімку в базовій лінії.

##### Використання

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // options
})
```

Очікуваний результат за замовчуванням `0`, тому ви можете написати те ж твердження як:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // options
})
```

або взагалі не передавати жодних опцій:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Перевіряє, чи знімок всієї сторінки, включаючи позначки вкладок, відповідає знімку в базовій лінії.

##### Використання

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // options
})
```

Очікуваний результат за замовчуванням `0`, тому ви можете написати те ж твердження як:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // options
})
```

або взагалі не передавати жодних опцій:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Використання регулярних виразів

Ви також можете безпосередньо використовувати регулярні вирази для всіх матчерів, які виконують порівняння тексту.

##### Використання

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Матчери за замовчуванням

Окрім матчерів `expect-webdriverio`, ви можете використовувати вбудовані твердження Jest [expect](https://jestjs.io/docs/en/expect) або [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) для Jasmine.

## Асиметричні матчери

WebdriverIO підтримує використання асиметричних матчерів скрізь, де ви порівнюєте текстові значення, наприклад:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

або

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Якщо ви використовуєте [WDIO Testrunner](https://webdriver.io/docs/clioptions), все буде налаштовано автоматично. Просто дотримуйтесь [інструкції з налаштування](https://webdriver.io/docs/typescript#framework-setup) з документації. Однак, якщо ви запускаєте WebdriverIO з іншим тестраннером або в простому скрипті Node.js, вам потрібно додати `expect-webdriverio` до `types` в `tsconfig.json`.

- `"expect-webdriverio"` для всіх, крім користувачів Jasmine/Jest.
- `"expect-webdriverio/jasmine"` для Jasmine
- `"expect-webdriverio/jest"` для Jest

## JavaScript (VSCode)

Для роботи автозаповнення в звичайному js необхідно створити `jsconfig.json` в корені проекту і посилатися на визначення типів.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Додавання власних матчерів

Подібно до того, як `expect-webdriverio` розширює матчери Jasmine/Jest, можна додавати власні матчери.

- Для Jasmine див. документацію [custom matchers](https://jasmine.github.io/2.5/custom_matcher.html)
- Для всіх інших див. документацію Jest's [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers)

Власні матчери слід додавати в хук `before` wdio

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
// myMatchers.js - Jest example
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Temporary workaround. See https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```
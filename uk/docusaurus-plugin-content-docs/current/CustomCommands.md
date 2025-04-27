---
id: customcommands
title: Користувацькі команди
---

Якщо ви хочете розширити екземпляр `browser` власним набором команд, метод браузера `addCommand` створений для вас. Ви можете написати свою команду в асинхронному стилі, так само як і в ваших тестах.

## Параметри

### Назва команди

Ім'я, яке визначає команду та буде прикріплене до об'єкту браузера або елемента.

Тип: `String`

### Користувацька функція

Функція, яка виконується при виклику команди. Контекст `this` - це або [`WebdriverIO.Browser`](/docs/api/browser), або [`WebdriverIO.Element`](/docs/api/element), залежно від того, чи команда прикріплюється до області браузера чи елемента.

Тип: `Function`

### Цільова область

Прапорець для визначення, чи приєднувати команду до області браузера чи елемента. Якщо встановлено значення `true`, команда буде командою елемента.

Тип: `Boolean`<br />
За замовчуванням: `false`

## Приклади

Цей приклад показує, як додати нову команду, яка повертає поточний URL та заголовок як один результат. Область видимості (`this`) - це об'єкт [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` посилається на об'єкт `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Крім того, ви можете розширити екземпляр елемента своїм набором команд, передаючи `true` як останній аргумент. Контекст (`this`) у цьому випадку - це об'єкт [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` є повернутим значенням $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

Користувацькі команди дають вам можливість об'єднати певну послідовність команд, які ви часто використовуєте, в один виклик. Ви можете визначати користувацькі команди в будь-якій точці вашого тестового набору; просто переконайтеся, що команда визначена *до* її першого використання. (Хук `before` у вашому `wdio.conf.js` - це одне хороше місце для їх створення.)

Після визначення ви можете використовувати їх наступним чином:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Примітка:__ Якщо ви реєструєте користувацьку команду в області видимості `browser`, команда не буде доступна для елементів. Так само, якщо ви реєструєте команду в області видимості елемента, вона не буде доступна в області видимості `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // виводить "function"
console.log(typeof elem.myCustomBrowserCommand()) // виводить "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // виводить "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // виводить "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // виводить "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // виводить "2"
```

__Примітка:__ Якщо вам потрібно зв'язати користувацьку команду, команда повинна закінчуватися `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Будьте обережні, щоб не перевантажувати область видимості `browser` занадто великою кількістю користувацьких команд.

Ми рекомендуємо визначати користувацьку логіку в [об'єктах сторінок](pageobjects), щоб вони були прив'язані до конкретної сторінки.

### Multiremote

`addCommand` працює подібним чином для multiremote, за винятком того, що нова команда буде поширюватися на дочірні екземпляри. Ви повинні бути уважними при використанні об'єкта `this`, оскільки multiremote `browser` та його дочірні екземпляри мають різні `this`.

Цей приклад показує, як додати нову команду для multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` посилається на:
    //      - область MultiRemoteBrowser для браузера
    //      - область Browser для екземплярів
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Розширення визначень типів

З TypeScript легко розширювати інтерфейси WebdriverIO. Додайте типи до ваших користувацьких команд таким чином:

1. Створіть файл визначення типів (наприклад, `./src/types/wdio.d.ts`)
2. a. Якщо використовуєте файл визначення типів у стилі модуля (використовуючи import/export та `declare global WebdriverIO` у файлі визначення типів), переконайтеся, що шлях до файлу включено до властивості `include` у `tsconfig.json`.

   b. Якщо використовуєте файли визначення типів у середовищі (без import/export у файлах визначення типів та `declare namespace WebdriverIO` для користувацьких команд), переконайтеся, що `tsconfig.json` *не* містить жодного розділу `include`, оскільки це призведе до того, що всі файли визначення типів, не перелічені в розділі `include`, не будуть розпізнані typescript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. Додайте визначення для ваших команд відповідно до вашого режиму виконання.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## Інтеграція сторонніх бібліотек

Якщо ви використовуєте зовнішні бібліотеки (наприклад, для виконання запитів до бази даних), які підтримують проміси, хорошим підходом до їх інтеграції є обгортання певних методів API за допомогою користувацької команди.

При поверненні проміса WebdriverIO гарантує, що він не продовжить виконання наступної команди, доки проміс не буде вирішено. Якщо проміс відхиляється, команда видасть помилку.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Потім просто використовуйте його у ваших тестових специфікаціях WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // повертає тіло відповіді
})
```

**Примітка:** Результатом вашої користувацької команди є результат проміса, який ви повертаєте.

## Перевизначення команд

Ви також можете перевизначати нативні команди за допомогою `overwriteCommand`.

Не рекомендується це робити, оскільки це може призвести до непередбачуваної поведінки фреймворку!

Загальний підхід схожий на `addCommand`, єдина відмінність полягає в тому, що перший аргумент у функції команди - це оригінальна функція, яку ви збираєтеся перевизначити. Будь ласка, ознайомтеся з деякими прикладами нижче.

### Перевизначення команд браузера

```js
/**
 * виводить мілісекунди перед паузою та повертає її значення.
 */
// 'pause'            - назва команди, яка буде перевизначена
// origPauseFunction  - оригінальна функція паузи
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// потім використовуйте як раніше
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Перевизначення команд елементів

Перевизначення команд на рівні елемента майже таке саме. Просто передайте `true` як третій аргумент до `overwriteCommand`:

```js
/**
 * Спроба прокрутити до елемента, якщо він не клікабельний.
 * Передайте { force: true }, щоб клікнути за допомогою JS, навіть якщо елемент не видимий або не клікабельний.
 */
// 'click'            - назва команди, яка буде перевизначена
// origClickFunction  - оригінальна функція кліку
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // спроба клікнути
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // прокрутка до елемента і повторний клік
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // клік за допомогою js
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // не забудьте передати `true` як 3-й аргумент

// потім використовуйте як раніше
const elem = await $('body')
await elem.click()

// або передайте параметри
await elem.click({ force: true })
```

## Додати більше команд WebDriver

Якщо ви використовуєте протокол WebDriver і запускаєте тести на платформі, яка підтримує додаткові команди, не визначені жодним із визначень протоколу в [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), ви можете вручну додати їх через інтерфейс `addCommand`. Пакет `webdriver` пропонує обгортку команди, яка дозволяє реєструвати ці нові кінцеві точки так само, як і інші команди, забезпечуючи ті самі перевірки параметрів та обробку помилок. Щоб зареєструвати цю нову кінцеву точку, імпортуйте обгортку команди та зареєструйте нову команду з нею наступним чином:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

Виклик цієї команди з неправильними параметрами призводить до такої ж обробки помилок, як і для попередньо визначених команд протоколу, наприклад:

```js
// виклик команди без обов'язкового параметра url та корисного навантаження
await browser.myNewCommand()

/**
 * результат наступної помилки:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

Правильний виклик команди, наприклад `browser.myNewCommand('foo', 'bar')`, правильно робить запит WebDriver до, наприклад, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` з корисним навантаженням, як-от `{ foo: 'bar' }`.

:::note
Параметр URL-адреси `:sessionId` буде автоматично замінений ідентифікатором сеансу сеансу WebDriver. Інші параметри URL можна застосувати, але їх потрібно визначити в `variables`.
:::

Дивіться приклади того, як можна визначити команди протоколу в пакеті [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).
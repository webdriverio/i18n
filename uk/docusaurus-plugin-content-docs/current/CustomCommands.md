---
id: customcommands
title: Власні команди
---

Якщо ви хочете розширити екземпляр `browser` власним набором команд, метод браузера `addCommand` створений саме для цього. Ви можете написати свою команду в асинхронному стилі, так само як і у ваших специфікаціях.

## Параметри

### Назва команди

Назва, яка визначає команду і буде прикріплена до області видимості браузера або елемента.

Тип: `String`

### Користувацька функція

Функція, яка виконується при виклику команди. Область видимості `this` - це або [`WebdriverIO.Browser`](/docs/api/browser), або [`WebdriverIO.Element`](/docs/api/element), залежно від того, чи прикріплюється команда до області видимості браузера або елемента.

Тип: `Function`

### Цільова область

Прапорець для визначення, чи прикріплювати команду до області видимості браузера або елемента. Якщо встановлено значення `true`, команда буде командою елемента.

Тип: `Boolean`<br />
За замовчуванням: `false`

## Приклади

Цей приклад показує, як додати нову команду, яка повертає поточний URL та заголовок як один результат. Область видимості (`this`) - це об'єкт [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` відноситься до області видимості `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Крім того, ви можете розширити екземпляр елемента власним набором команд, передавши `true` як останній аргумент. Область видимості (`this`) у цьому випадку - це об'єкт [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` є результатом виклику $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

Власні команди дають вам можливість об'єднати певну послідовність команд, які ви часто використовуєте, в один виклик. Ви можете визначати власні команди в будь-якій точці вашого тестового набору; просто переконайтеся, що команда визначена *до* її першого використання. (Хук `before` у вашому `wdio.conf.js` - це одне з хороших місць для їх створення.)

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

__Примітка:__ Якщо ви реєструєте власну команду в області видимості `browser`, команда не буде доступна для елементів. Аналогічно, якщо ви реєструєте команду в області видимості елемента, вона не буде доступна в області видимості `browser`:

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

__Примітка:__ Якщо вам потрібно створити ланцюжок власних команд, команда повинна закінчуватися на `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Будьте обережні, щоб не перевантажити область видимості `browser` занадто великою кількістю власних команд.

Ми рекомендуємо визначати власну логіку в [об'єктах сторінок](pageobjects), щоб вони були прив'язані до конкретної сторінки.

### Multiremote

`addCommand` працює аналогічним чином для multiremote, за винятком того, що нова команда буде поширюватися на дочірні екземпляри. Ви повинні бути уважними при використанні об'єкта `this`, оскільки multiremote `browser` та його дочірні екземпляри мають різні `this`.

Цей приклад показує, як додати нову команду для multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` відноситься до:
    //      - області видимості MultiRemoteBrowser для браузера
    //      - області видимості Browser для екземплярів
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

З TypeScript легко розширити інтерфейси WebdriverIO. Додайте типи до ваших власних команд наступним чином:

1. Створіть файл визначення типу (наприклад, `./src/types/wdio.d.ts`)
2. a. Якщо використовується файл визначення типу в стилі модуля (з import/export та `declare global WebdriverIO` у файлі визначення типу), переконайтеся, що шлях до файлу включений у властивість `include` файлу `tsconfig.json`.

   b. Якщо використовуються файли визначення типу в стилі ambient (без import/export у файлах визначення типу та `declare namespace WebdriverIO` для власних команд), переконайтеся, що `tsconfig.json` *не* містить жодного розділу `include`, оскільки це призведе до того, що всі файли визначення типу, не перелічені в розділі `include`, не будуть розпізнані typescript.

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

3. Додайте визначення для ваших команд відповідно до режиму виконання.

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

Якщо ви використовуєте зовнішні бібліотеки (наприклад, для виклику бази даних), які підтримують проміси, гарним підходом до їх інтеграції є обгортання певних методів API у власну команду.

При поверненні промісу WebdriverIO гарантує, що він не продовжить виконання наступної команди, доки проміс не буде вирішений. Якщо проміс відхиляється, команда викине помилку.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Потім просто використовуйте це у ваших тестових специфікаціях WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // повертає тіло відповіді
})
```

**Примітка:** Результатом вашої власної команди є результат промісу, який ви повертаєте.

## Перевизначення команд

Ви також можете перевизначити нативні команди за допомогою `overwriteCommand`.

Не рекомендується це робити, оскільки це може призвести до непередбачуваної поведінки фреймворку!

Загальний підхід схожий на `addCommand`, єдина відмінність полягає в тому, що перший аргумент у функції команди - це оригінальна функція, яку ви збираєтеся перевизначити. Будь ласка, перегляньте кілька прикладів нижче.

### Перевизначення команд браузера

```js
/**
 * Виводить мілісекунди перед паузою та повертає їх значення.
 * 
 * @param pause - назва команди, яку треба перевизначити
 * @param this of func - оригінальний екземпляр браузера, на якому була викликана функція
 * @param originalPauseFunction of func - оригінальна функція паузи
 * @param ms of func - фактичні передані параметри
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// потім використовуйте як раніше
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Перевизначення команд елемента

Перевизначення команд на рівні елемента майже однакове. Просто передайте `true` як третій аргумент до `overwriteCommand`:

```js
/**
 * Спроба прокрутити до елемента, якщо він не клікабельний.
 * Передайте { force: true }, щоб клікнути за допомогою JS навіть якщо елемент не видимий або не клікабельний.
 * Показати, що тип аргументу оригінальної функції можна зберегти з `options?: ClickOptions`
 *
 * @param this of func - елемент, на якому була викликана оригінальна функція
 * @param originalClickFunction of func - оригінальна функція кліку
 * @param options of func - фактично передані параметри
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // спроба клікнути
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // прокрутка до елемента і повторний клік
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // клік за допомогою js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    true, // не забудьте передати `true` як 3-й аргумент
)

// потім використовуйте як раніше
const elem = await $('body')
await elem.click()

// або передайте параметри
await elem.click({ force: true })
```

## Додавання більше команд WebDriver

Якщо ви використовуєте протокол WebDriver і запускаєте тести на платформі, яка підтримує додаткові команди, не визначені жодним з визначень протоколу в [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), ви можете вручну додати їх через інтерфейс `addCommand`. Пакет `webdriver` пропонує обгортку команди, яка дозволяє реєструвати ці нові кінцеві точки таким самим чином, як і інші команди, забезпечуючи такі ж перевірки параметрів та обробку помилок. Для реєстрації цієї нової кінцевої точки імпортуйте обгортку команди та зареєструйте нову команду з нею наступним чином:

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

Виклик цієї команди з недійсними параметрами призводить до такої ж обробки помилок, як і для попередньо визначених команд протоколу, наприклад:

```js
// виклик команди без необхідного параметра URL та корисного навантаження
await browser.myNewCommand()

/**
 * призводить до наступної помилки:
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

Правильний виклик команди, наприклад `browser.myNewCommand('foo', 'bar')`, правильно робить запит WebDriver до, наприклад, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` з корисним навантаженням типу `{ foo: 'bar' }`.

:::note
Параметр URL `:sessionId` буде автоматично замінений ідентифікатором сесії сесії WebDriver. Можуть бути застосовані інші параметри URL, але вони повинні бути визначені в `variables`.
:::

Приклади того, як можуть бути визначені команди протоколу, дивіться в пакеті [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).
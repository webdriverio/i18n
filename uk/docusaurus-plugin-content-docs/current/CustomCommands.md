---
id: customcommands
title: Кастомні команди
---

Якщо ви хочете розширити екземпляр `browser` власним набором команд, метод `addCommand` саме для цього. Ви можете писати свої команди асинхронно, як і у своїх специфікаціях.

## Параметри

### Назва команди

Назва, яка визначає команду і буде приєднана до області видимості браузера або елемента.

Тип: `String`

### Користувацька функція

Функція, яка виконується при виклику команди. Об'єкт `this` - це [`WebdriverIO.Browser`](/docs/api/browser) або [`WebdriverIO.Element`](/docs/api/element) залежно від того, чи команда приєднується до області браузера чи елемента.

Тип: `Function`

### Опції

Об'єкт з параметрами конфігурації, які змінюють поведінку користувацької команди

#### Цільова область

Прапорець, що визначає, чи приєднати команду до області браузера або елемента. Якщо встановлено значення `true`, команда буде командою елемента.

Назва опції: `attachToElement`
Тип: `Boolean`<br />
За замовчуванням: `false`

#### Відключення неявного очікування

Прапорець, що вирішує, чи неявно чекати на існування елемента перед викликом користувацької команди.

Назва опції: `disableElementImplicitWait`
Тип: `Boolean`<br />
За замовчуванням: `false`

## Приклади

Цей приклад показує, як додати нову команду, яка повертає поточний URL та заголовок як один результат. Область видимості (`this`) – це об'єкт [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` посилається на область `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Крім того, ви можете розширити екземпляр елемента власним набором команд, передавши `true` як останній аргумент. Область видимості (`this`) у цьому випадку – це об'єкт [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` - це повернене значення $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

За замовчуванням, користувацькі команди елементів чекають на існування елемента перед викликом користувацької команди. Хоча здебільшого це бажано, за потреби це можна відключити за допомогою `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` - це повернене значення $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Користувацькі команди дають можливість об'єднати певну послідовність команд, які ви часто використовуєте, в один виклик. Ви можете визначити користувацькі команди в будь-якій точці вашого набору тестів; просто переконайтеся, що команда визначена *перед* її першим використанням. (Хук `before` у вашому `wdio.conf.js` - хороше місце для їх створення.)

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

__Примітка:__ Якщо ви зареєструєте користувацьку команду в області `browser`, вона не буде доступною для елементів. Так само, якщо ви зареєструєте команду в області елемента, вона не буде доступною в області `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // виводить "function"
console.log(typeof elem.myCustomBrowserCommand()) // виводить "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // виводить "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // виводить "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // виводить "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // виводить "2"
```

__Примітка:__ Якщо вам потрібно ланцюгово викликати користувацьку команду, команда повинна закінчуватися на `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Будьте обережні, щоб не перевантажити область `browser` занадто великою кількістю користувацьких команд.

Ми рекомендуємо визначати користувацьку логіку в [об'єктах сторінок](pageobjects), щоб вони були прив'язані до конкретної сторінки.

### Multiremote

`addCommand` працює подібним чином для multiremote, за винятком того, що нова команда поширюється на дочірні екземпляри. Ви повинні бути уважні при використанні об'єкта `this`, оскільки multiremote `browser` та його дочірні екземпляри мають різні `this`.

Цей приклад показує, як додати нову команду для multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` посилається на:
    //      - MultiRemoteBrowser scope для браузера
    //      - Browser scope для екземплярів
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

З TypeScript легко розширити інтерфейси WebdriverIO. Додайте типи до ваших користувацьких команд таким чином:

1. Створіть файл визначення типу (наприклад, `./src/types/wdio.d.ts`)
2. a. Якщо ви використовуєте файл визначення типу у стилі модуля (використовуючи import/export та `declare global WebdriverIO` у файлі визначення типу), переконайтеся, що шлях до файлу включено у властивість `include` файлу `tsconfig.json`.

   b. Якщо ви використовуєте файли визначення типів у стилі ambient (без import/export у файлах визначення типів і `declare namespace WebdriverIO` для користувацьких команд), переконайтеся, що `tsconfig.json` *не* містить жодного розділу `include`, оскільки це призведе до того, що всі файли визначення типів, не перераховані у розділі `include`, не будуть розпізнаватися TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Модулі (з import/export)', value: 'modules'},
    {label: 'Ambient визначення типів (без tsconfig include)', value: 'ambient'},
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
    {label: 'Модулі (з import/export)', value: 'modules'},
    {label: 'Ambient визначення типів', value: 'ambient'},
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

Якщо ви використовуєте зовнішні бібліотеки (наприклад, для виклику бази даних), які підтримують проміси, хорошим підходом для їх інтеграції є обгортання певних методів API за допомогою користувацької команди.

Повертаючи проміс, WebdriverIO гарантує, що він не продовжить виконання наступної команди, поки проміс не буде вирішено. Якщо проміс відхилено, команда видасть помилку.

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

**Примітка:** Результатом вашої користувацької команди є результат промісу, який ви повертаєте.

## Перевизначення команд

Ви також можете перевизначити нативні команди за допомогою `overwriteCommand`.

Не рекомендується робити це, оскільки це може призвести до непередбачуваної поведінки фреймворку!

Загальний підхід подібний до `addCommand`, єдиною відмінністю є те, що перший аргумент у функції команди - це оригінальна функція, яку ви збираєтеся перевизначити. Будь ласка, подивіться приклади нижче.

### Перевизначення команд браузера

```js
/**
 * Друкує мілісекунди перед паузою і повертає їх значення.
 * 
 * @param pause - назва команди, яку слід перевизначити
 * @param this of func - оригінальний екземпляр браузера, на якому викликана функція
 * @param originalPauseFunction of func - оригінальна функція паузи
 * @param ms of func - фактичні передані параметри
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// потім використовуйте як і раніше
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Перевизначення команд елементів

Перевизначення команд на рівні елемента майже таке ж. Просто передайте `true` як третій аргумент до `overwriteCommand`:

```js
/**
 * Спробує прокрутити до елемента, якщо він не клікабельний.
 * Передайте { force: true }, щоб клікнути за допомогою JS, навіть якщо елемент не видимий або не клікабельний.
 * Показує, що тип оригінального аргументу функції можна зберегти за допомогою `options?: ClickOptions`
 *
 * @param this of func - елемент, на якому була викликана оригінальна функція
 * @param originalClickFunction of func - оригінальна функція паузи
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

                    // прокручуємо до елемента і клікаємо знову
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
    { attachToElement: true }, // Не забудьте прикріпити до елемента
)

// потім використовуйте як і раніше
const elem = await $('body')
await elem.click()

// або передайте параметри
await elem.click({ force: true })
```

## Додавання додаткових команд WebDriver

Якщо ви використовуєте протокол WebDriver і запускаєте тести на платформі, яка підтримує додаткові команди, не визначені жодним із визначень протоколу в [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), ви можете вручну додати їх через інтерфейс `addCommand`. Пакет `webdriver` пропонує обгортку для команд, яка дозволяє реєструвати ці нові кінцеві точки так само, як інші команди, забезпечуючи такі самі перевірки параметрів та обробку помилок. Щоб зареєструвати цю нову кінцеву точку, імпортуйте обгортку команди та зареєструйте нову команду з нею наступним чином:

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

Виклик цієї команди з недійсними параметрами призводить до такої ж обробки помилок, як і визначені заздалегідь команди протоколу, наприклад:

```js
// виклик команди без обов'язкового параметра URL та корисного навантаження
await browser.myNewCommand()

/**
 * результат у наступній помилці:
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

Правильний виклик команди, наприклад `browser.myNewCommand('foo', 'bar')`, коректно робить запит WebDriver до, наприклад, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` з корисним навантаженням на зразок `{ foo: 'bar' }`.

:::note
Параметр URL `:sessionId` буде автоматично замінено ідентифікатором сеансу сеансу WebDriver. Інші параметри URL можуть бути застосовані, але потрібно визначити їх у межах `variables`.
:::

Приклади того, як можна визначити команди протоколу, дивіться в пакеті [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).
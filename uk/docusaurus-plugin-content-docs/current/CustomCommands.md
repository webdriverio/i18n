---
id: customcommands
title: Користувацькі команди
---

Якщо ви хочете розширити екземпляр `browser` власним набором команд, метод браузера `addCommand` створений для цього. Ви можете написати свою команду асинхронно, так само як у ваших тестах.

## Параметри

### Назва команди

Назва, яка визначає команду і буде приєднана до області видимості браузера або елемента.

Тип: `String`

### Користувацька функція

Функція, яка виконується при виклику команди. Область видимості `this` - це або [`WebdriverIO.Browser`](/docs/api/browser), або [`WebdriverIO.Element`](/docs/api/element), в залежності від того, чи прикріплюється команда до області видимості браузера чи елемента.

Тип: `Function`

### Опції

Об'єкт з опціями конфігурації, що змінюють поведінку користувацької команди

#### Цільова область

Прапорець для визначення, чи прикріплювати команду до області видимості браузера або елемента. Якщо встановлено `true`, команда буде командою елемента.

Назва опції: `attachToElement`
Тип: `Boolean`<br />
За замовчуванням: `false`

#### Відключення implicitWait

Прапорець для визначення, чи чекати неявно на існування елемента перед викликом користувацької команди.

Назва опції: `disableElementImplicitWait`
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
}, { attachToElement: true })
```

За замовчуванням, користувацькі команди елементів чекають, поки елемент не існуватиме, перш ніж викликати користувацьку команду. Хоча в більшості випадків це бажано, за потреби можна вимкнути за допомогою `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` є результатом виклику $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Користувацькі команди дають вам можливість об'єднати певну послідовність команд, які ви часто використовуєте, в один виклик. Ви можете визначати користувацькі команди в будь-який момент у вашому наборі тестів; просто переконайтеся, що команда визначена *до* її першого використання. (Хук `before` у вашому `wdio.conf.js` - одне добре місце для їх створення.)

Після визначення ви можете використовувати їх таким чином:

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

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // виводить "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // виводить "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // виводить "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // виводить "2"
```

__Примітка:__ Якщо вам потрібно об'єднати користувацьку команду в ланцюжок, команда повинна закінчуватися символом `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Будьте обережні, щоб не перевантажити область видимості `browser` надто багатьма користувацькими командами.

Ми рекомендуємо визначати користувацьку логіку в [об'єктах сторінок](pageobjects), щоб вони були прив'язані до конкретної сторінки.

### Multiremote

`addCommand` працює аналогічно для multiremote, за винятком того, що нова команда поширюватиметься на дочірні екземпляри. Ви повинні бути уважними при використанні об'єкта `this`, оскільки multiremote `browser` та його дочірні екземпляри мають різні `this`.

Цей приклад показує, як додати нову команду для multiremote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` відноситься до:
    //      - область видимості MultiRemoteBrowser для браузера
    //      - область видимості Browser для екземплярів
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
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

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Розширення визначень типів

З TypeScript легко розширити інтерфейси WebdriverIO. Додайте типи до ваших користувацьких команд так:

1. Створіть файл визначення типів (наприклад, `./src/types/wdio.d.ts`)
2. a. Якщо використовуєте файл визначення типів в стилі модуля (з import/export і `declare global WebdriverIO` у файлі визначення типів), переконайтеся, що шлях до файлу включений у властивість `include` файлу `tsconfig.json`.

   b. Якщо використовуєте файли визначення типів в амбієнтному стилі (без import/export у файлах визначення типів і `declare namespace WebdriverIO` для користувацьких команд), переконайтеся, що у `tsconfig.json` *немає* жодного розділу `include`, оскільки це призведе до того, що всі файли визначення типів, не перераховані у розділі `include`, не будуть розпізнані TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Модулі (з використанням import/export)', value: 'modules'},
    {label: 'Амбієнтні визначення типів (без include у tsconfig)', value: 'ambient'},
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
    {label: 'Модулі (з використанням import/export)', value: 'modules'},
    {label: 'Амбієнтні визначення типів', value: 'ambient'},
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

Якщо ви використовуєте зовнішні бібліотеки (наприклад, для звернення до бази даних), які підтримують проміси, хорошим підходом до їх інтеграції є обгортання певних методів API в користувацьку команду.

При поверненні промісу, WebdriverIO гарантує, що він не продовжить виконання наступної команди, поки проміс не буде вирішений. Якщо проміс відхиляється, команда видасть помилку.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Потім просто використовуйте його в ваших специфікаціях тестів WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // повертає тіло відповіді
})
```

**Примітка:** Результат вашої користувацької команди - це результат промісу, який ви повертаєте.

## Перезапис команд

Ви також можете перезаписувати нативні команди за допомогою `overwriteCommand`.

Не рекомендується робити це, оскільки це може призвести до непередбачуваної поведінки фреймворку!

Загальний підхід подібний до `addCommand`, єдина відмінність полягає в тому, що перший аргумент в функції команди - це оригінальна функція, яку ви збираєтеся перезаписати. Будь ласка, перегляньте деякі приклади нижче.

### Перезапис команд браузера

```js
/**
 * Виводить мілісекунди перед паузою і повертає їх значення.
 *
 * @param pause - назва команди, яка буде перезаписана
 * @param this функції - оригінальний екземпляр браузера, на якому викликана функція
 * @param originalPauseFunction функції - оригінальна функція паузи
 * @param ms функції - фактичні передані параметри
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// потім використовуйте як раніше
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Перезапис команд елемента

Перезапис команд на рівні елемента майже такий самий. Просто передайте `true` як третій аргумент до `overwriteCommand`:

```js
/**
 * Спроба прокрутити до елемента, якщо він не клікабельний.
 * Передайте { force: true }, щоб клікнути за допомогою JS, навіть якщо елемент не видимий або не клікабельний.
 * Показує, що тип аргументу оригінальної функції можна зберегти з `options?: ClickOptions`
 *
 * @param this функції - елемент, на якому викликана оригінальна функція
 * @param originalClickFunction функції - оригінальна функція паузи
 * @param options функції - фактичні передані параметри
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // спроба кліку
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

        // клік з використанням js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Не забудьте прикріпити до елемента
)

// потім використовуйте як раніше
const elem = await $('body')
await elem.click()

// або передайте параметри
await elem.click({ force: true })
```

## Додавання більше команд WebDriver

Якщо ви використовуєте протокол WebDriver і запускаєте тести на платформі, яка підтримує додаткові команди, не визначені в жодному з визначень протоколу в [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), ви можете вручну додати їх через інтерфейс `addCommand`. Пакет `webdriver` пропонує обгортку команди, яка дозволяє реєструвати ці нові кінцеві точки так само, як інші команди, забезпечуючи такі ж перевірки параметрів та обробку помилок. Щоб зареєструвати цю нову кінцеву точку, імпортуйте обгортку команди і зареєструйте нову команду з її допомогою, як показано нижче:

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

Виклик цієї команди з недійсними параметрами призводить до тієї ж обробки помилок, що і для попередньо визначених команд протоколу, наприклад:

```js
// виклик команди без обов'язкового параметра URL та корисного навантаження
await browser.myNewCommand()

/**
 * призводить до такої помилки:
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

Правильний виклик команди, наприклад `browser.myNewCommand('foo', 'bar')`, коректно робить запит WebDriver до, наприклад, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` з корисним навантаженням на кшталт `{ foo: 'bar' }`.

:::note
Параметр URL `:sessionId` буде автоматично замінено на ідентифікатор сесії сесії WebDriver. Інші параметри URL можуть бути застосовані, але їх потрібно визначити в `variables`.
:::

Приклади того, як можуть бути визначені команди протоколу, дивіться в пакеті [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).
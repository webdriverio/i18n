---
id: customcommands
title: Пользовательские Команды
---

Если вы хотите расширить экземпляр `browser` своим собственным набором команд, метод браузера `addCommand` поможет вам в этом. Вы можете написать свою команду асинхронно, как и в ваших спецификациях.

## Параметры

### Имя команды

Имя, которое определяет команду и будет прикреплено к области видимости браузера или элемента.

Тип: `String`

### Пользовательская функция

Функция, которая выполняется при вызове команды. Область видимости `this` - это либо [`WebdriverIO.Browser`](/docs/api/browser), либо [`WebdriverIO.Element`](/docs/api/element), в зависимости от того, прикрепляется ли команда к области видимости браузера или элемента.

Тип: `Function`

### Опции

Объект с опциями конфигурации, изменяющими поведение пользовательской команды

#### Целевая область

Флаг для определения, прикреплять ли команду к области видимости браузера или элемента. Если установлено значение `true`, команда будет командой элемента.

Имя опции: `attachToElement`
Тип: `Boolean`<br />
По умолчанию: `false`

#### Отключение implicitWait

Флаг для определения, нужно ли неявно ожидать существования элемента перед вызовом пользовательской команды.

Имя опции: `disableElementImplicitWait`
Тип: `Boolean`<br />
По умолчанию: `false`

## Примеры

Этот пример показывает, как добавить новую команду, которая возвращает текущий URL и заголовок как один результат. Область видимости (`this`) - это объект [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` относится к области видимости `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Кроме того, вы можете расширить экземпляр элемента своим собственным набором команд, передав `true` в качестве последнего аргумента. Область видимости (`this`) в этом случае - объект [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` - это возвращаемое значение $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

По умолчанию пользовательские команды элементов ожидают существования элемента перед вызовом пользовательской команды. Хотя в большинстве случаев это желательно, если нет, это можно отключить с помощью `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` - это возвращаемое значение $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Пользовательские команды дают вам возможность объединить определенную последовательность часто используемых команд в один вызов. Вы можете определить пользовательские команды в любой момент вашего набора тестов; просто убедитесь, что команда определена *до* ее первого использования. (Хук `before` в вашем `wdio.conf.js` - хорошее место для их создания.)

После определения вы можете использовать их следующим образом:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Примечание:__ Если вы регистрируете пользовательскую команду в области видимости `browser`, команда не будет доступна для элементов. Аналогично, если вы регистрируете команду в области видимости элемента, она не будет доступна в области видимости `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // выводит "function"
console.log(typeof elem.myCustomBrowserCommand()) // выводит "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // выводит "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // выводит "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // выводит "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // выводит "2"
```

__Примечание:__ Если вам нужно цепочкой связывать пользовательскую команду, команда должна заканчиваться символом `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Будьте осторожны, чтобы не перегружать область видимости `browser` слишком большим количеством пользовательских команд.

Мы рекомендуем определять пользовательскую логику в [объектах страниц](pageobjects), чтобы они были привязаны к конкретной странице.

### Multiremote

`addCommand` работает аналогично для multiremote, за исключением того, что новая команда будет распространяться на дочерние экземпляры. Вы должны быть осторожны при использовании объекта `this`, так как multiremote `browser` и его дочерние экземпляры имеют разные `this`.

Этот пример показывает, как добавить новую команду для multiremote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` относится к:
    //      - MultiRemoteBrowser области для браузера
    //      - Browser области для экземпляров
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

## Расширение определений типов

С TypeScript легко расширять интерфейсы WebdriverIO. Добавьте типы к вашим пользовательским командам следующим образом:

1. Создайте файл определения типов (например, `./src/types/wdio.d.ts`)
2. a. Если вы используете файл определения типов в стиле модуля (используя import/export и `declare global WebdriverIO` в файле определения типов), убедитесь, что путь к файлу включен в свойство `include` в `tsconfig.json`.

   b. Если вы используете файлы определения типов в окружающем стиле (без import/export в файлах определения типов и `declare namespace WebdriverIO` для пользовательских команд), убедитесь, что `tsconfig.json` *не* содержит раздел `include`, так как это приведет к тому, что все файлы определения типов, не перечисленные в разделе `include`, не будут распознаны TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Модули (используя import/export)', value: 'modules'},
    {label: 'Окружающие определения типов (без include в tsconfig)', value: 'ambient'},
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

3. Добавьте определения для ваших команд в соответствии с режимом выполнения.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Модули (используя import/export)', value: 'modules'},
    {label: 'Окружающие определения типов', value: 'ambient'},
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

## Интеграция сторонних библиотек

Если вы используете внешние библиотеки (например, для вызовов базы данных), которые поддерживают промисы, хорошим подходом для их интеграции является обертывание определенных методов API с помощью пользовательской команды.

При возвращении промиса WebdriverIO гарантирует, что он не продолжит выполнение следующей команды, пока промис не будет разрешен. Если промис отклоняется, команда выбросит ошибку.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Затем просто используйте это в ваших тестовых спецификациях WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // возвращает тело ответа
})
```

**Примечание:** Результат вашей пользовательской команды - это результат промиса, который вы возвращаете.

## Переопределение команд

Вы также можете переопределить встроенные команды с помощью `overwriteCommand`.

Не рекомендуется делать это, так как это может привести к непредсказуемому поведению фреймворка!

Общий подход аналогичен `addCommand`, единственное отличие в том, что первым аргументом в функции команды является оригинальная функция, которую вы собираетесь переопределить. Пожалуйста, посмотрите примеры ниже.

### Переопределение команд браузера

```js
/**
 * Выводит миллисекунды перед паузой и возвращает их значение.
 *
 * @param pause - имя команды, которую нужно переопределить
 * @param this функции - оригинальный экземпляр браузера, на котором была вызвана функция
 * @param originalPauseFunction функции - оригинальная функция паузы
 * @param ms функции - фактически переданные параметры
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// затем используйте как раньше
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Переопределение команд элемента

Переопределение команд на уровне элемента почти такое же. Просто передайте `true` в качестве третьего аргумента для `overwriteCommand`:

```js
/**
 * Попытка прокрутки к элементу, если он не кликабелен.
 * Передайте { force: true }, чтобы кликнуть с помощью JS, даже если элемент не виден или не кликабелен.
 * Показывает, что тип аргумента оригинальной функции может быть сохранен с помощью `options?: ClickOptions`
 *
 * @param this функции - элемент, на котором была вызвана оригинальная функция
 * @param originalClickFunction функции - оригинальная функция клика
 * @param options функции - фактически переданные параметры
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // попытка клика
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // прокрутка к элементу и повторный клик
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // клик с помощью js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Не забудьте прикрепить к элементу
)

// затем используйте как раньше
const elem = await $('body')
await elem.click()

// или передайте параметры
await elem.click({ force: true })
```

## Добавление дополнительных команд WebDriver

Если вы используете протокол WebDriver и запускаете тесты на платформе, которая поддерживает дополнительные команды, не определенные в определениях протоколов в [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), вы можете вручную добавить их через интерфейс `addCommand`. Пакет `webdriver` предлагает обертку команд, которая позволяет регистрировать эти новые конечные точки так же, как и другие команды, обеспечивая те же проверки параметров и обработку ошибок. Чтобы зарегистрировать эту новую конечную точку, импортируйте обертку команды и зарегистрируйте новую команду с ее помощью следующим образом:

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

Вызов этой команды с неверными параметрами приводит к той же обработке ошибок, что и предопределенные команды протокола, например:

```js
// вызов команды без обязательного параметра url и полезной нагрузки
await browser.myNewCommand()

/**
 * результат следующей ошибки:
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

Правильный вызов команды, например, `browser.myNewCommand('foo', 'bar')`, корректно делает запрос WebDriver к, например, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` с полезной нагрузкой типа `{ foo: 'bar' }`.

:::note
Параметр URL `:sessionId` будет автоматически заменен идентификатором сессии сессии WebDriver. Другие параметры URL могут быть применены, но должны быть определены в `variables`.
:::

Примеры того, как могут быть определены команды протокола, смотрите в пакете [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).
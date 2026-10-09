---
id: customcommands
title: Пользовательские команды
description: "Добавляйте собственные команды для браузера и элементов с помощью addCommand, переопределяйте существующие команды и расширяйте определения типов TypeScript."
---

Если вы хотите расширить экземпляр `browser` собственным набором команд, для этого существует метод браузера `addCommand`. Вы можете писать свою команду асинхронно, так же как и в своих спецификациях.

## Параметры

### Имя команды

<Option type="String">

Имя, которое определяет команду и будет присоединено к области видимости браузера или элемента.

</Option>

### Пользовательская функция

<Option type="Function">

Функция, которая выполняется при вызове команды. Областью видимости `this` является [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) или `WebdriverIO.BrowsingContext`, в зависимости от того, присоединяется ли команда к браузеру, к элементам или к контекстам просмотра.

</Option>

### Опции

Объект с параметрами конфигурации, изменяющими поведение пользовательской команды

#### Целевая область видимости

<Option type="Boolean" default="false" name="attachToElement">

Флаг, определяющий, присоединять ли команду к области видимости браузера или элемента. Если установлено значение `true`, команда будет командой элемента.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Флаг для присоединения команды к каждому контексту просмотра: вкладкам, окнам и фреймам, которые возвращают `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` и `context.frame()` в сессии WebDriver BiDi. Его нельзя комбинировать с `attachToElement`. См. [Контексты просмотра](#browsing-contexts).

</Option>

#### Отключение implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Флаг, определяющий, нужно ли неявно ожидать появления элемента перед вызовом пользовательской команды.

</Option>

## Примеры

Этот пример показывает, как добавить новую команду, которая возвращает текущий URL и заголовок в виде одного результата. Областью видимости (`this`) является объект [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` ссылается на область видимости `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Кроме того, вы можете расширить экземпляр элемента собственным набором команд, установив `attachToElement` в значение `true`. Областью видимости (`this`) в этом случае является объект [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` — это возвращаемое значение $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

По умолчанию пользовательские команды элемента ожидают появления элемента перед вызовом пользовательской команды. Хотя в большинстве случаев это желательно, при необходимости это можно отключить с помощью `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` — это возвращаемое значение $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

Пользовательские команды дают возможность объединить определённую последовательность часто используемых команд в один вызов. Вы можете определять пользовательские команды в любом месте вашего набора тестов; просто убедитесь, что команда определена *до* её первого использования. (Хук `before` в вашем `wdio.conf.js` — одно из подходящих мест для их создания.)

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

__Примечание:__ Если вам нужно выстраивать пользовательскую команду в цепочку, имя команды должно заканчиваться на `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Будьте осторожны и не перегружайте область видимости `browser` слишком большим количеством пользовательских команд.

Мы рекомендуем определять пользовательскую логику в [объектах страниц](pageobjects), чтобы она была привязана к конкретной странице.

### Контексты просмотра

В сессии WebDriver BiDi вкладка, окно и фрейм — каждый является `WebdriverIO.BrowsingContext`. Установите `attachToBrowsingContext` в значение `true`, чтобы добавить команду ко всем из них. Областью видимости (`this`) является контекст, в котором была вызвана команда, а `this.browser` — браузер, к которому он принадлежит:

```js
browser.addCommand('heading', async function () {
    // `this` — это вкладка, окно или фрейм
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

Команда доступна в уже существующих контекстах и в каждом контексте, созданном позже, включая фреймы из другого источника (origin). Команда, которая имеет смысл только для вкладки или окна, может проверять `this.isFrame`.

Вызов `addCommand` и `overwriteCommand` непосредственно на контексте просмотра приводит к ошибке. Регистрируйте команду в браузере.

### Multi-remote

`addCommand` работает аналогичным образом для multi-remote, за исключением того, что новая команда будет распространяться на дочерние экземпляры. Нужно быть внимательным при использовании объекта `this`, поскольку у multi-remote `browser` и его дочерних экземпляров разные `this`.

Этот пример показывает, как добавить новую команду для multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` ссылается на:
    //      - область видимости MultiRemoteBrowser для браузера
    //      - область видимости Browser для экземпляров
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

С TypeScript легко расширять интерфейсы WebdriverIO. Добавьте типы к своим пользовательским командам следующим образом:

1. Создайте файл определения типов (например, `./src/types/wdio.d.ts`)
2. a. Если вы используете файл определения типов в стиле модулей (с использованием import/export и `declare global WebdriverIO` в файле определения типов), обязательно включите путь к файлу в свойство `include` файла `tsconfig.json`.

   b. Если вы используете файлы определения типов в ambient-стиле (без import/export в файлах определения типов и с `declare namespace WebdriverIO` для пользовательских команд), убедитесь, что `tsconfig.json` *не* содержит раздела `include`, поскольку в этом случае все файлы определения типов, не перечисленные в разделе `include`, не будут распознаны TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Модули (с использованием import/export)', value: 'modules'},
    {label: 'Ambient-определения типов (без include в tsconfig)', value: 'ambient'},
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

3. Добавьте определения для своих команд в соответствии с вашим режимом выполнения.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Модули (с использованием import/export)', value: 'modules'},
    {label: 'Ambient-определения типов', value: 'ambient'},
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

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
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

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## Интеграция сторонних библиотек

Если вы используете внешние библиотеки (например, для обращений к базе данных), которые поддерживают промисы, хорошим подходом к их интеграции является обёртывание определённых методов API в пользовательскую команду.

При возврате промиса WebdriverIO гарантирует, что не перейдёт к следующей команде, пока промис не будет разрешён. Если промис будет отклонён, команда выбросит ошибку.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Затем просто используйте её в своих тестовых спецификациях WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // возвращает тело ответа
})
```

**Примечание:** Результатом вашей пользовательской команды является результат возвращаемого вами промиса.

## Переопределение команд

Вы также можете переопределять встроенные команды с помощью `overwriteCommand`.

Делать это не рекомендуется, поскольку это может привести к непредсказуемому поведению фреймворка!

Общий подход аналогичен `addCommand`, единственное отличие состоит в том, что первым аргументом функции команды является исходная функция, которую вы собираетесь переопределить. Ниже приведены несколько примеров.

### Переопределение команд браузера

```js
/**
 * Выводит количество миллисекунд перед паузой и возвращает его значение.
 *
 * @param pause - имя переопределяемой команды
 * @param this of func - исходный экземпляр браузера, на котором была вызвана функция
 * @param originalPauseFunction of func - исходная функция pause
 * @param ms of func - фактически переданные параметры
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// затем используйте её как прежде
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Переопределение команд элемента

Переопределение команд на уровне элемента происходит почти так же. Установите `attachToElement` в значение `true`:

```js
/**
 * Пытается прокрутить к элементу, если он некликабелен.
 * Передайте { force: true }, чтобы кликнуть с помощью JS, даже если элемент невидим или некликабелен.
 * Показывает, что тип аргумента исходной функции можно сохранить с помощью `options?: ClickOptions`
 *
 * @param this of func - элемент, на котором была вызвана исходная функция
 * @param originalClickFunction of func - исходная функция pause
 * @param options of func - фактически переданные параметры
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

                    // прокрутить к элементу и кликнуть снова
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
    { attachToElement: true }, // Не забудьте присоединить её к элементу
)

// затем используйте её как прежде
const elem = await $('body')
await elem.click()

// или передайте параметры
await elem.click({ force: true })
```

### Переопределение команд контекста просмотра

Установите `attachToBrowsingContext` в значение `true`, чтобы переопределить встроенную или пользовательскую команду каждой вкладки, окна и фрейма. Исходная команда привязана к контексту, в котором она была вызвана:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Добавление дополнительных команд WebDriver

Если вы используете протокол WebDriver и запускаете тесты на платформе, которая поддерживает дополнительные команды, не определённые ни в одном из определений протоколов в [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), вы можете вручную добавить их через интерфейс `addCommand`. Пакет `webdriver` предлагает обёртку команд, которая позволяет регистрировать эти новые эндпоинты так же, как и другие команды, обеспечивая те же проверки параметров и обработку ошибок. Чтобы зарегистрировать новый эндпоинт, импортируйте обёртку команд и зарегистрируйте с её помощью новую команду следующим образом:

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

Вызов этой команды с недопустимыми параметрами приводит к такой же обработке ошибок, как и для предопределённых команд протокола, например:

```js
// вызов команды без обязательного параметра url и полезной нагрузки
await browser.myNewCommand()

/**
 * приводит к следующей ошибке:
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

Правильный вызов команды, например `browser.myNewCommand('foo', 'bar')`, корректно выполняет запрос WebDriver, например, к `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` с полезной нагрузкой вида `{ foo: 'bar' }`.

:::note
Параметр url `:sessionId` будет автоматически заменён на идентификатор сессии WebDriver. Можно применять и другие параметры url, но их необходимо определить в `variables`.
:::

Примеры того, как можно определять команды протокола, смотрите в пакете [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).
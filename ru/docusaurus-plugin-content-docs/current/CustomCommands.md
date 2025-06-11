---
id: customcommands
title: Пользовательские команды
---

Если вы хотите расширить экземпляр `browser` своим собственным набором команд, метод браузера `addCommand` к вашим услугам. Вы можете написать вашу команду в асинхронном стиле, так же как в ваших спецификациях.

## Параметры

### Имя команды

Имя, которое определяет команду и будет прикреплено к области видимости браузера или элемента.

Тип: `String`

### Пользовательская функция

Функция, которая выполняется при вызове команды. Область видимости `this` - это либо [`WebdriverIO.Browser`](/docs/api/browser), либо [`WebdriverIO.Element`](/docs/api/element), в зависимости от того, прикрепляется ли команда к области видимости браузера или элемента.

Тип: `Function`

### Целевая область

Флаг для определения, привязывать ли команду к области видимости браузера или элемента. Если установлено значение `true`, команда будет командой элемента.

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
}, true)
```

Пользовательские команды дают вам возможность объединить определенную последовательность команд, которые вы часто используете, в один вызов. Вы можете определить пользовательские команды в любой момент вашего тестового набора; просто убедитесь, что команда определена *до* ее первого использования. (Хук `before` в вашем `wdio.conf.js` - одно хорошее место для их создания.)

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

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // выводит "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // выводит "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // выводит "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // выводит "2"
```

__Примечание:__ Если вам нужно создать цепочку пользовательских команд, команда должна заканчиваться на `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Будьте осторожны, чтобы не перегрузить область видимости `browser` слишком большим количеством пользовательских команд.

Мы рекомендуем определять пользовательскую логику в [объектах страниц](pageobjects), чтобы они были привязаны к конкретной странице.

### Multiremote

`addCommand` работает аналогично для multiremote, за исключением того, что новая команда будет распространяться на дочерние экземпляры. Вы должны быть внимательны при использовании объекта `this`, поскольку multiremote `browser` и его дочерние экземпляры имеют разные `this`.

Этот пример показывает, как добавить новую команду для multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` относится к:
    //      - области MultiRemoteBrowser для браузера
    //      - области Browser для экземпляров
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

## Расширение определений типов

С TypeScript легко расширить интерфейсы WebdriverIO. Добавьте типы к вашим пользовательским командам следующим образом:

1. Создайте файл определения типов (например, `./src/types/wdio.d.ts`)
2. a. Если вы используете файл определения типов в стиле модуля (с import/export и `declare global WebdriverIO` в файле определения типов), убедитесь, что путь к файлу включен в свойство `include` файла `tsconfig.json`.

   b. Если вы используете файлы определения типов в окружающем стиле (без import/export в файлах определения типов и `declare namespace WebdriverIO` для пользовательских команд), убедитесь, что `tsconfig.json` *не* содержит никакого раздела `include`, поскольку это приведет к тому, что все файлы определения типов, не перечисленные в разделе `include`, не будут распознаны typescript.

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

3. Добавьте определения для ваших команд в соответствии с вашим режимом выполнения.

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

## Интеграция сторонних библиотек

Если вы используете внешние библиотеки (например, для вызовов базы данных), которые поддерживают промисы, хороший подход для их интеграции - обернуть определенные методы API пользовательской командой.

При возврате промиса WebdriverIO гарантирует, что он не перейдет к следующей команде, пока промис не будет выполнен. Если промис отклоняется, команда выдаст ошибку.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Затем просто используйте это в ваших спецификациях тестов WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // возвращает тело ответа
})
```

**Примечание:** Результат вашей пользовательской команды - это результат возвращаемого вами промиса.

## Перезапись команд

Вы также можете перезаписать встроенные команды с помощью `overwriteCommand`.

Не рекомендуется делать это, так как это может привести к непредсказуемому поведению фреймворка!

Общий подход аналогичен `addCommand`, единственное отличие состоит в том, что первым аргументом в функции команды является оригинальная функция, которую вы собираетесь перезаписать. Пожалуйста, см. некоторые примеры ниже.

### Перезапись команд браузера

```js
/**
 * Вывести миллисекунды перед паузой и вернуть его значение.
 * 
 * @param pause - имя команды для перезаписи
 * @param this функции - исходный экземпляр браузера, на котором была вызвана функция
 * @param originalPauseFunction функции - исходная функция паузы
 * @param ms функции - фактически переданные параметры
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// затем используйте как и раньше
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Перезапись команд элемента

Перезапись команд на уровне элемента почти такая же. Просто передайте `true` в качестве третьего аргумента в `overwriteCommand`:

```js
/**
 * Попытка прокрутки до элемента, если он не кликабельный.
 * Передайте { force: true }, чтобы кликнуть с помощью JS, даже если элемент не виден или не кликабелен.
 * Показать, что тип аргумента исходной функции можно сохранить с помощью `options?: ClickOptions`
 *
 * @param this функции - элемент, на котором была вызвана исходная функция
 * @param originalClickFunction функции - исходная функция паузы
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

                    // прокрутка до элемента и повторный клик
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
    true, // не забудьте передать `true` в качестве 3-го аргумента
)

// затем используйте как и раньше
const elem = await $('body')
await elem.click()

// или передайте параметры
await elem.click({ force: true })
```

## Добавление дополнительных команд WebDriver

Если вы используете протокол WebDriver и запускаете тесты на платформе, которая поддерживает дополнительные команды, не определенные ни одним из определений протокола в [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), вы можете вручную добавить их через интерфейс `addCommand`. Пакет `webdriver` предлагает обертку команд, которая позволяет регистрировать эти новые конечные точки так же, как и другие команды, обеспечивая те же проверки параметров и обработку ошибок. Чтобы зарегистрировать эту новую конечную точку, импортируйте обертку команд и зарегистрируйте новую команду с ее помощью следующим образом:

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

Вызов этой команды с недопустимыми параметрами приводит к той же обработке ошибок, что и предопределенные команды протокола, например:

```js
// вызов команды без обязательного параметра URL и полезной нагрузки
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

Правильный вызов команды, например `browser.myNewCommand('foo', 'bar')`, правильно делает запрос WebDriver на, например, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` с полезной нагрузкой типа `{ foo: 'bar' }`.

:::note
Параметр URL `:sessionId` будет автоматически заменен идентификатором сеанса сеанса WebDriver. Другие параметры URL могут быть применены, но должны быть определены в `variables`.
:::

См. примеры того, как можно определить команды протокола в пакете [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).
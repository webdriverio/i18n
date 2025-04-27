---
id: modules
title: Модули
---

WebdriverIO публикует различные модули в NPM и других реестрах, которые вы можете использовать для создания собственной платформы автоматизации. Смотрите подробную документацию о типах настройки WebdriverIO [здесь](/docs/setuptypes).

## `webdriver` и `devtools`

Пакеты протоколов ([`webdriver`](https://www.npmjs.com/package/webdriver) и [`devtools`](https://www.npmjs.com/package/devtools)) предоставляют класс со следующими статическими функциями, которые позволяют инициировать сессии:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Запускает новую сессию с определенными возможностями. На основе ответа сессии будут предоставлены команды из разных протоколов.

##### Параметры

- `options`: [Опции WebDriver](/docs/configuration#webdriver-options)
- `modifier`: функция, которая позволяет изменять экземпляр клиента перед его возвратом
- `userPrototype`: объект свойств, который позволяет расширить прототип экземпляра
- `customCommandWrapper`: функция, которая позволяет обернуть функциональность вокруг вызовов функций

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Присоединяется к запущенной сессии WebDriver или DevTools.

##### Параметры

- `attachInstance`: экземпляр для присоединения к сессии или по крайней мере объект со свойством `sessionId` (например, `{ sessionId: 'xxx' }`)
- `modifier`: функция, которая позволяет изменять экземпляр клиента перед его возвратом
- `userPrototype`: объект свойств, который позволяет расширить прототип экземпляра
- `customCommandWrapper`: функция, которая позволяет обернуть функциональность вокруг вызовов функций

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Перезагружает сессию указанного экземпляра.

##### Параметры

- `instance`: экземпляр пакета для перезагрузки

##### Пример

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Аналогично пакетам протоколов (`webdriver` и `devtools`), вы также можете использовать API пакета WebdriverIO для управления сессиями. API можно импортировать с помощью `import { remote, attach, multiremote } from 'webdriverio'` и они содержат следующую функциональность:

#### `remote(options, modifier)`

Запускает сессию WebdriverIO. Экземпляр содержит все команды, как и пакет протокола, но с дополнительными функциями высшего порядка, см. [API документацию](/docs/api).

##### Параметры

- `options`: [Опции WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: функция, которая позволяет изменять экземпляр клиента перед его возвратом

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Присоединяется к запущенной сессии WebdriverIO.

##### Параметры

- `attachOptions`: экземпляр для присоединения к сессии или по крайней мере объект со свойством `sessionId` (например, `{ sessionId: 'xxx' }`)

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Инициирует экземпляр multiremote, который позволяет управлять несколькими сессиями в одном экземпляре. Ознакомьтесь с нашими [примерами multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) для конкретных случаев использования.

##### Параметры

- `multiremoteOptions`: объект с ключами, представляющими имя браузера и их [Опции WebdriverIO](/docs/configuration#webdriverio).

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

Вместо вызова команды `wdio`, вы также можете включить тестовый раннер как модуль и запустить его в произвольной среде. Для этого вам нужно будет подключить пакет `@wdio/cli` как модуль, вот так:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

После этого создайте экземпляр запускателя и запустите тест.

#### `Launcher(configPath, opts)`

Конструктор класса `Launcher` ожидает URL-адрес файла конфигурации и объект `opts` с настройками, которые перезапишут настройки из конфигурации.

##### Параметры

- `configPath`: путь к `wdio.conf.js` для запуска
- `opts`: аргументы ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) для перезаписи значений из файла конфигурации

##### Пример

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

Команда `run` возвращает [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Он разрешается, если тесты выполнены успешно или неудачно, и отклоняется, если запускатель не смог запустить тесты.

## `@wdio/browser-runner`

При запуске модульных или компонентных тестов с использованием [браузерного раннера](/docs/runner#browser-runner) WebdriverIO, вы можете импортировать утилиты для имитации в ваших тестах, например:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Доступны следующие именованные экспорты:

#### `fn`

Функция имитации, подробнее в официальной [документации Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Функция шпиона, подробнее в официальной [документации Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Метод для имитации файла или модуля зависимости.

##### Параметры

- `moduleName`: относительный путь к имитируемому файлу или имя модуля.
- `factory`: функция для возврата имитированного значения (необязательно)

##### Пример

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

Отменяет имитацию зависимости, которая определена в директории ручной имитации (`__mocks__`).

##### Параметры

- `moduleName`: имя модуля, для которого нужно отменить имитацию.

##### Пример

```js
unmock('lodash')
```
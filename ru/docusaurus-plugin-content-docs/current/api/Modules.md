---
id: modules
title: Модули
---

WebdriverIO публикует различные модули в NPM и других реестрах, которые вы можете использовать для создания собственного фреймворка автоматизации. Подробнее о типах настройки WebdriverIO смотрите [здесь](/docs/setuptypes).

## `webdriver` и `devtools`

Пакеты протоколов ([`webdriver`](https://www.npmjs.com/package/webdriver) и [`devtools`](https://www.npmjs.com/package/devtools)) предоставляют класс со следующими статическими функциями, которые позволяют инициировать сессии:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Запускает новую сессию с определёнными capabilities. В зависимости от ответа сессии будут предоставлены команды из разных протоколов.

##### Параметры

- `options`: [Опции WebDriver](/docs/configuration#webdriver-options)
- `modifier`: функция, позволяющая изменить экземпляр клиента перед его возвратом
- `userPrototype`: объект свойств, позволяющий расширить прототип экземпляра
- `customCommandWrapper`: функция, позволяющая обернуть функциональность вокруг вызовов функций

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Подключается к запущенной сессии WebDriver или DevTools.

##### Параметры

- `attachInstance`: экземпляр, к сессии которого нужно подключиться, или как минимум объект со свойством `sessionId` (например, `{ sessionId: 'xxx' }`)
- `modifier`: функция, позволяющая изменить экземпляр клиента перед его возвратом
- `userPrototype`: объект свойств, позволяющий расширить прототип экземпляра
- `customCommandWrapper`: функция, позволяющая обернуть функциональность вокруг вызовов функций

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Перезагружает сессию для указанного экземпляра.

##### Параметры

- `instance`: экземпляр пакета для перезагрузки

##### Пример

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Подобно пакетам протоколов (`webdriver` и `devtools`), вы также можете использовать API пакета WebdriverIO для управления сессиями. API можно импортировать с помощью `import { remote, attach, multiRemote } from 'webdriverio`, и они содержат следующую функциональность:

#### `remote(options, modifier)`

Запускает сессию WebdriverIO. Экземпляр содержит все команды пакета протокола, но с дополнительными функциями высшего порядка, см. [документацию API](/docs/api).

##### Параметры

- `options`: [Опции WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: функция, позволяющая изменить экземпляр клиента перед его возвратом

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

Подключается к запущенной сессии WebdriverIO.

##### Параметры

- `attachOptions`: экземпляр, к сессии которого нужно подключиться, или как минимум объект со свойством `sessionId` (например, `{ sessionId: 'xxx' }`)

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Инициирует экземпляр multi-remote, который позволяет управлять несколькими сессиями в рамках одного экземпляра. Ознакомьтесь с нашими [примерами multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) для конкретных сценариев использования.

##### Параметры

- `multiRemoteOptions`: объект с ключами, представляющими имена браузеров, и их [опциями WebdriverIO](/docs/configuration#webdriverio).

##### Возвращает

- Объект [Browser](/docs/api/browser)

##### Пример

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
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
// возвращает ['Google', 'JSON']
```

#### `Key`

Объект, содержащий константы специальных символов для использования с командой [`browser.keys`](/docs/api/browser/keys). Эти константы представляют специальные клавиши, которые можно отправить в браузер, например `Enter`, `Tab`, `Escape`, клавиши со стрелками, функциональные клавиши и другие.

##### Пример

```js
import { Key } from 'webdriverio'

// Нажать клавишу Enter
await browser.keys(Key.Enter)

// Использовать Ctrl+A для выделения всего (работает на всех платформах)
await browser.keys([Key.Ctrl, 'a'])

// Навигация с помощью клавиш со стрелками
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Доступные клавиши

Следующие специальные клавиши доступны через объект `Key`:

**Клавиши-модификаторы:**

| Константа | Описание |
|----------|-------------|
| `Key.Ctrl` | Кроссплатформенная клавиша управления (Command на Mac, Control на Windows/Linux) |
| `Key.Control` | Клавиша Control |
| `Key.Shift` | Клавиша Shift |
| `Key.Alt` | Клавиша Alt |
| `Key.Command` | Клавиша Command (Mac) |
| `Key.NULL` | Клавиша Null/отпускания — отпускает все удерживаемые в данный момент клавиши-модификаторы |

**Клавиши навигации:**

| Константа | Описание |
|----------|-------------|
| `Key.Cancel` | Клавиша Cancel |
| `Key.Help` | Клавиша Help |
| `Key.Backspace` | Клавиша Backspace |
| `Key.Tab` | Клавиша Tab |
| `Key.Clear` | Клавиша Clear |
| `Key.Return` | Клавиша Return |
| `Key.Enter` | Клавиша Enter |
| `Key.Pause` | Клавиша Pause |
| `Key.Escape` | Клавиша Escape |
| `Key.Space` | Клавиша Space (пробел) |
| `Key.PageUp` | Клавиша Page Up |
| `Key.PageDown` | Клавиша Page Down |
| `Key.End` | Клавиша End |
| `Key.Home` | Клавиша Home |
| `Key.ArrowLeft` | Клавиша «Стрелка влево» |
| `Key.ArrowUp` | Клавиша «Стрелка вверх» |
| `Key.ArrowRight` | Клавиша «Стрелка вправо» |
| `Key.ArrowDown` | Клавиша «Стрелка вниз» |
| `Key.Insert` | Клавиша Insert |
| `Key.Delete` | Клавиша Delete |

**Символьные клавиши:**

| Константа | Описание |
|----------|-------------|
| `Key.Semicolon` | Клавиша точки с запятой |
| `Key.Equals` | Клавиша знака равенства |

**Клавиши цифровой клавиатуры:**

| Константа | Описание |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Цифры 0-9 на цифровой клавиатуре |
| `Key.Multiply` | Умножение на цифровой клавиатуре |
| `Key.Add` | Сложение на цифровой клавиатуре |
| `Key.Separator` | Разделитель на цифровой клавиатуре |
| `Key.Subtract` | Вычитание на цифровой клавиатуре |
| `Key.Decimal` | Десятичная точка на цифровой клавиатуре |
| `Key.Divide` | Деление на цифровой клавиатуре |

**Функциональные клавиши:**

| Константа | Описание |
|----------|-------------|
| `Key.F1` - `Key.F12` | Функциональные клавиши от F1 до F12 |

**Другие клавиши:**

| Константа | Описание |
|----------|-------------|
| `Key.ZenkakuHankaku` | Клавиша Zenkaku/Hankaku (японская) |

:::info Кроссплатформенные клавиши-модификаторы

Константа `Key.Ctrl` предоставляет удобный способ использования модификатора «control» в разных операционных системах. На macOS она соответствует клавише `Command`, а на Windows и Linux — клавише `Control`. Это полезно при написании тестов, которые должны работать на нескольких платформах, например, для операций выделения всего (`Ctrl+A`), копирования (`Ctrl+C`) или вставки (`Ctrl+V`).

:::

## `@wdio/cli`

Вместо вызова команды `wdio` вы также можете подключить тестовый раннер как модуль и запустить его в произвольной среде. Для этого вам нужно подключить пакет `@wdio/cli` как модуль, например так:

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

После этого создайте экземпляр лаунчера и запустите тест.

#### `Launcher(configPath, opts)`

Конструктор класса `Launcher` ожидает URL файла конфигурации и объект `opts` с настройками, которые перезапишут настройки из конфигурации.

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

Команда `run` возвращает [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Он разрешается, если тесты были выполнены (успешно или с ошибками), и отклоняется, если лаунчеру не удалось запустить тесты.

## `@wdio/browser-runner`

При запуске модульных или компонентных тестов с помощью [браузерного раннера](/docs/runner#browser-runner) WebdriverIO вы можете импортировать утилиты для мокирования в свои тесты, например:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Доступны следующие именованные экспорты:

#### `fn`

Мок-функция, подробнее смотрите в официальной [документации Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Функция-шпион, подробнее смотрите в официальной [документации Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Метод для мокирования файла или модуля зависимости.

##### Параметры

- `moduleName`: относительный путь к файлу, который нужно замокировать, или имя модуля.
- `factory`: функция, возвращающая замокированное значение (необязательно)

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

Отменяет мокирование зависимости, которая определена в директории ручных моков (`__mocks__`).

##### Параметры

- `moduleName`: имя модуля, для которого нужно отменить мокирование.

##### Пример

```js
unmock('lodash')
```
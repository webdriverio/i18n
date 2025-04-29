---
id: modules
title: Модулі
---

WebdriverIO публікує різні модулі в NPM та інших реєстрах, які ви можете використовувати для побудови власної системи автоматизації. Дізнайтеся більше про типи налаштувань WebdriverIO [тут](/docs/setuptypes).

## `webdriver` та `devtools`

Пакети протоколів ([`webdriver`](https://www.npmjs.com/package/webdriver) та [`devtools`](https://www.npmjs.com/package/devtools)) надають клас з наступними статичними функціями, які дозволяють ініціювати сесії:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Запускає нову сесію з конкретними можливостями. На основі відповіді сесії надаються команди з різних протоколів.

##### Параметри

- `options`: [Опції WebDriver](/docs/configuration#webdriver-options)
- `modifier`: функція, що дозволяє модифікувати екземпляр клієнта до того, як він буде повернутий
- `userPrototype`: об'єкт властивостей, що дозволяє розширити прототип екземпляра
- `customCommandWrapper`: функція, що дозволяє обгортати функціональність навколо викликів функцій

##### Повертає

- Об'єкт [Browser](/docs/api/browser)

##### Приклад

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Підключається до працюючої сесії WebDriver або DevTools.

##### Параметри

- `attachInstance`: екземпляр, до якого підключається сесія, або принаймні об'єкт з властивістю `sessionId` (наприклад, `{ sessionId: 'xxx' }`)
- `modifier`: функція, що дозволяє модифікувати екземпляр клієнта до того, як він буде повернутий
- `userPrototype`: об'єкт властивостей, що дозволяє розширити прототип екземпляра
- `customCommandWrapper`: функція, що дозволяє обгортати функціональність навколо викликів функцій

##### Повертає

- Об'єкт [Browser](/docs/api/browser)

##### Приклад

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Перезавантажує сесію за наданим екземпляром.

##### Параметри

- `instance`: екземпляр пакету для перезавантаження

##### Приклад

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Подібно до пакетів протоколів (`webdriver` та `devtools`), ви також можете використовувати API пакету WebdriverIO для керування сесіями. API можна імпортувати за допомогою `import { remote, attach, multiremote } from 'webdriverio'` і вони містять наступну функціональність:

#### `remote(options, modifier)`

Запускає сесію WebdriverIO. Екземпляр містить усі команди, як і пакет протоколу, але з додатковими функціями вищого порядку, див. [API документацію](/docs/api).

##### Параметри

- `options`: [Опції WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: функція, що дозволяє модифікувати екземпляр клієнта до того, як він буде повернутий

##### Повертає

- Об'єкт [Browser](/docs/api/browser)

##### Приклад

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Підключається до працюючої сесії WebdriverIO.

##### Параметри

- `attachOptions`: екземпляр, до якого підключається сесія, або принаймні об'єкт з властивістю `sessionId` (наприклад, `{ sessionId: 'xxx' }`)

##### Повертає

- Об'єкт [Browser](/docs/api/browser)

##### Приклад

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Ініціює екземпляр multiremote, який дозволяє керувати кількома сесіями в одному екземплярі. Перегляньте наші [приклади multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) для конкретних випадків використання.

##### Параметри

- `multiremoteOptions`: об'єкт з ключами, що представляють назву браузера, та їхніми [Опціями WebdriverIO](/docs/configuration#webdriverio).

##### Повертає

- Об'єкт [Browser](/docs/api/browser)

##### Приклад

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

Замість виклику команди `wdio`, ви також можете включити test runner як модуль і запустити його в довільному середовищі. Для цього вам потрібно імпортувати пакет `@wdio/cli` як модуль, таким чином:

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

Після цього створіть екземпляр launcher і запустіть тест.

#### `Launcher(configPath, opts)`

Конструктор класу `Launcher` очікує URL до файлу конфігурації та об'єкт `opts` з налаштуваннями, які замінять налаштування в конфігурації.

##### Параметри

- `configPath`: шлях до `wdio.conf.js` для запуску
- `opts`: аргументи ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) для заміни значень з файлу конфігурації

##### Приклад

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

Команда `run` повертає [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Він вирішується, якщо тести виконалися успішно або не вдалося, і відхиляється, якщо launcher не зміг запустити тести.

## `@wdio/browser-runner`

При запуску модульних або компонентних тестів за допомогою [browser runner](/docs/runner#browser-runner) WebdriverIO, ви можете імпортувати утиліти мокування для ваших тестів, наприклад:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Доступні наступні іменовані експорти:

#### `fn`

Функція мокування, дізнайтеся більше в офіційній [документації Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Функція шпигуна, дізнайтеся більше в офіційній [документації Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Метод для мокування файлу або залежного модуля.

##### Параметри

- `moduleName`: відносний шлях до файлу, який буде мокуватися, або назва модуля.
- `factory`: функція, яка повертає мокуване значення (необов'язково)

##### Приклад

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

Скасовує мокування залежності, яка визначена в каталозі ручного мокування (`__mocks__`).

##### Параметри

- `moduleName`: назва модуля, мокування якого буде скасовано.

##### Приклад

```js
unmock('lodash')
```
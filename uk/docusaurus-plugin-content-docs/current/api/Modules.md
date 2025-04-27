---
id: modules
title: Модулі
---

WebdriverIO публікує різні модулі в NPM та інших реєстрах, які ви можете використовувати для побудови власного фреймворку автоматизації. Дивіться більше документації про типи налаштувань WebdriverIO [тут](/docs/setuptypes).

## `webdriver` та `devtools`

Пакети протоколів ([`webdriver`](https://www.npmjs.com/package/webdriver) та [`devtools`](https://www.npmjs.com/package/devtools)) представляють клас з наступними статичними функціями, які дозволяють ініціювати сесії:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Починає нову сесію з певними можливостями. На основі відповіді сесії будуть надані команди з різних протоколів.

##### Параметри

- `options`: [Опції WebDriver](/docs/configuration#webdriver-options)
- `modifier`: функція, що дозволяє модифікувати екземпляр клієнта перед його поверненням
- `userPrototype`: об'єкт властивостей, який дозволяє розширити прототип екземпляра
- `customCommandWrapper`: функція, що дозволяє обгорнути функціональність навколо викликів функцій

##### Повертає

- Об'єкт [Browser](/docs/api/browser)

##### Приклад

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Приєднується до запущеної сесії WebDriver або DevTools.

##### Параметри

- `attachInstance`: екземпляр, до якого потрібно приєднатися, або принаймні об'єкт з властивістю `sessionId` (наприклад, `{ sessionId: 'xxx' }`)
- `modifier`: функція, що дозволяє модифікувати екземпляр клієнта перед його поверненням
- `userPrototype`: об'єкт властивостей, який дозволяє розширити прототип екземпляра
- `customCommandWrapper`: функція, що дозволяє обгорнути функціональність навколо викликів функцій

##### Повертає

- Об'єкт [Browser](/docs/api/browser)

##### Приклад

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Перезавантажує сесію для вказаного екземпляра.

##### Параметри

- `instance`: екземпляр пакета для перезавантаження

##### Приклад

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Подібно до пакетів протоколів (`webdriver` та `devtools`), ви також можете використовувати API пакета WebdriverIO для керування сесіями. API можна імпортувати за допомогою `import { remote, attach, multiremote } from 'webdriverio'` і вони містять наступну функціональність:

#### `remote(options, modifier)`

Запускає сесію WebdriverIO. Екземпляр містить усі команди, як у пакеті протоколу, але з додатковими функціями вищого порядку, див. [API документацію](/docs/api).

##### Параметри

- `options`: [Опції WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: функція, що дозволяє модифікувати екземпляр клієнта перед його поверненням

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

Приєднується до запущеної сесії WebdriverIO.

##### Параметри

- `attachOptions`: екземпляр, до якого потрібно приєднатися, або принаймні об'єкт з властивістю `sessionId` (наприклад, `{ sessionId: 'xxx' }`)

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

- `multiremoteOptions`: об'єкт з ключами, що представляють назву браузера та їх [опції WebdriverIO](/docs/configuration#webdriverio).

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

Замість виклику команди `wdio`, ви також можете включити тест-ранер як модуль і запустити його в довільному середовищі. Для цього вам потрібно підключити пакет `@wdio/cli` як модуль, ось так:

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

Після цього створіть екземпляр лаунчера та запустіть тест.

#### `Launcher(configPath, opts)`

Конструктор класу `Launcher` очікує URL до конфігураційного файлу та об'єкт `opts` з налаштуваннями, які замінять налаштування в конфігураційному файлі.

##### Параметри

- `configPath`: шлях до `wdio.conf.js` для запуску
- `opts`: аргументи ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) для заміни значень з конфігураційного файлу

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

Команда `run` повертає [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Він вирішується, якщо тести успішно виконані або провалені, і відхиляється, якщо лаунчер не зміг запустити тести.

## `@wdio/browser-runner`

При запуску модульних або компонентних тестів за допомогою [браузерного ранера](/docs/runner#browser-runner) WebdriverIO, ви можете імпортувати утиліти моків для ваших тестів, наприклад:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Доступні наступні іменовані експорти:

#### `fn`

Функція моку, див. більше в офіційній [документації Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Функція шпигунa, див. більше в офіційній [документації Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Метод для моку файлу або модуля залежності.

##### Параметри

- `moduleName`: відносний шлях до файлу, який потрібно замокати, або ім'я модуля.
- `factory`: функція для повернення замоканого значення (необов'язково)

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

Відміняє мок залежності, яка визначена в каталозі ручних моків (`__mocks__`).

##### Параметри

- `moduleName`: ім'я модуля, для якого потрібно відмінити мок.

##### Приклад

```js
unmock('lodash')
```
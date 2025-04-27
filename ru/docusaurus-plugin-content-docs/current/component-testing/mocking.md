---
id: mocking
title: Моделирование
---

При написании тестов рано или поздно возникает необходимость создать "фиктивную" версию внутреннего или внешнего сервиса. Это обычно называется моделированием (mocking). WebdriverIO предоставляет утилиты, которые помогут вам в этом. Вы можете использовать `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` для доступа к ним. Дополнительную информацию о доступных утилитах моделирования смотрите в [документации API](/docs/api/modules#wdiobrowser-runner).

## Функции

Чтобы проверить, вызываются ли определенные обработчики функций в рамках ваших компонентных тестов, модуль `@wdio/browser-runner` экспортирует примитивы моделирования, которые можно использовать для проверки вызова этих функций. Вы можете импортировать эти методы следующим образом:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Импортируя `fn`, вы можете создать функцию-шпион (мок) для отслеживания её выполнения, а с помощью `spyOn` - отслеживать метод уже созданного объекта.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Полный пример можно найти в репозитории [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

```ts
import React from 'react'
import { $, expect } from '@wdio/globals'
import { fn } from '@wdio/browser-runner'
import { Key } from 'webdriverio'
import { render } from '@testing-library/react'

import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
    it('should call onLogin handler if username and password was provided', async () => {
        const onLogin = fn()
        render(<LoginForm onLogin={onLogin} />)
        await $('input[name="username"]').setValue('testuser123')
        await $('input[name="password"]').setValue('s3cret')
        await browser.keys(Key.Enter)

        /**
         * verify the handler was called
         */
        expect(onLogin).toBeCalledTimes(1)
        expect(onLogin).toBeCalledWith(expect.equal({
            username: 'testuser123',
            password: 's3cret'
        }))
    })
})
```

</TabItem>
<TabItem value="spies">

Полный пример можно найти в директории [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

```js
import { expect, $ } from '@wdio/globals'
import { spyOn } from '@wdio/browser-runner'
import { html, render } from 'lit'
import { SimpleGreeting } from './components/LitComponent.ts'

const getQuestionFn = spyOn(SimpleGreeting.prototype, 'getQuestion')

describe('Lit Component testing', () => {
    it('should render component', async () => {
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! How are you today?')
    })

    it('should render with mocked component function', async () => {
        getQuestionFn.mockReturnValue('Does this work?')
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! Does this work?')
    })
})
```

</TabItem>
</Tabs>

WebdriverIO просто реэкспортирует [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), который является легковесной реализацией шпионов, совместимой с Jest, и может использоваться с матчерами [`expect`](/docs/api/expect-webdriverio) WebdriverIO. Дополнительную документацию по этим функциям-макетам можно найти на [странице проекта Vitest](https://vitest.dev/api/mock.html).

Конечно, вы также можете установить и импортировать любой другой фреймворк для шпионажа, например, [SinonJS](https://sinonjs.org/), если он поддерживает среду браузера.

## Модули

Моделируйте локальные модули или наблюдайте за сторонними библиотеками, которые вызываются в другом коде, что позволяет тестировать аргументы, выходные данные или даже переопределять их реализацию.

Существует два способа моделирования функций: создание функции-макета для использования в тестовом коде или написание ручного макета для переопределения зависимости модуля.

### Моделирование импорта файлов

Представим, что наш компонент импортирует служебный метод из файла для обработки клика.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

В нашем компоненте обработчик клика используется следующим образом:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Чтобы замоделировать `handleClick` из `utils.js`, мы можем использовать метод `mock` в нашем тесте следующим образом:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * mock named export "handleClick" of `utils.ts` file
 */
mock('./utils.ts', () => ({
    handleClick: fn()
}))

describe('Simple Button Component Test', () => {
    it('call click handler', async () => {
        render(html`<simple-button />`, document.body)
        await $('simple-button').$('button').click()
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
```

### Моделирование зависимостей

Предположим, у нас есть класс, который получает пользователей из нашего API. Класс использует [`axios`](https://github.com/axios/axios) для вызова API, а затем возвращает атрибут data, содержащий всех пользователей:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Теперь, чтобы тестировать этот метод без фактического обращения к API (и, следовательно, создания медленных и хрупких тестов), мы можем использовать функцию `mock(...)` для автоматического моделирования модуля axios.

После моделирования модуля мы можем предоставить [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) для `.get`, который возвращает данные, против которых мы хотим проверять наш тест. По сути, мы говорим, что хотим, чтобы `axios.get('/users.json')` возвращал фиктивный ответ.

```js title=users.test.js
import axios from 'axios'; // imports defined mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * mock default export of `axios` dependency
 */
mock('axios', () => ({
    default: {
        get: fn()
    }
}))

describe('User API', () => {
    it('should fetch users', async () => {
        const users = [{name: 'Bob'}]
        const resp = {data: users}
        axios.get.mockResolvedValue(resp)

        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Частичное моделирование

Подмножества модуля могут быть смоделированы, а остальная часть модуля может сохранить свою фактическую реализацию:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Исходный модуль будет передан в фабрику моков, которую вы можете использовать, например, для частичного моделирования зависимости:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Mock the default export and named export 'foo'
    // and propagate named export from the original module
    return {
        __esModule: true,
        ...originalModule,
        default: fn(() => 'mocked baz'),
        foo: 'mocked foo',
    }
})

describe('partial mock', () => {
    it('should do a partial mock', () => {
        const defaultExportResult = defaultExport();
        expect(defaultExportResult).toBe('mocked baz');
        expect(defaultExport).toHaveBeenCalled();

        expect(foo).toBe('mocked foo');
        expect(bar()).toBe('bar');
    })
})
```

## Ручные моки

Ручные моки определяются путем написания модуля в подкаталоге `__mocks__/` (см. также опцию `automockDir`). Если моделируемый модуль является модулем Node (например: `lodash`), мок должен быть помещен в каталог `__mocks__` и будет автоматически смоделирован. Нет необходимости явно вызывать `mock('module_name')`.

Модули с областью видимости (также известные как scoped packages) могут быть смоделированы путем создания файла в структуре каталогов, соответствующей имени модуля с областью видимости. Например, чтобы смоделировать модуль с областью видимости под названием `@scope/project-name`, создайте файл в `__mocks__/@scope/project-name.js`, создав соответствующий каталог `@scope/`.

```
.
├── config
├── __mocks__
│   ├── axios.js
│   ├── lodash.js
│   └── @scope
│       └── project-name.js
├── node_modules
└── views
```

Когда для данного модуля существует ручной мок, WebdriverIO будет использовать этот модуль при явном вызове `mock('moduleName')`. Однако, когда automock установлен в true, реализация ручного мока будет использоваться вместо автоматически созданного мока, даже если `mock('moduleName')` не вызывается. Чтобы отказаться от этого поведения, вам нужно явно вызвать `unmock('moduleName')` в тестах, которые должны использовать фактическую реализацию модуля, например:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Подъем (Hoisting)

Чтобы моделирование работало в браузере, WebdriverIO переписывает тестовые файлы и поднимает вызовы mock выше всего остального (см. также [этот блог-пост](https://www.coolcomputerclub.com/posts/jest-hoist-await/) о проблеме подъема в Jest). Это ограничивает способ передачи переменных в решатель моков, например:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ это не работает, так как `dep` и `variable` не определены внутри решателя моков
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Чтобы исправить это, вы должны определить все используемые переменные внутри решателя, например:

```js title=component.test.js
/**
 * ✔️ это работает, так как все переменные определены внутри решателя
 */
mock('./some/module.ts', async () => {
    const dep = await import('dependency')
    const variable = 'foobar'

    return {
        exportA: dep,
        exportB: variable
    }
})
```

## Запросы

Если вы ищете моделирование запросов браузера, например, вызовов API, перейдите в раздел [Моки и шпионы запросов](/docs/mocksandspies).
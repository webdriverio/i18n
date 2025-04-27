---
id: mocking
title: Мокінг
---

При написанні тестів рано чи пізно виникає необхідність створити "фальшиву" версію внутрішнього — або зовнішнього — сервісу. Це зазвичай називають мокінгом. WebdriverIO надає утилітарні функції, щоб вам допомогти. Ви можете `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` для доступу до них. Дивіться більше інформації про доступні утиліти мокінгу в [API документації](/docs/api/modules#wdiobrowser-runner).

## Функції

Щоб перевірити, чи певні обробники функцій викликаються як частина ваших компонентних тестів, модуль `@wdio/browser-runner` експортує примітиви мокінгу, які можна використовувати для перевірки викликів цих функцій. Ви можете імпортувати ці методи через:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Імпортуючи `fn`, ви можете створити шпигунську функцію (мок) для відстеження її виконання, а за допомогою `spyOn` відслідковувати метод на вже створеному об'єкті.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Повний приклад можна знайти в репозиторії [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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

Повний приклад можна знайти в директорії [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

WebdriverIO просто реекспортує [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) тут, який є легкою Jest-сумісною реалізацією шпигунів, яку можна використовувати з матчерами [`expect`](/docs/api/expect-webdriverio) від WebdriverIO. Ви можете знайти більше документації про ці мок-функції на [сторінці проекту Vitest](https://vitest.dev/api/mock.html).

Звичайно, ви також можете встановити та імпортувати будь-який інший фреймворк для шпигунів, наприклад, [SinonJS](https://sinonjs.org/), якщо він підтримує середовище браузера.

## Модулі

Створення моків локальних модулів або спостереження за сторонніми бібліотеками, які викликаються в іншому коді, дозволяє тестувати аргументи, вихідні дані або навіть перевизначати їх реалізацію.

Існує два способи створення мок-функцій: або через створення мок-функції для використання в тестовому коді, або через написання вручну моку для перевизначення залежності модуля.

### Мокінг імпортів файлів

Уявімо, що наш компонент імпортує утилітарний метод з файлу для обробки кліку.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

У нашому компоненті обробник кліку використовується наступним чином:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Щоб створити мок для `handleClick` з `utils.js`, ми можемо використати метод `mock` у нашому тесті наступним чином:

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

### Мокінг залежностей

Припустимо, у нас є клас, який отримує користувачів з нашого API. Клас використовує [`axios`](https://github.com/axios/axios) для виклику API, а потім повертає атрибут data, який містить усіх користувачів:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Тепер, щоб протестувати цей метод без фактичного звернення до API (і, таким чином, створення повільних і крихких тестів), ми можемо використати функцію `mock(...)` для автоматичного створення моку модуля axios.

Після створення моку модуля ми можемо надати [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) для `.get`, який повертає дані, проти яких наш тест буде виконувати перевірку. По суті, ми кажемо, що хочемо, щоб `axios.get('/users.json')` повернув фальшиву відповідь.

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

## Часткові моки

Підмножини модуля можуть бути замокані, а решта модуля може зберегти свою реальну реалізацію:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Оригінальний модуль буде переданий у фабрику моків, яку ви можете використати, наприклад, для часткового мокінгу залежностей:

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

## Ручні моки

Ручні моки визначаються шляхом написання модуля в піддиректорії `__mocks__/` (також дивіться опцію `automockDir`). Якщо модуль, який ви мокаєте, є Node-модулем (наприклад: `lodash`), мок повинен бути розміщений в директорії `__mocks__` і буде автоматично замоканий. Немає потреби явно викликати `mock('module_name')`.

Scoped модулі (також відомі як scoped packages) можуть бути замокані шляхом створення файлу в структурі директорій, що відповідає імені scoped модуля. Наприклад, щоб замокати scoped модуль з назвою `@scope/project-name`, створіть файл за шляхом `__mocks__/@scope/project-name.js`, створивши відповідно директорію `@scope/`.

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

Коли для даного модуля існує ручний мок, WebdriverIO буде використовувати цей модуль при явному виклику `mock('moduleName')`. Однак, коли automock встановлено в true, реалізація ручного моку буде використовуватися замість автоматично створеного моку, навіть якщо `mock('moduleName')` не викликається. Щоб відмовитися від цієї поведінки, вам потрібно явно викликати `unmock('moduleName')` в тестах, які повинні використовувати справжню реалізацію модуля, наприклад:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Підняття (Hoisting)

Щоб мокінг працював у браузері, WebdriverIO переписує тестові файли та піднімає виклики моків над усім іншим (також дивіться [цей блог-пост](https://www.coolcomputerclub.com/posts/jest-hoist-await/) про проблему підняття в Jest). Це обмежує спосіб передачі змінних у резолвер моків, наприклад:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ this fails as `dep` and `variable` are not defined inside the mock resolver
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Щоб виправити це, ви повинні визначити всі використовувані змінні всередині резолвера, наприклад:

```js title=component.test.js
/**
 * ✔️ this works as all variables are defined within the resolver
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

## Запити

Якщо ви шукаєте можливість мокати запити браузера, наприклад, API-виклики, перейдіть до розділу [Request Mock and Spies](/docs/mocksandspies).
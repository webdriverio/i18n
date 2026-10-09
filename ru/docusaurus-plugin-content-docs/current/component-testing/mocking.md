---
id: mocking
title: Моки
description: "Мокирование функций, модулей и сетевых запросов в компонентных тестах browser runner с помощью fn, spyOn и mock из @wdio/browser-runner."
---

При написании тестов рано или поздно возникает необходимость создать «фейковую» версию внутреннего — или внешнего — сервиса. Обычно это называют мокированием (mocking). WebdriverIO предоставляет вспомогательные функции для этого. Вы можете использовать `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'`, чтобы получить к ним доступ. Подробнее о доступных утилитах для мокирования смотрите в [документации API](/docs/api/modules#wdiobrowser-runner).

## Функции

Чтобы проверить, вызываются ли определённые обработчики функций в рамках ваших компонентных тестов, модуль `@wdio/browser-runner` экспортирует примитивы для мокирования, с помощью которых можно проверить, были ли вызваны эти функции. Вы можете импортировать эти методы так:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Импортировав `fn`, вы можете создать функцию-шпион (мок) для отслеживания её выполнения, а с помощью `spyOn` — отслеживать метод уже созданного объекта.

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
         * проверяем, что обработчик был вызван
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

Здесь WebdriverIO просто реэкспортирует [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) — легковесную, совместимую с Jest реализацию шпионов, которую можно использовать с матчерами [`expect`](/docs/api/expect-webdriverio) WebdriverIO. Дополнительную документацию по этим мок-функциям можно найти на [странице проекта Vitest](https://vitest.dev/api/mock.html).

Разумеется, вы также можете установить и импортировать любой другой фреймворк для шпионов, например [SinonJS](https://sinonjs.org/), если он поддерживает браузерное окружение.

## Модули

Мокируйте локальные модули или отслеживайте сторонние библиотеки, которые вызываются в другом коде, — это позволяет проверять аргументы, результат или даже переопределять их реализацию.

Существует два способа мокирования функций: либо создать мок-функцию для использования в тестовом коде, либо написать ручной мок для переопределения зависимости модуля.

### Мокирование импортов из файлов

Представим, что наш компонент импортирует вспомогательный метод из файла для обработки клика.

```js title=utils.js
export function handleClick () {
    // реализация обработчика
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

Чтобы замокировать `handleClick` из `utils.js`, мы можем использовать метод `mock` в нашем тесте следующим образом:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * мокируем именованный экспорт "handleClick" файла `utils.ts`
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

### Мокирование зависимостей

Предположим, у нас есть класс, который получает пользователей из нашего API. Класс использует [`axios`](https://github.com/axios/axios) для обращения к API, а затем возвращает атрибут data, содержащий всех пользователей:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Теперь, чтобы протестировать этот метод, не обращаясь к API на самом деле (и тем самым не создавая медленные и нестабильные тесты), мы можем использовать функцию `mock(...)` для автоматического мокирования модуля axios.

После мокирования модуля мы можем задать [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) для `.get`, который вернёт данные, на которых будут основаны проверки в нашем тесте. По сути, мы указываем, что хотим, чтобы `axios.get('/users.json')` возвращал фейковый ответ.

```js title=users.test.js
import axios from 'axios'; // импортирует определённый мок
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * мокируем экспорт по умолчанию зависимости `axios`
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

        // или, в зависимости от вашего случая, можно использовать следующее:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Частичное мокирование

Можно замокировать часть модуля, а остальная часть модуля сохранит свою реальную реализацию:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Оригинальный модуль передаётся в фабрику мока, и вы можете использовать его, например, для частичного мокирования зависимости:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Мокируем экспорт по умолчанию и именованный экспорт 'foo'
    // и пробрасываем именованный экспорт из оригинального модуля
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

Ручные моки определяются путём написания модуля в поддиректории `__mocks__/` (см. также опцию `automockDir`). Если мокируемый модуль является Node-модулем (например, `lodash`), мок следует поместить в директорию `__mocks__`, и он будет замокирован автоматически. Явно вызывать `mock('module_name')` не нужно.

Scoped-модули (также известные как scoped-пакеты) можно замокировать, создав файл в структуре директорий, соответствующей имени scoped-модуля. Например, чтобы замокировать scoped-модуль с именем `@scope/project-name`, создайте файл `__mocks__/@scope/project-name.js`, создав соответственно директорию `@scope/`.

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

Если для данного модуля существует ручной мок, WebdriverIO будет использовать его при явном вызове `mock('moduleName')`. Однако если automock установлен в true, реализация ручного мока будет использоваться вместо автоматически созданного мока, даже если `mock('moduleName')` не вызывается. Чтобы отказаться от такого поведения, необходимо явно вызвать `unmock('moduleName')` в тестах, которые должны использовать реальную реализацию модуля, например:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Поднятие (hoisting)

Чтобы мокирование работало в браузере, WebdriverIO переписывает тестовые файлы и поднимает вызовы mock выше всего остального кода (см. также [эту статью в блоге](https://www.coolcomputerclub.com/posts/jest-hoist-await/) о проблеме поднятия в Jest). Это ограничивает способы передачи переменных в резолвер мока, например:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ это не сработает, так как `dep` и `variable` не определены внутри резолвера мока
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Чтобы это исправить, необходимо определить все используемые переменные внутри резолвера, например:

```js title=component.test.js
/**
 * ✔️ это работает, так как все переменные определены внутри резолвера
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

Если вы ищете способ мокирования браузерных запросов, например вызовов API, перейдите в раздел [Моки и шпионы запросов](/docs/mocksandspies).

В компонентных тестах используйте для `browser.mock()` абсолютный шаблон URL с фиксированным протоколом и именем хоста, например `https://api.webdriver.io/api/*`. Шаблон без хоста, такой как `*/api/*`, перехватывает все запросы страницы, включая собственный трафик Vite и драйвера browser runner.

Используйте одиночный `*`, который также соответствует слешам. Последовательные подстановочные символы перед фиксированным текстом, такие как `**/api/**` или `**/data.json`, могут вызывать чрезмерный возврат (backtracking) регулярного выражения на посторонних URL и приводить к зависанию теста. См. [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), [issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) и [предупреждение о подстановочных символах в URL](/docs/mocksandspies#creating-a-mock).
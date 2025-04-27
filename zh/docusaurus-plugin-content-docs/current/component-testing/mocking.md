---
id: mocking
title: 模拟
---

当编写测试时，迟早你会需要创建内部或外部服务的"假"版本。这通常被称为模拟(mocking)。WebdriverIO提供实用函数来帮助你。你可以通过`import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'`来访问它。有关可用模拟工具的更多信息，请参阅[API文档](/docs/api/modules#wdiobrowser-runner)。

## 函数

为了验证某些函数处理程序是否作为组件测试的一部分被调用，`@wdio/browser-runner`模块导出了你可以用来测试这些函数是否被调用的模拟原语。你可以通过以下方式导入这些方法：

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

通过导入`fn`，你可以创建一个间谍函数(模拟)来跟踪其执行情况，而使用`spyOn`则可以跟踪已创建对象上的方法。

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

完整示例可在[组件测试示例](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx)仓库中找到。

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

完整示例可在[examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js)目录中找到。

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

WebdriverIO在这里只是重新导出了[`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy)，这是一个轻量级的Jest兼容间谍实现，可以与WebdriverIO的[`expect`](/docs/api/expect-webdriverio)匹配器一起使用。你可以在[Vitest项目页面](https://vitest.dev/api/mock.html)上找到关于这些模拟函数的更多文档。

当然，你也可以安装和导入任何其他间谍框架，例如[SinonJS](https://sinonjs.org/)，只要它支持浏览器环境。

## 模块

模拟本地模块或观察在其他代码中调用的第三方库，允许你测试参数、输出，甚至重新声明其实现。

有两种方法可以模拟函数：一种是创建一个在测试代码中使用的模拟函数，另一种是编写手动模拟来覆盖模块依赖项。

### 模拟文件导入

让我们想象我们的组件正在从一个文件导入一个实用方法来处理点击。

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

在我们的组件中，点击处理程序的使用如下：

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

要模拟来自`utils.js`的`handleClick`，我们可以在测试中使用`mock`方法，如下所示：

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

### 模拟依赖项

假设我们有一个从API获取用户的类。该类使用[`axios`](https://github.com/axios/axios)调用API，然后返回包含所有用户的data属性：

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

现在，为了测试这个方法而不实际调用API(从而创建缓慢和脆弱的测试)，我们可以使用`mock(...)`函数自动模拟axios模块。

一旦我们模拟了该模块，我们可以为`.get`提供一个[`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue)，返回我们希望测试断言的数据。实际上，我们是在说我们希望`axios.get('/users.json')`返回一个假的响应。

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

## 部分模拟

模块的子集可以被模拟，而模块的其余部分可以保持其实际实现：

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

原始模块将被传递到模拟工厂中，你可以用它来部分模拟依赖项：

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

## 手动模拟

手动模拟是通过在`__mocks__/`(另见`automockDir`选项)子目录中编写模块来定义的。如果你要模拟的模块是Node模块(例如：`lodash`)，模拟应该放在`__mocks__`目录中，并将自动被模拟。无需显式调用`mock('module_name')`。

作用域模块(也称为作用域包)可以通过在与作用域模块名称匹配的目录结构中创建文件来模拟。例如，要模拟名为`@scope/project-name`的作用域模块，请在`__mocks__/@scope/project-name.js`创建一个文件，相应地创建`@scope/`目录。

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

当给定模块存在手动模拟时，WebdriverIO将在显式调用`mock('moduleName')`时使用该模块。然而，当automock设置为true时，即使没有调用`mock('moduleName')`，也会使用手动模拟实现而不是自动创建的模拟。要选择不使用这种行为，你需要在应该使用实际模块实现的测试中显式调用`unmock('moduleName')`，例如：

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## 提升

为了让模拟在浏览器中工作，WebdriverIO重写了测试文件并将模拟调用提升到其他所有内容之上(另见[这篇博客文章](https://www.coolcomputerclub.com/posts/jest-hoist-await/)关于Jest中的提升问题)。这限制了你将变量传递到模拟解析器的方式，例如：

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

要解决这个问题，你必须在解析器内部定义所有使用的变量，例如：

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

## 请求

如果你正在寻找模拟浏览器请求，例如API调用，请转到[请求模拟和间谍](/docs/mocksandspies)部分。
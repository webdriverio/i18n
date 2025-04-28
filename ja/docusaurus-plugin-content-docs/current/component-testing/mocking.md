---
id: mocking
title: モック
---

テストを書いているとき、内部または外部のサービスの「偽物」バージョンを作成する必要が出てくるのは時間の問題です。これは一般的にモックと呼ばれています。WebdriverIOはこれを支援するユーティリティ関数を提供しています。`import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'`でアクセスできます。利用可能なモックユーティリティについての詳細は、[APIドキュメント](/docs/api/modules#wdiobrowser-runner)を参照してください。

## 関数

コンポーネントテストの一部として特定の関数ハンドラが呼び出されるかどうかを検証するために、`@wdio/browser-runner`モジュールはこれらの関数が呼び出されたかどうかをテストするために使用できるモッキングプリミティブをエクスポートしています。これらのメソッドは以下のようにインポートできます：

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

`fn`をインポートすることで、実行を追跡するためのスパイ関数（モック）を作成でき、`spyOn`を使用して既に作成されたオブジェクトのメソッドを追跡できます。

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

完全な例は[コンポーネントテスト例](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx)リポジトリにあります。

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

完全な例は[examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js)ディレクトリにあります。

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

WebdriverIOはここで[`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy)を再エクスポートしているだけです。これはWebdriverIOの[`expect`](/docs/api/expect-webdriverio)マッチャーと一緒に使用できる軽量のJest互換スパイ実装です。これらのモック関数の詳細なドキュメントは[Vitestプロジェクトページ](https://vitest.dev/api/mock.html)で見つけることができます。

もちろん、ブラウザ環境をサポートしている限り、[SinonJS](https://sinonjs.org/)などの他のスパイフレームワークをインストールしてインポートすることもできます。

## モジュール

ローカルモジュールをモックしたり、他のコードで呼び出される第三者ライブラリを監視したりして、引数、出力をテストしたり、その実装を再定義したりすることができます。

関数をモックする方法は2つあります：テストコードで使用するモック関数を作成するか、モジュールの依存関係をオーバーライドするマニュアルモックを作成するかです。

### ファイルインポートのモック

コンポーネントがクリックを処理するためにファイルからユーティリティメソッドをインポートしていると想像してみましょう。

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

コンポーネント内でクリックハンドラは次のように使用されています：

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

`utils.js`から`handleClick`をモックするには、テストで`mock`メソッドを次のように使用できます：

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

### 依存関係のモック

APIからユーザーを取得するクラスがあるとします。このクラスは[`axios`](https://github.com/axios/axios)を使用してAPIを呼び出し、すべてのユーザーを含むdata属性を返します：

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

実際にAPIにヒットせずにこのメソッドをテストするために（遅くて脆いテストを作成することを避けるため）、`mock(...)`関数を使用してaxiosモジュールを自動的にモックすることができます。

モジュールをモックすると、テストがアサートしたいデータを返す`.get`のための[`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue)を提供できます。実質的に、`axios.get('/users.json')`が偽のレスポンスを返すことを望んでいると言っています。

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

## 部分的モック

モジュールのサブセットをモックし、モジュールの残りの部分は実際の実装を維持することができます：

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

元のモジュールはモックファクトリに渡され、例えば依存関係を部分的にモックするために使用できます：

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

## マニュアルモック

マニュアルモックは`__mocks__/`（`automockDir`オプションも参照）サブディレクトリにモジュールを書くことで定義されます。モックしているモジュールがNodeモジュール（例：`lodash`）である場合、モックは`__mocks__`ディレクトリに配置され、自動的にモックされます。明示的に`mock('module_name')`を呼び出す必要はありません。

スコープ付きモジュール（スコープ付きパッケージとも呼ばれる）は、スコープ付きモジュールの名前に一致するディレクトリ構造にファイルを作成することでモックできます。例えば、`@scope/project-name`というスコープ付きモジュールをモックするには、`__mocks__/@scope/project-name.js`にファイルを作成し、`@scope/`ディレクトリを適切に作成します。

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

特定のモジュールに対してマニュアルモックが存在する場合、WebdriverIOは明示的に`mock('moduleName')`を呼び出すとそのモジュールを使用します。ただし、automockがtrueに設定されている場合、`mock('moduleName')`が呼び出されなくても、自動的に作成されたモックの代わりにマニュアルモック実装が使用されます。この動作をオプトアウトするには、実際のモジュール実装を使用すべきテストで明示的に`unmock('moduleName')`を呼び出す必要があります：

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## ホイスティング

ブラウザでモックを機能させるために、WebdriverIOはテストファイルを書き換え、モック呼び出しを他のすべての上に持ち上げます（Jestのホイスティング問題についての[このブログ記事](https://www.coolcomputerclub.com/posts/jest-hoist-await/)も参照）。これにより、変数をモックリゾルバに渡す方法が制限されます：

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

これを修正するには、使用するすべての変数をリゾルバ内で定義する必要があります：

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

## リクエスト

ブラウザリクエスト（APIコールなど）のモックを探している場合は、[リクエストモックとスパイ](/docs/mocksandspies)セクションをご覧ください。
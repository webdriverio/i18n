---
id: mocking
title: モック
---

テストを書いているとき、内部または外部サービスの「偽の」バージョンを作成する必要が出てくるのは時間の問題です。これは一般的にモックと呼ばれています。WebdriverIOはこれを支援するユーティリティ関数を提供しています。`import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'`でアクセスできます。利用可能なモックユーティリティについての詳細情報は[APIドキュメント](/docs/api/modules#wdiobrowser-runner)を参照してください。

## 関数

コンポーネントテストの一部として特定の関数ハンドラが呼び出されるかどうかを検証するために、`@wdio/browser-runner`モジュールはこれらの関数が呼び出されたかどうかをテストするために使用できるモックプリミティブをエクスポートしています。これらのメソッドは以下のようにインポートできます：

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

`fn`をインポートすることで、スパイ関数（モック）を作成して実行を追跡し、`spyOn`で既に作成されたオブジェクトのメソッドを追跡できます。

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

完全な例は[Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx)リポジトリにあります。

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

WebdriverIOはここで軽量なJest互換のスパイ実装である[`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy)を再エクスポートしており、これはWebdriverIOの[`expect`](/docs/api/expect-webdriverio)マッチャーで使用できます。これらのモック関数の詳細なドキュメントは[Vitestプロジェクトページ](https://vitest.dev/api/mock.html)で見つけることができます。

もちろん、ブラウザ環境をサポートしている限り、他のスパイフレームワーク（例：[SinonJS](https://sinonjs.org/)）をインストールしてインポートすることもできます。

## モジュール

ローカルモジュールをモックしたり、他のコードで呼び出される第三者ライブラリを観察したりして、引数、出力を検証したり、実装を再宣言したりすることができます。

関数をモックする方法は2つあります：テストコードで使用するモック関数を作成するか、モジュールの依存関係をオーバーライドするマニュアルモックを書くかです。

### ファイルインポートのモック

コンポーネントが、クリックを処理するためのユーティリティメソッドをファイルからインポートしていると想像してみましょう。

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

私たちのコンポーネントでは、クリックハンドラは次のように使用されています：

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

`utils.js`から`handleClick`をモックするために、テストで`mock`メソッドを次のように使用できます：

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

APIからユーザーを取得するクラスがあるとします。このクラスは[`axios`](https://github.com/axios/axios)を使用してAPIを呼び出し、すべてのユーザーを含むdataプロパティを返します：

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

このメソッドを実際にAPIを叩かずにテストするためには（遅くて脆いテストを作成しないために）、`mock(...)`関数を使用してaxiosモジュールを自動的にモックすることができます。

モジュールをモックしたら、テストでアサートしたいデータを返す`.get`の[`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue)を提供することができます。実質的に、`axios.get('/users.json')`が偽のレスポンスを返すようにしています。

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

## 部分的なモック

モジュールの一部をモックし、残りの部分は実際の実装を維持することができます：

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

オリジナルのモジュールはモックファクトリに渡され、例えば依存関係を部分的にモックするために使用できます：

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

マニュアルモックは `__mocks__/`（`automockDir`オプションも参照）サブディレクトリにモジュールを記述することで定義されます。モックするモジュールがNodeモジュール（例：`lodash`）である場合、モックは`__mocks__`ディレクトリに配置され、自動的にモックされます。明示的に`mock('module_name')`を呼び出す必要はありません。

スコープ付きモジュール（スコープ付きパッケージとも呼ばれる）は、スコープ付きモジュールの名前に一致するディレクトリ構造にファイルを作成することでモックできます。例えば、`@scope/project-name`というスコープ付きモジュールをモックするには、`@scope/`ディレクトリを適切に作成して、`__mocks__/@scope/project-name.js`にファイルを作成します。

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

特定のモジュールに対してマニュアルモックが存在する場合、WebdriverIOは明示的に`mock('moduleName')`を呼び出したときにそのモジュールを使用します。ただし、automockがtrueに設定されている場合、`mock('moduleName')`が呼び出されていなくても、自動的に作成されたモックの代わりにマニュアルモックの実装が使用されます。この動作を無効にするには、実際のモジュール実装を使用するテストで明示的に`unmock('moduleName')`を呼び出す必要があります。例：

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## ホイスティング

ブラウザでモックを機能させるために、WebdriverIOはテストファイルを書き換え、モック呼び出しを他のすべての上にホイストします（Jestのホイスティング問題に関する[このブログ記事](https://www.coolcomputerclub.com/posts/jest-hoist-await/)も参照）。これにより、モックリゾルバに変数を渡す方法が制限されます。例：

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ これは失敗します。`dep`と`variable`がモックリゾルバ内で定義されていないためです
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

これを修正するには、リゾルバ内ですべての使用変数を定義する必要があります。例：

```js title=component.test.js
/**
 * ✔️ これは機能します。すべての変数がリゾルバ内で定義されているためです
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

ブラウザリクエスト（例：API呼び出し）のモックを探している場合は、[リクエストモックとスパイ](/docs/mocksandspies)セクションを参照してください。
---
id: mocking
title: モック
description: "@wdio/browser-runner の fn、spyOn、mock を使用して、ブラウザランナーのコンポーネントテストで関数、モジュール、ネットワークリクエストをモックします。"
---

テストを書いていると、内部または外部のサービスの「偽」バージョンを作成する必要が出てくるのは時間の問題です。これは一般的にモックと呼ばれます。WebdriverIO はこれを支援するユーティリティ関数を提供しています。`import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` でアクセスできます。利用可能なモックユーティリティの詳細については、[API ドキュメント](/docs/api/modules#wdiobrowser-runner)を参照してください。

## 関数

コンポーネントテストの一部として特定の関数ハンドラーが呼び出されたかどうかを検証するために、`@wdio/browser-runner` モジュールは、これらの関数が呼び出されたかどうかをテストするのに使用できるモックプリミティブをエクスポートしています。これらのメソッドは次のようにインポートできます：

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

`fn` をインポートすると、実行を追跡するためのスパイ関数（モック）を作成でき、`spyOn` を使うと既に作成されたオブジェクトのメソッドを追跡できます。

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

完全な例は [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx) リポジトリにあります。

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
         * ハンドラーが呼び出されたことを検証する
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

完全な例は [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js) ディレクトリにあります。

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

WebdriverIO はここで [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) を再エクスポートしているだけです。これは軽量な Jest 互換のスパイ実装で、WebdriverIO の [`expect`](/docs/api/expect-webdriverio) マッチャーと一緒に使用できます。これらのモック関数に関する詳細なドキュメントは [Vitest プロジェクトページ](https://vitest.dev/api/mock.html)にあります。

もちろん、ブラウザ環境をサポートしている限り、[SinonJS](https://sinonjs.org/) など他のスパイフレームワークをインストールしてインポートすることもできます。

## モジュール

他のコード内で呼び出されるローカルモジュールをモックしたり、サードパーティライブラリを監視したりすることで、引数や出力をテストしたり、その実装を再定義したりすることができます。

関数をモックする方法は2つあります：テストコードで使用するモック関数を作成するか、モジュールの依存関係をオーバーライドする手動モックを書くかのどちらかです。

### ファイルインポートのモック

コンポーネントがクリックを処理するために、ファイルからユーティリティメソッドをインポートしているとします。

```js title=utils.js
export function handleClick () {
    // ハンドラーの実装
}
```

コンポーネントでは、クリックハンドラーは次のように使用されています：

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

`utils.js` の `handleClick` をモックするには、テスト内で次のように `mock` メソッドを使用できます：

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * `utils.ts` ファイルの名前付きエクスポート "handleClick" をモックする
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

API からユーザーを取得するクラスがあるとします。このクラスは [`axios`](https://github.com/axios/axios) を使用して API を呼び出し、すべてのユーザーを含む data 属性を返します：

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

さて、実際に API にアクセスせずに（つまり、遅くて壊れやすいテストを作らずに）このメソッドをテストするために、`mock(...)` 関数を使用して axios モジュールを自動的にモックできます。

モジュールをモックしたら、テストで検証したいデータを返す [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) を `.get` に提供できます。実質的に、`axios.get('/users.json')` が偽のレスポンスを返すようにしたいということです。

```js title=users.test.js
import axios from 'axios'; // 定義されたモックをインポートする
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * `axios` 依存関係のデフォルトエクスポートをモックする
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

        // または、ユースケースに応じて次のように使用することもできます：
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## 部分モック

モジュールの一部をモックし、残りの部分は実際の実装を維持することができます：

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

元のモジュールはモックファクトリーに渡されるので、例えば依存関係を部分的にモックするのに使用できます：

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // デフォルトエクスポートと名前付きエクスポート 'foo' をモックし、
    // 元のモジュールから名前付きエクスポートを引き継ぐ
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

## 手動モック

手動モックは、`__mocks__/` サブディレクトリ（`automockDir` オプションも参照）にモジュールを書くことで定義されます。モックするモジュールが Node モジュール（例：`lodash`）の場合、モックは `__mocks__` ディレクトリに配置する必要があり、自動的にモックされます。明示的に `mock('module_name')` を呼び出す必要はありません。

スコープ付きモジュール（スコープ付きパッケージとも呼ばれる）は、スコープ付きモジュールの名前に一致するディレクトリ構造にファイルを作成することでモックできます。例えば、`@scope/project-name` というスコープ付きモジュールをモックするには、`__mocks__/@scope/project-name.js` にファイルを作成し、それに応じて `@scope/` ディレクトリを作成します。

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

特定のモジュールに対して手動モックが存在する場合、WebdriverIO は明示的に `mock('moduleName')` を呼び出したときにそのモジュールを使用します。ただし、automock が true に設定されている場合、`mock('moduleName')` が呼び出されていなくても、自動的に作成されたモックの代わりに手動モックの実装が使用されます。この動作を無効にするには、実際のモジュール実装を使用すべきテストで明示的に `unmock('moduleName')` を呼び出す必要があります。例：

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## ホイスティング

ブラウザでモックを機能させるために、WebdriverIO はテストファイルを書き換え、モック呼び出しを他のすべてのものより上にホイスティングします（Jest におけるホイスティングの問題については[このブログ記事](https://www.coolcomputerclub.com/posts/jest-hoist-await/)も参照してください）。これにより、モックリゾルバーに変数を渡す方法が制限されます。例：

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ `dep` と `variable` がモックリゾルバー内で定義されていないため、これは失敗します
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

これを修正するには、使用するすべての変数をリゾルバー内で定義する必要があります。例：

```js title=component.test.js
/**
 * ✔️ すべての変数がリゾルバー内で定義されているため、これは機能します
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

API 呼び出しなどのブラウザリクエストをモックする方法をお探しの場合は、[リクエストのモックとスパイ](/docs/mocksandspies)セクションを参照してください。

コンポーネントテストでは、`browser.mock()` に `https://api.webdriver.io/api/*` のような、プロトコルとホスト名を固定した絶対 URL パターンを使用してください。`*/api/*` のようなホストを含まないパターンは、ブラウザランナー自身の Vite やドライバーのトラフィックを含む、ページのすべてのリクエストをインターセプトしてしまいます。

スラッシュにもマッチする単一の `*` を使用してください。`**/api/**` や `**/data.json` のように固定テキストの前に連続したワイルドカードを置くと、無関係な URL に対して過剰な正規表現のバックトラッキングが発生し、テストがフリーズする可能性があります。[issue #13548](https://github.com/webdriverio/webdriverio/issues/13548)、[issue #15739](https://github.com/webdriverio/webdriverio/issues/15739)、および [URL ワイルドカードに関する警告](/docs/mocksandspies#creating-a-mock)を参照してください。
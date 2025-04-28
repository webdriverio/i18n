---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/)は、再利用可能でスケーラブルなコンポーネントライブラリを構築するためのライブラリです。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用して、実際のブラウザでStencilコンポーネントを直接テストできます。

## セットアップ

StencilプロジェクトにWebdriverIOをセットアップするには、コンポーネントテストのドキュメントにある[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内で`stencil`をプリセットとして選択してください。例：

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

StencilをReactやVueなどのフレームワークと一緒に使用する場合は、これらのフレームワーク用のプリセットを維持してください。

:::

その後、以下のコマンドでテストを開始できます：

```sh
npx wdio run ./wdio.conf.ts
```

## テストの作成

以下のようなStencilコンポーネントがある場合：

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

テストでは、`@wdio/browser-runner/stencil`から`render`メソッドを使用して、コンポーネントをテストページに取り付けます。コンポーネントと対話するには、実際のユーザー操作に近い動作をするWebdriverIOコマンドを使用することをお勧めします：

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### レンダーオプション

`render`メソッドは以下のオプションを提供します：

##### `components`

テスト対象のコンポーネントの配列。コンポーネントクラスはspecファイルにインポートされ、そのリファレンスはテスト全体で使用するために`component`配列に追加されるべきです。

__型:__ `CustomElementConstructor[]`<br />
__デフォルト:__ `[]`

##### `flushQueue`

`false`の場合、初期テストセットアップでレンダーキューをフラッシュしません。

__型:__ `boolean`<br />
__デフォルト:__ `true`

##### `template`

テストを生成するための初期JSX。HTMLの属性ではなく、プロパティを使用してコンポーネントを初期化したい場合は`template`を使用します。指定したテンプレート（JSX）を`document.body`にレンダリングします。

__型:__ `JSX.Template`

##### `html`

テストを生成するための初期HTML。これは、一緒に動作するコンポーネントのコレクションを構築し、HTML属性を割り当てるのに役立ちます。

__型:__ `string`

##### `language`

`<html>`にモックされた`lang`属性を設定します。

__型:__ `string`

##### `autoApplyChanges`

デフォルトでは、コンポーネントのプロパティや属性への変更は`env.waitForChanges()`を使用して更新をテストする必要があります。オプションとして、`autoApplyChanges`はバックグラウンドで継続的にキューをフラッシュします。

__型:__ `boolean`<br />
__デフォルト:__ `false`

##### `attachStyles`

デフォルトでは、スタイルはDOMに添付されず、シリアル化されたHTMLにも反映されません。このオプションを`true`に設定すると、コンポーネントのスタイルがシリアル化可能な出力に含まれます。

__型:__ `boolean`<br />
__デフォルト:__ `false`

#### レンダー環境

`render`メソッドは、コンポーネントの環境を管理するための特定のユーティリティヘルパーを提供する環境オブジェクトを返します。

##### `flushAll`

プロパティや属性の更新など、コンポーネントに変更が加えられた後、テストページは自動的に変更を適用しません。更新を待ち、適用するには、`await flushAll()`を呼び出します。

__型:__ `() => void`

##### `unmount`

DOMからコンテナ要素を削除します。

__型:__ `() => void`

##### `styles`

コンポーネントによって定義されたすべてのスタイル。

__型:__ `Record<string, string>`

##### `container`

テンプレートがレンダリングされるコンテナ要素。

__型:__ `HTMLElement`

##### `$container`

WebdriverIO要素としてのコンテナ要素。

__型:__ `WebdriverIO.Element`

##### `root`

テンプレートのルートコンポーネント。

__型:__ `HTMLElement`

##### `$root`

WebdriverIO要素としてのルートコンポーネント。

__型:__ `WebdriverIO.Element`

### `waitForChanges`

コンポーネントの準備が整うのを待つためのヘルパーメソッド。

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## 要素の更新

Stencilコンポーネントでプロパティやステートを定義する場合、これらの変更がコンポーネントに適用され、再レンダリングされるタイミングを管理する必要があります。

## 例

WebdriverIOコンポーネントテストスイートのStencil完全例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter)で確認できます。
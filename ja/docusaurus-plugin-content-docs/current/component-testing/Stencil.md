---
id: stencil
title: Stencil
description: "Stencilコンポーネント向けにWebdriverIOのブラウザランナーをセットアップし、renderヘルパーでレンダリングして、要素の更新を待機します。"
---

[Stencil](https://stenciljs.com/)は、再利用可能でスケーラブルなコンポーネントライブラリを構築するためのライブラリです。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用して、Stencilコンポーネントを実際のブラウザで直接テストできます。

## セットアップ

StencilプロジェクトでWebdriverIOをセットアップするには、コンポーネントテストのドキュメントにある[手順](/docs/component-testing#set-up)に従ってください。ランナーオプションでプリセットとして`stencil`を選択してください。例：

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

ReactやVueなどのフレームワークと一緒にStencilを使用している場合は、それらのフレームワーク用のプリセットを維持してください。

:::

その後、次のコマンドを実行してテストを開始できます：

```sh
npx wdio run ./wdio.conf.ts
```

## テストの作成

次のようなStencilコンポーネントがあるとします：

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

テストでは、`@wdio/browser-runner/stencil`の`render`メソッドを使用して、コンポーネントをテストページにアタッチします。コンポーネントを操作する際は、実際のユーザー操作により近い動作をするWebdriverIOコマンドの使用をお勧めします。例：

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

#### レンダリングオプション

`render`メソッドは次のオプションを提供します：

##### `components`

テストするコンポーネントの配列です。コンポーネントクラスをスペックファイルにインポートし、その参照を`component`配列に追加することで、テスト全体で使用できるようになります。

__型：__ `CustomElementConstructor[]`<br />
__デフォルト：__ `[]`

##### `flushQueue`

`false`の場合、初期テストセットアップ時にレンダーキューをフラッシュしません。

__型：__ `boolean`<br />
__デフォルト：__ `true`

##### `template`

テストの生成に使用される初期JSXです。HTML属性ではなくプロパティを使用してコンポーネントを初期化したい場合は、`template`を使用してください。指定されたテンプレート（JSX）を`document.body`にレンダリングします。

__型：__ `JSX.Template`

##### `html`

テストの生成に使用される初期HTMLです。連携して動作する複数のコンポーネントを構成したり、HTML属性を割り当てたりする場合に便利です。

__型：__ `string`

##### `language`

`<html>`にモックの`lang`属性を設定します。

__型：__ `string`

##### `autoApplyChanges`

デフォルトでは、コンポーネントのプロパティや属性に変更を加えた場合、更新をテストするには`env.waitForChanges()`を呼び出す必要があります。オプションとして、`autoApplyChanges`を使用するとバックグラウンドで継続的にキューをフラッシュします。

__型：__ `boolean`<br />
__デフォルト：__ `false`

##### `attachStyles`

デフォルトでは、スタイルはDOMにアタッチされず、シリアライズされたHTMLにも反映されません。このオプションを`true`に設定すると、コンポーネントのスタイルがシリアライズ可能な出力に含まれます。

__型：__ `boolean`<br />
__デフォルト：__ `false`

#### レンダリング環境

`render`メソッドは、コンポーネントの環境を管理するための便利なヘルパーを提供する環境オブジェクトを返します。

##### `flushAll`

プロパティや属性の更新など、コンポーネントに変更が加えられた後、テストページは自動的に変更を適用しません。更新を待機して適用するには、`await flushAll()`を呼び出してください。

__型：__ `() => void`

##### `unmount`

コンテナ要素をDOMから削除します。

__型：__ `() => void`

##### `styles`

コンポーネントによって定義されたすべてのスタイルです。

__型：__ `Record<string, string>`

##### `container`

テンプレートがレンダリングされるコンテナ要素です。

__型：__ `HTMLElement`

##### `$container`

WebdriverIO要素としてのコンテナ要素です。

__型：__ `WebdriverIO.Element`

##### `root`

テンプレートのルートコンポーネントです。

__型：__ `HTMLElement`

##### `$root`

WebdriverIO要素としてのルートコンポーネントです。

__型：__ `WebdriverIO.Element`

### `waitForChanges`

コンポーネントの準備が整うまで待機するためのヘルパーメソッドです。

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

Stencilコンポーネントでプロパティやステートを定義している場合、それらの変更をいつコンポーネントに適用して再レンダリングするかを管理する必要があります。


## 例

Stencil向けのWebdriverIOコンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter)で確認できます。
---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/)は、再利用可能でスケーラブルなコンポーネントライブラリを構築するためのライブラリです。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用して、実際のブラウザでStencilコンポーネントを直接テストできます。

## セットアップ

Stencilプロジェクト内でWebdriverIOをセットアップするには、コンポーネントテストドキュメントの[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内でプリセットとして`stencil`を選択してください。例：

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

StencilをReactやVueなどのフレームワークと一緒に使用する場合は、これらのフレームワーク用のプリセットを維持するべきです。

:::

その後、以下のコマンドでテストを開始できます：

```sh
npx wdio run ./wdio.conf.ts
```

## テストの記述

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

テストでは、`@wdio/browser-runner/stencil`から`render`メソッドを使用して、コンポーネントをテストページに取り付けます。コンポーネントと対話するには、実際のユーザーの操作に近い動作をするWebdriverIOコマンドを使用することをお勧めします：

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

`render`メソッドには以下のオプションがあります：

##### `components`

テストするコンポーネントの配列。コンポーネントクラスはspecファイルにインポートし、テスト全体で使用するために`component`配列に追加する必要があります。

__タイプ:__ `CustomElementConstructor[]`<br />
__デフォルト:__ `[]`

##### `flushQueue`

`false`の場合、初期テストセットアップでレンダーキューをフラッシュしません。

__タイプ:__ `boolean`<br />
__デフォルト:__ `true`

##### `template`

テストを生成するための初期JSX。プロパティを使用してコンポーネントを初期化する場合は、HTML属性ではなく`template`を使用します。指定されたテンプレート（JSX）を`document.body`にレンダリングします。

__タイプ:__ `JSX.Template`

##### `html`

テストを生成するための初期HTML。これは、連携して動作するコンポーネントのコレクションを構築し、HTML属性を割り当てるのに役立ちます。

__タイプ:__ `string`

##### `language`

`<html>`にモックされた`lang`属性を設定します。

__タイプ:__ `string`

##### `autoApplyChanges`

デフォルトでは、コンポーネントのプロパティと属性への変更は、更新をテストするために`env.waitForChanges()`が必要です。オプションとして、`autoApplyChanges`はバックグラウンドで継続的にキューをフラッシュします。

__タイプ:__ `boolean`<br />
__デフォルト:__ `false`

##### `attachStyles`

デフォルトでは、スタイルはDOMに添付されず、シリアル化されたHTMLに反映されません。このオプションを`true`に設定すると、コンポーネントのスタイルがシリアル化可能な出力に含まれます。

__タイプ:__ `boolean`<br />
__デフォルト:__ `false`

#### レンダー環境

`render`メソッドは、コンポーネントの環境を管理するためのユーティリティヘルパーを提供する環境オブジェクトを返します。

##### `flushAll`

プロパティや属性の更新など、コンポーネントに変更が加えられた後、テストページは自動的に変更を適用しません。更新を待ち、適用するには、`await flushAll()`を呼び出します。

__タイプ:__ `() => void`

##### `unmount`

DOMからコンテナ要素を削除します。

__タイプ:__ `() => void`

##### `styles`

コンポーネントによって定義されたすべてのスタイル。

__タイプ:__ `Record<string, string>`

##### `container`

テンプレートがレンダリングされるコンテナ要素。

__タイプ:__ `HTMLElement`

##### `$container`

WebdriverIO要素としてのコンテナ要素。

__タイプ:__ `WebdriverIO.Element`

##### `root`

テンプレートのルートコンポーネント。

__タイプ:__ `HTMLElement`

##### `$root`

WebdriverIO要素としてのルートコンポーネント。

__タイプ:__ `WebdriverIO.Element`

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

Stencilコンポーネントでプロパティや状態を定義する場合、これらの変更をコンポーネントに適用して再レンダリングするタイミングを管理する必要があります。

## 例

WebdriverIOのStencilコンポーネントテストスイートの完全な例は、私たちの[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter)にあります。
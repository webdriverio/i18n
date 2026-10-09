---
id: lit
title: Lit
description: "Lit Webコンポーネント向けにWebdriverIOブラウザランナーをセットアップし、ネストされたShadow Root内の要素をクエリするテストを作成します。"
---

Litは、高速で軽量なWebコンポーネントを構築するためのシンプルなライブラリです。WebdriverIOの[Shadow DOMセレクター](/docs/selectors#deep-selectors)のおかげで、Shadow Root内にネストされた要素をたった1つのコマンドでクエリできるため、WebdriverIOを使ったLit Webコンポーネントのテストは非常に簡単です。

## セットアップ

LitプロジェクトでWebdriverIOをセットアップするには、コンポーネントテストのドキュメントにある[手順](/docs/component-testing#set-up)に従ってください。Lit Webコンポーネントはコンパイラを通す必要がなく、純粋なWebコンポーネントの拡張であるため、Litではプリセットは必要ありません。

セットアップが完了したら、次のコマンドを実行してテストを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

## テストの作成

次のようなLitコンポーネントがあるとします：

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // コンポーネントの状態に応じてUIをレンダリングする
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

コンポーネントをテストするには、テスト開始前にテストページにコンポーネントをレンダリングし、テスト後に確実にクリーンアップされるようにする必要があります：

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// Litコンポーネントをインポート
import './components/Component.ts'

describe('Lit Component testing', () => {
    let elem: HTMLElement

    beforeEach(() => {
        elem = document.createElement('simple-greeting')
    })

    it('should render component', async () => {
        elem.setAttribute('name', 'WebdriverIO')
        document.body.appendChild(elem)

        await waitFor(() => {
            expect(elem.shadowRoot.textContent).toBe('Hello, WebdriverIO!')
        })
    })

    afterEach(() => {
        elem.remove()
    })
})
```

Lit向けのWebdriverIOコンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite)で確認できます。
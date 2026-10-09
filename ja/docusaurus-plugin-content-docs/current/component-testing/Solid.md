---
id: solid
title: SolidJS
description: "solidプリセットを使用してSolidJSプロジェクト用にWebdriverIOのブラウザランナーをセットアップし、ページにレンダリングするコンポーネントテストを作成します。"
---

[SolidJS](https://www.solidjs.com/)は、シンプルで高性能なリアクティビティを備えたユーザーインターフェースを構築するためのフレームワークです。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用すると、SolidJSコンポーネントを実際のブラウザで直接テストできます。

## セットアップ

SolidJSプロジェクト内でWebdriverIOをセットアップするには、コンポーネントテストのドキュメントにある[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内でプリセットとして`solid`を選択してください。例：

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

すでに開発サーバーとして[Vite](https://vitejs.dev/)を使用している場合は、`vite.config.ts`の設定をWebdriverIOの設定内で再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の`viteConfig`を参照してください。

:::

SolidJSプリセットを使用するには、`vite-plugin-solid`をインストールする必要があります：

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

その後、次のコマンドを実行してテストを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

## テストの作成

次のようなSolidJSコンポーネントがあるとします：

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

テストでは、`solid-js/web`の`render`メソッドを使用して、コンポーネントをテストページにアタッチします。コンポーネントを操作する際は、実際のユーザー操作により近い動作をするWebdriverIOのコマンドを使用することをお勧めします。例：

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * テストごとに新しいルートコンテナで
     * コンポーネントをレンダリングするようにする
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

SolidJS向けのWebdriverIOコンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite)で確認できます。
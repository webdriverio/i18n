---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/)は、シンプルで高性能な反応性を備えたユーザーインターフェースを構築するためのフレームワークです。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用して、実際のブラウザでSolidJSコンポーネントを直接テストできます。

## セットアップ

SolidJSプロジェクト内でWebdriverIOをセットアップするには、コンポーネントテストドキュメントの[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内でプリセットとして`solid`を選択してください。例：

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

すでに[Vite](https://vitejs.dev/)を開発サーバーとして使用している場合は、WebdriverIO設定内で`vite.config.ts`の設定を再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の`viteConfig`を参照してください。

:::

SolidJSプリセットには`vite-plugin-solid`のインストールが必要です：

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

その後、以下のコマンドでテストを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

## テストの作成

以下のようなSolidJSコンポーネントがあるとします：

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

テストでは、`solid-js/web`の`render`メソッドを使用してコンポーネントをテストページに取り付けます。コンポーネントを操作するには、実際のユーザーの操作に近い動作をするWebdriverIOコマンドを使用することをお勧めします：

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
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

WebdriverIOコンポーネントテストスイートのSolidJSの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite)で確認できます。
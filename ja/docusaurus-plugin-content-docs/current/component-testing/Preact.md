---
id: preact
title: Preact
---

[Preact](https://preactjs.com/)はReactの高速な3kB代替品で、同じ最新のAPIを持っています。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用して、実際のブラウザでPreactコンポーネントを直接テストできます。

## セットアップ

WebdriverIOをPreactプロジェクト内にセットアップするには、コンポーネントテストドキュメントの[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内でプリセットとして`preact`を選択していることを確認してください。例：

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'preact'
    }],
    // ...
}
```

:::info

すでに[Vite](https://vitejs.dev/)を開発サーバーとして使用している場合は、`vite.config.ts`の設定をWebdriverIO設定内で再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の`viteConfig`を参照してください。

:::

Preactプリセットには`@preact/preset-vite`のインストールが必要です。また、コンポーネントをテストページにレンダリングするために[Testing Library](https://testing-library.com/)の使用をお勧めします。そのために、以下の追加依存関係をインストールする必要があります：

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

次のコマンドを実行してテストを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

## テストの作成

以下のようなPreactコンポーネントがあるとします：

```tsx title="./components/Component.jsx"
import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
    initialCount: number
}

export function Counter({ initialCount }: Props) {
    const [count, setCount] = useState(initialCount)
    const increment = () => setCount(count + 1)

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
}

```

テストでは、`@testing-library/preact`から`render`メソッドを使用して、コンポーネントをテストページに接続します。コンポーネントと対話するには、実際のユーザー操作に近い動作をするWebdriverIOコマンドの使用をお勧めします。例：

```ts title="app.test.tsx"
import { expect } from 'expect'
import { render, screen } from '@testing-library/preact'

import { Counter } from './components/PreactComponent.js'

describe('Preact Component Testing', () => {
    it('should increment after "Increment" button is clicked', async () => {
        const component = await $(render(<Counter initialCount={5} />))
        await expect(component).toHaveText(expect.stringContaining('Current value: 5'))

        const incrElem = await $(screen.getByText('Increment'))
        await incrElem.click()
        await expect(component).toHaveText(expect.stringContaining('Current value: 6'))
    })
})
```

WebdriverIOコンポーネントテストスイートのPreact用の完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite)で確認できます。
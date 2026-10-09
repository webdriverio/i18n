---
id: preact
title: Preact
description: "preact プリセットを使用して Preact プロジェクト向けに WebdriverIO ブラウザランナーをセットアップし、Testing Library でコンポーネントテストを作成します。"
---

[Preact](https://preactjs.com/) は、React と同じモダンな API を備えた高速な 3kB の代替ライブラリです。WebdriverIO とその[ブラウザランナー](/docs/runner#browser-runner)を使用すると、実際のブラウザで Preact コンポーネントを直接テストできます。

## Setup

Preact プロジェクト内で WebdriverIO をセットアップするには、コンポーネントテストのドキュメントにある[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内でプリセットとして `preact` を選択してください。例:

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

すでに開発サーバーとして [Vite](https://vitejs.dev/) を使用している場合は、`vite.config.ts` の設定を WebdriverIO の設定内でそのまま再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の `viteConfig` を参照してください。

:::

Preact プリセットを使用するには、`@preact/preset-vite` がインストールされている必要があります。また、コンポーネントをテストページにレンダリングするには [Testing Library](https://testing-library.com/) の使用をお勧めします。そのため、以下の追加の依存関係をインストールする必要があります:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

その後、次のコマンドを実行してテストを開始できます:

```sh
npx wdio run ./wdio.conf.js
```

## Writing Tests

次のような Preact コンポーネントがあるとします:

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

テストでは、`@testing-library/preact` の `render` メソッドを使用してコンポーネントをテストページにアタッチします。コンポーネントを操作する際は、実際のユーザー操作により近い動作をする WebdriverIO のコマンドを使用することをお勧めします。例:

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

Preact 向けの WebdriverIO コンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite)で確認できます。
---
id: react
title: React
---

[React](https://reactjs.org/)はインタラクティブなUIを作成するのを簡単にします。アプリケーションの各状態に対してシンプルなビューを設計すれば、データが変更されたときにReactが効率的に適切なコンポーネントを更新およびレンダリングします。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用して、実際のブラウザでReactコンポーネントを直接テストできます。

## セットアップ

Reactプロジェクト内でWebdriverIOをセットアップするには、コンポーネントテストのドキュメントの[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内で `react` をプリセットとして選択してください：

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'react'
    }],
    // ...
}
```

:::info

すでに[Vite](https://vitejs.dev/)を開発サーバーとして使用している場合は、`vite.config.ts`の設定をWebdriverIO設定内で再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の `viteConfig` を参照してください。

:::

Reactプリセットには`@vitejs/plugin-react`のインストールが必要です。また、コンポーネントをテストページにレンダリングするために[Testing Library](https://testing-library.com/)の使用をお勧めします。以下の追加依存関係をインストールする必要があります：

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

その後、以下のコマンドでテストを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

## テストの作成

次のようなReactコンポーネントがあるとします：

```tsx title="./components/Component.jsx"
import React, { useState } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme}
    </button>
}

export default App
```

テストでは、`@testing-library/react`の`render`メソッドを使用してコンポーネントをテストページに接続します。コンポーネントとのインタラクションには、実際のユーザー操作に近い動作をするWebdriverIOコマンドの使用をお勧めします：

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './components/Component.jsx'

describe('React Component Testing', () => {
    it('Test theme button toggle', async () => {
        render(<App />)
        const buttonEl = screen.getByText(/Current theme/i)

        await $(buttonEl).click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

ReactのWebdriverIOコンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite)で確認できます。
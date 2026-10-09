---
id: react
title: React
description: "reactプリセットを使用してReactプロジェクト向けにWebdriverIOブラウザランナーをセットアップし、Testing Libraryでコンポーネントテストを作成します。"
---

[React](https://reactjs.org/)を使えば、インタラクティブなUIを簡単に作成できます。アプリケーションの各状態に対してシンプルなビューを設計するだけで、データが変更されたときにReactが適切なコンポーネントだけを効率的に更新・レンダリングします。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用すると、Reactコンポーネントを実際のブラウザで直接テストできます。

## セットアップ

ReactプロジェクトにWebdriverIOをセットアップするには、コンポーネントテストのドキュメントにある[手順](/docs/component-testing#set-up)に従ってください。ランナーオプションでプリセットとして`react`を選択してください。例：

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

すでに開発サーバーとして[Vite](https://vitejs.dev/)を使用している場合は、`vite.config.ts`の設定をWebdriverIOの設定内で再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の`viteConfig`を参照してください。

:::

Reactプリセットを使用するには、`@vitejs/plugin-react`がインストールされている必要があります。また、コンポーネントをテストページにレンダリングするために[Testing Library](https://testing-library.com/)の使用をお勧めします。そのため、以下の追加の依存関係をインストールする必要があります：

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

その後、次のコマンドを実行してテストを開始できます：

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

テストでは、`@testing-library/react`の`render`メソッドを使用してコンポーネントをテストページにアタッチします。コンポーネントを操作する際は、実際のユーザー操作により近い動作をするWebdriverIOコマンドの使用をお勧めします。例：

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

React向けのWebdriverIOコンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite)で確認できます。
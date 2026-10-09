---
id: svelte
title: Svelte
description: "svelteプリセットを使用してSvelteプロジェクトにWebdriverIOブラウザランナーをセットアップし、Testing Libraryでコンポーネントテストを作成します。"
---

[Svelte](https://svelte.dev/)は、ユーザーインターフェースを構築するための革新的な新しいアプローチです。ReactやVueのような従来のフレームワークが処理の大部分をブラウザ内で行うのに対し、Svelteはその処理をアプリのビルド時に行われるコンパイルステップに移行します。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用すると、Svelteコンポーネントを実際のブラウザで直接テストできます。

## セットアップ

SvelteプロジェクトでWebdriverIOをセットアップするには、コンポーネントテストのドキュメントにある[手順](/docs/component-testing#set-up)に従ってください。ランナーオプションでプリセットとして`svelte`を選択してください。例:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

すでに開発サーバーとして[Vite](https://vitejs.dev/)を使用している場合は、`vite.config.ts`の設定をWebdriverIOの設定内で再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の`viteConfig`を参照してください。

:::

Svelteプリセットを使用するには、`@sveltejs/vite-plugin-svelte`がインストールされている必要があります。また、コンポーネントをテストページにレンダリングするために[Testing Library](https://testing-library.com/)の使用を推奨します。そのため、以下の追加の依存関係をインストールする必要があります:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

その後、次のコマンドを実行してテストを開始できます:

```sh
npx wdio run ./wdio.conf.js
```

## テストの作成

次のようなSvelteコンポーネントがあるとします:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

テストでは、`@testing-library/svelte`の`render`メソッドを使用してコンポーネントをテストページにアタッチします。コンポーネントを操作する際は、実際のユーザー操作により近い動作をするWebdriverIOのコマンドを使用することを推奨します。例:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

Svelte向けのWebdriverIOコンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite)で確認できます。
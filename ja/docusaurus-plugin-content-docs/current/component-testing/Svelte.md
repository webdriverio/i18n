---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/)はユーザーインターフェイスを構築するための革新的な新しいアプローチです。ReactやVueのような従来のフレームワークがブラウザ内で大部分の処理を行うのに対し、Svelteはアプリをビルドする際のコンパイルステップにその処理を移行します。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用して、実際のブラウザで直接Svelteコンポーネントをテストできます。

## セットアップ

SvelteプロジェクトでWebdriverIOをセットアップするには、コンポーネントテストドキュメントの[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内でプリセットとして`svelte`を選択してください：

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

すでに[Vite](https://vitejs.dev/)を開発サーバーとして使用している場合は、WebdriverIO設定内で`vite.config.ts`の設定を再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の`viteConfig`を参照してください。

:::

Svelteプリセットには`@sveltejs/vite-plugin-svelte`のインストールが必要です。また、コンポーネントをテストページにレンダリングするために[Testing Library](https://testing-library.com/)の使用をお勧めします。そのため、以下の追加依存関係をインストールする必要があります：

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

その後、以下のコマンドでテストを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

## テストの作成

以下のようなSvelteコンポーネントがあるとします：

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

テストでは、`@testing-library/svelte`から`render`メソッドを使用して、コンポーネントをテストページに接続します。コンポーネントとのインタラクションには、実際のユーザーインタラクションに近い動作をするWebdriverIOコマンドの使用をお勧めします：

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

WebdriverIOコンポーネントテストスイートのSvelteに関する完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite)で確認できます。
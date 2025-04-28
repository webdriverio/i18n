---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) は使いやすく、パフォーマンスが高く、汎用性のあるWeb UIフレームワークです。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用して、実際のブラウザで直接Vue.jsコンポーネントをテストできます。

## セットアップ

Vue.jsプロジェクト内でWebdriverIOを設定するには、コンポーネントテストドキュメントの[手順](/docs/component-testing#set-up)に従ってください。ランナーオプション内でプリセットとして`vue`を選択してください：

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'vue'
    }],
    // ...
}
```

:::info

すでに[Vite](https://vitejs.dev/)を開発サーバーとして使用している場合は、`vite.config.ts`の設定をWebdriverIO設定内で再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の`viteConfig`を参照してください。

:::

Vueプリセットには`@vitejs/plugin-vue`のインストールが必要です。また、コンポーネントをテストページにレンダリングするために[Testing Library](https://testing-library.com/)の使用をお勧めします。そのため、以下の追加依存関係をインストールする必要があります：

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

その後、以下のコマンドでテストを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

## テストの記述

以下のようなVue.jsコンポーネントがあるとします：

```tsx title="./components/Component.vue"
<template>
    <div>
        <p>Times clicked: {{ count }}</p>
        <button @click="increment">increment</button>
    </div>
</template>

<script>
export default {
    data: () => ({
        count: 0,
    }),

    methods: {
        increment() {
            this.count++
        },
    },
}
</script>
```

テストでは、コンポーネントをDOMにレンダリングして、アサーションを実行します。コンポーネントをテストページにアタッチするには、[`@vue/test-utils`](https://test-utils.vuejs.org/)または[`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/)のいずれかを使用することをお勧めします。コンポーネントとのインタラクションには、実際のユーザーインタラクションに近い動作をするWebdriverIOコマンドを使用してください：


<Tabs
  defaultValue="utils"
  values={[
    {label: '@vue/test-utils', value: 'utils'},
    {label: '@testing-library/vue', value: 'testinglib'}
 ]
}>
<TabItem value="utils">

```ts title="vue.test.js"
import { $, expect } from '@wdio/globals'
import { mount } from '@vue/test-utils'
import Component from './components/Component.vue'

describe('Vue Component Testing', () => {
    it('increments value on click', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // Dispatch a native click event to our button element.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // same assertion with WebdriverIO
    })
})
```

</TabItem>
<TabItem value="testinglib">

```ts title="vue.test.js"
import { $, expect } from '@wdio/globals'
import { render } from '@testing-library/vue'
import Component from './components/Component.vue'

describe('Vue Component Testing', () => {
    it('increments value on click', async () => {
        // The render method returns a collection of utilities to query your component.
        const { getByText } = render(Component)

        // getByText returns the first matching node for the provided text, and
        // throws an error if no elements match or if more than one match is found.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // Dispatch a native click event to our button element.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // assert with Testing Library
        await expect($('p=Times clicked: 2')).toExist() // assert with WebdriverIO
    })
})
```

</TabItem>
</Tabs>

Vue.js向けのWebdriverIOコンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite)で確認できます。

## Vue3での非同期コンポーネントのテスト

Vue v3を使用していて、以下のような[非同期コンポーネント](https://vuejs.org/guide/built-ins/suspense.html#async-setup)をテストしている場合：

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

[`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils)と簡単なサスペンスラッパーを使用してコンポーネントをレンダリングすることをお勧めします。残念ながら[`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230)はまだこれをサポートしていません。以下の内容で`helper.ts`ファイルを作成してください：

```ts
import { mount, type VueWrapper as VueWrapperImport } from '@vue/test-utils'
import { Suspense } from 'vue'

export type VueWrapper = VueWrapperImport<any>
const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout

export function flushPromises(): Promise<void> {
  return new Promise((resolve) => {
    scheduler(resolve, 0)
  })
}

export function wrapInSuspense(
  component: ReturnType<typeof defineComponent>,
  { props }: { props: object },
): ReturnType<typeof defineComponent> {
  return defineComponent({
    render() {
      return h(
        'div',
        { id: 'root' },
        h(Suspense, null, {
          default() {
            return h(component, props)
          },
          fallback: h('div', 'fallback'),
        }),
      )
    },
  })
}

export function renderAsyncComponent(vueComponent: ReturnType<typeof defineComponent>, props: object): VueWrapper{
    const component = wrapInSuspense(vueComponent, { props })
    return mount(component, { attachTo: document.body })
}
```

次に、以下のようにコンポーネントをインポートしてテストします：

```ts
import { $, expect } from '@wdio/globals'

import { renderAsyncComponent, flushPromises, type VueWrapper } from './helpers.js'
import AsyncComponent from '/components/SomeAsyncComponent.vue'

describe('Testing Async Components', () => {
    let wrapper: VueWrapper

    it('should display component correctly', async () => {
        const props = {}
        wrapper = renderAsyncComponent(AsyncComponent, { props })
        await flushPromises()
        await expect($('...')).toBePresent()
    })

    afterEach(() => {
        wrapper.unmount()
    })
})
```

## NuxtでのVueコンポーネントのテスト

Webフレームワーク[Nuxt](https://nuxt.com/)を使用している場合、WebdriverIOは自動的に[自動インポート](https://nuxt.com/docs/guide/concepts/auto-imports)機能を有効にし、Vueコンポーネントとヌクストページのテストを容易にします。ただし、設定で定義されているNuxtアプリケーションのコンテキストを必要とする[Nuxtモジュール](https://nuxt.com/modules)はサポートされません。

__理由は以下の通りです：__
- WebdriverIOはブラウザ環境だけでNuxtアプリケーションを開始できません
- コンポーネントテストがNuxt環境に過度に依存すると複雑さが増すため、これらのテストはe2eテストとして実行することをお勧めします

:::info

WebdriverIOはNuxtアプリケーションでe2eテストを実行するためのサービスも提供しています。詳細は[`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service)を参照してください。

:::

### 組み込みコンポーザブルのモック

コンポーネントがネイティブのNuxtコンポーザブル（例：[`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data)）を使用している場合、WebdriverIOは自動的にこれらの関数をモック化し、その動作を変更したり、それに対してアサーションを行ったりすることができます：

```ts
import { mocked } from '@wdio/browser-runner'

// 例：コンポーネントが次のように`useNuxtData`を呼び出す場合
// `const { data: posts } = useNuxtData('posts')`
// テストでは次のようにアサートできます
expect(useNuxtData).toBeCalledWith('posts')
// そして動作を変更することもできます
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### サードパーティのコンポーザブルの処理

Nuxtプロジェクトを強化できる[サードパーティモジュール](https://nuxt.com/modules)は自動的にモック化されません。そのような場合は手動でモック化する必要があります。例えば、アプリケーションが[Supabase](https://nuxt.com/modules/supabase)モジュールプラグインを使用している場合：

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

そして、コンポーザブルのどこかでSupabaseのインスタンスを作成する場合：

```ts
const superbase = useSupabaseClient()
```

テストは次のエラーで失敗します：

```
ReferenceError: useSupabaseClient is not defined
```

この場合、`useSupabaseClient`関数を使用するモジュール全体をモック化するか、この関数をモック化するグローバル変数を作成することをお勧めします：

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
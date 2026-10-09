---
id: vue
title: Vue.js
description: "Vue.js向けにWebdriverIOブラウザランナーをセットアップし、Testing Libraryを使ってコンポーネントテストを作成し、非同期コンポーネントやNuxtアプリをテストします。"
---

[Vue.js](https://vuejs.org/)は、Webユーザーインターフェースを構築するための、親しみやすく、高性能で、汎用性の高いフレームワークです。WebdriverIOとその[ブラウザランナー](/docs/runner#browser-runner)を使用すると、Vue.jsコンポーネントを実際のブラウザで直接テストできます。

## セットアップ

Vue.jsプロジェクトでWebdriverIOをセットアップするには、コンポーネントテストのドキュメントにある[手順](/docs/component-testing#set-up)に従ってください。ランナーオプションでプリセットとして`vue`を選択してください。例：

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

すでに開発サーバーとして[Vite](https://vitejs.dev/)を使用している場合は、`vite.config.ts`の設定をWebdriverIOの設定内で再利用することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)の`viteConfig`を参照してください。

:::

Vueプリセットには`@vitejs/plugin-vue`のインストールが必要です。また、コンポーネントをテストページにレンダリングするために[Testing Library](https://testing-library.com/)の使用をお勧めします。そのため、以下の追加の依存関係をインストールする必要があります：

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

その後、以下を実行してテストを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

## テストの作成

次のようなVue.jsコンポーネントがあるとします：

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

テストでは、コンポーネントをDOMにレンダリングし、それに対してアサーションを実行します。コンポーネントをテストページにアタッチするには、[`@vue/test-utils`](https://test-utils.vuejs.org/)または[`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/)のいずれかを使用することをお勧めします。コンポーネントを操作するには、実際のユーザー操作により近い動作をするWebdriverIOコマンドを使用してください。例：


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
        // renderメソッドは、コンポーネントをクエリするためのユーティリティのコレクションを返します。
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // ボタン要素にネイティブのクリックイベントをディスパッチします。
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // WebdriverIOでの同じアサーション
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
        // renderメソッドは、コンポーネントをクエリするためのユーティリティのコレクションを返します。
        const { getByText } = render(Component)

        // getByTextは指定されたテキストに最初に一致するノードを返し、
        // 一致する要素がない場合や複数見つかった場合はエラーをスローします。
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // ボタン要素にネイティブのクリックイベントをディスパッチします。
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // Testing Libraryでアサート
        await expect($('p=Times clicked: 2')).toExist() // WebdriverIOでアサート
    })
})
```

</TabItem>
</Tabs>

Vue.js向けのWebdriverIOコンポーネントテストスイートの完全な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite)で確認できます。

## Vue3での非同期コンポーネントのテスト

Vue v3を使用していて、次のような[非同期コンポーネント](https://vuejs.org/guide/built-ins/suspense.html#async-setup)をテストする場合：

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

コンポーネントをレンダリングするために、[`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils)と小さなsuspenseラッパーを使用することをお勧めします。残念ながら、[`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230)はまだこれをサポートしていません。次の内容で`helper.ts`ファイルを作成してください：

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

Webフレームワーク[Nuxt](https://nuxt.com/)を使用している場合、WebdriverIOは自動的に[自動インポート](https://nuxt.com/docs/guide/concepts/auto-imports)機能を有効にし、VueコンポーネントやNuxtページのテストを簡単にします。ただし、設定で定義している[Nuxtモジュール](https://nuxt.com/modules)のうち、Nuxtアプリケーションへのコンテキストを必要とするものはサポートできません。

__その理由は以下の通りです：__
- WebdriverIOはブラウザ環境だけではNuxtアプリケーションを起動できない
- コンポーネントテストがNuxt環境に過度に依存すると複雑さが増すため、これらのテストはe2eテストとして実行することをお勧めします

:::info

WebdriverIOは、Nuxtアプリケーションでe2eテストを実行するためのサービスも提供しています。詳細については[`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service)を参照してください。

:::

### 組み込みコンポーザブルのモック

コンポーネントが[`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data)などのネイティブNuxtコンポーザブルを使用している場合、WebdriverIOはこれらの関数を自動的にモックし、その動作を変更したり、それに対してアサートしたりすることができます。例：

```ts
import { mocked } from '@wdio/browser-runner'

// 例えば、コンポーネントが次のように`useNuxtData`を呼び出している場合
// `const { data: posts } = useNuxtData('posts')`
// テスト内でそれに対してアサートできます
expect(useNuxtData).toBeCalledWith('posts')
// また、その動作を変更することもできます
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### サードパーティ製コンポーザブルの扱い

Nuxtプロジェクトを強化できる[サードパーティ製モジュール](https://nuxt.com/modules)はすべて、自動的にモックすることができません。そのような場合は、手動でモックする必要があります。例えば、アプリケーションが[Supabase](https://nuxt.com/modules/supabase)モジュールプラグインを使用している場合：

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

そして、コンポーザブルのどこかでSupabaseのインスタンスを作成している場合、例えば：

```ts
const superbase = useSupabaseClient()
```

テストは次の理由で失敗します：

```
ReferenceError: useSupabaseClient is not defined
```

この場合、`useSupabaseClient`関数を使用しているモジュール全体をモックするか、この関数をモックするグローバル変数を作成することをお勧めします。例：

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
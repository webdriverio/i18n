---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) 是一个易于上手、高性能且多功能的构建 Web 用户界面的框架。你可以使用 WebdriverIO 及其[浏览器运行器](/docs/runner#browser-runner)在真实浏览器中直接测试 Vue.js 组件。

## 设置

要在 Vue.js 项目中设置 WebdriverIO，请参照我们组件测试文档中的[指南](/docs/component-testing#set-up)。确保在运行器选项中选择 `vue` 作为预设，例如：

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

如果你已经在使用 [Vite](https://vitejs.dev/) 作为开发服务器，你也可以在 WebdriverIO 配置中重用 `vite.config.ts` 中的配置。有关更多信息，请参见[运行器选项](/docs/runner#runner-options)中的 `viteConfig`。

:::

Vue 预设需要安装 `@vitejs/plugin-vue`。此外，我们建议使用 [Testing Library](https://testing-library.com/) 来将组件渲染到测试页面中。因此，你需要安装以下额外的依赖项：

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

然后你可以通过运行以下命令启动测试：

```sh
npx wdio run ./wdio.conf.js
```

## 编写测试

假设你有以下 Vue.js 组件：

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

在你的测试中，将组件渲染到 DOM 中并对其进行断言。我们建议使用 [`@vue/test-utils`](https://test-utils.vuejs.org/) 或 [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) 将组件附加到测试页面。要与组件交互，请使用 WebdriverIO 命令，因为它们的行为更接近于实际用户交互，例如：


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

你可以在我们的[示例仓库](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite)中找到 Vue.js 的 WebdriverIO 组件测试套件的完整示例。

## 在 Vue3 中测试异步组件

如果你正在使用 Vue v3 并测试[异步组件](https://vuejs.org/guide/built-ins/suspense.html#async-setup)，如下所示：

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

我们建议使用 [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) 和一个小的 suspense 包装器来渲染组件。不幸的是，[`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) 目前还不支持这一点。创建一个 `helper.ts` 文件，内容如下：

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

然后按如下方式导入并测试组件：

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

## 在 Nuxt 中测试 Vue 组件

如果你正在使用 Web 框架 [Nuxt](https://nuxt.com/)，WebdriverIO 将自动启用[自动导入](https://nuxt.com/docs/guide/concepts/auto-imports)功能，使测试 Vue 组件和 Nuxt 页面变得容易。但是，你可能在配置中定义的任何需要 Nuxt 应用程序上下文的 [Nuxt 模块](https://nuxt.com/modules) 都不能得到支持。

__原因如下：__
- WebdriverIO 无法仅在浏览器环境中启动 Nuxt 应用程序
- 让组件测试过于依赖 Nuxt 环境会增加复杂性，我们建议将这些测试作为 e2e 测试运行

:::info

WebdriverIO 还提供了一个用于在 Nuxt 应用程序上运行 e2e 测试的服务，有关信息请参见 [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service)。

:::

### 模拟内置的组合式函数

如果你的组件使用了原生的 Nuxt 组合式函数，例如 [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data)，WebdriverIO 将自动模拟这些函数，并允许你修改它们的行为或对它们进行断言，例如：

```ts
import { mocked } from '@wdio/browser-runner'

// e.g. your component uses calls `useNuxtData` the following way
// `const { data: posts } = useNuxtData('posts')`
// in your test you can assert against it
expect(useNuxtData).toBeCalledWith('posts')
// and change their behavior
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### 处理第三方组合式函数

所有可以增强 Nuxt 项目的[第三方模块](https://nuxt.com/modules)不能自动被模拟。在这些情况下，你需要手动模拟它们，例如，假设你的应用程序使用了 [Supabase](https://nuxt.com/modules/supabase) 模块插件：

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

并且你在某处的组合式函数中创建了一个 Supabase 实例，例如：

```ts
const superbase = useSupabaseClient()
```

测试将会失败，错误为：

```
ReferenceError: useSupabaseClient is not defined
```

在这里，我们建议要么模拟使用 `useSupabaseClient` 函数的整个模块，要么创建一个模拟此函数的全局变量，例如：

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
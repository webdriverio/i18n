---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) là một framework linh hoạt, hiệu quả và dễ tiếp cận để xây dựng giao diện người dùng web. Bạn có thể kiểm thử các component Vue.js trực tiếp trong trình duyệt thực bằng cách sử dụng WebdriverIO và [browser runner](/docs/runner#browser-runner) của nó.

## Thiết lập

Để thiết lập WebdriverIO trong dự án Vue.js của bạn, hãy làm theo [hướng dẫn](/docs/component-testing#set-up) trong tài liệu kiểm thử component của chúng tôi. Đảm bảo chọn `vue` làm preset trong tùy chọn runner của bạn, ví dụ:

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

Nếu bạn đã sử dụng [Vite](https://vitejs.dev/) làm máy chủ phát triển, bạn cũng có thể tái sử dụng cấu hình của mình trong `vite.config.ts` trong cấu hình WebdriverIO. Để biết thêm thông tin, xem `viteConfig` trong [tùy chọn runner](/docs/runner#runner-options).

:::

Preset Vue yêu cầu cài đặt `@vitejs/plugin-vue`. Ngoài ra, chúng tôi khuyên bạn nên sử dụng [Testing Library](https://testing-library.com/) để render component vào trang kiểm thử. Do đó, bạn cần cài đặt các dependency bổ sung sau:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Sau đó, bạn có thể bắt đầu các bài kiểm thử bằng cách chạy:

```sh
npx wdio run ./wdio.conf.js
```

## Viết bài kiểm thử

Giả sử bạn có component Vue.js sau:

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

Trong bài kiểm thử của bạn, hãy render component vào DOM và chạy các assertion trên đó. Chúng tôi khuyên bạn nên sử dụng [`@vue/test-utils`](https://test-utils.vuejs.org/) hoặc [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) để gắn component vào trang kiểm thử. Để tương tác với component, hãy sử dụng các lệnh WebdriverIO vì chúng hoạt động gần với tương tác người dùng thực tế hơn, ví dụ:


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

Bạn có thể tìm thấy ví dụ đầy đủ về bộ kiểm thử component WebdriverIO cho Vue.js trong [kho lưu trữ ví dụ](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) của chúng tôi.

## Kiểm thử Async Components trong Vue3

Nếu bạn đang sử dụng Vue v3 và đang kiểm thử [async components](https://vuejs.org/guide/built-ins/suspense.html#async-setup) như sau:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Chúng tôi khuyên bạn nên sử dụng [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) và một suspense wrapper nhỏ để render component. Tiếc rằng [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) chưa hỗ trợ điều này. Tạo một tệp `helper.ts` với nội dung sau:

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

Sau đó import và kiểm thử component như sau:

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

## Kiểm thử Vue Components trong Nuxt

Nếu bạn đang sử dụng web framework [Nuxt](https://nuxt.com/), WebdriverIO sẽ tự động kích hoạt tính năng [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) và giúp việc kiểm thử các Vue component và Nuxt pages trở nên dễ dàng. Tuy nhiên, bất kỳ [Nuxt modules](https://nuxt.com/modules) nào mà bạn có thể định nghĩa trong cấu hình và yêu cầu ngữ cảnh đến ứng dụng Nuxt đều không được hỗ trợ.

__Lý do cho điều đó là:__
- WebdriverIO không thể khởi tạo một ứng dụng Nuxt riêng trong môi trường trình duyệt
- Việc để các bài kiểm thử component phụ thuộc quá nhiều vào môi trường Nuxt tạo ra sự phức tạp và chúng tôi khuyên bạn nên chạy các bài kiểm thử này như các bài kiểm thử e2e

:::info

WebdriverIO cũng cung cấp một service để chạy các bài kiểm thử e2e trên ứng dụng Nuxt, xem [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) để biết thêm thông tin.

:::

### Giả lập các composables tích hợp

Trong trường hợp component của bạn sử dụng một composable gốc của Nuxt, ví dụ: [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO sẽ tự động giả lập các hàm này và cho phép bạn sửa đổi hành vi của chúng hoặc kiểm tra chúng, ví dụ:

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

### Xử lý các composables của bên thứ 3

Tất cả [modules của bên thứ 3](https://nuxt.com/modules) có thể nâng cao dự án Nuxt của bạn không thể được giả lập tự động. Trong những trường hợp đó, bạn cần phải giả lập chúng thủ công, ví dụ: giả sử ứng dụng của bạn sử dụng plugin module [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

và bạn tạo một instance của Supabase ở đâu đó trong composables của bạn, ví dụ:

```ts
const superbase = useSupabaseClient()
```

bài kiểm thử sẽ thất bại vì:

```
ReferenceError: useSupabaseClient is not defined
```

Ở đây, chúng tôi khuyên bạn nên giả lập toàn bộ module sử dụng hàm `useSupabaseClient` hoặc tạo một biến toàn cục giả lập hàm này, ví dụ:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
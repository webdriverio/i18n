---
id: vue
title: ویو.جی‌اس
---

[Vue.js](https://vuejs.org/) یک فریم‌ورک قابل دسترس، کارآمد و انعطاف‌پذیر برای ساخت رابط‌های کاربری وب است. شما می‌توانید کامپوننت‌های Vue.js را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [browser runner](/docs/runner#browser-runner) آن آزمایش کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Vue.js خود، [دستورالعمل‌ها](/docs/component-testing#set-up) را در مستندات تست کامپوننت ما دنبال کنید. مطمئن شوید که `vue` را به عنوان پیش‌تنظیم در گزینه‌های اجراکننده خود انتخاب کنید، مثلاً:

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

اگر شما قبلاً از [Vite](https://vitejs.dev/) به عنوان سرور توسعه استفاده می‌کنید، می‌توانید پیکربندی خود را در `vite.config.ts` نیز در پیکربندی WebdriverIO خود مجدداً استفاده کنید. برای اطلاعات بیشتر، به `viteConfig` در [گزینه‌های اجراکننده](/docs/runner#runner-options) مراجعه کنید.

:::

پیش‌تنظیم Vue نیاز به نصب `@vitejs/plugin-vue` دارد. همچنین ما استفاده از [Testing Library](https://testing-library.com/) را برای رندر کردن کامپوننت در صفحه تست توصیه می‌کنیم. بنابراین شما نیاز به نصب وابستگی‌های اضافی زیر دارید:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

با فرض اینکه شما کامپوننت Vue.js زیر را دارید:

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

در تست خود، کامپوننت را در DOM رندر کنید و اعتبارسنجی‌ها را روی آن اجرا کنید. ما توصیه می‌کنیم یا از [`@vue/test-utils`](https://test-utils.vuejs.org/) یا [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) برای اتصال کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت از دستورات WebdriverIO استفاده کنید زیرا آنها شبیه به تعاملات واقعی کاربر رفتار می‌کنند، مثلاً:


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

شما می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای Vue.js را در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) ما پیدا کنید.

## تست کامپوننت‌های غیرهمزمان در Vue3

اگر از Vue v3 استفاده می‌کنید و در حال تست [کامپوننت‌های غیرهمزمان](https://vuejs.org/guide/built-ins/suspense.html#async-setup) مانند زیر هستید:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

ما توصیه می‌کنیم از [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) و یک wrapper کوچک suspense برای رندر کردن کامپوننت استفاده کنید. متأسفانه [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) هنوز از این ویژگی پشتیبانی نمی‌کند. یک فایل `helper.ts` با محتوای زیر ایجاد کنید:

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

سپس کامپوننت را به صورت زیر import و تست کنید:

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

## تست کامپوننت‌های Vue در Nuxt

اگر از فریم‌ورک وب [Nuxt](https://nuxt.com/) استفاده می‌کنید، WebdriverIO به طور خودکار ویژگی [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) را فعال می‌کند و تست کامپوننت‌های Vue و صفحات Nuxt شما را آسان می‌سازد. با این حال، هر [ماژول Nuxt](https://nuxt.com/modules) که ممکن است در پیکربندی خود تعریف کنید و به زمینه برنامه Nuxt نیاز داشته باشد، پشتیبانی نمی‌شود.

__دلایل آن عبارتند از:__
- WebdriverIO نمی‌تواند یک برنامه Nuxt را فقط در محیط مرورگر راه‌اندازی کند
- وابستگی زیاد تست‌های کامپوننت به محیط Nuxt پیچیدگی ایجاد می‌کند و ما توصیه می‌کنیم این تست‌ها را به عنوان تست‌های e2e اجرا کنید

:::info

WebdriverIO همچنین سرویسی برای اجرای تست‌های e2e در برنامه‌های Nuxt ارائه می‌دهد، برای اطلاعات بیشتر به [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) مراجعه کنید.

:::

### شبیه‌سازی composable‌های داخلی

در صورتی که کامپوننت شما از یک composable بومی Nuxt استفاده می‌کند، مثلاً [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data)، WebdriverIO به طور خودکار این توابع را شبیه‌سازی می‌کند و به شما امکان می‌دهد رفتار آنها را تغییر دهید یا در مقابل آنها اعتبارسنجی کنید، مثلاً:

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

### مدیریت composable‌های شخص ثالث

تمام [ماژول‌های شخص ثالث](https://nuxt.com/modules) که می‌توانند پروژه Nuxt شما را تقویت کنند، به طور خودکار شبیه‌سازی نمی‌شوند. در این موارد، شما باید آنها را به صورت دستی شبیه‌سازی کنید، مثلاً فرض کنید برنامه شما از افزونه ماژول [Supabase](https://nuxt.com/modules/supabase) استفاده می‌کند:

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

و شما در جایی در composable‌های خود یک نمونه از Supabase ایجاد می‌کنید، مثلاً:

```ts
const superbase = useSupabaseClient()
```

تست به دلیل خطای زیر شکست خواهد خورد:

```
ReferenceError: useSupabaseClient is not defined
```

در اینجا، ما توصیه می‌کنیم یا کل ماژولی که از تابع `useSupabaseClient` استفاده می‌کند را شبیه‌سازی کنید یا یک متغیر جهانی ایجاد کنید که این تابع را شبیه‌سازی می‌کند، مثلاً:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
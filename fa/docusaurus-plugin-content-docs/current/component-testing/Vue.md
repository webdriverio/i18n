---
id: vue
title: Vue.js
description: "راه‌اندازی اجراکننده مرورگر WebdriverIO برای Vue.js، نوشتن تست‌های کامپوننت با Testing Library و تست کامپوننت‌های async و برنامه‌های Nuxt."
---

[Vue.js](https://vuejs.org/) یک فریم‌ورک در دسترس، کارآمد و همه‌کاره برای ساخت رابط‌های کاربری وب است. شما می‌توانید کامپوننت‌های Vue.js را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Vue.js خود، [دستورالعمل‌ها](/docs/component-testing#set-up) را در مستندات تست کامپوننت ما دنبال کنید. حتماً `vue` را به عنوان پیش‌تنظیم (preset) در گزینه‌های اجراکننده خود انتخاب کنید، به عنوان مثال:

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

اگر در حال حاضر از [Vite](https://vitejs.dev/) به عنوان سرور توسعه استفاده می‌کنید، می‌توانید به سادگی پیکربندی خود در `vite.config.ts` را در پیکربندی WebdriverIO خود مجدداً استفاده کنید. برای اطلاعات بیشتر، `viteConfig` را در [گزینه‌های اجراکننده](/docs/runner#runner-options) ببینید.

:::

پیش‌تنظیم Vue نیاز به نصب `@vitejs/plugin-vue` دارد. همچنین ما استفاده از [Testing Library](https://testing-library.com/) را برای رندر کردن کامپوننت در صفحه تست توصیه می‌کنیم. بنابراین باید وابستگی‌های اضافی زیر را نصب کنید:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

فرض کنید کامپوننت Vue.js زیر را دارید:

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

در تست خود، کامپوننت را در DOM رندر کنید و ادعاهای (assertions) خود را روی آن اجرا کنید. ما توصیه می‌کنیم از [`@vue/test-utils`](https://test-utils.vuejs.org/) یا [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) برای متصل کردن کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت از دستورات WebdriverIO استفاده کنید، زیرا رفتار آن‌ها به تعاملات واقعی کاربر نزدیک‌تر است، به عنوان مثال:


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
        // متد render مجموعه‌ای از ابزارها را برای جستجو در کامپوننت شما برمی‌گرداند.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // ارسال یک رویداد کلیک بومی به عنصر دکمه ما.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // همان ادعا با WebdriverIO
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
        // متد render مجموعه‌ای از ابزارها را برای جستجو در کامپوننت شما برمی‌گرداند.
        const { getByText } = render(Component)

        // getByText اولین گره منطبق با متن داده شده را برمی‌گرداند، و
        // اگر هیچ عنصری منطبق نباشد یا بیش از یک مورد منطبق پیدا شود، خطا می‌دهد.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // ارسال یک رویداد کلیک بومی به عنصر دکمه ما.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // ادعا با Testing Library
        await expect($('p=Times clicked: 2')).toExist() // ادعا با WebdriverIO
    })
})
```

</TabItem>
</Tabs>

می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای Vue.js را در [مخزن نمونه‌های](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) ما پیدا کنید.

## تست کامپوننت‌های Async در Vue3

اگر از Vue نسخه ۳ استفاده می‌کنید و [کامپوننت‌های async](https://vuejs.org/guide/built-ins/suspense.html#async-setup) مانند نمونه زیر را تست می‌کنید:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

ما توصیه می‌کنیم از [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) و یک wrapper کوچک suspense برای رندر کردن کامپوننت استفاده کنید. متأسفانه [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) هنوز از این قابلیت پشتیبانی نمی‌کند. یک فایل `helper.ts` با محتوای زیر ایجاد کنید:

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

اگر از فریم‌ورک وب [Nuxt](https://nuxt.com/) استفاده می‌کنید، WebdriverIO به طور خودکار قابلیت [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) را فعال می‌کند و تست کامپوننت‌های Vue و صفحات Nuxt شما را آسان می‌سازد. با این حال، هیچ‌یک از [ماژول‌های Nuxt](https://nuxt.com/modules) که ممکن است در پیکربندی خود تعریف کنید و به context برنامه Nuxt نیاز دارند، قابل پشتیبانی نیستند.

__دلایل این موضوع عبارتند از:__
- WebdriverIO نمی‌تواند یک برنامه Nuxt را صرفاً در محیط مرورگر راه‌اندازی کند
- وابستگی بیش از حد تست‌های کامپوننت به محیط Nuxt پیچیدگی ایجاد می‌کند و ما توصیه می‌کنیم این تست‌ها را به صورت تست‌های e2e اجرا کنید

:::info

WebdriverIO همچنین یک سرویس برای اجرای تست‌های e2e روی برنامه‌های Nuxt ارائه می‌دهد، برای اطلاعات بیشتر [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) را ببینید.

:::

### Mock کردن composableهای داخلی

در صورتی که کامپوننت شما از یک composable بومی Nuxt مانند [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data) استفاده کند، WebdriverIO به طور خودکار این توابع را mock می‌کند و به شما امکان می‌دهد رفتار آن‌ها را تغییر دهید یا روی آن‌ها ادعا (assert) کنید، به عنوان مثال:

```ts
import { mocked } from '@wdio/browser-runner'

// به عنوان مثال، کامپوننت شما `useNuxtData` را به روش زیر فراخوانی می‌کند
// `const { data: posts } = useNuxtData('posts')`
// در تست خود می‌توانید روی آن ادعا کنید
expect(useNuxtData).toBeCalledWith('posts')
// و رفتار آن را تغییر دهید
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### مدیریت composableهای شخص ثالث

تمام [ماژول‌های شخص ثالث](https://nuxt.com/modules) که می‌توانند پروژه Nuxt شما را تقویت کنند، به طور خودکار mock نمی‌شوند. در این موارد باید آن‌ها را به صورت دستی mock کنید، به عنوان مثال فرض کنید برنامه شما از پلاگین ماژول [Supabase](https://nuxt.com/modules/supabase) استفاده می‌کند:

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

و شما یک نمونه از Supabase را در جایی از composableهای خود ایجاد می‌کنید، به عنوان مثال:

```ts
const superbase = useSupabaseClient()
```

تست به دلیل خطای زیر شکست خواهد خورد:

```
ReferenceError: useSupabaseClient is not defined
```

در اینجا، ما توصیه می‌کنیم یا کل ماژولی که از تابع `useSupabaseClient` استفاده می‌کند را mock کنید یا یک متغیر سراسری ایجاد کنید که این تابع را mock کند، به عنوان مثال:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
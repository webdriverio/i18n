---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) هو إطار عمل سهل التناول وعالي الأداء ومتعدد الاستخدامات لبناء واجهات المستخدم للويب. يمكنك اختبار مكونات Vue.js مباشرة في متصفح حقيقي باستخدام WebdriverIO و[مشغل المتصفح](/docs/runner#browser-runner) الخاص به.

## الإعداد

لإعداد WebdriverIO داخل مشروع Vue.js الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) الموجودة في وثائق اختبار المكونات لدينا. تأكد من اختيار `vue` كإعداد مسبق ضمن خيارات المشغل الخاص بك، على سبيل المثال:

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

إذا كنت تستخدم بالفعل [Vite](https://vitejs.dev/) كخادم تطوير، يمكنك أيضًا إعادة استخدام التكوين الخاص بك في `vite.config.ts` ضمن تكوين WebdriverIO الخاص بك. لمزيد من المعلومات، راجع `viteConfig` في [خيارات المشغل](/docs/runner#runner-options).

:::

يتطلب الإعداد المسبق لـ Vue تثبيت `@vitejs/plugin-vue`. كما نوصي باستخدام [Testing Library](https://testing-library.com/) لعرض المكون في صفحة الاختبار. لذلك ستحتاج إلى تثبيت التبعيات الإضافية التالية:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

يمكنك بعد ذلك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.js
```

## كتابة الاختبارات

بفرض أن لديك مكون Vue.js التالي:

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

في اختبارك، قم بعرض المكون في DOM وتشغيل التأكيدات عليه. نوصي باستخدام إما [`@vue/test-utils`](https://test-utils.vuejs.org/) أو [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) لإرفاق المكون بصفحة الاختبار. للتفاعل مع المكون، استخدم أوامر WebdriverIO لأنها تتصرف بشكل أقرب إلى تفاعلات المستخدم الفعلية، على سبيل المثال:


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

يمكنك العثور على مثال كامل لمجموعة اختبار مكونات WebdriverIO لـ Vue.js في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) الخاص بنا.

## اختبار المكونات غير المتزامنة في Vue3

إذا كنت تستخدم Vue الإصدار 3 وتختبر [مكونات غير متزامنة](https://vuejs.org/guide/built-ins/suspense.html#async-setup) مثل التالي:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

نوصي باستخدام [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) وغلاف suspense صغير للحصول على المكون المعروض. لسوء الحظ، [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) لا يوجد لديه دعم لهذا بعد. قم بإنشاء ملف `helper.ts` بالمحتوى التالي:

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

ثم قم باستيراد واختبار المكون على النحو التالي:

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

## اختبار مكونات Vue في Nuxt

إذا كنت تستخدم إطار الويب [Nuxt](https://nuxt.com/)، فسيقوم WebdriverIO تلقائيًا بتمكين ميزة [الاستيراد التلقائي](https://nuxt.com/docs/guide/concepts/auto-imports) ويجعل اختبار مكونات Vue وصفحات Nuxt سهلاً. ومع ذلك، لا يمكن دعم أي [وحدات Nuxt](https://nuxt.com/modules) قد تحددها في التكوين وتتطلب سياقًا لتطبيق Nuxt.

__أسباب ذلك هي:__
- لا يمكن لـ WebdriverIO أن يبدأ تطبيق Nuxt وحده في بيئة المتصفح
- إن جعل اختبارات المكونات تعتمد كثيرًا على بيئة Nuxt يخلق تعقيدًا ونوصي بتشغيل هذه الاختبارات كاختبارات من طرف إلى طرف

:::info

يوفر WebdriverIO أيضًا خدمة لتشغيل اختبارات e2e على تطبيقات Nuxt، راجع [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) للحصول على معلومات.

:::

### محاكاة الدوال المركبة المدمجة

في حالة استخدام المكون الخاص بك لدالة Nuxt الأصلية، على سبيل المثال [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data)، سيقوم WebdriverIO تلقائيًا بمحاكاة هذه الوظائف ويسمح لك بتعديل سلوكها أو التأكد منها، على سبيل المثال:

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

### التعامل مع الدوال المركبة من أطراف ثالثة

لا يمكن محاكاة جميع [وحدات الأطراف الثالثة](https://nuxt.com/modules) التي يمكن أن تعزز مشروع Nuxt الخاص بك تلقائيًا. في تلك الحالات، تحتاج إلى محاكاتها يدويًا، على سبيل المثال، بالنظر إلى أن تطبيقك يستخدم وحدة [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

وتقوم بإنشاء مثيل من Supabase في مكان ما في الدوال المركبة الخاصة بك، على سبيل المثال:

```ts
const superbase = useSupabaseClient()
```

سيفشل الاختبار بسبب:

```
ReferenceError: useSupabaseClient is not defined
```

هنا، نوصي إما بمحاكاة الوحدة بأكملها التي تستخدم وظيفة `useSupabaseClient` أو إنشاء متغير عام يحاكي هذه الوظيفة، على سبيل المثال:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
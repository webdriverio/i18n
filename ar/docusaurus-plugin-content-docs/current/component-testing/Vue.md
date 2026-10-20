---
id: vue
title: Vue.js
description: "إعداد مُشغّل المتصفح في WebdriverIO لـ Vue.js، وكتابة اختبارات المكونات باستخدام Testing Library، واختبار المكونات غير المتزامنة وتطبيقات Nuxt."
---

[Vue.js](https://vuejs.org/) هو إطار عمل سهل الاستخدام وعالي الأداء ومتعدد الاستخدامات لبناء واجهات مستخدم الويب. يمكنك اختبار مكونات Vue.js مباشرةً في متصفح حقيقي باستخدام WebdriverIO و[مُشغّل المتصفح](/docs/runner#browser-runner) الخاص به.

## الإعداد

لإعداد WebdriverIO داخل مشروع Vue.js الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) في وثائق اختبار المكونات لدينا. تأكد من اختيار `vue` كإعداد مسبق (preset) ضمن خيارات المُشغّل، على سبيل المثال:

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

إذا كنت تستخدم بالفعل [Vite](https://vitejs.dev/) كخادم تطوير، يمكنك أيضًا ببساطة إعادة استخدام إعداداتك الموجودة في `vite.config.ts` ضمن إعدادات WebdriverIO. لمزيد من المعلومات، راجع `viteConfig` في [خيارات المُشغّل](/docs/runner#runner-options).

:::

يتطلب الإعداد المسبق لـ Vue تثبيت `@vitejs/plugin-vue`. كما نوصي باستخدام [Testing Library](https://testing-library.com/) لعرض المكوّن في صفحة الاختبار. لذلك ستحتاج إلى تثبيت التبعيات الإضافية التالية:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

يمكنك بعد ذلك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.js
```

## كتابة الاختبارات

لنفترض أن لديك مكوّن Vue.js التالي:

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

في اختبارك، اعرض المكوّن في DOM ونفّذ عمليات التحقق (assertions) عليه. نوصي باستخدام إما [`@vue/test-utils`](https://test-utils.vuejs.org/) أو [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) لإرفاق المكوّن بصفحة الاختبار. للتفاعل مع المكوّن، استخدم أوامر WebdriverIO لأنها تتصرف بشكل أقرب إلى تفاعلات المستخدم الفعلية، على سبيل المثال:


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
        // تُرجع دالة العرض مجموعة من الأدوات للاستعلام عن المكوّن الخاص بك.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // إرسال حدث نقر أصلي إلى عنصر الزر الخاص بنا.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // نفس عملية التحقق باستخدام WebdriverIO
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
        // تُرجع دالة العرض مجموعة من الأدوات للاستعلام عن المكوّن الخاص بك.
        const { getByText } = render(Component)

        // تُرجع getByText أول عقدة مطابقة للنص المُقدَّم، و
        // تُطلق خطأً إذا لم تتطابق أي عناصر أو إذا تم العثور على أكثر من تطابق واحد.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // إرسال حدث نقر أصلي إلى عنصر الزر الخاص بنا.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // التحقق باستخدام Testing Library
        await expect($('p=Times clicked: 2')).toExist() // التحقق باستخدام WebdriverIO
    })
})
```

</TabItem>
</Tabs>

يمكنك العثور على مثال كامل لمجموعة اختبارات مكونات WebdriverIO لـ Vue.js في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) الخاص بنا.

## اختبار المكونات غير المتزامنة في Vue3

إذا كنت تستخدم Vue v3 وتختبر [مكونات غير متزامنة](https://vuejs.org/guide/built-ins/suspense.html#async-setup) مثل ما يلي:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

نوصي باستخدام [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) وغلاف suspense صغير لعرض المكوّن. للأسف، لا يدعم [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) هذا الأمر بعد. أنشئ ملف `helper.ts` بالمحتوى التالي:

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

ثم استورد المكوّن واختبره على النحو التالي:

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

إذا كنت تستخدم إطار عمل الويب [Nuxt](https://nuxt.com/)، فسيقوم WebdriverIO تلقائيًا بتفعيل ميزة [الاستيراد التلقائي](https://nuxt.com/docs/guide/concepts/auto-imports) مما يجعل اختبار مكونات Vue وصفحات Nuxt أمرًا سهلًا. ومع ذلك، لا يمكن دعم أي [وحدات Nuxt](https://nuxt.com/modules) قد تقوم بتعريفها في إعداداتك وتتطلب سياق تطبيق Nuxt.

__أسباب ذلك هي:__
- لا يستطيع WebdriverIO تشغيل تطبيق Nuxt في بيئة المتصفح فقط
- إن جعل اختبارات المكونات تعتمد بشكل كبير على بيئة Nuxt يخلق تعقيدًا، ولذلك نوصي بتشغيل هذه الاختبارات كاختبارات شاملة (e2e)

:::info

يوفر WebdriverIO أيضًا خدمة لتشغيل الاختبارات الشاملة (e2e) على تطبيقات Nuxt، راجع [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) للحصول على المعلومات.

:::

### محاكاة الدوال القابلة للتركيب (composables) المدمجة

في حال كان المكوّن الخاص بك يستخدم دالة قابلة للتركيب (composable) أصلية من Nuxt، مثل [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data)، فسيقوم WebdriverIO تلقائيًا بمحاكاة (mock) هذه الدوال ويتيح لك تعديل سلوكها أو التحقق منها، على سبيل المثال:

```ts
import { mocked } from '@wdio/browser-runner'

// على سبيل المثال، يستدعي المكوّن الخاص بك `useNuxtData` بالطريقة التالية
// `const { data: posts } = useNuxtData('posts')`
// في اختبارك يمكنك التحقق منها
expect(useNuxtData).toBeCalledWith('posts')
// وتغيير سلوكها
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### التعامل مع الدوال القابلة للتركيب (composables) من جهات خارجية

لا يمكن محاكاة جميع [الوحدات الخارجية](https://nuxt.com/modules) التي يمكنها تعزيز مشروع Nuxt الخاص بك تلقائيًا. في تلك الحالات، تحتاج إلى محاكاتها يدويًا، على سبيل المثال، بافتراض أن تطبيقك يستخدم إضافة وحدة [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

وأنك تُنشئ نسخة من Supabase في مكان ما ضمن الدوال القابلة للتركيب الخاصة بك، على سبيل المثال:

```ts
const superbase = useSupabaseClient()
```

سيفشل الاختبار بسبب:

```
ReferenceError: useSupabaseClient is not defined
```

هنا، نوصي إما بمحاكاة الوحدة بأكملها التي تستخدم الدالة `useSupabaseClient` أو بإنشاء متغير عام يحاكي هذه الدالة، على سبيل المثال:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) एक सरल, उच्च प्रदर्शन वाला और बहुमुखी फ्रेमवर्क है वेब यूजर इंटरफेस बनाने के लिए। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके Vue.js कंपोनेंट्स का सीधे वास्तविक ब्राउज़र में परीक्षण कर सकते हैं।

## सेटअप

अपने Vue.js प्रोजेक्ट में WebdriverIO सेट करने के लिए, हमारे कंपोनेंट टेस्टिंग डॉक्स में [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में प्रीसेट के रूप में `vue` का चयन करना सुनिश्चित करें, उदाहरण के लिए:

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

यदि आप पहले से ही [Vite](https://vitejs.dev/) को विकास सर्वर के रूप में उपयोग कर रहे हैं, तो आप अपने WebdriverIO कॉन्फिगरेशन में `vite.config.ts` में अपने कॉन्फिगरेशन को फिर से उपयोग कर सकते हैं। अधिक जानकारी के लिए, [रनर विकल्प](/docs/runner#runner-options) में `viteConfig` देखें।

:::

Vue प्रीसेट के लिए `@vitejs/plugin-vue` इंस्टॉल होना आवश्यक है। इसके अलावा, हम टेस्ट पेज में कंपोनेंट को रेंडर करने के लिए [Testing Library](https://testing-library.com/) का उपयोग करने की सलाह देते हैं। इसके लिए आपको निम्नलिखित अतिरिक्त डिपेंडेंसीज इंस्टॉल करने होंगे:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

फिर आप निम्न कमांड चलाकर टेस्ट शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्न Vue.js कंपोनेंट है:

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

अपने टेस्ट में कंपोनेंट को DOM में रेंडर करें और उस पर assertions चलाएं। हम कंपोनेंट को टेस्ट पेज पर अटैच करने के लिए या तो [`@vue/test-utils`](https://test-utils.vuejs.org/) या [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) का उपयोग करने की सलाह देते हैं। कंपोनेंट के साथ इंटरैक्ट करने के लिए WebdriverIO कमांड्स का उपयोग करें क्योंकि वे वास्तविक उपयोगकर्ता इंटरैक्शन्स के करीब व्यवहार करते हैं, उदाहरण के लिए:


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

आप हमारे [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) में Vue.js के लिए एक पूर्ण WebdriverIO कंपोनेंट टेस्ट सूट का उदाहरण पा सकते हैं।

## Vue3 में एसिंक कंपोनेंट्स का टेस्टिंग

यदि आप Vue v3 का उपयोग कर रहे हैं और निम्न जैसे [एसिंक कंपोनेंट्स](https://vuejs.org/guide/built-ins/suspense.html#async-setup) का परीक्षण कर रहे हैं:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

हम कंपोनेंट को रेंडर करने के लिए [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) और एक छोटे से suspense wrapper का उपयोग करने की सलाह देते हैं। दुर्भाग्य से [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) में अभी इसका समर्थन नहीं है। निम्न सामग्री के साथ एक `helper.ts` फ़ाइल बनाएं:

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

फिर कंपोनेंट को निम्नानुसार इम्पोर्ट करें और टेस्ट करें:

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

## Nuxt में Vue कंपोनेंट्स का टेस्टिंग

यदि आप वेब फ्रेमवर्क [Nuxt](https://nuxt.com/) का उपयोग कर रहे हैं, तो WebdriverIO स्वचालित रूप से [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) सुविधा को सक्षम करेगा और आपके Vue कंपोनेंट्स और Nuxt पेजेज का परीक्षण आसान बनाता है। हालांकि, कोई भी [Nuxt मॉड्यूल्स](https://nuxt.com/modules) जिन्हें आप अपने कॉन्फिग में परिभाषित कर सकते हैं और जिन्हें Nuxt एप्लिकेशन के संदर्भ की आवश्यकता होती है, समर्थित नहीं किया जा सकता है।

__इसके कारण हैं:__
- WebdriverIO केवल ब्राउज़र वातावरण में Nuxt एप्लिकेशन शुरू नहीं कर सकता
- कंपोनेंट टेस्ट को Nuxt पर्यावरण पर अधिक निर्भर होने से जटिलता बढ़ती है और हम इन परीक्षणों को e2e परीक्षणों के रूप में चलाने की सलाह देते हैं

:::info

WebdriverIO Nuxt एप्लिकेशन पर e2e टेस्ट चलाने के लिए भी एक सेवा प्रदान करता है, जानकारी के लिए [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) देखें।

:::

### बिल्ट-इन कम्पोज़ेबल्स की मॉकिंग

यदि आपका कंपोनेंट मूल Nuxt कम्पोज़ेबल का उपयोग करता है, जैसे [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO स्वचालित रूप से इन फ़ंक्शन्स को मॉक करेगा और आपको उनके व्यवहार को संशोधित करने या उनके खिलाफ असर्ट करने की अनुमति देगा, उदाहरण के लिए:

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

### तृतीय पक्ष कम्पोज़ेबल्स का प्रबंधन

सभी [तृतीय पक्ष मॉड्यूल्स](https://nuxt.com/modules) जो आपके Nuxt प्रोजेक्ट को सुपरचार्ज कर सकते हैं, स्वचालित रूप से मॉक नहीं किए जा सकते। ऐसे मामलों में आपको मैन्युअल रूप से उन्हें मॉक करने की आवश्यकता होती है, उदाहरण के लिए, मान लीजिए आपका एप्लिकेशन [Supabase](https://nuxt.com/modules/supabase) मॉड्यूल प्लगइन का उपयोग करता है:

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

और आप अपने कम्पोज़ेबल्स में कहीं Supabase का इंस्टेंस बनाते हैं, उदाहरण के लिए:

```ts
const superbase = useSupabaseClient()
```

टेस्ट निम्न कारण से विफल हो जाएगा:

```
ReferenceError: useSupabaseClient is not defined
```

यहां, हम या तो पूरे मॉड्यूल को मॉक करने की सलाह देते हैं जो `useSupabaseClient` फ़ंक्शन का उपयोग करता है या एक ग्लोबल वेरिएबल बनाएं जो इस फ़ंक्शन को मॉक करता है, उदाहरण के लिए:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
---
id: vue
title: Vue.js
description: "Vue.js के लिए WebdriverIO ब्राउज़र रनर सेट अप करें, Testing Library के साथ कंपोनेंट टेस्ट लिखें और async कंपोनेंट्स तथा Nuxt ऐप्स का परीक्षण करें।"
---

[Vue.js](https://vuejs.org/) वेब यूजर इंटरफेस बनाने के लिए एक सुलभ, उच्च-प्रदर्शन वाला और बहुमुखी फ्रेमवर्क है। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके Vue.js कंपोनेंट्स का परीक्षण सीधे एक वास्तविक ब्राउज़र में कर सकते हैं।

## सेटअप

अपने Vue.js प्रोजेक्ट में WebdriverIO सेटअप करने के लिए, हमारे कंपोनेंट टेस्टिंग डॉक्स में दिए गए [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में प्रीसेट के रूप में `vue` का चयन करना सुनिश्चित करें, उदाहरण के लिए:

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

यदि आप पहले से ही डेवलपमेंट सर्वर के रूप में [Vite](https://vitejs.dev/) का उपयोग कर रहे हैं, तो आप अपने WebdriverIO कॉन्फ़िग में `vite.config.ts` के अपने कॉन्फ़िगरेशन का पुनः उपयोग भी कर सकते हैं। अधिक जानकारी के लिए, [रनर विकल्पों](/docs/runner#runner-options) में `viteConfig` देखें।

:::

Vue प्रीसेट के लिए `@vitejs/plugin-vue` का इंस्टॉल होना आवश्यक है। साथ ही, हम कंपोनेंट को टेस्ट पेज में रेंडर करने के लिए [Testing Library](https://testing-library.com/) का उपयोग करने की सलाह देते हैं। इसलिए आपको निम्नलिखित अतिरिक्त डिपेंडेंसीज़ इंस्टॉल करनी होंगी:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

फिर आप निम्नलिखित कमांड चलाकर टेस्ट शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्नलिखित Vue.js कंपोनेंट है:

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

अपने टेस्ट में कंपोनेंट को DOM में रेंडर करें और उस पर असर्शन चलाएँ। कंपोनेंट को टेस्ट पेज से जोड़ने के लिए हम [`@vue/test-utils`](https://test-utils.vuejs.org/) या [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) में से किसी एक का उपयोग करने की सलाह देते हैं। कंपोनेंट के साथ इंटरैक्ट करने के लिए WebdriverIO कमांड्स का उपयोग करें, क्योंकि वे वास्तविक यूज़र इंटरैक्शन के अधिक करीब व्यवहार करती हैं, उदाहरण के लिए:


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
        // render मेथड आपके कंपोनेंट को क्वेरी करने के लिए यूटिलिटीज़ का एक संग्रह लौटाता है।
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // हमारे बटन एलिमेंट पर एक नेटिव क्लिक इवेंट भेजें।
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // WebdriverIO के साथ वही असर्शन
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
        // render मेथड आपके कंपोनेंट को क्वेरी करने के लिए यूटिलिटीज़ का एक संग्रह लौटाता है।
        const { getByText } = render(Component)

        // getByText दिए गए टेक्स्ट के लिए पहला मेल खाने वाला नोड लौटाता है, और
        // यदि कोई एलिमेंट मेल नहीं खाता या एक से अधिक मेल मिलते हैं तो एरर फेंकता है।
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // हमारे बटन एलिमेंट पर एक नेटिव क्लिक इवेंट भेजें।
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // Testing Library के साथ असर्ट करें
        await expect($('p=Times clicked: 2')).toExist() // WebdriverIO के साथ असर्ट करें
    })
})
```

</TabItem>
</Tabs>

आप Vue.js के लिए WebdriverIO कंपोनेंट टेस्ट सूट का पूरा उदाहरण हमारी [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) में पा सकते हैं।

## Vue3 में Async कंपोनेंट्स का परीक्षण

यदि आप Vue v3 का उपयोग कर रहे हैं और निम्नलिखित जैसे [async कंपोनेंट्स](https://vuejs.org/guide/built-ins/suspense.html#async-setup) का परीक्षण कर रहे हैं:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

तो कंपोनेंट को रेंडर करने के लिए हम [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) और एक छोटे suspense रैपर का उपयोग करने की सलाह देते हैं। दुर्भाग्य से [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) में अभी इसका समर्थन नहीं है। निम्नलिखित सामग्री के साथ एक `helper.ts` फ़ाइल बनाएँ:

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

फिर कंपोनेंट को निम्नलिखित तरीके से इम्पोर्ट और टेस्ट करें:

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

## Nuxt में Vue कंपोनेंट्स का परीक्षण

यदि आप वेब फ्रेमवर्क [Nuxt](https://nuxt.com/) का उपयोग कर रहे हैं, तो WebdriverIO स्वचालित रूप से [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) फ़ीचर को सक्षम कर देगा और आपके Vue कंपोनेंट्स तथा Nuxt पेजों का परीक्षण आसान बना देगा। हालाँकि, ऐसे किसी भी [Nuxt मॉड्यूल](https://nuxt.com/modules) का समर्थन नहीं किया जा सकता जिसे आप अपने कॉन्फ़िग में परिभाषित करते हैं और जिसे Nuxt एप्लिकेशन के संदर्भ (context) की आवश्यकता होती है।

__इसके कारण हैं:__
- WebdriverIO केवल ब्राउज़र एनवायरनमेंट में Nuxt एप्लिकेशन को आरंभ नहीं कर सकता
- कंपोनेंट टेस्ट्स का Nuxt एनवायरनमेंट पर बहुत अधिक निर्भर होना जटिलता पैदा करता है, इसलिए हम इन टेस्ट्स को e2e टेस्ट्स के रूप में चलाने की सलाह देते हैं

:::info

WebdriverIO, Nuxt एप्लिकेशन पर e2e टेस्ट चलाने के लिए एक सर्विस भी प्रदान करता है, जानकारी के लिए [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) देखें।

:::

### बिल्ट-इन composables को मॉक करना

यदि आपका कंपोनेंट किसी नेटिव Nuxt composable का उपयोग करता है, जैसे [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), तो WebdriverIO इन फ़ंक्शंस को स्वचालित रूप से मॉक कर देगा और आपको उनके व्यवहार को संशोधित करने या उनके विरुद्ध असर्ट करने की अनुमति देगा, उदाहरण के लिए:

```ts
import { mocked } from '@wdio/browser-runner'

// उदाहरण के लिए, आपका कंपोनेंट `useNuxtData` को निम्नलिखित तरीके से कॉल करता है
// `const { data: posts } = useNuxtData('posts')`
// अपने टेस्ट में आप इसके विरुद्ध असर्ट कर सकते हैं
expect(useNuxtData).toBeCalledWith('posts')
// और उनका व्यवहार बदल सकते हैं
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### थर्ड पार्टी composables को संभालना

सभी [थर्ड पार्टी मॉड्यूल](https://nuxt.com/modules) जो आपके Nuxt प्रोजेक्ट को और सशक्त बना सकते हैं, स्वचालित रूप से मॉक नहीं हो सकते। ऐसे मामलों में आपको उन्हें मैन्युअल रूप से मॉक करना होगा, उदाहरण के लिए, मान लीजिए आपका एप्लिकेशन [Supabase](https://nuxt.com/modules/supabase) मॉड्यूल प्लगइन का उपयोग करता है:

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

और आप अपने composables में कहीं Supabase का एक इंस्टेंस बनाते हैं, उदाहरण के लिए:

```ts
const superbase = useSupabaseClient()
```

तो टेस्ट निम्नलिखित कारण से विफल हो जाएगा:

```
ReferenceError: useSupabaseClient is not defined
```

यहाँ, हम सलाह देते हैं कि या तो उस पूरे मॉड्यूल को मॉक करें जो `useSupabaseClient` फ़ंक्शन का उपयोग करता है, या एक ग्लोबल वेरिएबल बनाएँ जो इस फ़ंक्शन को मॉक करे, उदाहरण के लिए:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
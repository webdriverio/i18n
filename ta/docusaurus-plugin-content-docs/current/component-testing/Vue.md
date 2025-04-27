---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) என்பது வலை பயனர் இடைமுகங்களை உருவாக்குவதற்கான அணுகக்கூடிய, செயல்திறன் மிக்க மற்றும் பல்துறை கட்டமைப்பாகும். WebdriverIO மற்றும் அதன் [உலாவி இயக்கி](/docs/runner#browser-runner) பயன்படுத்தி Vue.js கூறுகளை நேரடியாக உண்மையான உலாவியில் சோதிக்கலாம்.

## அமைவு

உங்கள் Vue.js திட்டத்தில் WebdriverIO ஐ அமைக்க, எங்கள் கூறு சோதனை ஆவணங்களில் [வழிமுறைகளை](/docs/component-testing#set-up) பின்பற்றவும். உங்கள் இயக்கி விருப்பங்களில் `vue` ஐ முன்னமைப்பாக தேர்ந்தெடுக்க உறுதிசெய்யவும், எ.கா:

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

நீங்கள் ஏற்கனவே [Vite](https://vitejs.dev/) ஐ உருவாக்க சேவையகமாக பயன்படுத்துகிறீர்கள் என்றால், உங்கள் WebdriverIO கட்டமைப்பில் `vite.config.ts` இல் உள்ள உங்கள் கட்டமைப்பை மீண்டும் பயன்படுத்தலாம். மேலும் தகவலுக்கு, [இயக்கி விருப்பங்களில்](/docs/runner#runner-options) `viteConfig` ஐப் பார்க்கவும்.

:::

Vue முன்னமைப்புக்கு `@vitejs/plugin-vue` நிறுவப்பட வேண்டும். மேலும், கூறுகளை சோதனை பக்கத்தில் காட்சிப்படுத்த [Testing Library](https://testing-library.com/) பயன்படுத்த பரிந்துரைக்கிறோம். அதற்காக பின்வரும் கூடுதல் சார்புகளை நிறுவ வேண்டியிருக்கும்:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

பின்னர் பின்வருமாறு இயக்குவதன் மூலம் சோதனைகளைத் தொடங்கலாம்:

```sh
npx wdio run ./wdio.conf.js
```

## சோதனைகளை எழுதுதல்

பின்வரும் Vue.js கூறு இருப்பதாக வைத்துக் கொள்ளுங்கள்:

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

உங்கள் சோதனையில் கூறுகளை DOM-இல் காட்சிப்படுத்தி அதன் மீது உறுதிப்படுத்தல்களை இயக்கவும். கூறுகளை சோதனை பக்கத்துடன் இணைக்க [`@vue/test-utils`](https://test-utils.vuejs.org/) அல்லது [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) பயன்படுத்த பரிந்துரைக்கிறோம். கூறுகளுடன் தொடர்புகொள்ள WebdriverIO கட்டளைகளைப் பயன்படுத்தவும், ஏனெனில் அவை உண்மையான பயனர் தொடர்புகளுக்கு நெருக்கமாக செயல்படுகின்றன, எ.கா:


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

Vue.js க்கான WebdriverIO கூறு சோதனை தொகுப்பின் முழு எடுத்துக்காட்டை எங்கள் [எடுத்துக்காட்டு களஞ்சியத்தில்](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) காணலாம்.

## Vue3-இல் ஒத்திசைவற்ற கூறுகளை சோதித்தல்

நீங்கள் Vue v3 பயன்படுத்துகிறீர்கள் மற்றும் பின்வரும் [ஒத்திசைவற்ற கூறுகளை](https://vuejs.org/guide/built-ins/suspense.html#async-setup) சோதிக்கிறீர்கள் என்றால்:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

[`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) மற்றும் கூறுகளை காட்சிப்படுத்த ஒரு சிறிய suspense வழுவலை பயன்படுத்த பரிந்துரைக்கிறோம். துரதிர்ஷ்டவசமாக [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) இதற்கு ஆதரவு இல்லை. பின்வரும் உள்ளடக்கத்துடன் `helper.ts` கோப்பை உருவாக்கவும்:

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

பின்னர் கூறுகளை பின்வருமாறு இறக்குமதி செய்து சோதிக்கவும்:

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

## Nuxt இல் Vue கூறுகளை சோதித்தல்

நீங்கள் [Nuxt](https://nuxt.com/) வலை கட்டமைப்பைப் பயன்படுத்தினால், WebdriverIO தானாகவே [தானியங்கு-இறக்குமதி](https://nuxt.com/docs/guide/concepts/auto-imports) அம்சத்தை இயக்கி, உங்கள் Vue கூறுகள் மற்றும் Nuxt பக்கங்களை சோதிப்பதை எளிதாக்கும். எனினும், உங்கள் கட்டமைப்பில் வரையறுக்கப்பட்ட மற்றும் Nuxt பயன்பாட்டிற்கு சூழலை தேவைப்படும் எந்த [Nuxt தொகுதிகளுக்கும்](https://nuxt.com/modules) ஆதரவு இல்லை.

__இதற்கான காரணங்கள்:__
- உலாவி சூழலில் மட்டுமே Nuxt பயன்பாட்டை WebdriverIO தொடங்க முடியாது
- கூறு சோதனைகள் Nuxt சூழலில் அதிகம் சார்ந்திருப்பது சிக்கலை உருவாக்குகிறது, இந்த சோதனைகளை e2e சோதனைகளாக இயக்க பரிந்துரைக்கிறோம்

:::info

WebdriverIO, Nuxt பயன்பாடுகளில் e2e சோதனைகள் இயக்க ஒரு சேவையையும் வழங்குகிறது, தகவலுக்கு [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) ஐப் பார்க்கவும்.

:::

### உள்ளமைந்த composables பொம்மைகள் உருவாக்குதல்

உங்கள் கூறு உள்ளமைந்த Nuxt composable ஐப் பயன்படுத்தினால், எ.கா. [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO தானாகவே இந்த செயல்பாடுகளை பொம்மைகளாக்கி அவற்றின் நடத்தையை மாற்ற அல்லது அவற்றுக்கு எதிராக உறுதிப்படுத்த அனுமதிக்கும், எ.கா.:

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

### மூன்றாம் தரப்பு composables கையாளுதல்

உங்கள் Nuxt திட்டத்தை மேம்படுத்தக்கூடிய அனைத்து [மூன்றாம் தரப்பு தொகுதிகளையும்](https://nuxt.com/modules) தானாகவே பொம்மைகளாக்க முடியாது. அந்த நிலைகளில் நீங்கள் கைமுறையாக அவற்றை பொம்மைகளாக்க வேண்டும், எ.கா. உங்கள் பயன்பாடு [Supabase](https://nuxt.com/modules/supabase) தொகுதி செருகுநிரலைப் பயன்படுத்துகிறது:

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

மற்றும் உங்கள் composables இல் எங்காவது Supabase இன் ஒரு நிகழ்வை உருவாக்குகிறீர்கள், எ.கா.:

```ts
const superbase = useSupabaseClient()
```

பின்வரும் காரணத்தால் சோதனை தோல்வியடையும்:

```
ReferenceError: useSupabaseClient is not defined
```

இங்கே, `useSupabaseClient` செயல்பாட்டைப் பயன்படுத்தும் முழு தொகுதியையும் பொம்மைகளாக்க அல்லது இந்த செயல்பாட்டை பொம்மைகளாக்கும் ஒரு உலகளாவிய மாறியை உருவாக்க பரிந்துரைக்கிறோம், எ.கா.:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
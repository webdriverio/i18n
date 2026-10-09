---
id: vue
title: Vue.js
description: "Ρυθμίστε τον browser runner του WebdriverIO για το Vue.js, γράψτε δοκιμές components με το Testing Library και δοκιμάστε async components και εφαρμογές Nuxt."
---

Το [Vue.js](https://vuejs.org/) είναι ένα προσιτό, αποδοτικό και ευέλικτο framework για τη δημιουργία διεπαφών χρήστη για το web. Μπορείτε να δοκιμάσετε components του Vue.js απευθείας σε έναν πραγματικό browser χρησιμοποιώντας το WebdriverIO και τον [browser runner](/docs/runner#browser-runner) του.

## Ρύθμιση

Για να ρυθμίσετε το WebdriverIO στο project σας με Vue.js, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στην τεκμηρίωσή μας για τη δοκιμή components. Βεβαιωθείτε ότι έχετε επιλέξει το `vue` ως preset στις επιλογές του runner σας, π.χ.:

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

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως development server, μπορείτε επίσης απλώς να επαναχρησιμοποιήσετε τη διαμόρφωσή σας από το `vite.config.ts` μέσα στη διαμόρφωση του WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές του runner](/docs/runner#runner-options).

:::

Το preset του Vue απαιτεί να είναι εγκατεστημένο το `@vitejs/plugin-vue`. Επίσης, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) για την απόδοση (rendering) του component στη σελίδα δοκιμής. Επομένως, θα χρειαστεί να εγκαταστήσετε τις ακόλουθες επιπλέον εξαρτήσεις:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Συγγραφή Δοκιμών

Δεδομένου ότι έχετε το ακόλουθο component του Vue.js:

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

Στη δοκιμή σας, αποδώστε το component στο DOM και εκτελέστε assertions πάνω του. Συνιστούμε να χρησιμοποιήσετε είτε το [`@vue/test-utils`](https://test-utils.vuejs.org/) είτε το [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) για να προσαρτήσετε το component στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το component, χρησιμοποιήστε εντολές του WebdriverIO, καθώς συμπεριφέρονται πιο κοντά σε πραγματικές αλληλεπιδράσεις χρήστη, π.χ.:


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
        // Η μέθοδος render επιστρέφει μια συλλογή βοηθητικών εργαλείων για την αναζήτηση στο component σας.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // Αποστολή ενός native συμβάντος click στο στοιχείο button μας.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // ίδιο assertion με το WebdriverIO
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
        // Η μέθοδος render επιστρέφει μια συλλογή βοηθητικών εργαλείων για την αναζήτηση στο component σας.
        const { getByText } = render(Component)

        // Η getByText επιστρέφει τον πρώτο κόμβο που ταιριάζει με το δοθέν κείμενο και
        // προκαλεί σφάλμα αν δεν ταιριάζει κανένα στοιχείο ή αν βρεθούν περισσότερα από ένα.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // Αποστολή ενός native συμβάντος click στο στοιχείο button μας.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // assertion με το Testing Library
        await expect($('p=Times clicked: 2')).toExist() // assertion με το WebdriverIO
    })
})
```

</TabItem>
</Tabs>

Μπορείτε να βρείτε ένα πλήρες παράδειγμα σουίτας δοκιμών components του WebdriverIO για το Vue.js στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) μας.

## Δοκιμή Async Components στο Vue3

Αν χρησιμοποιείτε το Vue v3 και δοκιμάζετε [async components](https://vuejs.org/guide/built-ins/suspense.html#async-setup) όπως το ακόλουθο:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Συνιστούμε να χρησιμοποιήσετε το [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) και ένα μικρό suspense wrapper για να αποδοθεί το component. Δυστυχώς, το [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) δεν υποστηρίζει ακόμη αυτή τη δυνατότητα. Δημιουργήστε ένα αρχείο `helper.ts` με το ακόλουθο περιεχόμενο:

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

Στη συνέχεια, κάντε import και δοκιμάστε το component ως εξής:

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

## Δοκιμή Vue Components στο Nuxt

Αν χρησιμοποιείτε το web framework [Nuxt](https://nuxt.com/), το WebdriverIO θα ενεργοποιήσει αυτόματα τη λειτουργία [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) και κάνει εύκολη τη δοκιμή των Vue components και των σελίδων Nuxt σας. Ωστόσο, τυχόν [Nuxt modules](https://nuxt.com/modules) που ενδέχεται να ορίσετε στη διαμόρφωσή σας και απαιτούν context της εφαρμογής Nuxt δεν μπορούν να υποστηριχθούν.

__Οι λόγοι γι' αυτό είναι:__
- Το WebdriverIO δεν μπορεί να εκκινήσει μια εφαρμογή Nuxt αποκλειστικά σε περιβάλλον browser
- Η υπερβολική εξάρτηση των δοκιμών components από το περιβάλλον του Nuxt δημιουργεί πολυπλοκότητα και συνιστούμε την εκτέλεση αυτών των δοκιμών ως δοκιμές e2e

:::info

Το WebdriverIO παρέχει επίσης ένα service για την εκτέλεση δοκιμών e2e σε εφαρμογές Nuxt, δείτε το [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) για πληροφορίες.

:::

### Mocking ενσωματωμένων composables

Σε περίπτωση που το component σας χρησιμοποιεί ένα native composable του Nuxt, π.χ. το [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), το WebdriverIO θα κάνει αυτόματα mock αυτές τις συναρτήσεις και σας επιτρέπει να τροποποιήσετε τη συμπεριφορά τους ή να κάνετε assertions πάνω τους, π.χ.:

```ts
import { mocked } from '@wdio/browser-runner'

// π.χ. το component σας καλεί το `useNuxtData` με τον ακόλουθο τρόπο
// `const { data: posts } = useNuxtData('posts')`
// στη δοκιμή σας μπορείτε να κάνετε assertion πάνω του
expect(useNuxtData).toBeCalledWith('posts')
// και να αλλάξετε τη συμπεριφορά του
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Χειρισμός composables τρίτων

Όλα τα [modules τρίτων](https://nuxt.com/modules) που μπορούν να ενισχύσουν το Nuxt project σας δεν μπορούν να γίνουν αυτόματα mock. Σε αυτές τις περιπτώσεις πρέπει να τα κάνετε mock χειροκίνητα, π.χ. δεδομένου ότι η εφαρμογή σας χρησιμοποιεί το module plugin του [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

και δημιουργείτε ένα instance του Supabase κάπου στα composables σας, π.χ.:

```ts
const superbase = useSupabaseClient()
```

η δοκιμή θα αποτύχει λόγω του:

```
ReferenceError: useSupabaseClient is not defined
```

Εδώ, συνιστούμε είτε να κάνετε mock ολόκληρο το module που χρησιμοποιεί τη συνάρτηση `useSupabaseClient` είτε να δημιουργήσετε μια global μεταβλητή που κάνει mock αυτή τη συνάρτηση, π.χ.:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
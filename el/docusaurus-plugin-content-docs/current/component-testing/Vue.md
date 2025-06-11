---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) είναι ένα προσιτό, αποδοτικό και ευέλικτο πλαίσιο για την κατασκευή διεπαφών χρήστη ιστού. Μπορείτε να δοκιμάσετε τα συστατικά Vue.js απευθείας σε ένα πραγματικό πρόγραμμα περιήγησης χρησιμοποιώντας το WebdriverIO και το [browser runner](/docs/runner#browser-runner).

## Setup

Για να ρυθμίσετε το WebdriverIO στο έργο σας Vue.js, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στα έγγραφα δοκιμών συστατικών μας. Βεβαιωθείτε ότι επιλέγετε `vue` ως προεπιλογή στις επιλογές του runner, π.χ.:

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

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως διακομιστή ανάπτυξης, μπορείτε επίσης να επαναχρησιμοποιήσετε τη διαμόρφωσή σας στο `vite.config.ts` μέσα στη διαμόρφωση WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές runner](/docs/runner#runner-options).

:::

Η προεπιλογή Vue απαιτεί την εγκατάσταση του `@vitejs/plugin-vue`. Επίσης, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) για την απόδοση του συστατικού στη σελίδα δοκιμής. Για αυτό θα χρειαστεί να εγκαταστήσετε τις ακόλουθες πρόσθετες εξαρτήσεις:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Writing Tests

Δεδομένου ότι έχετε το ακόλουθο συστατικό Vue.js:

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

Στη δοκιμή σας, αποδώστε το συστατικό στο DOM και εκτελέστε ισχυρισμούς σε αυτό. Συνιστούμε να χρησιμοποιήσετε είτε το [`@vue/test-utils`](https://test-utils.vuejs.org/) είτε το [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) για να συνδέσετε το συστατικό στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το συστατικό, χρησιμοποιήστε εντολές WebdriverIO καθώς συμπεριφέρονται πιο κοντά στις πραγματικές αλληλεπιδράσεις χρηστών, π.χ.:


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

Μπορείτε να βρείτε ένα πλήρες παράδειγμα μιας σουίτας δοκιμών συστατικών WebdriverIO για Vue.js στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite) μας.

## Testing Async Components in Vue3

Αν χρησιμοποιείτε Vue v3 και δοκιμάζετε [ασύγχρονα συστατικά](https://vuejs.org/guide/built-ins/suspense.html#async-setup) όπως το ακόλουθο:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Συνιστούμε να χρησιμοποιήσετε το [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) και ένα μικρό περιτύλιγμα suspense για να αποδώσετε το συστατικό. Δυστυχώς, το [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) δεν έχει ακόμη υποστήριξη για αυτό. Δημιουργήστε ένα αρχείο `helper.ts` με το ακόλουθο περιεχόμενο:

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

Στη συνέχεια, εισάγετε και δοκιμάστε το συστατικό ως εξής:

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

## Testing Vue Components in Nuxt

Αν χρησιμοποιείτε το πλαίσιο ιστού [Nuxt](https://nuxt.com/), το WebdriverIO θα ενεργοποιήσει αυτόματα τη λειτουργία [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) και καθιστά εύκολη τη δοκιμή των συστατικών Vue και των σελίδων Nuxt. Ωστόσο, οποιαδήποτε [ενότητα Nuxt](https://nuxt.com/modules) που μπορεί να ορίσετε στη διαμόρφωσή σας και απαιτεί πλαίσιο στην εφαρμογή Nuxt δεν μπορεί να υποστηριχθεί.

__Οι λόγοι για αυτό είναι:__
- Το WebdriverIO δεν μπορεί να ξεκινήσει μια εφαρμογή Nuxt αποκλειστικά σε περιβάλλον περιηγητή
- Η δημιουργία υπερβολικής εξάρτησης των δοκιμών συστατικών από το περιβάλλον Nuxt δημιουργεί πολυπλοκότητα και συνιστούμε να εκτελείτε αυτές τις δοκιμές ως δοκιμές e2e

:::info

Το WebdriverIO παρέχει επίσης μια υπηρεσία για την εκτέλεση δοκιμών e2e σε εφαρμογές Nuxt, δείτε το [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) για πληροφορίες.

:::

### Mocking built-in composables

Σε περίπτωση που το συστατικό σας χρησιμοποιεί ένα εγγενές composable του Nuxt, π.χ. [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), το WebdriverIO θα δημιουργήσει αυτόματα μια προσομοίωση αυτών των λειτουργιών και σας επιτρέπει να τροποποιήσετε τη συμπεριφορά τους ή να κάνετε ισχυρισμούς εναντίον τους, π.χ.:

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

### Handling 3rd party composables

Όλες οι [ενότητες τρίτων](https://nuxt.com/modules) που μπορούν να ενισχύσουν το έργο Nuxt σας δεν μπορούν να προσομοιωθούν αυτόματα. Σε αυτές τις περιπτώσεις πρέπει να τις προσομοιώσετε χειροκίνητα, π.χ. δεδομένου ότι η εφαρμογή σας χρησιμοποιεί το πρόσθετο ενότητας [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

και δημιουργείτε μια παρουσία του Supabase κάπου στα composables σας, π.χ.:

```ts
const superbase = useSupabaseClient()
```

η δοκιμή θα αποτύχει λόγω:

```
ReferenceError: useSupabaseClient is not defined
```

Εδώ, συνιστούμε είτε να προσομοιώσετε ολόκληρη την ενότητα που χρησιμοποιεί τη λειτουργία `useSupabaseClient` είτε να δημιουργήσετε μια καθολική μεταβλητή που προσομοιώνει αυτή τη λειτουργία, π.χ.:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
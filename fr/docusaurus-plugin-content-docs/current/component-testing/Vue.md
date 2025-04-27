---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) est un framework accessible, performant et polyvalent pour créer des interfaces utilisateur web. Vous pouvez tester les composants Vue.js directement dans un navigateur réel en utilisant WebdriverIO et son [exécuteur de navigateur](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet Vue.js, suivez les [instructions](/docs/component-testing#set-up) dans notre documentation de test de composants. Assurez-vous de sélectionner `vue` comme préréglage dans vos options d'exécution, par exemple :

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

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également réutiliser votre configuration dans `vite.config.ts` au sein de votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options d'exécution](/docs/runner#runner-options).

:::

Le préréglage Vue nécessite l'installation de `@vitejs/plugin-vue`. Nous recommandons également d'utiliser [Testing Library](https://testing-library.com/) pour rendre le composant dans la page de test. Pour cela, vous devrez installer les dépendances supplémentaires suivantes :

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Vous pouvez ensuite démarrer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écriture de tests

Supposons que vous ayez le composant Vue.js suivant :

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

Dans votre test, rendez le composant dans le DOM et exécutez des assertions dessus. Nous recommandons d'utiliser soit [`@vue/test-utils`](https://test-utils.vuejs.org/) soit [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) pour attacher le composant à la page de test. Pour interagir avec le composant, utilisez les commandes WebdriverIO car elles se comportent de manière plus proche des interactions utilisateur réelles, par exemple :


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

Vous pouvez trouver un exemple complet d'une suite de tests de composants WebdriverIO pour Vue.js dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Test des composants asynchrones dans Vue3

Si vous utilisez Vue v3 et testez des [composants asynchrones](https://vuejs.org/guide/built-ins/suspense.html#async-setup) comme celui-ci :

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Nous recommandons d'utiliser [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) et un petit wrapper suspense pour obtenir le rendu du composant. Malheureusement, [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) ne prend pas encore en charge cela. Créez un fichier `helper.ts` avec le contenu suivant :

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

Ensuite, importez et testez le composant comme suit :

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

## Test des composants Vue dans Nuxt

Si vous utilisez le framework web [Nuxt](https://nuxt.com/), WebdriverIO activera automatiquement la fonctionnalité [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) et facilitera le test de vos composants Vue et pages Nuxt. Cependant, tous les [modules Nuxt](https://nuxt.com/modules) que vous pourriez définir dans votre configuration et qui nécessitent un contexte à l'application Nuxt ne peuvent pas être pris en charge.

__Les raisons en sont :__
- WebdriverIO ne peut pas initier une application Nuxt uniquement dans un environnement de navigateur
- Faire dépendre trop les tests de composants de l'environnement Nuxt crée de la complexité et nous recommandons d'exécuter ces tests en tant que tests e2e

:::info

WebdriverIO fournit également un service pour exécuter des tests e2e sur des applications Nuxt, voir [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) pour plus d'informations.

:::

### Simulation des composables intégrés

Si votre composant utilise un composable natif de Nuxt, par exemple [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO simulera automatiquement ces fonctions et vous permettra de modifier leur comportement ou de faire des assertions contre elles, par exemple :

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

### Gestion des composables tiers

Tous les [modules tiers](https://nuxt.com/modules) qui peuvent améliorer votre projet Nuxt ne peuvent pas être automatiquement simulés. Dans ces cas, vous devez les simuler manuellement, par exemple si votre application utilise le plugin du module [Supabase](https://nuxt.com/modules/supabase) :

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

et que vous créez une instance de Supabase quelque part dans vos composables, par exemple :

```ts
const superbase = useSupabaseClient()
```

le test échouera en raison de :

```
ReferenceError: useSupabaseClient is not defined
```

Ici, nous recommandons soit de simuler tout le module qui utilise la fonction `useSupabaseClient`, soit de créer une variable globale qui simule cette fonction, par exemple :

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
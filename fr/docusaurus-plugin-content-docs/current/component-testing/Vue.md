---
id: vue
title: Vue.js
description: "Configurez le browser runner de WebdriverIO pour Vue.js, écrivez des tests de composants avec Testing Library et testez des composants asynchrones et des applications Nuxt."
---

[Vue.js](https://vuejs.org/) est un framework accessible, performant et polyvalent pour construire des interfaces utilisateur web. Vous pouvez tester les composants Vue.js directement dans un navigateur réel en utilisant WebdriverIO et son [browser runner](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet Vue.js, suivez les [instructions](/docs/component-testing#set-up) de notre documentation sur les tests de composants. Assurez-vous de sélectionner `vue` comme preset dans les options de votre runner, par exemple :

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

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également simplement réutiliser votre configuration de `vite.config.ts` dans votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options du runner](/docs/runner#runner-options).

:::

Le preset Vue nécessite l'installation de `@vitejs/plugin-vue`. Nous recommandons également d'utiliser [Testing Library](https://testing-library.com/) pour afficher le composant dans la page de test. Pour cela, vous devrez installer les dépendances supplémentaires suivantes :

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Vous pouvez ensuite lancer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écrire des tests

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

Dans votre test, affichez le composant dans le DOM et exécutez des assertions sur celui-ci. Nous recommandons d'utiliser soit [`@vue/test-utils`](https://test-utils.vuejs.org/), soit [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) pour attacher le composant à la page de test. Pour interagir avec le composant, utilisez les commandes WebdriverIO, car elles se comportent de manière plus proche des interactions réelles d'un utilisateur, par exemple :


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
        // La méthode render renvoie un ensemble d'utilitaires pour interroger votre composant.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // Déclenche un événement de clic natif sur notre élément bouton.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // même assertion avec WebdriverIO
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
        // La méthode render renvoie un ensemble d'utilitaires pour interroger votre composant.
        const { getByText } = render(Component)

        // getByText renvoie le premier nœud correspondant au texte fourni, et
        // lève une erreur si aucun élément ne correspond ou si plusieurs correspondances sont trouvées.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // Déclenche un événement de clic natif sur notre élément bouton.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // assertion avec Testing Library
        await expect($('p=Times clicked: 2')).toExist() // assertion avec WebdriverIO
    })
})
```

</TabItem>
</Tabs>

Vous trouverez un exemple complet d'une suite de tests de composants WebdriverIO pour Vue.js dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Tester des composants asynchrones dans Vue3

Si vous utilisez Vue v3 et que vous testez des [composants asynchrones](https://vuejs.org/guide/built-ins/suspense.html#async-setup) comme le suivant :

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Nous recommandons d'utiliser [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) ainsi qu'un petit wrapper suspense pour obtenir le rendu du composant. Malheureusement, [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) ne prend pas encore cela en charge. Créez un fichier `helper.ts` avec le contenu suivant :

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

Importez et testez ensuite le composant comme suit :

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

## Tester des composants Vue dans Nuxt

Si vous utilisez le framework web [Nuxt](https://nuxt.com/), WebdriverIO activera automatiquement la fonctionnalité d'[auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) et facilite le test de vos composants Vue et de vos pages Nuxt. Cependant, les [modules Nuxt](https://nuxt.com/modules) que vous pourriez définir dans votre configuration et qui nécessitent un contexte de l'application Nuxt ne peuvent pas être pris en charge.

__Les raisons sont les suivantes :__
- WebdriverIO ne peut pas initialiser une application Nuxt uniquement dans un environnement de navigateur
- Rendre les tests de composants trop dépendants de l'environnement Nuxt crée de la complexité, et nous recommandons d'exécuter ces tests en tant que tests e2e

:::info

WebdriverIO fournit également un service pour exécuter des tests e2e sur des applications Nuxt, consultez [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) pour plus d'informations.

:::

### Mocker les composables intégrés

Si votre composant utilise un composable natif de Nuxt, par exemple [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO mockera automatiquement ces fonctions et vous permettra de modifier leur comportement ou d'effectuer des assertions sur celles-ci, par exemple :

```ts
import { mocked } from '@wdio/browser-runner'

// par exemple, votre composant appelle `useNuxtData` de la manière suivante
// `const { data: posts } = useNuxtData('posts')`
// dans votre test, vous pouvez effectuer une assertion dessus
expect(useNuxtData).toBeCalledWith('posts')
// et modifier son comportement
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Gérer les composables tiers

Tous les [modules tiers](https://nuxt.com/modules) qui peuvent enrichir votre projet Nuxt ne peuvent pas être mockés automatiquement. Dans ces cas, vous devez les mocker manuellement, par exemple si votre application utilise le plugin du module [Supabase](https://nuxt.com/modules/supabase) :

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

le test échouera avec l'erreur suivante :

```
ReferenceError: useSupabaseClient is not defined
```

Dans ce cas, nous recommandons soit de mocker l'ensemble du module qui utilise la fonction `useSupabaseClient`, soit de créer une variable globale qui mocke cette fonction, par exemple :

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
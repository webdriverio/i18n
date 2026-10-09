---
id: vue
title: Vue.js
description: "Skonfiguruj WebdriverIO browser runner dla Vue.js, pisz testy komponentów z Testing Library oraz testuj komponenty asynchroniczne i aplikacje Nuxt."
---

[Vue.js](https://vuejs.org/) to przystępny, wydajny i wszechstronny framework do budowania interfejsów użytkownika w sieci. Możesz testować komponenty Vue.js bezpośrednio w prawdziwej przeglądarce, używając WebdriverIO i jego [browser runnera](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w swoim projekcie Vue.js, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji testowania komponentów. Upewnij się, że wybrałeś `vue` jako preset w opcjach runnera, np.:

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

Jeśli już używasz [Vite](https://vitejs.dev/) jako serwera deweloperskiego, możesz po prostu ponownie wykorzystać swoją konfigurację z `vite.config.ts` w konfiguracji WebdriverIO. Więcej informacji znajdziesz w opisie `viteConfig` w [opcjach runnera](/docs/runner#runner-options).

:::

Preset Vue wymaga zainstalowania `@vitejs/plugin-vue`. Zalecamy również używanie [Testing Library](https://testing-library.com/) do renderowania komponentu na stronie testowej. W związku z tym musisz zainstalować następujące dodatkowe zależności:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Następnie możesz uruchomić testy za pomocą:

```sh
npx wdio run ./wdio.conf.js
```

## Pisanie testów

Załóżmy, że masz następujący komponent Vue.js:

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

W swoim teście wyrenderuj komponent w DOM i wykonaj na nim asercje. Zalecamy użycie [`@vue/test-utils`](https://test-utils.vuejs.org/) lub [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) do dołączenia komponentu do strony testowej. Do interakcji z komponentem używaj poleceń WebdriverIO, ponieważ zachowują się one bardziej podobnie do rzeczywistych interakcji użytkownika, np.:


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
        // Metoda render zwraca zestaw narzędzi do odpytywania komponentu.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // Wyślij natywne zdarzenie kliknięcia do naszego elementu przycisku.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // ta sama asercja z WebdriverIO
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
        // Metoda render zwraca zestaw narzędzi do odpytywania komponentu.
        const { getByText } = render(Component)

        // getByText zwraca pierwszy węzeł pasujący do podanego tekstu i
        // rzuca błąd, jeśli żaden element nie pasuje lub jeśli znaleziono więcej niż jedno dopasowanie.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // Wyślij natywne zdarzenie kliknięcia do naszego elementu przycisku.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // asercja z Testing Library
        await expect($('p=Times clicked: 2')).toExist() // asercja z WebdriverIO
    })
})
```

</TabItem>
</Tabs>

Pełny przykład zestawu testów komponentów WebdriverIO dla Vue.js znajdziesz w naszym [repozytorium z przykładami](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Testowanie komponentów asynchronicznych w Vue3

Jeśli używasz Vue v3 i testujesz [komponenty asynchroniczne](https://vuejs.org/guide/built-ins/suspense.html#async-setup), takie jak poniższy:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Zalecamy użycie [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) oraz niewielkiego wrappera Suspense, aby wyrenderować komponent. Niestety [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) nie obsługuje jeszcze tej funkcjonalności. Utwórz plik `helper.ts` o następującej zawartości:

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

Następnie zaimportuj i przetestuj komponent w następujący sposób:

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

## Testowanie komponentów Vue w Nuxt

Jeśli używasz frameworka webowego [Nuxt](https://nuxt.com/), WebdriverIO automatycznie włączy funkcję [auto-importu](https://nuxt.com/docs/guide/concepts/auto-imports), co ułatwia testowanie komponentów Vue i stron Nuxt. Jednakże żadne [moduły Nuxt](https://nuxt.com/modules), które możesz zdefiniować w swojej konfiguracji i które wymagają kontekstu aplikacji Nuxt, nie mogą być obsługiwane.

__Powody są następujące:__
- WebdriverIO nie może zainicjować aplikacji Nuxt wyłącznie w środowisku przeglądarki
- Zbyt duże uzależnienie testów komponentów od środowiska Nuxt zwiększa złożoność, dlatego zalecamy uruchamianie takich testów jako testów e2e

:::info

WebdriverIO udostępnia również usługę do uruchamiania testów e2e na aplikacjach Nuxt, więcej informacji znajdziesz w [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service).

:::

### Mockowanie wbudowanych composables

W przypadku, gdy Twój komponent używa natywnego composable Nuxt, np. [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO automatycznie zamockuje te funkcje i pozwoli Ci modyfikować ich zachowanie lub wykonywać na nich asercje, np.:

```ts
import { mocked } from '@wdio/browser-runner'

// np. Twój komponent wywołuje `useNuxtData` w następujący sposób
// `const { data: posts } = useNuxtData('posts')`
// w teście możesz wykonać na nim asercję
expect(useNuxtData).toBeCalledWith('posts')
// i zmienić jego zachowanie
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Obsługa composables firm trzecich

Wszystkie [moduły firm trzecich](https://nuxt.com/modules), które mogą wzbogacić Twój projekt Nuxt, nie mogą zostać automatycznie zamockowane. W takich przypadkach musisz zamockować je ręcznie, np. jeśli Twoja aplikacja używa wtyczki modułu [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

i tworzysz gdzieś w swoich composables instancję Supabase, np.:

```ts
const superbase = useSupabaseClient()
```

test zakończy się niepowodzeniem z powodu:

```
ReferenceError: useSupabaseClient is not defined
```

W takim przypadku zalecamy zamockowanie całego modułu, który używa funkcji `useSupabaseClient`, lub utworzenie zmiennej globalnej, która mockuje tę funkcję, np.:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
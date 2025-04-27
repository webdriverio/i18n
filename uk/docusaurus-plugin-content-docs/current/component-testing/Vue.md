---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) - це зручний, продуктивний та універсальний фреймворк для створення веб-інтерфейсів. Ви можете тестувати компоненти Vue.js безпосередньо в реальному браузері за допомогою WebdriverIO та його [браузерного запускача](/docs/runner#browser-runner).

## Налаштування

Щоб налаштувати WebdriverIO у вашому проекті Vue.js, дотримуйтеся [інструкцій](/docs/component-testing#set-up) у нашій документації з тестування компонентів. Переконайтеся, що обрали `vue` як пресет у параметрах вашого запускача, наприклад:

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

Якщо ви вже використовуєте [Vite](https://vitejs.dev/) як сервер розробки, ви також можете повторно використовувати вашу конфігурацію з `vite.config.ts` у вашій конфігурації WebdriverIO. Для отримання додаткової інформації див. `viteConfig` у [опціях запускача](/docs/runner#runner-options).

:::

Пресет Vue вимагає встановлення `@vitejs/plugin-vue`. Також ми рекомендуємо використовувати [Testing Library](https://testing-library.com/) для рендерингу компонента на тестовій сторінці. Для цього вам потрібно встановити наступні додаткові залежності:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Потім ви можете запустити тести за допомогою:

```sh
npx wdio run ./wdio.conf.js
```

## Написання тестів

Припустимо, у вас є наступний компонент Vue.js:

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

У вашому тесті відрендеріть компонент у DOM і запустіть перевірки на ньому. Ми рекомендуємо використовувати або [`@vue/test-utils`](https://test-utils.vuejs.org/), або [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) для підключення компонента до тестової сторінки. Для взаємодії з компонентом використовуйте команди WebdriverIO, оскільки вони поводяться більш наближено до реальних взаємодій користувача, наприклад:


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

Ви можете знайти повний приклад набору тестів компонентів WebdriverIO для Vue.js у нашому [репозиторії прикладів](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Тестування Асинхронних Компонентів у Vue3

Якщо ви використовуєте Vue v3 і тестуєте [асинхронні компоненти](https://vuejs.org/guide/built-ins/suspense.html#async-setup), такі як:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Ми рекомендуємо використовувати [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) і невеликий обгортку suspense для відтворення компонента. На жаль, [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) ще не підтримує це. Створіть файл `helper.ts` з наступним вмістом:

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

Потім імпортуйте і тестуйте компонент так:

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

## Тестування компонентів Vue у Nuxt

Якщо ви використовуєте веб-фреймворк [Nuxt](https://nuxt.com/), WebdriverIO автоматично включить функцію [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) і зробить тестування ваших компонентів Vue і сторінок Nuxt простим. Однак будь-які [модулі Nuxt](https://nuxt.com/modules), які ви можете визначити у своїй конфігурації та які потребують контексту додатка Nuxt, не можуть підтримуватися.

__Причини для цього:__
- WebdriverIO не може ініціювати додаток Nuxt виключно в середовищі браузера
- Наявність тестів компонентів, які занадто сильно залежать від середовища Nuxt, створює складність, і ми рекомендуємо запускати ці тести як e2e-тести

:::info

WebdriverIO також надає службу для запуску e2e-тестів у додатках Nuxt, див. [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) для отримання інформації.

:::

### Мокінг вбудованих композаблів

Якщо ваш компонент використовує нативний композабл Nuxt, наприклад [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO автоматично мокує ці функції та дозволяє вам змінювати їхню поведінку або виконувати перевірки проти них, наприклад:

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

### Обробка композаблів сторонніх розробників

Усі [модулі сторонніх розробників](https://nuxt.com/modules), які можуть покращити ваш проект Nuxt, не можуть автоматично бути мокованими. У таких випадках вам потрібно мокувати їх вручну, наприклад, якщо ваш додаток використовує плагін модуля [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

і ви створюєте екземпляр Supabase десь у своїх композаблах, наприклад:

```ts
const superbase = useSupabaseClient()
```

тест не вдасться через:

```
ReferenceError: useSupabaseClient is not defined
```

Тут ми рекомендуємо або мокувати весь модуль, який використовує функцію `useSupabaseClient`, або створити глобальну змінну, яка мокує цю функцію, наприклад:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
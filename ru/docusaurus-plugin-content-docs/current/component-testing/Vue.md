---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) - это доступный, производительный и универсальный фреймворк для создания веб-интерфейсов. Вы можете тестировать компоненты Vue.js непосредственно в реальном браузере с помощью WebdriverIO и его [браузерного запускателя](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте Vue.js, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Убедитесь, что вы выбрали `vue` в качестве пресета в опциях запускателя, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете повторно использовать вашу конфигурацию из `vite.config.ts` в конфигурации WebdriverIO. Для получения дополнительной информации см. `viteConfig` в [опциях запускателя](/docs/runner#runner-options).

:::

Пресет Vue требует установки `@vitejs/plugin-vue`. Также мы рекомендуем использовать [Testing Library](https://testing-library.com/) для рендеринга компонента на тестовой странице. Для этого вам необходимо установить следующие дополнительные зависимости:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Затем вы можете запустить тесты командой:

```sh
npx wdio run ./wdio.conf.js
```

## Написание тестов

Предположим, у вас есть следующий компонент Vue.js:

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

В вашем тесте отрендерите компонент в DOM и выполните проверки. Мы рекомендуем использовать либо [`@vue/test-utils`](https://test-utils.vuejs.org/), либо [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) для подключения компонента к тестовой странице. Для взаимодействия с компонентом используйте команды WebdriverIO, так как они ведут себя ближе к реальным пользовательским взаимодействиям, например:


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

Полный пример набора тестов компонентов WebdriverIO для Vue.js можно найти в нашем [репозитории с примерами](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Тестирование асинхронных компонентов в Vue3

Если вы используете Vue v3 и тестируете [асинхронные компоненты](https://vuejs.org/guide/built-ins/suspense.html#async-setup) как следующий:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Мы рекомендуем использовать [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) и небольшую обертку suspense для рендеринга компонента. К сожалению, [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) пока не поддерживает это. Создайте файл `helper.ts` со следующим содержимым:

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

Затем импортируйте и тестируйте компонент следующим образом:

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

## Тестирование Vue компонентов в Nuxt

Если вы используете веб-фреймворк [Nuxt](https://nuxt.com/), WebdriverIO автоматически включит функцию [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) и упростит тестирование ваших Vue компонентов и страниц Nuxt. Однако любые [модули Nuxt](https://nuxt.com/modules), которые вы определяете в своей конфигурации и которые требуют контекста приложения Nuxt, не могут быть поддержаны.

__Причины этого:__
- WebdriverIO не может инициировать приложение Nuxt только в браузерной среде
- Слишком сильная зависимость тестов компонентов от окружения Nuxt создает сложность, и мы рекомендуем запускать эти тесты как e2e-тесты

:::info

WebdriverIO также предоставляет сервис для запуска e2e-тестов на приложениях Nuxt, смотрите [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) для получения информации.

:::

### Мокирование встроенных composables

В случае, если ваш компонент использует нативную функцию Nuxt composable, например [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO автоматически создаст мок для этих функций и позволит вам изменять их поведение или выполнять проверки, например:

```ts
import { mocked } from '@wdio/browser-runner'

// например, ваш компонент использует вызов `useNuxtData` следующим образом
// `const { data: posts } = useNuxtData('posts')`
// в вашем тесте вы можете проверить это
expect(useNuxtData).toBeCalledWith('posts')
// и изменить их поведение
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Обработка сторонних composables

Все [сторонние модули](https://nuxt.com/modules), которые могут улучшить ваш проект Nuxt, не могут быть автоматически замокированы. В таких случаях вам нужно вручную создать моки, например, если ваше приложение использует модуль плагина [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

и вы создаете экземпляр Supabase где-то в ваших composables, например:

```ts
const superbase = useSupabaseClient()
```

тест завершится с ошибкой:

```
ReferenceError: useSupabaseClient is not defined
```

Здесь мы рекомендуем либо замокировать весь модуль, который использует функцию `useSupabaseClient`, либо создать глобальную переменную, которая мокирует эту функцию, например:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
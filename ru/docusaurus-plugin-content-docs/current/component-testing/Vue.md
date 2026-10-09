---
id: vue
title: Vue.js
description: "Настройка браузерного раннера WebdriverIO для Vue.js, написание тестов компонентов с помощью Testing Library и тестирование асинхронных компонентов и приложений Nuxt."
---

[Vue.js](https://vuejs.org/) — это доступный, производительный и универсальный фреймворк для создания веб-интерфейсов. Вы можете тестировать компоненты Vue.js непосредственно в реальном браузере, используя WebdriverIO и его [браузерный раннер](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте Vue.js, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Убедитесь, что выбрали `vue` в качестве пресета в параметрах раннера, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете просто повторно использовать вашу конфигурацию из `vite.config.ts` в конфигурации WebdriverIO. Для получения дополнительной информации см. `viteConfig` в [параметрах раннера](/docs/runner#runner-options).

:::

Пресет Vue требует установки `@vitejs/plugin-vue`. Также мы рекомендуем использовать [Testing Library](https://testing-library.com/) для рендеринга компонента на тестовой странице. Поэтому вам потребуется установить следующие дополнительные зависимости:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Затем вы можете запустить тесты, выполнив:

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

В вашем тесте отрендерите компонент в DOM и выполните проверки. Мы рекомендуем использовать либо [`@vue/test-utils`](https://test-utils.vuejs.org/), либо [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) для подключения компонента к тестовой странице. Для взаимодействия с компонентом используйте команды WebdriverIO, так как они ведут себя ближе к реальным действиям пользователя, например:


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
        // Метод render возвращает набор утилит для выполнения запросов к вашему компоненту.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // Отправляем нативное событие клика на наш элемент кнопки.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // та же проверка с помощью WebdriverIO
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
        // Метод render возвращает набор утилит для выполнения запросов к вашему компоненту.
        const { getByText } = render(Component)

        // getByText возвращает первый узел, соответствующий указанному тексту, и
        // выбрасывает ошибку, если совпадений нет или найдено более одного совпадения.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // Отправляем нативное событие клика на наш элемент кнопки.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // проверка с помощью Testing Library
        await expect($('p=Times clicked: 2')).toExist() // проверка с помощью WebdriverIO
    })
})
```

</TabItem>
</Tabs>

Полный пример набора тестов компонентов WebdriverIO для Vue.js можно найти в нашем [репозитории с примерами](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Тестирование асинхронных компонентов в Vue3

Если вы используете Vue v3 и тестируете [асинхронные компоненты](https://vuejs.org/guide/built-ins/suspense.html#async-setup), например такие:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Мы рекомендуем использовать [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) и небольшую обёртку suspense для рендеринга компонента. К сожалению, [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) пока не поддерживает эту возможность. Создайте файл `helper.ts` со следующим содержимым:

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

Затем импортируйте и протестируйте компонент следующим образом:

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

## Тестирование компонентов Vue в Nuxt

Если вы используете веб-фреймворк [Nuxt](https://nuxt.com/), WebdriverIO автоматически включит функцию [автоимпорта](https://nuxt.com/docs/guide/concepts/auto-imports), что упрощает тестирование ваших компонентов Vue и страниц Nuxt. Однако любые [модули Nuxt](https://nuxt.com/modules), которые вы можете определить в своей конфигурации и которым требуется контекст приложения Nuxt, не поддерживаются.

__Причины этого следующие:__
- WebdriverIO не может инициализировать приложение Nuxt исключительно в среде браузера
- Слишком сильная зависимость тестов компонентов от среды Nuxt создаёт сложности, поэтому мы рекомендуем запускать такие тесты как e2e-тесты

:::info

WebdriverIO также предоставляет сервис для запуска e2e-тестов приложений Nuxt, подробности см. в [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service).

:::

### Мокирование встроенных composables

Если ваш компонент использует нативный composable Nuxt, например [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO автоматически замокирует эти функции и позволит вам изменять их поведение или выполнять проверки с ними, например:

```ts
import { mocked } from '@wdio/browser-runner'

// например, ваш компонент вызывает `useNuxtData` следующим образом
// `const { data: posts } = useNuxtData('posts')`
// в вашем тесте вы можете выполнить проверку
expect(useNuxtData).toBeCalledWith('posts')
// и изменить их поведение
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Работа со сторонними composables

Все [сторонние модули](https://nuxt.com/modules), которые могут расширить возможности вашего проекта Nuxt, не могут быть замокированы автоматически. В таких случаях вам нужно замокировать их вручную, например, если ваше приложение использует плагин модуля [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

и вы создаёте экземпляр Supabase где-то в своих composables, например:

```ts
const superbase = useSupabaseClient()
```

тест завершится с ошибкой:

```
ReferenceError: useSupabaseClient is not defined
```

В этом случае мы рекомендуем либо замокировать весь модуль, который использует функцию `useSupabaseClient`, либо создать глобальную переменную, которая мокирует эту функцию, например:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
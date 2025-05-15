---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/)는 웹 사용자 인터페이스를 구축하기 위한 접근하기 쉽고, 성능이 좋으며 다재다능한 프레임워크입니다. WebdriverIO와 [브라우저 러너](/docs/runner#browser-runner)를 사용하여 실제 브라우저에서 직접 Vue.js 컴포넌트를 테스트할 수 있습니다.

## 설정

Vue.js 프로젝트 내에서 WebdriverIO를 설정하려면, 컴포넌트 테스팅 문서의 [지침](/docs/component-testing#set-up)을 따르세요. 러너 옵션 내에서 프리셋으로 `vue`를 선택해야 합니다. 예:

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

이미 개발 서버로 [Vite](https://vitejs.dev/)를 사용하고 있다면, `vite.config.ts`의 구성을 WebdriverIO 구성 내에서 재사용할 수도 있습니다. 자세한 정보는 [러너 옵션](/docs/runner#runner-options)의 `viteConfig`를 참조하세요.

:::

Vue 프리셋은 `@vitejs/plugin-vue`가 설치되어 있어야 합니다. 또한 컴포넌트를 테스트 페이지에 렌더링하기 위해 [Testing Library](https://testing-library.com/)를 사용하는 것을 권장합니다. 따라서 다음과 같은 추가 의존성을 설치해야 합니다:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

그런 다음 다음 명령을 실행하여 테스트를 시작할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js
```

## 테스트 작성하기

다음과 같은 Vue.js 컴포넌트가 있다고 가정해 봅시다:

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

테스트에서는 컴포넌트를 DOM으로 렌더링하고 그에 대한 단언(assertion)을 수행합니다. 컴포넌트를 테스트 페이지에 연결하기 위해 [`@vue/test-utils`](https://test-utils.vuejs.org/) 또는 [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/)를 사용하는 것을 권장합니다. 컴포넌트와 상호작용하려면 실제 사용자 상호작용에 더 가깝게 동작하는 WebdriverIO 명령을 사용하세요. 예:


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

Vue.js용 WebdriverIO 컴포넌트 테스트 스위트의 전체 예제는 [예제 저장소](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite)에서 찾을 수 있습니다.

## Vue3에서 비동기 컴포넌트 테스트하기

Vue v3를 사용하고 다음과 같은 [비동기 컴포넌트](https://vuejs.org/guide/built-ins/suspense.html#async-setup)를 테스트하는 경우:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

[`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils)와 컴포넌트를 렌더링하기 위한 간단한 suspense 래퍼를 사용하는 것을 권장합니다. 불행히도 [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230)는 아직 이에 대한 지원이 없습니다. 다음 내용으로 `helper.ts` 파일을 생성하세요:

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

그런 다음 다음과 같이 컴포넌트를 가져와 테스트하세요:

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

## Nuxt에서 Vue 컴포넌트 테스트하기

웹 프레임워크 [Nuxt](https://nuxt.com/)를 사용하는 경우, WebdriverIO는 자동으로 [자동 가져오기](https://nuxt.com/docs/guide/concepts/auto-imports) 기능을 활성화하여 Vue 컴포넌트와 Nuxt 페이지를 쉽게 테스트할 수 있게 합니다. 그러나 구성에 정의할 수 있는 Nuxt 애플리케이션의 컨텍스트가 필요한 [Nuxt 모듈](https://nuxt.com/modules)은 지원되지 않습니다.

__그 이유는 다음과 같습니다:__
- WebdriverIO는 브라우저 환경에서만 Nuxt 애플리케이션을 초기화할 수 없습니다.
- 컴포넌트 테스트가 Nuxt 환경에 너무 많이 의존하면 복잡성이 생기므로, 이러한 테스트는 e2e 테스트로 실행하는 것을 권장합니다.

:::info

WebdriverIO는 Nuxt 애플리케이션에서 e2e 테스트를 실행하기 위한 서비스도 제공합니다. 자세한 정보는 [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service)를 참조하세요.

:::

### 내장 컴포저블 모킹하기

컴포넌트가 기본 Nuxt 컴포저블(예: [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data))를 사용하는 경우, WebdriverIO는 자동으로 이러한 함수를 모킹하고 동작을 수정하거나 이에 대한 단언을 허용합니다. 예:

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

### 서드파티 컴포저블 처리하기

Nuxt 프로젝트를 강화할 수 있는 모든 [서드파티 모듈](https://nuxt.com/modules)은 자동으로 모킹될 수 없습니다. 이런 경우에는 수동으로 모킹해야 합니다. 예를 들어, 애플리케이션이 [Supabase](https://nuxt.com/modules/supabase) 모듈 플러그인을 사용한다고 가정합니다:

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

그리고 컴포저블 어딘가에서 Supabase 인스턴스를 생성한다면, 예:

```ts
const superbase = useSupabaseClient()
```

다음과 같은 오류로 테스트가 실패할 것입니다:

```
ReferenceError: useSupabaseClient is not defined
```

여기서는 `useSupabaseClient` 함수를 사용하는 전체 모듈을 모킹하거나 이 함수를 모킹하는 전역 변수를 생성하는 것을 권장합니다. 예:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```
---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/)는 사용자 인터페이스를 구축하기 위한 완전히 새로운 접근 방식입니다. React와 Vue와 같은 전통적인 프레임워크가 브라우저에서 대부분의 작업을 수행하는 반면, Svelte는 이러한 작업을 앱을 빌드할 때 발생하는 컴파일 단계로 이동시킵니다. WebdriverIO와 그의 [브라우저 러너](/docs/runner#browser-runner)를 사용하여 실제 브라우저에서 Svelte 컴포넌트를 직접 테스트할 수 있습니다.

## 설정

Svelte 프로젝트에서 WebdriverIO를 설정하려면 컴포넌트 테스팅 문서의 [지침](/docs/component-testing#set-up)을 따르세요. 러너 옵션에서 `svelte`를 프리셋으로 선택해야 합니다. 예:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

이미 [Vite](https://vitejs.dev/)를 개발 서버로 사용하고 있다면 WebdriverIO 구성 내에서 `vite.config.ts`의 구성을 재사용할 수도 있습니다. 자세한 내용은 [러너 옵션](/docs/runner#runner-options)의 `viteConfig`를 참조하세요.

:::

Svelte 프리셋은 `@sveltejs/vite-plugin-svelte`가 설치되어 있어야 합니다. 또한 컴포넌트를 테스트 페이지에 렌더링하기 위해 [Testing Library](https://testing-library.com/)를 사용하는 것을 권장합니다. 따라서 다음과 같은 추가 종속성을 설치해야 합니다:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

그런 다음 다음 명령을 실행하여 테스트를 시작할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js
```

## 테스트 작성하기

다음과 같은 Svelte 컴포넌트가 있다고 가정해 보겠습니다:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

테스트에서는 `@testing-library/svelte`의 `render` 메서드를 사용하여 컴포넌트를 테스트 페이지에 부착합니다. 컴포넌트와 상호 작용하기 위해 실제 사용자 상호 작용에 더 가깝게 동작하는 WebdriverIO 명령을 사용하는 것이 좋습니다. 예:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

Svelte를 위한 WebdriverIO 컴포넌트 테스트 모음의 전체 예제는 [예제 저장소](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite)에서 찾을 수 있습니다.
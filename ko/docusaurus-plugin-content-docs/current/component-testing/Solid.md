---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/)는 간단하고 성능이 뛰어난 반응성으로 사용자 인터페이스를 구축하기 위한 프레임워크입니다. WebdriverIO와 [브라우저 러너](/docs/runner#browser-runner)를 사용하여 실제 브라우저에서 SolidJS 컴포넌트를 직접 테스트할 수 있습니다.

## 설정

SolidJS 프로젝트에서 WebdriverIO를 설정하려면 컴포넌트 테스팅 문서의 [안내](/docs/component-testing#set-up)를 따르세요. 러너 옵션에서 프리셋으로 `solid`를 선택해야 합니다. 예:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

이미 개발 서버로 [Vite](https://vitejs.dev/)를 사용하고 있다면 `vite.config.ts`의 구성을 WebdriverIO 구성에서 재사용할 수 있습니다. 자세한 내용은 [러너 옵션](/docs/runner#runner-options)의 `viteConfig`를 참조하세요.

:::

SolidJS 프리셋은 `vite-plugin-solid`가 설치되어 있어야 합니다:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

그런 다음 다음 명령을 실행하여 테스트를 시작할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js
```

## 테스트 작성하기

다음과 같은 SolidJS 컴포넌트가 있다고 가정해 봅시다:

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

테스트에서는 `solid-js/web`의 `render` 메서드를 사용하여 컴포넌트를 테스트 페이지에 연결하세요. 컴포넌트와 상호 작용하기 위해 실제 사용자 상호 작용과 더 가깝게 동작하는 WebdriverIO 명령을 사용하는 것을 권장합니다:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

WebdriverIO 컴포넌트 테스트 스위트의 전체 예제는 [예제 저장소](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite)에서 찾을 수 있습니다.
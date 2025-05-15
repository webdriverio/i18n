---
id: preact
title: Preact
---

[Preact](https://preactjs.com/)는 동일한 현대적인 API를 갖춘 빠른 3kB 크기의 React 대안입니다. WebdriverIO와 그의 [브라우저 러너](/docs/runner#browser-runner)를 사용하여 실제 브라우저에서 직접 Preact 컴포넌트를 테스트할 수 있습니다.

## 설정

Preact 프로젝트에서 WebdriverIO를 설정하려면 컴포넌트 테스팅 문서의 [지침](/docs/component-testing#set-up)을 따르세요. 러너 옵션 내에서 프리셋으로 `preact`를 선택해야 합니다. 예를 들면:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'preact'
    }],
    // ...
}
```

:::info

이미 개발 서버로 [Vite](https://vitejs.dev/)를 사용하고 있다면 `vite.config.ts`의 구성을 WebdriverIO 설정에서 재사용할 수도 있습니다. 자세한 정보는 [러너 옵션](/docs/runner#runner-options)의 `viteConfig`를 참조하세요.

:::

Preact 프리셋은 `@preact/preset-vite`가 설치되어 있어야 합니다. 또한 컴포넌트를 테스트 페이지에 렌더링하기 위해 [Testing Library](https://testing-library.com/)를 사용하는 것을 권장합니다. 따라서 다음과 같은 추가 의존성을 설치해야 합니다:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

그런 다음 다음 명령을 실행하여 테스트를 시작할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js
```

## 테스트 작성하기

다음과 같은 Preact 컴포넌트가 있다고 가정해 봅시다:

```tsx title="./components/Component.jsx"
import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
    initialCount: number
}

export function Counter({ initialCount }: Props) {
    const [count, setCount] = useState(initialCount)
    const increment = () => setCount(count + 1)

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
}

```

테스트에서는 `@testing-library/preact`의 `render` 메서드를 사용하여 컴포넌트를 테스트 페이지에 부착합니다. 컴포넌트와 상호 작용하기 위해 실제 사용자 상호 작용에 더 가깝게 동작하는 WebdriverIO 명령을 사용하는 것이 좋습니다. 예를 들면:

```ts title="app.test.tsx"
import { expect } from 'expect'
import { render, screen } from '@testing-library/preact'

import { Counter } from './components/PreactComponent.js'

describe('Preact Component Testing', () => {
    it('should increment after "Increment" button is clicked', async () => {
        const component = await $(render(<Counter initialCount={5} />))
        await expect(component).toHaveText(expect.stringContaining('Current value: 5'))

        const incrElem = await $(screen.getByText('Increment'))
        await incrElem.click()
        await expect(component).toHaveText(expect.stringContaining('Current value: 6'))
    })
})
```

WebdriverIO Preact 컴포넌트 테스트 스위트의 전체 예제는 [예제 저장소](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite)에서 찾을 수 있습니다.
---
id: react
title: 리액트
---

[React](https://reactjs.org/)를 사용하면 상호작용이 가능한 UI를 쉽게 만들 수 있습니다. 애플리케이션의 각 상태에 대한 간단한 뷰를 설계하면 React는 데이터가 변경될 때 해당 컴포넌트를 효율적으로 업데이트하고 렌더링합니다. WebdriverIO와 [브라우저 러너](/docs/runner#browser-runner)를 사용하여 실제 브라우저에서 직접 React 컴포넌트를 테스트할 수 있습니다.

## 설정

React 프로젝트에서 WebdriverIO를 설정하려면 컴포넌트 테스트 문서의 [설명](/docs/component-testing#set-up)을 따르세요. 러너 옵션에서 `react`를 프리셋으로 선택해야 합니다. 예를 들면:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'react'
    }],
    // ...
}
```

:::info

이미 [Vite](https://vitejs.dev/)를 개발 서버로 사용하고 있다면 `vite.config.ts`의 설정을 WebdriverIO 설정에서 재사용할 수도 있습니다. 자세한 내용은 [러너 옵션](/docs/runner#runner-options)의 `viteConfig`를 참조하세요.

:::

React 프리셋은 `@vitejs/plugin-react`가 설치되어 있어야 합니다. 또한 컴포넌트를 테스트 페이지에 렌더링하기 위해 [Testing Library](https://testing-library.com/)를 사용하는 것을 권장합니다. 따라서 다음과 같은 추가 의존성을 설치해야 합니다:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

그런 다음 다음 명령을 실행하여 테스트를 시작할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js
```

## 테스트 작성하기

다음과 같은 React 컴포넌트가 있다고 가정해 봅시다:

```tsx title="./components/Component.jsx"
import React, { useState } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme}
    </button>
}

export default App
```

테스트에서는 `@testing-library/react`의 `render` 메서드를 사용하여 컴포넌트를 테스트 페이지에 부착합니다. 컴포넌트와 상호작용하기 위해 실제 사용자 상호작용에 더 가까운 WebdriverIO 명령을 사용하는 것이 좋습니다. 예를 들면:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './components/Component.jsx'

describe('React Component Testing', () => {
    it('Test theme button toggle', async () => {
        render(<App />)
        const buttonEl = screen.getByText(/Current theme/i)

        await $(buttonEl).click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

WebdriverIO 컴포넌트 테스트 스위트의 완전한 예제는 [예제 저장소](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite)에서 찾을 수 있습니다.
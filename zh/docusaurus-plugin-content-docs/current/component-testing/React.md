---
id: react
title: React
---

[React](https://reactjs.org/) 使创建交互式UI变得轻松。为应用程序的每个状态设计简单的视图，当数据发生变化时，React将高效地更新和渲染正确的组件。您可以使用WebdriverIO及其[浏览器运行器](/docs/runner#browser-runner)在真实浏览器中直接测试React组件。

## 设置

要在React项目中设置WebdriverIO，请按照我们组件测试文档中的[说明](/docs/component-testing#set-up)进行操作。确保在运行器选项中选择`react`作为预设，例如：

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

如果您已经使用[Vite](https://vitejs.dev/)作为开发服务器，您也可以在WebdriverIO配置中重用`vite.config.ts`中的配置。有关更多信息，请参阅[运行器选项](/docs/runner#runner-options)中的`viteConfig`。

:::

React预设需要安装`@vitejs/plugin-react`。此外，我们建议使用[Testing Library](https://testing-library.com/)将组件渲染到测试页面中。因此，您需要安装以下额外依赖：

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

然后，您可以通过运行以下命令来启动测试：

```sh
npx wdio run ./wdio.conf.js
```

## 编写测试

假设您有以下React组件：

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

在测试中，使用`@testing-library/react`中的`render`方法将组件附加到测试页面。为了与组件交互，我们建议使用WebdriverIO命令，因为它们的行为更接近实际用户交互，例如：

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

您可以在我们的[示例仓库](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite)中找到React完整的WebdriverIO组件测试套件示例。
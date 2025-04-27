---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) 是一个快速的3kB大小的React替代品，具有相同的现代API。你可以使用WebdriverIO及其[浏览器运行器](/docs/runner#browser-runner)在真实浏览器中直接测试Preact组件。

## 设置

要在Preact项目中设置WebdriverIO，请按照我们组件测试文档中的[说明](/docs/component-testing#set-up)进行操作。确保在运行器选项中选择`preact`作为预设，例如：

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

如果你已经在使用[Vite](https://vitejs.dev/)作为开发服务器，你也可以在WebdriverIO配置中重用`vite.config.ts`中的配置。有关更多信息，请参阅[运行器选项](/docs/runner#runner-options)中的`viteConfig`。

:::

Preact预设需要安装`@preact/preset-vite`。此外，我们建议使用[Testing Library](https://testing-library.com/)将组件渲染到测试页面中。因此，你需要安装以下附加依赖项：

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

然后，你可以通过运行以下命令来启动测试：

```sh
npx wdio run ./wdio.conf.js
```

## 编写测试

假设你有以下Preact组件：

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

在测试中，使用`@testing-library/preact`中的`render`方法将组件附加到测试页面。为了与组件交互，我们建议使用WebdriverIO命令，因为它们的行为更接近实际用户交互，例如：

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

你可以在我们的[示例仓库](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite)中找到一个完整的WebdriverIO Preact组件测试套件示例。
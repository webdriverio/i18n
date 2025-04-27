---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/)是一个用于构建具有简单高效响应式的用户界面的框架。您可以使用WebdriverIO及其[浏览器运行器](/docs/runner#browser-runner)直接在真实浏览器中测试SolidJS组件。

## 设置

要在SolidJS项目中设置WebdriverIO，请按照我们组件测试文档中的[说明](/docs/component-testing#set-up)进行操作。确保在运行器选项中选择`solid`作为预设，例如：

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

如果您已经使用[Vite](https://vitejs.dev/)作为开发服务器，您也可以在WebdriverIO配置中重用`vite.config.ts`中的配置。有关更多信息，请参阅[运行器选项](/docs/runner#runner-options)中的`viteConfig`。

:::

SolidJS预设需要安装`vite-plugin-solid`：

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

然后，您可以通过运行以下命令启动测试：

```sh
npx wdio run ./wdio.conf.js
```

## 编写测试

假设您有以下SolidJS组件：

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

在您的测试中，使用`solid-js/web`中的`render`方法将组件附加到测试页面。为了与组件交互，我们建议使用WebdriverIO命令，因为它们的行为更接近实际用户交互，例如：

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

您可以在我们的[示例仓库](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite)中找到SolidJS的WebdriverIO组件测试套件的完整示例。
---
id: lit
title: Lit
---

Lit 是一个简单的库，用于构建快速、轻量级的 Web 组件。借助 WebdriverIO 的[影子 DOM 选择器](/docs/selectors#deep-selectors)，测试 Lit Web 组件非常容易，您可以使用单个命令查询嵌套在影子根中的元素。

## 设置

要在 Lit 项目中设置 WebdriverIO，请按照我们组件测试文档中的[说明](/docs/component-testing#set-up)进行操作。对于 Lit，您不需要预设，因为 Lit Web 组件不需要通过编译器运行，它们是纯粹的 Web 组件增强。

设置完成后，您可以通过运行以下命令启动测试：

```sh
npx wdio run ./wdio.conf.js
```

## 编写测试

假设您有以下 Lit 组件：

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

为了测试组件，您必须在测试开始前将其渲染到测试页面中，并确保测试后进行清理：

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// import Lit component
import './components/Component.ts'

describe('Lit Component testing', () => {
    let elem: HTMLElement

    beforeEach(() => {
        elem = document.createElement('simple-greeting')
    })

    it('should render component', async () => {
        elem.setAttribute('name', 'WebdriverIO')
        document.body.appendChild(elem)

        await waitFor(() => {
            expect(elem.shadowRoot.textContent).toBe('Hello, WebdriverIO!')
        })
    })

    afterEach(() => {
        elem.remove()
    })
})
```

您可以在我们的[示例仓库](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite)中找到 Lit 的 WebdriverIO 组件测试套件的完整示例。
---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/)是一种构建用户界面的全新方法。传统框架如React和Vue在浏览器中完成大部分工作，而Svelte将这些工作转移到应用构建时的编译步骤中。你可以使用WebdriverIO及其[浏览器运行器](/docs/runner#browser-runner)直接在真实浏览器中测试Svelte组件。

## 设置

要在Svelte项目中设置WebdriverIO，请按照我们组件测试文档中的[说明](/docs/component-testing#set-up)进行操作。确保在运行器选项中选择`svelte`作为预设，例如：

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

如果你已经使用[Vite](https://vitejs.dev/)作为开发服务器，你也可以在WebdriverIO配置中重用`vite.config.ts`中的配置。有关更多信息，请参阅[运行器选项](/docs/runner#runner-options)中的`viteConfig`。

:::

Svelte预设需要安装`@sveltejs/vite-plugin-svelte`。此外，我们建议使用[Testing Library](https://testing-library.com/)将组件渲染到测试页面中。因此，你需要安装以下额外依赖：

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

然后，你可以通过运行以下命令启动测试：

```sh
npx wdio run ./wdio.conf.js
```

## 编写测试

假设你有以下Svelte组件：

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

在测试中，使用`@testing-library/svelte`中的`render`方法将组件附加到测试页面。为了与组件交互，我们建议使用WebdriverIO命令，因为它们的行为更接近实际用户交互，例如：

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

你可以在我们的[示例仓库](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite)中找到Svelte的WebdriverIO组件测试套件的完整示例。
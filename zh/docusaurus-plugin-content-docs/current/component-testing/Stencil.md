---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) 是一个用于构建可重用、可扩展组件库的工具。你可以使用 WebdriverIO 和它的[浏览器运行器](/docs/runner#browser-runner)在真实浏览器中直接测试 Stencil 组件。

## 设置

要在 Stencil 项目中设置 WebdriverIO，请按照我们组件测试文档中的[说明](/docs/component-testing#set-up)进行操作。确保在运行器选项中选择 `stencil` 作为预设，例如：

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

如果你将 Stencil 与 React 或 Vue 等框架一起使用，你应该保留这些框架的预设。

:::

然后，你可以通过运行以下命令启动测试：

```sh
npx wdio run ./wdio.conf.ts
```

## 编写测试

假设你有以下 Stencil 组件：

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

在测试中使用 `@wdio/browser-runner/stencil` 中的 `render` 方法将组件附加到测试页面。要与组件交互，我们建议使用 WebdriverIO 命令，因为它们的行为更接近实际用户交互，例如：

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### 渲染选项

`render` 方法提供以下选项：

##### `components`

要测试的组件数组。组件类可以导入到规范文件中，然后将它们的引用添加到 `component` 数组中，以便在整个测试中使用。

__类型：__ `CustomElementConstructor[]`<br />
__默认值：__ `[]`

##### `flushQueue`

如果为 `false`，则在初始测试设置时不刷新渲染队列。

__类型：__ `boolean`<br />
__默认值：__ `true`

##### `template`

用于生成测试的初始 JSX。当你想使用组件的属性而不是 HTML 属性初始化组件时，请使用 `template`。它会将指定的模板（JSX）渲染到 `document.body` 中。

__类型：__ `JSX.Template`

##### `html`

用于生成测试的初始 HTML。这对于构建一起工作的组件集合并分配 HTML 属性很有用。

__类型：__ `string`

##### `language`

在 `<html>` 上设置模拟的 `lang` 属性。

__类型：__ `string`

##### `autoApplyChanges`

默认情况下，对组件属性和特性的任何更改都必须使用 `env.waitForChanges()` 来测试更新。作为一个选项，`autoApplyChanges` 会在后台持续刷新队列。

__类型：__ `boolean`<br />
__默认值：__ `false`

##### `attachStyles`

默认情况下，样式不会附加到 DOM，它们也不会反映在序列化的 HTML 中。将此选项设置为 `true` 将在可序列化的输出中包含组件的样式。

__类型：__ `boolean`<br />
__默认值：__ `false`

#### 渲染环境

`render` 方法返回一个环境对象，提供某些实用工具来管理组件的环境。

##### `flushAll`

对组件进行更改后，例如更新属性或特性，测试页面不会自动应用更改。要等待并应用更新，请调用 `await flushAll()`

__类型：__ `() => void`

##### `unmount`

从 DOM 中移除容器元素。

__类型：__ `() => void`

##### `styles`

组件定义的所有样式。

__类型：__ `Record<string, string>`

##### `container`

渲染模板的容器元素。

__类型：__ `HTMLElement`

##### `$container`

作为 WebdriverIO 元素的容器元素。

__类型：__ `WebdriverIO.Element`

##### `root`

模板的根组件。

__类型：__ `HTMLElement`

##### `$root`

作为 WebdriverIO 元素的根组件。

__类型：__ `WebdriverIO.Element`

### `waitForChanges`

等待组件准备就绪的辅助方法。

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## 元素更新

如果你在 Stencil 组件中定义了属性或状态，你必须管理何时将这些更改应用到组件以进行重新渲染。

## 示例

你可以在我们的[示例仓库](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter)中找到 Stencil 的 WebdriverIO 组件测试套件的完整示例。
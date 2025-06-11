---
id: customcommands
title: 自定义命令
---

如果你想用自己的一组命令来扩展 `browser` 实例，可以使用浏览器的 `addCommand` 方法。你可以以异步方式编写命令，就像在你的测试规范中一样。

## 参数

### 命令名称

定义命令的名称，它将被附加到浏览器或元素作用域中。

类型: `String`

### 自定义函数

当命令被调用时执行的函数。`this` 作用域是 [`WebdriverIO.Browser`](/docs/api/browser) 或 [`WebdriverIO.Element`](/docs/api/element)，取决于命令是附加到浏览器还是元素作用域。

类型: `Function`

### 目标作用域

决定是将命令附加到浏览器还是元素作用域的标志。如果设置为 `true`，则该命令将成为元素命令。

类型: `Boolean`<br />
默认值: `false`

## 示例

此示例展示了如何添加一个新命令，该命令将当前 URL 和标题作为一个结果返回。作用域 (`this`) 是一个 [`WebdriverIO.Browser`](/docs/api/browser) 对象。

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` 指向 `browser` 作用域
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

此外，你可以通过将 `true` 作为最后一个参数传递，用你自己的一组命令扩展元素实例。在这种情况下，作用域 (`this`) 是一个 [`WebdriverIO.Element`](/docs/api/element) 对象。

```js
browser.addCommand("waitAndClick", async function () {
    // `this` 是 $(selector) 的返回值
    await this.waitForDisplayed()
    await this.click()
}, true)
```

自定义命令使你有机会将你频繁使用的特定命令序列捆绑为单个调用。你可以在测试套件中的任何点定义自定义命令；只需确保在命令首次使用*之前*定义它。（`wdio.conf.js` 中的 `before` 钩子是创建它们的一个好地方。）

一旦定义，你可以按如下方式使用它们：

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__注意：__ 如果你将自定义命令注册到 `browser` 作用域，该命令将无法被元素访问。同样，如果你将命令注册到元素作用域，它将无法在 `browser` 作用域中访问：

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // 输出 "function"
console.log(typeof elem.myCustomBrowserCommand()) // 输出 "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // 输出 "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // 输出 "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // 输出 "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // 输出 "2"
```

__注意：__ 如果你需要链接自定义命令，该命令应该以 `$` 结尾，

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

小心不要用太多自定义命令过载 `browser` 作用域。

我们建议在[页面对象](pageobjects)中定义自定义逻辑，以便它们绑定到特定页面。

### Multiremote

`addCommand` 对于 multiremote 的工作方式类似，只是新命令将向下传播到子实例。你在使用 `this` 对象时必须小心，因为 multiremote `browser` 及其子实例具有不同的 `this`。

此示例展示了如何为 multiremote 添加新命令。

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` 指向:
    //      - 对于 browser 是 MultiRemoteBrowser 作用域
    //      - 对于实例是 Browser 作用域
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## 扩展类型定义

使用 TypeScript，可以轻松扩展 WebdriverIO 接口。按照以下方式为自定义命令添加类型：

1. 创建一个类型定义文件（例如，`./src/types/wdio.d.ts`）
2. a. 如果使用模块式类型定义文件（在类型定义文件中使用 import/export 和 `declare global WebdriverIO`），确保在 `tsconfig.json` 的 `include` 属性中包含文件路径。

   b. 如果使用环境式类型定义文件（类型定义文件中没有 import/export，并且自定义命令使用 `declare namespace WebdriverIO`），确保 `tsconfig.json` *不*包含任何 `include` 部分，因为这将导致未列在 `include` 部分中的所有类型定义文件不被 typescript 识别。

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. 根据你的执行模式添加命令的定义。

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## 集成第三方库

如果你使用支持 Promise 的外部库（例如，进行数据库调用），一种很好的集成方法是用自定义命令包装某些 API 方法。

当返回 Promise 时，WebdriverIO 确保它不会继续执行下一个命令，直到 Promise 被解决。如果 Promise 被拒绝，命令将抛出错误。

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

然后，在你的 WDIO 测试规范中使用它：

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // 返回响应体
})
```

**注意：** 你的自定义命令的结果是你返回的 Promise 的结果。

## 重写命令

你也可以用 `overwriteCommand` 重写原生命令。

不建议这样做，因为它可能导致框架的不可预测行为！

整体方法与 `addCommand` 类似，唯一的区别是命令函数的第一个参数是你要重写的原始函数。请参见下面的一些示例。

### 重写浏览器命令

```js
/**
 * 在暂停前打印毫秒数并返回其值。
 * 
 * @param pause - 要被重写的命令名称
 * @param this of func - 调用函数的原始浏览器实例
 * @param originalPauseFunction of func - 原始暂停函数
 * @param ms of func - 实际传递的参数
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// 然后像以前一样使用它
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 重写元素命令

在元素级别重写命令几乎相同。只需将 `true` 作为第三个参数传递给 `overwriteCommand`：

```js
/**
 * 如果元素不可点击，尝试滚动到元素。
 * 传递 { force: true } 以使用 JS 点击，即使元素不可见或不可点击。
 * 显示原始函数参数类型可以保持为 `options?: ClickOptions`
 *
 * @param this of func - 调用原始函数的元素
 * @param originalClickFunction of func - 原始暂停函数
 * @param options of func - 实际传递的参数
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // 尝试点击
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // 滚动到元素并再次点击
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // 使用 js 点击
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    true, // 不要忘记将 `true` 作为第 3 个参数传递
)

// 然后像以前一样使用它
const elem = await $('body')
await elem.click()

// 或传递参数
await elem.click({ force: true })
```

## 添加更多 WebDriver 命令

如果你使用 WebDriver 协议并在支持额外命令的平台上运行测试，而这些命令未在 [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) 中的任何协议定义中定义，你可以通过 `addCommand` 接口手动添加它们。`webdriver` 包提供了一个命令包装器，允许以与其他命令相同的方式注册这些新端点，提供相同的参数检查和错误处理。要注册这个新端点，导入命令包装器并使用它注册一个新命令，如下所示：

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

使用无效参数调用此命令会导致与预定义协议命令相同的错误处理，例如：

```js
// 调用命令但不带必需的 url 参数和有效负载
await browser.myNewCommand()

/**
 * 导致以下错误：
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

正确调用命令，例如 `browser.myNewCommand('foo', 'bar')`，正确地向例如 `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` 发出 WebDriver 请求，有效负载如 `{ foo: 'bar' }`。

:::note
`:sessionId` url 参数将自动替换为 WebDriver 会话的会话 ID。可以应用其他 url 参数，但需要在 `variables` 中定义。
:::

有关如何定义协议命令的示例，请参见 [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) 包。
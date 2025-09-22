---
id: customcommands
title: 自定义命令
---

如果你想用自己的命令集扩展`browser`实例，浏览器方法`addCommand`可以帮助你。你可以像在测试规范中一样以异步方式编写命令。

## 参数

### 命令名称

定义命令并将其附加到浏览器或元素作用域的名称。

类型：`String`

### 自定义函数

调用命令时执行的函数。`this`作用域是[`WebdriverIO.Browser`](/docs/api/browser)或[`WebdriverIO.Element`](/docs/api/element)，取决于命令是附加到浏览器还是元素作用域。

类型：`Function`

### 选项

修改自定义命令行为的配置选项对象

#### 目标作用域

决定是否将命令附加到浏览器或元素作用域的标志。如果设置为`true`，该命令将成为元素命令。

选项名称：`attachToElement`
类型：`Boolean`<br />
默认值：`false`

#### 禁用隐式等待

决定在调用自定义命令之前是否隐式等待元素存在的标志。

选项名称：`disableElementImplicitWait`
类型：`Boolean`<br />
默认值：`false`

## 示例

此示例展示了如何添加一个返回当前URL和标题作为一个结果的新命令。作用域（`this`）是一个[`WebdriverIO.Browser`](/docs/api/browser)对象。

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` 指的是 `browser` 作用域
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

此外，你可以通过传递`true`作为最后一个参数来扩展元素实例与你自己的命令集。在这种情况下，作用域（`this`）是一个[`WebdriverIO.Element`](/docs/api/element)对象。

```js
browser.addCommand("waitAndClick", async function () {
    // `this` 是 $(selector) 的返回值
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

默认情况下，元素自定义命令在调用自定义命令之前会等待元素存在。即使大多数时候这是期望的行为，如果不需要，也可以使用`disableImplicitWait`禁用它：

```js
browser.addCommand("waitAndClick", async function () {
    // `this` 是 $(selector) 的返回值
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


自定义命令使你有机会将经常使用的特定命令序列捆绑为单个调用。你可以在测试套件中的任何位置定义自定义命令；只需确保在首次使用之前定义命令。（`wdio.conf.js`中的`before`钩子是创建它们的一个好地方。）

定义后，你可以按如下方式使用它们：

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__注意：__如果你将自定义命令注册到`browser`作用域，该命令将无法访问元素。同样，如果你将命令注册到元素作用域，它在`browser`作用域中将无法访问：

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // 输出 "function"
console.log(typeof elem.myCustomBrowserCommand()) // 输出 "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // 输出 "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // 输出 "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // 输出 "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // 输出 "2"
```

__注意：__如果你需要链式调用自定义命令，该命令应该以`$`结尾，

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

注意不要用太多自定义命令使`browser`作用域过载。

我们建议在[页面对象](pageobjects)中定义自定义逻辑，这样它们就绑定到特定页面。

### Multiremote

`addCommand`在多远程环境中以类似的方式工作，除了新命令会传播到子实例。使用`this`对象时需要注意，因为多远程`browser`及其子实例有不同的`this`。

此示例展示如何为多远程添加新命令。

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` 指的是:
    //      - MultiRemoteBrowser 浏览器的作用域
    //      - Browser 实例的作用域
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

使用TypeScript，可以轻松扩展WebdriverIO接口。为自定义命令添加类型，如下所示：

1. 创建一个类型定义文件（例如，`./src/types/wdio.d.ts`）
2. a. 如果使用模块风格的类型定义文件（在类型定义文件中使用import/export和`declare global WebdriverIO`），请确保在`tsconfig.json`的`include`属性中包含文件路径。

   b. 如果使用环境风格的类型定义文件（类型定义文件中没有import/export，为自定义命令使用`declare namespace WebdriverIO`），请确保`tsconfig.json`中*不*包含任何`include`部分，因为这将导致所有未在`include`部分列出的类型定义文件不被TypeScript识别。

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

3. 根据你的执行模式为命令添加定义。

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

如果你使用支持Promise的外部库（例如，进行数据库调用），集成它们的一种好方法是用自定义命令包装某些API方法。

当返回Promise时，WebdriverIO确保在Promise解决之前不会继续执行下一个命令。如果Promise被拒绝，命令将抛出错误。

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

然后，在你的WDIO测试规范中使用它：

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // 返回响应体
})
```

**注意：**自定义命令的结果是你返回的Promise的结果。

## 覆盖命令

你也可以用`overwriteCommand`覆盖原生命令。

不建议这样做，因为它可能导致框架的不可预测行为！

整体方法与`addCommand`类似，唯一的区别是命令函数中的第一个参数是你要覆盖的原始函数。请参阅下面的一些例子。

### 覆盖浏览器命令

```js
/**
 * 在暂停之前打印毫秒数并返回其值。
 * 
 * @param pause - 要覆盖的命令名称
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

### 覆盖元素命令

在元素级别覆盖命令几乎相同。只需将`true`作为第三个参数传递给`overwriteCommand`：

```js
/**
 * 如果元素不可点击，尝试滚动到元素位置。
 * 传递 { force: true } 可以使用JS点击，即使元素不可见或不可点击。
 * 表明可以保留原始函数参数类型，如 `options?: ClickOptions`
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

        // 使用js进行点击
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // 不要忘记将其附加到元素
)

// 然后像以前一样使用它
const elem = await $('body')
await elem.click()

// 或者传递参数
await elem.click({ force: true })
```

## 添加更多WebDriver命令

如果你使用WebDriver协议并在支持[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)中未定义的其他命令的平台上运行测试，你可以通过`addCommand`接口手动添加它们。`webdriver`包提供了一个命令包装器，允许以与其他命令相同的方式注册这些新端点，提供相同的参数检查和错误处理。要注册这个新端点，请导入命令包装器并用它注册一个新命令，如下所示：

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

使用无效参数调用此命令将导致与预定义协议命令相同的错误处理，例如：

```js
// 调用命令时没有必需的url参数和有效负载
await browser.myNewCommand()

/**
 * 结果会出现以下错误：
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

正确调用命令，例如`browser.myNewCommand('foo', 'bar')`，正确地向例如`http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`发出WebDriver请求，有效负载类似于`{ foo: 'bar' }`。

:::note
`:sessionId` url参数将自动替换为WebDriver会话的会话ID。其他url参数可以应用，但需要在`variables`中定义。
:::

有关如何定义协议命令的示例，请参见[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)包。
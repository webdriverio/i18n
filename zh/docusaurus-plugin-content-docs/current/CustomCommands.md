---
id: customcommands
title: 自定义命令
---

如果你想用自己的一组命令扩展`browser`实例，浏览器方法`addCommand`就是为你准备的。你可以以异步方式编写命令，就像在你的测试规范中一样。

## 参数

### 命令名称

定义命令并将其附加到浏览器或元素作用域的名称。

类型：`String`

### 自定义函数

当调用命令时执行的函数。`this`作用域是[`WebdriverIO.Browser`](/docs/api/browser)或[`WebdriverIO.Element`](/docs/api/element)，取决于命令是附加到浏览器还是元素作用域。

类型：`Function`

### 目标作用域

决定是将命令附加到浏览器还是元素作用域的标志。如果设置为`true`，该命令将是一个元素命令。

类型：`Boolean`<br />
默认值：`false`

## 示例

这个例子展示了如何添加一个新命令，该命令将当前URL和标题作为一个结果返回。作用域(`this`)是一个[`WebdriverIO.Browser`](/docs/api/browser)对象。

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

此外，你可以通过将`true`作为最后一个参数传递，来用你自己的一组命令扩展元素实例。在这种情况下，作用域(`this`)是一个[`WebdriverIO.Element`](/docs/api/element)对象。

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

自定义命令给你机会将你经常使用的特定命令序列捆绑为单个调用。你可以在测试套件中的任何点定义自定义命令；只需确保在首次使用之前定义命令。（`wdio.conf.js`中的`before`钩子是创建它们的一个好地方。）

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

__注意：__ 如果你将自定义命令注册到`browser`作用域，该命令将无法被元素访问。同样，如果你将命令注册到元素作用域，它将无法在`browser`作用域中访问：

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // outputs "function"
console.log(typeof elem.myCustomBrowserCommand()) // outputs "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // outputs "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // outputs "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // outputs "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // outputs "2"
```

__注意：__ 如果你需要链接自定义命令，该命令应该以`$`结尾，

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

小心不要用太多自定义命令使`browser`作用域过载。

我们建议在[页面对象](pageobjects)中定义自定义逻辑，这样它们就会绑定到特定页面。

### 多重远程

`addCommand`对多重远程的工作方式类似，不同的是新命令将向下传播到子实例。使用`this`对象时必须注意，因为多重远程`browser`及其子实例有不同的`this`。

这个例子展示了如何为多重远程添加新命令。

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refers to:
    //      - MultiRemoteBrowser scope for browser
    //      - Browser scope for instances
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

使用TypeScript，很容易扩展WebdriverIO接口。像这样为你的自定义命令添加类型：

1. 创建一个类型定义文件（例如，`./src/types/wdio.d.ts`）
2. a. 如果使用模块风格类型定义文件（在类型定义文件中使用import/export和`declare global WebdriverIO`），确保在`tsconfig.json`的`include`属性中包含文件路径。

   b. 如果使用环境风格类型定义文件（类型定义文件中没有import/export，并且为自定义命令使用`declare namespace WebdriverIO`），确保`tsconfig.json`*不*包含任何`include`部分，因为这将导致所有未在`include`部分列出的类型定义文件不被typescript识别。

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

3. 根据执行模式添加命令的定义。

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

如果你使用支持promise的外部库（例如，进行数据库调用），一种很好的集成方法是用自定义命令包装某些API方法。

当返回promise时，WebdriverIO确保它不会继续执行下一个命令，直到promise被解决。如果promise被拒绝，命令将抛出错误。

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
    console.log(body) // returns response body
})
```

**注意：** 你的自定义命令的结果是你返回的promise的结果。

## 重写命令

你也可以用`overwriteCommand`重写原生命令。

不建议这样做，因为它可能导致框架的不可预测行为！

整体方法与`addCommand`类似，唯一的区别是命令函数中的第一个参数是你将要重写的原始函数。请看下面的一些例子。

### 重写浏览器命令

```js
/**
 * print milliseconds before pause and return its value.
 */
// 'pause'            - name of command to be overwritten
// origPauseFunction  - original pause function
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 重写元素命令

重写元素级别的命令几乎相同。只需将`true`作为第三个参数传递给`overwriteCommand`：

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 */
// 'click'            - name of command to be overwritten
// origClickFunction  - original click function
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // attempt to click
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // scroll to element and click again
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // clicking with js
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // don't forget to pass `true` as 3rd argument

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## 添加更多WebDriver命令

如果你使用WebDriver协议并在支持附加命令的平台上运行测试，而这些命令未在[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)中的任何协议定义中定义，你可以通过`addCommand`接口手动添加它们。`webdriver`包提供了一个命令包装器，允许以与其他命令相同的方式注册这些新端点，提供相同的参数检查和错误处理。要注册这个新端点，导入命令包装器并用它注册一个新命令，如下所示：

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
// call command without required url parameter and payload
await browser.myNewCommand()

/**
 * results in the following error:
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

正确调用命令，例如`browser.myNewCommand('foo', 'bar')`，会正确地向例如`http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`发出WebDriver请求，并带有如`{ foo: 'bar' }`的有效载荷。

:::note
`:sessionId`url参数将自动替换为WebDriver会话的会话ID。可以应用其他url参数，但需要在`variables`中定义。
:::

在[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)包中查看协议命令如何定义的例子。
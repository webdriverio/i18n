---
id: modules
title: 模块
---

WebdriverIO 在 NPM 和其他注册表上发布了各种模块，您可以使用这些模块构建自己的自动化框架。在[这里](/docs/setuptypes)查看有关 WebdriverIO 设置类型的更多文档。

## `webdriver` 和 `devtools`

协议包（[`webdriver`](https://www.npmjs.com/package/webdriver) 和 [`devtools`](https://www.npmjs.com/package/devtools)）暴露了一个类，并附加了以下静态函数，允许您启动会话：

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

使用特定功能启动新会话。基于会话响应，将提供来自不同协议的命令。

##### 参数

- `options`: [WebDriver 选项](/docs/configuration#webdriver-options)
- `modifier`: 允许在返回客户端实例之前修改它的函数
- `userPrototype`: 允许扩展实例原型的属性对象
- `customCommandWrapper`: 允许在函数调用周围包装功能的函数

##### 返回

- [Browser](/docs/api/browser) 对象

##### 示例

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

连接到正在运行的 WebDriver 或 DevTools 会话。

##### 参数

- `attachInstance`: 要连接会话的实例，或至少是具有 `sessionId` 属性的对象（例如 `{ sessionId: 'xxx' }`）
- `modifier`: 允许在返回客户端实例之前修改它的函数
- `userPrototype`: 允许扩展实例原型的属性对象
- `customCommandWrapper`: 允许在函数调用周围包装功能的函数

##### 返回

- [Browser](/docs/api/browser) 对象

##### 示例

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

重新加载给定实例的会话。

##### 参数

- `instance`: 要重新加载的包实例

##### 示例

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

与协议包（`webdriver` 和 `devtools`）类似，您也可以使用 WebdriverIO 包 API 来管理会话。这些 API 可以通过 `import { remote, attach, multiremote } from 'webdriverio'` 导入，并包含以下功能：

#### `remote(options, modifier)`

启动 WebdriverIO 会话。该实例包含协议包的所有命令，以及额外的高阶函数，参见 [API 文档](/docs/api)。

##### 参数

- `options`: [WebdriverIO 选项](/docs/configuration#webdriverio)
- `modifier`: 允许在返回客户端实例之前修改它的函数

##### 返回

- [Browser](/docs/api/browser) 对象

##### 示例

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

连接到正在运行的 WebdriverIO 会话。

##### 参数

- `attachOptions`: 要连接会话的实例，或至少是具有 `sessionId` 属性的对象（例如 `{ sessionId: 'xxx' }`）

##### 返回

- [Browser](/docs/api/browser) 对象

##### 示例

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

初始化 multiremote 实例，使您能够在单个实例内控制多个会话。查看我们的 [multiremote 示例](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) 了解具体用例。

##### 参数

- `multiremoteOptions`: 一个对象，其键表示浏览器名称，值为其 [WebdriverIO 选项](/docs/configuration#webdriverio)。

##### 返回

- [Browser](/docs/api/browser) 对象

##### 示例

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

除了调用 `wdio` 命令外，您还可以将测试运行器作为模块引入，并在任意环境中运行它。为此，您需要将 `@wdio/cli` 包作为模块引入，如下所示：

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

之后，创建启动器的实例，并运行测试。

#### `Launcher(configPath, opts)`

`Launcher` 类构造函数需要配置文件的 URL，以及一个 `opts` 对象，其中包含将覆盖配置中设置的设置。

##### 参数

- `configPath`: `wdio.conf.js` 的路径
- `opts`: 参数（[`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)）用于覆盖配置文件中的值

##### 示例

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

`run` 命令返回一个 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。如果测试成功运行或失败，它将被解析；如果启动器无法启动运行测试，它将被拒绝。

## `@wdio/browser-runner`

当使用 WebdriverIO 的[浏览器运行器](/docs/runner#browser-runner)运行单元或组件测试时，您可以为测试导入模拟工具，例如：

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

以下命名导出可用：

#### `fn`

模拟函数，更多信息请参见官方 [Vitest 文档](https://vitest.dev/api/mock.html#mock-functions)。

#### `spyOn`

间谍函数，更多信息请参见官方 [Vitest 文档](https://vitest.dev/api/mock.html#mock-functions)。

#### `mock`

用于模拟文件或依赖模块的方法。

##### 参数

- `moduleName`: 要模拟的文件的相对路径或模块名称。
- `factory`: 返回模拟值的函数（可选）

##### 示例

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

取消模拟在手动模拟（`__mocks__`）目录中定义的依赖项。

##### 参数

- `moduleName`: 要取消模拟的模块名称。

##### 示例

```js
unmock('lodash')
```
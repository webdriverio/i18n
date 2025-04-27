---
id: browser
title: 浏览器对象
---

__继承:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

浏览器对象是您用来控制浏览器或移动设备的会话实例。如果您使用WDIO测试运行器，您可以通过全局的`browser`或`driver`对象访问WebDriver实例，或者使用[`@wdio/globals`](/docs/api/globals)导入它。如果您在独立模式下使用WebdriverIO，浏览器对象由[`remote`](/docs/api/modules#remoteoptions-modifier)方法返回。

会话由测试运行器初始化。结束会话也是由测试运行器进程完成的。

## 属性

浏览器对象具有以下属性：

| 名称 | 类型 | 详情 |
| ---- | ---- | ------- |
| `capabilities` | `Object` | 从远程服务器分配的能力。<br /><b>示例:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | 从远程服务器请求的能力。<br /><b>示例:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | 从远程服务器分配的会话ID。 |
| `options` | `Object` | WebdriverIO [选项](/docs/configuration)，取决于浏览器对象的创建方式。更多信息请参见[设置类型](/docs/setuptypes)。 |
| `commandList` | `String[]` | 注册到浏览器实例的命令列表 |
| `isW3C` | `Boolean` | 指示这是否为W3C会话 |
| `isChrome` | `Boolean` | 指示这是否为Chrome实例 |
| `isFirefox` | `Boolean` | 指示这是否为Firefox实例 |
| `isBidi` | `Boolean` | 指示这个会话是否使用Bidi |
| `isSauce` | `Boolean` | 指示这个会话是否在Sauce Labs上运行 |
| `isMacApp` | `Boolean` | 指示这个会话是否为原生Mac应用运行 |
| `isWindowsApp` | `Boolean` | 指示这个会话是否为原生Windows应用运行 |
| `isMobile` | `Boolean` | 指示一个移动会话。更多信息请参见[移动标志](#mobile-flags)。 |
| `isIOS` | `Boolean` | 指示一个iOS会话。更多信息请参见[移动标志](#mobile-flags)。 |
| `isAndroid` | `Boolean` | 指示一个Android会话。更多信息请参见[移动标志](#mobile-flags)。 |
| `isNativeContext` | `Boolean`  | 指示移动设备是否处于`NATIVE_APP`上下文。更多信息请参见[移动标志](#mobile-flags)。 |
| `mobileContext` | `string`  | 这将提供驱动程序**当前**所在的上下文，例如Android的`NATIVE_APP`、`WEBVIEW_<packageName>`或iOS的`WEBVIEW_<pid>`。它将为`driver.getContext()`保存一个额外的WebDriver。更多信息请参见[移动标志](#mobile-flags)。 |


## 方法

基于您会话使用的自动化后端，WebdriverIO会确定哪些[协议命令](/docs/api/protocols)将被附加到[浏览器对象](/docs/api/browser)上。例如，如果您在Chrome中运行自动化会话，您将可以访问Chromium特定的命令，如[`elementHover`](/docs/api/chromium#elementhover)，但不能访问任何[Appium命令](/docs/api/appium)。

此外，WebdriverIO提供了一组便捷方法，建议使用这些方法与页面上的[浏览器](/docs/api/browser)或[元素](/docs/api/element)进行交互。

除此之外，还提供以下命令：

| 名称 | 参数 | 详情 |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (类型: `String`)<br />- `fn` (类型: `Function`)<br />- `attachToElement` (类型: `boolean`) | 允许定义可以从浏览器对象调用的自定义命令，用于组合目的。更多信息请阅读[自定义命令](/docs/customcommands)指南。 |
| `overwriteCommand` | - `commandName` (类型: `String`)<br />- `fn` (类型: `Function`)<br />- `attachToElement` (类型: `boolean`) | 允许用自定义功能覆盖任何浏览器命令。请谨慎使用，因为它可能会让框架用户感到困惑。更多信息请阅读[自定义命令](/docs/customcommands#overwriting-native-commands)指南。 |
| `addLocatorStrategy` | - `strategyName` (类型: `String`)<br />- `fn` (类型: `Function`) | 允许定义自定义选择器策略，更多信息请阅读[选择器](/docs/selectors#custom-selector-strategies)指南。 |

## 备注

### 移动标志

如果您需要根据会话是否在移动设备上运行来修改测试，您可以访问移动标志进行检查。

例如，给定这个配置：

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

您可以在测试中这样访问这些标志：

```js
// 注意：`driver`等同于`browser`对象，但在语义上更正确
// 您可以选择使用哪个全局变量
console.log(driver.isMobile) // 输出：true
console.log(driver.isIOS) // 输出：true
console.log(driver.isAndroid) // 输出：false
```

这在某些情况下非常有用，例如，如果您想在[页面对象](../pageobjects)中根据设备类型定义选择器，如下所示：

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

您还可以使用这些标志仅为特定设备类型运行某些测试：

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // 仅在Android设备上运行测试
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### 事件
浏览器对象是一个EventEmitter，并且会发出一些事件供您使用。

以下是事件列表。请记住，这还不是可用事件的完整列表。
欢迎您贡献更新文档，在此处添加更多事件的描述。

#### `command`

这个事件在WebdriverIO发送WebDriver经典命令时触发。它包含以下信息：

- `command`：命令名称，例如`navigateTo`
- `method`：用于发送命令请求的HTTP方法，例如`POST`
- `endpoint`：命令端点，例如`/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`：命令负载，例如`{ url: 'https://webdriver.io' }`

#### `result`

这个事件在WebdriverIO接收到WebDriver经典命令结果时触发。它包含与`command`事件相同的信息，并额外添加以下信息：

- `result`：命令结果

#### `bidiCommand`

这个事件在WebdriverIO向浏览器驱动程序发送WebDriver Bidi命令时触发。它包含以下信息：

- `method`：WebDriver Bidi命令方法
- `params`：相关命令参数（请参见[API](/docs/api/webdriverBidi)）

#### `bidiResult`

在命令成功执行的情况下，事件负载将是：

- `type`：`success`
- `id`：命令ID
- `result`：命令结果（请参见[API](/docs/api/webdriverBidi)）

在命令错误的情况下，事件负载将是：

- `type`：`error`
- `id`：命令ID
- `error`：错误代码，例如`invalid argument`
- `message`：有关错误的详细信息
- `stacktrace`：堆栈跟踪

#### `request.start`
这个事件在WebDriver请求发送到驱动程序之前触发。它包含有关请求及其负载的信息。

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
这个事件在驱动程序收到响应后触发。事件对象要么包含响应体作为结果，要么在WebDriver命令失败时包含错误。

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
重试事件可以在WebdriverIO尝试重新运行命令时通知您，例如由于网络问题。它包含有关导致重试的错误以及已完成的重试次数的信息。

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
这是一个用于测量WebDriver级别操作的事件。每当WebdriverIO向WebDriver后端发送请求时，这个事件将被触发，并带有一些有用的信息：

- `durationMillisecond`：请求的时间持续时间（毫秒）。
- `error`：如果请求失败，则为错误对象。
- `request`：请求对象。您可以找到url、method、headers等。
- `retryCount`：如果是`0`，则请求是第一次尝试。当WebDriverIO在内部重试时，该值将增加。
- `success`：表示请求是否成功的布尔值。如果为`false`，也将提供`error`属性。

事件示例：
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### 自定义命令

您可以在浏览器范围内设置自定义命令，以抽象常用的工作流程。查看我们关于[自定义命令](/docs/customcommands#adding-custom-commands)的指南，了解更多信息。
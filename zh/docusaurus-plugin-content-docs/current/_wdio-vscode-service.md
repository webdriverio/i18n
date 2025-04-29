---
id: wdio-vscode-service
title: VSCode 扩展测试服务
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-vscode-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

测试环境：

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> WebdriverIO 服务，用于测试 VSCode 扩展。

这个 WebdriverIO 服务允许你在 VSCode 桌面 IDE 或作为 Web 扩展无缝测试你的 VSCode 扩展。你只需提供扩展的路径，服务会完成剩下的工作：

- 🏗️ 安装 VSCode（可以是 `stable`、`insiders` 或指定版本）
- ⬇️ 下载特定 VSCode 版本对应的 Chromedriver
- 🚀 使你能够从测试中访问 VSCode API
- 🖥️ 使用自定义用户设置启动 VSCode（支持 Ubuntu、MacOS 和 Windows 上的 VSCode）
- 🌐 或从服务器提供 VSCode 以供任何浏览器访问，从而测试[网页扩展](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 引导页面对象，使其定位器与你的 VSCode 版本匹配

这个项目受到基于 Selenium 的 [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) 项目的高度启发。这个包采用了这个想法并将其适配到 WebdriverIO。

从 VSCode v1.86 开始，需要使用 `webdriverio` v8.14 或更高版本来安装 Chromedriver，无需任何配置。如果你需要测试早期版本的 VSCode，请参阅下面的 [Chromedriver 配置](#chromedriver) 部分。

## 安装

要初始化一个新的 WebdriverIO 项目，运行：

```bash
npm create wdio ./
```

安装向导将引导你完成该过程。确保你选择 TypeScript 作为编译器，并且不要让它为你生成页面对象，因为这个项目已经包含了所有需要的页面对象。然后确保在服务列表中选择 `vscode`：

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

关于如何安装 `WebdriverIO` 的更多信息，请查看[项目文档](https://webdriver.io/docs/gettingstarted)。

## 示例配置

要使用该服务，你需要将 `vscode` 添加到你的服务列表中，后面可以跟一个可选的配置对象。这将使 WebdriverIO 下载指定的 VSCode 二进制文件和相应的 Chromedriver 版本：

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" 或 "stable" 用于最新的 VSCode 版本
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * 可选地定义 WebdriverIO 存储所有 VSCode 二进制文件的路径，例如：
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

如果你在 `browserName` 不是 `vscode` 而是其他值（如 `chrome`）的情况下定义 `wdio:vscodeOptions`，服务将把扩展作为网页扩展提供。如果你在 Chrome 上测试，不需要额外的驱动服务，例如：

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_注意：_ 在测试网页扩展时，你只能在 `stable` 或 `insiders` 之间选择作为 `browserVersion`。

### TypeScript 设置

在你的 `tsconfig.json` 中，确保将 `wdio-vscode-service` 添加到你的类型列表中：

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## 使用方法

你可以使用 `getWorkbench` 方法来访问与你所需 VSCode 版本匹配的定位器的页面对象：

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### 访问 VSCode API

如果你想通过 [VSCode API](https://code.visualstudio.com/api/references/vscode-api) 执行某些自动化操作，你可以通过自定义 `executeWorkbench` 命令运行远程命令。此命令允许你从测试中远程执行代码到 VSCode 环境中，并使你能够访问 VSCode API。你可以将任意参数传递给该函数，这些参数将传递给函数。`vscode` 对象将始终作为第一个参数传入，后跟外部函数参数。请注意，你不能访问函数作用域之外的变量，因为回调是远程执行的。示例如下：

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // 输出：「I am an API call!」
```

完整的页面对象文档，请查看[文档](https://webdriverio-community.github.io/wdio-vscode-service/modules.html)。你可以在这个[项目的测试套件](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs)中找到各种使用示例。

## 配置

通过服务配置，你可以管理 VSCode 版本以及 VSCode 的用户设置：

### 服务选项

服务选项是服务设置测试环境所需的选项。

#### `cachePath`

定义缓存路径以避免重新下载 VS Code 包。这对于 CI/CD 很有用，可以避免每次测试运行都重新下载 VSCode。

类型：`string`<br />
默认值：`process.cwd()`

### VSCode 能力 (`wdio:vscodeOptions`)

为了通过 VSCode 运行测试，你必须将 `vscode` 定义为 `browserName`。你可以通过提供 `browserVersion` 能力来指定 VSCode 版本。自定义 VSCode 选项然后在自定义 `wdio:vscodeOptions` 能力中定义。选项如下：

#### `binary`

本地安装的 VSCode 安装路径。如果未提供该选项，服务将根据给定的 `browserVersion`（如果未给定则为 `stable`）下载 VSCode。

类型：`string`

#### `extensionPath`

定义要测试的扩展的目录。

类型：`string`

#### `storagePath`

为 VS Code 定义自定义位置来存储所有数据。这是 VS Code 内部目录的根目录，例如（部分列表）
* **user-data-dir**：存储所有用户设置（全局设置）、扩展日志等的目录。
* **extension-install-dir**：安装 VS Code 扩展的目录。

如果未提供，则使用临时目录。

类型：`string`

#### `userSettings`

定义要应用于 VSCode 的自定义用户设置。

类型：`Record<string, number | string | object | boolean>`<br />
默认值：`{}`

#### `workspacePath`

为特定工作区打开 VSCode。如果未提供，VSCode 将在没有打开工作区的情况下启动。

类型：`string`

#### `filePath`

打开 VSCode 并打开特定文件。

类型：`string`

#### `vscodeArgs`

作为对象的附加启动参数，例如：

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

将作为以下参数传入：

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

类型：`Record<string, string | boolean>`<br />
默认值：参见 [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

如果设置为 true，服务会记录来自扩展主机和控制台 API 的 VSCode 输出。

类型：`boolean`<br />
默认值：`false`

#### `vscodeProxyOptions`

VSCode API 代理配置定义了 WebdriverIO 如何连接到 VSCode 工作台，以便你访问 VSCode API。

类型：`VSCodeProxyOptions`<br />
默认值：

```ts
{
    /**
     * 如果设置为 true，服务将尝试与 VSCode 工作台建立连接
     * 以启用对 VSCode API 的访问
     */
    enable: true,
    /**
     * 用于连接工作台的 WebSocket 连接端口。
     * 默认设置为操作系统中的可用端口。
     */
    // port?: number
    /**
     * 连接到 VSCode 内部 WebSocket 的超时时间
     */
    connectionTimeout: 5000,
    /**
     * VSCode 内部执行命令的超时时间
     */
    commandTimeout: 5000
}
```

### Chromedriver

从 VSCode v1.86 开始，需要使用 `webdriverio` v8.14 或更高版本才能安装 Chromedriver，无需任何配置。[简化的浏览器自动化设置](https://webdriver.io/blog/2023/07/31/driver-management) 会为你处理一切。

要测试早期版本的 VS Code，请从日志中找到预期的 Chromedriver 版本，下载 [Chromedriver](https://chromedriver.chromium.org/downloads)，并配置路径。例如：

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## 创建你自己的 PageObjects

你可以重用此服务中使用的组件来创建自己的审查页面对象。首先创建一个定义所有选择器的文件，例如：

```ts
// 例如 在 /test/pageobjects/locators.ts 中
export const componentA = {
    elem: 'form', // 组件容器元素
    submit: 'button[type="submit"]', // 提交按钮
    username: 'input.username', // 用户名输入框
    password: 'input.password' // 密码输入框
}
```

现在你可以创建一个页面对象，如下所示：

```ts
// 例如 在 /test/pageobjects/loginForm.ts 中
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private 定位器键，用于标识定位器映射（参见 locators.ts）
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

现在在你的测试中，你可以像这样使用你的页面对象：

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// 例如 在 /test/specs/example.e2e.ts 中
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // 你也可以直接通过 `[selector]$` 或 `[selector]$$` 使用页面对象元素
        // 例如：
        await loginForm.submit$.click()

        // 或直接访问定位器
        console.log(loginForm.locators.username)
        // 输出：「input.username」
    })
})
```

## TypeScript 支持

如果你使用带有 TypeScript 的 WebdriverIO，请确保在 `tsconfig.json` 的 `types` 中添加 `wdio-vscode-service`，例如：

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // 将此服务添加到你的类型中
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## 代理支持

在此服务初始化期间，会下载 ChromeDriver 和 VSCode 发行版。你可以通过设置环境变量 `HTTPS_PROXY` 或 `https_proxy` 来通过代理隧道这些请求。例如：

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## 参考

以下 VS Code 扩展使用了 `wdio-vscode-service`：

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k 下载量)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m 下载量)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k 下载量)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m 下载量)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k 下载量)

## 贡献

在提交拉取请求之前，请运行以下命令：

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (或 `npm run ci`)

## 了解更多

如果你想了解更多关于测试 VSCode 扩展的信息，查看 [Christian Bromann](https://twitter.com/bromann) 在 [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU) 的演讲：

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

有关 WebdriverIO 的更多信息，请查看项目[主页](https://webdriver.io)。
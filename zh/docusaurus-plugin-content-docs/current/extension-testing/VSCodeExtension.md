---
id: vscode-extensions
title: VS Code 扩展测试
---

WebdriverIO 允许您在 VS Code Desktop IDE 或作为 Web 扩展无缝测试您的 [VS Code](https://code.visualstudio.com/) 扩展。您只需提供扩展的路径，框架将完成其余工作。通过 [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service)，一切都得到了处理，包括：

- 🏗️ 安装 VSCode（稳定版、内部版或指定版本）
- ⬇️ 下载特定于给定 VSCode 版本的 Chromedriver
- 🚀 使您能够从测试中访问 VSCode API
- 🖥️ 使用自定义用户设置启动 VSCode（包括支持 Ubuntu、MacOS 和 Windows 上的 VSCode）
- 🌐 或者从服务器提供 VSCode，以便任何浏览器访问以测试网络扩展
- 📔 引导页面对象与匹配您的 VSCode 版本的定位器

## 入门指南

要启动新的 WebdriverIO 项目，请运行：

```sh
npm create wdio@latest ./
```

安装向导将引导您完成该过程。确保在询问您想要进行何种测试时选择 _"VS Code Extension Testing"_，之后只需保持默认设置或根据您的偏好进行修改。

## 配置示例

要使用该服务，您需要将 `vscode` 添加到服务列表中，可选择后跟一个配置对象。这将使 WebdriverIO 下载给定的 VSCode 二进制文件和适当的 Chromedriver 版本：

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" 或 "stable" 用于最新的 VSCode 版本
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * 可选地，您可以定义 WebdriverIO 存储所有
     * VSCode 和 Chromedriver 二进制文件的路径，例如：
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

如果您使用除 `vscode` 之外的其他 `browserName`（例如 `chrome`）定义 `wdio:vscodeOptions`，该服务将把扩展作为 Web 扩展提供。如果您在 Chrome 上测试，则不需要额外的驱动程序服务，例如：

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

_注意：_ 测试 Web 扩展时，您只能在 `stable` 或 `insiders` 之间选择作为 `browserVersion`。

### TypeScript 设置

在您的 `tsconfig.json` 中，确保将 `wdio-vscode-service` 添加到类型列表中：

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
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## 使用方法

然后，您可以使用 `getWorkbench` 方法访问与您所需 VSCode 版本匹配的定位器的页面对象：

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

从那里，您可以使用正确的页面对象方法访问所有页面对象。在[页面对象文档](https://webdriverio-community.github.io/wdio-vscode-service/)中了解有关所有可用页面对象及其方法的更多信息。

### 访问 VSCode API

如果您想通过 [VSCode API](https://code.visualstudio.com/api/references/vscode-api) 执行某些自动化，可以通过自定义 `executeWorkbench` 命令运行远程命令。此命令允许从您的测试中远程执行代码到 VSCode 环境中，并能够访问 VSCode API。您可以将任意参数传递到函数中，这些参数将传播到函数中。`vscode` 对象将始终作为第一个参数传入，后跟外部函数参数。请注意，您无法访问函数作用域之外的变量，因为回调是远程执行的。下面是一个示例：

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // 输出: "I am an API call!"
```

有关完整的页面对象文档，请查看[文档](https://webdriverio-community.github.io/wdio-vscode-service/modules.html)。您可以在此[项目的测试套件](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs)中找到各种使用示例。

## 更多信息

您可以在[服务文档](/docs/wdio-vscode-service)中了解有关如何配置 [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) 以及如何创建自定义页面对象的更多信息。您还可以观看 [Christian Bromann](https://twitter.com/bromann) 关于[_使用 Web 标准的力量测试复杂的 VSCode 扩展_](https://www.youtube.com/watch?v=PhGNTioBUiU)的演讲：

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>
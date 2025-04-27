---
id: web-extensions
title: Web 扩展测试
---

WebdriverIO 是自动化浏览器的理想工具。Web 扩展是浏览器的一部分，可以以相同的方式进行自动化测试。无论您的 Web 扩展使用内容脚本在网站上运行 JavaScript 或提供弹出模态框，您都可以使用 WebdriverIO 为其运行端到端测试。

## 将 Web 扩展加载到浏览器中

作为第一步，我们必须将要测试的扩展作为会话的一部分加载到浏览器中。这在 Chrome 和 Firefox 中的工作方式不同。

:::info

这些文档省略了 Safari Web 扩展，因为它们的支持远远落后，用户需求不高。如果您正在为 Safari 构建 Web 扩展，请[提出问题](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E)并协作在此处也包含它。

:::

### Chrome

在 Chrome 中加载 Web 扩展可以通过提供 `crx` 文件的 `base64` 编码字符串或提供 Web 扩展文件夹的路径来完成。最简单的方法是通过定义 Chrome 功能如下来实现后者：

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // 假设您的 wdio.conf.js 位于根目录中，并且编译好的
            // Web 扩展文件位于 `./dist` 文件夹中
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

如果您自动化的是 Chrome 以外的浏览器，例如 Brave、Edge 或 Opera，很可能浏览器选项与上面的示例匹配，只是使用不同的功能名称，例如 `ms:edgeOptions`。

:::

如果您使用例如 [crx](https://www.npmjs.com/package/crx) NPM 包将扩展编译为 `.crx` 文件，您还可以通过以下方式注入打包的扩展：

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extPath = path.join(__dirname, `web-extension-chrome.crx`)
const chromeExtension = (await fs.readFile(extPath)).toString('base64')

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            extensions: [chromeExtension]
        }
    }]
}
```

### Firefox

要创建包含扩展的 Firefox 配置文件，您可以使用 [Firefox 配置文件服务](/docs/firefox-profile-service)来相应地设置会话。但是，您可能会遇到由于签名问题而无法加载本地开发的扩展的情况。在这种情况下，您还可以通过 [`installAddOn`](/docs/api/gecko#installaddon) 命令在 `before` 钩子中加载扩展，例如：

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = {
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}
```

为了生成 `.xpi` 文件，建议使用 [`web-ext`](https://www.npmjs.com/package/web-ext) NPM 包。您可以使用以下示例命令打包扩展：

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## 技巧与诀窍

以下部分包含一组在测试 Web 扩展时可能有用的技巧和诀窍。

### 在 Chrome 中测试弹出模态框

如果您在[扩展清单](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action)中定义了 `default_popup` 浏览器操作条目，您可以直接测试该 HTML 页面，因为点击浏览器顶部栏中的扩展图标将不起作用。相反，您必须直接打开弹出 HTML 文件。

在 Chrome 中，这可以通过检索扩展 ID 并通过 `browser.url('...')` 打开弹出页面来实现。该页面上的行为将与弹出窗口中的行为相同。为此，我们建议编写以下自定义命令：

```ts customCommand.ts
export async function openExtensionPopup (this: WebdriverIO.Browser, extensionName: string, popupUrl = 'index.html') {
  if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
    throw new Error('This command only works with Chrome')
  }
  await this.url('chrome://extensions/')

  const extensions = await this.$$('extensions-item')
  const extension = await extensions.find(async (ext) => (
    await ext.$('#name').getText()) === extensionName
  )

  if (!extension) {
    const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
    throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
  }

  const extId = await extension.getAttribute('id')
  await this.url(`chrome-extension://${extId}/popup/${popupUrl}`)
}

declare global {
  namespace WebdriverIO {
      interface Browser {
        openExtensionPopup: typeof openExtensionPopup
      }
  }
}
```

在您的 `wdio.conf.js` 中，您可以导入此文件并在 `before` 钩子中注册自定义命令，例如：

```ts wdio.conf.ts
import { browser } from '@wdio/globals'

import { openExtensionPopup } from './support/customCommands'

export const config: WebdriverIO.Config = {
  // ...
  before: () => {
    browser.addCommand('openExtensionPopup', openExtensionPopup)
  }
}
```

现在，在您的测试中，您可以通过以下方式访问弹出页面：

```ts
await browser.openExtensionPopup('My Web Extension')
```
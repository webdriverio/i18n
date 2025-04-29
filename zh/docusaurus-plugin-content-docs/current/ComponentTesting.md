---
id: component-testing
title: 组件测试
---

使用WebdriverIO的[浏览器运行器](/docs/runner#browser-runner)，您可以在实际的桌面或移动浏览器中运行测试，同时使用WebdriverIO和WebDriver协议来自动化和交互页面上渲染的内容。与其他只允许针对[JSDOM](https://www.npmjs.com/package/jsdom)测试的测试框架相比，这种方法有[许多优势](/docs/runner#browser-runner)。

## 它是如何工作的？

浏览器运行器使用[Vite](https://vitejs.dev/)来渲染测试页面并初始化测试框架，以在浏览器中运行您的测试。目前它只支持Mocha，但Jasmine和Cucumber也在[路线图](https://github.com/orgs/webdriverio/projects/1)上。这允许测试任何类型的组件，即使是不使用Vite的项目。

Vite服务器由WebdriverIO测试运行器启动，并进行配置，使您可以像往常用于普通e2e测试那样使用所有的报告器和服务。此外，它还初始化了一个[`browser`](/docs/api/browser)实例，允许您访问[WebdriverIO API](/docs/api)的子集，以与页面上的任何元素进行交互。与e2e测试类似，您可以通过附加到全局作用域的`browser`变量或从`@wdio/globals`导入来访问该实例，具体取决于[`injectGlobals`](/docs/api/globals)的设置。

WebdriverIO内置支持以下框架：

- [__Nuxt__](https://nuxt.com/)：WebdriverIO的测试运行器会检测Nuxt应用程序，并自动设置您的项目composables并帮助模拟Nuxt后端，更多信息请参阅[Nuxt文档](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/)：WebdriverIO的测试运行器会检测您是否使用TailwindCSS，并将环境正确加载到测试页面中

## 设置

要为浏览器中的单元测试或组件测试设置WebdriverIO，请通过以下方式启动一个新的WebdriverIO项目：

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

配置向导启动后，选择`browser`用于运行单元和组件测试，并选择预设之一（如果需要），否则如果您只想运行基本单元测试，请选择_"Other"_。如果您的项目中已经使用Vite，您也可以配置自定义Vite配置。有关更多信息，请查看所有[运行器选项](/docs/runner#runner-options)。

:::info

__注意：__ WebdriverIO默认会在CI环境中无头运行浏览器测试，例如当`CI`环境变量设置为`'1'`或`'true'`时。您可以使用运行器的[`headless`](/docs/runner#headless)选项手动配置此行为。

:::

在此过程结束时，您应该找到一个包含各种WebdriverIO配置的`wdio.conf.js`，其中包括一个`runner`属性，例如：

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

通过定义不同的[capabilities](/docs/configuration#capabilities)，您可以在不同的浏览器中运行测试，如果需要的话可以并行运行。

如果您仍然不确定一切是如何工作的，请观看以下关于如何开始使用WebdriverIO进行组件测试的教程：

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## 测试工具

您可以完全自由地决定在测试中运行什么以及如何渲染组件。然而，我们建议使用[Testing Library](https://testing-library.com/)作为实用工具框架，因为它为各种组件框架提供插件，如React、Preact、Svelte和Vue。它对于将组件渲染到测试页面非常有用，并且会在每次测试后自动清理这些组件。

您可以根据需要混合使用Testing Library原语和WebdriverIO命令，例如：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__注意：__ 使用Testing Library的render方法有助于在测试之间移除创建的组件。如果不使用Testing Library，请确保将测试组件附加到在测试之间被清理的容器中。

## 设置脚本

您可以通过在Node.js或浏览器中运行任意脚本来设置测试，例如注入样式、模拟浏览器API或连接到第三方服务。WebdriverIO的[钩子](/docs/configuration#hooks)可用于在Node.js中运行代码，而[`mochaOpts.require`](/docs/frameworks#require)允许您在加载测试之前将脚本导入到浏览器中，例如：

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // provide a setup script to run in the browser
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // set up test environment in Node.js
    }
    // ...
}
```

例如，如果您想使用以下设置脚本模拟测试中的所有[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)调用：

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// run code before all tests are loaded
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // run code after test file is loaded
}

export const mochaGlobalTeardown = () => {
    // run code after spec file was executed
}

```

现在在您的测试中，您可以为所有浏览器请求提供自定义响应值。有关全局fixtures的更多信息，请阅读[Mocha文档](https://mochajs.org/#global-fixtures)。

## 监视测试和应用程序文件

有多种方法可以调试您的浏览器测试。最简单的方法是使用`--watch`标志启动WebdriverIO测试运行器，例如：

```sh
$ npx wdio run ./wdio.conf.js --watch
```

这将首先运行所有测试，并在全部运行完成后暂停。然后，您可以对单个文件进行更改，这些更改将单独重新运行。如果您设置了指向应用程序文件的[`filesToWatch`](/docs/configuration#filestowatch)，当应用程序发生更改时，它将重新运行所有测试。

## 调试

虽然目前还不可能在IDE中设置断点并让远程浏览器识别它们，但您可以使用[`debug`](/docs/api/browser/debug)命令在任何点停止测试。这使您可以打开DevTools，然后通过在[sources选项卡](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools)中设置断点来调试测试。

当调用`debug`命令时，您还将在终端中获得一个Node.js repl界面，显示：

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

按下`Ctrl`或`Command` + `c`或输入`.exit`继续测试。

## 通过Selenium Grid运行

如果您设置了[Selenium Grid](https://www.selenium.dev/documentation/grid/)并通过该网格运行浏览器，则必须设置`host`浏览器运行器选项，以允许浏览器访问提供测试文件的正确主机，例如：

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // network IP of the machine that runs the WebdriverIO process
        host: 'http://172.168.0.2'
    }]
}
```

这将确保浏览器正确打开托管在运行WebdriverIO测试的实例上的服务器实例。

## 示例

您可以在我们的[示例仓库](https://github.com/webdriverio/component-testing-examples)中找到使用流行组件框架测试组件的各种示例。
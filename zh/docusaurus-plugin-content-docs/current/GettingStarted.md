---
id: gettingstarted
title: 入门指南
---

欢迎来到WebdriverIO文档。它将帮助你快速上手。如果遇到问题，你可以在我们的[Discord支持服务器](https://discord.webdriver.io)上寻求帮助和答案，或者你可以在[Twitter](https://twitter.com/webdriverio)上联系我。

:::info
这是最新版本(__>=9.x__)的WebdriverIO文档。如果你仍在使用旧版本，请访问[旧文档网站](/versions)！
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip 官方YouTube频道 🎥

你可以在[官方YouTube频道](https://youtube.com/@webdriverio)上找到更多关于WebdriverIO的视频。别忘了订阅！

:::

## 初始化WebdriverIO设置

要使用[WebdriverIO启动工具包](https://www.npmjs.com/package/create-wdio)将完整的WebdriverIO设置添加到现有或新项目中，请运行：

如果你在现有项目的根目录中，请运行：

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

或者如果你想创建一个新项目：

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

或者如果你想创建一个新项目：

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

或者如果你想创建一个新项目：

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

或者如果你想创建一个新项目：

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

这一条命令下载WebdriverIO CLI工具并运行配置向导，帮助你配置测试套件。

<CreateProjectAnimation />

该向导会提出一系列问题来引导你完成设置。你可以传递`--yes`参数以选择默认设置，该设置将使用Mocha和Chrome，并采用[页面对象](https://martinfowler.com/bliki/PageObject.html)模式。

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

## 手动安装CLI

你也可以通过以下方式手动将CLI包添加到你的项目中：

```sh
npm i --save-dev @wdio/cli
npx wdio --version # 打印如 `8.13.10`

# 运行配置向导
npx wdio config
```

## 运行测试

你可以使用`run`命令并指向你刚刚创建的WebdriverIO配置来启动测试套件：

```sh
npx wdio run ./wdio.conf.js
```

如果你想运行特定的测试文件，可以添加`--spec`参数：

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

或者在配置文件中定义套件，然后只运行套件中定义的测试文件：

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## 在脚本中运行

如果你想在Node.JS脚本中以[独立模式](/docs/setuptypes#standalone-mode)使用WebdriverIO作为自动化引擎，你也可以直接安装WebdriverIO并将其作为包使用，例如生成网站的截图：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__注意：__所有WebdriverIO命令都是异步的，需要使用[`async/await`](https://javascript.info/async-await)正确处理。

## 录制测试

WebdriverIO提供了工具，通过在屏幕上记录你的测试操作并自动生成WebdriverIO测试脚本，帮助你入门。有关更多信息，请参阅[使用Chrome DevTools Recorder录制测试](/docs/record)。

## 系统要求

你需要安装[Node.js](http://nodejs.org)。

- 安装至少v18.20.0或更高版本，因为这是最老的活跃LTS版本
- 只有当前是或将成为LTS版本的发布才受官方支持

如果你的系统当前没有安装Node，我们建议使用[NVM](https://github.com/creationix/nvm)或[Volta](https://volta.sh/)等工具来帮助管理多个活跃的Node.js版本。NVM是一个流行的选择，而Volta也是一个不错的替代方案。
---
id: v6-migration
title: 从v5到v6
---

本教程适用于仍在使用WebdriverIO `v5`并想迁移到`v6`或WebdriverIO最新版本的用户。正如我们在[发布博客文章](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released)中提到的，此版本升级的变更可以总结如下：

- 我们整合了一些命令的参数（例如`newWindow`、`react$`、`react$$`、`waitUntil`、`dragAndDrop`、`moveTo`、`waitForDisplayed`、`waitForEnabled`、`waitForExist`），并将所有可选参数移到一个单一对象中，例如：

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- 服务的配置移到了服务列表中，例如：

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- 为了简化，一些服务选项被重命名
- 我们将命令`launchApp`重命名为`launchChromeApp`，用于Chrome WebDriver会话

:::info

如果您正在使用WebdriverIO `v4`或更低版本，请先升级到`v5`。

:::

虽然我们希望有一个完全自动化的迁移过程，但现实情况有所不同。每个人都有不同的设置。每个步骤应该被视为指导，而不是一步一步的指示。如果您在迁移过程中遇到问题，请不要犹豫，[联系我们](https://github.com/webdriverio/codemod/discussions/new)。

## 设置

与其他迁移类似，我们可以使用WebdriverIO [codemod](https://github.com/webdriverio/codemod)。要安装codemod，请运行：

```sh
npm install jscodeshift @wdio/codemod
```

## 升级WebdriverIO依赖

鉴于所有WebdriverIO版本都相互紧密关联，最好总是升级到特定的标签，例如`6.12.0`。如果您决定直接从`v5`升级到`v7`，您可以省略标签并安装所有包的最新版本。为此，我们从`package.json`中复制所有WebdriverIO相关依赖，并通过以下方式重新安装：

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

通常WebdriverIO依赖是开发依赖的一部分，但这取决于您的项目。完成后，您的`package.json`和`package-lock.json`应该已更新。__注意：__这些是示例依赖，您的可能不同。确保通过调用以下命令找到最新的v6版本：

```sh
npm show webdriverio versions
```

尝试为所有核心WebdriverIO包安装可用的最新版本6。对于社区包，这可能因包而异。在这里，我们建议查看更新日志，了解哪个版本仍与v6兼容。

## 转换配置文件

一个好的第一步是从配置文件开始。所有破坏性变更都可以使用codemod全自动解决：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

codemod尚不支持TypeScript项目。请参阅[`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)。我们正在努力尽快实现对它的支持。如果您使用TypeScript，请参与！

:::

## 更新规范文件和页面对象

为了更新所有命令更改，请在所有包含WebdriverIO命令的e2e文件上运行codemod，例如：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

就是这样！不需要更多更改了🎉

## 结论

我们希望本教程能够指导您完成迁移到WebdriverIO `v6`的过程。我们强烈建议继续升级到最新版本，因为由于几乎没有破坏性更改，升级到`v7`非常简单。请查看[升级到v7](v7-migration)的迁移指南。

社区继续改进codemod，同时在各种组织中与各种团队一起测试它。如果您有反馈，请不要犹豫[提出问题](https://github.com/webdriverio/codemod/issues/new)，或者如果您在迁移过程中遇到困难，请[开始讨论](https://github.com/webdriverio/codemod/discussions/new)。
---
id: v7-migration
title: 从v6迁移到v7
---

本教程适用于仍在使用WebdriverIO `v6`并希望迁移到`v7`的用户。正如我们在[发布博客文章](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released)中提到的，变更主要是在底层，升级过程应该相对简单直接。

:::info

如果你正在使用WebdriverIO `v5`或更低版本，请先升级到`v6`。请查看我们的[v6迁移指南](v6-migration)。

:::

虽然我们希望有一个完全自动化的迁移过程，但现实情况并非如此。每个人都有不同的设置。每个步骤应该被视为指导，而不是一步一步的指令。如果你在迁移过程中遇到问题，请不要犹豫[联系我们](https://github.com/webdriverio/codemod/discussions/new)。

## 设置

与其他迁移类似，我们可以使用WebdriverIO的[codemod](https://github.com/webdriverio/codemod)。在本教程中，我们使用社区成员提交的[样板项目](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)，并将其从`v6`完全迁移到`v7`。

要安装codemod，请运行：

```sh
npm install jscodeshift @wdio/codemod
```

#### 提交记录：

- _安装codemod依赖_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## 升级WebdriverIO依赖

鉴于所有WebdriverIO版本都是相互关联的，最好始终升级到特定标签，例如`latest`。为此，我们从`package.json`中复制所有WebdriverIO相关的依赖项，并通过以下方式重新安装它们：

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

通常WebdriverIO依赖项是开发依赖项的一部分，不过这取决于你的项目。完成此操作后，你的`package.json`和`package-lock.json`应该已更新。__注意：__这些是[示例项目](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)使用的依赖项，你的可能不同。

#### 提交记录：

- _更新依赖项_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## 转换配置文件

一个好的第一步是从配置文件开始。在WebdriverIO `v7`中，我们不再需要手动注册任何编译器。实际上，它们需要被移除。这可以通过codemod完全自动地完成：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

codemod目前尚不支持TypeScript项目。请参见[`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)。我们正在努力实现对它的支持。如果你正在使用TypeScript，请参与进来！

:::

#### 提交记录：

- _转译配置文件_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## 更新步骤定义

如果你使用的是Jasmine或Mocha，那么到此为止你已经完成了迁移。最后一步是将Cucumber.js导入从`cucumber`更新为`@cucumber/cucumber`。这也可以通过codemod自动完成：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

就是这样！不需要更多更改了🎉

#### 提交记录：

- _转译步骤定义_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## 结论

我们希望本教程能够指导你完成WebdriverIO `v7`的迁移过程。社区将继续改进codemod，同时在各种组织的各种团队中对其进行测试。如果你有反馈，请不要犹豫[提出问题](https://github.com/webdriverio/codemod/issues/new)，或者如果你在迁移过程中遇到困难，请[开始讨论](https://github.com/webdriverio/codemod/discussions/new)。
---
id: debugging
title: 调试
---

在多个浏览器中启动数十个测试的多个进程情况下，调试变得相当困难。

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

首先，通过将 `maxInstances` 设置为 `1`，并且只针对需要调试的那些规范和浏览器，可以有效限制并行性。

在 `wdio.conf` 中：

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Debug 命令

在许多情况下，您可以使用 [`browser.debug()`](/docs/api/browser/debug) 来暂停测试并检查浏览器。

您的命令行界面也会切换到 REPL 模式。此模式允许您使用页面上的命令和元素进行实验。在 REPL 模式下，您可以像在测试中一样访问 `browser` 对象&mdash;或 `$` 和 `$$` 函数。

使用 `browser.debug()` 时，您可能需要增加测试运行器的超时时间，以防止测试运行器因测试耗时过长而使测试失败。例如：

在 `wdio.conf` 中：

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

有关如何使用其他框架执行此操作的更多信息，请参见 [timeouts](timeouts)。

要在调试后继续测试，在 shell 中使用 `^C` 快捷键或 `.exit` 命令。
## 动态配置

请注意，`wdio.conf.js` 可以包含 Javascript。由于您可能不希望永久将超时值更改为 1 天，因此通常可以使用环境变量从命令行更改这些设置。

使用此技术，您可以动态更改配置：

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

然后，您可以在 `wdio` 命令前加上 `debug` 标志：

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...并使用 DevTools 调试您的规范文件！

## 使用 Visual Studio Code (VSCode) 进行调试

如果您想在最新的 VSCode 中使用断点调试测试，您有两种启动调试器的选择，其中选项 1 是最简单的方法：
 1. 自动附加调试器
 2. 使用配置文件附加调试器

### VSCode 切换自动附加

您可以通过在 VSCode 中执行以下步骤来自动附加调试器：
 - 按 CMD + Shift + P（Linux 和 MacOS）或 CTRL + Shift + P（Windows）
 - 在输入字段中输入 "attach"
 - 选择 "Debug: Toggle Auto Attach"
 - 选择 "Only With Flag"

就是这样！现在，当您运行测试时（记住您需要在配置中设置 --inspect 标志，如前面所示），它将自动启动调试器，并在到达第一个断点时停止。

### VSCode 配置文件

可以运行所有或选定的规范文件。必须将调试配置添加到 `.vscode/launch.json`，要调试选定的规范，请添加以下配置：
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

要运行所有规范文件，请从 `"args"` 中删除 `"--spec", "${file}"`

示例：[.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

附加信息：https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## 使用 Atom 进行动态 Repl

如果您是 [Atom](https://atom.io/) 用户，可以尝试由 [@kurtharriger](https://github.com/kurtharriger) 开发的 [`wdio-repl`](https://github.com/kurtharriger/wdio-repl)，这是一个动态 repl，允许您在 Atom 中执行单行代码。观看 [这个](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube 视频查看演示。

## 使用 WebStorm / Intellij 进行调试
您可以创建一个 node.js 调试配置，如下所示：
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
观看此 [YouTube 视频](https://www.youtube.com/watch?v=Qcqnmle6Wu8) 了解有关如何创建配置的更多信息。

## 调试不稳定测试

不稳定测试可能很难调试，所以这里有一些提示，告诉您如何尝试重现在 CI 中得到的不稳定结果。

### 网络
要调试与网络相关的不稳定问题，请使用 [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) 命令。
```js
await browser.throttleNetwork('Regular3G')
```

### 渲染速度
要调试与设备速度相关的不稳定问题，请使用 [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) 命令。
这会导致页面渲染变慢，这可能是由许多因素引起的，比如在 CI 中运行多个进程，这可能会减慢测试速度。
```js
await browser.throttleCPU(4)
```

### 测试执行速度

如果您的测试似乎没有受到影响，可能是因为 WebdriverIO 比前端框架/浏览器的更新更快。这在使用同步断言时会发生，因为 WebdriverIO 没有机会重试这些断言。一些可能会因此而失败的代码示例：
```js
expect(elementList.length).toEqual(7) // 在断言时列表可能尚未填充
expect(await elem.getText()).toEqual('this button was clicked 3 times') // 在断言时文本可能尚未更新，导致错误（"this button was clicked 2 times" 与预期的 "this button was clicked 3 times" 不匹配）
expect(await elem.isDisplayed()).toBe(true) // 可能尚未显示
```
要解决这个问题，应该使用异步断言。上面的例子应该改为：
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
使用这些断言，WebdriverIO 将自动等待，直到条件匹配。在断言文本时，这意味着元素需要存在，且文本需要等于预期值。
我们在 [最佳实践指南](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) 中更多地讨论了这一点。
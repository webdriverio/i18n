---
id: watcher
title: 监视测试文件
---

使用WDIO测试运行器，你可以在处理文件时监视它们。当你在应用程序或测试文件中更改内容时，测试会自动重新运行。通过在调用`wdio`命令时添加`--watch`标志，测试运行器将在运行完所有测试后等待文件更改，例如：

```sh
wdio wdio.conf.js --watch
```

默认情况下，它只监视`specs`文件的更改。但是，通过在`wdio.conf.js`中设置`filesToWatch`属性，其中包含文件路径列表（支持全局模式），它还会监视这些文件的更改以重新运行整个测试套件。如果你想在更改应用程序代码时自动重新运行所有测试，这非常有用，例如：

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
尽可能地并行运行测试。本质上，E2E测试速度较慢。只有在单个测试运行时间较短的情况下，重新运行测试才有用。为了节省时间，测试运行器在等待文件更改时保持WebDriver会话处于活动状态。确保你的WebDriver后端可以被修改，以便在一段时间内没有执行命令后不会自动关闭会话。
:::
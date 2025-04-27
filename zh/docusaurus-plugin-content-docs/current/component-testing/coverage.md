---
id: coverage
title: 代码覆盖率
---

WebdriverIO的浏览器运行器支持使用[`istanbul`](https://istanbul.js.org/)进行代码覆盖率报告。测试运行器将自动检测您的代码并为您捕获代码覆盖率。

## 设置

要启用代码覆盖率报告，请通过WebdriverIO浏览器运行器配置启用它，例如：

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

查看所有[覆盖率选项](/docs/runner#coverage-options)，了解如何正确配置它。

## 忽略代码

您可能希望有意地从覆盖率跟踪中排除代码库的某些部分，为此，您可以使用以下解析提示：

- `/* istanbul ignore if */`：忽略下一个if语句。
- `/* istanbul ignore else */`：忽略if语句的else部分。
- `/* istanbul ignore next */`：忽略源代码中的下一个内容（函数、if语句、类等等）。
- `/* istanbul ignore file */`：忽略整个源文件（应放在文件顶部）。

:::info

建议从覆盖率报告中排除测试文件，因为它可能会导致错误，例如在调用`execute`或`executeAsync`命令时。如果您想将它们保留在报告中，请确保通过以下方式排除对它们的检测：

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::
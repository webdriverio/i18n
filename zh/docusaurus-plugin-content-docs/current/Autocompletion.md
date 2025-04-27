---
id: autocompletion
title: 自动补全
---

## IntelliJ

IDEA 和 WebStorm 中的自动补全功能开箱即用。

如果你已经编写程序代码一段时间了，你可能会喜欢自动补全功能。许多代码编辑器中都有开箱即用的自动补全功能。

![Autocompletion](/img/autocompletion/0.png)

基于 [JSDoc](http://usejsdoc.org/) 的类型定义用于文档代码。它有助于查看有关参数及其类型的更多详细信息。

![Autocompletion](/img/autocompletion/1.png)

在 IntelliJ 平台上使用标准快捷键 <kbd>⇧ + ⌥ + SPACE</kbd> 查看可用文档：

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code 通常自动集成了类型支持，无需额外操作。

![Autocompletion](/img/autocompletion/14.png)

如果你使用原生 JavaScript 并希望获得适当的类型支持，你需要在项目根目录中创建一个 `jsconfig.json` 文件，并引用所使用的 wdio 包，例如：

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```
---
id: faq
title: 常见问题
---

### 当我想运行`check(Screen/Element/FullPageScreen)`时，是否需要使用`save(Screen/Element/FullPageScreen)`方法？

不，你不需要这样做。`check(Screen/Element/FullPageScreen)`会自动为你完成这项工作。

### 我的视觉测试因差异而失败，如何更新我的基准图像？

你可以通过在命令行中添加参数`--update-visual-baseline`来更新基准图像。这将：

-   自动复制实际截取的屏幕截图并将其放入基准文件夹
-   如果有差异，它会让测试通过，因为基准已经更新

**用法：**

```sh
npm run test.local.desktop  --update-visual-baseline
```

在运行日志信息/调试模式时，你将看到以下添加的日志

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### 宽度和高度不能为负值

可能会抛出错误`Width and height cannot be negative`。十之八九，这与创建视图之外的元素图像有关。请确保在尝试创建元素图像之前，元素始终在视图中。

### Windows上安装Canvas失败并显示Node-Gyp日志

如果你在Windows上安装Canvas时遇到Node-Gyp错误的问题，请注意这仅适用于版本4及更低版本。为了避免这些问题，请考虑更新到版本5或更高版本，这些版本不再有这些依赖关系，而是使用[Jimp](https://github.com/jimp-dev/jimp)进行图像处理。

如果你仍需要解决版本4的问题，请查看：

-   [入门指南](/docs/visual-testing#system-requirements)中的Node Canvas部分
-   [这篇文章](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/)，了解如何修复Windows上的Node-Gyp问题。(感谢[IgorSasovets](https://github.com/IgorSasovets))
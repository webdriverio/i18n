---
id: relaunchActiveApp
title: 重启活动应用
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

通过以下步骤重启当前活动的原生应用：

- 终止活动应用
- 启动之前活动的应用

:::important
此命令将重启（终止/关闭并启动/开始）当前活动的应用，但不会重置应用状态。除非以下情况，否则 Appium 无法执行应用的硬重置：

- 您启动一个新会话，且会话处理程序移除应用状态/清理设备
- 您的应用中有一个后门可以重置应用状态，且 Appium 可以调用这个后门

如果您想为 Android 或 iOS 重置应用状态，您需要在脚本中创建自己的重置机制/命令。选项可能包括：

- Android：使用 `adb` 命令清除应用数据：`adb shell pm clear <appPackage>`
- iOS：使用 `mobile: installApp` 命令重新安装应用
- ....
- 不使用此命令

您可用的选项取决于平台、应用以及测试位置（本地通常拥有对设备的完全访问权限，或在云端拥有较少的访问权限）。

:::

##### 示例

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```
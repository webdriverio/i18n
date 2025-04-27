---
id: pinch
title: 捏合
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

在屏幕上的给定元素上执行捏合手势。

:::info

捏合基于原生移动手势实现。它仅支持以下驱动程序：
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) 用于Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) 用于iOS

此命令仅适用于以下最新组件：
 - Appium服务器（版本2.0.0或更高）
 - `appium-uiautomator2-driver`（用于Android）
 - `appium-xcuitest-driver`（用于iOS）

确保您的本地或基于云的Appium环境定期更新，以避免兼容性问题。

:::

##### 用法

```js
$(selector).pinch({ duration, scale })
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`PinchOptions`</td>
      <td>捏合选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>捏合手势执行的持续时间（毫秒），最小值为500毫秒，最大值为10000毫秒。默认值为1500毫秒（1.5秒）（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>相对于屏幕的捏合比例大小。有效值必须是0..1范围内的浮点数，其中1.0代表100%（可选）</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```
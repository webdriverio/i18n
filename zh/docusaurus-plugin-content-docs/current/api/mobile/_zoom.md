---
id: zoom
title: 缩放
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

在屏幕上对给定元素执行缩放手势。

:::info

缩放基于原生移动手势实现。它仅支持以下驱动程序：
- Android系统的[appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture)
- iOS系统的[appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch)

此命令仅适用于以下最新组件：
 - Appium服务器（版本2.0.0或更高）
 - `appium-uiautomator2-driver`（Android系统）
 - `appium-xcuitest-driver`（iOS系统）

请确保您的本地或基于云的Appium环境定期更新，以避免兼容性问题。

:::

##### 用法

```js
$(selector).zoom({ duration, scale })
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
      <td>`PinchAndZoomOptions`</td>
      <td>缩放选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>缩放执行的持续时间（毫秒），最小值为500毫秒，最大值为10000毫秒。默认值为1500毫秒（1.5秒）（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>相对于屏幕的缩放比例。有效值必须是0..1范围内的浮点数，其中1.0表示100%（可选）</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```
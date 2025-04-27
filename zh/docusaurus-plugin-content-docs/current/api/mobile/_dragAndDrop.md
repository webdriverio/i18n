---
id: dragAndDrop
title: 拖放
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

将一个元素拖动到目标元素或位置。

:::info

此命令的功能高度依赖于你的应用中拖放功能的实现方式。如果你遇到问题，请在 [#4134](https://github.com/webdriverio/webdriverio/issues/4134) 中发布你的示例。

另外请确保你要拖动的元素和你要放置的目标元素在屏幕上都是可见的。

这个命令只适用于以下最新组件：
 - Appium 服务器（版本 2.0.0 或更高）
 - `appium-uiautomator2-driver`（适用于 Android）
 - `appium-xcuitest-driver`（适用于 iOS）

确保你的本地或云端 Appium 环境定期更新，以避免兼容性问题。

:::

##### 用法

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>目标元素或具有 x 和 y 属性的对象</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop 命令选项</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>拖动应该持续多长时间</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```
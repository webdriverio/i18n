---
id: longPress
title: 长按
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

在屏幕上对给定元素执行长按手势。

这会为选定元素发出WebDriver的`action`命令。它基于`click`命令。

:::info

此命令仅适用于以下最新组件：
 - Appium服务器（版本2.0.0或更高）
 - `appium-uiautomator2-driver`（用于Android）
 - `appium-xcuitest-driver`（用于iOS）

确保定期更新您的本地或基于云的Appium环境，以避免兼容性问题。

:::

##### 用法

```js
$(selector).longPress({ x, y, duration })
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
      <td>`LongPressOptions`</td>
      <td>长按选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>数字（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>数字（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>按压持续时间（毫秒），默认为1500毫秒 <br /><strong>仅适用于移动设备</strong></td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```
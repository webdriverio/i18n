---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

执行点击手势：
- 在给定元素上。它将**自动滚动**以找到元素（如果元素不在可视区域）。
- 或通过提供`x`和`y`坐标在移动设备屏幕上点击

内部实现使用：
- 元素点击：
     - 对于Web环境（Chrome/Safari浏览器或混合应用），使用`click`命令
     - 对于原生应用，使用Android的[`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
或iOS的[`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap)，包括用于自动滚动的`scrollIntoView`命令
- 屏幕点击：
     - 对于Web环境（Chrome/Safari浏览器或混合应用），使用`action`命令
     - 对于原生应用，使用Android的[`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
或iOS的[`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap)

这种差异使`tap`命令成为移动应用中比`click`命令更可靠的替代方案。

对于原生应用，该命令与`click`命令的不同之处在于它将<strong>自动滑动</strong>到元素，使用`scrollIntoView`命令，而`click`命令不支持原生应用的这一功能。在混合应用或Web环境中，`click`和`tap`命令都支持自动滚动。

:::info

此命令只适用于以下最新组件：
 - Appium服务器（版本2.0.0或更高）
 - `appium-uiautomator2-driver`（用于Android）
 - `appium-xcuitest-driver`（用于iOS）

确保定期更新本地或基于云的Appium环境，以避免兼容性问题。

:::

:::caution 关于屏幕点击

如果你想点击屏幕上的特定坐标，并使用截图来确定坐标，请记住iOS的坐标是基于设备的屏幕尺寸，而不是截图尺寸。由于设备像素比例，截图尺寸会更大。
直到iPhone 8和当前iPad的平均设备像素比例为2，而iPhone X之后的iPhone比例为3。这意味着截图尺寸是设备屏幕尺寸的2倍或3倍，因此如果你在截图上找到坐标，需要将它们除以设备像素比例才能得到正确的屏幕坐标。例如：

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // 例如iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`TapOptions`</td>
      <td>点击选项（可选）</td>
    </tr>
    <tr>
              <td colspan="3"><strong>元素点击选项</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>数字（可选，如果设置了y则必填）<br /><strong>仅用于屏幕点击，不用于元素点击</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>数字（可选，如果设置了x则必填）<br /><strong>仅用于屏幕点击，不用于元素点击</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>屏幕点击选项</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>可以是`down`、`up`、`left`或`right`之一，默认为`down`。<br /><strong>仅用于元素点击，不用于屏幕点击</strong><br /><strong>仅限移动原生应用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>搜索元素时的最大滚动次数，默认为`10`。<br /><strong>仅用于元素点击，不用于屏幕点击</strong><br /><strong>仅限移动原生应用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>用于滚动的元素。如果未提供元素，则iOS将使用以下选择器`-ios predicate string:type == "XCUIElementTypeApplication"`，Android将使用以下选择器`//android.widget.ScrollView'`。如果多个元素匹配默认选择器，则默认情况下它将选择第一个匹配的元素。<br /><strong>仅用于元素点击，不用于屏幕点击</strong><br /><strong>仅限移动原生应用</strong></td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```
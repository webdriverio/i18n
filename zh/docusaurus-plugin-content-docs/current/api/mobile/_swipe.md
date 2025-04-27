---
id: swipe
title: 滑动
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

在桌面/移动网页<strong>和</strong>移动原生应用中在视口或元素内向特定方向滑动。

:::info

移动原生应用的滑动基于W3C-actions协议，模拟手指按压和移动。
这与Android的[`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture)
或iOS的[`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll)命令不同，后者基于Appium驱动协议，
且仅在NATIVE上下文的移动平台上可用。

此命令仅与以下最新组件一起工作：
 - Appium服务器（版本2.0.0或更高）
 - `appium-uiautomator2-driver`（用于Android）
 - `appium-xcuitest-driver`（用于iOS）

确保您的本地或基于云的Appium环境定期更新，以避免兼容性问题。

:::

:::caution 基于坐标的滑动

除非绝对必要，否则避免使用`from`和`to`选项。这些选项与设备相关，可能在不同设备上无法一致工作。
使用`scrollableElement`选项可在元素内进行可靠的滑动。

:::

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
      <td>`object, boolean`</td>
      <td>`browser.swipe()`的选项。桌面/移动网页的默认值：<br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string`</td>
      <td>可以是`down`、`up`、`left`或`right`之一，默认为`up`。<br /><strong>仅限移动原生应用</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>向下</strong><br /><strong>起始点：</strong><br/>您将手指放在屏幕上部。<br/><strong>移动：</strong><br/>您将手指向下滑动到屏幕底部。<br/><strong>动作：</strong><br/>根据上下文的不同而变化：<br />- 在主屏幕或应用程序中，通常会向上滚动内容。<br />- 从顶部边缘，通常会打开通知面板或快速设置。<br />- 在浏览器或阅读应用中，可用于滚动内容。</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>向左</strong><br /><strong>起始点：</strong><br/>您将手指放在屏幕右侧。<br/><strong>移动：</strong><br/>您将手指水平向左滑动。<br/><strong>动作：</strong><br/>对此手势的响应取决于应用程序：<br />- 可以在轮播或一组图像中移动到下一项。<br />- 在导航上下文中，可能会返回上一页或关闭当前视图。<br />- 在主屏幕上，通常会切换到下一个虚拟桌面或屏幕。</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>向右</strong><br /><strong>起始点：</strong><br/>您将手指放在屏幕左侧。<br/><strong>移动：</strong><br/>您将手指水平向右滑动。<br/><strong>动作：</strong><br/>类似于向左滑动，但方向相反：<br />-- 通常在轮播或图库中移动到上一项。<br />- 可用于打开应用中的侧边菜单或导航抽屉。<br />- 在主屏幕上，通常会切换到上一个虚拟桌面。</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>向上</strong><br /><strong>起始点：</strong><br/>您将手指放在屏幕底部。<br/><strong>移动：</strong><br/>您将手指向上滑动到屏幕顶部。<br/><strong>动作：</strong><br/>根据上下文，可能会发生不同的操作：<br />- 在主屏幕或列表中，通常会向下滚动内容。<br />- 在全屏应用中，可能会打开其他选项或应用抽屉。<br />- 在某些界面上，可能会触发"刷新"操作或打开搜索栏。</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>滑动的持续时间（毫秒）。默认为`1500`毫秒。值越低，滑动越快。</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Element`</td>
      <td>用于在其内部滑动的元素。如果未提供元素，iOS将使用以下选择器`-ios predicate string:type == "XCUIElementTypeApplication"`，Android将使用以下选择器`//android.widget.ScrollView'`。如果多个元素匹配默认选择器，则默认情况下将选择第一个匹配元素。<br /> <strong>仅限移动原生应用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>要滑动的（默认）可滚动元素的百分比。这是一个介于0和1之间的值。默认为`0.95`。<br /><strong>切勿</strong>从屏幕的最上方|最下方|最左侧|最右侧滑动，您可能会触发例如通知栏或其他操作系统/应用功能，这可能导致意外结果。<br />如果提供了`from`和`to`，则此值无效。</td>
    </tr>
    <tr>
              <td colspan="3"><strong>以下值<strong>仅</strong>在<strong>未</strong>提供`scrollableElement`时有效，否则将被忽略。</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`object`</td>
      <td>滑动起点的x和y坐标。如果提供了`scrollableElement`，则这些坐标无效。</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>滑动起点的x坐标。</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>滑动起点的y坐标。</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`object`</td>
      <td>滑动终点的x和y坐标。如果提供了`scrollableElement`，则这些坐标无效。</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>滑动终点的x坐标。</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>滑动终点的y坐标。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```
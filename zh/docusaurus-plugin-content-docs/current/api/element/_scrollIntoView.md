---
id: scrollIntoView
title: 滚动到视图
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

将元素滚动到桌面/移动网页<strong>以及</strong>移动原生应用的视口内。

:::info

移动原生应用的滚动是基于移动`swipe`命令完成的。

:::

##### 用法

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
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
      <td>`object, boolean`</td>
      <td>`Element.scrollIntoView()`的选项。桌面/移动网页默认值：<br/> `{ block: 'start', inline: 'nearest' }` <br /> 移动原生应用默认值 <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>仅桌面/移动网页</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string`</td>
      <td>参见 [MDN 参考](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)。 <br /><strong>仅限网页</strong> (桌面/移动)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string`</td>
      <td>参见 [MDN 参考](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)。 <br /><strong>仅限网页</strong> (桌面/移动)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string`</td>
      <td>参见 [MDN 参考](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)。 <br /><strong>仅限网页</strong> (桌面/移动)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>仅移动原生应用</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string`</td>
      <td>可以是 `down`、`up`、`left` 或 `right` 之一，默认为 `up`。 <br /><strong>仅限移动原生应用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>在停止搜索元素之前的最大滚动次数，默认为 `10`。 <br /><strong>仅限移动原生应用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>滑动的持续时间，以毫秒为单位。默认为 `1500` 毫秒。值越低，滑动越快。<br /><strong>仅限移动原生应用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Element`</td>
      <td>用于滚动的元素。如果未提供元素，将为iOS使用以下选择器 `-ios predicate string:type == "XCUIElementTypeApplication"`，为Android使用以下选择器 `//android.widget.ScrollView'`。如果有多个元素匹配默认选择器，它将默认选择第一个匹配的元素。 <br /> <strong>仅限移动原生应用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>要滑动的（默认）可滚动元素的百分比。这是一个介于0和1之间的值。默认值为 `0.95`。<br /><strong>切勿</strong>从屏幕的正上方|底部|左侧|右侧滑动，这可能会触发例如通知栏或其他操作系统/应用功能，从而导致意外结果。<br /> <strong>仅限移动原生应用</strong></td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```
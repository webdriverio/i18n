---
id: isDisplayed
title: isDisplayed（是否显示）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

如果选定的DOM元素被显示（即使元素在视口之外），则返回true。它使用浏览器提供的[`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)方法来确定元素是否被显示。由于WebdriverIO模拟真实用户行为，`contentVisibilityAuto`、`opacityProperty`和`visibilityProperty`标志的默认值被设置为`true`，以实现更严格的行为。这意味着该命令将检查元素是否因其`content-visibility`、`opacity`和`visibility`属性的值而可见。

如果你还想验证元素是否在视口内，请向命令提供`withinViewport`标志。

:::info

与其他元素命令不同，WebdriverIO不会等待元素存在才执行此命令。

:::

WebdriverIO在进行浏览器测试时，使用[自定义脚本](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)专门用于评估元素的可见性。这个脚本是确定元素是否显示在页面上的关键。相反，对于使用Appium的原生移动测试场景，WebdriverIO依赖Appium提供的[`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)命令。此命令使用底层Appium驱动程序建立的标准评估元素的可见性，确保对移动应用进行准确和特定于驱动程序的评估。

##### 用法

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
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
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>`true`表示检查元素是否在视口内。默认为`false`。</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>`true`表示检查元素的content-visibility属性是否具有（或继承）值auto，并且当前正跳过其渲染。默认为`true`。</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>`true`表示检查元素的opacity属性是否具有（或继承）值0。默认为`true`。</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>`true`表示检查元素是否因其visibility属性的值而不可见。默认为`true`。</td>
    </tr>
  </tbody>
</table>

##### 示例

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  如果元素显示则返回true
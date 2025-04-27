---
id: click
title: 点击
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

点击一个元素。

这会为选定的元素发出WebDriver的`click`命令，当没有传递选项时，通常会滚动到该元素并点击选定的元素。当传递选项对象时，它使用action类而不是webdriver点击，这提供了额外的功能，如传递按钮类型、坐标等。默认情况下，使用选项时，在执行点击操作后会发送释放动作命令，传递`option.skipRelease=true`可以跳过此操作。

:::info

如果你有固定位置的元素（如固定的页眉或页脚）在元素滚动到视口内后覆盖了选定的元素，点击将在给定坐标上发出，但会被你的固定（覆盖）元素接收。在这些情况下，会抛出以下错误：

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

为了解决这个问题，尝试找到覆盖元素并通过`execute`命令删除它，这样它就不会干扰点击。你也可以尝试使用`scroll`自己滚动到元素，使用适合你场景的偏移量。

:::

:::info

点击命令也可以用来模拟移动设备上的长按。这是通过设置`duration`来完成的。
更多信息请参见下面的示例。

:::

##### 用法

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td>`ClickOptions`</td>
      <td>点击选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string, number`</td>
      <td>可以是 `[0, "left", 1, "middle", 2, "right"]` 中的一个 <br /><strong>仅限WEB</strong> (桌面/移动)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>点击位置距离元素位置（从元素中心点）的水平像素距离X<br /><strong>WEB和原生</strong> (桌面/移动)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>点击位置距离元素位置（从元素中心点）的垂直像素距离Y<br /><strong>WEB和原生支持</strong> (桌面/移动)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`boolean`</td>
      <td>布尔值（可选）<br /><strong>仅限WEB</strong> (桌面/移动)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>点击的持续时间，也称为"长按" <br /><strong>仅限移动原生应用</strong> (移动)</td>
    </tr>
  </tbody>
</table>

##### 示例

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```
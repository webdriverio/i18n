---
id: touchAction
title: 触控操作
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution 弃用警告

`touchAction` 命令已被**弃用**，将在未来版本中移除。
我们建议使用带有触摸类型指针的 [`action`](/docs/api/browser/action) 命令代替，例如：

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

触控操作API提供了在Appium中可以自动化的所有手势的基础。
目前它仅适用于原生应用，不能用于与网页应用交互。
其核心是能够将单独的临时操作链接在一起，然后将其应用于设备上应用程序中的元素。可以使用的基本操作有：

- press（传递元素或(x,y)或两者）
- longPress（传递元素或(x,y)或两者）
- tap（传递元素或(x,y)或两者）
- moveTo（传递绝对x,y坐标）
- wait（传递ms（以毫秒为单位））
- release（无参数）

##### 用法

```js
$(selector).touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>要执行的操作</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await screen.touchAction('tap');

    // simple touch action using selector and x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await screen.touchAction({
        action: 'tap', x: 30, y:20
    })

    // multi action on an element (drag&drop)
    await screen.touchAction([
        'press',
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])

    // drag&drop to element
    const otherElement = await $('//UIAApplication[1]/UIAElement[2]')
    await screen.touchAction([
        'press',
        { action: 'moveTo', element: otherElement },
        'release'
    ])
});
```
---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution 弃用警告

`touchAction` 命令已经被__弃用__，并将在未来版本中移除。
我们建议使用带有触摸类型指针的 [`action`](/docs/api/browser/action) 命令代替，例如：

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

Touch Action API 提供了 Appium 中所有可自动化手势的基础。
目前它仅适用于原生应用，不能用于与网页应用交互。
其核心是能够将各个独立操作链接在一起，然后将这些操作应用于设备上应用程序中的元素。可以使用的基本操作有：

- press（传递元素或 (`x`, `y`) 或两者）
- longPress（传递元素或 (`x`, `y`) 或两者）
- tap（传递元素或 (`x`, `y`) 或两者）
- moveTo（传递绝对 `x`, `y` 坐标）
- wait（传递 `ms`（毫秒））
- release（无参数）

##### 用法

```js
browser.touchAction(action)
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
    await browser.touchAction({
        action: 'tap',
        element: screen
    });

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the viewport
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20
    })

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20,
        element: screen
    })

    // multi action on an element
    // drag&drop from position 200x200 down 100px on the screen
    await browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])
});
```
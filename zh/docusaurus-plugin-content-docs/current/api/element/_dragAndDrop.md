---
id: dragAndDrop
title: 拖放
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

将元素拖动到目标元素或位置。

:::info

此命令的功能很大程度上取决于你的应用中拖放的实现方式。如果你遇到问题，请在
[#4134](https://github.com/webdriverio/webdriverio/issues/4134) 中发布你的示例。

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
      <td>目标元素或包含x和y属性的对象</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop命令选项</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>拖动应持续多长时间</td>
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
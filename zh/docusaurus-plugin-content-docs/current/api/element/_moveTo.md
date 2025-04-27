---
id: moveTo
title: 移动至
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

通过指定元素的偏移量移动鼠标。如果没有指定元素，则移动相对于当前鼠标光标的位置。如果提供了元素但没有偏移量，鼠标将移动到元素的中心。如果元素不可见，它将被滚动到视图中。

##### 用法

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td>`MoveToOptions`</td>
      <td>moveTo 命令选项</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>要移动到的 X 偏移量，相对于元素的中心。如果未指定，鼠标将移动到元素的中心。</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>要移动到的 Y 偏移量，相对于元素的中心。如果未指定，鼠标将移动到元素的中心。</td>
    </tr>
  </tbody>
</table>
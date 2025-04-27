---
id: isEqual
title: isEqual
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

如果选择的元素与提供的元素匹配，则返回true。

##### 用法

```js
$(selector).isEqual(el)
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
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>用于比较的元素</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    如果元素相等则返回true    
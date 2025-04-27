---
id: getSize
title: 获取尺寸
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

获取DOM元素的宽度和高度。

##### 用法

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>要获取的尺寸 [可选] ("width" 或 "height")</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="getSize.js"
it('should demonstrate the getSize command', async () => {
    await browser.url('http://github.com')
    const logo = await $('.octicon-mark-github')

    const size = await logo.getSize()
    console.log(size) // outputs: { width: 32, height: 32 }

    const width = await logo.getSize('width')
    console.log(width) // outputs: 32

    const height = await logo.getSize('height')
    console.log(height) // outputs: 32
})
```

##### 返回值

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     请求的元素尺寸 (`{ width: <Number>, height: <Number> }`) 或者如果提供了prop参数，则返回实际的宽度/高度数值
---
id: getProperty
title: 获取属性值
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

获取元素属性命令将返回获取元素属性的结果。

##### 使用方法

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>元素属性的名称</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### 返回值

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** 所选元素的属性值
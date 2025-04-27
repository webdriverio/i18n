---
id: getLocation
title: 获取位置
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

确定元素在页面上的位置。点 (0, 0) 表示页面的左上角。

##### 用法

```js
$(selector).getLocation(prop)
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
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>可以是 "x" 或 "y"，直接获取结果值以便更容易地进行断言</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="getLocation.js"
it('should demonstrate the getLocation function', async () => {
    await browser.url('http://github.com');
    const logo = await $('.octicon-mark-github')
    const location = await logo.getLocation();
    console.log(location); // outputs: { x: 150, y: 20 }

    const xLocation = await logo.getLocation('x')
    console.log(xLocation); // outputs: 150

    const yLocation = await logo.getLocation('y')
    console.log(yLocation); // outputs: 20
});
```

##### 返回值

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   页面上元素的 X 和 Y 坐标 `{x:number, y:number}`
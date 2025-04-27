---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

将JavaScript代码片段注入页面，在当前选定的框架上下文中执行。
所执行的脚本被假定为同步的，并且评估脚本的结果将返回给
客户端。

script参数以函数体的形式定义要执行的脚本。该函数返回的值将
返回给客户端。该函数将使用提供的args数组调用，
并且可以按指定的顺序通过arguments对象访问这些值。

参数可以是任何JSON基本类型、数组或JSON对象。定义WebElement
引用的JSON对象将被转换为相应的DOM元素。同样，脚本结果中的
任何WebElements都将作为WebElement JSON对象返回给客户端。

##### Usage

```js
browser.execute(script, arguments)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>要执行的脚本。</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`*`</td>
      <td>脚本参数</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              脚本结果。    
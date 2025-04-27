---
id: execute
title: execute 执行
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

将JavaScript代码片段注入页面，在当前选择的框架环境中执行，并使用给定元素作为作用域。由于它在元素作用域上执行，这意味着WebdriverIO会在执行脚本前自动等待元素存在。
执行的脚本被假定为同步的，并且脚本评估的结果将返回给客户端。

script参数以函数体的形式定义要执行的脚本。该函数返回的值将返回给客户端。函数将使用提供的args数组进行调用，并且可以按指定顺序通过arguments对象访问这些值。

参数可以是任何JSON原始类型、数组或JSON对象。定义WebElement引用的JSON对象将被转换为相应的DOM元素。同样，脚本结果中的任何WebElements将作为WebElement JSON对象返回给客户端。

##### 用法

```js
$(selector).execute(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>要执行的脚本。</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`*`</td>
      <td>脚本参数</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### 返回

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              脚本结果。
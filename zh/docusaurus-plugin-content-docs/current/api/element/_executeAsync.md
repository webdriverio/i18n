---
id: executeAsync
title: executeAsync（异步执行）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
`executeAsync` 命令已被弃用，将在未来版本中移除。
请使用 `execute` 命令代替，因为它通过 `async`/`await` 提供了更好的错误处理支持。
:::

将JavaScript代码片段注入页面，在当前选定的框架上下文中执行，并使用给定元素作为作用域，因为它在元素作用域上，所以WebdriverIO会在执行脚本前自动等待元素存在。
执行的脚本假定为异步的，必须通过调用提供的回调函数来表示执行完成，该回调函数始终作为函数的最后一个参数提供。
此回调函数的值将返回给客户端。

异步脚本命令可能不会跨越页面加载。如果在等待脚本结果时触发了卸载事件，将向客户端返回错误。

脚本参数以函数体的形式定义要执行的脚本。该函数将使用提供的args数组进行调用，可以按指定顺序通过arguments对象访问这些值。最后一个参数将始终是一个回调函数，必须调用它以表示脚本已完成。

参数可以是任何JSON原始值、数组或JSON对象。定义WebElement引用的JSON对象将转换为相应的DOM元素。同样，脚本结果中的任何WebElements都将作为WebElement JSON对象返回给客户端。

:::caution

请使用 `execute` 代替
:::

##### 用法

```js
$(selector).executeAsync(script, arguments)
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

```js title="executeAsync.js"
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### 返回值

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              脚本结果。
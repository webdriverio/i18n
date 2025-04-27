---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

在以下场景中，添加一个将被执行的脚本：

- 每当页面导航时。
- 每当子框架被附加或导航时。在这种情况下，脚本在新附加框架的上下文中执行。

该脚本在文档创建后但在其任何脚本运行前执行。要从页面中再次移除初始化脚本，请调用此函数返回的函数。

这对于修改JavaScript环境非常有用，例如为Math.random设置种子。

##### 用法

```js
browser.addInitScript(script, args)
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
      <td>`Function`</td>
      <td>作为初始化脚本注入的函数</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>脚本的参数</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="addInitScript.js"
const script = await browser.addInitScript((seed) => {
    Math.random = () => seed
}, 42)

await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns 42

await reset()
await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns a random number

hermore you can also use the `emit` function to send data back to the Node.js environment.
 is useful if you want to observe certain events in the browser environment, e.g.:

```

```js title="addInitScriptWithEmit.js"
const script = await browser.addInitScript((emit) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      emit(mutation.target.nodeName)
    }
  })
  observer.observe(document, { childList: true, subtree: true })
})

script.on('data', (data) => {
  console.log(data) // prints: BODY, DIV, P, ...
})
```
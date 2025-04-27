---
id: overwriteCommand
title: 覆盖命令
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

浏览器方法 `overwriteCommand` 帮助您覆盖浏览器和元素的原生命令，如 `pause` 和 `click`。

:::info

您可以在[自定义命令](/docs/customcommands#overwriting-native-commands)部分查看更多相关信息。

:::

##### 用法

```js
browser.overwriteCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>原始命令的名称</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>传递原始函数</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>扩展元素对象而不是浏览器对象</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="execute.js"
// print milliseconds before pause and return its value.
await browser.overwriteCommand('pause', function (origPauseFunction, ms) {
    console.log(`Sleeping for ${ms}`)
    origPauseFunction(ms)
    return ms
})

// usage
it('should use my overwrite command', async () => {
    await browser.url('https://webdriver.io')
    await browser.pause(1000) // outputs "Sleeping for 1000"
})
```
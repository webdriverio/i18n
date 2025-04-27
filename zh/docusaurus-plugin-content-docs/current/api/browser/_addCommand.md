---
id: addCommand
title: addCommand 添加命令
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

浏览器方法 `addCommand` 可以帮助你编写自己的命令集。

:::info

关于添加自定义命令的更多信息，可以在[自定义命令](/docs/customcommands#adding-custom-commands)指南中找到。

:::

##### 用法

```js
browser.addCommand(name, callback, elementScope)
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
      <td>自定义命令的名称</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>要调用的函数</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>扩展Element对象而不是Browser对象</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="execute.js"
await browser.addCommand('getUrlAndTitle', async function (customParam) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customParam: customParam
    }
})
//usage
it('should use my add command', async () => {
    await browser.url('https://webdriver.io')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://webdriver.io')
    assert.strictEqual(result.title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    assert.strictEqual(result.customParam, 'foobar')
})
```
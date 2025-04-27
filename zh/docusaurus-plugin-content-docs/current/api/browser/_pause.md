---
id: pause
title: 暂停
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

暂停执行特定的时间。不建议使用此命令来等待元素显示。为了避免测试结果不稳定，最好使用[`waitForExist`](/docs/api/element/waitForExist)或其他waitFor*命令。

##### 用法

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>时间(毫秒)</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```
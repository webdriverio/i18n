---
id: call
title: call 方法
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

你可以使用 `call` 在测试规范中执行任何异步操作。
它接受 Promise 并暂停执行，直到 Promise 被解决。

:::info

随着 WebdriverIO 弃用同步使用（参见 [RFC](https://github.com/webdriverio/webdriverio/discussions/6702)），
这个命令已经不太有用了。

:::

##### 用法

```js
browser.call(callback)
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
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>要调用的函数</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="call.js"
it('some testing here', async () => {
    await browser.url('http://google.com')
    // make an asynchronous call using any 3rd party library supporting promises
    // e.g. call to backend or db to inject fixture data
    await browser.call(() => {
        return somePromiseLibrary.someMethod().then(() => {
            // ...
        })
    })

    // example for async call to 3rd party library that doesn't support promises
    const result = await browser.call(() => {
        return new Promise((resolve, reject) => {
            someOtherNodeLibrary.someMethod(param1, (err, res) => {
                if (err) {
                    return reject(err)
                }
                resolve(res)
            })
        })
    })
});
```
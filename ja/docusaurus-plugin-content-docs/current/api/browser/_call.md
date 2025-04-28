---
id: call
title: call（コール）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

`call`を使用して、テスト仕様内で任意の非同期アクションを実行できます。
これはプロミスを受け入れ、プロミスが解決されるまで実行を停止します。

:::info

WebdriverIOが同期的な使用方法を非推奨にしているため（[RFC](https://github.com/webdriverio/webdriverio/discussions/6702)を参照）、
このコマンドはあまり有用ではなくなっています。

:::

##### 使用方法

```js
browser.call(callback)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>呼び出される関数</td>
    </tr>
  </tbody>
</table>

##### 例

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
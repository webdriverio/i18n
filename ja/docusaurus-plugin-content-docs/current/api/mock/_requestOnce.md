---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

次のリクエストに対して、指定された上書きで一度だけリクエストパラメータを変更します。`requestOnce`を連続して複数回呼び出すことができ、順番に上書きが適用されます。`requestOnce`のみを使用し、モックが定義されている回数よりも多くリソースが呼び出された場合、元のリソースにデフォルト戻ります。

##### 使用法

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>レスポンスを上書きするペイロード</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>特定のヘッダーを上書き</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>リクエストクッキーを上書き</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>リクエストメソッドを上書き</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>リダイレクトを開始するためにリクエストURLを上書き</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`MockResponseParams`</td>
      <td>上書きする追加のレスポンスパラメータ</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`Object`</td>
      <td>特定のヘッダーを上書き</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`Number`</td>
      <td>レスポンスステータスコードを上書き</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`Boolean`</td>
      <td>モックデータで応答する前に実際のレスポンスを取得</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```
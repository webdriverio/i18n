---
id: request
title: リクエスト
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

セッション中にブラウザが行うリクエストを変更することができます。これは以下のようなユースケースに役立ちます：

- アプリケーションが正しいリクエストペイロードを送信しているかを検証する
- 保護されたリソースをテストするために認証ヘッダーを渡す
- ユーザー認証をテストするためのセッションクッキーを設定する
- エッジケースをテストするためにリクエストを変更する

##### 使用方法

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>`Record<string,string>`</td>
      <td>特定のヘッダーを上書き</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
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
      <td>リダイレクトを開始するためのリクエストURLを上書き</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`MockResponseParams`</td>
      <td>上書きする追加のレスポンスパラメータ</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Object`</td>
      <td>特定のヘッダーを上書き</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>レスポンスステータスコードを上書き</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>モックデータで応答する前に実際のレスポンスを取得</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```
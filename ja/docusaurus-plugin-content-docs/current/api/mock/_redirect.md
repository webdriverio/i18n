---
id: redirect
title: リダイレクト
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

指定されたモックのリダイレクトを設定します。これにより、リクエストを別のURLにリダイレクトすることができます。
注意：これらのリダイレクトは、ブラウザ内のスクリプトによって行われたリクエストにのみ適用され、`url`コマンドを呼び出す場合には適用されません。

##### 使用法

```js
mock.redirect(url)
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>リクエストをリダイレクトする対象リソース</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```
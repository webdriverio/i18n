---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

現在のページに1つまたは複数の[クッキー](https://w3c.github.io/webdriver/#cookies)を設定します。クッキーを受け取るページにいることを確認してください。そのページにアクセスせずに、任意のページにクッキーを設定することはできません。

##### 使用法

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>クッキーオブジェクトまたはオブジェクト配列。</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>クッキーの名前。</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>クッキーの値。</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>クッキーのパス。クッキー追加時に省略すると「/」がデフォルトになります。</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>クッキーが見えるドメイン。クッキー追加時に省略すると、現在のブラウジングコンテキストのアクティブなドキュメントのURLドメインがデフォルトになります。</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>クッキーがセキュアクッキーかどうか。クッキー追加時に省略するとfalseがデフォルトになります。</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>クッキーがHTTP専用クッキーかどうか。クッキー追加時に省略するとfalseがデフォルトになります。</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>クッキーの有効期限。Unixエポックからの秒数で指定。クッキー追加時に省略した場合は設定してはいけません。</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>クッキーがSameSiteポリシーに適用されるかどうか。クッキー追加時に省略するとNoneがデフォルトになります。「Lax」または「Strict」に設定できます。</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="setCookies.js"
it('should set a cookie for the page', async () => {
    await browser.url('/')

    // set a single cookie
    await browser.setCookies({
        name: 'test1',
        value: 'one'
        // The below options are optional
        // path: '/foo', // The cookie path. Defaults to "/"
        // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context's active document's URL domain
        // secure: true, // Whether the cookie is a secure cookie. Defaults to false
        // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
        // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
    })

    // set multiple cookies
    await browser.setCookies([
        {name: 'test2', value: 'two'},
        {name: 'test3', value: 'three'}
    ])

    const cookies = await browser.getCookies()
    console.log(cookies);
    // outputs:
    // [
    //      {name: 'test1', value: 'one', domain: 'www.example.com'},
    //      {name: 'test2', value: 'two', domain: 'www.example.com'},
    //      {name: 'test3', value: 'three', domain: 'www.example.com'}
    // ]
});
```
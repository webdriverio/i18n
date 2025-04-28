---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

`url`コマンドはブラウザでURLを読み込みます。設定でbaseUrlが指定されている場合、node.jsのurl.resolve()メソッドを使用してurlパラメータの前に追加されます。同じURLで`browser.url('...')`を呼び出すと、ページの再読み込みがトリガーされます。ただし、URLにハッシュが含まれている場合、ブラウザは新しいナビゲーションをトリガーせず、ユーザーはナビゲーションをトリガーするために[refresh](/docs/api/webdriver#refresh)する必要があります。

このコマンドは、ページ読み込みのリクエストとレスポンスデータに関する情報を含む`WebdriverIO.Request`オブジェクトを返します：

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Error message if request failed
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * List of all requests that were made due to the main request.
   * Note: the list may be incomplete and does not contain request that were
   * made after the command has finished.
   *
   * The property will be undefined if the request is not a document request
   * that was initiated by the browser.
   *\/
  children?: Request[]
}
```

このコマンドは以下のオプションをサポートしています：

### wait
リクエストされたリソースがコマンドを完了する前に持つべき望ましい状態。
以下の状態をサポートしています：

 - `none`: ページリクエストが行われ、レスポンスを受信した後に待機しない
 - `interactive`: ページがインタラクティブになるまで待機
 - `complete`: ページのDOMツリーが完全に読み込まれるまで待機
 - `networkIdle`: 保留中のネットワークリクエストがなくなるまで待機

### headers

リクエストと共に送信されるヘッダー。

__デフォルト:__ `{}`

### auth

基本認証の資格情報。
注：これは、`headers`オプションで提供された既存の`Authorization`ヘッダーを上書きします。

### timeout

数値に設定すると、コマンドは返す前にページが指定されたミリ秒数ですべてのレスポンスを読み込むのを待ちます。

注：これが効果を発揮するには、`wait`オプションが`networkIdle`に設定されている必要があります。

__デフォルト:__ `5000`

##### 使用方法

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
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
      <td><code><var>url</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string`</td>
      <td>ナビゲートするURL</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`UrlOptions`</td>
      <td>ナビゲーションオプション</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>リクエストされたリソースがコマンドを完了する前に持つべき望ましい状態。デフォルト: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>数値に設定すると、コマンドは返す前にページが指定されたミリ秒数ですべてのレスポンスを読み込むのを待ちます。デフォルト: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Function`</td>
      <td>ページがすべてのリソースを読み込む前に呼び出される関数。環境を簡単にモックすることができます。例えば、アプリケーションが使用するWeb APIを上書きするなど。</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>基本認証の資格情報</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Record<string, string>`</td>
      <td>リクエストと共に送信されるヘッダー</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="url.js"
// 新しいURLにナビゲート
const request = await browser.url('https://webdriver.io');
// urlをログ出力
console.log(request.url); // 出力: "https://webdriver.io"
console.log(request.response?.status); // 出力: 200
console.log(request.response?.headers); // 出力: { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// ベースURLがhttp://example.com/siteの場合、以下のurlパラメータは次のように解決されます：
// スキームを提供する場合：
// https://webdriver.io
await browser.url('https://webdriver.io');

// スラッシュで始まらない場合、URLはbaseUrlに対して相対的に解決されます
// http://example.com/site/relative
await browser.url('relative');

// スラッシュで始まる場合、URLはbaseUrlのルートパスに対して相対的に解決されます
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// 基本認証を使用してURLにナビゲート
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// URLにナビゲートしてバッテリーAPIをモック
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // "navigator.battery"プロパティをモック
        // モックされた充電オブジェクトを返す
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // 秒
        })
    }
})
// 実際のテキストをアサート - 50%充電されています
await expect($('.battery-percentage')).toHaveText('50%')
// 1時間分の電力がある
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### 戻り値

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  リクエストとレスポンスデータに関する情報を含むページ読み込みのリクエストオブジェクト
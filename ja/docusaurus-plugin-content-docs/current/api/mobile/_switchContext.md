---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

指定されたWebviewの`name`、`title`、または`url`を使用して特定のコンテキストに切り替えます。

このメソッドは、ハイブリッドモバイルアプリケーションでネイティブとWebviewのコンテキスト間の切り替えにおいて、より柔軟性と精度を提供することで、デフォルトのAppium `context`コマンドを強化します。

### コンテキストの仕組み
ハイブリッドアプリとWebviewの概要については、[ハイブリッドアプリのドキュメント](/docs/api/mobile#hybrid-apps)を参照してください。
以下は、`switchContext`コマンドが一般的な課題にどう対応するかの概要です：

#### Androidの課題
- Webviewには複数のページ（ブラウザのタブに似ています）が含まれていることがあります。正確なページを識別するには、デフォルトのAppiumメソッドでは提供されていない`title`や`url`などの追加メタデータが必要です。
- デフォルトのAppiumメソッドは、Webview内のコンテンツやページに関する詳細情報なしに、基本的なコンテキスト名（例：`WEBVIEW_{packageName}`）のみを返します。
- Androidでのコンテキストスイッチングには、このメソッドで自動的に処理される2つのステップが含まれます：
  1. `WEBVIEW_{packageName}`を使用してWebviewコンテキストに切り替える。
  2. `switchToWindow`メソッドを使用してWebview内の適切なページを選択する。

#### iOSの課題
- Webviewは一般的なID（例：`WEBVIEW_{id}`）で識別され、コンテンツやそれに対応するアプリ画面に関する情報を提供しません。
- 操作に適切なWebviewを決定するには、試行錯誤が必要なことがよくあります。

`switchContext`メソッドは、詳細なメタデータ（例：`title`、`url`、可視性）を取得することで、正確で信頼性の高いコンテキスト切り替えを確保し、このプロセスを簡素化します。

### このメソッドを使用する理由
- **簡素化された切り替え**：目的のWebviewの`title`や`url`を知っている場合、このメソッドは`getContexts`への追加呼び出しや`switchContext({id})`と`getTitle()`のような複数のメソッドを組み合わせる必要性を排除します。
- **自動コンテキストマッチング**：以下に基づいてコンテキストの最適な一致を見つけます：
  - プラットフォーム固有の識別子（iOSの`bundleId`、Androidの`packageName`）。
  - `title`または`url`の完全一致または部分一致（文字列と正規表現の両方をサポート）。
  - Webviewが接続され可視であることを確認するAndroid固有のチェック。
- **細かい制御**：カスタムリトライ間隔とタイムアウト（Androidのみ）により、Webview初期化の遅延を処理できます。
- **デフォルトAppiumメソッドへのアクセス**：必要に応じて、`driver.switchAppiumContext()`を介してデフォルトのAppium `switchContext`コマンドを使用できます。

:::info 注意事項と制限

- 希望するWebviewの`title`や`url`が既知の場合、このメソッドは追加の`getContexts`呼び出しなしに一致するコンテキストを自動的に特定して切り替えることができます。
- `androidWebviewConnectionRetryTime`や`androidWebviewConnectTimeout`などのAndroid固有のオプションはiOSには適用されません。
- デバッグを支援するために、コンテキスト一致の失敗理由をログに記録します。
- オブジェクトを入力として使用する場合、`title`または`url`のいずれかが必要です。

:::

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>切り替え先のコンテキストの名前。より多くのコンテキストオプションを含むオブジェクトを提供できます。</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>switchContextコマンドオプション</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>切り替え先ページのタイトル。これはWebviewページのtitleタグの内容になります。完全に一致する必要がある文字列または正規表現を使用できます。<br /><strong>重要:</strong> オプションを使用する場合、`title`または`url`プロパティのいずれかが必要です。</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>切り替え先ページのURL。これはWebviewページの`url`になります。完全に一致する必要がある文字列または正規表現を使用できます。<br /><strong>重要:</strong> オプションを使用する場合、`title`または`url`プロパティのいずれかが必要です。</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Webviewへの接続の各リトライ間に待機するミリ秒単位の時間。デフォルトは`500`ミリ秒（オプション）。<br /><strong>ANDROIDのみ</strong>で、`title`または`url`が提供されている場合にのみ使用されます。</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Webviewページが検出されるのを待つ最大時間（ミリ秒）。デフォルトは`5000`ミリ秒（オプション）。<br /><strong>ANDROIDのみ</strong>で、`title`または`url`が提供されている場合にのみ使用されます。</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```
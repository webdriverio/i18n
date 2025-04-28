---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

現在のセッションのコンテキストを取得します。

このメソッドは、詳細なコンテキスト情報を返すオプションを提供することで、デフォルトのAppium `context`/WebdriverIO `getContext`コマンドを拡張し、ウェブビューを使用するハイブリッドアプリでの作業を容易にします。

### コンテキストの仕組み
詳細については[ハイブリッドアプリのドキュメント](/docs/api/mobile#hybrid-apps)を参照してください。以下は`getContext`コマンドに関連する課題の説明です：

#### Androidの場合：
- ウェブビューには複数のページ（ブラウザのタブのような）が含まれることがあり、正しいページを特定するには`title`や`url`などの追加のメタデータが必要です。
- デフォルトのAppiumメソッドは、ウェブビュー内のページに関する詳細情報なしに、基本的なコンテキスト名（例：`WEBVIEW_{packageName}`）のみを提供します。

#### iOSの場合：
- 各ウェブビューは一般的な`WEBVIEW_{id}`文字列で識別されますが、その内容やそれが属するアプリ画面を示すものではありません。

### このメソッドを使用する理由
- **デフォルトの動作**：
  - 現在のコンテキストを文字列（例：`NATIVE_APP`または`WEBVIEW_{id}`）として返します。
- **詳細なコンテキスト**：
  - `returnDetailedContext`が有効な場合、次のようなメタデータを取得します：
    - **Android**：`packageName`、`title`、`url`、および`webviewPageId`。
    - **iOS**：`bundleId`、`title`、および`url`。
- **Android固有のオプション**：
  - ウェブビューの初期化の遅延に対応するために、リトライ間隔とタイムアウトをカスタマイズできます。

:::info 注意と制限

- `returnDetailedContext`が有効でない場合、このメソッドはデフォルトのAppium `getContext`メソッドと同じように動作します。
- デフォルトのAppium `context`メソッドを使用したい場合は、`driver.getAppiumContext()`メソッドを使用できます。[Appium Contexts](/docs/api/appium#getappiumcontext)コマンドも参照してください。
- **Android:** Android固有のオプション（`androidWebviewConnectionRetryTime`と`androidWebviewConnectTimeout`）はiOSでは効果がありません。
- 複数または詳細なコンテキストが見つからない場合、警告がログに記録されます：
  - `現在のコンテキスト'{context}'に対して複数の詳細なコンテキストが見つかりました。最初のコンテキストを返します。`
  - `現在のコンテキスト'{context}'に対する詳細なコンテキストが取得できませんでした。現在のコンテキストを文字列として返します。`

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`GetContextsOptions`</td>
      <td>`getContext`オプション（省略可能）</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`boolean`</td>
      <td>デフォルトでは、デフォルトのAppium `context` APIに基づいて、文字列のみのコンテキスト名を返します。詳細なコンテキスト情報を取得したい場合は、これを`true`に設定します。デフォルトは`false`です（省略可能）。</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>ウェブビューに接続するための各リトライ間の待機時間（ミリ秒）。デフォルトは`500`ミリ秒です（省略可能）。<br /><strong>ANDROIDのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>ウェブビューページが検出されるまでの最大待機時間（ミリ秒）。デフォルトは`5000`ミリ秒です（省略可能）。<br /><strong>ANDROIDのみ</strong></td>
    </tr>
  </tbody>
</table>

##### 例

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```
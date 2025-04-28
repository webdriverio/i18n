---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

WebdriverIOの`getContexts`メソッドは、デフォルトのAppiumの`contexts`（および以前のWebdriverIOの`getContexts`）コマンドを改良したバージョンです。モバイルアプリセッションで利用可能なコンテキストについて詳細かつ実用的な情報を提供し、デフォルトのAppiumメソッドの制限に対処します。

### ウェブビューの仕組みとこのメソッドが役立つ理由
詳細については、[ハイブリッドアプリのドキュメント](/docs/api/mobile#hybrid-apps)を参照してください。以下は`getContexts`コマンドが対処する課題の概要です：

#### Androidの課題
- 単一のウェブビュー（例：`WEBVIEW_{packageName}`）には、複数のページ（ブラウザのタブに似ています）が含まれる場合があります。
- デフォルトのAppiumメソッドには、これらのページの`title`、`url`、または可視性などの詳細情報が含まれておらず、
  正しいページを識別することが難しく、潜在的な不安定性につながる可能性があります。

#### iOSの課題
- デフォルトのAppiumメソッドは、追加のメタデータなしで一般的なウェブビューID（例：`WEBVIEW_{id}`）のみを返します。
- これにより、どのウェブビューが対象のアプリ画面に対応しているかを判断することが困難になります。

拡張された`getContexts`メソッドは、詳細なコンテキストオブジェクトを返すことでこれらの問題を解決します：
- **Androidの場合：** `title`、`url`、`packageName`、`webviewPageId`、およびレイアウトの詳細（`screenX`、`screenY`、`width`、および`height`）。
- **iOSの場合：** `bundleId`、`title`、および`url`。

これらの拡張機能により、ハイブリッドアプリのデバッグと対話がより信頼性の高いものになります。

### このメソッドを使用する理由
デフォルトでは、Appiumの`contexts`メソッドは利用可能なコンテキストを表す文字列の配列のみを返します：
- **Androidの場合：** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **iOSの場合：** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

単純なシナリオでは十分ですが、これらのデフォルトのレスポンスにはハイブリッドアプリのテストに不可欠なメタデータが欠けています：
- **Androidの場合：** ページ固有のメタデータがないため、正しいウェブビューとの対話が難しくなります。
- **iOSの場合：** 一般的なウェブビューIDは、それらが表すコンテンツやアプリ画面についての洞察を提供しません。

拡張された`getContexts`メソッドは以下を提供します：
- AndroidとiOSの両方の詳細なメタデータ。
- より良いターゲティングと対話のために返されるコンテキストをフィルタリングおよびカスタマイズするオプション。

:::info 注意と制限事項

- 拡張された`getContexts`メソッドはAndroidとiOSの両方のプラットフォームで動作します。ただし、返されるデータはプラットフォームとテスト対象のアプリによって異なる場合があります。
- `returnDetailedContexts`オプションを指定しない場合、このメソッドはデフォルトのAppium `contexts`メソッドのように動作し、単純なコンテキスト配列を返します。
- デフォルトのAppium `contexts`メソッドを使用するには、`driver.getAppiumContexts()`を使用してください。詳細については、[Appium Contextsのドキュメント](/docs/api/appium#getappiumcontexts)を参照してください。

#### Androidのウェブビュー：
- `androidWebviewData`などのメタデータは、`returnAndroidDescriptionData`が`true`の場合にのみ利用可能です。
- Chromeブラウザで`getContexts`メソッドを使用すると、ブラウザ/ウェブビュー/ChromeDriverのバージョンの不一致により、データが不完全になることがあります。そのような場合、デフォルト値または不正確な`webviewPageId`（例：`0`）が返されることがあります。

:::

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`GetContextsOptions`</td>
      <td>`getContexts`オプション（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`boolean`</td>
      <td>デフォルトでは、デフォルトのAppium `contexts` APIに基づいてコンテキスト名のみを返します。すべてのデータを取得したい場合は、これを`true`に設定できます。デフォルトは`false`です（オプション）。</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>ウェブビューへの接続を再試行する間隔（ミリ秒）。デフォルトは`500`ミリ秒です（オプション）。<br /><strong>ANDROIDのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>ウェブビューページが検出されるのを待つ最大時間（ミリ秒）。デフォルトは`5000`ミリ秒です（オプション）。<br /><strong>ANDROIDのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`boolean`</td>
      <td>デフォルトでは、すべてのウェブビューを返します。開いている現在のAndroidアプリによってウェブビューをフィルタリングしたい場合は、これを`true`に設定できます。デフォルトは`false`です（オプション）。<br /><strong>注意：</strong>この「制限」に基づいてウェブビューが見つからない可能性もあることに注意してください。<br /><strong>ANDROIDのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`boolean`</td>
      <td>デフォルトでは、接続されていて表示されているウェブビューのみを返します。すべてのウェブビューを取得したい場合は、これを`false`に設定できます（オプション）。デフォルトは`true`です。<br /><strong>ANDROIDのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`boolean`</td>
      <td>デフォルトでは、Android Webview（Chrome）の説明データは含まれません。すべてのデータを取得したい場合は、これを`true`に設定できます。デフォルトは`false`です（オプション）。<br />このオプションを有効にすると、レスポンスに追加データが含まれます。詳細については`description.data.test.js`を参照してください。<br /><strong>ANDROIDのみ</strong></td>
    </tr>
  </tbody>
</table>

##### 例

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```
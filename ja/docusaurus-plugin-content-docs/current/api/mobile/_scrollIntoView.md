---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

デスクトップ/モバイルWeb<strong>および</strong>モバイルネイティブアプリのためのビューポートに要素をスクロールします。

:::info

モバイルネイティブアプリのスクロールはモバイルの`swipe`コマンドに基づいて行われます。

このコマンドは以下の最新コンポーネントでのみ動作します：
 - Appiumサーバー（バージョン2.0.0以上）
 - `appium-uiautomator2-driver`（Android用）
 - `appium-xcuitest-driver`（iOS用）

互換性の問題を避けるために、ローカルまたはクラウドベースのAppium環境を定期的に更新してください。

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object, boolean`</td>
      <td>`Element.scrollIntoView()`のオプション。デスクトップ/モバイルWebのデフォルト: <br/> `{ block: 'start', inline: 'nearest' }` <br /> モバイルネイティブアプリのデフォルト <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>デスクトップ/モバイルWebのみ</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>[MDNリファレンス](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)を参照してください。 <br /><strong>WEB専用</strong> (デスクトップ/モバイル)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>[MDNリファレンス](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)を参照してください。 <br /><strong>WEB専用</strong> (デスクトップ/モバイル)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>[MDNリファレンス](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)を参照してください。 <br /><strong>WEB専用</strong> (デスクトップ/モバイル)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>モバイルネイティブアプリのみ</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>`down`、`up`、`left`または`right`のいずれか、デフォルトは`up`です。 <br /><strong>モバイルネイティブアプリ専用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>要素の検索を停止するまでの最大スクロール数、デフォルトは`10`です。 <br /><strong>モバイルネイティブアプリ専用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>スワイプの持続時間（ミリ秒）。デフォルトは`1500`ミリ秒です。値が小さいほど、スワイプが速くなります。<br /><strong>モバイルネイティブアプリ専用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>スクロールするために使用される要素。要素が提供されない場合、iOSでは`-ios predicate string:type == "XCUIElementTypeApplication"`、Androidでは`//android.widget.ScrollView'`というセレクタを使用します。デフォルトセレクタに複数の要素が一致する場合、デフォルトで最初に一致する要素が選択されます。 <br /> <strong>モバイルネイティブアプリ専用</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>スワイプする（デフォルトの）スクロール可能要素のパーセンテージ。これは0から1の間の値です。デフォルトは`0.95`です。<br /><strong>絶対に</strong>画面の正確な上部|下部|左|右からスワイプしないでください。通知バーなどのOS/アプリ機能がトリガーされ、予期しない結果につながる可能性があります。<br /> <strong>モバイルネイティブアプリ専用</strong></td>
    </tr>
  </tbody>
</table>

##### 例

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```
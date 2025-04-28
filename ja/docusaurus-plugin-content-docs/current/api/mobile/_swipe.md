---
id: swipe
title: スワイプ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

デスクトップ/モバイルウェブ<strong>および</strong>モバイルネイティブアプリで、ビューポートまたは要素内で特定の方向にスワイプします。

:::info

モバイルネイティブアプリのスワイプはW3Cアクションプロトコルに基づいており、指でのプレスと移動をシミュレートします。
これはAndroid向けの[`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture)
やiOS向けの[`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll)コマンドとは異なります。これらはAppiumドライバープロトコルに基づいており、
NATIVEコンテキストのモバイルプラットフォームでのみ利用可能です。

このコマンドは以下の最新コンポーネントでのみ動作します：
 - Appiumサーバー（バージョン2.0.0以上）
 - `appium-uiautomator2-driver`（Android用）
 - `appium-xcuitest-driver`（iOS用）

互換性の問題を避けるために、ローカルまたはクラウドベースのAppium環境を定期的に更新してください。

:::

:::caution 座標に基づいたスワイプ

絶対に必要でない限り、`from`と`to`オプションの使用は避けてください。これらはデバイス固有であり、デバイス間で一貫して動作しない可能性があります。
要素内で信頼性の高いスワイプを行うには、`scrollableElement`オプションを使用してください。

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
      <td>`object, boolean`</td>
      <td>`browser.swipe()`のオプション。デスクトップ/モバイルウェブのデフォルト：<br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string`</td>
      <td>`down`、`up`、`left`または`right`のいずれか、デフォルトは`up`。<br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>下方向</strong><br /><strong>開始点：</strong><br/>画面の上部付近に指を置きます。<br/><strong>動き：</strong><br/>指を下方向に画面の下部に向かってスライドさせます。<br/><strong>アクション：</strong><br/>コンテキストによって異なります：<br />- ホーム画面やアプリケーションでは、通常コンテンツを上方向にスクロールします。<br />- 上端からの場合、通知パネルやクイック設定を開くことが多いです。<br />- ブラウザや読書アプリでは、コンテンツをスクロールするために使用できます。</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>左方向</strong><br /><strong>開始点：</strong><br/>画面の右側に指を置きます。<br/><strong>動き：</strong><br/>指を水平方向に左側に向かってスライドさせます。><br/><strong>アクション：</strong><br/>このジェスチャーへの反応はアプリケーションによって異なります：<br />- カルーセルや一連の画像の次の項目に移動することができます。<br />- ナビゲーションのコンテキストでは、前のページに戻ったり、現在のビューを閉じたりする場合があります。<br />- ホーム画面では、通常次の仮想デスクトップや画面に切り替わります。</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>右方向</strong><br /><strong>開始点：</strong><br/>画面の左側に指を置きます。<br/><strong>動き：</strong><br/>指を水平方向に右側に向かってスライドさせます。<br/><strong>アクション：</strong><br/>左スワイプと似ていますが、方向が反対です：<br />-- カルーセルやギャラリーの前の項目に移動することが多いです。<br />- アプリのサイドメニューやナビゲーションドロワーを開くために使用できます。<br />- ホーム画面では、通常前の仮想デスクトップに切り替わります。</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>上方向</strong><br /><strong>開始点：</strong><br/>画面の下部付近に指を置きます。<br/><strong>動き：</strong><br/>指を上方向に画面の上部に向かってスライドさせます。><br/><strong>アクション：</strong><br/>コンテキストによって、さまざまなアクションが発生する可能性があります：<br />- ホーム画面やリストでは、通常コンテンツを下方向にスクロールします。<br />- フルスクリーンアプリでは、追加オプションやアプリドロワーを開く場合があります。<br />- 特定のインターフェースでは、「更新」アクションを起動したり、検索バーを開いたりすることがあります。</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>スワイプの持続時間（ミリ秒）。デフォルトは`1500`ミリ秒です。値が低いほど、スワイプが速くなります。</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Element`</td>
      <td>スワイプを行う要素。要素が提供されない場合、iOSでは`-ios predicate string:type == "XCUIElementTypeApplication"`、Androidでは`//android.widget.ScrollView'`というセレクタを使用します。デフォルトのセレクタに複数の要素が一致する場合、デフォルトでは最初に一致する要素が選択されます。<br /> <strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>スワイプする（デフォルトの）スクロール可能要素の割合。これは0から1までの値です。デフォルトは`0.95`です。<br /><strong>絶対に</strong>画面の正確な上部|下部|左|右からスワイプしないでください。通知バーなどのOS/アプリの機能がトリガーされ、予期しない結果につながる可能性があります。<br />これは`from`と`to`が提供されている場合には効果がありません。</td>
    </tr>
    <tr>
              <td colspan="3"><strong>以下の値は`scrollableElement`が<strong>提供されていない</strong>場合<strong>のみ</strong>効果があります。それ以外の場合は無視されます。</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`object`</td>
      <td>スワイプの開始点のx座標とy座標。`scrollableElement`が提供されている場合、これらの座標は効果がありません。</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>スワイプの開始点のx座標。</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>スワイプの開始点のy座標。</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`object`</td>
      <td>スワイプの終了点のx座標とy座標。`scrollableElement`が提供されている場合、これらの座標は効果がありません。</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>スワイプの終了点のx座標。</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>スワイプの終了点のy座標。</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```
---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

以下の操作でタップジェスチャーを実行します：
- 指定された要素に対して。要素が見つからない場合は**自動的にスクロール**します。
- またはモバイルデバイスの画面上で`x`と`y`座標を提供することによって

内部的には以下を使用しています：
- 要素のタップ：
     - Webブラウザ環境（Chrome/Safariブラウザ、またはハイブリッドアプリ）では`click`コマンド
     - ネイティブアプリでは、Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
またはiOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap)を使用し、自動スクロール用の`scrollIntoView`
コマンドも含みます
- 画面タップ：
     - Webブラウザ環境（Chrome/Safariブラウザ、またはハイブリッドアプリ）では`action`コマンド
     - ネイティブアプリでは、Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
またはiOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap)

この違いにより、モバイルアプリでは`tap`コマンドは`click`コマンドよりも信頼性の高い代替手段となります。

ネイティブアプリの場合、このコマンドは`click`コマンドとは異なり、`scrollIntoView`コマンドを使用して要素に<strong>自動的にスワイプ</strong>します。
これはネイティブアプリの`click`コマンドではサポートされていません。ハイブリッドアプリやWeb環境では、自動スクロールは`click`と`tap`コマンドの両方でサポートされています。

:::info

このコマンドは以下の最新コンポーネントでのみ動作します：
 - Appiumサーバー（バージョン2.0.0以上）
 - `appium-uiautomator2-driver`（Android用）
 - `appium-xcuitest-driver`（iOS用）

互換性の問題を避けるため、ローカルまたはクラウドベースのAppium環境を定期的に更新してください。

:::

:::caution 画面タップについて

画面上の特定の座標をタップしたい場合で、スクリーンショットを使用して座標を決定する場合は、
iOSの座標はスクリーンショットのサイズではなく、デバイスの画面サイズに基づいていることに注意してください。スクリーンショットのサイズはデバイスのピクセル比率により大きくなります。
iPhone 8までの平均的なデバイスピクセル比率と現在のiPadは2、iPhone XからのiPhoneでは比率は3です。つまり、スクリーンショットのサイズは
デバイスの画面サイズの2倍または3倍大きいということを意味します。スクリーンショット上で座標を見つけた場合は、デバイスピクセル
比率で割って正確な画面座標を取得してください。例えば：

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // iPhone 16の例
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`TapOptions`</td>
      <td>タップオプション（任意）</td>
    </tr>
    <tr>
              <td colspan="3"><strong>要素タップオプション</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`number`</td>
      <td>数値（任意、yが設定されている場合は必須）<br /><strong>要素タップではなく画面タップのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`number`</td>
      <td>数値（任意、xが設定されている場合は必須）<br /><strong>要素タップではなく画面タップのみ</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>画面タップオプション</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`string`</td>
      <td>`down`、`up`、`left`または`right`のいずれか、デフォルトは`down`です。<br /><strong>画面タップではなく要素タップのみ</strong><br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`number`</td>
      <td>要素の検索を中止するまでの最大スクロール回数、デフォルトは`10`です。<br /><strong>画面タップではなく要素タップのみ</strong><br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`Element`</td>
      <td>スクロールに使用する要素。要素が提供されない場合、iOSでは`-ios predicate string:type == "XCUIElementTypeApplication"`、Androidでは`//android.widget.ScrollView'`をデフォルトセレクタとして使用します。デフォルトセレクタに複数の要素が一致する場合は、デフォルトで最初に一致する要素を選択します。<br /><strong>画面タップではなく要素タップのみ</strong><br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
  </tbody>
</table>

##### 例

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // 要素がビューポート内にない場合、自動的にスクロールします
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // カスタムスクロール可能要素内で右に3回スワイプして要素を見つける
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```
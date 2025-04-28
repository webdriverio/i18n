---
id: tap
title: tap（タップ）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

タップジェスチャーを実行します：
- 指定された要素に対して。要素が見つからない場合は**自動的にスクロール**します。
- または、`x`と`y`座標を提供することで、モバイルデバイスの画面上でタップします。

内部的には次のものを使用します：
- 要素タップ：
     - Webブラウザ環境（Chrome/Safariブラウザ、またはハイブリッドアプリ）では`click`コマンド
     - ネイティブアプリでは、Android用の[`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)またはiOS用の[`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap)を使用し、自動スクロール用の`scrollIntoView`コマンドを含みます
- 画面タップ：
     - Webブラウザ環境（Chrome/Safariブラウザ、またはハイブリッドアプリ）では`action`コマンド
     - ネイティブアプリでは、Android用の[`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)またはiOS用の[`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap)

この違いにより、モバイルアプリでは`tap`コマンドは`click`コマンドよりも信頼性の高い代替手段となります。

ネイティブアプリの場合、このコマンドは`click`コマンドと異なり、`scrollIntoView`コマンドを使用して要素に<strong>自動的にスワイプ</strong>します。これはネイティブアプリの`click`コマンドではサポートされていません。ハイブリッドアプリまたはWeb環境では、自動スクロールは`click`と`tap`の両方のコマンドでサポートされています。

:::info

このコマンドは、以下の最新コンポーネントでのみ動作します：
 - Appiumサーバー（バージョン2.0.0以上）
 - `appium-uiautomator2-driver`（Android用）
 - `appium-xcuitest-driver`（iOS用）

互換性の問題を避けるため、ローカルまたはクラウドベースのAppium環境を定期的に更新してください。

:::

:::caution 画面タップについて

画面上の特定の座標をタップしたい場合で、スクリーンショットを使用して座標を決定する場合、iOSの座標はデバイスの画面サイズに基づいており、スクリーンショットのサイズではないことに注意してください。スクリーンショットのサイズはデバイスのピクセル比率のために大きくなっています。
iPhone 8までと現在のiPadの平均デバイスピクセル比率は2、iPhone XからのiPhoneの比率は3です。つまり、スクリーンショットのサイズはデバイスの画面サイズの2倍または3倍であり、スクリーンショット上で座標を見つけた場合は、デバイスピクセル比率で割って正確な画面座標を取得する必要があります。例えば：

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
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`TapOptions`</td>
      <td>タップオプション（オプション）</td>
    </tr>
    <tr>
              <td colspan="3"><strong>要素タップオプション</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>数値（オプション、yが設定されている場合は必須）<br /><strong>画面タップの場合のみ、要素タップでは使用しない</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>数値（オプション、xが設定されている場合は必須）<br /><strong>画面タップの場合のみ、要素タップでは使用しない</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>画面タップオプション</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string`</td>
      <td>`down`、`up`、`left`、`right`のいずれか、デフォルトは`down`。<br /><strong>要素タップの場合のみ、画面タップでは使用しない</strong><br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>要素の検索を停止するまでの最大スクロール回数、デフォルトは`10`。<br /><strong>要素タップの場合のみ、画面タップでは使用しない</strong><br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Element`</td>
      <td>スクロールに使用される要素。要素が提供されない場合、iOSでは`-ios predicate string:type == "XCUIElementTypeApplication"`、Androidでは`//android.widget.ScrollView'`というセレクタが使用されます。デフォルトのセレクタに複数の要素が一致する場合、デフォルトでは最初に一致する要素が選択されます。<br /><strong>要素タップの場合のみ、画面タップでは使用しない</strong><br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
  </tbody>
</table>

##### 例

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // 要素がすでにビューポート内にない場合は自動的にスクロールします
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // カスタムスクロール可能な要素内で右に3回スワイプして要素を見つける
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
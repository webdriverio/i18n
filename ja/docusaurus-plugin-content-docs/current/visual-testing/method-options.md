---
id: method-options
title: メソッドオプション
---

メソッドオプションは、各[メソッド](./methods)ごとに設定できるオプションです。オプションのキーがプラグインのインスタンス化時に設定されたオプションと同じ場合、このメソッドオプションはプラグインオプションの値を上書きします。

## 保存オプション

### `disableBlinkingCursor`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **サポート:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のすべての`input`、`textarea`、`[contenteditable]`のカーソル「点滅」を有効/無効にします。`true`に設定すると、スクリーンショット撮影前にカーソルが`transparent`に設定され、完了後に元に戻されます。

### `disableCSSAnimation`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **サポート:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のすべてのCSSアニメーションを有効/無効にします。`true`に設定すると、スクリーンショット撮影前にすべてのアニメーションが無効になり、完了後に元に戻されます。

### `enableLayoutTesting`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **使用対象:** すべての[メソッド](./methods)
-   **サポート:** Web

ページ上のすべてのテキストを非表示にし、比較にはレイアウトのみを使用します。非表示化は、__各__要素に`'color': 'transparent !important'`のスタイルを追加することによって行われます。

出力結果については[テスト出力](./test-output#enablelayouttesting)を参照してください。

:::info
このフラグを使用すると、テキストを含むすべての要素（`p, h1, h2, h3, h4, h5, h6, span, a, li`だけでなく、`div|button|..`なども）にこのプロパティが適用されます。これをカスタマイズするオプションは__ありません__。
:::

### `hideScrollBars`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **使用対象:** すべての[メソッド](./methods)
-   **サポート:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のスクロールバーを非表示にします。`true`に設定すると、スクリーンショット撮影前にすべてのスクロールバーが無効になります。追加の問題を防ぐため、デフォルトで`true`に設定されています。

### `hideElements`

-   **型:** `array`
-   **必須:** いいえ
-   **使用対象:** すべての[メソッド](./methods)
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

このメソッドは、要素の配列を提供することで、1つまたは複数の要素に`visibility: hidden`プロパティを追加して非表示にすることができます。

### `removeElements`

-   **型:** `array`
-   **必須:** いいえ
-   **使用対象:** すべての[メソッド](./methods)
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

このメソッドは、要素の配列を提供することで、1つまたは複数の要素に`display: none`プロパティを追加して_削除_することができます。

### `resizeDimensions`

-   **型:** `object`
-   **必須:** いいえ
-   **デフォルト:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **使用対象:** [`saveElement`](./methods#saveelement)または[`checkElement`](./methods#checkelement)のみ
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

要素の切り抜きを大きくするために必要な`top`、`right`、`bottom`、`left`のピクセル数を含むオブジェクト。

### `fullPageScrollTimeout`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** `1500`
-   **使用対象:** [`saveFullPageScreen`](./methods#savefullpagescreen)または[`saveTabbablePage`](./methods#savetabbablepage)のみ
-   **サポート:** Web

スクロール後に待機するミリ秒単位のタイムアウト。遅延ロードのあるページを識別するのに役立ちます。

### `hideAfterFirstScroll`

-   **型:** `array`
-   **必須:** いいえ
-   **使用対象:** [`saveFullPageScreen`](./methods#savefullpagescreen)または[`saveTabbablePage`](./methods#savetabbablepage)のみ
-   **サポート:** Web

このメソッドは、要素の配列を提供することで、1つまたは複数の要素に`visibility: hidden`プロパティを追加して非表示にします。
これは、例えばページがスクロールするとページと一緒にスクロールする固定要素を持つ場合に便利で、全画面スクリーンショットを作成する際に煩わしい効果を防ぎます。

### `waitForFontsLoaded`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **使用対象:** すべての[メソッド](./methods)
-   **サポート:** Web、ハイブリッドアプリ（Webview）

フォント（サードパーティのフォントを含む）は同期的または非同期的にロードできます。非同期ロードの場合、WebdriverIOがページが完全にロードされたと判断した後でもフォントがロードされる可能性があります。フォントのレンダリングの問題を防ぐため、このモジュールはデフォルトでスクリーンショットを撮影する前にすべてのフォントがロードされるのを待ちます。

## 比較（チェック）オプション

比較オプションは、[ResembleJS](https://github.com/Huddle/Resemble.js)による比較の実行方法に影響するオプションです。

:::info 注意

-   [保存オプション](#save-options)のすべてのオプションを比較メソッドに使用できます
-   すべての比較オプションはサービスのインスタンス化時__または__個々のチェックメソッドごとに使用できます。メソッドオプションがサービスのインスタンス化時に設定されたオプションと同じキーを持つ場合、メソッドの比較オプションがサービスの比較オプションの値を上書きします。
- すべてのオプションは以下で使用できます:
    - Web
    - ハイブリッドアプリ
    - ネイティブアプリ

:::

### `ignoreAlpha`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ

画像を比較し、アルファチャンネルを無視します。

### `blockOutSideBar`

-   **型:** `boolean`
-   **デフォルト:** `true`
-   **必須:** いいえ
-   **備考:** _`checkScreen()`でのみ使用できます。これは**iPadのみ**の機能です_

横向きモードのiPadでの比較中にサイドバーを自動的にブロックします。これにより、タブ/プライベート/ブックマークなどのネイティブコンポーネントでの失敗を防ぎます。

### `blockOutStatusBar`

-   **型:** `boolean`
-   **デフォルト:** `true`
-   **必須:** いいえ
-   **備考:** _これは**モバイルのみ**の機能です_

比較中にステータスバーとアドレスバーを自動的にブロックします。これにより、時間、Wi-Fi、バッテリー状態での失敗を防ぎます。

### `blockOutToolBar`

-   **型:** `boolean`
-   **デフォルト:** `true`
-   **必須:** いいえ
-   **備考:** _これは**モバイルのみ**の機能です_

ツールバーを自動的にブロックします。

### `ignoreAntialiasing`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ

画像を比較し、アンチエイリアシングを無視します。

### `ignoreColors`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ

画像がカラーであっても、比較は2つの白黒画像を比較します。

### `ignoreLess`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ

画像を比較し、`red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`で比較します。

### `ignoreNothing`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ

画像を比較し、`red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`で比較します。

### `rawMisMatchPercentage`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ

trueの場合、返される割合は`0.12345678`のようになります。デフォルトは`0.12`です。

### `returnAllCompareData`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ

これはすべての比較データを返します。不一致の割合だけでなく。

### `saveAboveTolerance`

-   **型:** `number`
-   **デフォルト:** `0`
-   **必須:** いいえ

差異のある画像の保存を防ぐ`misMatchPercentage`の許容値。

### `largeImageThreshold`

-   **型:** `number`
-   **デフォルト:** `0`
-   **必須:** いいえ

大きな画像の比較はパフォーマンスの問題を引き起こす可能性があります。
ここでピクセル数（0より大きい）を指定すると、画像の幅または高さが`largeImageThreshold`ピクセルより大きい場合、比較アルゴリズムはピクセルをスキップします。

### `scaleImagesToSameSize`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ

比較の実行前に2つの画像を同じサイズに拡大縮小します。`ignoreAntialiasing`と`ignoreAlpha`を有効にすることを強くお勧めします。

## フォルダオプション

ベースラインフォルダとスクリーンショットフォルダ（実際、差分）は、プラグインまたはメソッドのインスタンス化時に設定できるオプションです。特定のメソッドにフォルダオプションを設定するには、メソッドのオプションオブジェクトにフォルダオプションを渡します。これは以下で使用できます:

- Web
- ハイブリッドアプリ
- ネイティブアプリ

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// すべてのメソッドでこれを使用できます
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **型:** `string`
-   **必須:** いいえ

テストでキャプチャされたスナップショットのフォルダ。

### `baselineFolder`

-   **型:** `string`
-   **必須:** いいえ

比較に使用されるベースライン画像のフォルダ。

### `diffFolder`

-   **型:** `string`
-   **必須:** いいえ

ResembleJSによってレンダリングされた画像差分のフォルダ。
---
id: method-options
title: メソッドオプション
---

メソッドオプションは、各[メソッド](./methods)に設定できるオプションです。オプションがプラグインのインスタンス化中に設定されたオプションと同じキーを持つ場合、このメソッドオプションはプラグインオプションの値を上書きします。

## 保存オプション

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

アプリケーション内のすべての`input`、`textarea`、`[contenteditable]`カーソルの「点滅」を有効/無効にします。`true`に設定すると、スクリーンショットを撮る前にカーソルが`transparent`に設定され、
完了時にリセットされます。

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

アプリケーション内のすべてのCSSアニメーションを有効/無効にします。`true`に設定すると、スクリーンショットを撮る前にすべてのアニメーションが無効になり、
完了時にリセットされます。

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web

これはページ上のすべてのテキストを非表示にし、比較にはレイアウトのみが使用されるようにします。非表示にするには、__各__要素に`'color': 'transparent !important'`スタイルを追加します。

出力については[テスト出力](./test-output#enablelayouttesting)を参照してください。

:::info
このフラグを使用すると、テキストを含むすべての要素（`p, h1, h2, h3, h4, h5, h6, span, a, li`だけでなく、`div|button|..`も含む）にこのプロパティが適用されます。これをカスタマイズするオプションは__ありません__。
:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview)

アプリケーションのスクロールバーを非表示にします。`true`に設定すると、スクリーンショットを撮る前にすべてのスクロールバーが無効になります。これはデフォルトで`true`に設定されており、余分な問題を防ぎます。

### `hideElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

このメソッドは、要素の配列を提供することにより、要素に`visibility: hidden`プロパティを追加して1つまたは複数の要素を非表示にすることができます。

### `removeElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

このメソッドは、要素の配列を提供することにより、要素に`display: none`プロパティを追加して1つまたは複数の要素を_削除_することができます。

### `resizeDimensions`

-   **Type:** `object`
-   **Mandatory:** no
-   **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Used with:** Only for [`saveElement`](./methods#saveelement) or [`checkElement`](./methods#checkelement)
-   **Supported:** Web, Hybrid App (Webview), Native App

要素の切り抜きを大きくするために必要なピクセル数を`top`、`right`、`bottom`および`left`で保持するオブジェクトです。

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

スクロール後に待機するミリ秒単位のタイムアウトです。これは遅延読み込みのあるページを識別するのに役立つかもしれません。

### `hideAfterFirstScroll`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

このメソッドは、要素の配列を提供することにより、要素に`visibility: hidden`プロパティを追加して1つまたは複数の要素を非表示にします。
これは、例えばページがスクロールするとページと一緒にスクロールする固定要素を持っているが、フルページスクリーンショットを作成するときに煩わしい効果を与える場合に便利です。

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview)

サードパーティのフォントを含むフォントは、同期的または非同期的に読み込むことができます。非同期的な読み込みは、WebdriverIOがページが完全に読み込まれたと判断した後にフォントが読み込まれる可能性があることを意味します。フォントのレンダリングの問題を防ぐために、このモジュールはデフォルトでスクリーンショットを撮る前にすべてのフォントが読み込まれるのを待ちます。

## 比較（チェック）オプション

比較オプションは、[ResembleJS](https://github.com/Huddle/Resemble.js)による比較の実行方法に影響を与えるオプションです。

:::info 注意

-   [保存オプション](#save-options)のすべてのオプションは比較メソッドでも使用できます
-   すべての比較オプションはサービスのインスタンス化時__または__個々のチェックメソッドごとに使用できます。メソッドオプションがサービスのインスタンス化時に設定されたオプションと同じキーを持つ場合、メソッドの比較オプションはサービスの比較オプションの値を上書きします。
- すべてのオプションは以下で使用できます：
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

画像を比較し、アルファを無視します。

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Can only be used for `checkScreen()`. This is **iPad only**_

横向きモードのiPadでの比較中にサイドバーを自動的にブロックします。これにより、タブ/プライベート/ブックマークのネイティブコンポーネントの失敗を防ぎます。

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _This is **Mobile only**_

比較中にステータスバーとアドレスバーを自動的にブロックします。これにより、時間、WiFi、バッテリーステータスの違いによる失敗を防ぎます。

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _This is **Mobile only**_

ツールバーを自動的にブロックします。

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

画像を比較し、アンチエイリアシングを無視します。

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

画像がカラーであっても、比較は2つの白黒画像を比較します。

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

画像を比較し、`red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`で比較します。

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

画像を比較し、`red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`で比較します。

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

`true`の場合、返される割合は`0.12345678`のようになります。デフォルトは`0.12`です。

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

これはすべての比較データを返します。不一致の割合だけではありません。

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

差分のある画像の保存を防ぐ`misMatchPercentage`の許容値。

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

大きな画像の比較はパフォーマンスの問題を引き起こす可能性があります。
ここでピクセル数（0より大きい値）を指定すると、画像の幅または高さが`largeImageThreshold`ピクセルより大きい場合、比較アルゴリズムはピクセルをスキップします。

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

比較を実行する前に2つの画像を同じサイズに拡大縮小します。`ignoreAntialiasing`と`ignoreAlpha`を有効にすることを強く推奨します。

## フォルダオプション

ベースラインフォルダとスクリーンショットフォルダ（actual、diff）は、プラグインのインスタンス化時またはメソッド時に設定できるオプションです。特定のメソッドにフォルダオプションを設定するには、メソッドのオプションオブジェクトにフォルダオプションを渡します。これは以下で使用できます：

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// You can use this for all methods
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Type:** `string`
-   **Mandatory:** no

テストでキャプチャされたスナップショットのフォルダ。

### `baselineFolder`

-   **Type:** `string`
-   **Mandatory:** no

比較対象として使用されるベースライン画像のフォルダ。

### `diffFolder`

-   **Type:** `string`
-   **Mandatory:** no

ResembleJSによってレンダリングされた画像差分のフォルダ。
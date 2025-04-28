---
id: compare-options
title: 比較オプション
---

比較オプションは、[ResembleJS](https://github.com/Huddle/Resemble.js)によって実行される比較方法に影響を与えるオプションです。

:::info 注意
すべての比較オプションは、サービスのインスタンス化時、または個々の`checkElement`、`checkScreen`、`checkFullPageScreen`で使用できます。メソッドオプションがサービスのインスタンス化時に設定されたオプションと同じキーを持つ場合、メソッドの比較オプションがサービスの比較オプション値を上書きします。
:::

### `ignoreAlpha`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

アルファチャンネルを無視して画像を比較します。

### `blockOutSideBar`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkScreen()`でのみ使用できます。プラグイン設定を上書きします。これは**iPadのみ**です_

比較中に横向きモードのiPadでサイドバーを自動的にブロックします。これにより、タブ/プライベート/ブックマークのネイティブコンポーネントでの失敗を防ぎます。

### `blockOutStatusBar`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします。これは**モバイルのみ**です_

比較中にステータスバーとアドレスバーを自動的にブロックします。これにより、時間、WiFi、バッテリー状態に関する失敗を防ぎます。

### `blockOutToolBar`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします。これは**モバイルのみ**です_

ツールバーを自動的にブロックします。

### `ignoreAntialiasing`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

アンチエイリアシングを無視して画像を比較します。

### `ignoreColors`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

画像がカラーであっても、比較は2つの白黒画像を比較します。

### `ignoreLess`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

`red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`で画像を比較します。

### `ignoreNothing`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

`red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`で画像を比較します。

### `ignoreTransparentPixel`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

画像を比較し、いずれかの画像で透明度がある全てのピクセルを無視します。

### `rawMisMatchPercentage`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

trueの場合、戻り値のパーセンテージは`0.12345678`のようになります。デフォルトは`0.12`です。

### `returnAllCompareData`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

ミスマッチパーセンテージだけでなく、すべての比較データを返します。

### `saveAboveTolerance`

-   **型:** `number`
-   **デフォルト:** `0`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

差分のある画像の保存を防ぐ`misMatchPercentage`の許容値。

### `largeImageThreshold`

-   **型:** `number`
-   **デフォルト:** `0`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

大きな画像の比較はパフォーマンスの問題を引き起こす可能性があります。
ここでピクセル数（0より大きい）を指定すると、画像の幅または高さが`largeImageThreshold`ピクセルより大きい場合、比較アルゴリズムはピクセルをスキップします。

### `scaleImagesToSameSize`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **備考:** _`checkElement`、`checkScreen()`および`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

比較の実行前に2つの画像を同じサイズにスケーリングします。`ignoreAntialiasing`と`ignoreAlpha`を有効にすることを強く推奨します。
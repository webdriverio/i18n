---
id: compare-options
title: 比較オプション
---

比較オプションは、[ResembleJS](https://github.com/Huddle/Resemble.js)によって実行される比較方法に影響を与えるオプションです。

:::info 注意
すべての比較オプションは、サービスのインスタンス化時または各`checkElement`、`checkScreen`、`checkFullPageScreen`で使用できます。メソッドオプションがサービスのインスタンス化時に設定されたオプションと同じキーを持つ場合、メソッドの比較オプションがサービスの比較オプション値を上書きします。
:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

画像を比較し、アルファを無視します。

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkScreen()`でのみ使用できます。プラグイン設定を上書きします。これは**iPadのみ**です_

比較中に横向きモードのiPadのサイドバーを自動的にブロックします。これにより、タブ/プライベート/ブックマークのネイティブコンポーネントでの失敗を防ぎます。

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします。これは**モバイルのみ**です_

比較中にステータスバーとアドレスバーを自動的にブロックします。これにより、時間、Wi-Fi、バッテリーステータスに関する失敗を防ぎます。

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします。これは**モバイルのみ**です_

ツールバーを自動的にブロックします。

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

画像を比較し、アンチエイリアシングを無視します。

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

画像がカラーであっても、比較は2つの白黒画像を比較します。

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

画像を比較し、`red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`で比較します。

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

画像を比較し、`red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`で比較します。

### `ignoreTransparentPixel`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

画像を比較し、いずれかの画像で透明度を持つすべてのピクセルを無視します。

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

trueの場合、戻りのパーセンテージは`0.12345678`のようになります。デフォルトは`0.12`です。

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

これはすべての比較データを返します。不一致のパーセンテージだけではありません。

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

差分のある画像の保存を防ぐ`misMatchPercentage`の許容値。

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

大きな画像の比較はパフォーマンスの問題を引き起こす可能性があります。
ここでピクセル数の数値（0より大きい）を指定すると、画像の幅または高さが`largeImageThreshold`ピクセルより大きい場合、比較アルゴリズムはピクセルをスキップします。

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`、`checkScreen()`、`checkFullPageScreen()`でも使用できます。プラグイン設定を上書きします_

比較の実行前に2つの画像を同じサイズにスケーリングします。`ignoreAntialiasing`と`ignoreAlpha`を有効にすることを強くお勧めします。
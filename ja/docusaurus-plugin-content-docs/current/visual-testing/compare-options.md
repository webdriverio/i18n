---
id: compare-options
title: 比較オプション
description: "ビジュアルサービスにおける視覚感度、pixelmatch、モバイルのブロックアウト、レポートオプションを使って、スクリーンショットの比較方法を調整します。"
---

比較オプションは、比較の実行方法に影響を与えるオプションです。

:::info NOTE
すべての比較オプションは、サービスのインスタンス化時、または個々の `checkElement`、`checkScreen`、`checkFullPageScreen` ごとに使用できます。メソッドのオプションが、サービスのインスタンス化時に設定されたオプションと同じキーを持つ場合、メソッドの比較オプションがサービスの比較オプションの値を上書きします。
:::

## 視覚感度

---

:::info `ignore*` オプションのバージョン履歴
`ignore*` プリセットの動作は、比較エンジンが ResembleJS から Pixelmatch に切り替わった際に、破壊的変更として一度変更されました：

| バージョン | エンジン | 備考 |
| --- | --- | --- |
| v9 以前 | ResembleJS | 元の `ignore*` のセマンティクス（RGB/明度ベース、resemble 独自のプリセット順序）。 |
| v10 以降 | Pixelmatch | `ignore*` プリセットは pixelmatch の threshold/AA 設定にマッピングされます。現在のデフォルトと動作は以下の各オプションに記載されています。これに加えた新機能や修正は、該当するオプションに「Since」の注記で示されています。 |

:::

**後勝ちの順序：** 複数の `ignore*` フラグが同時に有効になっている場合、実際に適用されるプリセットは1つだけで、次の順序に従います（後のものが優先）：`ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`。どのプリセットが優先されたかを示す警告がログに出力されます。

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10.1.0`：resemble の輝度の重み（`0.3/0.59/0.11`）を使用した明度のみの比較。

色相/色の違いを無視し、明度のみを比較します。プリセット：厳格な閾値（約16/255）、アンチエイリアスは許容されません。

**このオプションを使うのは**、色自体が変化することが想定されている場合（例：テーマ変更可能な UI、環境ごとに色が変わる画像）でも、レイアウトや明度の変化は検出したいときです。

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10.1.0`：他の `ignore*` フラグとは独立して、独自の threshold/AA ルールを適用します。

画像を比較し、アルファチャンネルの違いを無視します。プリセット：厳格な閾値（約16/255）、アンチエイリアスは許容されません。

**このオプションを使うのは**、透明度/不透明度のレンダリングが不安定な場合（例：オーバーレイ、半透明の要素）でも、その下にある実際のピクセルの色は重要なときです。

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10`：デフォルトが `true` に変更されました（v9 以前は `false`）。

比較時にアンチエイリアスされたピクセルを許容します（緩和された閾値 約32/255）。これはアンチエイリアスを許容する唯一のプリセットで、サブピクセルレンダリングのノイズによって初期状態で比較が失敗しないよう、デフォルトで有効になっています。アンチエイリアスされたピクセルを不一致としてカウントする厳格な比較を行いたい場合は `false` に設定してください。

**このオプションは**、ビジュアルテストの不安定さの最も一般的な原因を解決するために使います：実際には何も変わっていないのに、マシンやブラウザ間でテキストや図形のエッジのアンチエイリアスがわずかに異なってレンダリングされる問題です。

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10.1.0`：他の `ignore*` フラグとは独立して、独自の threshold/AA ルールを適用します。

緩和された RGB 許容値（YIQ 空間でチャンネルごとに約16/255）を使用して画像を比較します。プリセット：厳格な閾値、アンチエイリアスは許容されません。

**このオプションを使うのは**、アンチエイリアスを許容せずに、軽微なレンダリングノイズ（JPEG のような圧縮アーティファクト、わずかな色の丸め誤差）に対して少し余裕を持たせたいときです。

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10.1.0`：他の `ignore*` フラグとは独立して、独自の threshold/AA ルールを適用します。

許容値ゼロを使用します：アンチエイリアスを含め、あらゆるピクセルの違いが不一致としてカウントされます。

**このオプションを使うのは**、何も変更されていないことをピクセル単位で完全に証明する必要があるとき、例えば修正によってどんなに小さなリグレッションも発生していないことを検証するときです。

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_

比較を実行する前に、2つの画像を同じサイズにスケーリングします。`ignoreAntialiasing` と `ignoreAlpha` を有効にすることを強く推奨します

</Option>
## pixelmatch の直接制御

---

:::info v10.1.0 で追加
`compareOptions.pixelmatch` には v9（ResembleJS）に相当するものはありません。これは `ignore*` プリセットを使用する代わりに、比較エンジンを直接制御するまったく新しい方法です。
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。その特定のメソッドについてプラグインの設定を上書きします_
-   **追加バージョン：** `v10.1.0`

`ignore*` プリセットを使用する代わりに、[pixelmatch](https://github.com/mapbox/pixelmatch) に設定を直接渡します。**5つの `ignore*` プリセットでは大まかすぎる場合に使用してください：** プリセットにない特定の閾値が必要な場合や、デフォルトのマゼンタのハイライトではなく、レポートや CI 出力で実際に読み取りやすい差分画像が必要な場合です。

:::warning 同じオプションオブジェクト内では相互排他的
**同じ**オプションオブジェクト内に `ignore*` キーと `pixelmatch` を両方指定すると、`ignore*` の値が `false` であっても `CompareOptionsConflictError` がスローされます（以下の無効な例を参照）。オブジェクトごとに1つのモードを選択してください：`ignore*` プリセットか `pixelmatch` のどちらかで、両方は使用できません。

これは1つのオブジェクト内でのみ適用されます。サービス設定とメソッド呼び出しのオプションは別々のオブジェクトであるため、`check*` 呼び出しではサービス設定とは異なるモードを使用することが**許可されています**。例えば、サービスが `ignore*` プリセットを使用していても、ある呼び出しでは代わりに `pixelmatch` を渡すことができます（その逆も可能）。この場合エラーは発生せず、比較モードの切り替えを示す警告がログに出力されるだけです。
:::

| フィールド | 型 | デフォルト | 用途 |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | 0（あらゆるピクセルの違いで失敗）から1（ほとんど失敗しない）までの感度。最も近い `ignore*` プリセットを選ぶ代わりに、正確な感度の値を1つ指定するために使用します。 |
| `includeAA` | `boolean` | `false` | `true` はアンチエイリアスされたエッジのピクセルを不一致としてカウントし、`false` はそれらを許容します。フォントや図形のエッジのレンダリングの違いで不安定な失敗が発生している場合はオフにしてください。 |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]`（マゼンタ） | 差分画像内の不一致ピクセルの RGB カラー。マゼンタが UI に溶け込んで（例：ピンク/パープルのテーマ）不一致を見つけにくい場合に変更してください。 |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]`（マゼンタ） | アンチエイリアスされたピクセルの RGB カラー。実際の不一致と視覚的に区別することで、「レンダリングノイズ」と「実際のバグ」を一目で見分けられます。 |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]`（マゼンタ） | （色が変わっただけでなく）追加または削除されたピクセルの RGB カラー。レイアウトのずれと色の変化を見分けるのに役立ちます。 |
| `alpha` | `number` | `0.1` | 実際のスクリーンショット上に重ねる差分オーバーレイの不透明度。レポートで差分をより目立たせたい場合は上げ、下にある UI をはっきり見たい場合は下げてください。`ignoreAlpha` プリセットとは関係ありません。 |
| `diffMask` | `boolean` | `false` | `true` に設定すると、スクリーンショット上に描画された差分ではなく、生の差分のみ（透明な背景）を出力します。独自のカスタム差分ビューアやレポートを構築するのに役立ちます。 |
| `checkerboard` | `boolean` | `true` | 差分内で半透明のピクセルをどのようにレンダリングするかを制御します。チェッカーボードのパターンがスクリーンショット内の実際のコンテンツと紛らわしい場合はオフにしてください。 |

**サービス設定：**

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['visual', {
            compareOptions: {
                pixelmatch: {
                    threshold: 0.063,
                    includeAA: true,
                },
            },
        }],
    ],
}
```

**サービスが `ignore*` プリセットを使用している場合のメソッドでの上書き：**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**サービスが `pixelmatch` を使用している場合のメソッドでの上書き：**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**無効：`CompareOptionsConflictError` がスローされます**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

オプションの完全なセマンティクスについては、[pixelmatch のドキュメント](https://github.com/mapbox/pixelmatch)を参照してください。

</Option>
## モバイルのブロックアウト

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします。これは**モバイル専用**です_

比較時にステータスバーとアドレスバーを自動的にブロックアウトします。これにより、時刻、Wi-Fi、バッテリーの状態による失敗を防ぎます。

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします。これは**モバイル専用**です_

ツールバーを自動的にブロックアウトします。

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **備考：** _`checkScreen()` でのみ使用できます。プラグインの設定を上書きします。これは **iPad 専用**です_

比較時に、横向きモードの iPad のサイドバーを自動的にブロックアウトします。これにより、タブ/プライベート/ブックマークのネイティブコンポーネントによる失敗を防ぎます。

</Option>
## 結果とレポート

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_

true の場合、返されるパーセンテージは `0.12345678` のようになります。デフォルトは `0.12` です

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_

不一致のパーセンテージだけでなく、すべての比較データを返します

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_

差分のある画像の保存を防ぐ、`misMatchPercentage` の許容値です

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。[`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) が有効な場合にのみ関係します。_

JSON レポートで差分ピクセルをグループ化するために使用されるピクセルの近接度です。値を大きくすると、より多くのピクセルがより少ないバウンディングボックスにグループ化されます。値を小さくすると、より正確ですが、より多くのボックスが生成されます。

</Option>
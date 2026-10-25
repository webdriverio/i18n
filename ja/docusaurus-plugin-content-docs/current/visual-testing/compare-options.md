---
id: compare-options
title: 比較オプション
description: "ビジュアルサービスにおいて、視覚的な感度、pixelmatch、モバイルのブロックアウト、レポートの各オプションを使用してスクリーンショットの比較方法を調整します。"
---

比較オプションは、比較の実行方法に影響を与えるオプションです。

:::info NOTE
すべての比較オプションは、サービスのインスタンス化時、または個々の `checkElement`、`checkScreen`、`checkFullPageScreen` ごとに使用できます。メソッドのオプションが、サービスのインスタンス化時に設定されたオプションと同じキーを持つ場合、メソッドの比較オプションがサービスの比較オプションの値を上書きします。
:::

## 視覚的な感度

---

:::info `ignore*` オプションのバージョン履歴
`ignore*` プリセットは、比較エンジンが ResembleJS から Pixelmatch に切り替わった際に、破壊的変更として一度だけ動作が変更されました：

| バージョン | エンジン | 備考 |
| --- | --- | --- |
| v9 以前 | ResembleJS | 元の `ignore*` のセマンティクス（RGB/輝度ベース、resemble 独自のプリセットの順序）。 |
| v10 以降 | Pixelmatch | `ignore*` プリセットは pixelmatch のしきい値/AA 設定にマッピングされます。現在のデフォルトと動作は以下の各オプションに記載されています。これに加えられた新機能や修正は、該当するオプションに「Since」の注記で示されています。 |
| v11 以降 | Pixelmatch 8 | 色は OKLab 色空間で HyAB 距離を用いて比較されます（以前は YIQ）。しきい値のスケールと `ignore*` プリセットは変更されていませんが、不一致率が v10 と若干異なる場合があります。 |

:::

**後勝ちの順序：** 複数の `ignore*` フラグが同時に有効になっている場合、実際に適用されるプリセットは1つだけで、次の順序に従います（後のものが優先）：`ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`。どのプリセットが優先されたかを示す警告がログに出力されます。

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10.1.0`：resemble の輝度の重み（`0.3/0.59/0.11`）を使用した輝度のみの比較。

色相/色の違いを無視し、輝度のみを比較します。プリセット：厳格なしきい値（約16/255）、アンチエイリアスは許容されません。

**次のような場合に使用します：** 色自体が変化することが想定される場合（例：テーマ変更可能な UI、環境ごとに色が変わる画像）でも、レイアウトや輝度の変化は検出したい場合。

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10.1.0`：他の `ignore*` フラグとは独立して、独自のしきい値/AA ルールを適用します。

アルファチャンネルの違いを無視して画像を比較します。プリセット：厳格なしきい値（約16/255）、アンチエイリアスは許容されません。

**次のような場合に使用します：** 透明度/不透明度のレンダリングが不安定な場合（例：オーバーレイ、半透明の要素）でも、その下にある実際のピクセルの色は重要な場合。

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10`：デフォルトが `true` に変更されました（v9 以前は `false`）。

比較時にアンチエイリアスされたピクセルを許容します（緩和されたしきい値 約32/255）。これはアンチエイリアスを許容する唯一のプリセットであり、サブピクセルレンダリングのノイズによって初期状態で比較が失敗しないよう、デフォルトで有効になっています。アンチエイリアスされたピクセルを不一致としてカウントする厳格な比較を行う場合は `false` に設定してください。

**次の目的で使用します：** ビジュアルテストの不安定さの最も一般的な原因を解決するため。つまり、実際には何も変更されていないにもかかわらず、マシン/ブラウザ間でテキストや図形のエッジのアンチエイリアスがわずかに異なってレンダリングされる問題です。

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10.1.0`：他の `ignore*` フラグとは独立して、独自のしきい値/AA ルールを適用します。

緩和された RGB 許容値（YIQ 空間でチャンネルごとに約16/255）を使用して画像を比較します。プリセット：厳格なしきい値、アンチエイリアスは許容されません。

**次のような場合に使用します：** アンチエイリアスは許容せずに、軽微なレンダリングノイズ（JPEG のような圧縮アーティファクト、わずかな色の丸め）に対して少し余裕を持たせたい場合。

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_
-   **Since：** `v10.1.0`：他の `ignore*` フラグとは独立して、独自のしきい値/AA ルールを適用します。

許容値ゼロを使用します：アンチエイリアスを含め、あらゆるピクセルの違いが不一致としてカウントされます。

**次のような場合に使用します：** 何も変更されていないことをピクセル単位で完全に証明する必要がある場合。例えば、修正によってどんなに小さなリグレッションも発生していないことを検証する場合。

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_

比較を実行する前に、2つの画像を同じサイズにスケーリングします。`ignoreAntialiasing` と `ignoreAlpha` を有効にすることを強く推奨します

</Option>
## pixelmatch の直接制御

---

:::info v10.1.0 で追加
`compareOptions.pixelmatch` には v9（ResembleJS）に相当するものはありません。`ignore*` プリセットを使用する代わりに、比較エンジンを直接制御するまったく新しい方法です。
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。使用された特定のメソッドについて、プラグインの設定を上書きします_
-   **追加バージョン：** `v10.1.0`

`ignore*` プリセットを使用する代わりに、設定を [pixelmatch](https://github.com/mapbox/pixelmatch) に直接渡します。**5つの `ignore*` プリセットでは大まかすぎる場合に使用します：** プリセットでは提供されない特定のしきい値が必要な場合や、デフォルトのマゼンタのハイライトではなく、レポートや CI の出力で実際に読みやすい差分画像が必要な場合です。

:::warning 同じオプションオブジェクト内では相互排他的
**同じ**オプションオブジェクト内に `ignore*` キーと `pixelmatch` を配置すると、`ignore*` の値が `false` であっても `CompareOptionsConflictError` がスローされます（下記の無効な例を参照）。オブジェクトごとに1つのモードを選択してください：`ignore*` プリセットか `pixelmatch` のいずれかであり、両方を使用することはできません。

これは1つのオブジェクト内でのみ適用されます。サービスの設定とメソッド呼び出しのオプションは別々のオブジェクトであるため、`check*` 呼び出しではサービスの設定と異なるモードを使用することが**許可されています**。例えば、サービスでは `ignore*` プリセットを使用し、ある呼び出しでは代わりに `pixelmatch` を渡す（またはその逆）といった場合です。この場合エラーは発生せず、比較モードの切り替えを示す警告がログに出力されるだけです。
:::

| フィールド | 型 | デフォルト | 用途 |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | 0（あらゆるピクセルの違いで失敗）から1（ほとんど何も失敗しない）までの感度。最も近い `ignore*` プリセットを選ぶ代わりに、正確な感度の値を1つ設定する場合に使用します。 |
| `includeAA` | `boolean` | `false` | `true` の場合、アンチエイリアスされたエッジのピクセルを不一致としてカウントします。`false` の場合は許容します。フォント/図形のエッジのレンダリングの違いが不安定な失敗を引き起こしている場合は、これをオフにしてください。 |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]`（マゼンタ） | 差分画像における不一致ピクセルの RGB カラー。マゼンタが UI に溶け込んでしまい（例：ピンク/紫のテーマ）、不一致を見つけにくい場合に変更してください。 |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]`（マゼンタ） | アンチエイリアスされたピクセルの RGB カラー。実際の不一致と視覚的に区別されるため、「レンダリングノイズ」と「実際のバグ」を一目で見分けることができます。 |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]`（マゼンタ） | 追加または削除された（単に色が変わっただけではない）ピクセルの RGB カラー。レイアウトのずれと色の変化を見分けるのに役立ちます。 |
| `alpha` | `number` | `0.1` | 実際のスクリーンショットの上に重ねる差分オーバーレイの不透明度。レポートで差分をより目立たせたい場合は値を上げ、下にある UI をはっきり見たい場合は値を下げてください。`ignoreAlpha` プリセットとは関係ありません。 |
| `diffMask` | `boolean` | `false` | `true` に設定すると、スクリーンショットの上に描画された差分ではなく、生の差分のみ（透明な背景）を出力します。独自のカスタム差分ビューア/レポートを構築する場合に便利です。 |
| `checkerboard` | `boolean` | `true` | 差分における半透明ピクセルのレンダリング方法を制御します。チェッカーボードのパターンがスクリーンショット内の実際のコンテンツと混同しやすい場合はオフにしてください。 |

**サービスの設定：**

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

オプションのセマンティクスの詳細については、[pixelmatch のドキュメント](https://github.com/mapbox/pixelmatch)を参照してください。

</Option>
## モバイルのブロックアウト

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします。これは**モバイルのみ**です_

比較時にステータスバーとアドレスバーを自動的にブロックアウトします。これにより、時刻、Wi-Fi、バッテリーの状態による失敗を防ぎます。

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします。これは**モバイルのみ**です_

ツールバーを自動的にブロックアウトします。

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **備考：** _`checkScreen()` でのみ使用できます。プラグインの設定を上書きします。これは **iPad のみ**です_

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

不一致率だけでなく、すべての比較データを返します

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。プラグインの設定を上書きします_

差分のある画像の保存を防ぐ `misMatchPercentage` の許容値

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **備考：** _`checkElement`、`checkScreen()`、`checkFullPageScreen()` でも使用できます。[`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) が有効な場合にのみ関係します。_

JSON レポートで差分ピクセルをグループ化するために使用されるピクセルの近接度。値を大きくすると、より多くのピクセルがより少ないバウンディングボックスにグループ化されます。値を小さくすると、より正確ですが、より多くのボックスが生成されます。

</Option>
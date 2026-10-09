---
id: method-options
title: メソッドオプション
description: "サービスレベルのオプションを上書きする、ビジュアルテストメソッドごとの保存、比較、フォルダーオプションを設定します。"
---

メソッドオプションは、[メソッド](./methods)ごとに設定できるオプションです。プラグインのインスタンス化時に設定されたオプションと同じキーを持つ場合、このメソッドオプションがプラグインオプションの値を上書きします。

:::info NOTE

-   [保存オプション](#save-options)のすべてのオプションは、[比較](#compare-check-options)メソッドでも使用できます
-   すべての比較オプションは、サービスのインスタンス化時、__または__個々のチェックメソッドごとに使用できます。メソッドオプションがサービスのインスタンス化時に設定されたオプションと同じキーを持つ場合、メソッドの比較オプションがサービスの比較オプションの値を上書きします。
- 特に記載がない限り、すべてのオプションは以下のアプリケーションコンテキストで使用できます:
    - Web
    - ハイブリッドアプリ
    - ネイティブアプリ
- 以下のサンプルは `save*` メソッドを使用していますが、`check*` メソッドでも使用できます

:::

# Save Options

## 表示とレンダリング

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のスクロールバーを非表示にします。true に設定すると、スクリーンショットを撮る前にすべてのスクロールバーが無効になります。余計な問題を防ぐため、デフォルトは `true` に設定されています。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のすべての `input`、`textarea`、`[contenteditable]` のキャレットの「点滅」を有効/無効にします。`true` に設定すると、スクリーンショットを撮る前にキャレットが `transparent` に設定され、
完了後にリセットされます。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のすべての CSS アニメーションを有効/無効にします。`true` に設定すると、スクリーンショットを撮る前にすべてのアニメーションが無効になり、
完了後にリセットされます

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

ページ上のすべてのテキストを非表示にし、レイアウトのみを比較に使用します。非表示は、__各__要素にスタイル `'color': 'transparent !important'` を追加することで行われます。

出力については[テスト出力](./test-output#enablelayouttesting)を参照してください。

:::info
このフラグを使用すると、テキストを含むすべての要素（`p, h1, h2, h3, h4, h5, h6, span, a, li` だけでなく、`div|button|..` も含む）にこのプロパティが付与されます。これを調整するオプションは__ありません__。
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

このオプションを使用すると、W3C-WebDriver プロトコルに基づく「旧来の」スクリーンショット方式に戻すことができます。テストが既存のベースライン画像に依存している場合や、新しい BiDi ベースのスクリーンショットを完全にサポートしていない環境で実行している場合に役立ちます。
これを有効にすると、解像度や品質がわずかに異なるスクリーンショットが生成される場合があることに注意してください。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

無視領域の各辺に追加されるデバイスピクセル単位のパディングで、各領域の幅と高さがこの値の 2 倍大きくなります。これにより、高 DPR ディスプレイや BiDi スクリーンショットプロトコルで発生する可能性のある 1 px の境界差異を回避できます。無効にするには `0` に設定します。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

サードパーティフォントを含むフォントは、同期的または非同期的に読み込まれます。非同期読み込みとは、WebdriverIO がページの読み込みが完了したと判断した後にフォントが読み込まれる可能性があることを意味します。フォントのレンダリング問題を防ぐため、このモジュールはデフォルトで、スクリーンショットを撮る前にすべてのフォントが読み込まれるのを待機します。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## 要素の表示制御

---

### `hideElements`

<Option type="array" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

要素の配列を指定することで、1 つまたは複数の要素にプロパティ `visibility: hidden` を追加して非表示にできます。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
### `removeElements`

<Option type="array" required="No">

- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

要素の配列を指定することで、1 つまたは複数の要素にプロパティ `display: none` を追加して_削除_できます。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
## 要素固有

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **使用対象:** [`saveElement`](./methods#saveelement) または [`checkElement`](./methods#checkelement) のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

要素の切り抜きを大きくするための `top`、`right`、`bottom`、`left` のピクセル数を保持するオブジェクトです。

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **使用対象:** [`saveElement`](./methods#saveelement) または [`checkElement`](./methods#checkelement) のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

WebDriver BiDi プロトコルで要素のスクリーンショットをキャプチャする際に、どの座標原点を使用するかを制御する BiDi 専用のオプションです。

- `'document'` _（デフォルト）_: ドキュメントのレイアウトをレンダリングします。要素の位置に関係なく動作しますが、合成レイヤー（例: スクロールバー、fixed/sticky のオーバーレイ、`will-change` 要素）はキャプチャ**しません**。
- `'viewport'`: スクロールバーやオーバーレイを含め、描画されたとおりの合成フレームをキャプチャします。要素がビューポート内で**完全に表示されている**必要があり、要素がビューポートの外にある場合やビューポートより大きい場合は、説明的なエラーをスローします。

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## フルページ固有

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **使用対象:** [`saveFullPageScreen`](./methods#savefullpagescreen)、[`saveTabbablePage`](./methods#savetabbablepage)、[`checkFullPageScreen`](./methods#checkfullpagescreen) または [`checkTabbablePage`](./methods#checktabbablepage) のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

`true` に設定すると、このオプションはフルページスクリーンショットをキャプチャするための**スクロール＆スティッチ方式**を有効にします。
ブラウザのネイティブなスクリーンショット機能を使用する代わりに、ページを手動でスクロールし、複数のスクリーンショットをつなぎ合わせます。
この方法は、**遅延読み込みコンテンツ**を含むページや、完全にレンダリングするためにスクロールが必要な複雑なレイアウトのページに特に有用です。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **使用対象:** [`saveFullPageScreen`](./methods#savefullpagescreen) または [`saveTabbablePage`](./methods#savetabbablepage) のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

スクロール後に待機するタイムアウト（ミリ秒）です。遅延読み込みのあるページの識別に役立つ場合があります。

> **NOTE:** これは `userBasedFullPageScreenshot` が `true` に設定されている場合にのみ機能します

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **使用対象:** [`saveFullPageScreen`](./methods#savefullpagescreen) または [`saveTabbablePage`](./methods#savetabbablepage) のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

要素の配列を指定することで、1 つまたは複数の要素にプロパティ `visibility: hidden` を追加して非表示にします。
これは、例えばページをスクロールするとページと一緒にスクロールする sticky 要素がページに含まれており、フルページスクリーンショットを作成する際に煩わしい効果を生じさせる場合に便利です

> **NOTE:** これは `userBasedFullPageScreenshot` が `true` に設定されている場合にのみ機能します

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

# Compare (Check) Options

比較オプションは、比較の実行方法に影響を与えるオプションです。

</Option>
## 視覚的な感度

---

:::info `ignore*` オプションのバージョン履歴
これらのプリセットは、比較エンジンが ResembleJS（v9 以前）から Pixelmatch（v10 以降）に切り替わった際に、破壊的変更として一度だけ動作が変更されました。詳細は、比較オプションページの[バージョン履歴表](./compare-options#visual-sensitivity)を参照してください。v10.0.0 以降の変更については、以下の該当オプションに「Since」の注記で記載されています。
:::

**後勝ちの順序:** 複数の `ignore*` フラグが同時に有効になっている場合、適用されるプリセットは 1 つだけで、次の順序に従います（後のものが優先）: `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`。`v10.1.0` 以降では、どのプリセットが優先されたかを示す警告がログに出力されます。

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて
- **Since:** `v10.1.0`: resemble の輝度重み（`0.3/0.59/0.11`）を使用した明度のみの比較。

明度のみを比較し（resemble の輝度重み `0.3/0.59/0.11`）、色相/色の違いを無視します。色そのものが変化することが想定されるものの、レイアウトや明度の変化は検出したい場合に使用します。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて
- **Since:** `v10.1.0`: 他の `ignore*` フラグとは独立して、独自のしきい値/AA ルールを適用します。

画像を比較し、アルファチャンネルの違いを無視します。透明度/不透明度のレンダリングが不安定だが、その下のピクセルの色は重要な場合に使用します。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて
- **Since:** `v10`: デフォルトが `true` に変更されました（v9 以前は `false`）。

比較時にアンチエイリアスされたピクセルを許容します。アンチエイリアスされたピクセルを不一致としてカウントする厳密な比較を行う場合は `false` に設定します。これにより、ビジュアルテストの不安定さの最も一般的な原因である、何も変更されていないにもかかわらずマシンごとにテキスト/図形のエッジのアンチエイリアスがわずかに異なってレンダリングされる問題が解決されます。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて
- **Since:** `v10.1.0`: 他の `ignore*` フラグとは独立して、独自のしきい値/AA ルールを適用します。

緩和された RGB 許容値（YIQ 空間でチャンネルあたり約 16/255）を使用して画像を比較します。アンチエイリアスは許容されません。アンチエイリアスを許容せずに、レンダリングノイズ（圧縮アーティファクト、色の丸め）に対して多少の余裕を持たせたい場合に使用します。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて
- **Since:** `v10.1.0`: 他の `ignore*` フラグとは独立して、独自のしきい値/AA ルールを適用します。

許容値ゼロを使用します: アンチエイリアスを含め、あらゆるピクセルの違いが不一致としてカウントされます。何も変更されていないことをピクセル単位で完全に証明する必要がある場合に使用します。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて
- **追加バージョン:** `v10.1.0`

`ignore*` プリセットの代わりに、[pixelmatch](https://github.com/mapbox/pixelmatch) の設定（`threshold`、`includeAA`、`diffColor`、`aaColor`、`diffColorAlt`、`alpha`、`diffMask`、`checkerboard`）を直接指定して、単一の `check*` 呼び出しの比較モードを上書きします。特定のテストに対してプリセットが大まかすぎる場合、例えば独自のしきい値が必要な場合や、レポート内で目立つ差分の色が必要な場合に使用します。各フィールドの完全なリファレンスと、それぞれが解決する問題については、[pixelmatch の直接制御](./compare-options#direct-pixelmatch-control)を参照してください。

同じ呼び出しのオプションオブジェクト内で `ignore*` オプションと組み合わせることはできません: その場合は `CompareOptionsConflictError` がスローされます。ただし、`ignore*` プリセットを使用するサービス設定を上書きすることは可能です（その逆も同様）。メソッド呼び出しがこのように比較モードを切り替える場合は、警告がログに出力されます。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

比較を実行する前に、2 つの画像を同じサイズにスケーリングします。`ignoreAntialiasing` と `ignoreAlpha` を有効にすることを強く推奨します

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## モバイルのブロックアウト

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **使用対象:** _これは**モバイル専用**です_
- **サポートされるアプリケーションコンテキスト:** ハイブリッド（ネイティブ部分）およびネイティブアプリ

比較時にステータスバーとアドレスバーを自動的にブロックアウトします。これにより、時刻、Wi-Fi、バッテリーの状態による失敗を防ぎます。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **使用対象:** _これは**モバイル専用**です_
- **サポートされるアプリケーションコンテキスト:** ハイブリッド（ネイティブ部分）およびネイティブアプリ

ツールバーを自動的にブロックアウトします。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **使用対象:** _`checkScreen()` でのみ使用できます。これは **iPad 専用**です_
- **サポートされるアプリケーションコンテキスト:** すべて

比較時に、横向きモードの iPad のサイドバーを自動的にブロックアウトします。これにより、タブ/プライベート/ブックマークのネイティブコンポーネントによる失敗を防ぎます。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## 領域の処理

---

### `blockOut`

<Option type="array" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

比較前にブロックアウトする矩形領域の配列です。各エントリは、`x`、`y`、`width`、`height` の値（ピクセル単位）を持つオブジェクトである必要があります。ブロックアウトされた領域は差分が計算される前に塗りつぶされるため、それらの領域が不一致率に影響することはありません。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **使用対象:** `checkScreen` メソッドでのみ使用でき、`checkElement` メソッドでは使用**できません**
- **サポートされるアプリケーションコンテキスト:** ネイティブアプリ

要素の配列、または `x|y|width|height` のオブジェクトに基づいて、画面上の要素や領域を自動的にブロックアウトします。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

</Option>
## 結果とレポート

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

true の場合、返されるパーセンテージは `0.12345678` のようになります。デフォルトは `0.12` です

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

不一致率だけでなく、すべての比較データを返します。[コンソール出力](./test-output#console-output-1)も参照してください

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

差分のある画像の保存を防ぐ `misMatchPercentage` の許容値です

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

JSON レポートで差分ピクセルをグループ化するために使用されるピクセルの近接度です。値を大きくすると、より多くのピクセルがより少ないバウンディングボックスにグループ化されます。値を小さくすると、より正確ですが、より多くのボックスが生成されます。[`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) が有効な場合にのみ関係します。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Folder options

---

ベースラインフォルダーとスクリーンショットフォルダー（actual、diff）は、プラグインのインスタンス化時またはメソッドで設定できるオプションです。特定のメソッドでフォルダーオプションを設定するには、メソッドのオプションオブジェクトにフォルダーオプションを渡します。これは以下で使用できます:

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

// これはすべてのメソッドで使用できます
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

テストでキャプチャされたスナップショット用のフォルダーです。

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

比較対象として使用されるベースライン画像用のフォルダーです。

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

比較時にレンダリングされる差分画像用のフォルダーです。

</Option>
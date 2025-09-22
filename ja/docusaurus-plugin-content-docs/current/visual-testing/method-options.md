---
id: method-options
title: メソッドオプション
---

メソッドオプションとは、[メソッド](./methods)ごとに設定できるオプションです。オプションがプラグインのインスタンス作成時に設定されたオプションと同じキーを持つ場合、このメソッドオプションはプラグインオプションの値を上書きします。

:::info 注意

-   [保存オプション](#save-options)のすべてのオプションは、[比較](#compare-check-options)メソッドで使用できます
-   すべての比較オプションはサービスのインスタンス作成時__または__個々のチェックメソッドごとに使用できます。メソッドオプションがサービスのインスタンス作成時に設定されたオプションと同じキーを持つ場合、メソッドの比較オプションがサービスの比較オプションの値を上書きします。
- すべてのオプションは、特に明記されていない限り、以下のアプリケーションコンテキストで使用できます：
    - Web
    - ハイブリッドアプリ
    - ネイティブアプリ
- 以下のサンプルは`save*`メソッドを使用していますが、`check*`メソッドでも使用できます

:::

## Save Options

### `disableBlinkingCursor`

- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `false`
- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のすべての `input`、`textarea`、`[contenteditable]` のカーソル「点滅」を有効/無効にします。`true`に設定すると、スクリーンショットを撮る前にカーソルが`transparent`に設定され、
完了時にリセットされます。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `false`
- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のすべてのCSSアニメーションを有効/無効にします。`true`に設定すると、スクリーンショットを撮る前にすべてのアニメーションが無効化され、
完了時にリセットされます

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `false`
- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

このオプションを使用して、W3C-WebDriverプロトコルに基づいた「古い」スクリーンショットメソッドに戻すことができます。これは、テストが既存のベースライン画像に依存している場合や、BiDiベースのスクリーンショットを完全にサポートしていない環境で実行している場合に役立ちます。
これを有効にすると、スクリーンショットの解像度や品質が少し異なる場合があることに注意してください。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `false`
- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

これはページ上のすべてのテキストを非表示にし、比較にはレイアウトのみが使用されるようにします。非表示化は、__各__要素に`'color': 'transparent !important'`というスタイルを追加することによって行われます。

出力については[テスト出力](./test-output#enablelayouttesting)を参照してください。

:::info
このフラグを使用すると、テキストを含む各要素（つまり`p, h1, h2, h3, h4, h5, h6, span, a, li`だけでなく、`div|button|..`も）にこのプロパティが付与されます。これをカスタマイズするオプションは__ありません__。
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `true`
- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

アプリケーションのスクロールバーを非表示にします。`true`に設定すると、スクリーンショットを撮る前にすべてのスクロールバーが無効化されます。これは追加の問題を防ぐためにデフォルトで`true`に設定されています。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **タイプ:** `array`
- **必須:** いいえ
- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

このメソッドは、要素の配列を提供することで、それらに`visibility: hidden`プロパティを追加して1つ以上の要素を非表示にすることができます。

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

### `removeElements`

- **タイプ:** `array`
- **必須:** いいえ
- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

このメソッドは、要素の配列を提供することで、それらに`display: none`プロパティを追加して1つ以上の要素を_削除_することができます。

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

### `resizeDimensions`

- **タイプ:** `object`
- **必須:** いいえ
- **デフォルト:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **使用対象:** [`saveElement`](./methods#saveelement)または[`checkElement`](./methods#checkelement)のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

要素の切り抜きを大きくするために必要なピクセル数の`top`、`right`、`bottom`、`left`を保持するオブジェクトです。

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

### `userBasedFullPageScreenshot`

- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `false`
- **使用対象:** [`saveFullPageScreen`](./methods#savefullpagescreen)、[`saveTabbablePage`](./methods#savetabbablepage)、[`checkFullPageScreen`](./methods#checkfullpagescreen)または[`checkTabbablePage`](./methods#checktabbablepage)のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

`true`に設定すると、このオプションは全ページスクリーンショットをキャプチャするための**スクロールと縫い合わせ戦略**を有効にします。
ブラウザのネイティブスクリーンショット機能を使用する代わりに、手動でページをスクロールし、複数のスクリーンショットを縫い合わせます。
このメソッドは特に**遅延読み込みコンテンツ**や、完全にレンダリングするためにスクロールが必要な複雑なレイアウトを持つページに有効です。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **タイプ:** `number`
- **必須:** いいえ
- **デフォルト:** `1500`
- **使用対象:** [`saveFullPageScreen`](./methods#savefullpagescreen)または[`saveTabbablePage`](./methods#savetabbablepage)のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

スクロール後に待機するミリ秒単位のタイムアウト。これは遅延読み込みを持つページを識別するのに役立つかもしれません。

> **注意:** これは`userBasedFullPageScreenshot`が`true`に設定されている場合にのみ機能します

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **タイプ:** `array`
- **必須:** いいえ
- **使用対象:** [`saveFullPageScreen`](./methods#savefullpagescreen)または[`saveTabbablePage`](./methods#savetabbablepage)のみ
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

このメソッドは、要素の配列を提供することで、それらに`visibility: hidden`プロパティを追加して1つ以上の要素を非表示にします。
これは、例えばページに固定要素がある場合に便利です。これらの要素はページがスクロールされるとページと一緒にスクロールしますが、全ページスクリーンショットを作成すると煩わしい効果をもたらします。

> **注意:** これは`userBasedFullPageScreenshot`が`true`に設定されている場合にのみ機能します

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

### `waitForFontsLoaded`

- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `true`
- **使用対象:** すべての[メソッド](./methods)
- **サポートされるアプリケーションコンテキスト:** Web、ハイブリッドアプリ（Webview）

サードパーティのフォントを含むフォントは、同期的または非同期的に読み込むことができます。非同期読み込みとは、WebdriverIOがページが完全に読み込まれたと判断した後にフォントが読み込まれる可能性があることを意味します。フォントのレンダリングの問題を防ぐため、このモジュールはデフォルトで、スクリーンショットを撮る前にすべてのフォントが読み込まれるのを待ちます。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Compare (Check) Options

比較オプションは、[ResembleJS](https://github.com/Huddle/Resemble.js)によって実行される比較方法に影響を与えるオプションです。

### `ignoreAlpha`

- **タイプ:** `boolean`
- **デフォルト:** `false`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

画像を比較し、アルファを無視します。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **タイプ:** `boolean`
- **デフォルト:** `true`
- **必須:** いいえ
- **使用対象:** _`checkScreen()`でのみ使用可能。これは**iPadのみ**の機能です_
- **サポートされるアプリケーションコンテキスト:** すべて

比較中に横向きモードのiPadのサイドバーを自動的にブロックします。これにより、タブ/プライベート/ブックマークなどのネイティブコンポーネントでの失敗を防ぎます。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **タイプ:** `boolean`
- **デフォルト:** `true`
- **必須:** いいえ
- **使用対象:** _これは**モバイルのみ**の機能です_
- **サポートされるアプリケーションコンテキスト:** ハイブリッド（ネイティブ部分）とネイティブアプリ

比較中にステータスバーとアドレスバーを自動的にブロックします。これにより、時間、Wi-Fi、またはバッテリーステータスに関する失敗を防ぎます。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **タイプ:** `boolean`
- **デフォルト:** `true`
- **必須:** いいえ
- **使用対象:** _これは**モバイルのみ**の機能です_
- **サポートされるアプリケーションコンテキスト:** ハイブリッド（ネイティブ部分）とネイティブアプリ

ツールバーを自動的にブロックします。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **タイプ:** `boolean`
- **デフォルト:** `false`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

画像を比較し、アンチエイリアシングを無視します。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **タイプ:** `boolean`
- **デフォルト:** `false`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

画像がカラーであっても、比較は2つの白黒画像を比較します

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **タイプ:** `boolean`
- **デフォルト:** `false`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

画像を比較し、`red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`で比較します

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **タイプ:** `boolean`
- **デフォルト:** `false`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

画像を比較し、`red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`で比較します

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **タイプ:** `boolean`
- **デフォルト:** `false`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

trueの場合、戻り値のパーセンテージは`0.12345678`のようになります。デフォルトは`0.12`です

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **タイプ:** `boolean`
- **デフォルト:** `false`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

これはすべての比較データを返します。不一致パーセンテージだけではなく、[コンソール出力](./test-output#console-output-1)も参照してください

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **タイプ:** `number`
- **デフォルト:** `0`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

差異のある画像の保存を防ぐ`misMatchPercentage`の許容値

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **タイプ:** `number`
- **デフォルト:** `0`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

大きな画像の比較はパフォーマンスの問題を引き起こす可能性があります。
ここにピクセル数（0より大きい）を指定すると、画像の幅または高さが`largeImageThreshold`ピクセルより大きい場合、比較アルゴリズムはピクセルをスキップします。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **タイプ:** `boolean`
- **デフォルト:** `false`
- **必須:** いいえ
- **使用対象:** すべての[チェックメソッド](./methods#check-methods)
- **サポートされるアプリケーションコンテキスト:** すべて

比較を実行する前に2つの画像を同じサイズにスケーリングします。`ignoreAntialiasing`と`ignoreAlpha`を有効にすることを強く推奨します

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **タイプ:** `array`
- **必須:** いいえ
- **使用対象:** `checkScreen`メソッドでのみ使用可能、`checkElement`メソッドでは**使用不可**
- **サポートされるアプリケーションコンテキスト:** ネイティブアプリ

このメソッドは、要素の配列または`x|y|width|height`オブジェクトに基づいて、画面上の要素または領域を自動的にブロックアウトします。

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

## フォルダオプション

ベースラインフォルダとスクリーンショットフォルダ（実際の画像、差分）は、プラグインのインスタンス化時またはメソッドで設定できるオプションです。特定のメソッドにフォルダオプションを設定するには、メソッドのオプションオブジェクトにフォルダオプションを渡します。これは以下で使用できます：

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

- **タイプ:** `string`
- **必須:** いいえ
- **サポートされるアプリケーションコンテキスト:** すべて

テストでキャプチャされたスナップショットのフォルダ。

### `baselineFolder`

- **タイプ:** `string`
- **必須:** いいえ
- **サポートされるアプリケーションコンテキスト:** すべて

比較に使用されるベースライン画像のフォルダ。

### `diffFolder`

- **タイプ:** `string`
- **必須:** いいえ
- **サポートされるアプリケーションコンテキスト:** すべて

ResembleJSによってレンダリングされた画像差分のフォルダ。
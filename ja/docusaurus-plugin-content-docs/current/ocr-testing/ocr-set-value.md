---
id: ocr-set-value
title: ocrSetValue
---

要素にキーストロークのシーケンスを送信します。これにより：

-   要素を自動的に検出します
-   クリックしてフィールドにフォーカスを合わせます
-   フィールドに値を設定します

このコマンドは提供されたテキストを検索し、[Fuse.js](https://fusejs.io/)からのファジーロジックに基づいてマッチを見つけようとします。これは、タイプミスのあるセレクタを提供した場合や、見つかったテキストが100%一致しない場合でも、要素を返そうとすることを意味します。以下の[ログ](#logs)をご覧ください。

## 使用方法

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## 出力

### ログ

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## オプション

### `text`

-   **タイプ:** `string`
-   **必須:** はい

クリックするために検索したいテキスト。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **タイプ:** `string`
-   **必須:** はい

追加する値。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **タイプ:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`

値を入力フィールドに送信する必要があるかどうか。これは文字列の最後に「ENTER」が送信されることを意味します。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** `500` ミリ秒

これはクリックの持続時間です。必要であれば、時間を増やして「長押しクリック」を作成することもできます。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // これは3秒です
});
```

### `contrast`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** `0.25`

コントラストが高いほど画像は暗くなり、逆もまた然りです。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`の間の値を受け付けます。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **タイプ:** `number`
-   **必須:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

これは画面内でOCRがテキストを探す検索領域です。これは要素または`x`、`y`、`width`、`height`を含む矩形です。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// または
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// または
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: {
        x: 10,
        y: 50,
        width: 300,
        height: 75,
    },
});
```

### `language`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `eng`

Tesseractが認識する言語。詳細情報は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)で見つかり、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で見つかります。

#### 例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // オランダ語を言語として使用
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **タイプ:** `object`
-   **必須:** いいえ

一致する要素に対して相対的に画面をクリックできます。これは、一致する要素から相対的なピクセル`above`、`right`、`below`または`left`に基づいて行うことができます。

:::note

以下の組み合わせが許可されています

-   単一のプロパティ
-   `above` + `left` または `above` + `right`
-   `below` + `left` または `below` + `right`

以下の組み合わせは**許可されていません**

-   `above` と `below`
-   `left` と `right`

:::

#### `relativePosition.above`

-   **タイプ:** `number`
-   **必須:** いいえ

一致する要素からxピクセル`上`をクリックします。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **タイプ:** `number`
-   **必須:** いいえ

一致する要素からxピクセル`右`をクリックします。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **タイプ:** `number`
-   **必須:** いいえ

一致する要素からxピクセル`下`をクリックします。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **タイプ:** `number`
-   **必須:** いいえ

一致する要素からxピクセル`左`をクリックします。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

次のオプションでテキストを見つけるためのファジーロジックを変更できます。これはより良いマッチを見つけるのに役立つかもしれません。

#### `fuzzyFindOptions.distance`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 100

マッチがファジーロケーション（locationで指定）にどれだけ近くなければならないかを決定します。ファジーロケーションから離れたdistance文字のちょうどの文字マッチはまったく一致しないスコアになります。0の距離は、指定された正確な場所でのマッチを要求します。1000の距離は、0.8の閾値を使用した場合、パーフェクトマッチがロケーションから800文字以内にあることを要求します。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 0

テキスト内のどこにパターンが見つかると予想されるかをおおよそ決定します。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 0.6

マッチングアルゴリズムがあきらめるポイントです。閾値0は完全一致（文字と場所の両方）を要求し、閾値1.0は何でもマッチさせます。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **タイプ:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** false

検索が大文字小文字を区別するかどうか。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 2

長さがこの値を超えるマッチのみが返されます。（例えば、結果で1文字のマッチを無視したい場合は、2に設定します）

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** false

`true`の場合、文字列で完全一致がすでに見つかっていても、マッチング関数は検索パターンの最後まで続行します。

##### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
---
id: ocr-set-value
title: ocrSetValue
---

要素にキーストロークのシーケンスを送信します。これは以下のことを行います：

-   要素を自動的に検出します
-   クリックによりフィールドにフォーカスを当てます
-   フィールドに値を設定します

このコマンドは提供されたテキストを検索し、[Fuse.js](https://fusejs.io/)によるファジーロジックに基づいて一致するものを見つけようとします。これは、タイプミスのあるセレクタを提供した場合や、見つかったテキストが100%一致していない場合でも、要素を返そうとすることを意味します。以下の[ログ](#logs)を参照してください。

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

クリックの持続時間です。必要に応じて、時間を増やして「長押しクリック」を作成することもできます。

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

コントラストが高いほど画像は暗くなり、その逆も同様です。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`の間の値を受け付けます。

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

これは、OCRがテキストを探す画面内の検索エリアです。これは要素または`x`、`y`、`width`、`height`を含む矩形です。

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

Tesseractが認識する言語。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)で確認でき、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

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

一致する要素を基準にして画面をクリックできます。一致する要素から相対的なピクセル数で`above`、`right`、`below`、または`left`に基づいて行うことができます。

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

一致する要素から x ピクセル`上`をクリックします。

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

一致する要素から x ピクセル`右`をクリックします。

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

一致する要素から x ピクセル`下`をクリックします。

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

一致する要素から x ピクセル`左`をクリックします。

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

以下のオプションでテキストを見つけるためのファジーロジックを変更できます。これはより良い一致を見つけるのに役立つかもしれません。

#### `fuzzyFindOptions.distance`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 100

一致がファジーロケーション（locationで指定）にどれだけ近い必要があるかを決定します。ファジーロケーションから距離文字離れた正確な文字の一致は、完全な不一致としてスコア付けされます。距離0は、一致が指定された正確な位置にある必要があることを要求します。距離1000は、しきい値0.8を使用して、完全な一致が見つかるためには、位置から800文字以内である必要があります。

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

テキスト内でパターンが見つかると予想される場所をおおよそ決定します。

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

マッチングアルゴリズムがどの時点であきらめるかを決定します。しきい値0は完全な一致（文字と位置の両方）を必要とし、しきい値1.0は何でも一致します。

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

検索が大文字と小文字を区別するかどうか。

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

長さがこの値を超える一致のみが返されます。（例えば、結果で単一文字の一致を無視したい場合は、2に設定します）

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

`true`の場合、文字列内ですでに完全な一致が見つかっていても、マッチング関数は検索パターンの最後まで続行します。

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
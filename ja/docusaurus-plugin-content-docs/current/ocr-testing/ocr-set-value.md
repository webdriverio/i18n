---
id: ocr-set-value
title: ocrSetValue
---

要素にキーストロークのシーケンスを送信します。これは以下の操作を行います：

-   要素を自動的に検出する
-   クリックすることでフィールドにフォーカスを当てる
-   フィールドに値を設定する

このコマンドは提供されたテキストを検索し、[Fuse.js](https://fusejs.io/)のファジーロジックに基づいてマッチを見つけようとします。これは、タイプミスのあるセレクタを提供した場合や、見つかったテキストが100%一致しない場合でも、要素を返そうとすることを意味します。以下の[ログ](#logs)を参照してください。

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

-   **型:** `string`
-   **必須:** はい

クリックしたい検索対象のテキスト。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **型:** `string`
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

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`

値を入力フィールドに送信する必要がある場合。これは、文字列の最後に「ENTER」が送信されることを意味します。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** `500` ミリ秒

クリックの持続時間です。必要に応じて、時間を増やして「長押しクリック」を作成することもできます。

#### 例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // これは3秒
});
```

### `contrast`

-   **型:** `number`
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

-   **型:** `number`
-   **必須:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

OCRがテキストを検索する画面上の検索領域です。これは要素または`x`、`y`、`width`、`height`を含む矩形です。

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

-   **型:** `string`
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

-   **型:** `object`
-   **必須:** いいえ

マッチする要素に対して相対的に画面上をクリックできます。これはマッチする要素から相対的なピクセル`above`、`right`、`below`または`left`に基づいて行うことができます。

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

-   **型:** `number`
-   **必須:** いいえ

マッチする要素の`above` x ピクセルをクリックします。

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

-   **型:** `number`
-   **必須:** いいえ

マッチする要素から`right` x ピクセルをクリックします。

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

-   **型:** `number`
-   **必須:** いいえ

マッチする要素の`below` x ピクセルをクリックします。

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

-   **型:** `number`
-   **必須:** いいえ

マッチする要素から`left` x ピクセルをクリックします。

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

以下のオプションでテキストを見つけるためのファジーロジックを変更できます。これにより、より良いマッチを見つけるのに役立つかもしれません。

#### `fuzzyFindOptions.distance`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** 100

マッチがファジーロケーション（locationで指定）にどれだけ近くなければならないかを決定します。ファジーロケーションから離れたdistance文字数の正確な文字マッチは、完全な不一致としてスコアリングされます。distanceが0の場合、指定された正確な位置でのマッチが必要です。distanceが1000の場合、しきい値0.8を使用して、完全一致がロケーションから800文字以内にある必要があります。

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

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** 0

パターンがテキスト内のどこで見つかると予想されるかをおおよそ決定します。

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

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** 0.6

マッチングアルゴリズムがどの時点で諦めるかを決定します。しきい値0は完全一致（文字と位置の両方）を必要とし、しきい値1.0は何でもマッチさせます。

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

-   **型:** `boolean`
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

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** 2

この値を超える長さのマッチのみが返されます。（例えば、結果で単一文字のマッチを無視したい場合は、2に設定します）

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

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** false

`true`の場合、マッチング関数は、文字列内で完全一致がすでに見つかっていても、検索パターンの最後まで続行します。

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
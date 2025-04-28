---
id: ocr-click-on-text
title: ocrClickOnText
---

提供されたテキストに基づいて要素をクリックします。このコマンドは提供されたテキストを検索し、[Fuse.js](https://fusejs.io/)のファジーロジックに基づいてマッチを見つけようとします。つまり、セレクタにタイプミスがあっても、または見つかったテキストが100%一致していなくても、要素を返そうとします。以下の[ログ](#logs)を参照してください。

## 使用方法

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## 出力

### ログ

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### 画像

（デフォルトの）[`imagesFolder`](./getting-started#imagesfolder)内に、モジュールがどこをクリックしたかを示すターゲット付きの画像が見つかります。

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## オプション

### `text`

-   **型:** `string`
-   **必須:** はい

クリックするために検索したいテキスト。

#### 例

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** `500` ミリ秒

これはクリックの持続時間です。必要に応じて、時間を増やすことで「長押し」を作成することもできます。

#### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // これは3秒です
});
```

### `contrast`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** `0.25`

コントラストが高いほど画像は暗くなり、逆もまた然りです。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`までの値を受け付けます。

#### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **型:** `number`
-   **必須:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

これは画面内でOCRがテキストを探す検索領域です。これは要素または`x`、`y`、`width`、`height`を含む矩形です。

#### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// または
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// または
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // オランダ語を使用
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **型:** `object`
-   **必須:** いいえ

マッチした要素を基準に相対的な位置で画面をクリックできます。これはマッチした要素から相対的なピクセル数で`above`、`right`、`below`または`left`に基づいて行うことができます。

:::note

以下の組み合わせが許可されています

-   単一のプロパティ
-   `above` + `left`または`above` + `right`
-   `below` + `left`または`below` + `right`

以下の組み合わせは**許可されていません**

-   `above`と`below`
-   `left`と`right`

:::

#### `relativePosition.above`

-   **型:** `number`
-   **必須:** いいえ

マッチした要素からxピクセル`上`をクリックします。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **型:** `number`
-   **必須:** いいえ

マッチした要素からxピクセル`右`をクリックします。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **型:** `number`
-   **必須:** いいえ

マッチした要素からxピクセル`下`をクリックします。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **型:** `number`
-   **必須:** いいえ

マッチした要素からxピクセル`左`をクリックします。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

以下のオプションでテキストを見つけるためのファジーロジックを変更できます。これによってより良いマッチを見つけるのに役立つかもしれません。

#### `fuzzyFindOptions.distance`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** 100

マッチがファジー位置（locationで指定）にどれだけ近くなければならないかを決定します。ファジー位置から距離文字離れた正確な文字マッチは完全な不一致としてスコア付けされます。距離0は指定された正確な位置でのマッチを要求します。距離1000では、閾値0.8を使用する場合、完全一致が位置から800文字以内にある必要があります。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** 0

テキストのどこにパターンが見つかると予想されるかをおおよそ決定します。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** 0.6

マッチングアルゴリズムが諦めるポイントを決定します。閾値0は完全一致（文字と位置の両方）を必要とし、閾値1.0は何にでもマッチします。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** 2

長さがこの値を超えるマッチのみが返されます。（例えば、結果で1文字のマッチを無視したい場合は、これを2に設定します）

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** false

`true`の場合、マッチング関数は文字列内で完全一致がすでに見つかっていても検索パターンの最後まで続行します。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
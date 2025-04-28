---
id: ocr-click-on-text
title: ocrClickOnText
---

提供されたテキストに基づいて要素をクリックします。このコマンドは提供されたテキストを検索し、[Fuse.js](https://fusejs.io/)のファジーロジックに基づいてマッチを見つけようとします。これは、セレクタにタイプミスがあったり、見つかったテキストが100％一致していなくても、要素を返そうとすることを意味します。以下の[ログ](#logs)を参照してください。

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

(デフォルトの)[`imagesFolder`](./getting-started#imagesfolder)内に、モジュールがクリックした場所を示すターゲット付きの画像が保存されます。

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## オプション

### `text`

- **型:** `string`
- **必須:** はい

クリックするために検索したいテキスト。

#### 例

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** `500` ミリ秒

クリックの持続時間です。時間を増やして「長押し」を作成することもできます。

#### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // これは3秒です
});
```

### `contrast`

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** `0.25`

コントラストが高いほど画像は暗くなり、その逆も同様です。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`までの値を受け付けます。

#### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

- **型:** `number`
- **必須:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

画面上でOCRがテキストを探す検索領域です。これは要素または`x`、`y`、`width`、`height`を含む矩形にすることができます。

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

- **型:** `string`
- **必須:** いいえ
- **デフォルト:** `eng`

Tesseractが認識する言語。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)で、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

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

- **型:** `object`
- **必須:** いいえ

マッチした要素に対して相対的に画面をクリックできます。これはマッチした要素から相対的なピクセル単位で`above`、`right`、`below`または`left`に基づいて行うことができます。

:::note

以下の組み合わせが許可されています

- 単一のプロパティ
- `above` + `left` または `above` + `right`
- `below` + `left` または `below` + `right`

以下の組み合わせは**許可されていません**

- `above` と `below`
- `left` と `right`

:::

#### `relativePosition.above`

- **型:** `number`
- **必須:** いいえ

マッチした要素よりxピクセル`上`をクリックします。

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

- **型:** `number`
- **必須:** いいえ

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

- **型:** `number`
- **必須:** いいえ

マッチした要素よりxピクセル`下`をクリックします。

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

- **型:** `number`
- **必須:** いいえ

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

以下のオプションでテキストを見つけるためのファジーロジックを変更できます。これはより良いマッチを見つけるのに役立つかもしれません。

#### `fuzzyFindOptions.distance`

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 100

マッチがファジーロケーション（locationで指定）にどれだけ近くなければならないかを決定します。ファジーロケーションから距離文字離れた正確な文字マッチは、完全な不一致としてスコア付けされます。距離が0の場合、マッチは指定された正確な位置にある必要があります。距離が1000の場合、0.8のしきい値を使用すると、完全なマッチはロケーションから800文字以内になければなりません。

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

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 0

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

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 0.6

マッチングアルゴリズムがどの時点で諦めるかを決定します。しきい値が0の場合は完全一致（文字と位置の両方）を必要とし、しきい値が1.0の場合は何でもマッチします。

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

- **型:** `boolean`
- **必須:** いいえ
- **デフォルト:** false

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

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 2

長さがこの値を超えるマッチのみが返されます。（例えば、結果で単一文字のマッチを無視したい場合は、これを2に設定します）

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

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** false

`true`の場合、文字列ですでに完全一致が見つかっていても、マッチング関数は検索パターンの最後まで続行します。

##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
```
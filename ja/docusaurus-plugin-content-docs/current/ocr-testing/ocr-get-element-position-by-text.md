---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

画面上のテキストの位置を取得します。このコマンドは提供されたテキストを検索し、[Fuse.js](https://fusejs.io/)のファジーロジックに基づいてマッチを見つけようとします。これは、セレクタに誤字がある場合や、見つかったテキストが100%一致しない場合でも、要素を返そうとすることを意味します。以下の[ログ](#logs)を参照してください。

## 使用方法

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## 出力

### 結果

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### ログ

```log
# "Start3d"で検索しても見つかったテキストは"Started"だったにもかかわらず、一致が見つかります
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## オプション

### `text`

- **型:** `string`
- **必須:** はい

クリックしたいテキストを検索するための文字列。

#### 例

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** `0.25`

コントラストが高いほど画像は暗くなり、その逆も同様です。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`の間の値を受け付けます。

#### 例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

- **型:** `number`
- **必須:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

OCRがテキストを探す画面の検索領域です。これは要素または`x`、`y`、`width`、`height`を含む矩形です。

#### 例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// または
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// または
await browser.ocrGetElementPositionByText({
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

Tesseractが認識する言語。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)で確認でき、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

#### 例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // オランダ語を使用
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

次のオプションを使用してテキストを見つけるためのファジーロジックを変更できます。これはより良いマッチを見つけるのに役立つかもしれません。

#### `fuzzyFindOptions.distance`

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 100

マッチがファジーロケーション（locationで指定）にどれだけ近くなければならないかを決定します。ファジーロケーションから距離が離れている正確な文字のマッチは、完全に不一致としてスコアリングされます。距離が0の場合、マッチは指定された正確な場所にある必要があります。距離が1000の場合、閾値0.8を使用して、完全なマッチが見つかるためには、ロケーションから800文字以内である必要があります。

##### 例

```js
await browser.ocrGetElementPositionByText({
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

テキスト内のどこにパターンが見つかると予想されるかをおおよそ決定します。

##### 例

```js
await browser.ocrGetElementPositionByText({
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

マッチングアルゴリズムがどの時点で諦めるかを決定します。閾値が0の場合、完全一致（文字と位置の両方）が必要で、閾値が1.0の場合は何にでもマッチします。

##### 例

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
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

この値を超える長さのマッチのみが返されます。（たとえば、結果で単一文字のマッチを無視したい場合は、2に設定します）

##### 例

```js
await browser.ocrGetElementPositionByText({
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

`true`の場合、完全一致が文字列内ですでに見つかっていても、マッチング関数は検索パターンの最後まで続行します。

##### 例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
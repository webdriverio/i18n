---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "ocrGetElementPositionByText を使用して、OCR とファジーマッチングによりテキストの画面上の位置を取得します。"
---

画面上のテキストの位置を取得します。このコマンドは指定されたテキストを検索し、[Fuse.js](https://fusejs.io/) のファジーロジックに基づいて一致するものを見つけようとします。つまり、セレクタにタイプミスがあった場合や、見つかったテキストが 100% 一致しない場合でも、要素を返そうとします。以下の[ログ](#logs)を参照してください。

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
# "Start3d" を検索し、見つかったテキストが "Started" であったにもかかわらず、一致が見つかっている
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## オプション

### `text`

<Option type="string" required="yes">

クリックするために検索したいテキストです。

</Option>
#### 例

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

コントラストが高いほど画像は暗くなり、低いほど明るくなります。これは画像内のテキストを見つけるのに役立ちます。`-1` から `1` の間の値を受け付けます。

</Option>
#### 例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

OCR がテキストを探す必要がある画面内の検索領域です。要素、または `x`、`y`、`width`、`height` を含む矩形を指定できます。

</Option>
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

<Option type="string" default="eng" required="No">

Tesseract が認識する言語です。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

</Option>
#### 例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // 言語としてオランダ語を使用
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

以下のオプションを使用して、テキストを見つけるためのファジーロジックを変更できます。これにより、より適切な一致を見つけられる場合があります。

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

一致がファジー位置（location で指定）にどれだけ近くなければならないかを決定します。ファジー位置から distance 文字離れた位置にある完全な文字一致は、完全な不一致としてスコア付けされます。distance が 0 の場合、一致は指定された正確な位置にある必要があります。distance が 1000 の場合、threshold 0.8 を使用して見つけるには、完全な一致が location から 800 文字以内にある必要があります。

</Option>
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

<Option type="number" default="0" required="no">

テキスト内のおおよそどの位置でパターンが見つかると予想されるかを決定します。

</Option>
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

<Option type="number" default="0.6" required="no">

マッチングアルゴリズムがどの時点で諦めるかを指定します。threshold が 0 の場合は（文字と位置の両方で）完全な一致が必要となり、threshold が 1.0 の場合はあらゆるものに一致します。

</Option>
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

<Option type="boolean" default="false" required="no">

検索で大文字と小文字を区別するかどうかを指定します。

</Option>
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

<Option type="number" default="2" required="no">

長さがこの値を超える一致のみが返されます。（例えば、結果から1文字の一致を除外したい場合は、2 に設定します）

</Option>
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

<Option type="number" default="false" required="no">

`true` の場合、文字列内で完全な一致がすでに見つかっていても、マッチング関数は検索パターンの最後まで処理を続行します。

</Option>
##### 例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
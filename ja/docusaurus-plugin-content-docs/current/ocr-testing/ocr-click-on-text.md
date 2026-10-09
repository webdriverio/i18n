---
id: ocr-click-on-text
title: ocrClickOnText
description: "ocrClickOnText を使用して、表示されているテキストで要素をクリックします。OCR とあいまい一致を使用して画面上のテキストを検索します。"
---

指定されたテキストに基づいて要素をクリックします。このコマンドは指定されたテキストを検索し、[Fuse.js](https://fusejs.io/) のファジーロジックに基づいて一致するものを見つけようとします。つまり、セレクターにタイプミスがあった場合や、見つかったテキストが 100% 一致しない場合でも、要素を返そうとします。以下の[ログ](#logs)を参照してください。

## 使用方法

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## 出力

### ログ

```log
# "Start3d" で検索し、見つかったテキストが "Started" であっても一致を見つけています
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### 画像

（デフォルトの）[`imagesFolder`](./getting-started#imagesfolder) に、モジュールがクリックした場所を示すターゲット付きの画像が保存されます。

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## オプション

### `text`

<Option type="string" required="yes">

クリックするために検索したいテキストです。

</Option>
#### 例

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

クリックの持続時間です。時間を長くすることで「ロングクリック」を作成することもできます。

</Option>
#### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // これは 3 秒です
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

コントラストが高いほど画像は暗くなり、低いほど明るくなります。これは画像内のテキストを見つけるのに役立ちます。`-1` から `1` の間の値を受け付けます。

</Option>
#### 例

```js
await browser.ocrClickOnText({
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

<Option type="string" default="eng" required="No">

Tesseract が認識する言語です。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

</Option>
#### 例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // 言語としてオランダ語を使用
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

一致した要素を基準にした相対位置で画面をクリックできます。一致した要素から `above`、`right`、`below`、`left` の相対ピクセル数に基づいて指定できます。

:::note

以下の組み合わせが許可されています

-   単一のプロパティ
-   `above` + `left` または `above` + `right`
-   `below` + `left` または `below` + `right`

以下の組み合わせは許可されて**いません**

-   `above` と `below`
-   `left` と `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

一致した要素の x ピクセル `above`（上）をクリックします。

</Option>
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

<Option type="number" required="no">

一致した要素から x ピクセル `right`（右）をクリックします。

</Option>
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

<Option type="number" required="no">

一致した要素の x ピクセル `below`（下）をクリックします。

</Option>
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

<Option type="number" required="no">

一致した要素から x ピクセル `left`（左）をクリックします。

</Option>
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

以下のオプションを使用して、テキストを検索するためのファジーロジックを変更できます。これにより、より良い一致を見つけられる場合があります。

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

一致がファジー位置（location で指定）にどれだけ近くなければならないかを決定します。ファジー位置から distance 文字離れた位置での完全な文字一致は、完全な不一致としてスコア付けされます。distance が 0 の場合、一致は指定された正確な位置にある必要があります。distance が 1000 の場合、threshold 0.8 を使用して見つけるには、完全一致が location から 800 文字以内にある必要があります。

</Option>
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

<Option type="number" default="0" required="no">

パターンがテキスト内のおおよそどの位置で見つかると予想されるかを決定します。

</Option>
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

<Option type="number" default="0.6" required="no">

マッチングアルゴリズムがどの時点で諦めるかを決定します。threshold が 0 の場合は（文字と位置の両方で）完全一致が必要となり、threshold が 1.0 の場合はあらゆるものに一致します。

</Option>
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

<Option type="boolean" default="false" required="no">

検索で大文字と小文字を区別するかどうかを指定します。

</Option>
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

<Option type="number" default="2" required="no">

長さがこの値を超える一致のみが返されます。（例えば、結果から 1 文字の一致を除外したい場合は、2 に設定します）

</Option>
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

<Option type="number" default="false" required="no">

`true` の場合、文字列内で完全一致がすでに見つかっていても、マッチング関数は検索パターンの最後まで処理を続行します。

</Option>
##### 例

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
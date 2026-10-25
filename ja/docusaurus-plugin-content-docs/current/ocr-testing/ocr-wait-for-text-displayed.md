---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "OCRサービスのocrWaitForTextDisplayedを使用して、特定のテキストが画面に表示されるまで待機します。"
---

特定のテキストが画面に表示されるまで待機します。

## 使用方法

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## 出力

### ログ

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed は内部で ocrGetElementPositionByText を使用しているため、ログに ocrGetElementPositionByText コマンドが表示されます
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## オプション

### `text`

<Option type="string" required="yes">

クリックするために検索したいテキストです。

</Option>
#### 例

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

ミリ秒単位の時間です。OCR処理には時間がかかる場合があるため、値を小さく設定しすぎないよう注意してください。

</Option>
#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25秒間待機
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

デフォルトのエラーメッセージを上書きします。

</Option>
#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

コントラストが高いほど画像は暗くなり、低いほど明るくなります。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`の間の値を受け付けます。

</Option>
#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

OCRがテキストを探す画面内の検索領域です。要素、または`x`、`y`、`width`、`height`を含む矩形を指定できます。

</Option>
#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// または
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// または
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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

Tesseractが認識する言語です。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

</Option>
#### 例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // 言語としてオランダ語を使用
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

以下のオプションを使用して、テキストを検索するためのファジーロジックを変更できます。これにより、より適切な一致が見つかる場合があります。

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

一致がファジー位置（locationで指定）にどれだけ近くなければならないかを決定します。ファジー位置からdistance文字離れた位置にある完全な文字の一致は、完全な不一致としてスコア付けされます。distanceが0の場合、一致は指定された正確な位置にある必要があります。distanceが1000の場合、threshold 0.8を使用すると、完全な一致はlocationから800文字以内にある必要があります。

</Option>
##### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

マッチングアルゴリズムがどの時点で諦めるかを指定します。thresholdが0の場合は（文字と位置の両方について）完全な一致が必要となり、thresholdが1.0の場合はあらゆるものに一致します。

</Option>
##### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

長さがこの値を超える一致のみが返されます。（例えば、結果から1文字の一致を無視したい場合は、2に設定します）

</Option>
##### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

<Option type="number" default="false" required="no">

`true`の場合、文字列内で既に完全な一致が見つかっていても、マッチング関数は検索パターンの最後まで処理を続けます。

</Option>
##### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
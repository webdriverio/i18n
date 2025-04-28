---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

画面上に特定のテキストが表示されるのを待ちます。

## 使用法

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
# ocrWaitForTextDisplayedは内部的にocrGetElementPositionByTextを使用しているため、ログにocrGetElementPositionByTextコマンドが表示されます
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## オプション

### `text`

- **型:** `string`
- **必須:** はい

クリックするために検索したいテキスト。

#### 例

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 18000 (18秒)

ミリ秒単位の時間。OCRプロセスには時間がかかる場合があるため、あまり短く設定しないでください。

#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25秒待機
});
```

### `timeoutMsg`

- **型:** `string`
- **必須:** いいえ
- **デフォルト:** `Could not find the text "{selector}" within the requested time.`

デフォルトのエラーメッセージを上書きします。

#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** `0.25`

コントラストが高いほど画像は暗くなり、その逆も同様です。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`までの値を受け付けます。

#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

- **型:** `number`
- **必須:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

これは画面上でOCRがテキストを探す検索領域です。要素または`x`、`y`、`width`、`height`を含む矩形を指定できます。

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

- **型:** `string`
- **必須:** いいえ
- **デフォルト:** `eng`

Tesseractが認識する言語。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)で、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

#### 例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // オランダ語を使用
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

以下のオプションでファジー検索のロジックを変更できます。より良いマッチを見つけるのに役立つかもしれません。

#### `fuzzyFindOptions.distance`

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 100

マッチがファジー位置（locationで指定）にどれだけ近くなければならないかを決定します。ファジー位置から「distance」文字離れた位置にある完全一致の文字は、完全に不一致としてスコア付けされます。距離0は、指定された正確な位置でのマッチを要求します。距離1000は、閾値0.8を使用した場合、完全一致が位置から800文字以内にある必要があることを意味します。

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

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 0

テキスト内のどこにパターンが見つかると予想されるかをおおよそ決定します。

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

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 0.6

マッチングアルゴリズムがどの時点であきらめるかを決定します。閾値0は完全一致（文字と位置の両方）を要求し、閾値1.0は何でもマッチさせます。

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

- **型:** `boolean`
- **必須:** いいえ
- **デフォルト:** false

検索で大文字と小文字を区別するかどうか。

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

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** 2

この値を超える長さのマッチのみが返されます。（例えば、結果で1文字のマッチを無視したい場合は、2に設定します）

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

- **型:** `number`
- **必須:** いいえ
- **デフォルト:** false

`true`の場合、完全一致が既に文字列内で見つかっていても、マッチング関数は検索パターンの最後まで続行します。

##### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
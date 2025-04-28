---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

画面上に特定のテキストが表示されるのを待ちます。

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
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## オプション

### `text`

-   **タイプ:** `string`
-   **必須:** はい

クリックするために検索したいテキスト。

#### 例

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 18000 (18秒)

ミリ秒単位の時間。OCRプロセスには時間がかかる場合があるため、あまり低く設定しないでください。

#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25秒待機
});
```

### `timeoutMsg`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `Could not find the text "{selector}" within the requested time.`

デフォルトのエラーメッセージを上書きします。

#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** `0.25`

コントラストが高いほど画像は暗くなり、逆も同様です。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`の間の値を受け付けます。

#### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **タイプ:** `number`
-   **必須:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

画面上でOCRがテキストを探す検索領域です。これは要素または`x`、`y`、`width`、`height`を含む矩形です。

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

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `eng`

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

以下のオプションでファジー検索ロジックを変更できます。これはより良いマッチを見つけるのに役立ちます。

#### `fuzzyFindOptions.distance`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 100

マッチがファジーロケーション（locationで指定）にどれだけ近くなければならないかを決定します。ファジーロケーションから距離が離れた正確な文字マッチは、完全に不一致としてスコアリングされます。距離が0の場合、マッチは指定された正確な位置になければなりません。閾値が0.8の場合、距離1000では、完全なマッチが800文字以内にあることが求められます。

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

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 0

テキスト内のどこにパターンが見つかると予想されるかを大まかに決定します。

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

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 0.6

マッチングアルゴリズムがどの時点で諦めるかを決定します。閾値0は完全なマッチ（文字と位置の両方）を必要とし、閾値1.0は何にでもマッチします。

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

-   **タイプ:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** false

検索が大文字小文字を区別するかどうか。

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

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 2

長さがこの値を超えるマッチのみが返されます。（例えば、結果内の単一文字のマッチを無視したい場合は、2に設定します）

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

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** false

`true`の場合、完全なマッチが文字列内ですでに見つかっていても、マッチング関数は検索パターンの最後まで続行します。

##### 例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
---
id: ocr-get-text
title: ocrGetText
---

画像からテキストを取得します。

### 使用方法

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## 出力

### 結果

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### ログ

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## オプション

### `contrast`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** `0.25`

コントラストが高いほど画像は暗くなり、その逆も同様です。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`までの値を受け付けます。

#### 例

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **タイプ:** `number`
-   **必須:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

これは、OCRがテキストを探す画面内の検索領域です。これは要素または`x`、`y`、`width`、`height`を含む矩形にすることができます。

#### 例

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// または
await browser.ocrGetText({ haystack: await $("elementSelector") });

// または
await browser.ocrGetText({
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

Tesseractが認識する言語です。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)で確認でき、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

#### 例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // オランダ語を言語として使用
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```
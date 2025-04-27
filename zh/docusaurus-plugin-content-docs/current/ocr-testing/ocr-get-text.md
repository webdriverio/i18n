---
id: ocr-get-text
title: ocrGetText
---

获取图像上的文本。

### 使用方法

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## 输出

### 结果

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### 日志

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## 选项

### `contrast`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `0.25`

对比度越高，图像越暗，反之亦然。这有助于在图像中查找文本。接受的值范围在 `-1` 和 `1` 之间。

#### 示例

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **类型:** `number`
-   **必填:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

这是屏幕上OCR需要查找文本的搜索区域。可以是一个元素或包含 `x`、`y`、`width` 和 `height` 的矩形。

#### 示例

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// 或者
await browser.ocrGetText({ haystack: await $("elementSelector") });

// 或者
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

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** `eng`

Tesseract将识别的语言。更多信息可以在[这里](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)找到，支持的语言可以在[这里](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)找到。

#### 示例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // 使用荷兰语作为语言
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```
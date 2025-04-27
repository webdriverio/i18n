---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

等待屏幕上显示特定文本。

## 使用方法

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## 输出

### 日志

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## 选项

### `text`

-   **类型：** `string`
-   **必填：** 是

您要搜索并点击的文本。

#### 示例

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **类型：** `number`
-   **必填：** 否
-   **默认值：** 18000（18秒）

超时时间（毫秒）。请注意，OCR处理可能需要一些时间，所以不要设置得太低。

#### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 等待25秒
});
```

### `timeoutMsg`

-   **类型：** `string`
-   **必填：** 否
-   **默认值：** `Could not find the text "{selector}" within the requested time.`

覆盖默认错误消息。

#### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **类型：** `number`
-   **必填：** 否
-   **默认值：** `0.25`

对比度越高，图像越暗，反之亦然。这可以帮助在图像中找到文本。接受-1到1之间的值。

#### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **类型：** `number`
-   **必填：** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

这是屏幕中OCR需要查找文本的搜索区域。可以是元素或包含`x`、`y`、`width`和`height`的矩形。

#### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// 或者
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// 或者
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

-   **类型：** `string`
-   **必填：** 否
-   **默认值：** `eng`

Tesseract将识别的语言。更多信息可以在[这里](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)找到，支持的语言可以在[这里](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)找到。

#### 示例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // 使用荷兰语作为语言
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

您可以通过以下选项改变模糊逻辑以找到文本。这可能有助于找到更好的匹配。

#### `fuzzyFindOptions.distance`

-   **类型：** `number`
-   **必填：** 否
-   **默认值：** 100

确定匹配必须与模糊位置（由location指定）的接近程度。距离模糊位置为distance字符的精确字母匹配将被评分为完全不匹配。距离为0要求匹配位于指定的确切位置。使用0.8的阈值，距离为1000将要求完美匹配在位置800个字符内才能被找到。

##### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **类型：** `number`
-   **必填：** 否
-   **默认值：** 0

确定模式预计在文本中大约的位置。

##### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **类型：** `number`
-   **必填：** 否
-   **默认值：** 0.6

匹配算法在什么阈值放弃。阈值为0要求完全匹配（字母和位置都要匹配），阈值为1.0将匹配任何内容。

##### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **类型：** `boolean`
-   **必填：** 否
-   **默认值：** false

搜索是否区分大小写。

##### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **类型：** `number`
-   **必填：** 否
-   **默认值：** 2

只返回长度超过此值的匹配项。（例如，如果您想在结果中忽略单字符匹配，请将其设置为2）

##### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **类型：** `number`
-   **必填：** 否
-   **默认值：** false

当为`true`时，即使已经在字符串中找到完美匹配，匹配函数也将继续到搜索模式的末尾。

##### 示例

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
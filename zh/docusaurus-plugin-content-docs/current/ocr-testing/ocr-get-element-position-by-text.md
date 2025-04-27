---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

获取屏幕上文本的位置。该命令将搜索提供的文本，并尝试基于[Fuse.js](https://fusejs.io/)的模糊逻辑找到匹配项。这意味着即使你提供的选择器有拼写错误，或找到的文本可能不是100%匹配，它仍会尝试返回一个元素。请参阅下方的[日志](#logs)。

## 用法

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## 输出

### 结果

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

### 日志

```log
# 即使我们搜索的是"Start3d"，而找到的文本是"Started"，仍然找到了匹配项
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## 选项

### `text`

- **类型：** `string`
- **必填：** 是

你想要搜索并点击的文本。

#### 示例

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

- **类型：** `number`
- **必填：** 否
- **默认值：** `0.25`

对比度越高，图像越暗，反之亦然。这有助于在图像中找到文本。接受-1到1之间的值。

#### 示例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

- **类型：** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`
- **必填：** 否

这是屏幕中OCR需要查找文本的搜索区域。可以是元素或包含`x`、`y`、`width`和`height`的矩形。

#### 示例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// 或
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// 或
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

- **类型：** `string`
- **必填：** 否
- **默认值：** `eng`

Tesseract将识别的语言。更多信息可以在[这里](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)找到，支持的语言可以在[这里](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)找到。

#### 示例

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // 使用荷兰语作为语言
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

你可以通过以下选项更改查找文本的模糊逻辑。这可能有助于找到更好的匹配

#### `fuzzyFindOptions.distance`

- **类型：** `number`
- **必填：** 否
- **默认值：** 100

确定匹配必须与模糊位置（由location指定）的接近程度。距离模糊位置有distance个字符的精确字母匹配将被评分为完全不匹配。距离为0要求匹配必须在指定的精确位置。距离为1000，使用0.8的阈值时，要求完美匹配必须在位置的800个字符内才能被找到。

##### 示例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

- **类型：** `number`
- **必填：** 否
- **默认值：** 0

大致确定模式预期在文本中的位置。

##### 示例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

- **类型：** `number`
- **必填：** 否
- **默认值：** 0.6

匹配算法在什么点放弃。阈值为0需要完美匹配（字母和位置都匹配），阈值为1.0将匹配任何内容。

##### 示例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

- **类型：** `boolean`
- **必填：** 否
- **默认值：** false

搜索是否区分大小写。

##### 示例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

- **类型：** `number`
- **必填：** 否
- **默认值：** 2

只返回长度超过此值的匹配项。（例如，如果你想在结果中忽略单个字符的匹配，请将其设置为2）

##### 示例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

- **类型：** `number`
- **必填：** 否
- **默认值：** false

当为`true`时，即使已经在字符串中找到完美匹配，匹配函数也会继续到搜索模式的末尾。

##### 示例

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
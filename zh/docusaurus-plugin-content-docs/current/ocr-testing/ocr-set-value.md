---
id: ocr-set-value
title: ocrSetValue
---

向元素发送一系列按键。它将：

-   自动检测元素
-   通过点击元素将焦点放在字段上
-   在字段中设置值

该命令将搜索提供的文本，并尝试基于[Fuse.js](https://fusejs.io/)的模糊逻辑找到匹配项。这意味着即使你提供的选择器有拼写错误，或找到的文本可能不是100%匹配，它仍会尝试返回一个元素。请参见下面的[日志](#logs)。

## 用法

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## 输出

### 日志

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## 选项

### `text`

-   **类型:** `string`
-   **必填:** 是

你想要搜索并点击的文本。

#### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **类型:** `string`
-   **必填:** 是

要添加的值。

#### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`

如果值还需要提交到输入字段。这意味着在字符串结尾会发送一个"ENTER"键。

#### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `500` 毫秒

这是点击的持续时间。如果需要，你也可以通过增加时间来创建"长按点击"。

#### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // 这是3秒
});
```

### `contrast`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `0.25`

对比度越高，图像越暗，反之亦然。这可以帮助在图像中找到文本。它接受`-1`和`1`之间的值。

#### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **类型:** `number`
-   **必填:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

这是屏幕中OCR需要查找文本的搜索区域。可以是元素或包含`x`、`y`、`width`和`height`的矩形。

#### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// 或
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// 或
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // 使用荷兰语作为语言
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **类型:** `object`
-   **必填:** 否

你可以相对于匹配元素在屏幕上点击。这可以基于相对像素在匹配元素的`above`、`right`、`below`或`left`位置进行。

:::note

允许以下组合：

-   单个属性
-   `above` + `left` 或 `above` + `right`
-   `below` + `left` 或 `below` + `right`

以下组合**不**允许：

-   `above` 加 `below`
-   `left` 加 `right`

:::

#### `relativePosition.above`

-   **类型:** `number`
-   **必填:** 否

在匹配元素上方x像素点击。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **类型:** `number`
-   **必填:** 否

在匹配元素右侧x像素点击。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **类型:** `number`
-   **必填:** 否

在匹配元素下方x像素点击。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **类型:** `number`
-   **必填:** 否

在匹配元素左侧x像素点击。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

你可以通过以下选项更改查找文本的模糊逻辑。这可能有助于找到更好的匹配

#### `fuzzyFindOptions.distance`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** 100

确定匹配项必须与模糊位置（由location指定）的接近程度。距离模糊位置一定字符距离的精确字母匹配将被评分为完全不匹配。距离为0要求匹配必须在指定的精确位置。距离为1000在使用0.8的阈值时，会要求完美匹配在离位置800个字符内。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** 0

大致确定在文本中预期在哪里找到模式。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** 0.6

匹配算法在什么时候放弃。阈值为0需要完美匹配（字母和位置都要匹配），阈值为1.0将匹配任何内容。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** false

搜索是否应区分大小写。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** 2

只有长度超过此值的匹配项才会被返回。（例如，如果你想在结果中忽略单个字符的匹配，请将其设置为2）

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** false

当为`true`时，即使在字符串中已经找到完美匹配，匹配函数也会继续到搜索模式的末尾。

##### 示例

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
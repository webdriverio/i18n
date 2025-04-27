---
id: ocr-click-on-text
title: ocrClickOnText
---

基于提供的文本点击元素。该命令将搜索提供的文本，并尝试使用[Fuse.js](https://fusejs.io/)的模糊逻辑找到匹配项。这意味着即使你提供了带有拼写错误的选择器，或者找到的文本可能不是100%匹配，它仍然会尝试返回一个元素。查看下面的[日志](#logs)。

## Usage

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Output

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Image

你将在你的(默认)[`imagesFolder`](./getting-started#imagesfolder)中找到一张带有目标标记的图片，显示模块点击的位置。

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Options

### `text`

-   **Type:** `string`
-   **Mandatory:** yes

你要搜索并点击的文本。

#### Example

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `500` milliseconds

这是点击的持续时间。如果需要，你也可以通过增加时间来创建"长按点击"。

#### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

对比度越高，图像越暗，反之亦然。这可以帮助在图像中找到文本。它接受介于`-1`和`1`之间的值。

#### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

这是屏幕上OCR需要寻找文本的搜索区域。可以是一个元素或包含`x`、`y`、`width`和`height`的矩形。

#### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

Tesseract将识别的语言。更多信息可以在[这里](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)找到，支持的语言可以在[这里](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)找到。

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Type:** `object`
-   **Mandatory:** no

你可以相对于匹配元素在屏幕上点击。这可以基于匹配元素`上方`、`右侧`、`下方`或`左侧`的相对像素来完成。

:::note

允许以下组合：

-   单个属性
-   `above` + `left` 或 `above` + `right`
-   `below` + `left` 或 `below` + `right`

以下组合是**不**允许的：

-   `above` 加 `below`
-   `left` 加 `right`

:::

#### `relativePosition.above`

-   **Type:** `number`
-   **Mandatory:** no

在匹配元素`上方`点击x像素。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Type:** `number`
-   **Mandatory:** no

在匹配元素`右侧`点击x像素。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Type:** `number`
-   **Mandatory:** no

在匹配元素`下方`点击x像素。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Type:** `number`
-   **Mandatory:** no

在匹配元素`左侧`点击x像素。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

你可以通过以下选项调整查找文本的模糊逻辑。这可能有助于找到更好的匹配。

#### `fuzzyFindOptions.distance`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 100

确定匹配项必须与模糊位置（由location指定）有多接近。距离模糊位置distance个字符的精确字母匹配将被评分为完全不匹配。距离为0要求匹配在指定的精确位置。使用0.8的阈值，距离为1000将要求完美匹配在位置的800个字符内才能被找到。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0

大致确定在文本中预期在哪里找到模式。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0.6

匹配算法在什么点放弃。阈值为0需要完美匹配（字母和位置都匹配），阈值为1.0将匹配任何内容。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Type:** `boolean`
-   **Mandatory:** no
-   **Default:** false

搜索是否区分大小写。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 2

只返回长度超过此值的匹配项。（例如，如果你想在结果中忽略单个字符的匹配，将其设置为2）

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** false

当为`true`时，即使在字符串中已经找到完美匹配，匹配函数也会继续到搜索模式的末尾。

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
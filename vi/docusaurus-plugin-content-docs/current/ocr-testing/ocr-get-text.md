---
id: ocr-get-text
title: ocrGetText
---

Lấy văn bản từ hình ảnh.

### Usage

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Output

### Result

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Logs

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Options

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

Độ tương phản càng cao, hình ảnh càng tối và ngược lại. Điều này có thể giúp tìm văn bản trong hình ảnh. Nó chấp nhận các giá trị từ `-1` đến `1`.

#### Example

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Đây là vùng tìm kiếm trên màn hình nơi OCR cần tìm văn bản. Đây có thể là một phần tử hoặc một hình chữ nhật chứa `x`, `y`, `width` và `height`

#### Example

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// OR
await browser.ocrGetText({ haystack: await $("elementSelector") });

// OR
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

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

Ngôn ngữ mà Tesseract sẽ nhận dạng. Thông tin chi tiết hơn có thể được tìm thấy [tại đây](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) và các ngôn ngữ được hỗ trợ có thể được tìm thấy [tại đây](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```
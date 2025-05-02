---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Lấy vị trí của văn bản trên màn hình. Lệnh này sẽ tìm kiếm văn bản được cung cấp và cố gắng tìm một kết quả phù hợp dựa trên Logic Mờ từ [Fuse.js](https://fusejs.io/). Điều này có nghĩa là nếu bạn có thể cung cấp một bộ chọn có lỗi chính tả, hoặc văn bản tìm thấy có thể không khớp 100%, nó vẫn sẽ cố gắng trả về một phần tử. Xem [logs](#logs) bên dưới.

## Usage

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Output

### Result

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

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Options

### `text`

-   **Type:** `string`
-   **Mandatory:** yes

Văn bản bạn muốn tìm kiếm để nhấp vào.

#### Example

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

Độ tương phản càng cao, hình ảnh càng tối và ngược lại. Điều này có thể giúp tìm văn bản trong hình ảnh. Nó chấp nhận giá trị từ `-1` đến `1`.

#### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Đây là khu vực tìm kiếm trên màn hình nơi OCR cần tìm kiếm văn bản. Đây có thể là một phần tử hoặc một hình chữ nhật chứa `x`, `y`, `width` và `height`

#### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

Ngôn ngữ mà Tesseract sẽ nhận dạng. Thông tin thêm có thể được tìm thấy [tại đây](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) và các ngôn ngữ được hỗ trợ có thể được tìm thấy [tại đây](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Bạn có thể thay đổi logic mờ để tìm văn bản với các tùy chọn sau. Điều này có thể giúp tìm một kết quả phù hợp tốt hơn

#### `fuzzyFindOptions.distance`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 100

Xác định mức độ gần của kết quả phù hợp với vị trí mờ (được chỉ định bởi vị trí). Một chữ cái chính xác khớp cách vị trí mờ khoảng distance ký tự sẽ được tính là không khớp hoàn toàn. Khoảng cách 0 yêu cầu kết quả khớp phải ở đúng vị trí được chỉ định. Khoảng cách 1000 sẽ yêu cầu một kết quả khớp hoàn hảo phải nằm trong phạm vi 800 ký tự của vị trí để được tìm thấy bằng ngưỡng 0.8.

##### Example

```js
await browser.ocrGetElementPositionByText({
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

Xác định khoảng chừng vị trí trong văn bản nơi mẫu dự kiến sẽ được tìm thấy.

##### Example

```js
await browser.ocrGetElementPositionByText({
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

Điểm mà thuật toán khớp từ bỏ. Ngưỡng 0 yêu cầu khớp hoàn hảo (cả chữ cái và vị trí), ngưỡng 1.0 sẽ khớp bất kỳ thứ gì.

##### Example

```js
await browser.ocrGetElementPositionByText({
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

Liệu việc tìm kiếm có phân biệt chữ hoa chữ thường hay không.

##### Example

```js
await browser.ocrGetElementPositionByText({
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

Chỉ những kết quả khớp có độ dài vượt quá giá trị này sẽ được trả về. (Ví dụ: nếu bạn muốn bỏ qua các kết quả khớp một ký tự trong kết quả, hãy đặt nó thành 2)

##### Example

```js
await browser.ocrGetElementPositionByText({
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

Khi `true`, hàm khớp sẽ tiếp tục đến cuối mẫu tìm kiếm ngay cả khi đã tìm thấy một kết quả khớp hoàn hảo trong chuỗi.

##### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
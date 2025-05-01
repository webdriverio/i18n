---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Đợi cho một văn bản cụ thể được hiển thị trên màn hình.

## Cách sử dụng

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Kết quả

### Logs

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Tùy chọn

### `text`

-   **Kiểu:** `string`
-   **Bắt buộc:** có

Văn bản bạn muốn tìm kiếm để nhấp vào.

#### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 18000 (18 giây)

Thời gian tính bằng mili giây. Lưu ý rằng quá trình OCR có thể mất một khoảng thời gian, vì vậy đừng đặt quá thấp.

#### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // đợi trong 25 giây
});
```

### `timeoutMsg`

-   **Kiểu:** `string`
-   **Bắt buộc:** không
-   **Mặc định:** `Could not find the text "{selector}" within the requested time.`

Ghi đè thông báo lỗi mặc định.

#### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** `0.25`

Độ tương phản càng cao, hình ảnh càng tối và ngược lại. Điều này có thể giúp tìm văn bản trong hình ảnh. Nó chấp nhận giá trị từ `-1` đến `1`.

#### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Kiểu:** `number`
-   **Bắt buộc:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Đây là khu vực tìm kiếm trên màn hình nơi OCR cần tìm văn bản. Nó có thể là một phần tử hoặc một hình chữ nhật chứa `x`, `y`, `width` và `height`

#### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// HOẶC
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// HOẶC
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

-   **Kiểu:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** `eng`

Ngôn ngữ mà Tesseract sẽ nhận dạng. Thông tin thêm có thể được tìm thấy [tại đây](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) và các ngôn ngữ được hỗ trợ có thể được tìm thấy [tại đây](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Ví dụ

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Sử dụng tiếng Hà Lan làm ngôn ngữ
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Bạn có thể thay đổi logic mờ để tìm văn bản với các tùy chọn sau. Điều này có thể giúp tìm kết quả phù hợp hơn

#### `fuzzyFindOptions.distance`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 100

Xác định mức độ gần của kết quả phù hợp đến vị trí mờ (được chỉ định bởi vị trí). Một kết quả khớp chính xác của chữ cái cách xa vị trí mờ các ký tự sẽ được tính là không khớp hoàn toàn. Khoảng cách 0 yêu cầu kết quả phải ở đúng vị trí được chỉ định. Khoảng cách 1000 sẽ yêu cầu kết quả khớp hoàn hảo phải nằm trong phạm vi 800 ký tự của vị trí để được tìm thấy sử dụng ngưỡng 0.8.

##### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 0

Xác định khoảng vị trí trong văn bản mà dự kiến mẫu sẽ được tìm thấy.

##### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 0.6

Tại điểm nào thuật toán khớp từ bỏ. Ngưỡng 0 yêu cầu khớp hoàn hảo (cả chữ cái và vị trí), ngưỡng 1.0 sẽ khớp với bất kỳ thứ gì.

##### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Kiểu:** `boolean`
-   **Bắt buộc:** không
-   **Mặc định:** false

Tìm kiếm có phân biệt chữ hoa chữ thường hay không.

##### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 2

Chỉ những kết quả khớp có độ dài vượt quá giá trị này sẽ được trả về. (Ví dụ, nếu bạn muốn bỏ qua kết quả khớp một ký tự trong kết quả, hãy đặt thành 2)

##### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** false

Khi `true`, hàm khớp sẽ tiếp tục đến cuối mẫu tìm kiếm ngay cả khi đã tìm thấy kết quả khớp hoàn hảo trong chuỗi.

##### Ví dụ

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
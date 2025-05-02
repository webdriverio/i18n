---
id: ocr-set-value
title: ocrSetValue
---

Gửi một chuỗi phím nhấn đến một phần tử. Nó sẽ:

-   tự động phát hiện phần tử
-   đặt focus vào trường bằng cách nhấp vào nó
-   thiết lập giá trị cho trường

Lệnh sẽ tìm kiếm văn bản được cung cấp và cố gắng tìm kết quả phù hợp dựa trên Logic Mờ từ [Fuse.js](https://fusejs.io/). Điều này có nghĩa là nếu bạn cung cấp một bộ chọn có lỗi chính tả, hoặc văn bản được tìm thấy có thể không khớp 100%, nó vẫn sẽ cố gắng trả lại một phần tử. Xem [logs](#logs) bên dưới.

## Cách sử dụng

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Đầu ra

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Tùy chọn

### `text`

-   **Kiểu:** `string`
-   **Bắt buộc:** có

Văn bản bạn muốn tìm kiếm để nhấp vào.

#### Ví dụ

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Kiểu:** `string`
-   **Bắt buộc:** có

Giá trị được thêm vào.

#### Ví dụ

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Kiểu:** `boolean`
-   **Bắt buộc:** không
-   **Mặc định:** `false`

Nếu giá trị cũng cần được gửi vào trường nhập liệu. Điều này có nghĩa là phím "ENTER" sẽ được gửi ở cuối chuỗi.

#### Ví dụ

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** `500` mili giây

Đây là thời lượng của cú nhấp chuột. Nếu muốn, bạn cũng có thể tạo một "nhấp chuột kéo dài" bằng cách tăng thời gian.

#### Ví dụ

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Đây là 3 giây
});
```

### `contrast`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** `0.25`

Độ tương phản càng cao, hình ảnh càng tối và ngược lại. Điều này có thể giúp tìm văn bản trong hình ảnh. Nó chấp nhận giá trị từ `-1` đến `1`.

#### Ví dụ

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Kiểu:** `number`
-   **Bắt buộc:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Đây là khu vực tìm kiếm trên màn hình nơi OCR cần tìm văn bản. Đây có thể là một phần tử hoặc hình chữ nhật có chứa `x`, `y`, `width` và `height`

#### Ví dụ

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// HOẶC
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// HOẶC
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

-   **Kiểu:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** `eng`

Ngôn ngữ mà Tesseract sẽ nhận dạng. Thông tin thêm có thể được tìm thấy [tại đây](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) và các ngôn ngữ được hỗ trợ có thể được tìm thấy [tại đây](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Ví dụ

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Sử dụng tiếng Hà Lan làm ngôn ngữ
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Kiểu:** `object`
-   **Bắt buộc:** không

Bạn có thể nhấp vào màn hình tương đối với phần tử phù hợp. Điều này có thể được thực hiện dựa trên pixel tương đối `above`, `right`, `below` hoặc `left` từ phần tử phù hợp

:::note

Các kết hợp sau được cho phép

-   thuộc tính đơn
-   `above` + `left` hoặc `above` + `right`
-   `below` + `left` hoặc `below` + `right`

Các kết hợp sau **KHÔNG** được phép

-   `above` cùng với `below`
-   `left` cùng với `right`

:::

#### `relativePosition.above`

-   **Kiểu:** `number`
-   **Bắt buộc:** không

Nhấp x pixel `phía trên` phần tử phù hợp.

##### Ví dụ

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

-   **Kiểu:** `number`
-   **Bắt buộc:** không

Nhấp x pixel `bên phải` phần tử phù hợp.

##### Ví dụ

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

-   **Kiểu:** `number`
-   **Bắt buộc:** không

Nhấp x pixel `phía dưới` phần tử phù hợp.

##### Ví dụ

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

-   **Kiểu:** `number`
-   **Bắt buộc:** không

Nhấp x pixel `bên trái` phần tử phù hợp.

##### Ví dụ

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

Bạn có thể thay đổi logic mờ để tìm văn bản với các tùy chọn sau. Điều này có thể giúp tìm kiếm kết quả phù hợp tốt hơn

#### `fuzzyFindOptions.distance`

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 100

Xác định mức độ gần với vị trí mờ (được chỉ định bởi location). Một ký tự khớp chính xác cách vị trí mờ khoảng bằng số ký tự distance sẽ được tính là không khớp hoàn toàn. Khoảng cách 0 yêu cầu phải khớp chính xác tại vị trí đã chỉ định. Khoảng cách 1000 sẽ yêu cầu một kết quả khớp hoàn hảo phải nằm trong phạm vi 800 ký tự của vị trí để được tìm thấy bằng ngưỡng 0.8.

##### Ví dụ

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

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 0

Xác định gần đúng vị trí trong văn bản mà mẫu được kỳ vọng sẽ được tìm thấy.

##### Ví dụ

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

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 0.6

Tại điểm nào thuật toán so khớp sẽ từ bỏ. Ngưỡng 0 yêu cầu khớp hoàn hảo (cả ký tự và vị trí), ngưỡng 1.0 sẽ khớp với bất kỳ thứ gì.

##### Ví dụ

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

-   **Kiểu:** `boolean`
-   **Bắt buộc:** không
-   **Mặc định:** false

Xác định việc tìm kiếm có phân biệt chữ hoa chữ thường hay không.

##### Ví dụ

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

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 2

Chỉ các kết quả khớp có độ dài vượt quá giá trị này sẽ được trả về. (Ví dụ, nếu bạn muốn bỏ qua các kết quả khớp một ký tự trong kết quả, hãy đặt là 2)

##### Ví dụ

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

-   **Kiểu:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** false

Khi `true`, hàm so khớp sẽ tiếp tục đến cuối mẫu tìm kiếm ngay cả khi đã tìm thấy một kết quả khớp hoàn hảo trong chuỗi.

##### Ví dụ

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
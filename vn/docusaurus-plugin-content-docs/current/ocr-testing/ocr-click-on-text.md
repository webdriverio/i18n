---
id: ocr-click-on-text
title: ocrClickOnText
---

Click vào một phần tử dựa trên văn bản được cung cấp. Lệnh này sẽ tìm kiếm văn bản được cung cấp và cố gắng tìm một kết quả phù hợp dựa trên Logic Mờ từ [Fuse.js](https://fusejs.io/). Điều này có nghĩa là nếu bạn cung cấp một bộ chọn có lỗi chính tả, hoặc văn bản tìm thấy có thể không khớp 100%, nó vẫn sẽ cố gắng trả về một phần tử. Xem [nhật ký](#logs) bên dưới.

## Cách sử dụng

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Kết quả

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Hình ảnh

Bạn sẽ tìm thấy một hình ảnh trong thư mục (mặc định)[`imagesFolder`](./getting-started#imagesfolder) với một mục tiêu để hiển thị nơi mà module đã nhấp vào.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Tùy chọn

### `text`

-   **Loại:** `string`
-   **Bắt buộc:** có

Văn bản bạn muốn tìm kiếm để nhấp vào.

#### Ví dụ

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Loại:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** `500` mili giây

Đây là thời gian của thao tác nhấp. Nếu muốn, bạn cũng có thể tạo một "nhấp dài" bằng cách tăng thời gian.

#### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Đây là 3 giây
});
```

### `contrast`

-   **Loại:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** `0.25`

Độ tương phản càng cao, hình ảnh càng tối và ngược lại. Điều này có thể giúp tìm văn bản trong hình ảnh. Nó chấp nhận giá trị từ `-1` đến `1`.

#### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Loại:** `number`
-   **Bắt buộc:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Đây là khu vực tìm kiếm trên màn hình nơi OCR cần tìm kiếm văn bản. Đây có thể là một phần tử hoặc một hình chữ nhật chứa `x`, `y`, `width` và `height`

#### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// HOẶC
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// HOẶC
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

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** `eng`

Ngôn ngữ mà Tesseract sẽ nhận dạng. Thông tin thêm có thể được tìm thấy [tại đây](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) và các ngôn ngữ được hỗ trợ có thể được tìm thấy [tại đây](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Ví dụ

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Sử dụng tiếng Hà Lan làm ngôn ngữ
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Loại:** `object`
-   **Bắt buộc:** không

Bạn có thể nhấp vào màn hình tương đối với phần tử khớp. Điều này có thể được thực hiện dựa trên pixel tương đối `above`, `right`, `below` hoặc `left` từ phần tử khớp

:::note

Các kết hợp sau được cho phép

-   thuộc tính đơn lẻ
-   `above` + `left` hoặc `above` + `right`
-   `below` + `left` hoặc `below` + `right`

Các kết hợp sau **KHÔNG** được phép

-   `above` cộng với `below`
-   `left` cộng với `right`

:::

#### `relativePosition.above`

-   **Loại:** `number`
-   **Bắt buộc:** không

Nhấp x pixel `above` phần tử khớp.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Loại:** `number`
-   **Bắt buộc:** không

Nhấp x pixel `right` từ phần tử khớp.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Loại:** `number`
-   **Bắt buộc:** không

Nhấp x pixel `below` phần tử khớp.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Loại:** `number`
-   **Bắt buộc:** không

Nhấp x pixel `left` từ phần tử khớp.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Bạn có thể thay đổi logic mờ để tìm văn bản với các tùy chọn sau. Điều này có thể giúp tìm một kết quả khớp tốt hơn

#### `fuzzyFindOptions.distance`

-   **Loại:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 100

Xác định mức độ gần của kết quả khớp với vị trí mờ (được chỉ định bởi location). Một chữ cái khớp chính xác cách vị trí mờ một khoảng distance ký tự sẽ được tính là không khớp hoàn toàn. Một khoảng cách 0 yêu cầu kết quả khớp phải ở đúng vị trí được chỉ định. Một khoảng cách 1000 sẽ yêu cầu một kết quả khớp hoàn hảo phải nằm trong phạm vi 800 ký tự của vị trí để được tìm thấy bằng cách sử dụng ngưỡng 0.8.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Loại:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 0

Xác định xấp xỉ vị trí trong văn bản mà mẫu được dự kiến sẽ được tìm thấy.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Loại:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 0.6

Tại thời điểm nào thuật toán khớp từ bỏ. Một ngưỡng 0 yêu cầu kết quả khớp hoàn hảo (cả chữ cái và vị trí), một ngưỡng 1.0 sẽ khớp với bất kỳ thứ gì.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Loại:** `boolean`
-   **Bắt buộc:** không
-   **Mặc định:** false

Xác định liệu việc tìm kiếm có phân biệt chữ hoa chữ thường hay không.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Loại:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** 2

Chỉ những kết quả khớp có độ dài vượt quá giá trị này sẽ được trả về. (Ví dụ, nếu bạn muốn bỏ qua các kết quả khớp một ký tự trong kết quả, hãy đặt nó thành 2)

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Loại:** `number`
-   **Bắt buộc:** không
-   **Mặc định:** false

Khi `true`, chức năng khớp sẽ tiếp tục đến cuối mẫu tìm kiếm ngay cả khi đã tìm thấy một kết quả khớp hoàn hảo trong chuỗi.

##### Ví dụ

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
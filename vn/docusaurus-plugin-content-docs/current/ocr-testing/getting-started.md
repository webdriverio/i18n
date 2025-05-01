---
id: getting-started
title: Bắt Đầu
---

## Installation

Cách dễ nhất là giữ `@wdio/ocr-service` như một dependency trong tệp `package.json` của bạn.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Hướng dẫn cách cài đặt `WebdriverIO` có thể được tìm thấy [tại đây.](../gettingstarted)

:::note
Module này sử dụng Tesseract làm engine OCR. Mặc định, nó sẽ kiểm tra xem bạn đã cài đặt Tesseract cục bộ trên hệ thống của mình chưa, nếu có, nó sẽ sử dụng phiên bản đó. Nếu không, nó sẽ sử dụng module [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) được cài đặt tự động cho bạn.

Nếu bạn muốn tăng tốc độ xử lý hình ảnh, lời khuyên là sử dụng phiên bản Tesseract được cài đặt cục bộ. Xem thêm [Thời gian thực thi kiểm thử](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Hướng dẫn cách cài đặt Tesseract như một dependency hệ thống trên máy tính cục bộ của bạn có thể được tìm thấy [tại đây](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
Đối với các câu hỏi/lỗi khi cài đặt Tesseract, vui lòng tham khảo dự án [Tesseract](https://github.com/tesseract-ocr/tesseract).
:::

## Hỗ trợ Typescript

Đảm bảo rằng bạn thêm `@wdio/ocr-service` vào tệp cấu hình `tsconfig.json` của bạn.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Cấu hình

Để sử dụng dịch vụ này, bạn cần thêm `ocr` vào mảng services trong `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // your other services
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### Tùy chọn cấu hình

#### `contrast`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `0.25`

Độ tương phản càng cao, hình ảnh càng tối và ngược lại. Điều này có thể giúp tìm văn bản trong hình ảnh. Nó chấp nhận giá trị từ `-1` đến `1`.

#### `imagesFolder`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** `{project-root}/.tmp/ocr`

Thư mục nơi lưu trữ kết quả OCR.

:::note
Nếu bạn cung cấp một `imagesFolder` tùy chỉnh, thì dịch vụ sẽ tự động thêm thư mục con `ocr` vào nó.
:::

#### `language`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** `eng`

Ngôn ngữ mà Tesseract sẽ nhận dạng. Thông tin thêm có thể được tìm thấy [tại đây](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) và các ngôn ngữ được hỗ trợ có thể được tìm thấy [tại đây](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

## Logs

Module này sẽ tự động thêm các log bổ sung vào log của WebdriverIO. Nó ghi vào log `INFO` và `WARN` với tên `@wdio/ocr-service`.
Các ví dụ có thể được tìm thấy dưới đây.

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```
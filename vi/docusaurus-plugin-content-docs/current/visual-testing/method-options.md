---
id: method-options
title: Tùy Chọn Phương Thức
---

Tùy chọn phương thức là các tùy chọn có thể được thiết lập cho từng [phương thức](./methods). Nếu tùy chọn có cùng khóa với một tùy chọn đã được thiết lập trong quá trình khởi tạo plugin, tùy chọn phương thức này sẽ ghi đè giá trị tùy chọn plugin.

## Tùy Chọn Lưu

### `disableBlinkingCursor`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview)

Bật/Tắt tất cả con trỏ "nhấp nháy" trong các phần tử `input`, `textarea`, `[contenteditable]` trong ứng dụng. Nếu được đặt thành `true`, con trỏ sẽ được đặt thành `transparent` trước khi chụp ảnh
và khôi phục khi hoàn tất

### `disableCSSAnimation`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview)

Bật/Tắt tất cả hoạt ảnh CSS trong ứng dụng. Nếu được đặt thành `true`, tất cả hoạt ảnh sẽ bị vô hiệu hóa trước khi chụp ảnh
và khôi phục khi hoàn tất

### `enableLegacyScreenshotMethod`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview)

Sử dụng tùy chọn này để quay lại phương thức chụp ảnh "cũ hơn" dựa trên giao thức W3C-WebDriver. Điều này có thể hữu ích nếu bài kiểm tra của bạn phụ thuộc vào hình ảnh cơ sở hiện có hoặc nếu bạn đang chạy trong môi trường không hỗ trợ đầy đủ chụp ảnh dựa trên BiDi mới hơn.
Lưu ý rằng việc bật tính năng này có thể tạo ra ảnh chụp có độ phân giải hoặc chất lượng hơi khác.

### `enableLayoutTesting`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Sử dụng với:** Tất cả [phương thức](./methods)
-   **Hỗ trợ:** Web

Điều này sẽ ẩn tất cả văn bản trên trang để chỉ bố cục được sử dụng để so sánh. Việc ẩn sẽ được thực hiện bằng cách thêm kiểu `'color': 'transparent !important'` vào __mỗi__ phần tử.

Để biết đầu ra, xem [Kết quả kiểm tra](./test-output#enablelayouttesting)

:::info
Khi sử dụng cờ này, mỗi phần tử chứa văn bản (không chỉ `p, h1, h2, h3, h4, h5, h6, span, a, li`, mà còn cả `div|button|..`) sẽ nhận thuộc tính này. __Không__ có tùy chọn để điều chỉnh điều này.
:::

### `hideScrollBars`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`
-   **Sử dụng với:** Tất cả [phương thức](./methods)
-   **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview)

Ẩn thanh cuộn trong ứng dụng. Nếu được đặt thành true, tất cả thanh cuộn sẽ bị vô hiệu hóa trước khi chụp ảnh. Điều này được đặt mặc định là `true` để ngăn ngừa các vấn đề phát sinh.

### `hideElements`

-   **Loại:** `array`
-   **Bắt buộc:** không
-   **Sử dụng với:** Tất cả [phương thức](./methods)
-   **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Phương thức này có thể ẩn 1 hoặc nhiều phần tử bằng cách thêm thuộc tính `visibility: hidden` vào chúng bằng cách cung cấp một mảng các phần tử.

### `removeElements`

-   **Loại:** `array`
-   **Bắt buộc:** không
-   **Sử dụng với:** Tất cả [phương thức](./methods)
-   **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Phương thức này có thể _xóa_ 1 hoặc nhiều phần tử bằng cách thêm thuộc tính `display: none` vào chúng bằng cách cung cấp một mảng các phần tử.

### `resizeDimensions`

-   **Loại:** `object`
-   **Bắt buộc:** không
-   **Mặc định:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Sử dụng với:** Chỉ dành cho [`saveElement`](./methods#saveelement) hoặc [`checkElement`](./methods#checkelement)
-   **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Một đối tượng cần chứa số lượng pixel `top`, `right`, `bottom` và `left` cần thiết để làm cho vùng cắt phần tử lớn hơn.

### `userBasedFullPageScreenshot`

* **Loại:** `boolean`
* **Bắt buộc:** Không
* **Mặc định:** `false`
* **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview)

Khi được đặt thành `true`, tùy chọn này kích hoạt **chiến lược cuộn và ghép** để chụp ảnh toàn trang.
Thay vì sử dụng khả năng chụp ảnh gốc của trình duyệt, nó cuộn qua trang thủ công và ghép nhiều ảnh chụp lại với nhau.
Phương pháp này đặc biệt hữu ích cho các trang có **nội dung tải lười (lazy-loaded)** hoặc bố cục phức tạp yêu cầu cuộn để hiển thị đầy đủ.

### `fullPageScrollTimeout`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `1500`
-   **Sử dụng với:** Chỉ dành cho [`saveFullPageScreen`](./methods#savefullpagescreen) hoặc [`saveTabbablePage`](./methods#savetabbablepage)
-   **Hỗ trợ:** Web

Thời gian chờ tính bằng mili giây sau mỗi lần cuộn. Điều này có thể giúp xác định các trang có tính năng tải lười.

> **LƯU Ý:** Điều này chỉ hoạt động khi `userBasedFullPageScreenshot` được đặt thành `true`

### `hideAfterFirstScroll`

-   **Loại:** `array`
-   **Bắt buộc:** không
-   **Sử dụng với:** Chỉ dành cho [`saveFullPageScreen`](./methods#savefullpagescreen) hoặc [`saveTabbablePage`](./methods#savetabbablepage)
-   **Hỗ trợ:** Web

Phương thức này sẽ ẩn một hoặc nhiều phần tử bằng cách thêm thuộc tính `visibility: hidden` vào chúng bằng cách cung cấp một mảng các phần tử.
Điều này sẽ hữu ích khi một trang ví dụ chứa các phần tử cố định sẽ cuộn theo trang nếu trang được cuộn nhưng sẽ tạo ra hiệu ứng khó chịu khi chụp ảnh toàn trang

> **LƯU Ý:** Điều này chỉ hoạt động khi `userBasedFullPageScreenshot` được đặt thành `true`

### `waitForFontsLoaded`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`
-   **Sử dụng với:** Tất cả [phương thức](./methods)
-   **Hỗ trợ:** Web, Ứng dụng Hybrid (Webview)

Phông chữ, bao gồm cả phông chữ của bên thứ ba, có thể được tải đồng bộ hoặc bất đồng bộ. Tải bất đồng bộ có nghĩa là phông chữ có thể tải sau khi WebdriverIO xác định rằng trang đã tải xong. Để ngăn các vấn đề về hiển thị phông chữ, module này, theo mặc định, sẽ chờ tất cả phông chữ được tải trước khi chụp ảnh.

## Tùy Chọn So Sánh (Kiểm Tra)

Tùy chọn so sánh là các tùy chọn ảnh hưởng đến cách thức so sánh, thông qua [ResembleJS](https://github.com/Huddle/Resemble.js), được thực hiện.

:::info LƯU Ý

-   Tất cả tùy chọn từ [Tùy Chọn Lưu](#tùy-chọn-lưu) có thể được sử dụng cho các phương thức So sánh
-   Tất cả tùy chọn so sánh có thể được sử dụng trong quá trình khởi tạo dịch vụ __hoặc__ cho từng phương thức kiểm tra cụ thể. Nếu một tùy chọn phương thức có cùng khóa với một tùy chọn đã được thiết lập trong quá trình khởi tạo dịch vụ, thì tùy chọn so sánh phương thức sẽ ghi đè giá trị tùy chọn so sánh dịch vụ.
- Tất cả tùy chọn có thể được sử dụng cho:
    - Web
    - Ứng dụng Hybrid
    - Ứng dụng Native

:::

### `ignoreAlpha`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** không

So sánh hình ảnh và bỏ qua alpha.

### `blockOutSideBar`

-   **Loại:** `boolean`
-   **Mặc định:** `true`
-   **Bắt buộc:** không
-   **Ghi chú:** _Chỉ có thể được sử dụng cho `checkScreen()`. Đây là **chỉ dành cho iPad**_

Tự động chặn thanh bên cho iPad ở chế độ ngang trong quá trình so sánh. Điều này ngăn ngừa lỗi trên thành phần gốc tab/private/bookmark.

### `blockOutStatusBar`

-   **Loại:** `boolean`
-   **Mặc định:** `true`
-   **Bắt buộc:** không
-   **Ghi chú:** _Đây là **chỉ dành cho Di động**_

Tự động chặn thanh trạng thái và thanh địa chỉ trong quá trình so sánh. Điều này ngăn ngừa lỗi về thời gian, wifi hoặc trạng thái pin.

### `blockOutToolBar`

-   **Loại:** `boolean`
-   **Mặc định:** `true`
-   **Bắt buộc:** không
-   **Ghi chú:** _Đây là **chỉ dành cho Di động**_

Tự động chặn thanh công cụ.

### `ignoreAntialiasing`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** không

So sánh hình ảnh và bỏ qua chống răng cưa.

### `ignoreColors`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** không

Mặc dù hình ảnh là màu, việc so sánh sẽ so sánh 2 hình ảnh đen/trắng

### `ignoreLess`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** không

So sánh hình ảnh và so sánh với `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** không

So sánh hình ảnh và so sánh với `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** không

Nếu đúng, phần trăm trả về sẽ như `0.12345678`, mặc định là `0.12`

### `returnAllCompareData`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** không

Điều này sẽ trả về tất cả dữ liệu so sánh, không chỉ phần trăm không khớp

### `saveAboveTolerance`

-   **Loại:** `number`
-   **Mặc định:** `0`
-   **Bắt buộc:** không

Giá trị cho phép của `misMatchPercentage` ngăn lưu hình ảnh có sự khác biệt

### `largeImageThreshold`

-   **Loại:** `number`
-   **Mặc định:** `0`
-   **Bắt buộc:** không

So sánh hình ảnh lớn có thể dẫn đến vấn đề về hiệu suất.
Khi cung cấp một số cho số lượng pixel ở đây (cao hơn 0), thuật toán so sánh sẽ bỏ qua các pixel khi chiều rộng hoặc chiều cao của hình ảnh lớn hơn `largeImageThreshold` pixel.

### `scaleImagesToSameSize`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** không

Tỷ lệ 2 hình ảnh về cùng kích thước trước khi thực hiện so sánh. Rất khuyến khích bật `ignoreAntialiasing` và `ignoreAlpha`

## Tùy chọn thư mục

Thư mục cơ sở và các thư mục ảnh chụp (thực tế, khác biệt) là các tùy chọn có thể được thiết lập trong quá trình khởi tạo plugin hoặc phương thức. Để đặt tùy chọn thư mục cho một phương thức cụ thể, hãy truyền các tùy chọn thư mục vào đối tượng tùy chọn phương thức. Điều này có thể được sử dụng cho:

- Web
- Ứng dụng Hybrid
- Ứng dụng Native

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Bạn có thể sử dụng điều này cho tất cả các phương thức
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Loại:** `string`
-   **Bắt buộc:** không

Thư mục cho ảnh chụp đã được chụp trong bài kiểm tra.

### `baselineFolder`

-   **Loại:** `string`
-   **Bắt buộc:** không

Thư mục cho hình ảnh cơ sở được sử dụng để so sánh.

### `diffFolder`

-   **Loại:** `string`
-   **Bắt buộc:** không

Thư mục cho sự khác biệt hình ảnh được tạo ra bởi ResembleJS.
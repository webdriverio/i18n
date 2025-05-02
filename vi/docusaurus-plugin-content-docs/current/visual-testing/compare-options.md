---
id: compare-options
title: So sánh các tùy chọn
---

Các tùy chọn so sánh là những tùy chọn ảnh hưởng đến cách thức so sánh được thực hiện bởi [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info LƯU Ý
Tất cả các tùy chọn so sánh có thể được sử dụng trong quá trình khởi tạo dịch vụ hoặc cho từng phương thức `checkElement`, `checkScreen` và `checkFullPageScreen`. Nếu một tùy chọn của phương thức có cùng khóa với một tùy chọn đã được thiết lập trong quá trình khởi tạo dịch vụ, thì tùy chọn so sánh của phương thức sẽ ghi đè lên giá trị tùy chọn so sánh của dịch vụ.
:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

So sánh hình ảnh và bỏ qua alpha.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Chỉ có thể được sử dụng cho `checkScreen()`. Nó sẽ ghi đè cài đặt plugin. Điều này **chỉ dành cho iPad**_

Tự động chặn thanh bên cho iPad ở chế độ ngang trong quá trình so sánh. Điều này ngăn chặn lỗi trên thành phần tab/private/bookmark native.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin. Điều này **chỉ dành cho thiết bị di động**_

Tự động chặn thanh trạng thái và thanh địa chỉ trong quá trình so sánh. Điều này ngăn chặn lỗi về thời gian, wifi hoặc trạng thái pin.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin. Điều này **chỉ dành cho thiết bị di động**_

Tự động chặn thanh công cụ.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

So sánh hình ảnh và bỏ qua chống răng cưa.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

Mặc dù hình ảnh có màu, việc so sánh sẽ so sánh 2 hình ảnh đen/trắng

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

So sánh hình ảnh với `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

So sánh hình ảnh với `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

So sánh hình ảnh và bỏ qua tất cả các pixel có độ trong suốt trong một trong các hình ảnh

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

Nếu đúng, phần trăm trả về sẽ là `0.12345678`, mặc định là `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

Tùy chọn này sẽ trả về tất cả dữ liệu so sánh, không chỉ phần trăm không khớp

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

Giá trị cho phép của `misMatchPercentage` ngăn lưu hình ảnh có sự khác biệt

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

So sánh hình ảnh lớn có thể dẫn đến vấn đề về hiệu suất.
Khi cung cấp một số cho số lượng pixel ở đây (cao hơn 0), thuật toán so sánh sẽ bỏ qua các pixel khi chiều rộng hoặc chiều cao của hình ảnh lớn hơn `largeImageThreshold` pixel.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Cũng có thể được sử dụng cho `checkElement`, `checkScreen()` và `checkFullPageScreen()`. Nó sẽ ghi đè cài đặt plugin_

Tỷ lệ 2 hình ảnh về cùng kích thước trước khi thực hiện so sánh. Rất khuyến khích bật `ignoreAntialiasing` và `ignoreAlpha`
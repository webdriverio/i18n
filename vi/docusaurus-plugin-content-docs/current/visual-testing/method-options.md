---
id: method-options
title: Các Tùy Chọn Phương Thức
---

Các tùy chọn phương thức là những tùy chọn có thể được thiết lập cho từng [phương thức](./methods). Nếu tùy chọn có cùng khóa với một tùy chọn đã được thiết lập trong quá trình khởi tạo plugin, thì tùy chọn phương thức này sẽ ghi đè giá trị tùy chọn của plugin.

:::info LƯU Ý

-   Tất cả các tùy chọn từ [Save Options](#save-options) có thể được sử dụng cho các phương thức [Compare](#compare-check-options)
-   Tất cả các tùy chọn so sánh có thể được sử dụng trong quá trình khởi tạo dịch vụ __hoặc__ cho mỗi phương thức kiểm tra riêng lẻ. Nếu một tùy chọn phương thức có cùng khóa với một tùy chọn đã được thiết lập trong quá trình khởi tạo dịch vụ, thì tùy chọn so sánh phương thức sẽ ghi đè giá trị tùy chọn so sánh của dịch vụ.
- Tất cả các tùy chọn có thể được sử dụng cho các ngữ cảnh ứng dụng dưới đây trừ khi có ghi chú khác:
    - Web
    - Ứng dụng Hybrid
    - Ứng dụng Native
- Các ví dụ dưới đây sử dụng với các phương thức `save*`, nhưng cũng có thể được sử dụng với các phương thức `check*`

:::

## Save Options

### `disableBlinkingCursor`

- **Kiểu:** `boolean`
- **Bắt buộc:** Không
- **Mặc định:** `false`
- **Sử dụng với:** Tất cả [các phương thức](./methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Bật/Tắt hiệu ứng nhấp nháy của con trỏ trên tất cả `input`, `textarea`, `[contenteditable]` trong ứng dụng. Nếu được đặt thành `true`, con trỏ sẽ được đặt thành `transparent` trước khi chụp ảnh màn hình và được khôi phục khi hoàn tất.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Kiểu:** `boolean`
- **Bắt buộc:** Không
- **Mặc định:** `false`
- **Sử dụng với:** Tất cả [các phương thức](./methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Bật/Tắt tất cả các hoạt ảnh CSS trong ứng dụng. Nếu được đặt thành `true`, tất cả các hoạt ảnh sẽ bị vô hiệu hóa trước khi chụp ảnh màn hình và được khôi phục khi hoàn tất

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Kiểu:** `boolean`
- **Bắt buộc:** Không
- **Mặc định:** `false`
- **Sử dụng với:** Tất cả [các phương thức](./methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Sử dụng tùy chọn này để chuyển trở lại phương thức chụp màn hình "cũ hơn" dựa trên giao thức W3C-WebDriver. Điều này có thể hữu ích nếu các bài kiểm tra của bạn phụ thuộc vào hình ảnh cơ sở hiện có hoặc nếu bạn đang chạy trong môi trường không hỗ trợ đầy đủ ảnh chụp màn hình dựa trên BiDi mới hơn.
Lưu ý rằng việc bật tính năng này có thể tạo ra ảnh chụp màn hình với độ phân giải hoặc chất lượng hơi khác.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Kiểu:** `boolean`
- **Bắt buộc:** Không
- **Mặc định:** `false`
- **Sử dụng với:** Tất cả [các phương thức](./methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Điều này sẽ ẩn tất cả văn bản trên trang để chỉ bố cục được sử dụng để so sánh. Việc ẩn sẽ được thực hiện bằng cách thêm thuộc tính `'color': 'transparent !important'` vào __mỗi__ phần tử.

Đối với kết quả đầu ra, xem [Test Output](./test-output#enablelayouttesting).

:::info
Khi sử dụng cờ này, mỗi phần tử chứa văn bản (không chỉ `p, h1, h2, h3, h4, h5, h6, span, a, li`, mà còn `div|button|..`) sẽ nhận thuộc tính này. __Không__ có tùy chọn để điều chỉnh điều này.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **Kiểu:** `boolean`
- **Bắt buộc:** Không
- **Mặc định:** `true`
- **Sử dụng với:** Tất cả [các phương thức](./methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Ẩn thanh cuộn trong ứng dụng. Nếu được đặt thành true, tất cả (các) thanh cuộn sẽ bị vô hiệu hóa trước khi chụp ảnh màn hình. Điều này được đặt mặc định là `true` để ngăn ngừa các vấn đề phụ.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Kiểu:** `array`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức](./methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Phương thức này có thể ẩn 1 hoặc nhiều phần tử bằng cách thêm thuộc tính `visibility: hidden` vào chúng bằng cách cung cấp một mảng các phần tử.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `removeElements`

- **Kiểu:** `array`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức](./methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Phương thức này có thể _xóa_ 1 hoặc nhiều phần tử bằng cách thêm thuộc tính `display: none` vào chúng bằng cách cung cấp một mảng các phần tử.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `resizeDimensions`

- **Kiểu:** `object`
- **Bắt buộc:** Không
- **Mặc định:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Sử dụng với:** Chỉ dành cho [`saveElement`](./methods#saveelement) hoặc [`checkElement`](./methods#checkelement)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Một đối tượng cần chứa số lượng pixel `top`, `right`, `bottom` và `left` để làm cho phần cắt phần tử lớn hơn.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

### `userBasedFullPageScreenshot`

- **Kiểu:** `boolean`
- **Bắt buộc:** Không
- **Mặc định:** `false`
- **Sử dụng với:** Chỉ dành cho [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) hoặc [`checkTabbablePage`](./methods#checktabbablepage)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Khi được đặt thành `true`, tùy chọn này bật **chiến lược cuộn và ghép** để chụp ảnh màn hình toàn trang.
Thay vì sử dụng khả năng chụp màn hình gốc của trình duyệt, nó cuộn qua trang một cách thủ công và ghép nhiều ảnh chụp màn hình lại với nhau.
Phương pháp này đặc biệt hữu ích cho các trang có **nội dung tải lười** hoặc bố cục phức tạp cần phải cuộn để hiển thị đầy đủ.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Kiểu:** `number`
- **Bắt buộc:** Không
- **Mặc định:** `1500`
- **Sử dụng với:** Chỉ dành cho [`saveFullPageScreen`](./methods#savefullpagescreen) hoặc [`saveTabbablePage`](./methods#savetabbablepage)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Thời gian chờ tính bằng mili giây sau mỗi lần cuộn. Điều này có thể giúp xác định các trang có tính năng tải lười.

> **LƯU Ý:** Chỉ hoạt động khi `userBasedFullPageScreenshot` được đặt thành `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Kiểu:** `array`
- **Bắt buộc:** Không
- **Sử dụng với:** Chỉ dành cho [`saveFullPageScreen`](./methods#savefullpagescreen) hoặc [`saveTabbablePage`](./methods#savetabbablepage)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Phương thức này sẽ ẩn một hoặc nhiều phần tử bằng cách thêm thuộc tính `visibility: hidden` vào chúng bằng cách cung cấp một mảng các phần tử.
Điều này sẽ hữu ích khi một trang chẳng hạn có các phần tử cố định (sticky) sẽ cuộn cùng với trang nếu trang được cuộn nhưng sẽ tạo ra hiệu ứng gây khó chịu khi chụp ảnh màn hình toàn trang

> **LƯU Ý:** Chỉ hoạt động khi `userBasedFullPageScreenshot` được đặt thành `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `waitForFontsLoaded`

- **Kiểu:** `boolean`
- **Bắt buộc:** Không
- **Mặc định:** `true`
- **Sử dụng với:** Tất cả [các phương thức](./methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Các phông chữ, bao gồm cả phông chữ của bên thứ ba, có thể được tải đồng bộ hoặc bất đồng bộ. Việc tải bất đồng bộ có nghĩa là phông chữ có thể được tải sau khi WebdriverIO xác định rằng trang đã được tải hoàn toàn. Để ngăn chặn các vấn đề về hiển thị phông chữ, mô-đun này, theo mặc định, sẽ đợi tất cả các phông chữ được tải trước khi chụp ảnh màn hình.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Compare (Check) Options

Các tùy chọn so sánh là các tùy chọn ảnh hưởng đến cách thức so sánh, được thực hiện bởi [ResembleJS](https://github.com/Huddle/Resemble.js).

### `ignoreAlpha`

- **Kiểu:** `boolean`
- **Mặc định:** `false`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

So sánh hình ảnh và bỏ qua alpha.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Kiểu:** `boolean`
- **Mặc định:** `true`
- **Bắt buộc:** Không
- **Sử dụng với:** _Chỉ có thể được sử dụng cho `checkScreen()`. Đây là **chỉ dành cho iPad**_
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Tự động chặn thanh bên cho iPad ở chế độ ngang trong quá trình so sánh. Điều này ngăn ngừa lỗi trên thành phần tab/private/bookmark gốc.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Kiểu:** `boolean`
- **Mặc định:** `true`
- **Bắt buộc:** Không
- **Sử dụng với:** _Đây là **chỉ dành cho Mobile**_
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Ứng dụng Hybrid (phần native) và Native

Tự động chặn thanh trạng thái và thanh địa chỉ trong quá trình so sánh. Điều này ngăn ngừa lỗi về thời gian, wifi hoặc trạng thái pin.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Kiểu:** `boolean`
- **Mặc định:** `true`
- **Bắt buộc:** Không
- **Sử dụng với:** _Đây là **chỉ dành cho Mobile**_
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Ứng dụng Hybrid (phần native) và Native

Tự động chặn thanh công cụ.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Kiểu:** `boolean`
- **Mặc định:** `false`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

So sánh hình ảnh và bỏ qua khử răng cưa.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Kiểu:** `boolean`
- **Mặc định:** `false`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Mặc dù hình ảnh có màu, việc so sánh sẽ so sánh 2 hình ảnh đen/trắng

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Kiểu:** `boolean`
- **Mặc định:** `false`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

So sánh hình ảnh và so sánh với `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Kiểu:** `boolean`
- **Mặc định:** `false`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

So sánh hình ảnh và so sánh với `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Kiểu:** `boolean`
- **Mặc định:** `false`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Nếu true, phần trăm trả về sẽ như `0.12345678`, mặc định là `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Kiểu:** `boolean`
- **Mặc định:** `false`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Điều này sẽ trả về tất cả dữ liệu so sánh, không chỉ phần trăm khác biệt, xem thêm [Console Output](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Kiểu:** `number`
- **Mặc định:** `0`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Giá trị cho phép của `misMatchPercentage` ngăn cản việc lưu hình ảnh với sự khác biệt

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Kiểu:** `number`
- **Mặc định:** `0`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

So sánh hình ảnh lớn có thể dẫn đến vấn đề hiệu suất.
Khi cung cấp một số cho số lượng pixel ở đây (lớn hơn 0), thuật toán so sánh sẽ bỏ qua các pixel khi chiều rộng hoặc chiều cao của hình ảnh lớn hơn `largeImageThreshold` pixel.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Kiểu:** `boolean`
- **Mặc định:** `false`
- **Bắt buộc:** Không
- **Sử dụng với:** Tất cả [các phương thức Check](./methods#check-methods)
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Chuyển đổi tỷ lệ 2 hình ảnh về cùng kích thước trước khi thực hiện so sánh. Rất khuyến khích bật `ignoreAntialiasing` và `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Kiểu:** `array`
- **Bắt buộc:** Không
- **Sử dụng với:** Chỉ với phương thức `checkScreen`, **KHÔNG** với phương thức `checkElement`
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Ứng dụng Native

Phương thức này sẽ tự động chặn các phần tử hoặc khu vực trên màn hình dựa trên một mảng các phần tử hoặc một đối tượng `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

## Folder options

Thư mục cơ sở và các thư mục ảnh chụp màn hình (thực tế, khác biệt) là các tùy chọn có thể được thiết lập trong quá trình khởi tạo plugin hoặc phương thức. Để thiết lập các tùy chọn thư mục cho một phương thức cụ thể, truyền các tùy chọn thư mục vào đối tượng tùy chọn của phương thức. Điều này có thể được sử dụng cho:

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

- **Kiểu:** `string`
- **Bắt buộc:** Không
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Thư mục cho ảnh chụp màn hình đã được chụp trong bài kiểm tra.

### `baselineFolder`

- **Kiểu:** `string`
- **Bắt buộc:** Không
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Thư mục cho hình ảnh cơ sở được sử dụng để so sánh.

### `diffFolder`

- **Kiểu:** `string`
- **Bắt buộc:** Không
- **Hỗ trợ các Ngữ cảnh Ứng dụng:** Tất cả

Thư mục cho hình ảnh khác biệt được tạo bởi ResembleJS.
---
id: service-options
title: Tùy Chọn Dịch Vụ
---

Tùy chọn dịch vụ là các tùy chọn có thể được thiết lập khi dịch vụ được khởi tạo và sẽ được sử dụng cho mỗi lần gọi phương thức.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## Tùy Chọn Mặc Định

### `addressBarShadowPadding`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `6`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Khoảng đệm cần được thêm vào thanh địa chỉ trên iOS và Android để cắt tỉa chính xác khung nhìn.

### `autoElementScroll`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Tùy chọn này cho phép bạn vô hiệu hóa tự động cuộn phần tử vào khung nhìn khi ảnh chụp màn hình của một phần tử được tạo.

### `addIOSBezelCorners`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Thêm các góc bezel và notch/dynamic island vào ảnh chụp màn hình cho các thiết bị iOS.

:::info LƯU Ý
Điều này chỉ có thể được thực hiện khi tên thiết bị **CÓ THỂ** tự động được xác định và khớp với danh sách các tên thiết bị được chuẩn hóa sau đây. Việc chuẩn hóa sẽ được thực hiện bởi module này.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Nếu không tìm thấy hình ảnh cơ sở trong quá trình so sánh, hình ảnh sẽ tự động được sao chép vào thư mục cơ sở.

### `baselineFolder`

-   **Loại:** `string|()=> string`
-   **Bắt buộc:** Không
-   **Mặc định:** `.path/to/testfile/__snapshots__/`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Thư mục sẽ chứa tất cả các hình ảnh cơ sở được sử dụng trong quá trình so sánh. Nếu không được thiết lập, giá trị mặc định sẽ được sử dụng, nó sẽ lưu trữ các tệp trong thư mục `__snapshots__/` bên cạnh tệp spec thực thi các bài kiểm tra trực quan. Một hàm trả về một `string` cũng có thể được sử dụng để thiết lập giá trị `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// HOẶC
{
    baselineFolder: () => {
        // Thực hiện một số magic ở đây
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Xóa thư mục runtime (`actual` & `diff`) khi khởi tạo

:::info LƯU Ý
Điều này chỉ hoạt động khi [`screenshotPath`](#screenshotpath) được thiết lập thông qua các tùy chọn plugin, và **SẼ KHÔNG HOẠT ĐỘNG** khi bạn thiết lập các thư mục trong các phương thức
:::

### `createJsonReportFiles` **(MỚI)**

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`

Bây giờ bạn có tùy chọn xuất kết quả so sánh vào một tệp báo cáo JSON. Bằng cách cung cấp tùy chọn `createJsonReportFiles: true`, mỗi hình ảnh được so sánh sẽ tạo một báo cáo được lưu trữ trong thư mục `actual`, bên cạnh mỗi kết quả hình ảnh `actual`. Đầu ra sẽ trông như thế này:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

Khi tất cả các bài kiểm tra được thực thi, một tệp JSON mới với bộ sưu tập các so sánh sẽ được tạo ra và có thể được tìm thấy trong thư mục gốc của thư mục `actual` của bạn. Dữ liệu được nhóm theo:

-   `describe` cho Jasmine/Mocha hoặc `Feature` cho CucumberJS
-   `it` cho Jasmine/Mocha hoặc `Scenario` cho CucumberJS
    và sau đó được sắp xếp theo:
-   `commandName`, là tên phương thức so sánh được sử dụng để so sánh hình ảnh
-   `instanceData`, trình duyệt trước, sau đó là thiết bị, rồi đến nền tảng
    nó sẽ trông như thế này

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Dữ liệu báo cáo sẽ cho bạn cơ hội xây dựng báo cáo trực quan của riêng bạn mà không cần phải tự mình thực hiện tất cả các phép thuật và thu thập dữ liệu.

:::info LƯU Ý
Bạn cần sử dụng phiên bản `@wdio/visual-testing` từ `5.2.0` trở lên
:::

### `disableBlinkingCursor`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Bật/Tắt tất cả "nhấp nháy" con trỏ của `input`, `textarea`, `[contenteditable]` trong ứng dụng. Nếu được đặt thành `true`, con trỏ sẽ được đặt thành `transparent` trước khi chụp ảnh màn hình và đặt lại khi hoàn thành

### `disableCSSAnimation`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Bật/Tắt tất cả hoạt ảnh CSS trong ứng dụng. Nếu được đặt thành `true`, tất cả hoạt ảnh sẽ bị vô hiệu hóa trước khi chụp ảnh màn hình và đặt lại khi hoàn thành

### `enableLayoutTesting`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Điều này sẽ ẩn tất cả văn bản trên trang để chỉ bố cục được sử dụng để so sánh. Việc ẩn sẽ được thực hiện bằng cách thêm kiểu `'color': 'transparent !important'` vào **mỗi** phần tử.

Để xem kết quả đầu ra, hãy xem [Kết quả kiểm tra](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Bằng cách sử dụng cờ này, mỗi phần tử chứa văn bản (vì vậy không chỉ `p, h1, h2, h3, h4, h5, h6, span, a, li`, mà còn cả `div|button|..`) sẽ nhận thuộc tính này. **Không** có tùy chọn để điều chỉnh điều này.
:::

### `formatImageName`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Tên của hình ảnh đã lưu có thể được tùy chỉnh bằng cách truyền tham số `formatImageName` với một chuỗi định dạng như:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Các biến sau có thể được truyền để định dạng chuỗi và sẽ tự động được đọc từ khả năng của phiên.
Nếu chúng không thể được xác định, các giá trị mặc định sẽ được sử dụng.

-   `browserName`: Tên của trình duyệt trong khả năng được cung cấp
-   `browserVersion`: Phiên bản của trình duyệt được cung cấp trong khả năng
-   `deviceName`: Tên thiết bị từ khả năng
-   `dpr`: Tỷ lệ pixel của thiết bị
-   `height`: Chiều cao của màn hình
-   `logName`: Tên log từ khả năng
-   `mobile`: Điều này sẽ thêm `_app`, hoặc tên trình duyệt sau `deviceName` để phân biệt ảnh chụp màn hình ứng dụng từ ảnh chụp màn hình trình duyệt
-   `platformName`: Tên của nền tảng trong khả năng được cung cấp
-   `platformVersion`: Phiên bản của nền tảng được cung cấp trong khả năng
-   `tag`: Thẻ được cung cấp trong các phương thức đang được gọi
-   `width`: Chiều rộng của màn hình

:::info

Bạn không thể cung cấp đường dẫn/thư mục tùy chỉnh trong `formatImageName`. Nếu bạn muốn thay đổi đường dẫn, vui lòng kiểm tra việc thay đổi các tùy chọn sau:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) cho mỗi phương thức

:::

### `fullPageScrollTimeout`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `1500`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Thời gian chờ tính bằng mili giây để đợi sau khi cuộn. Điều này có thể giúp xác định các trang có tải chậm.

:::info

Điều này chỉ hoạt động khi tùy chọn dịch vụ/phương thức `userBasedFullPageScreenshot` được đặt thành `true`, xem thêm [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Ẩn thanh cuộn trong ứng dụng. Nếu được đặt thành true, tất cả thanh cuộn sẽ bị vô hiệu hóa trước khi chụp ảnh màn hình. Mặc định được đặt thành `true` để ngăn các vấn đề phát sinh.

### `logLevel`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** `info`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Thêm các bản ghi bổ sung, các tùy chọn là `debug | info | warn | silent`

Lỗi luôn được ghi vào bảng điều khiển.

### `savePerInstance`

-   **Loại:** `boolean`
-   **Mặc định:** `false`
-   **Bắt buộc:** Không
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Lưu hình ảnh cho mỗi phiên trong một thư mục riêng biệt, ví dụ, tất cả ảnh chụp màn hình Chrome sẽ được lưu trong một thư mục Chrome như `desktop_chrome`.

### `screenshotPath`

-   **Loại:** `string | () => string`
-   **Mặc định:** `.tmp/`
-   **Bắt buộc:** Không
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native

Thư mục sẽ chứa tất cả ảnh chụp màn hình thực tế/khác nhau. Nếu không được thiết lập, giá trị mặc định sẽ được sử dụng. Một hàm trả về một chuỗi cũng có thể được sử dụng để đặt giá trị screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// HOẶC
{
    screenshotPath: () => {
        // Thực hiện một số phép thuật ở đây
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `6` cho Android và `15` cho iOS (`6` theo mặc định và `9` sẽ được tự động thêm vào cho thanh home có thể xuất hiện trên iPhone có notch hoặc iPad có thanh home)
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Khoảng đệm cần được thêm vào thanh công cụ trên iOS và Android để cắt tỉa chính xác khung nhìn.

### `userBasedFullPageScreenshot`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview) **Được giới thiệu trong visual-service@7.0.0**

Theo mặc định, ảnh chụp toàn trang trên web máy tính để bàn được chụp bằng giao thức WebDriver BiDi, cho phép tạo ảnh chụp nhanh, ổn định và nhất quán mà không cần cuộn.
Khi userBasedFullPageScreenshot được đặt thành true, quá trình chụp ảnh mô phỏng một người dùng thực: cuộn qua trang, chụp ảnh màn hình có kích thước khung nhìn và ghép chúng lại với nhau. Phương pháp này hữu ích cho các trang có nội dung tải chậm hoặc kết xuất động phụ thuộc vào vị trí cuộn.

Sử dụng tùy chọn này nếu trang của bạn phụ thuộc vào việc tải nội dung khi cuộn hoặc nếu bạn muốn giữ lại hành vi của các phương thức chụp ảnh cũ hơn.

### `waitForFontsLoaded`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview)

Phông chữ, bao gồm phông chữ của bên thứ ba, có thể được tải đồng bộ hoặc không đồng bộ. Tải không đồng bộ có nghĩa là phông chữ có thể tải sau khi WebdriverIO xác định rằng trang đã tải hoàn toàn. Để ngăn các vấn đề về hiển thị phông chữ, theo mặc định, module này sẽ đợi tất cả phông chữ được tải trước khi chụp ảnh màn hình.

## Tùy chọn Tabbable

:::info LƯU Ý

Module này cũng hỗ trợ vẽ cách một người dùng sẽ sử dụng bàn phím của mình để _tab_ qua trang web bằng cách vẽ các đường thẳng và chấm từ phần tử có thể tab đến phần tử có thể tab.<br/>
Công việc này được lấy cảm hứng từ bài viết blog của [Viv Richards](https://github.com/vivrichards600) về ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Cách chọn các phần tử có thể tab được dựa trên module [tabbable](https://github.com/davidtheclark/tabbable). Nếu có bất kỳ vấn đề nào liên quan đến việc tab, vui lòng kiểm tra [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) và đặc biệt là [phần Chi tiết thêm](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Loại:** `object`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Các tùy chọn có thể thay đổi cho các đường thẳng và chấm nếu bạn sử dụng các phương thức `{save|check}Tabbable`. Các tùy chọn được giải thích dưới đây.

#### `tabbableOptions.circle`

-   **Loại:** `object`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Các tùy chọn để thay đổi hình tròn.

##### `tabbableOptions.circle.backgroundColor`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Màu nền của hình tròn.

##### `tabbableOptions.circle.borderColor`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Màu viền của hình tròn.

##### `tabbableOptions.circle.borderWidth`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Độ rộng viền của hình tròn.

##### `tabbableOptions.circle.fontColor`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Màu của phông chữ của văn bản trong hình tròn. Điều này sẽ chỉ được hiển thị nếu [`showNumber`](./#tabbableoptionscircleshownumber) được đặt thành `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Họ của phông chữ của văn bản trong hình tròn. Điều này sẽ chỉ được hiển thị nếu [`showNumber`](./#tabbableoptionscircleshownumber) được đặt thành `true`.

Đảm bảo đặt phông chữ được hỗ trợ bởi các trình duyệt.

##### `tabbableOptions.circle.fontSize`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Kích thước của phông chữ của văn bản trong hình tròn. Điều này sẽ chỉ được hiển thị nếu [`showNumber`](./#tabbableoptionscircleshownumber) được đặt thành `true`.

##### `tabbableOptions.circle.size`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Kích thước của hình tròn.

##### `tabbableOptions.circle.showNumber`

-   **Loại:** `showNumber`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Hiển thị số thứ tự tab trong hình tròn.

#### `tabbableOptions.line`

-   **Loại:** `object`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Các tùy chọn để thay đổi đường thẳng.

##### `tabbableOptions.line.color`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Màu sắc của đường thẳng.

##### `tabbableOptions.line.width`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web

Chiều rộng của đường thẳng.

## Tùy chọn so sánh

### `compareOptions`

-   **Loại:** `object`
-   **Bắt buộc:** Không
-   **Mặc định:** Xem [ở đây](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) cho tất cả các giá trị mặc định
-   **Hỗ trợ ngữ cảnh ứng dụng:** Web, Ứng dụng Hybrid (Webview), Ứng dụng Native (Xem [Tùy chọn so sánh phương thức](./method-options#compare-check-options) để biết thêm thông tin)

Các tùy chọn so sánh cũng có thể được đặt làm tùy chọn dịch vụ, chúng được mô tả trong [Tùy chọn so sánh phương thức](/docs/visual-testing/method-options#compare-check-options)
---
id: service-options
title: Tùy chọn dịch vụ
---

Service options là các tùy chọn có thể được thiết lập khi dịch vụ được khởi tạo và sẽ được sử dụng cho mỗi lần gọi phương thức.

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

## Default Options

### `addressBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `6`
-   **Supported Application Contexts:** Web

Padding cần được thêm vào thanh địa chỉ trên iOS và Android để cắt đúng phần viewport.

### `autoElementScroll`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Tùy chọn này cho phép bạn tắt tính năng tự động cuộn phần tử vào khung nhìn khi chụp ảnh một phần tử.

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Thêm các góc viền và notch/dynamic island vào ảnh chụp màn hình cho thiết bị iOS.

:::info NOTE
Điều này chỉ có thể được thực hiện khi tên thiết bị **CÓ THỂ** được xác định tự động và khớp với danh sách các tên thiết bị được chuẩn hóa sau đây. Việc chuẩn hóa sẽ được thực hiện bởi module này.
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

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Nếu không tìm thấy ảnh cơ sở trong quá trình so sánh, ảnh sẽ tự động được sao chép vào thư mục cơ sở.

### `alwaysSaveActualImage`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** All

Khi thiết lập tùy chọn này thành `false` thì:

- không lưu ảnh thực tế khi **không có** sự khác biệt
- không lưu tệp jsonreport khi `createJsonReportFiles` được đặt thành `true`. Nó cũng sẽ hiển thị cảnh báo trong nhật ký rằng `createJsonReportFiles` đã bị vô hiệu hóa

Điều này nên tạo hiệu suất tốt hơn vì không có tệp nào được ghi vào hệ thống và đảm bảo rằng không có quá nhiều dữ liệu không cần thiết trong thư mục `actual`.

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Mandatory:** No
-   **Default:** `.path/to/testfile/__snapshots__/`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Thư mục sẽ chứa tất cả các ảnh cơ sở được sử dụng trong quá trình so sánh. Nếu không được đặt, giá trị mặc định sẽ được sử dụng, lưu trữ các tệp trong thư mục `__snapshots__/` bên cạnh tệp spec thực thi các bài kiểm tra hình ảnh. Một hàm trả về `string` cũng có thể được sử dụng để đặt giá trị `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Xóa thư mục runtime (`actual` & `diff`) khi khởi tạo

:::info NOTE
Điều này chỉ hoạt động khi [`screenshotPath`](#screenshotpath) được thiết lập thông qua tùy chọn plugin, và **SẼ KHÔNG HOẠT ĐỘNG** khi bạn thiết lập thư mục trong các phương thức
:::

### `createJsonReportFiles` **(NEW)**

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`

Bạn hiện có tùy chọn xuất kết quả so sánh vào một tệp báo cáo JSON. Bằng cách cung cấp tùy chọn `createJsonReportFiles: true`, mỗi hình ảnh được so sánh sẽ tạo ra một báo cáo được lưu trữ trong thư mục `actual`, bên cạnh mỗi kết quả hình ảnh `actual`. Đầu ra sẽ trông như thế này:

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

Khi tất cả các bài kiểm tra được thực thi, một tệp JSON mới với tập hợp các so sánh sẽ được tạo ra và có thể được tìm thấy trong thư mục gốc của thư mục `actual` của bạn. Dữ liệu được nhóm theo:

-   `describe` cho Jasmine/Mocha hoặc `Feature` cho CucumberJS
-   `it` cho Jasmine/Mocha hoặc `Scenario` cho CucumberJS
    và sau đó được sắp xếp theo:
-   `commandName`, là tên phương thức so sánh được sử dụng để so sánh hình ảnh
-   `instanceData`, trình duyệt trước, sau đó là thiết bị, sau đó là nền tảng
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

Dữ liệu báo cáo sẽ cho bạn cơ hội xây dựng báo cáo trực quan riêng mà không cần phải tự thực hiện tất cả các ma thuật và thu thập dữ liệu.

:::info NOTE
Bạn cần sử dụng phiên bản `@wdio/visual-testing` 5.2.0 hoặc cao hơn
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Bật/Tắt tất cả các dấu nhấp nháy trong `input`, `textarea`, `[contenteditable]` trong ứng dụng. Nếu đặt thành `true`, dấu nhấp nháy sẽ được đặt thành `transparent` trước khi chụp ảnh màn hình và khôi phục khi hoàn tất.

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Bật/Tắt tất cả các hoạt ảnh CSS trong ứng dụng. Nếu đặt thành `true`, tất cả hoạt ảnh sẽ bị vô hiệu hóa trước khi chụp ảnh màn hình và khôi phục khi hoàn tất.

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web

Điều này sẽ ẩn tất cả văn bản trên trang để chỉ bố cục được sử dụng cho việc so sánh. Việc ẩn sẽ được thực hiện bằng cách thêm kiểu `'color': 'transparent !important'` vào **mỗi** phần tử.

Để xem kết quả, xem [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Bằng cách sử dụng cờ này, mỗi phần tử chứa văn bản (không chỉ `p, h1, h2, h3, h4, h5, h6, span, a, li`, mà còn cả `div|button|..`) sẽ nhận được thuộc tính này. **Không có** tùy chọn để điều chỉnh tính năng này.
:::

### `formatImageName`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Tên của các hình ảnh đã lưu có thể được tùy chỉnh bằng cách truyền tham số `formatImageName` với một chuỗi định dạng như:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Các biến sau có thể được truyền để định dạng chuỗi và sẽ tự động được đọc từ khả năng của instance. Nếu chúng không thể được xác định, giá trị mặc định sẽ được sử dụng.

-   `browserName`: Tên của trình duyệt trong khả năng được cung cấp
-   `browserVersion`: Phiên bản của trình duyệt được cung cấp trong khả năng
-   `deviceName`: Tên thiết bị từ khả năng
-   `dpr`: Tỷ lệ điểm ảnh thiết bị
-   `height`: Chiều cao của màn hình
-   `logName`: LogName từ khả năng
-   `mobile`: Điều này sẽ thêm `_app`, hoặc tên trình duyệt sau `deviceName` để phân biệt ảnh chụp màn hình ứng dụng từ ảnh chụp màn hình trình duyệt
-   `platformName`: Tên của nền tảng trong khả năng được cung cấp
-   `platformVersion`: Phiên bản của nền tảng được cung cấp trong khả năng
-   `tag`: Tag được cung cấp trong phương thức đang được gọi
-   `width`: Chiều rộng của màn hình

:::info

Bạn không thể cung cấp đường dẫn/thư mục tùy chỉnh trong `formatImageName`. Nếu bạn muốn thay đổi đường dẫn, vui lòng kiểm tra việc thay đổi các tùy chọn sau:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) cho mỗi phương thức

:::

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Supported Application Contexts:** Web

Thời gian chờ tính bằng mili giây sau khi cuộn. Điều này có thể giúp xác định các trang có tải chậm.

:::info

Điều này sẽ chỉ hoạt động khi tùy chọn dịch vụ/phương thức `userBasedFullPageScreenshot` được đặt thành `true`, xem thêm [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Ẩn thanh cuộn trong ứng dụng. Nếu đặt thành true, tất cả thanh cuộn sẽ bị vô hiệu hóa trước khi chụp ảnh màn hình. Điều này được đặt thành `true` theo mặc định để ngăn ngừa các vấn đề phát sinh.

### `logLevel`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `info`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Thêm nhật ký bổ sung, các tùy chọn là `debug | info | warn | silent`

Lỗi luôn được ghi vào console.

### `savePerInstance`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Lưu hình ảnh cho mỗi instance trong một thư mục riêng biệt, ví dụ tất cả ảnh chụp màn hình Chrome sẽ được lưu trong thư mục Chrome như `desktop_chrome`.

### `screenshotPath`

-   **Type:** `string | () => string`
-   **Default:** `.tmp/`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Thư mục sẽ chứa tất cả các ảnh chụp màn hình thực tế/khác biệt. Nếu không được đặt, giá trị mặc định sẽ được sử dụng. Một hàm trả về một chuỗi cũng có thể được sử dụng để đặt giá trị screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `6` cho Android và `15` cho iOS (`6` mặc định và `9` sẽ được thêm tự động cho thanh home có thể có trên iPhone có notch hoặc iPad có thanh home)
-   **Supported Application Contexts:** Web

Padding cần được thêm vào thanh công cụ trên iOS và Android để cắt đúng phần viewport.

### `userBasedFullPageScreenshot`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview) **Giới thiệu trong visual-service@7.0.0**

Mặc định, ảnh chụp toàn trang trên web desktop được chụp bằng giao thức WebDriver BiDi, cho phép chụp ảnh nhanh, ổn định và nhất quán mà không cần cuộn.
Khi userBasedFullPageScreenshot được đặt thành true, quá trình chụp ảnh giả lập người dùng thực tế: cuộn qua trang, chụp ảnh màn hình có kích thước viewport và ghép chúng lại với nhau. Phương pháp này hữu ích cho các trang có nội dung tải lazy hoặc hiển thị động phụ thuộc vào vị trí cuộn.

Sử dụng tùy chọn này nếu trang của bạn phụ thuộc vào nội dung tải khi cuộn hoặc nếu bạn muốn giữ lại hành vi của các phương thức chụp ảnh màn hình cũ.

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Các font chữ, bao gồm cả font của bên thứ ba, có thể được tải đồng bộ hoặc bất đồng bộ. Tải bất đồng bộ có nghĩa là font có thể tải sau khi WebdriverIO xác định rằng trang đã tải hoàn toàn. Để ngăn chặn vấn đề hiển thị font, theo mặc định, module này sẽ đợi tất cả font được tải trước khi chụp ảnh màn hình.

## Tabbable Options

:::info NOTE

Module này cũng hỗ trợ vẽ cách mà người dùng sẽ sử dụng bàn phím để _tab_ qua trang web bằng cách vẽ các đường và điểm từ phần tử có thể tab đến phần tử có thể tab.<br/>
Công việc này lấy cảm hứng từ bài đăng blog của [Viv Richards](https://github.com/vivrichards600) về ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Cách chọn các phần tử có thể tab dựa trên module [tabbable](https://github.com/davidtheclark/tabbable). Nếu có bất kỳ vấn đề nào liên quan đến việc tab, vui lòng kiểm tra [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) và đặc biệt là [phần Chi tiết thêm](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Các tùy chọn có thể thay đổi cho các đường và điểm nếu bạn sử dụng các phương thức `{save|check}Tabbable`. Các tùy chọn được giải thích bên dưới.

#### `tabbableOptions.circle`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Các tùy chọn để thay đổi hình tròn.

##### `tabbableOptions.circle.backgroundColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Màu nền của hình tròn.

##### `tabbableOptions.circle.borderColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Màu viền của hình tròn.

##### `tabbableOptions.circle.borderWidth`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Độ rộng viền của hình tròn.

##### `tabbableOptions.circle.fontColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Màu của font chữ trong hình tròn. Điều này sẽ chỉ được hiển thị nếu [`showNumber`](./#tabbableoptionscircleshownumber) được đặt thành `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Font chữ của văn bản trong hình tròn. Điều này sẽ chỉ được hiển thị nếu [`showNumber`](./#tabbableoptionscircleshownumber) được đặt thành `true`.

Đảm bảo đặt font được hỗ trợ bởi các trình duyệt.

##### `tabbableOptions.circle.fontSize`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Kích thước font chữ trong hình tròn. Điều này sẽ chỉ được hiển thị nếu [`showNumber`](./#tabbableoptionscircleshownumber) được đặt thành `true`.

##### `tabbableOptions.circle.size`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Kích thước của hình tròn.

##### `tabbableOptions.circle.showNumber`

-   **Type:** `showNumber`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Hiển thị số thứ tự tab trong hình tròn.

#### `tabbableOptions.line`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Các tùy chọn để thay đổi đường kẻ.

##### `tabbableOptions.line.color`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Màu sắc của đường kẻ.

##### `tabbableOptions.line.width`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web

Độ rộng của đường kẻ.

## Compare options

### `compareOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** Xem [tại đây](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) cho tất cả giá trị mặc định
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App (Xem [Method Compare options](./method-options#compare-check-options) để biết thêm thông tin)

Các tùy chọn so sánh cũng có thể được đặt làm tùy chọn dịch vụ, chúng được mô tả trong [Method Compare options](/docs/visual-testing/method-options#compare-check-options)
---
id: configuration
title: Cấu hình
---

Trang này mô tả tất cả các tùy chọn cấu hình cho máy chủ MCP của WebdriverIO.

## Cấu hình Máy chủ MCP

Máy chủ MCP được cấu hình thông qua tệp cấu hình của Claude Desktop hoặc Claude Code.

### Cấu hình Cơ bản

#### macOS

Chỉnh sửa `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

#### Windows

Chỉnh sửa `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

#### Claude Code

Chỉnh sửa tệp `.claude/settings.json` trong dự án của bạn:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

---

## Biến Môi trường

Cấu hình kết nối máy chủ Appium và các thiết lập khác thông qua biến môi trường.

### Kết nối Appium

| Biến | Loại | Mặc định | Mô tả |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Tên máy chủ Appium |
| `APPIUM_URL_PORT` | number | `4723` | Cổng máy chủ Appium |
| `APPIUM_PATH` | string | `/` | Đường dẫn máy chủ Appium |

### Ví dụ với Biến Môi trường

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## Tùy chọn Phiên Trình duyệt

Các tùy chọn có sẵn khi bắt đầu một phiên trình duyệt qua công cụ `start_browser`.

### `headless`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`

Chạy Chrome ở chế độ headless (không hiển thị cửa sổ trình duyệt). Hữu ích cho môi trường CI/CD hoặc khi bạn không cần nhìn thấy trình duyệt.

### `windowWidth`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `1920`
-   **Phạm vi:** `400` - `3840`

Chiều rộng cửa sổ trình duyệt ban đầu tính bằng pixel.

### `windowHeight`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `1080`
-   **Phạm vi:** `400` - `2160`

Chiều cao cửa sổ trình duyệt ban đầu tính bằng pixel.

### `navigationUrl`

-   **Loại:** `string`
-   **Bắt buộc:** Không

URL để điều hướng ngay sau khi khởi động trình duyệt. Điều này hiệu quả hơn so với việc gọi `start_browser` theo sau là `navigate` một cách riêng biệt.

**Ví dụ:** Khởi động trình duyệt và điều hướng trong một lệnh gọi:
```
Start Chrome and navigate to https://webdriver.io
```

---

## Tùy chọn Phiên Ứng dụng Di động

Các tùy chọn có sẵn khi bắt đầu một phiên ứng dụng di động qua công cụ `start_app_session`.

### Tùy chọn Nền tảng

#### `platform`

-   **Loại:** `string`
-   **Bắt buộc:** Có
-   **Giá trị:** `iOS` | `Android`

Nền tảng di động để tự động hóa.

#### `platformVersion`

-   **Loại:** `string`
-   **Bắt buộc:** Không

Phiên bản hệ điều hành của thiết bị/máy ảo/giả lập (ví dụ: `17.0` cho iOS, `14` cho Android).

#### `automationName`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Giá trị:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

Trình điều khiển tự động hóa để sử dụng. Mặc định là `XCUITest` cho iOS và `UiAutomator2` cho Android.

### Tùy chọn Thiết bị

#### `deviceName`

-   **Loại:** `string`
-   **Bắt buộc:** Có

Tên của thiết bị, giả lập, hoặc máy ảo để sử dụng.

**Ví dụ:**
-   iOS Simulator: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Android Emulator: `Pixel 7`, `Nexus 5X`
-   Thiết bị Thực: Tên thiết bị như hiển thị trong hệ thống của bạn

#### `udid`

-   **Loại:** `string`
-   **Bắt buộc:** Không (Yêu cầu đối với thiết bị iOS thực)

Định danh Thiết bị Duy nhất. Bắt buộc cho thiết bị iOS thực (định danh 40 ký tự) và được khuyến nghị cho thiết bị Android thực.

**Tìm UDID:**
-   **iOS:** Kết nối thiết bị, mở Finder/iTunes, nhấp vào thiết bị → Số Sê-ri (nhấp để hiển thị UDID)
-   **Android:** Chạy `adb devices` trong terminal

### Tùy chọn Ứng dụng

#### `appPath`

-   **Loại:** `string`
-   **Bắt buộc:** Không*

Đường dẫn đến tệp ứng dụng để cài đặt và khởi chạy.

**Định dạng được hỗ trợ:**
-   iOS Simulator: thư mục `.app`
-   iOS Real Device: tệp `.ipa`
-   Android: tệp `.apk`

*Hoặc phải cung cấp `appPath`, hoặc `noReset: true` để kết nối với ứng dụng đang chạy.

#### `appWaitActivity`

-   **Loại:** `string`
-   **Bắt buộc:** Không (chỉ dành cho Android)

Hoạt động để đợi khi khởi chạy ứng dụng. Nếu không được chỉ định, hoạt động chính/khởi chạy của ứng dụng sẽ được sử dụng.

**Ví dụ:** `com.example.app.MainActivity`

### Tùy chọn Trạng thái Phiên

#### `noReset`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`

Giữ nguyên trạng thái ứng dụng giữa các phiên. Khi `true`:
-   Dữ liệu ứng dụng được giữ nguyên (trạng thái đăng nhập, tùy chọn, v.v.)
-   Phiên sẽ **tách rời** thay vì đóng (giữ ứng dụng chạy)
-   Hữu ích để kiểm tra hành trình người dùng qua nhiều phiên
-   Có thể được sử dụng mà không cần `appPath` để kết nối với ứng dụng đang chạy

#### `fullReset`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`

Đặt lại hoàn toàn ứng dụng trước phiên. Khi `true`:
-   iOS: Gỡ cài đặt và cài đặt lại ứng dụng
-   Android: Xóa dữ liệu ứng dụng và bộ nhớ đệm
-   Hữu ích khi bắt đầu với trạng thái sạch

Đặt `fullReset: false` với `noReset: true` để giữ nguyên trạng thái ứng dụng hoàn toàn.

### Thời gian chờ Phiên

#### `newCommandTimeout`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `60`

Thời gian (tính bằng giây) mà Appium sẽ đợi một lệnh mới trước khi cho rằng client đã thoát và kết thúc phiên. Tăng giá trị này cho các phiên gỡ lỗi dài hơn.

**Ví dụ:**
-   `60` - Mặc định, phù hợp với hầu hết tự động hóa
-   `300` - 5 phút, để gỡ lỗi hoặc hoạt động chậm hơn
-   `600` - 10 phút, cho các bài kiểm tra chạy rất lâu

### Tùy chọn Xử lý Tự động

#### `autoGrantPermissions`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`

Tự động cấp quyền ứng dụng khi cài đặt/khởi chạy. Khi `true`:
-   Quyền camera, micrô, vị trí, v.v. được tự động cấp
-   Không cần xử lý hộp thoại quyền thủ công
-   Hợp lý hóa tự động hóa bằng cách tránh các cửa sổ pop-up quyền

:::note Chỉ dành cho Android
Tùy chọn này chủ yếu ảnh hưởng đến Android. Quyền iOS phải được xử lý khác do hạn chế của hệ thống.
:::

#### `autoAcceptAlerts`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`

Tự động chấp nhận cảnh báo hệ thống (hộp thoại) xuất hiện trong quá trình tự động hóa.

**Ví dụ về cảnh báo tự động chấp nhận:**
-   "Cho phép thông báo?"
-   "Ứng dụng muốn truy cập vị trí của bạn"
-   "Cho phép ứng dụng truy cập ảnh?"

#### `autoDismissAlerts`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`

Bỏ qua (hủy) cảnh báo hệ thống thay vì chấp nhận chúng. Ưu tiên hơn `autoAcceptAlerts` khi được đặt thành `true`.

### Ghi đè Máy chủ Appium

Bạn có thể ghi đè kết nối máy chủ Appium trên cơ sở từng phiên:

#### `appiumHost`

-   **Loại:** `string`
-   **Bắt buộc:** Không

Tên máy chủ Appium. Ghi đè biến môi trường `APPIUM_URL`.

#### `appiumPort`

-   **Loại:** `number`
-   **Bắt buộc:** Không

Cổng máy chủ Appium. Ghi đè biến môi trường `APPIUM_URL_PORT`.

#### `appiumPath`

-   **Loại:** `string`
-   **Bắt buộc:** Không

Đường dẫn máy chủ Appium. Ghi đè biến môi trường `APPIUM_PATH`.

---

## Tùy chọn Phát hiện Phần tử

Tùy chọn cho công cụ `get_visible_elements`.

### `elementType`

-   **Loại:** `string`
-   **Bắt buộc:** Không
-   **Mặc định:** `interactable`
-   **Giá trị:** `interactable` | `visual` | `all`

Loại phần tử để trả về:
-   `interactable`: Nút, liên kết, trường nhập liệu và các phần tử có thể nhấp khác
-   `visual`: Hình ảnh, SVG và các phần tử trực quan
-   `all`: Cả phần tử tương tác và trực quan

### `inViewportOnly`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`

Chỉ trả về các phần tử hiển thị trong khung nhìn hiện tại. Khi `false`, trả về tất cả các phần tử trong phân cấp chế độ xem (hữu ích để tìm các phần tử ngoài màn hình).

### `includeContainers`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`

Bao gồm các phần tử container/bố cục trong kết quả. Khi `true`:

**Các container Android được bao gồm:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**Các container iOS được bao gồm:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

Hữu ích để gỡ lỗi vấn đề bố cục hoặc hiểu phân cấp chế độ xem.

### `includeBounds`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `false`

Bao gồm ranh giới/tọa độ phần tử (x, y, chiều rộng, chiều cao) trong phản hồi. Đặt thành `true` cho:
-   Tương tác dựa trên tọa độ
-   Gỡ lỗi bố cục
-   Định vị phần tử trực quan

### Tùy chọn Phân trang

Đối với các trang lớn có nhiều phần tử, sử dụng phân trang để giảm sử dụng token:

#### `limit`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `0` (không giới hạn)

Số lượng phần tử tối đa để trả về.

#### `offset`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `0`

Số lượng phần tử cần bỏ qua trước khi trả về kết quả.

**Ví dụ:** Lấy phần tử 21-40:
```
Get visible elements with limit 20 and offset 20
```

---

## Tùy chọn Cây Khả năng Tiếp cận

Tùy chọn cho công cụ `get_accessibility` (chỉ dành cho trình duyệt).

### `limit`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `100`

Số lượng nút tối đa để trả về. Sử dụng `0` cho không giới hạn (không được khuyến nghị cho các trang lớn).

### `offset`

-   **Loại:** `number`
-   **Bắt buộc:** Không
-   **Mặc định:** `0`

Số lượng nút cần bỏ qua để phân trang.

### `roles`

-   **Loại:** `string[]`
-   **Bắt buộc:** Không
-   **Mặc định:** Tất cả các vai trò

Lọc theo các vai trò truy cập cụ thể.

**Vai trò phổ biến:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Ví dụ:** Chỉ nhận nút và liên kết:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **Loại:** `boolean`
-   **Bắt buộc:** Không
-   **Mặc định:** `true`

Chỉ trả về các nút có tên/nhãn. Lọc ra các container ẩn danh và giảm nhiễu trong kết quả.

---

## Tùy chọn Ảnh Chụp Màn Hình

Tùy chọn cho công cụ `take_screenshot`.

### `outputPath`

-   **Loại:** `string`
-   **Bắt buộc:** Không

Đường dẫn để lưu tệp ảnh chụp màn hình. Nếu không được cung cấp, trả về dữ liệu hình ảnh được mã hóa base64.

### Tối ưu hóa Tự động

Ảnh chụp màn hình được xử lý tự động để tối ưu hóa cho việc tiêu thụ LLM:

| Tối ưu hóa | Giá trị | Mô tả |
|--------------|-------|-------------|
| Kích thước tối đa | 2000px | Hình ảnh lớn hơn 2000px được thu nhỏ lại |
| Kích thước tệp tối đa | 1MB | Hình ảnh được nén để dưới 1MB |
| Định dạng | PNG/JPEG | PNG với nén tối đa; JPEG nếu cần thiết về kích thước |

Việc tối ưu hóa này đảm bảo ảnh chụp màn hình có thể được xử lý hiệu quả mà không vượt quá giới hạn token.

---

## Hành vi Phiên

### Loại Phiên

Máy chủ MCP theo dõi các loại phiên để cung cấp công cụ và hành vi thích hợp:

| Loại | Mô tả | Tự động Tách rời |
|------|-------------|-------------|
| `browser` | Phiên trình duyệt Chrome | Không |
| `ios` | Phiên ứng dụng iOS | Có (nếu `noReset: true` hoặc không có `appPath`) |
| `android` | Phiên ứng dụng Android | Có (nếu `noReset: true` hoặc không có `appPath`) |

### Mô hình Đơn Phiên

Máy chủ MCP hoạt động với **mô hình đơn phiên**:

-   Chỉ một phiên trình duyệt HOẶC ứng dụng có thể hoạt động tại một thời điểm
-   Bắt đầu một phiên mới sẽ đóng/tách rời phiên hiện tại
-   Trạng thái phiên được duy trì trên toàn cầu qua các lệnh gọi công cụ

### Tách rời vs Đóng

| Hành động | `detach: false` (Đóng) | `detach: true` (Tách rời) |
|--------|-------------------------|-------------------------|
| Trình duyệt | Đóng Chrome hoàn toàn | Giữ Chrome chạy, ngắt kết nối WebDriver |
| Ứng dụng Di động | Chấm dứt ứng dụng | Giữ ứng dụng chạy ở trạng thái hiện tại |
| Trường hợp Sử dụng | Bắt đầu mới cho phiên tiếp theo | Bảo toàn trạng thái, kiểm tra thủ công |

---

## Cân nhắc Hiệu suất

Máy chủ MCP được tối ưu hóa cho giao tiếp LLM hiệu quả bằng cách sử dụng định dạng **TOON (Token-Oriented Object Notation)**, giảm thiểu việc sử dụng token khi gửi dữ liệu đến Claude.

### Tự động hóa Trình duyệt

-   **Chế độ headless** nhanh hơn nhưng không hiển thị các phần tử trực quan
-   **Kích thước cửa sổ nhỏ hơn** giảm thời gian chụp ảnh màn hình
-   **Phát hiện phần tử** được tối ưu hóa với một lần thực thi script
-   **Tối ưu hóa ảnh chụp màn hình** giữ hình ảnh dưới 1MB để xử lý hiệu quả
-   **`inViewportOnly: true`** (mặc định) chỉ lọc các phần tử hiển thị

### Tự động hóa Di động

-   **Phân tích nguồn trang XML** chỉ sử dụng 2 lệnh gọi HTTP (so với 600+ cho truy vấn phần tử truyền thống)
-   **Bộ chọn Accessibility ID** nhanh nhất và đáng tin cậy nhất
-   **Bộ chọn XPath** chậm nhất - chỉ sử dụng như phương sách cuối cùng
-   **`inViewportOnly: true`** (mặc định) giảm đáng kể số lượng phần tử
-   **Phân trang** (`limit` và `offset`) giảm sử dụng token cho màn hình có nhiều phần tử
-   **`includeBounds: false`** (mặc định) bỏ qua dữ liệu tọa độ trừ khi cần thiết

### Mẹo Sử dụng Token

| Cài đặt | Tác động |
|---------|--------|
| `inViewportOnly: true` | Lọc các phần tử ngoài màn hình, giảm kích thước phản hồi |
| `includeContainers: false` | Loại trừ các phần tử bố cục (ViewGroup, v.v.) |
| `includeBounds: false` | Bỏ qua dữ liệu x/y/chiều rộng/chiều cao |
| `limit` với phân trang | Xử lý phần tử theo lô thay vì tất cả cùng một lúc |
| `namedOnly: true` (khả năng tiếp cận) | Lọc các nút ẩn danh |

---

## Thiết lập Máy chủ Appium

Trước khi sử dụng tự động hóa di động, hãy đảm bảo Appium được cấu hình đúng cách.

### Thiết lập Cơ bản

```sh
# Cài đặt Appium toàn cục
npm install -g appium

# Cài đặt drivers
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Khởi động máy chủ
appium
```

### Cấu hình Máy chủ Tùy chỉnh

```sh
# Khởi động với host và cổng tùy chỉnh
appium --address 0.0.0.0 --port 4724

# Khởi động với ghi nhật ký
appium --log-level debug

# Khởi động với đường dẫn cơ sở cụ thể
appium --base-path /wd/hub
```

### Xác minh Cài đặt

```sh
# Kiểm tra drivers đã cài đặt
appium driver list --installed

# Kiểm tra phiên bản Appium
appium --version

# Kiểm tra kết nối
curl http://localhost:4723/status
```

---

## Khắc phục sự cố Cấu hình

### Máy chủ MCP Không Khởi động

1. Xác minh npm/npx đã được cài đặt: `npm --version`
2. Thử chạy thủ công: `npx @wdio/mcp`
3. Kiểm tra nhật ký Claude Desktop để tìm lỗi

### Vấn đề Kết nối Appium

1. Xác minh Appium đang chạy: `curl http://localhost:4723/status`
2. Kiểm tra biến môi trường khớp với cài đặt máy chủ Appium
3. Đảm bảo tường lửa cho phép kết nối trên cổng Appium

### Phiên Không Khởi động

1. **Trình duyệt:** Đảm bảo Chrome đã được cài đặt
2. **iOS:** Xác minh Xcode và máy ảo có sẵn
3. **Android:** Kiểm tra `ANDROID_HOME` và máy ảo đang chạy
4. Xem xét nhật ký máy chủ Appium để biết thông báo lỗi chi tiết

### Phiên Hết thời gian

Nếu phiên hết thời gian trong quá trình gỡ lỗi:
1. Tăng `newCommandTimeout` khi bắt đầu phiên
2. Sử dụng `noReset: true` để giữ trạng thái giữa các phiên
3. Sử dụng `detach: true` khi đóng để giữ ứng dụng chạy
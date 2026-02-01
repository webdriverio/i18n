---
id: mcp
title: MCP (Giao thức Ngữ cảnh Mô hình)
---

## Nó có thể làm gì?

WebdriverIO MCP là một **máy chủ Model Context Protocol (MCP)** cho phép các trợ lý AI như Claude Desktop và Claude Code tự động hóa và tương tác với trình duyệt web và ứng dụng di động.

### Tại sao chọn WebdriverIO MCP?

-   **Ưu tiên Di động**: Không giống như các máy chủ MCP chỉ dành cho trình duyệt, WebdriverIO MCP hỗ trợ tự động hóa ứng dụng native iOS và Android thông qua Appium
-   **Bộ chọn Đa nền tảng**: Phát hiện phần tử thông minh tự động tạo nhiều chiến lược định vị (accessibility ID, XPath, UiAutomator, iOS predicates)
-   **Hệ sinh thái WebdriverIO**: Được xây dựng trên framework WebdriverIO đã được thử nghiệm với hệ sinh thái phong phú gồm các dịch vụ và trình báo cáo

Nó cung cấp một giao diện thống nhất cho:

-   🖥️ **Trình duyệt máy tính để bàn** (Chrome - chế độ có giao diện hoặc headless)
-   📱 **Ứng dụng Di động Native** (iOS Simulators / Android Emulators / Thiết bị thực qua Appium)
-   📳 **Ứng dụng Di động Hybrid** (Chuyển đổi ngữ cảnh Native + WebView qua Appium)

thông qua gói [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Điều này cho phép trợ lý AI:

-   **Khởi chạy và điều khiển trình duyệt** với kích thước có thể cấu hình, chế độ headless và điều hướng ban đầu tùy chọn
-   **Điều hướng trang web** và tương tác với các phần tử (nhấp, nhập, cuộn)
-   **Phân tích nội dung trang** thông qua cây trợ năng và phát hiện các phần tử hiển thị với hỗ trợ phân trang
-   **Chụp ảnh màn hình** tự động tối ưu hóa (đổi kích thước, nén tối đa 1MB)
-   **Quản lý cookie** để xử lý phiên
-   **Điều khiển thiết bị di động** bao gồm cử chỉ (chạm, vuốt, kéo và thả)
-   **Chuyển đổi ngữ cảnh** trong ứng dụng hybrid giữa native và webview
-   **Thực thi script** - JavaScript trong trình duyệt, lệnh Appium trên thiết bị di động
-   **Xử lý tính năng thiết bị** như xoay, bàn phím, vị trí địa lý
-   và nhiều tính năng khác, xem các tùy chọn [Công cụ](./mcp/tools) và [Cấu hình](./mcp/configuration)

:::info

LƯU Ý Đối với Ứng dụng Di động
Tự động hóa cho thiết bị di động yêu cầu máy chủ Appium đang chạy với các driver thích hợp được cài đặt. Xem [Điều kiện tiên quyết](#prerequisites) để biết hướng dẫn thiết lập.

:::

## Cài đặt

Cách dễ nhất để sử dụng `@wdio/mcp` là thông qua npx mà không cần cài đặt cục bộ:

```sh
npx @wdio/mcp
```

Hoặc cài đặt toàn cục:

```sh
npm install -g @wdio/mcp
```

## Sử dụng với Claude

Để sử dụng WebdriverIO MCP với Claude, sửa đổi tệp cấu hình:

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

Sau khi thêm cấu hình, khởi động lại Claude. Các công cụ WebdriverIO MCP sẽ có sẵn cho các tác vụ tự động hóa trình duyệt và di động.

### Sử dụng với Claude Code

Claude Code tự động phát hiện các máy chủ MCP. Bạn có thể cấu hình nó trong `.claude/settings.json` hoặc `.mcp.json` của dự án.

Hoặc thêm nó vào .claude.json toàn cục bằng cách thực thi:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Xác thực bằng cách chạy lệnh `/mcp` bên trong claude code.

## Ví dụ Bắt đầu Nhanh

### Tự động hóa Trình duyệt

Yêu cầu Claude tự động hóa các tác vụ trình duyệt:

```
"Mở Chrome và điều hướng đến https://webdriver.io"
"Nhấp vào nút 'Get Started'"
"Chụp ảnh màn hình của trang"
"Tìm tất cả các liên kết hiển thị trên trang"
```

### Tự động hóa Ứng dụng Di động

Yêu cầu Claude tự động hóa các ứng dụng di động:

```
"Khởi động ứng dụng iOS của tôi trên máy ảo iPhone 15"
"Nhấn vào nút đăng nhập"
"Vuốt lên để cuộn xuống"
"Chụp ảnh màn hình hiện tại"
```

## Khả năng

### Tự động hóa Trình duyệt (Chrome)

| Tính năng | Mô tả |
|---------|-------------|
| **Quản lý Phiên** | Khởi chạy Chrome ở chế độ có giao diện/headless với kích thước tùy chỉnh và URL điều hướng tùy chọn |
| **Điều hướng** | Điều hướng đến URL |
| **Tương tác Phần tử** | Nhấp vào phần tử, nhập văn bản, tìm phần tử bằng nhiều bộ chọn khác nhau |
| **Phân tích Trang** | Lấy các phần tử hiển thị (với phân trang), cây trợ năng (với bộ lọc) |
| **Ảnh chụp màn hình** | Chụp ảnh màn hình (tự động tối ưu hóa tối đa 1MB) |
| **Cuộn** | Cuộn lên/xuống theo số pixel có thể cấu hình |
| **Quản lý Cookie** | Lấy, đặt và xóa cookie |
| **Thực thi Script** | Thực thi JavaScript tùy chỉnh trong ngữ cảnh trình duyệt |

### Tự động hóa Ứng dụng Di động (iOS/Android)

| Tính năng | Mô tả |
|---------|-------------|
| **Quản lý Phiên** | Khởi chạy ứng dụng trên máy ảo, giả lập hoặc thiết bị thực |
| **Cử chỉ Chạm** | Chạm, vuốt, kéo và thả |
| **Phát hiện Phần tử** | Phát hiện phần tử thông minh với nhiều chiến lược định vị và phân trang |
| **Vòng đời Ứng dụng** | Lấy trạng thái ứng dụng (qua `execute_script` để kích hoạt/kết thúc) |
| **Chuyển đổi Ngữ cảnh** | Chuyển đổi giữa ngữ cảnh native và webview trong ứng dụng hybrid |
| **Điều khiển Thiết bị** | Xoay thiết bị, điều khiển bàn phím |
| **Vị trí Địa lý** | Lấy và đặt tọa độ GPS thiết bị |
| **Quyền** | Tự động xử lý quyền và thông báo |
| **Thực thi Script** | Thực thi các lệnh di động Appium (pressKey, deepLink, shell, v.v.) |

## Điều kiện tiên quyết

### Tự động hóa Trình duyệt

-   **Chrome** phải được cài đặt trên hệ thống của bạn
-   WebdriverIO tự động xử lý việc quản lý ChromeDriver

### Tự động hóa Di động

#### iOS

1. **Cài đặt Xcode** từ Mac App Store
2. **Cài đặt Xcode Command Line Tools**:
   ```sh
   xcode-select --install
   ```
3. **Cài đặt Appium**:
   ```sh
   npm install -g appium
   ```
4. **Cài đặt driver XCUITest**:
   ```sh
   appium driver install xcuitest
   ```
5. **Khởi động máy chủ Appium**:
   ```sh
   appium
   ```
6. **Cho Máy ảo**: Mở Xcode → Window → Devices and Simulators để tạo/quản lý máy ảo
7. **Cho Thiết bị Thực**: Bạn sẽ cần UDID của thiết bị (định danh duy nhất 40 ký tự)

#### Android

1. **Cài đặt Android Studio** và thiết lập Android SDK
2. **Đặt biến môi trường**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Cài đặt Appium**:
   ```sh
   npm install -g appium
   ```
4. **Cài đặt driver UiAutomator2**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Khởi động máy chủ Appium**:
   ```sh
   appium
   ```
6. **Tạo máy ảo** qua Android Studio → Virtual Device Manager
7. **Khởi động máy ảo** trước khi chạy kiểm thử

## Kiến trúc

### Cách Hoạt động

WebdriverIO MCP đóng vai trò là cầu nối giữa trợ lý AI và tự động hóa trình duyệt/di động:

```
┌─────────────────┐     Giao thức MCP     ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  hoặc Claude Code │     (stdio)         │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │   (Browser)   │             │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Quản lý Phiên

-   **Mô hình đơn phiên**: Chỉ một phiên trình duyệt HOẶC ứng dụng có thể hoạt động tại một thời điểm
-   **Trạng thái phiên** được duy trì toàn cục trong các lệnh gọi công cụ
-   **Tự động tách**: Các phiên với trạng thái được bảo toàn (`noReset: true`) tự động tách ra khi đóng

### Phát hiện Phần tử

#### Trình duyệt (Web)

-   Sử dụng script trình duyệt được tối ưu hóa để tìm tất cả các phần tử hiển thị, có thể tương tác
-   Trả về phần tử với CSS selectors, ID, class và thông tin ARIA
-   Mặc định lọc các phần tử hiển thị trong viewport

#### Di động (Ứng dụng Native)

-   Sử dụng phân tích nguồn trang XML hiệu quả (2 lệnh gọi HTTP so với 600+ cho truy vấn truyền thống)
-   Phân loại phần tử đặc thù theo nền tảng cho Android và iOS
-   Tạo nhiều chiến lược định vị cho mỗi phần tử:
    -   Accessibility ID (đa nền tảng, ổn định nhất)
    -   Resource ID / thuộc tính Name
    -   Khớp Text / Label
    -   XPath (đầy đủ và đơn giản hóa)
    -   UiAutomator (Android) / Predicates (iOS)

## Cú pháp Bộ chọn

Máy chủ MCP hỗ trợ nhiều chiến lược bộ chọn. Xem [Bộ chọn](./mcp/selectors) để biết tài liệu chi tiết.

### Web (CSS/XPath)

```
# CSS Selectors
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Text Selectors (đặc thù WebdriverIO)
button=Exact Button Text
a*=Partial Link Text
```

### Di động (Đa nền tảng)

```
# Accessibility ID (khuyến nghị - hoạt động trên iOS & Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (hoạt động trên cả hai nền tảng)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Công cụ Có sẵn

Máy chủ MCP cung cấp 25 công cụ cho tự động hóa trình duyệt và di động. Xem [Công cụ](./mcp/tools) để biết tài liệu tham khảo đầy đủ.

### Công cụ Trình duyệt

| Công cụ | Mô tả |
|------|-------------|
| `start_browser` | Khởi chạy trình duyệt Chrome (với URL ban đầu tùy chọn) |
| `close_session` | Đóng hoặc tách khỏi phiên |
| `navigate` | Điều hướng đến URL |
| `click_element` | Nhấp vào phần tử |
| `set_value` | Nhập văn bản vào ô nhập liệu |
| `get_visible_elements` | Lấy các phần tử hiển thị/có thể tương tác (với phân trang) |
| `get_accessibility` | Lấy cây trợ năng (với bộ lọc) |
| `take_screenshot` | Chụp ảnh màn hình (tự động tối ưu hóa) |
| `scroll` | Cuộn trang lên hoặc xuống |
| `get_cookies` / `set_cookie` / `delete_cookies` | Quản lý cookie |
| `execute_script` | Thực thi JavaScript trong trình duyệt |

### Công cụ Di động

| Công cụ | Mô tả |
|------|-------------|
| `start_app_session` | Khởi chạy ứng dụng iOS/Android |
| `tap_element` | Chạm vào phần tử hoặc tọa độ |
| `swipe` | Vuốt theo hướng |
| `drag_and_drop` | Kéo giữa các vị trí |
| `get_app_state` | Kiểm tra xem ứng dụng có đang chạy không |
| `get_contexts` / `switch_context` | Chuyển đổi ngữ cảnh ứng dụng hybrid |
| `rotate_device` | Xoay sang dọc/ngang |
| `get_geolocation` / `set_geolocation` | Lấy hoặc đặt tọa độ GPS |
| `hide_keyboard` | Ẩn bàn phím trên màn hình |
| `execute_script` | Thực thi lệnh di động Appium |

## Xử lý Tự động

### Quyền

Theo mặc định, máy chủ MCP tự động cấp quyền cho ứng dụng (`autoGrantPermissions: true`), loại bỏ nhu cầu xử lý thủ công hộp thoại quyền trong quá trình tự động hóa.

### Cảnh báo Hệ thống

Cảnh báo hệ thống (như "Cho phép thông báo?") được tự động chấp nhận theo mặc định (`autoAcceptAlerts: true`). Điều này có thể được cấu hình để từ chối với `autoDismissAlerts: true`.

## Cấu hình

### Biến Môi trường

Cấu hình kết nối máy chủ Appium:

| Biến | Mặc định | Mô tả |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Tên máy chủ Appium |
| `APPIUM_URL_PORT` | `4723` | Cổng máy chủ Appium |
| `APPIUM_PATH` | `/` | Đường dẫn máy chủ Appium |

### Ví dụ với Máy chủ Appium Tùy chỉnh

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724"
            }
        }
    }
}
```

## Tối ưu hóa Hiệu suất

Máy chủ MCP được tối ưu hóa cho giao tiếp hiệu quả với trợ lý AI:

-   **Định dạng TOON**: Sử dụng Token-Oriented Object Notation để sử dụng token tối thiểu
-   **Phân tích XML**: Phát hiện phần tử di động sử dụng 2 lệnh gọi HTTP (so với 600+ theo truyền thống)
-   **Nén Ảnh chụp màn hình**: Hình ảnh tự động nén tối đa 1MB bằng Sharp
-   **Lọc Viewport**: Mặc định chỉ trả về các phần tử hiển thị
-   **Phân trang**: Danh sách phần tử lớn có thể được phân trang để giảm kích thước phản hồi

## Hỗ trợ TypeScript

Máy chủ MCP được viết bằng TypeScript và bao gồm đầy đủ các định nghĩa kiểu. Nếu bạn đang mở rộng hoặc tích hợp với máy chủ theo cách lập trình, bạn sẽ được hưởng lợi từ tự động hoàn thành và an toàn kiểu.

## Xử lý Lỗi

Tất cả các công cụ được thiết kế với xử lý lỗi mạnh mẽ:

-   Lỗi được trả về dưới dạng nội dung văn bản (không bao giờ ném ra), duy trì sự ổn định của giao thức MCP
-   Thông báo lỗi mô tả giúp chẩn đoán vấn đề
-   Trạng thái phiên được bảo toàn ngay cả khi các thao tác riêng lẻ thất bại

## Trường hợp Sử dụng

### Đảm bảo Chất lượng

-   Thực thi trường hợp kiểm thử được hỗ trợ bởi AI
-   Kiểm thử hồi quy hình ảnh với ảnh chụp màn hình
-   Kiểm tra khả năng truy cập qua phân tích cây trợ năng

### Thu thập Dữ liệu & Trích xuất Web

-   Điều hướng các luồng đa trang phức tạp
-   Trích xuất dữ liệu có cấu trúc từ nội dung động
-   Xử lý xác thực và quản lý phiên

### Kiểm thử Ứng dụng Di động

-   Tự động hóa kiểm thử đa nền tảng (iOS + Android)
-   Xác thực luồng onboarding
-   Kiểm thử deep linking và điều hướng

### Kiểm thử Tích hợp

-   Kiểm thử end-to-end
-   Xác minh tích hợp API + UI
-   Kiểm tra nhất quán đa nền tảng

## Xử lý Sự cố

### Trình duyệt không khởi động

-   Đảm bảo Chrome đã được cài đặt
-   Kiểm tra xem không có quy trình nào khác đang sử dụng cổng debug mặc định (9222)
-   Thử chế độ headless nếu gặp vấn đề về hiển thị

### Kết nối Appium thất bại

-   Xác minh máy chủ Appium đang chạy (`appium`)
-   Kiểm tra cấu hình URL và cổng Appium
-   Đảm bảo driver thích hợp đã được cài đặt (`appium driver list`)

### Vấn đề với iOS Simulator

-   Đảm bảo Xcode đã được cài đặt và cập nhật
-   Kiểm tra các máy ảo có sẵn (`xcrun simctl list devices`)
-   Đối với thiết bị thực, xác minh UDID là chính xác

### Vấn đề với Android Emulator

-   Đảm bảo Android SDK được cấu hình đúng
-   Xác minh máy ảo đang chạy (`adb devices`)
-   Kiểm tra biến môi trường `ANDROID_HOME` đã được thiết lập

## Tài nguyên

-   [Tài liệu Công cụ](./mcp/tools) - Danh sách đầy đủ các công cụ có sẵn
-   [Hướng dẫn Bộ chọn](./mcp/selectors) - Tài liệu cú pháp bộ chọn
-   [Cấu hình](./mcp/configuration) - Tùy chọn cấu hình
-   [FAQ](./mcp/faq) - Câu hỏi thường gặp
-   [Kho GitHub](https://github.com/webdriverio/mcp) - Mã nguồn và vấn đề
-   [Gói NPM](https://www.npmjs.com/package/@wdio/mcp) - Gói trên npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Đặc tả MCP
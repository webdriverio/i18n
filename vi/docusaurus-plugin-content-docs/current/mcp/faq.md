---
id: faq
title: Câu hỏi thường gặp
---

Câu hỏi thường gặp về WebdriverIO MCP.

## Tổng quan

### MCP là gì?

MCP (Model Context Protocol) là một giao thức mở cho phép trợ lý AI như Claude tương tác với các công cụ và dịch vụ bên ngoài. WebdriverIO MCP triển khai giao thức này để cung cấp khả năng tự động hóa trình duyệt và thiết bị di động cho Claude Desktop và Claude Code.

### Tôi có thể tự động hóa những gì với WebdriverIO MCP?

Bạn có thể tự động hóa:
-   **Trình duyệt máy tính** (Chrome) - điều hướng, nhấp chuột, nhập liệu, chụp màn hình
-   **Ứng dụng iOS** - trên giả lập hoặc thiết bị thực
-   **Ứng dụng Android** - trên giả lập hoặc thiết bị thực
-   **Ứng dụng Hybrid** - chuyển đổi giữa ngữ cảnh native và web

### Tôi có cần viết mã không?

Không! Đó là lợi ích chính của MCP. Bạn có thể mô tả những gì bạn muốn làm bằng ngôn ngữ tự nhiên, và Claude sẽ sử dụng các công cụ thích hợp để hoàn thành nhiệm vụ.

**Ví dụ về lệnh:**
-   "Mở Chrome và điều hướng đến webdriver.io"
-   "Nhấp vào nút Get Started"
-   "Chụp ảnh màn hình trang hiện tại"
-   "Khởi động ứng dụng iOS của tôi và đăng nhập với tài khoản test"

---

## Cài đặt & Thiết lập

### Làm thế nào để cài đặt WebdriverIO MCP?

Bạn không cần cài đặt riêng. MCP server tự động chạy thông qua npx khi bạn cấu hình nó trong Claude Desktop hoặc Claude Code.

Thêm đoạn này vào cấu hình Claude Desktop của bạn:

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

### File cấu hình Claude Desktop ở đâu?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Tôi có cần Appium để tự động hóa trình duyệt không?

Không. Tự động hóa trình duyệt chỉ yêu cầu Chrome được cài đặt. WebdriverIO tự động xử lý ChromeDriver.

### Tôi có cần Appium để tự động hóa thiết bị di động không?

Có. Tự động hóa thiết bị di động yêu cầu:
1. Appium server đang chạy (`npm install -g appium && appium`)
2. Driver cho nền tảng đã được cài đặt (`appium driver install xcuitest` cho iOS, `appium driver install uiautomator2` cho Android)
3. Công cụ phát triển phù hợp (Xcode cho iOS, Android SDK cho Android)

---

## Tự động hóa trình duyệt

### Trình duyệt nào được hỗ trợ?

Hiện tại, chỉ **Chrome** được hỗ trợ. Hỗ trợ cho các trình duyệt khác có thể được thêm vào trong các phiên bản tương lai.

### Tôi có thể chạy Chrome ở chế độ headless không?

Có! Yêu cầu Claude khởi động trình duyệt ở chế độ headless:

"Khởi động Chrome ở chế độ headless"

Hoặc Claude sẽ sử dụng tùy chọn này khi thích hợp (ví dụ: trong ngữ cảnh CI/CD).

### Tôi có thể đặt kích thước cửa sổ trình duyệt không?

Có. Bạn có thể chỉ định kích thước khi khởi động trình duyệt:

"Khởi động Chrome với kích thước cửa sổ 1920x1080"

Kích thước được hỗ trợ: rộng 400-3840 pixel, cao 400-2160 pixel. Mặc định là 1920x1080.

### Tôi có thể khởi động trình duyệt và điều hướng trong một bước không?

Có! Sử dụng tham số `navigationUrl`:

"Khởi động Chrome và điều hướng đến https://webdriver.io"

Điều này hiệu quả hơn việc khởi động trình duyệt và sau đó điều hướng riêng biệt.

### Làm thế nào để chụp ảnh màn hình?

Đơn giản là yêu cầu Claude:

"Chụp ảnh màn hình trang hiện tại"

Ảnh chụp màn hình được tự động tối ưu hóa:
- Kích thước tối đa 2000px
- Nén tối đa 1MB
- Định dạng: PNG hoặc JPEG (tự động chọn để chất lượng tối ưu)

### Tôi có thể tương tác với iframe không?

Hiện tại, MCP server hoạt động trên tài liệu chính. Tương tác iframe có thể được thêm vào trong các phiên bản tương lai.

### Tôi có thể thực thi JavaScript tùy chỉnh không?

Có! Sử dụng công cụ `execute_script`:

"Thực thi script để lấy tiêu đề trang"
"Thực thi script: return document.querySelectorAll('button').length"

---

## Tự động hóa thiết bị di động

### Làm thế nào để khởi động một ứng dụng iOS?

Yêu cầu Claude với các chi tiết cần thiết:

"Khởi động ứng dụng iOS của tôi tại /path/to/MyApp.app trên giả lập iPhone 15"

Hoặc đối với ứng dụng đã cài đặt:

"Khởi động ứng dụng với noReset được bật trên giả lập iPhone 15"

### Làm thế nào để khởi động một ứng dụng Android?

"Khởi động ứng dụng Android của tôi tại /path/to/app.apk trên giả lập Pixel 7"

Hoặc đối với ứng dụng đã cài đặt:

"Khởi động ứng dụng với noReset được bật trên giả lập Pixel 7"

### Tôi có thể kiểm tra trên thiết bị thực không?

Có! Đối với thiết bị thực, bạn cần UDID của thiết bị:

-   **iOS:** Kết nối thiết bị, mở Finder, nhấp vào thiết bị, nhấp vào số sê-ri để hiển thị UDID
-   **Android:** Chạy `adb devices` trong terminal

Sau đó yêu cầu Claude:

"Khởi động ứng dụng iOS của tôi trên thiết bị thực có UDID abc123..."

### Làm thế nào để xử lý các hộp thoại quyền?

Mặc định, các quyền được tự động cấp (`autoGrantPermissions: true`). Nếu bạn cần kiểm tra các luồng quyền, bạn có thể tắt tính năng này:

"Khởi động ứng dụng của tôi mà không tự động cấp quyền"

### Những cử chỉ nào được hỗ trợ?

-   **Tap:** Nhấn vào các phần tử hoặc tọa độ
-   **Swipe:** Vuốt lên, xuống, trái, phải
-   **Drag and Drop:** Kéo từ phần tử này sang phần tử khác hoặc đến tọa độ

Lưu ý: `long_press` có sẵn thông qua `execute_script` với các lệnh di động của Appium.

### Làm thế nào để cuộn trong ứng dụng di động?

Sử dụng cử chỉ vuốt:

"Vuốt lên để cuộn xuống"
"Vuốt xuống để cuộn lên"

### Tôi có thể xoay thiết bị không?

Có:

"Xoay thiết bị sang ngang"
"Xoay thiết bị sang dọc"

### Làm thế nào để xử lý ứng dụng hybrid?

Đối với các ứng dụng có webviews, bạn có thể chuyển đổi ngữ cảnh:

"Lấy các ngữ cảnh có sẵn"
"Chuyển sang ngữ cảnh webview"
"Chuyển lại ngữ cảnh native"

### Tôi có thể thực hiện các lệnh di động của Appium không?

Có! Sử dụng công cụ `execute_script`:

```
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Nhấn BACK trên Android
Execute script "mobile: activateApp" with args [{ appId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

---

## Lựa chọn phần tử

### Làm thế nào Claude biết phần tử nào để tương tác?

Claude sử dụng công cụ `get_visible_elements` để xác định các phần tử tương tác trên trang/màn hình. Mỗi phần tử đi kèm với nhiều chiến lược chọn.

### Điều gì xảy ra nếu có quá nhiều phần tử trên trang?

Sử dụng phân trang để quản lý danh sách phần tử lớn:

"Lấy 20 phần tử hiển thị đầu tiên"
"Lấy phần tử hiển thị với offset 20 và limit 20"

Phản hồi bao gồm `total`, `showing`, và `hasMore` để giúp điều hướng qua các phần tử.

### Tôi có thể lấy chỉ các loại phần tử cụ thể không?

Có! Sử dụng tham số `elementType`:

-   `interactable` (mặc định): Nút, liên kết, đầu vào
-   `visual`: Hình ảnh, SVG
-   `all`: Cả hai loại

"Lấy các phần tử hiển thị trực quan trên trang"

### Điều gì xảy ra nếu Claude nhấp vào phần tử sai?

Bạn có thể cụ thể hơn:

-   Cung cấp văn bản chính xác: "Nhấp vào nút có nội dung 'Submit Order'"
-   Cung cấp bộ chọn: "Nhấp vào phần tử có bộ chọn #submit-btn"
-   Cung cấp ID khả năng truy cập: "Nhấp vào phần tử có ID khả năng truy cập loginButton"

### Chiến lược chọn nào tốt nhất cho thiết bị di động?

1. **Accessibility ID** (tốt nhất) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (phương án cuối cùng) - chậm hơn nhưng hoạt động ở mọi nơi

### Cây khả năng truy cập là gì và khi nào nên sử dụng nó?

Cây khả năng truy cập cung cấp thông tin ngữ nghĩa về các phần tử trang (vai trò, tên, trạng thái). Sử dụng `get_accessibility` khi:
- `get_visible_elements` không trả về các phần tử mong đợi
- Bạn cần tìm phần tử theo vai trò khả năng truy cập (nút, liên kết, hộp văn bản, v.v.)
- Bạn cần thông tin ngữ nghĩa chi tiết về các phần tử

"Lấy cây khả năng truy cập lọc theo vai trò nút và liên kết"

---

## Quản lý phiên

### Tôi có thể có nhiều phiên cùng lúc không?

Không. MCP server sử dụng mô hình đơn phiên. Chỉ một phiên trình duyệt hoặc ứng dụng có thể hoạt động tại một thời điểm.

### Điều gì xảy ra khi tôi đóng một phiên?

Điều đó phụ thuộc vào loại phiên và cài đặt:

-   **Trình duyệt:** Chrome đóng hoàn toàn
-   **Thiết bị di động với `noReset: false`:** Ứng dụng kết thúc
-   **Thiết bị di động với `noReset: true` hoặc không có `appPath`:** Ứng dụng vẫn mở (phiên tự động tách)

### Tôi có thể giữ nguyên trạng thái ứng dụng giữa các phiên không?

Có! Sử dụng tùy chọn `noReset`:

"Khởi động ứng dụng của tôi với noReset được bật"

Điều này giữ nguyên trạng thái đăng nhập, tùy chọn, và dữ liệu ứng dụng khác.

### Sự khác biệt giữa đóng và tách là gì?

-   **Đóng:** Kết thúc trình duyệt/ứng dụng hoàn toàn
-   **Tách:** Ngắt kết nối tự động hóa nhưng giữ trình duyệt/ứng dụng đang chạy

Tách hữu ích khi bạn muốn kiểm tra thủ công trạng thái sau khi tự động hóa.

### Phiên của tôi liên tục hết thời gian trong quá trình gỡ lỗi

Tăng thời gian chờ lệnh:

"Khởi động ứng dụng của tôi với newCommandTimeout là 300 giây"

Mặc định là 60 giây. Đối với các phiên gỡ lỗi dài, hãy thử 300-600 giây.

---

## Xử lý sự cố

### Lỗi "Session not found"

Điều này có nghĩa là không có phiên nào đang hoạt động. Hãy bắt đầu phiên trình duyệt hoặc ứng dụng trước:

"Khởi động Chrome và điều hướng đến google.com"

### Lỗi "Element not found"

Phần tử có thể không hiển thị hoặc có bộ chọn khác. Hãy thử:

1. Yêu cầu Claude lấy tất cả phần tử hiển thị trước
2. Cung cấp bộ chọn cụ thể hơn
3. Đợi trang/ứng dụng tải hoàn toàn
4. Sử dụng `inViewportOnly: false` để tìm phần tử ngoài màn hình

### Trình duyệt không khởi động

1. Đảm bảo Chrome được cài đặt
2. Kiểm tra xem có tiến trình nào khác đang sử dụng cổng gỡ lỗi (9222) không
3. Thử chế độ headless

### Kết nối Appium thất bại

Đây là vấn đề phổ biến nhất khi bắt đầu tự động hóa di động.

1. **Xác minh Appium đang chạy**: `curl http://localhost:4723/status`
2. Khởi động Appium nếu cần: `appium`
3. Kiểm tra cấu hình URL Appium của bạn khớp với máy chủ
4. Đảm bảo các driver được cài đặt: `appium driver list --installed`

:::tip
MCP server yêu cầu Appium đang chạy trước khi bắt đầu phiên di động. Đảm bảo khởi động Appium trước:
```sh
appium
```
Các phiên bản tương lai có thể bao gồm quản lý dịch vụ Appium tự động.
:::

### Giả lập iOS không khởi động

1. Đảm bảo Xcode được cài đặt: `xcode-select --install`
2. Liệt kê các giả lập có sẵn: `xcrun simctl list devices`
3. Kiểm tra lỗi giả lập cụ thể trong Console.app

### Giả lập Android không khởi động

1. Đặt `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Kiểm tra các giả lập: `emulator -list-avds`
3. Khởi động giả lập thủ công: `emulator -avd <avd-name>`
4. Xác minh thiết bị được kết nối: `adb devices`

### Ảnh chụp màn hình không hoạt động

1. Đối với thiết bị di động, đảm bảo phiên đang hoạt động
2. Đối với trình duyệt, hãy thử một trang khác (một số trang chặn ảnh chụp màn hình)
3. Kiểm tra nhật ký Claude Desktop để tìm lỗi

Ảnh chụp màn hình được tự động nén tối đa 1MB, vì vậy ảnh chụp màn hình lớn sẽ hoạt động nhưng có thể chất lượng thấp hơn.

---

## Hiệu suất

### Tại sao tự động hóa di động chậm?

Tự động hóa di động bao gồm:
1. Giao tiếp mạng với máy chủ Appium
2. Appium giao tiếp với thiết bị/giả lập
3. Thiết bị hiển thị và phản hồi

Mẹo để tự động hóa nhanh hơn:
-   Sử dụng giả lập thay vì thiết bị thực cho phát triển
-   Sử dụng accessibility ID thay vì XPath
-   Bật `inViewportOnly: true` cho việc phát hiện phần tử
-   Sử dụng phân trang (`limit`) để giảm sử dụng token

### Làm thế nào để tăng tốc phát hiện phần tử?

MCP server đã tối ưu hóa việc phát hiện phần tử bằng cách phân tích nguồn trang XML (2 lệnh gọi HTTP thay vì 600+ cho truy vấn phần tử truyền thống). Mẹo bổ sung:

-   Giữ `inViewportOnly: true` (mặc định)
-   Đặt `includeContainers: false` (mặc định)
-   Sử dụng `limit` và `offset` cho phân trang trên màn hình lớn
-   Sử dụng bộ chọn cụ thể thay vì tìm tất cả phần tử

### Ảnh chụp màn hình chậm hoặc thất bại

Ảnh chụp màn hình được tự động tối ưu hóa:
- Thay đổi kích thước nếu lớn hơn 2000px
- Nén để dưới 1MB
- Chuyển đổi sang JPEG nếu PNG quá lớn

Việc tối ưu hóa này giảm thời gian xử lý và đảm bảo Claude có thể xử lý hình ảnh.

---

## Hạn chế

### Các hạn chế hiện tại là gì?

-   **Phiên đơn:** Chỉ một trình duyệt/ứng dụng tại một thời điểm
-   **Hỗ trợ trình duyệt:** Chỉ Chrome (hiện tại)
-   **Hỗ trợ iframe:** Hỗ trợ iframe hạn chế
-   **Tải lên tệp:** Không được hỗ trợ trực tiếp qua công cụ
-   **Âm thanh/Video:** Không thể tương tác với phát lại media
-   **Tiện ích mở rộng trình duyệt:** Không được hỗ trợ

### Tôi có thể sử dụng điều này cho kiểm thử sản xuất không?

WebdriverIO MCP được thiết kế cho tự động hóa tương tác có hỗ trợ AI. Đối với kiểm thử CI/CD sản xuất, hãy xem xét sử dụng trình chạy kiểm thử truyền thống của WebdriverIO với đầy đủ điều khiển lập trình.

---

## Bảo mật

### Dữ liệu của tôi có an toàn không?

MCP server chạy cục bộ trên máy của bạn. Tất cả tự động hóa diễn ra thông qua kết nối trình duyệt/Appium cục bộ. Không có dữ liệu nào được gửi đến máy chủ bên ngoài ngoài những gì bạn điều hướng đến một cách rõ ràng.

### Claude có thể truy cập mật khẩu của tôi không?

Claude có thể thấy nội dung trang và tương tác với các phần tử, nhưng:
-   Mật khẩu trong trường `<input type="password">` được che dấu
-   Bạn nên tránh tự động hóa thông tin đăng nhập nhạy cảm
-   Sử dụng tài khoản kiểm thử để tự động hóa

---

## Đóng góp

### Làm thế nào để đóng góp?

Truy cập [kho lưu trữ GitHub](https://github.com/webdriverio/mcp) để:
-   Báo cáo lỗi
-   Yêu cầu tính năng
-   Gửi pull request

### Tôi có thể nhận trợ giúp ở đâu?

-   [WebdriverIO Discord](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Tài liệu WebdriverIO](https://webdriver.io/)
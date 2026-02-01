---
id: tools
title: Công cụ
---

Các công cụ sau đây có sẵn thông qua máy chủ WebdriverIO MCP. Những công cụ này cho phép trợ lý AI tự động hóa trình duyệt và ứng dụng di động.

## Quản lý Phiên

### `start_browser`

Khởi chạy một phiên trình duyệt Chrome.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `headless` | boolean | Không | `false` | Chạy Chrome ở chế độ headless |
| `windowWidth` | number | Không | `1920` | Chiều rộng cửa sổ trình duyệt (400-3840) |
| `windowHeight` | number | Không | `1080` | Chiều cao cửa sổ trình duyệt (400-2160) |
| `navigationUrl` | string | Không | - | URL để điều hướng đến sau khi khởi động trình duyệt |

#### Ví dụ

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Hỗ trợ

- Desktop Browsers

---

### `start_app_session`

Khởi chạy một phiên ứng dụng di động trên iOS hoặc Android thông qua Appium.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `platform` | string | Có | - | Nền tảng để tự động hóa: `iOS` hoặc `Android` |
| `deviceName` | string | Có | - | Tên của thiết bị hoặc simulator/emulator |
| `appPath` | string | Không* | - | Đường dẫn đến tập tin ứng dụng (.app, .ipa, hoặc .apk) |
| `platformVersion` | string | Không | - | Phiên bản hệ điều hành (ví dụ: `17.0`, `14`) |
| `automationName` | string | Không | Auto | `XCUITest` (iOS), `UiAutomator2` hoặc `Espresso` (Android) |
| `udid` | string | Không | - | Mã định danh thiết bị duy nhất (bắt buộc cho thiết bị iOS thực) |
| `noReset` | boolean | Không | `false` | Giữ nguyên trạng thái ứng dụng giữa các phiên |
| `fullReset` | boolean | Không | `true` | Gỡ cài đặt và cài đặt lại ứng dụng trước phiên |
| `autoGrantPermissions` | boolean | Không | `true` | Tự động cấp quyền cho ứng dụng |
| `autoAcceptAlerts` | boolean | Không | `true` | Tự động chấp nhận các thông báo hệ thống |
| `autoDismissAlerts` | boolean | Không | `false` | Từ chối (thay vì chấp nhận) các thông báo |
| `appWaitActivity` | string | Không | - | Activity để đợi khi khởi động (chỉ Android) |
| `newCommandTimeout` | number | Không | `60` | Số giây trước khi phiên hết hạn do không hoạt động |
| `appiumHost` | string | Không | `127.0.0.1` | Hostname máy chủ Appium |
| `appiumPort` | number | Không | `4723` | Cổng máy chủ Appium |
| `appiumPath` | string | Không | `/` | Đường dẫn máy chủ Appium |

*Hoặc `appPath` phải được cung cấp, hoặc `noReset: true` để kết nối với ứng dụng đang chạy.

#### Ví dụ

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Hỗ trợ

- iOS Simulators
- iOS Real Devices
- Android Emulators
- Android Real Devices

---

### `close_session`

Đóng phiên trình duyệt hoặc ứng dụng hiện tại.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `detach` | boolean | Không | `false` | Tách khỏi phiên thay vì đóng (giữ cho trình duyệt/ứng dụng tiếp tục chạy) |

#### Ghi chú

Các phiên với `noReset: true` hoặc không có `appPath` tự động tách khi đóng để bảo toàn trạng thái.

#### Hỗ trợ

- Desktop Browsers
- Mobile Apps

---

## Điều hướng

### `navigate`

Điều hướng đến một URL.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `url` | string | Có | URL để điều hướng đến |

#### Ví dụ

```
Navigate to https://webdriver.io
```

#### Hỗ trợ

- Desktop Browsers

---

## Tương tác Phần tử

### `click_element`

Nhấp vào một phần tử được xác định bởi một bộ chọn.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Có | - | Bộ chọn CSS, XPath, hoặc bộ chọn di động |
| `scrollToView` | boolean | Không | `true` | Cuộn phần tử vào tầm nhìn trước khi nhấp |
| `timeout` | number | Không | `3000` | Thời gian tối đa để đợi phần tử (ms) |

#### Ghi chú

- Hỗ trợ bộ chọn văn bản WebdriverIO: `button=Exact text` hoặc `a*=Contains text`
- Sử dụng căn chỉnh trung tâm cho vị trí cuộn

#### Ví dụ

```
Click the element with selector "#submit-button"
```

#### Hỗ trợ

- Desktop Browsers
- Mobile Native Apps

---

### `set_value`

Nhập văn bản vào một trường nhập liệu.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Có | - | Bộ chọn cho phần tử nhập liệu |
| `value` | string | Có | - | Văn bản để nhập |
| `scrollToView` | boolean | Không | `true` | Cuộn phần tử vào tầm nhìn trước khi nhập |
| `timeout` | number | Không | `3000` | Thời gian tối đa để đợi phần tử (ms) |

#### Ghi chú

Xóa giá trị hiện có trước khi nhập văn bản mới.

#### Ví dụ

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Hỗ trợ

- Desktop Browsers
- Mobile Native Apps

---

## Phân tích Trang

### `get_visible_elements`

Lấy các phần tử hiển thị và có thể tương tác trên trang hiện tại hoặc màn hình. Đây là công cụ chính để phát hiện những phần tử có sẵn để tương tác.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | Không | `interactable` | Loại phần tử: `interactable` (nút/liên kết/nhập liệu), `visual` (hình ảnh/SVG), hoặc `all` |
| `inViewportOnly` | boolean | Không | `true` | Chỉ trả về các phần tử hiển thị trong khung nhìn |
| `includeContainers` | boolean | Không | `false` | Bao gồm các container bố cục (ViewGroup, ScrollView, v.v.) |
| `includeBounds` | boolean | Không | `false` | Bao gồm tọa độ phần tử (x, y, width, height) |
| `limit` | number | Không | `0` | Số phần tử tối đa để trả về (0 = không giới hạn) |
| `offset` | number | Không | `0` | Số phần tử để bỏ qua (để phân trang) |

#### Trả về

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Các phần tử Web bao gồm:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Các phần tử Di động bao gồm:** Nhiều chiến lược định vị (accessibility ID, resource ID, XPath, UiAutomator/predicates), loại phần tử, văn bản, và tùy chọn giới hạn

#### Ghi chú

- **Web**: Sử dụng script trình duyệt được tối ưu hóa để phát hiện phần tử nhanh
- **Di động**: Sử dụng phân tích nguồn trang XML hiệu quả (2 HTTP calls thay vì 600+ cho các truy vấn phần tử)
- Sử dụng phân trang (`limit` và `offset`) cho các trang lớn để giảm sử dụng token

#### Ví dụ

```
Get all visible elements on the page with their coordinates
```

#### Hỗ trợ

- Desktop Browsers
- Mobile Apps

---

### `get_accessibility`

Lấy cây trợ năng của trang hiện tại với thông tin ngữ nghĩa về vai trò, tên và trạng thái.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `limit` | number | Không | `100` | Số nút tối đa để trả về (0 = không giới hạn) |
| `offset` | number | Không | `0` | Số nút để bỏ qua (để phân trang) |
| `roles` | string[] | Không | All | Lọc theo vai trò cụ thể (ví dụ: `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | Không | `true` | Chỉ trả về các nút có tên/nhãn |

#### Trả về

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### Ghi chú

- Chỉ dành cho trình duyệt. Đối với ứng dụng di động, sử dụng `get_visible_elements` thay thế
- Hữu ích khi `get_visible_elements` không trả về các phần tử mong đợi
- `namedOnly: true` lọc ra các container ẩn danh và giảm nhiễu

#### Hỗ trợ

- Desktop Browsers

---

## Chụp màn hình

### `take_screenshot`

Chụp ảnh màn hình của khung nhìn hiện tại.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `outputPath` | string | Không | Đường dẫn để lưu tệp ảnh chụp màn hình. Nếu bỏ qua, trả về dữ liệu base64 |

#### Trả về

Dữ liệu hình ảnh mã hóa base64 (PNG hoặc JPEG) với thông tin kích thước.

#### Ghi chú

Ảnh chụp màn hình được tối ưu hóa tự động:
- Kích thước tối đa: 2000px (được thu nhỏ nếu lớn hơn)
- Kích thước tệp tối đa: 1MB
- Định dạng: PNG với nén tối đa, hoặc JPEG nếu cần để đáp ứng giới hạn kích thước

#### Hỗ trợ

- Desktop Browsers
- Mobile Apps

---

## Cuộn trang

### `scroll`

Cuộn trang lên hoặc xuống một số pixel nhất định.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Có | - | Hướng cuộn: `up` hoặc `down` |
| `pixels` | number | Không | `500` | Số pixel để cuộn |

#### Ghi chú

Chỉ dành cho trình duyệt. Đối với cuộn di động, sử dụng công cụ `swipe` thay thế.

#### Hỗ trợ

- Desktop Browsers

---

## Quản lý Cookie

### `get_cookies`

Lấy cookie từ phiên hiện tại.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `name` | string | Không | Tên cookie cụ thể để lấy (bỏ qua để lấy tất cả cookie) |

#### Trả về

Các đối tượng cookie với name, value, domain, path, expiry, secure và httpOnly.

#### Hỗ trợ

- Desktop Browsers

---

### `set_cookie`

Đặt cookie trong phiên hiện tại.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `name` | string | Có | - | Tên cookie |
| `value` | string | Có | - | Giá trị cookie |
| `domain` | string | Không | Hiện tại | Domain cookie |
| `path` | string | Không | `/` | Đường dẫn cookie |
| `expiry` | number | Không | - | Thời hạn dưới dạng timestamp Unix (giây) |
| `secure` | boolean | Không | - | Cờ bảo mật |
| `httpOnly` | boolean | Không | - | Cờ HttpOnly |
| `sameSite` | string | Không | - | Thuộc tính SameSite: `strict`, `lax`, hoặc `none` |

#### Hỗ trợ

- Desktop Browsers

---

### `delete_cookies`

Xóa cookie khỏi phiên hiện tại.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `name` | string | Không | Tên cookie cụ thể để xóa (bỏ qua để xóa tất cả) |

#### Hỗ trợ

- Desktop Browsers

---

## Cử chỉ Cảm ứng (Di động)

### `tap_element`

Chạm vào một phần tử hoặc tọa độ màn hình.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `selector` | string | Không* | Bộ chọn cho phần tử để chạm |
| `x` | number | Không* | Tọa độ X để chạm |
| `y` | number | Không* | Tọa độ Y để chạm |

*Hoặc `selector` hoặc cả `x` và `y` đều bắt buộc.

#### Hỗ trợ

- Mobile Apps

---

### `swipe`

Thực hiện cử chỉ vuốt theo hướng được chỉ định.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Có | - | Hướng vuốt: `up`, `down`, `left`, `right` |
| `duration` | number | Không | `500` | Thời lượng vuốt tính bằng mili giây (100-5000) |
| `percent` | number | Không | 0.5/0.95 | Phần trăm màn hình để vuốt (0-1) |

#### Ghi chú

- Phần trăm mặc định: 0.5 cho vuốt dọc, 0.95 cho vuốt ngang
- Hướng chỉ ra chuyển động nội dung: "vuốt lên" cuộn nội dung lên

#### Ví dụ

```
Swipe up to scroll down the screen
```

#### Hỗ trợ

- Mobile Apps

---

### `drag_and_drop`

Kéo một phần tử đến phần tử khác hoặc đến tọa độ.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | Có | Bộ chọn phần tử nguồn để kéo |
| `targetSelector` | string | Không* | Bộ chọn phần tử đích để thả vào |
| `x` | number | Không* | Offset X đích (nếu không có targetSelector) |
| `y` | number | Không* | Offset Y đích (nếu không có targetSelector) |
| `duration` | number | Không | Mặc định | Thời lượng kéo tính bằng mili giây (100-5000) |

*Hoặc `targetSelector` hoặc cả `x` và `y` đều bắt buộc.

#### Hỗ trợ

- Mobile Apps

---

## Vòng đời Ứng dụng (Di động)

### `get_app_state`

Lấy trạng thái hiện tại của ứng dụng.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `bundleId` | string | Có | Định danh ứng dụng (bundle ID cho iOS, package name cho Android) |

#### Trả về

Trạng thái ứng dụng: `not installed`, `not running`, `running in background (suspended)`, `running in background`, hoặc `running in foreground`.

#### Hỗ trợ

- Mobile Apps

---

## Chuyển đổi Context (Ứng dụng Hybrid)

### `get_contexts`

Liệt kê tất cả các context có sẵn (native và webview).

#### Tham số

Không

#### Trả về

Mảng tên context (ví dụ: `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Hỗ trợ

- Mobile Hybrid Apps

---

### `get_current_context`

Lấy context đang hoạt động hiện tại.

#### Tham số

Không

#### Trả về

Tên context hiện tại (ví dụ: `NATIVE_APP` hoặc `WEBVIEW_*`).

#### Hỗ trợ

- Mobile Hybrid Apps

---

### `switch_context`

Chuyển đổi giữa các context native và webview.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `context` | string | Có | Tên context hoặc chỉ số (bắt đầu từ 1) từ `get_contexts` |

#### Ví dụ

```
Switch to the WEBVIEW_com.example.app context
```

#### Hỗ trợ

- Mobile Hybrid Apps

---

## Điều khiển Thiết bị (Di động)

### `rotate_device`

Xoay thiết bị theo hướng cụ thể.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `orientation` | string | Có | `PORTRAIT` hoặc `LANDSCAPE` |

#### Hỗ trợ

- Mobile Apps

---

### `hide_keyboard`

Ẩn bàn phím trên màn hình.

#### Tham số

Không

#### Hỗ trợ

- Mobile Apps

---

### `get_geolocation`

Lấy tọa độ GPS hiện tại.

#### Tham số

Không

#### Trả về

Đối tượng với `latitude`, `longitude`, và `altitude`.

#### Hỗ trợ

- Mobile Apps

---

### `set_geolocation`

Đặt tọa độ GPS của thiết bị.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `latitude` | number | Có | Tọa độ vĩ độ (-90 đến 90) |
| `longitude` | number | Có | Tọa độ kinh độ (-180 đến 180) |
| `altitude` | number | Không | Độ cao tính bằng mét |

#### Ví dụ

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Hỗ trợ

- Mobile Apps

---

## Thực thi Script

### `execute_script`

Thực thi JavaScript trong trình duyệt hoặc lệnh di động thông qua Appium.

#### Tham số

| Tham số | Kiểu | Bắt buộc | Mô tả |
|-----------|------|-----------|-------------|
| `script` | string | Có | Mã JavaScript (trình duyệt) hoặc lệnh di động (ví dụ: `mobile: pressKey`) |
| `args` | array | Không | Các đối số cho script |

#### Ví dụ Trình duyệt

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Ví dụ Di động (Appium)

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### Mã phím Android thông dụng

| Phím | Mã |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### Thêm Lệnh Di động

Để biết danh sách đầy đủ các lệnh di động Appium có sẵn, xem:
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Hỗ trợ

- Desktop Browsers
- Mobile Apps (thông qua lệnh di động Appium)
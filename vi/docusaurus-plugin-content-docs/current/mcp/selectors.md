---
id: selectors
title: Bộ chọn
---

Máy chủ WebdriverIO MCP hỗ trợ nhiều chiến lược bộ chọn để định vị các phần tử trên trang web và ứng dụng di động.

:::info

Để xem tài liệu toàn diện về bộ chọn bao gồm tất cả chiến lược bộ chọn WebdriverIO, hãy xem hướng dẫn chính về [Bộ chọn](/docs/selectors). Trang này tập trung vào các bộ chọn thường được sử dụng với máy chủ MCP.

:::

## Bộ chọn Web

Đối với tự động hóa trình duyệt, máy chủ MCP hỗ trợ tất cả bộ chọn WebdriverIO tiêu chuẩn. Những bộ chọn được sử dụng phổ biến nhất bao gồm:

| Bộ chọn | Ví dụ | Mô tả |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Bộ chọn CSS tiêu chuẩn |
| XPath | `//button[@id='submit']` | Biểu thức XPath |
| Text | `button=Submit`, `a*=Click` | Bộ chọn văn bản WebdriverIO |
| ARIA | `aria/Submit Button` | Bộ chọn tên trợ năng |
| Test ID | `[data-testid="submit"]` | Được khuyến nghị cho kiểm thử |

Để biết ví dụ chi tiết và phương pháp hay nhất, xem tài liệu [Bộ chọn](/docs/selectors).

---

## Bộ chọn Di động

Bộ chọn di động hoạt động với cả nền tảng iOS và Android thông qua Appium.

### Accessibility ID (Khuyến nghị)

Accessibility ID là **bộ chọn đa nền tảng đáng tin cậy nhất**. Chúng hoạt động trên cả iOS và Android và ổn định qua các bản cập nhật ứng dụng.

```
# Cú pháp
~accessibilityId

# Ví dụ
~loginButton
~submitForm
~usernameField
```

:::tip Phương pháp hay nhất
Luôn ưu tiên sử dụng accessibility ID khi có sẵn. Chúng cung cấp:
- Khả năng tương thích đa nền tảng (iOS + Android)
- Độ ổn định qua các thay đổi UI
- Khả năng bảo trì kiểm thử tốt hơn
- Cải thiện khả năng truy cập của ứng dụng
:::

### Bộ chọn Android

#### UiAutomator

Bộ chọn UiAutomator mạnh mẽ và nhanh cho Android.

```
# Theo Văn bản
android=new UiSelector().text("Login")

# Theo Văn bản một phần
android=new UiSelector().textContains("Log")

# Theo Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Theo Tên lớp
android=new UiSelector().className("android.widget.Button")

# Theo Mô tả (Accessibility)
android=new UiSelector().description("Login button")

# Điều kiện kết hợp
android=new UiSelector().className("android.widget.Button").text("Login")

# Container có thể cuộn
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource ID cung cấp khả năng nhận dạng phần tử ổn định trên Android.

```
# Resource ID đầy đủ
id=com.example.app:id/login_button

# ID một phần (gói ứng dụng được suy ra)
id=login_button
```

#### XPath (Android)

XPath hoạt động trên Android nhưng chậm hơn UiAutomator.

```
# Theo Lớp và Văn bản
//android.widget.Button[@text='Login']

# Theo Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Theo Mô tả nội dung
//android.widget.ImageButton[@content-desc='Menu']

# Phân cấp
//android.widget.LinearLayout/android.widget.Button[1]
```

### Bộ chọn iOS

#### Predicate String

iOS Predicate String nhanh và mạnh mẽ cho tự động hóa iOS.

```
# Theo Nhãn
-ios predicate string:label == "Login"

# Theo Nhãn một phần
-ios predicate string:label CONTAINS "Log"

# Theo Tên
-ios predicate string:name == "loginButton"

# Theo Kiểu
-ios predicate string:type == "XCUIElementTypeButton"

# Theo Giá trị
-ios predicate string:value == "ON"

# Điều kiện kết hợp
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Khả năng hiển thị
-ios predicate string:label == "Login" AND visible == 1

# Không phân biệt chữ hoa chữ thường
-ios predicate string:label ==[c] "login"
```

**Toán tử Predicate:**

| Toán tử | Mô tả |
|----------|-------------|
| `==` | Bằng |
| `!=` | Không bằng |
| `CONTAINS` | Chứa chuỗi con |
| `BEGINSWITH` | Bắt đầu với |
| `ENDSWITH` | Kết thúc với |
| `LIKE` | Khớp với ký tự đại diện |
| `MATCHES` | Khớp với regex |
| `AND` | Phép AND logic |
| `OR` | Phép OR logic |

#### Class Chain

iOS Class Chain cung cấp khả năng định vị phần tử phân cấp với hiệu suất tốt.

```
# Con trực tiếp
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Bất kỳ phần tử con nào
-ios class chain:**/XCUIElementTypeButton

# Theo Index
-ios class chain:**/XCUIElementTypeCell[3]

# Kết hợp với Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Phân cấp
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Phần tử cuối cùng
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath hoạt động trên iOS nhưng chậm hơn predicate string.

```
# Theo Kiểu và Nhãn
//XCUIElementTypeButton[@label='Login']

# Theo Tên
//XCUIElementTypeTextField[@name='username']

# Theo Giá trị
//XCUIElementTypeSwitch[@value='1']

# Phân cấp
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Chiến lược Bộ chọn Đa nền tảng

Khi viết kiểm thử cần hoạt động trên cả iOS và Android, sử dụng thứ tự ưu tiên này:

### 1. Accessibility ID (Tốt nhất)

```
# Hoạt động trên cả hai nền tảng
~loginButton
```

### 2. Bộ chọn Theo nền tảng với Logic điều kiện

Khi không có accessibility ID, sử dụng bộ chọn theo nền tảng cụ thể:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Giải pháp cuối cùng)

XPath hoạt động trên cả hai nền tảng nhưng với các loại phần tử khác nhau:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Tham khảo Loại phần tử

### Loại phần tử Android

| Loại | Mô tả |
|------|-------------|
| `android.widget.Button` | Nút |
| `android.widget.EditText` | Ô nhập văn bản |
| `android.widget.TextView` | Nhãn văn bản |
| `android.widget.ImageView` | Hình ảnh |
| `android.widget.ImageButton` | Nút hình ảnh |
| `android.widget.CheckBox` | Hộp kiểm |
| `android.widget.RadioButton` | Nút radio |
| `android.widget.Switch` | Công tắc chuyển đổi |
| `android.widget.Spinner` | Dropdown |
| `android.widget.ListView` | List view |
| `android.widget.RecyclerView` | Recycler view |
| `android.widget.ScrollView` | Container có thể cuộn |

### Loại phần tử iOS

| Loại | Mô tả |
|------|-------------|
| `XCUIElementTypeButton` | Nút |
| `XCUIElementTypeTextField` | Ô nhập văn bản |
| `XCUIElementTypeSecureTextField` | Ô nhập mật khẩu |
| `XCUIElementTypeStaticText` | Nhãn văn bản |
| `XCUIElementTypeImage` | Hình ảnh |
| `XCUIElementTypeSwitch` | Công tắc chuyển đổi |
| `XCUIElementTypeSlider` | Thanh trượt |
| `XCUIElementTypePicker` | Bánh xe chọn |
| `XCUIElementTypeTable` | Table view |
| `XCUIElementTypeCell` | Ô table |
| `XCUIElementTypeCollectionView` | Collection view |
| `XCUIElementTypeScrollView` | Khung cuộn |

---

## Phương pháp hay nhất

### Nên

- **Sử dụng accessibility ID** cho bộ chọn ổn định, đa nền tảng
- **Thêm thuộc tính data-testid** vào phần tử web để kiểm thử
- **Sử dụng resource ID** trên Android khi không có accessibility ID
- **Ưu tiên predicate string** hơn XPath trên iOS
- **Giữ bộ chọn đơn giản** và cụ thể

### Không nên

- **Tránh biểu thức XPath dài** - chúng chậm và dễ gãy
- **Không dựa vào chỉ số** cho danh sách động
- **Tránh bộ chọn dựa trên văn bản** cho ứng dụng đa ngôn ngữ
- **Không sử dụng XPath tuyệt đối** (bắt đầu từ gốc)

### Ví dụ về Bộ chọn Tốt và Xấu

```
# Tốt - accessibility ID ổn định
~loginButton

# Xấu - XPath dễ gãy với chỉ số
//div[3]/form/button[2]

# Tốt - CSS cụ thể với test ID
[data-testid="submit-button"]

# Xấu - Class có thể thay đổi
.btn-primary-lg-v2

# Tốt - UiAutomator với resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Xấu - Văn bản có thể được dịch
android=new UiSelector().text("Submit")
```

---

## Gỡ lỗi Bộ chọn

### Web (Chrome DevTools)

1. Mở Chrome DevTools (F12)
2. Sử dụng panel Elements để kiểm tra phần tử
3. Nhấp chuột phải vào phần tử → Copy → Copy selector
4. Kiểm tra bộ chọn trong Console: `document.querySelector('your-selector')`

### Di động (Appium Inspector)

1. Khởi động Appium Inspector
2. Kết nối với phiên đang chạy
3. Nhấp vào phần tử để xem tất cả thuộc tính có sẵn
4. Sử dụng tính năng "Search for element" để kiểm tra bộ chọn

### Sử dụng `get_visible_elements`

Công cụ `get_visible_elements` của máy chủ MCP trả về nhiều chiến lược bộ chọn cho mỗi phần tử:

```
Ask Claude: "Get all visible elements on the screen"
```

Điều này trả về các phần tử với bộ chọn đã được tạo sẵn mà bạn có thể sử dụng trực tiếp.

#### Tùy chọn nâng cao

Để kiểm soát tốt hơn việc khám phá phần tử:

```
# Chỉ lấy hình ảnh và phần tử trực quan
Get visible elements with elementType "visual"

# Lấy phần tử với tọa độ để gỡ lỗi bố cục
Get visible elements with includeBounds enabled

# Lấy 20 phần tử tiếp theo (phân trang)
Get visible elements with limit 20 and offset 20

# Bao gồm container bố cục để gỡ lỗi
Get visible elements with includeContainers enabled
```

Công cụ trả về phản hồi phân trang:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Sử dụng `get_accessibility` (Chỉ trình duyệt)

Đối với tự động hóa trình duyệt, công cụ `get_accessibility` cung cấp thông tin ngữ nghĩa về phần tử trang:

```
# Lấy tất cả nút trợ năng có tên
Get accessibility tree

# Lọc chỉ nút và liên kết
Get accessibility tree filtered to button and link roles

# Lấy trang kết quả tiếp theo
Get accessibility tree with limit 50 and offset 50
```

Điều này hữu ích khi `get_visible_elements` không trả về phần tử mong đợi, vì nó truy vấn API trợ năng gốc của trình duyệt.
---
id: selectors
title: Bộ chọn
---

[WebDriver Protocol](https://w3c.github.io/webdriver/) cung cấp một số chiến lược bộ chọn để truy vấn một phần tử. WebdriverIO đơn giản hóa chúng để giữ cho việc chọn phần tử trở nên đơn giản. Xin lưu ý rằng mặc dù lệnh để truy vấn phần tử được gọi là `$` và `$$`, chúng không liên quan gì đến jQuery hoặc [Sizzle Selector Engine](https://github.com/jquery/sizzle).

Mặc dù có rất nhiều bộ chọn khác nhau, chỉ một vài trong số chúng cung cấp cách đáng tin cậy để tìm đúng phần tử. Ví dụ, cho nút sau:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

Chúng tôi __khuyên__ và __không khuyên__ sử dụng các bộ chọn sau:

| Bộ chọn | Khuyến nghị | Ghi chú |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Không bao giờ | Tệ nhất - quá chung chung, không có ngữ cảnh. |
| `$('.btn.btn-large')` | 🚨 Không bao giờ | Tệ. Gắn liền với kiểu dáng. Rất dễ thay đổi. |
| `$('#main')` | ⚠️ Thỉnh thoảng | Tốt hơn. Nhưng vẫn gắn liền với kiểu dáng hoặc trình lắng nghe sự kiện JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Thỉnh thoảng | Truy vấn hiệu quả, phức tạp để viết. |
| `$('button[name="submission"]')` | ⚠️ Thỉnh thoảng | Gắn liền với thuộc tính `name` có ngữ nghĩa HTML. |
| `$('button[data-testid="submit"]')` | ✅ Tốt | Yêu cầu thuộc tính bổ sung, không liên quan đến a11y. |
| `$('aria/Submit')` | ✅ Tốt | Tốt. Giống cách người dùng tương tác với trang. Nên sử dụng tệp dịch để kiểm tra của bạn không bị hỏng khi bản dịch được cập nhật. Lưu ý: Bộ chọn này có thể chậm hơn các bộ chọn khác trên các trang lớn. |
| `$('button=Submit')` | ✅ Luôn luôn | Tốt nhất. Giống cách người dùng tương tác với trang và nhanh chóng. Nên sử dụng tệp dịch để kiểm tra của bạn không bị hỏng khi bản dịch được cập nhật. |

## CSS Query Selector

Nếu không có chỉ định khác, WebdriverIO sẽ truy vấn các phần tử sử dụng mẫu [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), ví dụ:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Link Text

Để lấy phần tử liên kết với một văn bản cụ thể, truy vấn văn bản bắt đầu bằng dấu bằng (`=`).

Ví dụ:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Bạn có thể truy vấn phần tử này bằng cách gọi:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Partial Link Text

Để tìm phần tử liên kết có văn bản hiển thị khớp một phần với giá trị tìm kiếm của bạn, truy vấn nó bằng cách sử dụng `*=` phía trước chuỗi truy vấn (ví dụ: `*=driver`).

Bạn cũng có thể truy vấn phần tử từ ví dụ trên bằng cách gọi:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Lưu ý:__ Bạn không thể kết hợp nhiều chiến lược bộ chọn trong một bộ chọn. Sử dụng nhiều truy vấn phần tử được nối chuỗi để đạt được cùng mục tiêu, ví dụ:

```js
const elem = await $('header h1*=Welcome') // không hoạt động!!!
// sử dụng thay thế
const elem = await $('header').$('*=driver')
```

## Phần tử với văn bản nhất định

Kỹ thuật tương tự có thể được áp dụng cho các phần tử. Ngoài ra, cũng có thể thực hiện việc so khớp không phân biệt chữ hoa/thường bằng cách sử dụng `.=` hoặc `.*=` trong truy vấn.

Ví dụ, đây là một truy vấn cho tiêu đề cấp 1 với văn bản "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Bạn có thể truy vấn phần tử này bằng cách gọi:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Hoặc sử dụng truy vấn văn bản một phần:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Tương tự cho tên `id` và `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Bạn có thể truy vấn phần tử này bằng cách gọi:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Lưu ý:__ Bạn không thể kết hợp nhiều chiến lược bộ chọn trong một bộ chọn. Sử dụng nhiều truy vấn phần tử được nối chuỗi để đạt được cùng mục tiêu, ví dụ:

```js
const elem = await $('header h1*=Welcome') // không hoạt động!!!
// sử dụng thay thế
const elem = await $('header').$('h1*=Welcome')
```

## Tag Name

Để truy vấn một phần tử với tên thẻ cụ thể, sử dụng `<tag>` hoặc `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Bạn có thể truy vấn phần tử này bằng cách gọi:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name Attribute

Để truy vấn các phần tử với thuộc tính name cụ thể, bạn có thể sử dụng bộ chọn CSS3 thông thường hoặc chiến lược name được cung cấp từ [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) bằng cách truyền đại loại như [name="some-name"] làm tham số bộ chọn:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Lưu ý:__ Chiến lược bộ chọn này đã lỗi thời và chỉ hoạt động trong các trình duyệt cũ chạy bằng giao thức JSONWireProtocol hoặc khi sử dụng Appium.

## xPath

Cũng có thể truy vấn các phần tử thông qua một [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) cụ thể.

Một bộ chọn xPath có định dạng như `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Bạn có thể truy vấn đoạn văn thứ hai bằng cách gọi:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Bạn có thể sử dụng xPath để duyệt lên và xuống cây DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Accessibility Name Selector

Truy vấn các phần tử theo tên truy cập của chúng. Tên truy cập là những gì được công bố bởi trình đọc màn hình khi phần tử đó nhận được sự tập trung. Giá trị của tên truy cập có thể là cả nội dung trực quan hoặc văn bản thay thế ẩn.

:::info

Bạn có thể đọc thêm về bộ chọn này trong [bài đăng blog phát hành](/blog/2022/09/05/accessibility-selector) của chúng tôi

:::

### Lấy bằng `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Lấy bằng `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Lấy bằng nội dung

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Lấy bằng title

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Lấy bằng thuộc tính `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Role Attribute

Để truy vấn các phần tử dựa trên [vai trò ARIA](https://www.w3.org/TR/html-aria/#docconformance), bạn có thể chỉ định trực tiếp vai trò của phần tử như `[role=button]` làm tham số bộ chọn:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID Attribute

Chiến lược định vị "id" không được hỗ trợ trong giao thức WebDriver, người dùng nên sử dụng các chiến lược bộ chọn CSS hoặc xPath để tìm các phần tử bằng ID.

Tuy nhiên, một số trình điều khiển (ví dụ: [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) vẫn có thể [hỗ trợ](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) bộ chọn này.

Cú pháp bộ chọn ID được hỗ trợ hiện tại là:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Lưu ý: chỉ hoạt động trong Appium hoặc các framework tương tự hỗ trợ chiến lược định vị "ID"
const button = await $('id=resource-id/iosname')
```

## JS Function

Bạn cũng có thể sử dụng các hàm JavaScript để lấy các phần tử bằng cách sử dụng các API gốc của web. Tất nhiên, bạn chỉ có thể làm điều này trong ngữ cảnh web (ví dụ: `browser` hoặc ngữ cảnh web trong di động).

Cho cấu trúc HTML sau:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Bạn có thể truy vấn phần tử anh em của `#elem` như sau:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Deep Selectors

:::warning

Bắt đầu từ phiên bản `v9` của WebdriverIO, không cần bộ chọn đặc biệt này nữa vì WebdriverIO tự động xuyên qua Shadow DOM cho bạn. Khuyến nghị chuyển khỏi bộ chọn này bằng cách xóa `>>>` phía trước.

:::

Nhiều ứng dụng frontend phụ thuộc nhiều vào các phần tử với [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Về mặt kỹ thuật, không thể truy vấn các phần tử trong shadow DOM mà không có cách giải quyết. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) và [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) đã từng là những giải pháp có [giới hạn](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Với bộ chọn sâu, bây giờ bạn có thể truy vấn tất cả các phần tử trong bất kỳ shadow DOM nào bằng cách sử dụng lệnh truy vấn thông thường.

Giả sử chúng ta có một ứng dụng với cấu trúc sau:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Với bộ chọn này, bạn có thể truy vấn phần tử `<button />` được lồng trong một shadow DOM khác, ví dụ:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Mobile Selectors

Đối với kiểm tra di động lai, điều quan trọng là máy chủ tự động hóa phải ở đúng *ngữ cảnh* trước khi thực hiện lệnh. Để tự động hóa cử chỉ, trình điều khiển lý tưởng nên được đặt thành ngữ cảnh gốc. Nhưng để chọn các phần tử từ DOM, trình điều khiển sẽ cần được đặt thành ngữ cảnh webview của nền tảng. Chỉ *sau đó* các phương pháp đề cập ở trên mới có thể được sử dụng.

Đối với kiểm tra di động gốc, không có sự chuyển đổi giữa các ngữ cảnh, vì bạn phải sử dụng các chiến lược di động và sử dụng công nghệ tự động hóa thiết bị cơ bản trực tiếp. Điều này đặc biệt hữu ích khi kiểm tra cần một số kiểm soát chi tiết khi tìm các phần tử.

### Android UiAutomator

Khung UI Automator của Android cung cấp một số cách để tìm các phần tử. Bạn có thể sử dụng [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), đặc biệt là [lớp UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) để định vị các phần tử. Trong Appium, bạn gửi mã Java, dưới dạng chuỗi, đến máy chủ, nơi thực thi nó trong môi trường của ứng dụng, trả về phần tử hoặc các phần tử.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher và ViewMatcher (chỉ Espresso)

Chiến lược DataMatcher của Android cung cấp một cách để tìm các phần tử bằng [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Và tương tự [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (chỉ Espresso)

Chiến lược thẻ xem cung cấp một cách thuận tiện để tìm các phần tử bằng [thẻ](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) của chúng.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Khi tự động hóa một ứng dụng iOS, [UI Automation framework](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) của Apple có thể được sử dụng để tìm các phần tử.

[API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript này có các phương thức để truy cập vào khung nhìn và mọi thứ trên đó.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Bạn cũng có thể sử dụng tìm kiếm predicate trong iOS UI Automation trong Appium để tinh chỉnh việc chọn phần tử hơn nữa. Xem [tại đây](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) để biết chi tiết.

### iOS XCUITest predicate strings và class chains

Với iOS 10 trở lên (sử dụng trình điều khiển `XCUITest`), bạn có thể sử dụng [predicate strings](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Và [class chains](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Chiến lược định vị `accessibility id` được thiết kế để đọc một định danh duy nhất cho một phần tử UI. Điều này có lợi ích là không thay đổi trong quá trình bản địa hóa hoặc bất kỳ quá trình nào khác có thể thay đổi văn bản. Ngoài ra, nó có thể hỗ trợ trong việc tạo ra các bài kiểm tra đa nền tảng, nếu các phần tử có chức năng giống nhau có cùng accessibility id.

- Đối với iOS, đây là `accessibility identifier` được Apple đặt ra [tại đây](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Đối với Android, `accessibility id` ánh xạ tới `content-description` cho phần tử, như được mô tả [tại đây](https://developer.android.com/training/accessibility/accessible-app.html).

Đối với cả hai nền tảng, việc lấy một phần tử (hoặc nhiều phần tử) bằng `accessibility id` của chúng thường là phương pháp tốt nhất. Đây cũng là cách ưa thích hơn so với chiến lược `name` đã lỗi thời.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

Chiến lược `class name` là một `string` đại diện cho một phần tử UI trên khung nhìn hiện tại.

- Đối với iOS, đó là tên đầy đủ của [lớp UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), và sẽ bắt đầu bằng `UIA-`, chẳng hạn như `UIATextField` cho một trường văn bản. Tham khảo đầy đủ có thể được tìm thấy [tại đây](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Đối với Android, đó là tên đầy đủ của [lớp UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [class](https://developer.android.com/reference/android/widget/package-summary.html), chẳng hạn như `android.widget.EditText` cho một trường văn bản. Tham khảo đầy đủ có thể được tìm thấy [tại đây](https://developer.android.com/reference/android/widget/package-summary.html).
- Đối với Youi.tv, đó là tên đầy đủ của lớp Youi.tv, và sẽ bắt đầu bằng `CYI-`, chẳng hạn như `CYIPushButtonView` cho một phần tử nút nhấn. Tham khảo đầy đủ có thể được tìm thấy tại [trang GitHub của You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// Ví dụ iOS
await $('UIATextField').click()
// Ví dụ Android
await $('android.widget.DatePicker').click()
// Ví dụ Youi.tv
await $('CYIPushButtonView').click()
```

## Chain Selectors

Nếu bạn muốn cụ thể hơn trong truy vấn của mình, bạn có thể nối các bộ chọn cho đến khi bạn tìm thấy đúng phần tử. Nếu bạn gọi `element` trước lệnh thực tế của bạn, WebdriverIO bắt đầu truy vấn từ phần tử đó.

Ví dụ, nếu bạn có cấu trúc DOM như:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

Và bạn muốn thêm sản phẩm B vào giỏ hàng, sẽ khó thực hiện điều đó chỉ bằng cách sử dụng bộ chọn CSS.

Với việc nối bộ chọn, nó dễ dàng hơn nhiều. Chỉ cần thu hẹp phần tử mong muốn từng bước một:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium Image Selector

Sử dụng chiến lược định vị `-image`, có thể gửi cho Appium một tệp hình ảnh đại diện cho phần tử bạn muốn truy cập.

Các định dạng tệp được hỗ trợ `jpg,png,gif,bmp,svg`

Tham khảo đầy đủ có thể được tìm thấy [tại đây](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Lưu ý**: Cách Appium hoạt động với bộ chọn này là nó sẽ nội bộ tạo ảnh chụp (màn hình) và sử dụng bộ chọn hình ảnh được cung cấp để xác minh xem phần tử có thể được tìm thấy trong ảnh chụp (màn hình) đó hay không.

Hãy lưu ý rằng Appium có thể thay đổi kích thước ảnh chụp (màn hình) được chụp để làm cho nó phù hợp với kích thước CSS của màn hình (ứng dụng) của bạn (điều này sẽ xảy ra trên iPhone nhưng cũng trên máy Mac với màn hình Retina vì DPR lớn hơn 1). Điều này sẽ dẫn đến không tìm thấy kết quả khớp vì bộ chọn hình ảnh được cung cấp có thể đã được lấy từ ảnh chụp màn hình gốc.
Bạn có thể khắc phục điều này bằng cách cập nhật cài đặt Appium Server, xem [tài liệu Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) để biết cài đặt và [bình luận này](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) để có giải thích chi tiết.

## React Selectors

WebdriverIO cung cấp cách chọn các component React dựa trên tên component. Để làm điều này, bạn có lựa chọn hai lệnh: `react$` và `react$$`.

Các lệnh này cho phép bạn chọn các component từ [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) và trả về một Phần tử WebdriverIO duy nhất hoặc một mảng các phần tử (tùy thuộc vào hàm nào được sử dụng).

**Lưu ý**: Các lệnh `react$` và `react$$` có chức năng tương tự, ngoại trừ `react$$` sẽ trả về *tất cả* các trường hợp khớp dưới dạng một mảng các phần tử WebdriverIO, và `react$` sẽ trả về trường hợp đầu tiên được tìm thấy.

#### Ví dụ cơ bản

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Trong mã trên có một thể hiện `MyComponent` đơn giản bên trong ứng dụng, mà React đang hiển thị bên trong một phần tử HTML với `id="root"`.

Với lệnh `browser.react$`, bạn có thể chọn một thể hiện của `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Bây giờ bạn đã có phần tử WebdriverIO được lưu trong biến `myCmp`, bạn có thể thực thi các lệnh phần tử đối với nó.

#### Lọc components

Thư viện mà WebdriverIO sử dụng nội bộ cho phép lọc lựa chọn của bạn theo thuộc tính và/hoặc trạng thái của component. Để làm điều đó, bạn cần truyền một đối số thứ hai cho thuộc tính và/hoặc một đối số thứ ba cho trạng thái vào lệnh trình duyệt.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Nếu bạn muốn chọn thể hiện của `MyComponent` có thuộc tính `name` là `WebdriverIO`, bạn có thể thực hiện lệnh như sau:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Nếu bạn muốn lọc lựa chọn của mình theo trạng thái, lệnh `browser` sẽ trông giống như sau:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### Xử lý `React.Fragment`

Khi sử dụng lệnh `react$` để chọn [fragments](https://reactjs.org/docs/fragments.html) của React, WebdriverIO sẽ trả về phần tử con đầu tiên của component đó làm node của component. Nếu bạn sử dụng `react$$`, bạn sẽ nhận được một mảng chứa tất cả các node HTML bên trong các fragments khớp với bộ chọn.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Với ví dụ trên, đây là cách các lệnh sẽ hoạt động:

```js
await browser.react$('MyComponent') // trả về Phần tử WebdriverIO cho <div /> đầu tiên
await browser.react$$('MyComponent') // trả về Phần tử WebdriverIO cho mảng [<div />, <div />]
```

**Lưu ý:** Nếu bạn có nhiều thể hiện của `MyComponent` và bạn sử dụng `react$$` để chọn các component fragment này, bạn sẽ nhận được một mảng một chiều của tất cả các node. Nói cách khác, nếu bạn có 3 thể hiện `<MyComponent />`, bạn sẽ nhận được một mảng có sáu phần tử WebdriverIO.

## Custom Selector Strategies


Nếu ứng dụng của bạn yêu cầu một cách cụ thể để lấy các phần tử, bạn có thể tự định nghĩa một chiến lược bộ chọn mà bạn có thể sử dụng với `custom$` và `custom$$`. Để làm điều đó, đăng ký chiến lược của bạn một lần vào đầu bài kiểm tra, ví dụ: trong một hook `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Với đoạn HTML sau:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Sau đó sử dụng nó bằng cách gọi:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Lưu ý:** điều này chỉ hoạt động trong môi trường web trong đó lệnh [`execute`](/docs/api/browser/execute) có thể được chạy.
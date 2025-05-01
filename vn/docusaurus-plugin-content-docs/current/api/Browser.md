---
id: browser
title: Đối tượng Trình duyệt
---

__Mở rộng từ:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Đối tượng trình duyệt là phiên làm việc mà bạn sử dụng để điều khiển trình duyệt hoặc thiết bị di động. Nếu bạn sử dụng trình chạy kiểm thử WDIO, bạn có thể truy cập thể hiện WebDriver thông qua đối tượng toàn cục `browser` hoặc `driver` hoặc nhập nó bằng cách sử dụng [`@wdio/globals`](/docs/api/globals). Nếu bạn sử dụng WebdriverIO ở chế độ độc lập, đối tượng trình duyệt được trả về bởi phương thức [`remote`](/docs/api/modules#remoteoptions-modifier).

Phiên làm việc được khởi tạo bởi trình chạy kiểm thử. Tương tự, việc kết thúc phiên cũng được thực hiện bởi tiến trình của trình chạy kiểm thử.

## Thuộc tính

Một đối tượng trình duyệt có các thuộc tính sau:

| Tên | Kiểu | Chi tiết |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Các khả năng được gán từ máy chủ từ xa.<br /><b>Ví dụ:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Các khả năng yêu cầu từ máy chủ từ xa.<br /><b>Ví dụ:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | ID phiên được gán từ máy chủ từ xa. |
| `options` | `Object` | [Tùy chọn](/docs/configuration) WebdriverIO tùy thuộc vào cách đối tượng trình duyệt được tạo. Xem thêm [các loại thiết lập](/docs/setuptypes). |
| `commandList` | `String[]` | Danh sách các lệnh đã đăng ký cho thể hiện trình duyệt |
| `isW3C` | `Boolean` | Chỉ ra nếu đây là phiên W3C |
| `isChrome` | `Boolean` | Chỉ ra nếu đây là thể hiện Chrome |
| `isFirefox` | `Boolean` | Chỉ ra nếu đây là thể hiện Firefox |
| `isBidi` | `Boolean` | Chỉ ra nếu phiên này sử dụng Bidi |
| `isSauce` | `Boolean` | Chỉ ra nếu phiên này đang chạy trên Sauce Labs |
| `isMacApp` | `Boolean` | Chỉ ra nếu phiên này đang chạy cho ứng dụng Mac gốc |
| `isWindowsApp` | `Boolean` | Chỉ ra nếu phiên này đang chạy cho ứng dụng Windows gốc |
| `isMobile` | `Boolean` | Chỉ ra một phiên di động. Xem thêm trong [Cờ Di động](#mobile-flags). |
| `isIOS` | `Boolean` | Chỉ ra một phiên iOS. Xem thêm trong [Cờ Di động](#mobile-flags). |
| `isAndroid` | `Boolean` | Chỉ ra một phiên Android. Xem thêm trong [Cờ Di động](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Chỉ ra nếu thiết bị di động đang ở trong bối cảnh `NATIVE_APP`. Xem thêm trong [Cờ Di động](#mobile-flags). |
| `mobileContext` | `string`  | Sẽ cung cấp bối cảnh **hiện tại** mà trình điều khiển đang sử dụng, ví dụ `NATIVE_APP`, `WEBVIEW_<packageName>` cho Android hoặc `WEBVIEW_<pid>` cho iOS. Nó sẽ lưu một WebDriver bổ sung vào `driver.getContext()`. Xem thêm trong [Cờ Di động](#mobile-flags). |


## Phương thức

Dựa trên nền tảng tự động hóa được sử dụng cho phiên của bạn, WebdriverIO xác định [Lệnh Giao thức](/docs/api/protocols) nào sẽ được gắn vào [đối tượng trình duyệt](/docs/api/browser). Ví dụ, nếu bạn chạy một phiên tự động trong Chrome, bạn sẽ có quyền truy cập vào các lệnh dành riêng cho Chromium như [`elementHover`](/docs/api/chromium#elementhover) nhưng không phải bất kỳ [lệnh Appium](/docs/api/appium) nào.

Hơn nữa, WebdriverIO cung cấp một bộ phương thức tiện lợi được khuyến nghị sử dụng để tương tác với [trình duyệt](/docs/api/browser) hoặc [các phần tử](/docs/api/element) trên trang.

Ngoài ra, các lệnh sau đây cũng có sẵn:

| Tên | Tham số | Chi tiết |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Kiểu: `String`)<br />- `fn` (Kiểu: `Function`)<br />- `attachToElement` (Kiểu: `boolean`) | Cho phép định nghĩa các lệnh tùy chỉnh có thể được gọi từ đối tượng trình duyệt cho mục đích kết hợp. Đọc thêm trong hướng dẫn [Lệnh Tùy chỉnh](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Kiểu: `String`)<br />- `fn` (Kiểu: `Function`)<br />- `attachToElement` (Kiểu: `boolean`) | Cho phép ghi đè bất kỳ lệnh trình duyệt nào bằng chức năng tùy chỉnh. Sử dụng cẩn thận vì nó có thể gây nhầm lẫn cho người dùng framework. Đọc thêm trong hướng dẫn [Lệnh Tùy chỉnh](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Kiểu: `String`)<br />- `fn` (Kiểu: `Function`) | Cho phép định nghĩa một chiến lược bộ chọn tùy chỉnh, đọc thêm trong hướng dẫn [Bộ chọn](/docs/selectors#custom-selector-strategies). |

## Ghi chú

### Cờ Di động

Nếu bạn cần sửa đổi bài kiểm thử của mình dựa trên việc phiên của bạn có đang chạy trên thiết bị di động hay không, bạn có thể truy cập các cờ di động để kiểm tra.

Ví dụ, với cấu hình này:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

Bạn có thể truy cập các cờ này trong bài kiểm thử của mình như sau:

```js
// Lưu ý: `driver` tương đương với đối tượng `browser` nhưng về mặt ngữ nghĩa chính xác hơn
// bạn có thể chọn biến toàn cục nào bạn muốn sử dụng
console.log(driver.isMobile) // xuất ra: true
console.log(driver.isIOS) // xuất ra: true
console.log(driver.isAndroid) // xuất ra: false
```

Điều này có thể hữu ích nếu, ví dụ, bạn muốn định nghĩa bộ chọn trong [page objects](../pageobjects) dựa trên loại thiết bị, như thế này:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

Bạn cũng có thể sử dụng các cờ này để chỉ chạy các bài kiểm thử nhất định cho các loại thiết bị nhất định:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // chỉ chạy kiểm thử với thiết bị Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Sự kiện
Đối tượng trình duyệt là một EventEmitter và một số sự kiện được phát ra cho các trường hợp sử dụng của bạn.

Dưới đây là danh sách các sự kiện. Hãy nhớ rằng đây chưa phải là danh sách đầy đủ các sự kiện có sẵn.
Hãy thoải mái đóng góp để cập nhật tài liệu bằng cách thêm mô tả của nhiều sự kiện hơn tại đây.

#### `command`

Sự kiện này được phát ra bất cứ khi nào WebdriverIO gửi một lệnh WebDriver Classic. Nó chứa những thông tin sau:

- `command`: tên lệnh, ví dụ: `navigateTo`
- `method`: phương thức HTTP được sử dụng để gửi yêu cầu lệnh, ví dụ: `POST`
- `endpoint`: điểm cuối của lệnh, ví dụ: `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: payload của lệnh, ví dụ: `{ url: 'https://webdriver.io' }`

#### `result`

Sự kiện này được phát ra bất cứ khi nào WebdriverIO nhận được kết quả của một lệnh WebDriver Classic. Nó chứa cùng thông tin như sự kiện `command` với bổ sung các thông tin sau:

- `result`: kết quả của lệnh

#### `bidiCommand`

Sự kiện này được phát ra bất cứ khi nào WebdriverIO gửi một lệnh WebDriver Bidi đến trình điều khiển trình duyệt. Nó chứa thông tin về:

- `method`: phương thức lệnh WebDriver Bidi
- `params`: tham số lệnh liên quan (xem [API](/docs/api/webdriverBidi))

#### `bidiResult`

Trong trường hợp thực thi lệnh thành công, payload sự kiện sẽ là:

- `type`: `success`
- `id`: id của lệnh
- `result`: kết quả của lệnh (xem [API](/docs/api/webdriverBidi))

Trong trường hợp lỗi lệnh, payload sự kiện sẽ là:

- `type`: `error`
- `id`: id của lệnh
- `error`: mã lỗi, ví dụ: `invalid argument`
- `message`: chi tiết về lỗi
- `stacktrace`: một stack trace

#### `request.start`
Sự kiện này được kích hoạt trước khi một yêu cầu WebDriver được gửi đến trình điều khiển. Nó chứa thông tin về yêu cầu và payload của nó.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Sự kiện này được kích hoạt khi yêu cầu đến trình điều khiển nhận được phản hồi. Đối tượng sự kiện chứa nội dung phản hồi như kết quả hoặc lỗi nếu lệnh WebDriver thất bại.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Sự kiện retry có thể thông báo cho bạn khi WebdriverIO cố gắng thử lại việc chạy lệnh, ví dụ: do vấn đề mạng. Nó chứa thông tin về lỗi gây ra việc thử lại và số lần thử lại đã thực hiện.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Đây là một sự kiện để đo lường các hoạt động cấp WebDriver. Bất cứ khi nào WebdriverIO gửi yêu cầu đến backend WebDriver, sự kiện này sẽ được phát ra với một số thông tin hữu ích:

- `durationMillisecond`: Thời gian của yêu cầu tính bằng mili giây.
- `error`: Đối tượng lỗi nếu yêu cầu thất bại.
- `request`: Đối tượng yêu cầu. Bạn có thể tìm thấy url, method, headers, v.v.
- `retryCount`: Nếu là `0`, yêu cầu là lần thử đầu tiên. Nó sẽ tăng khi WebDriverIO thử lại ngầm.
- `success`: Boolean để biểu thị yêu cầu thành công hay không. Nếu là `false`, thuộc tính `error` cũng sẽ được cung cấp.

Một ví dụ về sự kiện:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Lệnh Tùy chỉnh

Bạn có thể thiết lập các lệnh tùy chỉnh trong phạm vi trình duyệt để trừu tượng hóa các quy trình làm việc thường được sử dụng. Hãy xem hướng dẫn của chúng tôi về [Lệnh Tùy chỉnh](/docs/customcommands#adding-custom-commands) để biết thêm thông tin.
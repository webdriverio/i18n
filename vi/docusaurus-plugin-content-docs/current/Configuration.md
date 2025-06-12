---
id: configuration
title: Cấu hình
---

Dựa trên [loại thiết lập](/docs/setuptypes) (ví dụ: sử dụng các ràng buộc giao thức thô, WebdriverIO như một gói độc lập hoặc trình chạy kiểm thử WDIO), có một bộ tùy chọn khác nhau để kiểm soát môi trường.

## Tùy chọn WebDriver

Các tùy chọn sau được xác định khi sử dụng gói giao thức [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Giao thức sử dụng khi giao tiếp với máy chủ trình điều khiển.

Loại: `String`<br />
Mặc định: `http`

### hostname

Máy chủ của trình điều khiển của bạn.

Loại: `String`<br />
Mặc định: `0.0.0.0`

### port

Cổng mà máy chủ trình điều khiển của bạn đang sử dụng.

Loại: `Number`<br />
Mặc định: `undefined`

### path

Đường dẫn đến điểm cuối của máy chủ trình điều khiển.

Loại: `String`<br />
Mặc định: `/`

### queryParams

Các tham số truy vấn được truyền đến máy chủ trình điều khiển.

Loại: `Object`<br />
Mặc định: `undefined`

### user

Tên người dùng dịch vụ đám mây của bạn (chỉ hoạt động với tài khoản [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) hoặc [LambdaTest](https://www.lambdatest.com)). Nếu được thiết lập, WebdriverIO sẽ tự động thiết lập các tùy chọn kết nối cho bạn. Nếu bạn không sử dụng nhà cung cấp đám mây, điều này có thể được sử dụng để xác thực bất kỳ backend WebDriver nào khác.

Loại: `String`<br />
Mặc định: `undefined`

### key

Khóa truy cập dịch vụ đám mây hoặc khóa bí mật của bạn (chỉ hoạt động với tài khoản [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) hoặc [LambdaTest](https://www.lambdatest.com)). Nếu được thiết lập, WebdriverIO sẽ tự động thiết lập các tùy chọn kết nối cho bạn. Nếu bạn không sử dụng nhà cung cấp đám mây, điều này có thể được sử dụng để xác thực bất kỳ backend WebDriver nào khác.

Loại: `String`<br />
Mặc định: `undefined`

### capabilities

Xác định các khả năng mà bạn muốn chạy trong phiên WebDriver của mình. Kiểm tra [Giao thức WebDriver](https://w3c.github.io/webdriver/#capabilities) để biết thêm chi tiết. Nếu bạn chạy một trình điều khiển cũ không hỗ trợ giao thức WebDriver, bạn cần sử dụng [khả năng JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) để chạy phiên thành công.

Bên cạnh các khả năng dựa trên WebDriver, bạn có thể áp dụng các tùy chọn cụ thể cho trình duyệt và nhà cung cấp cho phép cấu hình sâu hơn cho trình duyệt từ xa hoặc thiết bị. Những tùy chọn này được ghi trong tài liệu nhà cung cấp tương ứng, ví dụ:

- `goog:chromeOptions`: cho [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: cho [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: cho [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: cho [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: cho [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: cho [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Ngoài ra, một tiện ích hữu ích là [Công cụ Cấu hình Kiểm thử Tự động](https://docs.saucelabs.com/basics/platform-configurator/) của Sauce Labs, giúp bạn tạo đối tượng này bằng cách kết hợp các khả năng mong muốn.

Loại: `Object`<br />
Mặc định: `null`

**Ví dụ:**

```js
{
    browserName: 'chrome', // tùy chọn: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // phiên bản trình duyệt
    platformName: 'Windows 10' // nền tảng hệ điều hành
}
```

Nếu bạn đang chạy kiểm thử web hoặc native trên thiết bị di động, `capabilities` sẽ khác với giao thức WebDriver. Xem [Tài liệu Appium](https://appium.io/docs/en/latest/guides/caps/) để biết thêm chi tiết.

### logLevel

Mức độ chi tiết của bản ghi.

Loại: `String`<br />
Mặc định: `info`<br />
Tùy chọn: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Thư mục để lưu trữ tất cả các tệp nhật ký của trình chạy kiểm thử (bao gồm nhật ký của trình báo cáo và nhật ký `wdio`). Nếu không được thiết lập, tất cả nhật ký sẽ được truyền đến `stdout`. Vì hầu hết các trình báo cáo được thiết kế để ghi vào `stdout`, nên chỉ nên sử dụng tùy chọn này cho các trình báo cáo cụ thể mà việc đẩy báo cáo vào tệp sẽ hợp lý hơn (như trình báo cáo `junit`, ví dụ).

Khi chạy ở chế độ độc lập, nhật ký duy nhất được tạo bởi WebdriverIO sẽ là nhật ký `wdio`.

Loại: `String`<br />
Mặc định: `null`

### connectionRetryTimeout

Thời gian chờ cho bất kỳ yêu cầu WebDriver nào đến trình điều khiển hoặc grid.

Loại: `Number`<br />
Mặc định: `120000`

### connectionRetryCount

Số lượng tối đa lần thử lại yêu cầu đến máy chủ Selenium.

Loại: `Number`<br />
Mặc định: `3`

### agent

Cho phép bạn sử dụng một [agent](https://www.npmjs.com/package/got#agent) tùy chỉnh cho `http`/`https`/`http2` để thực hiện các yêu cầu.

Loại: `Object`<br />
Mặc định:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Chỉ định `headers` tùy chỉnh để truyền vào mọi yêu cầu WebDriver. Nếu Selenium Grid của bạn yêu cầu Xác thực Cơ bản, chúng tôi khuyên bạn nên truyền header `Authorization` thông qua tùy chọn này để xác thực các yêu cầu WebDriver của bạn, ví dụ:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Đọc tên người dùng và mật khẩu từ biến môi trường
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Kết hợp tên người dùng và mật khẩu với dấu phân cách dấu hai chấm
const credentials = `${username}:${password}`;
// Mã hóa thông tin đăng nhập bằng Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Loại: `Object`<br />
Mặc định: `{}`

### transformRequest

Hàm chặn [tùy chọn yêu cầu HTTP](https://github.com/sindresorhus/got#options) trước khi yêu cầu WebDriver được thực hiện

Loại: `(RequestOptions) => RequestOptions`<br />
Mặc định: *không có*

### transformResponse

Hàm chặn đối tượng phản hồi HTTP sau khi phản hồi WebDriver đã đến. Hàm này được truyền đối tượng phản hồi gốc làm đối số đầu tiên và `RequestOptions` tương ứng làm đối số thứ hai.

Loại: `(Response, RequestOptions) => Response`<br />
Mặc định: *không có*

### strictSSL

Liệu có yêu cầu chứng chỉ SSL phải hợp lệ hay không.
Có thể được thiết lập thông qua biến môi trường như `STRICT_SSL` hoặc `strict_ssl`.

Loại: `Boolean`<br />
Mặc định: `true`

### enableDirectConnect

Liệu có bật [tính năng kết nối trực tiếp của Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) hay không.
Không làm gì nếu phản hồi không có các khóa thích hợp trong khi cờ được bật.

Loại: `Boolean`<br />
Mặc định: `true`

### cacheDir

Đường dẫn đến thư mục gốc của bộ nhớ cache. Thư mục này được sử dụng để lưu trữ tất cả các trình điều khiển được tải xuống khi cố gắng bắt đầu một phiên.

Loại: `String`<br />
Mặc định: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Để ghi nhật ký an toàn hơn, các biểu thức chính quy được thiết lập với `maskingPatterns` có thể làm mờ thông tin nhạy cảm khỏi nhật ký.
 - Định dạng chuỗi là biểu thức chính quy với hoặc không có cờ (ví dụ: `/.../i`) và được phân tách bằng dấu phẩy cho nhiều biểu thức chính quy.
 - Để biết thêm chi tiết về các mẫu che giấu, xem [phần Masking Patterns trong README của WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Loại: `String`<br />
Mặc định: `undefined`

**Ví dụ:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

Các tùy chọn sau (bao gồm cả những tùy chọn được liệt kê ở trên) có thể được sử dụng với WebdriverIO ở chế độ độc lập:

### automationProtocol

Xác định giao thức bạn muốn sử dụng cho tự động hóa trình duyệt. Hiện tại chỉ hỗ trợ [`webdriver`](https://www.npmjs.com/package/webdriver), vì đây là công nghệ tự động hóa trình duyệt chính mà WebdriverIO sử dụng.

Nếu bạn muốn tự động hóa trình duyệt bằng công nghệ tự động hóa khác, hãy đảm bảo rằng bạn thiết lập thuộc tính này thành một đường dẫn dẫn đến một module tuân theo giao diện sau:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Bắt đầu phiên tự động hóa và trả về một WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * với các lệnh tự động hóa tương ứng. Xem gói [webdriver](https://www.npmjs.com/package/webdriver)
     * như một triển khai tham khảo
     *
     * @param {Capabilities.RemoteConfig} options Các tùy chọn WebdriverIO
     * @param {Function} hook cho phép sửa đổi client trước khi nó được phát hành từ hàm
     * @param {PropertyDescriptorMap} userPrototype cho phép người dùng thêm lệnh giao thức tùy chỉnh
     * @param {Function} customCommandWrapper cho phép sửa đổi việc thực thi lệnh
     * @returns một thể hiện client tương thích với WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * cho phép người dùng kết nối đến các phiên hiện có
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Thay đổi id phiên thể hiện và khả năng trình duyệt cho phiên mới
     * trực tiếp vào đối tượng trình duyệt được truyền vào
     *
     * @optional
     * @param   {object} instance  đối tượng chúng ta nhận được từ phiên trình duyệt mới.
     * @returns {string}           id phiên mới của trình duyệt
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Loại: `String`<br />
Mặc định: `webdriver`

### baseUrl

Rút ngắn lệnh gọi `url` bằng cách thiết lập URL cơ sở.
- Nếu tham số `url` của bạn bắt đầu bằng `/`, thì `baseUrl` được thêm vào trước (ngoại trừ đường dẫn `baseUrl`, nếu có).
- Nếu tham số `url` của bạn bắt đầu mà không có scheme hoặc `/` (như `some/path`), thì toàn bộ `baseUrl` được thêm vào trước trực tiếp.

Loại: `String`<br />
Mặc định: `null`

### waitforTimeout

Thời gian chờ mặc định cho tất cả các lệnh `waitFor*`. (Lưu ý chữ `f` viết thường trong tên tùy chọn.) Thời gian chờ này __chỉ__ ảnh hưởng đến các lệnh bắt đầu bằng `waitFor*` và thời gian chờ mặc định của chúng.

Để tăng thời gian chờ cho một _bài kiểm thử_, vui lòng xem tài liệu framework.

Loại: `Number`<br />
Mặc định: `5000`

### waitforInterval

Khoảng thời gian mặc định cho tất cả các lệnh `waitFor*` để kiểm tra xem trạng thái mong đợi (ví dụ: khả năng hiển thị) đã thay đổi hay chưa.

Loại: `Number`<br />
Mặc định: `100`

### region

Nếu chạy trên Sauce Labs, bạn có thể chọn chạy các bài kiểm thử giữa các trung tâm dữ liệu khác nhau: US hoặc EU.
Để thay đổi vùng của bạn thành EU, hãy thêm `region: 'eu'` vào cấu hình của bạn.

__Lưu ý:__ Điều này chỉ có hiệu lực nếu bạn cung cấp các tùy chọn `user` và `key` được kết nối với tài khoản Sauce Labs của bạn.

Loại: `String`<br />
Mặc định: `us`

*(chỉ cho vm và/hoặc em/simulators)*

---

## Tùy chọn Trình chạy kiểm thử

Các tùy chọn sau (bao gồm cả những tùy chọn được liệt kê ở trên) chỉ được xác định khi chạy WebdriverIO với trình chạy kiểm thử WDIO:

### specs

Xác định các tệp đặc tả cho việc thực thi kiểm thử. Bạn có thể chỉ định một mẫu glob để khớp với nhiều tệp cùng lúc hoặc đóng gói một glob hoặc một tập hợp các đường dẫn vào một mảng để chạy chúng trong một quy trình worker duy nhất. Tất cả các đường dẫn được xem là tương đối so với đường dẫn tệp cấu hình.

Loại: `(String | String[])[]`<br />
Mặc định: `[]`

### exclude

Loại trừ các đặc tả khỏi việc thực thi kiểm thử. Tất cả các đường dẫn được xem là tương đối so với đường dẫn tệp cấu hình.

Loại: `String[]`<br />
Mặc định: `[]`

### suites

Một đối tượng mô tả các bộ kiểm thử khác nhau, mà bạn có thể chỉ định với tùy chọn `--suite` trên CLI `wdio`.

Loại: `Object`<br />
Mặc định: `{}`

### capabilities

Giống như phần `capabilities` được mô tả ở trên, ngoại trừ có tùy chọn để chỉ định một đối tượng [`multiremote`](/docs/multiremote), hoặc nhiều phiên WebDriver trong một mảng để thực thi song song.

Bạn có thể áp dụng các khả năng cụ thể cho nhà cung cấp và trình duyệt giống như được định nghĩa [ở trên](/docs/configuration#capabilities).

Loại: `Object`|`Object[]`<br />
Mặc định: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Số lượng tối đa tổng các worker chạy song song.

__Lưu ý:__ có thể là một số cao đến `100`, khi các bài kiểm thử được thực hiện trên một số nhà cung cấp bên ngoài như máy của Sauce Labs. Ở đó, các bài kiểm thử không được kiểm tra trên một máy duy nhất, mà là trên nhiều VM. Nếu các bài kiểm thử sẽ được chạy trên máy phát triển cục bộ, hãy sử dụng một số hợp lý hơn, chẳng hạn như `3`, `4` hoặc `5`. Về cơ bản, đây là số lượng trình duyệt sẽ được khởi động đồng thời và chạy các bài kiểm thử của bạn cùng một lúc, vì vậy nó phụ thuộc vào lượng RAM trên máy của bạn và có bao nhiêu ứng dụng khác đang chạy trên máy của bạn.

Bạn cũng có thể áp dụng `maxInstances` trong các đối tượng khả năng của mình bằng cách sử dụng khả năng `wdio:maxInstances`. Điều này sẽ giới hạn số lượng phiên song song cho khả năng cụ thể đó.

Loại: `Number`<br />
Mặc định: `100`

### maxInstancesPerCapability

Số lượng tối đa tổng các worker chạy song song cho mỗi khả năng.

Loại: `Number`<br />
Mặc định: `100`

### injectGlobals

Chèn các biến toàn cục của WebdriverIO (ví dụ: `browser`, `$` và `$$`) vào môi trường toàn cục.
Nếu bạn thiết lập thành `false`, bạn nên import từ `@wdio/globals`, ví dụ:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Lưu ý: WebdriverIO không xử lý việc chèn các biến toàn cục cụ thể cho framework kiểm thử.

Loại: `Boolean`<br />
Mặc định: `true`

### bail

Nếu bạn muốn chạy kiểm thử của mình dừng lại sau một số lỗi kiểm thử cụ thể, hãy sử dụng `bail`.
(Mặc định là `0`, tức là chạy tất cả các bài kiểm thử bất kể điều gì.) **Lưu ý:** Một bài kiểm thử trong ngữ cảnh này là tất cả các bài kiểm thử trong một tệp đặc tả duy nhất (khi sử dụng Mocha hoặc Jasmine) hoặc tất cả các bước trong một tệp tính năng (khi sử dụng Cucumber). Nếu bạn muốn kiểm soát hành vi bail trong các bài kiểm thử của một tệp kiểm thử duy nhất, hãy xem các tùy chọn [framework](frameworks) có sẵn.

Loại: `Number`<br />
Mặc định: `0` (không bail; chạy tất cả các bài kiểm thử)

### specFileRetries

Số lần thử lại toàn bộ tệp đặc tả khi nó thất bại toàn bộ.

Loại: `Number`<br />
Mặc định: `0`

### specFileRetriesDelay

Độ trễ tính bằng giây giữa các lần thử lại tệp đặc tả

Loại: `Number`<br />
Mặc định: `0`

### specFileRetriesDeferred

Liệu các tệp đặc tả được thử lại có nên được thử lại ngay lập tức hay trì hoãn đến cuối hàng đợi.

Loại: `Boolean`<br />
Mặc định: `true`

### groupLogsByTestSpec

Chọn chế độ xem đầu ra nhật ký.

Nếu được thiết lập thành `false`, nhật ký từ các tệp kiểm thử khác nhau sẽ được in trong thời gian thực. Xin lưu ý rằng điều này có thể dẫn đến việc trộn lẫn các đầu ra nhật ký từ các tệp khác nhau khi chạy song song.

Nếu được thiết lập thành `true`, các đầu ra nhật ký sẽ được nhóm theo Đặc tả Kiểm thử và chỉ được in khi Đặc tả Kiểm thử hoàn thành.

Theo mặc định, nó được thiết lập thành `false` để nhật ký được in trong thời gian thực.

Loại: `Boolean`<br />
Mặc định: `false`

### autoAssertOnTestEnd

Kiểm soát liệu WebdriverIO có tự động kiểm tra tất cả các xác nhận mềm (soft assertions) vào cuối mỗi bài kiểm thử hay không. Khi được thiết lập thành `true`, bất kỳ xác nhận mềm tích lũy nào sẽ được tự động kiểm tra và gây ra lỗi bài kiểm thử nếu có xác nhận thất bại. Khi được thiết lập thành `false`, bạn phải gọi phương thức assert thủ công để kiểm tra các xác nhận mềm.

Loại: `Boolean`<br />
Mặc định: `true`

### services

Các dịch vụ đảm nhận một công việc cụ thể mà bạn không muốn lo lắng. Chúng nâng cao thiết lập kiểm thử của bạn với rất ít nỗ lực.

Loại: `String[]|Object[]`<br />
Mặc định: `[]`

### framework

Xác định framework kiểm thử sẽ được sử dụng bởi trình chạy kiểm thử WDIO.

Loại: `String`<br />
Mặc định: `mocha`<br />
Tùy chọn: `mocha` | `jasmine`

### mochaOpts, jasmineOpts và cucumberOpts

Các tùy chọn cụ thể liên quan đến framework. Xem tài liệu bộ điều hợp framework về các tùy chọn có sẵn. Đọc thêm về điều này trong [Frameworks](frameworks).

Loại: `Object`<br />
Mặc định: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Danh sách các tính năng cucumber với số dòng (khi [sử dụng framework cucumber](./Frameworks.md#using-cucumber)).

Loại: `String[]`
Mặc định: `[]`

### reporters

Danh sách các trình báo cáo để sử dụng. Một trình báo cáo có thể là một chuỗi hoặc một mảng
`['reporterName', { /* reporter options */}]` trong đó phần tử đầu tiên là chuỗi với tên trình báo cáo và phần tử thứ hai là một đối tượng với các tùy chọn trình báo cáo.

Loại: `String[]|Object[]`<br />
Mặc định: `[]`

Ví dụ:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

Xác định khoảng thời gian mà trình báo cáo nên kiểm tra xem chúng có được đồng bộ hóa hay không nếu chúng báo cáo nhật ký của họ bất đồng bộ (ví dụ: nếu nhật ký được truyền đến nhà cung cấp bên thứ 3).

Loại: `Number`<br />
Mặc định: `100` (ms)

### reporterSyncTimeout

Xác định thời gian tối đa mà các trình báo cáo có để hoàn thành việc tải lên tất cả nhật ký của họ cho đến khi một lỗi được ném ra bởi trình chạy kiểm thử.

Loại: `Number`<br />
Mặc định: `5000` (ms)

### execArgv

Các đối số Node để chỉ định khi khởi chạy các quy trình con.

Loại: `String[]`<br />
Mặc định: `null`

### filesToWatch

Một danh sách các mẫu chuỗi hỗ trợ glob cho biết trình chạy kiểm thử theo dõi thêm các tệp khác, ví dụ: các tệp ứng dụng, khi chạy với cờ `--watch`. Theo mặc định, trình chạy kiểm thử đã theo dõi tất cả các tệp đặc tả.

Loại: `String[]`<br />
Mặc định: `[]`

### updateSnapshots

Đặt thành true nếu bạn muốn cập nhật các snapshot của mình. Lý tưởng được sử dụng như một phần của tham số CLI, ví dụ: `wdio run wdio.conf.js --s`.

Loại: `'new' | 'all' | 'none'`<br />
Mặc định: `none` nếu không được cung cấp và các bài kiểm thử chạy trong CI, `new` nếu không được cung cấp, nếu không thì những gì đã được cung cấp

### resolveSnapshotPath

Ghi đè đường dẫn snapshot mặc định. Ví dụ, để lưu trữ snapshot cạnh các tệp kiểm thử.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Loại: `(testPath: string, snapExtension: string) => string`<br />
Mặc định: lưu trữ các tệp snapshot trong thư mục `__snapshots__` bên cạnh tệp kiểm thử

### tsConfigPath

WDIO sử dụng `tsx` để biên dịch các tệp TypeScript. TSConfig của bạn được tự động phát hiện từ thư mục làm việc hiện tại, nhưng bạn có thể chỉ định một đường dẫn tùy chỉnh ở đây hoặc bằng cách thiết lập biến môi trường TSX_TSCONFIG_PATH.

Xem tài liệu `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Loại: `String`<br />
Mặc định: `null`<br />

## Hooks

Trình chạy kiểm thử WDIO cho phép bạn thiết lập các hook được kích hoạt tại thời điểm cụ thể của vòng đời kiểm thử. Điều này cho phép các hành động tùy chỉnh (ví dụ: chụp ảnh màn hình nếu kiểm thử thất bại).

Mỗi hook có thông tin cụ thể về vòng đời làm tham số (ví dụ: thông tin về bộ kiểm thử hoặc bài kiểm thử). Đọc thêm về tất cả các thuộc tính hook trong [cấu hình ví dụ của chúng tôi](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Lưu ý:** Một số hook (`onPrepare`, `onWorkerStart`, `onWorkerEnd` và `onComplete`) được thực thi trong một quy trình khác và do đó không thể chia sẻ bất kỳ dữ liệu toàn cục nào với các hook khác sống trong quy trình worker.

### onPrepare

Được thực thi một lần trước khi tất cả worker được khởi chạy.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `param` (`object[]`): danh sách chi tiết các khả năng

### onWorkerStart

Được thực thi trước khi một quy trình worker được tạo ra và có thể được sử dụng để khởi tạo dịch vụ cụ thể cho worker đó cũng như sửa đổi môi trường thời gian chạy theo cách bất đồng bộ.

Tham số:

- `cid` (`string`): id khả năng (ví dụ 0-0)
- `caps` (`object`): chứa các khả năng cho phiên sẽ được tạo ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker
- `args` (`object`): đối tượng sẽ được hợp nhất với cấu hình chính sau khi worker được khởi tạo
- `execArgv` (`string[]`): danh sách các đối số chuỗi được truyền cho quy trình worker

### onWorkerEnd

Được thực thi ngay sau khi một quy trình worker đã thoát.

Tham số:

- `cid` (`string`): id khả năng (ví dụ 0-0)
- `exitCode` (`number`): 0 - thành công, 1 - thất bại
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker
- `retries` (`number`): số lần thử lại cấp độ đặc tả được sử dụng như được định nghĩa trong [_"Thêm thử lại trên cơ sở mỗi tệp đặc tả"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Được thực thi ngay trước khi khởi tạo phiên webdriver và framework kiểm thử. Nó cho phép bạn thao tác cấu hình tùy thuộc vào khả năng hoặc đặc tả.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa các khả năng cho phiên sẽ được tạo ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker

### before

Được thực thi trước khi việc thực thi kiểm thử bắt đầu. Tại thời điểm này, bạn có thể truy cập vào tất cả các biến toàn cục như `browser`. Đây là nơi hoàn hảo để xác định các lệnh tùy chỉnh.

Tham số:

- `caps` (`object`): chứa các khả năng cho phiên sẽ được tạo ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker
- `browser` (`object`): thể hiện của phiên trình duyệt/thiết bị đã tạo

### beforeSuite

Hook được thực thi trước khi bộ kiểm thử bắt đầu (chỉ trong Mocha/Jasmine)

Tham số:

- `suite` (`object`): chi tiết bộ kiểm thử

### beforeHook

Hook được thực thi *trước* một hook trong bộ kiểm thử bắt đầu (ví dụ: chạy trước khi gọi beforeEach trong Mocha)

Tham số:

- `test` (`object`): chi tiết kiểm thử
- `context` (`object`): ngữ cảnh kiểm thử (đại diện cho đối tượng World trong Cucumber)

### afterHook

Hook được thực thi *sau* khi một hook trong bộ kiểm thử kết thúc (ví dụ: chạy sau khi gọi afterEach trong Mocha)

Tham số:

- `test` (`object`): chi tiết kiểm thử
- `context` (`object`): ngữ cảnh kiểm thử (đại diện cho đối tượng World trong Cucumber)
- `result` (`object`): kết quả hook (chứa các thuộc tính `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Hàm được thực thi trước một bài kiểm thử (chỉ trong Mocha/Jasmine).

Tham số:

- `test` (`object`): chi tiết kiểm thử
- `context` (`object`): đối tượng phạm vi mà bài kiểm thử được thực thi

### beforeCommand

Chạy trước khi một lệnh WebdriverIO được thực thi.

Tham số:

- `commandName` (`string`): tên lệnh
- `args` (`*`): đối số mà lệnh sẽ nhận

### afterCommand

Chạy sau khi một lệnh WebdriverIO được thực thi.

Tham số:

- `commandName` (`string`): tên lệnh
- `args` (`*`): đối số mà lệnh sẽ nhận
- `result` (`number`): 0 - lệnh thành công, 1 - lỗi lệnh
- `error` (`Error`): đối tượng lỗi nếu có

### afterTest

Hàm được thực thi sau khi một bài kiểm thử (trong Mocha/Jasmine) kết thúc.

Tham số:

- `test` (`object`): chi tiết kiểm thử
- `context` (`object`): đối tượng phạm vi mà bài kiểm thử được thực thi
- `result.error` (`Error`): đối tượng lỗi trong trường hợp bài kiểm thử thất bại, ngược lại `undefined`
- `result.result` (`Any`): đối tượng trả về của hàm kiểm thử
- `result.duration` (`Number`): thời lượng của bài kiểm thử
- `result.passed` (`Boolean`): true nếu bài kiểm thử đã vượt qua, ngược lại false
- `result.retries` (`Object`): thông tin về các lần thử lại liên quan đến bài kiểm thử đơn lẻ như được định nghĩa cho [Mocha và Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) cũng như [Cucumber](./Retry.md#rerunning-in-cucumber), ví dụ: `{ attempts: 0, limit: 0 }`, xem
- `result` (`object`): kết quả hook (chứa các thuộc tính `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook được thực thi sau khi bộ kiểm thử đã kết thúc (chỉ trong Mocha/Jasmine)

Tham số:

- `suite` (`object`): chi tiết bộ kiểm thử

### after

Được thực thi sau khi tất cả các bài kiểm thử hoàn thành. Bạn vẫn có quyền truy cập vào tất cả các biến toàn cục từ bài kiểm thử.

Tham số:

- `result` (`number`): 0 - kiểm thử vượt qua, 1 - kiểm thử thất bại
- `caps` (`object`): chứa các khả năng cho phiên sẽ được tạo ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker

### afterSession

Được thực thi ngay sau khi kết thúc phiên webdriver.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa các khả năng cho phiên sẽ được tạo ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker

### onComplete

Được thực thi sau khi tất cả các worker đã tắt và quy trình sắp thoát. Một lỗi được ném ra trong hook onComplete sẽ khiến việc chạy kiểm thử thất bại.

Tham số:

- `exitCode` (`number`): 0 - thành công, 1 - thất bại
- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa các khả năng cho phiên sẽ được tạo ra trong worker
- `result` (`object`): đối tượng kết quả chứa kết quả kiểm thử

### onReload

Được thực thi khi có sự làm mới.

Tham số:

- `oldSessionId` (`string`): ID phiên của phiên cũ
- `newSessionId` (`string`): ID phiên của phiên mới

### beforeFeature

Chạy trước một Tính năng Cucumber.

Tham số:

- `uri` (`string`): đường dẫn đến tệp tính năng
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): đối tượng tính năng Cucumber

### afterFeature

Chạy sau một Tính năng Cucumber.

Tham số:

- `uri` (`string`): đường dẫn đến tệp tính năng
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): đối tượng tính năng Cucumber

### beforeScenario

Chạy trước một Kịch bản Cucumber.

Tham số:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): đối tượng world chứa thông tin về pickle và test step
- `context` (`object`): đối tượng Cucumber World

### afterScenario

Chạy sau một Kịch bản Cucumber.

Tham số:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): đối tượng world chứa thông tin về pickle và test step
- `result` (`object`): đối tượng kết quả chứa kết quả kịch bản
- `result.passed` (`boolean`): true nếu kịch bản đã vượt qua
- `result.error` (`string`): stack lỗi nếu kịch bản thất bại
- `result.duration` (`number`): thời lượng của kịch bản tính bằng mili giây
- `context` (`object`): đối tượng Cucumber World

### beforeStep

Chạy trước một Bước Cucumber.

Tham số:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): đối tượng bước Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): đối tượng kịch bản Cucumber
- `context` (`object`): đối tượng Cucumber World

### afterStep

Chạy sau một Bước Cucumber.

Tham số:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): đối tượng bước Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): đối tượng kịch bản Cucumber
- `result`: (`object`): đối tượng kết quả chứa kết quả bước
- `result.passed` (`boolean`): true nếu kịch bản đã vượt qua
- `result.error` (`string`): stack lỗi nếu kịch bản thất bại
- `result.duration` (`number`): thời lượng của kịch bản tính bằng mili giây
- `context` (`object`): đối tượng Cucumber World

### beforeAssertion

Hook được thực thi trước khi một khẳng định WebdriverIO xảy ra.

Tham số:

- `params`: thông tin khẳng định
- `params.matcherName` (`string`): tên của matcher (ví dụ: `toHaveTitle`)
- `params.expectedValue`: giá trị được truyền vào matcher
- `params.options`: tùy chọn khẳng định

### afterAssertion

Hook được thực thi sau khi một khẳng định WebdriverIO xảy ra.

Tham số:

- `params`: thông tin khẳng định
- `params.matcherName` (`string`): tên của matcher (ví dụ: `toHaveTitle`)
- `params.expectedValue`: giá trị được truyền vào matcher
- `params.options`: tùy chọn khẳng định
- `params.result`: kết quả khẳng định
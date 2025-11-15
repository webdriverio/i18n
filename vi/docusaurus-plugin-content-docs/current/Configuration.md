---
id: configuration
title: Cấu hình
---

Dựa trên [loại thiết lập](/docs/setuptypes) (ví dụ: sử dụng các ràng buộc giao thức raw, WebdriverIO như một gói độc lập hoặc trình chạy thử WDIO), có những tùy chọn khác nhau để kiểm soát môi trường.

## Tùy chọn WebDriver

Các tùy chọn sau được định nghĩa khi sử dụng gói giao thức [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Giao thức để sử dụng khi giao tiếp với máy chủ driver.

Loại: `String`<br />
Mặc định: `http`

### hostname

Host của máy chủ driver.

Loại: `String`<br />
Mặc định: `0.0.0.0`

### port

Cổng mà máy chủ driver của bạn đang chạy.

Loại: `Number`<br />
Mặc định: `undefined`

### path

Đường dẫn tới điểm cuối của máy chủ driver.

Loại: `String`<br />
Mặc định: `/`

### queryParams

Tham số truy vấn được truyền đến máy chủ driver.

Loại: `Object`<br />
Mặc định: `undefined`

### user

Tên người dùng dịch vụ đám mây của bạn (chỉ hoạt động cho tài khoản [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) hoặc [LambdaTest](https://www.lambdatest.com)). Nếu được thiết lập, WebdriverIO sẽ tự động thiết lập các tùy chọn kết nối cho bạn. Nếu bạn không sử dụng nhà cung cấp đám mây, điều này có thể được sử dụng để xác thực bất kỳ backend WebDriver nào khác.

Loại: `String`<br />
Mặc định: `undefined`

### key

Khóa truy cập dịch vụ đám mây hoặc khóa bí mật của bạn (chỉ hoạt động cho tài khoản [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) hoặc [LambdaTest](https://www.lambdatest.com)). Nếu được thiết lập, WebdriverIO sẽ tự động thiết lập các tùy chọn kết nối cho bạn. Nếu bạn không sử dụng nhà cung cấp đám mây, điều này có thể được sử dụng để xác thực bất kỳ backend WebDriver nào khác.

Loại: `String`<br />
Mặc định: `undefined`

### capabilities

Xác định các khả năng bạn muốn chạy trong phiên WebDriver của mình. Xem thêm [Giao thức WebDriver](https://w3c.github.io/webdriver/#capabilities) để biết thêm chi tiết. Nếu bạn chạy trình điều khiển cũ không hỗ trợ giao thức WebDriver, bạn cần sử dụng [khả năng của JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) để chạy phiên thành công.

Bên cạnh các khả năng dựa trên WebDriver, bạn có thể áp dụng các tùy chọn cụ thể cho trình duyệt và nhà cung cấp cho phép cấu hình sâu hơn cho trình duyệt từ xa hoặc thiết bị. Các tùy chọn này được ghi lại trong tài liệu của nhà cung cấp tương ứng, ví dụ:

- `goog:chromeOptions`: cho [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: cho [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: cho [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: cho [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: cho [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: cho [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Ngoài ra, một tiện ích hữu ích là [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) của Sauce Labs, giúp bạn tạo đối tượng này bằng cách kết hợp các khả năng mong muốn.

Loại: `Object`<br />
Mặc định: `null`

**Ví dụ:**

```js
{
    browserName: 'chrome', // các tùy chọn: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // phiên bản trình duyệt
    platformName: 'Windows 10' // nền tảng OS
}
```

Nếu bạn đang chạy kiểm thử web hoặc native trên thiết bị di động, `capabilities` khác với giao thức WebDriver. Xem [Tài liệu Appium](https://appium.io/docs/en/latest/guides/caps/) để biết thêm chi tiết.

### logLevel

Mức độ chi tiết của logging.

Loại: `String`<br />
Mặc định: `info`<br />
Tùy chọn: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Thư mục để lưu trữ tất cả các tệp nhật ký của trình chạy thử (bao gồm nhật ký của trình báo cáo và nhật ký `wdio`). Nếu không được đặt, tất cả các nhật ký được gửi đến `stdout`. Vì hầu hết các trình báo cáo được tạo để ghi vào `stdout`, nên chỉ nên sử dụng tùy chọn này cho các trình báo cáo cụ thể khi cần đẩy báo cáo vào tệp (như trình báo cáo `junit`, ví dụ).

Khi chạy ở chế độ độc lập, nhật ký duy nhất được tạo bởi WebdriverIO sẽ là nhật ký `wdio`.

Loại: `String`<br />
Mặc định: `null`

### connectionRetryTimeout

Thời gian chờ cho bất kỳ yêu cầu WebDriver nào đến trình điều khiển hoặc lưới.

Loại: `Number`<br />
Mặc định: `120000`

### connectionRetryCount

Số lần thử lại tối đa cho yêu cầu tới máy chủ Selenium.

Loại: `Number`<br />
Mặc định: `3`

### agent

Cho phép bạn sử dụng tác nhân `http`/`https`/`http2` [tùy chỉnh](https://www.npmjs.com/package/got#agent) để thực hiện yêu cầu.

Loại: `Object`<br />
Mặc định:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Chỉ định `headers` tùy chỉnh để truyền vào mọi yêu cầu WebDriver. Nếu Lưới Selenium của bạn yêu cầu Xác thực Cơ bản, chúng tôi khuyên bạn nên truyền vào header `Authorization` thông qua tùy chọn này để xác thực các yêu cầu WebDriver của bạn, ví dụ:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Đọc tên người dùng và mật khẩu từ biến môi trường
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Kết hợp tên người dùng và mật khẩu với dấu phân cách hai chấm
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

Hàm chặn đối tượng phản hồi HTTP sau khi phản hồi WebDriver đã đến. Hàm được truyền đối tượng phản hồi gốc là đối số đầu tiên và `RequestOptions` tương ứng là đối số thứ hai.

Loại: `(Response, RequestOptions) => Response`<br />
Mặc định: *không có*

### strictSSL

Có yêu cầu chứng chỉ SSL phải hợp lệ hay không.
Có thể được đặt thông qua biến môi trường như `STRICT_SSL` hoặc `strict_ssl`.

Loại: `Boolean`<br />
Mặc định: `true`

### enableDirectConnect

Có kích hoạt [tính năng kết nối trực tiếp Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) hay không.
Nó không làm gì nếu phản hồi không có khóa thích hợp trong khi cờ được kích hoạt.

Loại: `Boolean`<br />
Mặc định: `true`

### cacheDir

Đường dẫn đến thư mục gốc của bộ nhớ cache. Thư mục này được sử dụng để lưu trữ tất cả các trình điều khiển được tải xuống khi cố gắng bắt đầu một phiên.

Loại: `String`<br />
Mặc định: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Để ghi nhật ký an toàn hơn, các biểu thức chính quy được đặt bằng `maskingPatterns` có thể che giấu thông tin nhạy cảm khỏi nhật ký.
 - Định dạng chuỗi là biểu thức chính quy có hoặc không có cờ (ví dụ: `/.../i`) và được phân tách bằng dấu phẩy cho nhiều biểu thức chính quy.
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

Xác định giao thức bạn muốn sử dụng cho tự động hóa trình duyệt. Hiện tại chỉ hỗ trợ [`webdriver`](https://www.npmjs.com/package/webdriver), vì đó là công nghệ tự động hóa trình duyệt chính mà WebdriverIO sử dụng.

Nếu bạn muốn tự động hóa trình duyệt bằng công nghệ tự động hóa khác, hãy đặt thuộc tính này thành đường dẫn dẫn đến một module tuân thủ giao diện sau:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Bắt đầu phiên tự động hóa và trả về một WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * với các lệnh tự động hóa tương ứng. Xem gói [webdriver](https://www.npmjs.com/package/webdriver)
     * như một triển khai tham khảo
     *
     * @param {Capabilities.RemoteConfig} options Tùy chọn WebdriverIO
     * @param {Function} hook cho phép sửa đổi client trước khi nó được phát hành từ hàm
     * @param {PropertyDescriptorMap} userPrototype cho phép người dùng thêm lệnh giao thức tùy chỉnh
     * @param {Function} customCommandWrapper cho phép sửa đổi việc thực thi lệnh
     * @returns một phiên bản client tương thích với WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * cho phép người dùng kết nối với các phiên hiện có
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Thay đổi ID phiên instance và khả năng trình duyệt cho phiên mới
     * trực tiếp vào đối tượng trình duyệt đã truyền vào
     *
     * @optional
     * @param   {object} instance đối tượng chúng ta nhận được từ phiên trình duyệt mới.
     * @returns {string}  ID phiên mới của trình duyệt
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

Rút ngắn lệnh `url` bằng cách đặt URL cơ sở.
- Nếu tham số `url` của bạn bắt đầu bằng `/`, thì `baseUrl` được thêm vào trước (trừ đường dẫn `baseUrl`, nếu có).
- Nếu tham số `url` của bạn bắt đầu mà không có giao thức hoặc `/` (như `some/path`), thì toàn bộ `baseUrl` được thêm vào trực tiếp.

Loại: `String`<br />
Mặc định: `null`

### waitforTimeout

Thời gian chờ mặc định cho tất cả các lệnh `waitFor*`. (Lưu ý chữ `f` viết thường trong tên tùy chọn). Thời gian chờ này __chỉ__ ảnh hưởng đến các lệnh bắt đầu bằng `waitFor*` và thời gian chờ mặc định của chúng.

Để tăng thời gian chờ cho một _bài kiểm tra_, vui lòng xem tài liệu về framework.

Loại: `Number`<br />
Mặc định: `5000`

### waitforInterval

Khoảng thời gian mặc định cho tất cả các lệnh `waitFor*` để kiểm tra xem trạng thái mong đợi (ví dụ: khả năng hiển thị) đã thay đổi hay chưa.

Loại: `Number`<br />
Mặc định: `100`

### region

Nếu chạy trên Sauce Labs, bạn có thể chọn chạy thử nghiệm giữa các trung tâm dữ liệu khác nhau: US hoặc EU.
Để thay đổi vùng của bạn thành EU, thêm `region: 'eu'` vào cấu hình của bạn.

__Lưu ý:__ Điều này chỉ có tác dụng nếu bạn cung cấp các tùy chọn `user` và `key` được kết nối với tài khoản Sauce Labs của bạn.

Loại: `String`<br />
Mặc định: `us`

*(chỉ cho máy ảo và/hoặc máy mô phỏng)*

---

## Tùy chọn Testrunner

Các tùy chọn sau (bao gồm cả những tùy chọn được liệt kê ở trên) chỉ được xác định khi chạy WebdriverIO với trình chạy thử WDIO:

### specs

Xác định specs cho việc thực thi kiểm thử. Bạn có thể chỉ định một mẫu glob để khớp nhiều tệp cùng một lúc hoặc bọc một glob hoặc tập hợp đường dẫn vào một mảng để chạy chúng trong một quy trình worker duy nhất. Tất cả các đường dẫn được xem là tương đối so với đường dẫn tệp cấu hình.

Loại: `(String | String[])[]`<br />
Mặc định: `[]`

### exclude

Loại trừ specs khỏi việc thực thi kiểm thử. Tất cả các đường dẫn được xem là tương đối so với đường dẫn tệp cấu hình.

Loại: `String[]`<br />
Mặc định: `[]`

### suites

Một đối tượng mô tả các bộ khác nhau, mà bạn có thể chỉ định với tùy chọn `--suite` trên CLI `wdio`.

Loại: `Object`<br />
Mặc định: `{}`

### capabilities

Giống như phần `capabilities` được mô tả ở trên, nhưng có thêm tùy chọn để chỉ định đối tượng [`multiremote`](/docs/multiremote) hoặc nhiều phiên WebDriver trong một mảng để thực thi song song.

Bạn có thể áp dụng các khả năng cụ thể của nhà cung cấp và trình duyệt như đã định nghĩa [ở trên](/docs/configuration#capabilities).

Loại: `Object`|`Object[]`<br />
Mặc định: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Số lượng tối đa các worker chạy song song.

__Lưu ý:__ con số này có thể cao tới `100`, khi các thử nghiệm được thực hiện trên một số nhà cung cấp bên ngoài như Sauce Labs. Tại đó, các thử nghiệm không được thử nghiệm trên một máy duy nhất, mà trên nhiều VM. Nếu các thử nghiệm sẽ được chạy trên một máy phát triển cục bộ, hãy sử dụng một con số hợp lý hơn, như `3`, `4` hoặc `5`. Về cơ bản, đây là số lượng trình duyệt sẽ được khởi động đồng thời và chạy các thử nghiệm của bạn cùng một lúc, vì vậy nó phụ thuộc vào dung lượng RAM trên máy của bạn và có bao nhiêu ứng dụng khác đang chạy trên máy của bạn.

Bạn cũng có thể áp dụng `maxInstances` trong các đối tượng khả năng của mình bằng cách sử dụng khả năng `wdio:maxInstances`. Điều này sẽ giới hạn số lượng phiên song song cho khả năng cụ thể đó.

Loại: `Number`<br />
Mặc định: `100`

### maxInstancesPerCapability

Số lượng tối đa các worker chạy song song cho mỗi khả năng.

Loại: `Number`<br />
Mặc định: `100`

### injectGlobals

Chèn các biến toàn cục của WebdriverIO (ví dụ: `browser`, `$` và `$$`) vào môi trường toàn cục.
Nếu bạn đặt thành `false`, bạn nên import từ `@wdio/globals`, ví dụ:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Lưu ý: WebdriverIO không xử lý việc chèn các biến toàn cục cụ thể của framework kiểm thử.

Loại: `Boolean`<br />
Mặc định: `true`

### bail

Nếu bạn muốn dừng việc chạy thử nghiệm sau một số lượng cụ thể các thất bại kiểm thử, hãy sử dụng `bail`.
(Mặc định là `0`, tức là chạy tất cả các thử nghiệm bất kể kết quả.) **Lưu ý:** Một thử nghiệm trong ngữ cảnh này là tất cả các thử nghiệm trong một tệp spec duy nhất (khi sử dụng Mocha hoặc Jasmine) hoặc tất cả các bước trong một tệp tính năng (khi sử dụng Cucumber). Nếu bạn muốn kiểm soát hành vi bail trong các thử nghiệm của một tệp kiểm thử duy nhất, hãy xem các tùy chọn [framework](frameworks) có sẵn.

Loại: `Number`<br />
Mặc định: `0` (không bail; chạy tất cả các thử nghiệm)

### specFileRetries

Số lần thử lại một tệp spec toàn bộ khi nó thất bại hoàn toàn.

Loại: `Number`<br />
Mặc định: `0`

### specFileRetriesDelay

Độ trễ tính bằng giây giữa các lần thử lại tệp spec

Loại: `Number`<br />
Mặc định: `0`

### specFileRetriesDeferred

Có nên thử lại các tệp spec đã thử lại ngay lập tức hay hoãn lại đến cuối hàng đợi.

Loại: `Boolean`<br />
Mặc định: `true`

### groupLogsByTestSpec

Chọn chế độ xem đầu ra nhật ký.

Nếu đặt thành `false`, nhật ký từ các tệp kiểm thử khác nhau sẽ được in theo thời gian thực. Lưu ý rằng điều này có thể dẫn đến việc trộn lẫn đầu ra nhật ký từ các tệp khác nhau khi chạy song song.

Nếu đặt thành `true`, đầu ra nhật ký sẽ được nhóm theo Test Spec và chỉ được in khi Test Spec hoàn thành.

Theo mặc định, nó được đặt thành `false` để nhật ký được in theo thời gian thực.

Loại: `Boolean`<br />
Mặc định: `false`

### autoAssertOnTestEnd

Kiểm soát việc WebdriverIO tự động khẳng định tất cả các soft assertions ở cuối mỗi bài kiểm tra. Khi được đặt thành `true`, bất kỳ soft assertions nào tích lũy sẽ được tự động kiểm tra và gây ra lỗi kiểm tra nếu có bất kỳ assertions nào thất bại. Khi được đặt thành `false`, bạn phải gọi phương thức assert theo cách thủ công để kiểm tra soft assertions.

Loại: `Boolean`<br />
Mặc định: `true`

### services

Các dịch vụ đảm nhận một công việc cụ thể mà bạn không muốn quan tâm đến. Chúng nâng cao thiết lập kiểm thử của bạn với rất ít nỗ lực.

Loại: `String[]|Object[]`<br />
Mặc định: `[]`

### framework

Xác định framework kiểm thử sẽ được sử dụng bởi trình chạy thử WDIO.

Loại: `String`<br />
Mặc định: `mocha`<br />
Tùy chọn: `mocha` | `jasmine`

### mochaOpts, jasmineOpts và cucumberOpts

Các tùy chọn liên quan đến framework cụ thể. Xem tài liệu bộ chuyển đổi framework về các tùy chọn có sẵn. Đọc thêm về vấn đề này trong [Frameworks](frameworks).

Loại: `Object`<br />
Mặc định: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Danh sách các tính năng cucumber với số dòng (khi [sử dụng framework cucumber](./Frameworks.md#using-cucumber)).

Loại: `String[]`
Mặc định: `[]`

### reporters

Danh sách các trình báo cáo để sử dụng. Một trình báo cáo có thể là một chuỗi hoặc một mảng gồm
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

Xác định khoảng thời gian mà trình báo cáo nên kiểm tra xem họ đã đồng bộ hóa nếu họ báo cáo nhật ký của họ không đồng bộ (ví dụ: nếu nhật ký được truyền tới nhà cung cấp bên thứ 3).

Loại: `Number`<br />
Mặc định: `100` (ms)

### reporterSyncTimeout

Xác định thời gian tối đa mà các trình báo cáo phải hoàn thành việc tải lên tất cả các nhật ký của họ cho đến khi một lỗi được trình chạy thử đưa ra.

Loại: `Number`<br />
Mặc định: `5000` (ms)

### execArgv

Đối số Node để chỉ định khi khởi chạy các quy trình con.

Loại: `String[]`<br />
Mặc định: `null`

### filesToWatch

Danh sách các mẫu chuỗi hỗ trợ glob cho biết trình chạy thử phải theo dõi thêm các tệp khác, ví dụ: các tệp ứng dụng, khi chạy với cờ `--watch`. Theo mặc định, trình chạy thử đã theo dõi tất cả các tệp spec.

Loại: `String[]`<br />
Mặc định: `[]`

### updateSnapshots

Đặt thành true nếu bạn muốn cập nhật các snapshot của mình. Lý tưởng nhất là sử dụng như một phần của tham số CLI, ví dụ: `wdio run wdio.conf.js --s`.

Loại: `'new' | 'all' | 'none'`<br />
Mặc định: `none` nếu không được cung cấp và các thử nghiệm chạy trong CI, `new` nếu không được cung cấp, nếu không thì sử dụng những gì đã được cung cấp

### resolveSnapshotPath

Ghi đè đường dẫn snapshot mặc định. Ví dụ, để lưu trữ snapshot cạnh tệp kiểm thử.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Loại: `(testPath: string, snapExtension: string) => string`<br />
Mặc định: lưu trữ các tệp snapshot trong thư mục `__snapshots__` cạnh tệp kiểm thử

### tsConfigPath

WDIO sử dụng `tsx` để biên dịch các tệp TypeScript. TSConfig của bạn được tự động phát hiện từ thư mục làm việc hiện tại nhưng bạn có thể chỉ định đường dẫn tùy chỉnh ở đây hoặc bằng cách đặt biến môi trường TSX_TSCONFIG_PATH.

Xem tài liệu `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Loại: `String`<br />
Mặc định: `null`<br />

## Hooks

Trình chạy thử WDIO cho phép bạn đặt hooks để được kích hoạt tại các thời điểm cụ thể của vòng đời kiểm thử. Điều này cho phép các hành động tùy chỉnh (ví dụ: chụp ảnh màn hình nếu một bài kiểm tra thất bại).

Mỗi hook có thông tin cụ thể về vòng đời (ví dụ: thông tin về bộ thử nghiệm hoặc thử nghiệm) làm tham số. Đọc thêm về tất cả các thuộc tính hook trong [cấu hình ví dụ](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) của chúng tôi.

**Lưu ý:** Một số hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` và `onComplete`) được thực thi trong một quy trình khác và do đó không thể chia sẻ bất kỳ dữ liệu toàn cục nào với các hooks khác sống trong quy trình worker.

### onPrepare

Được thực thi một lần trước khi tất cả các worker được khởi chạy.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `param` (`object[]`): danh sách chi tiết khả năng

### onWorkerStart

Được thực thi trước khi một quy trình worker được tạo và có thể được sử dụng để khởi tạo dịch vụ cụ thể cho worker đó cũng như sửa đổi môi trường thực thi theo cách không đồng bộ.

Tham số:

- `cid` (`string`): id khả năng (ví dụ 0-0)
- `caps` (`object`): chứa khả năng cho phiên sẽ được tạo trong worker
- `specs` (`string[]`): specs sẽ được chạy trong quy trình worker
- `args` (`object`): đối tượng sẽ được hợp nhất với cấu hình chính khi worker được khởi tạo
- `execArgv` (`string[]`): danh sách các đối số chuỗi được truyền cho quy trình worker

### onWorkerEnd

Được thực thi ngay sau khi một quy trình worker đã thoát.

Tham số:

- `cid` (`string`): id khả năng (ví dụ 0-0)
- `exitCode` (`number`): 0 - thành công, 1 - thất bại
- `specs` (`string[]`): specs sẽ được chạy trong quy trình worker
- `retries` (`number`): số lần thử lại ở cấp độ spec được sử dụng như được định nghĩa trong [_"Thêm thử lại dựa trên cơ sở mỗi specfile"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Được thực thi ngay trước khi khởi tạo phiên webdriver và framework kiểm thử. Nó cho phép bạn thao tác các cấu hình tùy thuộc vào khả năng hoặc spec.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa khả năng cho phiên sẽ được tạo trong worker
- `specs` (`string[]`): specs sẽ được chạy trong quy trình worker

### before

Được thực thi trước khi bắt đầu thực thi kiểm thử. Tại thời điểm này, bạn có thể truy cập vào tất cả các biến toàn cục như `browser`. Đây là nơi hoàn hảo để định nghĩa các lệnh tùy chỉnh.

Tham số:

- `caps` (`object`): chứa khả năng cho phiên sẽ được tạo trong worker
- `specs` (`string[]`): specs sẽ được chạy trong quy trình worker
- `browser` (`object`): phiên trình duyệt/thiết bị đã tạo

### beforeSuite

Hook được thực thi trước khi bộ thử nghiệm bắt đầu (chỉ trong Mocha/Jasmine)

Tham số:

- `suite` (`object`): chi tiết bộ thử nghiệm

### beforeHook

Hook được thực thi *trước* một hook trong bộ thử nghiệm bắt đầu (ví dụ chạy trước khi gọi beforeEach trong Mocha)

Tham số:

- `test` (`object`): chi tiết kiểm thử
- `context` (`object`): ngữ cảnh kiểm thử (đại diện cho đối tượng World trong Cucumber)

### afterHook

Hook được thực thi *sau* khi một hook trong bộ thử nghiệm kết thúc (ví dụ chạy sau khi gọi afterEach trong Mocha)

Tham số:

- `test` (`object`): chi tiết kiểm thử
- `context` (`object`): ngữ cảnh kiểm thử (đại diện cho đối tượng World trong Cucumber)
- `result` (`object`): kết quả hook (chứa các thuộc tính `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Hàm được thực thi trước một bài kiểm tra (chỉ trong Mocha/Jasmine).

Tham số:

- `test` (`object`): chi tiết kiểm thử
- `context` (`object`): đối tượng phạm vi mà bài kiểm tra được thực thi với

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
- `result` (`*`): kết quả của lệnh
- `error` (`Error`): đối tượng lỗi nếu có

### afterTest

Hàm được thực thi sau khi một bài kiểm tra (trong Mocha/Jasmine) kết thúc.

Tham số:

- `test` (`object`): chi tiết kiểm thử
- `context` (`object`): đối tượng phạm vi mà bài kiểm tra được thực thi với
- `result.error` (`Error`): đối tượng lỗi trong trường hợp bài kiểm tra thất bại, nếu không thì `undefined`
- `result.result` (`Any`): đối tượng trả về của hàm kiểm thử
- `result.duration` (`Number`): thời lượng của bài kiểm tra
- `result.passed` (`Boolean`): true nếu bài kiểm tra đã vượt qua, nếu không thì false
- `result.retries` (`Object`): thông tin về các lần thử lại liên quan đến bài kiểm tra đơn lẻ như được định nghĩa cho [Mocha và Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) cũng như [Cucumber](./Retry.md#rerunning-in-cucumber), ví dụ `{ attempts: 0, limit: 0 }`, xem
- `result` (`object`): kết quả hook (chứa các thuộc tính `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook được thực thi sau khi bộ thử nghiệm kết thúc (chỉ trong Mocha/Jasmine)

Tham số:

- `suite` (`object`): chi tiết bộ thử nghiệm

### after

Được thực thi sau khi tất cả các bài kiểm tra đã hoàn thành. Bạn vẫn có quyền truy cập vào tất cả các biến toàn cục từ bài kiểm tra.

Tham số:

- `result` (`number`): 0 - thành công, 1 - thất bại
- `caps` (`object`): chứa khả năng cho phiên sẽ được tạo trong worker
- `specs` (`string[]`): specs sẽ được chạy trong quy trình worker

### afterSession

Được thực thi ngay sau khi kết thúc phiên webdriver.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa khả năng cho phiên sẽ được tạo trong worker
- `specs` (`string[]`): specs sẽ được chạy trong quy trình worker

### onComplete

Được thực thi sau khi tất cả các worker bị tắt và quy trình sắp thoát. Một lỗi được đưa ra trong hook onComplete sẽ dẫn đến lần chạy thử nghiệm thất bại.

Tham số:

- `exitCode` (`number`): 0 - thành công, 1 - thất bại
- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa khả năng cho phiên sẽ được tạo trong worker
- `result` (`object`): đối tượng kết quả chứa kết quả kiểm thử

### onReload

Được thực thi khi có một sự làm mới.

Tham số:

- `oldSessionId` (`string`): ID phiên của phiên cũ
- `newSessionId` (`string`): ID phiên của phiên mới

### beforeFeature

Chạy trước một Tính năng Cucumber.

Tham số:

- `uri` (`string`): đường dẫn tới tệp tính năng
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): đối tượng tính năng Cucumber

### afterFeature

Chạy sau một Tính năng Cucumber.

Tham số:

- `uri` (`string`): đường dẫn tới tệp tính năng
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

Hook được thực thi trước khi một assertion WebdriverIO xảy ra.

Tham số:

- `params`: thông tin assertion
- `params.matcherName` (`string`): tên của matcher (ví dụ `toHaveTitle`)
- `params.expectedValue`: giá trị được truyền vào matcher
- `params.options`: tùy chọn assertion

### afterAssertion

Hook được thực thi sau khi một assertion WebdriverIO đã xảy ra.

Tham số:

- `params`: thông tin assertion
- `params.matcherName` (`string`): tên của matcher (ví dụ `toHaveTitle`)
- `params.expectedValue`: giá trị được truyền vào matcher
- `params.options`: tùy chọn assertion
- `params.result`: kết quả assertion
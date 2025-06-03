---
id: configuration
title: Cấu hình
---

Dựa trên [loại thiết lập](/docs/setuptypes) (ví dụ: sử dụng các ràng buộc giao thức thô, WebdriverIO như một gói độc lập hoặc WDIO testrunner), có một tập hợp các tùy chọn khác nhau để điều khiển môi trường.

## Tùy chọn WebDriver

Các tùy chọn sau được xác định khi sử dụng gói giao thức [`webdriver`](https://www.npmjs.com/package/webdriver):

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

Đường dẫn tới endpoint của máy chủ driver.

Loại: `String`<br />
Mặc định: `/`

### queryParams

Các tham số truy vấn được truyền đến máy chủ driver.

Loại: `Object`<br />
Mặc định: `undefined`

### user

Tên người dùng dịch vụ đám mây của bạn (chỉ hoạt động cho tài khoản [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) hoặc [LambdaTest](https://www.lambdatest.com)). Nếu được thiết lập, WebdriverIO sẽ tự động thiết lập các tùy chọn kết nối cho bạn. Nếu bạn không sử dụng nhà cung cấp đám mây, điều này có thể được sử dụng để xác thực bất kỳ backend WebDriver nào khác.

Loại: `String`<br />
Mặc định: `undefined`

### key

Khóa truy cập hoặc khóa bí mật của dịch vụ đám mây của bạn (chỉ hoạt động cho tài khoản [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) hoặc [LambdaTest](https://www.lambdatest.com)). Nếu được thiết lập, WebdriverIO sẽ tự động thiết lập các tùy chọn kết nối cho bạn. Nếu bạn không sử dụng nhà cung cấp đám mây, điều này có thể được sử dụng để xác thực bất kỳ backend WebDriver nào khác.

Loại: `String`<br />
Mặc định: `undefined`

### capabilities

Xác định các khả năng mà bạn muốn chạy trong phiên WebDriver của mình. Xem thêm chi tiết tại [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities). Nếu bạn chạy một driver cũ không hỗ trợ giao thức WebDriver, bạn cần sử dụng [JSONWireProtocol capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) để chạy phiên thành công.

Bên cạnh các khả năng dựa trên WebDriver, bạn có thể áp dụng các tùy chọn cụ thể cho trình duyệt và nhà cung cấp cho phép cấu hình sâu hơn cho trình duyệt từ xa hoặc thiết bị. Những tùy chọn này được ghi lại trong tài liệu tương ứng của nhà cung cấp, ví dụ:

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
    browserName: 'chrome', // tùy chọn: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // phiên bản trình duyệt
    platformName: 'Windows 10' // nền tảng hệ điều hành
}
```

Nếu bạn đang chạy các bài kiểm tra web hoặc native trên thiết bị di động, `capabilities` sẽ khác với giao thức WebDriver. Xem [Appium Docs](https://appium.io/docs/en/latest/guides/caps/) để biết thêm chi tiết.

### logLevel

Mức độ chi tiết của việc ghi log.

Loại: `String`<br />
Mặc định: `info`<br />
Tùy chọn: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Thư mục để lưu trữ tất cả các tệp log của testrunner (bao gồm log của reporter và log `wdio`). Nếu không được thiết lập, tất cả các log sẽ được truyền đến `stdout`. Vì hầu hết các reporter được tạo ra để ghi log vào `stdout`, chỉ nên sử dụng tùy chọn này cho các reporter cụ thể khi cần đẩy báo cáo vào một tệp (như reporter `junit` chẳng hạn).

Khi chạy ở chế độ độc lập, log duy nhất được tạo ra bởi WebdriverIO sẽ là log `wdio`.

Loại: `String`<br />
Mặc định: `null`

### connectionRetryTimeout

Thời gian chờ cho bất kỳ yêu cầu WebDriver nào đến driver hoặc grid.

Loại: `Number`<br />
Mặc định: `120000`

### connectionRetryCount

Số lần thử lại tối đa của yêu cầu đến máy chủ Selenium.

Loại: `Number`<br />
Mặc định: `3`

### agent

Cho phép bạn sử dụng một `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) tùy chỉnh để tạo các yêu cầu.

Loại: `Object`<br />
Mặc định:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Chỉ định các `headers` tùy chỉnh để truyền vào mọi yêu cầu WebDriver. Nếu Selenium Grid của bạn yêu cầu Xác thực Cơ bản, chúng tôi khuyên bạn nên truyền vào header `Authorization` thông qua tùy chọn này để xác thực các yêu cầu WebDriver của bạn, ví dụ:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
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

Có yêu cầu chứng chỉ SSL hợp lệ hay không.
Có thể được thiết lập thông qua biến môi trường như `STRICT_SSL` hoặc `strict_ssl`.

Loại: `Boolean`<br />
Mặc định: `true`

### enableDirectConnect

Có bật [tính năng kết nối trực tiếp của Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) hay không.
Nó không làm gì nếu phản hồi không có các khóa thích hợp trong khi cờ được bật.

Loại: `Boolean`<br />
Mặc định: `true`

### cacheDir

Đường dẫn đến thư mục gốc của bộ nhớ cache. Thư mục này được sử dụng để lưu trữ tất cả các driver được tải xuống khi cố gắng bắt đầu một phiên.

Loại: `String`<br />
Mặc định: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Để ghi log an toàn hơn, các biểu thức chính quy được thiết lập với `maskingPatterns` có thể làm mờ thông tin nhạy cảm từ log.
 - Định dạng chuỗi là một biểu thức chính quy có hoặc không có cờ (ví dụ: `/.../i`) và phân tách bằng dấu phẩy cho nhiều biểu thức chính quy.
 - Để biết thêm chi tiết về mẫu che dấu, xem [phần Masking Patterns trong README của WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Các tùy chọn sau (bao gồm các tùy chọn được liệt kê ở trên) có thể được sử dụng với WebdriverIO ở chế độ độc lập:

### automationProtocol

Xác định giao thức bạn muốn sử dụng cho tự động hóa trình duyệt. Hiện tại chỉ [`webdriver`](https://www.npmjs.com/package/webdriver) được hỗ trợ, vì đó là công nghệ tự động hóa trình duyệt chính mà WebdriverIO sử dụng.

Nếu bạn muốn tự động hóa trình duyệt bằng công nghệ tự động hóa khác, hãy đảm bảo thiết lập thuộc tính này thành một đường dẫn giải quyết tới một module tuân thủ giao diện sau:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
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

Rút ngắn lệnh gọi `url` bằng cách thiết lập một URL cơ sở.
- Nếu tham số `url` của bạn bắt đầu bằng `/`, thì `baseUrl` sẽ được thêm vào trước (ngoại trừ đường dẫn `baseUrl`, nếu có).
- Nếu tham số `url` của bạn bắt đầu mà không có scheme hoặc `/` (như `some/path`), thì toàn bộ `baseUrl` sẽ được thêm vào trước trực tiếp.

Loại: `String`<br />
Mặc định: `null`

### waitforTimeout

Thời gian chờ mặc định cho tất cả các lệnh `waitFor*`. (Lưu ý chữ `f` viết thường trong tên tùy chọn.) Thời gian chờ này __chỉ__ ảnh hưởng đến các lệnh bắt đầu bằng `waitFor*` và thời gian chờ mặc định của chúng.

Để tăng thời gian chờ cho một _bài kiểm tra_, vui lòng xem tài liệu framework.

Loại: `Number`<br />
Mặc định: `5000`

### waitforInterval

Khoảng thời gian mặc định cho tất cả các lệnh `waitFor*` để kiểm tra xem trạng thái mong đợi (ví dụ: tính hiển thị) đã được thay đổi hay chưa.

Loại: `Number`<br />
Mặc định: `100`

### region

Nếu chạy trên Sauce Labs, bạn có thể chọn chạy các bài kiểm tra giữa các trung tâm dữ liệu khác nhau: US hoặc EU.
Để thay đổi khu vực của bạn thành EU, hãy thêm `region: 'eu'` vào cấu hình của bạn.

__Lưu ý:__ Điều này chỉ có tác dụng nếu bạn cung cấp các tùy chọn `user` và `key` được kết nối với tài khoản Sauce Labs của bạn.

Loại: `String`<br />
Mặc định: `us`

*(chỉ dành cho vm và/hoặc em/máy mô phỏng)*

---

## Tùy chọn Testrunner

Các tùy chọn sau (bao gồm các tùy chọn được liệt kê ở trên) chỉ được xác định khi chạy WebdriverIO với WDIO testrunner:

### specs

Xác định các đặc tả cho việc thực thi kiểm tra. Bạn có thể chỉ định một mẫu glob để khớp với nhiều tệp cùng lúc hoặc bọc một glob hoặc tập hợp đường dẫn vào một mảng để chạy chúng trong một quy trình worker duy nhất. Tất cả các đường dẫn được xem là tương đối từ đường dẫn tệp cấu hình.

Loại: `(String | String[])[]`<br />
Mặc định: `[]`

### exclude

Loại trừ các đặc tả khỏi việc thực thi kiểm tra. Tất cả các đường dẫn được xem là tương đối từ đường dẫn tệp cấu hình.

Loại: `String[]`<br />
Mặc định: `[]`

### suites

Một đối tượng mô tả các bộ kiểm tra khác nhau, mà bạn có thể chỉ định với tùy chọn `--suite` trên CLI `wdio`.

Loại: `Object`<br />
Mặc định: `{}`

### capabilities

Giống như phần `capabilities` được mô tả ở trên, ngoại trừ tùy chọn để chỉ định một đối tượng [`multiremote`](/docs/multiremote), hoặc nhiều phiên WebDriver trong một mảng để thực thi song song.

Bạn có thể áp dụng các khả năng cụ thể của nhà cung cấp và trình duyệt như đã định nghĩa [ở trên](/docs/configuration#capabilities).

Loại: `Object`|`Object[]`<br />
Mặc định: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Số lượng tối đa worker chạy song song.

__Lưu ý:__ con số này có thể cao tới `100`, khi các bài kiểm tra được thực hiện trên một số nhà cung cấp bên ngoài như máy của Sauce Labs. Ở đó, các bài kiểm tra không được thực hiện trên một máy duy nhất, mà là trên nhiều máy ảo. Nếu các bài kiểm tra sẽ được chạy trên máy phát triển cục bộ, hãy sử dụng một số hợp lý hơn, như `3`, `4` hoặc `5`. Về cơ bản, đây là số lượng trình duyệt sẽ được khởi động đồng thời và chạy các bài kiểm tra của bạn cùng lúc, vì vậy nó phụ thuộc vào lượng RAM trên máy của bạn và có bao nhiêu ứng dụng khác đang chạy trên máy của bạn.

Bạn cũng có thể áp dụng `maxInstances` trong các đối tượng capability của mình bằng cách sử dụng khả năng `wdio:maxInstances`. Điều này sẽ giới hạn số lượng phiên song song cho khả năng cụ thể đó.

Loại: `Number`<br />
Mặc định: `100`

### maxInstancesPerCapability

Số lượng tối đa worker chạy song song cho mỗi khả năng.

Loại: `Number`<br />
Mặc định: `100`

### injectGlobals

Chèn các biến toàn cục của WebdriverIO (như `browser`, `$` và `$$`) vào môi trường toàn cục.
Nếu bạn thiết lập thành `false`, bạn nên import từ `@wdio/globals`, ví dụ:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Lưu ý: WebdriverIO không xử lý việc chèn các biến toàn cục đặc thù cho framework kiểm tra.

Loại: `Boolean`<br />
Mặc định: `true`

### bail

Nếu bạn muốn quá trình chạy kiểm tra của mình dừng lại sau một số lượng bài kiểm tra thất bại cụ thể, hãy sử dụng `bail`.
(Mặc định là `0`, tức là chạy tất cả các bài kiểm tra bất kể kết quả thế nào.) **Lưu ý:** Một bài kiểm tra trong ngữ cảnh này là tất cả các bài kiểm tra trong một tệp đặc tả duy nhất (khi sử dụng Mocha hoặc Jasmine) hoặc tất cả các bước trong một tệp tính năng (khi sử dụng Cucumber). Nếu bạn muốn kiểm soát hành vi bail trong các bài kiểm tra của một tệp kiểm tra duy nhất, hãy xem các tùy chọn [framework](frameworks) có sẵn.

Loại: `Number`<br />
Mặc định: `0` (không bail; chạy tất cả các bài kiểm tra)

### specFileRetries

Số lần thử lại toàn bộ tệp đặc tả khi nó thất bại toàn bộ.

Loại: `Number`<br />
Mặc định: `0`

### specFileRetriesDelay

Độ trễ tính bằng giây giữa các lần thử lại tệp đặc tả

Loại: `Number`<br />
Mặc định: `0`

### specFileRetriesDeferred

Liệu các tệp đặc tả được thử lại có nên được thử lại ngay lập tức hay hoãn lại đến cuối hàng đợi.

Loại: `Boolean`<br />
Mặc định: `true`

### groupLogsByTestSpec

Chọn chế độ hiển thị log đầu ra.

Nếu thiết lập thành `false`, log từ các tệp kiểm tra khác nhau sẽ được in theo thời gian thực. Xin lưu ý rằng điều này có thể dẫn đến việc trộn lẫn đầu ra log từ các tệp khác nhau khi chạy song song.

Nếu thiết lập thành `true`, đầu ra log sẽ được nhóm theo Test Spec và chỉ được in khi Test Spec hoàn thành.

Mặc định, nó được thiết lập thành `false` để log được in theo thời gian thực.

Loại: `Boolean`<br />
Mặc định: `false`

### services

Các dịch vụ đảm nhận một công việc cụ thể mà bạn không muốn quan tâm. Chúng nâng cao thiết lập kiểm tra của bạn với gần như không cần nỗ lực.

Loại: `String[]|Object[]`<br />
Mặc định: `[]`

### framework

Xác định framework kiểm tra được sử dụng bởi WDIO testrunner.

Loại: `String`<br />
Mặc định: `mocha`<br />
Tùy chọn: `mocha` | `jasmine`

### mochaOpts, jasmineOpts và cucumberOpts

Các tùy chọn liên quan đến framework cụ thể. Xem tài liệu bộ điều hợp framework để biết các tùy chọn nào có sẵn. Đọc thêm về điều này trong [Frameworks](frameworks).

Loại: `Object`<br />
Mặc định: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Danh sách các tính năng cucumber với số dòng (khi [sử dụng framework cucumber](./Frameworks.md#using-cucumber)).

Loại: `String[]`
Mặc định: `[]`

### reporters

Danh sách các reporter để sử dụng. Một reporter có thể là một chuỗi, hoặc một mảng
`['reporterName', { /* reporter options */}]` trong đó phần tử đầu tiên là một chuỗi với tên reporter và phần tử thứ hai là một đối tượng với các tùy chọn reporter.

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

Xác định khoảng thời gian mà reporter nên kiểm tra xem chúng đã được đồng bộ hóa hay chưa nếu chúng báo cáo log của mình bất đồng bộ (ví dụ: nếu log được truyền đến một nhà cung cấp bên thứ 3).

Loại: `Number`<br />
Mặc định: `100` (ms)

### reporterSyncTimeout

Xác định thời gian tối đa mà các reporter có để hoàn thành việc tải lên tất cả log của họ cho đến khi testrunner ném ra lỗi.

Loại: `Number`<br />
Mặc định: `5000` (ms)

### execArgv

Đối số Node để chỉ định khi khởi chạy các quy trình con.

Loại: `String[]`<br />
Mặc định: `null`

### filesToWatch

Danh sách các mẫu chuỗi hỗ trợ glob cho biết testrunner theo dõi thêm các tệp khác, ví dụ: các tệp ứng dụng, khi chạy với cờ `--watch`. Mặc định, testrunner đã theo dõi tất cả các tệp đặc tả.

Loại: `String[]`<br />
Mặc định: `[]`

### updateSnapshots

Đặt thành true nếu bạn muốn cập nhật ảnh chụp của mình. Lý tưởng nhất là sử dụng như một phần của tham số CLI, ví dụ: `wdio run wdio.conf.js --s`.

Loại: `'new' | 'all' | 'none'`<br />
Mặc định: `none` nếu không được cung cấp và các bài kiểm tra chạy trong CI, `new` nếu không được cung cấp, nếu không thì giá trị đã được cung cấp

### resolveSnapshotPath

Ghi đè đường dẫn ảnh chụp mặc định. Ví dụ, để lưu trữ ảnh chụp bên cạnh các tệp kiểm tra.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Loại: `(testPath: string, snapExtension: string) => string`<br />
Mặc định: lưu trữ các tệp ảnh chụp trong thư mục `__snapshots__` bên cạnh tệp kiểm tra

### tsConfigPath

WDIO sử dụng `tsx` để biên dịch các tệp TypeScript. TSConfig của bạn được tự động phát hiện từ thư mục làm việc hiện tại nhưng bạn có thể chỉ định một đường dẫn tùy chỉnh tại đây hoặc bằng cách thiết lập biến môi trường TSX_TSCONFIG_PATH.

Xem tài liệu `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Loại: `String`<br />
Mặc định: `null`<br />

## Hooks

WDIO testrunner cho phép bạn thiết lập các hook để được kích hoạt tại các thời điểm cụ thể của vòng đời kiểm tra. Điều này cho phép các hành động tùy chỉnh (ví dụ: chụp ảnh màn hình nếu một bài kiểm tra thất bại).

Mỗi hook có các thông tin cụ thể về vòng đời làm tham số (ví dụ: thông tin về bộ kiểm tra hoặc bài kiểm tra). Đọc thêm về tất cả các thuộc tính hook trong [cấu hình ví dụ của chúng tôi](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Lưu ý:** Một số hook (`onPrepare`, `onWorkerStart`, `onWorkerEnd` và `onComplete`) được thực thi trong một quy trình khác và do đó không thể chia sẻ bất kỳ dữ liệu toàn cục nào với các hook khác sống trong quy trình worker.

### onPrepare

Được thực thi một lần trước khi tất cả các worker được khởi chạy.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `param` (`object[]`): danh sách chi tiết về khả năng

### onWorkerStart

Được thực thi trước khi một quy trình worker được sinh ra và có thể được sử dụng để khởi tạo dịch vụ cụ thể cho worker đó cũng như sửa đổi môi trường thực thi theo cách bất đồng bộ.

Tham số:

- `cid` (`string`): id khả năng (ví dụ 0-0)
- `caps` (`object`): chứa các khả năng cho phiên sẽ được sinh ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker
- `args` (`object`): đối tượng sẽ được hợp nhất với cấu hình chính sau khi worker được khởi tạo
- `execArgv` (`string[]`): danh sách các đối số chuỗi được truyền vào quy trình worker

### onWorkerEnd

Được thực thi ngay sau khi một quy trình worker đã thoát.

Tham số:

- `cid` (`string`): id khả năng (ví dụ 0-0)
- `exitCode` (`number`): 0 - thành công, 1 - thất bại
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker
- `retries` (`number`): số lần thử lại cấp đặc tả được sử dụng như đã định nghĩa trong [_"Thêm thử lại trên cơ sở mỗi tệp đặc tả"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Được thực thi ngay trước khi khởi tạo phiên webdriver và framework kiểm tra. Nó cho phép bạn thao tác với cấu hình tùy thuộc vào khả năng hoặc đặc tả.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa các khả năng cho phiên sẽ được sinh ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker

### before

Được thực thi trước khi thực thi kiểm tra bắt đầu. Tại thời điểm này bạn có thể truy cập vào tất cả các biến toàn cục như `browser`. Đây là nơi hoàn hảo để xác định các lệnh tùy chỉnh.

Tham số:

- `caps` (`object`): chứa các khả năng cho phiên sẽ được sinh ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker
- `browser` (`object`): instance của phiên trình duyệt/thiết bị đã tạo

### beforeSuite

Hook được thực thi trước khi bộ kiểm tra bắt đầu (chỉ trong Mocha/Jasmine)

Tham số:

- `suite` (`object`): chi tiết về bộ kiểm tra

### beforeHook

Hook được thực thi *trước* một hook trong bộ kiểm tra bắt đầu (ví dụ: chạy trước khi gọi beforeEach trong Mocha)

Tham số:

- `test` (`object`): chi tiết về bài kiểm tra
- `context` (`object`): ngữ cảnh kiểm tra (đại diện cho đối tượng World trong Cucumber)

### afterHook

Hook được thực thi *sau* khi một hook trong bộ kiểm tra kết thúc (ví dụ: chạy sau khi gọi afterEach trong Mocha)

Tham số:

- `test` (`object`): chi tiết về bài kiểm tra
- `context` (`object`): ngữ cảnh kiểm tra (đại diện cho đối tượng World trong Cucumber)
- `result` (`object`): kết quả hook (chứa các thuộc tính `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Hàm được thực thi trước một bài kiểm tra (chỉ trong Mocha/Jasmine).

Tham số:

- `test` (`object`): chi tiết về bài kiểm tra
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
- `result` (`number`): 0 - lệnh thành công, 1 - lỗi lệnh
- `error` (`Error`): đối tượng lỗi nếu có

### afterTest

Hàm được thực thi sau khi một bài kiểm tra (trong Mocha/Jasmine) kết thúc.

Tham số:

- `test` (`object`): chi tiết về bài kiểm tra
- `context` (`object`): đối tượng phạm vi mà bài kiểm tra được thực thi với
- `result.error` (`Error`): đối tượng lỗi trong trường hợp bài kiểm tra thất bại, nếu không là `undefined`
- `result.result` (`Any`): đối tượng trả về của hàm kiểm tra
- `result.duration` (`Number`): thời gian của bài kiểm tra
- `result.passed` (`Boolean`): true nếu bài kiểm tra đã thông qua, nếu không là false
- `result.retries` (`Object`): thông tin về các lần thử lại liên quan đến bài kiểm tra đơn lẻ như được định nghĩa cho [Mocha và Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) cũng như [Cucumber](./Retry.md#rerunning-in-cucumber), ví dụ: `{ attempts: 0, limit: 0 }`, xem
- `result` (`object`): kết quả hook (chứa các thuộc tính `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook được thực thi sau khi bộ kiểm tra đã kết thúc (chỉ trong Mocha/Jasmine)

Tham số:

- `suite` (`object`): chi tiết về bộ kiểm tra

### after

Được thực thi sau khi tất cả các bài kiểm tra hoàn thành. Bạn vẫn có quyền truy cập vào tất cả các biến toàn cục từ bài kiểm tra.

Tham số:

- `result` (`number`): 0 - kiểm tra thông qua, 1 - kiểm tra thất bại
- `caps` (`object`): chứa các khả năng cho phiên sẽ được sinh ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker

### afterSession

Được thực thi ngay sau khi kết thúc phiên webdriver.

Tham số:

- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa các khả năng cho phiên sẽ được sinh ra trong worker
- `specs` (`string[]`): đặc tả sẽ được chạy trong quy trình worker

### onComplete

Được thực thi sau khi tất cả các worker bị tắt và quy trình sắp thoát. Một lỗi được ném ra trong hook onComplete sẽ dẫn đến việc quá trình chạy kiểm tra thất bại.

Tham số:

- `exitCode` (`number`): 0 - thành công, 1 - thất bại
- `config` (`object`): đối tượng cấu hình WebdriverIO
- `caps` (`object`): chứa các khả năng cho phiên sẽ được sinh ra trong worker
- `result` (`object`): đối tượng kết quả chứa kết quả kiểm tra

### onReload

Được thực thi khi xảy ra làm mới.

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): đối tượng world chứa thông tin về pickle và bước kiểm tra
- `context` (`object`): đối tượng Cucumber World

### afterScenario

Chạy sau một Kịch bản Cucumber.

Tham số:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): đối tượng world chứa thông tin về pickle và bước kiểm tra
- `result` (`object`): đối tượng kết quả chứa kết quả kịch bản
- `result.passed` (`boolean`): true nếu kịch bản đã thông qua
- `result.error` (`string`): ngăn xếp lỗi nếu kịch bản thất bại
- `result.duration` (`number`): thời gian của kịch bản tính bằng mili giây
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
- `result.passed` (`boolean`): true nếu kịch bản đã thông qua
- `result.error` (`string`): ngăn xếp lỗi nếu kịch bản thất bại
- `result.duration` (`number`): thời gian của kịch bản tính bằng mili giây
- `context` (`object`): đối tượng Cucumber World

### beforeAssertion

Hook được thực thi trước khi một khẳng định WebdriverIO xảy ra.

Tham số:

- `params`: thông tin khẳng định
- `params.matcherName` (`string`): tên của matcher (ví dụ: `toHaveTitle`)
- `params.expectedValue`: giá trị được truyền vào matcher
- `params.options`: tùy chọn khẳng định

### afterAssertion

Hook được thực thi sau khi một khẳng định WebdriverIO đã xảy ra.

Tham số:

- `params`: thông tin khẳng định
- `params.matcherName` (`string`): tên của matcher (ví dụ: `toHaveTitle`)
- `params.expectedValue`: giá trị được truyền vào matcher
- `params.options`: tùy chọn khẳng định
- `params.result`: kết quả khẳng định
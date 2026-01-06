---
id: capabilities
title: Khả năng
---

Một khả năng (capability) là một định nghĩa cho giao diện từ xa. Nó giúp WebdriverIO hiểu được bạn muốn chạy các bài kiểm thử của mình trên môi trường trình duyệt hoặc thiết bị di động nào. Các khả năng không quá quan trọng khi phát triển kiểm thử cục bộ vì bạn thường chỉ chạy trên một giao diện từ xa, nhưng trở nên quan trọng hơn khi chạy một tập hợp lớn các bài kiểm thử tích hợp trong CI/CD.

:::info

Định dạng của đối tượng khả năng được định nghĩa rõ ràng bởi [đặc tả WebDriver](https://w3c.github.io/webdriver/#capabilities). Testrunner của WebdriverIO sẽ báo lỗi sớm nếu các khả năng do người dùng định nghĩa không tuân theo đặc tả đó.

:::

## Khả năng Tùy chỉnh

Mặc dù số lượng khả năng được định nghĩa cố định là rất ít, mọi người đều có thể cung cấp và chấp nhận các khả năng tùy chỉnh đặc thù cho trình điều khiển tự động hoặc giao diện từ xa:

### Phần mở rộng Khả năng Đặc thù cho Trình duyệt

- `goog:chromeOptions`: Phần mở rộng [Chromedriver](https://chromedriver.chromium.org/capabilities), chỉ áp dụng cho kiểm thử trong Chrome
- `moz:firefoxOptions`: Phần mở rộng [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), chỉ áp dụng cho kiểm thử trong Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) để chỉ định môi trường khi sử dụng EdgeDriver cho việc kiểm thử Chromium Edge

### Phần mở rộng Khả năng của Nhà cung cấp Cloud

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- và nhiều hơn nữa...

### Phần mở rộng Khả năng của Công cụ Tự động hóa

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- và nhiều hơn nữa...

### Khả năng WebdriverIO để quản lý tùy chọn trình điều khiển trình duyệt

WebdriverIO quản lý việc cài đặt và chạy trình điều khiển trình duyệt cho bạn. WebdriverIO sử dụng một khả năng tùy chỉnh cho phép bạn truyền tham số vào trình điều khiển.

#### `wdio:chromedriverOptions`

Các tùy chọn cụ thể được truyền vào Chromedriver khi khởi động.

#### `wdio:geckodriverOptions`

Các tùy chọn cụ thể được truyền vào Geckodriver khi khởi động.

#### `wdio:edgedriverOptions`

Các tùy chọn cụ thể được truyền vào Edgedriver khi khởi động.

#### `wdio:safaridriverOptions`

Các tùy chọn cụ thể được truyền vào Safari khi khởi động.

#### `wdio:maxInstances`

Số lượng tối đa các worker chạy song song cho trình duyệt/khả năng cụ thể. Được ưu tiên hơn [maxInstances](#configuration#maxInstances) và [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Loại: `number`

#### `wdio:specs`

Định nghĩa các spec cho việc thực thi kiểm thử cho trình duyệt/khả năng đó. Giống như [tùy chọn cấu hình `specs` thông thường](configuration#specs), nhưng dành riêng cho trình duyệt/khả năng. Được ưu tiên hơn `specs`.

Loại: `(String | String[])[]`

#### `wdio:exclude`

Loại trừ các spec khỏi việc thực thi kiểm thử cho trình duyệt/khả năng đó. Giống như [tùy chọn cấu hình `exclude` thông thường](configuration#exclude), nhưng dành riêng cho trình duyệt/khả năng. Loại trừ sau khi tùy chọn cấu hình `exclude` toàn cục được áp dụng.

Loại: `String[]`

#### `wdio:enforceWebDriverClassic`

Mặc định, WebdriverIO cố gắng thiết lập một phiên WebDriver Bidi. Nếu bạn không thích điều đó, bạn có thể đặt cờ này để tắt hành vi này.

Loại: `boolean`

#### Các Tùy chọn Trình điều khiển Phổ biến

Mặc dù tất cả trình điều khiển đều cung cấp các tham số cấu hình khác nhau, có một số tùy chọn chung mà WebdriverIO hiểu và sử dụng để thiết lập trình điều khiển hoặc trình duyệt của bạn:

##### `cacheDir`

Đường dẫn đến thư mục gốc của bộ nhớ cache. Thư mục này được sử dụng để lưu trữ tất cả các trình điều khiển được tải xuống khi cố gắng bắt đầu một phiên.

Loại: `string`<br />
Mặc định: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Đường dẫn đến tệp nhị phân trình điều khiển tùy chỉnh. Nếu được thiết lập, WebdriverIO sẽ không cố gắng tải xuống trình điều khiển mà sẽ sử dụng trình điều khiển được cung cấp bởi đường dẫn này. Hãy đảm bảo trình điều khiển tương thích với trình duyệt bạn đang sử dụng.

Bạn có thể cung cấp đường dẫn này thông qua các biến môi trường `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` hoặc `EDGEDRIVER_PATH`.

Loại: `string`

:::caution

Nếu `binary` của trình điều khiển được thiết lập, WebdriverIO sẽ không cố gắng tải xuống trình điều khiển mà sẽ sử dụng trình điều khiển được cung cấp bởi đường dẫn này. Hãy đảm bảo trình điều khiển tương thích với trình duyệt bạn đang sử dụng.

:::

#### Tùy chọn Trình điều khiển Đặc thù cho Trình duyệt

Để truyền các tùy chọn vào trình điều khiển, bạn có thể sử dụng các khả năng tùy chỉnh sau:

- Chrome hoặc Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
Cổng mà trình điều khiển ADB nên chạy.

Ví dụ: `9515`

Loại: `number`

##### urlBase
Tiền tố đường dẫn URL cơ sở cho các lệnh, ví dụ: `wd/url`.

Ví dụ: `/`

Loại: `string`

##### logPath
Ghi nhật ký máy chủ vào tệp thay vì stderr, tăng mức nhật ký lên `INFO`

Loại: `string`

##### logLevel
Đặt mức nhật ký. Các tùy chọn có thể là `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Loại: `string`

##### verbose
Ghi nhật ký chi tiết (tương đương với `--log-level=ALL`)

Loại: `boolean`

##### silent
Không ghi nhật ký gì (tương đương với `--log-level=OFF`)

Loại: `boolean`

##### appendLog
Thêm vào tệp nhật ký thay vì ghi đè.

Loại: `boolean`

##### replayable
Ghi nhật ký chi tiết và không cắt ngắn chuỗi dài để nhật ký có thể được phát lại (thử nghiệm).

Loại: `boolean`

##### readableTimestamp
Thêm dấu thời gian dễ đọc vào nhật ký.

Loại: `boolean`

##### enableChromeLogs
Hiển thị nhật ký từ trình duyệt (ghi đè các tùy chọn ghi nhật ký khác).

Loại: `boolean`

##### bidiMapperPath
Đường dẫn bộ ánh xạ bidi tùy chỉnh.

Loại: `string`

##### allowedIps
Danh sách các địa chỉ IP từ xa được phép kết nối với EdgeDriver, phân cách bằng dấu phẩy.

Loại: `string[]`<br />
Mặc định: `['']`

##### allowedOrigins
Danh sách các nguồn gốc yêu cầu được phép kết nối với EdgeDriver, phân cách bằng dấu phẩy. Sử dụng `*` để cho phép bất kỳ nguồn gốc máy chủ nào là nguy hiểm!

Loại: `string[]`<br />
Mặc định: `['*']`

##### spawnOpts
Các tùy chọn được truyền vào quá trình trình điều khiển.

Loại: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Mặc định: `undefined`

</TabItem>
<TabItem value="firefox">

Xem tất cả các tùy chọn Geckodriver trong [gói trình điều khiển chính thức](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Xem tất cả các tùy chọn Edgedriver trong [gói trình điều khiển chính thức](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Xem tất cả các tùy chọn Safaridriver trong [gói trình điều khiển chính thức](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Các Khả năng Đặc biệt cho Các Trường hợp Sử dụng Cụ thể

Đây là danh sách các ví dụ cho thấy những khả năng nào cần được áp dụng để đạt được một trường hợp sử dụng nhất định.

### Chạy Trình duyệt Headless

Chạy trình duyệt headless có nghĩa là chạy một phiên trình duyệt mà không có cửa sổ hoặc giao diện người dùng. Điều này thường được sử dụng trong môi trường CI/CD nơi không có hiển thị. Để chạy trình duyệt ở chế độ headless, áp dụng các khả năng sau:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // hoặc 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Có vẻ như Safari [không hỗ trợ](https://discussions.apple.com/thread/251837694) chạy ở chế độ headless.

</TabItem>
</Tabs>

### Tự động hóa Các Kênh Trình duyệt Khác nhau

Nếu bạn muốn kiểm thử phiên bản trình duyệt chưa được phát hành ở dạng ổn định, ví dụ Chrome Canary, bạn có thể làm vậy bằng cách thiết lập các khả năng và trỏ tới trình duyệt bạn muốn khởi động, ví dụ:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Khi kiểm thử trên Chrome, WebdriverIO sẽ tự động tải xuống phiên bản trình duyệt và trình điều khiển mong muốn cho bạn dựa trên `browserVersion` được định nghĩa, ví dụ:

```ts
{
    browserName: 'chrome', // hoặc 'chromium'
    browserVersion: '116' // hoặc '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' hoặc 'latest' (giống như 'canary')
}
```

Nếu bạn muốn kiểm thử trình duyệt đã tải xuống thủ công, bạn có thể cung cấp đường dẫn nhị phân đến trình duyệt qua:

```ts
{
    browserName: 'chrome',  // hoặc 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Ngoài ra, nếu bạn muốn sử dụng trình điều khiển đã tải xuống thủ công, bạn có thể cung cấp đường dẫn nhị phân đến trình điều khiển qua:

```ts
{
    browserName: 'chrome', // hoặc 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Khi kiểm thử trên Firefox, WebdriverIO sẽ tự động tải xuống phiên bản trình duyệt và trình điều khiển mong muốn cho bạn dựa trên `browserVersion` được định nghĩa, ví dụ:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // hoặc 'latest'
}
```

Nếu bạn muốn kiểm thử phiên bản đã tải xuống thủ công, bạn có thể cung cấp đường dẫn nhị phân đến trình duyệt qua:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Ngoài ra, nếu bạn muốn sử dụng trình điều khiển đã tải xuống thủ công, bạn có thể cung cấp đường dẫn nhị phân đến trình điều khiển qua:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Khi kiểm thử trên Microsoft Edge, hãy đảm bảo bạn đã cài đặt phiên bản trình duyệt mong muốn trên máy của mình. Bạn có thể chỉ cho WebdriverIO trình duyệt để thực thi qua:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO sẽ tự động tải xuống phiên bản trình điều khiển mong muốn cho bạn dựa trên `browserVersion` được định nghĩa, ví dụ:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // hoặc '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Ngoài ra, nếu bạn muốn sử dụng trình điều khiển đã tải xuống thủ công, bạn có thể cung cấp đường dẫn nhị phân đến trình điều khiển qua:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Khi kiểm thử trên Safari, hãy đảm bảo bạn đã cài đặt [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) trên máy của mình. Bạn có thể chỉ cho WebdriverIO đến phiên bản đó qua:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Mở rộng Khả năng Tùy chỉnh

Nếu bạn muốn định nghĩa bộ khả năng riêng để, ví dụ, lưu trữ dữ liệu tùy ý được sử dụng trong các bài kiểm thử cho khả năng cụ thể đó, bạn có thể làm vậy bằng cách thiết lập:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // cấu hình tùy chỉnh
        }
    }]
}
```

Bạn nên tuân theo [giao thức W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) khi đặt tên khả năng, yêu cầu một ký tự `:` (dấu hai chấm) để biểu thị không gian tên cụ thể của triển khai. Trong các bài kiểm thử, bạn có thể truy cập khả năng tùy chỉnh thông qua, ví dụ:

```ts
browser.capabilities['custom:caps']
```

Để đảm bảo an toàn kiểu dữ liệu, bạn có thể mở rộng giao diện khả năng của WebdriverIO qua:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```
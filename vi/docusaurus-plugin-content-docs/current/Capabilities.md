---
id: capabilities
title: Khả năng
---

Một khả năng (capability) là một định nghĩa cho giao diện từ xa. Nó giúp WebdriverIO hiểu được bạn muốn chạy các bài kiểm thử của mình trong môi trường trình duyệt hoặc di động nào. Các khả năng ít quan trọng hơn khi phát triển các bài kiểm thử cục bộ vì bạn thường chạy trên một giao diện từ xa nhất định, nhưng chúng trở nên quan trọng hơn khi chạy một tập hợp lớn các bài kiểm thử tích hợp trong CI/CD.

:::info

Định dạng của đối tượng capability được định nghĩa rõ ràng bởi [đặc tả WebDriver](https://w3c.github.io/webdriver/#capabilities). Trình chạy thử nghiệm WebdriverIO sẽ thất bại sớm nếu các capability do người dùng định nghĩa không tuân thủ đặc tả đó.

:::

## Custom Capabilities

Mặc dù số lượng các capability được định nghĩa cố định là rất ít, nhưng mọi người đều có thể cung cấp và chấp nhận các capability tùy chỉnh dành riêng cho trình điều khiển tự động hoặc giao diện từ xa:

### Browser Specific Capability Extensions

- `goog:chromeOptions`: Tiện ích mở rộng [Chromedriver](https://chromedriver.chromium.org/capabilities), chỉ áp dụng cho kiểm thử trên Chrome
- `moz:firefoxOptions`: Tiện ích mở rộng [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), chỉ áp dụng cho kiểm thử trên Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) để chỉ định môi trường khi sử dụng EdgeDriver để kiểm thử Chromium Edge

### Cloud Vendor Capability Extensions

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- và nhiều hơn nữa...

### Automation Engine Capability Extensions

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- và nhiều hơn nữa...

### WebdriverIO Capabilities để quản lý tùy chọn trình điều khiển trình duyệt

WebdriverIO quản lý việc cài đặt và chạy trình điều khiển trình duyệt cho bạn. WebdriverIO sử dụng capability tùy chỉnh cho phép bạn truyền tham số vào trình điều khiển.

#### `wdio:chromedriverOptions`

Các tùy chọn cụ thể được truyền vào Chromedriver khi khởi động.

#### `wdio:geckodriverOptions`

Các tùy chọn cụ thể được truyền vào Geckodriver khi khởi động.

#### `wdio:edgedriverOptions`

Các tùy chọn cụ thể được truyền vào Edgedriver khi khởi động.

#### `wdio:safaridriverOptions`

Các tùy chọn cụ thể được truyền vào Safari khi khởi động.

#### `wdio:maxInstances`

Số lượng tối đa các worker chạy song song cho trình duyệt/capability cụ thể. Ưu tiên cao hơn [maxInstances](#configuration#maxInstances) và [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Type: `number`

#### `wdio:specs`

Xác định specs cho việc thực thi kiểm thử cho trình duyệt/capability đó. Giống như [tùy chọn cấu hình `specs` thông thường](configuration#specs), nhưng dành riêng cho trình duyệt/capability. Ưu tiên cao hơn `specs`.

Type: `(String | String[])[]`

#### `wdio:exclude`

Loại trừ specs khỏi việc thực thi kiểm thử cho trình duyệt/capability đó. Giống như [tùy chọn cấu hình `exclude` thông thường](configuration#exclude), nhưng dành riêng cho trình duyệt/capability. Loại trừ sau khi tùy chọn cấu hình `exclude` toàn cầu được áp dụng.

Type: `String[]`

#### `wdio:enforceWebDriverClassic`

Mặc định, WebdriverIO cố gắng thiết lập một phiên WebDriver Bidi. Nếu bạn không thích điều đó, bạn có thể đặt cờ này để vô hiệu hóa hành vi này.

Type: `boolean`

#### Common Driver Options

Mặc dù tất cả các trình điều khiển đều cung cấp các tham số cấu hình khác nhau, có một số tham số chung mà WebdriverIO hiểu và sử dụng để thiết lập trình điều khiển hoặc trình duyệt của bạn:

##### `cacheDir`

Đường dẫn đến thư mục gốc của bộ nhớ cache. Thư mục này được sử dụng để lưu trữ tất cả các trình điều khiển được tải xuống khi cố gắng bắt đầu một phiên.

Type: `string`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Đường dẫn đến tệp nhị phân trình điều khiển tùy chỉnh. Nếu được đặt, WebdriverIO sẽ không cố gắng tải xuống trình điều khiển mà sẽ sử dụng trình điều khiển được cung cấp bởi đường dẫn này. Đảm bảo rằng trình điều khiển tương thích với trình duyệt bạn đang sử dụng.

Bạn có thể cung cấp đường dẫn này thông qua các biến môi trường `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` hoặc `EDGEDRIVER_PATH`.

Type: `string`

:::caution

Nếu `binary` của trình điều khiển được đặt, WebdriverIO sẽ không cố gắng tải xuống trình điều khiển mà sẽ sử dụng trình điều khiển được cung cấp bởi đường dẫn này. Đảm bảo rằng trình điều khiển tương thích với trình duyệt bạn đang sử dụng.

:::

#### Browser Specific Driver Options

Để truyền các tùy chọn đến trình điều khiển, bạn có thể sử dụng các capability tùy chỉnh sau:

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

Type: `number`

##### urlBase
Tiền tố đường dẫn URL cơ sở cho các lệnh, ví dụ: `wd/url`.

Ví dụ: `/`

Type: `string`

##### logPath
Ghi nhật ký máy chủ vào tệp thay vì stderr, tăng mức nhật ký lên `INFO`

Type: `string`

##### logLevel
Đặt mức nhật ký. Các tùy chọn có thể có `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Type: `string`

##### verbose
Ghi nhật ký chi tiết (tương đương với `--log-level=ALL`)

Type: `boolean`

##### silent
Không ghi nhật ký (tương đương với `--log-level=OFF`)

Type: `boolean`

##### appendLog
Thêm vào tệp nhật ký thay vì ghi đè.

Type: `boolean`

##### replayable
Ghi nhật ký chi tiết và không cắt ngắn chuỗi dài để nhật ký có thể được phát lại (thử nghiệm).

Type: `boolean`

##### readableTimestamp
Thêm dấu thời gian có thể đọc được vào nhật ký.

Type: `boolean`

##### enableChromeLogs
Hiển thị nhật ký từ trình duyệt (ghi đè các tùy chọn ghi nhật ký khác).

Type: `boolean`

##### bidiMapperPath
Đường dẫn bộ ánh xạ bidi tùy chỉnh.

Type: `string`

##### allowedIps
Danh sách các địa chỉ IP từ xa được phép kết nối với EdgeDriver, được phân tách bằng dấu phẩy.

Type: `string[]`<br />
Default: `['']`

##### allowedOrigins
Danh sách nguồn gốc yêu cầu được phép kết nối với EdgeDriver, được phân tách bằng dấu phẩy. Sử dụng `*` để cho phép bất kỳ nguồn gốc máy chủ nào là nguy hiểm!

Type: `string[]`<br />
Default: `['*']`

##### spawnOpts
Các tùy chọn được truyền vào quá trình trình điều khiển.

Type: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Default: `undefined`

</TabItem>
<TabItem value="firefox">

Xem tất cả các tùy chọn Geckodriver trong [gói trình điều khiển](https://github.com/webdriverio-community/node-geckodriver#options) chính thức.

</TabItem>
<TabItem value="msedge">

Xem tất cả các tùy chọn Edgedriver trong [gói trình điều khiển](https://github.com/webdriverio-community/node-edgedriver#options) chính thức.

</TabItem>
<TabItem value="safari">

Xem tất cả các tùy chọn Safaridriver trong [gói trình điều khiển](https://github.com/webdriverio-community/node-safaridriver#options) chính thức.

</TabItem>
</Tabs>

## Special Capabilities for Specific Use Cases

Đây là danh sách các ví dụ cho thấy những khả năng nào cần được áp dụng để đạt được một trường hợp sử dụng cụ thể.

### Run Browser Headless

Chạy trình duyệt headless có nghĩa là chạy một phiên bản trình duyệt không có cửa sổ hoặc giao diện người dùng. Điều này chủ yếu được sử dụng trong môi trường CI/CD nơi không sử dụng màn hình. Để chạy trình duyệt ở chế độ headless, hãy áp dụng các khả năng sau:

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
    browserName: 'chrome',   // or 'chromium'
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

### Automate Different Browser Channels

Nếu bạn muốn kiểm thử phiên bản trình duyệt chưa được phát hành ở dạng ổn định, ví dụ: Chrome Canary, bạn có thể làm điều đó bằng cách thiết lập các khả năng và trỏ đến trình duyệt bạn muốn khởi động, ví dụ:

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

Khi kiểm thử trên Chrome, WebdriverIO sẽ tự động tải xuống phiên bản trình duyệt và trình điều khiển mong muốn cho bạn dựa trên `browserVersion` đã định nghĩa, ví dụ:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

Nếu bạn muốn kiểm thử trình duyệt đã tải xuống thủ công, bạn có thể cung cấp đường dẫn nhị phân đến trình duyệt qua:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Ngoài ra, nếu bạn muốn sử dụng trình điều khiển đã tải xuống thủ công, bạn có thể cung cấp đường dẫn nhị phân đến trình điều khiển qua:

```ts
{
    browserName: 'chrome', // or 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Khi kiểm thử trên Firefox, WebdriverIO sẽ tự động tải xuống phiên bản trình duyệt và trình điều khiển mong muốn cho bạn dựa trên `browserVersion` đã định nghĩa, ví dụ:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
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

Khi kiểm thử trên Microsoft Edge, hãy đảm bảo bạn đã cài đặt phiên bản trình duyệt mong muốn trên máy của mình. Bạn có thể chỉ WebdriverIO đến trình duyệt để thực thi qua:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO sẽ tự động tải xuống phiên bản trình điều khiển mong muốn cho bạn dựa trên `browserVersion` đã định nghĩa, ví dụ:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
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

Khi kiểm thử trên Safari, hãy đảm bảo bạn đã cài đặt [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) trên máy của mình. Bạn có thể chỉ WebdriverIO đến phiên bản đó qua:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Extend Custom Capabilities

Nếu bạn muốn định nghĩa bộ khả năng riêng của mình để ví dụ lưu trữ dữ liệu tùy ý để sử dụng trong các bài kiểm thử cho khả năng cụ thể đó, bạn có thể làm như vậy bằng cách:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // custom configurations
        }
    }]
}
```

Khuyến nghị tuân theo [giao thức W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) khi đặt tên khả năng, yêu cầu một ký tự `:` (dấu hai chấm) để biểu thị không gian tên cụ thể của triển khai. Trong các bài kiểm thử của bạn, bạn có thể truy cập khả năng tùy chỉnh của mình thông qua, ví dụ:

```ts
browser.capabilities['custom:caps']
```

Để đảm bảo an toàn kiểu, bạn có thể mở rộng giao diện khả năng của WebdriverIO qua:

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
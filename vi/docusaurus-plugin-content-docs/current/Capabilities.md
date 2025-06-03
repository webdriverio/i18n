---
id: capabilities
title: Khả năng
---

Khả năng (capability) là định nghĩa cho một giao diện điều khiển từ xa. Nó giúp WebdriverIO hiểu bạn muốn chạy các bài kiểm thử của mình trên môi trường trình duyệt hoặc di động nào. Capabilities ít quan trọng hơn khi phát triển kiểm thử cục bộ vì bạn thường chỉ chạy trên một giao diện điều khiển từ xa, nhưng trở nên quan trọng hơn khi chạy một bộ lớn các bài kiểm thử tích hợp trong CI/CD.

:::info

Định dạng của một đối tượng capability được định nghĩa rõ ràng bởi [đặc tả WebDriver](https://w3c.github.io/webdriver/#capabilities). Trình chạy kiểm thử WebdriverIO sẽ thông báo lỗi sớm nếu các capability do người dùng định nghĩa không tuân theo đặc tả đó.

:::

## Capability tùy chỉnh

Mặc dù số lượng capability được định nghĩa cố định là rất ít, nhưng mọi người đều có thể cung cấp và chấp nhận các capability tùy chỉnh dành riêng cho trình điều khiển tự động hoặc giao diện điều khiển từ xa:

### Phần mở rộng Capability cho trình duyệt cụ thể

- `goog:chromeOptions`: Phần mở rộng [Chromedriver](https://chromedriver.chromium.org/capabilities), chỉ áp dụng cho kiểm thử trong Chrome
- `moz:firefoxOptions`: Phần mở rộng [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), chỉ áp dụng cho kiểm thử trong Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) để chỉ định môi trường khi sử dụng EdgeDriver để kiểm thử Chromium Edge

### Phần mở rộng Capability cho nhà cung cấp dịch vụ đám mây

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- và nhiều nữa...

### Phần mở rộng Capability cho công cụ tự động hóa

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- và nhiều nữa...

### Capability của WebdriverIO để quản lý tùy chọn trình điều khiển trình duyệt

WebdriverIO quản lý việc cài đặt và chạy trình điều khiển trình duyệt cho bạn. WebdriverIO sử dụng một capability tùy chỉnh cho phép bạn truyền các tham số vào trình điều khiển.

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

Kiểu: `number`

#### `wdio:specs`

Xác định các tệp đặc tả để thực thi kiểm thử cho trình duyệt/capability đó. Giống như [tùy chọn cấu hình `specs` thông thường](configuration#specs), nhưng dành riêng cho trình duyệt/capability cụ thể. Ưu tiên cao hơn `specs`.

Kiểu: `(String | String[])[]`

#### `wdio:exclude`

Loại trừ các đặc tả khỏi việc thực thi kiểm thử cho trình duyệt/capability đó. Giống như [tùy chọn cấu hình `exclude` thông thường](configuration#exclude), nhưng dành riêng cho trình duyệt/capability cụ thể. Ưu tiên cao hơn `exclude`.

Kiểu: `String[]`

#### `wdio:enforceWebDriverClassic`

Mặc định, WebdriverIO cố gắng thiết lập một phiên WebDriver Bidi. Nếu bạn không muốn điều đó, bạn có thể đặt cờ này để vô hiệu hóa hành vi này.

Kiểu: `boolean`

#### Tùy chọn trình điều khiển phổ biến

Mặc dù tất cả các trình điều khiển đều cung cấp các tham số cấu hình khác nhau, có một số tùy chọn phổ biến mà WebdriverIO hiểu và sử dụng để thiết lập trình điều khiển hoặc trình duyệt của bạn:

##### `cacheDir`

Đường dẫn đến thư mục gốc của bộ nhớ cache. Thư mục này được sử dụng để lưu trữ tất cả các trình điều khiển được tải xuống khi cố gắng bắt đầu một phiên.

Kiểu: `string`<br />
Mặc định: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Đường dẫn đến tệp nhị phân trình điều khiển tùy chỉnh. Nếu được đặt, WebdriverIO sẽ không cố gắng tải xuống trình điều khiển mà sẽ sử dụng trình điều khiển được cung cấp bởi đường dẫn này. Đảm bảo rằng trình điều khiển tương thích với trình duyệt bạn đang sử dụng.

Bạn có thể cung cấp đường dẫn này thông qua các biến môi trường `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` hoặc `EDGEDRIVER_PATH`.

Kiểu: `string`

:::caution

Nếu `binary` của trình điều khiển được đặt, WebdriverIO sẽ không cố gắng tải xuống trình điều khiển mà sẽ sử dụng trình điều khiển được cung cấp bởi đường dẫn này. Đảm bảo rằng trình điều khiển tương thích với trình duyệt bạn đang sử dụng.

:::

#### Tùy chọn trình điều khiển cho trình duyệt cụ thể

Để truyền các tùy chọn đến trình điều khiển, bạn có thể sử dụng các capability tùy chỉnh sau:

- Chrome hoặc Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
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

Kiểu: `number`

##### urlBase
Tiền tố đường dẫn URL cơ sở cho các lệnh, ví dụ: `wd/url`.

Ví dụ: `/`

Kiểu: `string`

##### logPath
Ghi nhật ký máy chủ vào tệp thay vì stderr, tăng mức nhật ký lên `INFO`

Kiểu: `string`

##### logLevel
Đặt mức nhật ký. Các tùy chọn có thể là `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Kiểu: `string`

##### verbose
Ghi nhật ký chi tiết (tương đương với `--log-level=ALL`)

Kiểu: `boolean`

##### silent
Không ghi nhật ký (tương đương với `--log-level=OFF`)

Kiểu: `boolean`

##### appendLog
Thêm vào tệp nhật ký thay vì ghi đè.

Kiểu: `boolean`

##### replayable
Ghi nhật ký chi tiết và không cắt bớt chuỗi dài để nhật ký có thể được phát lại (thử nghiệm).

Kiểu: `boolean`

##### readableTimestamp
Thêm dấu thời gian có thể đọc được vào nhật ký.

Kiểu: `boolean`

##### enableChromeLogs
Hiển thị nhật ký từ trình duyệt (ghi đè các tùy chọn ghi nhật ký khác).

Kiểu: `boolean`

##### bidiMapperPath
Đường dẫn bản đồ bidi tùy chỉnh.

Kiểu: `string`

##### allowedIps
Danh sách các địa chỉ IP từ xa được phép kết nối với EdgeDriver, phân tách bằng dấu phẩy.

Kiểu: `string[]`<br />
Mặc định: `['']`

##### allowedOrigins
Danh sách các nguồn gốc yêu cầu được phép kết nối với EdgeDriver, phân tách bằng dấu phẩy. Sử dụng `*` để cho phép bất kỳ nguồn gốc máy chủ nào đều nguy hiểm!

Kiểu: `string[]`<br />
Mặc định: `['*']`

##### spawnOpts
Các tùy chọn được truyền vào quá trình trình điều khiển.

Kiểu: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Mặc định: `undefined`

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

## Capability đặc biệt cho các trường hợp sử dụng cụ thể

Đây là danh sách các ví dụ cho thấy các capability nào cần được áp dụng để đạt được một trường hợp sử dụng nhất định.

### Chạy trình duyệt ở chế độ Headless

Chạy trình duyệt ở chế độ headless có nghĩa là chạy một phiên bản trình duyệt mà không có cửa sổ hoặc giao diện người dùng. Điều này thường được sử dụng trong môi trường CI/CD nơi không có màn hình hiển thị. Để chạy trình duyệt ở chế độ headless, hãy áp dụng các capability sau:

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

### Tự động hóa các kênh trình duyệt khác nhau

Nếu bạn muốn kiểm thử phiên bản trình duyệt chưa được phát hành dưới dạng ổn định, ví dụ: Chrome Canary, bạn có thể thực hiện bằng cách đặt capability và trỏ đến trình duyệt bạn muốn khởi động, ví dụ:

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

Khi kiểm thử trên Firefox, WebdriverIO sẽ tự động tải xuống phiên bản trình duyệt và trình điều khiển mong muốn cho bạn dựa trên `browserVersion` đã định nghĩa, ví dụ:

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

WebdriverIO sẽ tự động tải xuống phiên bản trình điều khiển mong muốn cho bạn dựa trên `browserVersion` đã định nghĩa, ví dụ:

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

Khi kiểm thử trên Safari, hãy đảm bảo bạn đã cài đặt [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) trên máy của mình. Bạn có thể chỉ cho WebdriverIO phiên bản đó qua:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Mở rộng Capability tùy chỉnh

Nếu bạn muốn định nghĩa bộ capability riêng của mình để ví dụ như lưu trữ dữ liệu tùy ý để sử dụng trong các bài kiểm thử cho capability cụ thể đó, bạn có thể làm như sau:

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

Bạn nên tuân theo [giao thức W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) khi đặt tên capability, yêu cầu có ký tự `:` (dấu hai chấm), biểu thị không gian tên cụ thể của việc triển khai. Trong các bài kiểm thử, bạn có thể truy cập capability tùy chỉnh của mình thông qua, ví dụ:

```ts
browser.capabilities['custom:caps']
```

Để đảm bảo tính an toàn về kiểu, bạn có thể mở rộng giao diện capability của WebdriverIO qua:

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
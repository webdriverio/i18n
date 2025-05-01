---
id: driverbinaries
title: Trình Điều Khiển Trình Duyệt
---

Để chạy tự động hóa dựa trên giao thức WebDriver, bạn cần cài đặt các trình điều khiển trình duyệt có khả năng dịch và thực thi các lệnh tự động hóa trong trình duyệt.

## Cài đặt tự động

Với WebdriverIO `v8.14` trở lên, bạn không cần phải tải xuống và cài đặt thủ công bất kỳ trình điều khiển trình duyệt nào nữa vì WebdriverIO sẽ xử lý việc này. Tất cả những gì bạn phải làm là chỉ định trình duyệt bạn muốn kiểm thử và WebdriverIO sẽ làm phần còn lại.

### Tùy chỉnh mức độ tự động hóa

WebdriverIO có ba cấp độ tự động hóa:

**1. Tải xuống và cài đặt trình duyệt sử dụng [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Nếu bạn chỉ định kết hợp `browserName`/`browserVersion` trong cấu hình [capabilities](configuration#capabilities-1), WebdriverIO sẽ tải xuống và cài đặt kết hợp được yêu cầu, bất kể đã có cài đặt hiện có trên máy hay chưa. Nếu bạn bỏ qua `browserVersion`, WebdriverIO sẽ đầu tiên cố gắng định vị và sử dụng cài đặt hiện có với [locate-app](https://www.npmjs.com/package/locate-app), nếu không tìm thấy, nó sẽ tải xuống và cài đặt phiên bản ổn định hiện tại của trình duyệt. Để biết thêm chi tiết về `browserVersion`, xem [tại đây](capabilities#automate-different-browser-channels).

:::caution

Cài đặt trình duyệt tự động không hỗ trợ Microsoft Edge. Hiện tại, chỉ Chrome, Chromium và Firefox được hỗ trợ.

:::

Nếu bạn có cài đặt trình duyệt ở vị trí mà WebdriverIO không thể tự động phát hiện, bạn có thể chỉ định binary của trình duyệt, điều này sẽ vô hiệu hóa việc tải xuống và cài đặt tự động.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // hoặc 'firefox' hoặc 'chromium'
            'goog:chromeOptions': { // hoặc 'moz:firefoxOptions' hoặc 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Tải xuống và cài đặt trình điều khiển bằng [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) hoặc [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO sẽ luôn thực hiện việc này, trừ khi [binary](capabilities#binary) của trình điều khiển được chỉ định trong cấu hình:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // hoặc 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // hoặc 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // hoặc 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO sẽ không tự động tải xuống trình điều khiển Safari vì nó đã được cài đặt sẵn trên macOS.

:::

:::caution

Tránh chỉ định `binary` cho trình duyệt mà không chỉ định `binary` tương ứng cho trình điều khiển hoặc ngược lại. Nếu chỉ một trong các giá trị `binary` được chỉ định, WebdriverIO sẽ cố gắng sử dụng hoặc tải xuống trình duyệt/trình điều khiển tương thích với nó. Tuy nhiên, trong một số trường hợp, điều này có thể dẫn đến sự kết hợp không tương thích. Do đó, nên luôn chỉ định cả hai để tránh bất kỳ vấn đề nào do sự không tương thích về phiên bản.

:::

**3. Khởi động/dừng trình điều khiển.**

Theo mặc định, WebdriverIO sẽ tự động khởi động và dừng trình điều khiển bằng cách sử dụng một cổng không được sử dụng tùy ý. Việc chỉ định bất kỳ cấu hình nào sau đây sẽ vô hiệu hóa tính năng này, điều đó có nghĩa là bạn sẽ cần phải thủ công khởi động và dừng trình điều khiển:

- Bất kỳ giá trị nào cho [port](configuration#port).
- Bất kỳ giá trị nào khác với mặc định cho [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Bất kỳ giá trị nào cho cả [user](configuration#user) và [key](configuration#key).

## Cài đặt thủ công

Phần sau đây mô tả cách bạn vẫn có thể thiết lập từng trình điều khiển riêng lẻ. Bạn có thể tìm thấy danh sách các trình điều khiển trong README của [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Nếu bạn đang muốn thiết lập nền tảng di động và các nền tảng UI khác, hãy xem hướng dẫn [Cài đặt Appium](appium) của chúng tôi.

:::

### Chromedriver

Để tự động hóa Chrome, bạn có thể tải xuống Chromedriver trực tiếp trên [trang web dự án](http://chromedriver.chromium.org/downloads) hoặc thông qua gói NPM:

```bash npm2yarn
npm install -g chromedriver
```

Sau đó, bạn có thể khởi động nó qua:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Để tự động hóa Firefox, hãy tải xuống phiên bản mới nhất của `geckodriver` cho môi trường của bạn và giải nén nó trong thư mục dự án của bạn:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Curl', value: 'curl'},
    {label: 'Brew', value: 'brew'},
    {label: 'Windows (64 bit / Chocolatey)', value: 'chocolatey'},
    {label: 'Windows (64 bit / Powershell) DevTools', value: 'powershell'},
  ]
}>
<TabItem value="npm">

```bash npm2yarn
npm install geckodriver
```

</TabItem>
<TabItem value="curl">

Linux:

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar xz
```

MacOS (64 bit):

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-macos.tar.gz | tar xz
```

</TabItem>
<TabItem value="brew">

```sh
brew install geckodriver
```

</TabItem>
<TabItem value="chocolatey">

```sh
choco install selenium-gecko-driver
```

</TabItem>
<TabItem value="powershell">

```sh
# Run as privileged session. Right-click and set 'Run as Administrator'
# Use geckodriver-v0.24.0-win32.zip for 32 bit Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # will drop into current directory unless defined otherwise
$unzipped_file = "geckodriver" # will unzip to this folder name

# By default, Powershell uses TLS 1.0 the site security requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Downloads Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Unzip Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Globally Set Geckodriver to PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Lưu ý:** Các phiên bản `geckodriver` khác có sẵn [tại đây](https://github.com/mozilla/geckodriver/releases). Sau khi tải xuống, bạn có thể khởi động trình điều khiển qua:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Bạn có thể tải xuống trình điều khiển cho Microsoft Edge trên [trang web dự án](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) hoặc dưới dạng gói NPM thông qua:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver được cài đặt sẵn trên MacOS của bạn và có thể được khởi động trực tiếp qua:

```sh
safaridriver -p 4444
```
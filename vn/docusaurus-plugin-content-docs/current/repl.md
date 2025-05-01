---
id: repl
title: Giao diện REPL
---

Với `v4.5.0`, WebdriverIO đã giới thiệu giao diện [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) giúp bạn không chỉ học API của framework mà còn gỡ lỗi và kiểm tra các bài kiểm thử của bạn. Nó có thể được sử dụng theo nhiều cách.

Đầu tiên, bạn có thể sử dụng nó như lệnh CLI bằng cách cài đặt `npm install -g @wdio/cli` và khởi tạo một phiên WebDriver từ dòng lệnh, ví dụ:

```sh
wdio repl chrome
```

Điều này sẽ mở trình duyệt Chrome mà bạn có thể kiểm soát bằng giao diện REPL. Đảm bảo bạn có trình điều khiển trình duyệt đang chạy trên cổng `4444` để khởi tạo phiên. Nếu bạn có tài khoản [Sauce Labs](https://saucelabs.com) (hoặc nhà cung cấp đám mây khác), bạn cũng có thể chạy trình duyệt trực tiếp trên dòng lệnh trong đám mây thông qua:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Nếu trình điều khiển đang chạy trên cổng khác, ví dụ: 9515, có thể truyền với đối số dòng lệnh --port hoặc viết tắt -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl cũng có thể được chạy bằng cách sử dụng khả năng từ tệp cấu hình webdriverIO. Wdio hỗ trợ đối tượng capabilities; hoặc danh sách hay đối tượng khả năng multiremote.

Nếu tệp cấu hình sử dụng đối tượng capabilities thì chỉ cần truyền đường dẫn đến tệp cấu hình, nếu là khả năng multiremote thì chỉ định khả năng nào sử dụng từ danh sách hoặc multiremote bằng đối số vị trí. Lưu ý: đối với danh sách, chúng ta xem xét chỉ mục bắt đầu từ không.

### Ví dụ

WebdriverIO với mảng capability:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO với đối tượng capability [multiremote](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

Hoặc nếu bạn muốn chạy các bài kiểm thử trên thiết bị di động cục bộ bằng Appium:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

Điều này sẽ mở phiên Chrome/Safari trên thiết bị/máy ảo/trình giả lập đã kết nối. Đảm bảo Appium đang chạy trên cổng `4444` để khởi tạo phiên.

```sh
wdio repl './path/to/your_app.apk'
```

Điều này sẽ mở phiên ứng dụng trên thiết bị/máy ảo/trình giả lập đã kết nối. Đảm bảo Appium đang chạy trên cổng `4444` để khởi tạo phiên.

Các khả năng cho thiết bị iOS có thể được truyền với các đối số:

* `-v`      - `platformVersion`: phiên bản của nền tảng Android/iOS
* `-d`      - `deviceName`: tên của thiết bị di động
* `-u`      - `udid`: udid cho thiết bị thực

Cách sử dụng:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

Bạn có thể áp dụng bất kỳ tùy chọn nào (xem `wdio repl --help`) có sẵn cho phiên REPL của bạn.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Một cách khác để sử dụng REPL là bên trong các bài kiểm thử của bạn thông qua lệnh [`debug`](/docs/api/browser/debug). Điều này sẽ dừng trình duyệt khi được gọi và cho phép bạn nhảy vào ứng dụng (ví dụ: vào công cụ dev) hoặc kiểm soát trình duyệt từ dòng lệnh. Điều này hữu ích khi một số lệnh không kích hoạt một hành động nhất định như mong đợi. Với REPL, bạn có thể thử các lệnh để xem cái nào hoạt động đáng tin cậy nhất.
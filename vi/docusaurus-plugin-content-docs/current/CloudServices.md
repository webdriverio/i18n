---
id: cloudservices
title: Sử dụng Dịch vụ Đám mây
---

Using on-demand services like Sauce Labs, Browserstack, TestingBot, LambdaTest or Perfecto with WebdriverIO is pretty simple. All you need to do is to set your service's `user` and `key` in your options.

Optionally, you can also parametrize your test by setting cloud-specific capabilities like `build`. If you only want to run cloud services in Travis, you can use the `CI` environment variable to check if you are in Travis and modify the config accordingly.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Bạn có thể thiết lập thử nghiệm của mình để chạy từ xa trong [Sauce Labs](https://saucelabs.com).

Yêu cầu duy nhất là đặt `user` và `key` trong cấu hình của bạn (có thể được xuất bởi `wdio.conf.js` hoặc được truyền vào `webdriverio.remote(...)`) thành tên người dùng và khóa truy cập Sauce Labs của bạn.

Bạn cũng có thể truyền vào bất kỳ [tùy chọn cấu hình thử nghiệm](https://docs.saucelabs.com/dev/test-configuration-options/) tùy chọn nào dưới dạng khóa/giá trị trong các khả năng cho bất kỳ trình duyệt nào.

### Sauce Connect

Nếu bạn muốn chạy thử nghiệm đối với máy chủ không thể truy cập từ Internet (như trên `localhost`), thì bạn cần sử dụng [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Việc hỗ trợ tính năng này nằm ngoài phạm vi của WebdriverIO, vì vậy bạn sẽ phải tự khởi động nó.

Nếu bạn đang sử dụng WDIO testrunner, hãy tải xuống và cấu hình [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) trong `wdio.conf.js` của bạn. Nó giúp Sauce Connect chạy và đi kèm với các tính năng bổ sung tích hợp tốt hơn các bài kiểm tra của bạn vào dịch vụ Sauce.

### Với Travis CI

Tuy nhiên, Travis CI có [hỗ trợ](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) để khởi động Sauce Connect trước mỗi thử nghiệm, vì vậy bạn có thể làm theo hướng dẫn của họ.

Nếu làm như vậy, bạn phải đặt tùy chọn cấu hình thử nghiệm `tunnel-identifier` trong `capabilities` của mỗi trình duyệt. Travis đặt giá trị này là biến môi trường `TRAVIS_JOB_NUMBER` theo mặc định.

Ngoài ra, nếu bạn muốn Sauce Labs nhóm các thử nghiệm của mình theo số lần xây dựng, bạn có thể đặt `build` thành `TRAVIS_BUILD_NUMBER`.

Cuối cùng, nếu bạn đặt `name`, điều này sẽ thay đổi tên của thử nghiệm này trong Sauce Labs cho bản dựng này. Nếu bạn đang sử dụng WDIO testrunner kết hợp với [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO sẽ tự động đặt tên thích hợp cho thử nghiệm.

Ví dụ về `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Thời gian chờ

Vì bạn đang chạy thử nghiệm từ xa, có thể cần phải tăng một số thời gian chờ.

Bạn có thể thay đổi [thời gian chờ rảnh rỗi](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) bằng cách truyền `idle-timeout` như một tùy chọn cấu hình thử nghiệm. Điều này kiểm soát thời gian Sauce sẽ đợi giữa các lệnh trước khi đóng kết nối.

## BrowserStack

WebdriverIO cũng có tích hợp sẵn [Browserstack](https://www.browserstack.com).

Yêu cầu duy nhất là đặt `user` và `key` trong cấu hình của bạn (có thể được xuất bởi `wdio.conf.js` hoặc được truyền vào `webdriverio.remote(...)`) thành tên người dùng tự động và khóa truy cập Browserstack của bạn.

Bạn cũng có thể truyền vào bất kỳ [khả năng được hỗ trợ](https://www.browserstack.com/automate/capabilities) tùy chọn nào dưới dạng khóa/giá trị trong các khả năng cho bất kỳ trình duyệt nào. Nếu bạn đặt `browserstack.debug` thành `true`, nó sẽ ghi lại bản ghi màn hình của phiên, điều này có thể hữu ích.

### Kiểm tra Cục bộ

Nếu bạn muốn chạy thử nghiệm đối với máy chủ không thể truy cập từ Internet (như trên `localhost`), thì bạn cần sử dụng [Kiểm tra Cục bộ](https://www.browserstack.com/local-testing#command-line).

Việc hỗ trợ tính năng này nằm ngoài phạm vi của WebdriverIO, vì vậy bạn phải tự khởi động nó.

Nếu bạn sử dụng local, bạn nên đặt `browserstack.local` thành `true` trong capabilities của bạn.

Nếu bạn đang sử dụng WDIO testrunner, hãy tải xuống và cấu hình [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) trong `wdio.conf.js` của bạn. Nó giúp BrowserStack chạy và đi kèm với các tính năng bổ sung tích hợp tốt hơn các bài kiểm tra của bạn vào dịch vụ BrowserStack.

### Với Travis CI

Nếu bạn muốn thêm Kiểm tra Cục bộ trong Travis, bạn phải tự khởi động nó.

Đoạn mã sau sẽ tải xuống và khởi động nó trong nền. Bạn nên chạy mã này trong Travis trước khi bắt đầu thử nghiệm.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Ngoài ra, bạn có thể muốn đặt `build` thành số lần xây dựng Travis.

Ví dụ về `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

Yêu cầu duy nhất là đặt `user` và `key` trong cấu hình của bạn (có thể được xuất bởi `wdio.conf.js` hoặc được truyền vào `webdriverio.remote(...)`) thành tên người dùng và khóa bí mật [TestingBot](https://testingbot.com) của bạn.

Bạn cũng có thể truyền vào bất kỳ [khả năng được hỗ trợ](https://testingbot.com/support/other/test-options) tùy chọn nào dưới dạng khóa/giá trị trong các khả năng cho bất kỳ trình duyệt nào.

### Kiểm tra Cục bộ

Nếu bạn muốn chạy thử nghiệm đối với máy chủ không thể truy cập từ Internet (như trên `localhost`), thì bạn cần sử dụng [Kiểm tra Cục bộ](https://testingbot.com/support/other/tunnel). TestingBot cung cấp một đường hầm dựa trên Java để cho phép bạn kiểm tra các trang web không thể truy cập từ Internet.

Trang hỗ trợ đường hầm của họ chứa thông tin cần thiết để thiết lập việc này.

Nếu bạn đang sử dụng WDIO testrunner, hãy tải xuống và cấu hình [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) trong `wdio.conf.js` của bạn. Nó giúp TestingBot chạy và đi kèm với các tính năng bổ sung tích hợp tốt hơn các bài kiểm tra của bạn vào dịch vụ TestingBot.

## LambdaTest

Tích hợp [LambdaTest](https://www.lambdatest.com) cũng được xây dựng sẵn.

Yêu cầu duy nhất là đặt `user` và `key` trong cấu hình của bạn (có thể được xuất bởi `wdio.conf.js` hoặc được truyền vào `webdriverio.remote(...)`) thành tên người dùng tài khoản LambdaTest và khóa truy cập của bạn.

Bạn cũng có thể truyền vào bất kỳ [khả năng được hỗ trợ](https://www.lambdatest.com/capabilities-generator/) tùy chọn nào dưới dạng khóa/giá trị trong các khả năng cho bất kỳ trình duyệt nào. Nếu bạn đặt `visual` thành `true`, nó sẽ ghi lại bản ghi màn hình của phiên, điều này có thể hữu ích.

### Đường hầm cho kiểm tra cục bộ

Nếu bạn muốn chạy thử nghiệm đối với máy chủ không thể truy cập từ Internet (như trên `localhost`), thì bạn cần sử dụng [Kiểm tra Cục bộ](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

Việc hỗ trợ tính năng này nằm ngoài phạm vi của WebdriverIO, vì vậy bạn phải tự khởi động nó.

Nếu bạn sử dụng local, bạn nên đặt `tunnel` thành `true` trong capabilities của bạn.

Nếu bạn đang sử dụng WDIO testrunner, hãy tải xuống và cấu hình [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) trong `wdio.conf.js` của bạn. Nó giúp LambdaTest chạy và đi kèm với các tính năng bổ sung tích hợp tốt hơn các bài kiểm tra của bạn vào dịch vụ LambdaTest.

### Với Travis CI

Nếu bạn muốn thêm Kiểm tra Cục bộ trong Travis, bạn phải tự khởi động nó.

Đoạn mã sau sẽ tải xuống và khởi động nó trong nền. Bạn nên chạy mã này trong Travis trước khi bắt đầu thử nghiệm.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Ngoài ra, bạn có thể muốn đặt `build` thành số lần xây dựng Travis.

Ví dụ về `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Khi sử dụng wdio với [`Perfecto`](https://www.perfecto.io), bạn cần tạo một mã token bảo mật cho mỗi người dùng và thêm nó vào cấu trúc capabilities (ngoài các khả năng khác), như sau:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Ngoài ra, bạn cần thêm cấu hình đám mây, như sau:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```
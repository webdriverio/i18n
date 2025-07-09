---
id: proxy
title: Thiết lập Proxy
---

Bạn có thể định tuyến hai loại yêu cầu khác nhau thông qua proxy:

- kết nối giữa tập lệnh kiểm thử của bạn và trình điều khiển trình duyệt (hoặc điểm cuối WebDriver)
- kết nối giữa trình duyệt và internet

## Proxy Giữa Driver Và Test

Nếu công ty của bạn có proxy doanh nghiệp (ví dụ: tại `http://my.corp.proxy.com:9090`) cho tất cả các yêu cầu gửi đi, bạn có hai tùy chọn để cấu hình WebdriverIO sử dụng proxy:

### Tùy chọn 1: Sử dụng Biến Môi trường (Khuyến nghị)

Bắt đầu từ WebdriverIO v9.12.0, bạn có thể đơn giản đặt các biến môi trường proxy tiêu chuẩn:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optional: bypass proxy for certain hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Sau đó chạy các bài kiểm thử của bạn như bình thường. WebdriverIO sẽ tự động sử dụng các biến môi trường này cho cấu hình proxy.

### Tùy chọn 2: Sử dụng setGlobalDispatcher của undici

Đối với cấu hình proxy nâng cao hơn hoặc nếu bạn cần kiểm soát theo chương trình, bạn có thể sử dụng phương thức `setGlobalDispatcher` của undici:

#### Cài đặt undici

```bash npm2yarn
npm install undici --save-dev
```

#### Thêm undici setGlobalDispatcher vào tệp cấu hình của bạn

Thêm câu lệnh require sau vào đầu tệp cấu hình của bạn.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Thông tin bổ sung về cấu hình proxy có thể được tìm thấy [tại đây](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Tôi Nên Sử Dụng Phương Pháp Nào?

- **Sử dụng biến môi trường** nếu bạn muốn một cách tiếp cận đơn giản, tiêu chuẩn hoạt động trên các công cụ khác nhau và không yêu cầu thay đổi mã.
- **Sử dụng setGlobalDispatcher** nếu bạn cần các tính năng proxy nâng cao như xác thực tùy chỉnh, cấu hình proxy khác nhau cho mỗi môi trường, hoặc muốn kiểm soát hành vi proxy theo chương trình.

Cả hai phương pháp đều được hỗ trợ đầy đủ và WebdriverIO sẽ kiểm tra dispatcher toàn cục trước khi dùng biến môi trường.

### Sauce Connect Proxy

Nếu bạn sử dụng [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), hãy bắt đầu nó thông qua:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Giữa Trình Duyệt Và Internet

Để định tuyến kết nối giữa trình duyệt và internet, bạn có thể thiết lập proxy, điều này có thể hữu ích để (ví dụ) ghi lại thông tin mạng và dữ liệu khác với các công cụ như [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Các tham số `proxy` có thể được áp dụng thông qua các khả năng tiêu chuẩn theo cách sau:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

Để biết thêm thông tin, xem [Đặc tả WebDriver](https://w3c.github.io/webdriver/#proxy).
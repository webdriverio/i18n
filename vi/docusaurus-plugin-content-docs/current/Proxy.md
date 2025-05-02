---
id: proxy
title: Thiết lập Proxy
---

Bạn có thể chuyển hai loại yêu cầu khác nhau qua proxy:

- kết nối giữa tập lệnh kiểm thử của bạn và trình điều khiển trình duyệt (hoặc điểm cuối WebDriver)
- kết nối giữa trình duyệt và internet

## Proxy Giữa Driver Và Test

Nếu công ty của bạn có proxy doanh nghiệp (ví dụ: trên `http://my.corp.proxy.com:9090`) cho tất cả các yêu cầu gửi đi, hãy làm theo các bước dưới đây để cài đặt và cấu hình [undici](https://github.com/nodejs/undici).

### Cài đặt undici

```bash npm2yarn
npm install undici --save-dev
```

### Thêm undici setGlobalDispatcher vào file cấu hình của bạn

Thêm lệnh require sau vào đầu file cấu hình của bạn.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Thông tin bổ sung về cấu hình proxy có thể được tìm thấy [tại đây](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Nếu bạn sử dụng [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), hãy khởi động nó qua:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Giữa Trình Duyệt Và Internet

Để chuyển kết nối giữa trình duyệt và internet, bạn có thể thiết lập một proxy, điều này có thể hữu ích để (ví dụ) nắm bắt thông tin mạng và dữ liệu khác với các công cụ như [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

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
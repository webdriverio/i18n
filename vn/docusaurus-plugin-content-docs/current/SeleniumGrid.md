---
id: seleniumgrid
title: Selenium Grid
---

Bạn có thể sử dụng WebdriverIO với Selenium Grid hiện có của bạn. Để kết nối các bài kiểm tra của bạn với Selenium Grid, bạn chỉ cần cập nhật các tùy chọn trong cấu hình trình chạy kiểm tra của mình.

Đây là một đoạn mã từ mẫu wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Bạn cần cung cấp các giá trị thích hợp cho protocol, hostname, port và path dựa trên cài đặt Selenium Grid của bạn.
Nếu bạn đang chạy Selenium Grid trên cùng một máy với các tập lệnh kiểm tra của mình, đây là một số tùy chọn điển hình:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Xác thực cơ bản với Selenium Grid được bảo vệ

Rất khuyến khích bảo mật Selenium Grid của bạn. Nếu bạn có Selenium Grid được bảo vệ yêu cầu xác thực, bạn có thể truyền tiêu đề xác thực thông qua các tùy chọn.
Vui lòng tham khảo phần [headers](https://webdriver.io/docs/configuration/#headers) trong tài liệu để biết thêm thông tin.

### Cấu hình thời gian chờ với Selenium Grid động

Khi sử dụng Selenium Grid động nơi các pod trình duyệt được khởi chạy theo yêu cầu, việc tạo phiên có thể gặp phải quá trình khởi động lạnh. Trong những trường hợp như vậy, nên tăng thời gian chờ tạo phiên. Giá trị mặc định trong các tùy chọn là 120 giây, nhưng bạn có thể tăng nó nếu grid của bạn mất nhiều thời gian hơn để tạo một phiên mới.

```ts
connectionRetryTimeout: 180000,
```

### Cấu hình nâng cao

Đối với cấu hình nâng cao, vui lòng tham khảo [tệp cấu hình](https://webdriver.io/docs/configurationfile) Testrunner.

### Thao tác tệp với Selenium Grid

Khi chạy các trường hợp kiểm tra với Selenium Grid từ xa, trình duyệt chạy trên một máy từ xa, và bạn cần đặc biệt chú ý đến các trường hợp kiểm tra liên quan đến tải lên và tải xuống tệp.

### Tải xuống tệp

Đối với các trình duyệt dựa trên Chromium, bạn có thể tham khảo tài liệu [Tải xuống tệp](https://webdriver.io/docs/api/browser/downloadFile). Nếu tập lệnh kiểm tra của bạn cần đọc nội dung của một tệp đã tải xuống, bạn cần tải xuống từ node Selenium từ xa đến máy trình chạy kiểm tra. Đây là một đoạn mã mẫu từ cấu hình `wdio.conf.ts` cho trình duyệt Chrome:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Tải lên tệp với Selenium Grid từ xa

Để tải một tệp lên ứng dụng web trong trình duyệt từ xa, trước tiên bạn cần tải tệp lên grid từ xa. Bạn có thể tham khảo tài liệu [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) để biết chi tiết.

### Các thao tác tệp/grid khác

Có một vài thao tác khác mà bạn có thể thực hiện với Selenium Grid. Các hướng dẫn cho Selenium Standalone cũng sẽ hoạt động tốt với Selenium Grid. Vui lòng tham khảo tài liệu [Selenium Standalone](https://webdriver.io/docs/api/selenium/) để biết các tùy chọn có sẵn.


### Tài liệu chính thức của Selenium Grid

Để biết thêm thông tin về Selenium Grid, bạn có thể tham khảo [tài liệu](https://www.selenium.dev/documentation/grid/) chính thức của Selenium Grid.

Nếu bạn muốn chạy Selenium Grid trong Docker, Docker compose hoặc Kubernetes, vui lòng tham khảo [kho GitHub](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.
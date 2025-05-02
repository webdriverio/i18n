---
id: jenkins
title: Jenkins
---

WebdriverIO cung cấp sự tích hợp chặt chẽ với các hệ thống CI như [Jenkins](https://jenkins-ci.org). Với trình báo cáo `junit`, bạn có thể dễ dàng gỡ lỗi các bài kiểm thử cũng như theo dõi kết quả kiểm thử của mình. Việc tích hợp khá đơn giản.

1. Cài đặt trình báo cáo kiểm thử `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. Cập nhật cấu hình của bạn để lưu kết quả XUnit nơi Jenkins có thể tìm thấy chúng,
    (và chỉ định trình báo cáo `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

Bạn có thể tự chọn framework nào để sử dụng. Các báo cáo sẽ tương tự nhau.
Trong hướng dẫn này, chúng ta sẽ sử dụng Jasmine.

Sau khi đã viết một vài bài kiểm thử, bạn có thể thiết lập một công việc Jenkins mới. Đặt tên và mô tả cho nó:

![Tên Và Mô Tả](/img/jenkins/jobname.png "Tên Và Mô Tả")

Sau đó, đảm bảo rằng nó luôn lấy phiên bản mới nhất của kho lưu trữ của bạn:

![Thiết Lập Git Jenkins](/img/jenkins/gitsetup.png "Thiết Lập Git Jenkins")

**Giờ là phần quan trọng:** Tạo một bước `build` để thực thi các lệnh shell. Bước `build` cần phải xây dựng dự án của bạn. Vì dự án demo này chỉ kiểm thử một ứng dụng bên ngoài, bạn không cần phải xây dựng bất cứ thứ gì. Chỉ cần cài đặt các phụ thuộc node và chạy lệnh `npm test` (là bí danh của `node_modules/.bin/wdio test/wdio.conf.js`).

Nếu bạn đã cài đặt plugin như AnsiColor, nhưng nhật ký vẫn không có màu, hãy chạy kiểm thử với biến môi trường `FORCE_COLOR=1` (ví dụ, `FORCE_COLOR=1 npm test`).

![Bước Build](/img/jenkins/runjob.png "Bước Build")

Sau bài kiểm thử của bạn, bạn sẽ muốn Jenkins theo dõi báo cáo XUnit của bạn. Để làm như vậy, bạn phải thêm một hành động hậu xây dựng có tên _"Publish JUnit test result report"_.

Bạn cũng có thể cài đặt một plugin XUnit bên ngoài để theo dõi các báo cáo của mình. Plugin JUnit đi kèm với cài đặt Jenkins cơ bản và là đủ cho hiện tại.

Theo tệp cấu hình, các báo cáo XUnit sẽ được lưu trong thư mục gốc của dự án. Các báo cáo này là tệp XML. Vì vậy, tất cả những gì bạn cần làm để theo dõi các báo cáo là chỉ cho Jenkins đến tất cả các tệp XML trong thư mục gốc của bạn:

![Hành Động Hậu Xây Dựng](/img/jenkins/postjob.png "Hành Động Hậu Xây Dựng")

Thế là xong! Bạn đã thiết lập Jenkins để chạy các công việc WebdriverIO của mình. Công việc của bạn giờ đây sẽ cung cấp kết quả kiểm thử chi tiết với biểu đồ lịch sử, thông tin theo dõi ngăn xếp trên các công việc thất bại, và danh sách các lệnh với dữ liệu được sử dụng trong mỗi bài kiểm thử.

![Tích Hợp Cuối Cùng Jenkins](/img/jenkins/final.png "Tích Hợp Cuối Cùng Jenkins")
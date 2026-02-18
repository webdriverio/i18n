---
id: devtools
title: DevTools
---

Dịch vụ DevTools cung cấp giao diện gỡ lỗi dựa trên trình duyệt mạnh mẽ cho việc thực thi các bài kiểm tra WebdriverIO. Nó cho phép bạn trực quan hóa, gỡ lỗi và kiểm soát các bài kiểm tra của bạn trong thời gian thực thông qua một ứng dụng web tương tác.

## Tổng quan

Dịch vụ này cho phép bạn:

- **Chạy lại các bài kiểm tra có chọn lọc** - Nhấp vào bất kỳ trường hợp kiểm tra hoặc bộ kiểm tra nào để thực thi lại ngay lập tức
- **Gỡ lỗi trực quan** - Xem bản xem trước trình duyệt trực tiếp với ảnh chụp màn hình tự động
- **Theo dõi thực thi** - Xem nhật ký lệnh chi tiết với dấu thời gian và kết quả
- **Giám sát mạng & bảng điều khiển** - Kiểm tra các cuộc gọi API và nhật ký JavaScript
- **Điều hướng đến mã nguồn** - Chuyển trực tiếp đến các tệp nguồn kiểm tra

## Cài đặt

Cài đặt dịch vụ như một phụ thuộc dev:

```sh
npm install --save-dev @wdio/devtools-service
```

## Cấu hình

Thêm dịch vụ vào cấu hình WebDriverIO của bạn:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### Tùy chọn dịch vụ

Cấu hình dịch vụ DevTools với các tùy chọn sau:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // Cổng cho giao diện devtools (mặc định: 3000)
        }]
    ],
    // ...
};
```

#### Các tùy chọn

- **port** (số, mặc định: `3000`) - Số cổng cho máy chủ giao diện devtools

## Cách hoạt động

Khi bạn chạy các bài kiểm tra WebdriverIO với dịch vụ DevTools được bật:

1. Dịch vụ mở một cửa sổ trình duyệt tại `http://localhost:3000` (có thể cấu hình)
2. Các bài kiểm tra của bạn thực thi bình thường trong khi giao diện DevTools hiển thị cập nhật theo thời gian thực
3. Giao diện hiển thị cấu trúc phân cấp kiểm tra, bản xem trước trình duyệt, dòng thời gian lệnh và nhật ký
4. Sau khi các bài kiểm tra hoàn tất, bạn có thể nhấp vào bất kỳ bài kiểm tra nào để chạy lại riêng lẻ
5. Các bài kiểm tra chạy lại trong cùng một phiên trình duyệt để gỡ lỗi nhanh hơn

## Tính năng

Khám phá các tính năng DevTools một cách chi tiết:

- **[Chạy lại & Trực quan hóa kiểm tra tương tác](devtools/interactive-test-rerunning)** - Xem trước trình duyệt thời gian thực với tính năng chạy lại kiểm tra
- **[Hỗ trợ đa framework](devtools/multi-framework-support)** - Hoạt động với Mocha, Jasmine và Cucumber
- **[Nhật ký bảng điều khiển](devtools/console-logs)** - Ghi lại và kiểm tra đầu ra bảng điều khiển trình duyệt
- **[Nhật ký mạng](devtools/network-logs)** - Theo dõi các cuộc gọi API và hoạt động mạng
- **[TestLens](devtools/testlens)** - Điều hướng đến mã nguồn với tính năng điều hướng mã thông minh
---
id: visual-reporter
title: Trình báo cáo Trực quan
---

Trình báo cáo Trực quan là một tính năng mới được giới thiệu trong `@wdio/visual-service`, bắt đầu từ phiên bản [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Trình báo cáo này cho phép người dùng hình dung các báo cáo khác biệt JSON được tạo ra bởi dịch vụ Kiểm tra Trực quan và chuyển đổi chúng thành định dạng dễ đọc cho con người. Nó giúp các nhóm phân tích và quản lý kết quả kiểm tra trực quan tốt hơn bằng cách cung cấp giao diện đồ họa để xem xét kết quả đầu ra.

Để sử dụng tính năng này, hãy đảm bảo bạn có cấu hình cần thiết để tạo tệp `output.json`. Tài liệu này sẽ hướng dẫn bạn thiết lập, chạy và hiểu Trình báo cáo Trực quan.

# Điều kiện tiên quyết

Trước khi sử dụng Trình báo cáo Trực quan, hãy đảm bảo bạn đã cấu hình dịch vụ Kiểm tra Trực quan để tạo các tệp báo cáo JSON:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Tạo tệp output.json
            },
        ],
    ],
};
```

Để biết hướng dẫn thiết lập chi tiết hơn, hãy tham khảo [Tài liệu Kiểm tra Trực quan](./) của WebdriverIO hoặc [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Cài đặt

Để cài đặt Trình báo cáo Trực quan, hãy thêm nó như một phụ thuộc phát triển vào dự án của bạn bằng npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Điều này sẽ đảm bảo các tệp cần thiết có sẵn để tạo báo cáo từ các bài kiểm tra trực quan của bạn.

# Sử dụng

## Xây dựng Báo cáo Trực quan

Sau khi bạn đã chạy các bài kiểm tra Trực quan và chúng tạo ra tệp `output.json`, bạn có thể xây dựng báo cáo trực quan bằng cách sử dụng CLI hoặc lời nhắc tương tác.

### Sử dụng CLI

Bạn có thể sử dụng lệnh CLI để tạo báo cáo bằng cách chạy:

```bash
npx wdio-visual-reporter --jsonOutput=<đường-dẫn-đến-output.json> --reportFolder=<đường-dẫn-lưu-báo-cáo> --logLevel=debug
```

#### Tùy chọn bắt buộc:

-   `--jsonOutput`: Đường dẫn tương đối đến tệp `output.json` được tạo bởi dịch vụ Kiểm tra Trực quan. Đường dẫn này tương đối với thư mục mà bạn thực thi lệnh.
-   `--reportFolder`: Thư mục tương đối nơi báo cáo được tạo sẽ được lưu trữ. Đường dẫn này cũng tương đối với thư mục mà bạn thực thi lệnh.

#### Tùy chọn không bắt buộc:

-   `--logLevel`: Đặt thành `debug` để nhận ghi nhật ký chi tiết, đặc biệt hữu ích để khắc phục sự cố.

#### Ví dụ

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Điều này sẽ tạo báo cáo trong thư mục được chỉ định và cung cấp phản hồi trong bảng điều khiển. Ví dụ:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Xem Báo cáo

:::warning
Mở `path/to/report/index.html` trực tiếp trong trình duyệt **mà không phục vụ từ máy chủ cục bộ** sẽ **KHÔNG** hoạt động.
:::

Để xem báo cáo, bạn cần sử dụng một máy chủ đơn giản như [sirv-cli](https://www.npmjs.com/package/sirv-cli). Bạn có thể khởi động máy chủ với lệnh sau:

```bash
npx sirv-cli /path/to/report --single
```

Điều này sẽ tạo ra nhật ký tương tự như ví dụ dưới đây. Lưu ý rằng số cổng có thể thay đổi:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Bây giờ bạn có thể xem báo cáo bằng cách mở URL được cung cấp trong trình duyệt của bạn.

### Sử dụng Lời nhắc Tương tác

Ngoài ra, bạn có thể chạy lệnh sau và trả lời các lời nhắc để tạo báo cáo:

```bash
npx @wdio/visual-reporter
```

Các lời nhắc sẽ hướng dẫn bạn cung cấp các đường dẫn và tùy chọn cần thiết. Cuối cùng, lời nhắc tương tác cũng sẽ hỏi xem bạn có muốn khởi động máy chủ để xem báo cáo không. Nếu bạn chọn khởi động máy chủ, công cụ sẽ khởi chạy một máy chủ đơn giản và hiển thị URL trong nhật ký. Bạn có thể mở URL này trong trình duyệt để xem báo cáo.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Xem Báo cáo

:::warning
Mở `path/to/report/index.html` trực tiếp trong trình duyệt **mà không phục vụ từ máy chủ cục bộ** sẽ **KHÔNG** hoạt động.
:::

Nếu bạn đã chọn **không** khởi động máy chủ thông qua lời nhắc tương tác, bạn vẫn có thể xem báo cáo bằng cách chạy lệnh sau một cách thủ công:

```bash
npx sirv-cli /path/to/report --single
```

Điều này sẽ tạo ra nhật ký tương tự như ví dụ dưới đây. Lưu ý rằng số cổng có thể thay đổi:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Bây giờ bạn có thể xem báo cáo bằng cách mở URL được cung cấp trong trình duyệt của bạn.

# Demo Báo cáo

Để xem ví dụ về giao diện của báo cáo, hãy truy cập [demo GitHub Pages](https://webdriverio.github.io/visual-testing/) của chúng tôi.

# Hiểu Báo cáo Trực quan

Trình báo cáo Trực quan cung cấp cái nhìn có tổ chức về kết quả kiểm tra trực quan của bạn. Đối với mỗi lần chạy kiểm tra, bạn sẽ có thể:

-   Dễ dàng điều hướng giữa các trường hợp kiểm tra và xem kết quả tổng hợp.
-   Xem xét metadata như tên kiểm tra, trình duyệt được sử dụng và kết quả so sánh.
-   Xem hình ảnh khác biệt cho thấy nơi phát hiện sự khác biệt trực quan.

Biểu diễn trực quan này đơn giản hóa việc phân tích kết quả kiểm tra của bạn, giúp dễ dàng xác định và giải quyết các vấn đề hồi quy trực quan.

# Tích hợp CI

Chúng tôi đang làm việc để hỗ trợ các công cụ CI khác nhau như Jenkins, GitHub Actions và nhiều hơn nữa. Nếu bạn muốn giúp chúng tôi, vui lòng liên hệ với chúng tôi trên [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).
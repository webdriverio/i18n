---
id: cli-wizard
title: Trình Trợ Lý CLI
---

Bạn có thể xác nhận văn bản nào có thể được tìm thấy trong một hình ảnh mà không cần chạy thử nghiệm bằng cách sử dụng Trình Trợ Lý CLI OCR. Những thứ duy nhất cần thiết là:

-   bạn đã cài đặt `@wdio/ocr-service` như một dependency, xem [Bắt Đầu](./getting-started)
-   một hình ảnh mà bạn muốn xử lý

Sau đó chạy lệnh sau để khởi động trình trợ lý

```sh
npx ocr-service
```

Điều này sẽ khởi động một trình trợ lý hướng dẫn bạn qua các bước để chọn hình ảnh và sử dụng haystack cùng chế độ nâng cao. Các câu hỏi sau được đặt ra

## Bạn muốn chỉ định tệp như thế nào?

Các tùy chọn sau đây có thể được chọn

-   Sử dụng "trình duyệt tệp"
-   Nhập đường dẫn tệp thủ công

### Sử dụng "trình duyệt tệp"

Trình trợ lý CLI cung cấp tùy chọn sử dụng "trình duyệt tệp" để tìm kiếm tệp trên hệ thống của bạn. Nó bắt đầu từ thư mục bạn gọi lệnh. Sau khi chọn một hình ảnh (sử dụng phím mũi tên và phím ENTER), bạn sẽ chuyển sang câu hỏi tiếp theo

### Nhập đường dẫn tệp thủ công

Đây là đường dẫn trực tiếp đến một tệp ở một nơi nào đó trên máy cục bộ của bạn

### Bạn có muốn sử dụng haystack không?

Ở đây bạn có tùy chọn chọn một khu vực cần được xử lý. Điều này có thể tăng tốc quá trình hoặc giảm/thu hẹp lượng văn bản mà công cụ OCR có thể tìm thấy. Bạn cần cung cấp dữ liệu `x`, `y`, `width`, `height` dựa trên các câu hỏi sau:

-   Nhập tọa độ x:
-   Nhập tọa độ y:
-   Nhập chiều rộng:
-   Nhập chiều cao:

## Bạn có muốn sử dụng chế độ nâng cao không?

Chế độ nâng cao sẽ có các tính năng bổ sung như:

-   thiết lập độ tương phản
-   nhiều tính năng khác sẽ có trong tương lai

## Demo

Đây là một demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>
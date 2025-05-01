---
id: ocr-testing
title: Kiểm Thử OCR
---

Kiểm thử tự động trên ứng dụng di động và trang web máy tính có thể đặc biệt khó khăn khi xử lý các phần tử không có định danh duy nhất. [Bộ chọn WebdriverIO](https://webdriver.io/docs/selectors) tiêu chuẩn có thể không phải lúc nào cũng giúp được bạn. Hãy khám phá thế giới của `@wdio/ocr-service`, một dịch vụ mạnh mẽ sử dụng OCR ([Nhận dạng ký tự quang học](https://en.wikipedia.org/wiki/Optical_character_recognition)) để tìm kiếm, chờ đợi và tương tác với các phần tử trên màn hình dựa trên **văn bản hiển thị** của chúng.

Các lệnh tùy chỉnh sau đây sẽ được cung cấp và thêm vào đối tượng `browser/driver` để bạn có được bộ công cụ phù hợp để thực hiện công việc của mình.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Cách hoạt động

Dịch vụ này sẽ

1. tạo ảnh chụp màn hình của màn hình/thiết bị của bạn. (Nếu cần, bạn có thể cung cấp một haystack, có thể là một phần tử hoặc một đối tượng hình chữ nhật, để xác định một khu vực cụ thể. Xem tài liệu cho từng lệnh.)
1. tối ưu hóa kết quả cho OCR bằng cách chuyển ảnh chụp màn hình thành đen/trắng với độ tương phản cao (độ tương phản cao cần thiết để ngăn nhiễu nền ảnh. Điều này có thể được tùy chỉnh cho mỗi lệnh.)
1. sử dụng [Nhận dạng ký tự quang học](https://en.wikipedia.org/wiki/Optical_character_recognition) từ [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) để lấy tất cả văn bản từ màn hình và làm nổi bật tất cả văn bản tìm thấy trên hình ảnh. Nó có thể hỗ trợ nhiều ngôn ngữ khác nhau có thể được tìm thấy [tại đây.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. sử dụng Fuzzy Logic từ [Fuse.js](https://fusejs.io/) để tìm các chuỗi _xấp xỉ bằng_ với một mẫu đã cho (thay vì chính xác). Điều này có nghĩa là ví dụ như giá trị tìm kiếm `Username` cũng có thể tìm thấy văn bản `Usename` hoặc ngược lại.
1. Cung cấp một trình hướng dẫn cli (`npx ocr-service`) để xác thực hình ảnh của bạn và truy xuất văn bản thông qua terminal

Một ví dụ về các bước 1, 2 và 3 có thể được tìm thấy trong hình ảnh này

![Các bước xử lý](/img/ocr/processing-steps.jpg)

Nó hoạt động với **KHÔNG CẦN** phụ thuộc vào hệ thống nào (ngoài những gì WebdriverIO sử dụng), nhưng nếu cần, nó cũng có thể làm việc với cài đặt cục bộ từ [Tesseract](https://tesseract-ocr.github.io/tessdoc/) để giảm thời gian thực thi đáng kể! (Xem thêm [Tối ưu hóa Thực thi Kiểm thử](#test-execution-optimization) về cách tăng tốc các bài kiểm tra của bạn.)

Hứng thú? Bắt đầu sử dụng ngay hôm nay bằng cách làm theo hướng dẫn [Bắt đầu](./getting-started).

:::caution Quan trọng
Có nhiều lý do khiến bạn có thể không nhận được đầu ra chất lượng tốt từ Tesseract. Một trong những lý do lớn nhất có thể liên quan đến ứng dụng của bạn và module này là do không có sự phân biệt màu sắc phù hợp giữa văn bản cần tìm và nền. Ví dụ, văn bản màu trắng trên nền tối _dễ dàng_ được tìm thấy, nhưng văn bản sáng màu trên nền trắng hoặc văn bản tối trên nền tối khó có thể được tìm thấy.

Xem thêm [trang này](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) để biết thêm thông tin từ Tesseract.

Đừng quên đọc [FAQ](./ocr-faq).
:::
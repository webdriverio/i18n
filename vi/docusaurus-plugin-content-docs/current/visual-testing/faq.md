---
id: faq
title: Câu hỏi thường gặp
---

### Tôi có cần sử dụng phương thức `save(Screen/Element/FullPageScreen)` khi tôi muốn chạy `check(Screen/Element/FullPageScreen)` không?

Không, bạn không cần phải làm điều này. Phương thức `check(Screen/Element/FullPageScreen)` sẽ tự động thực hiện việc này cho bạn.

### Các bài kiểm tra trực quan của tôi không thành công với sự khác biệt, làm thế nào để cập nhật đường cơ sở của tôi?

Bạn có thể cập nhật hình ảnh cơ sở thông qua dòng lệnh bằng cách thêm đối số `--update-visual-baseline`. Điều này sẽ

-   tự động sao chép ảnh chụp màn hình thực tế và đặt nó vào thư mục cơ sở
-   nếu có sự khác biệt, nó sẽ cho phép bài kiểm tra vượt qua vì đường cơ sở đã được cập nhật

**Cách sử dụng:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Khi chạy ở chế độ logs info/debug, bạn sẽ thấy các logs sau được thêm vào

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### Chiều rộng và chiều cao không thể là số âm

Có thể gặp lỗi `Width and height cannot be negative` (Chiều rộng và chiều cao không thể là số âm). 9/10 trường hợp, lỗi này liên quan đến việc tạo hình ảnh của một phần tử không nằm trong khung nhìn. Hãy đảm bảo phần tử luôn nằm trong khung nhìn trước khi bạn cố gắng tạo hình ảnh của phần tử đó.

### Cài đặt Canvas trên Windows thất bại với logs Node-Gyp

Nếu bạn gặp sự cố với việc cài đặt Canvas trên Windows do lỗi Node-Gyp, xin lưu ý rằng điều này chỉ áp dụng cho Phiên bản 4 trở xuống. Để tránh những vấn đề này, hãy xem xét việc cập nhật lên Phiên bản 5 trở lên, không có những phụ thuộc này và sử dụng [Jimp](https://github.com/jimp-dev/jimp) để xử lý hình ảnh.

Nếu bạn vẫn cần giải quyết các vấn đề với Phiên bản 4, vui lòng kiểm tra:

-   phần Node Canvas trong hướng dẫn [Bắt đầu](/docs/visual-testing#system-requirements)
-   [bài viết này](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) để Sửa các vấn đề Node-Gyp trên Windows. (Cảm ơn [IgorSasovets](https://github.com/IgorSasovets))
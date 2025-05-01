---
id: autocompletion
title: Tự động hoàn thành
---

## IntelliJ

Tính năng tự động hoàn thành hoạt động ngay từ đầu trong IDEA và WebStorm.

Nếu bạn đã viết mã chương trình một thời gian, có lẽ bạn thích tính năng tự động hoàn thành. Tự động hoàn thành có sẵn ngay từ đầu trong nhiều trình soạn thảo mã.

![Autocompletion](/img/autocompletion/0.png)

Định nghĩa kiểu dựa trên [JSDoc](http://usejsdoc.org/) được sử dụng để tạo tài liệu mã. Nó giúp hiển thị thêm chi tiết về các tham số và kiểu của chúng.

![Autocompletion](/img/autocompletion/1.png)

Sử dụng phím tắt tiêu chuẩn <kbd>⇧ + ⌥ + SPACE</kbd> trên nền tảng IntelliJ để xem tài liệu có sẵn:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code thường có hỗ trợ kiểu được tích hợp tự động và không cần thực hiện thêm bất kỳ hành động nào.

![Autocompletion](/img/autocompletion/14.png)

Nếu bạn sử dụng JavaScript thuần và muốn có hỗ trợ kiểu phù hợp, bạn phải tạo một tệp `jsconfig.json` trong thư mục gốc dự án và tham chiếu đến các gói wdio đã sử dụng, ví dụ:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```
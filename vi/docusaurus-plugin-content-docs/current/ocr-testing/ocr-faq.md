---
id: ocr-faq
title: Câu hỏi thường gặp
---

## Các bài kiểm tra của tôi rất chậm

Khi bạn sử dụng `@wdio/ocr-service` này, bạn không sử dụng nó để tăng tốc các bài kiểm tra của mình, bạn sử dụng nó vì bạn gặp khó khăn trong việc định vị các phần tử trong ứng dụng web/di động, và bạn muốn một cách dễ dàng hơn để định vị chúng. Và chúng ta đều hy vọng biết rằng khi bạn muốn điều gì đó, bạn sẽ mất điều khác. **Nhưng....**, có một cách để làm cho `@wdio/ocr-service` thực thi nhanh hơn bình thường. Thông tin thêm về điều đó có thể được tìm thấy [tại đây](./more-test-optimization).

## Tôi có thể sử dụng các lệnh từ dịch vụ này với các lệnh/bộ chọn WebdriverIO mặc định không?

Có, bạn có thể kết hợp các lệnh để làm cho tập lệnh của bạn mạnh mẽ hơn nữa! Lời khuyên là sử dụng các lệnh/bộ chọn WebdriverIO mặc định càng nhiều càng tốt và chỉ sử dụng dịch vụ này khi bạn không thể tìm thấy một bộ chọn duy nhất, hoặc bộ chọn của bạn sẽ trở nên quá dễ vỡ.

## Văn bản của tôi không được tìm thấy, điều đó có thể xảy ra như thế nào?

Trước tiên, điều quan trọng là phải hiểu cách thức hoạt động của quá trình OCR trong module này, vì vậy hãy đọc [trang này](./ocr-testing). Nếu bạn vẫn không thể tìm thấy văn bản của mình, bạn có thể thử những điều sau đây.

### Khu vực hình ảnh quá lớn

Khi module cần xử lý một khu vực lớn của ảnh chụp màn hình, nó có thể không tìm thấy văn bản. Bạn có thể cung cấp một khu vực nhỏ hơn bằng cách cung cấp một haystack khi bạn sử dụng lệnh. Vui lòng kiểm tra [lệnh](./ocr-click-on-text) để biết lệnh nào hỗ trợ cung cấp haystack.

### Độ tương phản giữa văn bản và nền không chính xác

Điều này có nghĩa là bạn có thể có văn bản sáng trên nền trắng hoặc văn bản tối trên nền tối. Điều này có thể dẫn đến không thể tìm thấy văn bản. Trong các ví dụ dưới đây, bạn có thể thấy rằng văn bản `Why WebdriverIO?` có màu trắng và được bao quanh bởi một nút màu xám. Trong trường hợp này, nó sẽ dẫn đến không tìm thấy văn bản `Why WebdriverIO?`. Bằng cách tăng độ tương phản cho lệnh cụ thể, nó tìm thấy văn bản và có thể nhấp vào nó, xem hình thứ hai.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Với độ tương phản mặc định là 0.25, văn bản không được tìm thấy
    contrast: 1,
});
```

![Vấn đề về độ tương phản](/img/ocr/increased-contrast.jpg)

## Tại sao phần tử của tôi được nhấp vào nhưng bàn phím trên các thiết bị di động của tôi không bao giờ hiện lên?

Điều này có thể xảy ra trên một số trường văn bản khi nhấp chuột được xác định quá lâu và được coi là nhấn giữ. Bạn có thể sử dụng tùy chọn `clickDuration` trên [`ocrClickOnText`](./ocr-click-on-text) và [`ocrSetValue`](./ocr-set-value) để giảm bớt điều này. Xem [tại đây](./ocr-click-on-text#options).

## Module này có thể cung cấp nhiều phần tử trở lại giống như WebdriverIO thường làm không?

Không, hiện tại điều này không khả thi. Nếu module tìm thấy nhiều phần tử phù hợp với bộ chọn được cung cấp, nó sẽ tự động tìm phần tử có điểm khớp cao nhất.

## Tôi có thể tự động hóa hoàn toàn ứng dụng của mình với các lệnh OCR được cung cấp bởi dịch vụ này không?

Tôi chưa bao giờ làm điều đó, nhưng về lý thuyết, nó có thể khả thi. Hãy cho chúng tôi biết nếu bạn thành công với điều đó ☺️.

## Tôi thấy một tệp bổ sung được gọi là `{languageCode}.traineddata` được thêm vào, đó là gì?

`{languageCode}.traineddata` là tệp dữ liệu ngôn ngữ được sử dụng bởi Tesseract. Nó chứa dữ liệu đào tạo cho ngôn ngữ đã chọn, bao gồm thông tin cần thiết để Tesseract nhận dạng hiệu quả các ký tự và từ tiếng Anh.

### Nội dung của `{languageCode}.traineddata`

Tệp thường chứa:

1. **Dữ liệu bộ ký tự:** Thông tin về các ký tự trong ngôn ngữ tiếng Anh.
1. **Mô hình ngôn ngữ:** Một mô hình thống kê về cách các ký tự tạo thành từ và từ tạo thành câu.
1. **Trích xuất đặc trưng:** Dữ liệu về cách trích xuất đặc trưng từ hình ảnh để nhận dạng ký tự.
1. **Dữ liệu đào tạo:** Dữ liệu có được từ việc đào tạo Tesseract trên một bộ lớn các hình ảnh văn bản tiếng Anh.

### Tại sao `{languageCode}.traineddata` lại quan trọng?

1. **Nhận dạng ngôn ngữ:** Tesseract dựa vào các tệp dữ liệu đã đào tạo này để nhận dạng và xử lý chính xác văn bản bằng một ngôn ngữ cụ thể. Nếu không có `{languageCode}.traineddata`, Tesseract sẽ không thể nhận dạng văn bản tiếng Anh.
1. **Hiệu suất:** Chất lượng và độ chính xác của OCR có liên quan trực tiếp đến chất lượng của dữ liệu đào tạo. Sử dụng tệp dữ liệu đã đào tạo chính xác đảm bảo rằng quá trình OCR chính xác nhất có thể.
1. **Tính tương thích:** Đảm bảo rằng tệp `{languageCode}.traineddata` được bao gồm trong dự án của bạn giúp việc sao chép môi trường OCR trên các hệ thống khác nhau hoặc máy tính của các thành viên trong nhóm dễ dàng hơn.

### Quản lý phiên bản `{languageCode}.traineddata`

Việc bao gồm `{languageCode}.traineddata` trong hệ thống kiểm soát phiên bản của bạn được khuyến nghị vì những lý do sau:

1. **Tính nhất quán:** Nó đảm bảo rằng tất cả các thành viên trong nhóm hoặc môi trường triển khai sử dụng chính xác cùng một phiên bản của dữ liệu đào tạo, dẫn đến kết quả OCR nhất quán trên các môi trường khác nhau.
1. **Khả năng tái tạo:** Lưu trữ tệp này trong kiểm soát phiên bản giúp dễ dàng tái tạo kết quả khi chạy quá trình OCR vào ngày sau đó hoặc trên một máy khác.
1. **Quản lý phụ thuộc:** Bao gồm nó trong hệ thống kiểm soát phiên bản giúp quản lý các phụ thuộc và đảm bảo rằng bất kỳ thiết lập hoặc cấu hình môi trường nào cũng bao gồm các tệp cần thiết để dự án chạy chính xác.

## Có cách dễ dàng để xem văn bản nào được tìm thấy trên màn hình của tôi mà không cần chạy kiểm tra không?

Có, bạn có thể sử dụng trình hướng dẫn CLI của chúng tôi cho việc đó. Tài liệu có thể được tìm thấy [tại đây](./cli-wizard)
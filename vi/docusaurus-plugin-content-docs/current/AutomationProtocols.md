---
id: automationProtocols
title: Các Giao Thức Tự Động Hóa
---

Với WebdriverIO, bạn có thể lựa chọn giữa nhiều công nghệ tự động hóa khi chạy các bài kiểm tra E2E của bạn cục bộ hoặc trên đám mây. Theo mặc định, WebdriverIO sẽ cố gắng bắt đầu một phiên tự động hóa cục bộ sử dụng giao thức [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/).

## Giao Thức WebDriver Bidi

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) là một giao thức tự động hóa để tự động hóa trình duyệt sử dụng giao tiếp hai chiều. Đây là phiên bản kế nhiệm của giao thức [WebDriver](https://w3c.github.io/webdriver/) và cho phép nhiều khả năng kiểm tra nội tại hơn cho các trường hợp sử dụng kiểm thử khác nhau.

Giao thức này hiện đang được phát triển và các yếu tố cơ bản mới có thể được thêm vào trong tương lai. Tất cả các nhà cung cấp trình duyệt đã cam kết triển khai tiêu chuẩn web này và nhiều [yếu tố cơ bản](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) đã được tích hợp vào các trình duyệt.

## Giao Thức WebDriver

> [WebDriver](https://w3c.github.io/webdriver/) là một giao diện điều khiển từ xa cho phép kiểm tra và kiểm soát các tác nhân người dùng. Nó cung cấp một giao thức dây nền tảng và ngôn ngữ trung lập như một cách để các chương trình ngoài quá trình hướng dẫn hành vi của trình duyệt web từ xa.

Giao thức WebDriver được thiết kế để tự động hóa trình duyệt từ góc độ người dùng, có nghĩa là mọi thứ mà người dùng có thể làm, bạn có thể làm với trình duyệt. Nó cung cấp một tập hợp các lệnh trừu tượng hóa các tương tác phổ biến với ứng dụng (ví dụ: điều hướng, nhấp chuột hoặc đọc trạng thái của một phần tử). Vì đây là một tiêu chuẩn web, nó được hỗ trợ tốt trên tất cả các nhà cung cấp trình duyệt chính và cũng đang được sử dụng như một giao thức cơ bản cho tự động hóa di động sử dụng [Appium](http://appium.io).

Để sử dụng giao thức tự động hóa này, bạn cần một máy chủ proxy để chuyển đổi tất cả các lệnh và thực thi chúng trong môi trường mục tiêu (tức là trình duyệt hoặc ứng dụng di động).

Đối với tự động hóa trình duyệt, máy chủ proxy thường là trình điều khiển trình duyệt. Có các trình điều khiển có sẵn cho tất cả các trình duyệt:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

Đối với bất kỳ loại tự động hóa di động nào, bạn sẽ cần cài đặt và thiết lập [Appium](http://appium.io). Điều này sẽ cho phép bạn tự động hóa các ứng dụng di động (iOS/Android) hoặc thậm chí là máy tính để bàn (macOS/Windows) sử dụng cùng một thiết lập WebdriverIO.

Ngoài ra còn có rất nhiều dịch vụ cho phép bạn chạy kiểm thử tự động hóa của mình trên đám mây ở quy mô lớn. Thay vì phải thiết lập tất cả các trình điều khiển này cục bộ, bạn có thể chỉ cần giao tiếp với các dịch vụ này (ví dụ: [Sauce Labs](https://saucelabs.com)) trên đám mây và kiểm tra kết quả trên nền tảng của họ. Giao tiếp giữa script kiểm thử và môi trường tự động hóa sẽ như sau:

![WebDriver Setup](/img/webdriver.png)
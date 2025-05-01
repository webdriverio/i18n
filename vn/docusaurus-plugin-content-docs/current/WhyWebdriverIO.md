---
id: why-webdriverio
title: Tại sao chọn Webdriver.IO?
---

WebdriverIO là một framework tự động hóa tiến bộ được xây dựng để tự động hóa các ứng dụng web và di động hiện đại. Nó đơn giản hóa việc tương tác với ứng dụng của bạn và cung cấp một bộ plugins giúp bạn tạo ra bộ kiểm thử có khả năng mở rộng, mạnh mẽ và ổn định.

Nó được thiết kế để:

- __Có thể mở rộng__ - Thêm các hàm trợ giúp, hoặc các tập hợp phức tạp hơn và kết hợp các lệnh hiện có là __đơn giản__ và __thực sự hữu ích__
- __Tương thích__ - WebdriverIO có thể chạy trên [WebDriver Protocol](https://w3c.github.io/webdriver/) để __kiểm thử đa trình duyệt thực sự__ cũng như [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) cho tự động hóa dựa trên Chromium bằng cách sử dụng [Puppeteer](https://pptr.dev/).
- __Giàu tính năng__ - Sự đa dạng lớn của các plugins tích hợp sẵn và cộng đồng cho phép bạn __dễ dàng tích hợp__ và __mở rộng__ thiết lập của mình để đáp ứng các yêu cầu của bạn.

Bạn có thể sử dụng WebdriverIO để tự động hóa:

- 🌐 <span>&nbsp;</span> __ứng dụng web hiện đại__ được viết bằng React, Vue, Angular, Svelte hoặc các framework frontend khác
- 📱 <span>&nbsp;</span> __ứng dụng di động hybrid__ hoặc __native__ chạy trong giả lập/máy ảo hoặc trên thiết bị thật
- 💻 <span>&nbsp;</span> __ứng dụng desktop native__ (ví dụ: được viết bằng Electron.js)
- 📦 <span>&nbsp;</span> __kiểm thử đơn vị hoặc component__ của các thành phần web trong trình duyệt

## Dựa trên các Tiêu chuẩn Web

WebdriverIO tận dụng sức mạnh của giao thức [WebDriver](https://w3c.github.io/webdriver/) và [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) được phát triển và hỗ trợ bởi tất cả các nhà cung cấp trình duyệt và đảm bảo trải nghiệm kiểm thử đa trình duyệt thực sự. Trong khi các công cụ tự động hóa khác yêu cầu bạn tải xuống các động cơ trình duyệt đã được sửa đổi mà người dùng thực tế không sử dụng hoặc mô phỏng hành vi người dùng bằng cách tiêm JavaScript, WebdriverIO dựa vào một tiêu chuẩn đã được thống nhất chung cho tự động hóa mà [được kiểm tra đúng cách](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) và đảm bảo khả năng tương thích trong nhiều thập kỷ tới.

Hơn nữa, WebdriverIO cũng hỗ trợ các giao thức tự động hóa độc quyền thay thế như [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) cho mục đích gỡ lỗi và kiểm tra. Điều này cho phép người dùng dễ dàng chuyển đổi giữa các lệnh thông thường dựa trên WebDriver và các tương tác trình duyệt mạnh mẽ thông qua [Puppeteer](https://pptr.dev/).

Đọc thêm về sự khác biệt của các tiêu chuẩn tự động hóa này trong phần [Giao thức Tự động hóa](automationProtocols).

## Mã nguồn Mở Thực sự

So với nhiều công cụ tự động hóa trong hệ sinh thái, WebdriverIO là một dự án mã nguồn mở thực sự được điều hành với quản trị mở và thuộc sở hữu của một tổ chức phi lợi nhuận có tên [OpenJS Foundation](https://openjsf.org/). Điều này ràng buộc dự án về mặt pháp lý để phát triển và được định hướng vì lợi ích của tất cả người tham gia. Nhóm dự án coi trọng sự cởi mở và hợp tác và không bị thúc đẩy bởi lợi ích tiền bạc.

Điều này làm cho dự án độc lập trong cách nó được phát triển và nơi nó hướng đến. Nó cho phép chúng tôi cung cấp hỗ trợ miễn phí 24/7 trong [kênh cộng đồng](https://discord.webdriver.io) của chúng tôi khi chúng tôi xây dựng một cộng đồng bền vững hỗ trợ và học hỏi lẫn nhau. Cuối cùng, nó mang lại nhiều cơ hội cho những người đóng góp và tham gia vào dự án nhờ vào [quản trị mở](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md) của nó.
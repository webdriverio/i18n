---
id: appium
title: Thiết lập Appium
---

Với WebdriverIO, bạn không chỉ có thể kiểm thử ứng dụng web trong trình duyệt mà còn các nền tảng khác như:

- 📱 ứng dụng di động trên iOS, Android hoặc Tizen
- 🖥️ ứng dụng desktop trên macOS hoặc Windows
- 📺 cũng như ứng dụng TV cho Roku, tvOS, Android TV và Samsung

Chúng tôi khuyên bạn nên sử dụng [Appium](https://appium.io/) để hỗ trợ bạn thực hiện các loại kiểm thử này. Bạn có thể có cái nhìn tổng quan về Appium trên [trang tài liệu chính thức](https://appium.io/docs/en/2.0/intro/) của họ.

Việc thiết lập môi trường phù hợp không hề đơn giản. May mắn thay, hệ sinh thái Appium có các công cụ tuyệt vời để hỗ trợ bạn. Để thiết lập một trong các môi trường trên, chỉ cần chạy:

```sh
$ npx appium-installer
```

Điều này sẽ khởi động bộ công cụ [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) để hướng dẫn bạn qua quy trình thiết lập.
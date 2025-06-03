---
id: appium
title: Thiết lập Appium
---

Với WebdriverIO, bạn có thể kiểm thử không chỉ ứng dụng web trong trình duyệt mà còn các nền tảng khác như:

- 📱 ứng dụng di động trên iOS, Android hoặc Tizen
- 🖥️ ứng dụng máy tính để bàn trên macOS hoặc Windows
- 📺 cũng như ứng dụng TV cho Roku, tvOS, Android TV và Samsung

Chúng tôi khuyên bạn nên sử dụng [Appium](https://appium.io/) để hỗ trợ bạn thực hiện các loại kiểm thử này. Bạn có thể tìm hiểu tổng quan về Appium trên [trang tài liệu chính thức](https://appium.io/docs/en/latest/intro/) của họ.

Việc thiết lập môi trường phù hợp không phải là điều đơn giản. May mắn thay, hệ sinh thái Appium có các công cụ tuyệt vời để hỗ trợ bạn. Để thiết lập một trong các môi trường trên, chỉ cần chạy:

```sh
$ npx appium-installer
```

Điều này sẽ khởi động bộ công cụ [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) hướng dẫn bạn qua quy trình thiết lập.
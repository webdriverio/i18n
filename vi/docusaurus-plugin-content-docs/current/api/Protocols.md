---
id: protocols
title: Lệnh Giao Thức
---

WebdriverIO là một framework tự động hóa dựa vào các giao thức tự động hóa khác nhau để điều khiển một tác nhân từ xa, ví dụ như trình duyệt, thiết bị di động hoặc tivi. Dựa trên thiết bị từ xa, các giao thức khác nhau sẽ được sử dụng. Những lệnh này được gán cho đối tượng [Browser](/docs/api/browser) hoặc [Element](/docs/api/element) tùy thuộc vào thông tin phiên từ máy chủ từ xa (ví dụ: trình điều khiển trình duyệt).

Bên trong WebdriverIO sử dụng lệnh giao thức cho hầu hết tất cả các tương tác với tác nhân từ xa. Tuy nhiên, các lệnh bổ sung được gán cho đối tượng [Browser](/docs/api/browser) hoặc [Element](/docs/api/element) đơn giản hóa việc sử dụng WebdriverIO, ví dụ: lấy văn bản của một phần tử bằng lệnh giao thức sẽ trông như thế này:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Sử dụng các lệnh tiện lợi của đối tượng [Browser](/docs/api/browser) hoặc [Element](/docs/api/element), điều này có thể được rút gọn thành:

```js
$('#lst-ib').getText()
```

Phần sau đây giải thích từng giao thức riêng lẻ.

## Giao Thức WebDriver

[WebDriver](https://w3c.github.io/webdriver/#elements) là một tiêu chuẩn web để tự động hóa trình duyệt. Trái ngược với một số công cụ E2E khác, nó đảm bảo rằng việc tự động hóa có thể được thực hiện trên các trình duyệt thực tế mà người dùng của bạn sử dụng, ví dụ như Firefox, Safari và Chrome và các trình duyệt dựa trên Chromium như Edge, chứ không chỉ trên các công cụ trình duyệt, ví dụ như WebKit, vốn rất khác nhau.

Lợi thế của việc sử dụng giao thức WebDriver thay vì các giao thức gỡ lỗi như [Chrome DevTools](https://w3c.github.io/webdriver/#elements) là bạn có một tập hợp các lệnh cụ thể cho phép tương tác với trình duyệt theo cùng một cách trên tất cả các trình duyệt, điều này làm giảm khả năng gặp phải sự không ổn định. Hơn nữa, giao thức này còn cung cấp khả năng mở rộng quy mô lớn bằng cách sử dụng các nhà cung cấp đám mây như [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) và [các nhà cung cấp khác](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## Giao Thức WebDriver Bidi

Giao thức [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) là thế hệ thứ hai của giao thức và hiện đang được phát triển bởi hầu hết các nhà cung cấp trình duyệt. So với phiên bản tiền nhiệm, giao thức này hỗ trợ giao tiếp hai chiều (do đó có tên "Bidi") giữa framework và thiết bị từ xa. Nó cũng giới thiệu các nguyên tắc bổ sung để kiểm tra trình duyệt tốt hơn nhằm tự động hóa các ứng dụng web hiện đại trong trình duyệt một cách hiệu quả hơn.

Do giao thức này hiện đang trong quá trình phát triển, nhiều tính năng sẽ được bổ sung theo thời gian và được hỗ trợ bởi trình duyệt. Nếu bạn sử dụng các lệnh tiện lợi của WebdriverIO, không có gì thay đổi đối với bạn. WebdriverIO sẽ sử dụng các khả năng mới của giao thức này ngay khi chúng có sẵn và được hỗ trợ trong trình duyệt.

## Appium

Dự án [Appium](https://appium.io/) cung cấp khả năng tự động hóa các thiết bị di động, máy tính để bàn và tất cả các loại thiết bị IoT khác. Trong khi WebDriver tập trung vào trình duyệt và web, tầm nhìn của Appium là sử dụng cùng một phương pháp nhưng cho bất kỳ thiết bị nào. Ngoài các lệnh mà WebDriver định nghĩa, nó có các lệnh đặc biệt thường dành riêng cho thiết bị từ xa đang được tự động hóa. Đối với các kịch bản kiểm thử di động, đây là lý tưởng khi bạn muốn viết và chạy cùng một bài kiểm tra cho cả ứng dụng Android và iOS.

Theo [tài liệu](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) của Appium, nó được thiết kế để đáp ứng nhu cầu tự động hóa di động theo triết lý được nêu trong bốn nguyên tắc sau:

- Bạn không nên phải biên dịch lại ứng dụng của mình hoặc sửa đổi nó theo bất kỳ cách nào để tự động hóa nó.
- Bạn không nên bị ràng buộc vào một ngôn ngữ hoặc framework cụ thể để viết và chạy các bài kiểm tra của mình.
- Một framework tự động hóa di động không nên phát minh lại bánh xe khi nói đến các API tự động hóa.
- Một framework tự động hóa di động nên là mã nguồn mở, cả về tinh thần và thực tế cũng như về tên gọi!

## Chromium

Giao thức Chromium cung cấp một tập hợp lệnh mở rộng trên giao thức WebDriver chỉ được hỗ trợ khi chạy phiên tự động thông qua [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) hoặc [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Giao thức Firefox cung cấp một tập hợp lệnh mở rộng trên giao thức WebDriver chỉ được hỗ trợ khi chạy phiên tự động thông qua [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

Giao thức [Sauce Labs](https://saucelabs.com/) cung cấp một tập hợp lệnh mở rộng trên giao thức WebDriver chỉ được hỗ trợ khi chạy phiên tự động sử dụng đám mây Sauce Labs.

## Selenium Standalone

Giao thức [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) cung cấp một tập hợp lệnh mở rộng trên giao thức WebDriver chỉ được hỗ trợ khi chạy phiên tự động sử dụng Selenium Grid.

## JSON Wire Protocol

[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) là tiền nhiệm của giao thức WebDriver và __đã bị loại bỏ__ ngày nay. Mặc dù một số lệnh có thể vẫn được hỗ trợ trong một số môi trường nhất định, nhưng không nên sử dụng bất kỳ lệnh nào của nó.

## Mobile JSON Wire Protocol

[Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) là một tập hợp lệnh di động mở rộng trên JSON Wire Protocol. Do giao thức này đã bị loại bỏ nên Mobile JSON Wire Protocol cũng __đã bị loại bỏ__. Appium có thể vẫn hỗ trợ một số lệnh của nó nhưng không nên sử dụng chúng.
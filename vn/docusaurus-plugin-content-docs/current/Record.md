---
id: record
title: Ghi lại các Bài kiểm thử
---

Chrome DevTools có một bảng điều khiển _Recorder_ cho phép người dùng ghi lại và phát lại các bước tự động trong Chrome. Các bước này có thể được [xuất thành các bài kiểm thử WebdriverIO với một tiện ích mở rộng](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) giúp việc viết bài kiểm thử trở nên rất dễ dàng.

## Chrome DevTools Recorder là gì

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) là một công cụ cho phép bạn ghi lại và phát lại các hành động kiểm thử trực tiếp trong trình duyệt, đồng thời xuất chúng dưới dạng JSON (hoặc xuất chúng trong bài kiểm thử e2e), cũng như đo lường hiệu suất kiểm thử.

Công cụ này đơn giản, và vì nó được tích hợp vào trình duyệt, chúng ta có sự tiện lợi không phải chuyển đổi ngữ cảnh hoặc xử lý bất kỳ công cụ bên thứ ba nào.

## Cách Ghi lại Bài kiểm thử với Chrome DevTools Recorder

Nếu bạn đang sử dụng Chrome phiên bản mới nhất, bạn sẽ có sẵn Recorder đã được cài đặt. Chỉ cần mở bất kỳ trang web nào, nhấp chuột phải và chọn _"Inspect"_. Trong DevTools, bạn có thể mở Recorder bằng cách nhấn `CMD/Control` + `Shift` + `p` và nhập _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Để bắt đầu ghi lại hành trình người dùng, nhấp vào _"Start new recording"_, đặt tên cho bài kiểm thử của bạn và sau đó sử dụng trình duyệt để ghi lại bài kiểm thử:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Bước tiếp theo, nhấp vào _"Replay"_ để kiểm tra xem việc ghi lại có thành công và thực hiện đúng những gì bạn muốn làm không. Nếu mọi thứ đều ổn, nhấp vào biểu tượng [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) và chọn _"Export as a WebdriverIO Test Script"_:

Tùy chọn _"Export as a WebdriverIO Test Script"_ chỉ khả dụng nếu bạn cài đặt tiện ích mở rộng [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).


![Chrome DevTools Recorder](/img/recorder/export.gif)

Vậy là xong!

## Xuất Bản Ghi

Nếu bạn xuất luồng dưới dạng tập lệnh kiểm thử WebdriverIO, nó sẽ tải xuống tập lệnh mà bạn có thể sao chép và dán vào bộ kiểm thử của mình. Ví dụ, bản ghi phía trên trông như sau:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

Hãy đảm bảo xem lại một số bộ định vị và thay thế chúng bằng các [loại bộ chọn](/docs/selectors) bền vững hơn nếu cần thiết. Bạn cũng có thể xuất luồng dưới dạng tệp JSON và sử dụng gói [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) để chuyển đổi nó thành tập lệnh kiểm thử thực tế.

## Các Bước Tiếp Theo

Bạn có thể sử dụng luồng này để dễ dàng tạo các bài kiểm thử cho ứng dụng của mình. Chrome DevTools Recorder có nhiều tính năng bổ sung khác nhau, ví dụ:

- [Mô phỏng mạng chậm](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) hoặc
- [Đo lường hiệu suất của các bài kiểm thử của bạn](https://developer.chrome.com/docs/devtools/recorder/#measure)

Hãy nhớ kiểm tra [tài liệu](https://developer.chrome.com/docs/devtools/recorder) của họ.
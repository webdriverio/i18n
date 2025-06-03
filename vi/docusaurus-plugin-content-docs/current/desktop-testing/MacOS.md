---
id: macos
title: MacOS
---

WebdriverIO có thể tự động hóa các ứng dụng MacOS tùy ý bằng cách sử dụng [Appium](https://appium.io/). Tất cả những gì bạn cần là [XCode](https://developer.apple.com/xcode/) được cài đặt trên hệ thống của bạn, Appium và [Mac2 Driver](https://github.com/appium/appium-mac2-driver) được cài đặt như một phụ thuộc và các capabilities được thiết lập chính xác.

## Bắt đầu

Để khởi tạo một dự án WebdriverIO mới, hãy chạy:

```sh
npm create wdio@latest ./
```

Một trình hướng dẫn cài đặt sẽ giúp bạn qua quy trình này. Đảm bảo bạn chọn _"Desktop Testing - of MacOS Applications"_ khi nó hỏi bạn loại kiểm thử nào bạn muốn thực hiện. Sau đó, chỉ cần giữ các mặc định hoặc sửa đổi dựa trên sở thích của bạn.

Trình hướng dẫn cấu hình sẽ cài đặt tất cả các gói Appium cần thiết và tạo một `wdio.conf.js` hoặc `wdio.conf.ts` với cấu hình cần thiết để kiểm thử trên MacOS. Nếu bạn đồng ý tự động tạo một số tệp kiểm thử, bạn có thể chạy bài kiểm tra đầu tiên của mình thông qua `npm run wdio`.

<CreateMacOSProjectAnimation />

Thế là xong 🎉

## Ví dụ

Đây là cách một bài kiểm tra đơn giản có thể trông như thế nào khi mở ứng dụng Máy tính, thực hiện một phép tính và xác minh kết quả:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__Lưu ý:__ ứng dụng máy tính được mở tự động khi bắt đầu phiên vì `'appium:bundleId': 'com.apple.calculator'` đã được định nghĩa như một tùy chọn capability. Bạn có thể chuyển đổi giữa các ứng dụng trong suốt phiên bất cứ lúc nào.

## Thông tin thêm

Để biết thêm thông tin cụ thể về kiểm thử trên MacOS, chúng tôi khuyên bạn nên kiểm tra dự án [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).
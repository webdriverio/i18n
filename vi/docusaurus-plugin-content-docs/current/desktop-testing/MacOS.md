---
id: macos
title: MacOS
---

WebdriverIO có thể tự động hóa ứng dụng MacOS tùy ý bằng cách sử dụng [Appium](https://appium.io/docs/en/2.0/). Tất cả những gì bạn cần là cài đặt [XCode](https://developer.apple.com/xcode/) trên hệ thống, Appium và [Mac2 Driver](https://github.com/appium/appium-mac2-driver) được cài đặt như một phụ thuộc và thiết lập các capabilities phù hợp.

## Bắt đầu

Để khởi tạo một dự án WebdriverIO mới, chạy:

```sh
npm create wdio@latest ./
```

Một trình hướng dẫn cài đặt sẽ giúp bạn qua quy trình này. Đảm bảo bạn chọn _"Desktop Testing - of MacOS Applications"_ khi được hỏi loại kiểm thử bạn muốn thực hiện. Sau đó, chỉ cần giữ các giá trị mặc định hoặc sửa đổi dựa trên sở thích của bạn.

Trình hướng dẫn cấu hình sẽ cài đặt tất cả các gói Appium cần thiết và tạo một `wdio.conf.js` hoặc `wdio.conf.ts` với cấu hình cần thiết để kiểm thử trên MacOS. Nếu bạn đồng ý tự động tạo một số tệp kiểm thử, bạn có thể chạy bài kiểm thử đầu tiên của mình thông qua `npm run wdio`.

<CreateMacOSProjectAnimation />

Vậy là xong 🎉

## Ví dụ

Dưới đây là cách một bài kiểm thử đơn giản có thể trông như thế nào, mở ứng dụng Máy tính, thực hiện phép tính và xác minh kết quả:

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

__Lưu ý:__ ứng dụng máy tính được mở tự động vào đầu phiên vì `'appium:bundleId': 'com.apple.calculator'` đã được định nghĩa như một tùy chọn capability. Bạn có thể chuyển đổi ứng dụng trong suốt phiên bất cứ lúc nào.

## Thông tin thêm

Để biết thêm thông tin về các chi tiết xung quanh việc kiểm thử trên MacOS, chúng tôi khuyên bạn nên kiểm tra dự án [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).
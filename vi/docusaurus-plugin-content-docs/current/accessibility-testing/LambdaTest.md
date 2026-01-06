---
id: lambdatest
title: Kiểm tra Khả năng Truy cập LambdaTest
---

# Kiểm tra Khả năng Truy cập LambdaTest

Bạn có thể dễ dàng tích hợp các bài kiểm tra khả năng truy cập vào bộ kiểm tra WebdriverIO của mình bằng cách sử dụng [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Ưu điểm của Kiểm tra Khả năng Truy cập LambdaTest

LambdaTest Accessibility Testing giúp bạn xác định và khắc phục các vấn đề về khả năng truy cập trong ứng dụng web của bạn. Sau đây là những ưu điểm chính:

* Tích hợp liền mạch với tự động hóa kiểm tra WebdriverIO hiện có của bạn.
* Quét khả năng truy cập tự động trong quá trình thực thi kiểm tra.
* Báo cáo tuân thủ WCAG toàn diện.
* Theo dõi vấn đề chi tiết với hướng dẫn khắc phục.
* Hỗ trợ nhiều tiêu chuẩn WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Thông tin chi tiết về khả năng truy cập thời gian thực trong bảng điều khiển LambdaTest.

## Bắt đầu với Kiểm tra Khả năng Truy cập LambdaTest

Thực hiện các bước sau để tích hợp bộ kiểm tra WebdriverIO của bạn với Kiểm tra Khả năng Truy cập của LambdaTest:

1. Cài đặt gói dịch vụ LambdaTest WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Cập nhật tệp cấu hình `wdio.conf.js` của bạn.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',
    
    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],
    
    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. Chạy kiểm tra của bạn như bình thường. LambdaTest sẽ tự động quét các vấn đề về khả năng truy cập trong quá trình thực thi kiểm tra.

```bash
npx wdio run wdio.conf.js
```

## Tùy chọn Cấu hình

Đối tượng `accessibilityOptions` hỗ trợ các tham số sau:

* **wcagVersion**: Chỉ định phiên bản tiêu chuẩn WCAG để kiểm tra
  - `wcag20` - WCAG 2.0 Cấp độ A
  - `wcag21a` - WCAG 2.1 Cấp độ A
  - `wcag21aa` - WCAG 2.1 Cấp độ AA (mặc định)
  - `wcag22aa` - WCAG 2.2 Cấp độ AA

* **bestPractice**: Bao gồm các khuyến nghị thực hành tốt nhất (mặc định: `false`)

* **needsReview**: Bao gồm các vấn đề cần xem xét thủ công (mặc định: `true`)

## Xem Báo cáo Khả năng Truy cập

Sau khi hoàn thành kiểm tra, bạn có thể xem báo cáo khả năng truy cập chi tiết trong [Bảng điều khiển LambdaTest](https://automation.lambdatest.com/):

1. Điều hướng đến quá trình thực thi kiểm tra của bạn
2. Nhấp vào tab "Accessibility"
3. Xem xét các vấn đề đã xác định với mức độ nghiêm trọng
4. Nhận hướng dẫn khắc phục cho từng vấn đề

Để biết thêm thông tin chi tiết, hãy truy cập [tài liệu Tự động hóa Khả năng Truy cập LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).
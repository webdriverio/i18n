---
id: testmuai
title: Kiểm Tra Khả Năng Truy Cập của TestMu AI (Trước đây là LambdaTest)
---

# TestMu AI Accessibility Testing

Bạn có thể dễ dàng tích hợp các bài kiểm tra khả năng truy cập vào bộ kiểm thử WebdriverIO của mình bằng cách sử dụng [Kiểm Tra Khả Năng Truy Cập của TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Lợi ích của Kiểm Tra Khả Năng Truy Cập TestMu AI

Kiểm Tra Khả Năng Truy Cập TestMu AI giúp bạn xác định và khắc phục các vấn đề về khả năng truy cập trong ứng dụng web của bạn. Sau đây là những lợi ích chính:

* Tích hợp liền mạch với tự động hóa kiểm thử WebdriverIO hiện có của bạn.
* Quét khả năng truy cập tự động trong quá trình thực thi kiểm thử.
* Báo cáo tuân thủ WCAG toàn diện.
* Theo dõi vấn đề chi tiết với hướng dẫn khắc phục.
* Hỗ trợ nhiều tiêu chuẩn WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Thông tin về khả năng truy cập trong thời gian thực trên bảng điều khiển TestMu AI.

## Bắt đầu với Kiểm Tra Khả Năng Truy Cập TestMu AI

Thực hiện các bước sau để tích hợp bộ kiểm thử WebdriverIO của bạn với Kiểm Tra Khả Năng Truy Cập của TestMu AI:

1. Cài đặt gói dịch vụ WebdriverIO của TestMu AI.

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

3. Chạy các bài kiểm tra của bạn như bình thường. TestMu AI sẽ tự động quét các vấn đề về khả năng truy cập trong quá trình thực thi kiểm thử.

```bash
npx wdio run wdio.conf.js
```

## Các Tùy Chọn Cấu Hình

Đối tượng `accessibilityOptions` hỗ trợ các tham số sau:

* **wcagVersion**: Chỉ định phiên bản tiêu chuẩn WCAG để kiểm tra
  - `wcag20` - WCAG 2.0 Mức A
  - `wcag21a` - WCAG 2.1 Mức A
  - `wcag21aa` - WCAG 2.1 Mức AA (mặc định)
  - `wcag22aa` - WCAG 2.2 Mức AA

* **bestPractice**: Bao gồm các khuyến nghị thực hành tốt nhất (mặc định: `false`)

* **needsReview**: Bao gồm các vấn đề cần xem xét thủ công (mặc định: `true`)

## Xem Báo Cáo Khả Năng Truy Cập

Sau khi hoàn thành các bài kiểm tra, bạn có thể xem các báo cáo khả năng truy cập chi tiết trong [Bảng Điều Khiển TestMu AI](https://automation.lambdatest.com/):

1. Điều hướng đến bài kiểm tra thực thi của bạn
2. Nhấp vào tab "Accessibility"
3. Xem xét các vấn đề đã xác định với mức độ nghiêm trọng
4. Nhận hướng dẫn khắc phục cho từng vấn đề

Để biết thông tin chi tiết hơn, hãy truy cập [tài liệu Tự động hóa Khả năng Truy cập TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).
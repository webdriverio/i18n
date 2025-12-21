---
id: integrate-with-smartui
title: SmartUI
---

LambdaTest [SmartUI](https://www.lambdatest.com/smart-visual-testing) cung cấp kiểm thử hồi quy trực quan được hỗ trợ bởi AI cho các bài kiểm tra WebdriverIO của bạn. Nó chụp ảnh màn hình, so sánh chúng với các đường cơ sở và làm nổi bật sự khác biệt trực quan bằng thuật toán so sánh thông minh.

## Thiết lập

**Tạo dự án SmartUI**

[Đăng nhập](https://accounts.lambdatest.com/register) vào LambdaTest và điều hướng đến [Dự án SmartUI](https://smartui.lambdatest.com/) để tạo một dự án mới. Chọn **Web** làm nền tảng và cấu hình tên dự án, người phê duyệt và thẻ.

**Thiết lập thông tin đăng nhập**

Lấy `LT_USERNAME` và `LT_ACCESS_KEY` từ bảng điều khiển LambdaTest và đặt chúng làm biến môi trường:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Cài đặt SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**Cấu hình WebdriverIO**

Cập nhật `wdio.conf.js` của bạn:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  
  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## Sử dụng

Sử dụng `browser.execute('smartui.takeScreenshot')` để chụp ảnh màn hình:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');
    
    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });
    
    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**Chạy kiểm tra**

```sh
npx wdio wdio.conf.js
```

Xem kết quả trong [Bảng điều khiển SmartUI](https://smartui.lambdatest.com/).

## Tùy chọn nâng cao

**Bỏ qua các phần tử**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**Chọn các khu vực cụ thể**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Tài nguyên

| Tài nguyên                                                                                      | Mô tả                                   |
|-------------------------------------------------------------------------------------------------|------------------------------------------|
| [Tài liệu chính thức](https://www.lambdatest.com/support/docs/smart-ui-cypress/)               | Tài liệu SmartUI                         |
| [Bảng điều khiển SmartUI](https://smartui.lambdatest.com/)                                      | Truy cập dự án và bản dựng SmartUI       |
| [Cài đặt nâng cao](https://www.lambdatest.com/support/docs/test-settings-options/)             | Cấu hình độ nhạy so sánh                |
| [Tùy chọn bản dựng](https://www.lambdatest.com/support/docs/smart-ui-build-options/)           | Cấu hình bản dựng nâng cao               |
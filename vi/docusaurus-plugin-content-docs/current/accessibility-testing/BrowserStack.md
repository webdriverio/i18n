---
id: browserstack
title: Kiểm Tra Truy Cập BrowserStack
---

# BrowserStack Accessibility Testing

Bạn có thể dễ dàng tích hợp các bài kiểm tra truy cập trong bộ kiểm tra WebdriverIO bằng cách sử dụng [Tính năng kiểm tra tự động của BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Lợi ích của các bài kiểm tra tự động trong BrowserStack Accessibility Testing

Để sử dụng các bài kiểm tra tự động trong BrowserStack Accessibility Testing, các bài kiểm tra của bạn phải chạy trên BrowserStack Automate.

Sau đây là những lợi ích của các bài kiểm tra tự động:

* Tích hợp liền mạch vào bộ kiểm tra tự động hiện có của bạn.
* Không cần thay đổi mã trong các trường hợp kiểm tra.
* Không yêu cầu bảo trì bổ sung cho việc kiểm tra truy cập.
* Hiểu xu hướng lịch sử và có được những hiểu biết về trường hợp kiểm tra.

## Bắt đầu với BrowserStack Accessibility Testing

Làm theo các bước sau để tích hợp bộ kiểm tra WebdriverIO của bạn với BrowserStack's Accessibility Testing:

1. Cài đặt gói npm `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Cập nhật tập tin cấu hình `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Optional configuration options
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

Bạn có thể xem hướng dẫn chi tiết [tại đây](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
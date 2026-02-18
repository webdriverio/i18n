---
id: multi-framework-support
title: Hỗ trợ Đa Framework
---

DevTools tự động hoạt động với Mocha, Jasmine và Cucumber mà không cần bất kỳ cấu hình đặc thù nào cho framework. Chỉ cần thêm dịch vụ này vào cấu hình WebDriverIO của bạn và tất cả các tính năng sẽ hoạt động liền mạch bất kể bạn đang sử dụng framework kiểm thử nào.

**Các Framework được Hỗ trợ:**
- **Mocha** - Thực thi ở cấp độ test và bộ test với lọc grep
- **Jasmine** - Tích hợp hoàn chỉnh với lọc dựa trên grep
- **Cucumber** - Thực thi ở cấp độ kịch bản và ví dụ với định hướng feature:line

Cùng một giao diện gỡ lỗi, chạy lại các bài kiểm tra, và các tính năng trực quan hoạt động nhất quán trên tất cả các framework.

## Cấu hình

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // hoặc 'jasmine' hoặc 'cucumber'
    services: ['devtools'],
    // ...
};
```
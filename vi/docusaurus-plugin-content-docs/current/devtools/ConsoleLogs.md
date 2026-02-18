---
id: console-logs
title: Nhật Ký Console
---

Ghi lại và kiểm tra tất cả đầu ra của console trình duyệt trong quá trình thực thi kiểm thử. DevTools ghi lại các thông báo console từ ứng dụng của bạn (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) cũng như nhật ký framework WebDriverIO dựa trên `logLevel` được cấu hình trong tệp `wdio.conf.ts`.

**Tính năng:**
- Ghi lại thông báo console theo thời gian thực trong quá trình thực thi kiểm thử
- Nhật ký console trình duyệt (log, warn, error, info, debug)
- Nhật ký framework WebDriverIO được lọc theo `logLevel` đã cấu hình (trace, debug, info, warn, error, silent)
- Dấu thời gian hiển thị chính xác khi mỗi thông báo được ghi lại
- Nhật ký console hiển thị cùng với các bước kiểm thử và ảnh chụp trình duyệt để cung cấp ngữ cảnh

**Cấu hình:**
```js
// wdio.conf.ts
export const config = {
    // Mức độ chi tiết của nhật ký: trace | debug | info | warn | error | silent
    logLevel: 'info', // Kiểm soát những nhật ký framework nào được ghi lại
    // ...
};
```

Điều này giúp dễ dàng gỡ lỗi JavaScript, theo dõi hành vi ứng dụng và xem các hoạt động nội bộ của WebDriverIO trong quá trình thực thi kiểm thử.

## Demo

### >_ Console Logs
![Console Logs](./demo/console-logs.gif)
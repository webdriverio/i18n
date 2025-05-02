---
id: globals
title: Biến toàn cục
---

Trong các tệp kiểm thử của bạn, WebdriverIO đặt mỗi phương thức và đối tượng này vào môi trường toàn cục. Bạn không cần phải nhập bất cứ thứ gì để sử dụng chúng. Tuy nhiên, nếu bạn thích nhập một cách rõ ràng, bạn có thể thực hiện `import { browser, $, $$, expect } from '@wdio/globals'` và thiết lập `injectGlobals: false` trong cấu hình WDIO của bạn.

Các đối tượng toàn cục sau được thiết lập nếu không được cấu hình khác:

- `browser`: [Đối tượng Browser](https://webdriver.io/docs/api/browser) của WebdriverIO
- `driver`: bí danh cho `browser` (được sử dụng khi chạy kiểm thử trên thiết bị di động)
- `multiremotebrowser`: bí danh cho `browser` hoặc `driver` nhưng chỉ được thiết lập cho các phiên [Multiremote](/docs/multiremote)
- `$`: lệnh để tìm một phần tử (xem thêm trong [Tài liệu API](/docs/api/browser/$))
- `$$`: lệnh để tìm các phần tử (xem thêm trong [Tài liệu API](/docs/api/browser/$$))
- `expect`: framework kiểm tra cho WebdriverIO (xem [Tài liệu API](/docs/api/expect-webdriverio))

__Lưu ý:__ WebdriverIO không kiểm soát được các framework đang sử dụng (ví dụ: Mocha hoặc Jasmine) thiết lập các biến toàn cục khi khởi động môi trường của chúng.
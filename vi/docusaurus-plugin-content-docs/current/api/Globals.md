---
id: globals
title: Biến toàn cục
---

Trong các tệp kiểm thử của bạn, WebdriverIO đặt mỗi phương thức và đối tượng sau vào môi trường toàn cục. Bạn không cần phải import bất cứ thứ gì để sử dụng chúng. Tuy nhiên, nếu bạn thích import một cách rõ ràng, bạn có thể làm `import { browser, $, $$, expect } from '@wdio/globals'` và thiết lập `injectGlobals: false` trong cấu hình WDIO của bạn.

Các đối tượng toàn cục sau được thiết lập nếu không được cấu hình khác:

- `browser`: [Đối tượng Browser](https://webdriver.io/docs/api/browser) của WebdriverIO
- `driver`: bí danh của `browser` (được sử dụng khi chạy kiểm thử di động)
- `multiRemoteBrowser`: bí danh của `browser` hoặc `driver` nhưng chỉ được thiết lập cho phiên [Multiremote](/docs/multiremote)
- `$`: lệnh để lấy một phần tử (xem thêm tại [API docs](/docs/api/browser/$))
- `$$`: lệnh để lấy nhiều phần tử (xem thêm tại [API docs](/docs/api/browser/$$))
- `expect`: framework kiểm tra cho WebdriverIO (xem [API docs](/docs/api/expect-webdriverio))

__Lưu ý:__ WebdriverIO không kiểm soát được các framework được sử dụng (ví dụ: Mocha hoặc Jasmine) khi chúng thiết lập biến toàn cục khi khởi tạo môi trường của chúng.
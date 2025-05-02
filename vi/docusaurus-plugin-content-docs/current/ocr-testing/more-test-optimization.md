---
id: more-test-optimization
title: Thời gian thực thi kiểm thử
---

Theo mặc định, mô-đun này sẽ kiểm tra xem bạn có cài đặt Tesseract cục bộ trên máy/trong pipeline của mình hay không. Nếu bạn không có cài đặt cục bộ, nó sẽ tự động sử dụng phiên bản [NodeJS](https://github.com/naptha/tesseract.js). Điều này có thể gây ra một số chậm trễ vì việc xử lý hình ảnh sẽ được thực hiện bởi Node.js. NodeJS không phải là hệ thống tốt nhất để thực hiện
xử lý nặng.

**NHƯNG....**, có nhiều cách để tối ưu hóa thời gian thực thi. Hãy xem script kiểm thử sau đây

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webbrowser.io");
        await browser.ocrClickOnText({
            text: "Search",
        });
        await browser.ocrSetValue({
            text: "docs",
            value: "specfileretries",
        });
        await browser.ocrWaitForTextDisplayed({
            text: "specFileRetries",
        });
    });
});
```

Khi bạn thực thi lần đầu tiên, bạn có thể thấy kết quả sau đây, nơi mà mất 5.9 giây để hoàn thành bài kiểm tra.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:52:53.405Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 126
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: d281dcdc43962b95835aea8f64cab6c7
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (5.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

## Cắt khu vực tìm kiếm của màn hình

Bạn có thể tối ưu hóa thời gian thực thi bằng cách cung cấp một khu vực đã được cắt để thực hiện OCR.

Nếu bạn thay đổi script như sau:

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webdriver.io");
        await driver.ocrClickOnText({
            haystack: $(".DocSearch"),
            text: "Search",
        });
        await driver.ocrSetValue({
            haystack: $(".DocSearch-Form"),
            text: "docs",
            value: "specfileretries",
        });
        await driver.ocrWaitForTextDisplayed({
            haystack: $(".DocSearch-Dropdown"),
            text: "specFileRetries",
        });
    });
});
```

Sau đó bạn sẽ thấy thời gian thực thi khác nhau.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:56:55.326Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 124
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: c6cb1843535bda3ee3af07920ce232b8
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (4.8s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

:::tip Cắt hình ảnh
Điều này đã giảm thời gian thực thi cục bộ từ **5.9** xuống **4.8 giây**. Đây là sự giảm gần **19%**. Hãy tưởng tượng nó có thể làm gì cho một script lớn hơn với nhiều dữ liệu hơn.
:::

## Sử dụng cài đặt cục bộ của Tesseract

Bạn có thể tăng tốc thời gian thực thi xuống thậm chí dưới một phút nếu bạn có cài đặt cục bộ của Tessarect trên máy cục bộ và/hoặc trong pipeline của bạn (thông tin thêm về việc cài đặt Tesseract trên hệ thống cục bộ của bạn có thể được tìm thấy [tại đây](https://tesseract-ocr.github.io/tessdoc/Installation.html)). Bạn có thể thấy thời gian thực thi của cùng một script sử dụng cài đặt cục bộ của Tesseract dưới đây.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:59:11.620Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: 87f8c1e949e15a383b902e4d59b1f738
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (3.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:06
```

:::tip Cài đặt cục bộ
Điều này đã giảm thời gian thực thi cục bộ từ **5.9** xuống **3.9 giây**. Đây là sự giảm gần **34%**. Hãy tưởng tượng nó có thể làm gì cho một script lớn hơn với nhiều dữ liệu hơn.
:::
---
id: integrate-with-percy
title: Cho Ứng dụng Web
---

## Tích hợp các bài kiểm thử WebdriverIO của bạn với Percy

Trước khi tích hợp, bạn có thể khám phá [hướng dẫn xây dựng mẫu của Percy cho WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Tích hợp các bài kiểm thử tự động WebdriverIO của bạn với BrowserStack Percy và đây là tổng quan các bước tích hợp:

### Bước 1: Tạo một dự án Percy
[Đăng nhập](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) vào Percy. Trong Percy, tạo một dự án loại Web, sau đó đặt tên cho dự án. Sau khi dự án được tạo, Percy sẽ tạo ra một token. Hãy ghi lại token đó. Bạn phải sử dụng nó để thiết lập biến môi trường trong bước tiếp theo.

Để biết chi tiết về cách tạo dự án, xem [Tạo dự án Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Bước 2: Thiết lập token dự án như một biến môi trường

Chạy lệnh sau để thiết lập PERCY_TOKEN như một biến môi trường:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Bước 3: Cài đặt các phụ thuộc của Percy

Cài đặt các thành phần cần thiết để thiết lập môi trường tích hợp cho bộ kiểm thử của bạn.

Để cài đặt các phụ thuộc, chạy lệnh sau:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Bước 4: Cập nhật kịch bản kiểm thử của bạn

Nhập thư viện Percy để sử dụng phương thức và thuộc tính cần thiết để chụp ảnh màn hình.
Ví dụ sau sử dụng hàm percySnapshot() trong chế độ bất đồng bộ:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

Khi sử dụng WebdriverIO trong [chế độ độc lập](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), cung cấp đối tượng trình duyệt làm đối số đầu tiên cho hàm `percySnapshot`:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Các đối số của phương thức snapshot là:

```sh
percySnapshot(name[, options])
```
### Chế độ độc lập

```sh
percySnapshot(browser, name[, options])
```

- browser (bắt buộc) - Đối tượng trình duyệt WebdriverIO
- name (bắt buộc) - Tên snapshot; phải là duy nhất cho mỗi snapshot
- options - Xem các tùy chọn cấu hình cho từng snapshot

Để tìm hiểu thêm, xem [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Bước 5: Chạy Percy
Chạy các bài kiểm thử của bạn bằng lệnh `percy exec` như sau:

Nếu bạn không thể sử dụng lệnh `percy:exec` hoặc muốn chạy các bài kiểm thử bằng tùy chọn chạy IDE, bạn có thể sử dụng các lệnh `percy:exec:start` và `percy:exec:stop`. Để tìm hiểu thêm, truy cập [Chạy Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## Truy cập các trang sau để biết thêm chi tiết:
- [Tích hợp các bài kiểm thử WebdriverIO của bạn với Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Trang biến môi trường](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Tích hợp sử dụng BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) nếu bạn đang sử dụng BrowserStack Automate.


| Tài nguyên                                                                                                                                                          | Mô tả                            |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| [Tài liệu chính thức](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)       | Tài liệu WebdriverIO của Percy  |
| [Xây dựng mẫu - Hướng dẫn](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Hướng dẫn WebdriverIO của Percy |
| [Video chính thức](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                           | Kiểm thử trực quan với Percy    |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Giới thiệu Visual Reviews 2.0    |
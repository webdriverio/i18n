---
id: coverage
title: Độ Phủ
---

Trình chạy trình duyệt của WebdriverIO hỗ trợ báo cáo độ phủ mã sử dụng [`istanbul`](https://istanbul.js.org/). Testrunner sẽ tự động phân tích mã của bạn và ghi lại độ phủ mã cho bạn.

## Thiết lập

Để bật báo cáo độ phủ mã, hãy kích hoạt nó thông qua cấu hình trình chạy trình duyệt WebdriverIO, ví dụ:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

Kiểm tra tất cả [tùy chọn độ phủ](/docs/runner#coverage-options), để tìm hiểu cách cấu hình chính xác.

## Bỏ qua Mã

Có thể có một số phần trong codebase của bạn mà bạn muốn cố ý loại trừ khỏi việc theo dõi độ phủ, để làm điều đó bạn có thể sử dụng các gợi ý phân tích sau:

- `/* istanbul ignore if */`: bỏ qua câu lệnh if tiếp theo.
- `/* istanbul ignore else */`: bỏ qua phần else của câu lệnh if.
- `/* istanbul ignore next */`: bỏ qua phần tiếp theo trong mã nguồn (các hàm, câu lệnh if, lớp, v.v.).
- `/* istanbul ignore file */`: bỏ qua toàn bộ tệp nguồn (điều này nên được đặt ở đầu tệp).

:::info

Khuyến nghị loại trừ các tệp kiểm thử của bạn khỏi báo cáo độ phủ vì nó có thể gây ra lỗi, ví dụ: khi gọi lệnh `execute` hoặc `executeAsync`. Nếu bạn muốn giữ chúng trong báo cáo của mình, hãy đảm bảo bạn loại trừ việc phân tích chúng qua:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::
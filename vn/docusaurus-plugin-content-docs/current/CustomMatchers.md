---
id: custommatchers
title: Các Matcher Tùy Chỉnh
---

WebdriverIO sử dụng thư viện khẳng định [`expect`](https://webdriver.io/docs/api/expect-webdriverio) theo kiểu Jest, đi kèm với các tính năng đặc biệt và matcher tùy chỉnh dành riêng cho việc chạy các bài kiểm thử web và di động. Mặc dù thư viện matcher rất phong phú, nhưng chắc chắn không thể phù hợp với tất cả các tình huống có thể xảy ra. Do đó, bạn có thể mở rộng các matcher hiện có bằng các matcher tùy chỉnh do bạn định nghĩa.

:::warning

Mặc dù hiện tại không có sự khác biệt về cách định nghĩa matcher cụ thể cho đối tượng [`browser`](/docs/api/browser) hoặc một thể hiện [element](/docs/api/element), điều này chắc chắn có thể thay đổi trong tương lai. Hãy theo dõi [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) để biết thêm thông tin về sự phát triển này.

:::

## Matcher Tùy Chỉnh cho Browser

Để đăng ký một matcher tùy chỉnh cho browser, gọi `extend` trên đối tượng `expect` trực tiếp trong tệp spec của bạn hoặc như một phần của ví dụ như hook `before` trong tệp `wdio.conf.js` của bạn:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Như ví dụ đã chỉ ra, hàm matcher nhận đối tượng mong đợi, ví dụ như đối tượng browser hoặc element, làm tham số đầu tiên và giá trị mong đợi làm tham số thứ hai. Sau đó, bạn có thể sử dụng matcher như sau:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matcher Tùy Chỉnh cho Element

Tương tự như matcher tùy chỉnh cho browser, matcher cho element không khác biệt. Dưới đây là ví dụ về cách tạo một matcher tùy chỉnh để kiểm tra thuộc tính aria-label của một element:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Điều này cho phép bạn gọi assertion như sau:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Hỗ Trợ TypeScript

Nếu bạn đang sử dụng TypeScript, cần thêm một bước nữa để đảm bảo tính an toàn về kiểu dữ liệu của các matcher tùy chỉnh của bạn. Bằng cách mở rộng giao diện `Matcher` với các matcher tùy chỉnh của bạn, tất cả các vấn đề về kiểu dữ liệu sẽ biến mất:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Nếu bạn đã tạo một [asymmetric matcher](https://jestjs.io/docs/expect#expectextendmatchers) tùy chỉnh, bạn có thể mở rộng kiểu `expect` tương tự như sau:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```
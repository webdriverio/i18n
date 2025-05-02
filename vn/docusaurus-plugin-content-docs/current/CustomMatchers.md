---
id: custommatchers
title: Trình Đối Sánh Tùy Chỉnh
---

WebdriverIO sử dụng thư viện khẳng định [`expect`](https://webdriver.io/docs/api/expect-webdriverio) theo phong cách Jest, đi kèm với các tính năng đặc biệt và trình đối sánh tùy chỉnh dành riêng cho việc chạy các bài kiểm thử web và di động. Mặc dù thư viện trình đối sánh rất lớn, nhưng chắc chắn không phù hợp với mọi tình huống có thể xảy ra. Do đó, có thể mở rộng các trình đối sánh hiện có với các trình đối sánh tùy chỉnh do bạn xác định.

:::warning

Mặc dù hiện tại không có sự khác biệt về cách định nghĩa các trình đối sánh dành riêng cho đối tượng [`browser`](/docs/api/browser) hoặc thể hiện [element](/docs/api/element), điều này chắc chắn có thể thay đổi trong tương lai. Hãy theo dõi [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) để biết thêm thông tin về sự phát triển này.

:::

## Trình Đối Sánh Trình Duyệt Tùy Chỉnh

Để đăng ký trình đối sánh trình duyệt tùy chỉnh, hãy gọi `extend` trên đối tượng `expect` trực tiếp trong tệp spec của bạn hoặc như một phần của ví dụ hook `before` trong `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Như hiển thị trong ví dụ, hàm đối sánh lấy đối tượng mong đợi, ví dụ: đối tượng trình duyệt hoặc phần tử, làm tham số đầu tiên và giá trị mong đợi làm tham số thứ hai. Sau đó, bạn có thể sử dụng trình đối sánh như sau:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Trình Đối Sánh Phần Tử Tùy Chỉnh

Tương tự như trình đối sánh trình duyệt tùy chỉnh, trình đối sánh phần tử không khác nhau. Dưới đây là ví dụ về cách tạo trình đối sánh tùy chỉnh để xác nhận aria-label của một phần tử:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Điều này cho phép bạn gọi khẳng định như sau:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Hỗ Trợ TypeScript

Nếu bạn đang sử dụng TypeScript, cần thêm một bước nữa để đảm bảo an toàn kiểu cho các trình đối sánh tùy chỉnh của bạn. Bằng cách mở rộng giao diện `Matcher` với các trình đối sánh tùy chỉnh của bạn, tất cả các vấn đề về kiểu đều biến mất:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Nếu bạn đã tạo một [trình đối sánh bất đối xứng](https://jestjs.io/docs/expect#expectextendmatchers) tùy chỉnh, bạn có thể mở rộng các kiểu `expect` tương tự như sau:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```
---
id: snapshot
title: Snapshot
---

Kiểm tra snapshot có thể rất hữu ích để khẳng định nhiều khía cạnh khác nhau của component hoặc logic của bạn cùng một lúc. Trong WebdriverIO, bạn có thể chụp snapshot của bất kỳ đối tượng tùy ý nào cũng như cấu trúc DOM của WebElement hoặc kết quả lệnh WebdriverIO.

Tương tự như các framework kiểm thử khác, WebdriverIO sẽ chụp snapshot của giá trị đã cho, sau đó so sánh nó với tệp snapshot tham chiếu được lưu trữ cùng với bài kiểm tra. Bài kiểm tra sẽ thất bại nếu hai snapshot không khớp nhau: hoặc là thay đổi không mong đợi, hoặc snapshot tham chiếu cần được cập nhật lên phiên bản mới của kết quả.

:::info Hỗ trợ Đa Nền tảng

Các khả năng snapshot này có sẵn cho việc chạy các bài kiểm tra end-to-end trong môi trường Node.js cũng như chạy các bài kiểm tra [đơn vị và component](/docs/component-testing) trong trình duyệt hoặc trên thiết bị di động.

:::

## Sử dụng Snapshots
Để chụp snapshot một giá trị, bạn có thể sử dụng `toMatchSnapshot()` từ API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Lần đầu tiên bài kiểm tra này chạy, WebdriverIO tạo tệp snapshot trông như thế này:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Các tệp snapshot nên được commit cùng với các thay đổi mã và được xem xét như một phần của quy trình đánh giá mã của bạn. Trong các lần chạy kiểm tra tiếp theo, WebdriverIO sẽ so sánh kết quả hiển thị với snapshot trước đó. Nếu chúng khớp nhau, bài kiểm tra sẽ đạt. Nếu chúng không khớp nhau, thì hoặc trình chạy kiểm tra đã tìm thấy lỗi trong mã của bạn cần được sửa, hoặc việc triển khai đã thay đổi và snapshot cần được cập nhật.

Để cập nhật snapshot, truyền cờ `-s` (hoặc `--updateSnapshot`) vào lệnh `wdio`, ví dụ:

```sh
npx wdio run wdio.conf.js -s
```

__Lưu ý:__ nếu bạn chạy kiểm tra với nhiều trình duyệt song song, chỉ một snapshot được tạo và so sánh. Nếu bạn muốn có snapshot riêng cho mỗi khả năng, vui lòng [tạo một vấn đề](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) và cho chúng tôi biết về trường hợp sử dụng của bạn.

## Inline Snapshots

Tương tự, bạn có thể sử dụng `toMatchInlineSnapshot()` để lưu trữ snapshot nội tuyến trong tệp kiểm tra.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Thay vì tạo tệp snapshot, Vitest sẽ sửa đổi tệp kiểm tra trực tiếp để cập nhật snapshot dưới dạng chuỗi:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Điều này cho phép bạn thấy kết quả mong đợi trực tiếp mà không cần nhảy qua các tệp khác nhau.

## Visual Snapshots

Việc chụp snapshot DOM của một phần tử có thể không phải là ý tưởng tốt nhất, đặc biệt nếu cấu trúc DOM quá lớn và chứa các thuộc tính phần tử động. Trong những trường hợp này, nên dựa vào visual snapshots cho các phần tử.

Để bật visual snapshots, thêm `@wdio/visual-service` vào cài đặt của bạn. Bạn có thể làm theo hướng dẫn cài đặt trong [tài liệu](/docs/visual-testing#installation) về Kiểm thử Trực quan.

Sau đó, bạn có thể chụp visual snapshot thông qua `toMatchElementSnapshot()`, ví dụ:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Một hình ảnh sau đó được lưu trữ trong thư mục cơ sở. Hãy xem [Kiểm thử Trực quan](/docs/visual-testing) để biết thêm thông tin.
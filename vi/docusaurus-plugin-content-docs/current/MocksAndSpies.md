---
id: mocksandspies
title: Giả lập và Theo dõi Yêu cầu
---

WebdriverIO có hỗ trợ tích hợp sẵn để sửa đổi các phản hồi mạng, giúp bạn tập trung vào việc kiểm thử ứng dụng giao diện mà không cần phải thiết lập backend hoặc máy chủ giả lập. Bạn có thể định nghĩa các phản hồi tùy chỉnh cho các tài nguyên web như các yêu cầu REST API trong bài kiểm thử của mình và sửa đổi chúng một cách linh hoạt.

:::info

Lưu ý rằng việc sử dụng lệnh `mock` yêu cầu hỗ trợ giao thức Chrome DevTools. Hỗ trợ này được cung cấp nếu bạn chạy kiểm thử cục bộ trong trình duyệt dựa trên Chromium, thông qua Selenium Grid v4 trở lên, hoặc thông qua nhà cung cấp đám mây có hỗ trợ giao thức Chrome DevTools (ví dụ: SauceLabs, BrowserStack, TestMu AI (Trước đây là LambdaTest)). Hỗ trợ đầy đủ trên nhiều trình duyệt sẽ có sẵn khi các yếu tố cơ bản cần thiết được triển khai trong [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) và được thực hiện trong các trình duyệt tương ứng.

:::

## Tạo một giả lập

Trước khi bạn có thể sửa đổi bất kỳ phản hồi nào, bạn phải định nghĩa một giả lập trước. Giả lập này được mô tả bằng URL tài nguyên và có thể được lọc theo [phương thức yêu cầu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) hoặc [tiêu đề](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Tài nguyên hỗ trợ biểu thức glob bằng [minimatch](https://www.npmjs.com/package/minimatch):

```js
// giả lập tất cả tài nguyên kết thúc bằng "/users/list"
const userListMock = await browser.mock('**/users/list')

// hoặc bạn có thể chỉ định giả lập bằng cách lọc tài nguyên theo tiêu đề hoặc
// mã trạng thái, chỉ giả lập các yêu cầu thành công đến tài nguyên json
const strictMock = await browser.mock('**', {
    // giả lập tất cả phản hồi json
    requestHeaders: { 'Content-Type': 'application/json' },
    // đã thành công
    statusCode: 200
})
```

## Chỉ định phản hồi tùy chỉnh

Sau khi bạn đã định nghĩa một giả lập, bạn có thể định nghĩa phản hồi tùy chỉnh cho nó. Những phản hồi tùy chỉnh này có thể là một đối tượng để phản hồi dạng JSON, một tệp cục bộ để phản hồi với một fixture tùy chỉnh hoặc một tài nguyên web để thay thế phản hồi bằng một tài nguyên từ internet.

### Giả lập Yêu cầu API

Để giả lập các yêu cầu API mà bạn mong đợi một phản hồi JSON, tất cả những gì bạn cần làm là gọi `respond` trên đối tượng giả lập với một đối tượng tùy ý mà bạn muốn trả về, ví dụ:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Bạn cũng có thể sửa đổi tiêu đề phản hồi cũng như mã trạng thái bằng cách truyền vào một số tham số phản hồi giả lập như sau:

```js
mock.respond({ ... }, {
    // phản hồi với mã trạng thái 404
    statusCode: 404,
    // kết hợp tiêu đề phản hồi với các tiêu đề sau
    headers: { 'x-custom-header': 'foobar' }
})
```

Nếu bạn không muốn giả lập gọi đến backend, bạn có thể truyền `false` cho cờ `fetchResponse`.

```js
mock.respond({ ... }, {
    // không gọi đến backend thực tế
    fetchResponse: false
})
```

Khuyến nghị lưu trữ phản hồi tùy chỉnh trong các tệp fixture để bạn có thể yêu cầu chúng trong bài kiểm thử của mình như sau:

```js
// yêu cầu Node.js v16.14.0 trở lên để hỗ trợ khẳng định import JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Giả lập tài nguyên văn bản

Nếu bạn muốn sửa đổi tài nguyên văn bản như tệp JavaScript, CSS hoặc các tài nguyên dựa trên văn bản khác, bạn có thể chỉ cần truyền vào một đường dẫn tệp và WebdriverIO sẽ thay thế tài nguyên gốc bằng nó, ví dụ:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// hoặc phản hồi với JS tùy chỉnh của bạn
scriptMock.respond('alert("I am a mocked resource")')
```

### Chuyển hướng tài nguyên web

Bạn cũng có thể thay thế một tài nguyên web bằng một tài nguyên web khác nếu phản hồi mong muốn của bạn đã được lưu trữ trên web. Điều này hoạt động với các tài nguyên trang riêng lẻ cũng như với một trang web, ví dụ:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Phản hồi động

Nếu phản hồi giả lập của bạn phụ thuộc vào phản hồi tài nguyên gốc, bạn cũng có thể sửa đổi động tài nguyên bằng cách truyền vào một hàm nhận phản hồi gốc làm tham số và thiết lập giả lập dựa trên giá trị trả về, ví dụ:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // thay thế nội dung todo bằng số thứ tự trong danh sách
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// returns
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Hủy bỏ giả lập

Thay vì trả về một phản hồi tùy chỉnh, bạn cũng có thể chỉ hủy bỏ yêu cầu với một trong các lỗi HTTP sau:

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

Điều này rất hữu ích nếu bạn muốn chặn các script của bên thứ 3 từ trang của bạn mà có ảnh hưởng tiêu cực đến bài kiểm thử chức năng của bạn. Bạn có thể hủy bỏ một giả lập bằng cách gọi `abort` hoặc `abortOnce`, ví dụ:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Theo dõi

Mỗi giả lập tự động là một theo dõi (spy) đếm số lượng yêu cầu mà trình duyệt đã gửi đến tài nguyên đó. Nếu bạn không áp dụng một phản hồi tùy chỉnh hoặc lý do hủy bỏ cho giả lập, nó sẽ tiếp tục với phản hồi mặc định mà bạn thường nhận được. Điều này cho phép bạn kiểm tra bao nhiêu lần trình duyệt đã thực hiện yêu cầu, ví dụ: đến một điểm cuối API nhất định.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // returns 0

// đăng ký người dùng
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// kiểm tra xem yêu cầu API đã được thực hiện chưa
expect(mock.calls.length).toBe(1)

// khẳng định phản hồi
expect(mock.calls[0].body).toEqual({ success: true })
```

Nếu bạn cần chờ đến khi một yêu cầu phù hợp đã được phản hồi, sử dụng `mock.waitForResponse(options)`. Xem tài liệu tham khảo API: [waitForResponse](/docs/api/mock/waitForResponse).
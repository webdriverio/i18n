---
id: mock
title: Đối tượng Mock
---

Đối tượng mock là một đối tượng đại diện cho một mô phỏng mạng và chứa thông tin về các yêu cầu khớp với `url` và `filterOptions` đã cho. Nó có thể được nhận bằng cách sử dụng lệnh [`mock`](/docs/api/browser/mock).

:::info

Lưu ý rằng việc sử dụng lệnh `mock` yêu cầu hỗ trợ giao thức Chrome DevTools.
Hỗ trợ này được cung cấp nếu bạn chạy các bài kiểm thử cục bộ trong trình duyệt dựa trên Chromium hoặc nếu
bạn sử dụng Selenium Grid phiên bản 4 trở lên. Lệnh này __không thể__ được sử dụng khi chạy
các bài kiểm thử tự động trên đám mây. Tìm hiểu thêm trong phần [Giao thức Tự động hóa](/docs/automationProtocols).

:::

Bạn có thể đọc thêm về việc mô phỏng yêu cầu và phản hồi trong WebdriverIO trong hướng dẫn [Mocks and Spies](/docs/mocksandspies) của chúng tôi.

## Thuộc tính

Một đối tượng mock chứa các thuộc tính sau:

| Tên | Kiểu | Chi tiết |
| ---- | ---- | ------- |
| `url` | `String` | URL đã được truyền vào lệnh mock |
| `filterOptions` | `Object` | Các tùy chọn bộ lọc tài nguyên được truyền vào lệnh mock |
| `browser` | `Object` | [Đối tượng Browser](/docs/api/browser) được sử dụng để lấy đối tượng mock. |
| `calls` | `Object[]` | Thông tin về các yêu cầu trình duyệt khớp, chứa các thuộc tính như `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` và `body` |

## Phương thức

Các đối tượng Mock cung cấp nhiều lệnh khác nhau, được liệt kê trong phần `mock`, cho phép người dùng sửa đổi hành vi của yêu cầu hoặc phản hồi.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Sự kiện

Đối tượng mock là một EventEmitter và một số sự kiện được phát ra cho các trường hợp sử dụng của bạn.

Dưới đây là danh sách các sự kiện.

### `request`

Sự kiện này được phát ra khi khởi tạo một yêu cầu mạng khớp với mẫu mock. Yêu cầu được truyền trong callback sự kiện.

Giao diện Request:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Sự kiện này được phát ra khi phản hồi mạng được ghi đè với [`respond`](/docs/api/mock/respond) hoặc [`respondOnce`](/docs/api/mock/respondOnce). Phản hồi được truyền trong callback sự kiện.

Giao diện Response:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Sự kiện này được phát ra khi yêu cầu mạng bị hủy bỏ với [`abort`](/docs/api/mock/abort) hoặc [`abortOnce`](/docs/api/mock/abortOnce). Lỗi được truyền trong callback sự kiện.

Giao diện Fail:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Sự kiện này được phát ra khi một kết quả khớp mới được thêm vào, trước `continue` hoặc `overwrite`. Kết quả khớp được truyền trong callback sự kiện.

Giao diện Match:
```ts
interface MatchEvent {
    url: string // URL yêu cầu (không có phần fragment).
    urlFragment?: string // Fragment của URL được yêu cầu bắt đầu bằng dấu #, nếu có.
    method: string // Phương thức yêu cầu HTTP.
    headers: Record<string, string> // Header yêu cầu HTTP.
    postData?: string // Dữ liệu yêu cầu HTTP POST.
    hasPostData?: boolean // True khi yêu cầu có dữ liệu POST.
    mixedContentType?: MixedContentType // Kiểu xuất nội dung hỗn hợp của yêu cầu.
    initialPriority: ResourcePriority // Độ ưu tiên của yêu cầu tài nguyên tại thời điểm yêu cầu được gửi.
    referrerPolicy: ReferrerPolicy // Chính sách referrer của yêu cầu, như được định nghĩa trong https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Có được tải qua link preload hay không.
    body: string | Buffer | JsonCompatible // Phần thân phản hồi của tài nguyên thực tế.
    responseHeaders: Record<string, string> // Header phản hồi HTTP.
    statusCode: number // Mã trạng thái phản hồi HTTP.
    mockedResponse?: string | Buffer // Nếu mock, phát ra sự kiện, cũng sửa đổi phản hồi của nó.
}
```

### `continue`

Sự kiện này được phát ra khi phản hồi mạng không bị ghi đè cũng không bị gián đoạn, hoặc nếu phản hồi đã được gửi bởi một mock khác. `requestId` được truyền trong callback sự kiện.

## Ví dụ

Lấy số lượng yêu cầu đang chờ xử lý:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // điều quan trọng là phải khớp với tất cả các yêu cầu, nếu không, giá trị kết quả có thể rất khó hiểu.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Ném ra lỗi khi gặp lỗi mạng 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // đợi ở đây, vì một số yêu cầu vẫn có thể đang chờ xử lý
    if (selector) {
        await this.$(selector).waitForExist().catch(reject)
    }

    if (predicate) {
        await this.waitUntil(predicate).catch(reject)
    }

    resolve()
}))

await browser.loadPageWithout404(browser, 'some/url', { selector: 'main' })
```

Xác định xem giá trị phản hồi của mock có được sử dụng hay không:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // kích hoạt cho yêu cầu đầu tiên đến '**/foo/**'
}).on('continue', () => {
    // kích hoạt cho các yêu cầu còn lại đến '**/foo/**'
})

secondMock.on('continue', () => {
    // kích hoạt cho yêu cầu đầu tiên đến '**/foo/bar/**'
}).on('overwrite', () => {
    // kích hoạt cho các yêu cầu còn lại đến '**/foo/bar/**'
})
```

Trong ví dụ này, `firstMock` được định nghĩa trước và có một lệnh gọi `respondOnce`, vì vậy giá trị phản hồi của `secondMock` sẽ không được sử dụng cho yêu cầu đầu tiên, nhưng sẽ được sử dụng cho các yêu cầu còn lại.
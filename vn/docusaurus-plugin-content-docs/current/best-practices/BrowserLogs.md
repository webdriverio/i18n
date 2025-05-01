---
id: browser-logs
title: Nhật ký trình duyệt
---

Khi chạy các bài kiểm thử, trình duyệt có thể ghi lại thông tin quan trọng mà bạn quan tâm hoặc muốn kiểm tra.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Khi sử dụng WebDriver Bidi, phương pháp mặc định mà WebdriverIO tự động hóa trình duyệt, bạn có thể đăng ký nhận các sự kiện từ trình duyệt. Đối với các sự kiện nhật ký, bạn cần lắng nghe `log.entryAdded'`, ví dụ:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

Trong một bài kiểm thử, bạn có thể đẩy các sự kiện nhật ký vào một mảng và kiểm tra mảng đó sau khi hành động của bạn hoàn tất, ví dụ:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // add log message to the array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // trigger the browser send a message to the console
        ...

        // assert if log was captured
        expect(logs).toContain('Hello Bidi')
    })

    // clean up listener afterwards
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Nếu bạn vẫn sử dụng WebDriver Classic hoặc đã vô hiệu hóa việc sử dụng Bidi thông qua khả năng `'wdio:enforceWebDriverClassic': true`, bạn có thể sử dụng lệnh JSONWire `getLogs` để lấy các nhật ký mới nhất. Vì WebdriverIO đã loại bỏ các lệnh không còn được hỗ trợ này, bạn sẽ cần sử dụng [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) để thêm lệnh trở lại instance trình duyệt của bạn.

Sau khi bạn đã thêm hoặc khởi tạo dịch vụ, bạn có thể lấy nhật ký qua:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Lưu ý: lệnh `getLogs` chỉ có thể lấy các nhật ký gần đây nhất từ trình duyệt. Nó có thể xóa các thông báo nhật ký nếu chúng quá cũ.
</TabItem>

</Tabs>

Xin lưu ý rằng bạn có thể sử dụng phương pháp này để truy xuất thông báo lỗi và xác minh xem ứng dụng của bạn có gặp bất kỳ lỗi nào không.
---
id: emulation
title: Giả lập
---

Với WebdriverIO, bạn có thể giả lập các Web API bằng lệnh [`emulate`](/docs/api/browser/emulate) để trả về các giá trị tùy chỉnh giúp bạn giả lập các hành vi trình duyệt nhất định. Lưu ý rằng điều này đòi hỏi ứng dụng của bạn phải sử dụng rõ ràng các API này.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Tính năng này yêu cầu hỗ trợ WebDriver Bidi cho trình duyệt. Mặc dù các phiên bản gần đây của Chrome, Edge và Firefox có sự hỗ trợ này, Safari __không hỗ trợ__. Để cập nhật, hãy theo dõi [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Hơn nữa, nếu bạn sử dụng nhà cung cấp điện toán đám mây để khởi chạy trình duyệt, hãy đảm bảo nhà cung cấp của bạn cũng hỗ trợ WebDriver Bidi.

Để bật WebDriver Bidi cho bài kiểm tra của bạn, hãy đảm bảo đặt `webSocketUrl: true` trong capabilities của bạn.

:::

## Vị trí địa lý

Thay đổi vị trí địa lý của trình duyệt đến một khu vực cụ thể, ví dụ:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Điều này sẽ monkey patch cách thức hoạt động của [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) và trả về vị trí do bạn cung cấp.

## Chế độ màu

Thay đổi thiết lập chế độ màu mặc định của trình duyệt thông qua:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

Điều này sẽ monkey patch cách [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) hoạt động khi bạn truy vấn chế độ màu thông qua `(prefers-color-scheme: dark)`.

## User Agent

Thay đổi user agent của trình duyệt thành một chuỗi khác thông qua:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Điều này sẽ thay đổi giá trị của [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Lưu ý rằng các nhà cung cấp trình duyệt đang dần dần loại bỏ User Agent.

## Thuộc tính onLine

Thay đổi trạng thái trực tuyến của trình duyệt thông qua:

```ts
await browser.emulate('onLine', false)
```

Điều này sẽ __không__ tắt lưu lượng mạng giữa trình duyệt và internet và chỉ thay đổi giá trị trả về của [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Nếu bạn quan tâm đến việc sửa đổi khả năng mạng của trình duyệt, hãy xem lệnh [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Đồng hồ

Bạn có thể sửa đổi đồng hồ hệ thống trình duyệt bằng lệnh [`emulate`](/docs/emulation). Nó ghi đè các hàm toàn cục gốc liên quan đến thời gian, cho phép chúng được điều khiển đồng bộ qua `clock.tick()` hoặc đối tượng đồng hồ được tạo ra. Điều này bao gồm kiểm soát:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Đồng hồ bắt đầu ở thời điểm kỷ nguyên unix (timestamp bằng 0). Điều này có nghĩa là khi bạn khởi tạo new Date trong ứng dụng của mình, nó sẽ có thời gian là ngày 1 tháng 1 năm 1970 nếu bạn không truyền bất kỳ tùy chọn nào khác cho lệnh `emulate`.

##### Ví dụ

Khi gọi `browser.emulate('clock', { ... })`, nó sẽ ngay lập tức ghi đè các hàm toàn cục cho trang hiện tại cũng như tất cả các trang sau, ví dụ:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Bạn có thể sửa đổi thời gian hệ thống bằng cách gọi [`setSystemTime`](/docs/api/clock/setSystemTime) hoặc [`tick`](/docs/api/clock/tick).

Đối tượng `FakeTimerInstallOpts` có thể có các thuộc tính sau:

 ```ts
interface FakeTimerInstallOpts {
    // Installs fake timers with the specified unix epoch
    // @default: 0
    now?: number | Date | undefined;

    // An array with names of global methods and APIs to fake. By default, WebdriverIO
    // does not replace `nextTick()` and `queueMicrotask()`. For instance,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` will fake only
    // `setTimeout()` and `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // The maximum number of timers that will be run when calling runAll() (default: 1000)
    loopLimit?: number | undefined;

    // Tells WebdriverIO to increment mocked time automatically based on the real system
    // time shift (e.g. the mocked time will be incremented by 20ms for every 20ms change
    // in the real system time)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevant only when using with shouldAdvanceTime: true. increment mocked time by
    // advanceTimeDelta ms every advanceTimeDelta ms change in the real system time
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Tells FakeTimers to clear 'native' (i.e. not fake) timers by delegating to their
    // respective handlers. These are not cleared by default, leading to potentially
    // unexpected behavior if timers existed prior to installing FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Thiết bị

Lệnh `emulate` cũng hỗ trợ giả lập một thiết bị di động hoặc máy tính để bàn nhất định bằng cách thay đổi viewport, hệ số tỷ lệ thiết bị và user agent. Điều này không nên được sử dụng cho kiểm thử di động vì các động cơ trình duyệt máy tính để bàn khác với di động. Điều này chỉ nên được sử dụng nếu ứng dụng của bạn cung cấp một hành vi cụ thể cho các kích thước viewport nhỏ hơn.

Ví dụ, để chuyển user agent và viewport sang iPhone 15, chỉ cần chạy:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO duy trì một danh sách cố định của [tất cả các thiết bị đã định nghĩa](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).
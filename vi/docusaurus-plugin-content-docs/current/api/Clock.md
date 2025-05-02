---
id: clock
title: Đối tượng Clock
---

Bạn có thể sửa đổi đồng hồ hệ thống trình duyệt bằng cách sử dụng lệnh [`emulate`](/docs/emulation). Nó ghi đè các hàm toàn cục gốc liên quan đến thời gian, cho phép chúng được kiểm soát đồng bộ thông qua `clock.tick()` hoặc đối tượng clock được trả về. Điều này bao gồm việc kiểm soát:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Đồng hồ bắt đầu từ thời điểm unix epoch (timestamp 0). Điều này có nghĩa là khi bạn khởi tạo new Date trong ứng dụng của mình, nó sẽ có thời gian là ngày 1 tháng 1 năm 1970 nếu bạn không truyền bất kỳ tùy chọn nào khác cho lệnh `emulate`.

## Ví dụ

Khi gọi `browser.emulate('clock', { ... })`, nó sẽ ngay lập tức ghi đè các hàm toàn cục cho trang hiện tại cũng như tất cả các trang tiếp theo, ví dụ:

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

await browser.url('http://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Bạn có thể sửa đổi thời gian hệ thống bằng cách gọi [`setSystemTime`](/docs/api/clock/setSystemTime) hoặc [`tick`](/docs/api/clock/tick).
---
id: clock
title: 时钟对象
---

您可以使用[`emulate`](/docs/emulation)命令修改浏览器系统时钟。它会覆盖与时间相关的原生全局函数，使其可以通过`clock.tick()`或返回的时钟对象进行同步控制。这包括控制：

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date对象`

时钟从unix纪元开始（时间戳为0）。这意味着当您在应用程序中实例化新的Date对象时，如果没有向`emulate`命令传递其他选项，它的时间将是1970年1月1日。

## 示例

调用`browser.emulate('clock', { ... })`时，它会立即覆盖当前页面以及所有后续页面的全局函数，例如：

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

您可以通过调用[`setSystemTime`](/docs/api/clock/setSystemTime)或[`tick`](/docs/api/clock/tick)来修改系统时间。